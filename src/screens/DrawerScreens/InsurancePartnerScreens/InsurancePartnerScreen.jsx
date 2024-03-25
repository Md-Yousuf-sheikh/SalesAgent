import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import InsurancePartnerCard from "./InsurancePartnerCard";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { CONTAINER, rw } from "../../../theme/Theme";

export default function InsurancePartnerScreen() {
  return (
    <View style={CONTAINER}>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={"Insurance partner"} />
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item?.id}
          renderItem={(item) => {
            return <InsurancePartnerCard item={item?.item} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
  },
});

const data = [
  {
    id: "012452",
    image: require("../../../../assets/images/Insurance/in1.png"),
    description:
      "Guardian Life Insurance Limited Insurance Plans are policies that talk to you individually and give you",
  },
  {
    id: "0125652",
    image: require("../../../../assets/images/Insurance/in3.png"),
    description:
      "Guardian Life Insurance Limited Insurance Plans are policies that talk to you individually and give you",
  },
  {
    id: "0145252",
    image: require("../../../../assets/images/Insurance/in2.png"),
    description:
      "Guardian Life Insurance Limited Insurance Plans are policies that talk to you individually and give you",
  },

  {
    id: "016457522",
    image: require("../../../../assets/images/Insurance/in4.png"),
    description:
      "Guardian Life Insurance Limited Insurance Plans are policies that talk to you individually and give you",
  },
];
