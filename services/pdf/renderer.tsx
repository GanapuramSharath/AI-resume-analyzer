import { Document, Page } from "@react-pdf/renderer";

import { Tailoring, Resume } from "./types";
import { styles } from "./styles";

import { buildTitle } from "./sections/title";
import { buildContact } from "./sections/contact";
import { buildSummary } from "./sections/summary";
import { buildSkills } from "./sections/skills";
import { buildProjects } from "./sections/projects";
import { buildExperience } from "./sections/experience";
import { buildEducation } from "./sections/education";
import { buildCertifications } from "./sections/certifications";
import { buildAchievements } from "./sections/achievements";

export function renderResume(tailoring: Tailoring, resume: Resume) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {buildTitle(tailoring, resume)}

        {buildContact(tailoring, resume)}

        {buildSummary(resume)}
        

        {buildSkills(resume)}

        {buildProjects(resume)}

        {buildExperience(resume)}

        
       
      </Page>
    </Document>
  );
}
