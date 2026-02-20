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
    fontFamily: "Times-Roman",
    fontSize: 10,
    color: "#1e293b",
    backgroundColor: "#fff",
    lineHeight: 1.4,
  },
  header: {
    borderBottomWidth: 3,
    borderBottomColor: "#0f172a",
    paddingBottom: 20,
    marginBottom: 25,
    textAlign: "center",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#0f172a",
    marginBottom: 8,
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    color: "#475569",
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 15,
  },
  contact: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
    gap: 8,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
    fontSize: 9,
    fontWeight: "bold",
    color: "#334155",
    lineHeight: 1.2,
  },
  main: {
    flexDirection: "row",
    gap: 30,
  },
  content: {
    flex: 2,
  },
  sidebar: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1.5,
    borderBottomColor: "#0f172a",
    paddingBottom: 4,
    marginBottom: 12,
    color: "#0f172a",
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
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 10,
    color: "#334155",
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 9,
    color: "#64748b",
  },
  bullet: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
    paddingLeft: 10,
  },
  bulletSign: {
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    textAlign: "justify",
    lineHeight: 1.4,
  },
  sidebarBox: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#0f172a",
    marginBottom: 15,
  },
  sidebarItem: {
    fontSize: 9,
    marginBottom: 6,
  },
  skillLabel: {
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 2,
  },
});

const ExecutivePDF = ({ data }) => {
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
            <View style={styles.contactRow}>
              {personalInfo?.email && <Text>{personalInfo.email}</Text>}
              {personalInfo?.phone && <Text>{personalInfo.phone}</Text>}
              {personalInfo?.location && <Text>{personalInfo.location}</Text>}
            </View>
            {(personalInfo?.linkedin ||
              personalInfo?.github ||
              personalInfo?.portfolio) && (
              <View style={styles.contactRow}>
                {personalInfo?.linkedin && (
                  <Link
                    style={{ color: "#2563eb", textDecoration: "none" }}
                    src={personalInfo.linkedin}
                  >
                    LinkedIn
                  </Link>
                )}
                {personalInfo?.github && (
                  <Link
                    style={{ color: "#2563eb", textDecoration: "none" }}
                    src={personalInfo.github}
                  >
                    GitHub
                  </Link>
                )}
                {personalInfo?.portfolio && (
                  <Link
                    style={{ color: "#2563eb", textDecoration: "none" }}
                    src={personalInfo.portfolio}
                  >
                    Portfolio
                  </Link>
                )}
              </View>
            )}
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.content}>
            {personalInfo?.profileSummary && (
              <View style={styles.section} wrap={false}>
                <Text style={styles.sectionTitle}>Professional Profile</Text>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: "justify",
                    marginBottom: 15,
                    lineHeight: 1.5,
                  }}
                >
                  {personalInfo.profileSummary}
                </Text>
              </View>
            )}

            {experience?.length > 0 && (
              <View style={styles.section}>
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
                        <Text style={styles.bulletSign}>-</Text>
                        <Text style={styles.bulletText}>{res}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {projects?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key Initiatives</Text>
                {projects.map((proj, i) => (
                  <View key={i} style={styles.entry}>
                    <View style={styles.entryHeader} wrap={false}>
                      <Text style={[styles.title, { fontSize: 10 }]}>
                        {proj.name}
                      </Text>
                      {proj.link && (
                        <Text style={[styles.date, { color: "#2563eb" }]}>
                          View Project
                        </Text>
                      )}
                    </View>
                    {proj.description?.map((desc, j) => (
                      <View key={j} style={styles.bullet}>
                        <Text style={styles.bulletSign}>•</Text>
                        <Text style={styles.bulletText}>{desc}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.sidebar}>
            {education?.length > 0 && (
              <View style={styles.sidebarBox} wrap={false}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { borderBottomWidth: 0, paddingBottom: 0 },
                  ]}
                >
                  Education
                </Text>
                {education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 9 }}>
                      {edu.institution}
                    </Text>
                    <Text style={{ fontSize: 9 }}>{edu.degree}</Text>
                    <Text style={{ fontSize: 8, color: "#64748b" }}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {technicalSkills &&
              Object.values(technicalSkills).some((a) => a?.length > 0) && (
                <View style={styles.sidebarBox}>
                  <Text
                    style={[
                      styles.sectionTitle,
                      { borderBottomWidth: 0, paddingBottom: 0 },
                    ]}
                  >
                    Expertise
                  </Text>
                  {Object.entries(technicalSkills).map(
                    ([cat, list], i) =>
                      list?.length > 0 && (
                        <View key={i} style={{ marginBottom: 5 }} wrap={false}>
                          <Text style={styles.skillLabel}>{cat}:</Text>
                          <Text style={{ fontSize: 9 }}>{list.join(", ")}</Text>
                        </View>
                      ),
                  )}
                </View>
              )}

            {competencies?.length > 0 && (
              <View style={styles.sidebarBox} wrap={false}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { borderBottomWidth: 0, paddingBottom: 0 },
                  ]}
                >
                  Core Skills
                </Text>
                {competencies.map((c, i) => (
                  <Text key={i} style={styles.sidebarItem}>
                    • {c}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ExecutivePDF;
