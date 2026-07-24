import crypto from "crypto";

import { analyzeResumeTailoring } from "@/lib/ai-tailoring";
import { redis } from "@/lib/redis";

export async function getTailoringAnalysis(
  resumeText: string,
  jobDescription: string,
) {
  //--------------------------------------------------
  // Create Cache Key
  //--------------------------------------------------

  const cacheKey = crypto
    .createHash("sha256")
    .update(`${resumeText}:${jobDescription}`)
    .digest("hex");

  //--------------------------------------------------
  // Check Redis
  //--------------------------------------------------

  const cached = await redis.get(cacheKey);

  if (cached) {
    console.log("✅ CACHE HIT");

    return JSON.parse(cached);
  }

  console.log("❌ CACHE MISS");

  //--------------------------------------------------
  // AI Analysis
  //--------------------------------------------------

  const tailoring = await analyzeResumeTailoring(resumeText, jobDescription);

  //--------------------------------------------------
  // Save Cache
  //--------------------------------------------------

  await redis.set(
    cacheKey,
    JSON.stringify(tailoring),
    "EX",
    60 * 60 * 24, // 24 hours
  );

  console.log("💾 Saved to Redis");

  return tailoring;
}
