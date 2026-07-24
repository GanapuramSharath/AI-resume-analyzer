import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    marginBottom: 2,
  },

  bold: {
    fontWeight: "bold",
  },

  small: {
    fontSize: 10,
    color: "#666",
    marginBottom: 4,
  },

  subHeading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },

  bullet: {
    marginLeft: 12,
    marginBottom: 2,
    fontSize: 11,
  },

  item: {
    marginBottom: 10,
  },
  page: {
    padding: 35,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },

  contact: {
    textAlign: "center",
    fontSize: 10,
    color: "#555",
    marginBottom: 18,
  },

  section: {
    marginTop: 14,
  },

  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2563eb",
  },

  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    textAlign: "justify",
  },
});
