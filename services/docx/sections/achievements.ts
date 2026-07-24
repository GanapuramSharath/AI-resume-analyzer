import { Paragraph } from "docx";
import { addHeading, addBullet } from "../helpers";

import { Resume } from "../types";

export function buildAchievements(children: Paragraph[], resume: Resume) {
  if (!resume.achievements?.length) return;

  addHeading(children, "Achievements");

  resume.achievements.forEach((item) => {
    addBullet(children, item);
  });
}
