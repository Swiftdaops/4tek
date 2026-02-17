import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Usage from "@/lib/models/Usage";
import { generateReply } from "@/lib/openai";

export async function POST(req) {
  try {
    await connectDB();
  } catch (e) {
    // Avoid leaking secrets; log server-side for debugging.
    console.error("[api/chat] connectDB failed", e);

    const message =
      e?.message?.includes("Missing MONGO_URI")
        ? "Server is missing MONGO_URI configuration."
        : "Database connection failed. Check MONGO_URI (username/password/database name).";

    return NextResponse.json(
      { reply: message },
      { status: 500 }
    );
  }

  const { message, history } = await req.json();
  const forwardedFor = req.headers.get("x-forwarded-for") || "";
  const ip = (forwardedFor.split(",")[0] || "").trim() || "unknown";

  if (!message || typeof message !== "string") {
    return NextResponse.json({ reply: "Please enter a message." }, { status: 400 });
  }

  const trimmed = message.trim().slice(0, 800);
  const safeHistory = Array.isArray(history) ? history.slice(-12) : [];

  let user = await Usage.findOne({ ip });

  if (!user) {
    user = await Usage.create({ ip });
  }

  if (user.messagesUsed >= 10) {
    return NextResponse.json({
      reply:
        "You've reached the free advisory limit. Book your free 20-minute strategy consultation here: /get-started",
      limitReached: true,
      remaining: 0,
    });
  }

  user.messagesUsed += 1;
  user.lastMessageAt = new Date();
  await user.save();

  let reply = "";
  try {
    reply = await generateReply(trimmed, safeHistory);
  } catch (e) {
    console.error("OPENAI FULL ERROR:", e);
    return NextResponse.json(
      { reply: e.message || "AI provider error." },
      { status: 500 }
    );
  }

  // Send a copy of the chat submission + AI reply to admin email (Resend)
  (async function sendAdminNotification() {
    try {
      const RESEND_URL = 'https://api.resend.com/emails';
      const apiKey = process.env.RESEND_API_KEY;
      const fromAddr = process.env.RESEND_FROM || 'no-reply@upgradedbyobi.store';
      const to = process.env.ADMIN_EMAIL || 'admin@upgradedbyobi.store';

      if (!apiKey) return;

      const html = `<div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#0f172a;"><div style="max-width:700px;margin:0 auto;padding:24px;border-radius:12px;background:#fff;border:1px solid #eef2ff;"><h2>AI Chat Submission</h2><p><strong>Message:</strong></p><div style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px">${escapeHtml(trimmed)}</div><p><strong>AI Reply:</strong></p><div style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px">${escapeHtml(reply)}</div><p><strong>IP:</strong> ${escapeHtml(ip)}</p><p><strong>Time:</strong> ${new Date().toISOString()}</p></div></div>`;

      await fetch(RESEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ from: fromAddr, to, subject: 'AI Chat Submission', html }),
      });
    } catch (err) {
      console.error('Failed to send admin chat notification', err);
    }
  })();

  return NextResponse.json({
    reply,
    remaining: 10 - user.messagesUsed,
  });

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}