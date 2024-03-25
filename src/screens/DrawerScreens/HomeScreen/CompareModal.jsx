import { Image, Modal, StyleSheet, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import {
  compareModal,
  removeAllItems,
  removeItemFromCompare,
  selectCompareItems,
} from "../../../redux/features/insuranceCompare/insuranceComApiSlice";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { rw } from "../../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import MediumButton from "../../../components/Buttons/MediumButton";
import CurrencyFormat from "../../../components/Shared/CurrencyFormat";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import Text from "../../../components/Text/Text";
import { ToEnNum } from "../../../components/Helper/Helper";

export default function CompareOfferModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const data = useSelector(selectCompareItems);
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const navigation = useNavigation();
  // handel modal close
  const handelClose = () => {
    dispatch(compareModal());
  };
  //  handel delete item
  const handelDeleteItem = (uid) => {
    dispatch(removeItemFromCompare(uid));
  };
  //   handel Compare  button
  const handelCompare = () => {
    if (data?.length >= 2) {
      navigation.navigate("CompareOffers");
    }
    dispatch(compareModal());
  };

  return (
    <Modal visible={state?.insuranceCom?.compareModal} transparent={true}>
      <View style={styles.container}>
        {/* Card */}
        <View style={styles.card}>
          {/* header */}
          <View style={styles.header}>
            <Text preset="h4" style={styles.cardTitle}>
              {language?.comparePolicyTitle}
            </Text>
            {/*  close button */}
            <TouchableOpacity
              onPress={() => {
                handelClose(), dispatch(removeAllItems());
              }}
            >
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {/* body */}
          <View style={styles.itemListContainer}>
            {/* Image card */}
            {data?.map((item, index) => {
              const {
                logoLink,
                total_coverage_amount,
                name,
                duration,
                duration_type_text,
                uid,
                premium_amount,
              } = item;
              return (
                <View style={styles.containerItem} key={uid}>
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: logoLink }} style={styles.image} />
                    <TouchableOpacity
                      onPress={() => {
                        handelDeleteItem(uid);
                      }}
                      style={styles.imageCloseIcon}
                    >
                      <AntDesign name="closecircleo" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                  {/* text */}
                  <Text preset="h5" color={"#2253A5"} style={styles.name}>
                    {name}
                  </Text>
                  <Text preset="SL" color={"#737373"} style={styles.coverage}>
                    {language?.coverageTitle}: {total_coverage_amount}
                  </Text>
                  <Text preset="SL" color={"#737373"} style={styles.term}>
                    {language?.premiumTitle}: {language?.bdt}{" "}
                    {ToEnNum(CurrencyFormat(premium_amount), code)}
                  </Text>
                  <Text preset="SL" color={"#737373"} style={styles.term}>
                    {language?.termTitle}: {duration} {duration_type_text}
                  </Text>
                </View>
              );
            })}

            {/* Add Image */}
            {data?.length < 2 && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("InsuranceListScreen");
                  dispatch(compareModal());
                }}
                activeOpacity={0.5}
                style={{
                  paddingHorizontal: 5,
                }}
              >
                <View style={[styles.imageContainer, styles.addPlanButton]}>
                  <Entypo name="plus" size={29} color="#D1D5DC" />
                </View>
                {/* text */}
                <View style={styles.addContainer}>
                  <Text color={"#D1D5DC"} style={styles.nameContainer}>
                    {language?.addAPlan}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {/* Footer */}
          <MediumButton
            onPress={handelCompare}
            disabled={data?.length >= 2 ? false : true}
            title={language?.compareNow}
            stylesButton={{
              marginVertical: 10,
              marginBottom: 20,
              elevation: 4.5,
            }}
          />
        </View>
        {/* Background button */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handelClose}
          style={styles.backgroundButton}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#00000011",
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    width: "100%",
    // height: 100,
    zIndex: 1,
    // paddingHorizontal: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    //
    elevation: 10, // Change this value to adjust the shadow's size
    shadowColor: "#c5c5c5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 2,
    shadowRadius: 5,
    //
    borderTopWidth: 2,
    borderColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  cardTitle: {
    fontWeight: "800",
    fontSize: 18,
  },

  itemListContainer: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  imageContainer: {
    position: "relative",
    width: rw(30),
    height: rw(15),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  image: {
    width: rw(30),
    height: rw(15),
    // backgroundColor: 'red',
    resizeMode: "center",
  },
  imageCloseIcon: {
    position: "absolute",
    right: -5,
    top: -10,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  addPlanButton: {
    borderStyle: "dotted",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    paddingTop: 10,
    fontWeight: "800",
    width: "100%",
    textAlign: "center",
  },
  nameContainer: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: "800",
    alignSelf: "center",
  },
  addContainer: {
    width: "100%",
    justifyContent: "center",
  },
  coverage: {
    width: "100%",
    textAlign: "center",
  },
  term: {
    maxWidth: rw(60),
    width: "100%",
    textAlign: "center",
  },
  compareNowButton: {
    borderTopWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderColor: "#ddd",
  },
  comButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#848EA2",
  },
  //  background button
  backgroundButton: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    // backgroundColor: '#2a2a2a1a',
  },
  containerItem: {
    width: rw(45),
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
