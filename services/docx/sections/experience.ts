import { Paragraph, TextRun } from "docx";
import { addHeading, addBullet } from "../helpers";

import { Resume } from "../types";

export function buildExperience(children: Paragraph[], resume: Resume) {
  if (!resume.experience?.length) return;

  addHeading(children, "Experience");

  resume.experience.forEach((exp) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${exp.role}${exp.company ? ` | ${exp.company}` : ""}`,
            bold: true,
          }),
        ],
      }),
    );

    if (exp.duration) {
      children.push(
        new Paragraph({
          text: exp.duration,
        }),
      );
    }

    if (Array.isArray(exp.description)) {
      exp.description.forEach((line) => {
        addBullet(children, line);
      });
    }
  });
}
