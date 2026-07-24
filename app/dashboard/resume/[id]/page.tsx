import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

import {
  AnalysisLayout,
  AnalysisHeader,
  ATSScoreCard,
  SummaryCard,
  StrengthsCard,
  WeaknessesCard,
  MissingKeywordsCard,
  ImprovementsCard,
} from "@/components/analysis";

type Props = {
  params: Promise<{
    id: string;
  }>;
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
        <section className="rounded-3xl border bg-white p-10 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold">Resume Analysis</h1>

          <p className="text-gray-500">No analysis found for this resume.</p>
        </section>
      </AnalysisLayout>
    );
  }

  return (
    <AnalysisLayout>
      <AnalysisHeader
        fileName={resume.fileName}
        uploadedAt={resume.createdAt}
        processingTime="12.4 seconds"
      />

      <ATSScoreCard score={analysis.atsScore} />

      <SummaryCard summary={analysis.summary} />

      <StrengthsCard strengths={analysis.strengths as string[]} />

      <WeaknessesCard weaknesses={analysis.weaknesses as string[]} />

      <MissingKeywordsCard keywords={analysis.missingKeywords as string[]} />

      <ImprovementsCard improvements={analysis.improvements as string[]} />
    </AnalysisLayout>
  );
}
