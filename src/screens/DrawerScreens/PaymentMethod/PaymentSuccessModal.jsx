import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { rh, rw } from "../../../theme/Theme";
import MediumButton from "../../../components/Buttons/MediumButton";
import { useNavigation } from "@react-navigation/native";
import Text from "../../../components/Text/Text";
import { useDispatch, useSelector } from "react-redux";
import { paymentSuccessState } from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import { Image } from "react-native";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { CurrencyFormatToFixed, toBnNum } from "../../../utils";
import { setSelectedCustomer } from "../../../redux/features/customer/customerSlice";

export default function PaymentSuccessModal({
  nav,
  totalAmount,
  item,
  isRenew,
  purchasedUid,
}) {
  const state = useSelector((state) => state);
  const code = useSelector(codeSelector);
  const language = useSelector(languageSelector);
  const dispatch = useDispatch();
  const isVisible = state?.insuranceBuy?.paymentSuccess;
  const navigation = useNavigation();

  //  handel home
  const handelButton = () => {
    navigation.navigate("HomeScreen");
    dispatch(paymentSuccessState());
    dispatch(setSelectedCustomer(null));
  };

  return (
    <Modal
      onRequestClose={() => {
        handelButton();
      }}
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            height: "100%",
          }}
        ></TouchableOpacity>
        <View style={styles.modalContainer}>
          {/* Image  */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../../assets/icons/gif/hug.gif")}
              style={{ height: 100, width: 100, borderRadius: 10 }}
            />
            <Text preset="h1" style={[styles.title]} color={"#588EC1"}>
              {language?.payment_successful}
            </Text>
          </View>
          {/* title */}
          <View>
            <View style={styles.policyTable}>
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
                  <Text
                    preset="h6"
                    style={{
                      fontSize: 14,
                      color: "#2253A5",
                      fontWeight: "800",
                    }}
                  >
                    {item?.insurer?.name}
                  </Text>
                </View>
              </View>
              {/*  */}
              <View
                style={[
                  styles.tableText,
                  {
                    alignItems: "center",
                  },
                ]}
              >
                <Text preset="h6" style={styles.tableTextLeft}>
                  {language?.policyCategoryHeaderText}
                </Text>
                {/*  */}
                <Text preset="h6" style={styles.tableTextRight}>
                  {item?.category?.title}
                </Text>
              </View>
              {/*  */}
              <View style={styles.tableText}>
                <Text preset="h6" style={styles.tableTextLeft}>
                  {language?.selectedPolicy}
                </Text>
                {/* dd */}
                <Text
                  preset="h6"
                  line={1}
                  style={[
                    styles.tableTextRight,
                    {
                      maxWidth: "60%",
                    },
                  ]}
                >
                  {item?.name}
                </Text>
              </View>
              {/* list 02 */}
              <View style={styles.tableText}>
                <Text preset="h6" style={styles.tableTextLeft}>
                  {language?.policyCoverageAmount}
                </Text>
                <Text preset="h6" style={styles.tableTextRight}>
                  {item?.category?.id === 2 ? "USD" : language?.bdt}{" "}
                  {toBnNum(
                    item?.total_coverage_amount
                      ? CurrencyFormatToFixed(item?.total_coverage_amount)
                      : "",
                    code
                  )}
                </Text>
              </View>
              {/* list  03*/}
              <View style={styles.tableText}>
                <Text preset="h6" style={styles.tableTextLeft}>
                  {language?.policyTerm}
                </Text>
                <Text preset="h6" style={styles.tableTextRight}>
                  {toBnNum(item?.duration, code)}{" "}
                  {language?.[item?.duration_type_text?.toLowerCase()]}
                </Text>
              </View>
              {/* list  03*/}
              <View style={styles.tableText}>
                <Text preset="h6" style={styles.tableTextLeft}>
                  {language?.paidAmount}
                </Text>
                <Text preset="h6" style={styles.tableTextRight}>
                  {language?.bdt}{" "}
                  {toBnNum(
                    totalAmount
                      ? CurrencyFormatToFixed(parseInt(totalAmount))
                      : "",
                    code
                  )}
                </Text>
              </View>
              {/* list  purchasedUid*/}
              {/* <View style={styles.tableText}>
                <Text preset="h6" style={styles.tableTextLeft}>
                  {language?.purchasedUid}
                </Text>
                <Text preset="h6" style={styles.tableTextRight}>
                  {purchasedUid}
                </Text>
              </View> */}
            </View>
          </View>

          {/*  */}
          <View style={styles.buttonContainer}>
            {!isRenew && (
              <>
                <MediumButton
                  stylesButton={styles.button}
                  onPress={handelButton}
                  title={language?.bottomTabThirdTitleText}
                  type={"sec"}
                />
              </>
            )}
            {/* <MediumButton
              stylesButton={styles.button2}
              onPress={handelMyPolices}
              title={language?.viewYourPolicyButton}
            /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000072",
    position: "relative",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    paddingTop: 15,
    borderTopRightRadius: rw(8),
    borderTopLeftRadius: rw(8),
  },
  title: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
    paddingTop: 10,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  tableTextRight: {
    flexDirection: "row",
    fontSize: 14,
    paddingVertical: 8,
    alignSelf: "center",
  },
  button: {
    marginBottom: rh(6),
    width: rw(35),
    borderRadius: 30,
  },
  button2: {
    marginBottom: rh(6),
    width: rw(40),
    borderRadius: 30,
    marginLeft: 10,
  },
  //   policyTable
  policyTable: {
    borderWidth: 1,
    borderColor: "#E5EAFF",
    padding: 15,
    marginVertical: 15,
    width: rw(90),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    // elevation: 10,
    borderRadius: 10,
  },
  tableText: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableTextRight: {
    fontSize: 14,
    color: "#2253A5",
    fontWeight: "800",
    flexDirection: "row",
  },
  tableTextLeft: {
    fontSize: 14,
    color: "#2253A5",
    fontWeight: "800",
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
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: rw(4),
    justifyContent: "space-between",
  },
});

// <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "flex-end",
//                   }}
//                 >
//                   <Image
//                     source={
//                       item?.logoLink
//                         ? { uri: item?.logoLink }
//                         : require("../../../../assets/images/popularInImage.png")
//                     }
//                     style={{
//                       width: 30,
//                       height: 25,
//                       resizeMode: "contain",
//                       marginRight: 10,
//                     }}
//                   />

//                   <Text
//                     preset="h6"
//                     style={{
//                       fontSize: 14,
//                       color: "#2253A5",
//                       fontWeight: "800",
//                     }}
//                   >
//                     {item?.category?.title}
//                   </Text>
//                 </View>
