import Svg, { Path } from "react-native-svg";
import React from "react";

export default function SvgWishList() {
  return (
    <Svg width={18} height={18} fill="none">
      <Path
        d="M9 .6 6.6 4.8H1.2l3 4.2-3 4.2h5.4L9 17.4l2.4-4.2h5.4l-3-4.2 3-4.2h-5.4L9 .6Z"
        fill="#2253A5"
      />
    </Svg>
  );
}
