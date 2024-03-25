import { StatusBar, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { CONTAINER, rh, RSC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import HeadCard from "./HeadCard";
import ItemCard from "./ItemCard";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { toBnNum } from "../../../utils";
import { selectCompareItems } from "../../../redux/features/insuranceCompare/insuranceComApiSlice";

export default function CompareOffers() {
  const language = useSelector(languageSelector);
  const data = useSelector(selectCompareItems);
  const code = useSelector(codeSelector);
  const navigation = useNavigation();
  useEffect(() => {
    //
    if (data?.length != 2) {
      navigation.goBack();
    }
  }, [data]);

  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language?.compareOfferHeader} />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={[
          CONTAINER,
          {
            backgroundColor: "#E7F5FF",
          },
        ]}
      >
        {/* Content */}
        <View style={styles.container}>
          {/* header content  */}
          <View style={RSC}>
            {data?.[0] !== undefined && <HeadCard item={data?.[0]} />}
            {data?.[1] !== undefined && <HeadCard item={data?.[1]} />}
          </View>
          <Text
            preset="h2"
            fw={800}
            style={{
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            {language?.comparisonSummary}
          </Text>
          {/* list card */}
          {data?.[0]?.duration !== undefined &&
            data?.[1]?.duration !== undefined && (
              <ItemCard
                title={language?.policyDuration}
                LText={
                  data?.[0]?.duration
                    ? toBnNum(data?.[0]?.duration, code) +
                      " " +
                      `(${
                        language?.[
                          data?.[0]?.duration_type_text?.toLowerCase()
                        ] || data?.[0]?.duration_type_text
                      })`
                    : "N/A"
                }
                RText={
                  data?.[1]?.duration
                    ? toBnNum(data?.[1]?.duration, code) +
                      " " +
                      `(${
                        language?.[
                          data?.[1]?.duration_type_text?.toLowerCase()
                        ] || data?.[1]?.duration_type_text
                      })`
                    : "N/A"
                }
              />
            )}
          {data?.[0]?.installment_type !== undefined &&
            data?.[1]?.installment_type !== undefined && (
              <ItemCard
                title={language?.installmentType}
                LText={data?.[0]?.installment_type}
                RText={data?.[1]?.installment_type}
                isArray={true}
              />
            )}
          {/* {data?.[0]?.number_of_insured_as_text !== undefined &&
            data?.[0]?.number_of_insured_as_text !== "" &&
            data?.[1]?.number_of_insured_as_text !== undefined && (
              <ItemCard
                title={language?.numberOfInsured}
                LText={data?.[0]?.number_of_insured_as_text}
                RText={data?.[1]?.number_of_insured_as_text}
                isImage={true}
              />
            )} */}
          {data[0]?.number_of_insured !== undefined &&
            data[1]?.number_of_insured !== undefined && (
              <ItemCard
                title={language?.numberOfInsured}
                LText={`${toBnNum(data[0]?.number_of_insured, code)} ${
                  data[0]?.number_of_insured > 1
                    ? language?.individuals || "individuals"
                    : language?.individual || "individual"
                }`}
                RText={`${toBnNum(data[1]?.number_of_insured, code)} ${
                  data[1]?.number_of_insured > 1
                    ? language?.individuals || "individuals"
                    : language?.individual || "individual"
                }`}
                // isImage={true}
              />
            )}
          {/* Comment */}
          {data[0]?.telemedicine !== undefined &&
            data[1]?.telemedicine !== undefined && (
              <ItemCard
                title={`${language?.telemedicineTitle} `}
                LText={data[0]?.telemedicine > 0 ? language?.yes : language?.no}
                RText={data[1]?.telemedicine > 0 ? language?.yes : language?.no}
              />
            )}

          {/* Comment */}
          {data?.[0]?.health_card !== undefined &&
            data?.[1]?.health_card !== undefined && (
              <ItemCard
                title={`${language?.healthCardTitle} `}
                LText={data[0]?.health_card > 0 ? language?.yes : language?.no}
                RText={data[1]?.health_card > 0 ? language?.yes : language?.no}
              />
            )}
          {/* Comment */}
          {data?.[0]?.waiting_period !== undefined &&
            data?.[1]?.waiting_period !== undefined && (
              <ItemCard
                title={`${language?.waitingPeriodTitle} (${language?.days})`}
                LText={`${toBnNum(data[0]?.waiting_period, code)}`}
                RText={`${toBnNum(data[0]?.waiting_period, code)}`}
              />
            )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingVertical: rh(1.7),
    paddingBottom: rh(9),
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 20,
  },
  subTitle: {
    lineHeight: 25,
    fontSize: 15,
  },
  smallText: {
    lineHeight: 21,
    fontWeight: "400",
    width: "95%",
    marginBottom: 15,
  },
  //  search InputFiled
  searchInputFiledContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchInputContainer: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  searchInput: {
    borderWidth: 1,
    height: 46,
    borderColor: "#E5EAFF",
    width: rw(30),
    paddingHorizontal: 10,
    fontSize: 12,
    borderLeftWidth: 0,
  },
  searchInputButton: {
    borderWidth: 1,
    height: 46,
    borderColor: "#E5EAFF",
    paddingRight: 0,
    paddingLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    borderRightWidth: 0,
  },
  //  Image group
  imageGroupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  imageStyle: {
    height: rw(25),
    width: rw(35),
    resizeMode: "contain",
    overflow: "hidden",
  },
  // itemTitleText
  itemTitleText: {
    backgroundColor: "#DEEAFF",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 16.4,
    fontWeight: "700",
    color: "#4F4F4F",
    paddingVertical: 7,
  },
  //  item text container
  itemTextContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  itemTextLeft: {
    textAlign: "left",
    width: "50%",
    paddingVertical: 15,
    borderRightWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#C6C6C6",
  },
  itemTextRight: {
    textAlign: "left",
    width: "50%",
    paddingVertical: 15,
    borderLeftWidth: 0.5,
    borderColor: "#C6C6C6",
    paddingHorizontal: 10,
  },
  // buttonGroup
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#DEEAFF",
    paddingHorizontal: 10,
  },
  button: {
    width: rw(35),
    marginVertical: rh(1.8),
    backgroundColor: "#3369B3",
  },
});
