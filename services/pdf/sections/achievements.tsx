import { View, Text } from "@react-pdf/renderer";

import { Resume } from "../types";
import { styles } from "../styles";

export function buildAchievements(resume: Resume) {
  if (!resume.achievements?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Achievements</Text>

      {resume.achievements.map((achievement, index) => (
        <Text key={index} style={styles.bullet}>
          • {achievement}
        </Text>
      ))}
    </View>
  );
}
