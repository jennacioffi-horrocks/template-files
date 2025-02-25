import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { config } from './src/utils/config';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: config.routes_basename, // This might need to just be replaced with [ process.env.VITE_BASE_URL || "/", ]
  build: {
    target: 'esnext',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
  },
});
