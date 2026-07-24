import { extractJobSkills } from "./skill-extractor.service";

export interface ParsedJob {
  skills: string[];

  responsibilities: string[];

  qualifications: string[];
}

export function parseJobDescription(job: string): ParsedJob {
  const responsibilities = job
    .split("\n")
    .filter(
      (x) =>
        x.includes("Develop") ||
        x.includes("Build") ||
        x.includes("Design") ||
        x.includes("Implement"),
    );

  const qualifications = job
    .split("\n")
    .filter(
      (x) =>
        x.includes("Required") ||
        x.includes("Qualification") ||
        x.includes("Experience"),
    );

  return {
    skills: extractJobSkills(job),

    responsibilities,

    qualifications,
  };
}
