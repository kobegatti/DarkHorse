import "dotenv/config";

export default {
  expo: {
    name: "CareX",
    slug: "VetSmrt-DarkHorse",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/logo.png",
    expo: {
      sdkVersion: "45.0.0",
    },
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "com.DarkHorse.CareX",
      buildNumber: "1.0.1",
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.DarkHorse.CareX",
      versionCode: 1,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
    },
    description:
      "Equine mobile app connecting clients with horse professionals.",
    githubUrl: "https://github.com/kobegatti/DarkHorse",
  },
};
