import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : "http://localhost:5800/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// intercepteur pour attacher le token à chaque requête
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
