type RewriteAnalysis = {
  structuredResume: any;
  matchedSkills: string[];
  missingSkills: string[];
  recruiterSummary?: string;
  rewriteSuggestions?: any[];
  overallSuggestions?: string[];
  sectionAnalysis?: any;
};

export async function buildRewritePrompt(
  jobDescription: string,
  analysis: RewriteAnalysis,
) {
  return `
You are a Senior Resume Writer and ATS Expert.

Your task is to improve an existing resume.

IMPORTANT RULES

- Never invent companies.
- Never invent projects.
- Never invent internships.
- Never invent certifications.
- Never invent technologies.
- Never invent achievements.
- Never invent metrics.
- Preserve every existing section.
- Rewrite only wording.
- Improve grammar.
- Improve ATS keywords naturally.
- Never remove information.
- Return ONLY valid JSON.

==================================================
STRUCTURED RESUME (SOURCE OF TRUTH)
==================================================

${JSON.stringify(analysis.structuredResume, null, 2)}

==================================================
JOB DESCRIPTION
==================================================

${jobDescription}

==================================================
MATCHED SKILLS
==================================================

${analysis.matchedSkills.join(", ") || "None"}

==================================================
MISSING SKILLS
==================================================

${analysis.missingSkills.join(", ") || "None"}

==================================================
REWRITE SUGGESTIONS
==================================================

${JSON.stringify(analysis.rewriteSuggestions ?? [], null, 2)}

==================================================
OUTPUT REQUIREMENTS
==================================================

Return ONLY this JSON.

{
  "summary": "",
  "projects": [],
  "experience": []
}

Do not generate contact.

Do not generate education.

Do not generate certifications.

Do not generate skills.

Only improve summary, projects and experience.

Do NOT omit any section.

If a section does not require changes,
copy it exactly.

Return JSON in exactly this schema:

{
  "contact": {
    "name": "",
    "email": "",
    "phone": "",
    "linkedin": "",
    "github": "",
    "portfolio": "",
    "location": ""
  },
  "summary": "",
  "skills": {
    "languages": [],
    "frameworks": [],
    "libraries": [],
    "databases": [],
    "cloud": [],
    "tools": [],
    "concepts": [],
    "other": []
  },
  "projects": [],
  "experience": [],
  "education": [],
  "certifications": [],
  "achievements": []
}

Return ONLY JSON.
`;
}
