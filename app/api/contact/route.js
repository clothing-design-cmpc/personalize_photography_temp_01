// ============================================================
// API Route: POST /api/contact
// Receives contact form data, validates it, and returns success
// In production: connect to email service (e.g. Resend, SendGrid)
// ============================================================

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Server-side validation
    const { firstName, lastName, email, message } = body;

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Required fields are missing.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // TODO: In production, integrate email service here
    // Example using Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'concierge@islaserena.com.ph',
    //   to: 'reservations@islaserena.com.ph',
    //   subject: `New enquiry from ${firstName} ${lastName}`,
    //   html: `<p>From: ${email}</p><p>${message}</p>`
    // });

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Contact Form] New enquiry:', {
        name: `${firstName} ${lastName}`,
        email,
        subject: body.subject,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        guests: body.guests,
        messagePreview: message.substring(0, 100),
      });
    }

    return NextResponse.json(
      { success: true, message: 'Your enquiry has been received. We will respond within 4 hours.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
