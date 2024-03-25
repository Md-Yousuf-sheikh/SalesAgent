import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Text from "../../components/Text/Text";
import { COLOR, rf, rh, rw, TYPOGRAPHY } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import QuotationGeneratorModal from "../../screens/DrawerScreens/QuotationGeneratorModal/QuotationGeneratorModal";
import SvgQuotationIcon from "../../svg/SvgQuotationIcon";
import SvgManageLead from "../../svg/SvgManageLead";
import SvgCareTeam from "../../svg/SvgCareTeam";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/language/languageSlice";

export default function OtherActivityCard() {
  const navigation = useNavigation();
  const languageState = useSelector(languageSelector);
  function handleNavigation(title) {
    navigation.navigate(title);
  }
  const [IsVisible, setIsVisible] = useState(false);
  return (
    <>
      <QuotationGeneratorModal
        IsVisible={IsVisible}
        setIsVisible={setIsVisible}
      />
      <View style={styles.lastActivityContainer}>
        <View style={[styles.lastActivity]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: rw(32),
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{ fontFamily: TYPOGRAPHY.primary, color: "#595959" }}
              preset="h3"
            >
              {languageState.otherActivities}
            </Text>
            <Image
              style={{ top: rh(0.2) }}
              source={require("../../../assets/icons/right-arrow.png")}
            />
          </View>
          <TouchableOpacity onPress={() => handleNavigation("OtherActivities")}>
            <Text style={{ color: "#2253A5" }} preset="h6">
              {languageState.seeMore}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherActivities}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GetAQuoteScreen");
            }}
            style={{ alignItems: "center", width: rw(33) }}
          >
            <SvgQuotationIcon />
            <Text style={styles.buttonText} preset="h5">
              {languageState.quotationGenerator}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigation("LeadManagement")}
            style={{ alignItems: "center", width: rw(28) }}
          >
            <SvgManageLead />
            <Text style={styles.buttonText} preset="h5">
              {languageState.manageLeadText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              width: rw(30),
            }}
            onPress={() => handleNavigation("CareTeamScreen")}
          >
            <SvgCareTeam />
            <Text style={styles.buttonText} preset="h5">
              {languageState.careTeamText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    paddingVertical: 10,
    backgroundColor: "#FBFCFF",
  },
  //
  otherActivities: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: rh(2),
  },
  lastActivityContainer: {
    backgroundColor: COLOR.white,
    minHeight: rh(10),
    width: rw(100),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 3,
    paddingHorizontal: rw(3.5),
    marginVertical: rh(1),
    paddingVertical: rh(1),
  },
  lastActivity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryMain: {
    backgroundColor: COLOR.white,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 3,
    marginVertical: rh(1),
    paddingBottom: rh(1.5),
  },
  categoryFirstItems: {
    flexDirection: "row",
    marginVertical: rh(2.5),
    marginHorizontal: rw(2),
    justifyContent: "space-between",
  },
  categoryFirstrow: {
    flexDirection: "row",
  },
  dailyFilter: {
    height: rh(3.6),
    minWidth: rw(9),
    backgroundColor: "#EAF2FF",
    paddingHorizontal: rw(2),
    paddingVertical: rh(0.5),
    marginHorizontal: rw(1),
  },
  weeklyFilter: {
    height: rh(3.6),
    minWidth: rw(9),
    backgroundColor: "#E5FFEE",
    paddingHorizontal: rw(2),
    paddingVertical: rh(0.5),
    marginHorizontal: rw(1),
  },
  monthlyFilter: {
    height: rh(3.6),
    minWidth: rw(9),
    backgroundColor: "#FFF3E1",
    paddingHorizontal: rw(2),
    paddingVertical: rh(0.5),
    marginHorizontal: rw(1),
  },
  cardTitle: {},
  lineSmall: {
    width: 5,
    height: 2,
    backgroundColor: "#2253A5",
    marginLeft: 15,
    marginRight: 4,
    marginTop: 5,
  },
  lineBig: {
    width: 50,
    height: 2,
    backgroundColor: "#2253A5",
    marginTop: 5,
  },
  // category
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // paddingVertical: rh(1),
    justifyContent: "space-around",
    paddingHorizontal: rw(2),
    // marginVertical: rh(0.5),
  },
  categoryItem: {
    width: rw(30),
    height: rh(14),
    borderWidth: rh(0.1),
    borderColor: "#E5EAFF",
    borderRadius: rh(0.4),
    marginBottom: rh(1),
    // marginHorizontal: rw(1),
  },
  categoryItemImage: {
    alignSelf: "center",
    height: rw(15),
    height: rw(15),
    resizeMode: "contain",
  },
  categoryItemText: {
    textAlign: "left",
    color: "#4F4F4F",
    fontSize: 13,
    marginTop: rh(0.1),
    // fontWeight: "700",
    // letterSpacing: 0.3,
  },
  // Popular Insurance
  popularInsuranceContainer: {
    backgroundColor: COLOR.white,
    // paddingHorizontal: rw(3),
    paddingVertical: rh(3),
    marginVertical: rh(1),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 3,
  },
  // moreServiceContainer
  moreServiceContainer: {
    paddingVertical: rh(3),
    paddingHorizontal: rw(4),
  },
  serviceItemContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  // testimonialsContainer
  testimonialsContainer: {
    paddingHorizontal: rw(4),
  },
  // bannerCardContainer
  bannerCardContainer: {
    paddingHorizontal: rw(4),
    overflow: "hidden",
  },
  //  button text icon
  buttonText: {
    paddingVertical: rh(1.2),
    fontSize: rf(1.65),
  },
});
