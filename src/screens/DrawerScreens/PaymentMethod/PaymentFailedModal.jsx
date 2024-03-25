import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { rh, rw } from "../../../theme/Theme";
import MediumButton from "../../../components/Buttons/MediumButton";
import Text from "../../../components/Text/Text";
import { useDispatch, useSelector } from "react-redux";
import { paymentFailedState } from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import IconFailedAnimation from "../../../components/Shared/IconFailedAnimation";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function PaymentFailedModal({ purchasedUid }) {
  const state = useSelector((state) => state);
  const language = useSelector(languageSelector);
  const isVisible = state?.insuranceBuy?.paymentFailed;
  const dispatch = useDispatch();
  //
  const handelVerify = () => {
    dispatch(paymentFailedState());
  };
  return (
    <Modal
      onRequestClose={() => {
        dispatch(paymentFailedState());
      }}
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            dispatch(paymentFailedState());
          }}
          style={{
            height: "100%",
          }}
        ></TouchableOpacity>
        <View style={styles.modalContainer}>
          {/* image */}
          <View style={styles.imageContainer}>
            <IconFailedAnimation />
          </View>
          {/* title */}
          <Text preset="h1" style={[styles.title]} color={"#3F3F3F"}>
            {language?.failedPaymentHeaderText}
          </Text>
          <Text preset="h4" style={[styles.subTitle]}>
            {language?.failedPaymentHeaderDetails}
          </Text>

          {/* <Text preset="h4" style={[styles.subTitle]}>
            {language?.failedPaymentHeaderSubText}
          </Text> */}

          <MediumButton
            stylesButton={styles.button}
            onPress={handelVerify}
            title={language?.tryAgainButtonText}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000027",
    position: "relative",
    height: "100%",
    width: "100%",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffff",
    width: "100%",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: rh(3),
    fontWeight: "800",
    fontSize: 30,
    marginTop: rh(2),
  },
  subTitle: {
    color: "#8D9295",
    textAlign: "left",
    marginBottom: rh(1),
    textAlign: "center",
    paddingHorizontal: rw(10),
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: rh(6),
  },
  button: {
    marginBottom: rh(6),
  },
});
