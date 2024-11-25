import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";
import { useContacts } from "../hooks/useContacts";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../types";

const MapClickHandler: React.FC<{ setLocation: (location: { latitude: number; longitude: number }) => void }> = ({ setLocation }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setLocation({ latitude: lat, longitude: lng });
    },
  });

  return null; // Apenas registra eventos no mapa
};

export const AddContactScreen: React.FC = () => {
  const { addContact } = useContacts();
  const navigation = useNavigation<NavigationProps<"AddContact">>();

  // Estados para as informações
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  // Função para buscar o CEP
  const handleCepSearch = async () => {
    if (!cep || cep.length !== 8) {
      Alert.alert("Erro", "Informe um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf, erro } = response.data;

      if (erro) {
        Alert.alert("Erro", "CEP não encontrado.");
        return;
      }

      setStreet(logradouro || "");
      setNeighborhood(bairro || "");
      setCity(localidade || "");
      setState(uf || "");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o CEP.");
    }
  };

  // Função para adicionar contato
  const handleAdd = async () => {
    if (!name || !street || !number || !neighborhood || !city || !state || !location.latitude || !location.longitude) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const address = `${street}, ${number}, ${neighborhood}, ${city} - ${state}`;
    await addContact({ id: 0, name, address, location });
    Alert.alert("Sucesso", "Contato adicionado com sucesso!");
    navigation.navigate("ContactList");
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        maxLength={8}
      />
      <Button title="Buscar CEP" onPress={handleCepSearch} />

      <TextInput style={styles.input} placeholder="Rua" value={street} onChangeText={setStreet} />
      <TextInput style={styles.input} placeholder="Número" value={number} onChangeText={setNumber} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Bairro" value={neighborhood} onChangeText={setNeighborhood} />
      <TextInput style={styles.input} placeholder="Cidade" value={city} onChangeText={setCity} />
      <TextInput style={styles.input} placeholder="Estado" value={state} onChangeText={setState} />

      <MapContainer
        style={{ height: "50%", width: "100%" }}
        center={[location.latitude, location.longitude]}
        zoom={13}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.latitude, location.longitude]} />
        <MapClickHandler setLocation={setLocation} />
      </MapContainer>

      <Button title="Adicionar" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
