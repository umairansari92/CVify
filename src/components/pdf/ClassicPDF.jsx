﻿import React from "react";
import BrandingFooter from "./BrandingFooter";
import BrandingWatermark from "./BrandingWatermark";
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
    fontFamily: "Times-Roman",
    fontSize: 10,
    color: "#1a1a1a",
    lineHeight: 1.5,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#111",
    paddingBottom: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000",
    letterSpacing: 1,
    marginBottom: 8,
    lineHeight: 1.2,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 11,
    color: "#4b5563",
    marginTop: 0,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    lineHeight: 1.2,
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
    color: "#6b7280",
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
    padding: "3 8",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  badgeText: {
    fontSize: 9,
    color: "#111",
    textDecoration: "none",
  },
  summary: {
    fontSize: 10,
    textAlign: "justify",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
    paddingBottom: 2,
    marginBottom: 8,
    marginTop: 12,
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
    fontSize: 11,
    fontWeight: "bold",
    color: "#111",
  },
  subtitle: {
    fontSize: 10,
    color: "#4b5563",
    fontStyle: "italic",
    marginBottom: 5,
  },
  date: {
    fontSize: 9,
    color: "#6b7280",
  },
  bullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 4,
    paddingLeft: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  skillText: {
    fontSize: 9.5,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  grid: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
  },
  gridItem: {
    width: "45%",
    marginBottom: 12,
  },
  skillLabel: {
    fontWeight: "bold",
    color: "#4b5563",
  },
});

const ClassicPDF = ({ data }) => {
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
    themeColor = "#0f172a",
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
    accentText: { color: themeColor },
    borderAccent: { borderBottomColor: themeColor, borderTopColor: themeColor },
    sectionTitle: {
      ...styles.sectionTitle,
      color: themeColor,
      borderBottomColor: `${themeColor}33`,
    },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        <View style={[styles.header, { borderBottomColor: themeColor }]}>
          <Text style={[styles.name, dynamicStyles.accentText]}>
            {personalInfo?.fullName || "Your Name"}
          </Text>
          <Text style={[styles.jobTitle, dynamicStyles.accentText]}>
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

        {personalInfo?.profileSummary && (
          <Text style={styles.summary}>{personalInfo.profileSummary}</Text>
        )}

        {experience?.length > 0 && (
          <View>
            <Text style={dynamicStyles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{exp.position}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.subtitle}>{exp.company}</Text>
                {exp.responsibilities?.map((res, j) => (
                  <View key={j} style={styles.bullet} wrap={false}>
                    <Text>-</Text>
                    <Text style={styles.bulletText}>{res}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {projects?.length > 0 && (
          <View>
            <Text style={dynamicStyles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{proj.name}</Text>
                  {proj.link && (
                    <Link
                      style={{ fontSize: 8, color: themeColor }}
                      src={proj.link}
                    >
                      {proj.link.replace(/^https?:\/\//, "")}
                    </Link>
                  )}
                </View>
                {proj.description?.map((desc, j) => (
                  <View key={j} style={styles.bullet} wrap={false}>
                    <Text>-</Text>
                    <Text style={styles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {technicalSkills &&
          Object.values(technicalSkills).some((a) => a?.length > 0) && (
            <View>
              <Text style={dynamicStyles.sectionTitle}>Skills</Text>
              <View style={styles.grid}>
                {Object.entries(technicalSkills).map(
                  ([cat, list], i) =>
                    list?.length > 0 && (
                      <View key={i} style={styles.gridItem}>
                        <Text style={[styles.skillText, { fontSize: 9 }]}>
                          <Text style={styles.skillLabel}>
                            {
                              {
                                frontend: "Frontend",
                                backend: "Backend",
                                database: "Database",
                                aiDevOps: "AI & DevOps",
                                tools: "Tools",
                                security: "Security",
                                learningRoadmap: "Currently Learning",
                              }[cat] ||
                              cat
                                .replace(/([A-Z])/g, " $1")
                                .trim()
                                .replace(/^\w/, (c) => c.toUpperCase())
                            }
                            :{" "}
                          </Text>
                          {list.join(", ")}
                        </Text>
                      </View>
                    ),
                )}
              </View>
            </View>
          )}

        {(competencies?.length > 0 ||
          softwareProficiency?.length > 0 ||
          interests?.length > 0) && (
          <View style={{ marginTop: 10 }}>
            <Text style={dynamicStyles.sectionTitle}>Core Skills</Text>
            {softwareProficiency?.length > 0 && (
              <Text style={styles.skillText}>
                <Text style={styles.skillLabel}>Software: </Text>
                {softwareProficiency.join(", ")}
              </Text>
            )}
            {competencies?.length > 0 && (
              <View style={{ marginTop: 5 }}>
                <Text
                  style={[
                    styles.skillLabel,
                    { marginBottom: 5, fontSize: 10, color: "#111" },
                  ]}
                >
                  Core Strengths
                </Text>
                {competencies.map((c, i) => (
                  <View key={i} style={styles.bullet} wrap={false}>
                    <Text style={dynamicStyles.accentText}>-</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                ))}
              </View>
            )}
            {interests?.length > 0 && (
              <Text style={styles.skillText}>
                <Text style={styles.skillLabel}>Interests: </Text>
                {interests.join(", ")}
              </Text>
            )}
          </View>
        )}

        {education?.length > 0 && (
          <View style={{ marginTop: 15 }}>
            <Text style={dynamicStyles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 10 }} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{edu.institution}</Text>
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
        {customSections?.map((section, l) => (
          <View key={l} style={{ marginTop: 15 }}>
            <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
            {section.items?.map((item, m) => (
              <View key={m} style={styles.bullet} wrap={false}>
                <Text style={dynamicStyles.accentText}>-</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
        <BrandingWatermark />
        <BrandingFooter themeColor={themeColor} />
      </Page>
    </Document>
  );
};

export default ClassicPDF;
