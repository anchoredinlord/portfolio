import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Zod schema ────────────────────────────────────────────────
const schema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email().max(200),
  subject: z.string().min(5).max(200),
  message: z.string().min(20).max(5000),
});

// ── In-memory rate limiter ────────────────────────────────────
// Allows MAX_REQUESTS per IP within WINDOW_MS.
// The Map is shared across requests in the same serverless instance.
const WINDOW_MS      = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS   = 5;              // max submissions per window

const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now  = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // First request or window expired — reset
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) return true;

  entry.count += 1;
  return false;
}

// ── Helper: get real client IP ────────────────────────────────
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ── POST handler ──────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Rate limit check
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please wait a few minutes and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(WINDOW_MS / 1000)),
        },
      }
    );
  }

  // 2. Parse & validate body
  let data: z.infer<typeof schema>;
  try {
    const body = await req.json();
    data = schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  // 3. Send emails via Resend
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // ── Notify you ──
    await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>",
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
          <p style="color:#9ca3af;font-size:12px;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    // ── Auto-reply to sender ──
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
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
