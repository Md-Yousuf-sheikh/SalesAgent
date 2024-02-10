import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, CONTAINER, rh, ROW, RSC, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";
import { OTP } from "react-native-otp-form";
import MediumButton from "../../components/Buttons/MediumButton";
import LoginsHeaderSection from "../../components/Shared/LoginsHeaderSection";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useSignInNumberMutation,
  useVerifyOTPMutation,
} from "../../redux/features/auth/authApiSlice";

import useShowToastMessage from "../../hooks/useShowToastMessage";
import { languageSelector } from "../../redux/features/language/languageSlice";

export default function PhoneOtpVerification({ route }) {
  const { phone, country } = route?.params;
  const language = useSelector(languageSelector);
  const [otp, setOtp] = useState(null);
  const [minutes, setMinutes] = useState(2);
  const [filedError, setFiledError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [ReSent, setReSent] = useState(false);
  const dispatch = useDispatch();
  const toast = useShowToastMessage();

  const [verifyOtp, { isLoading }] = useVerifyOTPMutation();

  const [signInWithNumber, { isLoading: numberLoading }] =
    useSignInNumberMutation();

  const handelRequestOtp = async () => {
    if (route?.params?.phone) {
      try {
        const res = await signInWithNumber(route?.params?.phone).unwrap();
        setFiledError(false);
        toast(res?.message);
      } catch (error) {
        toast(error?.data?.message, "error");
        console.log("errOfOTP", error);
      }
    } else {
      //  filed error true
      setFiledError(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, ReSent]);
  //  handel
  const handelVerify = async () => {
    if (otp?.length <= 3) {
      setFiledError(true);
    } else {
      setFiledError(false);
      let data = {
        otp: otp,
      };
      try {
        const userData = await verifyOtp(data).unwrap();
        const { user, token } = await userData;
        console.log("userData", userData);
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("user", JSON.stringify(user));
        dispatch(setCredentials({ token: token, user: user }));
        console.log("userData", userData);
        toast("Login Sucssfull");
        setFiledError(false);
      } catch (error) {
        console.log("signInErr", error);
        toast(error?.data?.message, "error");
      }
    }
  };
  //
  useEffect(() => {
    if (otp?.length == 4 && seconds <= 0 && minutes <= 0) {
      setFiledError(true);
    } else {
      setFiledError(false);
    }
  }, [otp]);

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
            title={language.otpVerificationTitle}
            subText={language.otpDetailText}
            subTextB={{
              marginBottom: rh(1),
            }}
          />
          <Text preset="h5" style={styles.number}>
            {"+"}
            {phone?.mobileNumber}
          </Text>
        </>
        <OTP
          codeCount={4}
          number={true}
          containerStyle={{ marginTop: rh(0.9) }}
          otpStyles={[
            styles.otpInputStyle,
            filedError && {
              borderColor: "red",
            },
          ]}
          onTyping={(item) => {
            setOtp(item);
          }}
          keyboardType={"number-pad"}
        />
        <Text preset="h4" style={styles.expireTime}>
          {seconds > 0 || minutes > 0 ? (
            <Text preset="h4" style={styles.expireTime}>
              {language.expireText}
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          ) : (
            <View style={RSC}>
              <Text preset="h4">{language.otpResent}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setMinutes(2);
                  setReSent(true);
                  handelRequestOtp();
                }}
              >
                <Text> Re-sent</Text>
              </TouchableOpacity>
            </View>
          )}
        </Text>
        <MediumButton
          // stylesButton={[
          //   otp?.length <= 4 && {
          //     backgroundColor: COLOR.buttonDisable,
          //   },
          //   !(seconds > 0 || minutes > 0) && {
          //     backgroundColor: COLOR.buttonDisable,
          //   },
          // ]}
          title={language.verifyButtonText}
          // disabled={
          //   otp?.length <= 4 || seconds <= 0 || minutes <= 0 ? true : false
          // }
          onPress={handelVerify}
          loader={isLoading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
  },
  number: {
    marginTop: rh(2),
    alignSelf: "center",
    letterSpacing: 1.5,
    color: COLOR.gray400,
    fontWeight: "300",
    marginBottom: rh(1.2),
  },
  // otpInputStyle
  otpInputStyle: {
    borderColor: COLOR.blue600,
    color: COLOR.gray400,
    maxHeight: rh(7),
    borderWidth: 0,
    borderBottomWidth: 3,
    borderRadius: 1,
  },
  expireTime: {
    alignSelf: "center",
    color: "#595959",
    marginTop: rh(2.4),
  },
});
