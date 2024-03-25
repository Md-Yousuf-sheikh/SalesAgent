import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";

export default function SplashPaginator({ data, scrollX }) {
  const width = useWindowDimensions();
  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [
          (i - 1) * width.width,
          i * width.width,
          (i + 1) * width.width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [6, 30, 6],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 6,
    backgroundColor: "#1691CE",
    marginHorizontal: 2,
    borderRadius: 40,
  },
});
