import React from "react";
import { StyleSheet, View } from "react-native";
import { COLOR, rh, ROW, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";
import CircularIndicator from "../CircularIndicator/CircularIndicator";
import { MoneyFormat } from "../Helper/Helper";

export default function PaymentCalCard({
  target,
  firstTitle,
  secondTitle,
  firstAmount,
  secondAmount,
  activeColor,
  inactiveColor,
  type,
  progressTitle,
}) {
  let tarData;
  tarData = {
    count: parseInt(firstAmount) + parseInt(secondAmount),
    title: progressTitle ? progressTitle : "Regular",
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={ROW}>
          <View
            style={{
              height: rh(2),
              width: rw(4),
              backgroundColor: activeColor,
              marginRight: rh(0.8),
            }}
          />
          <Text preset="h6" color={"#4F4F4F"}>
            {firstTitle}
          </Text>
          <Text preset="h6" color={"#4F4F4F"} style={{ marginLeft: rh(1) }}>
            {type && type} {MoneyFormat(parseInt(firstAmount))}
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: rh(0.1),
            borderBottomColor: "#C7C7C7",
            marginVertical: rh(1),
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: rh(2),
              width: rw(4),
              backgroundColor: inactiveColor,
              marginRight: rh(1),
            }}
          />
          <Text preset="h6" color={"#4F4F4F"}>
            {secondTitle}
          </Text>
          <Text preset="h6" color={"#4F4F4F"} style={{ marginLeft: rh(1) }}>
            {type && type} {MoneyFormat(parseInt(secondAmount))}
          </Text>
        </View>
      </View>
      <CircularIndicator
        activeColor={activeColor}
        inActiveColor={inactiveColor}
        data={target}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: rh(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    width: rw(33),
    borderRadius: rh(3),
    backgroundColor: COLOR.white,
    borderColor: COLOR.bluishCyan700,
    borderWidth: rh(0.1),
    height: rh(5),
    paddingVertical: rh(1),
    marginVertical: rh(0),
  },
  textStyle: {
    fontSize: 16,
    color: COLOR.blue600,
  },
  //
  activityButtons: {
    width: rw(90),
    height: rh(6.5),
    borderRadius: rh(0.8),
    borderWidth: rh(0.1),
    borderColor: "#E5EAFF",
    alignSelf: "center",
    marginVertical: rh(1),
    alignItems: "center",
    paddingHorizontal: rh(1.5),
    paddingVertical: rh(1),
    flexDirection: "row",
    // justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
});
