import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validierung
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    // Prüfen ob Email bereits existiert
    const existing = await prisma.emailSubscriber.findUnique({
      where: { email }
    });

    if (existing) {
      // Wenn bereits unsubscribed, reaktivieren
      if (existing.status === 'unsubscribed') {
        await prisma.emailSubscriber.update({
          where: { email },
          data: {
            status: 'active',
            subscribedAt: new Date(),
          }
        });
        return NextResponse.json({ success: true, message: 'Email reactivated' });
      }

      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    // Neue Email hinzufügen
    await prisma.emailSubscriber.create({
      data: {
        email,
        ipAddress: request.headers.get('x-forwarded-for') || null,
        userAgent: request.headers.get('user-agent') || null,
        referralSource: request.headers.get('referer') || null,
        status: 'active',
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
