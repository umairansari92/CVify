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
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#1e293b",
  },
  sidebarBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "33%",
    backgroundColor: "#1e293b",
  },
  sidebar: {
    width: "33%",
    color: "#fff",
    padding: 30,
    paddingTop: 40,
    zIndex: 1,
  },
  main: {
    width: "67%",
    padding: 35,
    paddingTop: 40,
    zIndex: 1,
  },
  sidebarHeader: {
    marginBottom: 30,
    textAlign: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 10,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  sideContact: {
    marginBottom: 25,
  },
  sideContactItem: {
    fontSize: 8,
    color: "#cbd5e1",
    marginBottom: 6,
  },
  sideSectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    paddingBottom: 4,
    marginBottom: 12,
    marginTop: 15,
  },
  sidebarEducation: {
    marginBottom: 20,
  },
  eduItem: {
    marginBottom: 10,
  },
  eduInst: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#fff",
  },
  eduDate: {
    fontSize: 7.5,
    color: "#94a3b8",
  },
  eduDeg: {
    fontSize: 8,
    fontStyle: "italic",
    color: "#cbd5e1",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#1e293b",
    borderBottomWidth: 2,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 5,
    marginBottom: 15,
  },
  entry: {
    marginBottom: 20,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#334155",
  },
  subtitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#64748b",
    marginBottom: 6,
  },
  date: {
    fontSize: 8.5,
    color: "#94a3b8",
  },
  bullet: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.4,
  },
  skillGroup: {
    marginBottom: 8,
  },
  skillLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    color: "#94a3b8",
    marginBottom: 3,
  },
  skillBadge: {
    backgroundColor: "#334155",
    padding: "2 6",
    borderRadius: 3,
    fontSize: 7.5,
    color: "#E2E8F0",
    marginRight: 4,
    marginBottom: 4,
  },
});

const ClearPDF = ({ data }) => {
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
        {/* Fixed Sidebar Background */}
        <View style={styles.sidebarBackground} fixed />

        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader} wrap={false}>
            <Text style={styles.name}>
              {personalInfo?.fullName || "Your Name"}
            </Text>
            <Text style={styles.jobTitle}>
              {personalInfo?.jobTitle || "Job Title"}
            </Text>
          </View>

          <View style={styles.sideContact}>
            {personalInfo?.email && (
              <Text style={styles.sideContactItem}>{personalInfo.email}</Text>
            )}
            {personalInfo?.phone && (
              <Text style={styles.sideContactItem}>{personalInfo.phone}</Text>
            )}
            {personalInfo?.location && (
              <Text style={styles.sideContactItem}>
                {personalInfo.location}
              </Text>
            )}
            {personalInfo?.linkedin && (
              <Link
                src={personalInfo.linkedin}
                style={[styles.sideContactItem, { color: "#93c5fd" }]}
              >
                LinkedIn
              </Link>
            )}
            {personalInfo?.github && (
              <Link
                src={personalInfo.github}
                style={[styles.sideContactItem, { color: "#cbd5e1" }]}
              >
                GitHub
              </Link>
            )}
          </View>

          {technicalSkills &&
            Object.values(technicalSkills).some((a) => a?.length > 0) && (
              <View>
                <Text style={styles.sideSectionTitle}>Technical Skills</Text>
                {Object.entries(technicalSkills).map(
                  ([cat, list], i) =>
                    list?.length > 0 && (
                      <View key={i} style={styles.skillGroup} wrap={false}>
                        <Text style={styles.skillLabel}>{cat}</Text>
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

          {education?.length > 0 && (
            <View style={{ marginTop: 15 }}>
              <Text style={styles.sideSectionTitle}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={styles.eduItem} wrap={false}>
                  <Text style={styles.eduInst}>{edu.institution}</Text>
                  <Text style={styles.eduDate}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                  <Text style={styles.eduDeg}>{edu.degree}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.main}>
          {personalInfo?.profileSummary && (
            <View style={{ marginBottom: 25 }}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text
                style={{ fontSize: 9.5, lineHeight: 1.5, color: "#334155" }}
              >
                {personalInfo.profileSummary}
              </Text>
            </View>
          )}

          {experience?.length > 0 && (
            <View>
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
                      <Text style={{ color: "#cbd5e1" }}>•</Text>
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
                <View key={i} style={{ marginBottom: 15 }}>
                  <View style={styles.entryHeader} wrap={false}>
                    <Text style={[styles.title, { fontSize: 10 }]}>
                      {proj.name}
                    </Text>
                    {proj.link && (
                      <Link
                        style={{ fontSize: 7.5, color: "#2563eb" }}
                        src={proj.link}
                      >
                        View Link
                      </Link>
                    )}
                  </View>
                  {proj.description?.map((desc, j) => (
                    <View key={j} style={styles.bullet}>
                      <Text style={{ color: "#cbd5e1" }}>-</Text>
                      <Text style={styles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ClearPDF;
