import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../types";

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps<"Home">>();

  return (
    <View style={styles.container}>
      <Button title="Iniciar" onPress={() => navigation.navigate("ContactList")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
