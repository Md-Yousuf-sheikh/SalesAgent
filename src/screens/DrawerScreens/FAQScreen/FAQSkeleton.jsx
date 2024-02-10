import { StyleSheet, View } from "react-native";
import React from "react";
import Skeleton from "../../../components/Skeleton/Skeleton";
import { rh, rw } from "../../../theme/Theme";

export default function FAQSkeleton() {
  return (
    <View style={styles.faq}>
      <Skeleton width={rh(43)} height={rh(5)} rounded={8} />
    </View>
  );
}

const styles = StyleSheet.create({
  faq: {
    marginTop: rh(1),
    alignItems: "center",
  },
});
