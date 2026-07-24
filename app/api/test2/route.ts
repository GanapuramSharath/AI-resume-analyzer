import { NextResponse } from "next/server";
import { splitIntoChunks } from "@/lib/chunk";

export async function GET() {
  const text = `
John Doe

Skills
React
Next.js
Node.js
TypeScript

Experience

Built an AI Resume Analyzer.

Projects

Portfolio Website

Education

B.Tech Computer Science
`;

  const chunks = splitIntoChunks(text);

  return NextResponse.json(chunks);
}
