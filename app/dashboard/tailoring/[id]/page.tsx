import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import ScoreCards from "@/components/tailoring/rewrite/ScoreCards";
import SkillsCard from "@/components/tailoring/rewrite/SkillsCard";
import SectionScores from "@/components/tailoring/rewrite/SectionScores";
import RewriteSuggestions from "@/components/tailoring/rewrite/RewriteSuggestions";
import OverallSuggestions from "@/components/tailoring/rewrite/OverallSuggestions";
import KeywordCoverage from "@/components/tailoring/report/KeywordCoverage";
import ResumeHealth from "@/components/tailoring/report/ResumeHealth";
import ExportResume from "@/components/tailoring/report/ExportResume";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TailoringResultPage({ params }: Props) {
  const { id } = await params;

  const tailoring = await prisma.resumeTailoring.findUnique({
    where: {
      id,
    },
    include: {
      resume: true,
    },
  });

  if (!tailoring) {
    notFound();
  }

  const result = tailoring.result as any;

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      <ScoreCards
        atsScore={result.atsScore}
        jobMatch={result.jobMatch}
        breakdown={result.scoreBreakdown}
      />

      <SkillsCard
        title="Missing Skills"
        skills={result.missingSkills ?? []}
        color="red"
      />

      <KeywordCoverage
        matched={result.keywordCoverage.found}
        total={result.keywordCoverage.total}
        matchedSkills={result.matchedSkills}
        missing={result.missingSkills}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <ResumeHealth health={result.resumeHealth} />

        <SectionScores scores={result.sectionScores} />
      </div>

      <RewriteSuggestions rewrites={result.rewriteSuggestions} />

      <OverallSuggestions suggestions={result.overallSuggestions} />

      <ExportResume tailoringId={tailoring.id} />
    </main>
  );
}
