import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: process.env.ENV === 'dev' ? '' : 'https://sinupdater.nira.one/',
    plugins: [
        react(),
        tailwindcss(),
    ],
});
