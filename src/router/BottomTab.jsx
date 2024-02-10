import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { TabBarAdvancedButton } from "../components/TabBarAdvanceButton/TabBarAdvanceButton";
import { COLOR, rh } from "../theme/Theme";
import Text from "../components/Text/Text";
import { useSelector } from "react-redux";
import { languageSelector } from "../redux/features/language/languageSlice";
// icons
import BottomPolicy from "../../assets/bottomPolicy.svg";
import BottomPolicyFocus from "../../assets/bottomPolicyFocus.svg";
import BottomCalculator from "../../assets/bottomCalculator.svg";
import BottomCalculatorFocus from "../../assets/bottomCalculatorFocus.svg";
import BottomAccount from "../../assets/bottomAccount.svg";
import BottomAccountFocus from "../../assets/bottomAccountFocus.svg";
import BottomCampaign from "../../assets/bottomCampaign.svg";
import BottomCampaignFocus from "../../assets/bottomCampaignFocus.svg";
// screen
import HomeScreen from "../screens/DrawerScreens/HomeScreen/HomeScreen";
import MyAccount from "../screens/DrawerScreens/MyAccount/MyAccount";
import IndependentPremiumCal from "../screens/DrawerScreens/PremiumCalculator/IndependentPremiumCal";
import SalesCampaign from "../screens/DrawerScreens/SalesCampaign/SalesCampaign";
import PolicyCategories from "../screens/PolicyCategories/PolicyCategories";

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const [keyboardShow, setKeyboardShow] = React.useState();

  const languageState = useSelector(languageSelector);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShow(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShow(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const barColor = COLOR.white;

  const screenOptions = {
    unmountOnBlur: true,
    showIcon: true,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      backgroundColor: "#fd050500",
      position: "absolute",
      elevation: 0,
      height: rh(7.3),
      display: "flex",
    },
    style: styles.navigator,
    tabBarItemStyle: {
      backgroundColor: barColor,
    },
  };

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <View
          style={[
            styles.navigatorContainer,
            keyboardShow && {
              marginTop: 0,
            },
          ]}
        >
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={screenOptions}
      initialRouteName={"HomeScreen"}
    >
      <Tab.Screen
        name="Policy"
        component={PolicyCategories}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <BottomPolicyFocus /> : <BottomPolicy />,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#3369B3" : "#4F4F4F",
                fontSize: rh(1.6),
                bottom: rh(0.3),
              }}
            >
              {languageState.bottomTabFirstTitleText}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={IndependentPremiumCal}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? <BottomCalculatorFocus /> : <BottomCalculator />,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#3369B3" : "#4F4F4F",
                fontSize: rh(1.6),
                bottom: rh(0.3),
              }}
            >
              {languageState.bottomTabSecondTitleText}
            </Text>
          ),
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <TabBarAdvancedButton bgColor={barColor} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={MyAccount}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? <BottomAccountFocus /> : <BottomAccount />,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#3369B3" : "#4F4F4F",
                fontSize: rh(1.6),
                bottom: rh(0.3),
              }}
            >
              {languageState.bottomTabFourthTitleText}
            </Text>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Campaign"
        component={SalesCampaign}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? <BottomCampaignFocus /> : <BottomCampaign />,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#3369B3" : "#4F4F4F",
                fontSize: rh(1.6),
                bottom: rh(0.3),
              }}
            >
              {languageState.bottomTabFifthTitleText}
            </Text>
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {},
  navigator: {
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 30,
  },
  xFillLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: rh(3.6),
  },
});
