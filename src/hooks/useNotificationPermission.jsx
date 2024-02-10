import messaging from '@react-native-firebase/messaging';
import {Alert, Linking, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export default function useNotificationPermission() {
  const requestIosNotificationPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        return true;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const requestAndroidNotificationPermission = async () => {
    try {
      const checkper = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      console.log('checkper', checkper);

      const isGranted = checkper === RESULTS.GRANTED;

      if (isGranted) {
        return true;
      }

      if (checkper === RESULTS.UNAVAILABLE) {
        Alert.alert(
          'Notification',
          'This feature is not available (on this device / in this context)',
        );
        return false;
      } else {
        const requestper = await request(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );

        const isGranted = requestper === RESULTS.GRANTED;

        if (isGranted) {
          return true;
        } else {
          Alert.alert(
            'Notification Permission',
            'Please Enable Notification Permission From Settings',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open settings',
                onPress: () => {
                  Linking.sendIntent(
                    'android.settings.APP_NOTIFICATION_SETTINGS',
                    [
                      {
                        key: 'android.provider.extra.APP_PACKAGE',
                        value: 'com.ppfitness.app',
                      },
                    ],
                  );
                },
              },
            ],
          );
          return false;
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleNotificationPermission = async () => {
    if (Platform.OS === 'ios') {
      return await requestIosNotificationPermission();
    } else {
      return await requestAndroidNotificationPermission();
    }
  };

  return {
    requestIosNotificationPermission,
    requestAndroidNotificationPermission,
    handleNotificationPermission,
  };
}
