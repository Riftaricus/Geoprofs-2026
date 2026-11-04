import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/auth": {
        target: "http://django-web:8000",
        changeOrigin: true,
      },
      "/user": {
        target: "http://django-web:8000",
        changeOrigin: true,
      },
      "/planning-items": {
        target: "http://django-web:8000",
        changeOrigin: true,
      },
      "/notifications": {
        target: "http://django-web:8000",
        changeOrigin: true,
      },
      "/leaves": {
        target: "http://django-web:8000",
        changeOrigin: true,
      },
      "/status": {
        target: "http://django-web:8000",
        changeOrigin: true,
      },
    },
  },
});
