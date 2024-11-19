import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ContactProvider } from "./src/contexts/ContactContext";
import ContactsScreen from "./src/screens/ContactsScreen";
import AddContactScreen from "./src/screens/AddContactScreen";
import LocationScreen from "./src/screens/LocationScreen";

type RootStackParamList = {
  Contacts: undefined;
  AddContact: undefined;
  Location: { latitude: number; longitude: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ContactProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Contacts">
          <Stack.Screen name="Contacts" component={ContactsScreen} />
          <Stack.Screen name="AddContact" component={AddContactScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
}
