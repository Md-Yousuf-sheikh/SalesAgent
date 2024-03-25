import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Skeleton from "../Skeleton/Skeleton";
import { rw } from "../../theme/Theme";

export default function SkeletonInputFiled() {
  return (
    <View>
      <Skeleton width={rw(25)} height={10} ml={0} rounded={2} mt={10} mb={5} />
      <Skeleton width={rw(89)} height={45} ml={0} mb={8} rounded={5} />
    </View>
  );
}

const styles = StyleSheet.create({});
