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
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#333",
    backgroundColor: "#fff",
    lineHeight: 1.5,
  },
  header: {
    paddingBottom: 20,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#1e293b",
    marginBottom: 6,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#64748b",
    letterSpacing: 1.5,
    marginBottom: 12,
    textAlign: "center",
  },
  contactLine: {
    flexDirection: "row",
    gap: 15,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 8,
    color: "#64748b",
  },
  linkLine: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
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
    // textTransform: "uppercase",
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
      default:
        return "Helvetica";
    }
  };

  const pdfFont = getPDFFont(fontFamily);

  const dynamicStyles = {
    page: { ...styles.page, fontFamily: pdfFont },
    accentText: { color: themeColor },
    sectionTitle: {
      ...styles.sectionTitle,
      color: themeColor,
      borderBottomColor: `${themeColor}20`,
    },
  };

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
      <Page size="A4" style={dynamicStyles.page}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: `${themeColor}10` }]}>
          <Text style={styles.name}>
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

        {/* Summary */}
        {personalInfo?.profileSummary && (
          <View style={styles.summarySection} wrap={false}>
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
                  <Text style={styles.title}>{exp.position}</Text>
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
            <Text style={dynamicStyles.sectionTitle}>Projects</Text>
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
                        <Text>{proj.link.replace(/^https?:\/\//, "")}</Text>
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
                <Text style={dynamicStyles.sectionTitle}>Education</Text>
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
                      {edu.startDate} — {edu.endDate}
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
                <Text style={dynamicStyles.sectionTitle}>Expertise</Text>

                {technicalSkills &&
                  Object.entries(technicalSkills).map(
                    ([cat, list], i) =>
                      Array.isArray(list) &&
                      list.length > 0 && (
                        <View key={i} style={styles.skillCategory} wrap={false}>
                          <Text style={styles.skillCategoryTitle}>
                            {{
                              frontend: "Skills",
                              backend: "Additional Skills",
                              database: "Systems",
                              aiDevOps: "Tools & Platforms",
                              tools: "Other Tools",
                            }[cat] ||
                              cat
                                .replace(/([A-Z])/g, " $1")
                                .trim()
                                .replace(/^\w/, (c) => c.toUpperCase())}
                          </Text>
                          <Text style={styles.skillText}>
                            {list.join(", ")}
                          </Text>
                        </View>
                      ),
                  )}

                {competencies?.length > 0 && (
                  <View style={styles.skillCategory} wrap={false}>
                    <Text style={styles.skillCategoryTitle}>
                      Core Strengths
                    </Text>
                    <View style={styles.bulletList}>
                      {competencies.map((c, i) => (
                        <View key={i} style={styles.bullet}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{c}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {softwareProficiency?.length > 0 && (
                  <View style={styles.skillCategory} wrap={false}>
                    <Text style={styles.skillCategoryTitle}>
                      Software & Systems
                    </Text>
                    <Text style={styles.skillText}>
                      {softwareProficiency.join(", ")}
                    </Text>
                  </View>
                )}
                {interests?.length > 0 && (
                  <View style={styles.skillCategory} wrap={false}>
                    <Text style={styles.skillCategoryTitle}>Interests</Text>
                    <Text style={styles.skillText}>{interests.join(", ")}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>

        {/* Custom Sections */}
        {customSections?.map((section, p) => (
          <View key={p} style={styles.section}>
            <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
            <View style={styles.bulletList}>
              {section.items?.map((item, q) => (
                <View key={q} style={styles.bullet}>
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

export default MinimalPDF;
