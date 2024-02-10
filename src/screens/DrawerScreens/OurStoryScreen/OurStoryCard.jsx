import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../../components/Text/Text";
import { rw } from "../../../theme/Theme";

export default function OurStoryCard({ item }) {
  const { name, image, description } = item;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <Text preset="SL" style={styles.name}>
        {name}
      </Text>
      <Text preset="h5" style={styles.description}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: rw(42),
    alignItems: "center",
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#E5EAFF",
    margin: 5,
  },
  image: {
    // backgroundColor: "#dddd",
  },
  name: {
    color: "#4A4A4A",
    lineHeight: 14.7,
    fontSize: 12,
    paddingVertical: 7,
  },
  description: {
    alignItems: "center",
    textAlign: "center",
    color: "#646464",
    lineHeight: 14.7,
    fontSize: 12,
    paddingHorizontal: 5,
  },
  imageContainer: {
    padding: 10,
    backgroundColor: "#F2F5FF",
    borderRadius: 30,
  },
});
