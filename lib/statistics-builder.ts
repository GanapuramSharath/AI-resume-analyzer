export function buildStatistics(parsed: any) {
  return {
    totalResumeSkills: parsed.resumeSkills.length,
    totalJobSkills: parsed.jobSkills.length,
    matchedSkills: parsed.matchedSkills.length,
    missingSkills: parsed.missingSkills.length,
    keywordCoverage: parsed.keywordCoverage.percentage,
  };
}
