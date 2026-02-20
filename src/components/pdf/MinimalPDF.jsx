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
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#333",
    backgroundColor: "#fff",
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#1e293b",
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#64748b",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 8,
    color: "#64748b",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  summarySection: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  summary: {
    textAlign: "center",
    fontSize: 9.5,
    color: "#475569",
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
    marginBottom: 12,
    color: "#334155",
  },
  entry: {
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  title: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: "#1e293b",
    maxWidth: "70%",
  },
  date: {
    fontSize: 8.5,
    color: "#94a3b8",
    textAlign: "right",
  },
  subtitle: {
    fontSize: 9.5,
    fontStyle: "italic",
    color: "#64748b",
    marginBottom: 6,
  },
  bulletList: {
    paddingLeft: 10,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
    color: "#94a3b8",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.5,
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  skillText: {
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.4,
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
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
  } = data || {};

  const renderContactItem = (label, value, link) => {
    if (!value) return null;
    return (
      <View style={styles.contactItem}>
        {link ? (
          <Link src={link} style={styles.link}>
            <Text style={{ color: "#64748b" }}>{label}</Text>
          </Link>
        ) : (
          <Text>{value}</Text>
        )}
      </View>
    );
  };

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
          <View style={styles.contact}>
            {personalInfo?.email && (
              <View style={styles.contactItem}>
                <Link src={`mailto:${personalInfo.email}`} style={styles.link}>
                  <Text style={{ color: "#64748b" }}>{personalInfo.email}</Text>
                </Link>
              </View>
            )}
            {personalInfo?.phone && (
              <View style={styles.contactItem}>
                <Text>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo?.location && (
              <View style={styles.contactItem}>
                <Text>{personalInfo.location}</Text>
              </View>
            )}
            {personalInfo?.linkedin && (
              <View style={styles.contactItem}>
                <Link src={personalInfo.linkedin} style={styles.link}>
                  <Text style={{ color: "#64748b" }}>LinkedIn</Text>
                </Link>
              </View>
            )}
            {personalInfo?.github && (
              <View style={styles.contactItem}>
                <Link src={personalInfo.github} style={styles.link}>
                  <Text style={{ color: "#64748b" }}>GitHub</Text>
                </Link>
              </View>
            )}
            {personalInfo?.portfolio && (
              <View style={styles.contactItem}>
                <Link src={personalInfo.portfolio} style={styles.link}>
                  <Text style={{ color: "#64748b" }}>Portfolio</Text>
                </Link>
              </View>
            )}
          </View>
        </View>

        {/* Summary */}
        {personalInfo?.profileSummary && (
          <View style={styles.summarySection} wrap={false}>
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
                    {exp.startDate} - {exp.endDate}
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
            <View style={{ flexDirection: "column", gap: 10 }}>
              {projects.map((proj, i) => (
                <View key={i} style={styles.entry} wrap={false}>
                  <View style={styles.entryHeader}>
                    {proj.link ? (
                      <Link
                        src={proj.link}
                        style={[
                          styles.title,
                          styles.link,
                          { color: "#1e293b", textDecoration: "none" },
                        ]}
                      >
                        <Text>{proj.name}</Text>
                      </Link>
                    ) : (
                      <Text style={styles.title}>{proj.name}</Text>
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
          </View>
        )}

        {/* Two Column Layout: Education & Skills */}
        {/* Two Column Layout: Education & Skills */}
        <View style={styles.gridContainer}>
          {/* Left Column: Education */}
          <View style={{ flex: 1, paddingRight: 10 }}>
            {education?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 12 }} wrap={false}>
                    <Text style={{ fontWeight: "bold", fontSize: 9.5 }}>
                      {edu.degree}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        color: "#475569",
                        marginVertical: 2,
                      }}
                    >
                      {edu.institution}
                    </Text>
                    <Text style={{ fontSize: 8.5, color: "#94a3b8" }}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column: Skills */}
          <View style={{ flex: 1, paddingLeft: 10 }}>
            {(technicalSkills ||
              competencies?.length > 0 ||
              softwareProficiency?.length > 0) && (
              <View style={styles.section}>
                <Text style={styles.sidebarTitle}>Technical Skills</Text>

                {technicalSkills &&
                  Object.entries(technicalSkills).map(
                    ([cat, list], i) =>
                      Array.isArray(list) &&
                      list.length > 0 && (
                        <View key={i} style={styles.skillCategory} wrap={false}>
                          <Text style={styles.skillCategoryTitle}>{cat}</Text>
                          <Text style={styles.skillText}>
                            {list.join(", ")}
                          </Text>
                        </View>
                      ),
                  )}

                {competencies?.length > 0 && (
                  <View style={styles.skillCategory} wrap={false}>
                    <Text style={styles.skillCategoryTitle}>Core Skills</Text>
                    <Text style={styles.skillText}>
                      {competencies.join(" • ")}
                    </Text>
                  </View>
                )}

                {softwareProficiency?.length > 0 && (
                  <View style={styles.skillCategory} wrap={false}>
                    <Text style={styles.skillCategoryTitle}>Software</Text>
                    <Text style={styles.skillText}>
                      {softwareProficiency.join(", ")}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MinimalPDF;
