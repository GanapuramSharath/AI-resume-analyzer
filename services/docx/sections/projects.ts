import { Paragraph, TextRun } from "docx";

import { addHeading, addBullet } from "../helpers";
import { Resume } from "../types";
export function buildProjects(children: Paragraph[], resume: Resume) {
  if (!resume.projects?.length) return;

  addHeading(children, "Projects");

  resume.projects.forEach((project) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: project.title,
            bold: true,
          }),
        ],
      }),
    );

    if (Array.isArray(project.description)) {
      project.description.forEach((line) => {
        addBullet(children, line);
      });
    }

    if (Array.isArray(project.techStack) && project.techStack.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Tech Stack: ",
              bold: true,
            }),
            new TextRun(project.techStack.join(", ")),
          ],
        }),
      );
    }
  });
}
