import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const update = await req.json();

  console.log("Telegram Update:", update);

  return NextResponse.json({ ok: true });
}