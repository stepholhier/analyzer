import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config(); // Carrega as variáveis do .env

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  }
});
