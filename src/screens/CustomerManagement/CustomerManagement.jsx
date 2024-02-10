import {
  FlatList,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { COLOR, CONTAINER, rf, rh, ROW, rw } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import { categoriesData, totalData } from "../../dummy/DummyData";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import ActivityButton from "../../components/Buttons/ActivityButton";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllCustomersQuery } from "../../redux/features/customer/customerApiSlice";
import { setAllCustomers } from "../../redux/features/customer/customerSlice";
import { useEffect } from "react";

export default function CustomerManagement() {
  //   const [selectedCategory, setSelectedCategory] = useState(catagoriesData[0])
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleNavigation = (name) => {
    console.log("hela");
    navigation.navigate(name);
  };
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );
  const myDataUser = useSelector((state) => state?.auth?.user);

  // const customerState = useSelector(state => state?.customer)
  const [getAllCus, { isLoading }] = useLazyGetAllCustomersQuery();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Do something when the screen blurs
      const getCustomers = async () => {
        const filter = `?page=${1}`;
        try {
          const res = await getAllCus().unwrap();
          dispatch(setAllCustomers(res));
        } catch (error) {
          console.log("error", error);
        }
      };
      getCustomers();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View
      style={{ backgroundColor: COLOR.white, paddingBottom: rh(3), flex: 1 }}
    >
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={languageState.customerManagementHeader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={styles.container}
      >
        <>
          {totalData?.map((item, index) => {
            if (
              myDataUser?.userRole?.filter(
                (item, index) => item !== "Sales Executive"
              ).length > 0
            ) {
              return (
                <ActivityButton
                  key={index}
                  img={item?.img}
                  title={item?.name}
                  textStyle={{ fontSize: rf(1.9) }}
                  data={item}
                  ImageStyle={{
                    width: rh(2.3),
                    height: rh(2.3),
                    resizeMode: "contain",
                  }}
                />
              );
            } else {
              if (item?.id !== 10) {
                return (
                  <ActivityButton
                    key={index}
                    img={item?.img}
                    title={item?.name}
                    textStyle={{ fontSize: rf(1.9) }}
                    data={item}
                    ImageStyle={{
                      width: rh(2.3),
                      height: rh(2.3),
                      resizeMode: "contain",
                    }}
                  />
                );
              }
            }
          })}
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: rw(3),
    marginTop: rh(1),
    marginBottom: rh(5),
    // paddingTop: rh(3),
    // paddingBottom: rh(200),
    // paddingVertical: rh(3),
    // marginBottom: rh(1),
    // marginBottom: rh(35),
    // flex: 1,
    // resizeMode: 'contain',
    // minHeight: '100%',
    // flex: 1,
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
