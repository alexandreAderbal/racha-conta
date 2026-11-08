const TEST_ADMOB_APP_IDS = {
  android: "ca-app-pub-3940256099942544~3347511713",
  ios: "ca-app-pub-3940256099942544~1458002511",
};

module.exports = ({ config }) => {
  const plugins = (config.plugins ?? []).filter((plugin) => {
    const pluginName = Array.isArray(plugin) ? plugin[0] : plugin;
    return pluginName !== "react-native-google-mobile-ads";
  });

  return {
    ...config,
    plugins: [
      ...plugins,
      [
        "react-native-google-mobile-ads",
        {
          androidAppId:
            process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID ||
            TEST_ADMOB_APP_IDS.android,
          iosAppId:
            process.env.EXPO_PUBLIC_ADMOB_IOS_APP_ID || TEST_ADMOB_APP_IDS.ios,
          delayAppMeasurementInit: true,
          userTrackingUsageDescription:
            "Este identificador será usado para exibir anúncios personalizados.",
        },
      ],
    ],
  };
};
