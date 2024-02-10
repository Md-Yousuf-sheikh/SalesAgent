import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLOR, CONTAINER, rf, rh, ROW, RSC, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import MediumButton from "../../components/Buttons/MediumButton";
import CollapsibleCard from "../../CollapsibleCard/CollapsibleCard";
import { Path, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import { useLazyGetFilterPurchaseStatusQuery } from "../../redux/features/purchase/purchaseApiSlice";
import { useEffect } from "react";
import InsuranceFilter from "../../components/Shared/InsuranceFilter";
import Pagination from "../RegisteredCustomer/Pagination";
import CurrencyFormat from "../../components/Shared/CurrencyFormat";
import {
  codeSelector,
  languageSelector,
} from "../../redux/features/language/languageSlice";
import Skeleton from "../../components/Skeleton/Skeleton";
import useShowToastMessage from "../../hooks/useShowToastMessage";
import { MoneyFormat, ToBnNum, ToEnNum } from "../../components/Helper/Helper";
import CollapsibleListCard from "../../CollapsibleCard/CollapsibleListCard";
import Background from "../../components/Shared/Background";
import DataNotFound from "../../components/Shared/DataNotFound";

export default function PaymentPending() {
  let totalPendingAmount = 0;
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

  const [getFilterPurchaseStatus, { isLoading }] =
    useLazyGetFilterPurchaseStatusQuery();

  async function handleDateFilter() {
    if (dateTo && dateFrom && dateFrom !== undefined && dateTo !== undefined) {
      try {
        let paramData = `&from=${dateFrom
          ?.split("-")
          .reverse()
          .join("-")}&to=${dateTo?.split("-").reverse().join("-")}`;
        const res = await getFilterPurchaseStatus([
          "Pending",
          paramData,
        ]).unwrap();

        setFilterDatas(res);
        setFilterUserData(res?.policy_sold);
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

  // searchFilterFunction
  const searchFilterFunction = (text) => {
    // text search
    if (text) {
      const newData = filterDatas?.policy_sold?.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item?.user?.full_name
          ? item?.user?.full_name?.toUpperCase()
          : "".toUpperCase();
        const contactData = item?.policy?.name
          ? item?.policy?.name.toUpperCase()
          : "".toUpperCase();
        const emailData = item?.policy?.category?.title
          ? item?.policy?.category?.title.toUpperCase()
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
    } else {
      setFilterUserData(dataNew);
    }
  };

  // currentPage
  async function pageFilter() {
    try {
      let paramData = `&page=${currentPage}`;
      const res = await getFilterPurchaseStatus([
        "Pending",
        paramData,
      ]).unwrap();
      setFilterDatas(res);
      // currentPage
      if (currentPage == 1) {
        setDataNew(res?.policy_sold);
        setFilterUserData(res?.policy_sold);
      } else {
        setDataNew((prevData) => [...prevData, ...res?.policy_sold]);
        setFilterUserData((prevData) => [...prevData, ...res?.policy_sold]);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    pageFilter();
  }, [currentPage]);

  if (dataNew) {
    for (let elem of dataNew) {
      if (elem?.policy?.premium_amount) {
        totalPendingAmount += parseInt(elem?.policy?.premium_amount);
      }
    }
  }
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
      title: language?.userNameTitle,
      width: 20,
    },
    {
      title: language?.policyNameTitle,
      width: 30,
    },
    {
      title: language?.amountPendingTitle,
      width: 20,
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
        <DrawerHeader title={language.paymentPendingHeader} />
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
            <View
              style={[
                styles.headerContainer,
                {
                  paddingBottom: 15,
                },
              ]}
            >
              <Text style={styles.textStyle} preset="LM">
                {language.totalPendingPaymentTitle} :{language?.bdt}{" "}
                {ToEnNum(CurrencyFormat(totalPendingAmount), code)}
              </Text>
            </View>
          </View>
          {/* data list */}
          <View style={styles?.searchContainer}>
            {/* Filter  */}
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
                      title: "policy name",
                      value: item?.policy?.name,
                      width: 30,
                    },
                    {
                      title: "Pending Amount",
                      value: `${language?.bdt} ${ToBnNum(
                        MoneyFormat(item?.policy?.premium_amount),
                        code
                      )}`,
                      width: 20,
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
  scrollButton: {
    height: rh(2.3),
    width: rw(4),
    backgroundColor: "#1691CE",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: rh(0.3),
  },
  searchContainer: {
    borderTopWidth: rh(0.01),
    backgroundColor: COLOR.white,
    paddingBottom: 10,
  },
  textStyle: {
    fontSize: rf(2.1),
    color: COLOR.blue600,
  },
  //
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchFilterContainer: {
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
