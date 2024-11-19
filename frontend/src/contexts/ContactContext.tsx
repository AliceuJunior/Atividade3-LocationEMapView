import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Contact } from "../types/Contact";
import { getContacts } from "../services/contactServices";

interface ContactContextType {
  contacts: Contact[];
  fetchContacts: () => void;
}

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactContext = createContext<ContactContextType | null>(null);

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, fetchContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
