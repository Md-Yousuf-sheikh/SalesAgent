import { StyleSheet, TouchableOpacity, Image, View, Modal } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Path, Svg } from "react-native-svg";
import Text from "../../../components/Text/Text";
import { FontAwesome } from "@expo/vector-icons";
import { rh, rw } from "../../../theme/Theme";
//
export const getFileInfo = async (fileURI) => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI);
  return fileInfo;
};

export default function ImageUploaderModal({
  setValue,
  isVisible,
  setIsVisible,
  title,
}) {
  // documentPicker
  const documentPicker = async (type) => {
    setIsVisible(false);
    //  camera
    let result;
    if (type === "camera") {
      const results = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: true,
        base64: true,
      });
      if (!results.canceled) {
        result = {
          name: results?.assets[0]?.uri?.split("/")?.pop(),
          type: "image",
          url: results?.assets[0]?.uri,
        };
        setValue(result);
      }
    } else {
      let results = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"], // type
        multiple: false,
      });

      if (!results.canceled) {
        result = {
          name: results?.uri?.split("/")?.pop(),
          type: results?.mimeType,
          url: results?.uri,
        };
        setValue(result);
      }
    }
  };

  return (
    <View>
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
            <View style={styles.titleContainer}>
              <Text preset="h5" style={styles.cardTitle}>
                Upload Image
              </Text>
              <Text preset="h6" color={"#353131b1"} style={styles.cardTitle}>
                {title}
              </Text>
            </View>
            <View style={styles.cardButtons}>
              <TouchableOpacity
                onPress={() => {
                  const type = "camera";
                  documentPicker(type);
                }}
                activeOpacity={0.8}
                style={styles.cardButton}
              >
                <Text style={styles.cardBtnTitle}>Capture</Text>
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
                <Text style={styles.cardBtnTitle}>Upload</Text>
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
    paddingTop: rh(5),
    paddingBottom: rh(8),
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    top: "40%",
    marginHorizontal: rw(20),
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
});
