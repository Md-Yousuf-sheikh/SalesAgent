import { StyleSheet, View } from "react-native";
import React from "react";
import { CircularProgressWithChild } from "react-native-circular-progress-indicator";
import { COLOR, rf, rh, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import CurrencyFormat from "../../../components/Shared/CurrencyFormat";
import { useSelector } from "react-redux";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { ToEnNum } from "../../../components/Helper/Helper";

export default function TargetFulfilledCard({ mainData, agentsWholeData }) {
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  //  percentage
  const percentage = agentsWholeData
    ? Math.min(
        (parseInt(agentsWholeData?.achieve) /
          parseInt(agentsWholeData?.target)) *
          100,
        100
      )
    : 0;
  return (
    <View style={styles.container}>
      {/* list   */}
      <View style={styles.progressContainer}>
        {/* Target */}
        <CircularProgressWithChild
          value={
            agentsWholeData
              ? Math.min(
                  (parseInt(agentsWholeData?.achieve) /
                    parseInt(agentsWholeData?.target)) *
                    100,
                  100
                )
              : 0
          }
          radius={rh(6.7)}
          inActiveStrokeWidth={4}
          activeStrokeWidth={4}
          activeStrokeColor={"#3369B3"}
          inActiveStrokeColor={"#E3E2E2"}
        >
          <View
            style={{
              backgroundColor: "#3369B3",
              height: rh(11),
              width: rh(11),
              borderRadius: rh(9),
              alignItems: "center",
              justifyContent: "center",
              padding: rh(1),
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: rh(6),
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: rf(1.6) }}
                preset="h4"
                color={"#ffff"}
              >
                {ToEnNum(
                  CurrencyFormat(parseInt(agentsWholeData?.target)),
                  code
                )}
              </Text>
              <Text style={{ fontSize: rf(1.5) }} preset="h6" color={"#ffff"}>
                {language.target}
              </Text>
            </View>
          </View>
        </CircularProgressWithChild>
        {/* Ach */}
        <CircularProgressWithChild
          value={
            agentsWholeData
              ? Math.min(
                  (parseInt(agentsWholeData?.achieve) /
                    parseInt(agentsWholeData?.target)) *
                    100,
                  100
                )
              : 0
          }
          radius={rh(6.7)}
          inActiveStrokeWidth={4}
          activeStrokeWidth={4}
          // activeStrokeColor={'#019E1A'}
          activeStrokeColor={COLOR.lightGreen}
          inActiveStrokeColor={"#E3E2E2"}
        >
          <View
            style={{
              backgroundColor: COLOR.lightGreen,
              height: rh(11),
              width: rh(11),
              borderRadius: rh(9),
              alignItems: "center",
              justifyContent: "center",
              padding: rh(1),
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: rf(1.6) }}
              preset="h3"
              color={"#000000"}
            >
              {mainData?.achieve !== undefined
                ? ToEnNum(CurrencyFormat(parseInt(mainData?.achieve), code))
                : 0}
            </Text>
            <Text style={{ fontSize: rf(1.5) }} preset="SL" color={"#000000"}>
              {language.achieved}
            </Text>
          </View>
        </CircularProgressWithChild>
        {/* Gap */}
        <CircularProgressWithChild
          value={
            agentsWholeData
              ? Math.min(
                  (parseInt(agentsWholeData?.achieve) /
                    parseInt(agentsWholeData?.gap)) *
                    100,
                  100
                )
              : 0
          }
          radius={rh(6.7)}
          inActiveStrokeWidth={4}
          activeStrokeWidth={4}
          // activeStrokeColor={'#019E1A'}
          activeStrokeColor={COLOR.lightRed}
          inActiveStrokeColor={"#E3E2E2"}
        >
          <View
            style={{
              backgroundColor: COLOR.lightRed,
              height: rh(11),
              width: rh(11),
              borderRadius: rh(9),
              alignItems: "center",
              justifyContent: "center",
              padding: rh(0.6),
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: rf(1.6) }}
              preset="h3"
              color={"#ffff"}
            >
              {mainData?.gap !== undefined
                ? ToEnNum(CurrencyFormat(parseInt(mainData?.gap), code))
                : 0}
            </Text>
            <Text style={{ fontSize: rf(1.5) }} preset="h6" color={"#ffff"}>
              {language.gap}
            </Text>
          </View>
        </CircularProgressWithChild>
      </View>
      {/* Target */}
      <View style={styles.footerContainer}>
        {/* 01 */}
        <View>
          <Text preset="h5" style={styles.footerTitle}>
            {language.target}
          </Text>
          <Text style={styles.footerText}>
            {language?.bdt}{" "}
            {ToEnNum(CurrencyFormat(parseInt(agentsWholeData?.target)), code)}
          </Text>
        </View>
        {/* 02 */}
        <View>
          <Text preset="h5" style={styles.footerTitle}>
            {language.fulfilledTitle}
          </Text>
          <Text style={styles.footerText}>
            {language?.bdt}{" "}
            {ToEnNum(CurrencyFormat(parseInt(agentsWholeData?.achieve)), code)}
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
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: rh(2),
  },
  footerTitle: {
    color: "#2253A5",
    fontWeight: "800",
  },
  footerText: {
    color: "#4F4F4F",
    fontWeight: "800",
    fontSize: rf(2),
  },
});
