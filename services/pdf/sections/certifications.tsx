import { View, Text } from "@react-pdf/renderer";

import { Resume } from "../types";
import { styles } from "../styles";

export function buildCertifications(resume: Resume) {
  if (!resume.certifications?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Certifications</Text>

      {resume.certifications.map((cert, index) => (
        <Text key={index} style={styles.bullet}>
          • {typeof cert === "string" ? cert : cert.name}
        </Text>
      ))}
    </View>
  );
}
