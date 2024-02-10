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
import InputText from "../../../components/Inputs/InputText";
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function NomineeAddressAccordingInputs({ title, content }) {
  const [showContent, setShowContent] = useState(false);
  const language = useSelector(languageSelector);
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
  const [IdentityType, setIdentityType] = useState("");
  const [NidNumber, setNidNumber] = useState("");

  const [DateOfBirth, setDateOfBirth] = useState("");
  const [Nationality, setNationality] = useState("");
  const [MaritalStatus, setMaritalStatus] = useState("");
  const [Profession, setProfession] = useState("");
  //  Present Address
  const [PresentAddress, setPresentAddressPresent] = useState("");
  const [PostCodePresent, setPostCodePresent] = useState("");
  const [ThanaPresent, setThanaPresent] = useState("");
  const [DistrictPresent, setDistrictPresent] = useState("");
  // Permanent Address
  const [PermanentAddress, setPermanentAddress] = useState("");
  const [PostCodePermanent, setPostCodePermanent] = useState("");
  const [ThanaPermanent, setThanaPermanent] = useState("");
  const [DistrictPermanent, setDistrictPermanent] = useState("");
  const [addressSame, setAddressSame] = useState(false);
  // error
  const [filedError, setFiledError] = useState(false);

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
    presentAddressInfo = purchaseFormDetails?.Nominee_Information?.filter(
      (datas) => datas?.field_name === "nominee_address"
    )?.[0];
    permanentAddressInfo = purchaseFormDetails?.Nominee_Information?.filter(
      (datas) => datas?.field_name === "permanent_address"
    )?.[0];
    postalcodeInfo = purchaseFormDetails?.Nominee_Information?.filter(
      (datas) => datas?.field_name === "postal_code"
    )?.[0];
    policeStationInfo = purchaseFormDetails?.Nominee_Information?.filter(
      (datas) => datas?.field_name === "police_station"
    )?.[0];
    districtInfo = purchaseFormDetails?.Nominee_Information?.filter(
      (datas) => datas?.field_name === "district"
    )?.[0];
  }
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
            {language.AddressDetailsTitle}
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
                <InputText
                  setValue={setPresentAddressPresent}
                  value={PresentAddress}
                  markHide={true}
                  // placeholder={"Write Something..."}
                  description={true}
                  styleInput={{ borderRadius: 4 }}
                  label={presentAddressInfo?.field_title}
                  placeholder={presentAddressInfo?.field_placeholder}
                />
              )}

            {/* <View style={RSBC}>
              <InputText
                label={language.postCodePlaceholder}
                placeholder={language.postCodePlaceholder}
                markHide={true}
                setValue={setPostCodePresent}
                error={filedError}
                styleInput={{
                  width: rw(42),
                }}
              />
              <CustomSinglPicker
                label={language.thanaPlaceholder}
                placeholder={language.thanaPlaceholder}
                error={filedError}
                valueProps={setThanaPresent}
                styleInput={{
                  width: rw(42),
                }}
              />
            </View>
            <CustomSinglPicker
              label={language.districtPlaceholder}
              placeholder={language.districtPlaceholder}
              error={filedError}
              valueProps={setDistrictPresent}
              // styleInput={{
              //   width: rw(28),
              // }}
            /> */}
          </View>

          {/* <View style={styles.permanentAddressContainer}>
            <TouchableOpacity
              onPress={() => {
                setAddressSame(prv => !prv)
              }}
              style={styles.addressSectionBox}
              activeOpacity={0.8}
            >
              <View style={styles.addressCheckbox}>
                {addressSame && <View style={styles.addressCheckboxIn} />}
              </View>
              <Text preset="h5" color={'#4A4A4A'} style={styles.smallText}>
                {language.permanentAddCheckboxTitle}
              </Text>
            </TouchableOpacity>
            <InputText
              setValue={setPermanentAddress}
              markHide={true}
              // placeholder={"Write Something..."}
              description={true}
              styleInput={{ borderRadius: 4 }}
              label={language.permanentAdressPlaceholder}
              placeholder={language.permanentAdressPlaceholder}
            />
            <View style={RSBC}>
              <InputText
                label={language.postCodePlaceholder}
                placeholder={language.postCodePlaceholder}
                markHide={true}
                setValue={setPostCodePresent}
                error={filedError}
                styleInput={{
                  width: rw(42),
                }}
              />
              <CustomSinglPicker
                label={language.thanaPlaceholder}
                placeholder={language.thanaPlaceholder}
                error={filedError}
                valueProps={setThanaPresent}
                styleInput={{
                  width: rw(42),
                }}
              />
            </View>
            <CustomSinglPicker
              label={language.districtPlaceholder}
              placeholder={language.districtPlaceholder}
              error={filedError}
              valueProps={setDistrictPresent}
              // styleInput={{
              //   width: rw(28),
              // }}
            />
          </View> */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(2),
    paddingTop: 10,
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
    paddingVertical: 10,
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
