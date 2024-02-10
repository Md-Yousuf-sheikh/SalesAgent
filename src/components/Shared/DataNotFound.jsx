import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { rh, rw } from "../../theme/Theme";

export default function DataNotFound({ mt, ml }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: rh(5),
        marginTop: mt,
        marginLeft: ml,
      }}
    >
      <Image
        source={require("../../../assets/not_found.png")}
        style={{
          height: rw(30),
          resizeMode: "contain",
          opacity: 0.5,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
