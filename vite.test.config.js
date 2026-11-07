import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/**/*',
      exclude: ['src/main.jsx'],
      requireEnv: false,
      forceBuildInstrument: true
    })
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('development')
  },
  build: {
    outDir: '.karma',
    emptyOutDir: true,
    minify: false,
    sourcemap: true,
    lib: {
      entry: 'test/store.spec.jsx',
      name: 'RootsBeansTests',
      formats: ['iife'],
      fileName: () => 'tests.js'
    }
  }
});
