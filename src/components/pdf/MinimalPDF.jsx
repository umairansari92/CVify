import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#333",
    backgroundColor: "#fff",
    lineHeight: 1.6,
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: "light",
    textTransform: "uppercase",
    letterSpacing: 4,
    color: "#000",
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#94a3b8",
    letterSpacing: 2,
    marginBottom: 15,
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summary: {
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    marginBottom: 40,
    fontSize: 10,
    color: "#475569",
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    color: "#000",
  },
  experienceContainer: {
    maxWidth: 450,
    marginLeft: "auto",
    marginRight: "auto",
  },
  entry: {
    marginBottom: 25,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#64748b",
    marginBottom: 8,
  },
  date: {
    fontSize: 8,
    color: "#94a3b8",
    fontFamily: "Courier",
  },
  bullet: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  bulletDot: {
    width: 6,
    color: "#cbd5e1",
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: "#475569",
    lineHeight: 1.5,
  },
  skillsGrid: {
    flexDirection: "row",
    gap: 40,
    maxWidth: 450,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
  },
  skillCol: {
    flex: 1,
    textAlign: "center",
  },
  skillText: {
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.8,
  },
});

const MinimalPDF = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    technicalSkills,
    projects,
    competencies,
    softwareProficiency,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo?.fullName || "Your Name"}
          </Text>
          <Text style={styles.jobTitle}>
            {personalInfo?.jobTitle || "Job Title"}
          </Text>
          <View style={styles.contact}>
            {personalInfo?.email && <Text>{personalInfo.email}</Text>}
            {personalInfo?.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo?.location && <Text>{personalInfo.location}</Text>}
            {personalInfo?.linkedin && <Text>LinkedIn</Text>}
          </View>
        </View>

        {personalInfo?.profileSummary && (
          <Text style={styles.summary}>{personalInfo.profileSummary}</Text>
        )}

        {experience?.length > 0 && (
          <View style={styles.experienceContainer}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{exp.position}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.subtitle}>{exp.company}</Text>
                {exp.responsibilities?.map((res, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{res}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {projects?.length > 0 && (
          <View style={styles.experienceContainer}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {projects.map((proj, i) => (
                <View
                  key={i}
                  style={{ width: "48%", marginBottom: 15 }}
                  wrap={false}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 10,
                      marginBottom: 4,
                    }}
                  >
                    {proj.name}
                  </Text>
                  <Text style={{ fontSize: 8.5, color: "#64748b" }}>
                    {proj.description?.join(" ")}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.skillsGrid}>
          {education?.length > 0 && (
            <View style={styles.skillCol}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                    {edu.degree}
                  </Text>
                  <Text style={{ fontSize: 9 }}>{edu.institution}</Text>
                  <Text style={{ fontSize: 8, color: "#94a3b8" }}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.skillCol}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {competencies?.length > 0 && (
              <Text style={styles.skillText}>{competencies.join(" • ")}</Text>
            )}
            {softwareProficiency?.length > 0 && (
              <Text style={styles.skillText}>
                {softwareProficiency.join(", ")}
              </Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MinimalPDF;
