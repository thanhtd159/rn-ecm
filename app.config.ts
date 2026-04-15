import { ExpoConfig } from "@expo/config";

const IS_DEV = process.env.APP_ENV === "development";

const config: ExpoConfig = {
  name: "React Native Expo App Ecommerce",
  slug: "rn-expo-app-ecommerce",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "ecommerce",

  extra: {
    API_URL: IS_DEV
      ? "http://192.168.68.105:3000"
      : "http://192.168.68.105:3000",
  },

  ios: {
    bundleIdentifier: "com.ecommerce.mobile",
  },

  android: {
    package: "com.ecommerce.mobile",
  },

  plugins: ["expo-dev-client", "expo-router", "expo-localization", "expo-font"],
};

export default config;
