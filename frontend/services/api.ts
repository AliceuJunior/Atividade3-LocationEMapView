import axios, { AxiosInstance } from "axios";
import { BACKEND_URL } from "@env"; // Importando a variável de ambiente

export const api: AxiosInstance = axios.create({
  baseURL: BACKEND_URL, // Usando a variável importada
  headers: {
    "Content-Type": "application/json",
  },
});
