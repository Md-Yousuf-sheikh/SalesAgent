import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLOR, rh, ROW, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import Text from "../Text/Text";
import { CircularProgressWithChild } from "react-native-circular-progress-indicator";
import { useSelector } from "react-redux";
import TargetIcon from "../../../assets/images/target_icon.svg";
import AchieveIcon from "../../../assets/images/achieve_icon.svg";
import GapIcon from "../../../assets/images/gap_icon.svg";
import CommisionIcon from "../../../assets/images/commission_icon.svg";
import {
  codeSelector,
  languageSelector,
} from "../../redux/features/language/languageSlice";
import {
  KMoneyFormat,
  formatNumber,
  isCurrentMonth,
  toBnNum,
} from "../../utils";

export default function AgentTargetCard({ targetDatas }) {
  const nav = useNavigation();
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const myDataUser = useSelector((state) => state?.auth?.user);

  let commissionCount;
  if (myDataUser) {
    commissionCount = parseInt(myDataUser?.commission?.amount).toFixed(0) / 100;
    if (parseInt(targetDatas?.data?.achieve) > 0) {
      if (
        parseInt(targetDatas?.data?.achieve) * commissionCount <
        targetDatas?.data?.target
      ) {
        commissionCount =
          parseInt(targetDatas?.data?.achieve) * commissionCount;
      } else {
        commissionCount =
          parseInt(targetDatas?.data?.achieve) * commissionCount;
      }
    } else {
      commissionCount = 0;
    }
  }

  let currentMonth = isCurrentMonth(code);

  const percentageAchievement =
    targetDatas?.data &&
    Math.min(
      (parseFloat(targetDatas?.data?.achieve) /
        parseFloat(targetDatas?.data?.target)) *
        100 || 0,
      100
    );

  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate("StatisticsScreen", {
          wholeTargetData: targetDatas,
        });
      }}
      activeOpacity={1}
      style={styles.container}
    >
      {/* CircularProgressWithChild */}
      <CircularProgressWithChild
        value={percentageAchievement ?? 0}
        radius={rh(6)}
        inActiveStrokeWidth={4}
        activeStrokeWidth={4}
        activeStrokeColor={"#009D35"}
        inActiveStrokeColor={"#ddd"}
      >
        <View
          style={{
            backgroundColor: "#4a69bd",
            height: rh(10.5),
            width: rh(10.5),
            borderRadius: rh(11.5),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text preset="h6" color={"#fff"}>
            {toBnNum(formatNumber(Number(percentageAchievement ?? 0)), code)}%
          </Text>
          <Text preset="SL" color={"#ffff"}>
            {language.targetProgressText}
          </Text>
          <Text preset="SM" color={"#ffff"}>
            {`(${currentMonth})`}{" "}
          </Text>
        </View>
      </CircularProgressWithChild>

      {/* Information List  */}
      <View style={{ width: rw(56) }}>
        {/* Target */}
        <View style={styles.target}>
          <View style={ROW}>
            <View
              style={{
                flexDirection: "row",
                width: rw(32),
              }}
            >
              <View style={{ marginTop: rh(0.4) }}>
                <TargetIcon />
              </View>

              <Text
                style={{
                  width: rw(17),
                  marginRight: rh(2),
                  marginLeft: rh(0.7),
                }}
                preset="h6"
              >
                {language.target}
              </Text>
            </View>

            <Text preset="h6" style={{ width: rw(25) }} numberOfLines={1}>
              {language?.bdt}{" "}
              {targetDatas?.data
                ? toBnNum(
                    KMoneyFormat(parseInt(targetDatas?.data?.target)),
                    code
                  )
                : 0}
            </Text>
          </View>
        </View>
        {/* Achievement  */}
        <View style={styles.achieve}>
          <View style={ROW}>
            <View
              style={{
                flexDirection: "row",
                width: rw(32),
              }}
            >
              <View style={{ marginTop: rh(0.4) }}>
                <AchieveIcon />
              </View>
              <Text
                preset="h6"
                style={{
                  width: rw(17),
                  marginRight: rh(2),
                  marginLeft: rh(0.7),
                }}
              >
                {language.achieved}
              </Text>
            </View>

            <Text preset="h6" style={{ width: rw(25) }} numberOfLines={1}>
              {language?.bdt}{" "}
              {targetDatas?.data
                ? toBnNum(
                    KMoneyFormat(parseInt(targetDatas?.data?.achieve)),
                    code
                  )
                : 0}
            </Text>
          </View>
        </View>
        {/* Gap */}
        <View style={styles.gap}>
          <View style={ROW}>
            <View
              style={{
                flexDirection: "row",
                width: rw(32),
              }}
            >
              <View style={{ marginTop: rh(0.4) }}>
                <GapIcon />
              </View>
              <Text
                preset="h6"
                style={{
                  width: rw(16),
                  marginRight: rh(2),
                  marginLeft: rh(0.7),
                }}
              >
                {language.gap}
              </Text>
            </View>

            <Text preset="h6" style={{ width: rw(25) }} numberOfLines={1}>
              {language?.bdt}{" "}
              {targetDatas?.data
                ? toBnNum(KMoneyFormat(parseInt(targetDatas?.data?.gap)), code)
                : 0}
            </Text>
          </View>
        </View>
        {/* Commission */}
        <View style={styles.commision}>
          <View style={ROW}>
            <View
              style={{
                flexDirection: "row",
                width: rw(32),
              }}
            >
              <View style={{ marginTop: rh(0.4) }}>
                <CommisionIcon />
              </View>
              <Text
                style={{
                  width: rw(23),
                  marginRight: rh(2),
                  marginLeft: rh(0.7),
                }}
                preset="h6"
              >
                {language?.commissionTitle}
              </Text>
            </View>
            <Text preset="h6" style={{ width: rw(25) }} numberOfLines={1}>
              {language?.bdt}{" "}
              {targetDatas
                ? toBnNum(KMoneyFormat(targetDatas?.data?.balance), code)
                : 0}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    minHeight: rh(20),
    width: rw(92),
    position: "absolute",
    alignSelf: "center",
    top: rh(10),
    borderRadius: rh(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: rw(3.5),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 2.5,
  },
  target: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: rh(1),
    width: rw(52),
  },
  commision: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: rh(1),
    marginTop: rh(1),
    width: rw(52),
  },
  gap: {
    flexDirection: "row",
    alignItems: "center",
    width: rw(52),
  },
  achieve: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: rh(1),
    width: rw(50),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
});
