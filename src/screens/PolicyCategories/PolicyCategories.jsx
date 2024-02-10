import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { rh, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import Text from "../../components/Text/Text";
import InsuranceCatCard from "../../components/InsuranceCatCard/InsuranceCatCard";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedPolicyCategoryList,
  setAllCategories,
} from "../../redux/features/policy/policySlice";
import { useGetAllCategoriesQuery } from "../../redux/features/policy/policyApiSlice";
import { useEffect } from "react";
import {
  codeSelector,
  languageSelector,
} from "../../redux/features/language/languageSlice";
import Skeleton from "../../components/Skeleton/Skeleton";
import Background from "../../components/Shared/Background";

export default function PolicyCategories() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const { data, isLoading, refetch } = useGetAllCategoriesQuery(code);
  //
  useEffect(() => {
    dispatch(setAllCategories(data));
  }, [data]);

  return (
    <>
      <DrawerHeader title={language.policyCategoryHeaderText} />
      <Background onRefresh={refetch} refreshIsOpen={true}>
        <View style={styles.container}>
          <Text style={{ marginBottom: rh(2) }} preset="h4">
            {language.policyCategoryDetailText}
          </Text>

          <FlatList
            style={{ width: rw(100) }}
            data={data || []}
            renderItem={(item) => {
              return (
                <InsuranceCatCard
                  onPress={() => {
                    const data = {
                      slug: item?.item?.slug,
                      id: item?.item?.id,
                      polType: "B2C",
                      item: item?.item,
                    };

                    if (item?.item?.isCommonForm) {
                      navigation.navigate("CategoryPurchase", {
                        item: item?.item,
                      });
                    } else {
                      navigation.navigate("InsuranceListScreen", {
                        item: data,
                      });
                    }
                  }}
                  data={item?.item}
                />
              );
            }}
            ListEmptyComponent={
              isLoading ? (
                <>
                  <Skeleton
                    width={rw(91)}
                    height={rh(6)}
                    rounded={10}
                    mb={10}
                  />
                  <Skeleton
                    width={rw(91)}
                    height={rh(6)}
                    rounded={10}
                    mb={10}
                  />
                  <Skeleton
                    width={rw(91)}
                    height={rh(6)}
                    rounded={10}
                    mb={10}
                  />
                  <Skeleton
                    width={rw(91)}
                    height={rh(6)}
                    rounded={10}
                    mb={10}
                  />
                  <Skeleton
                    width={rw(91)}
                    height={rh(6)}
                    rounded={10}
                    mb={10}
                  />
                  <Skeleton
                    width={rw(91)}
                    height={rh(6)}
                    rounded={10}
                    mb={10}
                  />
                  <Skeleton
                    width={rw(91)}
                    height={rh(6)}
                    rounded={10}
                    mb={10}
                  />
                  <Skeleton
                    width={rw(91)}
                    height={rh(6)}
                    rounded={10}
                    mb={10}
                  />
                  <Skeleton
                    width={rw(91)}
                    height={rh(6)}
                    rounded={10}
                    mb={10}
                  />
                </>
              ) : (
                <></>
              )
            }
          />
        </View>
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4.2),
    paddingVertical: rh(3),
    // marginBottom: rh(5),
    paddingBottom: rh(10),
    flex: 1,
  },
  //
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
    height: 46,
    borderColor: "#E5EAFF",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: rw(50),
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
// catagoriesData

//  popularInsurance
