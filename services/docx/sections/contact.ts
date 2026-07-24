import { Paragraph, TextRun, AlignmentType } from "docx";

import { Resume } from "../types";

export function buildContact(children: Paragraph[], resume: Resume) {
  if (!resume.contact) return;

  const contact = [
    resume.contact.phone,
    resume.contact.email,
    resume.contact.linkedin,
    resume.contact.github,
    resume.contact.portfolio,
    resume.contact.location,
  ].filter(Boolean);

  if (contact.length === 0) return;

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 200,
      },
      children: [
        new TextRun({
          text: contact.join(" | "),
          size: 20,
        }),
      ],
    }),
  );
}
