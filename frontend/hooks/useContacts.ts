import { useContext } from "react";
import { ContactContext } from "../contexts/ContactContext";

/**
 * Hook personalizado para acessar o contexto de contatos.
 * Lança um erro caso seja usado fora do `ContactProvider`.
 */
export const useContacts = () => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error("useContacts must be used within a ContactProvider");
  }

  return context;
};
