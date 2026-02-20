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
    padding: "20mm",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#2c3e50",
    backgroundColor: "#fff",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 30,
    borderBottom: "2pt solid #2c3e50",
    paddingBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 15,
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    fontSize: 9,
    color: "#34495e",
  },
  contactItem: {
    marginBottom: 3,
  },
  link: {
    color: "#2980b9",
    textDecoration: "none",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#2c3e50",
    backgroundColor: "#ecf0f1",
    padding: "5 10",
    marginBottom: 10,
    letterSpacing: 1,
  },
  summary: {
    fontSize: 10,
    textAlign: "justify",
    marginBottom: 10,
    lineHeight: 1.6,
  },
  entry: {
    marginBottom: 15,
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
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 10,
    color: "#2980b9",
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#7f8c8d",
  },
  bulletList: {
    paddingLeft: 12,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletDot: {
    width: 12,
    color: "#2c3e50",
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: "#34495e",
    textAlign: "justify",
  },
  skillsTable: {
    marginTop: 5,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 6,
    borderBottom: "0.5pt solid #eee",
    paddingBottom: 4,
  },
  skillLabel: {
    width: 120,
    fontSize: 9,
    fontWeight: "bold",
    color: "#7f8c8d",
    textTransform: "uppercase",
  },
  skillValue: {
    flex: 1,
    fontSize: 10,
    color: "#2c3e50",
  },
});

const ElitePDF = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    technicalSkills,
    projects,
    competencies,
    softwareProficiency,
  } = data || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo?.fullName || "Your Name"}
          </Text>
          <Text style={styles.jobTitle}>
            {personalInfo?.jobTitle || "Job Title"}
          </Text>
          <View style={styles.contactGrid}>
            <Text style={styles.contactItem}>{personalInfo?.email}</Text>
            <Text style={styles.contactItem}>{personalInfo?.phone}</Text>
            <Text style={styles.contactItem}>{personalInfo?.location}</Text>
            {personalInfo?.linkedin && (
              <Link src={personalInfo.linkedin} style={styles.link}>
                LinkedIn
              </Link>
            )}
            {personalInfo?.github && (
              <Link src={personalInfo.github} style={styles.link}>
                GitHub
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {personalInfo?.profileSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Executive Summary</Text>
            <Text style={styles.summary}>{personalInfo.profileSummary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{exp.position}</Text>
                  <Text style={styles.date}>
                    {exp.startDate.toUpperCase()} — {exp.endDate.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.subtitle}>{exp.company}</Text>
                <View style={styles.bulletList}>
                  {exp.responsibilities?.map((res, j) => (
                    <View key={j} style={styles.bullet}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{res}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Academic Background</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{edu.degree}</Text>
                  <Text style={styles.date}>
                    {edu.startDate} — {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.subtitle}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(technicalSkills ||
          competencies?.length > 0 ||
          softwareProficiency?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Competencies</Text>
            <View style={styles.skillsTable}>
              {technicalSkills &&
                Object.entries(technicalSkills).map(
                  ([cat, list], i) =>
                    list?.length > 0 && (
                      <View key={i} style={styles.skillRow}>
                        <Text style={styles.skillLabel}>{cat}</Text>
                        <Text style={styles.skillValue}>{list.join(", ")}</Text>
                      </View>
                    ),
                )}
              {competencies?.length > 0 && (
                <View style={styles.skillRow}>
                  <Text style={styles.skillLabel}>Core Skills</Text>
                  <Text style={styles.skillValue}>
                    {competencies.join(", ")}
                  </Text>
                </View>
              )}
              {softwareProficiency?.length > 0 && (
                <View style={styles.skillRow}>
                  <Text style={styles.skillLabel}>Technologies</Text>
                  <Text style={styles.skillValue}>
                    {softwareProficiency.join(", ")}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{proj.name}</Text>
                  {proj.link && (
                    <Link src={proj.link} style={[styles.date, styles.link]}>
                      VIEW PROJECT
                    </Link>
                  )}
                </View>
                <View style={styles.bulletList}>
                  {proj.description?.map((desc, j) => (
                    <View key={j} style={styles.bullet}>
                      <Text style={styles.bulletDot}>-</Text>
                      <Text style={styles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ElitePDF;
