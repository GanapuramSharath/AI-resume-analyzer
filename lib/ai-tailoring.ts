import { buildAnalysisPrompt } from "@/services/analysis.service";
import { rewriteResume } from "@/services/rewrite-ai.service";
import { compareSkills } from "@/services/skill-extractor.service";
import { populateRewriteBeforeTexts } from "@/services/rewrite-helper.service";
import { generateSuggestions } from "@/services/suggestion-ai.service";
import { parseResume } from "@/services/resume-parser.service";
import { structureResume } from "@/services/resume-structure.service";
import { calculateSectionScores } from "@/services/section-score.service";
import { parseAnalysisResponse } from "./analysis-parser";
import { normalizeAnalysis } from "@/lib/analysis-normalizer";
import { buildStatistics } from "@/lib/statistics-builder";
import { buildScores } from "@/lib/scoring-builder";
import {
  sortSuggestions,
  removeDuplicateSuggestions,
} from "@/lib/suggestion-cleaner";
import { askAI } from "@/lib/ai-provider";

export async function analyzeResumeTailoring(
  resumeText: string,
  jobDescription: string,
) {
  //--------------------------------------------------------
  // STEP 1 : Parse Resume
  //--------------------------------------------------------

  const parsedResume = parseResume(resumeText);

  const structuredResume = structureResume(parsedResume);

  //--------------------------------------------------------
  // STEP 2 : Compare Skills
  //--------------------------------------------------------

  const comparison = compareSkills(structuredResume, jobDescription);

  //--------------------------------------------------------
  // STEP 3 : Build Prompt
  //--------------------------------------------------------

  const prompt = await buildAnalysisPrompt(
    resumeText,
    jobDescription,
    comparison.matched,
    comparison.missing,
  );

  //--------------------------------------------------------
  // STEP 4 : Ask AI
  //--------------------------------------------------------

  console.log("Prompt length:", prompt.length);

  const rawResponse = await askAI(prompt, true);

  console.log(rawResponse);
console.log("Response length:", rawResponse.length);
console.log(rawResponse.slice(-300));
  const parsed = parseAnalysisResponse(rawResponse);
  console.log("========== RAW ANALYSIS RESPONSE ==========");
  console.log(rawResponse);
  console.log("===========================================");

  normalizeAnalysis(parsed);

  parsed.resumeSkills = comparison.resumeSkills;
  parsed.jobSkills = comparison.jobSkills;
  parsed.matchedSkills = comparison.matched;
  parsed.missingSkills = comparison.missing;

  //--------------------------------------------------------
  // STEP 6 : Normalize Skills
  //--------------------------------------------------------

  parsed.resumeSkills = [
    ...new Set(
      (parsed.resumeSkills ?? [])
        .map((x: any) => (typeof x === "string" ? x.trim() : x.skill?.trim()))
        .filter(Boolean),
    ),
  ];

  console.log("========== PARSED ==========");
  console.log(parsedResume);

  console.log("========== STRUCTURED ==========");
  console.log(JSON.stringify(structuredResume, null, 2));

  parsed.jobSkills = [
    ...new Set(
      (parsed.jobSkills ?? [])
        .map((x: any) => (typeof x === "string" ? x.trim() : x.skill?.trim()))
        .filter(Boolean),
    ),
  ];

  parsed.matchedSkills = [
    ...new Set(
      (parsed.matchedSkills ?? [])
        .map((x: any) => (typeof x === "string" ? x.trim() : x.skill?.trim()))
        .filter(Boolean),
    ),
  ];
  const sectionScores = calculateSectionScores(
    structuredResume,
    parsed.matchedSkills,
  );

  parsed.sectionScores = sectionScores;

  parsed.missingSkills = [
    ...new Set(
      (parsed.missingSkills ?? [])
        .map((x: any) => (typeof x === "string" ? x.trim() : x.skill?.trim()))
        .filter(Boolean),
    ),
  ];

  //--------------------------------------------------------
  // STEP 7 : Rewrite Resume
  //--------------------------------------------------------

const suggestions = await generateSuggestions(
  structuredResume,
  jobDescription,
  parsed.matchedSkills,
  parsed.missingSkills,
);

parsed.rewriteSuggestions = suggestions.rewriteSuggestions;
parsed.overallSuggestions = suggestions.overallSuggestions;

const rewrittenResume = await rewriteResume(jobDescription, {
  structuredResume,
  matchedSkills: parsed.matchedSkills,
  missingSkills: parsed.missingSkills,
  recruiterSummary: parsed.recruiterSummary,
  rewriteSuggestions: parsed.rewriteSuggestions,
  overallSuggestions: parsed.overallSuggestions,
  sectionAnalysis: parsed.sectionAnalysis,
});

parsed.tailoredResume = rewrittenResume;

 parsed.tailoredResume = {
   ...structuredResume,
   ...rewrittenResume,

   contact: structuredResume.contact,
   skills: structuredResume.skills,
   education: structuredResume.education,
   certifications: structuredResume.certifications,
 };
  console.log("========== REWRITTEN RESUME ==========");
  console.dir(rewrittenResume, { depth: null });
  console.log("======================================");

  parsed.tailoredResume = {
    ...structuredResume,
    ...rewrittenResume,
  };
  //--------------------------------------------------------
  // STEP 8 : Build Scores
  //--------------------------------------------------------

  const scores = buildScores(
    parsed.matchedSkills,
    parsed.missingSkills,
    parsed.sectionScores,
  );

  parsed.keywordCoverage = scores.keywordCoverage;

  parsed.resumeHealth = scores.resumeHealth;

  parsed.scoreBreakdown = scores.jobMatch;

  parsed.jobMatch = scores.jobMatch.finalScore;

  parsed.atsScore = scores.ats.overall;

  parsed.atsBreakdown = scores.ats;

  //--------------------------------------------------------
  // STEP 9 : Final Dashboard Stats
  //--------------------------------------------------------

  parsed.statistics = buildStatistics(parsed);

  //--------------------------------------------------------
  // STEP 10 : Sort Suggestions
  //--------------------------------------------------------

  sortSuggestions(parsed);

  parsed.rewriteSuggestions = populateRewriteBeforeTexts(
    parsed.rewriteSuggestions,
    structuredResume,
  );

  removeDuplicateSuggestions(parsed);

  //--------------------------------------------------------
  // STEP 11 : Log Final Result
  //--------------------------------------------------------

  console.log("========== FINAL RESULT ==========");
  console.log(JSON.stringify(parsed, null, 2));
  console.log("==================================");

  return parsed;
}
