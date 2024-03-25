import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import DrawerMiniProfile from "../components/Profile/DrawerMiniProfile";
import { rh, rw } from "../theme/Theme";
import DrawerButton from "../components/Buttons/DrawerButton";
import SvgLogout from "../svg/DrawerSvgIcon/SvgLogout";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setCredentials } from "../redux/features/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CareTeamIcon,
  CommissionIcon,
  CustomerMIcon,
  FQAIcon,
  LeadMIcon,
  PasswordIcon,
  PoliciesIcon,
  PrivacyIcon,
  SalesCampaignIcon,
  TermsCondIcon,
} from "../svg/DrawerSvgIcon";

import { useSignOutMutation } from "../redux/features/auth/authApiSlice";
import { languageSelector } from "../redux/features/language/languageSlice";

export default function CustomDrawer(props) {
  const languageState = useSelector(languageSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [signOut, { isLoading }] = useSignOutMutation();

  //  logout
  async function handleLogOut() {
    await AsyncStorage.clear();
    dispatch(setCredentials({ token: null, user: null }));
    dispatch(logOut());
    signOut();
  }
  // nav fun
  function nav(nav) {
    navigation.navigate(nav);
  }

  // 
  return (
    <View style={styles.container}>
      <DrawerMiniProfile props={props} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DrawerButton
          name={languageState.dashboardTitle}
          icon={<CustomerMIcon />}
          onPress={() => nav("HomeScreen")}
        />
        <DrawerButton
          name={languageState.drawerCustomerText}
          icon={<CustomerMIcon />}
          onPress={() => nav("CustomerManagement")}
        />
        <DrawerButton
          name={languageState.commissionTitle}
          icon={<CommissionIcon />}
          onPress={() => nav("CommissionScreen")}
        />
        <DrawerButton
          name={languageState.drawerPolicyText}
          icon={<PoliciesIcon />}
          onPress={() => {
            const data = {
              slug: "health-insurance",
              id: 1,
              polType: "B2C",
            };
            navigation.navigate("InsuranceListScreen", {
              item: data,
            });
          }}
        />
        <DrawerButton
          name={languageState.drawerSalesText}
          icon={<SalesCampaignIcon />}
          onPress={() => navigation.navigate("SalesCampaign", {})}
        />
        <DrawerButton
          name={languageState.drawerLeadText}
          icon={<LeadMIcon />}
          onPress={() => navigation.navigate("LeadManagement", {})}
        />
        <DrawerButton
          name={languageState.drawerFaqText}
          icon={<FQAIcon />}
          onPress={() => navigation.navigate("FAQScreen", {})}
        />
        <DrawerButton
          name={languageState.drawerCareText}
          icon={<CareTeamIcon />}
          onPress={() => navigation.navigate("CareTeamScreen", {})}
        />

        <DrawerButton
          name={languageState.drawerPrivacyText}
          icon={<PrivacyIcon />}
          onPress={() => navigation.navigate("PrivacyPolicyScreen", {})}
        />
        <DrawerButton
          name={languageState.drawerTermsText}
          icon={<TermsCondIcon />}
          onPress={() => navigation.navigate("TermsConditionsScreen", {})}
        />
        <DrawerButton
          name={languageState.drawerChangeText}
          icon={<PasswordIcon />}
          onPress={() => navigation.navigate("ChangePassword", {})}
        />
        <DrawerButton
          name={languageState.drawerSettingsText}
          icon={<PasswordIcon />}
          onPress={() => navigation.navigate("SettingsScreen", {})}
        />
      </ScrollView>
      <View style={styles.line} />
      <DrawerButton
        loader={isLoading}
        name={languageState.drawerLogoutText}
        icon={<SvgLogout />}
        onPress={() => handleLogOut()}
        style={{ marginBottom: rh(4) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0089ED",
    flex: 1,
    paddingHorizontal: rw(5),
  },
  line: {
    height: rh(0.2),
    width: "100%",
    backgroundColor: "#dddd",
    marginVertical: rh(0.7),
  },
});
