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
      src: "https://cdn.jsdelivr.net/gh/Outfitio/Outfit-Fonts@main/fonts/ttf/Outfit-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/Outfitio/Outfit-Fonts@main/fonts/ttf/Outfit-Bold.ttf",
      fontWeight: 700,
    },
  ],
});

import BrandingFooter from "./BrandingFooter";
import BrandingWatermark from "./BrandingWatermark";

const StandardPDF = ({ data }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    customSections,
    themeColor = "#2563eb",
    fontFamily = "Helvetica",
    nameSize = 28,
    headingSize = 11,
    bodySize = 9.5,
    margin = 12,
  } = data || {};

  const dynamicStyles = StyleSheet.create({
    page: {
      padding: `${margin}mm`,
      fontFamily: fontFamily || "Helvetica",
      fontSize: bodySize,
      color: "#333",
      lineHeight: 1.5,
    },
    header: {
      marginBottom: 15,
      borderBottomWidth: 1.5,
      borderBottomColor: "#111",
      paddingBottom: 12,
    },
    name: {
      fontSize: nameSize,
      fontWeight: "bold",
      color: "#000",
      marginBottom: 8,
      lineHeight: 1.2,
      textAlign: "center",
    },
    jobTitle: {
      fontSize: bodySize + 1.5,
      color: "#444",
      marginBottom: 10,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      lineHeight: 1.2,
      textAlign: "center",
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
      fontSize: bodySize - 1,
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
      padding: "3 8",
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#e2e8f0",
    },
    badgeText: {
      fontSize: bodySize - 1,
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
      fontSize: headingSize,
      fontWeight: "bold",
      textTransform: "uppercase",
      backgroundColor: "#f8fafc",
      padding: "6 10",
      marginBottom: 12,
      color: "#1e293b",
      borderLeftWidth: 4,
      borderLeftColor: themeColor,
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
      fontSize: headingSize,
      color: "#111",
    },
    subtitle: {
      fontSize: bodySize + 0.5,
      color: themeColor,
      fontWeight: "bold",
      marginBottom: 6,
    },
    date: {
      fontSize: bodySize - 1,
      color: "#6b7280",
    },
    bullet: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 4,
      paddingLeft: 10,
    },
    bulletDot: {
      width: 10,
      color: themeColor,
    },
    bulletText: {
      flex: 1,
      fontSize: bodySize,
      lineHeight: 1.5,
    },
  });

  return (
    <Document title={`${personalInfo?.fullName || "Resume"} - CVify`}>
      <Page size="A4" style={dynamicStyles.page}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.name}>{personalInfo?.fullName}</Text>
          <Text style={dynamicStyles.jobTitle}>{personalInfo?.jobTitle}</Text>
          
          <View style={dynamicStyles.contactLine}>
            {personalInfo?.email && (
              <View style={dynamicStyles.contactItem}>
                <IconEmail />
                <Text>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo?.phone && (
              <View style={dynamicStyles.contactItem}>
                <IconPhone />
                <Text>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo?.location && (
              <View style={dynamicStyles.contactItem}>
                <IconLocation />
                <Text>{personalInfo.location}</Text>
              </View>
            )}
          </View>

          <View style={dynamicStyles.linkLine}>
            {personalInfo?.linkedin && (
              <View style={dynamicStyles.badge}>
                <IconLinkedIn />
                <Link src={personalInfo.linkedin} style={dynamicStyles.badgeText}>LinkedIn</Link>
              </View>
            )}
            {personalInfo?.github && (
              <View style={dynamicStyles.badge}>
                <IconGitHub />
                <Link src={personalInfo.github} style={dynamicStyles.badgeText}>GitHub</Link>
              </View>
            )}
            {personalInfo?.portfolio && (
              <View style={dynamicStyles.badge}>
                <IconPortfolio />
                <Link src={personalInfo.portfolio} style={dynamicStyles.badgeText}>Portfolio</Link>
              </View>
            )}
          </View>
        </View>

        {/* Experience Section */}
        {experience?.length > 0 && (
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Experience</Text>
            {experience.map((exp, idx) => (
              <View key={idx} style={dynamicStyles.entry}>
                <View style={dynamicStyles.entryHeader}>
                  <Text style={dynamicStyles.title}>{exp.position}</Text>
                  <Text style={dynamicStyles.date}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                <Text style={dynamicStyles.subtitle}>{exp.company}</Text>
                {Array.isArray(exp.responsibilities) && exp.responsibilities.map((resp, ridx) => (
                  <View key={ridx} style={dynamicStyles.bullet}>
                    <Text style={dynamicStyles.bulletDot}>•</Text>
                    <Text style={dynamicStyles.bulletText}>{resp}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Education</Text>
            {education.map((edu, idx) => (
              <View key={idx} style={dynamicStyles.entry}>
                <View style={dynamicStyles.entryHeader}>
                  <Text style={dynamicStyles.title}>{edu.degree}</Text>
                  <Text style={dynamicStyles.date}>{edu.startDate} - {edu.endDate}</Text>
                </View>
                <Text style={dynamicStyles.subtitle}>{edu.school}</Text>
              </View>
            ))}
          </View>
        )}

        <BrandingWatermark />
        <BrandingFooter themeColor={themeColor} />
      </Page>
    </Document>
  );
};

export default StandardPDF;
