import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useRef, useState } from "react";
import { rf, rh, ROW, RSBC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { ToggleAnimation } from "../../../Animation/ToggleAnimation";
import { useSelector } from "react-redux";
import FormInputText from "../../../components/Inputs/FormInputText";

export default function UserAddressAccordingInputs({
  title,
  content,
  addressInfo,
  personalInfo,
  setPersonalInfo,
  errorCheck,
  filedError,
  setFiledError,
}) {
  const [showContent, setShowContent] = useState(false);
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );
  //  animation
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    // config  animdton
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    // Animated timing
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(ToggleAnimation);
    setShowContent(!showContent);
  };
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });
  //  input  filed get value
  const [addressSame, setAddressSame] = useState(false);

  const purchaseFormDetails = useSelector(
    (state) => state?.purchase?.purchaseFormInfo
  );

  let presentAddressInfo;
  let permanentAddressInfo;
  let postalcodeInfo;
  let policeStationInfo;
  let districtInfo;
  let mobileInfo;
  let educationalInfo;
  let dateInfo;
  let nationalityInfo;
  let maritalInfo;
  let professionInfo;
  if (purchaseFormDetails) {
    presentAddressInfo = purchaseFormDetails?.Personal_Information?.filter(
      (datas) => datas?.field_name === "present_address"
    )?.[0];
    permanentAddressInfo = purchaseFormDetails?.Personal_Information?.filter(
      (datas) => datas?.field_name === "permanent_address"
    )?.[0];
    postalcodeInfo = purchaseFormDetails?.Personal_Information?.filter(
      (datas) => datas?.field_name === "present_postal_code"
    )?.[0];
    policeStationInfo = purchaseFormDetails?.Personal_Information?.filter(
      (datas) => datas?.field_name === "present_police_station"
    )?.[0];
    districtInfo = purchaseFormDetails?.Personal_Information?.filter(
      (datas) => datas?.field_name === "present_district"
    )?.[0];
    countryInfo = purchaseFormDetails?.Personal_Information?.filter(
      (datas) => datas?.field_name === "present_country"
    )?.[0];
    permanentPostalcodeInfo = purchaseFormDetails?.Personal_Information?.filter(
      (datas) => datas?.field_name === "permanent_postal_code"
    )?.[0];
    permanentPoliceStationInfo =
      purchaseFormDetails?.Personal_Information?.filter(
        (datas) => datas?.field_name === "permanent_police_station"
      )?.[0];
    permanentDistrictInfo = purchaseFormDetails?.Personal_Information?.filter(
      (datas) => datas?.field_name === "permanent_district"
    )?.[0];
    permanentCountryInfo = purchaseFormDetails?.Personal_Information?.filter(
      (datas) => datas?.field_name === "permanent_country"
    )?.[0];
  }

  const handelOnChange = (text, input) => {
    setPersonalInfo((prevState) => ({ ...prevState, [input]: text }));
  };
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          toggleListItem();
        }}
        style={styles.cardButton}
      >
        <View style={ROW}>
          <Text preset="h2" style={styles.cardTitle}>
            {languageState.AddressDetailsTitle}
          </Text>
        </View>

        <Animated.View
          style={{
            transform: [
              {
                rotateZ: arrowTransform,
              },
            ],
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#2196F3" />
        </Animated.View>
      </TouchableOpacity>
      {/* List open */}
      {showContent && (
        <View style={styles.container}>
          {/* Address  Present */}
          <View>
            {presentAddressInfo &&
              presentAddressInfo?.field_type === "text" && (
                <FormInputText
                  // value={PresentAddress}
                  value={personalInfo[presentAddressInfo?.field_name]}
                  // setValue={setPresentAddressPresent}
                  markHide={true}
                  // placeholder={"Write Something..."}
                  description={true}
                  styleInput={{ borderRadius: 4 }}
                  label={presentAddressInfo?.field_title}
                  placeholder={presentAddressInfo?.field_placeholder}
                  onChangeText={(text) =>
                    handelOnChange(text, presentAddressInfo?.field_name)
                  }
                  filedError={filedError}
                  setFiledError={setFiledError}
                  required={presentAddressInfo?.field_required}
                  errorCheck={errorCheck}
                />
              )}

            <View style={RSBC}>
              {postalcodeInfo && postalcodeInfo?.field_type === "text" && (
                <FormInputText
                  label={postalcodeInfo?.field_title}
                  placeholder={postalcodeInfo?.field_placeholder}
                  markHide={true}
                  value={personalInfo[postalcodeInfo?.field_name]}
                  // setValue={setPostCodePresent}

                  styleInput={{
                    width: rw(42),
                  }}
                  onChangeText={(text) =>
                    handelOnChange(text, postalcodeInfo?.field_name)
                  }
                  filedError={filedError}
                  setFiledError={setFiledError}
                  required={postalcodeInfo?.field_required}
                  errorCheck={errorCheck}
                />
              )}
            </View>
          </View>

          {/* Permanent Address */}
          <View style={styles.permanentAddressContainer}>
            {/* Check box */}
            <TouchableOpacity
              onPress={() => {
                setAddressSame((prv) => !prv);
              }}
              style={styles.addressSectionBox}
              activeOpacity={0.8}
            >
              <View style={styles.addressCheckbox}>
                {addressSame && <View style={styles.addressCheckboxIn} />}
              </View>
              <Text preset="h5" color={"#4A4A4A"} style={styles.smallText}>
                {languageState.permanentAddCheckboxTitle}
              </Text>
            </TouchableOpacity>
            {permanentAddressInfo &&
              permanentAddressInfo?.field_type === "text" && (
                <FormInputText
                  markHide={true}
                  // placeholder={"Write Something..."}
                  value={personalInfo[permanentAddressInfo?.field_name]}
                  description={true}
                  styleInput={{ borderRadius: 4 }}
                  label={permanentAddressInfo?.field_title}
                  placeholder={permanentAddressInfo?.field_placeholder}
                  onChangeText={(text) =>
                    handelOnChange(text, permanentAddressInfo?.field_name)
                  }
                  filedError={filedError}
                  setFiledError={setFiledError}
                  required={permanentAddressInfo?.field_required}
                  errorCheck={errorCheck}
                />
              )}

            <View style={[RSBC]}>
              {postalcodeInfo && postalcodeInfo?.field_type === "text" && (
                <FormInputText
                  label={postalcodeInfo?.field_title}
                  placeholder={postalcodeInfo?.field_placeholder}
                  markHide={true}
                  // setValue={setPostCodePermanent}

                  styleInput={{
                    width: rw(42),
                  }}
                  value={personalInfo["permanent_postal_code"]}
                  onChangeText={(text) =>
                    handelOnChange(text, "permanent_postal_code")
                  }
                  filedError={filedError}
                  setFiledError={setFiledError}
                  required={"1"}
                  errorCheck={errorCheck}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(2),
    paddingTop: 10,
    backgroundColor: "#ffffff",
  }, //
  cardTitle: {
    fontSize: rf(2.1),
    color: "#4F4F4F",
  },
  card: {
    marginVertical: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#F5F7FF",
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F7FF",
    paddingVertical: rh(1.2),
    paddingHorizontal: rw(4),
  },
  //   address
  permanentAddressContainer: {
    marginVertical: rh(6),
  },
  addressSectionBox: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: -25,
    zIndex: 10,
  },
  paragraph: {
    fontSize: 15,
  },
  addressCheckbox: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderRadius: 3,
    overflow: "hidden",
    borderColor: "#3182CE",
    marginHorizontal: 5,
  },
  addressCheckboxIn: {
    backgroundColor: "#3182CE",
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  // check box
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
    width: 14,
    height: 14,
  },
});
