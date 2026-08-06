import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  base: '/myrizab/',
=======
  base: './',
>>>>>>> 03c3d34d23622c3abac87346f0fd6ab22ea8adb3
  server: {
    host: true,
    port: 5173
  }
})
