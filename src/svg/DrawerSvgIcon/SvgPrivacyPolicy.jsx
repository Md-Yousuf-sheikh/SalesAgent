import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function SvgPrivacyPolicy() {
  return (
    <Svg width={20} height={20} fill="none">
      <Path d="m5 10 5-5 5 5-5 5-5-5Z" fill="#2253A5" />
      <Path
        d="M10 2.5A7.5 7.5 0 1 1 2.5 10 7.509 7.509 0 0 1 10 2.5Zm0-1.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5Z"
        fill="#2253A5"
      />
    </Svg>
  );
}
