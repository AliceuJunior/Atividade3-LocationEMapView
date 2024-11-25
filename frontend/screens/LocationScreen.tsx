import React from "react";
import { View, StyleSheet } from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useContacts } from "../hooks/useContacts";
import { RouteProps } from "../types";

export const LocationScreen: React.FC<{ route: RouteProps<"Location"> }> = ({ route }) => {
  const { getContactById } = useContacts();
  const contact = getContactById(route.params.id);

  if (!contact) return null;

  return (
    <View style={styles.container}>
      <MapContainer style={{ height: "100%", width: "100%" }} center={[contact.location.latitude, contact.location.longitude]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[contact.location.latitude, contact.location.longitude]}>
          <Popup>{contact.name}</Popup>
        </Marker>
      </MapContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
