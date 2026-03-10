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
      src: "https://github.com/Outfitio/Outfit-Fonts/raw/main/fonts/ttf/Outfit-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "https://github.com/Outfitio/Outfit-Fonts/raw/main/fonts/ttf/Outfit-Bold.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: "12mm",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1e293b",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 15,
    borderBottomWidth: 1.5,
    borderBottomColor: "#0f172a",
    paddingBottom: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#0f172a",
    marginBottom: 8,
    lineHeight: 1.2,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 11,
    textTransform: "uppercase",
    color: "#475569",
    fontWeight: "bold",
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
    fontSize: 9,
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
    fontSize: 9,
    color: "#0f172a",
    textDecoration: "none",
  },
  main: {
    flexDirection: "row",
    gap: 30,
  },
  content: {
    flex: 2,
  },
  sidebar: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1.5,
    borderBottomColor: "#0f172a",
    paddingBottom: 4,
    marginBottom: 12,
    color: "#0f172a",
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
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 10,
    color: "#334155",
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 9,
    color: "#64748b",
  },
  bullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 4,
    paddingLeft: 10,
  },
  bulletIcon: {
    width: 6,
    fontSize: 8,
  },
  bulletSign: {
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    textAlign: "justify",
    lineHeight: 1.4,
  },
  summary: {
    fontSize: 10,
    textAlign: "justify",
    marginBottom: 8,
    lineHeight: 1.6,
  },
  sidebarBox: {
    backgroundColor: "#f8fafc",
    padding: "4 10",
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#0f172a",
    letterSpacing: 1,
  },
  sidebarItem: {
    fontSize: 9,
    marginBottom: 6,
  },
  skillLabel: {
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 2,
  },
});

const ExecutivePDF = ({ data }) => {
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
    fontFamily = "Playfair Display",
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
    header: { ...styles.header, borderBottomColor: themeColor },
    sectionTitle: {
      ...styles.sectionTitle,
      color: themeColor,
      borderBottomColor: themeColor,
    },
    sidebarBox: {
      ...styles.sidebarBox,
      borderLeftColor: themeColor,
      backgroundColor: `${themeColor}05`,
    },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        <View style={dynamicStyles.header}>
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

        <View style={styles.main}>
          <View style={styles.content}>
            {personalInfo?.profileSummary && (
              <View style={styles.section} wrap={false}>
                <Text style={dynamicStyles.sectionTitle}>Summary</Text>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: "justify",
                    marginBottom: 15,
                    lineHeight: 1.5,
                  }}
                >
                  {personalInfo.profileSummary}
                </Text>
              </View>
            )}

            {/* Custom Sections */}
            {customSections?.map((section, idx) => (
              <View key={idx} style={styles.section} wrap={false}>
                <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
                {section.items?.map((item, j) => (
                  <View key={j} style={styles.bullet} wrap={false}>
                    <Text style={[styles.bulletIcon, { color: themeColor }]}>•</Text>
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}

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
                        <Text style={styles.bulletIcon}>-</Text>
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
                      <Text style={[styles.title, { fontSize: 10 }]}>
                        {proj.name}
                      </Text>
                      {proj.link && (
                        <Text style={[styles.date, { color: "#2563eb" }]}>
                          {proj.link.replace(/^https?:\/\//, "")}
                        </Text>
                      )}
                    </View>
                    {proj.description?.map((desc, j) => (
                      <View key={j} style={styles.bullet} wrap={false}>
                        <Text style={styles.bulletIcon}>•</Text>
                        <Text style={styles.bulletText}>{desc}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Core Strengths - moved below Projects */}
            {competencies?.length > 0 && (
              <View style={styles.section}>
                <Text style={dynamicStyles.sectionTitle}>Core Strengths</Text>
                {competencies.map((c, i) => (
                  <View key={i} style={styles.bullet} wrap={false}>
                    <Text style={styles.bulletIcon}>•</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.sidebar}>
            {education?.length > 0 && (
              <View style={dynamicStyles.sidebarBox} wrap={false}>
                <Text
                  style={[
                    dynamicStyles.sectionTitle,
                    { borderBottomWidth: 0, paddingBottom: 0 },
                  ]}
                >
                  Education
                </Text>
                {education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 9 }}>
                      {edu.institution}
                    </Text>
                    <Text style={{ fontSize: 9 }}>{edu.degree}</Text>
                    <Text style={{ fontSize: 8, color: "#64748b" }}>
                      {edu.startDate} — {edu.endDate}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {technicalSkills &&
              Object.values(technicalSkills).some((a) => a?.length > 0) && (
                <View style={styles.sidebarBox}>
                  <Text
                    style={[
                      styles.sectionTitle,
                      { borderBottomWidth: 0, paddingBottom: 0 },
                    ]}
                  >
                    Skills
                  </Text>
                  {Object.entries(technicalSkills).map(
                    ([cat, list], i) =>
                      list?.length > 0 && (
                        <View key={i} style={{ marginBottom: 5 }} wrap={false}>
                          <Text style={styles.skillLabel}>
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
                            :
                          </Text>
                          <Text style={{ fontSize: 9 }}>{list.join(", ")}</Text>
                        </View>
                      ),
                  )}
                  {softwareProficiency?.length > 0 && (
                    <View style={{ marginBottom: 5 }} wrap={false}>
                      <Text style={styles.skillLabel}>Software:</Text>
                      <Text style={{ fontSize: 9 }}>
                        {softwareProficiency.join(", ")}
                      </Text>
                    </View>
                  )}
                </View>
              )}

            {/* Interests in sidebar */}
            {interests?.length > 0 && (
              <View style={dynamicStyles.sidebarBox}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { borderBottomWidth: 0, paddingBottom: 0 },
                  ]}
                >
                  Interests
                </Text>
                <Text style={{ fontSize: 9, marginTop: 6 }}>
                  {interests.join(" • ")}
                </Text>
              </View>
            )}
          </View>
        </View>
        <BrandingFooter themeColor={themeColor} />
      </Page>
    </Document>
  );
};

export default ExecutivePDF;
