import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLOR, CONTAINER, rh, ROW, RSC, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import Text from "../../components/Text/Text";
import { SvgUri } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

export default function InsuranceCatCard({ data, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress()}
      style={styles.cardButton}
    >
      <View style={ROW}>
        <View
          style={{
            marginRight: 10,
            width: rw(10),
            height: rh(5),
          }}
        >
          {data?.image?.split(".")?.pop() === "svg" ? (
            <SvgUri width={rw(10)} height={rh(5)} uri={`${data?.image}`} />
          ) : (
            <Image
              source={{ uri: data?.image }}
              style={{
                width: rw(10),
                height: rh(5),
                resizeMode: "cover",
              }}
            />
          )}
        </View>
        {/* title */}
        <Text>{data?.title}</Text>
      </View>
      <View>
        <AntDesign name="right" size={24} color="#979696" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardButton: {
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#c9c8c873",
    paddingHorizontal: rw(2),
    borderWidth: 1,
    width: rw(92),
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  container: {
    paddingHorizontal: rw(4.2),
    paddingVertical: rh(2),
  },
  //
  searchFilterContainer: {
    paddingVertical: rh(2.5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInputContainer: {
    flexDirection: "row",
  },
  searchInput: {
    borderWidth: 1,
    height: 46,
    borderColor: "#E5EAFF",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: rw(50),
    paddingHorizontal: 10,
    fontSize: 12,
  },
  searchInputButton: {
    borderWidth: 1,
    height: 46,
    borderColor: "#E5EAFF",
    paddingRight: 8,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  flexDirection: "row",
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0099C9",
    height: 46,
    borderRadius: 3,
    width: rw(25),
    justifyContent: "center",
  },
  image: {
    // resizeMode: 'contain',
    height: rh(5),
    width: rh(5),
  },
});
// catagoriesData

//  popularInsurance
