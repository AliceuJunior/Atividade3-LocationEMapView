import React from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../types";
import { useContacts } from "../hooks/useContacts";

export const ContactListScreen: React.FC = () => {
  const { contacts } = useContacts();
  const navigation = useNavigation<NavigationProps<"ContactList">>();

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text
            style={styles.item}
            onPress={() => navigation.navigate("Location", { id: item.id })}
          >
            {item.name}
          </Text>
        )}
      />
      <Button title="+" onPress={() => navigation.navigate("AddContact")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: { padding: 10, borderBottomWidth: 1 },
});
