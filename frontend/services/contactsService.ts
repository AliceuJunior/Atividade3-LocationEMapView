import { api } from "./api";
import { Contact } from "../types";

// Adicionar contato ao servidor
export const addContactToServer = async (contact: Contact): Promise<Contact> => {
  const response = await api.post("/", contact);
  return response.data;
};

// Buscar contatos do servidor
export const fetchContacts = async (): Promise<Contact[]> => {
  const response = await api.get("/");
  return response.data;
};
