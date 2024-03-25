import { StyleSheet, View } from "react-native";
import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory-native";
import { COLOR, rh, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/features/language/languageSlice";
export default function CustomerManagementCard({ mainData }) {
  const language = useSelector(languageSelector);
  //
  const data = [
    {
      x: "Motor",
      y: mainData?.registered ?? 0,
      label: "Registered",
      fill: "#A9AC00",
    },
    {
      x: "Device",
      y: mainData?.recommends ?? 0,
      label: "Recommended",
      fill: "#1691CE",
    },
    {
      x: "Property",
      y: mainData?.policySold ?? 0,
      label: "Purchased",
      fill: "#1F5851",
    },
    {
      x: "Inland ",
      y: mainData?.paymentPending ?? 0,
      label: "Payment pending",
      fill: "#B1789F",
    },
    {
      x: "Savings ",
      y: mainData?.regularCustomer ?? 0,
      label: "Regular customer",
      fill: "#07AA2B",
    },
    {
      x: "Premium pending ",
      y: mainData?.premiumDue ?? 0,
      label: "Premium pending",
      fill: "#D70000",
    },
  ];
  //
  const maxYValue = data.reduce(
    (maxY, item) => Math.max(maxY, item.y),
    -Infinity
  );

  return (
    <View style={styles.container}>
      <Text preset="h1" color={"#2253A5"} style={styles.title}>
        {language.customerManagementHeader}
      </Text>
      <VictoryChart
        padding={{ top: 5, bottom: 30, left: 10, right: rw(25) }}
        height={250}
        domainPadding={rh(3)}
      >
        <VictoryBar
          horizontal
          data={data}
          style={{
            data: { width: rw(5), fill: ({ datum }) => datum.fill },
          }}
        />
        <VictoryAxis
          tickValues={
            maxYValue > 100
              ? null
              : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
          }
          dependentAxis
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    borderRadius: rh(1),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 3.3,
    marginVertical: 10,
    paddingVertical: rh(4),
    paddingHorizontal: rw(4),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#c7c7c74c",
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
});
