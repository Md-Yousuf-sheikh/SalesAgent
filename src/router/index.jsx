import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  selectAuthUser,
  selectReAuthCheck,
  selectToken,
  setCredentials,
} from "../redux/features/auth/authSlice";
import { useFcmTokenUpdateMutation } from "../redux/features/auth/authApiSlice";
import AuthRouts from "./AuthRoutes";
import LayoutRoutes from "./LayoutRoutes";

export default function MainRoutes() {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);
  const token = useSelector(selectToken);
  const reAuth = useSelector(selectReAuthCheck);
  //  FCM
  const [submitFcmToken] = useFcmTokenUpdateMutation();
  useEffect(() => {
    const getData = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token");
        const pushToken = await AsyncStorage.getItem("push_token");
        const user = await AsyncStorage.getItem("user");
        //notification token submit
        if (authUser) {
          try {
            const data = {
              userUid: authUser?.uid,
              token: pushToken ? pushToken : authUser?.fcm_token ?? "not valid",
            };
            const res = await submitFcmToken(data).unwrap();
            console.log("submitFcmToken", res);
          } catch (error) {
            console.log("errorOfFcm", error);
          }
        }
        if (!token && reAuth !== "final" && userToken && user) {
          dispatch(
            setCredentials({ token: userToken, user: JSON.parse(user) })
          );
        } else if (!token && reAuth === "final") {
          const userToken = await AsyncStorage.removeItem("token");
          const user = await AsyncStorage.removeItem("user");
        }
      } catch (e) {
        // error reading value
        console.log("error", e);
      }
    };
    getData();
  }, [token]);

  return !token ? <AuthRouts /> : <LayoutRoutes />;
}
