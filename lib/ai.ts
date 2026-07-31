import { askAI } from "@/lib/ai-provider";

export async function analyzeResume(resumeText: string) {
  const response = await askAI(
    `
You are an expert ATS Resume Analyzer and Senior Technical Recruiter.

Analyze ONLY the uploaded resume.

IMPORTANT

Do NOT calculate an ATS Score.
The application calculates the ATS score separately.

Your responsibility is recruiter analysis only.

RULES

- Never invent skills, projects, experience, certifications, education, achievements, companies, links or technologies.
- Evaluate only what is explicitly written.
- If information is absent, treat it as missing.
- Never report existing skills as missing.
- Ignore minor spelling mistakes unless they reduce readability.
- Return ONLY valid JSON.
- No markdown.
- No explanations.

Evaluate:

- Formatting
- Readability
- Professional Summary
- Experience
- Projects
- Skills
- Education
- Leadership
- Achievements
- Quantified Impact
- ATS Compatibility
- Professionalism

Output JSON:

{
  "recruiterVerdict": {
    "overall": "",
    "interviewReadiness": "",
    "confidence": ""
  },

  "strengths": [],

  "issues": [],

  "missingKeywords": [],

  "improvements": [],

  "jobMatches": []
}
  Recruiter Verdict

Return:

{
  "overall": "",
  "interviewReadiness": "Excellent | Good | Fair | Needs Improvement",
  "confidence": "High | Medium | Low"
}

Strengths

Return 3–6 genuine strengths.

Each strength:

{
  "title":"",
  "description":""
}

Issues

Return 3–6 genuine issues.

Each issue:

{
  "title":"",
  "severity":"High | Medium | Low",
  "reason":"",
  "fix":""
}

Missing Keywords

Return only keywords genuinely missing.

Maximum 10.

Improvements

Return 3–6 actionable recommendations.

Job Matches

Return exactly five objects.

Each object:

{
  "title":"",
  "match":0,
  "reason":""
}

Before responding verify:

- Valid JSON
- recruiterVerdict exists
- strengths exists
- issues exists
- jobMatches has exactly 5 objects
- No hallucinations

Resume:

${resumeText}
`,
    true,
  );

  console.log("========== RAW AI RESPONSE ==========");
  console.log(response);
  console.log("=====================================");
  try {
    const analysis = JSON.parse(response);

    const recruiterVerdict =
      analysis.recruiterVerdict && typeof analysis.recruiterVerdict === "object"
        ? {
            overall:
              analysis.recruiterVerdict.overall?.trim() ||
              "The resume demonstrates relevant technical skills.",

            interviewReadiness:
              analysis.recruiterVerdict.interviewReadiness ||
              "Needs Improvement",

            confidence: analysis.recruiterVerdict.confidence || "Medium",
          }
        : {
            overall: "The resume demonstrates relevant technical skills.",
            interviewReadiness: "Needs Improvement",
            confidence: "Medium",
          };

    const strengths = Array.isArray(analysis.strengths)
      ? analysis.strengths
      : [];

    const issues = Array.isArray(analysis.issues) ? analysis.issues : [];

    const missingKeywords = Array.isArray(analysis.missingKeywords)
      ? analysis.missingKeywords
      : [];

    const improvements = Array.isArray(analysis.improvements)
      ? analysis.improvements
      : [];

    const jobMatches = Array.isArray(analysis.jobMatches)
      ? analysis.jobMatches
      : [];

    return {
      atsScore: 0,

      recruiterVerdict,

      strengths,

      issues,

      summary: recruiterVerdict.overall,

      weaknesses: issues.map((issue: any) => issue.reason),

      missingKeywords,

      improvements,

      jobMatches,
    };
  } catch (error) {
    console.error(response);
    throw new Error("AI returned invalid JSON.");
  }
}