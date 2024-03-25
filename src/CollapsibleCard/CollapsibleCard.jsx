import {
  FlatList,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { COLOR, CONTAINER, rh, ROW, rw } from "../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import Text from "../components/Text/Text";
import CloseDetails from "../../assets/close-details.svg";
import CurrencyFormat from "../components/Shared/CurrencyFormat";
import { useSelector } from "react-redux";
import {
  languageSelector,
  codeSelector,
} from "../redux/features/language/languageSlice";
import { ToEnNum } from "../components/Helper/Helper";

export default function CollapsibleCard({
  check = false,
  data,
  pending = false,
  regular = false,
  inactive = false,
  agent = false,
  index,
  colorText,
  userData,
  policyData,
  draft = false,
  dueAmount,
  commission = false,
  mainItem,
  active = false,
}) {
  const [open, setOpen] = useState();
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);

  return (
    <>
      <TouchableOpacity
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopColor: "#C7C7C7",
            borderTopWidth: rh(0.1),
            backgroundColor: index % 2 ? "#ffffff" : "#F1F4FF",
            minHeight: rh(6),
            paddingHorizontal: rh(0.2),
            paddingVertical: rh(1),
            // width: rw(23),
          },
        ]}
        onPress={() => setOpen(!open)}
        activeOpacity={0.5}
      >
        {/* User Name */}
        <Text
          preset="SL"
          color={index % 2 ? (colorText ? colorText : "#646464") : "#646464"}
          style={{ width: rw(22), textTransform: "capitalize" }}
        >
          {data?.full_name
            ? data?.full_name
            : userData?.fullName
            ? userData?.fullName
            : data?.name
            ? data?.name
            : userData?.name
            ? userData?.name
            : userData?.full_name}
        </Text>
        {/* Policy Name */}
        <Text
          preset="SL"
          color={index % 2 ? (colorText ? colorText : "#646464") : "#646464"}
          style={{ width: rw(22) }}
        >
          {commission
            ? policyData?.name
            : policyData
            ? policyData?.category?.title
            : check
            ? data?.category
            : pending
            ? data?.policyName
            : draft
            ? policyData?.name
            : regular
            ? data?.contact
            : inactive
            ? data?.contact_number
            : agent
            ? data?.userId
            : active
            ? data?.uid
            : data?.contact_number
            ? data?.contact_number
            : userData?.contactNumber
            ? userData?.contactNumber
            : userData?.phone
            ? userData?.phone
            : userData?.contact_number}
        </Text>
        {/* Amount */}
        <Text
          preset="SL"
          color={index % 2 ? (colorText ? colorText : "#646464") : "#646464"}
          style={{ width: rw(23) }}
        >
          {dueAmount
            ? dueAmount
            : check
            ? policyData?.name
            : pending
            ? `${language?.bdt} ${ToEnNum(
                CurrencyFormat(policyData?.premium_amount),
                code
              )} `
            : draft
            ? `${language?.bdt} ${ToEnNum(
                CurrencyFormat(policyData?.premium_amount),
                code
              )} `
            : regular
            ? data?.purchasedNo
            : commission
            ? mainItem?.credit
              ? mainItem?.credit
              : 0
            : inactive
            ? data?.uid
            : agent
            ? data?.designation
            : active
            ? data?.role[0]
            : userData?.email
            ? userData?.email
            : userData?.email}
        </Text>

        {/*  */}
        {agent ? (
          <Text
            style={{ width: rw(20) }}
            preset="SL"
            color={index % 2 ? (colorText ? colorText : "#646464") : "#646464"}
          >
            {data?.area}
          </Text>
        ) : (
          !active && <CloseDetails />
        )}
      </TouchableOpacity>
      {open && (
        <View style={{ marginVertical: rh(1) }}>
          {data?.id || userData?.id ? (
            <Text preset="SL" color={"#000000"}>
              User Id:{" "}
              <Text preset="SL" color={"#646464"}>
                {data?.uid ? data?.uid : userData?.uid}
              </Text>
            </Text>
          ) : null}
          {data?.zone ? (
            <Text preset="SL" color={"#000000"}>
              Zone:{" "}
              <Text preset="SL" color={"#646464"}>
                <Text preset="SL" color={"#646464"}>
                  {data?.zone}
                </Text>
              </Text>
            </Text>
          ) : null}
          {data?.area ? (
            <Text preset="SL" color={"#000000"}>
              Area:{" "}
              <Text preset="SL" color={"#646464"}>
                Dhanmondi 32
              </Text>
            </Text>
          ) : null}
          {data?.email || userData?.email ? (
            <Text preset="SL" color={"#000000"}>
              Email:{" "}
              <Text preset="SL" color={"#646464"}>
                {data?.email ? data?.email : userData?.email}
              </Text>
            </Text>
          ) : null}
          {userData?.type ? (
            <Text preset="SL" color={"#000000"}>
              Customer Type:{" "}
              <Text preset="SL" color={"#646464"}>
                {userData?.type}
              </Text>
            </Text>
          ) : null}
          {data?.contact_number || userData?.contactNumber ? (
            <Text preset="SL" color={"#000000"}>
              Contact No:{" "}
              <Text preset="SL" color={"#646464"}>
                {data?.contact_number
                  ? data?.contact_number
                  : userData?.contactNumber}
              </Text>
            </Text>
          ) : null}
          {mainItem?.date && mainItem !== undefined ? (
            <Text preset="SL" color={"#000000"}>
              Date:{" "}
              <Text preset="SL" color={"#646464"}>
                {mainItem?.date ? mainItem?.date : null}
              </Text>
            </Text>
          ) : null}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(3),
    marginTop: rh(1),
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
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: rw(50),
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
