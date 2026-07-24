import { pdf } from "@react-pdf/renderer";
import type { JSX } from "react";
export async function buildDocument(document: JSX.Element, fileName: string) {
  const stream = await pdf(document).toBlob();

  const buffer = Buffer.from(await stream.arrayBuffer());

  return {
    buffer,
    fileName: `${fileName.replace(/\.[^.]+$/, "")}_Tailored_Resume.pdf`,
  };
}
