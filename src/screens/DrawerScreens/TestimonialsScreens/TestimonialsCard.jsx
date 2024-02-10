import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../../components/Text/Text";
import { rh, rw, WIDTH } from "../../../theme/Theme";

export default function TestimonialsCard({ item, location }) {
  //   console.log("item", item);
  const { image, id, message, name, role } = item;
  return (
    <View
      style={[
        styles.container,
        location === "home" && {
          width: WIDTH / 1.2,
          marginRight: 10,
          marginVertical: 14,
        },
      ]}
    >
      <View style={styles.card}>
        <Text style={styles.message} preset="h5">
          " {message} "
        </Text>
        <View style={styles.cardFooter}>
          <Image source={image} style={styles.cardImage} />
          <View>
            <Text style={styles.name} preset="XS">
              {name}
            </Text>
            <Text style={styles.role} preset="XS" color={"#979797"}>
              {role}
            </Text>
          </View>
        </View>
      </View>
    </View>
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
    marginVertical: rh(1.5),
    paddingHorizontal: rw(3),
    borderRadius: rw(1),
    paddingVertical: rh(1.3),
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dddddd10",
  },
  card: {
    padding: 4,
    borderRadius: rw(2),
    borderRadius: 10,
  },
  message: {
    color: "#646464",
    lineHeight: 20,
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: rw(8),
    height: rw(8),
    marginRight: rw(2),
  },
  name: {
    fontWeight: "800",
  },
  role: {},
});
