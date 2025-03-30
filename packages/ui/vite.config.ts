import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // 컴포넌트 타입 생성
    }),
    tsconfigPaths(), // 절대 경로 생성
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@skillnavi/ui',
      fileName: 'skillnavi-ui'
    },
    rollupOptions: {
      // 라이브러리에 포함하지 않을
      // 디펜던시를 명시해주세요
      external: ['react', 'react-dom', 'tailwindcss', 'clsx'],
      output: {
        // 라이브러리 외부에 존재하는 디펜던시를 위해
        // UMD(Universal Module Definition) 번들링 시 사용될 전역 변수를 명시할 수도 있습니다.
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'tailwindcss': 'tailwindcss',
          clsx: 'clsx',
        }
      }
    }
  }
})