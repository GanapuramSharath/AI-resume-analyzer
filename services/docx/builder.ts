import { Document, Packer, Paragraph } from "docx";

export async function buildDocument(children: Paragraph[], fileName: string) {
  const document = new Document({
    sections: [
      {
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(document);

  return {
    buffer,
    fileName: `${fileName.replace(/\.[^.]+$/, "")}_Tailored_Resume.docx`,
  };
}
