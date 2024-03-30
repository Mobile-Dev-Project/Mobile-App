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
import FindHotelsScreen from "./screens/FindHotelsScreen";
import DummyScreen from "./screens/DummyScreen";
import FinlandScreen from "./screens/FinlandScreen";

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
            name="FinlandScreen"
            component={FinlandScreen}
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppNavigation;
