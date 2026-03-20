import React from "react";
import BrandingFooter from "./BrandingFooter";
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
    flexDirection: "column",
    padding: "12mm",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    lineHeight: 1.4,
  },
  header: {
    padding: "10 25",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flexDirection: "row",
    flex: 1,
  },
  sidebar: {
    width: "33%",
    color: "#fff",
    padding: 30,
    paddingTop: 40,
  },
  main: {
    width: "67%",
    padding: 35,
    paddingTop: 40,
    backgroundColor: "#f8fafc", // Main content color
  },
  sidebarHeader: {
    marginBottom: 30,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    color: "#1e293b",
    textAlign: "center",
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 9,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 1.5,
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
    fontSize: 8.5,
    color: "#475569",
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
    fontSize: 8.5,
    color: "#1e293b",
    textDecoration: "none",
  },
  sideContact: {
    marginBottom: 25,
  },
  summary: {
    fontSize: 10,
    textAlign: "justify",
    marginBottom: 8,
    lineHeight: 1.5,
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
    color: "#FFFFFF",
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
    color: "#ffffffff",
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
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 4,
  },
  bulletIcon: {
    width: 6,
    color: "#cbd5e1",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.4,
    textAlign: "justify",
  },
  skillGroup: {
    marginBottom: 8,
  },
  skillLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    color: "#e2e8f0",
    marginBottom: 3,
  },
  skillBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "2 6",
    borderRadius: 3,
    fontSize: 7.5,
    color: "#f1f5f9",
    marginRight: 4,
    marginBottom: 4,
  },
  skillCategory: {
    marginTop: 15,
    marginBottom: 5,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  skillText: {
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.4,
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
    interests,
    customSections,
    themeColor = "#1e293b",
    fontFamily = "Inter",
  } = data || {};

  const getPDFFont = (font) => {
    switch (font) {
      case "Inter":
      case "Manrope":
        return "Helvetica";
      case "Playfair Display":
        return "Times-Roman";
      case "Public Sans":
        return "Helvetica";
      case "Outfit":
        return "Outfit";
      default:
        return "Helvetica";
    }
  };

  const pdfFont = getPDFFont(fontFamily);

  const dynamicStyles = {
    page: { ...styles.page, fontFamily: pdfFont },
    sidebar: { ...styles.sidebar, backgroundColor: themeColor },
    sectionTitle: {
      ...styles.sectionTitle,
      color: themeColor,
      borderBottomColor: `${themeColor}20`,
    },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.name, dynamicStyles.accentText]}>
            {personalInfo?.fullName || "Your Name"}
          </Text>
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

        <View style={styles.contentWrapper}>
          <View style={dynamicStyles.sidebar}>
            {/* Removed redundant header from sidebar */}

            {technicalSkills &&
              Object.values(technicalSkills).some((a) => a?.length > 0) && (
                <View>
                  <Text style={styles.sideSectionTitle}>SKILLS</Text>
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
                <Text style={styles.sideSectionTitle}>EDUCATION</Text>
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
              <View style={styles.section} wrap={false}>
                <Text style={dynamicStyles.sectionTitle}>Summary</Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#475569",
                    textAlign: "justify",
                  }}
                >
                  {personalInfo.profileSummary}
                </Text>
              </View>
            )}

            {experience?.length > 0 && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Work Experience</Text>
                {experience.map((exp, i) => (
                  <View key={i} style={styles.entry}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.title}>{exp.position}</Text>
                      <Text style={styles.date}>
                        {exp.startDate} — {exp.endDate}
                      </Text>
                    </View>
                    <Text style={styles.subtitle}>{exp.company}</Text>
                    {exp.responsibilities?.map((res, j) => (
                      <View key={j} style={styles.bullet} wrap={false}>
                        <Text style={styles.bulletIcon}>•</Text>
                        <Text style={styles.bulletText}>{res}</Text>
                      </View>
                    ))}
                  </View>
                ))}

                {competencies?.length > 0 && (
                  <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <Text style={styles.skillCategoryTitle}>
                      Core Strengths
                    </Text>
                    {competencies.map((c, i) => (
                      <View key={i} style={styles.bullet} wrap={false}>
                        <Text style={styles.bulletIcon}>•</Text>
                        <Text style={styles.bulletText}>{c}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {softwareProficiency?.length > 0 && (
                  <View style={styles.skillCategory}>
                    <Text style={styles.skillCategoryTitle}>
                      Software & Systems
                    </Text>
                    <Text style={styles.skillText}>
                      {softwareProficiency.join(", ")}
                    </Text>
                  </View>
                )}
                {interests?.length > 0 && (
                  <View style={styles.skillCategory}>
                    <Text style={styles.skillCategoryTitle}>Interests</Text>
                    <Text style={styles.skillText}>{interests.join(", ")}</Text>
                  </View>
                )}
              </View>
            )}

            {projects?.length > 0 && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Projects</Text>
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
                          {proj.link.replace(/^https?:\/\//, "")}
                        </Link>
                      )}
                    </View>
                    {proj.description?.map((desc, j) => (
                      <View key={j} style={styles.bullet} wrap={false}>
                        <Text style={[styles.bulletIcon, { color: "#cbd5e1" }]}>-</Text>
                        <Text style={styles.bulletText}>{desc}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Custom Sections */}
            {customSections?.map((section, idx) => (
              <View key={idx} style={{ marginBottom: 20 }}>
                <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
                {section.items?.map((item, j) => (
                  <View key={j} style={styles.bullet} wrap={false}>
                    <Text style={[styles.bulletIcon, { color: `${themeColor}40` }]}>•</Text>
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <BrandingFooter themeColor={themeColor} />
      </Page>
    </Document>
  );
};

export default ClearPDF;
