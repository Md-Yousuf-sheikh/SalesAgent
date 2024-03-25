import SplashScreen from "../screens/SplashScreens/SplashScreen";
import SignInNumber from "../screens/LoginScreens/SignInNumber";
import SignInEmail from "../screens/LoginScreens/SignInEmail";
import PhoneOtpVerification from "../screens/LoginScreens/PhoneOtpVerification";
import EmailOtpVerification from "../screens/LoginScreens/EmailOtpVerification";
import SignUp from "../screens/LoginScreens/SingUp";
import ForgetPassword from "../screens/LoginScreens/ForgetPassword";
import ResetPassword from "../screens/LoginScreens/ResetPassword";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  animation: "slide_from_right",
};

const AuthRouts = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignInNumber" component={SignInNumber} />
        <Stack.Screen name="SingUp" component={SignUp} />
        <Stack.Screen name="SignInEmail" component={SignInEmail} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="PhoneOtpVer" component={PhoneOtpVerification} />
        <Stack.Screen name="EmailOtpVer" component={EmailOtpVerification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthRouts;
