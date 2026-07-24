export function parseAnalysisResponse(response: string) {
  let json = response
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  json = json.replace(/,\s*([\]}])/g, "$1");

  const start = json.indexOf("{");
  const end = json.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Invalid JSON returned from AI.");
  }

  json = json.slice(start, end + 1);

  try {
    return JSON.parse(json);
  } catch (err) {
    console.error("Failed JSON:");
    console.error(json);
    throw err;
  }
}
