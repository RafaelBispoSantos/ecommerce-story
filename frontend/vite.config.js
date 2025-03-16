import { defineConfig } from "vite";

// Remova temporariamente o import do plugin React
// import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use uma verificação condicional para o plugin
  plugins: [], 
  css: {
    postcss: {
      plugins: [],  // Configuração mínima de PostCSS sem autoprefixer
    },
  },// Temporariamente vazio para o deploy
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});