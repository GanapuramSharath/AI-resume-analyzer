export function normalizeAnalysis(parsed: any) {
  parsed.strengths ??= [];
  parsed.weaknesses ??= [];
  parsed.recruiterSummary ??= "";

  parsed.rewriteSuggestions ??= [];
  parsed.overallSuggestions ??= [];

  parsed.sectionAnalysis ??= {};

  parsed.tailoredResume ??= {
    summary: "",

    skills: {
      languages: [],
      frameworks: [],
      libraries: [],
      databases: [],
      cloud: [],
      tools: [],
      concepts: [],
      other: [],
    },

    projects: [],

    experience: [],

    education: [],

    certifications: [],

    achievements: [],
  };

  const normalizeArray = (arr: any[] = []) => [
    ...new Set(
      arr
        .map((x: any) => (typeof x === "string" ? x.trim() : x?.skill?.trim()))
        .filter(Boolean),
    ),
  ];

  parsed.resumeSkills = normalizeArray(parsed.resumeSkills);
  parsed.jobSkills = normalizeArray(parsed.jobSkills);
  parsed.matchedSkills = normalizeArray(parsed.matchedSkills);
  parsed.missingSkills = normalizeArray(parsed.missingSkills);

  return parsed;
}
