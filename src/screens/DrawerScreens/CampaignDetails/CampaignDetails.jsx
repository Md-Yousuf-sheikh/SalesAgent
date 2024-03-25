import React, { useState } from "react";
import {
  BackHandler,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import {
  COLOR,
  CONTAINER,
  rf,
  rh,
  ROW,
  RSBC,
  RSC,
  rw,
  TYPOGRAPHY,
} from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Text from "../../../components/Text/Text";
import SvgTotalTarget from "../../../svg/SvgTotalTarget";
import CampaignDetailsTopCard from "./CampaignDetailsTopCard";
import SvgAchieved from "../../../svg/SvgAchieved";
import SvgGap from "../../../svg/SvgGap";
import CurrencyFormat from "../../../components/Shared/CurrencyFormat";
import { useSelector } from "react-redux";
import { useGetSalesCampaignBySlugQuery } from "../../../redux/features/purchase/purchaseApiSlice";
import PopularInsuranceCard from "../HomeScreen/PopularInsuranceCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import moment from "moment";
import ListCard from "../../../components/Skeleton/ListSkeletonPopularcard";
import { languageSelector } from "../../../redux/features/language/languageSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Background from "../../../components/Shared/Background";
function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.abs(num) / 1000 + "k";
}

export default function CampaignDetails({ route }) {
  const { campaignDetails } = route?.params;
  const language = useSelector(languageSelector);
  const navigation = useNavigation();
  // APIS
  const {
    data: SalesCampaignBySlug,
    isLoading,
    refetch,
  } = useGetSalesCampaignBySlugQuery([campaignDetails?.slug]);

  // date
  let today = moment(new Date());
  let end_date = moment(
    SalesCampaignBySlug?.campaign?.end_date?.split("/").reverse().join("-")
  ).add(1, "days");
  let diffDays = end_date.diff(today);

  //express as a duration
  const diffDuration = moment.duration(diffDays);

  let commissionCount = 0;

  if (SalesCampaignBySlug?.campaign?.commission) {
    commissionCount = parseInt(SalesCampaignBySlug?.campaign?.commission) / 100;
    if (parseInt(SalesCampaignBySlug?.achievement_amount) > 0) {
      if (
        parseInt(SalesCampaignBySlug?.achievement_amount) * commissionCount <
        1000000
      ) {
        commissionCount = CurrencyFormat(
          parseInt(SalesCampaignBySlug?.achievement_amount) * commissionCount
        );
      } else {
        commissionCount = kFormatter(
          parseInt(SalesCampaignBySlug?.achievement_amount) * commissionCount
        );
      }
    } else {
      commissionCount = 0;
    }
  }

  const handleBackButtonClick = () => {
    navigation.goBack();

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  //
  const handelRefresh = () => {
    refetch();
  };
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );
  return (
    <>
      <DrawerHeader title={language.campaigndetailsHeader} />
      <Background onRefresh={handelRefresh} refreshIsOpen={true}>
        <View style={styles.container}>
          {SalesCampaignBySlug?.campaign?.banner && (
            <View
              style={{
                marginBottom: rh(2),
                paddingHorizontal: rw(2),
              }}
            >
              <ImageBackground
                resizeMode="cover"
                source={{ uri: SalesCampaignBySlug?.campaign?.banner }}
                style={{
                  // paddingVertical: rh(3),
                  paddingHorizontal: rw(1),
                  height: rh(18),
                  // marginVertical: rh(1),
                  justifyContent: "space-between",
                  borderRadius: rh(0.6),
                }}
              />
            </View>
          )}
          <View style={styles.cardBox}>
            {/* title */}
            <View style={RSBC}>
              <Text preset="LL" color={"#2253A5"}>
                {SalesCampaignBySlug?.campaign?.name}
              </Text>
              {SalesCampaignBySlug?.campaign?.commission_term ? (
                <Text preset="h6" style={styles.monthStatus}>
                  {SalesCampaignBySlug?.campaign?.commission_term}
                </Text>
              ) : null}
            </View>
            {/* description */}
            {/* <Text
              preset="h1"
              style={[
                styles.titleDescription,
                {
                  marginVertical: rh(1.5),
                },
              ]}
            >
              {language.campaignDetailsBody}{' '}
              <Text
                preset="h1"
                style={[
                  styles.titleDescription,
                  {
                    fontWeight: '800',
                  },
                ]}
                color={'#2253A5'}
              >
                {SalesCampaignBySlug?.campaign?.max_commission + '%'}{' '}
                {language.asARewardTitle}
              </Text>
            </Text> */}
            {/* list item */}
            <View
              style={[
                styles.topListCont,
                { marginTop: rh(1), flexWrap: "wrap" },
              ]}
            >
              {SalesCampaignBySlug?.target_amount ? (
                <CampaignDetailsTopCard
                  title={language?.target}
                  price={parseInt(SalesCampaignBySlug?.target_amount)}
                  icon={<SvgTotalTarget />}
                  bdt={true}
                />
              ) : null}

              {SalesCampaignBySlug?.target_amount ? (
                <CampaignDetailsTopCard
                  title={language?.achieved}
                  price={parseInt(SalesCampaignBySlug?.achievement_amount)}
                  icon={<SvgAchieved />}
                  bdt={true}
                />
              ) : null}

              {SalesCampaignBySlug?.target_amount ? (
                <CampaignDetailsTopCard
                  title={language?.gap}
                  price={parseInt(SalesCampaignBySlug?.gap_amount)}
                  icon={<SvgGap />}
                  bdt={true}
                />
              ) : null}

              {SalesCampaignBySlug?.target_unit ? (
                <CampaignDetailsTopCard
                  title={`${language.target} (Unit)`}
                  price={parseInt(SalesCampaignBySlug?.target_unit)}
                  icon={<SvgTotalTarget />}
                  nothing={true}
                />
              ) : null}

              {SalesCampaignBySlug?.target_unit ? (
                <CampaignDetailsTopCard
                  title={`${language.achieved} (Unit)`}
                  price={parseInt(SalesCampaignBySlug?.achievement_unit)}
                  icon={<SvgAchieved />}
                  nothing={true}
                />
              ) : null}

              {SalesCampaignBySlug?.target_unit ? (
                <CampaignDetailsTopCard
                  title={`${language.gap} (Unit)`}
                  price={parseInt(SalesCampaignBySlug?.gap_unit)}
                  icon={<SvgGap />}
                  nothing={true}
                />
              ) : null}

              <CampaignDetailsTopCard
                title={language.rewardTitle}
                price={parseInt(
                  SalesCampaignBySlug?.campaign?.commission
                    ? SalesCampaignBySlug?.campaign?.commission
                    : 0
                )}
                icon={<SvgGap />}
                bdt={
                  SalesCampaignBySlug?.campaign?.commission_type ===
                  "Percentage"
                    ? false
                    : SalesCampaignBySlug?.campaign?.commission_type ===
                        "Flat" && true
                }
              />
              {/* <CampaignDetailsTopCard
                title={language.commissionTitle}
                price={commissionCount}
                icon={<SvgGap />}
                bdt={true}
                customStyle={{ marginRight: rh(15) }}
              /> */}
            </View>
            {/* date line to complete  */}
            <View style={ROW}>
              <MaterialCommunityIcons
                name="clock-time-eight-outline"
                size={15}
                color="#1691CE"
                style={{
                  marginRight: 5,
                }}
              />
              <Text
                color={"#1691CE"}
                style={{
                  fontStyle: "italic",
                }}
                preset="h6"
              >
                Remaining{" "}
                <Text
                  color={"#1691CE"}
                  style={{
                    fontStyle: "italic",
                    fontWeight: "800",
                  }}
                  preset="h6"
                >
                  {diffDuration?.months() > 0 &&
                    diffDuration?.months() + " months "}
                  {diffDuration.days() && diffDuration.days() + " Days "}
                  {diffDuration.hours() && diffDuration.hours() + " Hours "}
                  {diffDuration.minutes() && diffDuration.hours() + " Min "}
                </Text>{" "}
              </Text>
            </View>
          </View>
          {/* Policies of campaign */}
          <View>
            <View style={styles.policyCardbox}>
              <Text
                style={{ paddingHorizontal: rw(4) }}
                preset="h1"
                color={"#2253A5"}
              >
                {language.policyOfCampaignTitle}
              </Text>
              {/* list */}

              {/* {data?.map((item, index) => {
              return (
                <View key={index} style={styles.policiesListItem}>
                  <SvgPoliciesOfCampaign />
                  <Text preset="SM" style={styles.policiesListText}>
                    {item.value}
                  </Text>
                </View>
              )
            })} */}
              {isLoading
                ? [...Array(4)]?.map(() => {
                    return <ListCard />;
                  })
                : SalesCampaignBySlug?.campaign?.policy?.map((item, index) => {
                    return (
                      <PopularInsuranceCard
                        size={SalesCampaignBySlug?.campaign.policy?.length}
                        indexing={index}
                        item={item}
                        home={"home"}
                      />
                    );
                  })}
            </View>
          </View>
        </View>
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: rh(2),
    paddingBottom: rh(10),
  },
  policyCardbox: {},
  cardBox: {
    backgroundColor: COLOR.white,
    borderRadius: rh(1),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    // elevation: 0.2,
    paddingVertical: rh(2),
    paddingHorizontal: rw(4),
    borderTopWidth: rh(0.15),
    borderBottomWidth: rh(0.15),
    borderColor: "#dddddd67",
    marginBottom: rh(1.7),
  },
  monthStatus: {
    backgroundColor: "#F1F4FF",
    paddingVertical: rh(0.6),
    paddingHorizontal: rh(1.2),
    color: "#3F3F3F",
  },
  titleDescription: {
    fontSize: rf(2.45),
    fontFamily: "Roboto-Regular",
    color: "#4F4F4F",
    lineHeight: 26,
  },
  topListCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: rh(0.1),
    marginBottom: rh(0.8),
  },
  // policiesListItem
  policiesListItem: {
    flexDirection: "row",
    marginVertical: rh(1),
  },
  policiesListText: {
    fontSize: rf(1.45),
    // lineHeight: 14,
    width: rw(84),
  },
});
