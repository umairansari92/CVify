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
  headerContainer: {
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
    paddingLeft: 20,
    marginBottom: 25,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 10,
    lineHeight: 1.2,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contactItem: {
    color: "#64748b",
    fontSize: 9,
  },
  summary: {
    marginBottom: 20,
    textAlign: "justify",
    color: "#334155",
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#2563eb",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
    marginBottom: 12,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    width: "45%",
  },
  skillGroup: {
    marginBottom: 8,
  },
  skillLabel: {
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 2,
  },
  entry: {
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0f172a",
  },
  entrySubtitle: {
    fontSize: 10,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 8,
    color: "#64748b",
  },
  bulletPoint: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 4,
    paddingLeft: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#334155",
    textAlign: "justify",
    lineHeight: 1.4,
  },
  skillText: {
    fontSize: 9,
    color: "#334155",
    textAlign: "justify",
    lineHeight: 1.4,
    marginBottom: 4,
  },
});

const ModernPDF = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    technicalSkills,
    projects,
    competencies,
    softwareProficiency,
    customSections,
    themeColor = "#2563eb",
    fontFamily = "Inter",
  } = data || {};

  const getPDFFont = (font) => {
    switch (font) {
      case "Inter":
      case "Manrope":
      case "Public Sans":
        return "Helvetica";
      case "Playfair Display":
        return "Times-Roman";
      default:
        return "Helvetica";
    }
  };

  const pdfFont = getPDFFont(fontFamily);

  const dynamicStyles = {
    page: { ...styles.page, fontFamily: pdfFont },
    accentText: { color: themeColor },
    borderAccent: {
      borderLeftColor: themeColor,
      borderBottomColor: themeColor,
    },
    sectionTitle: {
      ...styles.sectionTitle,
      color: themeColor,
      borderBottomColor: `${themeColor}33`,
    },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        <View style={[styles.headerContainer, { borderLeftColor: themeColor }]}>
          <Text style={styles.name}>
            {personalInfo?.fullName || "Your Name"}
          </Text>
          <Text style={[styles.jobTitle, dynamicStyles.accentText]}>
            {personalInfo?.jobTitle || "Job Title"}
          </Text>
          <View style={styles.contactRow}>
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
              <Link
                src={personalInfo.linkedin}
                style={[styles.contactItem, dynamicStyles.accentText]}
              >
                LinkedIn
              </Link>
            )}
            {personalInfo?.github && (
              <Link
                src={personalInfo.github}
                style={[styles.contactItem, dynamicStyles.accentText]}
              >
                GitHub
              </Link>
            )}
            {personalInfo?.portfolio && (
              <Link
                src={personalInfo.portfolio}
                style={[styles.contactItem, dynamicStyles.accentText]}
              >
                Portfolio
              </Link>
            )}
          </View>
        </View>

        {personalInfo?.profileSummary && (
          <Text style={styles.summary}>{personalInfo.profileSummary}</Text>
        )}

        <View style={styles.columns} wrap={false}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {technicalSkills &&
              Object.entries(technicalSkills).map(
                ([key, val], i) =>
                  val?.length > 0 &&
                  i < 3 && ( // Only first 3 categories in left col
                    <View key={i} style={styles.skillGroup} wrap={false}>
                      <Text style={styles.skillLabel}>{key.toUpperCase()}</Text>
                      <Text style={styles.skillText}>{val.join(", ")}</Text>
                    </View>
                  ),
              )}
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Additional Skills</Text>
            {competencies?.length > 0 && (
              <View style={styles.skillGroup} wrap={false}>
                <Text style={styles.skillLabel}>CORE SKILLS</Text>
                {competencies.map((c, i) => (
                  <View key={i} style={styles.bulletPoint}>
                    <Text style={{ width: 6, color: themeColor }}>•</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                ))}
              </View>
            )}
            {softwareProficiency?.length > 0 && (
              <View style={styles.skillGroup} wrap={false}>
                <Text style={styles.skillLabel}>SOFTWARE & SYSTEMS</Text>
                <Text style={styles.skillText}>
                  {softwareProficiency.join(", ")}
                </Text>
              </View>
            )}
          </View>
        </View>

        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{exp.position}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>{exp.company}</Text>
                {exp.responsibilities?.map((res, i) => (
                  <View key={i} style={styles.bulletPoint}>
                    <Text style={{ width: 8, color: themeColor }}>•</Text>
                    <Text style={styles.bulletText}>{res}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Projects</Text>
            {projects.map((proj, index) => (
              <View key={index} style={styles.entry}>
                <View style={styles.entryHeader} wrap={false}>
                  <Text style={styles.entryTitle}>{proj.name}</Text>
                  {proj.link && (
                    <Link
                      style={[styles.date, { color: "#2563eb" }]}
                      src={proj.link}
                    >
                      View Project
                    </Link>
                  )}
                </View>
                {proj.description?.map((desc, i) => (
                  <View key={i} style={styles.bulletPoint}>
                    <Text style={{ width: 8, color: themeColor }}>-</Text>
                    <Text style={styles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{edu.institution}</Text>
                  <Text style={styles.date}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.skillText}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {customSections?.map((section, j) => (
          <View key={j} style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
            {section.items?.map((item, k) => (
              <View key={k} style={styles.bulletPoint}>
                <Text style={{ width: 8, color: themeColor }}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ModernPDF;
