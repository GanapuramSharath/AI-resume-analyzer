import { View, Text } from "@react-pdf/renderer";

import { Resume } from "../types";
import { styles } from "../styles";

export function buildEducation(resume: Resume) {
  if (!resume.education?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Education</Text>

      {resume.education.map((edu, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.subHeading}>{edu.degree}</Text>

          <Text style={styles.text}>
            {[edu.college, edu.year].filter(Boolean).join(" | ")}
          </Text>

          {edu.cgpa ? <Text style={styles.text}>CGPA: {edu.cgpa}</Text> : null}
        </View>
      ))}
    </View>
  );
}
