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
    color: "#2c3e50",
    backgroundColor: "#f9f7f2",
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    borderBottomWidth: 1.5,
    borderBottomStyle: "double", // Note: double actually isn't supported, it will be solid.
    borderBottomColor: "#d1d5db",
    paddingBottom: 35,
    marginBottom: 25,
  },
  name: {
    fontSize: 36,
    color: "#2c3e50",
    marginBottom: 12,
    lineHeight: 1.1,
  },
  jobTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#9ca3af",
    marginBottom: 15,
    lineHeight: 1.3,
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
  } = data;

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
          <View style={styles.contact}>
            {personalInfo?.email && <Text>{personalInfo.email}</Text>}
            {personalInfo?.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo?.location && <Text>{personalInfo.location}</Text>}
            {personalInfo?.linkedin && (
              <Link src={personalInfo.linkedin} style={{ color: "#4b5563" }}>
                LinkedIn
              </Link>
            )}
          </View>
        </View>

        {personalInfo?.profileSummary && (
          <Text style={styles.summary}>"{personalInfo.profileSummary}"</Text>
        )}

        {experience?.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.expRow} wrap={false}>
                <View style={styles.expDateSide}>
                  <Text style={styles.dateText}>{exp.startDate}</Text>
                  <Text
                    style={[
                      styles.dateText,
                      { color: "#9ca3af", marginVertical: 2 },
                    ]}
                  >
                    to
                  </Text>
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

        <View style={styles.columnGrid}>
          {education?.length > 0 && (
            <View style={styles.col}>
              <Text style={styles.sectionTitle}>Education</Text>
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
                    {edu.startDate} - {edu.endDate}
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
                              textTransform: "uppercase",
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

        {(competencies?.length > 0 || softwareProficiency?.length > 0) && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sectionTitle}>Additional Detail</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {competencies?.map((c, i) => (
                <Text
                  key={i}
                  style={{
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                    padding: "3 8",
                    borderRadius: 15,
                    fontSize: 8.5,
                    fontStyle: "italic",
                    marginBottom: 5,
                  }}
                >
                  {c}
                </Text>
              ))}
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
                  Software: {softwareProficiency.join(" • ")}
                </Text>
              )}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ElegantPDF;
