import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { rh, rw } from "../../theme/Theme";
import Text from "../Text/Text";

const PolicyTypeButton = ({ onPress, activeOption }) => {
  const [selectedOption, setSelectedOption] = useState(activeOption);

  const handlePress = (props) => {
    setSelectedOption(props);
    onPress?.(props);
  };

  const getButtonStyle = (option) => {
    return option === selectedOption
      ? [styles.button, styles.activeButton]
      : styles.button;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handlePress("b2c");
        }}
        style={getButtonStyle("b2c")}
      >
        <Text color={selectedOption !== "b2c" ? "#2253a5" : "#fff"} preset="h4">
          B2C
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handlePress("b2b");
        }}
        style={getButtonStyle("b2b")}
      >
        <Text color={selectedOption !== "b2b" ? "#2253a5" : "#fff"} preset="h4">
          B2B
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: rw(20),
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#2253a5", // Default border color
    borderRadius: 5,
    height: "100%",
  },
  button: {
    width: "50%",
    height: rh(5.5),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  activeButton: {
    backgroundColor: "#2253a5", // Active button background color
    color: "white", // Active button text color
  },
});

export default PolicyTypeButton;
