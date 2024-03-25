import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { COLOR, rf, rh, rw } from "../../theme/Theme";
import MediumButton from "../../components/Buttons/MediumButton";
import { useNavigation } from "@react-navigation/native";
import Text from "../../components/Text/Text";
import { LinearGradient } from "expo-linear-gradient";
import LanguageToggleButton from "../../components/Buttons/LanguageToggleButton";
import { useSelector } from "react-redux";
import { updateTotalLanguage } from "../../redux/features/language/languageSlice";
import { useGetLanguageTextsQuery } from "../../redux/features/language/languageApiSlice";
import { useEffect } from "react";
import _ from "lodash";

export default function SplashScreen() {
  const navigation = useNavigation();
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );

  const langDetails = useSelector(
    (state) => state?.language.language.finalLanguage
  );
  // let data = languageState
  // handle Button
  // console.log('language', languageState)
  const handleButton = () => {
    console.log("Hello");
    navigation.navigate("SignInNumber");
  };

  const { data: languageData } = useGetLanguageTextsQuery([
    langDetails?.code,
    "agentApp",
  ]);

  useEffect(() => {
    const updateData = async () => {
      if (languageData?.data) {
        let check = _.isEqual(languageData?.data, languageState);
        console.log("checkval", check);
        if (!check) {
          // let fnData = totalLanguageState?.filter(
          //   item => item?.code === languageData?.data?.code
          // )[0]
          const finalData = {
            code: langDetails?.code,
            name: langDetails?.name,
            status: langDetails?.status,
            data: languageData?.data,
          };
          if (finalData) {
            // console.log('acheDataVi', finalData)
            dispatch(updateTotalLanguage(finalData));
          }
        }
      }
    };
    let check = _.isEqual(languageData?.data, languageState);
    if (languageData?.data && !check) {
      updateData();
    }
  }, []);

  return (
    // OnBoarding screen design
    <>
      <StatusBar backgroundColor={"#0c95cfff"} barStyle="dark-content" />
      <LinearGradient
        style={styles.container}
        colors={["rgba(0, 137, 195, 1)", "rgba(0, 42, 112, 1)"]}
      >
        <ImageBackground
          style={styles.container}
          source={require("../../../assets/OnBoardingPng.png")}
        >
          <LanguageToggleButton />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Image source={require("../../../assets/WadaaOnBoard.png")} />
            <Text
              style={{
                width: rw(60),
                alignSelf: "center",
                marginVertical: rh(7),
                textAlign: "center",
                color: COLOR.white,
                right: rw(1),
                // fontSize: rf(2),
              }}
              preset="h3"
            >
              {languageState.splashWelcomeText}
            </Text>
            <MediumButton
              textStyle={{ color: COLOR.black }}
              title={languageState.splashButtonText}
              st
              stylesButton={styles.button}
              onPress={handleButton}
            />
          </View>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: rw(60),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: rh(5),
    marginBottom: rh(2),
  },
  button: {
    backgroundColor: COLOR.white,
    borderColor: COLOR.bluishCyan700,
    borderWidth: rh(0.1),
  },
  container: {
    flex: 1,
  },
  subContainer: {
    alignSelf: "center",
  },
});

const slides = [
  {
    id: 1,
    name: "You are here to buy insurance",
    about:
      "Look no further! Waadaa.Insure is here for your one-stop platform for all insurance related supports.",
    image: require("../../../assets/images/splash/splash01.png"),
  },
  {
    id: 2,
    name: "Insurance is simple",
    about:
      "Do not worry! Waadaa.Insure will help you search for the perfect insurance where you can compare with ease  and choose with prosperity",
    image: require("../../../assets/images/splash/splash02.png"),
  },
  {
    id: 3,
    name: "Waadaa.Insure is here for you",
    about:
      "Waadaa.Insure is the no. 1 insurance serving platform for all Bangladeshi citizens. Waadaa.Insure arose from a problem that insurance was just too complicated, and thus we are here to solve it. ",
    image: require("../../../assets/images/splash/splash03.png"),
  },
];
