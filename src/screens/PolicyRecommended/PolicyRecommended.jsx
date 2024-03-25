import {
  FlatList,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, CONTAINER, rf, rh, ROW, RSC, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import Text from "../../components/Text/Text";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import MediumButton from "../../components/Buttons/MediumButton";
import TargetCard from "../../components/TargetCard/TargetCard";
import { Path, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import { useLazyGetFilterPolicyRecommendsQuery } from "../../redux/features/customer/customerApiSlice";
import InsuranceFilter from "../../components/Shared/InsuranceFilter";
import Pagination from "../RegisteredCustomer/Pagination";
import { languageSelector } from "../../redux/features/language/languageSlice";
import Skeleton from "../../components/Skeleton/Skeleton";
import DataNotFound from "../../components/Shared/DataNotFound";
import useShowToastMessage from "../../hooks/useShowToastMessage";
import CollapsibleListCard from "../../CollapsibleCard/CollapsibleListCard";
import Background from "../../components/Shared/Background";

export default function PolicyRecommended() {
  const navigation = useNavigation();
  const toast = useShowToastMessage();
  const language = useSelector(languageSelector);
  // states
  const [dataNew, setDataNew] = useState([]);
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [filterDatas, setFilterDatas] = useState();
  const [IsVisible, setIsVisible] = useState(false);
  const [graphVal, setGraphVal] = useState([]);
  const [filterUserData, setFilterUserData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [getRecommendedPolicy, { isLoading }] =
    useLazyGetFilterPolicyRecommendsQuery();

  async function handleDateFilter() {
    if (dateTo && dateFrom && dateFrom !== undefined && dateTo !== undefined) {
      try {
        let paramData = `?from=${dateFrom
          ?.split("-")
          .reverse()
          .join("-")}&to=${dateTo?.split("-").reverse().join("-")}`;
        const res = await getRecommendedPolicy([paramData]).unwrap();
        setFilterDatas(res?.data);
        setFilterUserData(res?.data?.recommends);

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
        setGraphVal(targetData);
        toast(language?.filter_applied);
        // setDateFrom(null);
        // setDateTo(null);
        setIsVisible(false);
      } catch (error) {}
    } else {
      toast(language?.select_both_date);
    }
  }
  // Do something
  const getCustomers = async () => {
    try {
      let paramData = `?page=${currentPage}`;
      const res = await getRecommendedPolicy([paramData]).unwrap();
      // console.log("dispatchRes", res);
      setFilterDatas(res?.data);
      setFilterUserData(res?.data?.recommends);
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
      setGraphVal(targetData);
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

  // search
  const searchFilterFunction = (text) => {
    // Check i
    if (text) {
      const newData = filterDatas?.recommends?.filter(function (item) {
        // Applying
        const itemData = item?.user?.full_name
          ? item?.user?.full_name?.toUpperCase()
          : "".toUpperCase();
        const contactData = item?.policy?.category?.title
          ? item?.policy?.category?.title.toUpperCase()
          : "".toUpperCase();
        const emailData = item?.policy?.name
          ? item?.policy?.name?.toUpperCase()
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

      setFilterUserData(newData);
      // setSearch(text)
    } else {
      setFilterUserData(dataNew);
      if (currentPage == 1) {
        setDataNew(filterDatas?.recommends);
      } else {
        setDataNew((prevData) => [...prevData, ...filterDatas?.recommends]);
      }
    }
  };

  //  page filter
  useEffect(() => {
    async function pageFilter() {
      // console.log("toggled", currentPage);
      try {
        let paramData = `?page=${currentPage}`;
        const res = await getRecommendedPolicy([paramData]).unwrap();

        setFilterDatas(res?.data);

        if (currentPage == 1) {
          setDataNew(res?.data?.recommends);
          setFilterUserData(res?.data?.recommends);
        } else {
          setDataNew((prevData) => [...prevData, ...res?.data?.recommends]);
          setFilterUserData((prevData) => [
            ...prevData,
            ...res?.data?.recommends,
          ]);
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
        setGraphVal(targetData);
      } catch (error) {
        console.log("error", error);
      }
    }
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

  // Header List
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
      title: language?.policyNameTitle,
      width: 35,
    },
    {
      title: language?.detailsTitle,
      width: 15,
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
        <DrawerHeader title={language.policyRecommendedTitle} />
        <Background
          ph={10}
          pv={10}
          onRefresh={() => {
            setCurrentPage(1);
            getCustomers();
          }}
          refreshIsOpen={true}
        >
          <View style={styles.headerButtonCon}>
            <View style={styles.headerContainer}>
              <Text style={styles.textStyle} preset="LM">
                {language?.total_recommended ?? "Total Recommended"}:{" "}
                {filterDatas?.pagination?.total}
              </Text>

              <MediumButton
                onPress={() => navigation.navigate("AddRecommended")}
                textStyle={{ color: COLOR.white, fontSize: rf(1.8) }}
                stylesButton={styles.addButton}
                title={language.addNewButton}
              />
            </View>
            <TargetCard target={graphVal} />
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchFilterContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  onChangeText={(val) => searchFilterFunction(val)}
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
                    // paddingHorizontal: rh(0.2),
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
                      value: item?.user?.full_name,
                      width: 20,
                    },
                    {
                      title: "Contact No",
                      value: item?.user?.contact_number?.slice(2, 13),
                      width: 30,
                    },
                    {
                      title: "Email",
                      value: item?.policy?.name,
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
                      value: item?.user?.uid,
                      width: 20,
                    },
                    {
                      title: "Contact No",
                      value: item?.user?.contact_number?.slice(2, 13),
                      width: 30,
                    },
                    {
                      title: "Email",
                      value: item?.policy?.name,
                      width: 35,
                    },
                    {
                      title: language?.customerTypeTitle,
                      value: item?.user?.type == "b2c" ? "B2C" : "B2B",
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
    paddingTop: rh(1),
  },
  headerButtonCon: {
    borderBottomWidth: rh(0.01),
    backgroundColor: COLOR.white,
  },
  searchContainer: {
    marginTop: rh(1),
    borderTopWidth: rh(0.01),
    backgroundColor: COLOR.white,
  },
  scrollButton: {
    height: rh(3),
    width: rw(4),
    backgroundColor: "#1691CE",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: rh(1),
    borderRadius: rh(0.3),
    // paddingVertical: rh(0.5),
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
    // justifyContent: 'space-between',
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
    paddingHorizontal: 10,
    fontSize: 12,
  },
  searchInputButton: {
    borderWidth: 1,
    height: 46,
    borderColor: "#E5EAFF",
    paddingRight: 8,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  flexDirection: "row",
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0099C9",
    height: 46,
    borderRadius: 3,
    width: rw(25),
    justifyContent: "center",
  },
});
