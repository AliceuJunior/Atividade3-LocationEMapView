import api from "./api";
import { Contact } from "../types/Contact";

export const getContacts = async (): Promise<Contact[]> => {
  const response = await api.get("/contacts");
  return response.data;
};

export const addContact = async (contact: Contact): Promise<Contact> => {
  const response = await api.post("/contacts", contact);
  return response.data;
};
