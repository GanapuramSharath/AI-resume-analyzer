import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  section: {
    marginTop: 16,
  },

  heading: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },

  text: {
    marginBottom: 4,
  },

  bullet: {
    marginLeft: 12,
    marginBottom: 3,
  },

  projectTitle: {
    fontWeight: "bold",
    marginBottom: 3,
  },

  skillCategory: {
    fontWeight: "bold",
    marginTop: 6,
  },
});

type Props = {
  fileName: string;
  result: any;
};

export default function ResumePDF({
  fileName,
  result,
}: Props) {
  const resume = result?.tailoredResume;

  if (!resume) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No resume data found.</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{fileName.replace(/\.[^.]+$/, "")}</Text>

        {/* SUMMARY */}

        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.heading}>Professional Summary</Text>

            <Text style={styles.text}>{resume.summary}</Text>
          </View>
        )}

        {/* SKILLS */}

        {resume.skills && (
          <View style={styles.section}>
            <Text style={styles.heading}>Technical Skills</Text>

            {Object.entries(resume.skills).map(([key, value]: any) =>
              Array.isArray(value) && value.length > 0 ? (
                <View key={key}>
                  <Text style={styles.skillCategory}>{key.toUpperCase()}</Text>

                  <Text style={styles.text}>{value.join(", ")}</Text>
                </View>
              ) : null,
            )}
          </View>
        )}

        {/* PROJECTS */}

        {Array.isArray(resume.projects) && resume.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Projects</Text>

            {resume.projects.map((project: any, i: number) => (
              <View key={i}>
                <Text style={styles.projectTitle}>{project.title}</Text>

                {Array.isArray(project.description) &&
                  project.description.map((line: string, j: number) => (
                    <Text key={j} style={styles.bullet}>
                      • {line}
                    </Text>
                  ))}

                {Array.isArray(project.techStack) &&
                  project.techStack.length > 0 && (
                    <Text style={styles.text}>
                      Tech Stack: {project.techStack.join(", ")}
                    </Text>
                  )}
              </View>
            ))}
          </View>
        )}
        {/* EXPERIENCE */}

        {Array.isArray(resume.experience) && resume.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Experience</Text>

            {resume.experience.map((exp: any, i: number) => (
              <View key={i}>
                <Text style={styles.projectTitle}>
                  {exp.role}
                  {exp.company ? ` | ${exp.company}` : ""}
                </Text>

                {exp.duration && (
                  <Text style={styles.text}>{exp.duration}</Text>
                )}

                {Array.isArray(exp.description) &&
                  exp.description.map((line: string, j: number) => (
                    <Text key={j} style={styles.bullet}>
                      • {line}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}

        {Array.isArray(resume.education) && resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Education</Text>

            {resume.education.map((edu: any, i: number) => (
              <View key={i}>
                <Text style={styles.projectTitle}>{edu.degree}</Text>

                <Text style={styles.text}>
                  {[edu.college, edu.year].filter(Boolean).join(" | ")}
                </Text>

                {edu.cgpa && <Text style={styles.text}>CGPA: {edu.cgpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* CERTIFICATIONS */}

        {Array.isArray(resume.certifications) &&
          resume.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Certifications</Text>

              {resume.certifications.map((cert: any, i: number) => (
                <Text key={i} style={styles.bullet}>
                  • {typeof cert === "string" ? cert : (cert?.name ?? "")}
                </Text>
              ))}
            </View>
          )}

        {/* ACHIEVEMENTS */}

        {Array.isArray(resume.achievements) &&
          resume.achievements.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Achievements</Text>

              {resume.achievements.map((item: string, i: number) => (
                <Text key={i} style={styles.bullet}>
                  • {item}
                </Text>
              ))}
            </View>
          )}
      </Page>
    </Document>
  );
}