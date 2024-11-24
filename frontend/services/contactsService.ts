import { api } from "./api";
import { Contact } from "../types";

// Buscar todos os contatos
export const fetchContacts = async (): Promise<Contact[]> => {
  const response = await api.get("/"); // Endpoint GET para buscar contatos
  return response.data;
};

// Adicionar um novo contato no servidor
export const addContactToServer = async (contact: Contact): Promise<Contact> => {
  const response = await api.post("/", contact); // Endpoint POST para criar contato
  return response.data;
};
