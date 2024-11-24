import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Contact } from "../types";
import { fetchContacts, addContactToServer } from "../services/contactsService";

interface ContactContextData {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  getContactById: (id: number) => Contact | undefined;
}

export const ContactContext = createContext<ContactContextData | undefined>(undefined);

export const ContactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Carregar contatos do servidor
  useEffect(() => {
    fetchContacts().then((data) => setContacts(data));
  }, []);

  // Adicionar contato no estado local e no servidor
  const addContact = async (contact: Contact) => {
    const newContact = await addContactToServer(contact); // Salva no servidor
    setContacts((prevContacts) => [...prevContacts, newContact]); // Atualiza o estado
  };

  // Obter contato pelo ID
  const getContactById = (id: number) => contacts.find((contact) => contact.id === id);

  return (
    <ContactContext.Provider value={{ contacts, addContact, getContactById }}>
      {children}
    </ContactContext.Provider>
  );
};
