import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { COLOR, rf, rh, ROW, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import MediumButton from "../../components/Buttons/MediumButton";
import CollapsibleCard from "../../CollapsibleCard/CollapsibleCard";
import { Path, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import { useLazyGetActiveFieldForcesQuery } from "../../redux/features/customer/customerApiSlice";
import { useEffect } from "react";
import InsuranceFilter from "../../components/Shared/InsuranceFilter";
import Pagination from "../RegisteredCustomer/Pagination";
import {
  codeSelector,
  languageSelector,
} from "../../redux/features/language/languageSlice";
import { toBnNum } from "../../utils";
import useShowToastMessage from "../../hooks/useShowToastMessage";
import CollapsibleListCard from "../../CollapsibleCard/CollapsibleListCard";
import DataNotFound from "../../components/Shared/DataNotFound";
import Background from "../../components/Shared/Background";
import Skeleton from "../../components/Skeleton/Skeleton";

export default function ActiveAgents() {
  const [dataNew, setDataNew] = useState([]);
  //filterStates
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [filterDatas, setFilterDatas] = useState();
  const [filterUserData, setFilterUserData] = useState();
  const [IsVisible, setIsVisible] = useState(false);
  const [graphVal, setGraphVal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const toast = useShowToastMessage();
  const [getActiveAgents, { isLoading }] = useLazyGetActiveFieldForcesQuery();
  //
  async function handleDateFilter() {
    if (dateTo && dateFrom && dateFrom !== undefined && dateTo !== undefined) {
      try {
        let paramData = `?from=${dateFrom
          ?.split("-")
          .reverse()
          .join("-")}&to=${dateTo?.split("-").reverse().join("-")}`;
        const res = await getActiveAgents([paramData]).unwrap();
        setFilterDatas(res?.data);
        setFilterUserData(res?.data?.fieldForces);
        let activeData = [
          {
            title: "Completed",
            count: `${
              (parseInt(res?.data?.active) / parseInt(res?.data?.inactive)) *
              100
            }%`,
            value: `${
              parseInt(res?.data?.active / parseInt(res?.data?.inactive)) * 100
            }`,
          },
        ];
        setGraphVal(activeData);

        toast(language?.filter_applied);
        // setDateFrom(null);
        // setDateTo(null);
        setIsVisible(false);
      } catch (error) {
        console.log("helloError", error);
      }
    } else {
      toast(language?.select_both_date);
    }
  }
  //
  const searchFilterFunction = (text) => {
    // searched
    if (text) {
      const newData = dataNew?.filter(function (item) {
        // Applying filter for the inserted text in search b
        const itemData = item?.full_name
          ? item?.full_name?.toUpperCase()
          : "".toUpperCase();
        const contactData = item?.contact_number
          ? item?.contact_number?.toUpperCase()
          : "".toUpperCase();

        const textData = text.toUpperCase();
        if (itemData.indexOf(textData) > -1) {
          return itemData.indexOf(textData) > -1;
        } else if (contactData.indexOf(textData) > -1) {
          return contactData.indexOf(textData) > -1;
        }
      });

      setFilterUserData(newData);
    } else {
      setFilterUserData(dataNew);
    }
  };
  //
  async function pageFilter() {
    try {
      let paramData = `?page=${currentPage}`;
      const res = await getActiveAgents([paramData]).unwrap();
      //
      setFilterDatas(res?.data);
      if (currentPage == 1) {
        setDataNew(res?.data?.fieldForces);
        setFilterUserData(res?.data?.fieldForces);
      } else {
        setDataNew((prevData) => [...prevData, ...res?.data?.fieldForces]);
        setFilterUserData((prevData) => [
          ...prevData,
          ...res?.data?.fieldForces,
        ]);
      }
      let activeData = [
        {
          title: "Completed",
          count: `${
            (parseInt(res?.data?.active) / parseInt(res?.data?.inactive)) * 100
          }%`,
          value: `${
            parseInt(res?.data?.active / parseInt(res?.data?.inactive)) * 100
          }`,
        },
      ];
      setGraphVal(activeData);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    pageFilter();
  }, [currentPage]);
  //
  // renderLoader
  const renderLoader = () => {
    return filterDatas &&
      filterDatas?.pagination?.current_page <
        filterDatas?.pagination?.last_page ? (
      <View
        style={{
          marginBottom: 30,
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    ) : null;
  };
  // loadMoreItem
  const loadMoreItem = () => {
    if (
      filterDatas?.pagination?.current_page < filterDatas?.pagination?.last_page
    ) {
      setCurrentPage(filterDatas?.pagination?.current_page + 1);
    }
  };
  //
  const headerList = [
    {
      title: language?.agent_name ?? "Agent Name",
      width: 20,
    },
    {
      title: language?.agent_id || "Agent ID",
      width: 20,
    },
    {
      title: language?.designationTitle,
      width: 35,
    },
    {
      title: language?.detailsTitle,
      width: 10,
    },
  ];
  return (
    <>
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

      <>
        <DrawerHeader title={language.activeAgentsTitle} />
        <Background
          ph={10}
          pv={10}
          onRefresh={() => {
            setCurrentPage(1);
            pageFilter();
          }}
          refreshIsOpen={true}
        >
          <View
            style={{
              borderBottomWidth: rh(0.01),
              backgroundColor: COLOR.white,
            }}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.textStyle} preset="LM">
                {language.totalActiveAgents}:{" "}
                {toBnNum(filterDatas?.pagination?.total, code)}
              </Text>
            </View>
            {/* <PaymentCalCard
              activeColor={COLOR.lightGreen}
              inactiveColor={COLOR.lightRed}
              firstTitle={language.activeAgentsTitle}
              secondTitle={language.inactiveAgentsTitle}
              firstAmount={parseInt(filterDatas?.active)}
              secondAmount={parseInt(filterDatas?.inactive)}
              target={graphVal}
            /> */}
          </View>

          <View style={styles.searchFilterContainer}>
            <View style={styles.searchInputContainer}>
              <TextInput
                onChangeText={(text) => searchFilterFunction(text)}
                placeholder={language.searchPlaceHolderText}
                style={styles.searchInput}
              />
            </View>
            {/* Filter button */}
            <View style={ROW}>
              <MediumButton
                onPress={() => setIsVisible(!IsVisible)}
                stylesButton={{
                  width: rw(15),
                  marginVertical: 0,
                  elevation: 0,
                  backgroundColor: "#0099C9",
                }}
                icon={
                  <>
                    <Svg width={13} height={13} fill="none">
                      <Path
                        d="M0 0v.781c.001.092.036.18.096.244l4.66 5.134c.06.065.094.152.095.244v4.807c0 .065.017.129.049.184.031.056.077.1.13.13l2.529.983a.297.297 0 0 0 .31-.018.338.338 0 0 0 .11-.127.374.374 0 0 0 .04-.169V6.341a.389.389 0 0 1 .116-.244l4.557-5.058a.365.365 0 0 0 .096-.244V0H0Z"
                        fill="#fff"
                      />
                    </Svg>
                  </>
                }
              />
            </View>
          </View>

          <FlatList
            data={filterUserData || []}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: rh(1),
                    width: "100%",
                  }}
                >
                  {headerList?.map((hed) => {
                    return (
                      <Text
                        preset="SL"
                        color={"#4F4F4F"}
                        style={[
                          hed?.width && {
                            width: rw(hed?.width),
                          },
                        ]}
                      >
                        {hed?.title}
                      </Text>
                    );
                  })}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <CollapsibleListCard
                  key={index}
                  index={index}
                  userData={item}
                  headList={[
                    {
                      title: "Name",
                      value: item?.full_name,
                      width: 20,
                    },
                    {
                      title: "Contact No",
                      value: item?.uid,
                      width: 20,
                    },
                    {
                      title: "Email",
                      value: item?.role?.map((role) => `${role}`),
                      width: 35,
                    },
                    {
                      title: "Details",
                      value: "close",
                      width: 10,
                    },
                  ]}
                  itemList={[
                    {
                      title: language?.contactNoTextInput,
                      value: item?.contact_number,
                      width: 20,
                    },
                    {
                      title: language?.emailPlaceHolderText,
                      value: item?.email,
                      width: 20,
                    },
                  ]}
                />
              );
            }}
            ListEmptyComponent={
              isLoading ? (
                <>
                  <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                  <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                  <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                  <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                  <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                  <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                  <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                </>
              ) : (
                <DataNotFound />
              )
            }
            ListFooterComponent={renderLoader}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          />
        </Background>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: rh(2),
    backgroundColor: COLOR.white,
  },
  scrollButton: {
    height: rh(2.3),
    width: rw(4),
    backgroundColor: "#1691CE",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: rh(1),
    borderRadius: rh(0.3),
  },
  addButton: {
    width: rw(33),
    borderRadius: rh(3),
    backgroundColor: COLOR.white,
    borderColor: COLOR.bluishCyan700,
    borderWidth: rh(0.1),
    height: rh(5),
    paddingVertical: rh(1),
    marginVertical: rh(0),
  },
  textStyle: {
    fontSize: rf(2.1),
    color: COLOR.blue600,
  },
  //
  activityButtons: {
    width: rw(90),
    height: rh(6.5),
    borderRadius: rh(0.8),
    borderWidth: rh(0.1),
    borderColor: "#E5EAFF",
    alignSelf: "center",
    marginVertical: rh(1),
    alignItems: "center",
    paddingHorizontal: rh(1.5),
    paddingVertical: rh(1),
    flexDirection: "row",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: rh(2),
  },
  searchFilterContainer: {
    paddingVertical: rh(2.5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInputContainer: {
    flexDirection: "row",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E5EAFF",
    borderRadius: rh(1),
    width: rw(75),
    paddingHorizontal: 10,
    fontSize: 12,
  },
});
