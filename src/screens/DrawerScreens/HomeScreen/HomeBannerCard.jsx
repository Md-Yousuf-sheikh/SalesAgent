import { Image, StyleSheet, View, ImageBackground } from "react-native";
import React from "react";
import Text from "../../../components/Text/Text";
import { rw } from "../../../theme/Theme";

export default function HomeBannerCard({ title, description, image, colorBg }) {
  return (
    <ImageBackground
      source={require("../../../../assets/images/bgIamge.png")}
      style={[
        styles.imageBackground,
        colorBg && {
          backgroundColor: colorBg,
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text preset="h2" style={styles.title}>
            {title}
          </Text>
          <Text preset="SL" style={styles.about}>
            {description}
          </Text>
        </View>
        <Image source={image} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    shadowColor: "#00000060",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#E8FFCD",
    padding: rw(4),
    borderWidth: 1,
    borderColor: "#dddddd33",
    borderRadius: 5,
    marginVertical: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {},
  textContainer: {
    width: "60%",
  },
  title: {
    color: "#444444",
    lineHeight: 21,
    paddingBottom: 5,
  },
  about: {
    color: "#4f4f4fcb",
    lineHeight: 15,
  },
});
