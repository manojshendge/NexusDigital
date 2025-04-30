import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"),     // ← look inside client/
  base: "./",                                  // makes all asset paths relative
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@assets": path.resolve(__dirname, "client", "assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),    // ouput to project-root/dist
    emptyOutDir: true,
  },
});
