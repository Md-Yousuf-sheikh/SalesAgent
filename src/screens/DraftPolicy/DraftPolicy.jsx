import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { COLOR, CONTAINER, rf, rh, ROW, RSC, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import MediumButton from "../../components/Buttons/MediumButton";
import CollapsibleCard from "../../CollapsibleCard/CollapsibleCard";
import { Path, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import { useLazyGetFilterPurchaseStatusQuery } from "../../redux/features/purchase/purchaseApiSlice";
import InsuranceFilter from "../../components/Shared/InsuranceFilter";
import Pagination from "../RegisteredCustomer/Pagination";
import Skeleton from "../../components/Skeleton/Skeleton";
import DataNotFound from "../../components/Shared/DataNotFound";
import {
  codeSelector,
  languageSelector,
} from "../../redux/features/language/languageSlice";
import { toBnNum } from "../../utils";
import useShowToastMessage from "../../hooks/useShowToastMessage";

export default function DraftPolicy() {
  const [dataNew, setDataNew] = useState([]);
  //filterStates
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [filterDatas, setFilterDatas] = useState();
  const [IsVisible, setIsVisible] = useState(false);
  const [filterUserData, setFilterUserData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useShowToastMessage();
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);

  const [getFilterPurchaseStatus, { isLoading: filterLoading }] =
    useLazyGetFilterPurchaseStatusQuery();

  async function handleDateFilter() {
    if (dateTo && dateFrom && dateFrom !== undefined && dateTo !== undefined) {
      try {
        let paramData = `&from=${dateFrom
          ?.split("-")
          .reverse()
          .join("-")}&to=${dateTo?.split("-").reverse().join("-")}`;
        const res = await getFilterPurchaseStatus([
          "Draft",
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

  useEffect(() => {
    async function pageFilter() {
      try {
        let paramData = `&page=${currentPage}`;
        const res = await getFilterPurchaseStatus([
          "Draft",
          paramData,
        ]).unwrap();
        setFilterDatas(res);

        if (currentPage == 1) {
          setDataNew(res?.policy_sold);
          setFilterUserData(res?.policy_sold);
        } else {
          setDataNew((prevData) => [...prevData, ...res?.policy_sold]);
          setFilterUserData((prevData) => [...prevData, ...res?.policy_sold]);
        }
        //
      } catch (error) {
        console.log("error", error);
      }
    }
    pageFilter();
  }, [currentPage]);

  let totalPendingAmount = 0;

  if (dataNew) {
    for (let elem of dataNew) {
      if (elem?.policy?.premium_amount) {
        totalPendingAmount += parseInt(elem?.policy?.premium_amount);
      }
    }
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      const newData = dataNew?.filter(function (item) {
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
      // setSearch(text)
    } else {
      setFilterUserData(dataNew);
    }
  };
  //
  // console.log("filterDatas", JSON.stringify(filterDatas));
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
        isLoading={filterLoading}
      />
      <View style={CONTAINER}>
        <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
        <DrawerHeader title={language.draftPolicyTitle} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {/*  */}
          <View
            style={{
              borderBottomWidth: rh(0.01),
              backgroundColor: COLOR.white,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.4,
              shadowRadius: 4.65,
              elevation: 8,
              paddingHorizontal: rw(3),
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
                {language.totalDraftPolicy}:{" "}
                {toBnNum(filterDatas?.pagination?.total || 0, code)}
              </Text>
            </View>
            {/* <PaymentCalCard
              activeColor={COLOR.blue600}
              inactiveColor={COLOR.lightRed}
              firstTitle={language.totalAmountTitle}
              secondTitle={language.draftAmountTitle}
              firstAmount={`${'0'}`}
              secondAmount={`${filterDatas?.achieve}`}
              target={pendingData}
            /> */}
          </View>
          {/*  */}
          <View
            style={{
              marginTop: rh(1),
              borderTopWidth: rh(0.01),
              marginBottom: rh(12),
              backgroundColor: COLOR.white,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.4,
              shadowRadius: 4.65,
              elevation: 8,
              paddingHorizontal: rw(3),
            }}
          >
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: rh(1),
                width: "100%",
              }}
            >
              <Text style={{ width: rw(25) }} preset="SL" color={"#4F4F4F"}>
                {language.userNameTitle}
              </Text>

              <Text style={{ width: rw(23) }} preset="SL" color={"#4F4F4F"}>
                {language.policyNameTitle}
              </Text>
              <Text style={{ width: rw(23) }} preset="SL" color={"#4F4F4F"}>
                {language.amountPendingTitle}
              </Text>
              <Text preset="SL" color={"#4F4F4F"}>
                {language.detailsTitle}
              </Text>
            </View>

            {filterLoading ? (
              <>
                <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                <Skeleton height={rw(10)} width={rw(93)} mt={10} />
                <Skeleton height={rw(10)} width={rw(93)} mt={10} />
              </>
            ) : filterUserData?.length > 0 ? (
              filterUserData?.map((item, index) => {
                return (
                  <CollapsibleCard
                    key={index}
                    index={index}
                    draft={true}
                    data={item}
                    userData={item?.user}
                    policyData={item?.policy}
                  />
                );
              })
            ) : (
              <DataNotFound />
            )}
            {filterLoading.length > 0 && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagination={filterDatas?.pagination}
                type={"lodeMore"}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: rh(2),
    // paddingBottom: rh(5),
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
    // fontWeight: '800',
  },
});
