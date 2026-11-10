import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";

import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] =
    useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        setIsOnboardingCompleted(true);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >

        <Stack.Screen
            name="Onboarding"
            component={Onboarding}
        />

        <Stack.Screen
            name="Home"
            component={Home}
        />

        <Stack.Screen
            name="Profile"
            component={Profile}
        />

        </Stack.Navigator>
    </NavigationContainer>
  );
}