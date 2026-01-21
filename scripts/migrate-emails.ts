/**
 * Migration Script: emails.json -> PostgreSQL email_subscribers table
 *
 * This script reads emails from /app/data/emails.json and migrates them
 * to the database if they don't already exist.
 *
 * emails.json format (supports both):
 * - Legacy: ["email@example.com", ...]
 * - New: [{email: "...", timestamp: "...", ip: "..."}, ...]
 *
 * The migration is idempotent and runs if:
 * - No marker file exists OR
 * - Database table is empty (even if marker exists)
 */

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

const EMAILS_JSON_PATH = '/app/data/emails.json';
const MIGRATED_MARKER_PATH = '/app/data/emails.json.migrated';

interface EmailEntry {
  email: string;
  timestamp?: string;
  ip?: string;
}

type EmailInput = string | EmailEntry;

async function getPrisma() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

function parseEmailEntry(entry: EmailInput): EmailEntry | null {
  if (typeof entry === 'string') {
    return { email: entry };
  }
  if (entry && typeof entry === 'object' && 'email' in entry) {
    return entry as EmailEntry;
  }
  return null;
}

async function migrateEmails() {
  console.log('📧 Checking for emails to migrate...');

  const prisma = await getPrisma();

  // Check if database has any subscribers - if empty, always run migration
  const existingCount = await prisma.emailSubscriber.count();
  const dbIsEmpty = existingCount === 0;

  // Skip if marker exists AND database is not empty
  if (existsSync(MIGRATED_MARKER_PATH) && !dbIsEmpty) {
    console.log(`✅ Emails already migrated (marker exists, ${existingCount} in DB)`);
    await prisma.$disconnect();
    return;
  }

  if (dbIsEmpty) {
    console.log('🔄 Database is empty - running migration regardless of marker');
  }

  // Check if emails.json exists
  if (!existsSync(EMAILS_JSON_PATH)) {
    console.log('ℹ️  No emails.json file found - skipping migration');
    await writeFile(MIGRATED_MARKER_PATH, new Date().toISOString());
    await prisma.$disconnect();
    return;
  }

  // Read emails from JSON
  let entries: EmailInput[];
  try {
    const content = await readFile(EMAILS_JSON_PATH, 'utf-8');
    entries = JSON.parse(content);
  } catch (error) {
    console.error('❌ Failed to read emails.json:', error);
    await prisma.$disconnect();
    return;
  }

  if (!Array.isArray(entries) || entries.length === 0) {
    console.log('ℹ️  No emails in emails.json - skipping migration');
    await writeFile(MIGRATED_MARKER_PATH, new Date().toISOString());
    await prisma.$disconnect();
    return;
  }

  console.log(`📋 Found ${entries.length} email(s) to migrate`);

  let migrated = 0;
  let skipped = 0;

  for (const entry of entries) {
    const parsed = parseEmailEntry(entry);

    if (!parsed || !parsed.email || !parsed.email.includes('@')) {
      console.log(`⚠️  Skipping invalid entry:`, entry);
      skipped++;
      continue;
    }

    const { email, timestamp, ip } = parsed;

    try {
      // Check if email already exists
      const existing = await prisma.emailSubscriber.findUnique({
        where: { email }
      });

      if (existing) {
        console.log(`ℹ️  Email already exists: ${email}`);
        skipped++;
      } else {
        // Parse timestamp if available
        let subscribedAt: Date | undefined;
        if (timestamp) {
          try {
            subscribedAt = new Date(timestamp);
            if (isNaN(subscribedAt.getTime())) {
              subscribedAt = undefined;
            }
          } catch {
            subscribedAt = undefined;
          }
        }

        // Create new subscriber
        await prisma.emailSubscriber.create({
          data: {
            email,
            status: 'active',
            ipAddress: ip || null,
            subscribedAt: subscribedAt || new Date(),
            metadata: {
              migratedFrom: 'emails.json',
              migratedAt: new Date().toISOString(),
              originalTimestamp: timestamp || null
            }
          }
        });
        console.log(`✅ Migrated: ${email}${subscribedAt ? ` (${subscribedAt.toISOString()})` : ''}`);
        migrated++;
      }
    } catch (error: any) {
      if (error.code?.includes('P2002')) {
        console.log(`ℹ️  Email already exists: ${email}`);
        skipped++;
      } else {
        console.error(`❌ Error migrating ${email}:`, error.message);
      }
    }
  }

  await prisma.$disconnect();

  // Write marker file to prevent re-migration (unless DB gets emptied again)
  await writeFile(MIGRATED_MARKER_PATH, JSON.stringify({
    migratedAt: new Date().toISOString(),
    total: entries.length,
    migrated,
    skipped
  }, null, 2));

  console.log(`\n📊 Migration complete: ${migrated} migrated, ${skipped} skipped`);
}

// Run migration
migrateEmails().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
