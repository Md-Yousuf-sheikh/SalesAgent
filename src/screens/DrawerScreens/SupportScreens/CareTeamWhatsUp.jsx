import {
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Text from "../../../components/Text/Text";
import { COLOR, rh, rw } from "../../../theme/Theme";
import SvgArrowSupport from "../../../svg/SvgArrowSupport";
import SvgWhatUpIcon from "../../../svg/SvgWhatUpIcon";
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function CareTeamWhatsUp({ number }) {
  const language = useSelector(languageSelector);

  // open
  const handelOpen = () => {
    if (Linking.canOpenURL("http://api.whatsapp.com/send?phone=+" + number)) {
      Linking.openURL("http://api.whatsapp.com/send?phone=+" + number);
    } else {
      Alert.alert(
        "Unable to open WhatsApp",
        "Sorry, it seems that the WhatsApp link cannot be opened. Please check the number and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <SvgWhatUpIcon />
      <View style={styles.cardBody}>
        <Text preset="h2" style={styles.cardTitle}>
        {language?.whats_app_us}

        </Text>
        <Text preset="h4" style={styles.cardSubTitle}>
          {language.whatsAppHelpText}
        </Text>
        <Text preset="h4" style={styles.cardNumber}>
          {language.contactNoTextInput} +{number}
        </Text>
        <TouchableOpacity style={styles.cardButton} onPress={handelOpen}>
          <Text preset="h4" style={styles.buttonText}>
            {language.textNowButton}
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
    // marginLeft: 15,
    paddingHorizontal: rw(5),
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
