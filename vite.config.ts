// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],

// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: './', // Ensures correct asset paths for Azure
  build: {
    outDir: 'dist' // Ensures correct output folder
  },
  plugins: [react()],
});
