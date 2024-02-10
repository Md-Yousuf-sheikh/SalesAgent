import { StatusBar, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { COLOR, CONTAINER, rf, rh, rw } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import Text from "../../../components/Text/Text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MediumButton from "../../../components/Buttons/MediumButton";
import { useNavigation } from "@react-navigation/native";
import SelectPaymentMethod from "../../../components/Inputs/SelectPaymentMethod";
import PaymentSuccessModal from "./PaymentSuccessModal";
import PaymentFailedModal from "./PaymentFailedModal";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetPoliciesBySlugQuery,
  useSslPayMutation,
  useSubmitCouponMutation,
  useSubmitReferralMutation,
} from "../../../redux/features/purchase/purchaseApiSlice";
import Toast from "react-native-root-toast";
import FormStepProgress from "../../../components/Buttons/FormStepProgress";
import {
  currentBuySelector,
  premiumCalculatorSelector,
  purchasePolicyUidSelector,
} from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { selectCustomer } from "../../../redux/features/customer/customerSlice";
import { CurrencyFormatToFixed, toBnNum } from "../../../utils";
import PolicySummary from "./PolicySummary";
import CalculatePremiumDetails from "./CalculatePremiumDetails";
import CodeAccordingFiled from "./CodeAccordingFiled";
import SendLinkSuccessModal from "./SendLinkSuccessModal";
import useShowToastMessage from "../../../hooks/useShowToastMessage";

export default function PaymentMethod() {
  const navigation = useNavigation();
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const item = useSelector(currentBuySelector);
  const toast = useShowToastMessage();
  const purchasePolicyUid = useSelector(purchasePolicyUidSelector);
  const premiumCalculator = useSelector(premiumCalculatorSelector);
  const authCustomer = useSelector(selectCustomer);
  const purchasedUid = purchasePolicyUid;
  //
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [sendLink, setSendLink] = useState(false);
  const [payLater, setPayLater] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState();
  const [paymentLaterLoading, setPaymentLaterLoading] = useState(false);
  //  state
  const [discountCode, setDiscountCode] = useState({
    promoValue: "",
    promoOpen: false,
    referralValue: "",
    referralOpen: false,
    loyaltyValue: "",
    loyaltyPrice: "",
    loyaltyOpen: false,
    discountPercentage: 0,
    discountTypeName: "",
    discountRes: "",
    label: "",
    title: "",
    discount: "",
    discountAmount: "",
    item: "",
    type: "",
  });
  const slug = item?.slug;
  // API Call
  const [submitCoupon] = useSubmitCouponMutation();
  const [submitReferral] = useSubmitReferralMutation();
  const [sslPay, { isLoading }] = useSslPayMutation();
  const { data: policy_by_slug } = useGetPoliciesBySlugQuery({ slug, code });

  // calculation
  const subTotalAmount =
    item?.category?.id === 1
      ? item?.premium_amount -
        (item?.premium_amount * discountCode?.discountPercentage) / 100
      : premiumCalculator?.result -
        (premiumCalculator?.result * discountCode?.discountPercentage) / 100;

  const discount =
    policy_by_slug?.data?.discount !== null
      ? item?.category?.id === 1
        ? item?.premium_amount * (policy_by_slug?.data?.discount / 100)
        : premiumCalculator?.result * (policy_by_slug?.data?.discount / 100)
      : 0;

  const totalDiscountAmount = subTotalAmount - discount;
  const totalVatAmount =
    policy_by_slug?.data?.vat > 0
      ? totalDiscountAmount * (policy_by_slug?.data?.vat / 100)
      : 0;

  // grand Total Amount
  let totalAmount = totalDiscountAmount + totalVatAmount;

  // handelPayLater
  const handelPayLater = async () => {
    setPaymentLaterLoading(true);
    const discountData = {
      label: "",
      title: discountCode?.title,
      discount: discountCode?.discount,
      discountAmount: discountCode?.discountAmount,
      item: discountCode?.item,
      type: discountCode?.type,
    };

    try {
      const data = {
        purchasePolicyUid: purchasedUid,
        userId: authCustomer?.id,
        policySlug: item?.slug,
        totalAmount: totalAmount,
        cusName: authCustomer?.full_name,
        cusEmail: authCustomer?.email,
        cusContactNumber: authCustomer?.contact_number,
        cusAdd1: `${authCustomer?.present_address}, ${authCustomer?.present_thana}, ${authCustomer?.present_postal_code}, ${authCustomer?.present_district}, ${authCustomer?.present_country}`,
        productName: item?.name,
        productCategory: item?.category?.title,
        productProfile: "",
        paymentMethod: selectedMethod?.value,
        payLater: true,
        redirectUrl: `https://waadaa-insure.vercel.app/policy/${item?.slug}/pay/payLater`,
      };
      //  discount
      if (discountData?.item && discountData?.discountAmount) {
        data.discount = JSON.stringify(discountData);
      }
      // return;
      const res = await sslPay(data).unwrap();
      setSendLink(true);
      setPaymentLaterLoading(false);
    } catch (error) {
      setSendLink(false);
      setPaymentLaterLoading(false);
      toast(error?.data?.message, "error");
    }
  };

  // processSslPay
  const handelPayNow = async () => {
    
    setIsLoadingButton(true);
    const discountData = {
      label: "",
      title: discountCode?.title,
      discount: discountCode?.discount,
      discountAmount: discountCode?.discountAmount,
      item: discountCode?.item,
      type: discountCode?.type,
    };

    try {
      const data = {
        purchasePolicyUid: purchasedUid,
        userId: authCustomer?.id,
        policySlug: item?.slug,
        totalAmount: totalAmount,
        cusName: authCustomer?.full_name,
        cusEmail: authCustomer?.email,
        cusContactNumber: authCustomer?.contact_number,
        cusAdd1: `${authCustomer?.present_address}, ${authCustomer?.present_thana}, ${authCustomer?.present_postal_code}, ${authCustomer?.present_district}, ${authCustomer?.present_country}`,
        productName: item?.name,
        productCategory: item?.category?.title,
        productProfile: "",
        paymentMethod: selectedMethod?.value,
        redirectUrl: `https://waadaa-insure.vercel.app/policy/${item?.slug}/pay`,
      };
      if (discountData?.item && discountData?.discountAmount) {
        data.discount = JSON.stringify(discountData);
      }

      // console.log("data", data);
      // return;
      const res = await sslPay(data).unwrap();
      // console.log("sslPay", res);
      let renew = false;
      navigation.navigate("PaymentWebViewScreen", {
        url: res?.data,
        item: item,
        renew: renew,
      });
    } catch (error) {
      console.log("error payment ", error);
    }
    setIsLoadingButton(false);
  };
  // handel Discount Code
  const handelDiscountCode = async (discountKey) => {
    const amountPre =
      item?.category?.id === 1
        ? item?.premium_amount
        : premiumCalculator?.result;
    if (discountKey == "promoOpen") {
      // promo code
      const data = {
        code: discountCode?.promoValue,
      };
      try {
        const response = await submitCoupon(data).unwrap();
        console.log("response", response);
        //
        const desAmount =
          item?.category?.id === 1
            ? item?.premium_amount
            : premiumCalculator?.result * (response?.data?.discount / 100);
        const percenttt = (response?.data?.discount / amountPre) * 100;
        // 30/45 × 100 = 66.67%.
        setDiscountCode((prev) => ({
          ...prev,
          discountPercentage:
            response?.data?.type == "percentage"
              ? response?.data?.discount
              : percenttt,
          discountTypeName: "promoOpen",
          promoOpen: false,
          type: response?.data?.type == "percentage" ? "percentage" : "flat",
          title: "promo",
          discount: response?.data?.discount,
          discountAmount:
            response?.data?.type == "percentage"
              ? desAmount
              : response?.data?.discount,
          item: discountCode?.promoValue,
        }));
        toast(response?.message);
        // toast
      } catch (error) {
        console.log("error", error);
        toast(error?.data?.message, "error");
      }
    } else if (discountKey === "loyaltyOpen") {
      const point_price = 2;
      const point_have = authCustomer?.data?.loyalty?.points;
      const max_point = policy_by_slug?.data?.max_loyalty_redeem;
      const pointUse = point_have >= max_point ? max_point : point_have;
      const total = Math.round(point_price * pointUse);
      const percentage =
        (total /
          (item?.category?.id === 1
            ? item?.premium_amount
            : premiumCalculator?.result)) *
        100;
      setDiscountCode((prev) => ({
        ...prev,
        discountPercentage: percentage,
        discountTypeName: "loyaltyOpen",
        loyaltyOpen: false,
        type: "fixed",
        title: "loyalty",
        discount: point_price,
        discountAmount: total,
        item: pointUse,
      }));
    } else if (discountKey === "referralOpen") {
      // referral
      const data = {
        code: discountCode?.referralValue,
      };
      try {
        const response = await submitReferral(data).unwrap();
        //
        const desAmount =
          item?.category?.id === 1
            ? item?.premium_amount
            : premiumCalculator?.result * (response?.data?.discount / 100);

        setDiscountCode((prev) => ({
          ...prev,
          discountPercentage: response?.data?.discount,
          discountTypeName: "referralOpen",
          referralOpen: false,
          type: "percentage",
          title: "referral",
          discount: response?.data?.discount,
          discountAmount: desAmount,
          item: discountCode?.referralValue,
        }));
        Toast.show("Promo Applied", {
          duration: 1000,
          backgroundColor: "rgba(51, 105, 179, 1)",
          shadow: true,
          position: Toast.positions.TOP,
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
      } catch (error) {
        console.log("erros", error);
        Toast.show(`${error?.data?.message}`, {
          duration: 1000,
          backgroundColor: "red",
          shadow: true,
          position: Toast.positions.TOP,
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
      }
    }
  };
  //

  return (
    <>
      <PaymentSuccessModal
        purchasedUid={purchasedUid}
        totalAmount={totalAmount}
        item={item}
      />
      <SendLinkSuccessModal
        isVisible={sendLink}
        setIsVisible={setSendLink}
        totalAmount={totalAmount}
        item={item}
        purchasedUid={purchasedUid}
      />
      <PaymentFailedModal
        purchasedUid={purchasedUid}
        totalAmount={totalAmount}
      />
      {/* <PayLaterModal
        totalAmount={totalAmount}
        item={item}
        setIsVisible={setPayLater}
        isVisible={payLater}
        purchasedUid={purchasedUid}
      /> */}
      {/* Modal */}
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language?.paymentMethodHeader} />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={CONTAINER}
      >
        <View style={styles.container}>
          {/* progress  */}
          <FormStepProgress item={premiumCalculator} current={4} />
          {/* end */}

          {/* Selected Policy --------------- */}
          <PolicySummary item={item} calItem={premiumCalculator} />
          {/*  Calculate Premium */}
          {item?.category?.id !== 1 && (
            <CalculatePremiumDetails item={item} calItem={premiumCalculator} />
          )}
          {/* Payment Method -------------- */}
          <Text preset="h3" style={styles.title}>
            {language?.selectPaymentMethodTitle}
          </Text>
          <SelectPaymentMethod
            selected={selectedMethod}
            setSelected={setSelectedMethod}
          />
          {/* Discount codes  */}
          <>
            <CodeAccordingFiled
              label={language?.couponCodeDetail}
              placeholder={language?.promoCodeText}
              setValue={(value) => {
                setDiscountCode((prv) => ({ ...prv, promoValue: value }));
              }}
              setShowContent={setDiscountCode}
              showContent={discountCode?.promoOpen}
              keyName={"promoOpen"}
              handelSubmit={() => {
                handelDiscountCode("promoOpen");
              }}
              item={policy_by_slug}
            />
            {/* <CodeAccordingFiled
              label={language?.useReferralCode}
              placeholder={language?.referralCode}
              setValue={(value) => {
                setDiscountCode((prv) => ({ ...prv, referralValue: value }));
              }}
              setShowContent={setDiscountCode}
              showContent={discountCode?.referralOpen}
              keyName={"referralOpen"}
              handelSubmit={() => {
                handelDiscountCode("referralOpen");
              }}
              item={policy_by_slug}
            /> */}
          </>
          {/*  Order Summary  ------------------*/}
          <>
            <View style={styles.orderSummaryContainer}>
              <Text color={"#4A4A4A"} preset="h3">
                {language?.orderSummaryTitle}
              </Text>
              <View style={[styles.policyTable, styles.totalAmount]}>
                {/* Subtotal */}
                <View style={[styles.tableText]}>
                  <Text preset="h6" style={styles.tableTextLeft}>
                    {language?.subTotalText}
                  </Text>
                  <View style={styles.tableTextRight}>
                    <Text style={styles.tableTextRStart} preset="h6">
                      {language?.bdt}
                    </Text>
                    <Text style={styles.tableTextREnd} preset="h6">
                      {toBnNum(
                        `${
                          item?.category?.id === 1
                            ? CurrencyFormatToFixed(item?.premium_amount)
                            : CurrencyFormatToFixed(premiumCalculator?.result)
                        }`,
                        code
                      )}
                    </Text>
                  </View>
                </View>

                <>
                  {policy_by_slug?.data?.discount !== null &&
                    policy_by_slug?.data?.discount > 0 &&
                    policy_by_slug?.data?.discount !== "0" && (
                      <View style={styles.tableText}>
                        <Text preset="h6" style={styles.tableTextLeft}>
                          {language?.discountTitle}
                          {`(${policy_by_slug?.data?.discount}%)`}
                        </Text>
                        <View style={styles.tableTextRight}>
                          <Text
                            color={"#38a169"}
                            style={styles.tableTextRStart}
                            preset="h6"
                          >
                            {language?.bdt}
                          </Text>
                          <Text
                            color={"#38a169"}
                            style={styles.tableTextREnd}
                            preset="h6"
                          >
                            - {toBnNum(CurrencyFormatToFixed(discount), code)}
                          </Text>
                        </View>
                      </View>
                    )}
                </>
                {/* Promo Code*/}
                <>
                  {discountCode?.discountTypeName !== "" && (
                    <View style={styles.tableText}>
                      <Text preset="h6" style={styles.tableTextLeft}>
                        {discountCode?.discountTypeName === "referralOpen"
                          ? `${language?.referralCode} (${discountCode?.item})`
                          : discountCode?.discountTypeName === "promoOpen"
                          ? `${language?.promoCodeText} (${discountCode?.item})`
                          : `${language?.loyaltyPoint} (${discountCode?.item})`}
                        {/* {`(${discountCode?.discountPercentage}%)`} */}
                      </Text>
                      <View style={styles.tableTextRight}>
                        <Text style={styles.tableTextRStart} preset="h6">
                          {language?.bdt}
                        </Text>
                        <Text style={styles.tableTextREnd} preset="h6">
                          -{" "}
                          {toBnNum(
                            CurrencyFormatToFixed(
                              item?.category?.id === 1
                                ? item?.premium_amount *
                                    (discountCode?.discountPercentage / 100)
                                : premiumCalculator?.result *
                                    (discountCode?.discountPercentage / 100)
                            ),
                            code
                          )}
                        </Text>
                      </View>
                    </View>
                  )}
                </>
                {/* Vat To Pay*/}
                {policy_by_slug?.data?.vat > 0 && (
                  <View style={styles.tableText}>
                    <Text preset="h6" style={styles.tableTextLeft}>
                      {language?.vatTitle}
                      {` (${toBnNum(policy_by_slug?.data?.vat, code)}%)`}
                    </Text>
                    <View style={styles.tableTextRight}>
                      <Text
                        color={COLOR.red700}
                        style={styles.tableTextRStart}
                        preset="h6"
                      >
                        {language?.bdt}
                      </Text>
                      <Text
                        color={COLOR.red700}
                        style={styles.tableTextREnd}
                        preset="h6"
                      >
                        +{" "}
                        {toBnNum(
                          `${
                            item?.category?.id === 1
                              ? CurrencyFormatToFixed(
                                  item?.premium_amount *
                                    (policy_by_slug?.data?.vat / 100)
                                )
                              : CurrencyFormatToFixed(
                                  premiumCalculator?.result *
                                    (policy_by_slug?.data?.vat / 100)
                                )
                          }`,
                          code
                        )}
                        {/* {policy_by_slug?.data?.vat}% */}
                      </Text>
                    </View>
                  </View>
                )}
                {/* Amount To Pay*/}
                <View style={styles.tableText}>
                  <Text preset="h6" style={styles.tableTextLeft}>
                    {language?.amountPayTitle}
                  </Text>
                  <View style={styles.tableTextRight}>
                    <Text
                      color={"#38a169"}
                      style={styles.tableTextRStart}
                      preset="h6"
                    >
                      {language?.bdt}
                    </Text>
                    <Text
                      color={"#38a169"}
                      style={styles.tableTextREnd}
                      preset="h6"
                    >
                      {toBnNum(CurrencyFormatToFixed(totalAmount), code)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
          {/* end total amount */}
          <>
            {/* buttons */}
            <MediumButton
              title={language?.payNowButtonText}
              stylesButton={{
                backgroundColor: "#3369B3",
                // borderRadius: 35,
                marginVertical: 0,
                marginTop: 10,
                elevation: 1,
              }}
              onPress={handelPayNow}
              isLoading={isLoading}
              disabled={isLoading}
            />
            {/* Pay Later */}
            <MediumButton
              isLoading={isLoading}
              title={language?.send_payment_link}
              stylesButton={{
                // borderRadius: 35,
                borderWidth: 1,
                marginTop: 15,
                marginBottom: rh(4),
              }}
              onPress={() => {
                handelPayLater();
              }}
              disabled={isLoading}
              type={"sec"}
              titleStyle={{
                borderBottomWidth: 1,
                color: "#000000",
              }}
            />
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

    marginVertical: 15,
  },
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
    fontSize: rf(1.8),
    color: "#2253A5",
    // fontWeight: "800",
    flexDirection: "row",
  },
  tableTextLeft: {
    fontSize: rf(1.8),
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
  //
  orderSummaryContainer: {
    paddingHorizontal: 4,
    marginTop: 10,
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
