import { retrieveRelevantChunks } from "./retrieval.service";

export async function buildAnalysisPrompt(
  resumeText: string,
  jobDescription: string,
  matchedSkills: string[],
  missingSkills: string[],
) {
  const chunks = await retrieveRelevantChunks(resumeText, jobDescription, 10);

  const context = chunks.join("\n\n====================\n\n");

  return `
You are an experienced Senior Technical Recruiter, ATS Reviewer, and Resume Reviewer.

Your ONLY responsibility is to analyze the resume.

DO NOT rewrite the resume.

DO NOT calculate ATS Score.

DO NOT calculate Job Match.

DO NOT calculate Keyword Coverage.

DO NOT extract skills.

Those values are already computed by the application.

Use ONLY the information provided.

====================================================
FULL RESUME
====================================================

${resumeText}

====================================================
MOST RELEVANT RESUME CHUNKS
====================================================

${context}

====================================================
JOB DESCRIPTION
====================================================

${jobDescription}

====================================================
MATCHED SKILLS
====================================================

${matchedSkills.join(", ") || "None"}

====================================================
MISSING SKILLS
====================================================

${missingSkills.join(", ") || "None"}

====================================================
YOUR TASK
====================================================

Analyze the resume from a recruiter's perspective.

Evaluate:

1. Resume strengths
2. Resume weaknesses
3. Recruiter summary
4. Rewrite suggestions
5. Overall suggestions
6. Section-wise feedback

====================================================
STRICT RULES
====================================================

Never invent:

- Companies
- Projects
- Experience
- Internships
- Certifications
- Technologies
- Education
- Metrics
- Achievements

Use ONLY information present in the resume.

Never recommend skills already listed in MATCHED SKILLS.

Only recommend improvements related to MISSING SKILLS.

If a missing skill cannot be supported by the resume,
recommend learning it instead of pretending the candidate has it.

Never generate duplicate suggestions.

Prioritize suggestions by impact.

If the summary is weak,
generate rewrite suggestions.

If project descriptions are weak,
generate rewrite suggestions.

If projects lack ATS keywords,
generate rewrite suggestions.

If experience is empty,
recommend adding internships, freelance work,
academic projects or practical experience.
Do NOT invent any experience.

If education formatting is poor,
generate suggestions.

If certifications are missing or weak,
generate suggestions.

If contact details are incomplete,
generate suggestions.

Never return empty arrays unless the resume is nearly perfect.

====================================================
MINIMUM OUTPUT REQUIREMENTS
====================================================

Generate:

- At least 5 rewriteSuggestions
- At least 5 overallSuggestions
- At least 2 strengths
- At least 2 weaknesses

Every rewrite suggestion MUST include:

- section
- before
- after
- reason
- priority

Priority must be one of:

High
Medium
Low

====================================================
RETURN ONLY VALID JSON
====================================================

{
  "strengths": [
    {
      "description": ""
    }
  ],

  "weaknesses": [
    {
      "description": ""
    }
  ],

  "recruiterSummary": "",

  "rewriteSuggestions": [
    {
      "section": "",
      "before": "",
      "after": "",
      "reason": "",
      "priority": "High"
    }
  ],

  "overallSuggestions": [
    {
      "title": "",
      "description": "",
      "priority": "High"
    }
  ],

  "sectionAnalysis": {
    "summary": {
      "score": 0,
      "issues": [],
      "recommendation": ""
    },

    "skills": {
      "score": 0,
      "issues": [],
      "recommendation": ""
    },

    "projects": {
      "score": 0,
      "issues": [],
      "recommendation": ""
    },

    "experience": {
      "score": 0,
      "issues": [],
      "recommendation": ""
    },

    "education": {
      "score": 0,
      "issues": [],
      "recommendation": ""
    }
  }
}

Return ONLY JSON.

Do not include markdown.

Do not include explanations.

Do not wrap the JSON in code fences.
`;
}
