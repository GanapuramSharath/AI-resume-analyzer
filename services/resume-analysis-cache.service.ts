import crypto from "crypto";

import { analyzeResume } from "@/lib/ai";
import { redis } from "@/lib/redis";

const CACHE_VERSION = "resume-analysis-v2";
const CACHE_TTL = 60 * 60 * 24; // 24 hours

export async function getResumeAnalysis(resumeText: string) {
  //--------------------------------------------------
  // Create Versioned Cache Key
  //--------------------------------------------------

  const cacheKey =
    CACHE_VERSION +
    ":" +
    crypto.createHash("sha256").update(resumeText).digest("hex");

  //--------------------------------------------------
  // Check Redis Cache
  //--------------------------------------------------

  try {
    const cached = await redis.get(cacheKey);

    if (cached) {
      console.log("✅ RESUME CACHE HIT");

      return JSON.parse(cached);
    }

    console.log("❌ RESUME CACHE MISS");
  } catch (error) {
    console.error("Redis read failed:", error);
  }

  //--------------------------------------------------
  // AI Analysis
  //--------------------------------------------------

  const analysis = await analyzeResume(resumeText);

  //--------------------------------------------------
  // Save Cache
  //--------------------------------------------------

  try {
    await redis.set(cacheKey, JSON.stringify(analysis), "EX", CACHE_TTL);

    console.log("💾 Resume Analysis Saved to Redis");
  } catch (error) {
    console.error("Redis write failed:", error);
  }

  return analysis;
}
