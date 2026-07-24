import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getResumeAnalysis } from "@/services/resume-analysis-cache.service";
import { extractResumeText } from "@/lib/extractor";
import { uploadResume } from "@/lib/uploadResume";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const start = Date.now();

    const formData = await request.formData();

    const file = formData.get("resume");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "Resume is required.",
        },
        {
          status: 400,
        },
      );
    }

    // Convert File -> Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("File:", file.name);
    console.log("Type:", file.type);
    console.log("Size:", (file.size / 1024).toFixed(2), "KB");

    console.log("1. Starting upload");


    const resumeText = await extractResumeText(file, buffer);

    console.log("2. Text extracted");
    console.log("Text Extracted:", Date.now() - start, "ms");

    if (!resumeText.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "No readable text found in the uploaded document.",
        },
        {
          status: 400,
        },
      );
    }
    const analysisStart = performance.now();

    const analysis = await getResumeAnalysis(resumeText);

    const analysisEnd = performance.now();

    console.log(
      `Resume Analysis took ${(analysisEnd - analysisStart).toFixed(2)} ms`,
    );
    console.log("3. AI finished");

    // Upload to S3
    const fileKey = await uploadResume(file, buffer, session.user.id);

    console.log("4. S3 uploaded");
    console.log("Uploaded to S3:", fileKey);

    // Save resume
    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        fileName: file.name,
        fileUrl: fileKey,
        extractedText: resumeText,
      },
    });

    console.log("5. Resume saved");

    // Save analysis
    await prisma.resumeAnalysis.create({
      data: {
        resumeId: resume.id,

        atsScore: analysis.atsScore,
        summary: analysis.summary,

        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        missingKeywords: analysis.missingKeywords,
        improvements: analysis.improvements,

        jobMatches: analysis.jobMatches,
      },
    });

    console.log("6. Analysis saved");

    const totalTime = Date.now() - start;

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Total Time:", totalTime, "ms");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    return NextResponse.json({
      success: true,
      resumeId: resume.id,
      analysis,
      processingTime: `${(totalTime / 1000).toFixed(2)} seconds`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
