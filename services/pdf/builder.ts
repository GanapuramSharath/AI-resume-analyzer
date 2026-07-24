import { pdf } from "@react-pdf/renderer";

export async function buildDocument(document: JSX.Element, fileName: string) {
  const buffer = await pdf(document).toBuffer();

  return {
    buffer,
    fileName: `${fileName.replace(/\.[^.]+$/, "")}_Tailored_Resume.pdf`,
  };
}
