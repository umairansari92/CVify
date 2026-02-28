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
    padding: "15mm",
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: "#1a1a1a",
    backgroundColor: "#fff",
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 18,
    borderBottom: "1pt solid #eeeeee",
    paddingBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#000",
    marginBottom: 4,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 10,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 8,
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
    fontSize: 8.5,
    color: "#444",
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
    fontSize: 8.5,
    color: "#334155",
    textDecoration: "none",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    // textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#000",
    marginBottom: 10,
    borderBottom: "0.5pt solid #000",
    paddingBottom: 2,
    width: "100%",
  },
  summary: {
    textAlign: "justify",
    marginBottom: 10,
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
    fontSize: 10.5,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 9.5,
    color: "#444",
    fontWeight: "medium",
  },
  date: {
    fontSize: 8.5,
    color: "#888",
  },
  bulletList: {
    marginTop: 4,
    paddingLeft: 10,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
    color: "#aaa",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#333",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  skillCategory: {
    width: "45%",
    marginBottom: 8,
  },
  skillLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  skillValue: {
    fontSize: 9,
    color: "#333",
  },
});

const GlobalPDF = ({ data }) => {
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
    themeColor,
    fontFamily,
  } = data || {};

  // Map user font selection to PDF standard fonts
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
    sectionTitle: {
      ...styles.sectionTitle,
      color: themeColor,
      borderBottomColor: themeColor,
    },
    accentText: { color: themeColor },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View
            style={{ width: "100%", alignItems: "center", marginBottom: 4 }}
          >
            <Text style={styles.name}>
              {personalInfo?.fullName || "Your Name"}
            </Text>
          </View>
          <View
            style={{ width: "100%", alignItems: "center", marginBottom: 8 }}
          >
            <Text style={styles.jobTitle}>
              {personalInfo?.jobTitle || "Job Title"}
            </Text>
          </View>

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
                <Link src={personalInfo.linkedin} style={styles.badgeText}>
                  {personalInfo.linkedin.replace(/^https?:\/\//, "")}
                </Link>
              </View>
            )}
            {personalInfo?.github && (
              <View style={styles.badge} wrap={false}>
                <IconGitHub />
                <Link src={personalInfo.github} style={styles.badgeText}>
                  {personalInfo.github.replace(/^https?:\/\//, "")}
                </Link>
              </View>
            )}
            {personalInfo?.portfolio && (
              <View style={styles.badge} wrap={false}>
                <IconPortfolio />
                <Link src={personalInfo.portfolio} style={styles.badgeText}>
                  {personalInfo.portfolio.replace(/^https?:\/\//, "")}
                </Link>
              </View>
            )}
          </View>
        </View>

        {/* Summary */}
        {personalInfo?.profileSummary && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{personalInfo.profileSummary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={[styles.title, dynamicStyles.accentText]}>
                    {exp.position}
                  </Text>
                  <Text style={styles.date}>
                    {exp.startDate} — {exp.endDate}
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
            {projects.map((proj, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{proj.name}</Text>
                  <Text style={styles.date}>
                    {proj.startDate} — {proj.endDate}
                  </Text>
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
        )}

        {/* Education */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{edu.degree}</Text>
                  <Text style={styles.date}>
                    {edu.startDate} — {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.subtitle}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsGrid}>
            {technicalSkills &&
              Object.entries(technicalSkills).map(
                ([cat, list], i) =>
                  list?.length > 0 && (
                    <View key={i} style={styles.skillCategory}>
                      <Text style={styles.skillLabel}>{cat}</Text>
                      <Text style={styles.skillValue}>{list.join(", ")}</Text>
                    </View>
                  ),
              )}
            {interests?.length > 0 && (
              <View style={styles.skillCategory}>
                <Text style={styles.skillLabel}>Interests</Text>
                <Text style={styles.skillValue}>{interests.join(", ")}</Text>
              </View>
            )}
            {softwareProficiency?.length > 0 && (
              <View style={styles.skillCategory}>
                <Text style={styles.skillLabel}>Software & Systems</Text>
                <Text style={styles.skillValue}>
                  {softwareProficiency.join(", ")}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Core Skills */}
        {competencies?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Skills</Text>
            <View style={styles.skillsGrid}>
              {competencies.map((c, i) => (
                <View
                  key={i}
                  style={[
                    styles.skillCategory,
                    { width: "100%", marginBottom: 4 },
                  ]}
                >
                  <View style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {customSections?.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
            <View style={styles.bulletList}>
              {section.items?.map((item, j) => (
                <View key={j} style={styles.bullet}>
                  <Text style={[styles.bulletDot, dynamicStyles.accentText]}>
                    •
                  </Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default GlobalPDF;
