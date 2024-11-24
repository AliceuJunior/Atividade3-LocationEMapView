import React from "react";
import 'leaflet/dist/leaflet.css';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./screens/HomeScreen";
import { ContactListScreen } from "./screens/ContactListScreen";
import { AddContactScreen } from "./screens/AddContactScreen";
import { LocationScreen } from "./screens/LocationScreen";
import { ContactProvider } from "./contexts/ContactContext";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ContactProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ContactList" component={ContactListScreen} />
          <Stack.Screen name="AddContact" component={AddContactScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
}
