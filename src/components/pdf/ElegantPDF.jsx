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
    color: "#2c3e50",
    backgroundColor: "#f9f7f2",
    lineHeight: 1.5,
  },
  header: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 25,
    marginBottom: 25,
  },
  name: {
    fontSize: 36,
    color: "#2c3e50",
    marginBottom: 12,
    lineHeight: 1.1,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#9ca3af",
    marginBottom: 10,
    lineHeight: 1.3,
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
    fontSize: 9,
    color: "#6b7280",
    fontStyle: "italic",
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
    fontSize: 9,
    color: "#2c3e50",
    textDecoration: "none",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 20,
    fontSize: 9,
    fontStyle: "italic",
    color: "#6b7280",
  },
  summary: {
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 30,
    color: "#4b5563",
  },
  sectionTitle: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 5,
    textAlign: "center",
    marginBottom: 20,
    color: "#1f2937",
    width: "100%",
  },
  expRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  expDateSide: {
    width: "25%",
    textAlign: "right",
    paddingRight: 15,
  },
  expContentSide: {
    width: "75%",
    borderLeftWidth: 1,
    borderLeftColor: "#e5e7eb",
    paddingLeft: 15,
  },
  dateText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#4b5563",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#6b7280",
    marginBottom: 8,
  },
  bullet: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: "#4b5563",
  },
  columnGrid: {
    flexDirection: "row",
    gap: 30,
  },
  col: {
    flex: 1,
  },
});

const ElegantPDF = ({ data }) => {
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
    themeColor = "#2c3e50",
    fontFamily = "Playfair Display",
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
      default:
        return "Times-Roman";
    }
  };

  const pdfFont = getPDFFont(fontFamily);

  const dynamicStyles = {
    page: { ...styles.page, fontFamily: pdfFont },
    accentText: { color: themeColor },
    sectionTitle: {
      ...styles.sectionTitle,
      color: themeColor,
      borderColor: `${themeColor}20`,
    },
  };

  return (
    <Document>
      <Page size="A4" style={dynamicStyles.page}>
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

        {personalInfo?.profileSummary && (
          <Text style={styles.summary}>"{personalInfo.profileSummary}"</Text>
        )}

        {experience?.length > 0 && (
          <View>
            <Text style={dynamicStyles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.expRow} wrap={false}>
                <View style={styles.expDateSide}>
                  <Text style={styles.dateText}>{exp.startDate}</Text>
                  <Text style={styles.dateText}>{exp.endDate}</Text>
                </View>
                <View style={styles.expContentSide}>
                  <Text style={styles.title}>{exp.company}</Text>
                  <Text style={styles.subtitle}>{exp.position}</Text>
                  {exp.responsibilities?.map((res, j) => (
                    <View key={j} style={styles.bullet}>
                      <Text style={{ color: "#d1d5db" }}>•</Text>
                      <Text style={styles.bulletText}>{res}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {projects?.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={dynamicStyles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 15 }} wrap={false}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Text style={styles.title}>{proj.name}</Text>
                  {proj.link && (
                    <Link
                      src={proj.link}
                      style={{
                        fontSize: 9,
                        color: "#4b5563",
                        textDecoration: "none",
                        fontStyle: "italic",
                      }}
                    >
                      {proj.link.replace(/^https?:\/\//, "")}
                    </Link>
                  )}
                </View>
                {proj.description?.map((desc, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text style={{ color: "#d1d5db" }}>•</Text>
                    <Text style={styles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        <View style={styles.columnGrid}>
          {education?.length > 0 && (
            <View style={styles.col}>
              <Text style={dynamicStyles.sectionTitle}>Education</Text>
              {education.map((edu, i) => (
                <View
                  key={i}
                  style={{ textAlign: "center", marginBottom: 15 }}
                  wrap={false}
                >
                  <Text style={[styles.title, { fontSize: 11 }]}>
                    {edu.institution}
                  </Text>
                  <Text style={styles.subtitle}>{edu.degree}</Text>
                  <Text style={{ fontSize: 8.5, color: "#9ca3af" }}>
                    {edu.startDate} — {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {technicalSkills &&
            Object.values(technicalSkills).some((a) => a?.length > 0) && (
              <View style={styles.col}>
                <Text style={styles.sectionTitle}>Expertise</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  {Object.entries(technicalSkills).map(
                    ([cat, list], i) =>
                      list?.length > 0 && (
                        <View
                          key={i}
                          style={{
                            width: "45%",
                            textAlign: "center",
                            marginBottom: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 8.5,
                              fontWeight: "bold",
                              // textTransform: "uppercase",
                              marginBottom: 3,
                            }}
                          >
                            {cat}
                          </Text>
                          <Text style={{ fontSize: 8.5, color: "#6b7280" }}>
                            {list.join(", ")}
                          </Text>
                        </View>
                      ),
                  )}
                </View>
              </View>
            )}
        </View>

        {(competencies?.length > 0 ||
          softwareProficiency?.length > 0 ||
          interests?.length > 0) && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sectionTitle}>Additional Skills</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {competencies?.length > 0 && (
                <View style={{ width: "100%", marginTop: 10 }}>
                  {competencies.map((c, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text style={{ color: "#d1d5db" }}>•</Text>
                      <Text
                        style={[styles.bulletText, { textAlign: "justify" }]}
                      >
                        {c}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
              {softwareProficiency?.length > 0 && (
                <Text
                  style={{
                    fontSize: 9,
                    color: "#4b5563",
                    width: "100%",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  Tools: {softwareProficiency.join(" • ")}
                </Text>
              )}
              {interests?.length > 0 && (
                <Text
                  style={{
                    fontSize: 9,
                    color: "#4b5563",
                    width: "100%",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  Interests: {interests.join(" • ")}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {customSections?.map((section, idx) => (
          <View key={idx} style={{ marginTop: 10 }}>
            <Text style={dynamicStyles.sectionTitle}>{section.title}</Text>
            <View style={{ paddingHorizontal: 40 }}>
              {section.items?.map((item, j) => (
                <View key={j} style={styles.bullet}>
                  <Text style={{ color: "#d1d5db" }}>•</Text>
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

export default ElegantPDF;
