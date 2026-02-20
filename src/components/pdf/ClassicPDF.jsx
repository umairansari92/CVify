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
    padding: 50,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    backgroundColor: "#fff",
    lineHeight: 1.5,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#111",
    paddingBottom: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000",
    letterSpacing: 1,
    marginBottom: 8,
    lineHeight: 1,
  },
  jobTitle: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 0,
  },
  contact: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 10,
    fontSize: 9,
    color: "#6b7280",
  },
  summary: {
    fontSize: 9.5,
    color: "#4b5563",
    marginBottom: 20,
    textAlign: "justify",
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 4,
    marginBottom: 12,
    color: "#111",
  },
  entry: {
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111",
  },
  subtitle: {
    fontSize: 10,
    color: "#4b5563",
    fontStyle: "italic",
    marginBottom: 5,
  },
  date: {
    fontSize: 9,
    color: "#6b7280",
  },
  bullet: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
    paddingLeft: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  skillText: {
    fontSize: 9.5,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  grid: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
  },
  gridItem: {
    width: "45%",
    marginBottom: 12,
  },
  skillLabel: {
    fontWeight: "bold",
    color: "#4b5563",
  },
});

const ClassicPDF = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    technicalSkills,
    projects,
    competencies,
    softwareProficiency,
    interests,
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
            {personalInfo?.linkedin && (
              <Link src={personalInfo.linkedin} style={{ color: "#1e3a8a" }}>
                LinkedIn
              </Link>
            )}
            {personalInfo?.github && (
              <Link src={personalInfo.github} style={{ color: "#111" }}>
                GitHub
              </Link>
            )}
          </View>
        </View>

        {personalInfo?.profileSummary && (
          <Text style={styles.summary}>{personalInfo.profileSummary}</Text>
        )}

        {experience?.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Work Experience</Text>
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
                    <Text>•</Text>
                    <Text style={styles.bulletText}>{res}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {projects?.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{proj.name}</Text>
                  {proj.link && (
                    <Link
                      style={{ fontSize: 8, color: "#2563eb" }}
                      src={proj.link}
                    >
                      View Link
                    </Link>
                  )}
                </View>
                {proj.description?.map((desc, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text>•</Text>
                    <Text style={styles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {technicalSkills &&
          Object.values(technicalSkills).some((a) => a?.length > 0) && (
            <View>
              <Text style={styles.sectionTitle}>Technical Skills</Text>
              <View style={styles.grid}>
                {Object.entries(technicalSkills).map(
                  ([cat, list], i) =>
                    list?.length > 0 && (
                      <View key={i} style={styles.gridItem}>
                        <Text style={[styles.skillText, { fontSize: 9 }]}>
                          <Text style={styles.skillLabel}>
                            {cat.toUpperCase()}:{" "}
                          </Text>
                          {list.join(", ")}
                        </Text>
                      </View>
                    ),
                )}
              </View>
            </View>
          )}

        {(competencies?.length > 0 || softwareProficiency?.length > 0) && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sectionTitle}>Core Skills</Text>
            {softwareProficiency?.length > 0 && (
              <Text style={styles.skillText}>
                <Text style={styles.skillLabel}>Software: </Text>
                {softwareProficiency.join(", ")}
              </Text>
            )}
            {competencies?.length > 0 && (
              <View style={{ marginTop: 5 }}>
                {competencies.map((c, i) => (
                  <View key={i} style={styles.bullet}>
                    <Text>•</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {education?.length > 0 && (
          <View style={{ marginTop: 15 }}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 10 }} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{edu.institution}</Text>
                  <Text style={styles.date}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.skillText}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ClassicPDF;
