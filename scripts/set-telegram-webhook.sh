#!/usr/bin/env bash
set -euo pipefail

# Usage:
# BOT_TOKEN=123:abc ./scripts/set-telegram-webhook.sh https://your-domain.example.com/api/telegram

if [ -z "${BOT_TOKEN:-}" ]; then
  echo "Error: BOT_TOKEN environment variable is required"
  exit 1
fi

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <webhook-url>"
  exit 1
fi

WEBHOOK_URL="$1"
API="https://api.telegram.org/bot${BOT_TOKEN}"

echo "Setting Telegram webhook to: $WEBHOOK_URL"

# setWebhook
curl -s -X POST "$API/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$WEBHOOK_URL\"}" | sed -n '1,200p'

echo "\nCurrent webhook info:"
curl -s "$API/getWebhookInfo" | sed -n '1,200p'

echo "\nDone. If the response shows ok: true, Telegram will POST updates to the webhook URL." 
