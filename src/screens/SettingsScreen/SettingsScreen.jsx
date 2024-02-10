import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { CONTAINER, rh, rw } from "../../theme/Theme";
import LanguageToggleButton from "../../components/Buttons/LanguageToggleButton";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import Text from "../../components/Text/Text";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );
  const navigation = useNavigation();
  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={languageState.settingsTitle} />
      <View style={CONTAINER}>
        <View style={styles.container}>
          <View style={styles.selectLanguage}>
            <Text preset="h4">{languageState.selectLanguageTitle}</Text>
          </View>
          <LanguageToggleButton
            mainContainerStyle={{
              position: "absolute",
              top: rh(3),
              right: rh(3),
            }}
            listContainerStyle={{
              width: rw(30),
              right: 0,
            }}
          />
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChangePassword");
            }}
            style={styles.selectLanguage}
          >
            <Text preset="h4">{languageState.changePassButtonText}</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingVertical: rh(2),
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
  selectLanguage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1F4FF",
    paddingVertical: rh(1.2),
    paddingHorizontal: rh(1.2),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: rh(1.3),
    height: rh(7),
  },
});
