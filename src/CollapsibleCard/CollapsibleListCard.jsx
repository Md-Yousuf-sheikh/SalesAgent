import {
  FlatList,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { COLOR, CONTAINER, rh, ROW, rw } from "../theme/Theme";
import Text from "../components/Text/Text";
import CloseDetails from "../../assets/close-details.svg";
import CurrencyFormat from "../components/Shared/CurrencyFormat";
import { useSelector } from "react-redux";
import {
  languageSelector,
  codeSelector,
} from "../redux/features/language/languageSlice";

export default function CollapsibleListCard({
  colorText,
  index,
  headList,
  itemList,
}) {
  const [open, setOpen] = useState();
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles?.button,
          { backgroundColor: index % 2 ? "#F1F4FF" : "#F1F4FF" },
        ]}
        onPress={() => setOpen(!open)}
        activeOpacity={0.5}
      >
        {/*  */}
        {headList?.map((hed) => {
          return (
            <Text
              preset="SL"
              color={
                index % 2 ? (colorText ? colorText : "#646464") : "#646464"
              }
              style={[
                styles?.row,
                hed?.width && {
                  width: rw(hed?.width),
                },
              ]}
            >
              {hed?.value === "close" ? <CloseDetails /> : hed?.value}
            </Text>
          );
        })}
      </TouchableOpacity>
      {/* Content */}
      {open && (
        <View style={styles.content}>
          {itemList?.map((item) => {
            return (
              <Text preset="SL" color={"#646464"} style={styles.item}>
                {item?.title}: {item?.value}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: rh(6),
    paddingHorizontal: rh(0.2),
    paddingVertical: rh(1),
    borderRadius: 5,
    paddingLeft: 3,
  },
  row: {
    width: rw(22),
    textTransform: "capitalize",
  },
  item: {
    paddingVertical: 3,
  },
  content: {
    backgroundColor: "#fffffff2",
    paddingLeft: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#dddddda4",
  },
});
