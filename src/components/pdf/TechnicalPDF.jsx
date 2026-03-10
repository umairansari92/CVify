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
    fontFamily: "Courier",
    fontSize: 9,
    color: "#e2e8f0",
    backgroundColor: "#1a1c24",
    lineHeight: 1.4,
  },
  terminalHeader: {
    backgroundColor: "#0f172a",
    padding: "15 25",
    borderRadius: 6,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#334155",
  },
  windowButtons: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    lineHeight: 1.2,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#60a5fa",
    letterSpacing: 1.5,
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 1.2,
  },
  keyword: {
    color: "#60a5fa",
  },
  variable: {
    color: "#fde047",
  },
  string: {
    color: "#fff",
  },
  function: {
    color: "#a78bfa",
  },
  method: {
    color: "#7dd3fc",
  },
  params: {
    color: "#fdba74",
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
    color: "#94a3b8",
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
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: "3 8",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  badgeText: {
    fontSize: 9,
    color: "#fff",
    textDecoration: "none",
  },
  mainContent: {
    flexDirection: "row",
    gap: 20,
  },
  leftCol: {
    width: "35%",
  },
  rightCol: {
    width: "65%",
  },
  sidebarBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 4,
    marginBottom: 15,
    color: "#1e293b",
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: "bold",
    // textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
    marginBottom: 8,
    color: "#0f172a",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    marginTop: 10,
  },
  entry: {
    marginBottom: 15,
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderLeftColor: "#334155",
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 10,
    color: "#60a5fa",
    marginBottom: 5,
  },
  date: {
    fontSize: 8,
    color: "#94a3b8",
  },
  bullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 4,
  },
  bulletIcon: {
    width: 12,
  },
  bulletSign: {
    color: "#64748b",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#cbd5e1",
  },
  skillGroup: {
    marginBottom: 8,
  },
  skillLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    color: "#94a3b8",
    fontWeight: "bold",
    marginBottom: 2,
  },
  skillText: {
    fontSize: 8,
    color: "#475569",
  },
  projectBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    color: "#334155",
  },
});

const TechnicalPDF = ({ data }) => {
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
        return "Courier"; // Technical remains Courier-like by default
    }
  };

  const pdfFont = getPDFFont(fontFamily);

  const dynamicStyles = {
    page: { ...styles.page, fontFamily: pdfFont },
    accentText: { color: themeColor },
    borderAccent: { borderLeftColor: themeColor },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
        {/* Terminal Header */}
        <View style={styles.terminalHeader}>
          <View style={styles.windowButtons}>
            <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
            <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
            <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
          </View>

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

        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            {technicalSkills &&
              Object.values(technicalSkills).some((a) => a?.length > 0) && (
                <View style={styles.sidebarBox}>
                  <Text style={styles.sidebarTitle}>Skills</Text>
                  {Object.entries(technicalSkills).map(
                    ([cat, list], i) =>
                      list?.length > 0 && (
                        <View key={i} style={styles.skillGroup} wrap={false}>
                          <Text style={styles.skillLabel}>{cat}</Text>
                          <Text style={styles.skillText}>
                            {list.join(", ")}
                          </Text>
                        </View>
                      ),
                  )}
                  {softwareProficiency?.length > 0 && (
                    <View style={styles.skillGroup} wrap={false}>
                      <Text style={styles.skillLabel}>Software & Systems</Text>
                      <Text style={styles.skillText}>
                        {softwareProficiency.join(", ")}
                      </Text>
                    </View>
                  )}
                  {interests?.length > 0 && (
                    <View style={styles.skillGroup} wrap={false}>
                      <Text style={styles.skillLabel}>Interests</Text>
                      <Text style={styles.skillText}>
                        {interests.join(", ")}
                      </Text>
                    </View>
                  )}
                </View>
              )}

            {competencies?.length > 0 && (
              <View style={styles.sidebarBox} wrap={false}>
                <Text style={styles.sidebarTitle}>Core Strengths</Text>
                {competencies.map((c, i) => (
                  <View key={i} style={styles.bullet} wrap={false}>
                    <Text style={[styles.bulletIcon, dynamicStyles.accentText]}>
                      {">"}
                    </Text>
                    <Text style={[styles.bulletText, { fontSize: 8 }]}>
                      {c}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {education?.length > 0 && (
              <View style={styles.sidebarBox}>
                <Text style={styles.sidebarTitle}>Education</Text>
                {education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 8 }} wrap={false}>
                    <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                      {edu.degree}
                    </Text>
                    <Text style={{ fontSize: 8, color: "#64748b" }}>
                      {edu.institution}
                    </Text>
                    <Text style={{ fontSize: 7, color: "#94a3b8" }}>
                      {edu.startDate} — {edu.endDate}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightCol}>
            {experience?.length > 0 && (
              <View>
                <View wrap={false}>
                  <Text style={styles.sectionTitle}>Work Experience</Text>
                </View>
                {experience.map((exp, i) => (
                  <View key={i} style={styles.entry}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.title}>{exp.position}</Text>
                      <Text style={styles.date}>
                        [{exp.startDate} :: {exp.endDate}]
                      </Text>
                    </View>
                    <Text style={styles.subtitle}>@ {exp.company}</Text>
                    {exp.responsibilities?.map((res, j) => (
                      <View key={j} style={styles.bullet} wrap={false}>
                        <Text style={styles.bulletIcon}>{" > "}</Text>
                        <Text style={styles.bulletText}>{res}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {projects?.length > 0 && (
              <View style={{ marginTop: 15 }}>
                <View wrap={false}>
                  <Text style={styles.sectionTitle}>Key Projects</Text>
                </View>
                {projects.map((proj, i) => (
                  <View key={i} style={styles.projectBox} wrap={false}>
                    <View style={styles.entryHeader}>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        {proj.name}
                      </Text>
                      {proj.link && (
                        <Link
                          style={{ color: "#2563eb", fontSize: 8 }}
                          src={proj.link}
                        >
                          {proj.link.replace(/^https?:\/\//, "")}
                        </Link>
                      )}
                    </View>
                    <Text
                      style={{ fontSize: 8.5, color: "#475569", marginTop: 3 }}
                    >
                      {proj.description?.join(" ")}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Custom Sections */}
        {customSections?.map((section, i) => (
          <View key={i} style={{ marginTop: 15 }}>
            <Text style={[styles.sectionTitle, dynamicStyles.accentText]}>
              [{section.title.toUpperCase()}]
            </Text>
            <View
              style={{
                paddingLeft: 15,
                borderLeftWidth: 1,
                borderLeftColor: "#334155",
              }}
            >
              {section.items?.map((item, j) => (
                <View key={j} style={styles.bullet} wrap={false}>
                  <Text style={[styles.bulletIcon, dynamicStyles.accentText]}>
                    {">> "}
                  </Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
            <Text style={{ fontSize: 8, color: "#475569", marginTop: 4 }}>
              [/{section.title.toUpperCase()}]
            </Text>
          </View>
        ))}
        <BrandingFooter themeColor={themeColor} />
      </Page>
    </Document>
  );
};

export default TechnicalPDF;
