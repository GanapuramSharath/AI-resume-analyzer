import { Text, View } from "@react-pdf/renderer";

import { Resume } from "../types";
import { styles } from "../styles";

export function buildSummary(resume: Resume) {
  if (!resume.summary) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Professional Summary</Text>

      <Text style={styles.paragraph}>{resume.summary}</Text>
    </View>
  );
}
