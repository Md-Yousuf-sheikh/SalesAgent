import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { rf, rh, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import MediumButton from "../../../components/Buttons/MediumButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  addBuyNow,
  setResetItemStateData,
} from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { moneyFormat, toBnNum } from "../../../utils";
import { setRestFormData } from "../../../redux/features/purchase/NomineeSlice";

export default function HeadCard({ item }) {
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const dispatch = useDispatch();
  //  user
  const { user, token } = useSelector((state) => state?.auth);
  const navigation = useNavigation();

  //  handel buy now button
  const handelBuy = () => {
    if (user) {
      dispatch(addBuyNow(item));
      dispatch(setRestFormData()); // to reset all form filed data
      dispatch(setResetItemStateData());
      // check id
      if (item?.category?.id?.toString() === "1") {
        navigation.navigate("UserInfoScreen");
      } else {
        navigation.navigate("PremiumCalculator");
      }
      //
    } else {
      navigation.navigate("SignInNumber");
    }
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.logoLink }} style={styles.cardImage} />
      <Text preset="SL" style={styles.title}>
        {item?.name ? item?.name : "N/A"}
      </Text>
      {/* name */}
      <Text preset="SL" style={styles.pName}>
        {language?.category} -{" "}
        <Text preset="SL" style={styles.pName} color={"#2253A5"}>
          {item?.category?.title ? item?.category?.title : "N/A"}
        </Text>
      </Text>
      {/* name */}
      <Text preset="SL" style={styles.pName}>
        {language?.coverageTitle} -{" "}
        <Text preset="SL" style={styles.pName} color={"#2253A5"}>
          {language?.bdt}{" "}
          {item?.total_coverage_amount
            ? toBnNum(moneyFormat(item?.total_coverage_amount), code)
            : "N/A"}
        </Text>
      </Text>
      {/* name */}
      <Text preset="SL" style={styles.pName}>
        {language?.premiumTitle} -{" "}
        <Text preset="SL" style={styles.pName} color={"#2253A5"}>
          {language?.bdt}{" "}
          {item?.premium_amount
            ? toBnNum(moneyFormat(item?.premium_amount), code)
            : "N/A"}
        </Text>
      </Text>
      {/*  */}
      <MediumButton
        title={language?.purchaseButtonText}
        stylesButton={styles.button}
        onPress={handelBuy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: rw(45),
    paddingBottom: rh(1),
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: rw(25),
    height: rw(15),
    resizeMode: "contain",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#dddddd6b",
    borderRadius: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: rf(1.85),
    lineHeight: 20,
  },
  pName: {
    fontWeight: "500",
    lineHeight: 20,
  },
  button: {
    width: rw(40),
    height: rh(5),
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: rh(1.2),
    backgroundColor: "#3369B3",
    elevation: 0.5,
    shadowColor: "#3369B3",
    alignSelf: "center",
  },
});
