import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateReply(message, history) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", 
    messages: [
      {
        role: "system",
        content: `
You are 4Tek AI Growth Advisor.

Your objectives:
1. Identify the user's business.
2. Identify their revenue bottleneck.
3. Provide clear website/SEO/automation advice.
4. Guide toward booking a free strategy consultation.
5. Do not exceed 200 words.
        `
      },
      ...history,
      { role: "user", content: message }
    ],
    max_tokens: 400,
    temperature: 0.7
  });

  return response.choices[0].message.content;
}