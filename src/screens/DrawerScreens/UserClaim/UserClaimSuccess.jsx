import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, rh, RSC, rw } from "../../../theme/Theme";
import MediumButton from "../../../components/Buttons/MediumButton";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
import Text from "../../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";
export default function UserClaimSuccess({ setOpen }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          // setOpen(false);
        }}
        style={{
          height: "100%",
        }}
      ></TouchableOpacity>
      <View style={styles.modalContainer}>
        <Image
          style={styles.image}
          source={require("../../../../assets/images/claimSuccess.png")}
        />
        <Text preset="h5" style={[styles.subTitle]}>
          Your claim request has been submitted.{"\n"} Claim ID
          <Text
            preset="h4"
            color={"#000000"}
            style={[
              styles.subTitle,
              {
                fontWeight: "700",
              },
            ]}
          >
            #7549
          </Text>
        </Text>

        {/* Button text */}
        <Text preset="h5" color={"#2253A5"} style={[styles.subTitle]}>
          To access your claim request , visit your{" "}
          <Text
            onPress={() => {
              console.log("Hhhh");
            }}
            preset="h5"
            color={"#2253A5"}
            style={[
              styles.subTitle,
              {
                textDecorationLine: "underline",
              },
            ]}
          >
            dashboard
          </Text>
        </Text>

        <MediumButton
          // stylesButton={[
          //   otp?.length <= 4 && {
          //     backgroundColor: COLOR.buttonDisable,
          //   },
          //   !(seconds > 0 || minutes > 0) && {
          //     backgroundColor: COLOR.buttonDisable,
          //   },
          // ]}
          onPress={() => {
            navigation.navigate("HomeScreen");
            setOpen(false);
          }}
          title={"Go Home"}
        />
      </View>
    </View>
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
  subTitle: {
    color: COLOR.gray400,
    textAlign: "left",
    marginBottom: rh(1),
    textAlign: "center",
    lineHeight: 20,
  },
  image: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 15,
  },
});
