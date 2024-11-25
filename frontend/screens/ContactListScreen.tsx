import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deleteContact, fetchContacts } from "../services/contactsService";
import { Contact, NavigationProps } from "../types";

export const ContactListScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  
  const navigation = useNavigation<NavigationProps<"ContactList">>();

  // Efeito para buscar os contatos
  useFocusEffect(() => {
    const loadContacts = async () => {
      try {
        const fetchedContacts = await fetchContacts();
        setContacts(fetchedContacts);
      } catch (error) {
        console.error("Erro ao carregar os contatos", error);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  });

  // Tela de carregamento
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <TouchableOpacity
          
              style={styles.contactButton}
              onPress={() => navigation.navigate("Location", { contact: item })}
              onLongPress={() => {deleteContact(item.id)}}
            >
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactAddress}> {item.address.trim()}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate("AddContact")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  contactItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contactButton: {
    alignItems: "flex-start",
  },
  contactName: {
    fontSize: 18,
    color: "#007BFF",
    fontWeight: "600",
    marginBottom: 5
  },
  contactAddress: {
    fontSize: 14,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
});