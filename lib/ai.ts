import { askAI } from "@/lib/ai-provider";

export async function analyzeResume(resumeText: string) {
  const response = await askAI(
    `
You are an expert ATS Resume Analyzer and Senior Technical Recruiter.

Analyze ONLY the uploaded resume.

RULES

- Never invent skills, projects, experience, certifications, education, achievements, companies, links, or technologies.
- Evaluate only what is explicitly written.
- If information is absent, treat it as missing.
- Never report existing skills or technologies as missing.
- Ignore minor spelling mistakes unless they reduce readability.
- Do not compare against a job description.
- Return ONLY valid JSON.
- No markdown.
- No explanations.

Evaluate:

- ATS Compatibility
- Formatting
- Readability
- Professional Summary
- Experience
- Projects
- Skills
- Education
- Achievements
- Leadership
- Quantified Impact
- Technical Skills
- Keywords
- Professionalism
- Grammar
- Structure

ATS Score

Return one integer between 0 and 100.

Guide:

90–100 Excellent

80–89 Strong

70–79 Good

60–69 Average

Below 60 Needs Significant Improvement

Output JSON

{
  "atsScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
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

Requirements

jobMatches is REQUIRED.

Return exactly 5 objects.

Never omit jobMatches.

Example:

"jobMatches":[
 {
   "title":"Frontend Developer",
   "match":94,
   "reason":"Strong React and JavaScript experience."
 },
 {
   "title":"Software Engineer",
   "match":90,
   "reason":"Good programming and project experience."
 },
 {
   "title":"Full Stack Developer",
   "match":88,
   "reason":"Experience across frontend and backend."
 },
 {
   "title":"Technology Analyst",
   "match":84,
   "reason":"Strong analytical and problem-solving skills."
 },
 {
   "title":"Web Developer",
   "match":82,
   "reason":"Relevant frontend projects."
 }
]For each role provide:

- title
- match (integer 0-100)
- reason (one concise sentence)

Only recommend roles supported by the resume.

Never invent experience.

Return ONLY valid JSON.

summary
- 2–4 concise sentences.
- Mention strongest areas and biggest improvement opportunities.

strengths
- Exactly 5 factual items.
- Maximum 18 words each.

weaknesses
- Exactly 5 factual weaknesses.
- Do not invent problems.
- Do not recommend unrelated technologies.

missingKeywords
- Include only keywords genuinely missing for the candidate's profession.
- Never include keywords already present.
- Maximum 10 keywords.
- Return [] if none.

improvements
- Exactly 5 actionable recommendations.
- Each should address one weakness.
- Maximum 20 words each.

Before responding verify:

- Valid JSON
- Integer atsScore
- Exactly 5 strengths
- Exactly 5 weaknesses
- Exactly 5 improvements
- No hallucinated information

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
    return {
      atsScore: analysis.atsScore ?? 0,

      summary:
        analysis.summary?.trim() ||
        "This resume demonstrates relevant technical skills and project experience.",

      strengths: analysis.strengths ?? [],

      weaknesses: analysis.weaknesses ?? [],

      missingKeywords: analysis.missingKeywords ?? [],

      improvements: analysis.improvements ?? [],

      jobMatches: analysis.jobMatches ?? [],
    };
  } catch (error) {
    console.dir(response, { depth: null });

    console.error(response);

    throw new Error("Qwen returned invalid JSON.");
  }
}