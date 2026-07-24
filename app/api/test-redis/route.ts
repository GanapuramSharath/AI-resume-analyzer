import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  await redis.set("name", "Your Name");

  const value = await redis.get("name");

  return NextResponse.json({ value });
}
