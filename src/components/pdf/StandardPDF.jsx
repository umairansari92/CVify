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
    fontSize: 11,
    color: "#444",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    lineHeight: 1.2,
    textAlign: "center",
  },
  contactLine: {
    flexDirection: "row",
    gap: 20,
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
    alignItems: "flex-start",
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

import BrandingFooter from "./BrandingFooter";

const StandardPDF = ({ data }) => {
  const {
    // ... items
    themeColor = "#2563eb",
  } = data || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ... existing content ... */}
        {/* Page content ends */}
        <BrandingFooter themeColor={themeColor} />
      </Page>
    </Document>
  );
};

export default StandardPDF;
