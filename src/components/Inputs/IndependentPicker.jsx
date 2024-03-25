import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLOR, rh } from "../../theme/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "../Text/Text";
import Toast from "react-native-root-toast";
const genderData = [
  {
    id: 1,
    value: "Male",
  },
  {
    id: 2,
    value: "Female",
  },
];
const durationData = [
  {
    id: 1,
    value: 1,
  },
  {
    id: 2,
    value: 2,
  },
  {
    id: 3,
    value: 3,
  },
  {
    id: 4,
    value: 4,
  },
  {
    id: 5,
    value: 5,
  },
  {
    id: 6,
    value: 6,
  },
  {
    id: 7,
    value: 7,
  },
  {
    id: 8,
    value: 8,
  },
  {
    id: 9,
    value: 9,
  },
  {
    id: 10,
    value: 10,
  },
  {
    id: 11,
    value: 11,
  },
  {
    id: 12,
    value: 12,
  },
  {
    id: 13,
    value: 13,
  },
  {
    id: 14,
    value: 14,
  },
  {
    id: 15,
    value: 15,
  },
  {
    id: 16,
    value: 16,
  },
  {
    id: 17,
    value: 17,
  },
  {
    id: 18,
    value: 18,
  },
  {
    id: 19,
    value: 19,
  },
  {
    id: 20,
    value: 20,
  },
  {
    id: 20,
    value: 20,
  },
  {
    id: 21,
    value: 21,
  },
  {
    id: 22,
    value: 22,
  },
  {
    id: 23,
    value: 23,
  },
];
const insurerList = [
  {
    id: 1,
    value: "Guardian Life Insurance",
  },
  {
    id: 2,
    value: "Mobile/Tab Coverage",
  },
];
const paymentM = [
  {
    id: 1,
    value: "Monthly",
  },
  {
    id: 2,
    value: "Quarterly",
  },
  {
    id: 3,
    value: "Half-Yearly",
  },
  {
    id: 4,
    value: "Yearly",
  },
];

export default function IndependentPicker({
  label,
  required,
  valueProps,
  error,
  placeholder,
  styleInput,
  data,
  selectItemId,
  disabling,
  dropTop,
  toastMessage,
  setListValue,
}) {
  // open list
  const [openList, setOpenList] = useState(false);
  const [selectItem, setSelectItem] = useState();
  //  filed validate
  const [filedError, setFiledError] = useState(false);
  const categoryName =
    placeholder === "Select Policy Category" ? data?.category : null;
  const pickerData = data
    ? data
    : placeholder === "Gender"
    ? genderData
    : placeholder === "Duration"
    ? durationData
    : placeholder === "Premium Payment Mode"
    ? paymentM
    : placeholder === "Select Insurer" && insurerList;

  //  handel select
  const handelSelectItem = (item) => {
    setSelectItem?.(item?.title);
    valueProps?.(item?.title);
    setListValue?.(item);
    setOpenList((prv) => !prv);
    if (placeholder !== "Duration" && placeholder !== "Select Insurer") {
      selectItemId?.(item?.id);
    }
  };

  useEffect(() => {
    if (error && selectItem == null) {
      setFiledError(true);
    } else {
      setFiledError(false);
    }
  }, [error, selectItem]);
  return (
    <View style={styles.container}>
      {label == undefined ? (
        ""
      ) : (
        <View style={styles.labelContainerStyle}>
          <Text preset="h5" style={[styles.label]}>
            {label}
          </Text>
          <View style={styles.startIcon}>
            {required ? <SvgStarIcon /> : ""}
          </View>
        </View>
      )}
      <>
        <TouchableOpacity
          activeOpacity={1}
          // disabled={disabling}
          onPress={() => {
            if (disabling) {
              Toast.show(`${toastMessage}`, {
                duration: 1000,
                backgroundColor: "rgba(51, 105, 179, 1)",
                shadow: true,
                position: rh(80),
                textColor: COLOR.white,
                opacity: 2,
                animation: true,
              });
            } else {
              setOpenList((prv) => !prv);
            }
          }}
          style={[styles.searchInputContainer]}
        >
          <View
            style={[
              styles.labelContainer,
              filedError && {
                borderColor: "red",
              },
              styleInput,
            ]}
          >
            {selectItem === null || selectItem === undefined ? (
              <Text style={[styles.inputLabelStyle]} color={"#979797"}>
                {placeholder}
              </Text>
            ) : (
              <Text style={[styles.inputLabelStyle]}>
                {categoryName ? categoryName : selectItem}
              </Text>
            )}

            <TouchableOpacity
              // disabled={disabling}
              onPress={() => {
                if (disabling) {
                  Toast.show(`${toastMessage}`, {
                    duration: 1000,
                    backgroundColor: "rgba(51, 105, 179, 1)",
                    shadow: true,
                    position: rh(80),
                    textColor: COLOR.white,
                    opacity: 2,
                    animation: true,
                  });
                } else {
                  setOpenList((prv) => !prv);
                }
              }}
              style={[styles.searchArrIcon]}
            >
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#00000064"
                style={
                  openList && {
                    transform: [
                      {
                        rotate: "180deg",
                      },
                    ],
                  }
                }
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {/* {error && (
          <Text style={[styles.errorLabel]}>This field can't be empty.</Text>
        )} */}
      </>
      {/*  List container ----- */}
      {openList && (
        <View
          style={[
            styles.listContainer,
            label && {
              marginTop: rh(9.6),
            },
            dropTop && {
              bottom: 0,
              marginBottom: rh(6),
            },
          ]}
        >
          <ScrollView nestedScrollEnabled={true}>
            {pickerData?.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.2}
                onPress={() => handelSelectItem(item)}
              >
                <Text style={styles.listItem}>{item?.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainerStyle: {
    flexDirection: "row",
  },
  startIcon: {},
  label: {
    color: COLOR.gray400,
    marginBottom: 7,
    // fontSize: 13,
    // fontWeight: "500",
    // fontWeight: "Roboto-Bold",
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: 13,
  },
  container: {
    marginVertical: rh(1),
  },
  labelContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: rh(0.1),
    borderColor: COLOR.blue200,
    paddingHorizontal: rh(1.4),
    color: COLOR.gray400,
    height: rh(6.5),
    borderRadius: rh(1.2),
  },
  searchArrIcon: {
    position: "absolute",
    right: 10,
  },
  // list
  listContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: rh(1.5),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    zIndex: 11,
    marginTop: rh(6.5),
    width: "100%",
    maxHeight: rh(20),
  },
  listItem: {
    color: COLOR.gray400,
    paddingBottom: 3,
  },
  listContainerTop: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    zIndex: 10,
    marginTop: -130,
    width: "100%",
    top: 0,
    // maxHeight: 100,
    height: 150,
  },
  errorLabel: {
    color: "red",
    marginBottom: 4,
    fontSize: 12,
  },
});
