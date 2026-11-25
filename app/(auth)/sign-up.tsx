import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../../components/UI/AuthInput";
import Button from "../../components/UI/Button";
import SocialAuthButtons from "../../components/UI/SocialAuthButtons";
import { Colors } from "../../constants/theme";

const ARROW_BACK_ICON = require("../../assets/icons/arrow-back.svg");
const PERSON_ICON = require("../../assets/icons/person.svg");
const PHONE_ICON = require("../../assets/icons/phone.svg");
const EMAIL_ICON = require("../../assets/icons/email.svg");
const LOCK_ICON = require("../../assets/icons/lock.svg");
const ADD_ICON = require("../../assets/icons/add.svg");

const ROLES = ["Farmer/trader", "Attendant", "Operator"] as const;
type Role = (typeof ROLES)[number];

const SignUpScreen = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("Operator");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(true);

  const handleRegister = () => {
    router.push({
      pathname: "/(auth)/otp",
      params: { fullName: fullName.trim() || "Musa Danjuma" },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            hitSlop={12}
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Image
              source={ARROW_BACK_ICON}
              contentFit="contain"
              style={styles.backIcon}
            />
          </Pressable>

          <View style={styles.headerBlock}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Ice-Vault today</Text>
          </View>

          <View style={styles.roleRow}>
            {ROLES.map((role) => {
              const isSelected = selectedRole === role;
              return (
                <Pressable
                  key={role}
                  accessibilityRole="button"
                  onPress={() => setSelectedRole(role)}
                  style={[
                    styles.rolePill,
                    isSelected ? styles.rolePillActive : styles.rolePillInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.roleText,
                      isSelected && styles.roleTextActive,
                    ]}
                  >
                    {role}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.inputsGroup}>
            <AuthInput
              icon={PERSON_ICON}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              backgroundColor={Colors.surfaceLow}
            />
            <AuthInput
              icon={PHONE_ICON}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              backgroundColor={Colors.surfaceLow}
            />
            <AuthInput
              icon={EMAIL_ICON}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              backgroundColor={Colors.surfaceLow}
            />
            <AuthInput
              icon={LOCK_ICON}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              backgroundColor={Colors.surfaceLow}
            />
          </View>

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreed }}
            onPress={() => setAgreed((prev) => !prev)}
            style={styles.termsRow}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>
            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text style={styles.termsLink}>
                Terms & Condition{"\n"}and privacy policy
              </Text>
            </Text>
          </Pressable>

          <View style={styles.registerWrap}>
            <Button
              title="Register Account"
              size="large"
              disabled={!agreed}
              leftIcon={
                <Image
                  source={ADD_ICON}
                  contentFit="contain"
                  style={styles.addIcon}
                />
              }
              onPress={handleRegister}
            />
          </View>

          <View style={styles.socialWrap}>
            <SocialAuthButtons variant="compact" />
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account ? </Text>
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => router.replace("/(auth)/sign-in")}
            >
              <Text style={styles.footerLink}>Sign in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 4,
    marginBottom: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerBlock: {
    gap: 4,
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "700",
    color: Colors.onSurface,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.onSurface,
    letterSpacing: 0.15,
    paddingLeft: 12,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 28,
  },
  rolePill: {
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rolePillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rolePillInactive: {
    backgroundColor: Colors.mintBg,
    borderColor: Colors.outline,
  },
  roleText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: Colors.onSurface,
    letterSpacing: 0.1,
  },
  roleTextActive: {
    color: Colors.onPrimary,
    fontWeight: "600",
  },
  inputsGroup: {
    marginTop: 24,
    gap: 12,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    paddingHorizontal: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
  },
  checkmark: {
    color: Colors.onPrimary,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: Colors.onSurface,
    letterSpacing: 0.1,
  },
  termsLink: {
    color: Colors.secondary,
  },
  registerWrap: {
    marginTop: 24,
  },
  addIcon: {
    width: 22,
    height: 22,
  },
  socialWrap: {
    marginTop: 24,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: Colors.gray,
    letterSpacing: 0.1,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: Colors.primary,
    letterSpacing: 0.1,
  },
});
