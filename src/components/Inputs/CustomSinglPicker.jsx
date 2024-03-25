import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLOR, rf, rh, rw } from "../../theme/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "../Text/Text";
import Toast from "react-native-root-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  nomineeDecrease,
  nomineeIncrease,
} from "../../redux/features/purchase/NomineeSlice";
import { FontAwesome } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { wp } from "../../utils/ScreenDimensions";
import { useLazyGetAddressByPostalCodeQuery } from "../../redux/features/purchase/purchaseApiSlice";

const defaultData = [
  {
    value: "Health Insurance",
    label: "Health Insurance",
  },
  {
    value: "Passport",
    label: "Passport",
  },
  {
    value: "Smart Card",
    label: "Smart Card",
  },
];
export default function CustomSinglPicker({
  label,
  required,
  valueProps,
  placeholder,
  styleInput,
  dropTop,
  labelStyle,
  data,
  setPersonalInfo,
  inputText,
  personalInfo,
  errorCheck,
  inputIndex,
  item,
  nomineeSize,
  disabled = false,
  userInfo,
  index,
  categoryInfo,
  category,
}) {
  // open list

  const dispatch = useDispatch();
  const nomineeCount = useSelector((state) => state?.nominee?.nomineeCount);

  const [getAddressByP, { isLoading }] = useLazyGetAddressByPostalCodeQuery();

  if (item?.field_type === "checkbox") {
    dropTop = true;
    data = [
      {
        value: "Yes",
        label: "Yes",
      },
      {
        value: "No",
        label: "No",
      },
    ];
  }
  const [openList, setOpenList] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [selectItem, setSelectItem] = useState(
    personalInfo !== undefined &&
      inputText !== undefined &&
      personalInfo[inputText] !== undefined &&
      personalInfo[inputText] !== null
      ? personalInfo[inputText]
      : null
  );
  // const labelLength = useRef()
  // if(label)
  // {
  //   if(label?.length/10 >= 4 )
  //   {

  //     labelLength.current = label?.length
  //   }
  // }
  //  filed validate
  // const [filedError, setFiledError] = useState(false)
  const [borderColor, setBorderColor] = useState(COLOR.blue200);

  const handleAddressCall = async (paramValue) => {
    try {
      const res = await getAddressByP([paramValue]).unwrap();
      console.log("res.+++++++++++++++++++++++++++++++++", res);
      if (setPersonalInfo) {
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  [inputText]: paramValue,
                }
              : { ...prevInput }
          );
        });
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  ["present_district"]: res?.district,
                }
              : { ...prevInput }
          );
        });
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  ["present_thana"]: res?.thana,
                }
              : { ...prevInput }
          );
        });
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  ["present_country"]: res?.country,
                }
              : { ...prevInput }
          );
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handlePermanentAddressCall = async (paramValue) => {
    try {
      const res = await getAddressByP([paramValue]).unwrap();
      if (setPersonalInfo) {
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  [inputText]: paramValue,
                }
              : { ...prevInput }
          );
        });
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  ["permanent_district"]: res?.district,
                }
              : { ...prevInput }
          );
        });
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  ["permanent_thana"]: res?.thana,
                }
              : { ...prevInput }
          );
        });
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  ["permanent_country"]: res?.country,
                }
              : { ...prevInput }
          );
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //  handel select
  const handelSelectItem = (itemm) => {
    if (item?.field_name === "member_as_nominee" && itemm?.value === "Yes") {
      if (nomineeCount < 3) {
        setSelectItem(itemm?.value);
        valueProps(itemm?.value);
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  [inputText]: itemm?.value,
                }
              : { ...prevInput }
          );
        });
        dispatch(nomineeIncrease());
      } else {
        Toast.show(`You can't add more than 3 nominees`, {
          duration: 1000,
          backgroundColor: "rgba(51, 105, 179, 1)",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
      }
    } else if (
      item?.field_name === "member_as_nominee" &&
      itemm?.value === "No"
    ) {
      if (personalInfo?.member_as_nominee === "Yes" && nomineeCount > 0) {
        dispatch(nomineeDecrease());
      }
      if (
        personalInfo?.contribution_percentage &&
        parseInt(personalInfo?.contribution_percentage) > 0
      ) {
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  ["contribution_percentage"]: "0",
                }
              : { ...prevInput }
          );
        });
      }
      setSelectItem(itemm?.value);
      valueProps(itemm?.value);

      setPersonalInfo((prevState) => {
        return prevState.map((prevInput, prevInputIndex) =>
          prevInputIndex === inputIndex
            ? {
                ...prevInput,
                [inputText]: itemm?.value,
              }
            : { ...prevInput }
        );
      });
    } else if (
      item?.field_name === "present_postal_code" ||
      item?.field_name === "permanent_postal_code"
    ) {
      if (item?.field_name === "present_postal_code") {
        handleAddressCall(itemm?.value);
      } else {
        handlePermanentAddressCall(itemm?.value);
      }
    } else {
      setSelectItem(itemm?.value);
      valueProps(itemm?.value);
      if (setPersonalInfo && inputText) {
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  [inputText]: itemm?.value,
                }
              : { ...prevInput }
          );
        });
      }
    }
    setOpenList((prv) => !prv);
  };

  useEffect(() => {
    if (required === "1" && errorCheck) {
      if (selectItem === null || selectItem === undefined) {
        if (!personalInfo[inputText]) {
          setBorderColor("red");
        } else {
          setBorderColor(COLOR.blue200);
        }
      } else {
        setBorderColor(COLOR.blue200);
      }
    }
  }, [errorCheck, selectItem]);

  useEffect(() => {
    if (disabled) {
      if (setPersonalInfo && inputText) {
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  [inputText]: item?.field_value,
                }
              : { ...prevInput }
          );
        });
      }
    }
  }, [disabled, userInfo]);

  return (
    <>
      <View style={styles.container}>
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
          disable={disabled}
          search
          style={[
            {
              borderColor: borderColor,
              borderWidth: 0.8,
              paddingHorizontal: rh(1.7),
              paddingVertical: rh(1),
              borderRadius: rh(1),
              backgroundColor: COLOR.white,
              maxHeight: rh(20),
            },
          ]}
          placeholderStyle={{
            color: personalInfo[inputText] ? "black" : "#979797",
            fontSize: rf(1.8),
          }}
          selectedTextStyle={{ fontSize: rf(2) }}
          mode="default"
          data={data}
          // search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={
            personalInfo[inputText] ? personalInfo[inputText] : placeholder
          }
          searchPlaceholder="Search..."
          value={personalInfo[inputText]}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            // setValue(item.value)
            handelSelectItem(item);
            setIsFocus(false);
          }}
        />
        {/* </ScrollView> */}
      </View>
      {item?.field_name === "profession" && category === "health-insurance" && (
        <View
          style={{
            backgroundColor: COLOR.white,
            height: rh(4),
            borderBottomWidth: 1,
            // borderBottomColor: 'red',
            marginBottom: rh(1),
            marginTop: rh(1),
            borderRadius: 1,
          }}
        >
          <Text style={{ fontWeight: "bold" }}> Present Address </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  labelContainerStyle: {
    flexDirection: "row",
    width: "90%",
  },
  startIcon: {},
  label: {
    color: COLOR.gray400,
    marginBottom: rh(0.9),
    // fontSize: 13,
    // fontWeight: "500",
    // fontWeight: "Roboto-Bold",
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: rf(1.7),
  },
  container: {
    marginVertical: rh(1),
    // zIndex: 10,
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
    // marginTop: rh(15),
    width: "100%",
    // flex: 1,
    maxHeight: rh(20),

    // bottom: 0,
    marginTop: rh(5),
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
