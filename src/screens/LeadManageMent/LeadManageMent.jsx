import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { COLOR, CONTAINER, rf, rh, ROW, RSC, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import Text from "../../components/Text/Text";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import MediumButton from "../../components/Buttons/MediumButton";
import CollapsibleCard from "../../CollapsibleCard/CollapsibleCard";
import PaymentCalCard from "../../components/PaymentCalCard/PaymentCalCard";
import { Path, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import {
  useLazyGetFilterLeadsQuery,
  useLazyGetWholeLeadsQuery,
} from "../../redux/features/customer/customerApiSlice";
import Toast from "react-native-root-toast";
import InsuranceFilter from "../../components/Shared/InsuranceFilter";
import Pagination from "../RegisteredCustomer/Pagination";
import { languageSelector } from "../../redux/features/language/languageSlice";
import useShowToastMessage from "../../hooks/useShowToastMessage";

export default function LeadManagement({ route }) {
  const check = route?.params?.policy;
  const [blueTest, setBlueTest] = useState(true);
  const [blueTestSecond, setBlueTestSecond] = useState(false);
  const toast = useShowToastMessage();
  //filterStates
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [filterDatas, setFilterDatas] = useState();
  const [filterUserData, setFilterUserData] = useState();
  const [IsVisible, setIsVisible] = useState(false);
  const [graphVal, setGraphVal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const language = useSelector(languageSelector);

  // const { data: allLeads, isLoading, isError } = useGetWholeLeadsQuery()
  const [wholeLeads, { isLoading: wholeLeadsLoading }] =
    useLazyGetWholeLeadsQuery();

  const [getFilterLeads, { isLoading: cusLoading }] =
    useLazyGetFilterLeadsQuery();

  async function handleDateFilter() {
    if (dateTo && dateFrom && dateFrom !== undefined && dateTo !== undefined) {
      try {
        let paramData = `?from=${dateFrom
          ?.split("-")
          .reverse()
          .join("-")}&to=${dateTo?.split("-").reverse().join("-")}`;
        const res = await getFilterLeads([paramData]).unwrap();
        console.log("getCustomerMData", res);
        setFilterDatas(res);
        setFilterUserData(res?.leads);
        const pendingData = [
          {
            title: "Lead",
            count: `${res?.total}`,
            value: res?.total,
          },
        ];
        setGraphVal(pendingData);
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
        const res = await getFilterLeads([paramData]).unwrap();
        console.log("resssss", res);
        setFilterDatas(res);
        setFilterUserData(res?.leads);

        const pendingData = [
          {
            title: "Lead",
            count: `${res?.total}`,
            value: res?.total,
          },
        ];
        setGraphVal(pendingData);
      } catch (error) {
        console.log("error", error);
      }
    }
    pageFilter();
  }, [currentPage]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function addNew() {
        try {
          let paramData = `?page=${currentPage}`;

          const res = await getFilterLeads([paramData]).unwrap();
          console.log("wholElads", res);
          setFilterDatas(res);
          setFilterUserData(res?.leads);
        } catch (error) {}
      }
      addNew();
    });

    return unsubscribe;
  }, [navigation]);

  function colorHandleFirst() {
    setBlueTest(true);
    setBlueTestSecond(false);
  }
  function colorHandleSecond() {
    setBlueTest(false);
    setBlueTestSecond(true);
  }
  const navigation = useNavigation();
  const handleNavigation = (name) => {
    console.log("hela");
    navigation.navigate(name);
  };

  let tarData;

  tarData = {
    total:
      filterDatas?.leads?.filter((item) => item?.type === "B2C")?.length +
      filterDatas?.leads?.filter((item) => item?.type === "B2B")?.length,
    count:
      filterDatas?.leads?.filter((item) => item?.type === "B2C")?.length +
      filterDatas?.leads?.filter((item) => item?.type === "B2B")?.length,
    title: "Total",
  };

  console.log("filterUserData", filterUserData);
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = filterDatas?.leads?.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item?.name
          ? item?.name?.toUpperCase()
          : "".toUpperCase();
        const contactData = item?.phone ? item?.phone : "".toUpperCase();
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
      console.log("newData", newData);
      setFilterUserData(newData);
      // setSearch(text)
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      // setFilteredDataSource(masterDataSource)
      setFilterUserData(filterDatas?.leads);

      // setSearch(text)
    }
  };
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
        isLoading={cusLoading}
      />
      <View style={{ backgroundColor: COLOR.white, flex: 1 }}>
        <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
        <DrawerHeader title={language.leadManagementHeader} />
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
              paddingTop: rh(2),
            }}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.textStyle} preset="LM">
                {language?.totalLeadTitle}: {filterDatas?.total}
              </Text>
              <MediumButton
                onPress={() => navigation.navigate("NewLead")}
                textStyle={{ color: COLOR.white }}
                stylesButton={styles.addButton}
                title={language.addNewButton}
              />
            </View>
            <PaymentCalCard
              activeColor={COLOR.blue600}
              inactiveColor={COLOR.lightGreen}
              firstTitle={language.b2cLeadTitle}
              secondTitle={language.b2bLeadTitle}
              firstAmount={
                filterDatas?.leads?.filter((item) => item?.type === "B2C")
                  ?.length
              }
              secondAmount={
                filterDatas?.leads?.filter((item) => item?.type === "B2B")
                  ?.length
              }
              target={tarData}
            />
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
              marginBottom: rh(10.5),
            }}
          >
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
                  // title={language.filterButtonText}
                  stylesButton={{
                    width: rw(15),
                    marginVertical: 0,
                    elevation: 0,
                    backgroundColor: "#0099C9",
                    paddingHorizontal: rw(3),
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
            {/* <View style={styles.searchFilterContainer}>
            <View style={styles.searchInputContainer}>
              <TextInput
                placeholder={language.searchPlaceHolderText}
                style={styles.searchInput}
              />
            </View>
            <View style={ROW}>
              <MediumButton
                title={language.filterButtonText}
                stylesButton={{
                  width: rw(28),
                  marginVertical: 0,
                  elevation: 0,
                  backgroundColor: '#0099C9',
                  paddingHorizontal: rw(3),
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
          </View> */}
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
                {language.contactNoTextInput}
              </Text>
              <Text style={{ width: rw(23) }} preset="SL" color={"#4F4F4F"}>
                {language.emailTextInput}
              </Text>
              <Text preset="SL" color={"#4F4F4F"}>
                {language.detailsTitle}
              </Text>
            </View>
            {filterUserData?.map((item, index) => {
              return (
                <CollapsibleCard
                  key={index}
                  index={index}
                  // check={true}
                  // inactive={true}
                  userData={item}
                />
              );
            })}

            {/* <View
              style={[
                ROW,
                { marginVertical: rh(3), justifyContent: 'flex-end' },
              ]}
            >
              <LeftBlue style={{ marginRight: rh(1) }} />
              {scrollData?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setIndexVal(index)}
                    key={index}
                    style={[
                      styles.scrollButton,
                      {
                        backgroundColor:
                          indexVal === item?.id - 1 ? '#1691CE' : '#F0F0F0',
                      },
                    ]}
                  >
                    <Text
                      preset="h5"
                      style={{
                        fontWeight: '700',
                        color:
                          indexVal === item?.id - 1 ? COLOR.white : '#4F4F4F',
                      }}
                    >
                      {item?.title}
                    </Text>
                  </TouchableOpacity>
                )
              })}

              <RightBlue style={{ marginLeft: rh(1) }} />
            </View> */}
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
    // paddingVertical: rh(2),
    // paddingBottom: rh(20),
    // marginBottom: rh(5),
    // backgroundColor: COLOR.white,
    flex: 1,
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
    minWidth: rw(15),
    maxWidth: rw(28),
    borderRadius: rh(3),
    backgroundColor: COLOR.blue600,
    borderColor: COLOR.bluishCyan700,
    borderWidth: rh(0.1),
    marginVertical: 0,
    paddingVertical: rh(1),
    paddingHorizontal: rh(0.5),
    elevation: 0,
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
    height: rh(6.5),
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
