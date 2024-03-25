import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Text from "../../../components/Text/Text";
import { COLOR, CONTAINER, rf, rh, ROW, RSC, rw } from "../../../theme/Theme";
import DrawerHomeHeader from "../../../components/Headers/DrawerHomeHeader";
import PopularInsuranceCard from "./PopularInsuranceCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import OtherActivityCard from "../../../components/OtherActivityCard/OtherActivityCard";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Inputs/InputText";
import {
  selectAuthUser,
  updateResetModal,
} from "../../../redux/features/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Filter from "../../../../assets/filter.svg";
import InsuranceFilter from "../../../components/Shared/InsuranceFilter";
import { useGetLanguageTextsQuery } from "../../../redux/features/language/languageApiSlice";
import _ from "lodash";
import {
  languageSelector,
  updateTotalLanguage,
} from "../../../redux/features/language/languageSlice";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApiSlice";
import {
  useGetAllCategoriesQuery,
  useGetFeaturePoliciesQuery,
  useGetQuoteFormQuery,
  useLazyGetFeaturePoliciesB2BQuery,
  useLazyGetFeaturePoliciesQuery,
} from "../../../redux/features/policy/policyApiSlice";
import {
  setAllCategories,
  setQuoteForm,
} from "../../../redux/features/policy/policySlice";
import {
  useGetMyInfoQuery,
  useLazyGetMyInfoQuery,
} from "../../../redux/features/user/userApiSlice";
import { setMyData } from "../../../redux/features/user/userSlice";
import {
  useGetAgentsWholeTargetQuery,
  useGetAllCustomersQuery,
  useGetCustomerManagementDatasQuery,
  useLazyGetAgentsWholeTargetQuery,
  useLazyGetCustomerManagementDatasQuery,
} from "../../../redux/features/customer/customerApiSlice";
import { setAllCustomers } from "../../../redux/features/customer/customerSlice";
import SkeletonPopularCard from "../../../components/Skeleton/SkeletonPopularCard";
import Skeleton from "../../../components/Skeleton/Skeleton";
import useShowToastMessage from "../../../hooks/useShowToastMessage";
import {  toSnakeCase } from "../../../utils";
import Background from "../../../components/Shared/Background";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useShowToastMessage();
  //
  const authUser = useSelector(selectAuthUser);
  const language = useSelector(languageSelector);
  const langDetails = useSelector(
    (state) => state?.language.language.finalLanguage
  );

  const modalTest = useSelector((state) => state.auth.modalTest);
  const allCat = useSelector((state) => state?.policy?.allCategoriesDatas);
  const [IsVisible, setIsVisible] = useState(false);
  const [blueTest, setBlueTest] = useState(true);
  const [filedError, setFiledError] = useState(false);
  const [password, setPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [blueTestSecond, setBlueTestSecond] = useState(false);
  // const [mainData, setMainData] = useState();
  const [polType, setPolType] = useState("B2C");
  const [featurePolicies, setFeaturePolicies] = useState();
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [filterDatas, setFilterDatas] = useState([]);
  const [filterTargetDatas, setFilterTargetDatas] = useState();

  const { data: myData } = useGetMyInfoQuery();
  const [getMyData] = useLazyGetMyInfoQuery();
  const { data: allCustomer } = useGetAllCustomersQuery();
  const { data: languageData } = useGetLanguageTextsQuery([
    langDetails?.code,
    "agentApp",
  ]);
  const { data: allCategoriesData, refetch: refetchCategory } =
    useGetAllCategoriesQuery(langDetails?.code);
  const [changePass, { isLoading }] = useChangePasswordMutation();

  const { data: targetDatas } = useGetAgentsWholeTargetQuery();
  const [getWholeTargetData, {}] = useLazyGetAgentsWholeTargetQuery();

  const { data: customerManagement, isLoading: customerManagementLoading } =
    useGetCustomerManagementDatasQuery([
      `?duration=monthly&lang=${langDetails?.code}`,
    ]);

  //dateFilterDatas
  const [getCustomerMData, { isLoading: getCustomerMLoading }] =
    useLazyGetCustomerManagementDatasQuery();

  // handleDateFilter
  const handleDateFilter = useCallback(async () => {
    if (dateTo && dateFrom && dateFrom !== undefined && dateTo !== undefined) {
      try {
        let paramData = `?from=${dateFrom
          ?.split("-")
          .reverse()
          .join("-")}&to=${dateTo?.split("-").reverse().join("-")}&lang=${
          langDetails?.code
        }`;

        const res = await getCustomerMData([paramData]).unwrap();
        setFilterDatas(res?.data);
        toast(language?.filter_applied);
        // setDateFrom(null);
        // setDateTo(null);
        setIsVisible(false);
      } catch (error) {
        // Handle error
      }
    } else {
      toast("Select both date");
    }
  }, [dateTo, dateFrom, getCustomerMData]);

  //
  useEffect(() => {
    setFilterDatas(customerManagement?.data);
  }, [customerManagement]);
  //
  useEffect(() => {
    setFilterTargetDatas(targetDatas);
  }, [targetDatas]);

  //filterData
  const handleFilter = useCallback(
    async (val) => {
      try {
        let duration = `?duration=${val}`;
        const res = await getCustomerMData([duration]).unwrap();
        setFilterDatas(res?.data);
        toast(
          `${
            val === "daily"
              ? "Daily"
              : val === "weekly"
              ? "Weekly"
              : val === "monthly" && "Monthly"
          } Filter Applied`
        );
      } catch (error) {
        // Handle error
      }
    },
    [getCustomerMData]
  );
  //
  const { data: featurePoliciess } = useGetFeaturePoliciesQuery([
    langDetails?.code,
  ]);

  const [getFeaturePol, { isLoading: featureLoading }] =
    useLazyGetFeaturePoliciesQuery();
  const [getFeaturePolB2B, { isLoading: featureLoadingB2B }] =
    useLazyGetFeaturePoliciesB2BQuery();

  const { data: QuoteForm } = useGetQuoteFormQuery("5", langDetails?.code);
  // colorHandleFirst
  function colorHandleFirst() {
    setBlueTest(true);
    setPolType("B2C");
    setBlueTestSecond(false);
  }
  function colorHandleSecond() {
    setBlueTest(false);
    setPolType("B2B");
    setBlueTestSecond(true);
  }
  // reset pass
  async function resetPass() {
    if (oldPassword && password && confirmPassword) {
      const data = {
        oldPassword: oldPassword,
        newPassword: password,
        confirmPassword: confirmPassword,
      };
      Keyboard.dismiss();
      try {
        const res = await changePass(data).unwrap();
        toast(res?.message);
        await AsyncStorage.setItem("MODAL", "CLOSE");
        dispatch(updateResetModal(false));
        setFiledError(false);
      } catch (error) {
        toast(error?.data?.message, "error");
        setFiledError(true);
      }
    } else {
      setFiledError(true);
    }
  }
  //
  useEffect(() => {
    if (QuoteForm) {
      dispatch(setQuoteForm(QuoteForm?.Get_a_Quote));
    }
  }, [QuoteForm]);
  //
  useEffect(() => {
    if (allCustomer) {
      dispatch(setAllCustomers(allCustomer));
    }
  }, [allCustomer]);
  //
  async function featurePol() {
    try {
      const res = await getFeaturePol([langDetails?.code]).unwrap();
      setFeaturePolicies(res?.data);
    } catch (error) {}
  }
  async function featurePolB2B() {
    try {
      const res = await getFeaturePolB2B([langDetails?.code]).unwrap();
      setFeaturePolicies(res?.data);
    } catch (error) {
      // console.log('errorOfFeatureB2B', error)
    }
  }

  // 
  useEffect(() => {
    if (polType === "B2C") {
      featurePol();
    } else if (polType === "B2B") {
      featurePolB2B();
    }
  }, [polType, navigation, featurePoliciess]);
  //
  useEffect(() => {
    const updateData = async () => {
      if (languageData?.data) {
        let check = _.isEqual(languageData?.data, language);
        if (!check) {
          const finalData = {
            code: langDetails?.code,
            name: langDetails?.name,
            status: langDetails?.status,
            data: languageData?.data,
          };
          if (finalData) {
            dispatch(updateTotalLanguage(finalData));
          }
        }
      }
    };
    //
    let check = _.isEqual(languageData?.data, language);
    if (languageData?.data && !check) {
      updateData();
    }
  }, [languageData?.data]);
  //
  useEffect(() => {
    let check = _.isEqual(allCategoriesData, allCat);
    if (!check && allCategoriesData) {
      dispatch(setAllCategories(allCategoriesData));
    }
  }, [allCategoriesData]);
  //
  useEffect(() => {
    if (myData) {
      dispatch(setMyData(myData));
    }
  }, [myData]);
  //
  // Do something when the screen blurs
  const getCustomers = async () => {
    const filter = `?duration=monthly`;
    try {
      const res = await getCustomerMData([filter]).unwrap();
      setFilterDatas(res?.data);
    } catch (error) {}
  };

  // get hole target data
  const getWholeTarget = async () => {
    try {
      const res = await getWholeTargetData().unwrap();
      setFilterTargetDatas(res);
    } catch (error) {}
  };
//  grt my info
  const getMyCustomers = async () => {
    try {
      const res = await getMyData().unwrap();
      dispatch(setMyData(res));
    } catch (error) {}
  };


  useFocusEffect(
    React.useCallback(() => {
      getMyCustomers();
      getWholeTarget();
      getCustomers();
    }, [])
  );

  // handleNavigation
  function handleNavigation(item) {
    if (item?.label === "Registered") {
      navigation.navigate("RegisteredCustomer");
    } else if (item?.label === "Recommended") {
      navigation.navigate("PolicyRecommended");
    } else if (item?.label === "Policy Sold") {
      navigation.navigate("PolicySold", {});
    } else if (item?.label === "Payment Pending") {
      navigation.navigate("PaymentPending", {});
    } else if (item?.label === "Regular Customer") {
      navigation.navigate("RegularCustomer", {});
    } else if (item?.label === "Premium Due") {
      navigation.navigate("PremiumDue", {});
    } else if (item?.label === "Inactive Customer") {
      navigation.navigate("InactiveCustomer", {});
    } else if (item?.label === "Conversion") {
      navigation.navigate("ConversionRate", {});
    } else if (item?.label === "Field Force Active") {
      navigation.navigate("ActiveAgents", {});
    }
  }
  //
  const handelPullRefetch = () => {
    getWholeTarget()
    getMyCustomers()
    getCustomers();
    if (polType === "B2C") {
      featurePol();
    } else if (polType === "B2B") {
      featurePolB2B();
    }
  };

  return (
    <>
      {/* Insurance Filter Modal */}
      <InsuranceFilter
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        IsVisible={IsVisible}
        setIsVisible={setIsVisible}
        handleDateFilter={handleDateFilter}
        isLoading={getCustomerMLoading}
      />
      {/* CONTAINER */}
      <View style={[CONTAINER, { position: "relative" }]}>
        {/*  Reset Password */}
        {modalTest && (
          <View
            style={{
              opacity: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 999,
            }}
          >
            <View
              style={{
                height: rh(25),
                width: rw(80),
                position: "absolute",
                top: rh(10.5),
                backgroundColor: "#ff000000",
                alignSelf: "center",
                borderRadius: rh(1),
                // right: rh(7),
              }}
            >
              <View
                style={[
                  styles.triangle,
                  { transform: [{ rotateZ: "-20deg" }] },
                ]}
              />
              <View style={[styles.resetPassModal]}>
                <Text preset="h2">{language.resetpassModalTitle}</Text>
                <Text
                  style={{ marginTop: rh(0.2), color: "#737373" }}
                  preset="h5"
                >
                  {language.resetPassModalDetail}
                </Text>

                <InputText
                  placeholder={language.oldPassPlaceholder}
                  secureTextEntry={true}
                  setValue={setOldPassword}
                  value={oldPassword}
                  type="password"
                  style={{ height: rh(4) }}
                  styleInput={{ height: rh(4.5) }}
                  error={filedError}
                />
                <InputText
                  placeholder={language.passWordPlaceHolderText}
                  secureTextEntry={true}
                  setValue={setPassword}
                  value={password}
                  type="password"
                  style={{ height: rh(4) }}
                  styleInput={{ height: rh(4.5) }}
                  error={filedError}
                />
                <InputText
                  placeholder={language.confirmPassPlaceholder}
                  secureTextEntry={true}
                  setValue={setConfirmPassword}
                  value={confirmPassword}
                  type="password"
                  style={{ height: rh(4) }}
                  styleInput={{ height: rh(4.5) }}
                  error={filedError}
                />

                <TouchableOpacity
                  onPress={resetPass}
                  style={{
                    backgroundColor: COLOR.bluishCyan700,
                    height: rh(4),
                    width: rw(25),
                    borderRadius: rh(2),
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "flex-end",
                    marginTop: rh(1),
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator
                      color={COLOR.white}
                      // style={{ right: rh(1) }}
                    />
                  ) : (
                    <Text style={{ color: COLOR.white }}>
                      {language.setButtonText}
                    </Text>
                  )}
                </TouchableOpacity>
                {/* <MediumButton
                  title={language.setButtonText}
                  onPress={resetPass}
                  loader={isLoading}
                  // disabled={password === null || email === null ? true : false}
                  stylesButton={[
                    {
                      width: rw(25),
                      height: rh(4),
                      marginVertical: rh(0.5),
                      marginHorizontal: rw(0),
                      alignSelf: 'flex-end',
                    },
                  ]}
                /> */}
              </View>
            </View>
          </View>
        )}
        {/* content */}
        <>
          <DrawerHomeHeader targetDatas={filterTargetDatas} />
          <Background onRefresh={handelPullRefetch} refreshIsOpen={true}>
            <View style={[styles.container]}>
              {/* Details Category  */}
              <View style={styles.categoryMain}>
                {/* Filters  categories data */}
                <View style={styles.categoryFirstItems}>
                  <View style={styles.categoryFirstrow}>
                    <TouchableOpacity
                      onPress={() => handleFilter("daily")}
                      style={styles.dailyFilter}
                    >
                      <Text style={{ color: "#2253A5" }} preset="h5">
                        {language.daily}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleFilter("weekly")}
                      style={styles.weeklyFilter}
                    >
                      <Text style={{ color: "#009D35" }} preset="h5">
                        {language.weekly}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleFilter("monthly")}
                      style={styles.monthlyFilter}
                    >
                      <Text style={{ color: "#C17606" }} preset="h5">
                        {language.monthly}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisible(true);
                    }}
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#0099C9",
                      alignItems: "center",
                      // minWidth: rw(10),
                      justifyContent: "space-between",
                      borderRadius: rh(0.3),
                      right: rw(1),
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.4,
                      shadowRadius: 4.65,
                      elevation: 8,
                      paddingHorizontal: rw(4),
                    }}
                  >
                    <Filter />
                  </TouchableOpacity>
                </View>

                {/* List of categories  data */}
                <View style={[styles.categoryContainer]}>
                  <FlatList
                    data={filterDatas || []}
                    numColumns={3}
                    keyExtractor={(item) => item?.index?.toString()}
                    columnWrapperStyle={{
                      justifyContent: "space-between",
                    }}
                    renderItem={({ item, index }) => {
                      if (
                        authUser?.userRole?.filter(
                          (role) => role !== "Sales Executive"
                        ).length > 0
                      ) {
                        return (
                          <TouchableOpacity
                            key={item?.id}
                            style={styles.categoryItem}
                            onPress={() => handleNavigation(item)}
                          >
                            <Image
                              source={{ uri: item?.icon }}
                              style={styles.categoryItemImage}
                            />
                            <View
                              style={{
                                flexDirection: "row",
                                alignSelf: "center",
                                justifyContent: "center",
                                width: rw(25),
                                marginHorizontal: rw(5),
                              }}
                            >
                              <Text preset="h5" style={styles.categoryItemText}>
                                <Text
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: rf(1.5),
                                  }}
                                >
                                  {item?.value}{" "}
                                </Text>

                                {language?.[toSnakeCase(item?.label)] ||
                                  item?.label}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      } else if (item?.label !== "Field Force Active") {
                        return (
                          <TouchableOpacity
                            key={item?.id}
                            style={[
                              styles.categoryItem,
                              {
                                marginRight:
                                  index === filterDatas?.length - 1
                                    ? rh(15.2)
                                    : rh(0),
                              },
                            ]}
                            onPress={() => handleNavigation(item)}
                          >
                            <Image
                              source={{ uri: item?.icon }}
                              style={styles.categoryItemImage}
                            />
                            <View
                              style={{
                                flexDirection: "row",
                                alignSelf: "center",
                                justifyContent: "center",
                                width: rw(25),
                                marginHorizontal: rw(5),
                              }}
                            >
                              <Text preset="h5" style={styles.categoryItemText}>
                                <Text
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: rf(1.5),
                                  }}
                                >
                                  {item?.value}{" "}
                                </Text>
                                {language?.[toSnakeCase(item?.label)] ||
                                  item?.label}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    }}
                    ListEmptyComponent={() =>
                      getCustomerMLoading || customerManagementLoading ? (
                        <View
                          style={{
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            flexDirection: "row",
                          }}
                        >
                          <SkeletonCategory />
                          <SkeletonCategory />
                          <SkeletonCategory />
                          <SkeletonCategory />
                          <SkeletonCategory />
                          <SkeletonCategory />
                          <SkeletonCategory />
                          <SkeletonCategory />
                          <SkeletonCategory />
                        </View>
                      ) : (
                        <></>
                      )
                    }
                  />
                </View>
              </View>
              {/* Popular Insurance ---------------- */}
              <View style={styles.popularInsuranceContainer}>
                {/* Title */}
                <View style={RSC}>
                  <View style={ROW}>
                    <TouchableOpacity
                      onPress={colorHandleFirst}
                      style={{
                        height: rh(4),
                        width: rw(23),
                        backgroundColor: blueTest ? "#2253A5" : COLOR.white,
                        borderWidth: rh(0.1),
                        borderColor: !blueTest ? "#C7C7C7" : "#2253A5",
                        borderRadius: rh(0.5),
                        alignItems: "center",
                        justifyContent: "center",
                        left: blueTest ? rh(0.4) : rh(0),
                        zIndex: blueTest ? 1 : 0,
                        borderRightWidth: rh(0),
                      }}
                    >
                      <Text
                        style={{
                          color: blueTest ? COLOR.white : COLOR.black,
                        }}
                      >
                        {language.b2C}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={colorHandleSecond}
                      style={{
                        height: rh(4),
                        width: rw(23),
                        backgroundColor: blueTestSecond
                          ? "#2253A5"
                          : COLOR.white,
                        borderWidth: rh(0.1),
                        borderColor: !blueTestSecond ? "#C7C7C7" : "#2253A5",
                        borderRadius: rh(0.5),
                        alignItems: "center",
                        justifyContent: "center",
                        right: blueTestSecond ? rh(0.4) : rh(0),
                        borderLeftWidth: rh(0),
                      }}
                    >
                      <Text
                        style={{
                          color: blueTestSecond ? COLOR.white : COLOR.black,
                        }}
                      >
                        {language.b2B}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* view all */}
                  <TouchableOpacity
                    onPress={() => {
                      const data = {
                        slug: "health-insurance",
                        id: 1,
                        polType: polType,
                      };

                      navigation.navigate("InsuranceListScreen", {
                        item: data,
                      });
                    }}
                  >
                    <Text style={{ color: "#2253A5" }} preset="h6">
                      {language.seeMore}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* featureLoading */}
                <FlatList
                  data={featurePolicies || []}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item?.index?.toString()}
                  renderItem={(item) => {
                    return (
                      <View
                        style={{
                          width: rw(100),
                        }}
                      >
                        <PopularInsuranceCard
                          size={featurePolicies?.length}
                          indexing={item?.index}
                          item={item?.item}
                          home={"home"}
                          polType={polType}
                          cardType={"feature"}
                        />
                      </View>
                    );
                  }}
                  ListEmptyComponent={
                    featureLoading || featureLoadingB2B ? (
                      <>
                        <SkeletonPopularCard />
                        <SkeletonPopularCard />
                        <SkeletonPopularCard />
                        <SkeletonPopularCard />
                      </>
                    ) : (
                      <></>
                    )
                  }
                  pagingEnabled={true}
                />
              </View>
              {/* Other Activities -------------------- */}
              <OtherActivityCard />
            </View>
          </Background>
        </>
      </View>
    </>
  );
}

//
const SkeletonCategory = () => (
  <View style={styles.skeletonCat}>
    <Skeleton
      width={rw(14)}
      height={rw(14)}
      style={{
        borderRadius: 30,
      }}
    />
    <Skeleton
      width={rw(15)}
      height={rw(2)}
      style={{
        borderRadius: 30,
        marginTop: 10,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: rh(11),
    backgroundColor: "#FBFCFF",
    marginTop: rh(1),
  },
  //
  otherActivities: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: rh(2),
  },
  resetPassModal: {
    minHeight: rh(30),
    backgroundColor: COLOR.white,
    position: "absolute",
    paddingVertical: rh(2),
    paddingHorizontal: rw(3),
    borderRadius: rh(1.2),
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: rh(0.8),
    borderRightWidth: rh(2.5),
    borderBottomWidth: rh(4.8),
    borderLeftWidth: rh(0),
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: COLOR.white,
    borderLeftColor: "transparent",
    left: rh(3),
    // right: rh(33),
    bottom: rh(23.7),
    position: "absolute",
  },
  lastActivityContainer: {
    backgroundColor: COLOR.white,
    minHeight: rh(10),
    width: rw(100),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 3,
    paddingHorizontal: rw(3.5),
    marginVertical: rh(1),
    paddingVertical: rh(1),
  },
  lastActivity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryMain: {
    backgroundColor: COLOR.white,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 3,
    marginVertical: rh(1),
    paddingBottom: rh(1.5),
  },
  categoryFirstItems: {
    flexDirection: "row",
    marginVertical: rh(2.5),
    marginHorizontal: rw(2.5),
    justifyContent: "space-between",
  },
  categoryFirstrow: {
    flexDirection: "row",
  },
  dailyFilter: {
    height: rh(3.6),
    minWidth: rw(9),
    backgroundColor: "#EAF2FF",
    paddingHorizontal: rw(2),
    paddingVertical: rh(0.5),
    marginHorizontal: rw(1),
  },
  weeklyFilter: {
    height: rh(3.6),
    minWidth: rw(9),
    backgroundColor: "#E5FFEE",
    paddingHorizontal: rw(2),
    paddingVertical: rh(0.5),
    marginHorizontal: rw(1),
  },
  monthlyFilter: {
    height: rh(3.6),
    minWidth: rw(9),
    backgroundColor: "#FFF3E1",
    paddingHorizontal: rw(2),
    paddingVertical: rh(0.5),
    marginHorizontal: rw(1),
  },
  cardTitle: {},
  lineSmall: {
    width: 5,
    height: 2,
    backgroundColor: "#2253A5",
    marginLeft: 15,
    marginRight: 4,
    marginTop: 5,
  },
  lineBig: {
    width: 50,
    height: 2,
    backgroundColor: "#2253A5",
    marginTop: 5,
  },
  // cate[gory
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: rw(4),
    alignItems: "center",
  },
  categoryItem: {
    width: rw(28),
    height: rw(28),
    borderWidth: rh(0.1),
    borderColor: "#E5EAFF",
    borderRadius: rh(0.4),
    marginBottom: rh(1),
    // justifyContent: 'center',
  },
  skeletonCat: {
    width: rw(28),
    height: rw(28),
    borderWidth: rh(0.1),
    borderColor: "#E5EAFF",
    borderRadius: rh(0.4),
    marginBottom: rh(1),
    alignItems: "center",
    justifyContent: "center",
  },
  categoryItemImage: {
    alignSelf: "center",
    width: rw(8),
    height: rh(4),
    resizeMode: "contain",
    marginTop: rw(5),
    marginBottom: rw(1),
  },
  categoryItemText: {
    textAlign: "center",
    color: "#4F4F4F",
    fontSize: 12,

    // fontWeight: "700",
    // letterSpacing: 0.3,
  },
  // Popular Insurance
  popularInsuranceContainer: {
    backgroundColor: COLOR.white,
    // paddingHorizontal: rw(3),
    paddingVertical: rh(3),
    marginVertical: rh(1),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 3,
  },
  // moreServiceContainer
  moreServiceContainer: {
    paddingVertical: rh(3),
    paddingHorizontal: rw(4),
  },
  serviceItemContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  // testimonialsContainer
  testimonialsContainer: {
    paddingHorizontal: rw(4),
  },
  // bannerCardContainer
  bannerCardContainer: {
    paddingHorizontal: rw(4),
    overflow: "hidden",
  },
});
