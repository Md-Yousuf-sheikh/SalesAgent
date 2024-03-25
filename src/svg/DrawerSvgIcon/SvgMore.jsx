import React from "react";
import { Path, Svg } from "react-native-svg";

export default function SvgMore() {
  return (
    <Svg width={14} height={20} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.333 7.5a6.664 6.664 0 0 0 3.334 5.775v.059a3.333 3.333 0 1 0 6.667 0v-.06a6.667 6.667 0 1 0-10-5.775Zm10 3.727a5 5 0 1 0-6.667 0h1.667v2.107a1.667 1.667 0 0 0 3.334 0v-2.108l1.667.001Z"
        fill="#2253A5"
      />
      <Path
        d="M5.333 17.506V17.5c.49.284 1.06.446 1.667.446s1.177-.162 1.667-.446v.006a1.667 1.667 0 1 1-3.333 0Z"
        fill="#2253A5"
      />
    </Svg>
  );
}
