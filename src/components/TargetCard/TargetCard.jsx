import { View } from "react-native";
import React from "react";
import { rh } from "../../theme/Theme";
import CircularIndicator from "../CircularIndicator/CircularIndicator";

export default function TargetCard({ target }) {
  const targetData = [...target];
  return (
    <View
      style={{
        marginVertical: rh(2),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {targetData?.map((item) => {
        return <CircularIndicator data={item} />;
      })}
    </View>
  );
}
