import { Paragraph } from "docx";
import { addHeading } from "../helpers";
import { Resume } from "../types";

export function buildSummary(children: Paragraph[], resume: Resume) {
  if (!resume.summary) return;

  addHeading(children, "Professional Summary");

  children.push(
    new Paragraph({
      text: resume.summary,
    }),
  );
}
