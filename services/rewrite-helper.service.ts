import { StructuredResume } from "./resume-structure.service";

export interface RewriteSuggestion {
  section?: string;
  before?: string;
  after?: string;
  reason?: string;
  priority?: "High" | "Medium" | "Low";
}

function normalize(section?: string) {
  return (section ?? "").trim().toLowerCase();
}

function getSummary(structured: StructuredResume) {
  return structured.summary.trim();
}

function getSkills(structured: StructuredResume) {
  return [
    ...structured.skills.languages,
    ...structured.skills.frameworks,
    ...structured.skills.libraries,
    ...structured.skills.databases,
    ...structured.skills.cloud,
    ...structured.skills.tools,
    ...structured.skills.concepts,
    ...structured.skills.other,
  ].join(", ");
}

function getProjects(structured: StructuredResume) {
  return structured.projects
    .map((project) => {
      return [project.title, ...project.description].join("\n");
    })
    .join("\n\n");
}

function getExperience(structured: StructuredResume) {
  return structured.experience
    .map((exp) => {
      return [`${exp.role} - ${exp.company}`, ...exp.description].join("\n");
    })
    .join("\n\n");
}

function getEducation(structured: StructuredResume) {
  return structured.education
    .map((edu) =>
      [edu.degree, edu.college, edu.year, edu.cgpa].filter(Boolean).join(" | "),
    )
    .join("\n");
}

function getCertifications(structured: StructuredResume) {
  return structured.certifications.join("\n");
}

function getAchievements(structured: StructuredResume) {
  return structured.achievements.join("\n");
}

export function findOriginalSection(
  structured: StructuredResume,
  section?: string,
): string {
  switch (normalize(section)) {
    case "summary":
      return getSummary(structured);

    case "skills":
    case "technical skills":
      return getSkills(structured);

    case "projects":
      return getProjects(structured);

    case "experience":
      return getExperience(structured);

    case "education":
      return getEducation(structured);

    case "certifications":
      return getCertifications(structured);

    case "achievements":
      return getAchievements(structured);

    default:
      return "";
  }
}

export function populateRewriteBeforeTexts(
  rewrites: RewriteSuggestion[],
  structured: StructuredResume,
): RewriteSuggestion[] {
  return rewrites.map((rewrite) => {
    if (
      rewrite.before &&
      rewrite.before.trim() &&
      rewrite.before !== "No original content available."
    ) {
      return rewrite;
    }

    return {
      ...rewrite,
      before:
        findOriginalSection(structured, rewrite.section) ||
        "Original content not found.",
    };
  });
}
