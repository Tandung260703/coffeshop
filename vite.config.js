import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/coffeShop/",
  server: {
    proxy: {
      '/coffe': 'https://680c90bf2ea307e081d44f4e.mockapi.io/coffeNTD/api',
    },
  },
})