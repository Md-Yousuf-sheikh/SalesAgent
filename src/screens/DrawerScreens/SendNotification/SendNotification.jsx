import { Keyboard, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CONTAINER, rh, rw } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import InputText from "../../../components/Inputs/InputText";
import MediumButton from "../../../components/Buttons/MediumButton";
import { useSelector } from "react-redux";
import {
  useGetWholeExecutiveTreesQuery,
  useSendPushNotificationsMutation,
} from "../../../redux/features/customer/customerApiSlice";
import { languageSelector } from "../../../redux/features/language/languageSlice";
import CustomMultiSelectDropDown from "../../../components/Inputs/CustomMultiSelectDropDown";
import SkeletonSendNotifaction from "../../../components/Skeleton/SkeletonSendNotifaction";
import useShowToastMessage from "../../../hooks/useShowToastMessage";

export default function SendNotification() {
  const language = useSelector(languageSelector);
  const toast = useShowToastMessage();

  // state
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [agentList, setAgentList] = useState([0]);
  const [loading, setLoading] = useState(true);
  //
  //
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  //
  today = yyyy + "-" + mm + "-" + dd;

  let paramDataa = `?from=2023-01-01&to=${today}`;
  //  APIS
  const { data, isLoading: isLoadExecutive } = useGetWholeExecutiveTreesQuery([
    paramDataa,
  ]);
  const [sendPushNotification, { isLoading }] =
    useSendPushNotificationsMutation();

  const newData = data?.map((option) => ({
    value: option?.executive?.id,
    label: option?.executive?.full_name,
  }));
  useEffect(() => {
    if (!isLoadExecutive && data) {
      setLoading(false);
    }
  }, [isLoadExecutive, data]);
  //

  console.log("Executive", data);

  const agentValue = data?.map((option) => option?.executive?.id);
  // handelSendMessage
  const handelSendMessage = async () => {
    Keyboard.dismiss();
    //
    const body = {
      title: title,
      body: description,
      type: 1,
      user_ids: agentList?.includes(0) ? agentValue : agentList,
    };
    try {
      const res = await sendPushNotification(body).unwrap();
      toast(res?.message);
    } catch (error) {
      toast(error?.data?.message, "error");
    }
  };

  //
  return (
    <View style={CONTAINER}>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language.sendNotiTitle} />
      <View style={styles.content}>
        {loading ? (
          <SkeletonSendNotifaction />
        ) : (
          <>
            <CustomMultiSelectDropDown
              label={language?.registeredAgentsTitle}
              valueProps={(value) => {
                setAgentList(value);
              }}
              defaultValue={[0]}
              data={[
                {
                  label: language?.all,
                  value: 0,
                },
              ]?.concat(newData)}
            />
            <InputText
              label={"Body"}
              description={true}
              setValue={setDescription}
              markHide={true}
              placeholder={language.typeYourPlaceHolder}
            />
            <InputText
              label={"Title"}
              setValue={setTitle}
              markHide={true}
              placeholder={language.typeYourPlaceHolder}
            />
            <MediumButton
              title={language.sendNotiButtonText}
              stylesButton={{
                width: rw(90),
                borderRadius: 30,
                paddingVertical: rh(1.8),
              }}
              onPress={handelSendMessage}
              loader={isLoading}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: rh(1),
    paddingHorizontal: rw(3),
  },
});
