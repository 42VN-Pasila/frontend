import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@gen': path.resolve(__dirname, 'src/gen'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/director': {
          target: env.VITE_DIRECTOR_URL,
          changeOrigin: true,
          secure: true,
          ws: true
        },
      }
    }
  };
});
