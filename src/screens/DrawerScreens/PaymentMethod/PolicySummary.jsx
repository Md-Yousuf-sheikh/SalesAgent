import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { rf, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { CurrencyFormatToFixed, toBnNum } from "../../../utils";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";

export default function PolicySummary({ item, calItem }) {
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  // console.log("item******", item);
  return (
    <View>
      <Text preset="h3" color={"#4F4F4F"}>
        {language?.summary_of} {item?.name}
      </Text>
      <View style={styles.policyTable}>
        {/* list */}
        <View
          style={[
            styles.tableText,
            {
              alignItems: "center",
            },
          ]}
        >
          <Text preset="h6" style={styles.tableTextLeft}>
            {language?.insurerTitle}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Image
              source={
                item?.logoLink
                  ? { uri: item?.logoLink }
                  : require("../../../../assets/images/popularInImage.png")
              }
              style={{
                width: 30,
                height: 25,
                resizeMode: "contain",
                marginRight: 10,
              }}
            />

            <Text
              preset="h6"
              style={{
                color: "#2253A5",
                // fontWeight: "800",
              }}
            >
              {item?.category?.slug ? item?.category?.title : "Shobai"}
            </Text>
          </View>
        </View>
        <View style={styles.tableText}>
          <Text preset="h6" style={styles.tableTextLeft}>
            {language?.selectedPolicy}
          </Text>
          <Text preset="h6" style={styles.tableTextRight}>
            {item?.name}
          </Text>
        </View>
        {/* list 02 */}
        <View style={styles.tableText}>
          <Text preset="h6" style={styles.tableTextLeft}>
            {language?.policyCoverageAmount}
          </Text>
          <Text preset="h6" style={styles.tableTextRight}>
            {language?.bdt}{" "}
            {toBnNum(CurrencyFormatToFixed(item?.total_coverage_amount), code)}
          </Text>
        </View>
        {/* list  03*/}
        <View style={styles.tableText}>
          <Text preset="h6" style={styles.tableTextLeft}>
            {language?.policyDuration}
          </Text>
          <Text preset="h6" style={styles.tableTextRight}>
            {toBnNum(item?.duration, code)}{" "}
            {language?.[item?.duration_type_text?.toLowerCase()]}
          </Text>
        </View>
        {/* list  03*/}
        <View style={styles.tableText}>
          <Text preset="h6" style={styles.tableTextLeft}>
            {language?.premiumTitle}
          </Text>
          <Text preset="h6" style={styles.tableTextRight}>
            {language?.bdt}{" "}
            {toBnNum(
              item?.category?.id !== 1 ? calItem?.result : item?.premium_amount,
              code
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  policyTable: {
    borderWidth: 1,
    borderColor: "#E5EAFF",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#FCFCFE",
    borderRadius: 5,
  },
  tableText: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableTextRight: {
    // fontSize: rf(1.8),
    color: "#2253A5",
    // fontWeight: "800",
    flexDirection: "row",
  },
  tableTextLeft: {
    // fontSize: rf(1.8),
    color: "#2253A5",
    // fontWeight: "800",
  },
  tableTextRStart: {
    marginRight: 4,
    color: "#2253A5",
  },
  tableTextREnd: {
    minWidth: rw(20),
    maxWidth: rw(21),
    textAlign: "right",
    color: "#2253A5",
    fontSize: 14,
  },
});
