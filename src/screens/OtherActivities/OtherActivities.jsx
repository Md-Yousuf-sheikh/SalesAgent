import { StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { CONTAINER, rh, rw } from "../../theme/Theme";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import ActivityButton from "../../components/Buttons/ActivityButton";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/language/languageSlice";

export default function OtherActivities() {
  const myDataUser = useSelector((state) => state?.auth.user);
  const language = useSelector(languageSelector);

  return (
    <View style={[CONTAINER]}>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language.otherActivitiesHeader} />
      <View style={styles.container}>
        <ActivityButton check={"a"} title={language.faqTitle} />
        {myDataUser?.userRole?.filter(
          (item, index) => item !== "Sales Executive"
        ).length > 0 && (
          <>
            <ActivityButton check={"b"} title={language.sendNotiButtonText} />
            <ActivityButton check={"c"} title={language.agentTrackTitle} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(3),
    paddingBottom: rh(3),
    paddingTop: rh(1),
    flex: 1,
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
