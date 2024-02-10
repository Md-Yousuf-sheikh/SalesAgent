import { Modal, StyleSheet, View } from "react-native";
import React from "react";
import InputText from "../../../components/Inputs/InputText";
import { rh, rw } from "../../../theme/Theme";
import IndependentPicker from "../../../components/Inputs/IndependentPicker";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import Text from "../../../components/Text/Text";
import MediumButton from "../../../components/Buttons/MediumButton";
import { AntDesign } from "@expo/vector-icons";
import { useGetInsularListQuery } from "../../../redux/features/policy/policyApiSlice";
import CustomMultiSelectDropDown from "../../../components/Inputs/CustomMultiSelectDropDown";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function FilterModal({
  filterPolicy,
  setFilterPolicy,
  refetch,
}) {
  const language = useSelector(languageSelector);
  const { data } = useGetInsularListQuery();
  //
  const queryString = Object.entries(filterPolicy)
    .filter(
      ([key, value]) => key !== "isVisible" && value !== "" && value != null
    )
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  // handelFilter
  const handelFilter = () => {
    if (queryString !== "") {
      setFilterPolicy((prv) => ({
        ...prv,
        isVisible: false,
        filter: queryString,
      }));

      refetch();
    } else {
      setFilterPolicy((prv) => ({
        ...prv,
        isVisible: false,
      }));
    }
  };
  // handelFilter
  const handelResat = () => {
    setFilterPolicy((prv) => ({
      ...prv,
      isVisible: false,
      filter: "",
    }));
    refetch();
  };
  //

  return (
    <Modal
      visible={filterPolicy?.isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          {/*  */}
          <View style={styles.header}>
            <Text preset="h2">{language?.filterPolicy}</Text>
            <TouchableOpacity
              onPress={() => {
                setFilterPolicy((prv) => ({
                  isVisible: false,
                }));
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {/* Invest Amount */}
          <InputText
            setValue={(val) => {
              setFilterPolicy((prv) => ({
                ...prv,
                coverageAmount: val,
              }));
            }}
            placeholder={language?.min_coverage_amount}
            markHide={true}
            keyboardType={"number-pad"}
          />
          {/* Duration Type */}
          <View
            style={{
              zIndex: 99999,
            }}
          >
            <IndependentPicker
              setListValue={(item) => {
                setFilterPolicy?.((prv) => ({
                  ...prv,
                  durationType: item?.value,
                }));
              }}
              placeholder={language?.durationType}
              data={[
                {
                  id: 1,
                  title: language?.days,
                  value: "day",
                },
                {
                  id: 3,
                  title: language?.years,
                  value: "year",
                },
              ]}
              styleInput={{
                zIndex: 99,
              }}
            />
          </View>
          {/*  */}
          <InputText
            setValue={(val) => {
              setFilterPolicy((prv) => ({
                ...prv,
                duration: val,
              }));
            }}
            placeholder={language?.duration}
            // label={language?.duration}
            markHide={true}
          />
          <CustomMultiSelectDropDown
            placeholder={language?.select_insurer}
            valueProps={(value) => {
              console.log("value", value);
              const vl = value.toString();
              setFilterPolicy((prv) => ({
                ...prv,
                insurer: `${vl?.toString()}`,
              }));
            }}
            defaultValue={["All"]}
            data={
              [
                {
                  label: `${language?.all}`,
                  value: "All",
                },
              ].concat(data) || []
            }
          />
          {/* Footer */}
          <View style={styles.footer}>
            <MediumButton
              stylesButton={styles?.buttonSubmit}
              title={language?.filter}
              onPress={() => {
                handelFilter();
              }}
            />
            <MediumButton
              stylesButton={styles?.buttonSubmit}
              title={language?.reset}
              type={"sec"}
              onPress={() => {
                handelResat();
              }}
            />
          </View>
          {/*  */}
        </View>
        {/* Bg button */}
        <TouchableOpacity
          onPress={() => {
            setFilterPolicy((prv) => ({
              isVisible: false,
            }));
          }}
          style={styles.bgButton}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000007e",
    paddingHorizontal: rw(4),
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    width: "100%",
    borderRadius: 10,
    zIndex: 10,
  },
  //   footer
  footer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: -9,
  },
  buttonSubmit: {
    borderRadius: 30,
    marginVertical: 0,
    width: "40%",
    marginHorizontal: 10,
    elevation: 0,
  },
  bgButton: {
    position: "absolute",
    top: 0,
    padding: 50,
    height: rh(100),
    width: rw(100),
  },
});
