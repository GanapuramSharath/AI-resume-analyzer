import { View, Text } from "@react-pdf/renderer";

import { Resume } from "../types";
import { styles } from "../styles";

export function buildSkills(resume: Resume) {
  if (!resume.skills) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Technical Skills</Text>

      {Object.entries(resume.skills).map(([key, value]) =>
        value.length > 0 ? (
          <View key={key} style={{ marginBottom: 4 }}>
            <Text style={styles.bold}>{key.toUpperCase()}</Text>

            <Text style={styles.text}>{value.join(", ")}</Text>
          </View>
        ) : null,
      )}
    </View>
  );
}
