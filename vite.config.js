import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  env: {
    VITE_CLERK_PUBLISHABLE_KEY: 'pk_test_c3dlZXQtbWluay0yMi5jbGVyay5hY2NvdW50cy5kZXYk',
    VITE_STRAPI_API_KEY: '481f1b10a81db97cad352f8e8bdd20186adcca5cc8f053cb9d11dedf4163cf637074cdf588b51cc41fdaf2d953e9525dad57724608964d9daec7dc7bdf453a87c1d49fd0ff1bda119dafb8f675b4dbfc4db347233a4b918bd95d06a6c1fa7d8042a67216137f3c735e0767fc871b9287bf3d498953e7d71638ebb00f7b4d2c61',
    VITE_API_BASE_URL: 'https://ai-cv-strapi-backend-postgresql-8c45.onrender.com',
    VITE_GOOGLE_AI_API_KEY: 'AIzaSyAN7GS8qbK_vXRQoRkvq7Gy0LSjHEeMQ3U',
    VITE_BASE_URL: 'http://localhost:5173',
    VITE_BASE_URL2: 'https://crea8cv-v2-5lmo.vercel.app',
    VITE_API_BASE_URL2: 'http://localhost:8080'
  },
  /*   server: { port: 3001, }, */
})
