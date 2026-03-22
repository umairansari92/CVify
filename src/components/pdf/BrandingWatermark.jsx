import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -10, // Places watermark behind all content
  },
  watermarkText: {
    fontSize: 34,
    color: "#000000",
    opacity: 0.06,
    transform: "rotate(-45deg)",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0,
    width: 1200, // Explicit large fixed width to ensure it occupies one line
  },
});

const BrandingWatermark = () => {
  return (
    <View style={styles.container} fixed>
      <Text style={styles.watermarkText}>
        {"Designed and developed by CVify | https://cvifypro.vercel.app"}
      </Text>
    </View>
  );
};

export default BrandingWatermark;
