import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IceVaultLogo from "../../components/UI/IceVaultLogo";
import { Colors } from "../../constants/theme";

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <IceVaultLogo variant="compact" />
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Welcome to IceVault</Text>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.onSurface,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
  },
});
