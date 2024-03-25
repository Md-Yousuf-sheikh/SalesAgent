import { RefreshControl, StatusBar, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { COLOR, CONTAINER, rh, rw, TYPOGRAPHY } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SalesCampaignCard from "./SalesCampaignCard";
import { useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { BackHandler } from "react-native";
import { useGetSalesCampaignQuery } from "../../../redux/features/purchase/purchaseApiSlice";
import CampaignProgressCard from "./CampaignProgressCard";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function SalesCampaign() {
  const language = useSelector(languageSelector);
  const navigation = useNavigation();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  const {
    data: salesCampaignData,
    refetch,
    isLoading,
  } = useGetSalesCampaignQuery();
  const handleBackButtonClick = () => {
    if (prevRoute?.name) {
      navigation.navigate(prevRoute);
    } else {
      navigation.navigate("Home", "HomeStack");
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  //
  // Define an array of background colors
  const bgColors = ["#EFFFDC", "#FFE5E7", "#CCE8FF"];

  const pullMe = () => {
    refetch();
  };
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );
  return (
    <>
      <DrawerHeader title={language.salesCampaignHeader} />
      <StatusBar backgroundColor={"#2253a5"} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={CONTAINER}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={pullMe} />
        }
      >
        <View style={styles.container}>
          <CampaignProgressCard mainData={salesCampaignData} />
          {salesCampaignData?.campaigns &&
            salesCampaignData?.campaigns?.length > 0 && (
              <>
                {salesCampaignData?.campaigns?.map((item, index) => {
                  const bgColor = bgColors[index % bgColors?.length];
                  return (
                    <SalesCampaignCard
                      data={item}
                      bg={bgColor}
                      boxBg={"#E3E3E3"}
                    />
                  );
                })}
              </>
            )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: rh(2),
    paddingBottom: rh(9.5),
    paddingHorizontal: rw(4),
  },
  cardBox: {
    backgroundColor: COLOR.white,
    borderRadius: rh(1),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 1,
    borderColor: "#ffffffc0",
    padding: 5,
    marginTop: 15,
  },
});
