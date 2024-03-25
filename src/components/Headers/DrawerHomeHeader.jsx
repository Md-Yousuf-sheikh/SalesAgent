import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { COLOR, rh, rw, rf } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";
import Text from "../Text/Text";
import AgentTargetCard from "../AgentTargetCard/AgentTargetCard";
import BellIcon from "../../../assets/bell-icon.svg";
import NotificationModal from "../../screens/DrawerScreens/NotificationModal/NotificationModal";
import { useDispatch, useSelector } from "react-redux";
import FloatingCompare from "./FloatingCompare";
import * as Location from "expo-location";
import { useEffect } from "react";
import axios from "axios";
import { useSubmitLocationMutation } from "../../redux/features/customer/customerApiSlice";
import { setMyData } from "../../redux/features/user/userSlice";
import { useLazyGetMyInfoQuery } from "../../redux/features/user/userApiSlice";
import {
  useGetLocationConfigQuery,
  useGetUnreadNotificationsQuery,
} from "../../redux/features/notifications/notificationApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MAP_KEY } from "../../utils/config";
import { useGetTranslationMutation } from "../../redux/features/language/languageApiSlice";
import {
  codeSelector,
  setTranslate,
} from "../../redux/features/language/languageSlice";
import CompareOfferModal from "../../screens/DrawerScreens/HomeScreen/CompareModal";
import { selectAuthUser } from "../../redux/features/auth/authSlice";

export default function DrawerHomeHeader({ targetDatas }) {
  // State
  const code = useSelector(codeSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [IsVisible, setIsVisible] = useState(false);
  const authUser = useSelector(selectAuthUser);

  //location
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const myData = useSelector((state) => state?.user?.myData);
  const myUserData = useSelector((state) => state?.auth?.user);

  //  APIS
  const [submitLocation] = useSubmitLocationMutation();
  const [getMyData, { error }] = useLazyGetMyInfoQuery();
  const { data: locationConfigData } = useGetLocationConfigQuery();
  const { data: unRedNotifications } = useGetUnreadNotificationsQuery([
    authUser?.agent?.uid,
  ]);
  const [getTranslation] = useGetTranslationMutation();

  // get translation
  const fetchData = useCallback(async () => {
    try {
      const [response, responseFormFields] = await Promise.all([
        getTranslation({ query: `lang=${code}&platform=customerWebsite` }),
        getTranslation({ query: `lang=${code}&platform=formFields` }),
      ]);

      const mergeTranslate = { ...response, ...responseFormFields };
      const translatedData = mergeTranslate || {};

      dispatch(setTranslate(translatedData));
    } catch (error) {
      // Handle errors more gracefully, e.g., show a notification or dispatch an error action
      console.error(error);
    }
  }, [code, getTranslation, dispatch, setTranslate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //  handel menu
  const handelDrawer = () => {
    navigation.openDrawer();
  };

  // handelNotification
  const handelNotification = () => {
    setIsVisible(true);
  };

  // locationConfig time or date
  const locationConfig = {
    end: locationConfigData?.end,
    interval: locationConfigData?.interval * 1000,
    start: locationConfigData?.start,
  };

  // get Permissions
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

  // location Ap Call
  const locationApiCall = async () => {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          location?.coords?.latitude +
          "," +
          location?.coords?.longitude +
          "&key=" +
          MAP_KEY
      )
      .then((res) => {
        setAddress(res?.data?.results?.[0]?.formatted_address);
      })
      .catch((err) => console.log("errOfNow", err));
  };
  //
  useEffect(() => {
    if (location) {
      locationApiCall();
    }
  }, [location]);

  // get Current Time stamp
  const getCurrentTimestamp = () => new Date().getTime();

  // check And Submit Location
  useEffect(() => {
    async function checkAndSubmitLocation() {
      const savedTimestamp = await AsyncStorage.getItem("savedTimestamp");
      const currentTime = getCurrentTimestamp();

      if (!savedTimestamp) {
        // If there is no saved timestamp, save the current timestamp and submit the location.
        await AsyncStorage.setItem("savedTimestamp", currentTime.toString());
        submitCurLocation();
      } else {
        const savedTime = parseInt(savedTimestamp, 10);

        if (
          currentTime - savedTime >= locationConfig?.interval &&
          isCurrentTimeInRange(locationConfig) &&
          currentTime <= parseTimeToTimestamp(locationConfig?.end)
        ) {
          await AsyncStorage.setItem("savedTimestamp", currentTime.toString());
          submitCurLocation();
        }
      }
    }
    // address
    if (address !== undefined && address !== null) {
      checkAndSubmitLocation();
      console.log("address", address);
    }
    const intervalId = setInterval(checkAndSubmitLocation, 500000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [address]);

  // parseTimeToTimestamp
  const parseTimeToTimestamp = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    const timestamp = new Date();
    timestamp.setHours(
      parseInt(hours, 10),
      parseInt(minutes, 10),
      parseInt(seconds, 10),
      0
    );
    return timestamp.getTime();
  };
  // isCurrentTimeInRange
  const isCurrentTimeInRange = (config) => {
    const currentTime = getCurrentTimestamp();
    const startTime = parseTimeToTimestamp(config?.start);
    const endTime = parseTimeToTimestamp(config?.end);
    return currentTime >= startTime && currentTime <= endTime;
  };
  //  submitCurLocation
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
    const fetchData = async () => {
      try {
        const res = await getMyData().unwrap();
        dispatch(setMyData(res));
      } catch (error) {
        // console.log("get_customers EEEEEEE -->", error);
      }
    };
    fetchData();

    return () => {};
  }, []);

  return (
    <>
      <FloatingCompare />
      <CompareOfferModal />
      <NotificationModal IsVisible={IsVisible} setIsVisible={setIsVisible} />

      <View style={{ height: rh(30) }}>
        <View style={[styles.container]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: rw(90),
              marginHorizontal: rw(1),
            }}
          >
            <View style={styles.titleContainer}>
              <TouchableOpacity
                onPress={handelDrawer}
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
                <View style={styles.activeDot} />
              </TouchableOpacity>
              <View>
                <Text color={COLOR.white} preset="h3">
                  {myData?.agent?.full_name}
                </Text>
                <Text color={COLOR.white} preset="h4">
                  Id: {myData?.agent?.uid}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handelNotification}
              style={{ flexDirection: "row" }}
            >
              <BellIcon />
              <View
                style={{
                  zIndex: 1,
                  bottom: rh(0.6),
                  right: rh(1),
                  height: rh(2.5),
                  width: rh(2.5),
                  backgroundColor: "red",
                  borderRadius: rh(2.5),
                  alignItems: "center",
                  justifyContent: "center",
                  // paddingBottom: rh(0.5),
                }}
                // onPress={handelNotification}
              >
                <Text
                  style={{
                    fontSize: rf(1),
                    color: COLOR.white,
                  }}
                >
                  {unRedNotifications !== undefined ? unRedNotifications[0] : 0}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Target Card */}
        <AgentTargetCard targetDatas={targetDatas} />
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
    paddingVertical: rh(1),
    alignItems: "flex-start",
    height: rh(22),
    borderBottomLeftRadius: rh(1.7),
    borderBottomRightRadius: rh(1.7),
  },
  activeDot: {
    width: rh(1.2),
    height: rh(1.2),
    backgroundColor: "#009D35",
    borderRadius: rh(1.2),
    position: "absolute",
    right: rh(0),
    borderWidth: rh(0.15),
    borderColor: "#fff",
  },
  resetPassModal: {
    height: rh(15),
    width: rw(85),
    alignSelf: "center",
    backgroundColor: COLOR.white,
    position: "absolute",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 5,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftWidth: 0,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: COLOR.white,
    borderLeftColor: "transparent",
    right: rh(26.5),
    top: rh(3),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: rh(0.5),
  },
  title: {
    marginLeft: 12,
    color: "#ffff",
    fontSize: 18,
  },
  //   logo
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  userImageContainer: {
    marginRight: rh(2),
  },
  userImage: {
    height: rh(4),
    width: rh(4),
    resizeMode: "cover",
    borderRadius: rh(4),
    // bottom: rh(0.2),
  },
  policyCart: {
    height: rh(3.2),
    width: rh(3.2),
    resizeMode: "contain",
    borderRadius: rh(3.2),
    bottom: rh(0.2),
  },
});
