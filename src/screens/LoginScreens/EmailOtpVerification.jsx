import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, CONTAINER, HEIGHT, rh, ROW, RSC, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";
import { OTP } from "react-native-otp-form";
import MediumButton from "../../components/Buttons/MediumButton";
import LoginsHeaderSection from "../../components/Shared/LoginsHeaderSection";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useVerifyOTPMutation } from "../../redux/features/auth/authApiSlice";
import Toast from "react-native-root-toast";
import { languageSelector } from "../../redux/features/language/languageSlice";

export default function EmailOtpVerification({ route }) {
  const navigation = useNavigation();
  const language = useSelector(languageSelector);
  const { email } = route?.params;
  const [otp, setOtp] = useState(null);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [ReSent, setReSent] = useState(false);
  //
  const [filedError, setFiledError] = useState("");

  const [verifyOtp, { isLoading }] = useVerifyOTPMutation();

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
      setReSent(false);
    };
  }, [seconds, ReSent]);
  //  handel v
  const handelVerify = async () => {
    if (otp?.length <= 3) {
      setFiledError(true);
    } else {
      let otpString = otp?.toString();
      const data = {
        otp: otpString,
      };
      console.log("otp", data);
      try {
        const res = await verifyOtp(data).unwrap();
        console.log("verifyAll", res);
        // Toast.show(res?.message, Toast.LONG)
        Toast.show(`${res?.message}`, {
          duration: 1500,
          backgroundColor: "rgba(51, 105, 179, 1)",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
        setFiledError(false);
        navigation.navigate("ResetPassword", {
          email: email,
        });
      } catch (error) {
        // Toast.show(error?.data?.message, Toast.SHORT)
        Toast.show(`${error?.data?.message}`, {
          duration: 1500,
          backgroundColor: "red",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
        console.log("error", error);
        setFiledError(true);
      }
      // setFiledError(false)
      // console.log("Success");
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
      style={[
        CONTAINER,
        {
          minHeight: HEIGHT,
        },
      ]}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={COLOR.white} />
      <View style={styles.container}>
        <>
          {/* <LanguageToggleButton /> */}
          <LoginsHeaderSection
            title={language.otpVerificationTitle}
            subText={language.otpEmailDetailText}
            subTextB={{
              marginBottom: rh(1),
            }}
          />
          <Text preset="h5" style={styles.number}>
            {email}
          </Text>
        </>
        <OTP
          codeCount={4}
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
              {seconds < 10 ? `0${seconds}` : seconds} minutes
            </Text>
          ) : (
            <View style={RSC}>
              <Text preset="h4">{language.otpResent}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setMinutes(2);
                  setReSent(true);
                }}
              >
                <Text> Re-sent</Text>
              </TouchableOpacity>
            </View>
          )}
        </Text>
        <MediumButton
          loader={isLoading}
          title={language.verifyButtonText}
          onPress={handelVerify}
        />
      </View>
      {/* <LoginsFooter /> */}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
  },
  number: {
    marginTop: rh(2.5),
    alignSelf: "center",
    // letterSpacing: 1.5,
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
    marginTop: rh(2.7),
  },
});
