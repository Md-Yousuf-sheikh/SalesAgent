import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
const COLOR = {
  white: "#ffffff",
  black: "#000000",
  // blueColors
  blue10: "#E9F1FF",
  blue50: "#ECF0FF",
  blue100: "#F5F7FF",
  blue200: "#E5EAFF",
  blue400: "#3369B3",
  blue500: "#3652A3",
  blue600: "#2253A5",
  blue700: "#3455A3", //gr-2
  blue800: "#4285F4", //gr-2
  // greenColors
  green400: "#76C11F", // gr-1
  green600: "#01A598", //gr-2
  green700: "#009A83", //gr-2
  green800: "#009718", //gr-2
  lightGreen: "#a8ee90",
  lightRed: "#f97979",
  // PlumColor
  plum600: "#A05588",
  plum700: "#9F5588",
  //
  //bluishCyan
  bluishCyan400: "#16B5CC",
  bluishCyan500: "#1691CE",
  bluishCyan700: "#0089ED",
  LinearBlue: "#0089C3",

  //  grayColors
  gray10: "#F2F2F2",
  gray50: "#C4C4C4",
  gray100: "#8D9295",
  gray150: "##898A8D",
  gray200: "#737373",
  gray300: "#646464",
  gray400: "#4F4F4F",
  gray500: "#3F3F3F",
  gray600: "#444444",
  gray700: "#4A4A4A",
  grayRgba: "rgba(115, 115, 115, 1)",
  grayPlaceholder: "#979797",
  // lightGrayColor
  lightGray50: "#F5F7FF",
  lightGray200: "#9CBDD6",
  // yellowColor
  yellow50: "#FEF4E8",
  yellow100: "#FFF9C4",
  yellow700: "#F0BC04",
  // redColors
  red700: "#F80000",
  //
  buttonDisable: "#9BAEBD",
};
// primary
const ROW = {
  flexDirection: "row",
  alignItems: "center",
};
const RSC = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginHorizontal: rw(3.5),
};
const RSBC = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};
const SPACING = [2, 4, 8, 12, 16, 20, 28, 32];

const TYPOGRAPHY = {
  primary: "Roboto-Regular",
  primaryBold: "Roboto-Medium",
  bold: "Roboto-Bold",
};

const CONTAINER = {
  flex: 1,
  backgroundColor: "#FBFCFF",
  // paddingBottom: rh(12),
};

export {
  COLOR,
  SPACING,
  ROW,
  RSC,
  RSBC,
  width as WIDTH,
  height as HEIGHT,
  TYPOGRAPHY,
  CONTAINER,
  rh,
  rw,
  rf,
};
