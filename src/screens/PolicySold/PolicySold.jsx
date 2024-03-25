import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLOR, rf, rh, ROW, RSC, rw } from "../../theme/Theme";
import Text from "../../components/Text/Text";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import { Path, Svg } from "react-native-svg";
import MediumButton from "../../components/Buttons/MediumButton";
import { useSelector } from "react-redux";
import { useLazyGetFilterPurchaseStatusQuery } from "../../redux/features/purchase/purchaseApiSlice";
import InsuranceFilter from "../../components/Shared/InsuranceFilter";
import { languageSelector } from "../../redux/features/language/languageSlice";
import DataNotFound from "../../components/Shared/DataNotFound";
import useShowToastMessage from "../../hooks/useShowToastMessage";
import CollapsibleListCard from "../../CollapsibleCard/CollapsibleListCard";
import Background from "../../components/Shared/Background";
import TargetCard from "../../components/TargetCard/TargetCard";

export default function PolicySold() {
  const [dataNew, setDataNew] = useState([]);
  const toast = useShowToastMessage();
  const language = useSelector(languageSelector);
  //filterStates
  const targetDatas = useRef([]);
  const [graphVal, setGraphVal] = useState([]);
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [filterDatas, setFilterDatas] = useState();
  const [IsVisible, setIsVisible] = useState(false);
  const [filterUserData, setFilterUserData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
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
          "Active",
          paramData,
        ]).unwrap();
        // targetData
        const targetData = [
          {
            title: "Target",
            target: `${res?.target ?? 0}`,
            achieve: res?.achieve,
            count: res?.target,
            type: "target",
          },
          {
            title: "Achieved",
            target: `${res?.target ?? 0}`,
            achieve: res?.achieve,
            count: res?.achieve,
            type: "achieved",
          },
          {
            title: "Gap",
            target: `${res?.target ?? 0}`,
            achieve: res?.achieve,
            count: res?.gap,
            type: "gap",
          },
        ];
        targetDatas.current = targetData;
        setGraphVal(targetData);
        setFilterDatas(res);
        setFilterUserData(res?.policy_sold);
        toast(language?.filter_applied);
        // setDateFrom(null);
        // setDateTo(null);
        setIsVisible(false);
      } catch (error) {
        console.log("helloError", error);
      }
    } else {
      setFilterUserData(dataNew);
      toast(language?.select_both_date);
    }
    setIsVisible(false);
  }

  const searchFilterFunction = (text) => {
    if (text) {
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
      //
      setFilterUserData(newData);
    } else {
      setFilterUserData(dataNew);
      if (currentPage == 1) {
        setDataNew(filterDatas?.policy_sold);
      } else {
        setDataNew((prevData) => [...prevData, ...filterDatas?.policy_sold]);
      }
    }
  };
  //
  async function pageFilter() {
    try {
      let paramData = `&page=${currentPage}`;
      const res = await getFilterPurchaseStatus(["Active", paramData]).unwrap();
      setFilterDatas(res);
      console.log("res", res?.gap);
      const targetData = [
        {
          title: "Target",
          target: `${res?.target ?? 0}`,
          achieve: res?.achieve,
          count: res?.target,
          type: "target",
        },
        {
          title: "Achieved",
          target: `${res?.target ?? 0}`,
          achieve: res?.achieve,
          count: res?.achieve,
          type: "achieved",
        },
        {
          title: "Gap",
          target: `${res?.target ?? 0}`,
          achieve: res?.achieve,
          count: res?.gap,
          type: "gap",
        },
      ];
      targetDatas.current = targetData;
      setGraphVal(targetData);
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
  useEffect(() => {
    pageFilter();
  }, [currentPage]);

  // data
  const data = [
    {
      x: "Device",
      y: filterDatas?.policy_sold
        ? filterDatas?.policy_sold?.filter(
            (item, index) => item?.policy?.category?.id?.toString() === "3"
          ).length
        : 0,
      label: "Device",
      fill: "#07AA2B",
    },
    {
      x: "Motor",
      y: filterDatas?.policy_sold
        ? filterDatas?.policy_sold?.filter(
            (item, index) => item?.policy?.category?.id?.toString() === "5"
          ).length
        : 0,
      label: "Motor",
      fill: "#D70000",
    },
    {
      x: "Travel",
      y: filterDatas?.policy_sold
        ? filterDatas?.policy_sold?.filter(
            (item, index) => item?.policy?.category?.id?.toString() === "2"
          ).length
        : 0,
      label: "Travel",
      fill: "#DAAE12",
    },
    {
      x: "Health",
      y: filterDatas?.policy_sold
        ? filterDatas?.policy_sold?.filter(
            (item, index) => item?.policy?.category?.id?.toString() === "1"
          ).length
        : 0,
      label: "Health",
      fill: "#00A798",
    },
    {
      x: "Life",
      y: filterDatas?.policy_sold
        ? filterDatas?.policy_sold?.filter(
            (item, index) => item?.policy?.category?.id?.toString() === "4"
          ).length
        : 0,
      label: "Life",
      fill: "#FF4DD8",
    },
  ];
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
      width: 30,
    },
    {
      title: language?.categoryTitle,
      width: 20,
    },
    {
      title: language?.policyNameTitle,
      width: 32,
    },
    {
      title: language?.detailsTitle,
      width: 15,
    },
  ];
  //
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
        <DrawerHeader title={language.policySoldHeader} />
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
              marginBottom: rh(1),
            }}
          >
            <Text style={styles.textStyle} preset="LM">
              {language.totalPolicySoldTitle}: {filterDatas?.pagination?.total}
            </Text>
            <TargetCard target={graphVal} />
            {/* <View style={{ right: rh(5), marginTop: -rh(5) }}>
              <VictoryChart height={rh(40)} domainPadding={rh(3)}>
                <VictoryBar
                  horizontal
                  data={data}
                  style={{
                    data: { width: rw(5), fill: ({ datum }) => datum.fill },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  tickValues={
                    filterDatas?.pagination?.total > 100
                      ? null
                      : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                  }
                />
              </VictoryChart>
            </View> */}
          </View>
          {/*  */}
          <View>
            <View style={styles.searchFilterContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  onChangeText={(val) => searchFilterFunction(val)}
                  placeholder={language.searchPlaceHolderText}
                  style={styles.searchInput}
                />
                {/* <TouchableOpacity style={styles.searchInputButton}>
                <SvgSearchIcon />
              </TouchableOpacity> */}
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
                      width: 30,
                    },
                    {
                      title: "policy category",
                      value: item?.policy?.category?.title,
                      width: 15,
                    },
                    {
                      title: "policy name",
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
            ListEmptyComponent={isLoading ? <DataNotFound /> : <></>}
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
    paddingVertical: rh(2),
    backgroundColor: "#ffff",
  },
  textStyle: {
    fontSize: rf(2.1),
    color: COLOR.blue600,
  },
  searchFilterContainer: {
    paddingVertical: rh(2.5),
    // paddingHorizontal: rw(2.5),
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
});
