import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { rh, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";

export default function InsurancePartnerCard({ item }) {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.image} source={item?.image} />
        <Text preset="h5" style={styles.description}>
          {item?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#00000060",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: rh(1),
    paddingHorizontal: rw(3),
    borderRadius: rw(1),
    paddingVertical: rh(2),
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dddddd10",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffff",
  },
  image: {
    resizeMode: "contain",
    width: rw(32),
    marginRight: rw(2),
  },
  description: {
    width: rw(50),
    textAlign: "left",
    // backgroundColor: "red",
    textAlignVertical: "top",
    color: "#737373",
    lineHeight: 16,
  },
});
