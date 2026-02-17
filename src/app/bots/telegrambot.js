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

// Profile for onboarding and tracking
const profileSchema = new mongoose.Schema({
  chatId: { type: Number, unique: true },
  state: { type: String, default: "awaiting_name" },
  name: String,
  email: String,
  forwarded: { type: Boolean, default: false },
  convId: String,
}, { timestamps: true });
const ProfileModel = mongoose.model("TelegramProfile", profileSchema);

// Conversation messages
const convoSchema = new mongoose.Schema({
  chatId: Number,
  role: String,
  text: String,
  ts: { type: Date, default: Date.now },
});
const ConvoModel = mongoose.model("TelegramConvo", convoSchema);

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
// Utility: validate email
function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || "").trim());
}

// Helper to append convo
async function appendConvo(chatId, role, text) {
  try {
    await ConvoModel.create({ chatId, role, text });
  } catch (e) {
    console.error('appendConvo error', e);
  }
}

// get full convo for chatId
async function getConvo(chatId) {
  return ConvoModel.find({ chatId }).sort({ ts: 1 }).lean();
}

bot.on("text", async (ctx) => {
  const chatId = ctx.from && ctx.chat && ctx.chat.id;
  const text = (ctx.message && ctx.message.text) ? String(ctx.message.text).trim() : "";
  if (!chatId) return;

  // fetch or create profile
  let profile = await ProfileModel.findOne({ chatId });
  if (!profile) {
    profile = await ProfileModel.create({ chatId, state: 'awaiting_name' });
    await ctx.reply("Welcome to 4Tek support — what's your full name?");
    return;
  }

  // onboarding flow
  if (profile.state === 'awaiting_name') {
    const name = text || 'Guest';
    profile.name = name;
    profile.state = 'awaiting_email';
    await profile.save();
    await appendConvo(chatId, 'user', `name: ${name}`);
    await ctx.reply(`Thanks ${name}. Please provide your email address so we can follow up.`);
    return;
  }

  if (profile.state === 'awaiting_email') {
    if (!isEmail(text)) {
      await ctx.reply("That doesn't look like an email. Please enter a valid email address (e.g. you@example.com).");
      return;
    }
    profile.email = text;
    profile.state = 'chatting';
    await profile.save();
    await appendConvo(chatId, 'user', `email: ${text}`);

    // offer Request Live Chat button
    await ctx.reply(
      `Thanks — you're all set. Ask me anything. When you're ready for a human agent, press Request Live Chat.`,
      Markup.inlineKeyboard([[Markup.button.callback('Request Live Chat', 'request_live')]])
    );
    return;
  }

  // chatting state
  if (profile.state === 'chatting') {
    // store user message
    await appendConvo(chatId, 'user', text);
    // reply via AI
    try {
      const history = await getConvo(chatId);
      const res = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: `You are 4Tek's AI consultant. Provide step-by-step, easy-to-follow advice.` },
          ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'assistant', content: h.text })),
          { role: 'user', content: text },
        ],
        temperature: 0.7,
        max_tokens: 700,
      });
      const reply = res?.choices?.[0]?.message?.content || 'Thanks — we will get back to you shortly.';
      await appendConvo(chatId, 'assistant', reply);
      await ctx.reply(reply);
    } catch (err) {
      console.error('AI reply error', err);
      await ctx.reply("Sorry, I'm having trouble generating a reply right now. An agent will assist you if you request Live Chat.");
    }
    return;
  }

  // fallback
  await ctx.reply("Hello — please type /start to begin.");
});

// ---------------------------
// Export webhook-friendly handlers
// ---------------------------
// Do not auto-launch the bot in serverless routes. Provide helpers instead:
async function handleUpdate(update) {
  try {
    // Telegraf can process raw update objects
    // Intercept callback_query for 'request_live' to forward convo to admin
    if (update.callback_query && update.callback_query.data === 'request_live') {
      const chatId = update.callback_query.message.chat.id;
      try {
        const profile = await ProfileModel.findOne({ chatId });
        const conv = await getConvo(chatId);
        const convId = `conv_${Date.now()}`;
        // send to admin
        const ADMIN_CHAT = process.env.ADMIN_TELEGRAM_CHAT_ID;
        if (ADMIN_CHAT) {
          const textLines = conv.map(m => `${m.role === 'user' ? 'User' : 'Bot'}: ${m.text}`).join('\n');
          const payload = `<b>New Live Chat</b>\nConv: ${convId}\nName: ${profile?.name || '—'}\nEmail: ${profile?.email || '—'}\nChatId: ${chatId}\n\nConversation:\n${textLines.slice(0,3800)}`;
          await bot.telegram.sendMessage(ADMIN_CHAT, payload, { parse_mode: 'HTML' });
        }
        // mark forwarded
        if (profile) { profile.forwarded = true; profile.convId = convId; await profile.save(); }
        // ack user
        await bot.telegram.answerCbQuery(update.callback_query.id, 'Live chat requested — connecting you to support');
        await bot.telegram.sendMessage(chatId, `Thanks — your chat has been forwarded to @fourtekhepdesk. An agent will join shortly.`);
        return;
      } catch (err) {
        console.error('request_live handling error', err);
      }
    }

    await bot.handleUpdate(update);
  } catch (err) {
    console.error('bot.handleUpdate error', err);
  }
}

function startPolling() {
  // Optional helper to start long-polling when running this file directly
  bot.launch();
  console.log("🤖 4Tek – Advisor AI Bot started (long-polling)");
}

module.exports = {
  handleUpdate,
  startPolling,
  bot,
};