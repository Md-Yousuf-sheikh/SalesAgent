import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLOR, rf, rh, rw } from "../../theme/Theme";
import SvgRightArrow from "../../svg/SvgRightArrow";
import { useNavigation } from "@react-navigation/native";
import BellIcon from "../../../assets/bell-icon.svg";
import NotificationModal from "../../screens/DrawerScreens/NotificationModal/NotificationModal";
import { useDispatch, useSelector } from "react-redux";
import FloatingCompare from "./FloatingCompare";
import { useEffect } from "react";
import * as Location from "expo-location";
import { useSubmitLocationMutation } from "../../redux/features/customer/customerApiSlice";
import axios from "axios";
import { useLazyGetMyInfoQuery } from "../../redux/features/user/userApiSlice";
import { setMyData } from "../../redux/features/user/userSlice";
import { useGetUnreadNotificationsQuery } from "../../redux/features/notifications/notificationApiSlice";
import { MAP_KEY } from "../../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { languageSelector } from "../../redux/features/language/languageSlice";
import CompareOfferModal from "../../screens/DrawerScreens/HomeScreen/CompareModal";
import { StatusBar } from "react-native";

export default function DrawerHeader({ title, nav, test, startIcon = true }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const languageState = useSelector(languageSelector);
  const myData = useSelector((state) => state?.user?.myData);
  const myUserData = useSelector((state) => state?.auth?.user);

  //  notification modal
  const [IsVisible, setIsVisible] = useState(false);
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [submitLocation, { isLoading }] = useSubmitLocationMutation();
  const [getMyData] = useLazyGetMyInfoQuery();
  const { data: unRedNotifications, isLoading: unreadLoading } =
    useGetUnreadNotificationsQuery([myData?.agent?.uid]);

  //  handel menu
  const handleDrawer = () => {
    navigation.toggleDrawer();
  };
  // handelNavigation
  const handelNavigation = () => {
    if (!nav) {
      navigation.goBack();
    } else {
      navigation.navigate(nav);
    }
  };

  // handelNotification
  const handelNotification = () => {
    setIsVisible(true);
  };

  // Geo Location permission
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      Location.setGoogleApiKey(MAP_KEY);

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  //  Location Api Call to get current user location
  useEffect(() => {
    async function locationApiCall() {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            location.coords.latitude +
            "," +
            location.coords.longitude +
            "&key=" +
            MAP_KEY
        )
        .then((res) => {
          setAddress(res?.data?.results[0]?.formatted_address);
          // console.log("ressss", res);
        })
        .catch((err) => console.log("errOfNow", err));
    }
    if (location) {
      locationApiCall();
    }
  }, [location]);

  const submitCurLocation = async () => {
    let data = {
      location: {
        name: address,
      },
      agent_id: myUserData?.id,
    };
    try {
      const res = await submitLocation(data).unwrap();
      console.log("submitCurLocation", res);
    } catch (error) {
      console.log("timetrack", error);
    }
  };

  useEffect(() => {
    // Function to get the current date and time as a timestamp.
    function getCurrentTimestamp() {
      return new Date().getTime();
    }
    //
    async function checkAndSubmitLocation() {
      const savedTimestamp = await AsyncStorage.getItem("savedTimestamp");

      if (!savedTimestamp) {
        // If there is no saved timestamp, save the current timestamp and submit the location.
        await AsyncStorage.setItem(
          "savedTimestamp",
          getCurrentTimestamp().toString()
        );
        submitCurLocation();
      } else {
        const currentTime = getCurrentTimestamp();
        const savedTime = parseInt(savedTimestamp, 10);

        // Check if 1 hour (3600,000 milliseconds) has passed.
        if (currentTime - savedTime >= 3600000) {
          await AsyncStorage.setItem("savedTimestamp", currentTime.toString());
          submitCurLocation();
        }
      }
    }
    // Call checkAndSubmitLocation when the component mounts.
    if (address !== undefined) {
      checkAndSubmitLocation();
    }

    // Set an interval to periodically call checkAndSubmitLocation.
    const intervalId = setInterval(checkAndSubmitLocation, 500000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [address]);

  // get my personal
  useEffect(() => {
    const getCustomers = async () => {
      // const filter = `?duration=monthly`
      try {
        const res = await getMyData().unwrap();
        // console.log("CustomerDetails ->", res);
        dispatch(setMyData(res));
      } catch (error) {
        console.log("Error_get_myInfo", error);
      }
    };
    getCustomers();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <FloatingCompare />
      <CompareOfferModal />
      <NotificationModal IsVisible={IsVisible} setIsVisible={setIsVisible} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {title !== languageState.policyCategoryHeaderText &&
            test !== "independent" &&
            title !== languageState.myAccountHeader &&
            title !== languageState?.salesCampaignHeader && (
              <TouchableOpacity onPress={handelNavigation} activeOpacity={0.8}>
                {startIcon && <SvgRightArrow />}
              </TouchableOpacity>
            )}
          <Text style={styles.title}>{title}</Text>
        </View>
        {/*  */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={handelNotification}
            style={{ flexDirection: "row", right: rh(2.5), marginTop: rh(0.5) }}
          >
            <BellIcon />
            <TouchableOpacity
              style={{
                zIndex: 1,
                bottom: rh(0.6),
                right: rh(1),
                height: rh(1.8),
                width: rh(1.8),
                backgroundColor: "red",
                borderRadius: rh(1.2),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handelNotification}
            >
              <Text style={{ fontSize: rh(1.1), color: COLOR.white }}>
                {unRedNotifications !== undefined ? unRedNotifications[0] : 0}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDrawer}
            style={styles.userImageContainer}
          >
            <Image
              source={
                myData?.agent?.image?.link
                  ? { uri: myData?.agent?.image?.link }
                  : require("../../../assets/user.png")
              }
              style={styles.userImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2253a5",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: rw(4),
    alignItems: "center",
    height: rh(9),
  },
  userImage: {
    height: rh(4),
    width: rh(4),
    resizeMode: "cover",
    borderRadius: rh(1.2),
  },
  policyCart: {
    height: rh(3.2),
    width: rh(3.2),
    resizeMode: "contain",
    borderRadius: rh(3.2),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginLeft: rh(1.2),
    color: "#ffff",
    fontSize: rf(2.2),
  },
});
