import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Text from "../../../components/Text/Text";
import { Ionicons } from "@expo/vector-icons";
import { rh, ROW, rw } from "../../../theme/Theme";
import { useSelector } from "react-redux";
import {
  useGetAllNotificationsQuery,
  useRedAllNotificationQuery,
} from "../../../redux/features/notifications/notificationApiSlice";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import NotificationCard from "./NotificationCard";

export default function NotificationModal({ setIsVisible, IsVisible }) {
  const languageState = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const navigation = useNavigation();
  const myData = useSelector((state) => state?.user?.myData);

  const { data: allNotifications } = useGetAllNotificationsQuery({
    userUid: myData?.agent?.uid,
    code,
  });
  const {} = useRedAllNotificationQuery(myData?.agent?.uid);

  // handel notification
  async function handleOnPress(value) {
    if (value?.data?.notificationType === "purchase") {
      if (value?.data?.status === "Active") {
        setIsVisible(false);
        navigation.navigate("PolicySold");
      }
    }
  }
  //
  return (
    <Modal transparent={true} visible={IsVisible} animationType="slide">
      <View style={styles.container}>
        <View>
          {/* header */}
          <View style={styles.header}>
            {/* Image */}
            <View style={ROW}>
              <Image
                source={
                  myData?.agent?.image?.link
                    ? { uri: myData?.agent?.image?.link }
                    : require("../../../../assets/user.png")
                }
                style={styles.headerImage}
              />
              <Text preset="LL" style={styles.headerTitle}>
                {languageState.notificationTitle}
              </Text>
            </View>
            {/* Close Icon */}
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Ionicons name="close-sharp" size={32} color="black" />
            </TouchableOpacity>
          </View>
          {/* body */}
          <FlatList
            data={allNotifications?.data ? allNotifications?.data : data}
            renderItem={({ item }) => {
              return (
                <NotificationCard
                  data={item?.data}
                  dateTime={item?.updated_at}
                />
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: rw(4),
    paddingVertical: rh(2),
    // width: rw(90),
    // alignSelf: 'flex-end',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 15,
    borderColor: "#E7E7E7",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: "800",
    marginLeft: 10,
  },
  headerImage: {
    width: 38,
    height: 38,
    borderRadius: 38,
    resizeMode: "contain",
  },
  //    card
  card: {
    flexDirection: "row",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#E7E7E7",
    alignItems: "center",
  },
  cardImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 10,
  },
  cardTitle: {
    color: "#444444e5",
    fontWeight: "500",
  },
  cardName: {
    color: "#444444",
    fontWeight: "800",
  },
  cardTime: {
    color: "#444444",
    fontSize: 10,
    marginTop: rh(1),
  },
});

const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
];
