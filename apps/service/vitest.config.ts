import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serviceRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': serviceRoot,
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: [
            './vitest.setup.ts',
        ],
        include: [
            '**/*.{test,spec}.{ts,tsx}',
        ],
        exclude: [
            'node_modules',
            '.next',
            'dist',
        ],
    },
});
