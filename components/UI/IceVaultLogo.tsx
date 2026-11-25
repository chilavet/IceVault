import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

const SNOWFLAKE_ICON = require("../../assets/icons/snowflake.svg");
const LEAVES_ICON = require("../../assets/icons/protective-leaves.svg");

interface IceVaultLogoProps {
  variant?: "hero" | "compact";
  showTagline?: boolean;
}

const IceVaultLogo = ({
  variant = "compact",
  showTagline = false,
}: IceVaultLogoProps) => {
  const isHero = variant === "hero";
  const symbolSize = isHero ? 166 : 124.5;

  return (
    <View style={styles.container}>
      <View style={[styles.symbolFrame, { width: symbolSize, height: symbolSize }]}>
        <Image
          source={SNOWFLAKE_ICON}
          contentFit="contain"
          style={[
            styles.snowflake,
            {
              top: symbolSize * 0.0813,
              left: symbolSize * 0.15,
              width: symbolSize * 0.7,
              height: symbolSize * 0.575,
            },
          ]}
        />
        <Image
          source={LEAVES_ICON}
          contentFit="contain"
          style={[
            styles.leaves,
            {
              top: symbolSize * 0.5048,
              left: symbolSize * 0.0938,
              width: symbolSize * 0.8125,
              height: symbolSize * 0.4202,
            },
          ]}
        />
      </View>

      <Text style={isHero ? styles.heroWordmark : styles.compactWordmark}>
        <Text style={{ color: isHero ? Colors.onPrimary : "#000000" }}>ICE</Text>
        {" "}
        <Text style={{ color: Colors.brandGreen }}>VAULT</Text>
      </Text>

      {showTagline ? (
        <Text style={styles.tagline}>Store fresh. Grow More</Text>
      ) : null}
    </View>
  );
};

export default IceVaultLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  symbolFrame: {
    position: "relative",
    overflow: "hidden",
  },
  snowflake: {
    position: "absolute",
  },
  leaves: {
    position: "absolute",
  },
  heroWordmark: {
    marginTop: 28,
    fontSize: 45,
    lineHeight: 52,
    fontWeight: "700",
    textAlign: "center",
  },
  compactWordmark: {
    marginTop: 6,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    textAlign: "center",
  },
  tagline: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "600",
    color: Colors.onPrimary,
    textAlign: "center",
  },
});
