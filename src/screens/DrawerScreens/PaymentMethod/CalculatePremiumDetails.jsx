import { StyleSheet, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { rf, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import moment from "moment";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { moneyFormat, toBnNum } from "../../../utils";

export default function CalculatePremiumDetails({ item, calItem }) {
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  //
  return (
    <View>
      <Text preset="h3" color={"#4F4F4F"}>
        {language?.calculateButtonText}
      </Text>
      {item?.category?.id === 3 ? (
        <>
          <View style={styles.policyTable}>
            {/* list */}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.device_price}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {language?.bdt}{" "}
                {toBnNum(moneyFormat(calItem?.request?.price), code)}
              </Text>
            </View>
            {/* list 02 */}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.coverage_type}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {calItem?.request?.coverage_type?.coverage?.title?.en}
              </Text>
            </View>
            {/* list  03*/}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.max_claim_amount}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {language?.bdt}{" "}
                {toBnNum(
                  moneyFormat(
                    calItem?.request?.coverage_type?.type === "percentage"
                      ? calItem?.request?.price *
                          (calItem?.request?.coverage_type?.value / 100)
                      : calItem?.request?.coverage_type?.value
                  ),
                  code
                )}
              </Text>
            </View>
          </View>
        </>
      ) : item?.category?.id === 2 ? (
        <>
          <View style={styles.policyTable}>
            {/* list */}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.dateOfBirthPlaceholder}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {moment(calItem?.request?.dob)?.format("D-MMMM-YYYY")}
              </Text>
            </View>
            {/* list 02 */}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.duration_from}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {moment(calItem?.request?.duration_from)?.format("D-MMMM-YYYY")}
              </Text>
            </View>
            {/* list  03*/}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.duration_to}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {moment(calItem?.request?.duration_to)?.format("D-MMMM-YYYY")}
              </Text>
            </View>
          </View>
        </>
      ) : item?.category?.id === 5 ? (
        <>
          <View style={styles.policyTable}>
            {/* list */}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.motor_price}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {language?.bdt}{" "}
                {toBnNum(moneyFormat(calItem?.request?.price), code)}
              </Text>
            </View>
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.motor_type}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {calItem?.request?.type}
              </Text>
            </View>
            {/* list 02 */}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.category}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {calItem?.request?.category}
              </Text>
            </View>
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.category_value}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {calItem?.request?.value}
              </Text>
            </View>
            {/* list  03*/}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.seat}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {calItem?.request?.seat}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.policyTable}>
            {/* list */}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.sum_assured}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {language?.bdt}{" "}
                {toBnNum(moneyFormat(calItem?.request?.sum_assured), code)}
              </Text>
            </View>
            {/* list 02 */}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.dateOfBirthPlaceholder}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {moment(calItem?.request?.dob)?.format("D-MMMM-YYYY")}
              </Text>
            </View>
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.payment_type}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {calItem?.request?.installment_type}
              </Text>
            </View>
            {/* list  03*/}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language?.termTitle}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {calItem?.request?.term}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  //   policyTable
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
