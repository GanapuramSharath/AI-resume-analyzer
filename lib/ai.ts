import { askAI } from "@/lib/ai-provider";

export type Strength = {
  title: string;
  description: string;
};

export type Issue = {
  title: string;
  severity: "High" | "Medium" | "Low";
  reason: string;
  fix: string;
};

export type RecruiterVerdict = {
  overall: string;
  interviewReadiness: string;
  confidence: string;
};

export async function analyzeResume(resumeText: string) {
  const response = await askAI(
    `
You are an expert ATS Resume Analyzer and Senior Technical Recruiter.

Analyze ONLY the uploaded resume.

IMPORTANT

- Do NOT calculate an ATS score.
- Never invent experience, skills, projects, education or certifications.
- Evaluate only what exists in the resume.
- Return ONLY valid JSON.
- No markdown.
- No explanations.

Return exactly this JSON:

{

  "recruiterVerdict": {
    "overall": "",
    "interviewReadiness": "Excellent | Good | Fair | Needs Improvement",
    "confidence": "High | Medium | Low"
  },

  "strengths": [
    {
      "title": "",
      "description": ""
    }
  ],

  "issues": [
    {
      "title": "",
      "severity": "High | Medium | Low",
      "reason": "",
      "fix": ""
    }
  ],

  "missingKeywords": [],

  "improvements": [],

  "jobMatches": [
    {
      "title": "",
      "match": 0,
      "reason": ""
    }
  ]
}

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

    const recruiterVerdict: RecruiterVerdict = {
      overall:
        analysis?.recruiterVerdict?.overall?.trim() ||
        "The resume demonstrates relevant technical skills.",

      interviewReadiness:
        analysis?.recruiterVerdict?.interviewReadiness || "Needs Improvement",

      confidence: analysis?.recruiterVerdict?.confidence || "Medium",
    };

    const strengths: Strength[] = Array.isArray(analysis?.strengths)
      ? analysis.strengths.map((item: any) => ({
          title: String(item?.title ?? ""),
          description: String(item?.description ?? ""),
        }))
      : [];

    const issues: Issue[] = Array.isArray(analysis?.issues)
      ? analysis.issues.map((item: any) => ({
          title: String(item?.title ?? ""),
          severity:
            item?.severity === "High" ||
            item?.severity === "Medium" ||
            item?.severity === "Low"
              ? item.severity
              : "Medium",
          reason: String(item?.reason ?? ""),
          fix: String(item?.fix ?? ""),
        }))
      : [];

    const missingKeywords = Array.isArray(analysis?.missingKeywords)
      ? analysis.missingKeywords
      : [];

    const improvements = Array.isArray(analysis?.improvements)
      ? analysis.improvements
      : [];

    const jobMatches = Array.isArray(analysis?.jobMatches)
      ? analysis.jobMatches.slice(0, 5)
      : [];

    return {
      // Temporary until ATS scoring is reconnected
      atsScore:0,

      recruiterVerdict,

      strengths,

      issues,

      // Backward compatibility with existing Prisma schema
      summary: recruiterVerdict.overall,

      weaknesses: issues.map((issue) => issue.reason),

      missingKeywords,

      improvements,

      jobMatches,
    };
  } catch (error) {
    console.error("Invalid AI response");
    console.error(response);
    throw new Error("AI returned invalid JSON.");
  }
}
