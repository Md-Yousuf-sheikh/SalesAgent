import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, rh, ROW, rw, TYPOGRAPHY, rf } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";
import CurrencyFormat from "../../../components/Shared/CurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-root-toast";
import { ToBnNum } from "../../../components/Helper/Helper";
import {
  addBuyNow,
  setResetItemStateData,
} from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import { setSelectedCustomer } from "../../../redux/features/customer/customerSlice";
import { setRestFormData } from "../../../redux/features/purchase/NomineeSlice";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import {
  addItemToCompare,
  compareModal,
  selectCompareItems,
} from "../../../redux/features/insuranceCompare/insuranceComApiSlice";
import { Ionicons } from "@expo/vector-icons";

export default function PopularInsuranceCard({
  item,
  indexing,
  size,
  polType,
  cardType = null,
}) {
  const {
    total_coverage_amount,
    name,
    image,
    number_of_insured,
    premium_amount,
    status,
    duration,
    slug,
    number_of_insured_as_text,
    duration_type_text,
    logoLink,
    tag,
    uid,
  } = item;
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  //  navigation
  const navigation = useNavigation();
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const data = useSelector(selectCompareItems);
  // handelPolicyDetail
  const handelPolicyDetail = () => {
    const detailData = {
      ...item,
      polType: polType === "B2B" ? "B2B" : "B2C",
    };
    dispatch(addBuyNow(item));
    dispatch(setSelectedCustomer(null));
    dispatch(setRestFormData());
    dispatch(setResetItemStateData());

    navigation.navigate("PolicyDetail", {
      item: detailData,
    });
  };
  //  handel compare
  const handelCompare = () => {
    if (data && data?.length === 2) {
      Toast.show(`${language?.you_can_compare_only_two_policies}`, {
        duration: 1000,
        backgroundColor: "rgba(51, 105, 179, 1)",
        shadow: true,
        position: rh(80),
        textColor: "#ffff",
        opacity: 2,
        animation: true,
        height: rh(15),
      });
      // setModal(true)
    } else if (data && data?.length > 0) {
      if (data[0]?.category?.id === item?.category?.id) {
        setSelected(true);
        dispatch(addItemToCompare(item));
        dispatch(compareModal());
      } else {
        Toast.show(`${language?.policy_should_be_in_the_same_categories}`, {
          duration: 1000,
          backgroundColor: "rgba(51, 105, 179, 1)",
          shadow: true,
          position: rh(80),
          textColor: "#ffff",
          opacity: 2,
          animation: true,
        });
      }
    } else {
      setSelected(true);
      dispatch(addItemToCompare(item));
    }
  };
  // handelBuyNow
  const handelBuyNow = () => {
    dispatch(addBuyNow(item));
    dispatch(setSelectedCustomer(null));
    dispatch(setRestFormData());

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

  return (
    <>
      <TouchableOpacity
        onPress={handelPolicyDetail}
        activeOpacity={0.9}
        style={[
          styles.card,
          indexing === size - 1
            ? { marginHorizontal: rh(2) }
            : indexing === undefined
            ? { marginLeft: rh(0) }
            : { marginLeft: rh(2) },
          !tag &&
            cardType !== "feature" && {
              maxWidth: rw(100),
            },
          cardType === "feature" && {
            maxWidth: rw(92),
          },
        ]}
      >
        {tag && (
          <View
            style={[
              styles.headerStatusCarveRight,
              { backgroundColor: tag?.color, opacity: 0.6 },
            ]}
          />
        )}
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: logoLink }} style={styles.headerImage} />
          <View>
            <Text preset="h6" color={"#2253A5"} style={styles.headerTitle}>
              {name}
            </Text>
            <Text preset="SS" color={"#2253A5"} style={styles.headerTitle}>
              {item?.category?.title}
            </Text>
          </View>
          {tag && (
            <View
              style={[styles.headerStatus, { backgroundColor: tag?.color }]}
            >
              <Text
                style={{
                  paddingHorizontal: rh(0.6),
                  color: "#fff",
                  fontFamily: TYPOGRAPHY.primaryBold,
                }}
                preset="SM"
              >
                {tag?.title}
              </Text>
            </View>
          )}
        </View>
        {/* list Item Container */}
        <View style={styles.listItemContainer}>
          <View style={styles.listitem}>
            <Text preset="SM" style={[styles.listItemTitle]}>
              {language.coverageTitle}
            </Text>
            <Text
              preset="SL"
              style={[styles.listItemText, { fontWeight: "bold" }]}
            >
              {item?.category?.id !== 1 && `${language?.upto || "Upto"}${"\n"}`}
              {language?.bdt}{" "}
              {ToBnNum(CurrencyFormat(total_coverage_amount), code)}
            </Text>
          </View>
          <View style={styles.listitem}>
            <Text preset="SM" style={styles.listItemTitle}>
              {language.termTitle}{" "}
              {item?.category?.id !== 1 && ` ${language?.upto || "Upto"}`}
            </Text>
            <Text preset="SL" style={styles.listItemText}>
              {ToBnNum(parseInt(duration), code)}{" "}
              {duration_type_text === "Days"
                ? language.daysTitle
                : duration_type_text}
            </Text>
          </View>
          {number_of_insured_as_text ? (
            <View style={styles.listitem}>
              <Text preset="SM" style={styles.listItemTitle}>
                {number_of_insured > 1 ? language?.members : language?.member}
              </Text>
              <View style={styles.listIconImage}>
                <Text
                  preset="SM"
                  style={[
                    styles.listItemTitle,
                    {
                      textAlign: "center",
                    },
                  ]}
                >
                  {ToBnNum(number_of_insured, code)}
                </Text>
                {/* 
               <Image
                  source={{
                    uri: number_of_insured_as_text,
                  }}
                  style={{
                    width: rw(5),
                    height: rw(5),
                    resizeMode: "contain",
                  }}
                /> */}
              </View>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.listitem}>
            <Text preset="SM" style={[styles.listItemTitle]}>
              {language.premiumTitle}
            </Text>
            <Text
              preset="SL"
              style={[styles.listItemText, { fontWeight: "700" }]}
            >
              {item?.category?.id !== 1 &&
                `${language?.startFrom || "Start from"}${"\n"}`}
              {language?.bdt} {ToBnNum(CurrencyFormat(premium_amount), code)}
            </Text>
          </View>
        </View>
        {/*  Button list */}
        <View style={styles.buttonListContainer}>
          {cardType !== "feature" && (
            <TouchableOpacity onPress={handelCompare}>
              {(data?.[0]?.uid === uid) | (data?.[1]?.uid === uid) ? (
                <Text preset="SM" color={"#009718"} style={styles.compareText}>
                  <Ionicons name="checkmark-sharp" size={11} color="#009718" />
                  {language?.compare}
                </Text>
              ) : (
                <Text preset="SM" color={"#2253A5"} style={styles.compareText}>
                  {language?.compare}
                </Text>
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handelPolicyDetail}
            style={[styles.buyButton, styles.viewDetailsButton]}
          >
            <Text preset="SM" color={"#1691CE"} style={styles.buttonText}>
              {language.detailButtonText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handelBuyNow} style={styles.buyButton}>
            <Text preset="SM" color={"#fff"} style={styles.buttonText}>
              {polType && polType === "B2B"
                ? language?.recommended
                : language.purchaseButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    // marginHorizontal: 5,
    maxWidth: rw(89),
    minWidth: rw(85),
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#00000060",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#dddddd61",
  },

  cardDetailsContainer: {
    borderBottomWidth: 2,
  },
  // header
  header: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: rh(1.6),
    paddingBottom: rh(1.2),
    backgroundColor: "#ffff",
  },
  headerImage: {
    height: rh(4),
    width: rh(4),
    resizeMode: "contain",
  },
  headerStatusCarveRight: {
    backgroundColor: "#9F5588",
    position: "absolute",
    height: rh(2.5),
    width: rh(1.5),
    transform: [
      {
        rotate: "45deg",
      },
    ],
    right: -rh(0.8),
    top: rh(4.3),
    zIndex: -10,
  },
  headerTitle: {
    paddingLeft: rh(1.2),
  },
  headerStatus: {
    position: "absolute",
    top: 0,
    right: rh(-1.44),
    backgroundColor: "#9F5588",
    overflow: "hidden",
    height: rh(3.5),
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    maxWidth: rw(27),
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  headerStatusCarve: {
    backgroundColor: "#ffffff",
    position: "absolute",
    // top: 0,
    // right: 0,
    height: rh(3),
    width: rh(3),
    transform: [
      {
        rotate: "45deg",
      },
    ],
    left: -20,
  },
  // list Item Container
  listItemContainer: {
    flexDirection: "row",
    borderBottomWidth: rh(0.15),
    borderTopWidth: 1,
    borderColor: "#dddddd73",
    paddingVertical: rh(1.2),
    justifyContent: "space-between",
    paddingHorizontal: rh(1.8),
  },
  listitem: {
    marginHorizontal: rh(0.7),
  },
  listItemTitle: {
    color: "#737373",
    lineHeight: 18,
    fontWeight: "700",
    // fontFamily: TYPOGRAPHY.bold,
  },
  listItemText: {
    color: "#4F4F4F",
    fontWeight: "bold",
  },
  //  button list
  buttonListContainer: {
    paddingVertical: rh(1.2),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: rh(1),
  },
  buyButton: {
    backgroundColor: "#3369B3",
    alignItems: "center",
    paddingVertical: rh(1.2),
    borderRadius: rh(3),
    paddingHorizontal: rh(1.6),
    marginHorizontal: rh(0.6),
    borderWidth: rh(0.2),
    borderColor: "#3369B3",
    minWidth: rw(28),
    left: rh(0.2),
  },
  viewDetailsButton: {
    backgroundColor: "#ffff",
    borderColor: "#1691CE",
    // width: rw(30),
  },
  compareButton: {
    backgroundColor: "#F5F7FF",
    paddingHorizontal: rh(1),
    paddingVertical: rh(0.5),
    marginRight: rh(0.7),
    borderRadius: rh(0.8),
  },
  buttonText: {
    fontWeight: "800",
    letterSpacing: 0.1,
  },
});
