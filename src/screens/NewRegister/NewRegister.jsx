import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { COLOR, CONTAINER, rf, rh, ROW, RSC, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import InputText from "../../components/Inputs/InputText";
import MediumButton from "../../components/Buttons/MediumButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { useSignUpCustomerMutation } from "../../redux/features/auth/authApiSlice";
import { validationCheck } from "../../utils/validation";
import Toast from "react-native-root-toast";
import InputNumberPicker from "../../components/Inputs/InputNumberPicker";
import TypeDropDown from "../../components/Inputs/TypeDropDown";
import { languageSelector } from "../../redux/features/language/languageSlice";

const typeData = [
  {
    label: "B2C",
    value: "B2C",
  },
  {
    label: "B2B",
    value: "B2B",
  },
];

export default function NewRegister() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [filedError, setFiledError] = useState(false);

  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const phoneInput = useRef(null);

  const myInfo = useSelector((state) => state?.user?.myData);

  const [signUpCustomer, { isLoading }] = useSignUpCustomerMutation();

  const languageState = useSelector(languageSelector);
  //
  const handleSubmit = async () => {
    if (valid && validationCheck(email, "email")) {
      const data = {
        parentId: myInfo?.agent?.id,
        fullName: name,
        contactNumber: formattedValue?.slice(1),
        email: email,
        type: type?.value,
      };
      console.log("dataProps", data);

      // return;
      try {
        const res = await signUpCustomer(data).unwrap();
        console.log("hela", res);
        Toast.show(`${res?.message}`, {
          duration: 1500,
          backgroundColor: "rgba(51, 105, 179, 1)",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
        navigation.navigate("RegisteredCustomer");
        setContactNo("");
        setName("");
        setEmail("");
      } catch (error) {
        console.log("helaError", error?.data?.message);
        Toast.show(`${error?.data?.message}`, {
          duration: 1500,
          backgroundColor: "rgba(51, 105, 179, 1)",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
      }
    } else {
      setFiledError(true);
    }
  };
  //

  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={languageState.newRegisterHeader} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={[
          CONTAINER,
          {
            backgroundColor: "#ffffff",
          },
        ]}
      >
        <View style={styles.container}>
          <InputText
            value={name}
            label={languageState.nameTitle}
            setValue={setName}
            markHide={true}
            error={filedError}
          />

          {/* <View
            style={{
              flexDirection: 'row',
              // height: rh(6.5),

              // alignItems: 'center',
              borderWidth: rh(0.1),
              borderColor: filedError ? '#EB4849' : COLOR.blue200,
              borderRadius: rh(1.1),
              // paddingHorizontal: rh(0.5),
              // paddingVertical: rh(0.2),
            }}
          >
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="BD"
              layout="first"
              onChangeText={text => {
                console.log('textNow', text)
                if (text.length < 11) {
                  setValue(text)
                }
              }}
              onChangeFormattedText={text => {
                console.log('formattedText', text.length)
                if (text.length < 11) {
                  setFormattedValue(text)
                }
              }}
              containerStyle={{
                height: rh(6),
                // width: '100%',
                // borderWidth: rh(0.11),
                // borderColor: COLOR.blue200,
                borderRadius: rh(1.1),
                // alignItems: 'center',
                // justifyContent: 'center',
                // paddingRight: rw(2),
                // flexDirection: 'row',
                backgroundColor: COLOR.blue100,
              }}
              textContainerStyle={{
                // alignItems: 'center',
                // backgroundColor: 'red',
                // width: '60%',
                paddingTop: rh(1.4),
                // justifyContent: 'center',
                fontSize: rf(1.9),
                backgroundColor: COLOR.white,
              }}
              textInputProps={{ maxLength: 10 }}
              // withDarkTheme
              // withShadow
              // autoFocus
            />
            <View style={styles.markIcon}>
              <SvgMarkIcon
                fill={
                  !filedError
                    ? value
                      ? phoneInput.current.isValidNumber(value) === true
                        ? COLOR.green800
                        : COLOR.buttonDisable
                      : COLOR.buttonDisable
                    : '#EB4849'
                }
              />
            </View>
          </View> */}
          {/* <InputText
            value={contactNo}
            label={languageState.contactNoTextInput}
            setValue={setContactNo}
            type={'number'}
            error={filedError}
          /> */}

          <InputNumberPicker
            label={languageState.contactNoTextInput}
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

          <InputText
            value={email}
            label={languageState.emailTextInput}
            setValue={setEmail}
            type={"email"}
            error={filedError}
            customStyle={{ marginTop: rh(5) }}
          />

          <TypeDropDown
            data={typeData}
            type={type}
            setType={setType}
            errorCheck={filedError}
            required={"1"}
            label={languageState.typetitle}
            placeholder={languageState.typetitle}
          />

          <MediumButton
            loader={isLoading}
            onPress={handleSubmit}
            textStyle={{ fontSize: rf(2.2) }}
            stylesButton={{
              width: "100%",
              height: rh(6),
              // marginBottom: 25,
              // elevation: 2,
              backgroundColor: COLOR.blue600,
              paddingVertical: rh(1),
              // alignSelf: 'flex-end',
              // bottom: 0,
              // marginTop: rh(10),
            }}
            title={languageState.submitButtonText}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingTop: 10,
    marginBottom: rh(8),
  },
  markIcon: {
    position: "absolute",
    alignSelf: "center",
    right: rh(1.2),
    zIndex: 5,
  },
  scrollButton: {
    height: rh(2.3),
    width: rw(4),
    backgroundColor: "#1691CE",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: rh(1),
    borderRadius: rh(0.3),
  },
  addButton: {
    width: rw(33),
    borderRadius: rh(3),
    backgroundColor: COLOR.white,
    borderColor: COLOR.bluishCyan700,
    borderWidth: rh(0.1),
    height: rh(5),
    paddingVertical: rh(1),
    marginVertical: rh(0),
  },
  textStyle: {
    fontSize: 16,
    color: COLOR.blue600,
  },
  //
  activityButtons: {
    width: rw(90),
    height: rh(6.5),
    borderRadius: rh(0.8),
    borderWidth: rh(0.1),
    borderColor: "#E5EAFF",
    alignSelf: "center",
    marginVertical: rh(1),
    alignItems: "center",
    paddingHorizontal: rh(1.5),
    paddingVertical: rh(1),
    flexDirection: "row",
    // justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchFilterContainer: {
    paddingVertical: rh(2.5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInputContainer: {
    flexDirection: "row",
  },
  searchInput: {
    borderWidth: 1,
    height: 46,
    borderColor: "#E5EAFF",
    borderRadius: rh(1),
    width: rw(60),
    paddingHorizontal: 10,
    fontSize: 12,
  },
  searchInputButton: {
    borderWidth: 1,
    height: 46,
    borderColor: "#E5EAFF",
    paddingRight: 8,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  flexDirection: "row",
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0099C9",
    height: 46,
    borderRadius: 3,
    width: rw(25),
    justifyContent: "center",
  },
});
