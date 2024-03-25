import React from "react";
import Svg, { G, Path, Defs } from "react-native-svg";

export default function SvgClose() {
  return (
    <Svg width={30} height={28} fill="none">
      <G filter="url(#a)">
        <Path
          d="M23.875 4.125C19-.75 11-.75 6.125 4.125S1.25 17 6.125 21.875a12.448 12.448 0 0 0 17.625 0c4.875-4.875 5-12.875.125-17.75ZM18.5 18.25l-3.5-3.5-3.5 3.5-1.75-1.75 3.5-3.5-3.5-3.5 1.75-1.75 3.5 3.5 3.5-3.5 1.75 1.75-3.5 3.5 3.5 3.5-1.75 1.75Z"
          fill="#222"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}
