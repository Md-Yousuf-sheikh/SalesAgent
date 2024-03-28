// useGetPolicyBySlugQuery,
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import {
  COLOR,
  CONTAINER,
  rf,
  rh,
  ROW,
  RSBC,
  RSC,
  rw,
  WIDTH,
} from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import MediumButton from "../../../components/Buttons/MediumButton";
import AccordionItem from "../InsuranceListScreen/AccordionItem";
import { useNavigation } from "@react-navigation/native";
import CurrencyFormat from "../../../components/Shared/CurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { useGetPolicyBySlugQuery } from "../../../redux/features/policy/policyApiSlice";
import { addBuyNow } from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import {
  addItemToCompare,
  compareModal,
  selectCompareItems,
} from "../../../redux/features/insuranceCompare/insuranceComApiSlice";

import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import SkeletonPolicyDetail from "../../../components/Shared/SkeletonPolicyDetail";
import { Ionicons } from "@expo/vector-icons";
import useShowToastMessage from "../../../hooks/useShowToastMessage";
import { ToBnNum } from "../../../components/Helper/Helper";

export default function PolicyDetail({ route }) {
  const polType = route?.params?.item?.polType;
  // item
  const toast = useShowToastMessage();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const state = useSelector((state) => state);
  const code = useSelector(codeSelector);
  const language = useSelector(languageSelector);
  const data = useSelector(selectCompareItems);
  const item = state?.insuranceBuy?.buyNowInsurance;
  const { slug, category, uid } = item;
  // API
  const { isLoading, data: policies } = useGetPolicyBySlugQuery([slug, code]);
  //  handel compare
  const handelCompare = () => {
    // dispatch(addItemToCompare(item))
    if (data && data?.length === 2) {
      toast(language?.you_can_compare_only_two_policies);
      // setModal(true)
    } else if (data && data?.length > 0) {
      if (data[0]?.category?.id === item?.category?.id) {
        // setSelected(true)
        dispatch(addItemToCompare(item));
        dispatch(compareModal());
      } else {
        toast(language?.policy_should_be_in_the_same_categories);
      }
    } else {
      dispatch(addItemToCompare(item));
    }
  };
  //  handel calculate Premium
  const handelCalculatePremium = () => {
    navigation.navigate("PremiumCalculator");
    dispatch(addBuyNow(state?.insuranceBuy?.buyNowInsurance));
  };
  //  handel buy
  const handelBuyNow = () => {
    if (polType && polType === "B2B") {
      const detailData = {
        ...item,
        polType: polType === "B2B" ? "B2B" : "B2C",
      };
      navigation.navigate("AddRecommended", {
        item: detailData,
      });
    } else {
      if (item?.category?.id !== 1) {
        const data = {
          item: item,
          type: 4,
        };
        navigation.navigate("PremiumCalculator", {
          item: data,
        });
      } else {
        const data = {
          item: item,
          type: 2,
        };
        navigation.navigate("UserInfoScreen", {
          item: data,
        });
      }
    }
  };
  //

  return (
    <>
      <DrawerHeader title={language?.policy_details} />
      <ScrollView showsVerticalScrollIndicator={false} style={CONTAINER}>
        <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
        <View style={styles.container}>
          {isLoading ? (
            <SkeletonPolicyDetail />
          ) : (
            <>
              {/* Header Section */}
              <View style={styles.headerSection}>
                {/*  */}
                <View style={RSBC}>
                  <View>
                    <Text preset="h1" color={"#2253A5"}>
                      {policies?.name}
                    </Text>
                    <Text preset="h3" color={"#595959"}>
                      {policies?.category?.title}
                    </Text>
                  </View>
                  {/* heart */}
                  <Image
                    source={{ uri: policies?.logoLink }}
                    style={styles.imageStyle}
                  />
                </View>
                {/* details */}
                <Text
                  preset="XS"
                  style={{ paddingTop: rh(0.7) }}
                  color={"#8D9295"}
                >
                  {policies?.shortDescription}
                </Text>
              </View>
              {/* Detail Section */}
              <View style={styles.ItemDetailsSection}>
                {/*Item Details Container  */}
                <View style={styles.ItemDetailsContainer}>
                  <View>
                    <Text
                      preset="h1"
                      color={"#4A4A4A"}
                      style={[styles.itemDetailsTitle]}
                    >
                      {language?.secure_up_to}{" "}
                      <Text preset="h3" color={"#2253A5"}>
                        {item?.category?.id === 2 ? "USD" : language?.bdt}{" "}
                        {ToBnNum(
                          CurrencyFormat(policies?.total_coverage_amount),
                          code
                        )}{" "}
                      </Text>
                      {code == "bn" && `${language?.of_money} `}
                      <Text preset="h1" color={"#4A4A4A"} tt={"lowercase"}>
                        {policies?.category?.title}
                      </Text>{" "}
                      {language?.in_health_coverage_for_just}{" "}
                      <Text preset="h3" color={"#2253A5"}>
                        {language?.bdt}{" "}
                        {ToBnNum(
                          CurrencyFormat(policies?.premium_amount),
                          code
                        )}{" "}
                      </Text>
                      {code == "bn" && language?.in_money}
                    </Text>
                    {/*  */}
                    <Text
                      preset="SM"
                      style={{
                        fontWeight: "700",
                        fontStyle: "italic",
                        marginTop: 5,
                      }}
                      color={"#2253A5"}
                    >
                      {
                        language?.Upon_purchasing_this_insurance_you_will_receive
                      }{" "}
                      ({ToBnNum(policies?.awarded_loyalty_points, code)}){" "}
                      {language?.getLoyaltyPoints}
                    </Text>
                  </View>
                </View>
                {/* Item List  */}
                <>
                  <View style={styles.ItemListContainer}>
                    {/* Coverage */}
                    <View style={styles.ItemDetailsList}>
                      <Text preset="SM" color={"#737373"}>
                        {language?.coverageTitle}
                      </Text>
                      <Text
                        preset="SM"
                        style={styles.ItemDetailsListTitle}
                        color={"#4A4A4A"}
                      >
                        {item?.category?.id !== 1 &&
                          `${language?.upto || "Upto"} `}
                        {item?.category?.id === 2 ? "USD" : language?.bdt}{" "}
                        {ToBnNum(
                          CurrencyFormat(policies?.total_coverage_amount),
                          code
                        )}
                      </Text>
                    </View>
                    {/* Term */}
                    <View style={styles.ItemDetailsList}>
                      <Text preset="SM" color={"#737373"}>
                        {language?.termTitle}
                      </Text>
                      <Text
                        preset="SM"
                        style={styles.ItemDetailsListTitle}
                        color={"#4A4A4A"}
                      >
                        {item?.category?.id !== 1 &&
                          `${language?.upto || "Upto"} `}
                        {ToBnNum(policies?.duration, code)}{" "}
                        {
                          language?.[
                            policies?.duration_type_text?.toLowerCase()
                          ]
                        }
                      </Text>
                    </View>
                  </View>
                  {/* Item List  */}
                  <View style={styles.ItemListContainer}>
                    {/* Members */}
                    {policies?.number_of_insured_as_text ? (
                      <View style={styles.ItemDetailsList}>
                        <Text preset="SM" color={"#737373"}>
                          {policies?.number_of_insured > 1
                            ? language?.members
                            : language?.member}
                        </Text>
                        <View>
                          <Text
                            preset="SM"
                            style={styles.ItemDetailsListTitle}
                            color={"#4A4A4A"}
                          >
                            {ToBnNum(policies?.number_of_insured, code)}{" "}
                            {policies?.number_of_insured > 1
                              ? language?.individuals || "individuals"
                              : language?.individual || "individual"}
                          </Text>
                          {/* <Image
                            source={{
                              uri: policies?.number_of_insured_as_text,
                            }}
                            style={{
                              width: rw(4),
                              height: rw(4),
                              resizeMode: "contain",
                            }}
                          /> */}
                        </View>
                      </View>
                    ) : (
                      <></>
                    )}
                    {/* Premium */}
                    <View style={styles.ItemDetailsList}>
                      <Text preset="SM" color={"#737373"}>
                        {language?.premiumTitle}
                      </Text>
                      <Text
                        preset="SM"
                        style={styles.ItemDetailsListTitle}
                        color={"#4A4A4A"}
                      >
                        {item?.category?.id !== 1 &&
                          `${language?.startFrom || "Start from"} `}
                        {language?.bdt}{" "}
                        {ToBnNum(
                          CurrencyFormat(policies?.premium_amount),
                          code
                        )}
                      </Text>
                    </View>
                  </View>
                </>
              </View>
              {/* Compare and Purchase Buttons */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  onPress={handelCompare}
                  style={[
                    styles.compareButton,
                    (data?.[0]?.uid === uid) | (data?.[1]?.uid === uid) && {
                      borderColor: "#009718",
                    },
                  ]}
                >
                  {(data?.[0]?.uid === uid) | (data?.[1]?.uid === uid) ? (
                    <Text preset={"h4"} color={"#009718"}>
                      <Ionicons
                        name="checkmark-sharp"
                        size={15}
                        color="#009718"
                      />
                      {language?.compare}
                    </Text>
                  ) : (
                    <Text preset={"h4"} color={"#2253A5"}>
                      {language?.compare}
                    </Text>
                  )}
                </TouchableOpacity>
                <MediumButton
                  title={
                    route?.params?.item?.polType === "B2C"
                      ? language?.purchaseButtonText
                      : language?.recommended
                  }
                  stylesButton={{
                    backgroundColor: "#3369B3",
                    width: rw(41),
                    marginVertical: 2,
                    borderRadius: 100,
                  }}
                  onPress={handelBuyNow}
                />
              </View>
              {/* Key Features */}
              <View style={styles.keyFeaturesContainer}>
                {/* Title */}
                <View style={ROW}>
                  <Text preset="h2" color={"#2253A5"}>
                    {language?.keyFeatureTitle}
                  </Text>
                  {/* <View style={styles.lineSmall} />
                  <View style={styles.lineBig} /> */}
                </View>
                {/* list */}
                <View style={styles.keyFeaturesListContainer}>
                  {/* list 01 */}
                  {policies?.features?.map((item, index) => {
                    return (
                      <View key={index} style={styles.keyFeaturesBox}>
                        <Image
                          source={{ uri: item?.imageLink }}
                          style={styles.keyFeaturesImage}
                        />
                        <View>
                          <Text
                            style={{
                              width: "70%",
                            }}
                            preset="h6"
                            color={"#4A4A4A"}
                            fw={"700"}
                          >
                            {item?.title}
                          </Text>
                          <Text
                            style={{
                              width: "70%",
                            }}
                            preset="h6"
                            color={"#646464"}
                          >
                            {item?.value}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
              {/* Policy Some Details */}
              <View style={styles.policyTable}>
                {policies?.max_loyalty_redeem > 0 && (
                  <View style={styles.tableText}>
                    <Text preset="h6" style={styles.tableTextLeft}>
                      {language?.max_loyalty_points_redeem}
                    </Text>
                    <Text preset="h6" style={styles.tableTextRight}>
                      {ToBnNum(policies?.max_loyalty_redeem, code)} %
                    </Text>
                  </View>
                )}
                {policies?.discount > 0 && (
                  <View style={styles.tableText}>
                    <Text preset="h6" style={styles.tableTextLeft}>
                      {language?.discount}
                    </Text>
                    <Text preset="h6" style={styles.tableTextRight}>
                      {ToBnNum(policies?.discount, code)} %
                    </Text>
                  </View>
                )}
                {parseInt(policies?.waiting_period ?? 0) > 0 && (
                  <View style={styles.tableText}>
                    <Text preset="h6" style={styles.tableTextLeft}>
                      {language?.waitingPeriodTitle}
                    </Text>
                    <Text preset="h6" style={styles.tableTextRight}>
                      {ToBnNum(parseInt(policies?.waiting_period), code)}{" "}
                      {parseInt(policies?.waiting_period ?? 0) > 0
                        ? language?.days
                        : language?.day}
                    </Text>
                  </View>
                )}
                {parseInt(policies?.telemedicine) > 0 && (
                  <View style={styles.tableText}>
                    <Text preset="h6" style={styles.tableTextLeft}>
                      {language?.telemedicineTitle}
                    </Text>
                    <Text preset="h6" style={styles.tableTextRight}>
                      {ToBnNum(policies?.telemedicine ?? 0, code)}{" "}
                      {language?.days}
                    </Text>
                  </View>
                )}
                {policies?.health_card > 0 && (
                  <View style={styles.tableText}>
                    <Text preset="h6" style={styles.tableTextLeft}>
                      {language?.healthCardTitle}
                    </Text>
                    <Text preset="h6" style={styles.tableTextRight}>
                      {ToBnNum(policies?.health_card, code)}{" "}
                      {policies?.health_card > 0
                        ? language?.monthly
                        : language?.monthTitle}
                    </Text>
                  </View>
                )}
                {/* Link  */}
                {policies?.policy_wording && (
                  <View style={[styles.tableText]}>
                    <Text preset="h6" style={styles.tableTextLeft}>
                      {language?.toKnowWording}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(policies?.policy_wording);
                      }}
                    >
                      <Text preset="h6" style={styles.tableTextLeft}>
                        {language?.clickHereTitle}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {/* Description */}
              <AccordionItem
                title={language?.descriptionTitle}
                description={policies?.description}
              />
              <AccordionItem
                title={language?.exclusionsTitle}
                description={policies?.exclusions}
              />
              <AccordionItem
                title={language?.claimProcessTitle}
                description={policies?.claim_process}
              />
              {/* Calculate Button  */}
              <View style={styles.buttonContainer}>
                {policies?.category?.id !== 1 && polType == "B2C" && (
                  <MediumButton
                    title={language?.calculateButtonText}
                    onPress={handelCalculatePremium}
                    stylesButton={{
                      width: rw(80),
                      borderRadius: 40,
                      backgroundColor: "#2253A5",
                      marginVertical: 10,
                    }}
                  />
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: rh(1.8),
    paddingBottom: rh(9),
  },
  //
  headerSection: {
    paddingHorizontal: rw(4),
  },
  title: {
    fontSize: rf(2.45),
    lineHeight: 20,
    paddingTop: 10,
  },
  hartIcon: {
    backgroundColor: COLOR.lightGray50,
    padding: 10,
    borderRadius: 30,
  },
  //  ItemDetailsSection
  ItemDetailsSection: {
    padding: rw(4),
    backgroundColor: COLOR.lightGray50,
    marginVertical: rh(1.7),
    width: WIDTH,
  },
  ItemDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    //
  },
  cardTitle: {
    paddingHorizontal: rw(3),
  },
  lineSmall: {
    width: 5,
    height: 2,
    backgroundColor: "#3F3F3F",
    marginLeft: 15,
    marginRight: 4,
    marginTop: 5,
  },
  lineBig: {
    width: 50,
    height: 2,
    backgroundColor: "#3F3F3F",
    marginTop: 5,
  },
  imageStyle: {
    width: rw(10),
    height: rw(10),
    resizeMode: "contain",
    backgroundColor: "#dddddd22",
  },
  itemDetailsTitle: {
    lineHeight: 22,
  },
  //
  ItemListContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  ItemDetailsList: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0000000d",
    overflow: "hidden",
    width: "45%",
  },
  ItemDetailsListTitle: {
    fontWeight: "700",
    marginTop: rh(0.7),
  },
  //  buttonStyle
  buttonContainer: {
    paddingHorizontal: rw(4),
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 50,
  },
  buttonStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#2253A5",
  },
  compareButton: {
    width: rw(42),
    marginVertical: 2,
    paddingVertical: rh(1.5),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: rh(1.2),
    borderColor: "#3369B3",
    borderWidth: 1,
    borderRadius: 100,
  },
  //   keyFeaturesContainer
  keyFeaturesContainer: {
    marginVertical: 10,
    paddingHorizontal: rw(4),
  },
  keyFeaturesListContainer: {
    paddingVertical: rh(1.2),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  keyFeaturesBox: {
    width: rw(45),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    // backgroundColor:'red'
  },
  keyFeaturesImage: {
    width: rh(3),
    height: rh(3),
    resizeMode: "contain",
    marginRight: 10,
    // alignSelf:'stretch'
  },
  keyFeaturesTitle: {
    fontWeight: "700",
    fontSize: 16,
    maxWidth: rw(30),
  },
  keyFeaturesInfo: {
    fontWeight: "500",
    fontSize: 15,
    maxWidth: rw(30),
  },
  // Popular Insurance

  itemTextList: {
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 4,
    backgroundColor: "#ffffff",
    marginBottom: 2,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  //   policyTable
  policyTable: {
    borderWidth: 1,
    borderColor: "#E5EAFF",
    padding: 10,
    marginVertical: 15,
    paddingHorizontal: rw(4),
    backgroundColor: COLOR.lightGray50,
  },
  tableText: {
    paddingVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableTextRight: {
    color: "#2253A5",
    fontWeight: "500",
    flexDirection: "row",
  },
  tableTextLeft: {
    color: "#2253A5",
    fontWeight: "500",
  },
  tableTextRStart: {
    marginRight: 4,
    color: "#2253A5",
  },
  tableTextREnd: {
    minWidth: rw(20),
    maxWidth: rw(21),
    textAlign: "right",
    color: "#2253A5",
    fontSize: 14,
  },
});
