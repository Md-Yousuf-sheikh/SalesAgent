import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { COLOR, rh, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import InputText from "../../components/Inputs/InputText";
import CustomSinglePicker from "../../components/Inputs/CustomSinglePicker";
import MediumButton from "../../components/Buttons/MediumButton";
import { useSelector } from "react-redux";
import { useAddNewLeadsMutation } from "../../redux/features/customer/customerApiSlice";
import Toast from "react-native-root-toast";
import { validationCheck } from "../../utils/validation";
import InputNumberPicker from "../../components/Inputs/InputNumberPicker";
import { languageSelector } from "../../redux/features/language/languageSlice";

const typeData = [
  {
    id: 1,
    title: "B2C",
  },
  {
    id: 2,
    title: "B2B",
  },
];

export default function NewLead() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [country, setCountry] = useState({});
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [indexVal, setIndexVal] = useState();
  const [blueTest, setBlueTest] = useState(true);
  const [blueTestSecond, setBlueTestSecond] = useState(false);
  const [filedError, setFiledError] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);

  const language = useSelector(languageSelector);

  const [addNewLeads, { isLoading }] = useAddNewLeadsMutation();

  async function handleLead() {
    if (valid && validationCheck(email, "email")) {
      let data = {
        name: name,
        email: email,
        phone: formattedValue?.slice(1),
        type: type,
        remarks: "Test",
      };
      try {
        const res = await addNewLeads(data).unwrap();
        console.log("TestItOut", res);
        Toast.show("New Lead Created", {
          duration: 1000,
          backgroundColor: "rgba(51, 105, 179, 1)",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
        navigation.navigate("LeadManagement");
      } catch (error) {
        Toast.show(`${error?.data?.message}`, {
          duration: 1500,
          backgroundColor: "red",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
      }
    } else {
      setFiledError(true);
    }
  }

  return (
    <View
      style={{ backgroundColor: COLOR.white, paddingBottom: rh(3), flex: 1 }}
    >
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language.newLeadHeader} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <InputText
          markHide={true}
          label={language.nameTitle}
          setValue={setName}
        />
        <InputText
          value={email}
          label={language.emailTextInput}
          setValue={setEmail}
          type={"email"}
          error={filedError}
        />
        {/* <InputText
          value={contactNo}
          label={language.contactNoTextInput}
          setValue={setContactNo}
          type={'number'}
          error={filedError}
        /> */}
        {/* <InputNumberPicker
          label={language.contactNoTextInput}
          setNumber={setContactNo}
          setCountry={setCountry}
          containerMain={{
            marginTop: rh(1),
          }}
          error={filedError}
        /> */}
        <InputNumberPicker
          label={language.contactNoTextInput}
          setValue={setValue}
          setFormattedValue={setFormattedValue}
          formattedValue={formattedValue}
          valid={valid}
          setValid={setValid}
          containerMain={{
            marginTop: rh(2),
          }}
          value={value}
          filedError={filedError}
        />

        {/* <InputText label={language.AddressTitle} setValue={setAddress} /> */}
        <CustomSinglePicker
          valueProps={setType}
          pickerData={typeData}
          label={language.typeTitle}
          customStyle={{ marginTop: rh(4) }}
        />
        <InputText
          markHide={true}
          label={language.remarksTitle}
          setValue={setRemarks}
        />

        <MediumButton
          loader={isLoading}
          onPress={handleLead}
          stylesButton={{ width: "100%", borderRadius: rh(3), height: rh(6) }}
          title={language.createLeadHeader}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(3),
    marginTop: rh(1),
    // paddingVertical: rh(3),
    // marginBottom: rh(20),
    // paddingBottom: rh(15),
    // flex: 1,
  },
  scrollButton: {
    height: rh(2.3),
    width: rw(4),
    backgroundColor: "#1691CE",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: rh(1),
    borderRadius: rh(0.3),
  },
  addButton: {
    width: rw(33),
    borderRadius: rh(3),
    backgroundColor: COLOR.white,
    borderColor: COLOR.bluishCyan700,
    borderWidth: rh(0.1),
    height: rh(5),
    paddingVertical: rh(1),
    marginVertical: rh(0),
  },
  textStyle: {
    fontSize: 16,
    color: COLOR.blue600,
  },
  //
  activityButtons: {
    width: rw(90),
    height: rh(6.5),
    borderRadius: rh(0.8),
    borderWidth: rh(0.1),
    borderColor: "#E5EAFF",
    alignSelf: "center",
    marginVertical: rh(1),
    alignItems: "center",
    paddingHorizontal: rh(1.5),
    paddingVertical: rh(1),
    flexDirection: "row",
    // justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchFilterContainer: {
    paddingVertical: rh(2.5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInputContainer: {
    flexDirection: "row",
  },
  searchInput: {
    borderWidth: 1,
    height: 46,
    borderColor: "#E5EAFF",
    borderRadius: rh(1),
    width: rw(60),
    paddingHorizontal: 10,
    fontSize: 12,
  },
  searchInputButton: {
    borderWidth: 1,
    height: 46,
    borderColor: "#E5EAFF",
    paddingRight: 8,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  flexDirection: "row",
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0099C9",
    height: 46,
    borderRadius: 3,
    width: rw(25),
    justifyContent: "center",
  },
});
