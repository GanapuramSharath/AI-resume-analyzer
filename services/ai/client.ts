import { askAI } from "@/lib/ai-provider";

export async function generateAI(prompt: string, json = false) {
  return await askAI(prompt, json);
}
