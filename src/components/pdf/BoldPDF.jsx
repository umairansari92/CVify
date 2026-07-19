import React from "react";
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
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1e293b",
    backgroundColor: "#fff",
    lineHeight: 1.5,
  },
  header: {
    padding: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
    color: "#fff",
    textAlign: "center",
    lineHeight: 1.2,
    width: "100%",
  },
  jobTitle: {
    fontSize: 12,
    color: "#cbd5e1",
    fontWeight: "light",
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
    color: "#4b5563",
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
    fontSize: 8.5,
    color: "#334155",
    textDecoration: "none",
  },
  mainContent: {
    padding: 40,
    paddingTop: 20,
  },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#111827",
    marginBottom: 25,
    // Add shadow equivalent if possible (border)
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  row: {
    flexDirection: "row",
    gap: 30,
  },
  leftCol: {
    width: "60%",
  },
  rightCol: {
    width: "35%",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 2,
    borderBottomColor: "#111827",
    paddingBottom: 4,
    marginBottom: 10,
    color: "#111827",
  },
  entry: {
    marginBottom: 15,
    position: "relative",
    paddingLeft: 15,
    borderLeftWidth: 1.5,
    borderLeftColor: "#e5e7eb",
  },
  entryHeader: {
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#6b7280",
    marginBottom: 6,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 4,
  },
  bulletIcon: {
    width: 6,
    color: "#9ca3af",
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#374151",
    textAlign: "justify",
  },
  skillText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#374151",
  },
  sidebarBox: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
    color: "#111827",
    letterSpacing: 1,
  },
  skillBadge: {
    backgroundColor: "#f3f4f6", // Lighter gray for distinction
    padding: "3 8",
    borderRadius: 4,
    fontSize: 8,
    marginRight: 6,
    marginBottom: 6,
    color: "#374151",
    paddingHorizontal: 20,
  },
  summary: {
    fontSize: 10,
    textAlign: "justify",
    marginBottom: 8,
    color: "#475569",
    lineHeight: 1.6,
  },
});

const BoldPDF = ({ data }) => {
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
    themeColor = "#111827",
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
    accentText: { color: themeColor },
    header: { ...styles.header },
    sectionTitle: {
      ...styles.sectionTitle,
      color: themeColor,
      borderBottomColor: themeColor,
    },
    sidebarTitle: { ...styles.sidebarTitle, color: themeColor },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        <View style={dynamicStyles.header}>
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

        <View style={styles.mainContent}>
          {personalInfo?.profileSummary && (
            <View style={[styles.summaryCard, { borderLeftColor: themeColor }]}>
              <Text
                style={{
                  fontStyle: "italic",
                  fontSize: 10,
                  lineHeight: 1.5,
                  color: "#4b5563",
                }}
              >
                "{personalInfo.profileSummary}"
              </Text>
            </View>
          )}

          <View style={styles.row}>
            <View style={styles.leftCol}>
              {experience?.length > 0 && (
                <View>
                  <Text style={dynamicStyles.sectionTitle}>
                    Work Experience
                  </Text>
                  {experience.map((exp, i) => (
                    <View key={i} style={styles.entry}>
                      <View style={styles.entryHeader}>
                        <Text style={styles.title}>{exp.position}</Text>
                        <Text style={styles.subtitle}>
                          {exp.company} | {exp.startDate} â€” {exp.endDate}
                        </Text>
                      </View>
                      {exp.responsibilities?.map((res, j) => (
                        <View key={j} style={styles.bullet} wrap={false}>
                          <Text style={styles.bulletIcon}>â€¢</Text>
                          <Text style={styles.bulletText}>{res}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {projects?.length > 0 && (
                <View style={{ marginTop: 10 }}>
                  <Text style={dynamicStyles.sectionTitle}>Projects</Text>
                  {projects.map((proj, i) => (
                    <View key={i} style={{ marginBottom: 15 }} wrap={false}>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "baseline",
                          marginBottom: 3,
                        }}
                      >
                        <Text style={[styles.title, { fontSize: 10 }]}>
                          {proj.name}
                        </Text>
                        {proj.link && (
                          <Link
                            style={{ fontSize: 7, color: "#2563eb" }}
                            src={proj.link}
                          >
                            {proj.link.replace(/^https?:\/\//, "")}
                          </Link>
                        )}
                      </View>
                      {proj.description?.map((desc, j) => (
                        <View key={j} style={styles.bullet} wrap={false}>
                          <Text style={[styles.bulletIcon, { color: "#6b7280" }]}>Â»</Text>
                          <Text style={styles.bulletText}>{desc}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {/* Custom Sections */}
              {customSections?.map((section, idx) => (
                <View key={idx} style={{ marginTop: 15 }} wrap={false}>
                  <Text style={dynamicStyles.sectionTitle}>
                    {section.title}
                  </Text>
                  {section.items?.map((item, j) => (
                    <View key={j} style={styles.bullet} wrap={false}>
                      <Text style={[styles.bulletIcon, { color: themeColor }]}>â€¢</Text>
                      <Text style={styles.bulletText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <View style={styles.rightCol}>
              {education?.length > 0 && (
                <View style={styles.sidebarBox}>
                  <Text style={dynamicStyles.sidebarTitle}>Education</Text>
                  {education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        {edu.institution}
                      </Text>
                      <Text style={{ fontSize: 9, color: "#4b5563" }}>
                        {edu.degree}
                      </Text>
                      <Text style={{ fontSize: 8, color: "#9ca3af" }}>
                        {edu.startDate} — {edu.endDate}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {technicalSkills &&
                Object.values(technicalSkills).some((a) => a?.length > 0) && (
                  <View style={styles.sidebarBox}>
                    <Text style={dynamicStyles.sidebarTitle}>Expertise</Text>
                    {Object.entries(technicalSkills).map(
                      ([cat, list], i) =>
                        list?.length > 0 && (
                          <View key={i} style={{ marginBottom: 10 }}>
                            <Text
                              style={{
                                fontSize: 8,
                                color: "#6b7280",
                                fontWeight: "bold",
                                marginBottom: 4,
                              }}
                            >
                              {{
                                frontend: "Skills",
                                backend: "Additional Skills",
                                database: "Systems",
                                aiDevOps: "Tools & Platforms",
                                tools: "Other Tools",
                                learningRoadmap: "Currently Learning",
                              }[cat] ||
                                cat
                                  .replace(/([A-Z])/g, " $1")
                                  .trim()
                                  .replace(/^\w/, (c) => c.toUpperCase())}
                            </Text>
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
                    {softwareProficiency?.length > 0 && (
                      <View style={{ marginBottom: 10 }}>
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#6b7280",
                            fontWeight: "bold",
                            marginBottom: 4,
                          }}
                        >
                          SOFTWARE & SYSTEMS
                        </Text>
                        <View
                          style={{ flexDirection: "row", flexWrap: "wrap" }}
                        >
                          {softwareProficiency.map((s, idx) => (
                            <Text key={idx} style={styles.skillBadge}>
                              {s}
                            </Text>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                )}

              {(competencies?.length > 0 || interests?.length > 0) && (
                <View style={styles.sidebarBox}>
                  <Text style={styles.sectionTitle}>Core Skills</Text>
                  {competencies?.map((c, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text>â€¢</Text>
                      <Text style={styles.skillText}>{c}</Text>
                    </View>
                  ))}
                  {interests?.length > 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={[styles.sidebarTitle, { fontSize: 9 }]}>
                        Interests
                      </Text>
                      <Text style={styles.skillText}>
                        {interests.join(", ")}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
        <BrandingWatermark />
        <BrandingFooter themeColor={themeColor} />
      </Page>
    </Document>
  );
};

export default BoldPDF;
