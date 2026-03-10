import React from "react";
import { View, Text, Link, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  footerText: {
    fontSize: 10,
    color: "#94a3b8",
    textAlign: "right",
  },
  cvifyLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
  },
});

const BrandingFooter = ({ themeColor = "#2563eb" }) => {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>
        Designed and developed by{" "}
        <Link src="https://cvifypro.vercel.app/" style={[styles.cvifyLink, { color: themeColor }]}>
          CVify
        </Link>
      </Text>
    </View>
  );
};

export default BrandingFooter;
