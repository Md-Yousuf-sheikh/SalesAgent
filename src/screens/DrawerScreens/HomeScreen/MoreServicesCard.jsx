import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { rw } from "../../../theme/Theme";

export default function MoreServicesCard({ item }) {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={item?.img} />
      <Text style={styles.cardTitle}>{item?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 4,
  },
  cardImage: {
    justifyContent: "center",
    height: rw(15),
    height: rw(15),
    resizeMode: "contain",
  },
  cardTitle: {
    textAlign: "center",
    color: "#3F3F3F",
    paddingVertical: 5,
  },
});
