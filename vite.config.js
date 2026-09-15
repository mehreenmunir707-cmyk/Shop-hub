import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api/mk-products": {
        target: "https://www.mkcosmetics.com.pk",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/mk-products/,
            "/products.json"
          ),
      },
    },
  },
});