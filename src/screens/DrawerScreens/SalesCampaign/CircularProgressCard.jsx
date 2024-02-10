import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../../components/Text/Text";
import { CircularProgressWithChild } from "react-native-circular-progress-indicator";
import { COLOR, rf, rh, ROW, rw } from "../../../theme/Theme";
import { useSelector } from "react-redux";
import TargetIcon from "../../../../assets/images/target_icon.svg";
import AchieveIcon from "../../../../assets/images/achieve_icon.svg";
import GapIcon from "../../../../assets/images/gap_icon.svg";
import CommisionIcon from "../../../../assets/images/commission_icon.svg";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { KMoneyFormat, formatNumber, toBnNum } from "../../../utils";

export default function CircularProgressCard({ mainData }) {
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);

  const percentage =
    mainData &&
    Math.min(
      (parseFloat(mainData?.achieve) / parseFloat(mainData?.target)) * 100 || 0,
      100
    );

  return (
    <View style={styles.container}>
      <CircularProgressWithChild
        value={
          mainData
            ? Math.min(
                (parseInt(mainData?.achieve) / parseInt(mainData?.target)) *
                  100,
                100
              )
            : 0
        }
        radius={rh(6.8)}
        inActiveStrokeWidth={4}
        activeStrokeWidth={4}
        activeStrokeColor={"#009D35"}
        inActiveStrokeColor={"#ddd"}
      >
        <View
          style={{
            backgroundColor: "#4a69bd",
            height: rh(11.5),
            width: rh(11.5),
            borderRadius: rh(11),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: rf(1.7) }}
            preset="h3"
            color={"#ffff"}
          >
            {toBnNum(formatNumber(Number(percentage ?? 0)), code)}%
          </Text>
          <Text style={{ fontSize: rf(1.6) }} preset="h5" color={"#ffff"}>
            {language.completedTitle}
          </Text>
        </View>
      </CircularProgressWithChild>
      <View>
        {/* Target */}
        <View style={styles.listView}>
          <View style={ROW}>
            {/* <View style={styles.box} /> */}
            <TargetIcon />
            <Text style={{ marginLeft: rh(0.7) }} preset="h5">
              {language.target}
            </Text>
          </View>
          <Text preset="h6">{KMoneyFormat(mainData?.target)}</Text>
        </View>
        {/* Achieved */}
        <View style={styles.listView}>
          <View style={ROW}>
            <AchieveIcon />
            <Text style={{ marginLeft: rh(0.7) }} preset="h5">
              {language.achieved}
            </Text>
          </View>
          <Text preset="h6">
            {language?.bdt} {KMoneyFormat(mainData?.achieve)}
          </Text>
        </View>
        {/* Gap */}
        <View style={styles.listView}>
          <View style={ROW}>
            {/* <View style={[styles.box, { backgroundColor: COLOR.lightRed }]} /> */}
            <GapIcon />
            <Text style={{ marginLeft: rh(0.7) }} preset="h5">
              {language.gap}
            </Text>
          </View>
          <Text preset="h6">
            {language?.bdt} {KMoneyFormat(mainData?.gap)}
          </Text>
        </View>
        {/* commotion */}
        <View style={styles.listView}>
          <View style={ROW}>
            {/* <View style={[styles.box, { backgroundColor: COLOR.lightRed }]} /> */}
            <View style={{ marginTop: rh(0.1) }}>
              <CommisionIcon />
            </View>
            <Text style={{ marginLeft: rh(0.7) }} preset="h5">
              {language.commissionTitle}
            </Text>
          </View>
          <Text preset="h6">
            {language?.bdt} {KMoneyFormat(mainData?.balance)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    borderRadius: rh(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 4,
    marginBottom: 10,
    paddingVertical: rh(2),
    paddingHorizontal: rw(4),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#c7c7c74c",
  },
  listView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: rw(50),
    borderBottomWidth: rh(0.15),
    borderColor: "#C7C7C7",
    paddingVertical: rh(1),
  },
  box: {
    backgroundColor: "#2253A5",
    height: rh(1.9),
    width: rh(1.9),
    borderRadius: rh(0.3),
    marginRight: rh(0.7),
  },
});
