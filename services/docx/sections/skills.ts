import { Paragraph, TextRun } from "docx";
import { addHeading } from "../helpers";

import { Resume } from "../types";

export function buildSkills(children: Paragraph[], resume: Resume) {
  if (!resume.skills) return;

  addHeading(children, "Technical Skills");

  Object.entries(resume.skills).forEach(([key, value]) => {
    if (!Array.isArray(value) || value.length === 0) return;

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${key.toUpperCase()}: `,
            bold: true,
          }),
          new TextRun(value.join(", ")),
        ],
      }),
    );
  });
}
