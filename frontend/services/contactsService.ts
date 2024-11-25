import api from "./api";
import { Contact } from "../types";

// Adicionar contato ao servidor
export const addContactToServer = async (contact: Contact): Promise<Contact> => {
  console.log(contact)
  const response = await api.post("/", contact);
  return response.data;
};

// Buscar contatos do servidor
export const fetchContacts = async (): Promise<Contact[]> => {
  const response = await api.get("/");
  return response.data;
};

export const editContact = async (contact:Contact) => {
  const response = await api.put("/", contact)
  console.log(contact)
  return response.data
}

export const deleteContact = async  (id:number) => {
  const response = await api.delete(`/?id=${id}`)
  return response.data
}