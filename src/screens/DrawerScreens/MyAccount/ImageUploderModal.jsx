import { StyleSheet, TouchableOpacity, View, Modal, Alert } from "react-native";
import React, { useState } from "react";
import * as ExpoDocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Path, Svg } from "react-native-svg";
import Text from "../../../components/Text/Text";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/features/language/languageSlice";
import * as Permissions from "expo-permissions";

const requestStoragePermission = async () => {
  const { status } =
    Platform.OS === "android"
      ? await Permissions.askAsync(Permissions.CAMERA)
      : await Permissions.askAsync(
          Permissions.MEDIA_LIBRARY_WRITE_ONLY,
          Permissions.CAMERA
        );
  return status === "granted";
};

export default function ImageUploderModal({ placeholder, setValue }) {
  const language = useSelector(languageSelector);
  const [isVisible, setIsVisible] = useState(false);
  // documentPicker
  const documentPicker = async (type) => {
    setIsVisible(false);
    const granted = await requestStoragePermission();
    if (!granted) {
      setIsVisible((prv) => !prv);
      Alert.alert(
        "Permission Required",
        "Please grant permission to access the camera and media library.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Settings",
            onPress: async () => {
              await Linking.openSettings();
            },
          },
        ],
        { cancelable: false }
      );
      return;
    }
    //  camera
    let result;
    if (type === "camera") {
      const results = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: false,
      });

      if (!results.canceled) {
        result = {
          name: results?.assets[0]?.uri?.split("/").pop(),
          mimeType: "image/jpeg",
          uri: results?.assets[0]?.uri,
        };
      }
      console.log("results", result);
      setValue(result);
    } else {
      const results = await ExpoDocumentPicker.getDocumentAsync({
        type: ["image/*"], // Specify the file types you want to allow (e.g., 'application/pdf' for PDF)
      });
      if (!results?.canceled) {
        result = {
          name: results?.assets?.[0]?.name,
          mimeType: results?.assets?.[0]?.mimeType,
          uri: results?.assets?.[0]?.uri,
        };
      }
      setValue(result);
    }
  };
  //

  const handelDocument = () => {
    setIsVisible(true);
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handelDocument}
        style={styles.uploadButton}
      >
        <Text preset="h6" color={"#4F4F4F"}>
          {language.uploadPictureTitle}
        </Text>
        <>
          <Svg width={28} height={18} fill="none">
            <Path
              d="M23.722 7.64C23.11 3.337 18.984 0 14 0c-3.858 0-7.21 2.014-8.74 5.188C2.253 5.99 0 8.524 0 11.25c0 3.446 3.14 6.25 7 6.25h15.4c3.088 0 5.6-2.242 5.6-5-.002-1.12-.425-2.208-1.2-3.089-.776-.88-1.86-1.504-3.078-1.771ZM15.4 11.25V15h-2.8v-3.75H8.4L14 5l5.6 6.25h-4.2Z"
              fill="#2253A5"
            />
          </Svg>
        </>
      </TouchableOpacity>
      {/* Model */}
      <Modal
        animationType="fade"
        visible={isVisible}
        transparent={true}
        statusBarTranslucent
      >
        <View style={styles.modalStyle}>
          <TouchableOpacity
            style={{
              height: "100%",
            }}
            onPress={() => {
              setIsVisible(false);
            }}
          />
          {/* View */}
          <View style={styles.card}>
            <Text preset="h5" style={styles.cardTitle}>
              {language?.uploadPictureTitle}
            </Text>
            <Text preset="h6" color={"#353131b1"} style={styles.cardTitle}>
              {placeholder}
            </Text>
            <View style={styles.cardButtons}>
              <TouchableOpacity
                onPress={() => {
                  const type = "camera";
                  documentPicker(type);
                }}
                activeOpacity={0.8}
                style={styles.cardButton}
              >
                <Text style={styles.cardBtnTitle}>{language?.capture}</Text>
                <Svg width={18} height={18} fill="none">
                  <Path
                    d="M13 17h2a2 2 0 0 0 2-2v-2M1 5V3a2 2 0 0 1 2-2h2L1 5Zm0 8v2a2 2 0 0 0 2 2h2l-4-4ZM13 1h2a2 2 0 0 1 2 2v2l-4-4ZM9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    stroke="#4F4F4F"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const type = "document";
                  documentPicker(type);
                }}
                activeOpacity={0.8}
                style={styles.cardButton}
              >
                <Text style={styles.cardBtnTitle}>{language?.upload}</Text>
                <FontAwesome name="upload" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    borderColor: "#E5EAFF",
    height: 45,
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  title: {
    width: "80%",
    fontWeight: "700",
  },
  // modalStyle
  modalStyle: {
    flex: 1,
    backgroundColor: "#00000037",
    paddingHorizontal: 20,
    position: "relative",
  },
  //  card
  card: {
    backgroundColor: "#ffff",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    top: "40%",
  },
  cardTitle: {
    fontWeight: "700",
  },
  cardButtons: {
    flexDirection: "row",
  },
  cardBtnTitle: {
    paddingHorizontal: 15,
  },
  cardButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    borderColor: "#E5EAFF",
    height: 45,
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 10,
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
