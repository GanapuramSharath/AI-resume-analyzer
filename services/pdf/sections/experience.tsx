import { View, Text } from "@react-pdf/renderer";

import { Resume } from "../types";
import { styles } from "../styles";

export function buildExperience(resume: Resume) {
  if (!resume.experience?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Experience</Text>

      {resume.experience.map((exp, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.subHeading}>
            {exp.role}
            {exp.company ? ` | ${exp.company}` : ""}
          </Text>

          {exp.duration ? (
            <Text style={styles.small}>{exp.duration}</Text>
          ) : null}

          {exp.description?.map((line, i) => (
            <Text key={i} style={styles.bullet}>
              • {line}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
