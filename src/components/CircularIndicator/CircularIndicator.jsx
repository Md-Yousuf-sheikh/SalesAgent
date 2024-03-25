import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLOR, rf, rh, rw, TYPOGRAPHY } from "../../theme/Theme";
import Text from "../Text/Text";
import { CircularProgressWithChild } from "react-native-circular-progress-indicator";

export default function CircularIndicator({
  data,
  inActiveColor,
  activeColor,
}) {
  const calculate = data?.achieve * (100 / data?.target);
  return (
    <CircularProgressWithChild
      title={data?.title}
      maxValue={data?.total && data?.total}
      value={calculate}
      radius={rh(6.7)}
      titleColor={COLOR.white}
      progressValueColor={COLOR.white}
      inActiveStrokeWidth={rh(0.6)}
      activeStrokeWidth={rh(0.6)}
      activeStrokeColor={
        activeColor
          ? activeColor
          : data?.type === "target"
          ? COLOR.blue600
          : data?.type === "achieved"
          ? COLOR.lightGreen
          : data?.type === "gap" && COLOR.lightRed
      }
      inActiveStrokeColor={inActiveColor ? inActiveColor : "#E3E2E2"}
    >
      <View
        style={{
          backgroundColor: activeColor
            ? activeColor
            : data?.type === "target"
            ? COLOR.blue600
            : data?.type === "achieved"
            ? COLOR.lightGreen
            : data?.type === "gap" && COLOR.lightRed,
          height: rh(10.7),
          width: rh(10.7),
          borderRadius: rh(10.7),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: TYPOGRAPHY.primary,
            fontSize: rf(2),
            lineHeight: 23,
            fontWeight: "700",
            color: data?.type === "achieved" ? "#000000" : COLOR.white,
          }}
        >
          {data?.count ?? 0}
        </Text>
        <Text
          style={{
            fontFamily: TYPOGRAPHY.primary,
            fontSize: rf(1.6),
            lineHeight: 23,
            fontWeight: "400",
            color: data?.type === "achieved" ? "#000000" : COLOR.white,
          }}
        >
          {data?.title}
        </Text>
      </View>
    </CircularProgressWithChild>
  );
}
