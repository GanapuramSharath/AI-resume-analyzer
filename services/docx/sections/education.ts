import { Paragraph, TextRun } from "docx";
import { addHeading } from "../helpers";

import { Resume } from "../types";

export function buildEducation(children: Paragraph[], resume: Resume) {
  if (!resume.education?.length) return;

  addHeading(children, "Education");

  resume.education.forEach((edu) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: edu.degree,
            bold: true,
          }),
        ],
      }),
    );

    children.push(
      new Paragraph({
        text: [edu.college, edu.year].filter(Boolean).join(" | "),
      }),
    );

    if (edu.cgpa) {
      children.push(
        new Paragraph({
          text: `CGPA: ${edu.cgpa}`,
        }),
      );
    }
  });
}
