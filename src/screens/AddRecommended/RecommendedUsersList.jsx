import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, rf, rh } from "../../theme/Theme";
import { FontAwesome } from "@expo/vector-icons";
import Text from "../../components/Text/Text";
import { Dropdown } from "react-native-element-dropdown";

export default function RecommendedUsersList({
  label,
  required,
  placeholder,
  labelStyle,
  data,
  errorCheck,
  userInfo,
  setUserInfo,
  disable = false,
}) {
  // data
  let defaultData = [];
  if (data) {
    for (let item of data) {
      defaultData = [
        ...defaultData,
        {
          label: `${item?.full_name?.split(" ")[0]} - ${item?.contact_number}`,
          value: `${item?.id}
                  `,
        },
      ];
    }
  }
  // Select Item
  const [selectItem, setSelectItem] = useState(
    userInfo !== undefined ? userInfo : null
  );
  //  Filed validate
  const [borderColor, setBorderColor] = useState(COLOR.blue200);
  const [isFocus, setIsFocus] = useState(false);
  //  handel select
  const handelSelectItem = (item) => {
    setSelectItem(item);
    if (setUserInfo) {
      setUserInfo(item);
    }
  };

  // check error
  useEffect(() => {
    if (required === "1" && errorCheck) {
      if (
        selectItem === null ||
        selectItem === undefined ||
        selectItem === "" ||
        Object.keys(userInfo)?.length < 1
      ) {
        if (Object.keys(userInfo)?.length < 1) {
          setBorderColor("red");
        } else {
          setBorderColor(COLOR.blue200);
        }
      } else {
        setBorderColor(COLOR.blue200);
      }
    }
  }, [errorCheck]);

  return (
    <View style={styles.container}>
      <>
        {label == undefined ? (
          ""
        ) : (
          <View style={styles.labelContainerStyle}>
            <Text preset="h5" style={[styles.label, labelStyle]}>
              {label}
            </Text>
            {required === "1" && (
              <FontAwesome
                name="asterisk"
                size={rh(1)}
                color="red"
                style={{ marginTop: rh(0.7), marginLeft: rh(1) }}
              />
            )}
          </View>
        )}

        <Dropdown
          style={[
            {
              borderColor: borderColor,
            },
            styles?.dropdownStyle,
          ]}
          placeholderStyle={{ color: "#979797", fontSize: rf(1.8) }}
          selectedTextStyle={{ fontSize: rf(2) }}
          mode="default"
          data={defaultData}
          search={defaultData?.length > 10 ? true : false}
          // search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={selectItem}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            handelSelectItem(item);
            setIsFocus(false);
          }}
          disable={disable}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownStyle: {
    borderWidth: 0.8,
    paddingHorizontal: rh(1.7),
    paddingVertical: rh(1),
    borderRadius: rh(1),
    backgroundColor: COLOR.white,
    maxHeight: rh(20),
  },

  labelContainerStyle: {
    flexDirection: "row",
  },
  startIcon: {},
  label: {
    color: COLOR.gray400,
    marginBottom: rh(0.9),
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: rf(1.7),
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
    borderWidth: 1,
    borderColor: COLOR.blue200,
    paddingHorizontal: rh(1.2),
    color: COLOR.gray400,
    height: rh(6.5),
    borderRadius: rh(1.2),
  },
  searchArrIcon: {
    position: "absolute",
    right: 15,
  },
  // list
  listContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    zIndex: 10,
    marginTop: rh(9),
    width: "100%",
    // flex: 1,
    maxHeight: rh(20),
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
  listItem: {
    paddingVertical: rh(0.8),
    color: COLOR.gray400,
  },
  errorLabel: {
    color: "red",
    marginBottom: 4,
    fontSize: 12,
  },
});
