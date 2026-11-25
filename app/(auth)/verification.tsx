import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/UI/Button";
import IceVaultLogo from "../../components/UI/IceVaultLogo";
import { Colors } from "../../constants/theme";

const CHECK_ICON = require("../../assets/icons/check-verified.svg");

const VerificationScreen = () => {
  const { fullName } = useLocalSearchParams<{ fullName?: string }>();
  const displayName = fullName || "Musa Danjuma";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <IceVaultLogo variant="compact" />

        <View style={styles.card}>
          <View style={styles.headerBlock}>
            <Image
              source={CHECK_ICON}
              contentFit="contain"
              style={styles.checkIcon}
            />
            <Text style={styles.title}>Registration Successful !</Text>
          </View>

          <View style={styles.bodyBlock}>
            <Text style={styles.welcomeText}>
              Welcome to ICE VAULT,{"\n"}
              {displayName}!
            </Text>

            <Text style={styles.verifiedText}>
              Your account has been verified.
            </Text>

            <Button
              title="Go to Dashboard"
              onPress={() => router.replace("/(root)/dashboard")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 27,
    paddingTop: 44,
  },
  card: {
    width: "100%",
    marginTop: 40,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 40,
    alignItems: "center",
    gap: 52,
  },
  headerBlock: {
    alignItems: "center",
    gap: 16,
  },
  checkIcon: {
    width: 48,
    height: 48,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "600",
    color: Colors.onSurfaceVariant,
    textAlign: "center",
  },
  bodyBlock: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.15,
    textAlign: "center",
    marginBottom: 32,
  },
  verifiedText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.5,
    textAlign: "center",
  },
});
