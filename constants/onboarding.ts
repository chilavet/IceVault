import { ImageSource } from "expo-image";

export interface OnboardingItem {
  id: string;
  headline?: string;
  description: string;
  underlinedDescription?: boolean;
  image: ImageSource;
  primaryLabel: string;
  secondaryLabel?: string;
  showSkip: boolean;
}

export const ONBOARDING_DATA: OnboardingItem[] = [
  {
    id: "1",
    headline: "Find Cold Room Near You",
    description: "Drop off, store safe, sell when price is good",
    image: require("../assets/images/onboarding/onboarding-1.png"),
    primaryLabel: "Next",
    showSkip: true,
  },
  {
    id: "2",
    headline: "Book In 2 Minutes",
    description: "See prices, space, and temperature\nbefore you travel",
    image: require("../assets/images/onboarding/onboarding-2.png"),
    primaryLabel: "Next",
    showSkip: true,
  },
  {
    id: "3",
    description: "Reliable Cold Storage for Your Cold Room",
    underlinedDescription: true,
    image: require("../assets/images/onboarding/onboarding-3.png"),
    primaryLabel: "Get Started",
    secondaryLabel: "Sign in",
    showSkip: false,
  },
];
