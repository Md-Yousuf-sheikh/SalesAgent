import {
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { CONTAINER, rh, RSC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import InputText from "../../../components/Inputs/InputText";
import MediumButton from "../../../components/Buttons/MediumButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserClaimOtpModal from "./UserClaimOtpModal";
import { OTP } from "react-native-otp-form";
import UserClaimFileUploader from "./UserClaimFileUploader";
import UserClaimSuccess from "./UserClaimSuccess";
import { useDispatch, useSelector } from "react-redux";
import CustomSinglePicker from "../../../components/Inputs/CustomSinglePicker";
import DatePicker from "../../../components/Inputs/DatePicker";

export default function UserClaim() {
  const [switchButton, setSwitchButton] = useState(false);
  //  modals open
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  //  number verify
  const [NumberVerify, setNumberVerify] = useState(false);
  // get filed data
  const [RegisterMobil, setRegisterMobil] = useState("");
  const [PolicyId, setPolicyId] = useState("");
  const [PolicyType, setPolicyType] = useState("");
  const [PolicyHolderName, setPolicyHolderName] = useState("");
  //  Certificate
  const [NIDNominee, setNIDNominee] = useState(null);
  const [HospitalDischarge, setHospitalDischarge] = useState(null);
  const [PhysicianPrescriptions, setPhysicianPrescriptions] = useState(null);
  const [DiagnosisReports, setDiagnosisReports] = useState(null);
  //
  //
  const [filedError, setFiledError] = useState(false);
  //  get documents
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.userClaim);
  // handelSubmit
  const handelSubmit = () => {
    setFiledError(true);
    if (
      RegisterMobil?.length > 1 &&
      PolicyId?.length > 1 &&
      PolicyType?.length > 1 &&
      PolicyHolderName?.length > 1
    ) {
      setOtpModalOpen(true);
      console.log("success");
    } else {
      setOtpModalOpen(false);
      console.log("Unsuccess");
    }
  };
  // handelSubmitClaim
  const handelSubmitClaim = () => {
    if (
      NIDNominee?.length > 1 &&
      HospitalDischarge?.length > 1 &&
      PhysicianPrescriptions?.length > 1 &&
      DiagnosisReports?.length > 1
    ) {
      setSuccessModalOpen(true);
      // console.log("Success");
    } else {
      // console.log("Unsuccess");
      setSuccessModalOpen(false);
    }
    // Success Modal
  };
  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={"User Claim"} />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={CONTAINER}
      >
        {/* Otp ModalOpen */}
        <Modal animationType="fade" transparent={true} visible={otpModalOpen}>
          <UserClaimOtpModal
            setOtpModalOpen={setOtpModalOpen}
            setNumberVerify={setNumberVerify}
          />
        </Modal>
        {/* UserClaimSuccess */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={successModalOpen}
        >
          <UserClaimSuccess setOpen={setSuccessModalOpen} />
        </Modal>
        {/* Content */}
        <View style={styles.container}>
          <Text preset="h1" color={"#595959"} style={styles.title}>
            Claim Insurance
          </Text>
          <Text preset="h5" color={"#595959"} style={styles.smallText}>
            To claim your insurance please input below information
          </Text>
          {/* Switch button */}
          <Text
            preset="SL"
            color={"#646464"}
            style={{
              paddingTop: 15,
              paddingBottom: 5,
            }}
          >
            Choose one to proceed*
          </Text>
          <View style={styles.switchContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setSwitchButton(false);
              }}
              style={[
                styles.switchButton,
                !switchButton && { borderColor: "#009718" },
              ]}
            >
              <Text color={!switchButton ? "#009718" : "#595959"}>
                Self Claim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setSwitchButton(true);
              }}
              style={[
                styles.switchButton,
                switchButton && { borderColor: "#009718" },
              ]}
            >
              <Text color={switchButton ? "#009718" : "#595959"}>
                Claimed By Nominee
              </Text>
            </TouchableOpacity>
          </View>
          {/* end */}
          {/* Inputs */}
          <InputText
            setValue={setRegisterMobil}
            label={"Registered Mobile No"}
            keyboardType={"number-pad"}
            type={"number"}
            maxLength={11}
            placeholder={"Number"}
            error={filedError}
          />
          <InputText
            setValue={setPolicyId}
            label={"Policy ID"}
            maxLength={8}
            placeholder={"Policy Id"}
            error={filedError}
          />

          <CustomSinglePicker
            placeholder={"Policy Type"}
            valueProps={setPolicyType}
            label={"Policy Type"}
            error={filedError}
            // data={}
          />
          <InputText
            setValue={setPolicyHolderName}
            label={"Policy Holder’s Name"}
            maxLength={40}
            placeholder={"Policy Holder’s Name"}
            error={filedError}
          />
          {!NumberVerify && (
            <MediumButton
              title={"Submit"}
              onPress={handelSubmit}
              stylesButton={{
                width: rw(90),
              }}
            />
          )}

          {/* Upload Verification Document */}
          {NumberVerify && (
            <>
              <View
                style={[
                  RSC,
                  {
                    marginTop: 25,
                    paddingBottom: 10,
                  },
                ]}
              >
                <Text preset="h5" style={styles.uploadTitle}>
                  Upload Verification Document
                </Text>
                <Text
                  preset="h5"
                  style={[
                    styles.uploadTitle,
                    {
                      fontWeight: "300",
                    },
                  ]}
                >
                  (Required)
                </Text>
              </View>
              {/* List uploaded file */}
              <UserClaimFileUploader
                setValue={setNIDNominee}
                placeholder={"Copy of NID of Nominee & policy holder"}
              />
              <UserClaimFileUploader
                setValue={setHospitalDischarge}
                placeholder={"Hospital Discharge Certificate"}
              />
              <UserClaimFileUploader
                setValue={setPhysicianPrescriptions}
                placeholder={"Physicians prescriptions"}
              />
              <UserClaimFileUploader
                setValue={setDiagnosisReports}
                placeholder={"Copies of diagnosis reports and"}
              />

              <MediumButton
                title={"Submit Claim"}
                onPress={handelSubmitClaim}
                stylesButton={{
                  width: rw(90),
                }}
              />
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
  },
  title: {
    fontSize: 20,
    lineHeight: 50,
  },
  smallText: {
    lineHeight: 21,
    fontWeight: "400",
    width: "95%",
  },
  // switchButton
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 10,
  },
  switchButton: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 8,
    width: "48%",
    borderColor: "#E5EAFF",
  },
  uploadTitle: {
    color: "#676767",
    fontWeight: "800",
    lineHeight: 17,
    marginTop: 10,
  },
});
