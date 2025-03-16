import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite';
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": {
        target:  "http://localhost:5000", // Usa a variável de ambiente ou fallback para localhost
        changeOrigin: true,
        secure: false, // Defina `true` se o backend for HTTPS
      },
    },
  },
});