import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Text from "../Text/Text";
import { ROW, rh, rw } from "../../theme/Theme";

export default function NomineeAddButton({ title, onPress, disabled }) {
  return (
    <View style={styles.card}>
      <View style={ROW}>
        <Text preset="h2">{title}</Text>
      </View>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.AddNominee,
          disabled && {
            opacity: 0,
          },
        ]}
      >
        <AntDesign name="pluscircle" size={24} color="#2253A5" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F7FF",
    paddingVertical: rh(0.8),
    paddingHorizontal: rw(2),
    marginBottom: rh(1),
  },
  AddNominee: {
    // borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderColor: '#2253A5',
    // borderRadius: 5,
    alignSelf: "center",
    // position: "absolute",
    // right: rh(2),
  },
});
