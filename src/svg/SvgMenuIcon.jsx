import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

export default function SvgMenuIcon() {
  return (
    <Svg width={23} height={21} fill="none">
      <Path
        d="M23 18.688a1.438 1.438 0 0 1-1.438 1.437H1.438a1.437 1.437 0 1 1 0-2.875h20.125A1.438 1.438 0 0 1 23 18.688Zm0-17.25a1.438 1.438 0 0 1-1.438 1.437H1.438a1.438 1.438 0 0 1 0-2.875h20.125A1.438 1.438 0 0 1 23 1.438ZM21.562 11.5a1.438 1.438 0 0 0 0-2.875h-11.5a1.437 1.437 0 0 0 0 2.875h11.5Z"
        fill="#fff"
      />
    </Svg>
  );
}
