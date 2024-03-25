import React from "react";
import { Path, Svg } from "react-native-svg";

export default function SvgMyProfile() {
  return (
    <Svg width={18} height={18} fill="none">
      <Path
        d="M9 0a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 7.875c3.004 0 9 1.496 9 4.5V18H0v-3.375c0-3.004 5.996-4.5 9-4.5Zm0 2.137c-3.341 0-6.862 1.643-6.862 2.363v1.238h13.725v-1.238c0-.72-3.522-2.363-6.863-2.363Z"
        fill="#2253A5"
      />
    </Svg>
  );
}
