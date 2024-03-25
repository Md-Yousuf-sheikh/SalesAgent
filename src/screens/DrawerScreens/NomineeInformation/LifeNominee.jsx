import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as TextNormal,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { rw, rh, ROW, rf } from "../../../theme/Theme";
import { AntDesign } from "@expo/vector-icons";
import Text from "../../../components/Text/Text";
import Checkbox from "expo-checkbox";
import MediumButton from "../../../components/Buttons/MediumButton";
import ImageUploaderModal from "./ImageUploaderModal";
import { useSelector } from "react-redux";
import FormInputText from "../../../components/Inputs/FormInputText";
import { useEffect } from "react";
import { useSubmitCustomerIdentityMutation } from "../../../redux/features/customer/customerApiSlice";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function LifeNominee({
  identity,
  title,
  nomineeData,
  personalInfo,
  setPersonalInfo,
  setNidNumber,
  errorCheck,
  filedError,
  setFiledError,
  identityNumber,
  inputIndex,
  personalCheck,
  userInfo,
  NIDFrontSide,
  NIDBackSide,
  setNIDFrontSide,
  setNIDBackSide,
  setIsPresent,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const language = useSelector(languageSelector);

  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [isVisibleImageLink, setIsVisibleImageLink] = useState(null);

  const [submitCustomerIdentity] = useSubmitCustomerIdentityMutation();

  //  get all value form inputs
  const [IdentityType, setIdentityType] = useState("");
  // const [NidNumber, setNidNumber] = useState('')
  // Provide NID Later
  const [ProvideNIDLater, setProvideNIDLater] = useState(true);
  // Image Picker
  const [error, setError] = useState(false);
  const [document, setDocument] = useState("");
  // const [NIDFrontSide, setNIDFrontSide] = useState(null)
  // const [NIDBackSide, setNIDBackSide] = useState(null)
  const [disableCheck, setDisableCheck] = useState(false);
  //  Error filed
  // const [filedError, setFiledError] = useState(false)
  // console.log('NIDFrontSide', NIDFrontSide)
  // console.log('NIDBackSide', NIDBackSide)

  // let identity
  // if (purchaseFormDetails) {
  //   identity = purchaseFormDetails?.Nominee_Information?.filter(
  //     datas => datas?.field_name === 'nominee_identification_type'
  //   )?.[0]
  // }
  const handelOnChange = (text, input) => {
    setPersonalInfo((prevState) => {
      return prevState.map((prevInput, prevInputIndex) =>
        prevInputIndex === inputIndex
          ? {
              ...prevInput,
              [input]: text,
            }
          : { ...prevInput }
      );
    });

    if (text === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    async function getCustomerIdentity() {
      try {
        const data = {
          user_id: userInfo?.id,
          identity_type: "Passport",
        };
        const res = await submitCustomerIdentity(data).unwrap();

        if (res?.data) {
          const per = {
            ...personalInfo,
            ...res?.data,
          };
          if (res?.data?.attachment_front) {
            let frontUrl = {
              url: res?.data?.frontLink,
            };
            setNIDFrontSide(frontUrl);
            setProvideNIDLater(false);
            setIsPresent(true);
          }
          if (res?.data?.attachment_back) {
            let backUrl = {
              url: res?.data?.backLink,
            };
            setNIDBackSide(backUrl);
            setProvideNIDLater(false);
            setIsPresent(true);
          }
          setPersonalInfo([per]);
        }
      } catch (error) {
        console.log("tttttttttttttttt", error);
        const per = {
          ...personalInfo,
          attachment_back: "",
          attachment_front: "",
          backLink: "",
          frontLink: "",
          identity_number: "",
          identity_type: "Passport",
        };
        setIsPresent(false);
        setPersonalInfo([per]);
        setNIDBackSide("");
        setNIDFrontSide("");
        setProvideNIDLater(true);
      }
    }
    if (
      personalInfo?.identity_type !== null &&
      personalInfo?.identity_type !== undefined &&
      userInfo?.id
    ) {
      getCustomerIdentity();
    }
  }, [personalInfo?.identity_type]);

  // console.log('userInfo=======', userInfo)

  return (
    <>
      <Modal visible={isVisibleImage} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0000003d",
            paddingHorizontal: rw(4),
            overflow: "hidden",
          }}
        >
          <TouchableOpacity onPress={() => setIsVisibleImage(false)}>
            <AntDesign name="closecircle" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Image
            style={{
              height: rw(50),
              width: rw(90),
              // resizeMode:'contain',
              marginTop: rh(1.2),
            }}
            source={{ uri: isVisibleImageLink }}
          />
        </View>
      </Modal>
      <ImageUploaderModal
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        setValue={NIDFrontSide ? setNIDBackSide : setNIDFrontSide}
        title={NIDFrontSide ? "Back Side" : "Font Side"}
      />
      <View>
        <Text preset="h3" style={styles.title}>
          {title}
        </Text>
        {identityNumber?.field_type === "text" && (
          <FormInputText
            label={identityNumber?.field_title}
            placeholder={"Passport"}
            markHide={true}
            value={
              personalInfo[identity?.field_name] === "Passport"
                ? personalInfo[identityNumber?.field_name]
                : ""
            }
            onChangeText={(text) =>
              handelOnChange(text, identityNumber?.field_name)
            }
            filedError={filedError}
            setFiledError={setFiledError}
            required={"1"}
            errorCheck={errorCheck}
            error={error}
            item={identityNumber}
            userInfo={userInfo}
            // type={'number'}
          />
        )}
        {/* Image picker */}
        {!ProvideNIDLater && (
          <>
            {NIDBackSide && NIDFrontSide ? null : (
              <View style={styles.imageUploaderContainer}>
                <Text
                  preset="SL"
                  color={"#646464"}
                  style={styles.imageUploaderTitle}
                >
                  {NIDFrontSide && !NIDBackSide
                    ? "Upload Back Side"
                    : NIDBackSide && NIDFrontSide
                    ? ""
                    : "Upload Front Side"}
                </Text>
                <MediumButton
                  title={language.uploadButtonText}
                  stylesButton={{
                    width: rw(28),
                    marginVertical: 0,
                    paddingVertical: rh(1.3),
                    borderRadius: rh(3.5),
                  }}
                  onPress={() => {
                    setIsVisible(true);
                  }}
                />
              </View>
            )}

            {/* {document ? (
              <></>
            ) : (
              <View style={styles.documentUploadContainer}>
                <Text color={'#000000'} preset="h3">
                  Document Upload Success
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setDocument('')
                  }}
                >
                  <EvilIcons name="close" size={24} color="#000000" />
                </TouchableOpacity>
              </View>
            )} */}
          </>
        )}
        {/* Check box */}

        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={ProvideNIDLater}
            onValueChange={setProvideNIDLater}
            color={ProvideNIDLater ? "#3182CE" : undefined}
          />
          <Text preset="h5" color={"#646464"} style={styles.smallText}>
            {"Provide Document Later"}
          </Text>
        </View>

        {/*  */}
        {!ProvideNIDLater && (
          <>
            {NIDFrontSide && (
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleImage(true);
                  setIsVisibleImageLink(NIDFrontSide?.url);
                }}
                style={styles.cardNid}
              >
                <View style={ROW}>
                  {NIDFrontSide.type === "pdf" ? (
                    <Image
                      style={[styles.cardNidImage, { resizeMode: "contain" }]}
                      source={require("../../../../assets/pdf-icon.png")}
                    />
                  ) : (
                    <Image
                      style={styles.cardNidImage}
                      source={{ uri: NIDFrontSide?.url }}
                    />
                  )}

                  <View style={styles.cardNidText}>
                    <Text line={1} preset="h6" color={"#646464"}>
                      {NIDFrontSide.name}
                    </Text>
                    <Text preset="SM" color={"#999999"}>
                      {NIDFrontSide.size}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setNIDFrontSide(null);
                  }}
                >
                  {/* <SvgMarkIcon fill={'#009718'} /> */}
                  <AntDesign name="closecircle" size={15} color="#898A8D" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            {NIDBackSide && (
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleImage(true);
                  setIsVisibleImageLink(NIDBackSide?.url);
                }}
                style={styles.cardNid}
              >
                <View style={ROW}>
                  {NIDBackSide.type === "pdf" ? (
                    <Image
                      style={[styles.cardNidImage, { resizeMode: "contain" }]}
                      source={require("../../../../assets/pdf-icon.png")}
                    />
                  ) : (
                    <Image
                      style={styles.cardNidImage}
                      source={{ uri: NIDBackSide.url }}
                    />
                  )}
                  <View style={styles.cardNidText}>
                    <Text line={1} preset="h6" color={"#646464"}>
                      {NIDBackSide.name}
                    </Text>
                    <Text preset="SM" color={"#999999"}>
                      {NIDBackSide.size}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setNIDBackSide(null);
                  }}
                >
                  {/* <SvgMarkIcon fill={'#009718'} /> */}
                  <AntDesign name="closecircle" size={15} color="#898A8D" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </>
        )}
        {/*  dash line */}
        <View
          style={{
            width: rw(90),
            borderBottomWidth: 1.5,
            borderStyle: "dashed",
            borderColor: "#646464",
            marginVertical: rh(2.2),
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  //
  circleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  circleBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "27%",
    overflow: "hidden",
  },
  circleBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: "#C4C4C4",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 4,
  },
  line: {
    width: rw(50),
    height: 1,
    backgroundColor: "#ddd",
  },
  lineHide: {
    width: rw(50),
    height: 1,
    backgroundColor: "#dddddd00",
  },
  lineActive: {
    width: rw(50),
    height: 1,
    backgroundColor: "#16B5CC",
  },
  circleText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 11,
  },
  circleNumber: {
    color: "#fff",
  },
  // filed start style
  title: {
    color: "#4F4F4F",
    fontSize: rf(2.15),
    lineHeight: 21,
    marginVertical: rh(1.7),
  },
  // imageUploaderContainer
  imageUploaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: rh(1.2),
    borderColor: "#E5EAFF",
    marginVertical: rh(1.7),
  },
  imageUploaderTitle: {
    textAlignVertical: "bottom",
    fontSize: 12,
    letterSpacing: 0.2,
  },
  // imageContainer
  imagePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-around",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  imageTextContainer: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  imageFileName: {
    fontSize: 12,
  },
  imageStyle: {
    width: 43,
    height: 28,
    resizeMode: "contain",
    backgroundColor: "red",
  },
  documentUploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#67f76cd0",
    backgroundColor: "#baf7bc4e",
  },
  // permanentAddressContainer
  permanentAddressContainer: {
    marginVertical: rh(6),
  },
  // nextTextButton
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    position: "relative",
    marginVertical: rh(4),
    alignItems: "center",
    justifyContent: "center",
  },
  nextTextButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 0,
    marginVertical: rh(5),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#2253A5",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#2253A5",
  },
  nextText: {
    //
  },
  AddNominee: {
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: "#2253A5",
    borderRadius: 5,
    alignSelf: "center",
    // position: "absolute",
    // left: 0,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
    width: 14,
    height: 14,
  },
  //
  cardNid: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardNidImage: {
    width: 43,
    height: 28,
    resizeMode: "cover",
    marginRight: 10,
  },
  cardNidText: {
    // backgroundColor: 'red',
    width: rw(60),
  },
});
