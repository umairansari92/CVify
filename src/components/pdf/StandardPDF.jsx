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
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 1.5,
    borderBottomColor: "#111",
    paddingBottom: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    lineHeight: 1.2,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 14,
    color: "#444",
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
    lineHeight: 1.2,
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
    color: "#4b5563",
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
    color: "#111",
    textDecoration: "none",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "#f8fafc",
    padding: "6 10",
    marginBottom: 12,
    color: "#1e293b",
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  entry: {
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#111",
  },
  subtitle: {
    fontSize: 10,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 6,
  },
  date: {
    fontSize: 9,
    color: "#6b7280",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 10,
  },
  bulletDot: {
    width: 10,
    color: "#2563eb",
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.5,
  },
});

const StandardPDF = ({ data }) => {
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
  } = data || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text
              style={{ fontSize: 9.5, textAlign: "justify", lineHeight: 1.6 }}
            >
              {personalInfo.profileSummary}
            </Text>
          </View>
        )}

        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{exp.position}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.subtitle}>{exp.company}</Text>
                {exp.responsibilities?.map((res, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{res}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {technicalSkills &&
          Object.values(technicalSkills).some((a) => a?.length > 0) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Expertise</Text>
              {Object.entries(technicalSkills).map(
                ([key, val], i) =>
                  val?.length > 0 && (
                    <Text key={i} style={{ fontSize: 9.5, marginBottom: 6 }}>
                      <Text style={{ fontWeight: "bold", color: "#444" }}>
                        {key.toUpperCase()}:{" "}
                      </Text>
                      {val.join(", ")}
                    </Text>
                  ),
              )}
            </View>
          )}

        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{proj.name}</Text>
                  {proj.link && (
                    <Link
                      style={[styles.date, { color: "#2563eb" }]}
                      src={proj.link}
                    >
                      {proj.link.replace(/^https?:\/\//, "")}
                    </Link>
                  )}
                </View>
                {proj.description?.map((desc, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text style={[styles.bulletDot, { color: "#6b7280" }]}>
                      •
                    </Text>
                    <Text style={styles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {softwareProficiency?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Software & Systems</Text>
            <Text style={{ fontSize: 9.5 }}>
              {softwareProficiency.join(", ")}
            </Text>
          </View>
        )}

        {(competencies?.length > 0 || interests?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Strengths</Text>
            {competencies?.map((c, i) => (
              <View key={i} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{c}</Text>
              </View>
            ))}
            {interests?.length > 0 && (
              <View style={{ marginTop: 8 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 10,
                    color: "#444",
                    marginBottom: 4,
                  }}
                >
                  Interests:
                </Text>
                <Text style={{ fontSize: 9.5 }}>{interests.join(", ")}</Text>
              </View>
            )}
          </View>
        )}

        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
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

        {/* Custom Sections */}
        {customSections?.map((section, idx) => (
          <View key={idx} style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items?.map((item, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default StandardPDF;
