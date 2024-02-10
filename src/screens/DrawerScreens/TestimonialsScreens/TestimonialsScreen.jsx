import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import TestimonialsCard from "./TestimonialsCard";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { CONTAINER, rh, rw } from "../../../theme/Theme";

export default function TestimonialsScreen() {
  return (
    <View style={CONTAINER}>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={"Testimonials"} />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: rh(10),
          }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            return <TestimonialsCard item={item?.item} />;
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
    id: "01",
    name: "Ema Watson",
    role: "goforEma_Watson",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. Mattis magnis sitMattis magnis sit.",
    image: require("../../../../assets/user.png"),
  },
  {
    id: "02",
    name: "Ema Watson",
    role: "goforEma_Watson",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. Mattis magnis sitMattis magnis sit.",
    image: require("../../../../assets/user.png"),
  },
  {
    id: "03",
    name: "Ema Watson",
    role: "goforEma_Watson",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. Mattis magnis sitMattis magnis sit.",
    image: require("../../../../assets/user.png"),
  },
  {
    id: "04",
    name: "Ema Watson",
    role: "goforEma_Watson",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. Mattis magnis sitMattis magnis sit.",
    image: require("../../../../assets/user.png"),
  },
  {
    id: "05",
    name: "Ema Watson",
    role: "goforEma_Watson",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. Mattis magnis sitMattis magnis sit.",
    image: require("../../../../assets/user.png"),
  },
  {
    id: "06",
    name: "Ema Watson",
    role: "goforEma_Watson",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. @Waadaa.Insure. Mattis vehicula nunc leo vel est, magna nisl. Mattis magnis sitMattis magnis sit.",
    image: require("../../../../assets/user.png"),
  },
];
