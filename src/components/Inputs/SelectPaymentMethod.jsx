import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect } from "react";
import Text from "../Text/Text";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/language/languageSlice";

export default function SelectPaymentMethod({ selected, setSelected }) {
  const language = useSelector(languageSelector);
  const data = [
    {
      id: 1,
      name: `Nagad`,
      image: require("../../../assets/icons/Bank/nagas_pay_logo.png"),
      value: "nagad",
    },
    {
      id: 2,
      name: `SSL Commerz`,
      image: require("../../../assets/icons/Bank/ssl_pay_logo.png"),
      value: "sslc",
    },
    // {
    //   id: 2,
    //   name: `${langouage?.bkash}`,
    //   image: require("../../../assets/icons/Bank/bkashCheckout.png"),
    // },
    // {
    //   id: 4,
    //   name: `${langouage?.trust_axiata}`,
    //   image: require("../../../assets/icons/Bank/tapCheckout.png"),
    // },
  ];
  useEffect(() => {
    setSelected(data?.[0]);
    return () => {};
  }, []);
  return (
    <View
      style={{
        paddingBottom: 15,
      }}
    >
      {data?.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={styles.container}
            onPress={() => {
              setSelected(item);
            }}
          >
            <View style={styles.titleContainer}>
              <View style={styles.circleBox}>
                {selected?.id === item?.id && <View style={styles.circle} />}
              </View>
              <Text preset="h6" color={"#4A4A4A"}>
                {item?.name}
              </Text>
            </View>
            <Image style={styles.image} source={item?.image} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    // paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    borderColor: "#E5EAFF",
    marginVertical: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "center",
  },
  //
  circleBox: {
    width: 15,
    height: 15,
    borderWidth: 2,
    borderRadius: 30,
    marginRight: 10,
    borderColor: "#2253A5",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "#2253A5",
    width: 8,
    height: 8,
    borderWidth: 2,
    borderRadius: 30,
  },
});
