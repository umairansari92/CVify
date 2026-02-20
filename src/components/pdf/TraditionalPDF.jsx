import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

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
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
    lineHeight: 1.2,
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
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
          <View style={styles.contact}>
            {personalInfo?.email && <Text>{personalInfo.email}</Text>}
            {personalInfo?.phone && <Text>• {personalInfo.phone}</Text>}
            {personalInfo?.location && <Text>• {personalInfo.location}</Text>}
            {personalInfo?.linkedin && <Text>• LinkedIn</Text>}
          </View>
        </View>

        {personalInfo?.profileSummary && (
          <View>
            <Text style={dynamicStyles.sectionTitle}>Professional Summary</Text>
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
                    {exp.startDate} - {exp.endDate}
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
            {education.map((edu, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{edu.institution}</Text>
                  <Text style={styles.date}>
                    {edu.startDate} - {edu.endDate}
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
              <Text style={styles.sectionTitle}>Technical Skills</Text>
              {Object.entries(technicalSkills).map(
                ([cat, list], i) =>
                  list?.length > 0 && (
                    <View key={i} style={styles.skillRow}>
                      <Text style={styles.skillLabel}>{cat}:</Text>
                      <Text style={styles.skillList}>{list.join(", ")}</Text>
                    </View>
                  ),
              )}
            </View>
          )}

        {(competencies?.length > 0 || softwareProficiency?.length > 0) && (
          <View>
            <Text style={styles.sectionTitle}>Additional Skills</Text>
            {competencies?.length > 0 && (
              <View style={{ marginTop: 5 }}>
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
