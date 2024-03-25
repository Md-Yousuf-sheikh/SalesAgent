import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function IconFailedAnimation() {
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
        source={require("../../svg/lottieFile//failed.json")}
        autoPlay
        // autoSize={true}
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
