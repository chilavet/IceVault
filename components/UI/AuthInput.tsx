import { Image, ImageSource } from "expo-image";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../constants/theme";

const VISIBILITY_ICON = require("../../assets/icons/visibility.svg");

interface AuthInputProps {
  icon: ImageSource;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const AuthInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  backgroundColor = Colors.surface,
  style,
}: AuthInputProps) => {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Image source={icon} contentFit="contain" style={styles.leftIcon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        secureTextEntry={hidden}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={styles.input}
      />
      {secureTextEntry ? (
        <Pressable
          accessibilityLabel={hidden ? "Show password" : "Hide password"}
          hitSlop={8}
          onPress={() => setHidden((prev) => !prev)}
          style={styles.toggleBtn}
        >
          <Image
            source={VISIBILITY_ICON}
            contentFit="contain"
            style={[styles.rightIcon, !hidden && styles.rightIconActive]}
          />
        </Pressable>
      ) : null}
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    gap: 10,
    width: "100%",
  },
  leftIcon: {
    width: 22,
    height: 22,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.onSurface,
    paddingVertical: 0,
  },
  toggleBtn: {
    padding: 4,
  },
  rightIcon: {
    width: 22,
    height: 22,
  },
  rightIconActive: {
    opacity: 0.55,
  },
});
