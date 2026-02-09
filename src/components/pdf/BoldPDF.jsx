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
    padding: 0,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#1f2937",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#111827",
    padding: 40,
    color: "#fff",
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 16,
    color: "#cbd5e1",
    fontWeight: "light",
    letterSpacing: 1,
    marginBottom: 20,
  },
  contact: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    fontSize: 8,
    color: "#94a3b8",
  },
  mainContent: {
    padding: 40,
    paddingTop: 20,
  },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#111827",
    marginBottom: 25,
    // Add shadow equivalent if possible (border)
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  row: {
    flexDirection: "row",
    gap: 30,
  },
  leftCol: {
    width: "60%",
  },
  rightCol: {
    width: "35%",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 2,
    borderBottomColor: "#111827",
    paddingBottom: 4,
    marginBottom: 10,
    color: "#111827",
  },
  entry: {
    marginBottom: 15,
    position: "relative",
    paddingLeft: 15,
    borderLeftWidth: 1.5,
    borderLeftColor: "#e5e7eb",
  },
  entryHeader: {
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#6b7280",
    marginBottom: 6,
  },
  bullet: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  bulletText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#374151",
  },
  skillText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#374151",
  },
  sidebarBox: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
    color: "#111827",
    letterSpacing: 1,
  },
  skillBadge: {
    backgroundColor: "#f3f4f6", // Lighter gray for distinction
    padding: "3 8",
    borderRadius: 4,
    fontSize: 8,
    marginRight: 6,
    marginBottom: 6,
    color: "#374151",
  },
});

const BoldPDF = ({ data }) => {
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
            {personalInfo?.linkedin && (
              <Link style={{ color: "#fff" }} src={personalInfo.linkedin}>
                LinkedIn
              </Link>
            )}
            {personalInfo?.github && (
              <Link style={{ color: "#fff" }} src={personalInfo.github}>
                GitHub
              </Link>
            )}
          </View>
        </View>

        <View style={styles.mainContent}>
          {personalInfo?.profileSummary && (
            <View style={styles.summaryCard}>
              <Text
                style={{
                  fontStyle: "italic",
                  fontSize: 10,
                  lineHeight: 1.5,
                  color: "#4b5563",
                }}
              >
                "{personalInfo.profileSummary}"
              </Text>
            </View>
          )}

          <View style={styles.row}>
            <View style={styles.leftCol}>
              {experience?.length > 0 && (
                <View>
                  <Text style={styles.sectionTitle}>Experience</Text>
                  {experience.map((exp, i) => (
                    <View key={i} style={styles.entry} wrap={false}>
                      <View style={styles.entryHeader}>
                        <Text style={styles.title}>{exp.position}</Text>
                        <Text style={styles.subtitle}>
                          {exp.company} | {exp.startDate} - {exp.endDate}
                        </Text>
                      </View>
                      {exp.responsibilities?.map((res, j) => (
                        <View key={j} style={styles.bullet}>
                          <Text style={{ color: "#9ca3af" }}>•</Text>
                          <Text style={styles.bulletText}>{res}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {projects?.length > 0 && (
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.sectionTitle}>Projects</Text>
                  {projects.map((proj, i) => (
                    <View key={i} style={{ marginBottom: 15 }} wrap={false}>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "baseline",
                          marginBottom: 3,
                        }}
                      >
                        <Text style={[styles.title, { fontSize: 10 }]}>
                          {proj.name}
                        </Text>
                        {proj.link && (
                          <Link
                            style={{ fontSize: 7, color: "#2563eb" }}
                            src={proj.link}
                          >
                            View Link
                          </Link>
                        )}
                      </View>
                      {proj.description?.map((desc, j) => (
                        <View key={j} style={styles.bullet}>
                          <Text style={{ color: "#6b7280" }}>»</Text>
                          <Text style={styles.bulletText}>{desc}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.rightCol}>
              {education?.length > 0 && (
                <View style={styles.sidebarBox}>
                  <Text style={styles.sidebarTitle}>Education</Text>
                  {education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        {edu.institution}
                      </Text>
                      <Text style={{ fontSize: 9, color: "#4b5563" }}>
                        {edu.degree}
                      </Text>
                      <Text style={{ fontSize: 8, color: "#9ca3af" }}>
                        {edu.startDate} - {edu.endDate}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {technicalSkills &&
                Object.values(technicalSkills).some((a) => a?.length > 0) && (
                  <View style={styles.sidebarBox}>
                    <Text style={styles.sidebarTitle}>Expertise</Text>
                    {Object.entries(technicalSkills).map(
                      ([cat, list], i) =>
                        list?.length > 0 && (
                          <View key={i} style={{ marginBottom: 10 }}>
                            <Text
                              style={{
                                fontSize: 8,
                                color: "#6b7280",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                marginBottom: 4,
                              }}
                            >
                              {cat}
                            </Text>
                            <View
                              style={{ flexDirection: "row", flexWrap: "wrap" }}
                            >
                              {list.map((s, idx) => (
                                <Text key={idx} style={styles.skillBadge}>
                                  {s}
                                </Text>
                              ))}
                            </View>
                          </View>
                        ),
                    )}
                  </View>
                )}

              {competencies?.length > 0 && (
                <View style={styles.sidebarBox}>
                  <Text style={styles.sidebarTitle}>Competencies</Text>
                  {competencies.map((c, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text>•</Text>
                      <Text style={styles.skillText}>{c}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BoldPDF;
