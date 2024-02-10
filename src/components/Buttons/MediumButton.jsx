import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Text from "../Text/Text";
import { COLOR, rf, rh, rw } from "../../theme/Theme";
import { wp } from "../../utils/ScreenDimensions";

export default function MediumButton({
  title,
  onPress,
  disabled,
  stylesButton,
  type,
  textStyle,
  loader,
  icon,
}) {
  // const [loader,setLoader] = useState(false)
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        type === "sec" && styles.buttonContainerSec,
        stylesButton,
      ]}
      disabled={disabled}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loader && (
          <ActivityIndicator color={COLOR.white} style={{ right: rh(1) }} />
        )}
        {icon}
        <Text
          style={[styles.title, type === "sec" && styles.titleSec, textStyle]}
          preset={"h4"}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: rw(80),
    backgroundColor: COLOR.blue600,
    alignSelf: "center",
    paddingVertical: rh(1.6),
    alignItems: "center",
    borderRadius: rh(1.2),
    marginVertical: rh(3.8),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 2.5,
    zIndex: 2,
    justifyContent: "center",
  },
  title: {
    color: COLOR.white,
    // fontSize: rf(1.8),
  },
  buttonContainerSec: {
    backgroundColor: "#fff",
    borderWidth: 2,
    shadowColor: "#ffff",
    borderColor: "#1691CE",
    paddingVertical: rh(1.4),
  },
  titleSec: {
    color: "#1691CE",
  },
});
