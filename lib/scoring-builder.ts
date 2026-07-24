import {
  calculateKeywordCoverage,
  calculateResumeHealth,
  calculateJobMatch,
} from "@/services/scoring.service";

import { calculateATSScore } from "@/services/ats-score.service";

export function buildScores(
  matchedSkills: string[],
  missingSkills: string[],
  sectionScores: any,
) {
  const keywordCoverage = calculateKeywordCoverage(
    matchedSkills,
    missingSkills,
  );

  const resumeHealth = calculateResumeHealth(keywordCoverage, sectionScores);

  const jobMatch = calculateJobMatch(
    keywordCoverage,
    matchedSkills,
    missingSkills,
    sectionScores,
  );

  const ats = calculateATSScore(
    keywordCoverage,
    sectionScores,
    matchedSkills,
    missingSkills,
  );

  return {
    keywordCoverage,
    resumeHealth,
    jobMatch,
    ats,
  };
}
