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

Font.register({
  family: "Outfit",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/gh/Outfitio/Outfit-Fonts@main/fonts/ttf/Outfit-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/Outfitio/Outfit-Fonts@main/fonts/ttf/Outfit-Bold.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: "12mm",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    lineHeight: 1.5,
  },
  headerContainer: {
    paddingBottom: 20,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
    lineHeight: 1.2,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 11,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 12,
    lineHeight: 1.2,
    textAlign: "center",
    letterSpacing: 1.5,
  },
  contactLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 9,
    color: "#64748b",
  },
  linkLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 6,
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
    color: "#0f172a",
    textDecoration: "none",
  },
  summary: {
    fontSize: 10,
    textAlign: "justify",
    marginBottom: 8,
    color: "#4a5568",
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#111",
    marginBottom: 8,
    marginTop: 12,
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
    alignItems: "flex-start",
    gap: 6,
    marginBottom: 4,
    paddingLeft: 8,
  },
  bulletIcon: {
    width: 8,
    fontSize: 9,
    color: "#334155",
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

import BrandingFooter from "./BrandingFooter";
import BrandingWatermark from "./BrandingWatermark";

const ModernPDF = ({ data }) => {
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
      case "Outfit":
        return "Outfit";
      default:
        return "Helvetica";
    }
  };

  const pdfFont = getPDFFont(fontFamily);

  const dynamicStyles = {
    page: { ...styles.page, fontFamily: pdfFont },
    jobTitle: { ...styles.jobTitle, color: themeColor },
    sectionTitle: { ...styles.sectionTitle, color: themeColor },
    entrySubtitle: { ...styles.entrySubtitle, color: themeColor },
    accentText: { color: themeColor },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={[styles.name, dynamicStyles.accentText]}>
            {personalInfo?.fullName || "Your Name"}
          </Text>
          <Text style={dynamicStyles.jobTitle}>
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

        {/* Two Columns for Experience and Skills */}
        <View style={styles.columns}>
          {/* Main Column */}
          <View style={{ width: "65%" }}>
            {/* Experience */}
            {experience?.length > 0 && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Experience</Text>
                {experience.map((exp, i) => (
                  <View key={i} style={styles.entry}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>{exp.position}</Text>
                      <Text style={styles.date}>
                        {exp.startDate} — {exp.endDate}
                      </Text>
                    </View>
                    <Text style={dynamicStyles.entrySubtitle}>{exp.company}</Text>
                    <View style={{ marginTop: 4 }}>
                      {exp.responsibilities?.map((res, j) => (
                        <View key={j} style={styles.bulletPoint} wrap={false}>
                          <Text style={styles.bulletIcon}>•</Text>
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
                <Text style={dynamicStyles.sectionTitle}>Projects</Text>
                {projects.map((proj, i) => (
                  <View key={i} style={styles.entry}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>{proj.name}</Text>
                      {proj.link && (
                        <Link src={proj.link} style={styles.date}>
                          {proj.link.replace(/^https?:\/\//, "")}
                        </Link>
                      )}
                    </View>
                    <View style={{ marginTop: 4 }}>
                      {proj.description?.map((desc, j) => (
                        <View key={j} style={styles.bulletPoint} wrap={false}>
                          <Text style={styles.bulletIcon}>•</Text>
                          <Text style={styles.bulletText}>{desc}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Side Column */}
          <View style={{ width: "30%" }}>
            {/* Skills */}
            <View style={styles.section}>
              <Text style={dynamicStyles.sectionTitle}>Expertise</Text>
              {technicalSkills &&
                Object.entries(technicalSkills).map(
                  ([cat, list], i) =>
                    list?.length > 0 && (
                      <View key={i} style={styles.skillGroup}>
                        <Text style={styles.skillLabel}>{cat === "frontend" ? "Skills" : cat}</Text>
                        <Text style={styles.skillText}>{list.join(", ")}</Text>
                      </View>
                    ),
                )}
              {competencies?.length > 0 && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillLabel}>Key Strengths</Text>
                  <Text style={styles.skillText}>{competencies.join(", ")}</Text>
                </View>
              )}
               {interests?.length > 0 && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillLabel}>Interests</Text>
                  <Text style={styles.skillText}>{interests.join(", ")}</Text>
                </View>
              )}
            </View>

            {/* Education */}
            {education?.length > 0 && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Education</Text>
                {education.map((edu, i) => (
                  <View key={i} style={styles.entry} wrap={false}>
                    <Text style={styles.entryTitle}>{edu.degree}</Text>
                    <Text style={dynamicStyles.entrySubtitle}>
                      {edu.institution}
                    </Text>
                    <Text style={styles.date}>
                      {edu.startDate} — {edu.endDate}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Custom Sections */}
        {customSections?.map((section, idx) => (
          <View key={idx} style={styles.section} wrap={false}>
            <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
            <View style={{ marginTop: 4 }}>
              {section.items?.map((item, j) => (
                <View key={j} style={styles.bulletPoint}>
                  <Text style={[styles.bulletText, { width: 8 }]}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <BrandingWatermark />
        <BrandingFooter themeColor={themeColor} />
      </Page>
    </Document>
  );
};

export default ModernPDF;
