import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import {
  currentBuySelector,
  pendingPolicySelector,
  premiumCalculatorSelector,
  purchasePolicyUidSelector,
} from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";

import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CONTAINER, rh, rw } from "../../../theme/Theme";
import FormStepProgress from "../../../components/Buttons/FormStepProgress";
import TravelInformationForm from "../../../components/core/userInfo/TravelInformationForm";
import DeviceInformationForm from "../../../components/core/userInfo/DeviceInformationForm";
import NomineeInformationForm from "../../../components/core/userInfo/NomineeInformationForm";
import { useGetPurchaseFormQuery } from "../../../redux/features/policy/policyApiSlice";
import { selectCustomer } from "../../../redux/features/customer/customerSlice";
import { selectPersonalInformation } from "../../../redux/features/purchase/NomineeSlice";

export default function NomineeInformation() {
  const code = useSelector(codeSelector);
  const language = useSelector(languageSelector);
  const currentItem = useSelector(currentBuySelector);
  const premiumCalculator = useSelector(premiumCalculatorSelector);
  const pendingPolicy = useSelector(pendingPolicySelector);
  const purchasePolicyUid = useSelector(purchasePolicyUidSelector);
  // get user data
  let authCustomer = useSelector(selectCustomer);
  console.log("purchasePolicyUid", purchasePolicyUid);
  // prem Calculate
  const premCalculate = premiumCalculator;
  // purchase Form
  const { data: purchaseForm, isLoading } = useGetPurchaseFormQuery({
    slug: currentItem?.slug,
    type: 2,
    code,
  });

  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language.nomineeInfoTitle} />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={CONTAINER}
        contentContainerStyle={{
          paddingHorizontal: rw(2),
          paddingBottom: rh(8),
        }}
      >
        <FormStepProgress item={currentItem} current={2} />
        {/* Health or Life or travel or device   */}
        {(currentItem?.category?.id?.toString() === "1" ||
          currentItem?.category?.id?.toString() === "4") && (
          <NomineeInformationForm
            premCalculate={premCalculate}
            currentPolicy={currentItem}
            authUser={authCustomer || {}}
            purchasePolicyUid={purchasePolicyUid}
            items={{
              member: purchaseForm?.data?.Member_Information,
              nominee: purchaseForm?.data?.Nominee_Information,
            }}
          />
        )}

        {/* Motor  */}
        {currentItem?.category?.id?.toString() === "2" && (
          <TravelInformationForm
            premCalculate={premCalculate}
            pendingPolicy={pendingPolicy}
            currentItem={currentItem}
            authUser={authCustomer || {}}
            purchasePolicyUid={purchasePolicyUid}
          />
        )}
        {/* Device  */}
        {currentItem?.category?.id?.toString() === "3" && (
          <DeviceInformationForm
            premCalculate={premCalculate}
            pendingPolicy={pendingPolicy}
            currentItem={currentItem}
            authUser={authCustomer || {}}
            purchasePolicyUid={purchasePolicyUid}
          />
        )}
        {/* <Mot /> */}
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
