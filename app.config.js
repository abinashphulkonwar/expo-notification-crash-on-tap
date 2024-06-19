export default {
  expo: {
    name: "app",
    slug: "app",
    version: "1.3.6",
    orientation: "portrait",
    jsEngine: "hermes",
    icon: "./assets/logo-v1.png",
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
      supportsTablet: true,
      infoPlist: {
        UIBackgroundModes: ["audio"],
        NSPhotoLibraryUsageDescription:
          "Allow $(PRODUCT_NAME) to access your photos.",
        NSPhotoLibraryAddUsageDescription:
          "Allow $(PRODUCT_NAME) to save photos.",
      },
      usesIcloudStorage: true,
      associatedDomains: ["applinks:www.fam.net.in"],
    },
    android: {
      package: "com.addyourownpackage.name",
      versionCode: 39,
      adaptiveIcon: {
        foregroundImage: "./assets/logo-v1.png",
        backgroundColor: "#FFFFFF",
      },
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      permissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.ACCESS_MEDIA_LOCATION",
        "android.permission.CAMERA",
        "android.permission.DOWNLOAD_WITHOUT_NOTIFICATION",
        "android.permission.ACCESS_NETWORK_STATE",
        "android.permission.RECEIVE_BOOT_COMPLETED",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/logo.png",
          color: "#ffffff",
        },
      ],
      "expo-build-properties",
      "expo-updates",
      "expo-secure-store",
    ],
    extra: {
      eas: {
        projectId: "project-id",
      },
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
  },
};
