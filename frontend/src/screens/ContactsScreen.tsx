import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useContacts } from "../hooks/useContacts";
import { StackNavigationProp } from "@react-navigation/stack";
import { Contact } from "../types/Contact";

type ContactsScreenNavigationProp = StackNavigationProp<any, "Contacts">;

type Props = {
  navigation: ContactsScreenNavigationProp;
};

export const ContactsScreen: React.FC<Props> = ({ navigation }) => {
  const { contacts } = useContacts();

  return (
    <View>
      <FlatList
        data={contacts}
        keyExtractor={(item: Contact) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.address}</Text>
        )}
      />
      <Button title="Adicionar Contato" onPress={() => navigation.navigate("AddContact")} />
    </View>
  );
};
