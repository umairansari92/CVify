import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    color: "#333",
  },
  header: {
    marginBottom: 40,
    borderBottom: "1pt solid #eee",
    paddingBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "heavy",
    color: "#0f172a",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  contact: {
    fontSize: 10,
    color: "#64748b",
  },
  date: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 10,
    color: "#475569",
  },
  content: {
    textAlign: "justify",
    whiteSpace: "pre-wrap",
  },
  footer: {
    marginTop: 50,
    fontSize: 10,
    color: "#94a3b8",
    textAlign: "center",
    borderTop: "1pt solid #eee",
    paddingTop: 20,
  },
});

const CoverLetterPDF = ({ letter, user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.contact}>
          {user?.email} | {letter.jobTitle} Application
        </Text>
      </View>

      <Text style={styles.date}>
        {new Date(letter.createdAt || Date.now()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>

      <View style={styles.content}>
        <Text>{letter.content}</Text>
      </View>

      <View style={styles.footer}>
        <Text>Generated via CVify - Your Professional Identity Partner</Text>
      </View>
    </Page>
  </Document>
);

export default CoverLetterPDF;
