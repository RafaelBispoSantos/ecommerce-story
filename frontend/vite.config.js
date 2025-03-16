import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  build: {
    outDir: 'dist', // ou o diretório configurado na Vercel
  },
};