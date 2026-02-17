import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const payload = await req.json();

    const subject = payload.subject || 'Inbound email';
    const from = (payload.from && payload.from.value && payload.from.value[0]?.address) || payload.from || 'unknown';
    const text = payload.text || payload.plain || (payload.html ? '(html content)' : '');
    const html = payload.html || undefined;

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM || 'no-reply@upgradedbyobi.store';
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@upgradedbyobi.store';

    // Forward inbound email to admin via Resend
    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: RESEND_FROM,
            to: [ADMIN_EMAIL],
            subject: `[Inbound] ${subject}`,
            text: `From: ${from}\n\n${text}`,
            html: html ? `<p>From: ${from}</p>${html}` : `<pre>From: ${from}\n\n${text}</pre>`,
          }),
        });
      } catch (err) {
        console.error('Failed to forward inbound email via Resend', err);
      }
    }

    // Send a short Telegram summary to admin chat
    try {
      const BOT_TOKEN = process.env.BOT_TOKEN;
      const ADMIN_TELEGRAM_CHAT_ID = process.env.ADMIN_TELEGRAM_CHAT_ID;
      if (BOT_TOKEN && ADMIN_TELEGRAM_CHAT_ID) {
        const summary = `📨 Inbound email\nFrom: ${from}\nSubject: ${subject}\n\n${(text || '').slice(0,800)}${(text||'').length>800?'…':''}`;
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: ADMIN_TELEGRAM_CHAT_ID, text: summary, disable_web_page_preview: true }),
        });
      }
    } catch (err) {
      console.error('Failed to send inbound email summary to Telegram', err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('inbound-email error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
