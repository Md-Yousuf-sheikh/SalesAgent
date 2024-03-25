import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import SvgMenuIcon from "../../svg/SvgMenuIcon";
import { COLOR, rh, ROW, rw } from "../../theme/Theme";
import SvgRightArrow from "../../svg/SvgRightArrow";
import { useNavigation } from "@react-navigation/native";
import SvgUserIconOffline from "../../svg/SvgUserIconOffline";
import Text from "../Text/Text";
import AgentTargetCard from "../AgentTargetCard/AgentTargetCard";
import BellIcon from "../../../assets/bell-icon.svg";
import { userInfo } from "../../dummy/DummyData";
import NotificationModal from "../../screens/DrawerScreens/NotificationModal/NotificationModal";
import { useSelector } from "react-redux";
import { useGetUnreadNotificationsQuery } from "../../redux/features/notifications/notificationApiSlice";
// import AgentTargetCard from

export default function StatisticsHeader({ title }) {
  const navigation = useNavigation();
  const [IsVisible, setIsVisible] = useState(false);
  const myData = useSelector((state) => state?.user?.myData);
  const myUserData = useSelector((state) => state?.auth?.user);

  const { data: unRedNotifications, isLoading: unreadLoading } =
  useGetUnreadNotificationsQuery([myData?.agent?.uid]);

  console.log("unread", unRedNotifications);

  //  handel menu
  const handelDrawer = () => {
    navigation.openDrawer();
  };

  const handelNotification = () => {
    // navigation.navigate('SendNotification')
    setIsVisible(true);
  };
  // Waadaa Insure Menu

  return (
    <>
      <NotificationModal IsVisible={IsVisible} setIsVisible={setIsVisible} />
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
            </TouchableOpacity>
            <View>
              <Text color={COLOR.white} preset="h3">
                {myUserData?.full_name}
              </Text>
              <Text color={COLOR.white} preset="h4">
                Id: {myUserData?.uid}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handelNotification}
            style={{ flexDirection: "row" }}
          >
            <BellIcon />
            <TouchableOpacity
              style={{
                zIndex: 1,
                bottom: rh(0.6),
                right: rh(1),
                height: rh(1.5),
                width: rh(1.5),
                backgroundColor: "red",
                borderRadius: rh(1),
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
    paddingVertical: rh(1),
    alignItems: "flex-start",
    height: rh(9),
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
    height: rh(5),
    width: rh(5),
    resizeMode: "contain",
    borderRadius: 50,
  },
});
