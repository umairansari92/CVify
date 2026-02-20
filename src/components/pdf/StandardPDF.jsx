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
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 1.5,
    borderBottomColor: "#111",
    paddingBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 14,
    color: "#444",
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
    lineHeight: 1.2,
  },
  contact: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9,
    color: "#4b5563",
    gap: 15,
  },
  contactItem: {
    marginBottom: 4,
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "#f8fafc",
    padding: "6 10",
    marginBottom: 12,
    color: "#1e293b",
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  entry: {
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#111",
  },
  subtitle: {
    fontSize: 10,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 6,
  },
  date: {
    fontSize: 9,
    color: "#6b7280",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 10,
  },
  bulletDot: {
    width: 10,
    color: "#2563eb",
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.5,
  },
});

const StandardPDF = ({ data }) => {
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
            {personalInfo?.email && (
              <Text style={styles.contactItem}>{personalInfo.email}</Text>
            )}
            {personalInfo?.phone && (
              <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            )}
            {personalInfo?.location && (
              <Text style={styles.contactItem}>{personalInfo.location}</Text>
            )}

            {personalInfo?.linkedin && (
              <Link style={styles.link} src={personalInfo.linkedin}>
                LinkedIn
              </Link>
            )}
            {personalInfo?.github && (
              <Link style={styles.link} src={personalInfo.github}>
                GitHub
              </Link>
            )}
            {personalInfo?.portfolio && (
              <Link style={styles.link} src={personalInfo.portfolio}>
                Portfolio
              </Link>
            )}
          </View>
        </View>

        {personalInfo?.profileSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text
              style={{ fontSize: 9.5, textAlign: "justify", lineHeight: 1.6 }}
            >
              {personalInfo.profileSummary}
            </Text>
          </View>
        )}

        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
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

        {technicalSkills &&
          Object.values(technicalSkills).some((a) => a?.length > 0) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {Object.entries(technicalSkills).map(
                ([key, val], i) =>
                  val?.length > 0 && (
                    <Text key={i} style={{ fontSize: 9.5, marginBottom: 6 }}>
                      <Text style={{ fontWeight: "bold", color: "#444" }}>
                        {key.toUpperCase()}:{" "}
                      </Text>
                      {val.join(", ")}
                    </Text>
                  ),
              )}
            </View>
          )}

        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{proj.name}</Text>
                  {proj.link && (
                    <Link
                      style={[styles.date, { color: "#2563eb" }]}
                      src={proj.link}
                    >
                      View Source
                    </Link>
                  )}
                </View>
                {proj.description?.map((desc, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text style={[styles.bulletDot, { color: "#6b7280" }]}>
                      -
                    </Text>
                    <Text style={styles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {competencies?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Skills</Text>
            {competencies.map((c, i) => (
              <View key={i} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{c}</Text>
              </View>
            ))}
          </View>
        )}

        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{edu.institution}</Text>
                  <Text style={styles.date}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.subtitle}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default StandardPDF;
