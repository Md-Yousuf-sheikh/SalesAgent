import "react-native-gesture-handler";
import * as React from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store, {  persister } from "./src/redux/store";
import {
  PermissionsAndroid,
  Platform,
  StatusBar,
} from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import MainRoutes from "./src/router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, {
  AndroidStyle,
  AndroidImportance,
} from "@notifee/react-native";

function App() {
  
  useEffect(() => {
    async function requestUserPermission() {
      if (Platform.OS === "ios") {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log("Authorization status:", authStatus);
        }
      } else {
        const checkper = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        const enabled = checkper === PermissionsAndroid.RESULTS.AUTHORIZED;

        if (enabled) {
          console.log("Authorization status:", checkper);
        }
      }
    }
    if (requestUserPermission()) {
      //return fcm token for the device
      messaging()
        .getToken()
        .then((token) => {
          AsyncStorage.setItem("push_token", token);
          console.log("push_token", token);
        });
    } else {
      console.log("Permission not granted");
    }

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);

  // Font loaded
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <SafeAreaView
            edges={["left", "right", "top"]}
            style={{ flex: 1, backgroundColor: "#2253a5" }}
          >
            <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
            <MainRoutes />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;

//
const onDisplayNotification = async (data) => {
  try {
    console.log("data", data);
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    // Create or ensure the notification channel exists (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      sound: "./assets/sound.mp3", // Replace with the correct path to your custom sound file
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    const notificationOptions = {
      title: data?.notification?.title,
      body: data?.notification?.body,
      android: {
        channelId,

        pressAction: {
          id: "default",
        },
      },
    };

    if (data?.notification?.android?.imageUrl) {
      notificationOptions.android.style = {
        type: AndroidStyle.BIGPICTURE,
        picture: data?.notification?.android?.imageUrl,
      };
    } else if (data?.notification?.android?.bigText) {
      notificationOptions.android.style = {
        type: AndroidStyle.BIGTEXT,
        text: data?.notification?.android?.bigText,
      };
    } else if (
      data?.notification?.android?.inboxItems &&
      Array.isArray(data.notification.android.inboxItems)
    ) {
      notificationOptions.android.style = {
        type: AndroidStyle.INBOX,
        lines: data?.notification?.android?.inboxItems,
      };
    } else {
      // Fallback style if no image URL and no bigText or inboxItems
      notificationOptions.android.style = {
        type: AndroidStyle.BIGTEXT,
        text: data?.notification?.body,
      };
    }

    await notifee.displayNotification(notificationOptions);
  } catch (error) {
    console.error("Error displaying notification:", error);
  }
};

// Additional functions (you can add more functions here)
