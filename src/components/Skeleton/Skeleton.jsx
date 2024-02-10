import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Skeleton({
  width,
  height,
  style,
  rounded,
  mt,
  ml,
  mb,
  mr,
  aSelf,
}) {
  const translateX = useRef(new Animated.Value(-width)).current;

  //  useEffect animation
  React.useEffect(() => {
    //  this looping is infinite 1s
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [width]);

  return (
    <View
      style={[
        StyleSheet.flatten({
          width: width,
          height: height,
          backgroundColor: "rgba(0,0,0,0.12)",
          overflow: "hidden",
          borderRadius: rounded,
          marginTop: mt,
          marginBottom: mb,
          marginLeft: ml,
          marginRight: mr,
          alignSelf: aSelf,
        }),
        style,
      ]}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateX: translateX }],
        }}
      >
        {/*  Linear Gradient */}
        <LinearGradient
          style={{ width: "100%", height: "100%" }}
          colors={["transparent", "rgba(0,0,0,0.05)", "transparent"]}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({});
