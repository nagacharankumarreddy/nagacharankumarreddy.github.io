import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/my-portfolio/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
