import { StructuredResume } from "./resume-structure.service";

export interface SectionScores {
  summary: number;
  skills: number;
  projects: number;
  experience: number;
  education: number;
}

function clamp(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function scoreSummary(summary: string, matchedSkills: string[]) {
  if (!summary.trim()) return 0;

  let score = 50;

  const wordCount = summary.split(/\s+/).length;

  if (wordCount >= 30) score += 15;
  if (wordCount >= 60) score += 10;

  const lower = summary.toLowerCase();

  let matched = 0;

  for (const skill of matchedSkills) {
    if (lower.includes(skill.toLowerCase())) {
      matched++;
    }
  }

  score += Math.min(25, matched * 4);

  return clamp(score);
}

function scoreSkills(structured: StructuredResume, matchedSkills: string[]) {
  const totalSkills =
    structured.skills.languages.length +
    structured.skills.frameworks.length +
    structured.skills.libraries.length +
    structured.skills.databases.length +
    structured.skills.cloud.length +
    structured.skills.tools.length +
    structured.skills.concepts.length +
    structured.skills.other.length;

  if (totalSkills === 0) return 0;

  let score = 40;

  score += Math.min(30, totalSkills * 2);

  score += Math.min(30, matchedSkills.length * 3);

  return clamp(score);
}

function scoreProjects(structured: StructuredResume) {
  if (structured.projects.length === 0) return 0;

  let score = 40;

  score += Math.min(25, structured.projects.length * 10);

  let bullets = 0;

  let tech = 0;

  for (const project of structured.projects) {
    bullets += project.description.length;
    tech += project.techStack.length;
  }

  score += Math.min(20, bullets * 2);

  score += Math.min(15, tech * 2);

  return clamp(score);
}

function scoreExperience(structured: StructuredResume) {
  if (structured.experience.length === 0) return 0;

  let score = 45;

  score += Math.min(20, structured.experience.length * 10);

  let bullets = 0;

  for (const exp of structured.experience) {
    bullets += exp.description.length;
  }

  score += Math.min(35, bullets * 3);

  return clamp(score);
}

function scoreEducation(structured: StructuredResume) {
  if (structured.education.length === 0) return 0;

  let score = 60;

  const edu = structured.education[0];

  if (edu.degree) score += 15;

  if (edu.college) score += 10;

  if (edu.year) score += 10;

  if (edu.cgpa) score += 5;

  return clamp(score);
}

export function calculateSectionScores(
  structured: StructuredResume,
  matchedSkills: string[],
): SectionScores {
  return {
    summary: scoreSummary(structured.summary, matchedSkills),

    skills: scoreSkills(structured, matchedSkills),

    projects: scoreProjects(structured),

    experience: scoreExperience(structured),

    education: scoreEducation(structured),
  };
}

export function calculateOverallSectionScore(scores: SectionScores): number {
  return Math.round(
    (scores.summary +
      scores.skills +
      scores.projects +
      scores.experience +
      scores.education) /
      5,
  );
}
