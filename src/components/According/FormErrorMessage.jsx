import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../Text/Text";
import { COLOR } from "../../theme/Theme";

export default function FormErrorMessage({ message }) {
  return (
    <View>
      {message && (
        <Text preset="h6" color={COLOR.red700} style={styles.errorText}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    paddingTop: 4,
    paddingBottom: 7,
  },
});
