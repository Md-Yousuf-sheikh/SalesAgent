import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function TickSuccessAnimation() {
  return (
    <View
      style={{
        width: 100,
        height: 100,
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <LottieView
        source={require("../../svg/lottieFile/success.json")}
        autoPlay
        // autoSize={true}
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
