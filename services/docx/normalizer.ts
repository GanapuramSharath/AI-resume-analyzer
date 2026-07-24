import {
  Resume,
  Contact,
  Project,
  Experience,
  Education,
  Certification,
  Skills,
} from "./types";

export type RawResume = Record<string, unknown>;

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter(Boolean)
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    const text = value.trim();
    return text ? [text] : [];
  }

  return [];
}

/**
 * Normalize Contact
 */
function normalizeContact(contact: unknown): Contact {
  if (!contact || typeof contact !== "object") {
    return {};
  }

  const data = contact as Record<string, unknown>;

  return {
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    phone: String(data.phone ?? ""),
    linkedin: String(data.linkedin ?? ""),
    github: String(data.github ?? ""),
    portfolio: String(data.portfolio ?? ""),
    location: String(data.location ?? ""),
  };
}

/**
 * Normalize Skills
 */
function normalizeSkills(skills: unknown): Skills {
  if (!skills || typeof skills !== "object") {
    return {};
  }

  const normalized: Skills = {};

  Object.entries(skills as Record<string, unknown>).forEach(([key, value]) => {
    normalized[key] = toArray(value);
  });

  return normalized;
}

/**
 * Normalize Projects
 */
function normalizeProjects(projects: unknown): Project[] {
  if (!Array.isArray(projects)) {
    return [];
  }

  return projects.map((project: any) => ({
    title: project?.title ?? "",
    description: toArray(project?.description),
    techStack: toArray(project?.techStack),
  }));
}

/**
 * Normalize Experience
 */
function normalizeExperience(experience: unknown): Experience[] {
  if (!Array.isArray(experience)) {
    return [];
  }

  return experience.map((exp: any) => ({
    role: exp?.role ?? "",
    company: exp?.company ?? "",
    duration: exp?.duration ?? "",
    description: toArray(exp?.description),
  }));
}

/**
 * Normalize Education
 */
function normalizeEducation(education: unknown): Education[] {
  if (!Array.isArray(education)) {
    return [];
  }

  return education.map((edu: any) => ({
    degree: edu?.degree ?? "",
    college: edu?.college ?? "",
    year: edu?.year ?? "",
    cgpa: edu?.cgpa ?? "",
  }));
}

/**
 * Normalize Certifications
 */
function normalizeCertifications(
  certifications: unknown,
): (string | Certification)[] {
  if (!Array.isArray(certifications)) {
    return [];
  }

  return certifications.map((cert: any) => {
    if (typeof cert === "string") {
      return cert.trim();
    }

    return {
      name: cert?.name ?? "",
    };
  });
}

/**
 * Normalize Resume
 */
export function normalizeResume(data: RawResume | Resume): Resume {
  return {
    contact: normalizeContact(data.contact),

    summary: String(data.summary ?? ""),

    skills: normalizeSkills(data.skills),

    projects: normalizeProjects(data.projects),

    experience: normalizeExperience(data.experience),

    education: normalizeEducation(data.education),

    certifications: normalizeCertifications(data.certifications),

    achievements: toArray(data.achievements),
  };
}
