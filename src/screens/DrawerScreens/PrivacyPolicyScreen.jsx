import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { CONTAINER, HEIGHT, rh } from "../../theme/Theme";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import { useSelector } from "react-redux";
import WebView from "react-native-webview";
import { languageSelector } from "../../redux/features/language/languageSlice";
import { WEB_URL } from "../../../config";
import Text from "../../components/Text/Text";

export default function TermsConditionsScreen() {
  const language = useSelector(languageSelector);
  const [loading, setLoading] = React.useState(true);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language?.drawerPrivacyText} />
      <ScrollView style={CONTAINER}>
        <View style={styles.container}>
          {/* {loading && (
            <View
              style={{
                flex: 1,
                backgroundColor:"red"
              }}
            >
              <ActivityIndicator size="large" color="#2253a5" />
            </View>
          )} */}
          <WebView
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            scrollEnabled
            style={styles.webContainer}
            source={{ uri: `${WEB_URL}/privacy-policy` }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: rh(88),
  },
  webContainer: {
    flex: 1,
  },
});
