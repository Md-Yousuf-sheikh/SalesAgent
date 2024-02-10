import {
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import SvgSupportHedPhone from "../../../svg/SvgSupportHedPhone";
import Text from "../../../components/Text/Text";
import { COLOR, rh, rw } from "../../../theme/Theme";
import SvgArrowSupport from "../../../svg/SvgArrowSupport";
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/features/language/languageSlice";
export default function CareTeamPhone({ number }) {
  const language = useSelector(languageSelector);

  // open
  const handelOpen = () => {
    if (Linking.canOpenURL(`tel:${number}`)) {
      Linking.openURL(`tel:${number}`);
    } else {
      Alert.alert(
        "Unable to make a call",
        "Sorry, it seems that the phone number cannot be opened for calling. Please check the number and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <SvgSupportHedPhone />
      <View style={styles.cardBody}>
        <Text preset="h2" style={styles.cardTitle}>
          {language?.the_care_team}
        </Text>
        <Text preset="h4" style={styles.cardSubTitle}>
          {language.careTeamHelpText}
        </Text>
        <Text preset="h4" style={styles.cardNumber}>
          {language.contactNoTextInput} +{number}
        </Text>
        <TouchableOpacity style={styles.cardButton} onPress={handelOpen}>
          <Text preset="h4" style={styles.buttonText}>
            {language.callNowButton}
          </Text>
          <SvgArrowSupport />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#00000060",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: rh(1),
    paddingHorizontal: rw(3),
    borderRadius: rw(1),
    paddingVertical: rh(2),
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dddddd10",
    flexDirection: "row",
    alignItems: "center",
  },
  cardBody: {
    marginLeft: 15,
  },
  cardTitle: {
    color: COLOR.gray700,
    paddingVertical: rw(0.5),
  },
  cardSubTitle: {
    color: COLOR.gray300,
    paddingVertical: rw(0.5),
  },
  cardNumber: {
    color: "#8A8A8A",
    paddingVertical: rw(0.5),
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: rw(0.5),
  },
  buttonText: {
    marginRight: 5,
    fontWeight: "800",
    color: "rgb(34, 83, 165) ",
  },
});
