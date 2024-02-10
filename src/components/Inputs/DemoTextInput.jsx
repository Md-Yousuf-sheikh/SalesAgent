import { StyleSheet, Switch, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, rf, rh } from "../../theme/Theme";
import SvgMarkIcon from "../../svg/SvgMarkIcon";
import Text from "../Text/Text";

export default function DemoTextInput({ value, label, labelStyle }) {
  return (
    <View>
      {label && (
        <Text preset="h5" style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={styles.container}>
        <Text style={styles.placeholder}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: rh(1),
    borderWidth: rh(0.1),
    borderColor: COLOR.blue200,
    borderRadius: rh(1.2),
    flexDirection: "row",
    alignItems: "center",
    height: rh(6.2),
    paddingHorizontal: rh(2.2),
    position: "relative",
    backgroundColor: COLOR.white,
  },
  markIcon: {
    position: "absolute",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    right: 10,
  },
  label: {
    color: "#646464",
    // fontWeight: "800",
    // lineHeight: 17,
    marginTop: rh(1.3),
  },
  placeholder: {
    color: "#000000",
    // lineHeight: 17,
    fontSize: rf(1.9),
  },
});
