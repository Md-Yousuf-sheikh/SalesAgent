import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Text from "../../../components/Text/Text";
import { Ionicons } from "@expo/vector-icons";
import { COLOR, rf, rh, ROW, rw } from "../../../theme/Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MediumButton from "../../../components/Buttons/MediumButton";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { useGetAQuoteMutation } from "../../../redux/features/policy/policyApiSlice";

import QuotationForm from "./QuoteForm";
import _ from "lodash";
import { isEmpty } from "../../../utils/validation";
import {
  codeSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";

export default function QuotationGeneratorModal({ setIsVisible, IsVisible }) {
  const navigation = useNavigation();
  const code = useSelector(codeSelector);
  const translate = useSelector(translateSelector);

  // get filed data
  const [RegisterMobil, setRegisterMobil] = useState("");
  const [PolicyId, setPolicyId] = useState("");
  const [PolicyType, setPolicyType] = useState("");
  const [PolicyHolderName, setPolicyHolderName] = useState("");
  const [DateOfBerth, setDateOfBerth] = useState("");
  //
  const [filedError, setFiledError] = useState(true);

  const [personalInfo, setPersonalInfo] = useState([{}]);
  const [errorCheck, setErrorCheck] = useState(false);

  const myData = useSelector((state) => state?.user?.myData);

  const [getQuotations, { isLoading, isSuccess }] = useGetAQuoteMutation();
  // const quoteForm = useSelector(state => state?.policy?.quoteForm)

  function handleNavigation(title) {
    navigation.navigate(title);
  }
  const handelSubmit = async () => {
    let data;
    if (personalInfo[0]?.dob) {
      data = {
        ...personalInfo[0],
        dob: personalInfo[0]?.dob?.split("-").reverse().join("-"),
        user_id: myData?.agent?.id,
      };
    } else {
      data = {
        ...personalInfo[0],
        user_id: myData?.agent?.id,
      };
    }

    console.log("data", personalInfo[0]);
    if (!isEmpty(personalInfo[0])) {
      try {
        const res = await getQuotations(data).unwrap();

        if (res?.data && res?.data?.length > 0) {
          console.log("dataOfResGeneratorModal", res);
          setIsVisible(false);
          navigation.navigate("SuggestedPolicy", {
            data: res?.data,
          });
        } else if (res?.data && res?.data?.length === 0) {
          // Toast.show('No insurance found for you', {
          //   duration: 1000,
          //   backgroundColor: 'rgba(51, 105, 179, 1)',
          //   shadow: true,
          //   position: rh(80),
          //   textColor: COLOR.white,
          //   opacity: 2,
          //   animation: true,
          // })
          Alert.alert(
            `Sorry no suggestions for you. Please try different categories`,
            "",
            [
              {
                text: "Ok",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ]
          );
        }
      } catch (error) {
        console.log("quoteError", error);
      }
    } else {
      Alert.alert(`Fill up the form`, "", [
        {
          text: "Ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    }
  };
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );

  return (
    <Modal transparent={true} visible={IsVisible} animationType="slide">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {/* header */}
        <View style={styles.header}>
          {/* Image */}
          <View style={ROW}>
            <Text preset="LL" style={styles.headerTitle}>
              {languageState.findBestSolutitle}
            </Text>
          </View>
          {/* Close Icon */}
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <Ionicons name="close-sharp" size={32} color="black" />
          </TouchableOpacity>
        </View>
        {/* body */}
        {/* Choose Gender */}
        {/* Inputs */}
        {/* <InputText
          setValue={setPolicyHolderName}
          placeholder={languageState.yourNamePlaceholder}
          markHide={true}
          error={filedError}
          style={{ marginBottom: rh(0) }}
        />
        <CustomGenderSelector />
        <ModernDatePicker
          placeholder={languageState.dateOfBirthPlaceholder}
          defaultValue={DateOfBerth}
          valueProps={value => {
            setDateOfBerth(value)
          }}
        />
        <IndependentPicker
          placeholder={languageState.occupationPlaceHolder}
          valueProps={setOccupation}
          selectItemId={setSelectItemId}
          error={filedError}
          data={occupationData}
          // data={}
        />
        <IndependentPicker
          placeholder={languageState.selectPolicyCategory}
          valueProps={setPolicyCategory}
          selectItemId={setSelectItemId}
          error={filedError}
          data={categoriesData}
          // data={}
        />
        <InputText
          setValue={setRegisterMobil}
          placeholder={'Total Coverage'}
          markHide={true}
          error={filedError}
        />
        <InputText
          setValue={setPolicyTerm}
          placeholder={languageState.policyTermTitle}
          markHide={true}
          error={filedError}
        />

     
        <IndependentPicker
          placeholder={'Term Type'}
          valueProps={setPolicyTermType}
          selectItemId={setSelectItemId}
          error={filedError}
          data={termData}
          // data={}
        />
        <IndependentPicker
          placeholder={languageState.selectFrequencyOfPayment}
          valueProps={setFrequency}
          selectItemId={setSelectItemId}
          error={filedError}
          data={paymentFrequency}
          dropTop={true}
          // data={}
        /> */}
        <QuotationForm
          personalInfo={personalInfo[0]}
          setPersonalInfo={setPersonalInfo}
          errorCheck={errorCheck}
          filedError={filedError}
          setFiledError={setFiledError}
          inputIndex={0}
          // stepIndiSecond={stepIndiSecond}
          // userInfo={userInfo}
          // sameAsCheck={sameAsCheck}
          // setsameAsCheck={setsameAsCheck}
          // TermAndConditionTow={TermAndConditionTow}
          // setTermAndConditionTow={setTermAndConditionTow}
          // category={item?.category}
        />

        <MediumButton
          loader={isLoading}
          title={languageState.findInsuranceButtonText}
          onPress={handelSubmit}
          stylesButton={{
            width: rw(90),
            marginBottom: 50,
            borderRadius: 30,
            paddingVertical: 15,
          }}
        />
      </KeyboardAwareScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: rw(4),
    paddingVertical: rh(4),
    // paddingBottom: rh(15),
    // width: rw(90),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 15,
    borderColor: "#E7E7E7",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: rf(2.55),
    fontWeight: "800",
    // marginLeft: 10,
  },
  headerImage: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  checkBox: {
    borderWidth: 2,
    width: 16,
    height: 16,
    alignItems: "baseline",
    justifyContent: "center",
    borderRadius: 2,
    marginRight: 5,
  },
  checkButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  genderSwitchContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
});

const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
];
