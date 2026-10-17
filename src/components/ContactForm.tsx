"use client";

import { useState, type FormEvent } from "react";
import { EMAIL } from "@/data/site";
import { ArrowIcon } from "./icons";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "fallback" }
  | { kind: "error"; message: string };

type Fields = { name: string; email: string; subject: string; message: string; website: string };

function openMailApp(f: Fields) {
  const subject = encodeURIComponent(f.subject || "Hello from the website");
  const body = encodeURIComponent(`${f.message}\n\n${f.name}\n${f.email}`);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as unknown as Fields;
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        setStatus({ kind: "sent" });
        return;
      }
      if (res.status === 501) {
        // Email delivery is not configured on the server yet: hand the message to the visitor's mail app.
        openMailApp(data);
        setStatus({ kind: "fallback" });
        return;
      }
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setStatus({ kind: "error", message: body?.error ?? "Something went wrong. Please try again or email us directly." });
    } catch {
      setStatus({ kind: "error", message: "We could not reach the server. Please try again or email us directly." });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-7" noValidate={false}>
      <div className="grid gap-7 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-subject">Subject</label>
        <input id="contact-subject" name="subject" type="text" required maxLength={160} />
      </div>
      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" required maxLength={4000} rows={5} />
      </div>

      {/* Honeypot: real visitors never see or fill this. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" disabled={sending} className="cta cta-primary disabled:opacity-60">
          <span>{sending ? "Sending" : "Send message"}</span>
          <ArrowIcon className="cta-arrow" />
        </button>
        <p role="status" aria-live="polite" className="min-w-0 flex-1 text-sm leading-relaxed text-smoke">
          {status.kind === "sent" && "Thank you. Your message is on its way to Just Distinguish Films."}
          {status.kind === "fallback" && "Your email app should now be open with your message ready to send. If nothing opened, write to us directly at the address above."}
          {status.kind === "error" && <span className="text-ember">{status.message}</span>}
        </p>
      </div>
    </form>
  );
}
