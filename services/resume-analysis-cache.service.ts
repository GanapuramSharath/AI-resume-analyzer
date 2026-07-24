import crypto from "crypto";

import { analyzeResume } from "@/lib/ai";
import { redis } from "@/lib/redis";

export async function getResumeAnalysis(resumeText: string) {
  //--------------------------------------------------
  // Create Cache Key
  //--------------------------------------------------

  const cacheKey = crypto.createHash("sha256").update(resumeText).digest("hex");

  //--------------------------------------------------
  // Check Redis
  //--------------------------------------------------

  const cached = await redis.get(cacheKey);

  if (cached) {
    console.log("✅ RESUME CACHE HIT");

    return JSON.parse(cached);
  }

  console.log("❌ RESUME CACHE MISS");

  //--------------------------------------------------
  // AI Analysis
  //--------------------------------------------------

  const analysis = await analyzeResume(resumeText);

  //--------------------------------------------------
  // Save Cache
  //--------------------------------------------------

  await redis.set(
    cacheKey,
    JSON.stringify(analysis),
    "EX",
    60 * 60 * 24, // 24 hours
  );

  console.log("💾 Resume Analysis Saved to Redis");

  return analysis;
}
