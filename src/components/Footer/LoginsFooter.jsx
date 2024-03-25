import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { COLOR, HEIGHT, rh, ROW, RSC, rw, WIDTH } from "../../theme/Theme";
import Text from "../Text/Text";
import { useNavigation } from "@react-navigation/native";
export default function LoginsFooter() {
  const nav = useNavigation();
  const handelButton = () => {
    nav.navigate("SingUp");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/footer.png")}
        style={styles.backGroundImage}
      />
      {/* don't have  account */}
      <View style={styles.Text}>
        <Text
          color={"#ffffff"}
          preset="h4"
          style={{
            textAlign: "center",
          }}
        >
          Don’t have an account?{" "}
        </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={handelButton}>
          <Text color={"#FFDE1A"}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.blue400,
    height: rh(28),
    overflow: "hidden",
    position: "relative",
  },
  backGroundImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  Text: {
    position: "absolute",
    bottom: "10%",
    width: "100%",
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
  },
});

// const stylesheet = StyleSheet.create({
//   style_Login: {
//     position: "relative",
//     width: WIDTH,
//     height: 896,
//     borderRadius: 40,
//     overflow: "hidden",
//     transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
//     shadowColor: "rgb(0, 0, 0)",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.25,
//     shadowRadius: 23,
//     backgroundColor: "rgba(255, 255, 255, 1)",
//     left: 0,
//     top: 0,
//   },
//   style_image_11: {
//     position: "absolute",
//     width: 361,
//     height: 312,
//     borderRadius: 228.5,
//     opacity: 1,
//     left: 23,
//     right: "auto",
//     top: 656,
//     bottom: "auto",
//     transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
//     backgroundColor: "rgba(0,0,0,0)",
//   },
//   style_Rectangle_10: {
//     position: "absolute",
//     color: "rgba(141, 72, 72, 1)",
//     width: 414,
//     height: 895,
//     borderRadius: 0,
//     left: 537,
//     right: "auto",
//     top: 1,
//     bottom: "auto",
//     transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
//     // backgroundColor: "rgba(237, 24, 24, 1)",
//   },
//   style_Group_16: {
//     position: "absolute",
//     width: 374.3838195800781,
//     height: 547.70263671875,
//     transform: [
//       { translateX: 13 },
//       { translateY: 576.9005126953125 },
//       { rotate: "0deg" },
//     ],
//     overflow: "hidden",
//     backgroundColor: "rgba(0,0,0,0)",
//   },
//   style_Rectangle_12: {
//     position: "absolute",
//     color: "rgba(255, 255, 255, 1)",
//     width: 280.5,
//     height: 304.5,
//     borderRadius: 52,
//     lef: 259.9317321777344,
//     right: "auto",
//     top: 547.70263671875,
//     bottom: "auto",
//     transform: [
//       { translateX: 0 },
//       { translateY: 0 },
//       { rotate: "-22.07802552016829deg" },
//     ],
//     backgroundColor: "rgba(237, 24, 24, 1)",
//   },
//   style_Rectangle_14: {
//     position: "absolute",
//     color: "rgba(255, 182, 182, 1)",
//     width: 95.79215240478516,
//     height: 322.0564880371094,
//     borderRadius: 88,
//     left: 182.5512237548828,
//     right: "auto",
//     top: 0,
//     bottom: "auto",
//     transform: [
//       { translateX: 0 },
//       { translateY: 0 },
//       { rotate: "14.695640213714787deg" },
//     ],
//     backgroundColor: "rgba(237, 24, 24, 1)",
//   },
//   style_Rectangle_13: {
//     position: "absolute",
//     color: "rgba(255, 240, 130, 1)",
//     width: 176.65467834472656,
//     height: 183.75901794433594,
//     borderRadius: 88,
//     left: 304.59381103515625,
//     right: "auto",
//     top: 410.4290771484375,
//     bottom: "auto",
//     transform: [
//       { translateX: 0 },
//       { translateY: 0 },
//       { rotate: "-22.07802552016829deg" },
//     ],
//     backgroundColor: "rgba(237, 24, 24, 1)",
//   },
//   style_Subtract: {
//     position: "absolute",
//     width: 414,
//     height: 218.26470947265625,
//     borderRadius: 0,
//     transform: [
//       { translateX: 0 },
//       { translateY: 743.7353515625 },
//       { rotate: "0deg" },
//     ],
//     shadowColor: "rgb(59, 89, 152)",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.27000001072883606,
//     shadowRadius: 114,
//     backgroundColor: "rgba(237, 24, 24, 1)",
//   },
//   style_Group_19023: {
//     position: "absolute",
//     width: 315,
//     height: 16,
//     transform: [{ translateX: 49 }, { translateY: 846 }, { rotate: "0deg" }],
//     overflow: "hidden",
//     backgroundColor: "rgba(0,0,0,0)",
//     backgroundColor: "rgba(237, 24, 24, 1)",
//   },
//   style_Don_t_have_an_account__Sign_Up: {
//     position: "absolute",
//     width: 315,
//     height: "auto",
//     left: 0,
//     right: "auto",
//     top: 0,
//     bottom: "auto",
//     transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
//     fontWeight: 400,
//     textDecorationLine: "none",
//     fontSize: 14,
//     color: "rgb(1,1,1)",
//     textAlign: "center",
//     textAlignVertical: "top",
//     letterSpacing: 0.1,
//     backgroundColor: "rgba(237, 24, 24, 1)",
//   },
// });
