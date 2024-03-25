import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import React from "react";

export default function SvgArrowSupport() {
  return (
    <Svg width={15} height={11} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.151 5.5a.75.75 0 0 1 .254-.555.916.916 0 0 1 .614-.23h10.054L7.347 1.342a.786.786 0 0 1-.189-.255.722.722 0 0 1 0-.602.786.786 0 0 1 .189-.256.88.88 0 0 1 .282-.17.948.948 0 0 1 .665 0 .88.88 0 0 1 .282.17l5.206 4.714c.081.073.145.16.189.255a.72.72 0 0 1 0 .602.785.785 0 0 1-.189.255L8.576 10.77a.878.878 0 0 1-.282.17.947.947 0 0 1-.947-.17.75.75 0 0 1-.255-.557c0-.103.023-.205.066-.3a.786.786 0 0 1 .189-.256l3.726-3.371H1.019a.916.916 0 0 1-.614-.23.75.75 0 0 1-.254-.556Z"
        fill="url(#a)"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={17.098}
          y1={13.633}
          x2={16.256}
          y2={-3.925}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2253A5" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
