import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import { useContacts } from "../hooks/useContacts";

const MapClickHandler: React.FC<{ setLocation: (location: { latitude: number; longitude: number }) => void }> = ({ setLocation }) => {
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    setLocation({ latitude: lat, longitude: lng });
  });
  return null; // Este componente apenas registra os eventos, não renderiza nada
};

export const AddContactScreen: React.FC = () => {
  const { addContact } = useContacts();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const handleAdd = () => {
    if (!name || !address || !location.latitude || !location.longitude) {
      alert("Preencha todos os campos");
      return;
    }

    addContact({ id: 0, name, address, location });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Endereço" value={address} onChangeText={setAddress} />
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
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
});
