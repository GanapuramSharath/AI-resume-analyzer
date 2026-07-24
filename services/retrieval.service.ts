import { splitIntoChunks } from "@/lib/chunk";
import { createEmbedding } from "@/lib/embeddings";
import { cosineSimilarity } from "@/lib/cosine";

export async function retrieveRelevantChunks(
  resumeText: string,
  jobDescription: string,
  topK = 8,
) {
  const chunks = splitIntoChunks(resumeText);

  const jobEmbedding = await createEmbedding(jobDescription);

  const scored = await Promise.all(
    chunks.map(async (chunk) => {
      const embedding = await createEmbedding(chunk.text);

      return {
        text: chunk.text,
        score: cosineSimilarity(jobEmbedding, embedding),
      };
    }),
  );

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).map((x) => x.text);
}
