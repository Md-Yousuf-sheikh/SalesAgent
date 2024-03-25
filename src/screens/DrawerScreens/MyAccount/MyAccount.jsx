import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CONTAINER, rh, rw } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MediumButton from "../../../components/Buttons/MediumButton";
import ImageUploderModal from "./ImageUploderModal";
import { useDispatch, useSelector } from "react-redux";
import DemoTextInput from "../../../components/Inputs/DemoTextInput";
import { useNavigation } from "@react-navigation/core";
import {
  useAgentDpUploadMutation,
  useLazyGetMyInfoQuery,
} from "../../../redux/features/user/userApiSlice";
import { setMyData } from "../../../redux/features/user/userSlice";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { languageSelector } from "../../../redux/features/language/languageSlice";
import useShowToastMessage from "../../../hooks/useShowToastMessage";
export default function MyAccount() {
  const dispatch = useDispatch();
  const toast = useShowToastMessage();
  const [profilePic, setProfilePic] = useState();
  const language = useSelector(languageSelector);
  const myData = useSelector((state) => state?.user?.myData);
  const [getMyData] = useLazyGetMyInfoQuery();
  const [uploadProfilePicture, { isLoading }] = useAgentDpUploadMutation();
  const navigation = useNavigation();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  const handleBackButtonClick = () => {
    if (prevRoute?.name) {
      navigation.navigate(prevRoute);
    } else {
      navigation.navigate("Home", "HomeStack");
    }
    return true;
  };

  async function handleUpload() {
    let formData = new FormData();

    let data = {
      name: profilePic?.name,
      type: profilePic?.mimeType,
      uri: profilePic?.uri,
    };
    formData.append("image", data);

    try {
      const res = await uploadProfilePicture(formData).unwrap();
      toast(res?.message);
      const getCustomers = async () => {
        try {
          const res = await getMyData().unwrap();
          dispatch(setMyData(res));
        } catch (error) {
          console.log("error", error);
        }
      };
      getCustomers();
      setProfilePic(null);
    } catch (error) {
      console.log("error", error);
      toast("Could not upload");
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  //
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Do something when the screen blurs
      const getCustomers = async () => {
        // const filter = `?duration=monthly`
        try {
          const res = await getMyData().unwrap();
          // console.log("dispatchRes", res);
          dispatch(setMyData(res));
        } catch (error) {
          console.log("error", error);
        }
      };
      getCustomers();
    });

    return unsubscribe;
  }, [navigation]);
  //
  return (
    <>
      <DrawerHeader title={language.myAccountHeader} />
      <StatusBar backgroundColor={"#2253a5"} />
      <KeyboardAwareScrollView
        style={[
          CONTAINER,
          {
            backgroundColor: "#fff",
          },
        ]}
      >
        <View style={styles.container}>
          {profilePic ? (
            <>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.cardNidImage}
                  source={{ uri: profilePic?.uri }}
                />
                {/* <Text>{profilePic?.name}</Text> */}
                <TouchableOpacity
                  style={{ right: rh(1.5), bottom: rh(0.5) }}
                  onPress={() => {
                    setProfilePic(null);
                  }}
                >
                  <AntDesign name="closecircle" size={20} color="#898A8D" />
                </TouchableOpacity>
              </View>
              <MediumButton
                onPress={handleUpload}
                loader={isLoading}
                title={language.uploadPictureTitle}
              />
            </>
          ) : (
            <ImageUploderModal setValue={setProfilePic} />
          )}
          {/* InputText */}
          <DemoTextInput
            label={language.nameTitle}
            value={
              myData?.agent?.full_name
                ? myData?.agent?.full_name
                : language.nameTitle
            }
          />
          <DemoTextInput
            label={language.contactNoTextInput}
            value={
              myData?.agent?.contact_number
                ? myData?.agent?.contact_number
                : language.contactNoTextInput
            }
          />
          <DemoTextInput
            label={language.emailTextInput}
            value={
              myData?.agent?.email
                ? myData?.agent?.email
                : language.emailPlaceHolderText
            }
          />
          {myData?.supervisor?.full_name && (
            <DemoTextInput
              label={language.nameOfHeadTextInput}
              value={
                myData?.supervisor?.full_name
                  ? myData?.supervisor?.full_name
                  : language.nameOfHeadTextInput
              }
            />
          )}
          <DemoTextInput
            label={language.salesPersonTextInput}
            value={myData?.agent?.uid ? myData?.agent?.uid : "0000 000 000 00"}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingBottom: rh(10),
  },
  cardNidImage: {
    width: rh(10),
    height: rh(10),
    resizeMode: "cover",
    borderRadius: 8,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: rh(3),
  },
});
