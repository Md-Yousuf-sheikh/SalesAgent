import { COLOR, TYPOGRAPHY, rf } from "../../theme/Theme";

const BASE = {
  fontFamily: TYPOGRAPHY.primary,
  fontSize: rf(1.9),
  color: COLOR.black,
  // lineHeight: 21,
};
const BASE_BOLD = {
  fontFamily: TYPOGRAPHY.primaryBold,
  color: COLOR.black,
  fontSize: rf(1.8),
  // lineHeight: 20,
};
const BOLD = {
  fontFamily: TYPOGRAPHY.bold,
  fontSize: rf(2.1),
  color: COLOR.black,
};

export const presets = {
  default: BASE,
  bold: BOLD,
  XL: {
    ...BOLD,
    fontSize: 30,
    // lineHeight: 35,
    fontWeight: "800",
  },
  LL: {
    ...BOLD,
    fontSize: rf(2.7),
    // lineHeight: 25,
  },
  LM: {
    ...BASE_BOLD,
    fontSize: rf(2.25),
    // lineHeight: 64,
  },
  h1Base: {
    ...BASE,
    fontSize: 18,
    // lineHeight: 21.09,
    fontWeight: "400",
  },
  h1: {
    ...BASE_BOLD,
    fontSize: rf(2.25),
    // lineHeight: 21.09,
  },
  h2: {
    ...BASE_BOLD,
    fontSize: rf(2.15),
    // lineHeight: 21,
    fontWeight: "500",
  },
  h3: {
    ...BASE_BOLD,
    fontSize: rf(2),
    // lineHeight: 18,
    fontWeight: "500",
  },
  h4: {
    ...BASE,
    fontSize: rf(1.9),
    // lineHeight: 21,
    fontWeight: "400",
  },
  h5: {
    ...BASE,
    fontSize: rf(1.7),
    // lineHeight: 21,
    fontWeight: "300",
  },
  h6: {
    ...BASE_BOLD,
    fontSize: rf(1.65),
    // lineHeight: 16,
  },
  SL: {
    ...BASE_BOLD,
    fontSize: rf(1.5),
    // lineHeight: 14.06,
  },
  SM: {
    ...BASE,
    fontSize: rf(1.4),
    // lineHeight: 14.06,
  },
  SS: {
    ...BASE,
    fontSize: rf(1.3),
  },
  XS: {
    ...BASE,
    fontSize: rf(1.65),
    // lineHeight: 14.06,
    fontFamily: "Roboto-Regular",
    color: COLOR.gray300,
  },
};
