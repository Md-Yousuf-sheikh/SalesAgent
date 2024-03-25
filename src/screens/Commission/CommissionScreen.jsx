import React, { useState } from "react";
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
import {
  useGetCommissionBalanceQuery,
  useGetWholePremiumDuesQuery,
  useLazyGetFilteredCommissionBalanceQuery,
  useLazyGetPremiumDuesQuery,
} from "../../redux/features/customer/customerApiSlice";
import InsuranceFilter from "../../components/Shared/InsuranceFilter";
import { useEffect } from "react";
import Toast from "react-native-root-toast";
import Pagination from "../RegisteredCustomer/Pagination";
import useShowToastMessage from "../../hooks/useShowToastMessage";

export default function CommissionScreen({ route }) {
  //filterStates
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [filterDatas, setFilterDatas] = useState();
  const [IsVisible, setIsVisible] = useState(false);
  const [filterUserData, setFilterUserData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  //
  const toast = useShowToastMessage();

  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );

  const { data: commissionDatas } = useGetCommissionBalanceQuery();
  const [getFilteredCommision, { isLoading: filterLoading }] =
    useLazyGetFilteredCommissionBalanceQuery();

  async function handleDateFilter() {
    if (dateTo && dateFrom && dateFrom !== undefined && dateTo !== undefined) {
      try {
        let paramData = `?from=${dateFrom
          ?.split("-")
          .reverse()
          .join("-")}&to=${dateTo?.split("-").reverse().join("-")}`;
        const res = await getFilteredCommision([paramData]).unwrap();
        console.log("getFilterBalance", res);
        setFilterDatas(res);
        setFilterUserData(res?.histories);
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
      console.log("toggled", currentPage);
      try {
        let paramData = `?page=${currentPage}`;
        const res = await getFilteredCommision([paramData]).unwrap();
        console.log("resssss", res);
        setFilterDatas(res?.data);
        setFilterUserData(res?.data?.histories);
      } catch (error) {
        console.log("error", error);
      }
    }
    pageFilter();
  }, [currentPage]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = filterDatas?.histories?.filter(function (item) {
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
      console.log("newData", newData);
      setFilterUserData(newData);
      // setSearch(text)
    } else {
      setFilterUserData(filterDatas?.histories);
    }
  };
  // let tarData

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
      <View
        style={{ backgroundColor: COLOR.white, paddingBottom: rh(3), flex: 1 }}
      >
        <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
        <DrawerHeader title={languageState.commissionTitle} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
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
            <View style={styles.headerContainer}>
              <Text style={styles.textStyle} preset="LM">
                {languageState.totalDueBalance}:
                {filterDatas?.balance !== undefined
                  ? `  ${filterDatas?.balance} `
                  : "0"}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: rh(1),
              borderTopWidth: rh(0.01),
              backgroundColor: COLOR.white,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.4,
              shadowRadius: 4.65,
              elevation: 8,
              paddingHorizontal: rw(3),
              marginBottom: rh(12),
            }}
          >
            <View style={styles.searchFilterContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  onChangeText={(val) => searchFilterFunction(val)}
                  placeholder={languageState.searchPlaceHolderText}
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
                {languageState.nameTitle}
              </Text>

              <Text style={{ width: rw(23) }} preset="SL" color={"#4F4F4F"}>
                {languageState.policyNameTitle}
              </Text>
              <Text style={{ width: rw(23) }} preset="SL" color={"#4F4F4F"}>
                {languageState.commissionTitle}
              </Text>
              <Text preset="SL" color={"#4F4F4F"}>
                {languageState.detailsTitle}
              </Text>
            </View>
            {filterUserData !== undefined &&
              filterUserData?.map((item, index) => {
                if (item?.user && item?.policy) {
                  return (
                    <CollapsibleCard
                      key={index}
                      index={index}
                      // pending={true}
                      commission={true}
                      userData={item?.user}
                      policyData={item?.policy}
                      colorText={"#C66363"}
                      mainItem={item}
                      // dueAmount={parseInt(filterDatas?.due)}
                    />
                  );
                }
              })}

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pagination={filterDatas?.pagination}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: rh(2),
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
    // justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: rh(2),
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
