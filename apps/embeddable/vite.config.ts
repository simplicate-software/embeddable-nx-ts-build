import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      outputDir: "dist/types",
      insertTypesEntry: true,
    }),
  ],
  optimizeDeps: {},
  build: {
    minify: false,
    sourcemap: true,
    cssMinify: "esbuild",
    lib: {
      entry: resolve(__dirname, "bundle/index.ts"),
      name: "Bundled",
      fileName: (format) => `bundled.${format}.js`,
    },
    rollupOptions: {
      treeshake: true,
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
