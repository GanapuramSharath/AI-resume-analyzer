import { ollama } from "@/lib/ollama";

export async function generateSuggestions(
  structuredResume: any,
  jobDescription: string,
  matchedSkills: string[],
  missingSkills: string[],
) {
  const prompt = `
You are a Senior ATS Resume Reviewer.

Your ONLY task is to generate resume improvement suggestions.

DO NOT rewrite the entire resume.

DO NOT calculate ATS score.

DO NOT calculate Job Match.

DO NOT explain strengths or weaknesses.

DO NOT invent:

- companies
- projects
- internships
- certifications
- technologies
- achievements
- metrics

Use ONLY the information provided below.

==================================================
RESUME
==================================================

${JSON.stringify(structuredResume, null, 2)}

==================================================
JOB DESCRIPTION
==================================================

${jobDescription}

==================================================
MATCHED SKILLS
==================================================

${matchedSkills.join(", ") || "None"}

==================================================
MISSING SKILLS
==================================================

${missingSkills.join(", ") || "None"}

==================================================
RULES
==================================================

Generate EXACTLY 2 rewriteSuggestions.

Generate EXACTLY 2 overallSuggestions.

Choose ONLY the TWO highest-impact improvements.

Suggestions MUST be based ONLY on the resume.

DO NOT recommend technologies that are not already present unless they appear in the Missing Skills list.

DO NOT recommend AWS, Azure, Docker, Kubernetes or other technologies unless they are listed under Missing Skills.

Avoid generic advice.

Prefer suggestions that improve:

- ATS keyword placement
- project descriptions
- measurable impact
- recruiter readability
- highlighting existing experience

Every rewrite suggestion MUST improve one specific section only.

Use section names like:

- Summary
- Skills
- Project: Spotify Clone
- Project: Face Emotion Recognition
- Experience
- Education

Return ONLY valid JSON.

==================================================
OUTPUT
==================================================

{
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
  ]
}
`;

  const response = await ollama.generate({
    model: "qwen2.5:7b",
    prompt,
    stream: false,
    format: "json",
    options: {
      temperature: 0.15,
      top_p: 0.9,
      num_ctx: 4096,
    },
  });

  let json = response.response
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  json = json.replace(/,\s*([}\]])/g, "$1");

  const start = json.indexOf("{");
  const end = json.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Invalid Suggestions JSON");
  }

  json = json.slice(start, end + 1);

  let parsed: any;

  try {
    parsed = JSON.parse(json);
  } catch (err) {
    console.error(json);
    throw err;
  }

  return {
    rewriteSuggestions: (parsed.rewriteSuggestions ?? []).slice(0, 2),
    overallSuggestions: (parsed.overallSuggestions ?? []).slice(0, 2),
  };
}
