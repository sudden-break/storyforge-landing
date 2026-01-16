import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const EMAILS_FILE = path.join(process.cwd(), 'data', 'emails.json');

interface EmailEntry {
  email: string;
  timestamp: string;
  ip?: string;
}

// Initialisiere emails.json wenn nicht vorhanden
async function ensureEmailsFile() {
  try {
    await fs.access(EMAILS_FILE);
  } catch {
    await fs.mkdir(path.dirname(EMAILS_FILE), { recursive: true });
    await fs.writeFile(EMAILS_FILE, JSON.stringify([], null, 2));
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureEmailsFile();

    const { email } = await request.json();

    // Validierung
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    // Vorhandene Emails laden
    const data = await fs.readFile(EMAILS_FILE, 'utf-8');
    const emails: EmailEntry[] = JSON.parse(data);

    // Check für Duplikate
    if (emails.some(entry => entry.email === email)) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    // Neue Email hinzufügen
    const newEntry: EmailEntry = {
      email,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || undefined
    };

    emails.push(newEntry);

    // Speichern
    await fs.writeFile(EMAILS_FILE, JSON.stringify(emails, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
