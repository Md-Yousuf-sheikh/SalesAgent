import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

export default function SvgAboutUs() {
  return (
    <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M9 7h2V5H9m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm0-18a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM9 15h2V9H9v6Z"
        fill="#2253A5"
      />
    </Svg>
  );
}
