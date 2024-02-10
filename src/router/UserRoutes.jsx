import React from "react";
import PolicyDetail from "../screens/DrawerScreens/PolicyDetail/PolicyDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InsuranceListScreen from "../screens/DrawerScreens/InsuranceListScreen/InsuranceListScreen";
import PremiumCalculator from "../screens/DrawerScreens/PremiumCalculator/PremiumCalculator";
import CompareOffers from "../screens/DrawerScreens/CompareOffers/CompareOffers";
import UserInfoScreen from "../screens/DrawerScreens/UserInfoScreen/UserInfoScreen";
import NomineeInformation from "../screens/DrawerScreens/NomineeInformation/NomineeInformation";
import InformationPreview from "../screens/DrawerScreens/InformationPreview/InformationPreview";
import PaymentMethod from "../screens/DrawerScreens/PaymentMethod/PaymentMethod";
import SendNotification from "../screens/DrawerScreens/SendNotification/SendNotification";
import OtherActivities from "../screens/OtherActivities/OtherActivities";
import CustomerManagement from "../screens/CustomerManagement/CustomerManagement";
import RegisteredCustomer from "../screens/RegisteredCustomer/RegisteredCustomer";
import AgentTracking from "../screens/DrawerScreens/AgentTracking/AgentTracking";
import CareTeamScreen from "../screens/DrawerScreens/SupportScreens/CareTeamScreen";
import PrivacyPolicyScreen from "../screens/DrawerScreens/PrivacyPolicyScreen";
import TermsConditionsScreen from "../screens/DrawerScreens/TermsConditionsScreen";
import SuggestedPolicy from "../screens/DrawerScreens/SuggestedPolicy/SuggestedPolicy";
import MyAccount from "../screens/DrawerScreens/MyAccount/MyAccount";
import ChangePassword from "../screens/DrawerScreens/ChangePassword/ChangePassword";
import FAQScreen from "../screens/DrawerScreens/FAQScreen/FAQScreen";
import NewRegister from "../screens/NewRegister/NewRegister";
import PolicyRecommended from "../screens/PolicyRecommended/PolicyRecommended";
import AddRecommended from "../screens/AddRecommended/AddRecommended";
import PolicySold from "../screens/PolicySold/PolicySold";
import PaymentPending from "../screens/PaymentPending/PaymentPending";
import RegularCustomer from "../screens/RegularCustomer/RegularCustomer";
import PremiumDue from "../screens/PremiumDue/PremiumDue";
import InactiveCustomer from "../screens/InactiveCustomer/InactiveCustomer";
import ConversionRate from "../screens/ConversionRate/ConversionRate";
import ActiveAgents from "../screens/ActiveAgents/ActiveAgents";
import LeadManagement from "../screens/LeadManageMent/LeadManageMent";
import NewLead from "../screens/NewLead/NewLead";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import SalesCampaign from "../screens/DrawerScreens/SalesCampaign/SalesCampaign";
import CampaignDetails from "../screens/DrawerScreens/CampaignDetails/CampaignDetails";
import LanguageScreen from "../screens/DrawerScreens/Language/LanguageScreen";
import DraftPolicy from "../screens/DraftPolicy/DraftPolicy";
import CommissionScreen from "../screens/Commission/CommissionScreen";
import PaymentSuccessScreen from "../screens/DrawerScreens/PaymentMethod/PaymentSuccessScreen";
import CategoryPurchase from "../screens/PolicyCategories/CategoryPurchase";
import IndependentPremiumCal from "../screens/DrawerScreens/PremiumCalculator/IndependentPremiumCal";
import PaymentWebviewScreen from "../screens/DrawerScreens/PaymentWebViewScreen.jsx/PaymentWebViewScreen";
import GetAQuoteScreen from "../screens/DrawerScreens/GetAQuoteScreen/GetAQuoteScreen";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./BottomTab";
import DrawerStack from "./LayoutRoutes";

// screen option
const screenOptions = {
  headerShown: false,
  animation: "slide_from_right",
};
const Stack = createNativeStackNavigator();

export default function UserRoutes() {

  return (
    <>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="HomeScreen"
      >
        <Stack.Screen name="HomeScreen" component={BottomTab} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen
          name={"CustomerManagement"}
          component={CustomerManagement}
        />
        <Stack.Screen
          name={"RegisteredCustomer"}
          component={RegisteredCustomer}
        />
        <Stack.Screen name={"FAQScreen"} component={FAQScreen} />
        <Stack.Screen name={"SendNotification"} component={SendNotification} />
        <Stack.Screen name={"AgentTracking"} component={AgentTracking} />
        <Stack.Screen name={"CareTeamScreen"} component={CareTeamScreen} />
        <Stack.Screen name={"SuggestedPolicy"} component={SuggestedPolicy} />
        <Stack.Screen
          name={"PrivacyPolicyScreen"}
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen
          name={"TermsConditionsScreen"}
          component={TermsConditionsScreen}
        />
        <Stack.Screen name={"ChangePassword"} component={ChangePassword} />
        <Stack.Screen name={"NewRegister"} component={NewRegister} />
        <Stack.Screen
          name={"PolicyRecommended"}
          component={PolicyRecommended}
        />
        <Stack.Screen name={"AddRecommended"} component={AddRecommended} />
        <Stack.Screen name={"PolicySold"} component={PolicySold} />
        <Stack.Screen name={"PaymentPending"} component={PaymentPending} />
        <Stack.Screen name={"RegularCustomer"} component={RegularCustomer} />
        <Stack.Screen name={"PremiumDue"} component={PremiumDue} />
        <Stack.Screen name={"InactiveCustomer"} component={InactiveCustomer} />
        <Stack.Screen name={"ConversionRate"} component={ConversionRate} />
        <Stack.Screen name={"ActiveAgents"} component={ActiveAgents} />
        <Stack.Screen name={"LeadManagement"} component={LeadManagement} />
        <Stack.Screen name={"NewLead"} component={NewLead} />
        <Stack.Screen name={"SettingsScreen"} component={SettingsScreen} />
        <Stack.Screen name="PolicyDetail" component={PolicyDetail} />
        <Stack.Screen
          name={"InsuranceListScreen"}
          component={InsuranceListScreen}
        />
        <Stack.Screen
          name={"PremiumCalculator"}
          component={PremiumCalculator}
        />
        <Stack.Screen name={"CompareOffers"} component={CompareOffers} />
        <Stack.Screen name={"UserInfoScreen"} component={UserInfoScreen} />
        <Stack.Screen
          name={"NomineeInformation"}
          component={NomineeInformation}
        />
        <Stack.Screen
          name={"InformationPreview"}
          component={InformationPreview}
        />
        <Stack.Screen name={"PaymentMethod"} component={PaymentMethod} />
        <Stack.Screen name={"OtherActivities"} component={OtherActivities} />
        <Stack.Screen name={"SalesCampaign"} component={SalesCampaign} />
        <Stack.Screen name={"CampaignDetails"} component={CampaignDetails} />
        <Stack.Screen name={"LanguageScreen"} component={LanguageScreen} />
        <Stack.Screen name={"DraftPolicy"} component={DraftPolicy} />
        <Stack.Screen name={"CommissionScreen"} component={CommissionScreen} />
        <Stack.Screen
          name={"PaymentSuccessScreen"}
          component={PaymentSuccessScreen}
        />
        <Stack.Screen
          name={"IndependentPremiumCal"}
          component={IndependentPremiumCal}
        />
        <Stack.Screen name={"CategoryPurchase"} component={CategoryPurchase} />
        <Stack.Screen
          name={"PaymentWebViewScreen"}
          component={PaymentWebviewScreen}
        />
        <Stack.Screen name="GetAQuoteScreen" component={GetAQuoteScreen} />
      </Stack.Navigator>
      
    </>
  );
}
