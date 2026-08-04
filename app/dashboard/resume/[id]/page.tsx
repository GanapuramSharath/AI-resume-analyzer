import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

import {
  AnalysisLayout,
  ResumeAuditHeader,
  ResumeStatusCard,
  ResumeStrengthsCard,
  RecruiterVerdictCard,
  ProblemList,
  AnalysisActions,
} from "@/components/analysis";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type Strength = {
  title: string;
  description: string;
};

export default async function ResumePage({ params }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      analyses: true,
    },
  });

  if (!resume) {
    notFound();
  }

  const analysis = resume.analyses[0];

  if (!analysis) {
    return (
      <AnalysisLayout>
        <section className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Analysis Unavailable
          </h1>

          <p className="text-gray-600">
            We couldn't find an analysis for this resume. Please upload your
            resume again to generate a new report.
          </p>
        </section>
      </AnalysisLayout>
    );
  }

  const weaknesses = Array.isArray(analysis.weaknesses)
    ? (analysis.weaknesses as string[])
    : [];

  const missingKeywords = Array.isArray(analysis.missingKeywords)
    ? (analysis.missingKeywords as string[])
    : [];

  const improvements = Array.isArray(analysis.improvements)
    ? (analysis.improvements as string[])
    : [];

  const strengths = Array.isArray(analysis.strengths)
    ? (analysis.strengths as Strength[])
    : [];

  const issuesCount = weaknesses.length + missingKeywords.length;

  return (
    <AnalysisLayout>
      <ResumeAuditHeader
        fileName={resume.fileName}
        uploadedAt={resume.createdAt}
        atsScore={analysis.atsScore}
        issuesCount={issuesCount}
      />

      <ResumeStatusCard
        atsScore={analysis.atsScore}
        issuesCount={issuesCount}
      />

      <ProblemList
        weaknesses={weaknesses}
        missingKeywords={missingKeywords}
        improvements={improvements}
      />

      <ResumeStrengthsCard strengths={strengths} />

      <RecruiterVerdictCard summary={analysis.summary} />

      {resume.fileUrl && (
        <AnalysisActions resumeId={resume.id} fileUrl={resume.fileUrl} />
      )}
    </AnalysisLayout>
  );
}
