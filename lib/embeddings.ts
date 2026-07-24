export async function createEmbedding(text: string): Promise<number[]> {
  const baseUrl =
    process.env.OLLAMA_URL ?? "http://localhost:11434";

  const url = `${baseUrl}/api/embeddings`;

  console.log("================================");
  console.log("Embedding URL:", url);
  console.log("Text length:", text.length);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "bge-m3",
        prompt: text,
      }),
    });

    console.log("Status:", response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      throw new Error(`Embedding API Error: ${response.status}`);
    }

    const json = await response.json();

    return json.embedding;
  } catch (err) {
    console.error("FULL ERROR");
    console.dir(err, { depth: null });
    throw err;
  }
}