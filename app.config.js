export default {
  expo: {
    name: "Celebrity News Feed",
    slug: "celebrity-news-feed",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    "scheme": "yourapp",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.yourcompany.celebritynewsfeed",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    newArchEnabled: true,
    extra: {
      eas: {
        projectId: "6315e216-fd2a-49f9-9904-5488423fd63e"
      }
    }
  }
}