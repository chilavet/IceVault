import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/UI/Button";
import IceVaultLogo from "../components/UI/IceVaultLogo";
import { ONBOARDING_DATA, OnboardingItem } from "../constants/onboarding";
import { Colors } from "../constants/theme";

const OnboardingScreen = () => {
  const { width, height } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index?: number | null }> }) => {
      if (
        viewableItems.length > 0 &&
        typeof viewableItems[0].index === "number"
      ) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = (index: number) => {
    if (index < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: index + 1,
        animated: true,
      });
    } else {
      router.push("/(auth)/sign-up");
    }
  };

  const handleSkip = () => {
    router.push("/(auth)/sign-in");
  };

  const renderSlide = ({
    item,
    index,
  }: {
    item: OnboardingItem;
    index: number;
  }) => {
    const isLast = index === ONBOARDING_DATA.length - 1;

    return (
      <View style={[styles.slide, { width, height }]}>
        <Image
          source={item.image}
          contentFit="cover"
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={["rgba(5, 32, 15, 0.61)", "rgba(1, 14, 6, 0.98)"]}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topBar}>
            {item.showSkip ? (
              <Pressable
                accessibilityRole="button"
                hitSlop={12}
                onPress={handleSkip}
                style={({ pressed }) => [
                  styles.skipButton,
                  pressed && styles.skipPressed,
                ]}
              >
                <Text style={styles.skipText}>Skip</Text>
              </Pressable>
            ) : (
              <View style={styles.skipPlaceholder} />
            )}
          </View>

          <View style={styles.heroSection}>
            <IceVaultLogo variant="hero" showTagline />
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.copyContainer}>
              {item.headline ? (
                <Text style={styles.headline}>{item.headline}</Text>
              ) : null}
              <Text
                style={
                  item.underlinedDescription
                    ? styles.underlinedDescription
                    : styles.description
                }
              >
                {item.description}
              </Text>
            </View>

            <View style={styles.actionsContainer}>
              <Button
                title={item.primaryLabel}
                onPress={() => handleNext(index)}
              />
              {isLast && item.secondaryLabel ? (
                <Button
                  title={item.secondaryLabel}
                  variant="outlined"
                  onPress={() => router.push("/(auth)/sign-in")}
                />
              ) : null}
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        extraData={activeIndex}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#010e06",
  },
  slide: {
    position: "relative",
    overflow: "hidden",
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 17,
    paddingBottom: 48,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 12,
    minHeight: 44,
  },
  skipButton: {
    padding: 8,
  },
  skipPressed: {
    opacity: 0.7,
  },
  skipPlaceholder: {
    height: 36,
  },
  skipText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    color: Colors.onPrimary,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    width: "100%",
    gap: 28,
    alignItems: "center",
  },
  copyContainer: {
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
  },
  headline: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "600",
    color: Colors.inverseOnSurface,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.tertiary,
    textAlign: "center",
  },
  underlinedDescription: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
    color: Colors.inverseOnSurface,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  actionsContainer: {
    width: "100%",
    gap: 16,
    paddingHorizontal: 18,
  },
});
