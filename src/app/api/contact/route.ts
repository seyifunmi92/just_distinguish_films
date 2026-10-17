import { NextResponse } from "next/server";

const TO = "moradekeadegboyega@justdistinguishfilms.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "That request could not be read." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field, people never see it. Pretend success and drop it.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const name = text(body.name, 120);
  const email = text(body.email, 200);
  // Strip line breaks so a subject can never inject extra mail headers.
  const subject = text(body.subject, 160).replace(/[\r\n]+/g, " ");
  const message = text(body.message, 4000);

  if (!name || !subject || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please fill in every field with a valid email address." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) {
    // Delivery is not configured: tell the page to fall back to the visitor's own mail app.
    return NextResponse.json({ ok: false, fallback: true }, { status: 501 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [TO],
        reply_to: email,
        subject: `[Website] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "We could not send your message right now. Please email us directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "We could not send your message right now. Please email us directly." }, { status: 502 });
  }
}
