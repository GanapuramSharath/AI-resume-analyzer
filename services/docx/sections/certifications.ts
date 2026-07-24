import { Paragraph } from "docx";
import { addHeading, addBullet } from "../helpers";
import { Resume } from "../types";

export function buildCertifications(children: Paragraph[], resume: Resume) {
  if (!resume.certifications?.length) return;

  addHeading(children, "Certifications");

  resume.certifications.forEach((cert) => {
    addBullet(children, typeof cert === "string" ? cert : cert.name);
  });
}
