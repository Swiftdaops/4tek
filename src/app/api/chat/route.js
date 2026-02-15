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

  return NextResponse.json({
    reply,
    remaining: 10 - user.messagesUsed,
  });
}