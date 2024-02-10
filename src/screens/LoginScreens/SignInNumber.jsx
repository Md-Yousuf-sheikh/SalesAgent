import { StatusBar, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { COLOR, CONTAINER, rh, rw } from "../../theme/Theme";
import InputNumberPicker from "../../components/Inputs/InputNumberPicker";
import MediumButton from "../../components/Buttons/MediumButton";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginsHeaderSection from "../../components/Shared/LoginsHeaderSection";
import { useSelector } from "react-redux";
import { useSignInNumberMutation } from "../../redux/features/auth/authApiSlice";

import { languageSelector } from "../../redux/features/language/languageSlice";
import useShowToastMessage from "../../hooks/useShowToastMessage";


export default function SingInNumber() {
  const navigation = useNavigation();
  const language = useSelector(languageSelector);
  const toast = useShowToastMessage();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [signInWithNumber, { isLoading }] = useSignInNumberMutation();
  //  filed empty error
  const [filedError, setFiledError] = useState(false);

  //  handel
  const handelRequestOtp = async () => {
    if (valid) {
      let data = {
        mobileNumber: formattedValue.slice(1),
      };
      try {
        const res = await signInWithNumber(data).unwrap();
        setFiledError(false);
        toast(res?.message);
        navigation.navigate("PhoneOtpVer", {
          phone: data,
        });
        // filed error false
      } catch (error) {
        toast(error?.data?.message ?? error?.message, "error");
      }
    } else {
      //  filed error true
      setFiledError(true);
    }
  };
  //  sign In
  function signInWithPass() {
    navigation.navigate("SignInEmail");
  }

  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={CONTAINER}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={COLOR.white} />
      <View style={styles.container}>
        <>
          {/* <LanguageToggleButton /> */}
          <LoginsHeaderSection
            title={language.signIn}
            subText={language.signInDetailsText}
          />
          <InputNumberPicker
            setValue={setValue}
            setFormattedValue={setFormattedValue}
            formattedValue={formattedValue}
            valid={valid}
            setValid={setValid}
            containerMain={{
              marginTop: rh(2),
            }}
            value={value}
            filedError={filedError}
          />
          <MediumButton
            loader={isLoading}
            title={language.signInButtonText}
            onPress={handelRequestOtp}
            stylesButton={[
              {
                marginTop: rh(5.5),
                marginBottom: rh(1.2),
              },
            ]}
          />
        </>
        <View>
          {/* login button group */}
          <View style={styles.buttonContainer}>
            <MediumButton
              title={language.signInWithEmail}
              textStyle={styles.buttonPassSingText}
              stylesButton={styles.buttonPassSing}
              onPress={signInWithPass}
              // disabled={number === null ? true : false}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: rw(4),
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    // height: rh(6),
    alignItems: "center",
    // marginTop: rh(2.3),
    bottom: rh(1.5),
  },
  buttonPassSing: {
    backgroundColor: COLOR.blue10,
    // height: '100%',
    alignItems: "center",
    justifyContent: "center",

    // borderRadius: rh(1),
    // padding: rh(0.8),
    // marginRight: rh(0.8),
    // paddingHorizontal: 10,
  },
  buttonPassSingText: {
    color: COLOR.blue400,
  },
  buttonFbGm: {
    backgroundColor: COLOR.gray10,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: rh(1),
    padding: rh(0.8),
    marginRight: rh(0.8),
  },

  termTextContainer: {
    marginTop: rh(5.5),
  },
  termText: {
    textAlign: "center",
    fontSize: 14,
    color: COLOR.gray300,
  },
});
