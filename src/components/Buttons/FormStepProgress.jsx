import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/language/languageSlice";
import { Ionicons } from "@expo/vector-icons";
import { rf, rw } from "../../theme/Theme";

export default function FormStepProgress({ item, current }) {
  const language = useSelector(languageSelector);
  //
  //  step  chekiang
  let stepIndiaSecond;
  if (item?.category?.id?.toString() === "3") {
    stepIndiaSecond = "Device";
  } else if (item?.category?.id?.toString() === "2") {
    stepIndiaSecond = "Travel";
  } else if (
    item?.category?.id?.toString() === "1" ||
    item?.category?.id?.toString() === "4"
  ) {
    stepIndiaSecond = "Nominee";
  } else if (item?.category?.id?.toString() === "5") {
    stepIndiaSecond = "Motor";
  }
  return (
    <View style={styles.circleContainer}>
      {/* 01 */}
      <View style={styles.circleBoxContainer}>
        <View style={styles.circleBox}>
          <View style={styles.lineHide} />
          <View
            style={[
              styles.circle,
              {
                backgroundColor: current > 1 ? "#0089ED" : "#16B5CC",
              },
            ]}
          >
            {current > 1 ? (
              <Ionicons name="ios-checkmark" size={20} color="#ffffff" />
            ) : (
              <Text style={styles.circleNumber}>1</Text>
            )}
          </View>
          <View style={styles.lineActive} />
        </View>
        <Text color={"#0089ED"} style={styles.circleText}>
          {stepIndiaSecond === "Motor" ? "Motor" : language.stepIndiFirst}
        </Text>
      </View>
      {/* 02 */}
      <View
        style={[
          styles.circleBoxContainer,
          stepIndiaSecond === "Motor" && {
            display: "none",
          },
        ]}
      >
        <View style={styles.circleBox}>
          <View style={styles.lineActive} />
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  current > 2
                    ? "#0089ED"
                    : current == 2
                    ? "#16B5CC"
                    : "#C4C4C4",
              },
            ]}
          >
            {current > 2 ? (
              <Ionicons name="ios-checkmark" size={20} color="#ffffff" />
            ) : (
              <Text style={styles.circleNumber}>2</Text>
            )}
          </View>
          <View style={styles.line} />
        </View>
        <Text color={"#16B5CC"} style={styles.circleText}>
          {stepIndiaSecond === "Travel"
            ? language?.travelTitle
            : stepIndiaSecond === "Device"
            ? language?.deviceTitle
            : language?.stepIndiSecond}
        </Text>
      </View>
      {/* 03 */}
      <View style={styles.circleBoxContainer}>
        <View style={styles.circleBox}>
          <View style={styles.line} />
          <View
            style={[
              styles.circle,
              {
                backgroundColor:
                  current > 3
                    ? "#0089ED"
                    : current == 3
                    ? "#16B5CC"
                    : "#C4C4C4",
              },
            ]}
          >
            {current > 3 ? (
              <Ionicons name="ios-checkmark" size={20} color="#ffffff" />
            ) : (
              <Text style={styles.circleNumber}>
                {stepIndiaSecond === "Motor" ? 2 : 3}
              </Text>
            )}
          </View>
          <View style={styles.line} />
        </View>
        <Text style={styles.circleText}>{language.stepIndiThird}</Text>
      </View>
      {/* 04 */}
      <View style={styles.circleBoxContainer}>
        <View style={styles.circleBox}>
          <View style={styles.line} />
          <View
            style={[
              styles.circle,
              current === 4 && {
                backgroundColor: "#16B5CC",
              },
            ]}
          >
            <Text style={styles.circleNumber}>
              {stepIndiaSecond === "Motor" ? 3 : 4}
            </Text>
          </View>
          <View style={styles.lineHide} />
        </View>
        <Text style={styles.circleText}>{language.stepIndiPayment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  circleBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "27%",
    overflow: "hidden",
  },
  circleBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: "#C4C4C4",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 4,
    overflow: "hidden",
  },
  line: {
    width: rw(50),
    height: 1,
    backgroundColor: "#ddd",
  },
  lineHide: {
    width: rw(50),
    height: 1,
    backgroundColor: "#dddddd00",
  },
  lineActive: {
    width: rw(50),
    height: 1,
    backgroundColor: "#16B5CC",
  },
  circleText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: rf(1.5),
  },
  circleNumber: {
    color: "#fff",
  },
});
