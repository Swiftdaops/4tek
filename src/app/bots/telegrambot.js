"use client";

require("dotenv").config();
const { Telegraf, Markup, session } = require("telegraf");
const mongoose = require("mongoose");
const OpenAI = require("openai");

// ---------------------------
// MongoDB Connection & Session
// ---------------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sessionSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  industry: String,
  knowledgeLevel: String,
  pastQuestions: [String],
  lastCategory: String,
}, { timestamps: true });

const SessionModel = mongoose.model("BotSession", sessionSchema);

// Custom MongoDB session middleware
const mongoSessionMiddleware = async (ctx, next) => {
  if (!ctx.from) return next();
  const userId = ctx.from.id;
  let sessionDoc = await SessionModel.findOne({ userId });
  if (!sessionDoc) {
    sessionDoc = await SessionModel.create({
      userId,
      pastQuestions: [],
    });
  }
  ctx.session = sessionDoc;
  await next();
  await ctx.session.save();
};

// ---------------------------
// Bot Initialization
// ---------------------------
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
bot.use(mongoSessionMiddleware);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---------------------------
// Industry Options & Menu
// ---------------------------
const industries = ["Restaurant", "Retail", "Hotel", "Manufacturing", "Other"];

const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback("Industry Guidance", "industry")],
  [Markup.button.callback("SEO Tips", "seo")],
  [Markup.button.callback("Automation Advice", "automation")],
  [Markup.button.callback("Payment Systems", "payments")],
  [Markup.button.callback("Learn From Scratch", "beginner")],
]);

// ---------------------------
// Start Command
// ---------------------------
bot.start((ctx) => {
  ctx.session.industry = null;
  ctx.session.knowledgeLevel = null;
  ctx.session.pastQuestions = [];
  ctx.session.lastCategory = null;

  ctx.reply(
    `👋 Hello ${ctx.from.first_name}! Welcome to *4Tek – Advisor* 🤖

I help business owners get websites, SaaS platforms, automation systems, SEO, and payment solutions—step by step. No technical knowledge required!`,
    mainMenu
  );
});

// ---------------------------
// Beginner Friendly Flow
// ---------------------------
bot.action("beginner", (ctx) => {
  ctx.session.knowledgeLevel = "beginner";
  ctx.editMessageText(
    "No problem! Let's start simple. Are you here to:\n\n- Learn about websites\n- Learn about automation\n- Learn about SEO\n- Learn about payments",
    Markup.inlineKeyboard([
      [Markup.button.callback("Websites", "web")],
      [Markup.button.callback("Automation", "automation")],
      [Markup.button.callback("SEO", "seo")],
      [Markup.button.callback("Payments", "payments")],
    ])
  );
});

// ---------------------------
// Industry Selection Flow
// ---------------------------
bot.action("industry", (ctx) => {
  ctx.editMessageText(
    "Select your industry:",
    Markup.inlineKeyboard(
      industries.map((ind) => [Markup.button.callback(ind, `industry_${ind}`)])
    )
  );
});

industries.forEach((ind) => {
  bot.action(`industry_${ind}`, (ctx) => {
    ctx.session.industry = ind;
    ctx.editMessageText(
      `You selected: *${ind}*.\nWhat would you like help with?`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Website Setup", "web")],
        [Markup.button.callback("SEO & Visibility", "seo")],
        [Markup.button.callback("Automation & Workflow", "automation")],
        [Markup.button.callback("Payments & Checkout", "payments")],
      ])
    );
  });
});

// ---------------------------
// OpenAI Helper Function
// ---------------------------
async function askAI(question, ctx) {
  const industry = ctx.session.industry || "General";
  const knowledge = ctx.session.knowledgeLevel || "intermediate";

  // Save question to history
  ctx.session.pastQuestions.push(question);
  ctx.session.lastCategory = ctx.session.lastCategory || "general";

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are 4Tek's AI consultant. Provide step-by-step, easy-to-follow advice for ${industry} business owners. 
Explain technical concepts in simple language suitable for someone with ${knowledge} knowledge. 
Always include examples and practical steps for implementing websites, SaaS, SEO, automation, payments, and UX/UI improvements.`,
      },
      {
        role: "user",
        content: question,
      },
    ],
    temperature: 0.7,
    max_tokens: 700,
  });

  return response.choices[0].message.content;
}

// ---------------------------
// Category Guidance
// ---------------------------
bot.action(/web|seo|automation|payments/, async (ctx) => {
  const category = ctx.match[0];
  ctx.session.lastCategory = category;

  let question = "";
  const industry = ctx.session.industry || "General";

  switch (category) {
    case "web":
      question = `Guide a ${industry} business owner to set up a website, from zero knowledge. Step-by-step instructions with examples.`;
      break;
    case "seo":
      question = `Provide SEO strategies for a ${industry} business website. Explain clearly, with practical examples.`;
      break;
    case "automation":
      question = `Explain automation tools and workflow improvements for a ${industry} business. Include simple steps and examples.`;
      break;
    case "payments":
      question = `Explain payment methods, APIs, and checkout best practices for a ${industry} business owner.`;
      break;
  }

  ctx.reply("🤖 Let me prepare your personalized guide...");
  try {
    const answer = await askAI(question, ctx);
    ctx.reply(answer, mainMenu);
  } catch (err) {
    console.error(err);
    ctx.reply("❌ Something went wrong. Please try again.", mainMenu);
  }
});

// ---------------------------
// Free Text Questions
// ---------------------------
bot.on("text", async (ctx) => {
  ctx.reply("🤖 Thinking carefully...");
  try {
    const answer = await askAI(ctx.message.text, ctx);
    ctx.reply(answer, mainMenu);
  } catch (err) {
    console.error(err);
    ctx.reply("❌ Sorry, I couldn't process your question.", mainMenu);
  }
});

// ---------------------------
// Launch Bot
// ---------------------------
bot.launch();
console.log("🤖 4Tek – Advisor AI Bot is live and running!");