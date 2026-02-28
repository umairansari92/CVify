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
import {
  IconEmail,
  IconPhone,
  IconLocation,
  IconLinkedIn,
  IconGitHub,
  IconPortfolio,
} from "./PDFIcons";

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    padding: "20mm",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#334155",
    backgroundColor: "#fff",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 9,
    color: "#64748b",
  },
  badgeText: {
    fontSize: 9,
    color: "#2563eb",
    textDecoration: "none",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
  },
  sectionTitleAccent: {
    width: 4,
    height: 14,
    backgroundColor: "#2563eb",
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#0f172a",
  },
  summary: {
    fontSize: 9.5,
    color: "#475569",
    textAlign: "justify",
    lineHeight: 1.6,
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
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 10,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 9,
    color: "#64748b",
    fontWeight: "medium",
  },
  bulletPointContainer: {
    paddingLeft: 4,
    marginTop: 2,
  },
  bulletPoint: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 3,
  },
  bulletDot: {
    width: 6,
    color: "#cbd5e1",
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.4,
  },
  skillsTable: {
    marginTop: 5,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 6,
    paddingBottom: 4,
  },
  skillLabel: {
    width: 100,
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#64748b",
    textTransform: "uppercase",
  },
  skillValue: {
    flex: 1,
    fontSize: 9,
    color: "#334155",
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
    interests,
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
    header: {
      ...styles.header,
      borderBottomColor: themeColor,
    },
    sectionTitleAccent: {
      ...styles.sectionTitleAccent,
      backgroundColor: themeColor,
    },
    badgeText: {
      ...styles.badgeText,
      color: themeColor,
    },
    subtitle: {
      ...styles.subtitle,
      color: themeColor,
    },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>
              {personalInfo?.fullName || "Your Name"}
            </Text>
            <Text style={[styles.jobTitle, dynamicStyles.accentText]}>
              {personalInfo?.jobTitle || "Job Title"}
            </Text>
          </View>

          <View style={styles.headerRight}>
            {personalInfo?.email && (
              <View style={styles.contactItem} wrap={false}>
                <IconEmail />
                <Text>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo?.phone && (
              <View style={styles.contactItem} wrap={false}>
                <IconPhone />
                <Text>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo?.location && (
              <View style={styles.contactItem} wrap={false}>
                <IconLocation />
                <Text>{personalInfo.location}</Text>
              </View>
            )}
            <View style={{ flexDirection: "row", gap: 10, marginTop: 4 }}>
              {personalInfo?.linkedin && (
                <Link
                  src={personalInfo.linkedin}
                  style={dynamicStyles.badgeText}
                >
                  LinkedIn
                </Link>
              )}
              {personalInfo?.github && (
                <Link src={personalInfo.github} style={dynamicStyles.badgeText}>
                  GitHub
                </Link>
              )}
              {personalInfo?.portfolio && (
                <Link
                  src={personalInfo.portfolio}
                  style={dynamicStyles.badgeText}
                >
                  Portfolio
                </Link>
              )}
            </View>
          </View>
        </View>

        <View style={{ paddingVertical: 10 }}>
          {/* Summary */}
          {personalInfo?.profileSummary && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <View style={dynamicStyles.sectionTitleAccent} />
                <Text style={styles.sectionTitle}>Profile Summary</Text>
              </View>
              <Text style={styles.summary}>{personalInfo.profileSummary}</Text>
            </View>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <View style={dynamicStyles.sectionTitleAccent} />
                <Text style={styles.sectionTitle}>Experience</Text>
              </View>
              {experience.map((exp, i) => (
                <View key={i} style={styles.entry} wrap={false}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.title}>{exp.position}</Text>
                    <Text style={styles.date}>
                      {exp.startDate} — {exp.endDate}
                    </Text>
                  </View>
                  <Text style={dynamicStyles.subtitle}>{exp.company}</Text>
                  <View style={styles.bulletPointContainer}>
                    {exp.responsibilities?.map((res, j) => (
                      <View key={j} style={styles.bulletPoint}>
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
              <View style={styles.sectionTitleContainer}>
                <View style={dynamicStyles.sectionTitleAccent} />
                <Text style={styles.sectionTitle}>Key Projects</Text>
              </View>
              {projects.map((proj, i) => (
                <View key={i} style={styles.entry} wrap={false}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.title}>{proj.name}</Text>
                    {proj.link && (
                      <Link src={proj.link} style={styles.date}>
                        {proj.link.replace(/^https?:\/\//, "")}
                      </Link>
                    )}
                  </View>
                  <View style={styles.bulletPointContainer}>
                    {proj.description?.map((desc, j) => (
                      <View key={j} style={styles.bulletPoint}>
                        <Text style={styles.bulletDot}>•</Text>
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
              <View style={styles.sectionTitleContainer}>
                <View style={dynamicStyles.sectionTitleAccent} />
                <Text style={styles.sectionTitle}>Education</Text>
              </View>
              {education.map((edu, i) => (
                <View key={i} style={styles.entry} wrap={false}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.title}>{edu.degree}</Text>
                    <Text style={styles.date}>
                      {edu.startDate} — {edu.endDate}
                    </Text>
                  </View>
                  <Text style={dynamicStyles.subtitle}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills Table Style */}
          {(technicalSkills ||
            competencies?.length > 0 ||
            softwareProficiency?.length > 0) && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <View style={dynamicStyles.sectionTitleAccent} />
                <Text style={styles.sectionTitle}>Technical Expertise</Text>
              </View>
              <View style={styles.skillsTable}>
                {technicalSkills &&
                  Object.entries(technicalSkills).map(
                    ([cat, list], i) =>
                      list?.length > 0 && (
                        <View key={i} style={styles.skillRow} wrap={false}>
                          <Text style={styles.skillLabel}>{cat}:</Text>
                          <Text style={styles.skillValue}>
                            {list.join(", ")}
                          </Text>
                        </View>
                      ),
                  )}
                {competencies?.length > 0 && (
                  <View style={styles.skillRow} wrap={false}>
                    <Text style={styles.skillLabel}>Core strengths:</Text>
                    <Text style={styles.skillValue}>
                      {competencies.join(", ")}
                    </Text>
                  </View>
                )}
                {softwareProficiency?.length > 0 && (
                  <View style={styles.skillRow} wrap={false}>
                    <Text style={styles.skillLabel}>Tools:</Text>
                    <Text style={styles.skillValue}>
                      {softwareProficiency.join(", ")}
                    </Text>
                  </View>
                )}
                {interests?.length > 0 && (
                  <View style={styles.skillRow} wrap={false}>
                    <Text style={styles.skillLabel}>Interests:</Text>
                    <Text style={styles.skillValue}>
                      {interests.join(", ")}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Custom Sections */}
          {customSections?.map((section, idx) => (
            <View key={idx} style={styles.section} wrap={false}>
              <View style={styles.sectionTitleContainer}>
                <View style={dynamicStyles.sectionTitleAccent} />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <View style={styles.bulletPointContainer}>
                {section.items?.map((item, j) => (
                  <View key={j} style={styles.bulletPoint}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ProfessionalPDF;
