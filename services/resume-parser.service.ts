export interface ResumeSection {
  title: string;
  content: string;
}

export interface ParsedResume {
  summary: string;
  skills: string;
  projects: string;
  experience: string;
  education: string;
  certifications: string;
  achievements: string;
  other: string;
}

const SECTION_PATTERNS = {
  summary: [
    "summary",
    "professional summary",
    "profile",
    "objective",
    "career objective",
    "about",
  ],

  skills: [
    "skills",
    "technical skills",
    "core skills",
    "technical expertise",
    "technologies",
  ],

  projects: [
    "projects",
    "academic projects",
    "personal projects",
    "professional projects",
  ],

  experience: [
    "experience",
    "work experience",
    "employment",
    "professional experience",
    "internship",
    "internships",
  ],

  education: [
    "education",
    "academic background",
    "qualification",
    "qualifications",
  ],

  certifications: ["certifications", "certificates", "licenses"],

  achievements: ["achievements", "awards", "accomplishments"],
};

function normalize(text: string) {
  return text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[ ]+/g, " ")
    .trim();
}

function findSectionName(line: string): keyof ParsedResume | null {
  const lower = line.trim().toLowerCase();

  for (const [key, aliases] of Object.entries(SECTION_PATTERNS)) {
    for (const alias of aliases) {
      if (lower === alias || lower.startsWith(alias + ":")) {
        return key as keyof ParsedResume;
      }
    }
  }

  return null;
}

export function parseResume(resumeText: string): ParsedResume {
  const lines = normalize(resumeText).split("\n");

  const result: ParsedResume = {
    summary: "",
    skills: "",
    projects: "",
    experience: "",
    education: "",
    certifications: "",
    achievements: "",
    other: "",
  };

  let current: keyof ParsedResume = "other";

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) continue;

    const section = findSectionName(line);

    if (section) {
      current = section;
      continue;
    }

    result[current] += line + "\n";
  }

  Object.keys(result).forEach((key) => {
    result[key as keyof ParsedResume] =
      result[key as keyof ParsedResume].trim();
  });

  return result;
}