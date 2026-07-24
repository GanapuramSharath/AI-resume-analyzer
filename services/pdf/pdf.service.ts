import { buildDocument } from "./builder";
import { normalizeResume } from "./normalizer";
import { getTailoring } from "./tailoring";
import { renderResume } from "./renderer";

import { Resume } from "./types";

export async function generateResumePDF(tailoringId: string) {
  console.log("========== PDF EXPORT ==========");

  const tailoring = await getTailoring(tailoringId);

  const result = tailoring.result as {
    tailoredResume?: Resume;
  };

  const rawResume = result.tailoredResume;

  if (!rawResume) {
    throw new Error("Tailored resume not found.");
  }

  console.log("RAW RESUME");
  console.dir(rawResume, { depth: null });

  const resume = normalizeResume(rawResume);

  console.log("NORMALIZED RESUME");
  console.dir(resume, { depth: null });

  console.log("EDUCATION");
  console.dir(resume.education, { depth: null });

  const document = renderResume(tailoring, resume);

  try {
    const result = await buildDocument(document, tailoring.resume.fileName);

    console.log("PDF GENERATED SUCCESSFULLY");

    return result;
  } catch (error) {
    console.error("PDF BUILD FAILED");

    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.stack);
    } else {
      console.error(error);
    }

    throw error;
  }
}
