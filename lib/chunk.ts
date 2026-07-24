export interface ResumeChunk {
  id: string;
  text: string;
}

const CHUNK_SIZE = 700;
const OVERLAP = 150;

export function splitIntoChunks(text: string): ResumeChunk[] {
  const clean = text
    .replace(/\r/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();

  const chunks: ResumeChunk[] = [];

  let start = 0;
  let index = 0;

  while (start < clean.length) {
    const end = Math.min(start + CHUNK_SIZE, clean.length);

    chunks.push({
      id: `chunk-${index}`,
      text: clean.slice(start, end),
    });

    start += CHUNK_SIZE - OVERLAP;
    index++;
  }

  return chunks;
}
