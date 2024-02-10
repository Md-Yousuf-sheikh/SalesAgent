import * as React from "react";
import Svg, { Path } from "react-native-svg";
export default function SvgTestimonials() {
  return (
    <Svg width={16} height={16} fill="none">
      <Path
        d="M2 0h12c.55 0 1.02.2 1.41.59.39.39.59.86.59 1.41v7c0 .55-.2 1.02-.59 1.41-.39.39-.86.59-1.41.59h-1l-5 5v-5H2c-.55 0-1.02-.2-1.41-.59C.2 10.02 0 9.55 0 9V2C0 1.45.2.98.59.59.98.2 1.45 0 2 0Zm11 2H2v1h11V2Zm1 3H2v1h12V5Zm-3 3H2v1h9V8Z"
        fill="#2253A5"
      />
    </Svg>
  );
}
