import {
  FlatList,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Text from "../../../components/Text/Text";
import { COLOR, CONTAINER, rh, ROW, rw } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import InputText from "../../../components/Inputs/InputText";
import MediumButton from "../../../components/Buttons/MediumButton";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ContactUsScreen() {
  const [Name, setName] = useState("");
  const [Number, setNumber] = useState("");
  const [Description, setDescription] = useState("");
  // number
  const handelOpenNumberPad = (number) => {
    Linking.openURL(`tel:${number}`);
  };
  // email
  const handelOpenEmail = (email) => {
    Linking.openURL(
      `mailto:${email}?subject=waadaa.insure&body=Your Problem write here`
    );
  };
  // location
  const handelOpenMap = () => {
    Linking.openURL(
      `https://www.google.com/maps/search/SKA+Tower,+Plot+67+%26+68+Kemal+Ataturk+Avenue,+Banani+Model+Town,Dhaka/@23.7943435,90.4019666,17z/data=!3m1!4b1`
    );
  };

  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={"Contact Us"} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={CONTAINER}
      >
        <View>
          <View style={styles.container}>
            <Text preset="h1" color={"#595959"} style={styles.title}>
              Contact Us
            </Text>
            <Text preset="h5" color={"#595959"} style={styles.smallText}>
              We'd love to hear from you
            </Text>
            {/* Filed */}
            <InputText
              setValue={setName}
              markHide={true}
              placeholder={"Your Name"}
              styleInput={{ borderRadius: 4 }}
            />
            <InputText
              setValue={setNumber}
              markHide={true}
              placeholder={"Contact Number"}
              styleInput={{ borderRadius: 4 }}
            />
            <InputText
              setValue={setDescription}
              markHide={true}
              placeholder={"Write Something..."}
              description={true}
              styleInput={{ borderRadius: 4 }}
            />
            {/* Button */}
            <MediumButton title={"Submit"} />

            {/* Contact details */}
            <View style={styles.contactDetailsContainer}>
              {/* location */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  handelOpenMap();
                }}
                style={styles.contactDetails}
              >
                <Ionicons
                  name="location-sharp"
                  size={19}
                  style={styles.contactDetailsIcon}
                />
                <Text
                  preset="h5"
                  color={"#646464"}
                  style={styles.contactDetailsText}
                >
                  SKA Tower, Plot 67 & 68 Kemal Ataturk Avenue, Banani Model
                  Town, Dhaka
                </Text>
              </TouchableOpacity>
              {/* Phone */}
              <View style={styles.contactDetails}>
                <MaterialCommunityIcons
                  name="phone-incoming"
                  size={19}
                  style={styles.contactDetailsIcon}
                />
                <View>
                  {/* Number 1 */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      handelOpenNumberPad("01313494700");
                    }}
                  >
                    <Text
                      preset="h5"
                      color={"#646464"}
                      style={styles.contactDetailsText}
                    >
                      +8801313494700
                    </Text>
                  </TouchableOpacity>
                  {/* Number 2 */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      handelOpenNumberPad("01778903406");
                    }}
                  >
                    <Text
                      preset="h5"
                      color={"#646464"}
                      style={styles.contactDetailsText}
                    >
                      +8801778903406
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Email */}
              <View style={styles.contactDetails}>
                {/*  Email icon */}
                <MaterialIcons
                  name="email"
                  size={19}
                  style={styles.contactDetailsIcon}
                />
                <View>
                  {/* Email 1 */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      handelOpenEmail("info@waadaa.insure");
                    }}
                  >
                    <Text
                      preset="h5"
                      color={"#646464"}
                      style={styles.contactDetailsText}
                    >
                      info@waadaa.insure
                    </Text>
                  </TouchableOpacity>
                  {/* Email 2 */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      handelOpenEmail("hr.head@waadaa.insure");
                    }}
                  >
                    <Text
                      preset="h5"
                      color={"#646464"}
                      style={styles.contactDetailsText}
                    >
                      hr.head@waadaa.insure
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Follow Us*/}
            <View style={styles.socialMediaContainer}>
              <Text preset="h2" color={"#646464"}>
                Follow Us
              </Text>
              {/* facebook */}
              <TouchableOpacity>
                <FontAwesome5
                  name="facebook"
                  size={30}
                  style={styles.socialIcon}
                  color="#3b5998"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="instagram-with-circle"
                  size={30}
                  style={styles.socialIcon}
                  color="#E4405F"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="linkedin-with-circle"
                  size={30}
                  style={styles.socialIcon}
                  color="#0a66c2"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="youtube-with-circle"
                  size={30}
                  style={styles.socialIcon}
                  color="#ff0000"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    lineHeight: 50,
  },
  smallText: {
    lineHeight: 21,
    fontWeight: "400",
    width: "95%",
  },
  // contactDetails
  contactDetailsContainer: {
    marginTop: rh(4),
  },
  contactDetails: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  contactDetailsIcon: {
    color: "#646464",
    paddingRight: 5,
    marginTop: 2,
  },
  contactDetailsText: {
    lineHeight: 21,
  },
  // socialMediaContainer
  socialMediaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: rh(2),
    paddingBottom: rh(2),
  },
  socialIcon: {
    paddingHorizontal: rw(2),
  },
});
