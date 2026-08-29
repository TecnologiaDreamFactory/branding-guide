import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Caminho RELATIVO, nao '/branding-guide/': o Pages serve num subcaminho e a
  // Vercel serve na raiz. Com './' o mesmo build funciona nos dois, porque o
  // asset resolve contra a URL do documento. So vale porque o app e uma pagina
  // unica — com rotas aninhadas, './' resolveria contra a rota, nao contra a raiz.
  base: './',
  plugins: [react()],
})
