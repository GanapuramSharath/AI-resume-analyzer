import { buildRewritePrompt } from "@/services/ai/prompts/rewrite.prompt";
import { ollama } from "@/lib/ollama";
import { OLLAMA_MODEL } from "@/lib/ollama-model";

export async function rewriteResume(jobDescription: string, analysis: any) {
  const prompt = await buildRewritePrompt(jobDescription, analysis);

  console.log("========== REWRITE INPUT ==========");
  console.dir(analysis.structuredResume, { depth: null });
  console.log("===================================");
  console.log("ANALYSIS");
  console.dir(analysis, { depth: null });

  console.log("========== REWRITE PROMPT ==========");
  console.log("Prompt Length:", prompt.length);
  console.log(prompt);
  console.log("====================================");

  const response = await ollama.generate({
    model: OLLAMA_MODEL,
    prompt,
    stream: false,
    format: "json",
    options: {
      temperature: 0,
      top_p: 0.8,
      num_ctx: 8192,
      num_predict: 4096,
    },
  });

  console.log("========== RAW REWRITE ==========");
  console.log(response.response);
  console.log("=================================");

  let jsonText = response.response
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  jsonText = jsonText.replace(/,\s*([}\]])/g, "$1");

  const start = jsonText.indexOf("{");
  const end = jsonText.lastIndexOf("}");

  if (start === -1 || end === -1) {
    console.error("Model didn't return valid JSON.");
    console.error(jsonText);
    throw new Error("Invalid rewrite JSON.");
  }

  jsonText = jsonText.slice(start, end + 1);

  try {
    const rewritten = JSON.parse(jsonText);

    console.log("========== MODEL OUTPUT ==========");
    console.dir(rewritten, { depth: null });
    console.log("==================================");

    // ----------------------------
    // Normalize missing sections
    // ----------------------------

    rewritten.contact ??= {};

    rewritten.summary ??= "";

    rewritten.skills ??= {};

    rewritten.projects ??= [];

    rewritten.experience ??= [];

    rewritten.education ??= [];

    rewritten.certifications ??= [];

    rewritten.achievements ??= [];

    console.log("========== REWRITE SUMMARY ==========");
    console.log("Summary:", !!rewritten.summary);
    console.log("Contact:", !!rewritten.contact);
    console.log("Skills:", Object.keys(rewritten.skills).length);
    console.log("Projects:", rewritten.projects.length);
    console.log("Experience:", rewritten.experience.length);
    console.log("Education:", rewritten.education.length);
    console.log("Certifications:", rewritten.certifications.length);
    console.log("Achievements:", rewritten.achievements.length);
    console.log("====================================");

    console.log("========== FINAL REWRITTEN RESUME ==========");
    console.dir(rewritten, { depth: null });
    console.log("============================================");

    return {
      summary: rewritten.summary,
      projects: rewritten.projects,
      experience: rewritten.experience,
    };
  } catch (err) {
    console.error("========== FAILED JSON ==========");
    console.error(jsonText);
    console.error("=================================");
    throw err;
  }
}
