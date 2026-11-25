import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/UI/Button";
import IceVaultLogo from "../../components/UI/IceVaultLogo";
import { Colors } from "../../constants/theme";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 24;

const OtpScreen = () => {
  const { fullName } = useLocalSearchParams<{ fullName?: string }>();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRefs = useRef<(React.ComponentRef<typeof TextInput> | null)[]>(
    []
  );

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (text: string, index: number) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    const nextDigits = [...digits];

    if (cleaned.length > 1) {
      cleaned
        .slice(0, OTP_LENGTH - index)
        .split("")
        .forEach((char, offset) => {
          nextDigits[index + offset] = char;
        });
      setDigits(nextDigits);
      const nextFocus = Math.min(index + cleaned.length, OTP_LENGTH - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    nextDigits[index] = cleaned;
    setDigits(nextDigits);
    if (cleaned && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTimer = (sec: number) => `00:${sec.toString().padStart(2, "0")}`;

  const renderBox = (index: number) => (
    <TextInput
      key={index}
      ref={(el) => {
        inputRefs.current[index] = el;
      }}
      value={digits[index]}
      onChangeText={(text) => handleChange(text, index)}
      onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
      keyboardType="number-pad"
      maxLength={OTP_LENGTH}
      textAlign="center"
      selectTextOnFocus
      style={styles.otpBox}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <IceVaultLogo variant="compact" />

        <View style={styles.contentBlock}>
          <View style={styles.codeSection}>
            <Text style={styles.prompt}>Enter the 6-digit code</Text>
            <View style={styles.otpRow}>
              <View style={styles.otpGroup}>{[0, 1, 2].map(renderBox)}</View>
              <Text style={styles.dash}>-</Text>
              <View style={styles.otpGroup}>{[3, 4, 5].map(renderBox)}</View>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <Pressable
              disabled={secondsLeft > 0}
              onPress={() => setSecondsLeft(RESEND_SECONDS)}
              style={styles.resendWrap}
            >
              <Text style={styles.resendText}>
                {secondsLeft > 0 ? (
                  <>
                    Resend code in{" "}
                    <Text style={styles.timerHighlight}>
                      {formatTimer(secondsLeft)}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.timerHighlight}>Resend code</Text>
                )}
              </Text>
            </Pressable>

            <Button
              title="Verify"
              onPress={() =>
                router.push({
                  pathname: "/(auth)/verification",
                  params: { fullName: fullName || "Musa Danjuma" },
                })
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 26,
    paddingTop: 44,
  },
  contentBlock: {
    width: "100%",
    marginTop: 56,
    gap: 44,
  },
  codeSection: {
    alignItems: "center",
    gap: 20,
  },
  prompt: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.onSurface,
    letterSpacing: 0.15,
    textAlign: "center",
  },
  otpRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  otpGroup: {
    flexDirection: "row",
    gap: 7,
  },
  otpBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.otpBox,
    fontSize: 20,
    fontWeight: "600",
    color: Colors.onSurface,
  },
  dash: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000000",
  },
  bottomSection: {
    gap: 40,
    alignItems: "center",
  },
  resendWrap: {
    padding: 8,
  },
  resendText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.onPrimaryContainer,
    letterSpacing: 0.1,
    textAlign: "center",
  },
  timerHighlight: {
    fontWeight: "700",
    color: Colors.primary,
  },
});
