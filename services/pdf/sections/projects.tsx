import { View, Text } from "@react-pdf/renderer";

import { Resume } from "../types";
import { styles } from "../styles";

export function buildProjects(resume: Resume) {
  if (!resume.projects?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Projects</Text>

      {resume.projects.map((project, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.subHeading}>{project.title}</Text>

          {project.description?.map((line, i) => (
            <Text key={i} style={styles.bullet}>
              • {line}
            </Text>
          ))}

          {project.techStack?.length ? (
            <Text style={styles.text}>
              <Text style={styles.bold}>Tech Stack: </Text>
              {project.techStack.join(", ")}
            </Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}
