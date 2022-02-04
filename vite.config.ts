import preact from "@preact/preset-vite"
import { defineConfig } from "vite"
import { chromeExtension } from "vite-plugin-chrome-extension"

export default defineConfig({
  plugins: [preact(), chromeExtension()],
  clearScreen: false,
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: { input: "src/manifest.json" },
  },
})
