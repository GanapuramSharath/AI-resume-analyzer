export type ResumeSections = {
  summary: string;
  skills: string;
  experience: string;
  projects: string;
  education: string;
  certifications: string;
  achievements: string;
  others: string;
};

const SECTION_PATTERNS = [
  {
    key: "summary",
    regex: /(summary|professional summary|profile|objective|career objective)/i,
  },
  {
    key: "skills",
    regex: /(skills|technical skills|core skills|technologies|tech stack)/i,
  },
  {
    key: "experience",
    regex:
      /(experience|work experience|employment|professional experience|internship|internships)/i,
  },
  {
    key: "projects",
    regex: /(projects|academic projects|personal projects|major projects)/i,
  },
  {
    key: "education",
    regex: /(education|academic background|qualification|qualifications)/i,
  },
  {
    key: "certifications",
    regex: /(certifications|certificates|licenses|courses)/i,
  },
  {
    key: "achievements",
    regex: /(achievements|awards|honors|accomplishments)/i,
  },
];

export function parseResume(resumeText: string): ResumeSections {
  const result: ResumeSections = {
    summary: "",
    skills: "",
    experience: "",
    projects: "",
    education: "",
    certifications: "",
    achievements: "",
    others: "",
  };

  const lines = resumeText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let currentSection: keyof ResumeSections = "others";

  for (const line of lines) {
    let found = false;

    for (const section of SECTION_PATTERNS) {
      if (section.regex.test(line)) {
        currentSection = section.key as keyof ResumeSections;
        found = true;
        break;
      }
    }

    if (found) continue;

    result[currentSection] += line + "\n";
  }

  for (const key of Object.keys(result) as (keyof ResumeSections)[]) {
    result[key] = result[key].trim();
  }

  return result;
}
