import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import { rh, WIDTH } from "../theme/Theme";
import { NavigationContainer } from "@react-navigation/native";
import UserRoutes from "./UserRoutes";

const Drawer = createDrawerNavigator();

export default function DrawerTab() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        useLegacyImplementation={true}
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          headerStyle: { backgroundColor: "#F7F9F8" },
          drawerActiveBackgroundColor: "#F0F0F0",
          drawerActiveTintColor: "#2F2F2F",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            fontSize: rh(1.9),
          },
          drawerStyle: {
            width: WIDTH / 1.2,
          },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
        initialRouteName="UserRoutes"
      >
        <Drawer.Screen name="UserRoutes" component={UserRoutes} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
