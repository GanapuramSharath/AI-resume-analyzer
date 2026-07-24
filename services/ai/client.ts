import { ollama } from "@/lib/ollama";
import { OLLAMA_MODEL } from "@/lib/ollama-model";

export async function generateAI(prompt: string, json = false) {
  const response = await ollama.generate({
    model: OLLAMA_MODEL,
    prompt,
    stream: false,
    format: json ? "json" : undefined,
    options: {
      temperature: 0.2,
      top_p: 0.9,
      num_ctx: 8192,
      num_predict: 4096,
    },
  });

  return response.response;
}
