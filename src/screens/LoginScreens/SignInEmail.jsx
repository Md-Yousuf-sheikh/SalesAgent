import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLOR, CONTAINER, rh, ROW, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";
import MediumButton from "../../components/Buttons/MediumButton";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputText from "../../components/Inputs/InputText";
import LoginsHeaderSection from "../../components/Shared/LoginsHeaderSection";
import { useSelector } from "react-redux";
import { useSignInEmailMutation } from "../../redux/features/auth/authApiSlice";
import { validationCheck } from "../../utils/validation";
import Toast from "react-native-root-toast";
import { languageSelector } from "../../redux/features/language/languageSlice";
import useShowToastMessage from "../../hooks/useShowToastMessage";
import { useSendPushNotificationsMutation } from "../../redux/features/customer/customerApiSlice";

export default function SingInEmail() {
  // Hooks
  const toast = useShowToastMessage();
  const navigation = useNavigation();
  const languageState = useSelector(languageSelector);

  // error state
  const [filedError, setFiledError] = useState("");
  //  get input value
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  API
  const [signInEmail, { isLoading }] = useSignInEmailMutation();

  //
  const handelSignIn = async () => {
    // setLoader(isLoading)
    if (
      validationCheck(email, "email") &&
      validationCheck(password, "password")
    ) {
      const data = {
        email: email,
        password: password,
      };
      //
      try {
        const res = await signInEmail(data).unwrap();
        toast(res?.message);
        setFiledError(false);
      } catch (error) {
        console.log("error", error);
        toast(error?.data?.message ?? error?.message, "error");
      }
    } else {
      setFiledError(true);
      // console.log('Error')
    }
    // setLoader(false)
  };

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
            title={languageState.signInWithEmail}
            subText={languageState.signInWithEmailDetailText}
          />
          {/* Inputs */}

          <InputText
            placeholder={languageState.emailPlaceHolderText}
            value={email}
            setValue={setEmail}
            type="email"
            error={filedError}
          />
          <InputText
            placeholder={languageState.passWordPlaceHolderText}
            secureTextEntry={true}
            value={password}
            setValue={setPassword}
            type="password"
            error={filedError}
          />
          <TouchableOpacity
            style={styles.forgetButton}
            onPress={() => {
              navigation.navigate("ForgetPassword");
            }}
          >
            <Text preset="SL" color={COLOR.bluishCyan700}>
              {languageState.forgotPassText}
            </Text>
          </TouchableOpacity>
          {/* <View style={styles.termTextContainer}>
            <Text preset="h4" style={styles.termText}>
              By clicking Sign In I agree to Waadaa.Insure{' '}
            </Text>
            <TouchableOpacity>
              <Text
                preset="h4"
                style={[styles.termText, { color: COLOR.bluishCyan700 }]}
              >
                Terms and Condition
              </Text>
            </TouchableOpacity>
          </View> */}
          <MediumButton
            title={languageState.signInButtonText}
            onPress={handelSignIn}
            loader={isLoading}
            // disabled={password === null || email === null ? true : false}
            stylesButton={[
              {
                marginTop: rh(5),
              },
              password === null ||
                (email === null &&
                  {
                    // backgroundColor: COLOR.buttonDisable,
                  }),
            ]}
          />
        </>
      </View>
      {/* <LoginsFooter /> */}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    justifyContent: "space-between",
    paddingHorizontal: rw(4),
    flex: 1,
  },
  termTextContainer: {
    marginTop: rh(4),
  },
  termText: {
    textAlign: "center",
    fontSize: 14,
    color: COLOR.gray300,
  },
  forgetButton: {
    alignSelf: "center",
    marginTop: rh(0.5),
  },
});
