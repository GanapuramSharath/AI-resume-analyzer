import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getTailoringAnalysis } from "@/services/tailoring-cache.service";
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeId, jobDescription } = await req.json();

    if (!resumeId || !jobDescription) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    //-------------------------------------------------------
    // Load Resume
    //-------------------------------------------------------

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
      include: {
        analyses: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (!resume.extractedText) {
      return NextResponse.json(
        {
          error: "Resume text not found. Please upload again.",
        },
        {
          status: 400,
        },
      );
    }

    console.log("======================================");
    console.log("STARTING AI ANALYSIS");
    console.log("======================================");
    console.log("Resume Length:", resume.extractedText.length);
    console.log("JD Length:", jobDescription.length);

    //-------------------------------------------------------
    // Analyze
    //-------------------------------------------------------

   const start = performance.now();

   const tailoring = await getTailoringAnalysis(
     resume.extractedText,
     jobDescription,
   );

   const end = performance.now();

   console.log(`Analysis took ${(end - start).toFixed(2)} ms`);

    console.log("======================================");
    console.log("TAILORED RESUME");
    console.dir(tailoring.tailoredResume, {
      depth: null,
    });
    console.log("======================================");

    //-------------------------------------------------------
    // Save
    //-------------------------------------------------------

    const saved = await prisma.resumeTailoring.create({
      data: {
        resumeId: resume.id,
        jobDescription,
        result: tailoring,
      },
    });

    console.log("Saved ID:", saved.id);

    //-------------------------------------------------------
    // Verify
    //-------------------------------------------------------

    const verify = await prisma.resumeTailoring.findUnique({
      where: {
        id: saved.id,
      },
    });

    console.log("======================================");
    console.log("DATABASE VERIFY");
    console.dir(verify?.result, {
      depth: null,
    });
    console.log("======================================");

    return NextResponse.json({
      success: true,
      tailoringId: saved.id,
    });
  } catch (error) {
    console.error("======================================");
    console.error("SERVER ERROR");
    console.error(error);
    console.error("======================================");

    return NextResponse.json(
      {
        error: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
