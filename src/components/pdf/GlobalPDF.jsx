import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "15mm",
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: "#1a1a1a",
    backgroundColor: "#fff",
    lineHeight: 1.6,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
    borderBottom: "1pt solid #eeeeee",
    paddingBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#000",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 11,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    gap: 15,
    fontSize: 8.5,
    color: "#444",
  },
  link: {
    color: "#444",
    textDecoration: "none",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#000",
    marginBottom: 10,
    borderBottom: "0.5pt solid #000",
    paddingBottom: 2,
    width: "100%",
  },
  summary: {
    textAlign: "justify",
    marginBottom: 10,
  },
  entry: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  title: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 9.5,
    color: "#444",
    fontWeight: "medium",
  },
  date: {
    fontSize: 8.5,
    color: "#888",
  },
  bulletList: {
    marginTop: 4,
    paddingLeft: 10,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
    color: "#aaa",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#333",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  skillCategory: {
    width: "45%",
    marginBottom: 8,
  },
  skillLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  skillValue: {
    fontSize: 9,
    color: "#333",
  },
});

const GlobalPDF = ({ data }) => {
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
          <View style={styles.contactRow}>
            {personalInfo?.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo?.email && <Text>{personalInfo.email}</Text>}
            {personalInfo?.location && <Text>{personalInfo.location}</Text>}
          </View>
          <View style={[styles.contactRow, { marginTop: 4 }]}>
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
            {personalInfo?.portfolio && (
              <Link src={personalInfo.portfolio} style={styles.link}>
                Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {personalInfo?.profileSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{personalInfo.profileSummary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{exp.position}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} — {exp.endDate}
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

        {/* Projects */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{proj.name}</Text>
                  <Text style={styles.date}>
                    {proj.startDate} — {proj.endDate}
                  </Text>
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

        {/* Education */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsGrid}>
            {technicalSkills &&
              Object.entries(technicalSkills).map(
                ([cat, list], i) =>
                  list?.length > 0 && (
                    <View key={i} style={styles.skillCategory}>
                      <Text style={styles.skillLabel}>{cat}</Text>
                      <Text style={styles.skillValue}>{list.join(", ")}</Text>
                    </View>
                  ),
              )}
            {softwareProficiency?.length > 0 && (
              <View style={styles.skillCategory}>
                <Text style={styles.skillLabel}>Software</Text>
                <Text style={styles.skillValue}>
                  {softwareProficiency.join(", ")}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Core Skills */}
        {competencies?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Skills</Text>
            <View style={styles.skillsGrid}>
              {competencies.map((c, i) => (
                <View
                  key={i}
                  style={[
                    styles.skillCategory,
                    { width: "100%", marginBottom: 4 },
                  ]}
                >
                  <View style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default GlobalPDF;
