import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { CONTAINER, rh, rw } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import InputText from "../../../components/Inputs/InputText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MediumButton from "../../../components/Buttons/MediumButton";
import { useSelector } from "react-redux";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApiSlice";
import { languageSelector } from "../../../redux/features/language/languageSlice";
import useShowToastMessage from "../../../hooks/useShowToastMessage";

export default function ChangePassword() {
  const toast = useShowToastMessage();
  const [filedError, setFiledError] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const language = useSelector(languageSelector);

  const [changePass, { isLoading }] = useChangePasswordMutation();

  async function resetPass() {
    if (oldPassword && password && confirmPassword) {
      const data = {
        oldPassword: oldPassword,
        newPassword: password,
        confirmPassword: confirmPassword,
      };

      try {
        const res = await changePass(data).unwrap();
        toast(res?.message);
        //
        setFiledError(false);
        setPassword("");
        setConfirmPassword("");
        setOldPassword("");
      } catch (error) {
        toast(error?.data?.message);
        setFiledError(true);
      }
    } else {
      setFiledError(true);
    }
  }
  return (
    <>
      <DrawerHeader title={language.changePassHeader} />
      <KeyboardAwareScrollView
        style={[
          CONTAINER,
          {
            backgroundColor: "#fff",
          },
        ]}
      >
        <View style={styles.container}>
          <InputText
            label={language.oldPassPlaceholder}
            placeholder={language.oldPassPlaceholder}
            secureTextEntry={true}
            setValue={setOldPassword}
            value={oldPassword}
            type="password"
            error={filedError}
          />
          <InputText
            label={language.passWordPlaceHolderText}
            placeholder={language.passWordPlaceHolderText}
            secureTextEntry={true}
            setValue={setPassword}
            value={password}
            error={filedError}
          />
          <InputText
            label={language.confirmPassPlaceholder}
            placeholder={language.confirmPassPlaceholder}
            secureTextEntry={true}
            setValue={setConfirmPassword}
            value={confirmPassword}
            type="password"
            error={filedError}
          />

          <MediumButton
            loader={isLoading}
            onPress={() => resetPass()}
            title={language.changePassButtonText}
            stylesButton={{
              width: rw(90),
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingVertical: rh(2),
  },
  uploadButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginVertical: 15,
    borderColor: "#E5EAFF",
  },
});
