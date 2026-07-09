import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANTE: cambia "base" por el nombre exacto de tu repositorio de GitHub
// (tal y como aparece en la URL, con las barras "/" al principio y al final).
// Ejemplo: si tu repo es https://github.com/tu-usuario/synergia -> base: '/synergia/'
// Si vas a publicar en un dominio propio o en <usuario>.github.io, deja base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/synergia-landing/',
})
