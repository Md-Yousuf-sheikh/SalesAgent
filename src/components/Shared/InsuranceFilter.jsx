import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { rh, ROW, RSBC, rw } from "../../theme/Theme";
import { useSelector } from "react-redux";
import ModernDatePicker from "../Inputs/ModernDatePicker";
import MediumButton from "../Buttons/MediumButton";
import FilterDatePicker from "../Inputs/FilterDatePicker";
import { languageSelector } from "../../redux/features/language/languageSlice";

export default function InsuranceFilter({
  IsVisible,
  setIsVisible,
  setDateFrom,
  setDateTo,
  dateTo,
  dateFrom,
  handleDateFilter,
  isLoading,
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
          <View style={RSBC}>
            <FilterDatePicker
              label={language.fromTextInputTitle}
              placeholder={dateFrom}
              styleInput={{
                width: rw(40),
              }}
              defaultValue={dateFrom}
              // error={filedError}
              valueProps={setDateFrom}
            />
            <FilterDatePicker
              label={language.toTextInputTitle}
              placeholder={dateTo}
              styleInput={{
                width: rw(40),
              }}
              defaultValue={dateTo}
              // error={filedError}
              valueProps={setDateTo}
            />
          </View>

          <MediumButton
            loader={isLoading}
            onPress={handleDateFilter}
            title={language.applyButtonText}
          />
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
  },
  backgroundButton: {
    position: "absolute",
    height: rh(110),
    width: rw(100),
  },
});
