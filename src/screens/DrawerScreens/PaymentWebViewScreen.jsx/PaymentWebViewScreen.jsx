import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Modal } from "react-native";
import { WebView } from "react-native-webview";
import { COLOR, rh } from "../../../theme/Theme";
import {
  paymentFailedState,
  paymentSuccessState,
  paymentSuccessUrl,
} from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import { useDispatch } from "react-redux";

function PaymentWebviewScreen({ route }) {
  const [loadComplete, setloadComplete] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const webviewRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { url: uri, item } = route.params;
  let failUrl = `transaction=Failed`;
  let cancelUrl = `transaction=Canceled`;

  const onNavigationStateChange = (navState) => {
    const { url } = navState;
    setCurrentUrl(navState.url);
    if (url) {
      if (url.includes(cancelUrl) || url.includes(failUrl)) {
        navigation.goBack();
        dispatch(paymentFailedState());
      }
      if (url.includes("transaction=Success")) {
        dispatch(paymentSuccessState());
        if (route.params?.renew) {
          navigation.navigate("RenewPaymentMethod");
        } else {
          navigation.navigate("PaymentMethod");
        }
      }
      // check ural
      if (url.includes(failUrl)) {
        dispatch(paymentFailedState());
        if (route?.params?.renew) {
          navigation.navigate("RenewPaymentMethod");
        } else {
          navigation.navigate("PaymentMethod");
        }
      }
    }
    dispatch(paymentSuccessUrl(navState?.url));
  };
  console.log("uri", uri);
  return (
    <View style={{ height: "100%" }}>
      {/*  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!loadComplete}
        onRequestClose={() => {
          setloadComplete(true);
        }}
      >
        <View style={styles.animationContainer}>
          <ActivityIndicator color={COLOR.blue500} />
          <Text style={{ fontSize: 15, color: COLOR.blue500 }}>
            Loading... please wait
          </Text>
        </View>
      </Modal>
      {uri && (
        <WebView
          ref={webviewRef}
          onLoad={() => setloadComplete(true)}
          onNavigationStateChange={onNavigationStateChange}
          source={{ uri }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  animationContainer: {
    height: rh(100),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffffc7",
  },
});
export default PaymentWebviewScreen;
