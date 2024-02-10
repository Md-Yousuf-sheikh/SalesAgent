import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { CONTAINER, HEIGHT, rh } from "../../theme/Theme";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import { useSelector } from "react-redux";
import WebView from "react-native-webview";
import { languageSelector } from "../../redux/features/language/languageSlice";
import { WEB_URL } from "../../../config";

export default function TermsConditionsScreen() {
  const language = useSelector(languageSelector);

  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language?.drawerTermsText} />
      <ScrollView style={CONTAINER}>
        <View style={styles.container}>
          <WebView
            scrollEnabled
            style={styles.webContainer}
            source={{
              uri: `${WEB_URL}/terms-conditions`,
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    height: rh(88),
  },
  webContainer: {
    // height: HEIGHT / 1.2,
    // width: "100%",
    // backgroundColor: "red",
  },
});
