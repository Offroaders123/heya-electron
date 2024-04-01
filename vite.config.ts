import { type UserConfig, defineConfig } from 'vite'
import electronPlugin from 'vite-plugin-electron/simple'
import solid from 'vite-plugin-solid'

const electron = electronPlugin as typeof import('vite-plugin-electron/simple').default;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext"
  },
  plugins: [
    solid(),
    electron({
      main: {
        vite: {
          build: {
            target: 'esnext',
            lib: {
              formats: ['es'],
              entry: 'electron/main.ts',
              fileName: () => 'main.js',
            },
          },
        } satisfies UserConfig,
      },
      preload: {
        input: 'electron/preload.ts',
        vite: {
          build: {
            rollupOptions: {
              output: {
                format: 'cjs',
                inlineDynamicImports: true,
                entryFileNames: '[name].cjs',
                chunkFileNames: '[name].cjs',
                assetFileNames: '[name].[ext]',
              },
            },
          },
        } satisfies UserConfig,
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
})
