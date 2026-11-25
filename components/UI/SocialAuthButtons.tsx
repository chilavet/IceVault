import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

const GOOGLE_ICON = require("../../assets/icons/google.svg");
const APPLE_ICON = require("../../assets/icons/apple.svg");

interface SocialAuthButtonsProps {
  dividerText?: string;
  onGooglePress?: () => void;
  onApplePress?: () => void;
  variant?: "pill" | "compact";
}

const SocialAuthButtons = ({
  dividerText = "or continue with",
  onGooglePress,
  onApplePress,
  variant = "pill",
}: SocialAuthButtonsProps) => {
  const isCompact = variant === "compact";

  return (
    <View style={styles.wrapper}>
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>{dividerText}</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={[styles.buttonsRow, isCompact && styles.compactButtonsRow]}>
        <Pressable
          accessibilityLabel="Continue with Google"
          accessibilityRole="button"
          onPress={onGooglePress}
          style={({ pressed }) => [
            isCompact ? styles.compactButton : styles.pillButton,
            pressed && styles.pressed,
          ]}
        >
          <Image source={GOOGLE_ICON} contentFit="contain" style={styles.socialIcon} />
        </Pressable>

        <Pressable
          accessibilityLabel="Continue with Apple"
          accessibilityRole="button"
          onPress={onApplePress}
          style={({ pressed }) => [
            isCompact ? styles.compactButton : styles.pillButton,
            pressed && styles.pressed,
          ]}
        >
          <Image source={APPLE_ICON} contentFit="contain" style={styles.socialIcon} />
        </Pressable>
      </View>
    </View>
  );
};

export default SocialAuthButtons;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray3,
  },
  dividerText: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.gray,
    letterSpacing: 0.4,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    width: "100%",
  },
  compactButtonsRow: {
    gap: 21,
  },
  pillButton: {
    flex: 1,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.gray3,
    alignItems: "center",
    justifyContent: "center",
  },
  compactButton: {
    width: 67,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.outline,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  pressed: {
    opacity: 0.7,
  },
});
