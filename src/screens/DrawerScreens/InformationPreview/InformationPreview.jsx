import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { useSelector } from "react-redux";
import { currentBuySelector } from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import { useGetPurchaseFormQuery } from "../../../redux/features/policy/policyApiSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { CONTAINER, ROW, rf, rh, rw } from "../../../theme/Theme";
import FormStepProgress from "../../../components/Buttons/FormStepProgress";
import NomineeInfoPreview from "../../../components/core/infoPreview/NomineeInfoPreview";
import TravelInfoPreview from "../../../components/core/infoPreview/TravelInfoPreview";
import MotorInfoPreview from "../../../components/core/infoPreview/MotorInfoPreview";
import DeviceInfoPreview from "../../../components/core/infoPreview/DeviceInfoPreview";
import PersonalInfoPreview from "../../../components/core/infoPreview/PersonalInfoPreview";
import Checkbox from "expo-checkbox";
import Text from "../../../components/Text/Text";
import CurrencyFormat from "../../../components/Shared/CurrencyFormat";
import NextButton from "../../../components/Buttons/NextButton";
import { useNavigation } from "@react-navigation/native";
import {
  selectDeviceInformation,
  selectMemberInformation,
  selectMotorInfoData,
  selectNomineeInformation,
  selectPersonalInformation,
  selectTravelInformation,
} from "../../../redux/features/purchase/NomineeSlice";
import RenderHTML from "react-native-render-html";
import { ToEnNum } from "../../../components/Helper/Helper";

export default function InformationPreview() {
  const code = useSelector(codeSelector);
  const language = useSelector(languageSelector);
  const currentItem = useSelector(currentBuySelector);
  // purchase Form
  const { data: purchaseForm, isLoading } = useGetPurchaseFormQuery({
    slug: currentItem?.slug,
    type: 2,
    code,
  });

  //  all information
  const personalInformation = useSelector(selectPersonalInformation);
  const nomineeInformation = useSelector(selectNomineeInformation);
  const memberInformation = useSelector(selectMemberInformation);
  const travelInformation = useSelector(selectTravelInformation);
  const deviceInformation = useSelector(selectDeviceInformation);
  const motorInformation = useSelector(selectMotorInfoData);

  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language.informationPreviewHeader} />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={CONTAINER}
        contentContainerStyle={{
          paddingHorizontal: rw(2),
          paddingBottom: rh(8),
        }}
      >
        {/* Form Step Progress */}
        <FormStepProgress item={currentItem} current={3} />
        {/* Policy Details */}
        <PolicyDetails item={currentItem} />

        {/* Personal Information   */}
        {currentItem?.category?.id?.toString() !== "5" && (
          <PersonalInfoPreview
            data={purchaseForm?.data?.Nominee_Information}
            filedData={personalInformation}
          />
        )}

        {/* Health or Life or travel or device   */}
        {(currentItem?.category?.id?.toString() === "1" ||
          currentItem?.category?.id?.toString() === "4") && (
          <NomineeInfoPreview
            data={purchaseForm?.data?.Nominee_Information}
            nomineeInfo={nomineeInformation || []}
            memberInfo={memberInformation || []}
          />
        )}
        {/* Travel Information  */}
        {currentItem?.category?.id?.toString() === "2" && (
          <TravelInfoPreview
            data={purchaseForm?.data?.Travel_Information}
            travelInfo={travelInformation}
          />
        )}
        {/* Motor Information  */}
        {currentItem?.category?.id?.toString() === "5" && (
          <MotorInfoPreview
            data={purchaseForm?.data?.[""]}
            motorInfo={motorInformation}
          />
        )}
        {/* Device  */}
        {currentItem?.category?.id?.toString() === "3" && (
          <DeviceInfoPreview
            data={purchaseForm?.data?.Device_Information}
            deviceInfo={deviceInformation}
          />
        )}
        {/* Team and condition */}
        <CheckTermBox currentItem={currentItem} />
      </KeyboardAwareScrollView>
    </>
  );
}

const CheckTermBox = ({ currentItem }) => {
  const navigation = useNavigation();
  // console.log("currentItem?.category", currentItem?.category?.declaration1);
  const [declaration1, setDeclaration1] = useState(false);
  const [declaration2, setDeclaration2] = useState(false);
  //
  const isButtonDisabled =
    (currentItem?.category?.declaration1 !== "" &&
      currentItem?.category?.declaration1 &&
      !declaration1) ||
    (currentItem?.category?.declaration2 !== "" &&
      currentItem?.category?.declaration2 &&
      !declaration2);

  return (
    <>
      <View>
        {/*  */}
        {currentItem?.category?.declaration1 !== "" &&
          currentItem?.category?.declaration1 && (
            <TouchableOpacity
              onPress={() => {
                setDeclaration1((prv) => !prv);
              }}
              activeOpacity={1}
              style={styles.section}
            >
              <Checkbox
                style={styles.checkbox}
                value={declaration1}
                color={declaration1 ? "#3182CE" : undefined}
              />
              <View
                style={{
                  marginTop: 2,
                  maxWidth: rw(80),
                }}
              >
                <RenderHTML
                  source={{
                    html: `<div style="color:#4A4A4A" >${currentItem?.category?.declaration1}</div>`,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}

        {currentItem?.category?.declaration1 !== "" &&
          currentItem?.category?.declaration2 && (
            <TouchableOpacity
              onPress={() => {
                setDeclaration2((prv) => !prv);
              }}
              activeOpacity={1}
              style={styles.section}
            >
              <Checkbox
                style={styles.checkbox}
                value={declaration2}
                color={declaration2 ? "#3182CE" : undefined}
              />
              <View
                style={{
                  marginTop: 2,
                  maxWidth: rw(80),
                }}
              >
                <RenderHTML
                  source={{
                    html: `<div style="color:#4A4A4A" >${currentItem?.category?.declaration2}</div>`,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
      </View>
      <NextButton
        title={"Next"}
        disabled={isButtonDisabled}
        onPress={() => navigation.navigate("PaymentMethod")}
      />
    </>
  );
};

// top table

const PolicyDetails = ({ item }) => {
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);

  return (
    <>
      <Text preset="h3" style={styles.title}>
        {language.informationPreviewHeader}
      </Text>
      {/* table */}
      <View style={styles.table}>
        {/*    Selected Policy */}
        <View
          style={[
            styles.tableText,
            {
              alignItems: "center",
              borderTopWidth: 0,
            },
          ]}
        >
          <Text preset="h6" style={styles.tableTextLeft}>
            {language.insurerTitle}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Image
              source={{ uri: item?.logoLink }}
              style={{
                width: 30,
                height: 25,
                resizeMode: "contain",
                marginRight: 10,
              }}
            />

            <Text
              preset="h6"
              style={{
                fontSize: rf(1.8),
                color: "#000000",
              }}
            >
              {item?.category?.title}
            </Text>
          </View>
        </View>
        <View style={styles.tableText}>
          <Text preset="h6" style={styles.tableTextLeft}>
            {language.selectedPolicy}
          </Text>
          <Text preset="h6" style={styles.tableTextRight}>
            {item?.name}
          </Text>
        </View>
        {/*    Policy Coverage Amount */}
        <View style={styles.tableText}>
          <Text preset="h6" style={styles.tableTextLeft}>
            {language.policyCoverageAmount}
          </Text>
          <Text preset="h6" style={styles.tableTextRight}>
            {language.bdt}{" "}
            {ToEnNum(CurrencyFormat(item?.total_coverage_amount), code)}
          </Text>
        </View>
        {/*     Policy Term*/}
        <View style={[styles.tableText]}>
          <Text preset="h6" style={styles.tableTextLeft}>
            {language.policyTerm}
          </Text>
          <Text preset="h6" style={styles.tableTextRight}>
            {item?.duration} {item?.duration_type_text}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#4F4F4F",
    fontSize: rf(2.2),
    lineHeight: 21,
    marginVertical: 15,
    fontWeight: "bold",
  },
  checkTermBox: {
    // paddingHorizontal: rw(4),
    // gap: ,
  },
  // check box
  section: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  smallText: {
    width: rw(82),
    textAlign: "justify",
  },
  checkbox: {
    margin: 8,
    width: 16,
    height: 16,
  },
  // Table
  table: {
    marginVertical: 15,
    backgroundColor: "#F3F5FF",
    borderRadius: 10,
  },
  tableText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f3f5ff58",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 15,
    paddingHorizontal: rw(4),
  },
  tableTextRight: {
    color: "#000000",
    textAlign: "right",
    maxWidth: "50%",
  },
  tableTextLeft: {
    color: "#000000",
    textAlign: "left",
    maxWidth: "50%",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f3f5ff58",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: rw(4),
  },
});
