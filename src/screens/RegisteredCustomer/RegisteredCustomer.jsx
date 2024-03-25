import {
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLOR, CONTAINER, rf, rh, ROW, RSC, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import Text from "../../components/Text/Text";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import MediumButton from "../../components/Buttons/MediumButton";
import TargetCard from "../../components/TargetCard/TargetCard";
import CollapsibleCard from "../../CollapsibleCard/CollapsibleCard";
import { Path, Svg } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllFilterCustomersQuery } from "../../redux/features/customer/customerApiSlice";
import { setAllCustomers } from "../../redux/features/customer/customerSlice";
import InsuranceFilter from "../../components/Shared/InsuranceFilter";
import Skeleton from "../../components/Skeleton/Skeleton";
import {
  codeSelector,
  languageSelector,
} from "../../redux/features/language/languageSlice";
import DataNotFound from "../../components/Shared/DataNotFound";
import { toBnNum } from "../../utils";
import useShowToastMessage from "../../hooks/useShowToastMessage";
import CollapsibleListCard from "../../CollapsibleCard/CollapsibleListCard";
import Pagination from "./Pagination";
import Background from "../../components/Shared/Background";

export default function RegisteredCustomer() {
  const dispatch = useDispatch();
  const targetDatas = useRef([]);
  const toast = useShowToastMessage();
  //filterStates
  const [dataNew, setDataNew] = useState([]);
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [filterDatas, setFilterDatas] = useState();
  const [filterUserData, setFilterUserData] = useState();
  const [IsVisible, setIsVisible] = useState(false);
  const [graphVal, setGraphVal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const [getAllCustomers, { isLoading = true }] =
    useLazyGetAllFilterCustomersQuery();
  //
  async function handleDateFilter() {
    setIsVisible(false);
    if (dateTo && dateFrom && dateFrom !== undefined && dateTo !== undefined) {
      try {
        let paramData = `?from=${dateFrom
          ?.split("-")
          .reverse()
          .join("-")}&to=${dateTo?.split("-").reverse().join("-")}`;
        const res = await getAllCustomers([paramData]).unwrap();

        setFilterDatas(res?.data);
        setFilterUserData(res?.data?.users);
        const targetData = [
          {
            title: "Target",
            target: `${res?.data?.target ?? 0}`,
            achieve: res?.data?.achieve,
            count: res?.data?.target,
            type: "target",
          },
          {
            title: "Achieved",
            target: `${res?.data?.target ?? 0}`,
            achieve: res?.data?.achieve,
            count: res?.data?.achieve,
            type: "achieved",
          },
          {
            title: "Gap",
            target: `${res?.data?.target ?? 0}`,
            achieve: res?.data?.achieve,
            count: res?.data?.gap,
            type: "gap",
          },
        ];
        targetDatas.current = targetData;
        setGraphVal(targetData);
        toast(language?.filter_applied);
        // setDateFrom(null);
        // setDateTo(null);
      } catch (error) {
        console.log("helloError", error);
      }
    } else {
      toast(language?.select_both_date);
    }
  }
  const navigation = useNavigation();
  // Do something when the screen blurs
  const getCustomers = async () => {
    let paramData = `?page=${currentPage}`;
    try {
      const res = await getAllCustomers([paramData]).unwrap();
      dispatch(setAllCustomers(res));
      setFilterDatas(res?.data);
      setFilterUserData(res?.data.users);
      const targetData = [
        {
          title: "Target",
          target: `${res?.data?.target ?? 0}`,
          achieve: res?.data?.achieve,
          count: res?.data?.target,
          type: "target",
        },
        {
          title: "Achieved",
          target: `${res?.data?.target ?? 0}`,
          achieve: res?.data?.achieve,
          count: res?.data?.achieve,
          type: "achieved",
        },
        {
          title: "Gap",
          target: `${res?.data?.target ?? 0}`,
          achieve: res?.data?.achieve,
          count: res?.data?.gap,
          type: "gap",
        },
      ];
      targetDatas.current = targetData;
      console.log("targetData", JSON.stringify(targetData));
      setGraphVal(targetData);
      // console.log("dispatchRes", res);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getCustomers();
    });

    return unsubscribe;
  }, [navigation]);

  //searchFilter
  const searchFilterFunction = (text) => {
    // search text
    if (text) {
      const newData = filterDatas?.users?.filter(function (item) {
        const itemData = item?.full_name
          ? item?.full_name?.toUpperCase()
          : "".toUpperCase();
        const contactData = item?.contact_number
          ? item?.contact_number?.toUpperCase()
          : "".toUpperCase();
        const emailData = item?.email
          ? item?.email?.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        if (itemData.indexOf(textData) > -1) {
          return itemData.indexOf(textData) > -1;
        } else if (contactData.indexOf(textData) > -1) {
          return contactData.indexOf(textData) > -1;
        } else {
          return emailData.indexOf(textData) > -1;
        }
      });
      setFilterUserData(newData?.length > 0 ? newData : dataNew);
    } else {
      setFilterUserData(dataNew);
    }
  };

  //  pag filter currentPage
  useEffect(() => {
    async function pageFilter() {
      try {
        let paramData = `?page=${currentPage}`;
        const res = await getAllCustomers([paramData]).unwrap();
        setFilterDatas(res?.data);
        // set data
        if (currentPage == 1) {
          setDataNew(res?.data.users);
          setFilterUserData(res?.data.users);
        } else {
          setDataNew((prevData) => [...prevData, ...res?.data.users]);
          setFilterUserData((prevData) => [...prevData, ...res?.data.users]);
        }

        const targetData = [
          {
            title: "Target",
            target: `${res?.data?.target ?? 0}`,
            achieve: res?.data?.achieve,
            count: res?.data?.target,
            type: "target",
          },
          {
            title: "Achieved",
            target: `${res?.data?.target ?? 0}`,
            achieve: res?.data?.achieve,
            count: res?.data?.achieve,
            type: "achieved",
          },
          {
            title: "Gap",
            target: `${res?.data?.target ?? 0}`,
            achieve: res?.data?.achieve,
            count: res?.data?.gap,
            type: "gap",
          },
        ];
        targetDatas.current = targetData;
        setGraphVal(targetData);
      } catch (error) {
        console.log("error", error);
      }
    }
    pageFilter();
  }, [currentPage]);

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
      title: language?.userNameTitle,
      width: 20,
    },
    {
      title: language?.contactNoTextInput,
      width: 30,
    },
    {
      title: language?.emailTextInput,
      width: 33,
    },
    {
      title: language?.detailsTitle,
      width: 20,
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
        <DrawerHeader title={language.registeredCustomerTitle} />
        <Background
          ph={10}
          pv={10}
          onRefresh={() => {
            setCurrentPage(1);
            getCustomers();
          }}
          refreshIsOpen={true}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.textStyle} preset="LM">
              {language.totalCustomerRegiTitle}:{" "}
              {toBnNum(filterDatas?.pagination?.total, code)}
            </Text>
            <MediumButton
              onPress={() => navigation.navigate("NewRegister")}
              textStyle={{ color: COLOR.white, fontSize: rf(1.8) }}
              stylesButton={styles.addButton}
              title={language.addNewButton}
            />
          </View>
          {/* TargetCard */}
          <TargetCard target={graphVal} />
          <View>
            <View style={styles.searchFilterContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  placeholder={language?.searchPlaceHolderText}
                  style={styles.searchInput}
                  onChangeText={(text) => searchFilterFunction(text)}
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
                      value: item?.contact_number?.slice(2, 13),
                      width: 30,
                    },
                    {
                      title: "Email",
                      value: item?.email,
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
                      title: language?.userIdTitle,
                      value: item?.email,
                      width: 20,
                    },
                    {
                      title: language?.customerTypeTitle,
                      value: item?.userType == "b2c" ? "B2C" : "B2B",
                      width: 20,
                    },
                    {
                      title: language?.member_since,
                      value: item?.member_since,
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
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0.5}
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
    paddingHorizontal: rw(3),
    paddingTop: rh(1),
    flex: 1,
    backgroundColor: "#ffff",
  },
  addButton: {
    minWidth: rw(15),
    maxWidth: rw(28),
    borderRadius: rh(3),
    backgroundColor: COLOR.blue600,
    borderColor: COLOR.white,
    borderWidth: rh(0.1),
    marginVertical: 0,
    paddingVertical: rh(1),
    paddingHorizontal: rh(0.5),
    elevation: 0,
  },
  textStyle: {
    fontSize: rf(2.05),
    color: COLOR.blue600,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    paddingHorizontal: rh(1.4),
    fontSize: rf(1.6),
  },
});

//
