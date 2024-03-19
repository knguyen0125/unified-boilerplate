import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  plugins: [react()],
});
