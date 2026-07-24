import { Text, View } from "@react-pdf/renderer";

import { Resume } from "../types";
import { styles } from "../styles";

export function buildContact(resume: Resume) {
  if (!resume.contact) {
    return null;
  }

  const details = [
    resume.contact.phone,
    resume.contact.email,
    resume.contact.linkedin,
    resume.contact.github,
    resume.contact.portfolio,
  ].filter(Boolean);

  if (details.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={styles.contact}>{details.join(" | ")}</Text>
    </View>
  );
}
