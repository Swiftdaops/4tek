import { NextResponse } from 'next/server';

const RESEND_URL = 'https://api.resend.com/emails';

export async function POST(req) {
  try {
    const body = await req.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing RESEND_API_KEY on server' }, { status: 500 });
    }

    const from = process.env.RESEND_FROM || 'no-reply@upgradedbyobi.store';
    const to = process.env.ADMIN_EMAIL || 'admin@upgradedbyobi.store';

    const html = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#0f172a;">
        <div style="max-width:700px;margin:0 auto;padding:24px;border-radius:12px;background:#fff;border:1px solid #eef2ff;">
          <h2 style="margin:0 0 8px;color:#0f172a;font-size:20px">New Consultation Request</h2>
          <p style="margin:0 0 16px;color:#475569">A new consultation form was submitted. Details below.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0f172a">
            <tbody>
              <tr><td style="padding:6px 8px;font-weight:600;width:180px">Full name</td><td style="padding:6px 8px">${escapeHtml(body.fullName || '')}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Business</td><td style="padding:6px 8px">${escapeHtml(body.businessName || '')}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Phone</td><td style="padding:6px 8px">${escapeHtml(body.phone || '')}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Email</td><td style="padding:6px 8px">${escapeHtml(body.email || '')}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Country</td><td style="padding:6px 8px">${escapeHtml(body.country || '')}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Selling Channels</td><td style="padding:6px 8px">${escapeHtml(Array.isArray(body.sellingChannels) ? body.sellingChannels.join(', ') : String(body.sellingChannels || ''))}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Website</td><td style="padding:6px 8px">${escapeHtml(body.websiteHas || '')}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Budget</td><td style="padding:6px 8px">${escapeHtml(typeof body.budget === 'string' ? body.budget : JSON.stringify(body.budget || ''))}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Biggest challenge</td><td style="padding:6px 8px">${escapeHtml(body.biggestChallenge || '')}</td></tr>
            </tbody>
          </table>
          <div style="margin-top:18px;color:#6b7280;font-size:13px">This email was generated automatically by the website form.</div>
        </div>
      </div>
    `;

    const payload = {
      from,
      to,
      subject: `New consultation: ${body.fullName || body.email || 'Unknown'}`,
      html,
    };

    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send email', detail: text }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', detail: String(err) }, { status: 500 });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
