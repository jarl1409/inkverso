import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@config": path.resolve(new URL("./src/config", import.meta.url).pathname),
    },
  },
});
