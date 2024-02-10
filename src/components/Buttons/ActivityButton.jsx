import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLOR, rh, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import Text from "../../components/Text/Text";
import FaqIcon from "../../../assets/faq-icon.svg";
import RightArrow from "../../../assets/rightArrow.svg";
import MessageBox from "../../../assets/message-box.svg";
import TrackingBox from "../../../assets/tracking-box.svg";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/language/languageSlice";

export default function ActivityButton({
  title,
  check,
  img,
  textStyle,
  ImageStyle,
}) {
  const navigation = useNavigation();
  const language = useSelector(languageSelector);
  let finalTitle;
  if (check === "a") {
    finalTitle = language.faqTitle;
  } else if (check === "b") {
    finalTitle = language.sendNotiButtonText;
  } else if (check === "c") {
    finalTitle = language.agentTrackTitle;
  } else if (title === "Registered Customer") {
    finalTitle = language.registeredCustomerTitle;
  } else if (title === "Policy Recommended") {
    finalTitle = language.policyRecommendedTitle;
  } else if (title === "Policy Sold") {
    finalTitle = language.policySoldHeader;
  } else if (title === "Payment Pending") {
    finalTitle = language.paymentPendingTitle;
  } else if (title === "Draft Policy") {
    finalTitle = language.draftPolicyTitle;
  } else if (title === "Regular Customer") {
    finalTitle = language.regularCustomerTitle;
  } else if (title === "Premium Due") {
    finalTitle = language.premiumDueTitle;
  } else if (title === "Inactive Customer") {
    finalTitle = language.inactiveCustomerTitle;
  } else if (title === "Conversion") {
    finalTitle = language.conversionTitle;
  } else if (title === "Agent Activity Status") {
    finalTitle = language.activeAgentsTitle;
  }
  const handleNavigation = () => {
    if (check === "a") {
      navigation.navigate("FAQScreen");
      // title = language.faqTitle
    } else if (check === "b") {
      navigation.navigate("SendNotification");
      // title = language.sendNotiButtonText
    } else if (check === "c") {
      navigation.navigate("AgentTracking");
      // title = language.agentTrackTitle
    } else if (title === "Registered Customer") {
      navigation.navigate("RegisteredCustomer");
      // title = language.registeredCustomerTitle
    } else if (title === "Policy Recommended") {
      navigation.navigate("PolicyRecommended", {
        policy: true,
      });
      // title = language.policyRecommendedTitle
    } else if (title === "Policy Sold") {
      navigation.navigate("PolicySold", {});
      // title = language.policySoldHeader
    } else if (title === "Payment Pending") {
      navigation.navigate("PaymentPending", {});
      // title = language.paymentPendingTitle
    } else if (title === "Draft Policy") {
      navigation.navigate("DraftPolicy", {});
      // title = language.paymentPendingTitle
    } else if (title === "Regular Customer") {
      navigation.navigate("RegularCustomer", {});
      // title = language.regularCustomerTitle
    } else if (title === "Premium Due") {
      navigation.navigate("PremiumDue", {});
      // title = language.premiumDueTitle
    } else if (title === "Inactive Customer") {
      navigation.navigate("InactiveCustomer", {});
      // title = language.inactiveCustomerTitle
    } else if (title === "Conversion") {
      navigation.navigate("ConversionRate", {});
      // title = language.conversionTitle
    } else if (title === "Agent Activity Status") {
      navigation.navigate("ActiveAgents", {});
      // title = language.activeAgentsTitle
    }
  };

  return (
    <TouchableOpacity onPress={handleNavigation} style={styles.activityButtons}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          // width: rw(30),
        }}
      >
        <View
          style={{
            height: rh(4),
            width: rh(4),
            borderRadius: rh(4),
            backgroundColor: img
              ? COLOR.white
              : check === "a"
              ? "#00A798"
              : check === "b"
              ? "#A05588"
              : check === "c" && "#2253A5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {img ? (
            <Image style={ImageStyle} source={img} />
          ) : title === "FAQ" ? (
            <FaqIcon />
          ) : title === "Send Notification" ? (
            <MessageBox />
          ) : (
            <TrackingBox />
          )}
        </View>
        <Text
          style={[{ color: "#4F4F4F", marginLeft: rh(2) }, textStyle]}
          preset="h1Base"
        >
          {finalTitle}
        </Text>
      </View>
      <RightArrow />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(3),
    paddingVertical: rh(3),
    flex: 1,
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
// catagoriesData

//  popularInsurance
