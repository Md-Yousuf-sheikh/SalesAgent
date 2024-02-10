import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomSinglePicker from "../../../components/Inputs/CustomSinglePicker";
import { rh, ROW, RSBC, rw } from "../../../theme/Theme";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import FilterDatePicker from "../../../components/Inputs/FilterDatePicker";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function FilterStatisticModal({
  IsVisible,
  setIsVisible,
  dateTo,
  dateFrom,
  setDateFrom,
  setDateTo,
}) {
  const language = useSelector(languageSelector);

  return (
    <Modal
      visible={IsVisible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
            style={{
              alignSelf: "flex-end",
              paddingBottom: 10,
            }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={RSBC}>
              <FilterDatePicker
                label={language.fromTextInputTitle}
                placeholder={language.fromTextInputTitle}
                defaultValue={dateFrom}
                styleInput={{
                  width: rw(45),
                }}
                // error={filedError}
                valueProps={setDateFrom}
              />

              <FilterDatePicker
                label={language.toTextInputTitle}
                placeholder={language.toTextInputTitle}
                defaultValue={dateTo}
                styleInput={{
                  width: rw(45),
                }}
                // error={filedError}
                valueProps={setDateTo}
              />
            </View>
            <CustomSinglePicker label={language.salesPersonIdentity} />
            <CustomSinglePicker label={language.policyCategoryHeaderText} />
            <CustomSinglePicker label={language.policyNameTitle} />
            <CustomSinglePicker label={language.customerTypeTitle} />
            <CustomSinglePicker label={language.insurerTitle} />
            <CustomSinglePicker label={language.areaTitle} />
            <CustomSinglePicker label={language.zoneTitle} />
          </ScrollView>
        </View>
        {/* button back drop */}
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false);
          }}
          style={styles.backgroundButton}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000017",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  card: {
    width: rw(95),
    backgroundColor: "#ffff",
    padding: 15,
    borderRadius: 5,
    zIndex: 2,
    maxHeight: rh(80),
  },
  backgroundButton: {
    position: "absolute",
    height: rh(110),
    width: rw(100),
  },
});
