import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { AirbnbRating } from "react-native-ratings";
import { ROW, RSC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { AntDesign } from "@expo/vector-icons";

export default function ReviewCard({ item }) {
  //   console.log("item", item);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text preset="SM" style={styles.cardDate}>
          22 july 2021
        </Text>
        <AirbnbRating
          count={5}
          defaultRating={2}
          size={8}
          showRating={false}
          isDisabled={true}
          selectedColor={"#F0BC04"}
          unSelectedColor={"#C4C4C4"}
          starContainerStyle={{
            alignSelf: "flex-end",
            paddingBottom: 12,
          }}
        />
      </View>
      {/* image */}
      <View style={styles.cardImageContainer}>
        <Image
          source={{
            uri: item?.img,
          }}
          style={styles.cardImage}
        />
        <Text preset="h6" style={styles.cardName}>
          Jenifar karan
        </Text>
      </View>
      <Text preset="SL" style={styles.cardTitle}>
        Flexible & affordable insurance
      </Text>
      {/* about */}
      <Text preset="SL" style={styles.cardDescription}>
        Lorem ipsum dolor sit amet, tur . Pharetra id amet arcu purus enim
        insurance
      </Text>
      {/* Like button */}
      <Text preset="SM" style={styles.cardIconTitle}>
        <AntDesign name="like2" size={12} color="black" /> Helpful
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: rw(65),
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#00000060",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#dddddd61",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDate: {
    color: "#8A8A8A",
    fontWeight: "300",
  },
  cardTitle: {},
  cardImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  cardImage: {
    width: 18,
    height: 18,
    borderRadius: 50,
    borderWidth: 2,
    marginRight: 5,
  },
  cardName: {
    color: "#4F4F4F",
    lineHeight: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  cardTitle: {
    color: "#4F4F4F",
    lineHeight: 20,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  cardDescription: {
    color: "#646464",
    lineHeight: 15,
  },
  cardIcon: {},
  cardIconTitle: {
    borderTopWidth: 1,
    paddingTop: 5,
    marginTop: 5,
    borderColor: "#E7E7E7",
  },
});
