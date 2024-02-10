import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLOR, rf, rh } from "../../theme/Theme";
import { Feather } from "@expo/vector-icons";

export default function NextButton({
  onPress,
  title,
  isLoading,
  disabled,
  type = "next",
}) {
  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.nextTextButton,
            isLoading ||
              (disabled && {
                opacity: 0.3,
              }),
            type === "remove" && styles.removeButton,
          ]}
          disabled={isLoading || disabled}
        >
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color={COLOR.blue600} />
            </>
          ) : (
            <>
              <Text
                preset="h2"
                style={[
                  styles.nextText,
                  type === "remove" && styles.nextRemove,
                ]}
              >
                {title}
              </Text>
              {type !== "remove" && (
                <Feather name="arrow-right" size={24} color={COLOR.blue600} />
              )}
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nextTextButton: {
    marginBottom: rh(1),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    // backgroundColor: '#2253A5',
    paddingHorizontal: rh(1.8),
    paddingVertical: rh(1.2),
    // borderRadius: rh(0.6),
  },
  nextText: {
    fontSize: rf(2.2),
    color: COLOR.blue600,
  },
  // /removeButton
  removeButton: {
    backgroundColor: "#2253A5",
    borderRadius: 10,
    marginVertical: 20,
  },
  nextRemove: {
    color: COLOR.white,
  },
});
