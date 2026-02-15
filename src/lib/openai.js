import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

const openai = apiKey ? new OpenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `You are 4Tek AI Growth Advisor.

Your objective:
1. Identify the user's business type.
2. Identify their growth bottleneck.
3. Explain why a structured web/SEO/automation system is required.
4. Provide value without oversharing.
5. Encourage booking a free strategy consultation within 10 messages.

Constraints:
- Be strategic and concise.
- Ask one strong question at a time.
- Do not exceed 200 words.`;

export async function generateReply(message, history = []) {
  if (!openai) {
    throw new Error("Missing OPENAI_API_KEY environment variable");
  }

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: message },
    ],
    max_tokens: 400,
    temperature: 0.7,
  });

  return response.choices?.[0]?.message?.content?.trim() || "";
}
