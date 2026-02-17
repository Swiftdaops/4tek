#!/usr/bin/env node
// Usage: BOT_TOKEN=123:abc node scripts/set-telegram-webhook.js https://your-domain/api/telegram

(async function () {
  const token = process.env.BOT_TOKEN;
  const url = process.argv[2];

  if (!token) {
    console.error('Error: BOT_TOKEN environment variable is required');
    process.exit(1);
  }
  if (!url) {
    console.error('Usage: node scripts/set-telegram-webhook.js <webhook-url>');
    process.exit(1);
  }

  const api = `https://api.telegram.org/bot${token}`;
  try {
    const setRes = await fetch(`${api}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    console.log('setWebhook ->', await setRes.json());

    const infoRes = await fetch(`${api}/getWebhookInfo`);
    console.log('getWebhookInfo ->', await infoRes.json());
  } catch (err) {
    console.error('Request failed', err);
    process.exit(1);
  }
})();
