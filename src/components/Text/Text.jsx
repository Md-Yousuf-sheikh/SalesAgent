import { Text as RNText, StyleSheet } from "react-native";
import React from "react";
import { presets } from "./Text.Presets";

export default function Text({
  children,
  preset = "default",
  style,
  color,
  line,
  ellipsize,
  tt,
  fw,
}) {
  const textStyle = StyleSheet.compose(presets[preset], style, color);

  return (
    <RNText
      style={[
        textStyle,
        color == undefined
          ? {}
          : {
              color: color,
              textTransform: tt,
              fontWeight: fw,
            },
      ]}
      numberOfLines={line === undefined ? null : line}
      ellipsizeMode={ellipsize === undefined ? null : ellipsize}
    >
      {children}
    </RNText>
  );
}
