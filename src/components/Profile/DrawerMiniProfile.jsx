import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "../Text/Text";
import { COLOR, rh, rw } from "../../theme/Theme";
import { useSelector } from "react-redux";

export default function DrawerMiniProfile({ props }) {
  const user = "l.knm";
  const myData = useSelector((state) => state?.user?.myData);
  return (
    <>
      <View style={styles.container}>
        {user ? (
          <>
            <View style={styles.avatarContainer}>
              <View>
                <Image
                  source={
                    myData?.agent?.image?.link
                      ? { uri: myData?.agent?.image?.link }
                      : require("../../../assets/user.png")
                  }
                  style={styles.avatar}
                />
                <View style={styles.activeDot} />
              </View>
              <View>
                <Text preset="h3" color={"#ffffff"}>
                  {myData?.agent?.full_name}
                </Text>
                <Text preset="h5" color={"#ffffff"}>
                  {"Id: "}
                  {myData?.agent?.uid}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <Text
            style={{ paddingVertical: rh(1.2) }}
            preset="h2"
            color={"#2253A5"}
          >
            Waadaa Insure<Text> Menu</Text>
          </Text>
        )}
        {/* Close Button */}
        {/* <TouchableOpacity
          onPress={() => props.navigation.toggleDrawer()}
          style={styles.close}
        >
          <SvgClose />
        </TouchableOpacity> */}
      </View>
      {/* My dashboard */}
      {/* {user && (
        <>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.myDashboardContainer}
          >
            <Svg width={24} height={15} fill="none">
              <Path
                d="M8.47.25H16v5.118H8.47V.25Zm0 14.5V6.22H16v8.53H8.47Zm-8.47 0V9.632h7.53v5.118H0Zm0-5.97V.25h7.53v8.53H0Zm.941-7.677v6.823h5.647V1.103H.941Zm8.47 0v3.412h5.648V1.103H9.412Zm0 5.97v6.824h5.648V7.074H9.412Zm-8.47 3.412v3.412h5.647v-3.412H.941Z"
                fill="#0A3977"
              />
            </Svg>
            <Text style={styles.dashboardText}>My Dashboard</Text>
          </TouchableOpacity>
        </>
      )} */}
      <View style={styles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: rh(3),
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: rh(5),
    height: rh(5),
    resizeMode: "cover",
    borderRadius: rh(5),
    marginRight: rh(1.2),
    borderWidth: rh(0.1),
    borderColor: "#fff",
  },
  activeDot: {
    width: rh(1.2),
    height: rh(1.2),
    backgroundColor: "#009D35",
    borderRadius: rh(1.2),
    position: "absolute",
    right: rh(1.2),
    borderWidth: rh(0.15),
    borderColor: "#fff",
  },
  close: {
    alignSelf: "stretch",
  },
  // myDashboardContainer
  myDashboardContainer: {
    flexDirection: "row",
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderColor: "#0089ED",
    marginBottom: 10,
  },
  dashboardText: {
    color: "#4F4F4F",
    // lineHeight: 18,
    letterSpacing: 1,
  },
  line: {
    height: rh(0.2),
    width: "100%",
    backgroundColor: "#dddd",
    marginVertical: rh(0.7),
  },
});
