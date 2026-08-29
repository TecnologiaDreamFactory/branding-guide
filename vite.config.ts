import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // O Pages serve o site em /branding-guide/, nao na raiz do dominio. Sem isto
  // o build pede /assets/... e a pagina sobe em branco.
  base: '/branding-guide/',
  plugins: [react()],
})
