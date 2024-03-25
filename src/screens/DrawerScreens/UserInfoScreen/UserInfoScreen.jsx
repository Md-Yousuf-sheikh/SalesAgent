import { StatusBar, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CONTAINER, HEIGHT, rh, rw } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PersonalInformationForm from "../../../components/core/userInfo/PersonalInformationForm";
import FormStepProgress from "../../../components/Buttons/FormStepProgress";
import { useDispatch, useSelector } from "react-redux";
import { languageSelector } from "../../../redux/features/language/languageSlice";

import MotorInformationForm from "../../../components/core/userInfo/MotorInformationForm";
import {
  currentBuySelector,
  premiumCalculatorSelector,
  purchasePolicyUidSelector,
} from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import { useGetAllCustomersQuery } from "../../../redux/features/customer/customerApiSlice";
import {
  selectCustomer,
  setSelectedCustomer,
} from "../../../redux/features/customer/customerSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import RegUserList from "../../../components/Inputs/RegUserLists";
import MediumButton from "../../../components/Buttons/MediumButton";
import Skeleton from "../../../components/Skeleton/Skeleton";

export default function UserInfoScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const language = useSelector(languageSelector);
  const currentItem = useSelector(currentBuySelector);
  const premiumCalculator = useSelector(premiumCalculatorSelector);
  const purchasePolicyUid = useSelector(purchasePolicyUidSelector);
  const authCustomer = useSelector(selectCustomer);
  const [userInfo, setUserInfo] = useState(null);
  // API

  const {
    data: usersList,
    isLoading,
    refetch,
  } = useGetAllCustomersQuery(`?type=b2c&per_page=200`);

  // set new user
  useEffect(() => {
    if (authCustomer) {
      setUserInfo(authCustomer);
    }
  }, [authCustomer]);

  // get new users
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );
  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language.userInfoHeader} />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={CONTAINER}
        contentContainerStyle={{
          paddingHorizontal: rw(4),
          paddingBottom: rh(8),
        }}
      >
        <FormStepProgress item={currentItem} current={1} />
        {usersList?.data?.users?.length > 0 ? (
          <>
            <RegUserList
              data={usersList?.data?.users}
              userInfo={userInfo}
              setUserInfo={(value) => {
                dispatch(setSelectedCustomer(value));
                setUserInfo(value);
              }}
              placeholder={"Select User"}
              // errorCheck={}
              required={"1"}
            />
          </>
        ) : (
          <View>
            {isLoading ? (
              <Skeleton height={50} width={rw(92)} rounded={5} />
            ) : (
              <MediumButton
                title={language?.registeredCustomerTitle}
                onPress={() => {
                  navigation.navigate("RegisteredCustomer");
                }}
              />
            )}
          </View>
        )}

        {/* Health or Life or travel or device   */}
        {authCustomer &&
          (currentItem?.category?.id?.toString() === "1" ||
            currentItem?.category?.id?.toString() === "2" ||
            currentItem?.category?.id?.toString() === "3" ||
            currentItem?.category?.id?.toString() === "4") && (
            <PersonalInformationForm
              premCalculate={premiumCalculator}
              currentItem={currentItem}
              authUser={authCustomer || {}}
              purchasePolicyUid={purchasePolicyUid}
            />
          )}

        {/* Motor  */}
        {authCustomer && currentItem?.category?.id?.toString() === "5" && (
          <MotorInformationForm
            premCalculate={premiumCalculator}
            currentItem={currentItem}
            authUser={authCustomer || {}}
            purchasePolicyUid={purchasePolicyUid}
          />
        )}
        {/* <Mot /> */}
      </KeyboardAwareScrollView>
    </>
  );
}

const style = StyleSheet.create({
  //
  centerButton: {
    height: HEIGHT / 1.2,
    justifyContent: "center",
    alignContent: "center",
  },
});
