import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Defina os parâmetros esperados em cada tela
export type RootStackParamList = {
  Home: undefined;
  ContactList: undefined;
  AddContact: undefined;
  Location: { id: number };
};

// Tipagem para `useNavigation`
export type NavigationProps<T extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, T>;

// Tipagem para `route` em cada tela
export type RouteProps<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

export interface Contact {
    id: number; // ID único para identificar o contato
    name: string; // Nome do contato
    address: string; // Endereço do contato
    location: {
      latitude: number; // Latitude
      longitude: number; // Longitude
    };
  }
  
  
