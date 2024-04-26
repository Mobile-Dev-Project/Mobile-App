import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu, Provider } from "react-native-paper";

import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import useAuth from "./hooks/useAuth";
import FinlandScreen from "./screens/FinlandScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ImageSlider from "./components/ImageSlider";
import BookingScreen from "./screens/BookingScreen";
import SelectRoomScreen from "./screens/SelectRoomScreen";
import PasswordRecovery from "./screens/PasswordRecovery";
import HelsinkiScreen from "./screens/HelsinkiScreen";
import TampereScreen from "./screens/TampereScreen";
import TurkuScreen from "./screens/TurkuScreen";
import Booked from "./screens/Booked";
import BookingConfirm from "./screens/BookingConfirm";

const Stack = createNativeStackNavigator();

// const CustomHeaderRight = ({ navigation }) => {
//   const [visible, setVisible] = useState(false);

//   return (
//     <Menu
//       visible={visible}
//       onDismiss={() => setVisible(false)}
//       anchor={<Button onPress={() => setVisible(true)} title="Menu" />}
//     >
//       <Menu.Item
//         onPress={() => {
//           navigation.navigate("Home");
//           setVisible(false);
//         }}
//         title="Home"
//       />
//       <Menu.Item
//         onPress={() => {
//           navigation.navigate("Finland");
//           setVisible(false);
//         }}
//         title="Finland"
//       />
//     </Menu>
//   );
// };

const AppNavigation = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FinlandScreen"
            component={FinlandScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ImageSlider"
            component={ImageSlider}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectRoomScreen"
            component={SelectRoomScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookingScreen"
            component={BookingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HelsinkiScreen"
            component={HelsinkiScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TampereScreen"
            component={TampereScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TurkuScreen"
            component={TurkuScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Booked"
            component={Booked}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookingConfirm"
            component={BookingConfirm}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PasswordRecovery"
            component={PasswordRecovery}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppNavigation;
