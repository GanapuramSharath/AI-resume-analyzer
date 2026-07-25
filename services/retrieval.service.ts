import { splitIntoChunks } from "@/lib/chunk";

export async function retrieveRelevantChunks(
  resumeText: string,
  jobDescription: string,
  topK = 8,
) {
  const keywords = new Set(
    jobDescription
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 2),
  );

  const scored = splitIntoChunks(resumeText).map((chunk) => {
    const words = chunk.text.toLowerCase().split(/\W+/);

    const score = words.reduce(
      (count, word) => count + (keywords.has(word) ? 1 : 0),
      0,
    );

    return {
      text: chunk.text,
      score,
    };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).map((x) => x.text);
}
