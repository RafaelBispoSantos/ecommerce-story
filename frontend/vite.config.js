import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer'; // Importe o autoprefixer

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer(), // Adicione o autoprefixer
      ],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
    },
  },
});