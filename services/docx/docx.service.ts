import { buildDocument } from "./builder";
import { normalizeResume } from "./normalizer";
import { getTailoring } from "./tailoring";
import { renderResume } from "./renderer";

import { TailoringResult } from "./types";

export async function generateResumeDOCX(tailoringId: string) {
  const tailoring = await getTailoring(tailoringId);

  const result = tailoring.result as TailoringResult;

  const rawResume = result.tailoredResume;

  if (!rawResume) {
    throw new Error("Tailored resume not found.");
  }

  const resume = normalizeResume(rawResume);

  const children = renderResume(tailoring, resume);

  return buildDocument(children, tailoring.resume.fileName);
}
