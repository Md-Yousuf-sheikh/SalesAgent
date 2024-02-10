import { StatusBar, StyleSheet, View, BackHandler } from "react-native";
import React, { useState } from "react";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { COLOR, CONTAINER, rf, rh, RSC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import MediumButton from "../../../components/Buttons/MediumButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { OTP } from "react-native-otp-form";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import PremiumAmountModal from "./PremiumAmountModal";
import { categoriesData } from "../../../dummy/DummyData";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import ModernDatePicker from "../../../components/Inputs/ModernDatePicker";
import CustomSinglPicker from "../../../components/Inputs/CustomSinglPicker";
import { setAllCategories } from "../../../redux/features/policy/policySlice";
import {
  useLazyGetAllCategoriesQuery,
  useLazyGetPoliciesByCatQuery,
  useLazyGetPurchaseFormsBypidQuery,
} from "../../../redux/features/policy/policyApiSlice";
import { useRef } from "react";
import FormInputText from "../../../components/Inputs/FormInputText";
import Toast from "react-native-root-toast";
import { useCalculatePremiumMutation } from "../../../redux/features/premiumCal/premiumCalApiSlice";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function IndependentPremiumCal({}) {
  //   const { image } = route?.params?.item ? route?.params?.item : null
  const language = useSelector(languageSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // open modal
  const [Modal, setModal] = useState(false);

  const [gender, setGender] = useState("");
  const [policy, setPolicy] = useState([{}]);
  const [policyCategory, setPolicyCategory] = useState([{}]);
  const [selectItemId, setSelectItemId] = useState();
  const [selectedPolicyId, setSelectedPolicyId] = useState();
  const [premiumCal, setpremiumCal] = useState([]);
  const [premiumCalFile, setpremiumCalFile] = useState([{}]);
  const [policyItem, setPolicyItem] = useState([]);
  const [premiumVal, setPremiumVal] = useState();
  const [allCategoriesDatas, setAllCategoriesDatas] = useState([]);

  //
  const [isChecked, setChecked] = useState(true);
  //
  const [filedError, setFiledError] = useState(false);
  const [compareModal, setCompareModal] = useState(false);
  const [errorCheck, setErrorCheck] = useState(false);

  const categoriesPicker = useRef([]);
  const policyPicker = useRef([]);
  const validation = useRef();
  // handelSubmit
  const coverageData =
    selectItemId &&
    selectedPolicyId &&
    categoriesData[selectItemId - 1].policyList[selectedPolicyId - 1].coverage;

  const imageData =
    selectItemId && selectedPolicyId && categoriesData[selectItemId - 1]?.image;

  const langDetails = useSelector(
    (state) => state?.language.language.finalLanguage
  );
  const allCategoriesData = useSelector(
    (state) => state?.policy?.allCategoriesDatas
  );

  const [getAllCat, { isLoading }] = useLazyGetAllCategoriesQuery();
  const [fetchPolicy, { isLoading: isPolicyLoading }] =
    useLazyGetPoliciesByCatQuery();

  const [fetchPremiums, { isLoading: premiumLoading }] =
    useLazyGetPurchaseFormsBypidQuery();

  const [calculatePremium, { isLoading: calPremLoading }] =
    useCalculatePremiumMutation();
  //

  useEffect(() => {
    async function getAllCate() {
      try {
        const res = await getAllCat([langDetails?.code]).unwrap();
        // console.log("6666-----", res);
        dispatch(setAllCategories(res));
      } catch (error) {}
    }
    getAllCate();
  }, [langDetails]);

  useEffect(() => {
    if (allCategoriesData?.length > 0) {
      for (let item of allCategoriesData) {
        //  only health remove
        if (item?.id?.toString() !== "1") {
          const data = {
            value: item?.slug,
            label: item?.title,
          };
          categoriesPicker.current.push(data);
        }
      }
    }
  }, [allCategoriesData]);

  useEffect(() => {
    const fetchPolicies = async () => {
      policyPicker.current = [];
      setPolicy([{}]);
      console.log("policyCategory[0]?.category", premiumCal);
      try {
        const res = await fetchPolicy([
          policyCategory[0]?.category,
          langDetails?.code,
        ]).unwrap();
        console.log("fetchPolicies", res);
        setPolicyItem(res);
        for (let item of res) {
          const data = {
            value: item?.slug,
            label: item?.name,
          };
          policyPicker.current.push(data);
        }
      } catch (error) {
        // console.log("errorPol", error?.data?.message);
      }
      setpremiumCal([]);
      setpremiumCalFile([{}]);
    };
    if (Object.keys(policyCategory[0])?.length > 0) {
      fetchPolicies();
    }
  }, [policyCategory]);

  useEffect(() => {
    const fetchPremium = async () => {
      try {
        const res = await fetchPremiums([
          policy[0]?.slug,
          4,
          langDetails?.code,
        ]).unwrap();
        console.log("fetchPremiums", res);
        // premiumCal.current = res['']
        setpremiumCal(res[""]);
      } catch (error) {
        console.log("errorPrem", error);
      }
    };
    if (
      Object.keys(policyCategory[0])?.length > 0 &&
      Object.keys(policy[0])?.length > 0
    ) {
      fetchPremium();
    }
  }, [policyCategory, policy]);

  const handelCalculatePremium = async () => {
    // setFiledError(true);
    const data = {
      ...premiumCalFile[0],
      slug: policy[0]?.slug,
    };
    console.log("premData", data);
    setErrorCheck(true);
    console.log("premIumCCC", premiumCal);
    for (let item of premiumCal) {
      if (item?.field_required === "1") {
        if (Object.keys(premiumCalFile[0])?.length > 0) {
          for (let nitem of premiumCalFile) {
            if (
              nitem[item?.field_name] === undefined ||
              nitem[item?.field_name] === null ||
              nitem[item?.field_name] === ""
            ) {
              validation.current = true;
              break;
            } else {
              validation.current = false;
            }
          }
        } else {
          validation.current = true;
        }
      }
      if (validation.current) {
        break;
      }
    }
    if (!validation.current) {
      if (
        Object.keys(policyCategory[0])?.length < 1 ||
        Object.keys(policy[0])?.length < 1
      ) {
        validation.current = true;
      }
    }
    if (!validation.current) {
      try {
        const res = await calculatePremium(data).unwrap();

        setPremiumVal(res?.data);

        console.log("premium", res);
        setModal(true);
      } catch (error) {
        Toast.show(`${error?.data?.message}`, {
          duration: 1000,
          backgroundColor: "red",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
        console.log("err", error?.data);
      }
      setErrorCheck(false);
    } else {
      Toast.show("Please fill up required fields", {
        duration: 1000,
        backgroundColor: "red",
        shadow: true,
        position: rh(80),
        textColor: COLOR.white,
        opacity: 2,
        animation: true,
      });
    }
  };

  // const navigation = useNavigation()
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  const handleBackButtonClick = () => {
    if (prevRoute?.name) {
      navigation.navigate(prevRoute);
    } else {
      navigation.navigate("Home", "HomeStack");
    }
    return true;
  };

  const handelOnChange = (text, input) => {
    setpremiumCalFile((prevState) => {
      return prevState.map((prevInput, prevInputIndex) =>
        prevInputIndex === 0
          ? {
              ...prevInput,
              [input]: text,
            }
          : { ...prevInput }
      );
    });
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  //
  console.log("policy", policy);
  return (
    <>
      {/* <CompareModal modal={compareModal} setModal={setCompareModal} /> */}
      {/* <PremiumAmountModal
        setModal={setModal}
        modal={Modal}
        // setCompareModal={setCompareModal}
        // compareModal={compareModal}
        item={null}
      /> */}
      <PremiumAmountModal
        setModal={setModal}
        modal={Modal}
        compareModal={compareModal}
        setCompareModal={setCompareModal}
        item={
          policyItem
            ? policyItem?.filter((item) => item?.slug === policy[0]?.slug)[0]
            : null
        }
        premiumVal={premiumVal}
      />
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language.premiumCalHeader} test={"independent"} />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={CONTAINER}
      >
        {/* Content */}
        <View style={styles.container}>
          <Text preset="h5" color={"#595959"} style={styles.smallText}>
            {language.premiumCalDetailText}
          </Text>
          <CustomSinglPicker
            label={"Policy Category"}
            placeholder={"Policy Category"}
            data={categoriesPicker.current.slice(0, 4)}
            filedError={filedError}
            setFiledError={setFiledError}
            required={"1"}
            errorCheck={errorCheck}
            setPersonalInfo={setPolicyCategory}
            personalInfo={policyCategory[0]}
            valueProps={setGender}
            inputText={"category"}
            inputIndex={0}
          />
          {policyCategory[0] && Object.keys(policyCategory[0])?.length > 0 && (
            <CustomSinglPicker
              // key={index}
              label={"Policy Name"}
              placeholder={"Policy Name"}
              data={policyPicker.current}
              filedError={filedError}
              setFiledError={setFiledError}
              required={"1"}
              errorCheck={errorCheck}
              setPersonalInfo={setPolicy}
              personalInfo={policy[0]}
              valueProps={setGender}
              inputText={"slug"}
              inputIndex={0}
            />
          )}
          <View>
            {premiumLoading ? (
              <Text>Loading</Text>
            ) : (
              Object.keys(policyCategory[0])?.length > 0 &&
              Object.keys(policy[0])?.length > 0 &&
              premiumCal &&
              premiumCal?.map((item, index) => {
                return item?.field_type === "text" ||
                  item?.field_type === "number" ? (
                  <FormInputText
                    key={index}
                    label={item?.field_title}
                    placeholder={item?.field_placeholder}
                    markHide={true}
                    value={premiumCalFile[0][item?.field_name]}
                    // value={personalInfo?.policy_holder_name}
                    onChangeText={(text) =>
                      handelOnChange(text, item?.field_name)
                    }
                    filedError={filedError}
                    setFiledError={setFiledError}
                    required={item?.field_required}
                    errorCheck={errorCheck}
                    item={item}
                    setPersonalInfo={setpremiumCalFile}
                    inputIndex={0}
                    // TermAndConditionTow={TermAndConditionTow}
                    // userInfo={userInfo}
                  />
                ) : item?.field_type === "date" ? (
                  <ModernDatePicker
                    key={index}
                    label={item.field_title}
                    placeholder={item.field_placeholder}
                    defaultValue={premiumCalFile[0][item?.field_name]}
                    required={item?.field_required}
                    error={errorCheck}
                    valueProps={(value) => {
                      handelOnChange(value, item.field_name);
                    }}
                    setPersonalInfo={setpremiumCalFile}
                    inputIndex={index}
                    inputText={item?.field_name}
                    filedError={errorCheck}
                    // userInfo={userInfo}
                  />
                ) : (
                  item?.field_type === "select" && (
                    <CustomSinglPicker
                      key={index}
                      label={item?.field_title}
                      placeholder={item?.field_placeholder}
                      data={item?.field_options}
                      filedError={filedError}
                      setFiledError={setFiledError}
                      required={item?.field_required}
                      errorCheck={errorCheck}
                      setPersonalInfo={setpremiumCalFile}
                      personalInfo={premiumCalFile[0]}
                      valueProps={setGender}
                      inputText={item?.field_name}
                      inputIndex={0}
                      item={item}
                      index={index}
                    />
                  )
                );
              })
            )}
          </View>

          {/* Check box */}
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#2253A5" : undefined}
            />
            <Text preset="h5" color={"#646464"} style={styles.smallText}>
              {language.acceptedTermsText}
            </Text>
          </View>
          <MediumButton
            title={language.calculateButtonText}
            onPress={handelCalculatePremium}
            stylesButton={{
              width: rw(90),
              marginBottom: rh(4.2),
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
    paddingVertical: rh(1.7),
    paddingBottom: rh(9),
    // flex: 1,
  },
  title: {
    fontSize: rf(2.6),
    // lineHeight: rh(4),
  },
  subTitle: {
    lineHeight: 25,
    fontSize: 15,
  },
  smallText: {
    lineHeight: rh(2.6),
    fontWeight: "400",
    width: "93%",
    marginBottom: rh(1.6),
    fontSize: rf(1.7),
    marginTop: rh(0.4),
  },
  // check box
  section: {
    flexDirection: "row",
    paddingTop: rh(1.8),
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: rh(0.8),
    width: rh(2.2),
    height: rh(2.2),
  },
});
const genderData = [
  {
    id: 1,
    title: "Male",
  },
  {
    id: 2,
    title: "Female",
  },
];
const insurerList = [
  {
    id: 1,
    title: "Guardian Life Insurance",
  },
  {
    id: 2,
    title: "Mobile/Tab Coverage",
  },
];
const durationData = [
  {
    id: 1,
    title: 1,
  },
  {
    id: 2,
    title: 2,
  },
  {
    id: 3,
    title: 3,
  },
  {
    id: 4,
    title: 4,
  },
  {
    id: 5,
    title: 5,
  },
  {
    id: 6,
    title: 6,
  },
  {
    id: 7,
    title: 7,
  },
  {
    id: 8,
    title: 8,
  },
  {
    id: 9,
    title: 9,
  },
  {
    id: 10,
    title: 10,
  },
  {
    id: 11,
    title: 11,
  },
  {
    id: 12,
    title: 12,
  },
  {
    id: 13,
    title: 13,
  },
  {
    id: 14,
    title: 14,
  },
  {
    id: 15,
    title: 15,
  },
  {
    id: 16,
    title: 16,
  },
  {
    id: 17,
    title: 17,
  },
  {
    id: 18,
    title: 18,
  },
  {
    id: 19,
    title: 19,
  },
  {
    id: 20,
    title: 20,
  },
  {
    id: 20,
    title: 20,
  },
  {
    id: 21,
    title: 21,
  },
  {
    id: 22,
    title: 22,
  },
  {
    id: 23,
    title: 23,
  },
];
