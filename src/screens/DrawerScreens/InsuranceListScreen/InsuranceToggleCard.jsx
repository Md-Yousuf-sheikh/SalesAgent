import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ROW, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { MaterialIcons } from "@expo/vector-icons";

export default function InsuranceToggleCard({ title }) {
  const [Open, setOpen] = useState(false);
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setOpen((prv) => !prv);
        }}
        style={styles.cardButton}
      >
        <View style={ROW}>
          <Text preset="h2" color={"#2253A5"} style={styles.cardTitle}>
            {title}
          </Text>
          <View style={styles.lineSmall} />
          <View style={styles.lineBig} />
        </View>
        <MaterialIcons
          name="keyboard-arrow-left"
          style={
            Open && {
              transform: [
                {
                  rotate: "-90deg",
                },
              ],
            }
          }
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {/* List open */}
      {Open && (
        <Text preset="SM" style={styles.cardDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus lorem
          in morbi varius hendrerit. A egestas amet id habitant. Ultrices ut
          egestas vulputate imperdiet massa cras luctus. Sem ornare diam justo,
          consectetur neque
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  //
  cardTitle: {},
  lineSmall: {
    width: 5,
    height: 2,
    backgroundColor: "#2253A5",
    marginLeft: 15,
    marginRight: 4,
    marginTop: 5,
  },
  lineBig: {
    width: 50,
    height: 2,
    backgroundColor: "#2253A5",
    marginTop: 5,
  },
  card: {
    marginVertical: 10,
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F7FF",
    paddingVertical: 15,
    paddingHorizontal: rw(4),
  },
  cardDescription: {
    lineHeight: 17,
    fontSize: 13,
    paddingHorizontal: rw(4),
    backgroundColor: "#F5F7FF",
    paddingVertical: 15,
    color: "#737373",
  },
});
