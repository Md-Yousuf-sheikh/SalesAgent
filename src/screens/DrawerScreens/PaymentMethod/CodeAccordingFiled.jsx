import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { rf, rh, ROW, RSC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { ToggleAnimation } from "../../../Animation/ToggleAnimation";
import { useSelector } from "react-redux";
import InputText from "../../../components/Inputs/InputText";
import MediumButton from "../../../components/Buttons/MediumButton";
import {
  codeSelector,
  selectLanguage,
} from "../../../redux/features/language/languageSlice";
import { toBnNum } from "../../../utils";

export default function CodeAccordingFiled({
  label,
  placeholder,
  disabled,
  setValue,
  setShowContent,
  showContent,
  keyName,
  handelSubmit,
  demoFiled,
  item,
}) {
  const language = useSelector(selectLanguage);
  const code = useSelector(codeSelector);
  //  animation
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(ToggleAnimation);
    //
    if (keyName === "promoOpen") {
      setShowContent((prev) => ({
        ...prev,
        [keyName]: !prev[keyName],
        loyaltyOpen: false,
        referralOpen: false,
      }));
    } else if (keyName === "loyaltyOpen") {
      setShowContent((prev) => ({
        ...prev,
        [keyName]: !prev[keyName],
        promoOpen: false,
        referralOpen: false,
      }));
    } else {
      setShowContent((prev) => ({
        ...prev,
        [keyName]: !prev[keyName],
        promoOpen: false,
        loyaltyOpen: false,
      }));
    }
  };
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "-90deg"],
  });

  // item

  // useEffect(() => {
  //   if (demoFiled) {
  //     toggleListItem();
  //   }
  // }, [demoFiled]);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          toggleListItem();
        }}
        style={styles.cardButton}
        disabled={demoFiled ? true : false}
      >
        <View style={ROW}>
          <Text preset="h2" style={styles.cardTitle}>
            {label}
          </Text>
        </View>
        <View style={ROW}>
          {!demoFiled && (
            <Animated.View
              style={{
                transform: [
                  {
                    rotateZ: arrowTransform,
                  },
                ],
              }}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={25}
                color="#2196F3"
              />
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>
      {/* List open */}
      {(showContent || demoFiled) && (
        <View style={styles.cardContent}>
          <View style={RSC}>
            {demoFiled ? (
              <Text preset="S" color={"#4a4a4a"} style={styles.loyaltyUseTitle}>
                {language?.you_can_use_the_maximum}{" "}
                {toBnNum(item?.data?.max_loyalty_redeem, code)}{" "}
                {language?.points}
              </Text>
            ) : (
              <InputText
                markHide={true}
                setValue={setValue}
                styleInput={styles.inputFiled}
                placeholder={placeholder}
              />
            )}
            <MediumButton
              title={"Apply"}
              stylesButton={styles.button}
              titleStyle={styles.buttonTitle}
              type={"sec"}
              onPress={handelSubmit}
              disabled={disabled}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: rf(1.9),
    color: "#4F4F4F",
  },
  card: {
    marginBottom: rh(1.5),
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
  cardContent: {
    paddingBottom: rh(1.7),
    backgroundColor: "#f5f7ffa7",
    paddingHorizontal: 5,
    overflow: "hidden",
    justifyContent: "center",
  },
  //  content style
  inputFiled: {
    width: rw(52),
    backgroundColor: "#fff",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: rw(25),
    marginVertical: 1,
    borderRadius: 30,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
    marginTop: -5,
  },
  buttonTitle: {
    // color:'red',
  },
  styleValue: {
    fontSize: 15,
    paddingTop: 5,
    color: "#4a4a4acd",
    fontWeight: "800",
  },
  loyaltyUseTitle: {
    paddingTop: 5,
    fontWeight: "400",
    marginLeft: 10,
    width: "55%",
  },
});
