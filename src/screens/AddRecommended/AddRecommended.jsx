import { StatusBar, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLOR, CONTAINER, rf, rh, ROW, RSC, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import MediumButton from "../../components/Buttons/MediumButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { useGetUsersListQuery } from "../../redux/features/customer/customerApiSlice";
import {
  useGetAllCategoriesQuery,
  useLazyGetPoliciesByCatQuery,
  useRecommendPolicyMutation,
} from "../../redux/features/policy/policyApiSlice";
import RecommendedUsersList from "./RecommendedUsersList";
import TypeDropDown from "../../components/Inputs/TypeDropDown";
import { FontAwesome } from "@expo/vector-icons";
import Text from "../../components/Text/Text";
import {
  codeSelector,
  languageSelector,
} from "../../redux/features/language/languageSlice";
import useShowToastMessage from "../../hooks/useShowToastMessage";

const typeData = [
  {
    label: "B2C",
    value: "b2c",
  },
  {
    label: "B2B",
    value: "b2b",
  },
];

export default function AddRecommended({ route }) {
  let recommendedItem;
  if (route) {
    recommendedItem = route?.params?.item;
    dummyPolData = {
      id: 2,
      value: route?.params?.item?.id,
      label: route?.params?.item?.name,
    };
  }
  const navigation = useNavigation();
  const [type, setType] = useState({});
  const [policyCategory, setPolicyCategory] = useState({});
  const [policyData, setPolicyData] = useState({});
  const [userInfo, setUserInfo] = useState();
  const [errorCheck, setErrorCheck] = useState(false);
  const toast = useShowToastMessage();

  const categoriesPicker = useRef([]);
  const policyPicker = useRef([]);

  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);

  const { data: allCategoriesDatas, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery(code);

  const { data: usersList } = useGetUsersListQuery(
    `?type=${type?.value?.toLowerCase()}&per_page=100`
  );

  const [submitRecommend, { isLoading: submitLoading }] =
    useRecommendPolicyMutation();

  const [fetchPolicy, {}] = useLazyGetPoliciesByCatQuery();
  // &policy_for=B2B
  useEffect(() => {
    if (recommendedItem?.polType === "B2B") {
      setType(typeData[1]);
      const data = {
        value: recommendedItem?.category?.slug,
        label: recommendedItem?.category?.title,
      };
      setPolicyCategory(data);
    }
  }, [route?.params?.item]);
  //
  useEffect(() => {
    if (recommendedItem?.polType === "B2B") {
      const polData = {
        value: recommendedItem?.id,
        label: recommendedItem?.name,
      };
      setPolicyData(polData);
    }
  }, [route?.params?.item]);

  useEffect(() => {
    for (let itemm of allCategoriesDatas) {
      const data = {
        value: itemm?.slug,
        label: itemm?.title,
      };
      categoriesPicker.current.push(data);
    }
  }, [allCategoriesDatas]);

  useEffect(() => {
    const fetchPolicies = async () => {
      policyPicker.current = [];
      setPolicyData("");
      const props = `&policy_for=${
        recommendedItem?.polType === "B2B" || type?.value == "b2b"
          ? "B2B"
          : "B2C"
      }`;
      try {
        const res = await fetchPolicy([
          policyCategory?.value,
          code,
          props,
        ]).unwrap();
        if (res && res.items && Array.isArray(res.items)) {
          for (let item of res?.items || []) {
            if (item) {
              const data = {
                value: item?.id,
                label: item?.name,
              };
              policyPicker.current.push(data);
            }
          }
        }
      } catch (error) {
        console.log("errorPol", error);
      }
    };
    if (
      Object.keys(policyCategory)?.length > 0 &&
      recommendedItem?.polType !== "B2B"
    ) {
      fetchPolicies();
    }
  }, [policyCategory]);

  async function handleRecommend() {
    setErrorCheck(true);
    if (userInfo && policyData) {
      try {
        let data = {
          user_id: userInfo?.value,
          policy_id: policyData?.value,
        };
        const res = await submitRecommend(data).unwrap();
        toast(language?.newRecommendedHeader);
        setErrorCheck(false);
        navigation.navigate("PolicyRecommended");
      } catch (error) {
        toast(error?.data?.message, "error");
      }
    } else {
      toast(language?.fill_up_all_fields, code);
    }
  }
  // refetch
  // useEffect(() => {
  //   refetch();
  // }, []);
  //
  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language.newRecommendedHeader} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={[
          CONTAINER,
          {
            backgroundColor: "#ffffff",
          },
        ]}
      >
        <View style={styles.container}>
          {/* <CustomUserListDropDown
            isLoading={isLoading}
            data={allCustomers?.data?.users}
          /> */}
          {/* CustomUserListDropDown */}
          <TypeDropDown
            data={typeData}
            type={type}
            setType={(value) => {
              setType(value);
              setPolicyData(null);
            }}
            errorCheck={errorCheck}
            required={"1"}
            label={"Type"}
            placeholder={"Type"}
            disable={recommendedItem?.polType === "B2B" ? true : false}
          />
          {Object.keys(type).length > 0 && (
            <>
              {/* <TypeDropDown
                data={typeData}
                type={type}
                setType={(value) => {
                  setType(value);
                  setPolicyData(null);
                }}
                errorCheck={errorCheck}
                required={"1"}
                label={"Type"}
                placeholder={"Type"}
                disable={recommendedItem?.polType === "B2B" ? true : false}
              /> */}
              <RecommendedUsersList
                data={usersList?.data?.users?.data || []}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                required={"1"}
                label={language?.all_users}
              />

              <TypeDropDown
                data={categoriesPicker.current?.slice(0, 5)}
                type={policyCategory}
                setType={setPolicyCategory}
                errorCheck={errorCheck}
                required={"1"}
                label={language?.recommendedCategoryTitle}
                placeholder={language?.recommendedCategoryTitle}
                disable={recommendedItem?.polType === "B2B" ? true : false}
              />

              {recommendedItem?.polType === "B2B" ? (
                <>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      preset="h5"
                      style={{ color: COLOR.gray400, marginBottom: rh(0.9) }}
                    >
                      {"Recommended Policy"}
                    </Text>

                    <FontAwesome
                      name="asterisk"
                      size={rh(1)}
                      color="red"
                      style={{ marginTop: rh(0.7), marginLeft: rh(1) }}
                    />
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: COLOR.blue200,
                      paddingHorizontal: rh(2),
                      paddingVertical: rh(2),
                      borderRadius: 10,
                    }}
                  >
                    <Text preset="h4">{recommendedItem?.name}</Text>
                  </View>
                </>
              ) : Object.keys(policyCategory).length > 0 ? (
                <TypeDropDown
                  data={policyPicker.current}
                  type={policyData}
                  setType={setPolicyData}
                  errorCheck={errorCheck}
                  required={"1"}
                  label={language?.recommendedPolicyTitle}
                  placeholder={language?.recommendedPolicyTitle}
                />
              ) : null}
            </>
          )}
          <MediumButton
            onPress={handleRecommend}
            stylesButton={{
              width: "100%",
              borderRadius: rh(3),
              height: rh(6),
              marginBottom: 25,
              elevation: 2,
            }}
            loader={submitLoading}
            title={language.submitButtonText}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingTop: 10,
    marginBottom: rh(8),
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
    fontSize: 16,
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
    height: 46,
    borderColor: "#E5EAFF",
    borderRadius: rh(1),
    width: rw(60),
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
