import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL:"http://localhost:5800/api" || `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Ajouter un intercepteur pour attacher le token à chaque requête
api.interceptors.request.use(async (config) => {
  const session = await getSession(); // Récupérer la session NextAuth
  if (session?.user?.token) {
    config.headers.Authorization = `Bearer ${session?.user?.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
