// LensVerse — POST /api/contact
// Validates a visitor's contact form submission, stores it as a Message,
// and emails a notification to the site owner via Resend.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend, fromEmail, adminEmail } from "@/lib/resend";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactFormSchema.parse(body);

    const savedMessage = await prisma.message.create({
      data: {
        name:    data.name,
        email:   data.email,
        phone:   data.phone,
        subject: data.subject,
        message: data.message,
      },
    });

    // Email delivery failures shouldn't fail the whole request — the message
    // is already saved, so the visitor still gets a success response either way.
    try {
      await resend.emails.send({
        from:    fromEmail,
        to:      adminEmail,
        replyTo: data.email,
        subject: `New contact message: ${data.subject}`,
        text:
          `From: ${data.name} <${data.email}>\n` +
          `Phone: ${data.phone ?? "—"}\n\n` +
          `${data.message}`,
      });
    } catch (emailError) {
      console.error("POST /api/contact — email notification failed:", emailError);
    }

    return NextResponse.json({ id: savedMessage.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Please check the form — some fields aren't valid." },
        { status: 400 }
      );
    }
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again." },
      { status: 500 }
    );
  }
}
