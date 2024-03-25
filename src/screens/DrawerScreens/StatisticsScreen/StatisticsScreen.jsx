import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CircularProgressCard from "../SalesCampaign/CircularProgressCard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLOR, CONTAINER, rh, RSBC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { Svg } from "react-native-svg";
import { Path } from "victory-native";
import TargetFulfilledCard from "./TargetFulfilledCard";
import PerformanceAnalysisCard from "./PerformanceAnalysisCard";
import CustomerManagementCard from "./CustomerManagementCard";
import { useState } from "react";
import InsuranceFilter from "../../../components/Shared/InsuranceFilter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  useGetAgentsWholeTargetQuery,
  useGetPerformanceAnalysisDataQuery,
  useGetStatisticsDataQuery,
  useGetWholeExecutiveTreesQuery,
  useLazyGetStatisticsDataQuery,
} from "../../../redux/features/customer/customerApiSlice";
import Toast from "react-native-root-toast";
import StatRegUserList from "../../../components/Inputs/StatRegUserList";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { languageSelector } from "../../../redux/features/language/languageSlice";
import useShowToastMessage from "../../../hooks/useShowToastMessage";
import Background from "../../../components/Shared/Background";

export default function StatisticsScreen({ route }) {
  // modal
  const toast = useShowToastMessage();
  const { wholeTargetData } = route?.params;
  const [IsVisible, setIsVisible] = useState(false);
  const language = useSelector(languageSelector);
  const myData = useSelector((state) => state?.user?.myData);
  const myDataUser = useSelector((state) => state?.auth.user);

  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [userInfo, setUserInfo] = useState(myDataUser);
  const [userId, setUserId] = useState(null);
  // console.log(" wholeTargetData?.data", wholeTargetData?.data);
  const [filterDatas, setFilterDatas] = useState(
    wholeTargetData?.data !== undefined ? wholeTargetData?.data : {}
  );

  // API
  const { data: agentsWholeData } = useGetAgentsWholeTargetQuery();
  const { data: getStatisticsData, isLoading: statLoading } =
    useGetStatisticsDataQuery([myDataUser?.id, ``]);
  // performanceAnalysis
  const { data: performanceAnalysis, error } =
    useGetPerformanceAnalysisDataQuery(userId ? userId : userInfo?.id);
  // StatisticsData
  const [statisticsData, { isError, isLoading }] =
    useLazyGetStatisticsDataQuery();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  let paramDataa = `?from=2023-01-01&to=${today}`;
  const { data: executiveTrees, refetch:executiveRefetch } =
    useGetWholeExecutiveTreesQuery([paramDataa]);

  //
  useEffect(() => {
    if (userId && userId !== undefined) {
      handleUserFilter();
    }
  }, [userId]);
  //
  // useEffect(() => {
  //   if (getStatisticsData && Object.keys(getStatisticsData)?.length > 0) {
  //     setFilterDatas(getStatisticsData);
  //   }
  // }, [getStatisticsData]);

  // handleDateFilter
  async function handleDateFilter() {
    if (dateTo && dateFrom && dateFrom !== undefined && dateTo !== undefined) {
      try {
        let paramData = `&from=${dateFrom
          ?.split("-")
          .reverse()
          .join("-")}&to=${dateTo?.split("-").reverse().join("-")}`;
        const res = await statisticsData([
          userId ? userId : userInfo?.id,
          paramData,
        ]).unwrap();
        console.log("getCustomerMData", res);
        setFilterDatas(res);
        toast(language?.filter_applied);
        // setDateFrom(null);
        // setDateTo(null);
        setIsVisible(false);
        console.log("helloAns", res);
      } catch (error) {
        console.log("helloError", error);
      }
    } else {
      toast(language?.select_both_date);
    }
  }
  // handleFilter -> Day , monthly , Weekly
  async function handleFilter(val) {
    try {
      let duration = `&duration=${val}`;

      const res = await statisticsData([
        userId ? userId : userInfo?.id,
        duration,
      ]).unwrap();
      setFilterDatas(res);
      Toast.show(
        `${
          val === "daily"
            ? "Daily"
            : val === "weekly"
            ? "Weekly"
            : val === "monthly" && "Monthly"
        } filter applied`,
        {
          duration: 1000,
          backgroundColor: "rgba(51, 105, 179, 1)",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
          height: rh(15),
        }
      );
      setIsVisible(false);
    } catch (error) {
      console.log("helloError", error);
    }
  }
  // handleUserFilter
  async function handleUserFilter() {
    try {
      let duration = `&duration=monthly`;
      const res = await statisticsData([userId, duration]).unwrap();
      setFilterDatas(res);
    } catch (error) {}
  }
//  
const handelRefresh =()=>{
  handleFilter("monthly")
  executiveRefetch()
}
  return (
    <>
      {/* Modal */}
      <InsuranceFilter
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        IsVisible={IsVisible}
        setIsVisible={setIsVisible}
        handleDateFilter={handleDateFilter}
        isLoading={isLoading}
      />
      {/* <StatisticsHeader /> */}
      <DrawerHeader title={language?.statistics} />
      <Background  refreshIsOpen={true} onRefresh={handelRefresh}   >
        <View style={{ paddingHorizontal: rh(2) }}>
          {myDataUser?.userRole?.filter(
            (item, index) => item !== "Sales Executive"
          ).length > 0 ? (
            <StatRegUserList
              data={
                myDataUser?.userRole?.filter(
                  (item, index) => item !== "Sales Executive"
                ).length > 0
                  ? executiveTrees
                  : []
              }
              userInfo={userId}
              setUserInfo={setUserId}
              // errorCheck={errorCheck}
              required={"1"}
              disable={
                myDataUser?.userRole?.filter(
                  (item, index) => item !== "Sales Executive"
                ).length > 0
                  ? false
                  : true
              }
              label={language?.registeredAgentsTitle}
            />
          ) : (
            <></>
          )}
        </View>
        {/* container */}
        <View style={styles.container}>
          {/* Button list */}
          <View style={styles.topButtonContainer}>
            {/* Left buttons */}
            <View style={styles.listLeftButtons}>
              {/* 01 */}
              <TouchableOpacity
                onPress={() => handleFilter("daily")}
                style={[styles.listButton, { backgroundColor: "#EAF2FF" }]}
              >
                <Text
                  preset="h6"
                  color={"#2253A5"}
                  style={styles.listButtonText}
                >
                  {language.daily}
                </Text>
              </TouchableOpacity>
              {/* 02 */}
              <TouchableOpacity
                onPress={() => handleFilter("weekly")}
                style={[styles.listButton, { backgroundColor: "#E5FFEE" }]}
              >
                <Text
                  preset="h6"
                  color={"#009D35"}
                  style={styles.listButtonText}
                >
                  {language.weekly}
                </Text>
              </TouchableOpacity>
              {/* 03 */}
              <TouchableOpacity
                onPress={() => handleFilter("monthly")}
                style={[styles.listButton, { backgroundColor: "#FFF3E1" }]}
              >
                <Text
                  preset="h6"
                  color={"#C17606"}
                  style={styles.listButtonText}
                >
                  {language.monthly}
                </Text>
              </TouchableOpacity>
            </View>
            {/* RightFilter button */}
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true);
              }}
              style={[styles.filterButton, { backgroundColor: "#0099C9" }]}
            >
              <Svg width={11} height={12} fill="none">
                <Path
                  d="M0 0v.716C.001.8.03.881.082.94l4.001 4.705c.052.06.082.14.083.224v4.405c0 .06.014.119.041.17.027.05.066.091.112.117l2.171.902a.242.242 0 0 0 .267-.016.305.305 0 0 0 .095-.116.362.362 0 0 0 .034-.156V5.811a.367.367 0 0 1 .099-.223L10.898.953a.346.346 0 0 0 .082-.224V0H0Z"
                  fill="#fff"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          {/* Progress Card */}
          <CircularProgressCard
            agentsWholeData={agentsWholeData?.data}
            mainData={filterDatas}
          />
          {/* TargetFulfilledCard */}
          <TargetFulfilledCard
            agentsWholeData={filterDatas}
            mainData={filterDatas}
          />
          {/* CustomerManagementCard */}
          <CustomerManagementCard
            agentsWholeData={filterDatas}
            mainData={filterDatas}
          />
          {/* PerformanceAnalysisCard */}
          <PerformanceAnalysisCard
            performanceAnalysis={performanceAnalysis}
            mainData={filterDatas}
          />
        </View>
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: rh(10),
  },
  topButtonContainer: {
    paddingHorizontal: rw(4),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: rh(3),
    paddingBottom: rh(1.5),
  },
  listLeftButtons: {
    flexDirection: "row",
  },
  listButton: {
    backgroundColor: "red",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 2,
  },
  listButtonText: {
    color: "#fff",
  },
  filterButton: {
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
  },
});
