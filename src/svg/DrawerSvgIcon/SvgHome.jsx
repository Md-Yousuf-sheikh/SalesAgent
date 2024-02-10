import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function SvgHome() {
  return (
    <Svg width={14} height={15} fill="none">
      <Path
        d="M8.002.388a1.5 1.5 0 0 0-2.005 0L.497 5.33A1.5 1.5 0 0 0 0 6.445V13.5A1.5 1.5 0 0 0 1.5 15h2A1.5 1.5 0 0 0 5 13.5v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5V6.445a1.5 1.5 0 0 0-.497-1.115L8.003.388h-.001Z"
        fill="#2253A5"
      />
    </Svg>
  );
}
