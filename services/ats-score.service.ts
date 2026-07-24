import { KeywordCoverage } from "./scoring.service";
import { SectionScores } from "./section-score.service";

export interface ATSBreakdown {
  keywordScore: number;
  sectionScore: number;
  completenessScore: number;
  missingPenalty: number;
  overall: number;
}

function averageSectionScore(scores: SectionScores) {
  return (
    (scores.summary +
      scores.skills +
      scores.projects +
      scores.experience +
      scores.education) /
    5
  );
}

export function calculateATSScore(
  keywordCoverage: KeywordCoverage,
  sectionScores: SectionScores,
  matchedSkills: string[],
  missingSkills: string[],
): ATSBreakdown {
  const keywordScore = keywordCoverage.percentage;

  const sectionScore = averageSectionScore(sectionScores);

  let completenessScore = 0;

  if (sectionScores.summary > 0) completenessScore += 20;
  if (sectionScores.skills > 0) completenessScore += 20;
  if (sectionScores.projects > 0) completenessScore += 20;
  if (sectionScores.experience > 0) completenessScore += 20;
  if (sectionScores.education > 0) completenessScore += 20;

  const missingPenalty = Math.min(25, missingSkills.length * 2);

  const overall = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        keywordScore * 0.45 +
          sectionScore * 0.35 +
          completenessScore * 0.2 -
          missingPenalty,
      ),
    ),
  );

  return {
    keywordScore,
    sectionScore,
    completenessScore,
    missingPenalty,
    overall,
  };
}
