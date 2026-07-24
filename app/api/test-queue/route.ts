import { NextResponse } from "next/server";
import { tailoringQueue } from "@/lib/bullmq";

export async function POST() {
  const job = await tailoringQueue.add("demo-job", {
    message: "Hello BullMQ",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    jobId: job.id,
  });
}
