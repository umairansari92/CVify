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
  watermarkWrapper: {
    transform: "rotate(-45deg)",
    alignItems: "center",
    justifyContent: "center",
    width: 1200,   // Explicit large sizes so text can spread without wrapping
    height: 1200, 
  },
  watermarkText1: {
    fontSize: 35,
    color: "#000000",
    opacity: 0.08,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 1.2,
  },
  watermarkText2: {
    fontSize: 30,
    color: "#000000",
    opacity: 0.08,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 1.2,
  },
});

const BrandingWatermark = () => {
  return (
    <View style={styles.container} fixed>
      <View style={styles.watermarkWrapper}>
        <Text style={styles.watermarkText1}>
          {"Designed and developed by CVify"}
        </Text>
        <Text style={styles.watermarkText2}>
          {"https://cvifypro.vercel.app"}
        </Text>
      </View>
    </View>
  );
};

export default BrandingWatermark;
