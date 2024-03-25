import { ImageBackground, StyleSheet, View } from "react-native";
import React from "react";
import { rf, rh, ROW, RSC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/features/language/languageSlice";
import { AntDesign } from "@expo/vector-icons";
import MediumButton from "../../../components/Buttons/MediumButton";

export default function SalesCampaignCard({ bg, boxBg, data }) {
  const navigation = useNavigation();
  const language = useSelector(languageSelector);

  // CampaignDetails
  // console.log("data", data);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("CampaignDetails", {
          campaignDetails: data,
        });
      }}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: bg,
          },
        ]}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text preset="h4">{data?.name}</Text>
          <Text preset="SM" style={styles.expiryDate}>
            {language.expiryDate}: {data?.end_date}
          </Text>
        </View>
        <Text preset="SM" line={5} style={styles.description}>
          {data?.description}
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CampaignDetails", {
              campaignDetails: data,
            });
          }}
          style={styles.buttonDetails}
        >
          <AntDesign name="rightcircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: rh(16),
    borderRadius: 5,
    paddingVertical: 5,
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 4,
    borderColor: "#ffffffc0",
    padding: 15,
  },
  description: {
    maxWidth: "90%",
    fontSize: rf(1.5),
    paddingTop: 5,
  },
  expiryDate: {
    fontWeight: "200",
    color: "#4F4F4F",
    fontFamily: "Roboto-Regular",
  },
  boxContainer: {
    flexDirection: "row",
  },
  boxMainContainer: {
    alignContent: "center",
    justifyContent: "center",
  },
  buttonDetails: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});
