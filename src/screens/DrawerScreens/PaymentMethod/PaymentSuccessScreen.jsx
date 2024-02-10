import { StatusBar, StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { CONTAINER, rf, rh, rw } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import Text from "../../../components/Text/Text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MediumButton from "../../../components/Buttons/MediumButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import PaymentSuccessModal from "./PaymentSuccessModal";
import PaymentFailedModal from "./PaymentFailedModal";
import { useSelector } from "react-redux";
import { CurrencyFormatToFixed } from "../../../utils";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function PaymentSuccessScreen({ route }) {
  const item = route?.params?.item;
  const navigation = useNavigation();
  const language = useSelector(languageSelector);
  //  modal
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  return (
    <>
      <PaymentSuccessModal
        setIsVisible={setPaymentSuccess}
        isVisible={paymentSuccess}
      />
      <PaymentFailedModal
        setIsVisible={setPaymentFailed}
        isVisible={paymentFailed}
      />
      {/* <PayLaterModal setIsVisible={setPayLater} isVisible={payLater} /> */}
      {/* Modal */}
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader
        title={language.paymentDetailsTitle}
        // nav={'InformationPreview'}
      />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={CONTAINER}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {/* <Svg width={70} height={68} fill="none">
              <G clipPath="url(#a)" fill="#2253A5">
                <Path d="M33.996 68C15.251 68 0 52.748 0 34 0 15.252 15.251 0 33.996 0c6.029 0 11.95 1.599 17.122 4.621a2.741 2.741 0 0 1-2.765 4.733 28.484 28.484 0 0 0-14.357-3.871C18.273 5.48 5.481 18.275 5.481 34s12.792 28.52 28.515 28.52S62.512 49.724 62.512 34c0-2.346-.283-4.675-.844-6.916a2.741 2.741 0 0 1 5.319-1.328A34.083 34.083 0 0 1 67.992 34c0 18.748-15.25 34-33.996 34Z" />
                <Path d="M33.971 47.5h-.034a2.738 2.738 0 0 1-2.102-1.023L16.817 27.802a2.74 2.74 0 1 1 4.272-3.436l12.935 16.085 31.143-36.84a2.742 2.742 0 0 1 4.187 3.538l-33.29 39.38a2.744 2.744 0 0 1-2.093.971Z" />
              </G>
              <Defs>
                <ClipPath id="a">
                  <Path fill="#fff" d="M0 0h70v68H0z" />
                </ClipPath>
              </Defs>
            </Svg> */}
            <Image
              source={require("../../../../assets/icons/gif/hug.gif")}
              style={{ height: 100, width: 100, borderRadius: 10 }}
            />
            <Text style={{ marginTop: rh(2), color: "#2253A5" }}>
              Payment Successful
            </Text>
          </View>
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
                {language.insurerTitle}
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
                    fontSize: 14,
                    color: "#2253A5",
                    fontWeight: "800",
                  }}
                >
                  {item?.category?.slug ? item?.category?.title : "Shobai"}
                </Text>
              </View>
            </View>
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language.selectedPolicy}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {item?.name}
              </Text>
            </View>
            {/* list 02 */}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language.policyCoverageAmount}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {language?.bdt}{" "}
                {CurrencyFormatToFixed(item?.total_coverage_amount)}
              </Text>
            </View>
            {/* list  03*/}
            <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {language.policyTerm}
              </Text>
              <Text preset="h6" style={styles.tableTextRight}>
                {item?.duration} {item?.duration_type_text}
              </Text>
            </View>
            {/* <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {"Paid"}
              </Text>
              <Text style={styles.tableTextREnd} preset="h6">
              {language?.bdt}
                {CurrencyFormatToFixed(
                  parseInt(
                    purchaseDetails?.payments[0]?.payable_amount
                  ).toFixed(0)
                )}
              </Text>
            </View> */}

            {/* <View style={[styles.tableText]}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {"Payment Date"}
              </Text>
              <Text
                style={[styles.tableTextREnd, { maxWidth: rw(40) }]}
                preset="h6"
              >
                {purchaseDetails?.payments[0]?.paymentDate}
              </Text>
            </View> */}
            {/* <View style={styles.tableText}>
              <Text preset="h6" style={styles.tableTextLeft}>
                {'Paid'}
              </Text>
              <Text style={styles.tableTextREnd} preset="h6">
               {language?.bdt}
                {item?.category?.slug === 'health-insurance'
                  ? CurrencyFormatToFixed(
                      parseInt(item?.premium_amount) -
                        parseInt(item?.premium_amount) *
                          (parseInt(referralDiscount) / 100)
                    )
                  : CurrencyFormatToFixed(
                      parseInt(item?.calculateInfo?.result) -
                        parseInt(item?.calculateInfo?.result) *
                          (parseInt(referralDiscount) / 100)
                    )}
              </Text>
            </View> */}
          </View>

          <>
            {/* buttons */}
            <MediumButton
              title={language.bottomTabThirdTitleText}
              stylesButton={{
                backgroundColor: "#3369B3",
                // borderRadius: 35,
                marginVertical: 0,
                marginTop: 10,
                elevation: 1,
                // width: '100%',
              }}
              onPress={() => {
                const resetAction = CommonActions.reset({
                  index: 0,
                  routes: [{ name: "HomeScreen" }],
                });
                navigation.dispatch(resetAction);
              }}
            />
            {/* Pay Later */}
            {/* <MediumButton
              loader={payLater}
              title={ language.payLaterButtonText}
              stylesButton={{
                // borderRadius: 35,
                borderWidth: 0,
                marginTop: 15,
                marginBottom: rh(4),
              }}
              onPress={handelPayLater}
              type={'sec'}
              titleStyle={{
                borderBottomWidth: 1,
                color: '#000000',
              }}
            /> */}
          </>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingBottom: rh(7),
  },
  //
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
    fontSize: 11,
  },
  circleNumber: {
    color: "#fff",
  },
  // filed start style
  title: {
    color: "#4F4F4F",
    fontSize: 17,
    lineHeight: 21,
    marginVertical: 15,
  },
  //   policyTable
  policyTable: {
    borderWidth: 1,
    borderColor: "#E5EAFF",
    padding: rh(1.5),
    marginVertical: rh(1),
    marginBottom: rh(4),
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: rh(6),
    marginBottom: rh(6),
    borderWidth: 1,
    borderRadius: 10,
    width: rw(60),
    alignSelf: "center",
    height: rh(20),
    borderColor: "white",
    backgroundColor: "white",
    elevation: 10,
  },
  tableText: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    // elevation: 10,
  },
  tableTextRight: {
    fontSize: rf(1.8),
    color: "#2253A5",
    fontWeight: "800",
    flexDirection: "row",
  },
  tableTextLeft: {
    fontSize: rf(1.8),
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
    fontSize: rf(1.8),
  },
  //   totalAmount
  totalAmount: {
    backgroundColor: "#FCFCFE",
    borderColor: "#E5EAFF",
    borderWidth: 1,
    borderRadius: 4,
  },
  payLaterButtonText: {
    paddingBottom: 10,
    alignSelf: "center",
    textDecorationStyle: "solid",
    textDecorationColor: "red",
    textDecorationLine: "underline",
  },
  //checkbox
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    marginRight: 5,
    width: 14,
    height: 14,
  },
  // smallText
  smallText: {
    fontSize: 13,
  },
  // loyalty
  loyaltyCardBox: {
    height: 49,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: "#E5EAFF",
    marginBottom: 15,
  },
  loyaltyCardButton: {
    height: 49,
    backgroundColor: "#0089ED",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    borderLeftWidth: 1,
    borderColor: "#E5EAFF",
  },
  loyaltyCardNumber: {
    color: "#898A8D",
    fontSize: 16,
  },
});
