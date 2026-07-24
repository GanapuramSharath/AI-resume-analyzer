import { extractDocx } from "./docx";
import { extractPdf } from "./pdf";

const PDF = "application/pdf";

const DOCX =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export async function extractResumeText(
  file: File,
  buffer: Buffer,
): Promise<string> {
  console.log("File:", file.name);
  console.log("Type:", file.type);

  switch (file.type) {
    case PDF:
      return extractPdf(buffer);

    case DOCX:
      return extractDocx(buffer);

    default:
      throw new Error("Only PDF and DOCX files are supported.");
  }
}
