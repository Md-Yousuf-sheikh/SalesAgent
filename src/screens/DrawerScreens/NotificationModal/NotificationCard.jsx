import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { rf, rw, rh } from "../../../theme/Theme";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import moment from "moment/moment";
import { ToBnNum } from "../../../components/Helper/Helper";

export default function NotificationCard({ data, dateTime }) {
  const code = useSelector(codeSelector);
  const language = useSelector(languageSelector);
  const { type, items } = data;
  const nt = data;

  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} style={styles.card}>
        {type !== "auth" && (
          <Image
            source={{ uri: items?.image }}
            style={styles.notificationImage}
          />
        )}
        <View style={styles.cardBody}>
          {type === "auth" ? (
            <>
              <Text style={[styles.cardTitle, styles.welcomeTitle]}>
                {nt?.message}
              </Text>
              <Text style={[styles.cardTime, styles.welcomeUser]}>
                {items?.name}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.messageTitle}>
                {items?.title?.en || items?.title}
              </Text>
              {!items?.body && (
                <Text style={styles.cardTitle}>{nt?.message}</Text>
              )}
              {items?.body && (
                <View
                  style={{
                    maxWidth: rw(70),
                  }}
                >
                  <Text style={styles.cardTitle}>
                    {language?.message ?? "Message"}: {items?.body}
                  </Text>
                </View>
              )}

              <Text style={styles.cardStatus}>
                {/* {`${dateTime}`} */}
                {language?.dateTitle}:{" "}
                <Text
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  {/* {banglaDate(
                    moment(dateTime).format("DD/MM/YYYY, h:mm:ss a"),
                    code
                  )} */}
                  {ToBnNum(
                    moment(dateTime).format("DD/MM/YYYY, h:mm:ss a"),
                    code
                  )}
                </Text>
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: rh(2),
    paddingHorizontal: rw(4),
    paddingBottom: rh(9),
  },
  //   card
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E7E7E7",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#e7e7e780",
    borderRadius: 5,
    marginVertical: 5,
  },
  welcomeTitle: {
    fontSize: 15,
  },
  welcomeUser: {
    fontSize: 12,
  },
  cardBody: { paddingLeft: 10 },
  cardTime: {
    fontSize: rf(1.4),
    color: "#000000",
  },
  cardStatus: {
    fontSize: rf(1.4),
    color: "#000000",
    textTransform: "capitalize",
  },
  cardTitle: {
    color: "#000000",
    fontSize: rf(1.7),
  },
  messageTitle: {
    color: "#000000",
    fontSize: rf(1.7),
    fontWeight: "600",
  },
  cardIcon: {},
  notificationImage: {
    width: rw(8),
    height: rw(8),
    resizeMode: "contain",
  },
});
