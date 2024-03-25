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
import MediumButton from "../../../components/Buttons/MediumButton";
import ImageUploaderModal from "./ImageUploaderModal";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function FileUploader({
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
  fileData,
  setFileData,
  inputText,
  label,
  lineDash = false,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const language = useSelector(languageSelector);
  const purchaseFormDetails = useSelector(
    (state) => state?.purchase?.purchaseFormInfo
  );

  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [isVisibleImageLink, setIsVisibleImageLink] = useState(null);

  useEffect(() => {
    setPersonalInfo((prevState) => {
      return prevState.map((prevInput, prevInputIndex) =>
        prevInputIndex === inputIndex
          ? {
              ...prevInput,
              [inputText]: fileData,
            }
          : { ...prevInput }
      );
    });
  }, [fileData]);

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
        setValue={setFileData}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text color={"#646464"} style={[styles.title, { fontSize: rf(1.7) }]}>
            {label}
          </Text>
          <>
            {fileData ? null : (
              <View style={styles.imageUploaderContainer}>
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
          </>
        </View>

        <>
          {fileData && (
            <TouchableOpacity
              onPress={() => {
                setIsVisibleImage(true);
                setIsVisibleImageLink(fileData?.url);
              }}
              style={styles.cardNid}
            >
              <View style={ROW}>
                {fileData.type === "pdf" ? (
                  <Image
                    style={[styles.cardNidImage, { resizeMode: "contain" }]}
                    source={require("../../../../assets/pdf-icon.png")}
                  />
                ) : (
                  <Image
                    style={styles.cardNidImage}
                    source={{ uri: fileData?.url }}
                  />
                )}

                <View style={styles.cardNidText}>
                  <Text line={1} preset="h6" color={"#646464"}>
                    {fileData.name}
                  </Text>
                  <Text preset="SM" color={"#999999"}>
                    {fileData.size}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setFileData(null);
                }}
              >
                <AntDesign name="closecircle" size={15} color="#898A8D" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </>
        {/*  dash line */}
        {lineDash && (
          <View
            style={{
              width: rw(90),
              borderBottomWidth: 1.5,
              borderStyle: "dashed",
              borderColor: "#646464",
              marginVertical: rh(2.2),
            }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    fontSize: rf(1.6),
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
