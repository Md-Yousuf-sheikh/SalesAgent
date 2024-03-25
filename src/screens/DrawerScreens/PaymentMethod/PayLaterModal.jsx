import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, rh, RSC, rw } from "../../../theme/Theme";
import MediumButton from "../../../components/Buttons/MediumButton";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import Text from "../../../components/Text/Text";
export default function PayLaterModal({ setIsVisible, isVisible }) {
  const handelVerify = () => {};
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!isVisible}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible((prv) => !prv);
          }}
          style={{
            height: "100%",
          }}
        ></TouchableOpacity>
        <View style={styles.modalContainer}>
          {/* image */}
          <View style={styles.imageContainer}>
            <Svg width={68} height={68} fill="none">
              <G
                clipPath="url(#a)"
                fill="#0048ff"
                stroke="#0048ff"
                strokeMiterlimit={10}
              >
                <Path d="M58.413 14.082a2.122 2.122 0 0 0-.224 2.732A29.525 29.525 0 0 1 63.672 34c0 16.387-13.284 29.671-29.67 29.671C17.654 63.671 4.33 50.347 4.33 34c0-16.387 13.285-29.671 29.672-29.671a29.533 29.533 0 0 1 17.185 5.483c.844.6 1.999.509 2.731-.224a2.123 2.123 0 0 0-.272-3.23A33.763 33.763 0 0 0 34.42.092C15.472-.138.088 15.054.09 34.004.09 52.73 15.272 67.91 33.996 67.91c18.95 0 34.14-15.382 33.91-34.33a33.756 33.756 0 0 0-6.264-19.224 2.121 2.121 0 0 0-3.23-.273v-.002Z" />
                <Path d="M50.528 47.447 37.038 33.958 50.528 20.47a2.12 2.12 0 1 0-2.998-2.997L34.042 30.96 20.555 17.474a2.12 2.12 0 1 0-2.997 2.998L31.046 33.96 17.558 47.448a2.12 2.12 0 1 0 2.997 2.998l13.488-13.488 13.489 13.488a2.12 2.12 0 1 0 2.997-2.998l-.002-.001Z" />
              </G>
              <Defs>
                <ClipPath id="a">
                  <Path fill="#fff" d="M0 0h68v68H0z" />
                </ClipPath>
              </Defs>
            </Svg>
          </View>
          {/* title */}
          <Text preset="h1" style={[styles.title]} color={"#3F3F3F"}>
            Payment Later
          </Text>
          <Text preset="h4" style={[styles.subTitle]}>
            Oops! The payment did not go through.
          </Text>

          <Text preset="h4" style={[styles.subTitle]}>
            Your account not sufficient balance
          </Text>

          <MediumButton
            stylesButton={styles.button}
            onPress={handelVerify}
            title={"Try Again"}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000027",
    position: "relative",
    height: "100%",
    width: "100%",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffff",
    width: "100%",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: rh(3),
    fontWeight: "800",
    fontSize: 30,
    marginTop: rh(2),
  },
  subTitle: {
    color: "#8D9295",
    textAlign: "left",
    marginBottom: rh(1),
    textAlign: "center",
    paddingHorizontal: rw(10),
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: rh(6),
  },
  button: {
    marginBottom: rh(6),
  },
});
