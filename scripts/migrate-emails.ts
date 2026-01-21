/**
 * Migration Script: emails.json -> PostgreSQL email_subscribers table
 *
 * This script reads emails from /app/data/emails.json and migrates them
 * to the database if they don't already exist.
 */

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

const EMAILS_JSON_PATH = '/app/data/emails.json';
const MIGRATED_MARKER_PATH = '/app/data/emails.json.migrated';

async function getPrisma() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

async function migrateEmails() {
  console.log('📧 Checking for emails to migrate...');

  // Skip if already migrated
  if (existsSync(MIGRATED_MARKER_PATH)) {
    console.log('✅ Emails already migrated (marker file exists)');
    return;
  }

  // Check if emails.json exists
  if (!existsSync(EMAILS_JSON_PATH)) {
    console.log('ℹ️  No emails.json file found - skipping migration');
    // Create empty marker to prevent re-checking
    await writeFile(MIGRATED_MARKER_PATH, new Date().toISOString());
    return;
  }

  // Read emails from JSON
  let emails: string[];
  try {
    const content = await readFile(EMAILS_JSON_PATH, 'utf-8');
    emails = JSON.parse(content);
  } catch (error) {
    console.error('❌ Failed to read emails.json:', error);
    return;
  }

  if (!Array.isArray(emails) || emails.length === 0) {
    console.log('ℹ️  No emails in emails.json - skipping migration');
    await writeFile(MIGRATED_MARKER_PATH, new Date().toISOString());
    return;
  }

  console.log(`📋 Found ${emails.length} email(s) to migrate`);

  // Migrate to database
  const prisma = await getPrisma();
  let migrated = 0;
  let skipped = 0;

  for (const email of emails) {
    if (typeof email !== 'string' || !email.includes('@')) {
      console.log(`⚠️  Skipping invalid email: ${email}`);
      skipped++;
      continue;
    }

    try {
      // Check if email already exists
      const existing = await prisma.emailSubscriber.findUnique({
        where: { email }
      });

      if (existing) {
        console.log(`ℹ️  Email already exists: ${email}`);
        skipped++;
      } else {
        // Create new subscriber
        await prisma.emailSubscriber.create({
          data: {
            email,
            status: 'active',
            metadata: { migratedFrom: 'emails.json', migratedAt: new Date().toISOString() }
          }
        });
        console.log(`✅ Migrated: ${email}`);
        migrated++;
      }
    } catch (error: any) {
      if (error.code?.includes('P2002')) {
        // Unique constraint violation - email already exists
        console.log(`ℹ️  Email already exists: ${email}`);
        skipped++;
      } else {
        console.error(`❌ Error migrating ${email}:`, error.message);
      }
    }
  }

  await prisma.$disconnect();

  // Write marker file to prevent re-migration
  await writeFile(MIGRATED_MARKER_PATH, JSON.stringify({
    migratedAt: new Date().toISOString(),
    total: emails.length,
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
