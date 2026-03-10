import React from "react";
import { Page, Text, View, Document, StyleSheet, Link, Font } from "@react-pdf/renderer";

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
    padding: 60,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    color: "#333",
  },
  header: {
    marginBottom: 40,
    borderBottom: "1pt solid #eee",
    paddingBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "heavy",
    color: "#0f172a",
    marginBottom: 8,
    textTransform: "uppercase",
    lineHeight: 1.2,
  },
  contact: {
    fontSize: 10,
    color: "#64748b",
  },
  date: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 10,
    color: "#475569",
  },
  content: {
    textAlign: "justify",
    whiteSpace: "pre-wrap",
  },
  footer: {
    marginTop: 50,
    fontSize: 10,
    color: "#94a3b8",
    textAlign: "center",
    borderTop: "1pt solid #eee",
    paddingTop: 20,
  },
  footerLink: {
    color: "#2563eb",
    textDecoration: "none",
  },
});

import BrandingFooter from "./BrandingFooter";

const CoverLetterPDF = ({ letter, user }) => {
  const themeColor = letter.themeColor || "#2563eb";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.firstName || "Applicant"}
          </Text>
          <Text style={styles.contact}>
            {user?.email ? `${user.email} | ` : ""}
            {letter.jobTitle || "Cover Letter"} Application
          </Text>
        </View>

        <Text style={styles.date}>
          {new Date(letter.createdAt || Date.now()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>

        <View style={styles.content}>
          <Text>{letter.content || ""}</Text>
        </View>

        <BrandingFooter themeColor={themeColor} />
      </Page>
    </Document>
  );
};

export default CoverLetterPDF;
