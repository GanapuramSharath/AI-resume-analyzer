import { Text, View } from "@react-pdf/renderer";

import { Tailoring, Resume } from "../types";
import { styles } from "../styles";

export function buildContact(tailoring: Tailoring, resume: Resume) {
  const contact = resume.contact ?? {
    email: tailoring.resume.email,
    phone: tailoring.resume.phone,
    linkedin: tailoring.resume.linkedin,
    github: tailoring.resume.github,
    portfolio: tailoring.resume.portfolio,
  };

  const details = [
    contact.phone,
    contact.email,
    contact.linkedin,
    contact.github,
    contact.portfolio,
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
