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
    color: "#2c3e50",
    backgroundColor: "#fff",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottom: "2pt solid #2c3e50",
    paddingBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 11,
    color: "#7f8c8d",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: "center",
  },
  contactLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 9,
    color: "#34495e",
  },
  linkLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#f1f5f9",
    padding: "4 8",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  badgeText: {
    fontSize: 9,
    color: "#2980b9",
    textDecoration: "none",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#2c3e50",
    backgroundColor: "#ecf0f1",
    padding: "5 10",
    marginBottom: 10,
    letterSpacing: 1,
  },
  summary: {
    fontSize: 10,
    textAlign: "justify",
    marginBottom: 10,
    lineHeight: 1.6,
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 10,
    color: "#2980b9",
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#7f8c8d",
  },
  bulletList: {
    paddingLeft: 12,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  bulletDot: {
    width: 12,
    color: "#2c3e50",
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: "#34495e",
    textAlign: "justify",
  },
  skillsTable: {
    marginTop: 5,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 6,
    borderBottom: "0.5pt solid #eee",
    paddingBottom: 4,
  },
  skillLabel: {
    width: 120,
    fontSize: 9,
    fontWeight: "bold",
    color: "#7f8c8d",
    textTransform: "uppercase",
  },
  skillValue: {
    flex: 1,
    fontSize: 10,
    color: "#2c3e50",
  },
});

import BrandingFooter from "./BrandingFooter";

const ElitePDF = ({ data }) => {
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
    themeColor = "#2c3e50",
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
    header: { ...styles.header, borderBottomColor: themeColor },
    sectionTitle: { ...styles.sectionTitle, color: "#fff", backgroundColor: themeColor },
    subtitle: { ...styles.subtitle, color: themeColor },
    accentText: { color: themeColor },
    badgeText: { ...styles.badgeText, color: themeColor },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <Text style={styles.name}>{personalInfo?.fullName || "Your Name"}</Text>
          <Text style={styles.jobTitle}>
            {personalInfo?.jobTitle || "Job Title"}
          </Text>

          <View style={styles.contactLine}>
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
          </View>

          <View style={styles.linkLine}>
            {personalInfo?.linkedin && (
              <View style={styles.badge} wrap={false}>
                <IconLinkedIn />
                <Link src={personalInfo.linkedin} style={dynamicStyles.badgeText}>
                  {personalInfo.linkedin.replace(/^https?:\/\//, "")}
                </Link>
              </View>
            )}
            {personalInfo?.github && (
              <View style={styles.badge} wrap={false}>
                <IconGitHub />
                <Link src={personalInfo.github} style={dynamicStyles.badgeText}>
                  {personalInfo.github.replace(/^https?:\/\//, "")}
                </Link>
              </View>
            )}
            {personalInfo?.portfolio && (
              <View style={styles.badge} wrap={false}>
                <IconPortfolio />
                <Link src={personalInfo.portfolio} style={dynamicStyles.badgeText}>
                  {personalInfo.portfolio.replace(/^https?:\/\//, "")}
                </Link>
              </View>
            )}
          </View>
        </View>

        {/* Summary */}
        {personalInfo?.profileSummary && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Executive Summary</Text>
            <Text style={styles.summary}>{personalInfo.profileSummary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{exp.position}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={dynamicStyles.subtitle}>{exp.company}</Text>
                <View style={styles.bulletList}>
                  {exp.responsibilities?.map((res, j) => (
                    <View key={j} style={styles.bullet} wrap={false}>
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
            <Text style={dynamicStyles.sectionTitle}>Key Projects</Text>
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
                <View style={styles.bulletList}>
                  {proj.description?.map((desc, j) => (
                    <View key={j} style={styles.bullet} wrap={false}>
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
            <Text style={dynamicStyles.sectionTitle}>Education</Text>
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

        {/* Skills */}
        {(technicalSkills || competencies?.length > 0 || softwareProficiency?.length > 0) && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Technical Expertise</Text>
            <View style={styles.skillsTable}>
              {technicalSkills &&
                Object.entries(technicalSkills).map(
                  ([cat, list], i) =>
                    list?.length > 0 && (
                      <View key={i} style={styles.skillRow} wrap={false}>
                        <Text style={styles.skillLabel}>{cat}:</Text>
                        <Text style={styles.skillValue}>{list.join(", ")}</Text>
                      </View>
                    ),
                )}
              {competencies?.length > 0 && (
                <View style={styles.skillRow} wrap={false}>
                  <Text style={styles.skillLabel}>Key Strengths:</Text>
                  <Text style={styles.skillValue}>{competencies.join(", ")}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {customSections?.map((section, idx) => (
          <View key={idx} style={styles.section} wrap={false}>
            <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
            <View style={styles.bulletList}>
              {section.items?.map((item, j) => (
                <View key={j} style={styles.bullet} wrap={false}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <BrandingFooter themeColor={themeColor} />
      </Page>
    </Document>
  );
};

export default ElitePDF;
