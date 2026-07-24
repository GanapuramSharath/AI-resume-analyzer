import { Text, View } from "@react-pdf/renderer";

import { Tailoring, Resume } from "../types";
import { styles } from "../styles";

export function buildTitle(tailoring: Tailoring, resume: Resume) {
  const name =
    resume.contact?.name ?? tailoring.resume.fileName.replace(/\.[^.]+$/, "");

  return (
    <View>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
}
