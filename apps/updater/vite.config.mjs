import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: process.env.ENV === 'dev' ? '' : 'https://sinupdater.nira.one/',
    plugins: [
        tailwindcss(),
    ],
});
