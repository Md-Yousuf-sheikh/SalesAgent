import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../../components/Text/Text";
import { CircularProgressWithChild } from "react-native-circular-progress-indicator";
import {
  COLOR,
  CONTAINER,
  rf,
  rh,
  ROW,
  rw,
  TYPOGRAPHY,
} from "../../../theme/Theme";
import { useSelector } from "react-redux";
import TargetIcon from "../../../../assets/images/target_icon.svg";
import AchieveIcon from "../../../../assets/images/achieve_icon.svg";
import GapIcon from "../../../../assets/images/gap_icon.svg";
import { languageSelector } from "../../../redux/features/language/languageSlice";
import { moneyFormat } from "../../../utils";

export default function CampaignProgressCard({ mainData }) {
  const language = useSelector(languageSelector);
  const [target, setTarget] = React.useState(0);
  const [achieve, setAchieve] = React.useState(0);
  const [gap, setGap] = React.useState(0);

  const myDataUser = useSelector((state) => state?.auth?.user);

  React.useEffect(() => {
    if (mainData !== undefined && Object.keys(mainData).length > 0) {
      setTarget(mainData?.target_amount);
      setAchieve(mainData?.achievement_amount);
      setGap(mainData?.gap_amount);
    }
  }, [mainData]);

  return (
    <View style={styles.container}>
      {/* <CircularProgressWithChild
        value={
          mainData !== undefined && Object.keys(mainData).length > 0
            ? (parseInt(achieve)?.toFixed(0) / parseInt(target)) * 100
            : 0
        }
        radius={rh(6.8)}
        inActiveStrokeWidth={4}
        activeStrokeWidth={4}
        activeStrokeColor={COLOR.lightGreen}
        inActiveStrokeColor={COLOR.lightRed}
      >
        <View
          style={{
            backgroundColor: '#4a69bd',
            height: rh(11.5),
            width: rh(11.5),
            borderRadius: rh(11),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: rf(1.7) }}
            preset="h3"
            color={'#ffff'}
          >
            {mainData !== undefined &&
            Object.keys(mainData).length > 0 &&
            target > 0
              ? ((parseInt(achieve) / parseInt(target)) * 100).toFixed(0) + '%'
              : 0 + '%'}
          </Text>
          <Text style={{ fontSize: rf(1.6) }} preset="h5" color={'#ffff'}>
            { language.completedTitle}
          </Text>
        </View>
      </CircularProgressWithChild> */}
      <View
        style={{
          width: "100%",
        }}
      >
        {/* 01 */}
        <View style={styles.listView}>
          <View style={ROW}>
            {/* <View style={styles.box} /> */}
            <TargetIcon />
            <Text style={{ marginLeft: rh(0.7) }} preset="h5">
              {language.target} {language?.amount}
            </Text>
          </View>
          <Text preset="h6">
            {mainData ? `${language?.bdt} ${moneyFormat(target)}` : 0}
          </Text>
        </View>
        <View style={styles.listView}>
          <View style={ROW}>
            {/* <View style={styles.box} /> */}
            <TargetIcon />
            <Text style={{ marginLeft: rh(0.7) }} preset="h5">
              {language.target} {language?.unit}
            </Text>
          </View>
          <Text preset="h6">{mainData ? `${mainData?.target_unit}` : 0}</Text>
        </View>
        {/* 01 */}
        <View style={styles.listView}>
          <View style={ROW}>
            {/* <View style={[styles.box, { backgroundColor: COLOR.lightGreen }]} /> */}
            <AchieveIcon />
            <Text style={{ marginLeft: rh(0.7) }} preset="h5">
              {language.achieved} {language?.amount}
            </Text>
          </View>
          <Text preset="h6">
            {mainData !== undefined
              ? `${language?.bdt} ${moneyFormat(achieve)}`
              : 0}
          </Text>
        </View>
        {/*  */}
        <View style={styles.listView}>
          <View style={ROW}>
            {/* <View style={[styles.box, { backgroundColor: COLOR.lightGreen }]} /> */}
            <AchieveIcon />
            <Text style={{ marginLeft: rh(0.7) }} preset="h5">
              {language.achieved} {language?.unit}
            </Text>
          </View>
          <Text preset="h6">
            {mainData ? `${mainData?.achievement_unit}` : 0}
          </Text>
        </View>
        {/* 01 */}
        <View style={styles.listView}>
          <View style={ROW}>
            {/* <View style={[styles.box, { backgroundColor: COLOR.lightRed }]} /> */}
            <GapIcon />
            <Text style={{ marginLeft: rh(0.7) }} preset="h5">
              {language.gap}
            </Text>
          </View>
          <Text preset="h6">
            {mainData !== undefined
              ? `${language?.bdt} ${moneyFormat(gap)}`
              : 0}
          </Text>
        </View>
        {/*  */}
        <View
          style={[
            styles.listView,
            {
              borderBottomWidth: 0,
            },
          ]}
        >
          <View style={ROW}>
            {/* <View style={[styles.box, { backgroundColor: COLOR.lightRed }]} /> */}
            <GapIcon />
            <Text style={{ marginLeft: rh(0.7) }} preset="h5">
              {language.gap} {language?.unit}
            </Text>
          </View>
          <Text preset="h6">
            {mainData !== undefined ? mainData?.gap_unit : 0}
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#c7c7c74c",
  },
  listView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: rh(0.15),
    borderColor: "#c7c7c762",
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
