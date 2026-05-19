import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Lazy import — only runs at request time, not at build time
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // ── Send email to YOU (Damoze) ──────────────────────────
    await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>",  // free Resend sender
      to:      process.env.CONTACT_EMAIL ?? "damozemotumaguyasa@gmail.com",
      subject: `[Portfolio] ${data.subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#7c3aed;margin-bottom:4px;">New message from your portfolio</h2>
          <hr style="border:1px solid #e5e7eb;margin:16px 0"/>

          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Subject:</strong> ${data.subject}</p>

          <hr style="border:1px solid #e5e7eb;margin:16px 0"/>

          <h3 style="color:#374151;">Message</h3>
          <p style="color:#4b5563;line-height:1.7;white-space:pre-wrap;">${data.message}</p>

          <hr style="border:1px solid #e5e7eb;margin:16px 0"/>
          <p style="color:#9ca3af;font-size:12px;">
            Sent from your portfolio contact form at damozemotuma.dev
          </p>
        </div>
      `,
    });

    // ── Send auto-reply to the person who contacted you ─────
    await resend.emails.send({
      from:    "Damoze Motuma <onboarding@resend.dev>",
      to:      data.email,
      subject: `Re: ${data.subject} — I got your message!`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#7c3aed;">Hi ${data.name}, thanks for reaching out!</h2>
          <p style="color:#4b5563;line-height:1.7;">
            I received your message and will get back to you within 24 hours.
          </p>

          <div style="background:#f5f3ff;border-left:4px solid #7c3aed;padding:16px;margin:20px 0;border-radius:4px;">
            <p style="color:#6b7280;font-size:14px;margin:0;"><strong>Your message:</strong></p>
            <p style="color:#4b5563;margin:8px 0 0;white-space:pre-wrap;">${data.message}</p>
          </div>

          <p style="color:#4b5563;">Best regards,<br/>
            <strong>Damoze Motuma</strong><br/>
            Senior Software Engineer<br/>
            <a href="mailto:damozemotumaguyasa@gmail.com" style="color:#7c3aed;">
              damozemotumaguyasa@gmail.com
            </a>
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
