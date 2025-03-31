import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
        tsconfigPaths(),
    ],
    build: {
        target: 'modules',
        lib: {
            entry: path.resolve(__dirname, 'src/index.tsx'),
            name: '@skillnavi/ui',
            fileName: 'index',
        },
        rollupOptions: {
            // 라이브러리에 포함하지 않을
            // 디펜던시를 명시해주세요
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});