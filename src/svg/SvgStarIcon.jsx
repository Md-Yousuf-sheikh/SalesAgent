import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const SvgStarIcon = (props) => (
  <Svg width={10} height={9} fill="none">
    <Path
      d="M4.715.878a.3.3 0 0 1 .57 0l.77 2.37a.3.3 0 0 0 .286.207h2.491a.3.3 0 0 1 .176.543L6.993 5.462a.3.3 0 0 0-.11.335l.77 2.37a.3.3 0 0 1-.461.335L5.176 7.038a.3.3 0 0 0-.352 0L2.808 8.502a.3.3 0 0 1-.462-.335l.77-2.37a.3.3 0 0 0-.109-.335L.992 3.998a.3.3 0 0 1 .176-.543h2.491a.3.3 0 0 0 .286-.207l.77-2.37Z"
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        y1={5}
        x2={10}
        y2={5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#3455A3" />
        <Stop offset={1} stopColor="#01A598" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgStarIcon;
