import { StructuredResume } from "./resume-structure.service";

export interface KeywordCoverage {
  found: number;
  total: number;
  percentage: number;
}

export interface ResumeHealth {
  overall: number;
  formatting: "Excellent" | "Good" | "Needs Improvement";
  atsFriendly: boolean;
  grammar: "Excellent" | "Good" | "Needs Improvement";
  length: "Excellent" | "Good" | "Needs Improvement";
}

export interface JobMatchBreakdown {
  keywordScore: number;
  matchedSkillScore: number;
  missingSkillPenalty: number;
  sectionScore: number;
  finalScore: number;
}

export interface SectionScores {
  summary: number;
  skills: number;
  projects: number;
  experience: number;
  education: number;
}

export function calculateKeywordCoverage(
  matched: string[],
  missing: string[],
): KeywordCoverage {
  const uniqueMatched = [...new Set(matched)];
  const uniqueMissing = [...new Set(missing)];

  const total = uniqueMatched.length + uniqueMissing.length;

  return {
    found: uniqueMatched.length,
    total,
    percentage:
      total === 0 ? 0 : Math.round((uniqueMatched.length / total) * 100),
  };
}

export function calculateSectionScores(
  resume: StructuredResume,
): SectionScores {
  return {
    summary: resume.summary.trim().length > 50 ? 100 : 40,

    skills:
      resume.skills.languages.length +
        resume.skills.frameworks.length +
        resume.skills.libraries.length +
        resume.skills.databases.length +
        resume.skills.cloud.length +
        resume.skills.tools.length +
        resume.skills.concepts.length +
        resume.skills.other.length >
      0
        ? 100
        : 0,

    projects:
      resume.projects.length === 0
        ? 0
        : Math.min(100, resume.projects.length * 40),

    experience:
      resume.experience.length === 0
        ? 0
        : Math.min(100, resume.experience.length * 50),

    education: resume.education.length > 0 ? 100 : 0,
  };
}

export function calculateResumeHealth(
  keywordCoverage: KeywordCoverage,
  sectionScores: SectionScores,
): ResumeHealth {
  const sectionAverage =
    (sectionScores.summary +
      sectionScores.skills +
      sectionScores.projects +
      sectionScores.experience +
      sectionScores.education) /
    5;

  const overall = Math.round(
    keywordCoverage.percentage * 0.6 + sectionAverage * 0.4,
  );

  return {
    overall,

    formatting:
      overall >= 85
        ? "Excellent"
        : overall >= 65
          ? "Good"
          : "Needs Improvement",

    atsFriendly: overall >= 70,

    grammar:
      overall >= 80
        ? "Excellent"
        : overall >= 60
          ? "Good"
          : "Needs Improvement",

    length:
      overall >= 80
        ? "Excellent"
        : overall >= 60
          ? "Good"
          : "Needs Improvement",
  };
}

export function calculateJobMatch(
  keywordCoverage: KeywordCoverage,
  matchedSkills: string[],
  missingSkills: string[],
  sectionScores: SectionScores,
): JobMatchBreakdown {
  const keywordScore = keywordCoverage.percentage;

  const matchedSkillScore = Math.min(100, matchedSkills.length * 10);

  const missingSkillPenalty = Math.min(40, missingSkills.length * 3);

  const sectionScore =
    (sectionScores.summary +
      sectionScores.skills +
      sectionScores.projects +
      sectionScores.experience +
      sectionScores.education) /
    5;

  const finalScore = Math.round(
    keywordScore * 0.35 +
      matchedSkillScore * 0.35 +
      sectionScore * 0.3 -
      missingSkillPenalty,
  );

  return {
    keywordScore,
    matchedSkillScore,
    missingSkillPenalty,
    sectionScore,
    finalScore: Math.max(0, Math.min(100, finalScore)),
  };
}
