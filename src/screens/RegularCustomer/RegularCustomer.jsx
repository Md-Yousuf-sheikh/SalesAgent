import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { COLOR, CONTAINER, rf, rh, ROW, RSC, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import CollapsibleCard from "../../CollapsibleCard/CollapsibleCard";
import PaymentCalCard from "../../components/PaymentCalCard/PaymentCalCard";
import MediumButton from "../../components/Buttons/MediumButton";
import { Svg } from "react-native-svg";
import { Path } from "victory-native";
import { useSelector } from "react-redux";
import { useLazyGetFilterRegularCustomersQuery } from "../../redux/features/customer/customerApiSlice";
import InsuranceFilter from "../../components/Shared/InsuranceFilter";
import Pagination from "../RegisteredCustomer/Pagination";
import Skeleton from "../../components/Skeleton/Skeleton";
import {
  codeSelector,
  languageSelector,
} from "../../redux/features/language/languageSlice";
import { toBnNum } from "../../utils";
import useShowToastMessage from "../../hooks/useShowToastMessage";
import CollapsibleListCard from "../../CollapsibleCard/CollapsibleListCard";
import Background from "../../components/Shared/Background";
import DataNotFound from "../../components/Shared/DataNotFound";

export default function RegularCustomer() {
  const [dataNew, setDataNew] = useState([]);
  const toast = useShowToastMessage();
  //filterStates
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [filterDatas, setFilterDatas] = useState();
  const [IsVisible, setIsVisible] = useState(false);
  const [filterUserData, setFilterUserData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);

  const [getFilterRegularCustomers, { isLoading }] =
    useLazyGetFilterRegularCustomersQuery();

  async function handleDateFilter() {
    if (dateTo && dateFrom && dateFrom !== undefined && dateTo !== undefined) {
      try {
        let paramData = `?from=${dateFrom
          ?.split("-")
          .reverse()
          .join("-")}&to=${dateTo?.split("-").reverse().join("-")}`;
        const res = await getFilterRegularCustomers([paramData]).unwrap();

        setFilterDatas(res);
        setFilterUserData(res?.users);
        toast(language?.filter_applied);

        // setDateFrom(null);
        // setDateTo(null);
        setIsVisible(false);
      } catch (error) {
        setFilterUserData(dataNew);
        console.log("Regular User Error", error);
      }
    } else {
      toast(language?.select_both_date);
    }
  }

  async function pageFilter() {
    try {
      let paramData = `?page=${currentPage}`;
      const res = await getFilterRegularCustomers([paramData]).unwrap();
      // console.log("resssss", res);
      setFilterDatas(res);
      if (currentPage == 1) {
        setDataNew(res?.users);
        setFilterUserData(res?.users);
      } else {
        setDataNew((prevData) => [...prevData, ...res?.users]);
        setFilterUserData((prevData) => [...prevData, ...res?.users]);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    pageFilter();
  }, [currentPage]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = filterDatas?.users?.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item?.full_name
          ? item?.full_name?.toUpperCase()
          : "".toUpperCase();
        const contactData = item?.contact_number
          ? item?.contact_number?.toUpperCase()
          : "".toUpperCase();
        const emailData = item?.email
          ? item?.email.toUpperCase()
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
        setDataNew(filterDatas?.users);
      } else {
        setDataNew((prevData) => [...prevData, ...filterDatas?.users]);
      }
    }
  };

  tarData = {
    count: parseInt(filterDatas?.b2c) + parseInt(filterDatas?.b2b),
    title: "Regular",
  };

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
      width: 32,
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
        <DrawerHeader title={language.regularCustomerTitle} />
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
                {language.totalRegularCustomerTitle}:{" "}
                {toBnNum(filterDatas?.pagination?.total, code)}
              </Text>
            </View>
            <PaymentCalCard
              activeColor={COLOR.blue600}
              inactiveColor={COLOR.lightRed}
              firstTitle={language.b2cCustomerTitle}
              secondTitle={language.b2bCustomerTitle}
              firstAmount={filterDatas?.b2c}
              secondAmount={filterDatas?.b2b}
              target={tarData}
            />
          </View>

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
                      value: item?.uid,
                      width: 20,
                    },
                    {
                      title: language?.emailPlaceHolderText,
                      value: item?.email,
                      width: 20,
                    },
                    {
                      title: language?.customerTypeTitle,
                      value: item?.type == "b2c" ? "B2C" : "B2B",
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
    paddingVertical: rh(1),
  },
  textStyle: {
    fontSize: rf(2.1),
    color: COLOR.blue600,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
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
