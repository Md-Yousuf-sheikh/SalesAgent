import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, rh, ROW, rw, TYPOGRAPHY, rf } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";
import CurrencyFormat from "../../../components/Shared/CurrencyFormat";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-root-toast";
import { addToCompare } from "../../../redux/features/counter/counterSlice";
import CompareModal from "../HomeScreen/CompareModal";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { ToEnNum } from "../../../components/Helper/Helper";

export default function PopularInsuranceCard({ item, indexing, size }) {
  const {
    total_coverage_amount,
    name,
    image,
    number_of_insured_as_text,
    premium_amount,
    status,
    duration,
    slug,
    duration_type_text,
    number_of_insured,
  } = item;
  // const num = coverage?.toLocaleString()
  // console.log('numToComma', num)
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(false);

  const dispatch = useDispatch();

  //  navigation
  const navigation = useNavigation();
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const compareList = useSelector((state) => state?.counter?.compareList);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // handelPolicyDetail
  const handelPolicyDetail = () => {
    navigation.navigate("PolicyDetail", {
      item,
    });
  };
  //  handel compare
  const handelCompare = () => {
    if (compareList && compareList?.length === 2) {
      Toast.show("You can compare only two offer", {
        duration: 1000,
        backgroundColor: "rgba(51, 105, 179, 1)",
        shadow: true,
        position: rh(80),
        textColor: COLOR.white,
        opacity: 2,
        animation: true,
        height: rh(15),
      });
      // setModal(true)
    } else if (compareList && compareList?.length > 0) {
      if (compareList[0]?.catId === item?.catId) {
        setSelected(true);
        dispatch(addToCompare(item));
        setModal(true);
      } else {
        Toast.show("Policies should be of same categories", {
          duration: 1000,
          backgroundColor: "rgba(51, 105, 179, 1)",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        });
      }
    } else {
      setSelected(true);
      dispatch(addToCompare(item));
      setModal(true);
    }

    // navigation.navigate('CompareOffers', {
    //   item: item,
    // })
  };
  // handelBuyNow
  const handelBuyNow = () => {
    const data = {
      item: item,
      type: 2,
    };
    navigation.navigate("UserInfoScreen", {
      item: data,
    });
  };
  // console.log('everyIndex', indexing)
  // console.log('everyItem', item)

  useEffect(() => {
    const check = compareList?.filter((el) => item?.slug == el?.slug);
    if (check[0] && check[0]?.slug === item?.slug) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [compareList]);

  return (
    <>
      <CompareModal
        selected={selected}
        setSelected={setSelected}
        modal={modal}
        setModal={setModal}
      />
      <View
        activeOpacity={0.9}
        style={[
          styles.card,
          indexing === size - 1
            ? { marginHorizontal: rh(1.5) }
            : indexing === undefined
            ? { marginLeft: rh(0) }
            : { marginLeft: rh(1.5) },
        ]}
      >
        {/* header */}
        <View style={styles.header}>
          <Image source={image} style={styles.headerImage} />
          <Text preset="h6" color={"#2253A5"} style={styles.headerTitle}>
            {name}
          </Text>
          <View style={styles.headerStatus}>
            <Text
              style={{
                paddingHorizontal: rh(1),
                marginLeft: rh(1.2),
                color: "#fff",
              }}
              preset="SL"
            >
              NEW
            </Text>
            <View style={styles.headerStatusCarve} />
          </View>
        </View>
        {/* list Item Container */}
        <View style={styles.listItemContainer}>
          <View style={styles.listitem}>
            <Text preset="SM" style={[styles.listItemTitle]}>
              Coverage
            </Text>
            <Text
              preset="SL"
              style={[styles.listItemText, { fontWeight: "700" }]}
            >
              {language?.bdt}{" "}
              {ToEnNum(CurrencyFormat(total_coverage_amount), code)}
            </Text>
          </View>
          <View style={styles.listitem}>
            <Text preset="SM" style={styles.listItemTitle}>
              Term
            </Text>
            <Text preset="SL" style={styles.listItemText}>
              {duration} {duration_type_text}
            </Text>
          </View>
          <View style={styles.listitem}>
            <Text preset="SM" style={styles.listItemTitle}>
              {number_of_insured > 1 ? language?.members : language?.member}
            </Text>
            <Text preset="SL" style={styles.listItemText}>
              {number_of_insured_as_text}
            </Text>
          </View>
          <View style={styles.listitem}>
            <Text preset="SM" style={[styles.listItemTitle]}>
              Premium
            </Text>
            <Text
              preset="SL"
              style={[styles.listItemText, { fontWeight: "700" }]}
            >
              {language?.bdt} {ToEnNum(CurrencyFormat(premium_amount), code)}
            </Text>
          </View>
        </View>
        {/*  Button list */}
        <View style={styles.buttonListContainer}>
          {!selected ? (
            <TouchableOpacity
              onPress={handelCompare}
              style={styles.compareButton}
            >
              <MaterialIcons
                name="compare-arrows"
                size={rh(2.9)}
                color="#5e5e5eaf"
              />
            </TouchableOpacity>
          ) : (
            <Text preset="h6" style={{ color: "#1691CE", fontSize: rf(1.5) }}>
              Added to compare
            </Text>
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
              {language.purchaseButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    // marginHorizontal: 5,
    minWidth: rw(60),
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
  },
  headerImage: {
    height: rh(4),
    // width: 40,
    resizeMode: "contain",
  },
  headerTitle: {
    paddingLeft: rh(1.2),
  },
  headerStatus: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#9F5588",
    paddingVertical: rh(0.4),
    overflow: "hidden",
    height: rh(3),
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
    // fontWeight: '100',
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
    paddingHorizontal: rh(1.7),
    marginHorizontal: rh(0.6),
    borderWidth: rh(0.2),
    borderColor: "#3369B3",
    width: rw(25),
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
