import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RouteProp } from "@react-navigation/native";

type LocationScreenRouteParams = {
  Location: {
    latitude: number;
    longitude: number;
  };
};

type Props = {
  route: RouteProp<LocationScreenRouteParams, "Location">;
};

export const LocationScreen: React.FC<Props> = ({ route }) => {
  const { latitude, longitude } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

export default LocationScreen;
