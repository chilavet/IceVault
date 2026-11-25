import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../constants/theme";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "filled" | "outlined";
  size?: "default" | "large";
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({
  title,
  onPress,
  variant = "filled",
  size = "default",
  leftIcon,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) => {
  const isFilled = variant === "filled";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        size === "large" ? styles.large : styles.default,
        isFilled ? styles.filled : styles.outlined,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {leftIcon ? <View style={styles.iconWrap}>{leftIcon}</View> : null}
      <Text
        style={[
          styles.label,
          size === "large" ? styles.labelLarge : styles.labelDefault,
          isFilled ? styles.filledText : styles.outlinedText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    gap: 8,
    paddingHorizontal: 24,
    width: "100%",
  },
  default: {
    height: 48,
  },
  large: {
    height: 56,
  },
  filled: {
    backgroundColor: Colors.primary,
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.outline,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    letterSpacing: 0.1,
  },
  labelDefault: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  labelLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    letterSpacing: 0.15,
  },
  filledText: {
    color: Colors.onPrimary,
  },
  outlinedText: {
    color: Colors.onPrimary,
  },
});
