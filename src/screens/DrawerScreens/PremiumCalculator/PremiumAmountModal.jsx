import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ROW, rf, rh, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import MediumButton from "../../../components/Buttons/MediumButton";
import { useNavigation } from "@react-navigation/native";
import CurrencyFormat from "../../../components/Shared/CurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-root-toast";
import { useEffect } from "react";
import Tickmark from "../../../../assets/tickmark.svg";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import {
  addItemToCompare,
  selectCompareItems,
} from "../../../redux/features/insuranceCompare/insuranceComApiSlice";
import { ToEnNum } from "../../../components/Helper/Helper";

export default function PremiumAmountModal({
  setModal,
  modal,
  item,
  setCompareModal,
  compareModal,
  premiumVal,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const compareList = useSelector(selectCompareItems);

  // const [compareModal, setCompareModal] = useState()
  const [selected, setSelected] = useState(false);

  const handelBuyNow = () => {
    setModal(false);
    const dataOf = {
      ...item,
      calculateInfo: premiumVal,
    };
    const data = {
      item: dataOf,
      type: 2,
    };
    if (item) {
      navigation.navigate("UserInfoScreen", {
        item: data,
      });
    }
  };
  //
  const image = require("../../../../assets/images/insuranceImage.png");
  useEffect(() => {
    const check = compareList?.filter((el) => item?.slug == el?.slug);
    if (check[0] && check[0]?.slug === item?.slug) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [compareList, item]);

  const handelCompare = () => {
    if (compareList && compareList?.length === 2) {
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
    } else if (compareList && compareList?.length > 0) {
      if (compareList[0]?.category?.id === item?.category?.id) {
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

  return (
    <Modal transparent={true} visible={modal}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setModal(false);
          }}
          style={{
            height: "100%",
          }}
        ></TouchableOpacity>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              setModal(false);
            }}
            style={styles.closeButton}
          >
            <Text color={"#1691CE"}>{language.close}</Text>
          </TouchableOpacity>
          <Image
            source={
              item?.logoLink
                ? {
                    uri: item?.logoLink,
                  }
                : image
            }
            style={styles.image}
          />
          <Text preset="h4" style={styles.subTitle}>
            {language.premiumCalModalTitle}
          </Text>
          <Text preset="h1" style={styles.priceTitle}>
            {language?.bdt}{" "}
            {ToEnNum(CurrencyFormat(parseInt(premiumVal?.result)), code)}
          </Text>
          {/* button */}
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: 5,
              },
            ]}
          >
            <Text preset="SM" fw={"800"}>
              {language?.note}{" "}
            </Text>
            {item?.category?.id?.toString() !== "4" && (
              <Text preset="SM">{language?.exclusive_of_vat}</Text>
            )}
          </View>

          <MediumButton
            title={language.purchaseButtonText}
            onPress={handelBuyNow}
            stylesButton={{
              backgroundColor: "#3369B3",
              width: rw(90),
              marginTop: rh(2.8),
              marginBottom: rh(1.2),
              elevation: 0,
            }}
          />
          {!selected ? (
            <MediumButton
              title={language.compare}
              onPress={handelCompare}
              stylesButton={{
                width: rw(90),
                marginTop: rh(1.2),
                borderWidth: 0,
                marginBottom: 0,
              }}
              type="sec"
              titleStyle={{
                textDecorationLine: "underline",
              }}
            />
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Tickmark />

              <Text
                preset="h6"
                style={{
                  color: "rgba(0, 154, 131, 1)",
                  fontSize: rf(1.4),
                  marginLeft: rh(0.3),
                  marginBottom: rh(0.1),
                }}
              >
                Compare
              </Text>
            </View>
          )}
          {/* Check list */}
          {/* <View style={styles.listContainer}>
            <View style={styles.checkIconBox}>
              <FontAwesome name="check" size={10} color="#2253A5" />
            </View>
            <Text preset="SL" style={styles.listText} color={"#646464"}>
              Requesting you to never share your Reference ID, Password and Pin
              with anyone. Any negligence and occurrence due to this will not be
              entertained by Waadaa.Insure.
            </Text>
          </View> */}
          {/* Check list */}
          {/* <View style={styles.listContainer}>
            <View style={styles.checkIconBox}>
              <FontAwesome name="check" size={10} color="#2253A5" />
            </View>
            <Text preset="SL" style={styles.listText} color={"#646464"}>
              For any support, contact our Care Team at 09610000345 (24/7).
            </Text>
          </View> */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000027",
    position: "relative",
    height: "100%",
    width: "100%",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffff",
    width: "100%",
    borderTopRightRadius: rh(3.5),
    borderTopLeftRadius: rh(3.5),
    paddingBottom: rh(2.2),
    paddingTop: rh(2.2),
    paddingHorizontal: rw(4),
  },
  priceTitle: {
    fontSize: rf(3.5),
    lineHeight: 40,
    letterSpacing: 1,
    color: "#2253A5",
    textAlign: "center",
    fontWeight: "800",
  },
  subTitle: {
    color: "#4F4F4F",
    textAlign: "center",
    marginBottom: rh(1),
    textAlign: "center",
    lineHeight: 20,
  },
  image: {
    alignSelf: "center",
    // marginTop: 50,
    // marginBottom: 15,
    width: rw(30),
    height: rw(30),
    resizeMode: "contain",
  },
  // closeButton
  closeButton: {
    alignSelf: "flex-end",
    paddingRight: rh(0.7),
  },
  // checkIconBox
  checkIconBox: {
    borderWidth: 2,
    borderColor: "#2253A5",
    width: 15,
    height: 15,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    marginRight: 6,
  },
  listText: {
    lineHeight: 16,
    letterSpacing: 0.2,
    width: "86%",
  },
  listContainer: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
