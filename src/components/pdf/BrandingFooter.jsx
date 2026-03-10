import React from "react";
import { View, Text, Link, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 28,
    left: 40,
    right: 38,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#E4E4E7",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  footerText: {
    fontSize: 9,
    color: "#A1A1AA",
    textAlign: "right",
  },
});

const BrandingFooter = ({ themeColor = "#2563eb" }) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Designed and developed by CVify | https://cvifypro.vercel.app/
      </Text>
    </View>
  );
};

export default BrandingFooter;
