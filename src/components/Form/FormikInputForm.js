import {
  Animated,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import DocumentPicker from "react-native-document-picker";
import * as ExpoDocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import Text from "../Text/Text";
import { Field } from "formik";
import { useEffect, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import Pdf from "react-native-pdf";
import ImageViewer from "react-native-image-zoom-viewer";
import {
  AntDesign,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLOR } from "../../theme/Theme";
import SvgMarkIcon from "../../svg/SvgMarkIcon";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import { Path, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import {
  codeSelector,
  languageSelector,
} from "../../redux/features/language/languageSlice";
import { Dropdown } from "react-native-element-dropdown";
import DropDownPicker from "react-native-dropdown-picker";

import Checkbox from "expo-checkbox";
import { useLazyGetAddressByPostalCodeQuery } from "../../redux/features/purchase/purchaseApiSlice";
import { usePostIdentityTypeMutation } from "../../redux/features/policy/policyApiSlice";
import {
  isDeleteImage,
  isImageChecker,
  isImageSource,
  isPDFChecker,
  toBnNum,
} from "../../utils";
import { selectCustomer } from "../../redux/features/customer/customerSlice";

export function FormikInputForm({
  formik,
  label = false,
  type,
  name,
  placeholder,
  required,
  isDisabled = false,
  value = "",
  bg = "",
  hint = "",
  readyOnly = null,
  description = false,
  defaultValue = "",
  variant,
  keyboard,
  markShow = false,
  data = [],
  maxDate,
  minDate,
}) {
  const authCustomer = useSelector(selectCustomer);
  const [isFocused, setIsFocused] = useState(false);
  const [labelPosition, setLabelPosition] = useState(new Animated.Value(2));
  const [getAddressByPostalCode, {}] = useLazyGetAddressByPostalCodeQuery();
  const [getIdentity, {}] = usePostIdentityTypeMutation();
  //
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  //
  useEffect(() => {
    const hasValue = formik?.values?.[name] !== "";
    const newPosition = isFocused || hasValue ? -20 : 2;

    Animated.timing(labelPosition, {
      toValue: newPosition,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [formik?.values?.[name], isFocused]);

  const [show, setShow] = useState(type == "password" ? true : false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    if (type === "hidden") {
      formik?.setFieldValue(name, value);
    }
    if (!formik?.values?.[name] && value) {
      formik?.setFieldValue(name, value);
    }
  }, [name]);
  //
  return (
    <Field name={name} id={name}>
      {({ field, form }) => {
        return (
          <>
            {/* <<<----- label ----->>> */}
            {!variant && label && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Text preset="h5" style={styles?.label}>
                  {label.toString()}{" "}
                </Text>

                {required > 0 && (
                  <FontAwesome name="asterisk" size={rh(0.8)} color="red" />
                )}
              </View>
            )}
            {/*  */}
            {variant && (
              <View>
                <View style={[stylesMartial.container]}>
                  <View style={stylesMartial.inputContainer}>
                    <TextInput
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChangeText={(value) => {
                        formik?.setFieldValue(name, value);
                      }}
                      value={formik?.values?.[name]}
                      secureTextEntry={show}
                      multiline={description ? true : false}
                      numberOfLines={description ? 8 : 1}
                      keyboardType={
                        name === "number"
                          ? "number-pad"
                          : keyboard
                          ? keyboard
                          : "default"
                      }
                      placeholderTextColor={"#646464"}
                      style={[
                        styles.inputStyleForMartial,
                        formik?.touched[name] &&
                          formik?.errors[name] && {
                            borderColor: "red",
                          },
                        description && {
                          height: rh(12),
                          textAlignVertical: "top",
                          paddingTop: 20,
                        },
                      ]}
                    />
                    <Animated.View
                      style={[
                        stylesMartial.placeholder,
                        (formik?.values?.[name] !== "" || isFocused) &&
                          stylesMartial.label,
                        {
                          top: labelPosition, // Ensure this is set to labelPosition
                        },

                        formik?.values?.[name] !== "" || isFocused
                          ? {
                              zIndex: 999,
                            }
                          : {
                              zIndex: -999,
                            },
                      ]}
                      pointerEvents={"box-none"}
                    >
                      <Text preset="h5" style={styles?.label}>
                        {label}{" "}
                        {required && (
                          <FontAwesome
                            name="asterisk"
                            size={rh(0.8)}
                            color="red"
                            style={{ marginTop: -10, marginLeft: rh(1) }}
                          />
                        )}
                      </Text>
                    </Animated.View>
                    {/*  active icon */}

                    <View style={styles.passHideEye}>
                      {type === "password" ? (
                        <TouchableOpacity onPress={handleClick}>
                          {show ? (
                            <Ionicons
                              name="eye-off-outline"
                              size={24}
                              color={COLOR.gray100}
                            />
                          ) : (
                            <Ionicons
                              name="eye-outline"
                              size={24}
                              color={COLOR.gray100}
                            />
                          )}
                        </TouchableOpacity>
                      ) : (
                        markShow && (
                          <>
                            <SvgMarkIcon
                              fill={
                                formik?.touched[name] && formik?.errors[name]
                                  ? "#EB4849"
                                  : formik?.values[name]
                                  ? "#009718"
                                  : "#898A8D"
                              }
                            />
                          </>
                        )
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Normal filed */}
            {!variant &&
              type !== "password" &&
              type !== "date" &&
              type !== "time" &&
              type !== "select" &&
              type !== "phoneSelect" &&
              type !== "checkbox" &&
              type !== "multiSelect" &&
              type !== "hidden" &&
              type !== "file" &&
              type !== "files" &&
              type !== "gender" && (
                <TextInput
                  type={type}
                  placeholder={placeholder}
                  value={formik?.values?.[name] ?? value}
                  editable={!isDisabled}
                  multiline={description ? true : false}
                  numberOfLines={description ? 8 : 1}
                  keyboardType={
                    name === "number"
                      ? "number-pad"
                      : keyboard
                      ? keyboard
                      : "default"
                  }
                  style={[
                    styles.inputStyle,
                    formik?.touched[name] &&
                      formik?.errors[name] && {
                        borderColor: "red",
                      },
                    description && {
                      height: rh(12),
                      textAlignVertical: "top",
                      paddingTop: rh(1.2),
                    },
                    isDisabled && {
                      // opacity: 0.5,
                      backgroundColor: "#c8c7c742",
                    },
                  ]}
                  onChangeText={(value) => {
                    formik?.setFieldValue(name, value);
                  }}
                />
              )}

            {/* password */}
            {!variant && type === "password" && (
              <View>
                <TextInput
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  isDisabled={isDisabled}
                  multiline={description ? true : false}
                  numberOfLines={description ? 8 : 1}
                  keyboardType={name === "number" ? "number-pad" : "default"}
                  secureTextEntry={show}
                  style={[
                    styles.inputStyle,
                    formik?.touched[name] &&
                      formik?.errors[name] && {
                        borderColor: "red",
                      },
                    description && {
                      height: rh(12),
                      textAlignVertical: "top",
                      paddingTop: rh(1.2),
                    },
                  ]}
                  onChangeText={(value) => {
                    formik?.setFieldValue(name, value);
                  }}
                />
                <View style={styles.passHideEye}>
                  <TouchableOpacity onPress={handleClick}>
                    {show ? (
                      <Ionicons
                        name="eye-off-outline"
                        size={24}
                        color={COLOR.gray100}
                      />
                    ) : (
                      <Ionicons
                        name="eye-outline"
                        size={24}
                        color={COLOR.gray100}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* phone  */}
            {!variant && type === "phoneSelect" && (
              <PhoneNumber
                placeholder={placeholder}
                value={formik?.values?.[name]}
                setValue={(value) => {
                  form?.setFieldValue(name, value);
                }}
                disabled={isDisabled}
                error={formik?.touched[name] && formik?.errors[name]}
                formik={formik}
                name={name}
                label={label}
                markShow={markShow}
              />
            )}

            {/* date  */}
            {!variant && type === "date" && (
              <DatePicker
                placeholder={placeholder}
                value={formik?.values?.[name]}
                setValue={(value) => {
                  form?.setFieldValue(name, value);
                }}
                disabled={isDisabled}
                error={formik?.touched[name] && formik?.errors[name]}
                maxDate={maxDate}
                minDate={minDate}
              />
            )}
            {!variant && type === "time" && (
              <DatePicker
                placeholder={placeholder}
                value={formik?.values?.[name]}
                setValue={(value) => {
                  form?.setFieldValue(name, value);
                }}
                disabled={isDisabled}
                error={formik?.touched[name] && formik?.errors[name]}
                maxDate={maxDate}
                minDate={minDate}
                mode="time"
              />
            )}

            {/* gender  */}
            {!variant && type === "gender" && (
              <GenderSelector
                placeholder={placeholder}
                value={formik?.values?.[name]}
                setValue={(value) => {
                  form?.setFieldValue(name, value);
                }}
                disabled={isDisabled}
                error={formik?.touched[name] && formik?.errors[name]}
              />
            )}
            {/* single select  */}
            {!variant && type === "select" && (
              <SinglePicker
                label={label}
                placeholder={placeholder}
                value={formik?.values?.[name]}
                data={data}
                setValue={async (value) => {
                  // form?.setFieldValue(name, value?.value);
                  value.value
                    ? formik.setFieldValue(name, value.value)
                    : formik.setFieldValue(name, formik.values?.[name]);
                  //
                  if (name === "identity_type") {
                    try {
                      let response = await getIdentity({
                        user_id: authCustomer?.id,
                        identity_type: value?.value,
                      }).unwrap();
                      if (response) {
                        // console.log(response, "response");
                        formik.setFieldValue(
                          "identity_number",
                          response?.data?.identity_number
                        );
                        formik.setFieldValue(
                          "attachment_front",
                          response?.data?.attachment_front
                        );
                        formik.setFieldValue(
                          "attachment_back",
                          response?.data?.attachment_back
                        );
                      }
                    } catch (error) {
                      formik.setFieldValue("identity_number", "");
                      formik.setFieldValue("attachment_front", "");
                      formik.setFieldValue("attachment_back", "");
                    }
                  } else if (name === "present_postal_code") {
                    try {
                      let response = await getAddressByPostalCode([
                        value.value,
                      ]).unwrap();
                      // console.log(" value.value", value.value);
                      // console.log("response", response);
                      if (response) {
                        formik.setFieldValue("present_thana", response?.thana);
                        formik.setFieldValue(
                          "present_district",
                          response?.district
                        );
                        formik.setFieldValue(
                          "present_country",
                          response?.country
                        );
                        formik.setFieldValue(
                          "present_postal_code",
                          value.value
                        );
                      }

                      if (formik.values?.same_as_present_address) {
                        formik?.setFieldValue(
                          "permanent_country",
                          formik?.values["present_country"]
                        );
                        formik?.setFieldValue(
                          "permanent_district",
                          response?.district
                        );
                        formik?.setFieldValue(
                          "permanent_thana",
                          response?.thana
                        );
                        formik?.setFieldValue(
                          "permanent_address",
                          formik?.values["present_address"]
                        );
                        formik?.setFieldValue(
                          "permanent_postal_code",
                          value.value
                        );
                      }
                    } catch (error) {
                      formik.setFieldValue("present_thana", "");
                      formik.setFieldValue("present_district", "");
                      formik.setFieldValue("present_country", "");
                    }
                  } else if (name === "permanent_postal_code") {
                    try {
                      let response = await getAddressByPostalCode([
                        value.value,
                      ]).unwrap();
                      // console.log("responsePer", response);
                      if (response) {
                        formik.setFieldValue(
                          "permanent_thana",
                          response?.thana
                        );
                        formik.setFieldValue(
                          "permanent_district",
                          response?.district
                        );
                        formik.setFieldValue(
                          "permanent_country",
                          response?.country
                        );
                        formik.setFieldValue(
                          "permanent_postal_code",
                          value.value
                        );
                      }
                    } catch (error) {
                      formik.setFieldValue("permanent_thana", "");
                      formik.setFieldValue("permanent_district", "");
                      formik.setFieldValue("permanent_country", "");
                    }
                  }
                }}
                disabled={isDisabled}
                error={formik?.touched[name] && formik?.errors[name]}
              />
            )}
            {/* single select  */}
            {!variant && type === "multiSelect" && (
              <MultiSelectDropDown
                placeholder={placeholder}
                value={formik?.values?.[name]}
                data={data}
                setValue={(value) => {
                  form?.setFieldValue(name, value);
                }}
                disabled={isDisabled}
                error={formik?.touched[name] && formik?.errors[name]}
              />
            )}
            {/* File Upload */}
            {!variant && type === "file" && (
              <FileUploader
                placeholder={placeholder}
                value={formik?.values?.[name]}
                data={data}
                setValue={(value) => {
                  form?.setFieldValue(name, value);
                }}
                disabled={isDisabled}
                error={formik?.touched[name] && formik?.errors[name]}
              />
            )}
            {/* File Upload */}

            {!variant && type === "files" && (
              <MultipedFileUploader
                placeholder={placeholder}
                value={formik?.values?.[name]}
                data={data}
                setValue={(value) => {
                  console.log("name", name);
                  form?.setFieldValue(name, value);
                }}
                disabled={isDisabled}
                error={formik?.touched[name] && formik?.errors[name]}
              />
            )}
            {/* Checkbox */}
            {!variant && type === "checkbox" && (
              <SelectCheckbox
                placeholder={placeholder}
                value={formik?.values?.[name]}
                setValue={(value) => {
                  form?.setFieldValue(name, value);
                }}
                disabled={isDisabled}
                authUser={authCustomer}
                formik={formik}
                error={formik?.touched[name] && formik?.errors[name]}
              />
            )}
            {/*<<<----- hint ----->>> */}
            {hint && (
              <Text preset="h5" style={styles?.hintMessage}>
                {hint}
              </Text>
            )}
            {/* <<<---- Error ----->>> */}
            {formik?.touched[name] && formik?.errors[name] && (
              <>
                <Text preset="h5" style={styles?.errorMessage}>
                  {formik?.touched[name] && formik?.errors[name]}
                </Text>
              </>
            )}
          </>
        );
      }}
    </Field>
  );
}
//  <<<------ Date picker ----->>>
export default function DatePicker({
  setValue,
  value,
  error,
  placeholder,
  disabled,
  minDate,
  maxDate,
  mode = "date",
}) {
  const code = useSelector(codeSelector);
  const [date, setDate] = useState(value);
  const [show, setShow] = useState(false);
  // on Change
  const onChangeDate = (selectedDate) => {
    setDate(selectedDate);
    setValue?.(moment(selectedDate).format("YYYY-M-D"));
    setShow(false);
  };
  const onChangeTime = (selectedTime) => {
    setDate(moment(selectedTime).format("LT"));
    setValue?.(moment(selectedTime).format("LT"));
    setShow(false);
  };
  // datetime
  const onChangeDateTime = (selectedTime) => {
    setDate(moment(selectedTime).format("LLL"));
    setValue?.(moment(selectedTime).format("LLL"));
    setShow(false);
  };
  // show Date Picker
  const showDatePicker = () => {
    setShow(true);
  };
  // set date and time
  const handleConfirm = (date) => {
    if (mode === "date") {
      onChangeDate(date);
    } else if (mode === "time") {
      onChangeTime(date);
    } else if (mode === "datetime") {
      onChangeDateTime(date);
    }
  };
  // close
  const hideDatePicker = () => {
    setShow(false);
  };

  return (
    <View>
      {/* button */}
      <TouchableOpacity
        onPress={showDatePicker}
        disabled={disabled}
        style={[
          stylesDate.labelContainer,
          error && {
            borderColor: "red",
          },
          disabled && {
            // opacity: 0.5,
            backgroundColor: "#c8c7c742",
          },
        ]}
      >
        <Text color={value ? "#646464" : "gray"}>
          {value ? toBnNum(value, code) : placeholder}
        </Text>
        <View>
          {mode === "time" ? (
            <MaterialCommunityIcons
              name="clock-time-eight-outline"
              size={20}
              color="gray"
            />
          ) : (
            <AntDesign name="calendar" size={20} color="gray" />
          )}
        </View>
      </TouchableOpacity>
      {/* modal date  */}
      <DateTimePickerModal
        isVisible={show}
        // backgroundColor={COLOR.black}
        value={date}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={maxDate}
        minimumDate={minDate}
      />
    </View>
  );
}

//    <<<----- Gender Select ----->>>
export function GenderSelector({ setValue, value, disabled, error }) {
  // const [switchButton, setSwitchButton] = useState(value);
  const language = useSelector(languageSelector);

  return (
    <>
      {/* Switch button */}
      <View
        style={[
          stylesGender.switchContainer,
          disabled && {
            opacity: 0.7,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setValue?.("Male");
          }}
          style={[
            stylesGender.switchButton,
            value?.toLowerCase() === "male" && {
              borderColor: "#2253A5",
            },
            error && {
              borderColor: "red",
            },
            disabled && {
              backgroundColor: "#c8c7c76a",
            },
          ]}
          disabled={disabled}
        >
          <Fontisto
            name="male"
            size={rh(2.2)}
            color={value?.toLowerCase() === "male" ? "#2253A5" : "#595959"}
            style={{
              paddingRight: rh(0.7),
            }}
          />

          <Text
            preset="h6"
            color={value?.toLowerCase() === "male" ? "#2253A5" : "#595959"}
          >
            {language?.male}
          </Text>
        </TouchableOpacity>
        {/* F */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            // setSwitchButton?.("Female");
            setValue?.("Female");
          }}
          style={[
            stylesGender.switchButton,
            value?.toLowerCase() === "female" && {
              borderColor: "#2253A5",
            },
            error && {
              borderColor: "red",
            },
            disabled && {
              backgroundColor: "#c8c7c76a",
            },
          ]}
          disabled={disabled}
        >
          <Fontisto
            name="female"
            size={18}
            color={value?.toLowerCase() === "female" ? "#2253A5" : "#595959"}
            style={{
              paddingRight: rh(0.7),
            }}
          />
          <Text
            preset="h6"
            color={!value?.toLowerCase() === "female" ? "#2253A5" : "#595959"}
          >
            {language?.female}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSwitchButton('other')
          }}
          style={[
            styles.switchButton,
            switchButton === 'other' && { borderColor: '#2253A5' },
            {
              width: '100%',
            },
          ]}
        >
          <Ionicons
            name="ios-male-female-sharp"
            size={18}
            color={switchButton === 'other' ? '#2253A5' : '#595959'}
            style={{
              paddingRight: 5,
            }}
          />

          <Text
            preset="h6"
            color={switchButton === 'other' ? '#2253A5' : '#595959'}
          >
            {languageState?.otherTitle}
          </Text>
        </TouchableOpacity>
      </> */}
    </>
  );
}

//   <<<----- Single Select ----->>>
export function SinglePicker({
  setValue,
  value,
  error,
  placeholder,
  disabled,
  data = [],
  label,
  labelSet = true,
}) {
  const filteredData = data.filter((item) => item?.value == value);

  return (
    <>
      <View style={[stylesSingleSelect.container]}>
        <Dropdown
          style={[
            {
              borderColor: error ? "red" : "#E5EAFF",
              borderWidth: 1,
              paddingHorizontal: rh(1.7),
              paddingVertical: rh(1),
              borderRadius: 5,
              backgroundColor: COLOR.white,
              maxHeight: rh(20),
              height: rh(6.5),
              color: "red",
            },
            disabled === true && {
              // opacity: 0.5,
              backgroundColor: "#c8c7c742",
            },
          ]}
          placeholderStyle={{
            color: value ? "#646464" : "#494949",
            fontSize: rf(1.7),
            fontWeight: "300",
          }}
          mode="default"
          selectedTextStyle={{
            color: "#646464",
            fontSize: rf(1.7),
          }}
          data={data}
          search={data?.length > 5 ? true : false}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={filteredData?.[0]?.label || placeholder}
          searchPlaceholder="Search..."
          value={value}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue?.(item);
          }}
          disable={disabled}
        />
      </View>
    </>
  );
}
//   <<<----- Multi Select DropDown ------->>
export function MultiSelectDropDown({
  setValue,
  value,
  error,
  placeholder,
  disabled,
  data = [],
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(data);
  return (
    <View>
      <View
        style={{
          zIndex: 10,
        }}
      >
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          placeholder={placeholder}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          disabled={disabled}
          theme="LIGHT"
          multiple={true}
          mode="BADGE"
          hideTags={true}
          badgeDotStyle={{
            display: "none",
          }}
          style={{
            borderColor: error ? "red" : "#ddd",
          }}
          dropDownContainerStyle={{
            borderColor: "#ddd",
          }}
        />
      </View>
    </View>
  );
}
//  <<<----- Image Picker  ---->>>
export const getFileInfo = async (fileURI) => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI);
  return fileInfo;
};

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

export function FileUploader({
  setValue,
  value,
  error,
  placeholder,
  disabled,
}) {
  const language = useSelector(languageSelector);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePdfOrImage, setIsVisiblePdfOrImage] = useState(false);
  // documentPicker
  const documentPicker = async (type) => {
    const granted = await requestStoragePermission();
    console.log("granted", granted);
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
        allowsEditing: true,
      });
      if (!results.canceled) {
        result = {
          name: results?.assets[0]?.uri?.split("/").pop(),
          mimeType: "image/jpeg",
          uri: results?.assets[0]?.uri,
        };
      }
      setIsVisible((prv) => !prv);
    } else {
      try {
        if (Platform.OS == "ios") {
          const results = await DocumentPicker.pick({
            type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
          });
          result = {
            name: results?.[0]?.name,
            mimeType: "image/jpeg",
            uri: results?.[0]?.uri,
          };
        } else {
          const results = await ExpoDocumentPicker.getDocumentAsync({
            type: ["image/*", "application/pdf"], // Specify the file types you want to allow (e.g., 'application/pdf' for PDF)
          });
          console.log("results", results);
          if (!results?.canceled) {
            result = {
              name: results?.assets?.[0]?.name,
              mimeType: results?.assets?.[0]?.mimeType,
              uri: results?.assets?.[0]?.uri,
            };
          }
          console.log("result", result);
        }
      } catch (error) {
      } finally {
        setIsVisible((prv) => !prv);
      }
    }

    if (result == undefined) {
      setValue(value);
    } else {
      const data = {
        name: result?.name,
        type: result?.mimeType,
        uri: result?.uri,
      };
      setValue(data);
    }
  };
  // pdf
  const isPDF = isPDFChecker(value);
  // image
  const isImage = isImageChecker(value);
  // source
  const source = isImageSource(value);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsVisible(true)}
        disabled={disabled}
        style={[
          stylesImage.button,
          error && {
            borderColor: "red",
          },
          disabled && {
            backgroundColor: "#e3e3e372",
          },
        ]}
      >
        <Text
          preset="SL"
          color={value ? "#000000" : "#C7C7C7"}
          style={stylesImage.title}
          line={1}
          ellipsize="head"
        >
          {placeholder}
        </Text>

        {(isImage || isPDF) && source ? (
          <TouchableOpacity
            onPress={() => setIsVisiblePdfOrImage((prv) => !prv)}
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isImage && (
              <Image
                source={{
                  uri: source ?? "",
                }}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                }}
              />
            )}
            {isPDF && (
              <Image
                source={require("../../../assets/pdf-icon.png")}
                style={{
                  width: 50,
                  height: 30,
                  resizeMode: Platform.OS == "android" ? "center" : "contain",
                  position: "absolute",
                }}
              />
            )}
          </TouchableOpacity>
        ) : (
          <Svg width={24} height={24} fill="none">
            <Path
              d="M19 9.633v5.224c0 .303-.127.594-.354.808a1.246 1.246 0 0 1-.855.335H1.209c-.32 0-.628-.12-.855-.335A1.112 1.112 0 0 1 0 14.857V9.633c0-.303.127-.594.354-.808.227-.215.534-.335.855-.335h4.146c.137 0 .269.051.366.143a.477.477 0 0 1 .152.347c0 .13-.055.254-.152.346a.534.534 0 0 1-.366.143H1.209a.178.178 0 0 0-.122.048.159.159 0 0 0-.05.116v5.224c0 .043.018.085.05.116.032.03.076.047.122.047h16.582c.046 0 .09-.017.122-.047a.159.159 0 0 0 .05-.116V9.633a.159.159 0 0 0-.05-.116.178.178 0 0 0-.122-.048h-4.146a.534.534 0 0 1-.366-.143.477.477 0 0 1-.152-.346c0-.13.055-.255.152-.347a.534.534 0 0 1 .367-.143h4.145c.32 0 .628.12.855.335.227.214.354.505.354.808ZM5.717 4.75l3.265-3.078V8.98c0 .13.054.254.152.346a.534.534 0 0 0 .366.143c.137 0 .27-.051.366-.143a.477.477 0 0 0 .152-.346V1.673l3.265 3.078a.517.517 0 0 0 .363.142.54.54 0 0 0 .362-.142.485.485 0 0 0 .15-.343.462.462 0 0 0-.15-.343L9.863.147A.502.502 0 0 0 9.5 0a.526.526 0 0 0-.363.147L4.992 4.065a.472.472 0 0 0-.15.343c0 .129.054.252.15.343.096.09.226.142.363.142a.528.528 0 0 0 .362-.142Zm9.829 7.494c0-.162-.051-.32-.146-.454a.855.855 0 0 0-.388-.3.91.91 0 0 0-.499-.047.88.88 0 0 0-.442.224.804.804 0 0 0-.236.418.776.776 0 0 0 .049.471c.065.15.176.277.318.367a.9.9 0 0 0 1.09-.102.794.794 0 0 0 .254-.577Z"
              fill="#5D5FEF"
            />
          </Svg>
        )}
      </TouchableOpacity>
      {/* Modal */}
      <Modal
        onRequestClose={() => {
          setIsVisible(false);
        }}
        animationType="fade"
        visible={isVisible}
        transparent={true}
      >
        <View style={stylesImage.modalStyle}>
          <TouchableOpacity
            style={{
              height: "100%",
              position: "absolute",
              width: "100%",
            }}
            onPress={() => {
              setIsVisible(false);
            }}
          />
          {/* View */}
          <View style={stylesImage.card}>
            <Text preset="h5" style={stylesImage.cardTitle}>
              {language?.fileUpload}
            </Text>
            <Text preset="h6" color={"#353131b1"} style={stylesImage.cardTitle}>
              {placeholder}
            </Text>
            <View style={stylesImage.cardButtons}>
              <TouchableOpacity
                onPress={() => {
                  const type = "camera";
                  documentPicker(type);
                }}
                activeOpacity={0.8}
                style={stylesImage.cardButton}
              >
                <Text style={stylesImage.cardBtnTitle}>
                  {language?.capture}
                </Text>
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
                style={stylesImage.cardButton}
              >
                <Text style={stylesImage.cardBtnTitle}>{language?.upload}</Text>
                <FontAwesome name="upload" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/*  view */}
      <MultipedImagePdfViewModal
        item={value}
        onClose={() => setIsVisiblePdfOrImage((prv) => !prv)}
        isVisible={isVisiblePdfOrImage}
      />
    </>
  );
}
//  <<<------- Multiped Image ------>>>
export function MultipedFileUploader({
  setValue,
  value,
  error,
  placeholder,
  disabled,
}) {
  const language = useSelector(languageSelector);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePdfOrImage, setIsVisiblePdfOrImage] = useState(false);
  const [showDoc, setShowDoc] = useState();
  // documentPicker
  const documentPicker = async (type) => {
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
        allowsEditing: true,
      });
      if (!results.canceled) {
        result = {
          name: results?.assets[0]?.uri?.split("/").pop(),
          mimeType: "image/jpeg",
          uri: results?.assets[0]?.uri,
        };
      }
      setIsVisible((prv) => !prv);
    } else {
      try {
        if (Platform.OS == "ios") {
          const results = await DocumentPicker.pick({
            type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
          });
          result = {
            name: results?.[0]?.name,
            mimeType: "image/jpeg",
            uri: results?.[0]?.uri,
          };
        } else {
          const results = await ExpoDocumentPicker.getDocumentAsync({
            type: ["image/*", "application/pdf"], // Specify the file types you want to allow (e.g., 'application/pdf' for PDF)
          });

          console.log("results", results);
          if (!results?.canceled) {
            result = {
              name: results?.assets?.[0]?.name,
              mimeType: results?.assets?.[0]?.mimeType,
              uri: results?.assets?.[0]?.uri,
            };
          }
        }
      } catch (error) {
      } finally {
        setIsVisible((prv) => !prv);
      }
    }
    //  set value
    if (result == undefined) {
      setValue(value);
    } else {
      const data = {
        name: result?.name,
        type: result?.mimeType,
        uri: result?.uri,
      };
      //  set new data
      if (Array.isArray(value)) {
        setValue([...value, data]);
      } else {
        setValue([data]);
      }
    }
  };

  return (
    <>
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsVisible(true)}
          disabled={disabled}
          style={[
            stylesImage.button,
            error && {
              borderColor: "red",
            },
            disabled && {
              backgroundColor: "#e3e3e372",
            },
          ]}
        >
          <Text
            preset="SL"
            color={value?.length > 0 ? "#000000" : "#C7C7C7"}
            style={stylesImage.title}
            line={1}
            ellipsize="head"
          >
            {placeholder}
          </Text>
          <Svg width={24} height={24} fill="none">
            <Path
              d="M19 9.633v5.224c0 .303-.127.594-.354.808a1.246 1.246 0 0 1-.855.335H1.209c-.32 0-.628-.12-.855-.335A1.112 1.112 0 0 1 0 14.857V9.633c0-.303.127-.594.354-.808.227-.215.534-.335.855-.335h4.146c.137 0 .269.051.366.143a.477.477 0 0 1 .152.347c0 .13-.055.254-.152.346a.534.534 0 0 1-.366.143H1.209a.178.178 0 0 0-.122.048.159.159 0 0 0-.05.116v5.224c0 .043.018.085.05.116.032.03.076.047.122.047h16.582c.046 0 .09-.017.122-.047a.159.159 0 0 0 .05-.116V9.633a.159.159 0 0 0-.05-.116.178.178 0 0 0-.122-.048h-4.146a.534.534 0 0 1-.366-.143.477.477 0 0 1-.152-.346c0-.13.055-.255.152-.347a.534.534 0 0 1 .367-.143h4.145c.32 0 .628.12.855.335.227.214.354.505.354.808ZM5.717 4.75l3.265-3.078V8.98c0 .13.054.254.152.346a.534.534 0 0 0 .366.143c.137 0 .27-.051.366-.143a.477.477 0 0 0 .152-.346V1.673l3.265 3.078a.517.517 0 0 0 .363.142.54.54 0 0 0 .362-.142.485.485 0 0 0 .15-.343.462.462 0 0 0-.15-.343L9.863.147A.502.502 0 0 0 9.5 0a.526.526 0 0 0-.363.147L4.992 4.065a.472.472 0 0 0-.15.343c0 .129.054.252.15.343.096.09.226.142.363.142a.528.528 0 0 0 .362-.142Zm9.829 7.494c0-.162-.051-.32-.146-.454a.855.855 0 0 0-.388-.3.91.91 0 0 0-.499-.047.88.88 0 0 0-.442.224.804.804 0 0 0-.236.418.776.776 0 0 0 .049.471c.065.15.176.277.318.367a.9.9 0 0 0 1.09-.102.794.794 0 0 0 .254-.577Z"
              fill="#5D5FEF"
            />
          </Svg>
        </TouchableOpacity>
        {/* images */}
        {value?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingVertical: 10,
              gap: 10,
            }}
          >
            {value?.map((item) => {
              const isPDF = isPDFChecker(item);
              const isImage = isImageChecker(item);
              const source = isImageSource(item);
              const handelRemove = () => {
                const result = isDeleteImage({
                  value,
                  item,
                });
                setValue(result);
              };
              return (
                <>
                  {(isImage || isPDF) && (
                    <>
                      {isImage && (
                        <TouchableOpacity
                          onPress={() => {
                            setShowDoc(item);
                            setIsVisiblePdfOrImage((prv) => !prv);
                          }}
                          style={{
                            width: 80,
                            height: 80,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={handelRemove}
                            style={{
                              position: "absolute",
                              right: -5,
                              top: -10,
                              zIndex: 999,
                              backgroundColor: "#fff",
                              borderRadius: 50,
                            }}
                          >
                            <AntDesign
                              name="closecircle"
                              size={24}
                              color="#ef1e1ea7"
                            />
                          </TouchableOpacity>
                          <Image
                            source={{
                              uri: source ?? "",
                            }}
                            style={{
                              width: 80,
                              height: 80,
                              resizeMode: "cover",
                              borderRadius: 10,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                      {isPDF && (
                        <TouchableOpacity
                          onPress={() => {
                            setShowDoc(item);

                            setIsVisiblePdfOrImage((prv) => !prv);
                          }}
                          style={{
                            width: 80,
                            height: 80,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={handelRemove}
                            style={{
                              position: "absolute",
                              right: -5,
                              top: -10,
                              zIndex: 999,
                              backgroundColor: "#fff",
                              borderRadius: 50,
                            }}
                          >
                            <AntDesign
                              name="closecircle"
                              size={24}
                              color="#ef1e1ea7"
                            />
                          </TouchableOpacity>

                          {isPDF && (
                            <Image
                              source={require("../../../assets/pdf-icon.png")}
                              style={{
                                width: 80,
                                height: 80,
                                resizeMode: "center",
                                position: "absolute",
                              }}
                            />
                          )}
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </>
              );
            })}
            <MultipedImagePdfViewModal
              value={showDoc}
              item={showDoc}
              onClose={() => setIsVisiblePdfOrImage((prv) => !prv)}
              isVisible={isVisiblePdfOrImage}
            />
          </View>
        )}
      </>

      {/* Modal */}
      <Modal
        onRequestClose={() => {
          setIsVisible(false);
        }}
        animationType="fade"
        visible={isVisible}
        transparent={true}
      >
        <View style={stylesImage.modalStyle}>
          <TouchableOpacity
            style={{
              height: "100%",
              position: "absolute",
              width: "100%",
            }}
            onPress={() => {
              setIsVisible(false);
            }}
          />
          {/* View */}
          <View style={stylesImage.card}>
            <Text preset="h5" style={stylesImage.cardTitle}>
              {language?.fileUpload}
            </Text>
            <Text preset="h6" color={"#353131b1"} style={stylesImage.cardTitle}>
              {placeholder}
            </Text>
            <View style={stylesImage.cardButtons}>
              <TouchableOpacity
                onPress={() => {
                  const type = "camera";
                  documentPicker(type);
                }}
                activeOpacity={0.8}
                style={stylesImage.cardButton}
              >
                <Text style={stylesImage.cardBtnTitle}>
                  {language?.capture}
                </Text>
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
                style={stylesImage.cardButton}
              >
                <Text style={stylesImage.cardBtnTitle}>{language?.upload}</Text>
                <FontAwesome name="upload" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/*  view */}
    </>
  );
}
//  <<<------- Checkbox -------->>>

export function SelectCheckbox({
  value,
  setValue,
  disabled,
  formik,
  placeholder,
  authUser,
}) {
  //
  useEffect(() => {
    if (
      formik &&
      formik.values?.same_as_present_address?.toString() === "true"
    ) {
      if (
        !formik?.values["present_address"] ||
        !formik?.values["present_postal_code"] ||
        !formik?.values["present_thana"] ||
        !formik?.values["present_district"]
      ) {
        // toast("All present address fields is required.", "error");
        formik.setFieldValue("same_as_present_address", false);
      } else {
        formik.setFieldValue(
          "permanent_country",
          formik.values?.same_as_present_address
            ? formik?.values["present_country"]
            : authUser["permanent_country"] ?? ""
        );
        formik.setFieldValue(
          "permanent_district",
          formik.values?.same_as_present_address
            ? formik?.values["present_district"]
            : authUser["permanent_district"] ?? ""
        );
        formik.setFieldValue(
          "permanent_thana",
          formik.values?.same_as_present_address
            ? formik?.values["present_thana"]
            : authUser["permanent_thana"] ?? ""
        );
        formik.setFieldValue(
          "permanent_address",
          formik.values?.same_as_present_address
            ? formik?.values["present_address"]
            : authUser["permanent_address"] ?? ""
        );
        formik.setFieldValue(
          "permanent_postal_code",
          formik.values?.same_as_present_address
            ? formik?.values["present_postal_code"]
            : authUser["permanent_postal_code"] ?? ""
        );
      }
      return;
    }
  }, [formik.values]);
  return (
    <View style={styleSelectCheckbox.container}>
      <Checkbox
        style={styleSelectCheckbox.checkBox}
        value={value}
        onValueChange={() => {
          setValue(!value);
        }}
        color={value ? "#3182CE" : undefined}
      />
      <Text preset="h5" color={"#646464"}>
        {placeholder}
      </Text>
    </View>
  );
}
// for nominee
export function NomineeSelectCheckbox({
  value,
  setValue,
  disabled,
  formik,
  placeholder,
  authUser,
}) {
  return (
    <View style={styleSelectCheckbox.container}>
      <Checkbox
        style={styleSelectCheckbox.checkBox}
        value={value}
        onValueChange={() => {
          setValue(!value);
        }}
        color={value ? "#3182CE" : undefined}
      />
      <Text preset="h5" color={"#646464"}>
        {placeholder}
      </Text>
    </View>
  );
}

//  <<< ------- Input Form ------->
export function FormInputText({
  setValue,
  value,
  error,
  placeholder,
  disabled,
  keyboard,
  type,
  description,
}) {
  return (
    <TextInput
      type={type}
      placeholder={placeholder}
      value={value}
      editable={!disabled}
      multiline={description ? true : false}
      numberOfLines={description ? 8 : 1}
      keyboardType={keyboard}
      style={[
        styles.inputStyle,
        error && {
          borderColor: "red",
        },
        description && {
          height: rh(12),
          textAlignVertical: "top",
          paddingTop: rh(1.2),
        },
        disabled && {
          // opacity: 0.5,
          backgroundColor: "#c8c7c742",
        },
      ]}
      onChangeText={(value) => {
        setValue(value);
      }}
    />
  );
}

//  << ------ Phone Number ---->>>>
export function PhoneNumber({
  name,
  setValue,
  value,
  error,
  placeholder,
  disabled,
  markShow,
  formik,
  label,
}) {
  return (
    <View
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <PhoneInput
        defaultCode="BD"
        placeholder={placeholder}
        layout="first"
        value={value?.substring(3)}
        disabled={disabled}
        onChangeFormattedText={(v) => {
          const value = v?.replace(/\+/g, "");
          setValue(value);
        }}
        textInputStyle={{
          fontSize: rf(1.8),
          fontWeight: "400",
          color: "#646464",
        }}
        codeTextStyle={{
          fontSize: rf(1.8),
          fontWeight: "400",
          color: "#646464",
        }}
        containerStyle={[
          styles.phoneInput,
          formik?.touched?.[name] &&
            formik?.errors?.[name] && {
              borderColor: "red",
            },
          error && {
            borderColor: "red",
          },
          !label && {
            marginTop: 20,
          },
          disabled && {
            backgroundColor: "#c8c7c742",
            // opacity: 0.6,
          },
        ]}
        textContainerStyle={[
          styles.textContainerStyle,
          Platform.OS === "android" && {
            paddingVertical: 12,
          },
          disabled && {
            backgroundColor: "#eeeeee7c",
          },
          { fontWeight: "300" },
        ]}
        textInputProps={{ maxLength: 10 }}
      />
      <View
        style={[
          styles.passHideEye,
          {
            marginTop: 9,
          },
        ]}
      >
        {markShow && (
          <>
            <SvgMarkIcon
              fill={
                formik?.touched[name] && formik?.errors[name]
                  ? "#EB4849"
                  : formik?.values[name]
                  ? "#009718"
                  : "#898A8D"
              }
            />
          </>
        )}
      </View>
    </View>
  );
}

//  pdf view
export const ImageOrPdfViewModal = ({
  onClose,
  onOpen,
  onPress,
  isVisible,
  value,
  isPDF,
  isImage,
  item,
}) => {
  const [loading, setLoading] = useState(true);
  console.log("isImage", isImage, "value->", value);
  return (
    <>
      <Modal
        onRequestClose={onClose}
        visible={isVisible}
        animationType="fade"
        transparent={true}
      >
        <View style={stylesImage.pdfModalContainer}>
          <TouchableOpacity style={stylesImage.onCloseButton} onPress={onClose}>
            <AntDesign name="closecircle" size={24} color="#000000" />
          </TouchableOpacity>
          <View>
            {isPDF && (
              <>
                {loading && (
                  <View
                    style={[
                      stylesImage.pdf,
                      {
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <ActivityIndicator size={50} color="#ffffff" />
                  </View>
                )}

                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: value,
                    cache: true,
                  }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                    setLoading(false); // Set loading to false once the PDF is loaded
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={(error) => {
                    console.log(error);
                  }}
                  onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  style={stylesImage.pdf}
                />
              </>
            )}
            {isImage && (
              <View style={stylesImage.pdf}>
                <ImageViewer
                  imageUrls={[
                    {
                      url: value,
                    },
                  ]}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};
export const MultipedImagePdfViewModal = ({
  onClose,
  onOpen,
  onPress,
  isVisible,
  item,
}) => {
  const [loading, setLoading] = useState(true);
  const isPDF = isPDFChecker(item);
  const isImage = isImageChecker(item);
  const value = isImageSource(item);
  return (
    <>
      <Modal
        onRequestClose={onClose}
        visible={isVisible}
        animationType="fade"
        transparent={true}
      >
        <View style={stylesImage.pdfModalContainer}>
          <TouchableOpacity style={stylesImage.onCloseButton} onPress={onClose}>
            <AntDesign name="closecircle" size={25} color="#000000" />
          </TouchableOpacity>
          <View>
            {isPDF && (
              <>
                {loading && (
                  <View
                    style={[
                      stylesImage.pdf,
                      {
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <ActivityIndicator size={50} color="#ffffff" />
                  </View>
                )}

                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: value,
                    cache: true,
                  }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                    setLoading(false); // Set loading to false once the PDF is loaded
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={(error) => {
                    console.log(error);
                  }}
                  onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  style={stylesImage.pdf}
                />
              </>
            )}
            {isImage && (
              <View style={stylesImage.pdf}>
                <ImageViewer
                  imageUrls={[
                    {
                      url: value,
                    },
                  ]}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const stylesImage = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    borderColor: "#E5EAFF",
    height: rh(6.5),
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    width: "80%",
    fontWeight: "700",
  },
  // modalStyle
  modalStyle: {
    flex: 1,
    backgroundColor: "#00000037",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  //  card
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 25,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontWeight: "700",
    paddingBottom: 15,
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
  label: {
    color: "#646464",
    // fontWeight: "800",
    // lineHeight: 17,
    marginTop: rh(1.2),
  },

  // pdf view design
  pdfModalContainer: {
    flex: 1,
    backgroundColor: "#0c0c0c3d",
  },
  pdf: {
    height: rh(100),
    width: rw(100),
    backgroundColor: "#040404ff",
  },
  // onCloseButton
  onCloseButton: {
    position: "absolute",
    top: Platform.OS == "android" ? 10 : 70,
    right: 10,
    zIndex: 9999,
    backgroundColor: "#ffffff",
    borderRadius: 100,
  },
});

const styleSelectCheckbox = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkBox: {
    marginRight: 10,
    height: 16,
    width: 16,
  },
});

// stylesSingleSelect
const stylesSingleSelect = StyleSheet.create({
  labelContainerStyle: {
    flexDirection: "row",
    width: "90%",
  },
  startIcon: {},
  label: {
    color: COLOR.gray400,
    // marginBottom: rh(0.9),
    // fontSize: 13,
    // fontWeight: "500",
    // fontWeight: "Roboto-Bold",
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: rf(1.7),
  },
  container: {},
  labelContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d94d4d",
    borderWidth: 1,
    borderColor: COLOR.blue200,
    paddingHorizontal: rh(1.2),
    color: COLOR.gray400,
    height: 50,
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

// style gender
const stylesGender = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchButton: {
    borderWidth: 1,
    paddingVertical: rh(1.4),
    borderRadius: rh(1),
    borderColor: "#E5EAFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
});

// date style
const stylesDate = StyleSheet.create({
  container: {
    marginVertical: rh(1),
  },
  labelContainerStyle: {
    flexDirection: "row",
  },
  startIcon: {},
  label: {
    color: COLOR.gray400,
    marginBottom: rh(0.9),
    fontSize: rf(1.75),
    fontWeight: "500",
    fontWeight: "Roboto-Bold",
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: COLOR.blue200,
    // paddingHorizontal: rh(1.2),
    color: COLOR.gray400,
    height: rh(6.5),
    borderRadius: rh(1.2),
    paddingHorizontal: 14,
    maxWidth: "100%",
  },
});

// styles
const styles = StyleSheet.create({
  container: {
    //
  },
  phoneInput: {
    borderRadius: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5EAFF",
    height: rh(6.5),
  },
  textContainerStyle: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#ffffff",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#E5EAFF",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    height: rh(6.5),
    paddingHorizontal: rh(2.1),
    position: "relative",
    backgroundColor: "#ffffff",
    color: "#646464",
  },
  inputStyleForMartial: {
    borderWidth: 1,
    borderColor: "#E5EAFF",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    height: rh(6.5),
    paddingHorizontal: rh(2.1),
    position: "relative",
    color: "#646464",
  },
  label: {
    color: "#646464",
    lineHeight: 17,
    paddingTop: 15,
    paddingBottom: 6,
  },
  hintMessage: {
    color: "#646464",
    lineHeight: 17,
    paddingVertical: 5,
  },
  errorMessage: {
    color: "#eb1313",
    lineHeight: 17,
    paddingTop: 5,
    paddingBottom: 5,
  },
  passHideEye: {
    position: "absolute",
    right: 0,
    width: "10%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 10,
  },
  // rightIcon
});

const stylesMartial = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    minHeight: 50,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5EAFF",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    height: rh(6.5),
    paddingHorizontal: rh(2.1),
    position: "relative",
  },
  placeholder: {
    position: "absolute",
    left: 10,
    fontSize: 16,
    color: "gray",
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: "blue",
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
});
