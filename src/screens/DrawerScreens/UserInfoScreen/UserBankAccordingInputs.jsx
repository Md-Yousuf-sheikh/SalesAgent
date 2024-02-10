import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useRef, useState } from "react";
import { rf, rh, ROW, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { ToggleAnimation } from "../../../Animation/ToggleAnimation";
import InputText from "../../../components/Inputs/InputText";
import CustomSinglPicker from "../../../components/Inputs/CustomSinglPicker";
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function UserBankAccordingInputs({ title, content, bankInfo }) {
  const [showContent, setShowContent] = useState(false);
  const language = useSelector(languageSelector);
  //  animation
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    // config  animdton
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    // Animated timing
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(ToggleAnimation);
    setShowContent(!showContent);
  };
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });
  //  input  filed get value
  const [BankName, setBankName] = useState("");
  const [BankBranchName, setBankBranchName] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");

  // error
  const [filedError, setFiledError] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          toggleListItem();
        }}
        style={styles.cardButton}
      >
        <View style={ROW}>
          <Text preset="h2" style={styles.cardTitle}>
            {language.paymentDetailsTitle}
          </Text>
        </View>

        <Animated.View
          style={{
            transform: [
              {
                rotateZ: arrowTransform,
              },
            ],
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#2196F3" />
        </Animated.View>
      </TouchableOpacity>
      {/* List open */}
      {showContent && (
        <View style={styles.container}>
          <CustomSinglPicker
            label={language.bankNamePlaceholder}
            placeholder={language.bankNamePlaceholder}
            error={filedError}
            valueProps={setBankName}
          />
          <CustomSinglPicker
            label={language.bankBranchPlaceholder}
            placeholder={language.bankBranchPlaceholder}
            error={filedError}
            valueProps={setBankBranchName}
          />
          <InputText
            label={language.accountNumberPlcaholder}
            placeholder={language.accountNumberPlcaholder}
            markHide={true}
            setValue={setAccountNumber}
            error={filedError}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(2),
    paddingVertical: rh(1),
    backgroundColor: "#ffffff",
  }, //
  //
  cardTitle: {
    fontSize: rf(2.1),
    color: "#4F4F4F",
  },
  card: {
    marginVertical: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#F5F7FF",
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F7FF",
    paddingVertical: rh(1.2),
    paddingHorizontal: rw(4),
  },
  // Table
  table: {
    marginVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  tableText: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  tableTextRight: {
    fontSize: 14,
    color: "#4F4F4F",
    width: rw(40),
    textAlign: "right",
  },
  tableTextLeft: {
    fontSize: 14,
    color: "#4F4F4F",
    width: rw(40),
    textAlign: "left",
  },
});
