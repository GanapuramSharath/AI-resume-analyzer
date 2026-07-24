import { Paragraph } from "docx";

import { Tailoring, Resume } from "./types";

import { buildTitle } from "./sections/title";
import { buildContact } from "./sections/contact";
import { buildSummary } from "./sections/summary";
import { buildSkills } from "./sections/skills";
import { buildProjects } from "./sections/projects";
import { buildExperience } from "./sections/experience";
import { buildEducation } from "./sections/education";
import { buildCertifications } from "./sections/certifications";
import { buildAchievements } from "./sections/achievements";

export function renderResume(
  tailoring: Tailoring,
  resume: Resume,
): Paragraph[] {
  const children: Paragraph[] = [];

  // Header
  buildTitle(children, tailoring, resume);
  buildContact(children, resume);

  // Body
  buildSummary(children, resume);
  buildSkills(children, resume);
  buildProjects(children, resume);
  buildExperience(children, resume);
  buildEducation(children, resume);
  buildCertifications(children, resume);
  buildAchievements(children, resume);

  return children;
}
