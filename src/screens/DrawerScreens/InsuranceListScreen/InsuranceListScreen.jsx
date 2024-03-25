import {
  FlatList,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useMemo, useCallback } from "react";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { CONTAINER, rf, rh, ROW, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import SvgSearchIcon from "../../../svg/SvgSearchIcon";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useGetPoliciesListBySlugQuery } from "../../../redux/features/policy/policyApiSlice";
import FloatingCompare from "../../../components/Headers/FloatingCompare";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DataNotFound from "../../../components/Shared/DataNotFound";
import FilterModal from "./FilterModal";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { selectedPolicyCategoryList } from "../../../redux/features/policy/policySlice";
import PopularInsuranceCard from "../HomeScreen/PopularInsuranceCard";
import PolicyTypeButton from "../../../components/Buttons/PolicyTypeButton";
import SkeletonInsuranceCard from "../../../components/Shared/SkeletonInsuranceCard";
import { useRoute } from "@react-navigation/native";

export default function InsuranceListScreen() {
  // hooks
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const categoriesData = useSelector(selectedPolicyCategoryList);
  const route = useRoute().params;
  const [selectCat, setSelectCat] = useState(
    route?.item?.item ?? categoriesData?.[0]
  );
  const [searchInputValue, setSearchInputValue] = useState("");
  const [policyFor, setPolicyFor] = useState("b2c");
  const [filterPolicy, setFilterPolicy] = useState({
    isVisible: false,
    coverageAmount: "",
    durationType: "",
    duration: "",
    insurer: "",
    filter: "",
  });

  // get data
  let slug = selectCat?.slug;
  const { isLoading, data, refetch } = useGetPoliciesListBySlugQuery({
    slug,
    code,
    filter: `policy_for=${policyFor}&${filterPolicy?.filter}`,
  });
  let displayData;
  // Memoized filtered array and display data
  const filteredArray = useMemo(() => {
    return data?.data?.items?.filter((item) =>
      item.name.toLowerCase().includes(searchInputValue.toLowerCase())
    );
  }, [data?.data?.items, searchInputValue]);

  displayData = searchInputValue ? filteredArray : data?.data?.items;

  // Memoized category list
  const categoryList = useMemo(() => {
    return (
      <FlatList
        data={categoriesData.slice(0, 5)}
        horizontal
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
        renderItem={(item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.categoryButton,
                selectCat?.id === item?.item?.id &&
                  styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategorySelection(item?.item)}
            >
              <Text
                preset="h6"
                color={
                  selectCat?.id === item?.item?.id ? "#ffffffde" : "#3369B3"
                }
              >
                {item?.item?.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }, [categoriesData, selectCat?.title]);
  //
  // Handle category selection
  const handleCategorySelection = useCallback(
    (item) => {
      setSelectCat(item);
      setFilterPolicy((prev) => ({
        ...prev,
        filter: "",
      }));
      refetch();
    },
    [refetch]
  );

  return (
    <>
      <FilterModal
        setFilterPolicy={setFilterPolicy}
        filterPolicy={filterPolicy}
        refetch={refetch}
      />
      <FloatingCompare />
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language?.InsuranceListHeader} />
      <View style={CONTAINER}>
        <View style={styles.categoryContainer}>{categoryList}</View>
        <View style={styles.container}>
          <View style={styles.searchFilterContainer}>
            {/* Search field */}
            <View style={styles.searchInputContainer}>
              <TextInput
                placeholder={language?.searchHere}
                style={styles.searchInput}
                onChangeText={(val) => setSearchInputValue(val)}
              />
              <TouchableOpacity style={styles.searchInputButton}>
                <SvgSearchIcon />
              </TouchableOpacity>
            </View>
            {/* policy type  */}
            <PolicyTypeButton activeOption={"b2c"} onPress={setPolicyFor} />
            {/* Filter button */}
            <TouchableOpacity
              onPress={() => setFilterPolicy((prev) => ({ isVisible: true }))}
              style={styles.filterButton}
            >
              <MaterialIcons name="filter-alt" size={rh(2.6)} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* List items */}
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              id={policyFor}
              key={slug}
              data={displayData || []}
              renderItem={({ item }) => {
                return (
                  <PopularInsuranceCard
                    item={item}
                    polType={policyFor === "b2c" ? "B2C" : "B2B"}
                  />
                );
              }}
              ListEmptyComponent={
                isLoading ? (
                  <>
                    <SkeletonInsuranceCard />
                    <SkeletonInsuranceCard />
                    <SkeletonInsuranceCard />
                    <SkeletonInsuranceCard />
                    <SkeletonInsuranceCard />
                  </>
                ) : (
                  <DataNotFound mt={rh(25)} />
                )
              }
            />
            <View style={styles.bottomSpacing} />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    height: 50,
    // alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    paddingLeft: 10,
  },
  container: {
    paddingHorizontal: rw(4),
    paddingBottom: rh(9),
  },
  searchFilterContainer: {
    paddingBottom: rh(2.5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInputContainer: {
    flexDirection: "row",
  },
  searchInput: {
    borderWidth: 1,
    height: rh(5.7),
    borderColor: "#E5EAFF",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: rw(45),
    paddingHorizontal: rh(1.2),
    fontSize: rf(1.6),
  },
  searchInputButton: {
    borderWidth: 1,
    height: rh(5.7),
    borderColor: "#E5EAFF",
    paddingRight: rh(1),
    paddingLeft: rh(1.2),
    alignItems: "center",
    justifyContent: "center",
    paddingTop: rh(1.2),
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2253a5",
    height: rh(5.5),
    borderRadius: 3,
    width: rw(12),
    justifyContent: "center",
  },
  bottomSpacing: {
    paddingBottom: rh(15),
  },
  categoryButton: {
    height: 30,
    borderRadius: 30,
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "#3369B3",
    marginHorizontal: 2,
    shadowColor: "#ddd",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "auto",
  },
  selectedCategoryButton: {
    backgroundColor: "#3369B3",
    shadowColor: "#3369B3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
