import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { COLOR, CONTAINER, rh, ROW, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";
import InputNumberPicker from "../../components/Inputs/InputNumberPicker";
import MediumButton from "../../components/Buttons/MediumButton";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputText from "../../components/Inputs/InputText";
import LoginsHeaderSection from "../../components/Shared/LoginsHeaderSection";
import { useSelector } from "react-redux";
import { useResetPasswordMutation } from "../../redux/features/auth/authApiSlice";
import Toast from "react-native-root-toast";
import { languageSelector } from "../../redux/features/language/languageSlice";

const initialInputs = { email: "", password: "" };
const initialErrors = { email: "", password: "" };
export default function ResetPassword({ route }) {
  const navigation = useNavigation();
  const language = useSelector(languageSelector);
  const { email } = route?.params;
  const [number, setNumber] = useState(null);
  const [country, setCountry] = useState({});
  // error state
  const [filedError, setFiledError] = useState("");
  //  get input value
  //   const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(initialErrors);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  //  handel Sign In
  const handelSignIn = async () => {
    // setLoader(isLoading)
    if (password && confirmPassword) {
      // navigation.navigate('DrawerStack')
      const data = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      console.log("inputsM", inputs);
      try {
        const res = await resetPassword(data).unwrap();
        Toast.show(`${res?.message}`, {
          duration: 1500,
          backgroundColor: "blue",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
        // dispatch(successLogin())
        // fetchToken()
        // setLoader(isLoading)
        navigation.navigate("SignInEmail");
        setFiledError(false);
      } catch (error) {
        Toast.show(`${error?.data?.message}`, {
          duration: 1500,
          backgroundColor: "red",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
        console.log("signInErr", error);
      }
    } else {
      setFiledError(true);
      console.log("Error");
    }
    // setLoader(false)
  };
  // async function fetchToken() {
  //   await AsyncStorage.setItem('TOKEN', 'success')
  // }
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
          <LoginsHeaderSection
            title={"Change Password"}
            subText={"Enter New password"}
          />
          {/* Inputs */}
          <InputText
            placeholder={language.passWordPlaceHolderText}
            secureTextEntry={true}
            setValue={setPassword}
            type="password"
            error={filedError}
          />
          <InputText
            placeholder={language.confirmPassTitle}
            secureTextEntry={true}
            setValue={setConfirmPassword}
            type="password"
            error={filedError}
          />
          <MediumButton
            title={language.restPass}
            onPress={handelSignIn}
            loader={isLoading}
            stylesButton={[
              {
                marginTop: rh(4.8),
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
  },
});
