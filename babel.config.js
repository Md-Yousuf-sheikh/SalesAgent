module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@app/components": ["./src/components"],
            "@app/navigation": ["./src/navigation/"],
            "@app/screens": ["./src/screens"],
            "@app/config/*": ["./src/config/*"],
            "@app/theme": ["./src/config/theme"],
            "@app/assets/*": ["./src/assets/*"],
            "@app/assets": ["./src/assets"],
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
