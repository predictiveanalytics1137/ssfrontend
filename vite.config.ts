// // import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],

// // })

// import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: './', // This ensures paths are relative
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/', // Use absolute paths for assets
});