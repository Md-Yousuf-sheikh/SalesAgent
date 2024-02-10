import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../Text/Text";

export default function FormLabel({ title }) {
  return (
    <View>
      {title && (
        <Text preset="h5" style={styles.labelStyle}>
          {title}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    paddingTop: 15,
    paddingBottom: 6,
  },
});
