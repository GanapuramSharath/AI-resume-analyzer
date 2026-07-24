// app/api/test-embedding/route.ts

export async function GET() {
  try {
    const response = await fetch("http://localhost:11434/api/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "bge-m3",
        prompt: "hello",
      }),
    });

    const json = await response.json();

    return Response.json(json);
  } catch (err) {
    console.error(err);

    return Response.json(err, {
      status: 500,
    });
  }
}
