import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const update = await req.json();

  console.log("Telegram Update:", update);

  // Prepare a small summary for admin email/telegram
  try {
    const from = update?.message?.from || update?.callback_query?.from || null;
    const text = update?.message?.text || update?.edited_message?.text || update?.callback_query?.data || '';
    const fullName = from ? `${from.first_name || ''} ${from.last_name || ''}`.trim() : 'Telegram User';

    // Send admin email (Resend) if configured
    try {
      const RESEND_URL = 'https://api.resend.com/emails';
      const apiKey = process.env.RESEND_API_KEY;
      const fromAddr = process.env.RESEND_FROM || 'no-reply@upgradedbyobi.store';
      const to = process.env.ADMIN_EMAIL || 'admin@upgradedbyobi.store';

      if (apiKey) {
        const html = `<div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#0f172a;"><div style="max-width:700px;margin:0 auto;padding:24px;border-radius:12px;background:#fff;border:1px solid #eef2ff;"><h2>Telegram update received</h2><p><strong>From:</strong> ${escapeHtml(fullName)}</p><p><strong>ID:</strong> ${escapeHtml(String(from?.id || ''))}</p><p><strong>Text:</strong></p><div style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px">${escapeHtml(String(text))}</div></div></div>`;

        await fetch(RESEND_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ from: fromAddr, to, subject: `Telegram update from ${fullName}`, html }),
        });
      }
    } catch (err) {
      console.error('Failed to forward Telegram update to email', err);
    }

    // Also forward a small message to admin Telegram chat (if configured)
    try {
      const botToken = process.env.BOT_TOKEN;
      const adminChat = process.env.ADMIN_TELEGRAM_CHAT_ID;
      if (botToken && adminChat) {
        const summary = `Telegram update from ${fullName} (id: ${from?.id || 'n/a'})\n\n${String(text).slice(0, 1600)}`;
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: adminChat, text: summary }),
        });
      }
    } catch (err) {
      console.error('Failed to send admin Telegram message', err);
    }

    // Attempt to pass the update into the local bot handlers if available
    try {
      const mod = await import('../../bots/telegrambot.js');
      if (mod && typeof mod.handleUpdate === 'function') {
        await mod.handleUpdate(update);
      }
    } catch (err) {
      // Non-fatal: bot handlers may not be available in this environment
      console.error('Failed to run local bot handlers', err);
    }
  } catch (err) {
    console.error('Error processing telegram update', err);
  }

  return NextResponse.json({ ok: true });

  function escapeHtml(str: any) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}