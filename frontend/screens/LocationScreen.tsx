import React from "react";
import { View, StyleSheet } from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { RouteProps } from "../types";
import { useContacts } from "../hooks/useContacts";

export const LocationScreen: React.FC<{ route: RouteProps<"Location"> }> = ({ route }) => {
  const { getContactById } = useContacts();
  const contact = getContactById(route.params.id);

  if (!contact) return null;

  const { latitude, longitude } = contact.location;
  const { name } = contact;

  return (
    <View style={styles.container}>
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[latitude, longitude]}
        zoom={13}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
