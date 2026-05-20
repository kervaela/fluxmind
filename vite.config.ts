import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: { port: 5191, host: true, strictPort: false, open: false },
  preview: { port: 4181, host: true },
  optimizeDeps: { exclude: ["@consenlabs/tcx-wasm"] },
});
