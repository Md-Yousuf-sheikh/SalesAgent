import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgMarkIcon = ({ fill }) => (
  <Svg width={16} height={16} fill="none">
    <Path
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM6.857 11.194 4 8.337l.909-.908 1.948 1.948 4.234-4.234.912.906-5.146 5.145Z"
      fill={fill}
    />
  </Svg>
);

export default SvgMarkIcon;
