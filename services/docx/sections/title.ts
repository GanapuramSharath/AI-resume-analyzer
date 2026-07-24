import { Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

import { Tailoring, Resume } from "../types";

export function buildTitle(
  children: Paragraph[],
  tailoring: Tailoring,
  resume: Resume,
) {
  const name =
    resume.contact?.name ?? tailoring.resume.fileName.replace(/\.[^.]+$/, "");

  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 250,
      },
      children: [
        new TextRun({
          text: name,
          bold: true,
          size: 34,
        }),
      ],
    }),
  );
}
