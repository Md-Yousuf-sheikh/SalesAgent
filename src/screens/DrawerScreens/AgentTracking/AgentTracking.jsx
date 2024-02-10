import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLOR, CONTAINER, rh, ROW, RSBC, rw } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import Text from "../../../components/Text/Text";
import { useSelector } from "react-redux";
import StatRegUserList from "../../../components/Inputs/StatRegUserList";
import {
  useGetExecutiveTreesQuery,
  useGetLocationQuery,
  useGetWholeExecutiveTreesQuery,
  useLazyGetLocationQuery,
  useLazyGetWholeLocationQuery,
} from "../../../redux/features/customer/customerApiSlice";
import { useEffect } from "react";
import Toast from "react-native-root-toast";
import FilterDatePicker from "../../../components/Inputs/FilterDatePicker";
import moment from "moment";
import { languageSelector } from "../../../redux/features/language/languageSlice";
import DataNotFound from "../../../components/Shared/DataNotFound";
import useShowToastMessage from "../../../hooks/useShowToastMessage";

export default function AgentTracking() {
  const [userInfo, setUserInfo] = useState();
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [filterData, setFilterData] = useState([]);
  const language = useSelector(languageSelector);
  const myDataUser = useSelector((state) => state?.auth.user);
  const toast = useShowToastMessage();
  // Get the current date
  const today = moment();

  // Format the date in the 'YYYY-MM-DD' format
  const todayFormate = today.format("YYYY-MM-DD");
  // paramData
  // let paramData = `?from=${dateFrom ? dateFrom : todayFormate}&to=${
  //   dateTo ? dateTo : todayFormate
  // }`;
  //
  let paramDataa = `?from=2023-01-01&to=${todayFormate}`;
  // API CALL
  const { data: executiveTrees } = useGetWholeExecutiveTreesQuery([paramDataa]);
  const [getLocationData] = useLazyGetLocationQuery();
  const [getWholeLocationData] = useLazyGetWholeLocationQuery();

  //agentId
  const agentId = executiveTrees?.filter(
    (item) => item?.executive?.id == userInfo
  )[0]?.executive?.id;

  // handleDateFilter
  const handleDateFilter = async () => {
    try {
      let props = `?from=${dateFrom?.split("-").reverse().join("-")}&to=${dateTo
        ?.split("-")
        .reverse()
        .join("-")}`;
      //
      const res = await getLocationData([agentId, props]).unwrap();
      console.log("ressss", res);
      setFilterData(res);
      toast(language?.filter_applied);
      setDateFrom(null);
      setDateTo(null);
    } catch (error) {
      console.log("helloError", error);
    }
  };

  // handleWholeLocation
  const handleWholeLocation = async () => {
    if (userInfo) {
      try {
        const res = await getWholeLocationData([
          executiveTrees?.filter(
            (item) => parseInt(item?.executive?.id) == parseInt(userInfo)
          )[0]?.executive?.id,
        ]).unwrap();
        setFilterData(res);
        // console.log("res", res);
        Toast.show("Location fetched", {
          duration: 1000,
          backgroundColor: "rgba(51, 105, 179, 1)",
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
          height: rh(15),
        });
        // setDateFrom(null);
        // setDateTo(null);
      } catch (error) {
        console.log("helloError", error);
      }
    } else {
      Toast.show("Select an User", {
        duration: 1000,
        backgroundColor: "rgba(51, 105, 179, 1)",
        shadow: true,
        position: rh(80),
        textColor: COLOR.white,
        opacity: 2,
        animation: true,
        height: rh(15),
      });
    }
  };

  // set date
  useEffect(() => {
    //
    if (userInfo && dateFrom && dateTo) {
      handleDateFilter();
    } else if (userInfo && userInfo !== undefined) {
      handleWholeLocation();
    }
  }, [userInfo, dateTo, dateFrom]);
  //
  return (
    <View style={CONTAINER}>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language.agentTrackTitle} />
      <View style={{ paddingBottom: rh(20) }}>
        <ScrollView style={styles.content}>
          <StatRegUserList
            data={
              myDataUser?.userRole?.filter(
                (item, index) => item !== "Sales Executive"
              ).length > 0
                ? executiveTrees
                : []
            }
            userInfo={userInfo}
            setUserInfo={setUserInfo}
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
          {/* date filter */}
          <View
            style={[
              RSBC,
              {
                paddingBottom: rh(1.2),
              },
            ]}
          >
            <FilterDatePicker
              label={language.fromTextInputTitle}
              placeholder={language.fromTextInputTitle}
              defaultValue={dateFrom}
              styleInput={{
                width: rw(45),
              }}
              // error={filedError}
              valueProps={setDateFrom}
            />

            <FilterDatePicker
              label={language.toTextInputTitle}
              placeholder={language.toTextInputTitle}
              defaultValue={dateTo}
              styleInput={{
                width: rw(45),
              }}
              // error={filedError}
              valueProps={setDateTo}
            />
          </View>
          {/* list time and location  */}

          {/*  */}
          <FlatList
            data={filterData || []}
            renderItem={({ item }) => {
              return (
                <View style={styles.th}>
                  <Text preset="h6" color={"#646464"} style={styles.leftText}>
                    {item?.date}
                  </Text>
                  <Text preset="h6" color={"#646464"} style={styles.RightText}>
                    {item?.location?.name}
                  </Text>
                </View>
              );
            }}
            ListHeaderComponent={
              <View style={styles.th}>
                <Text preset="h6" color={"#4F4F4F"} style={styles.leftText}>
                  {language.timeTitle}
                </Text>
                <Text preset="h6" color={"#4F4F4F"} style={styles.RightText}>
                  {language.locationTitle}
                </Text>
              </View>
            }
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<DataNotFound />}
          />
          {/*  */}
          {/* <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagination={filterDatas?.pagination}
          /> */}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: rh(2),
    paddingHorizontal: rw(4),
  },
  listContainer: {
    borderWidth: 1,
    marginTop: rh(2.5),
    borderColor: "#ddd",
    marginBottom: rh(5),
    minHeight: rh(30),
    zIndex: 0,
  },
  th: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    paddingHorizontal: 10,
  },
  RightText: {
    width: rw(40),
  },
  leftText: {
    width: rw(45),
  },
});
