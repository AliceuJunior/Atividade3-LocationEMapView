import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../types";
import { useScreenGuard } from "../hooks/useScreenGuard";

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps<"Home">>();
  const authenticate = useScreenGuard();

  const handlePress = async () => {
    const isAuthenticated = await authenticate(); // Call biometric authentication

    if (isAuthenticated) {
      navigation.navigate("ContactList"); // Navigate to Contacts if authenticated
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress()}
      >
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db", // Cor de fundo do botão
    paddingVertical: 12, // Padding vertical para dar altura ao botão
    paddingHorizontal: 25, // Padding horizontal para aumentar a largura
    borderRadius: 8, // Bordas arredondadas
    elevation: 3, // Sombras para Android
    shadowColor: "#000", // Cor da sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 2, // Raio da sombra
  },
  buttonText: {
    color: "#fff", // Cor do texto
    fontSize: 18, // Tamanho da fonte
    fontWeight: "bold", // Negrito
    textAlign: "center", // Alinhar o texto no centro
  },
});
