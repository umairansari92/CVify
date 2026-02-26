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
    padding: 50,
    fontFamily: "Times-Roman",
    fontSize: 10,
    color: "#000",
    backgroundColor: "#fff",
    lineHeight: 1.4,
  },
  header: {
    paddingBottom: 20,
    marginBottom: 20,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 11,
    textTransform: "uppercase",
    color: "#666",
    letterSpacing: 2,
    marginBottom: 10,
    fontWeight: "bold",
  },
  contactLine: {
    flexDirection: "row",
    gap: 15,
    marginTop: 8,
    alignItems: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 9,
    color: "#333",
    fontWeight: "bold",
  },
  linkLine: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    alignItems: "center",
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
    color: "#000",
    textDecoration: "none",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    // avoid forcing ALL CAPS so sections render in natural case
    // textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    paddingBottom: 2,
    marginBottom: 10,
    marginTop: 15,
  },
  summary: {
    fontSize: 10,
    textAlign: "justify",
    marginBottom: 10,
  },
  entry: {
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 10,
    fontStyle: "italic",
    marginBottom: 5,
  },
  date: {
    fontSize: 10,
  },
  bullet: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 3,
    paddingLeft: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    textAlign: "justify",
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 4,
    fontSize: 9.5,
  },
  skillLabel: {
    fontWeight: "bold",
    width: 80,
  },
  skillList: {
    flex: 1,
  },
});

const TraditionalPDF = ({ data }) => {
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
    themeColor = "#000000",
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
    header: { ...styles.header, borderBottomColor: themeColor },
    sectionTitle: {
      ...styles.sectionTitle,
      color: themeColor,
      borderBottomColor: `${themeColor}40`,
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

        {personalInfo?.profileSummary && (
          <View>
            <Text style={dynamicStyles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{personalInfo.profileSummary}</Text>
          </View>
        )}

        {experience?.length > 0 && (
          <View>
            <Text style={dynamicStyles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{exp.company}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.subtitle}>{exp.position}</Text>
                {exp.responsibilities?.map((res, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text>•</Text>
                    <Text style={styles.bulletText}>{res}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {education?.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            <Text style={dynamicStyles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{edu.institution}</Text>
                  <Text style={styles.date}>
                    {edu.startDate} — {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.subtitle}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {technicalSkills &&
          Object.values(technicalSkills).some((a) => a?.length > 0) && (
            <View>
              <Text style={styles.sectionTitle}>Expertise</Text>
              {Object.entries(technicalSkills).map(
                ([cat, list], i) =>
                  list?.length > 0 && (
                    <View key={i} style={styles.skillRow}>
                      <Text style={styles.skillLabel}>
                        {cat
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .replace(/^\w/, (c) => c.toUpperCase())}
                        :
                      </Text>
                      <Text style={styles.skillList}>{list.join(", ")}</Text>
                    </View>
                  ),
              )}
            </View>
          )}

        {(competencies?.length > 0 || softwareProficiency?.length > 0) && (
          <View>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            {competencies?.length > 0 && (
              <View style={{ marginTop: 5 }}>
                <Text
                  style={{ fontSize: 10, fontWeight: "bold", marginBottom: 3 }}
                >
                  Core Strengths
                </Text>
                {competencies.map((c, i) => (
                  <View key={i} style={styles.bullet}>
                    <Text>•</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                ))}
              </View>
            )}
            {softwareProficiency?.length > 0 && (
              <View style={styles.skillRow}>
                <Text style={styles.skillLabel}>Software:</Text>
                <Text style={styles.skillList}>
                  {softwareProficiency.join(", ")}
                </Text>
              </View>
            )}
            {interests?.length > 0 && (
              <View style={styles.skillRow}>
                <Text style={styles.skillLabel}>Interests:</Text>
                <Text style={styles.skillList}>{interests.join(", ")}</Text>
              </View>
            )}
          </View>
        )}

        {/* Custom Sections */}
        {customSections?.map((section, idx) => (
          <View key={idx}>
            <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
            {section.items?.map((item, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={dynamicStyles.accentText}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default TraditionalPDF;
