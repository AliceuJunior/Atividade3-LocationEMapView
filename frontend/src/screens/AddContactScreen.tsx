import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { addContact } from "../services/contactServices";
import { StackNavigationProp } from "@react-navigation/stack";

type AddContactScreenNavigationProp = StackNavigationProp<any, "AddContact">;

type Props = {
  navigation: AddContactScreenNavigationProp;
};

export const AddContactScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleAddContact = async () => {
    await addContact({ id: Date.now(), name, address, latitude: 0, longitude: 0 });
    navigation.goBack();
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="Endereço" value={address} onChangeText={setAddress} />
      <Button title="Salvar" onPress={handleAddContact} />
    </View>
  );
};
