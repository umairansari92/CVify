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
    padding: 40,
    fontFamily: "Courier",
    fontSize: 9,
    color: "#e2e8f0",
    backgroundColor: "#1a1c24",
    lineHeight: 1.4,
  },
  terminalHeader: {
    backgroundColor: "#0f172a",
    padding: 20,
    borderRadius: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  windowButtons: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    lineHeight: 1.2,
  },
  keyword: {
    color: "#60a5fa",
  },
  variable: {
    color: "#fde047",
  },
  string: {
    color: "#fff",
  },
  function: {
    color: "#a78bfa",
  },
  method: {
    color: "#7dd3fc",
  },
  params: {
    color: "#fdba74",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 12,
    fontSize: 8,
    color: "#94a3b8",
  },
  mainContent: {
    flexDirection: "row",
    gap: 20,
  },
  leftCol: {
    width: "35%",
  },
  rightCol: {
    width: "65%",
  },
  sidebarBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 4,
    marginBottom: 15,
    color: "#1e293b",
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
    marginBottom: 8,
    color: "#0f172a",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    marginTop: 10,
  },
  entry: {
    marginBottom: 15,
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderLeftColor: "#334155",
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 10,
    color: "#60a5fa",
    marginBottom: 5,
  },
  date: {
    fontSize: 8,
    color: "#94a3b8",
  },
  bullet: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  bulletSign: {
    color: "#64748b",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#cbd5e1",
  },
  skillGroup: {
    marginBottom: 8,
  },
  skillLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    color: "#94a3b8",
    fontWeight: "bold",
    marginBottom: 2,
  },
  skillText: {
    fontSize: 8,
    color: "#475569",
  },
  projectBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    color: "#334155",
  },
});

const TechnicalPDF = ({ data }) => {
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
        {/* Terminal Header */}
        <View style={styles.terminalHeader}>
          <View style={styles.windowButtons}>
            <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
            <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
            <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
          </View>

          <Text style={styles.name}>
            <Text style={styles.keyword}>const </Text>
            <Text style={styles.variable}>developer </Text>
            <Text>= </Text>
            <Text style={styles.string}>
              "{personalInfo?.fullName || "User"}"
            </Text>
            <Text>;</Text>
          </Text>

          <Text style={{ fontSize: 11 }}>
            <Text style={styles.function}>developer</Text>
            <Text>.</Text>
            <Text style={styles.method}>setTitle</Text>
            <Text>(</Text>
            <Text style={styles.params}>
              "{personalInfo?.jobTitle || "Developer"}"
            </Text>
            <Text>);</Text>
          </Text>

          <View style={styles.contactRow}>
            {personalInfo?.email && <Text>@ {personalInfo.email}</Text>}
            {personalInfo?.phone && <Text># {personalInfo.phone}</Text>}
            {personalInfo?.location && (
              <Text>
                {" > "} {personalInfo.location}
              </Text>
            )}
            {personalInfo?.github && (
              <Link
                style={{ color: "#4ade80", textDecoration: "none" }}
                src={personalInfo.github}
              >
                GitHub
              </Link>
            )}
            {personalInfo?.linkedin && (
              <Link
                style={{ color: "#60a5fa", textDecoration: "none" }}
                src={personalInfo.linkedin}
              >
                LinkedIn
              </Link>
            )}
          </View>
        </View>

        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            {technicalSkills &&
              Object.values(technicalSkills).some((a) => a?.length > 0) && (
                <View style={styles.sidebarBox}>
                  <Text style={styles.sidebarTitle}>Technical Skills</Text>
                  {Object.entries(technicalSkills).map(
                    ([cat, list], i) =>
                      list?.length > 0 && (
                        <View key={i} style={styles.skillGroup} wrap={false}>
                          <Text style={styles.skillLabel}>{cat}</Text>
                          <Text style={styles.skillText}>
                            {list.join(", ")}
                          </Text>
                        </View>
                      ),
                  )}
                </View>
              )}

            {competencies?.length > 0 && (
              <View style={styles.sidebarBox} wrap={false}>
                <Text style={styles.sidebarTitle}>Core Skills</Text>
                <Text style={{ fontSize: 8, color: "#475569" }}>
                  {competencies.join(" • ")}
                </Text>
              </View>
            )}

            {education?.length > 0 && (
              <View style={styles.sidebarBox}>
                <Text style={styles.sidebarTitle}>Education</Text>
                {education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 8 }} wrap={false}>
                    <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                      {edu.degree}
                    </Text>
                    <Text style={{ fontSize: 8, color: "#64748b" }}>
                      {edu.institution}
                    </Text>
                    <Text style={{ fontSize: 7, color: "#94a3b8" }}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightCol}>
            {experience?.length > 0 && (
              <View>
                <View wrap={false}>
                  <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
                </View>
                {experience.map((exp, i) => (
                  <View key={i} style={styles.entry} wrap={false}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.title}>{exp.position}</Text>
                      <Text style={styles.date}>
                        [{exp.startDate} :: {exp.endDate}]
                      </Text>
                    </View>
                    <Text style={styles.subtitle}>@ {exp.company}</Text>
                    {exp.responsibilities?.map((res, j) => (
                      <View key={j} style={styles.bullet}>
                        <Text style={styles.bulletSign}>{" > "}</Text>
                        <Text style={styles.bulletText}>{res}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {projects?.length > 0 && (
              <View style={{ marginTop: 15 }}>
                <View wrap={false}>
                  <Text style={styles.sectionTitle}>KEY PROJECTS</Text>
                </View>
                {projects.map((proj, i) => (
                  <View key={i} style={styles.projectBox} wrap={false}>
                    <View style={styles.entryHeader}>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        {proj.name}
                      </Text>
                      {proj.link && (
                        <Link
                          style={{ color: "#2563eb", fontSize: 8 }}
                          src={proj.link}
                        >
                          git push
                        </Link>
                      )}
                    </View>
                    <Text
                      style={{ fontSize: 8.5, color: "#475569", marginTop: 3 }}
                    >
                      {proj.description?.join(" ")}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TechnicalPDF;
