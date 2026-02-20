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
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    backgroundColor: "#fff",
    paddingTop: 35,
    paddingBottom: 35,
  },
  sidebarBackground: {
    position: "absolute",
    left: 0,
    top: -35,
    bottom: -35,
    width: "32%",
    backgroundColor: "#111827",
  },
  sidebar: {
    width: "32%",
    paddingHorizontal: 25,
    color: "white",
  },
  main: {
    width: "68%",
    paddingHorizontal: 35,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    paddingBottom: 5,
    marginBottom: 10,
    color: "#145bf5ff",
  },
  sidebarText: {
    fontSize: 9,
    marginBottom: 4,
    color: "#9ca8b9ff",
  },
  skillCategory: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#9ca3af",
    marginTop: 8,
    marginBottom: 3,
    textTransform: "uppercase",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 13,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 25,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 5,
    marginBottom: 12,
    marginTop: 10,
    color: "#1c5eecff",
    textTransform: "uppercase",
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
    fontWeight: "bold",
    fontSize: 11,
    color: "#111827",
  },
  subtitle: {
    fontSize: 10,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 8,
    color: "#6b7280",
  },
  bulletPoint: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 4,
    paddingLeft: 5,
  },
  bulletDot: {
    width: 6,
    color: "#2563eb",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.4,
  },
});

const ProfessionalPDF = ({ data }) => {
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
        <View style={styles.sidebarBackground} fixed />

        {/* Sidebar Content */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {personalInfo?.email && (
              <Link
                src={`mailto:${personalInfo.email}`}
                style={{ textDecoration: "none" }}
              >
                <Text style={styles.sidebarText}>{personalInfo.email}</Text>
              </Link>
            )}
            {personalInfo?.phone && (
              <Text style={styles.sidebarText}>{personalInfo.phone}</Text>
            )}
            {personalInfo?.location && (
              <Text style={styles.sidebarText}>{personalInfo.location}</Text>
            )}
            {personalInfo?.linkedin && (
              <Link
                src={personalInfo.linkedin}
                style={{ textDecoration: "none" }}
              >
                <Text style={styles.sidebarText}>LinkedIn</Text>
              </Link>
            )}
            {personalInfo?.github && (
              <Link
                src={personalInfo.github}
                style={{ textDecoration: "none" }}
              >
                <Text style={styles.sidebarText}>GitHub</Text>
              </Link>
            )}
            {personalInfo?.portfolio && (
              <Link
                src={personalInfo.portfolio}
                style={{ textDecoration: "none" }}
              >
                <Text style={styles.sidebarText}>Portfolio</Text>
              </Link>
            )}
          </View>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Technical Skills</Text>
            {technicalSkills &&
              Object.entries(technicalSkills).map(
                ([cat, list], i) =>
                  list?.length > 0 && (
                    <View key={i} style={{ marginBottom: 8 }} wrap={false}>
                      <Text style={styles.skillCategory}>{cat}</Text>
                      <Text style={styles.sidebarText}>{list.join(", ")}</Text>
                    </View>
                  ),
              )}
          </View>

          {education?.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 10 }} wrap={false}>
                  <Text
                    style={[
                      styles.sidebarText,
                      { fontWeight: "bold", color: "white" },
                    ]}
                  >
                    {edu.degree}
                  </Text>
                  <Text style={[styles.sidebarText, { fontSize: 8 }]}>
                    {edu.institution}
                  </Text>
                  <Text
                    style={[
                      styles.sidebarText,
                      { fontSize: 7, color: "#9ca3af" },
                    ]}
                  >
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.name}>
              {personalInfo?.fullName || "Your Name"}
            </Text>
            <Text style={styles.jobTitle}>
              {personalInfo?.jobTitle || "Job Title"}
            </Text>
            {personalInfo?.profileSummary && (
              <Text
                style={{
                  fontSize: 9,
                  lineHeight: 1.6,
                  color: "#374151",
                  textAlign: "justify",
                }}
              >
                {personalInfo.profileSummary}
              </Text>
            )}
          </View>

          {experience?.length > 0 && (
            <View style={styles.section}>
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
                    <View key={j} style={styles.bulletPoint}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{res}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {projects?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((proj, i) => (
                <View key={i} style={styles.entry}>
                  <View style={styles.entryHeader} wrap={false}>
                    <Text style={styles.title}>{proj.name}</Text>
                    {proj.link && (
                      <Link src={proj.link} style={{ textDecoration: "none" }}>
                        <Text style={[styles.date, { color: "#2563eb" }]}>
                          View Project
                        </Text>
                      </Link>
                    )}
                  </View>
                  {proj.description?.map((desc, j) => (
                    <View key={j} style={styles.bulletPoint}>
                      <Text style={[styles.bulletDot, { color: "#9ca3af" }]}>
                        -
                      </Text>
                      <Text style={styles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {(competencies?.length > 0 || softwareProficiency?.length > 0) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Core Skills & Tools</Text>
              {competencies?.length > 0 && (
                <View style={{ marginBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: "bold",
                      color: "#4b5563",
                      marginBottom: 4,
                    }}
                  >
                    EXPERTISE & SOFT SKILLS
                  </Text>
                  <Text style={{ fontSize: 9, color: "#4b5563" }}>
                    {competencies.join(" • ")}
                  </Text>
                </View>
              )}
              {softwareProficiency?.length > 0 && (
                <View>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: "bold",
                      color: "#4b5563",
                      marginBottom: 4,
                    }}
                  >
                    SOFTWARE & SYSTEMS
                  </Text>
                  <Text style={{ fontSize: 9, color: "#4b5563" }}>
                    {softwareProficiency.join(" • ")}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ProfessionalPDF;
