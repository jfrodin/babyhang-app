// navigation/Navigation.tsx

// Importerar navigation-komponenter från react-navigation
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importerar skärmar som ingår i stacken
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";

// Importerar typdefinition för stackens rutter
import { RootStackParamList } from "../types/navigation";

// Skapar navigator med typsäker routing
const Stack = createNativeStackNavigator<RootStackParamList>();

// Navigation-komponent som innehåller hela stacken
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"           // Startar på inloggningssidan
        screenOptions={{ headerShown: false }} // Döljer toppbar
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
