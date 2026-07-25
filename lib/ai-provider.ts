import { ollama } from "./ollama";
import { OLLAMA_MODEL } from "./ollama-model";
import { getGroq } from "./groq";

export async function askAI(prompt: string, json = false) {
  // Normalize provider value
  const provider = (process.env.AI_PROVIDER ?? "ollama").trim().toLowerCase();

  console.log("================================");
  console.log("AI Provider:", provider);
  console.log("================================");

  //----------------------------------------------------------
  // Ollama
  //----------------------------------------------------------

  if (provider === "ollama") {
    const response = await ollama.generate({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
      format: json ? "json" : undefined,
      options: {
        temperature: 0.15,
        top_p: 0.9,
        num_ctx: 8192,
        num_predict: 4096,
      },
    });

    return response.response;
  }

  //----------------------------------------------------------
  // Groq
  //----------------------------------------------------------

  if (provider === "groq") {
    const groq = getGroq();

    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.15,

      response_format: json
        ? {
            type: "json_object",
          }
        : undefined,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response.");
    }

    return content;
  }

  //----------------------------------------------------------
  // Invalid Provider
  //----------------------------------------------------------

  throw new Error(`Unsupported AI_PROVIDER: ${provider}`);
}
