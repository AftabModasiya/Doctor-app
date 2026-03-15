import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    watch: {
      usePolling: true,
      interval: 300,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@services": path.resolve(__dirname, "src/services"),
      "@types": path.resolve(__dirname, "src/types"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@context": path.resolve(__dirname, "src/context"),
      "@i18n": path.resolve(__dirname, "src/i18n"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@middleware": path.resolve(__dirname, "src/middleware"),
      "@app": path.resolve(__dirname, "src/app"),
      "@endpoints": path.resolve(__dirname, "src/endpoints"),
      "@models": path.resolve(__dirname, "src/models"),
      "@enum": path.resolve(__dirname, "src/enum"),
      "@store": path.resolve(__dirname, "src/store"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@schema": path.resolve(__dirname, "src/schema"),
    },
  },
  optimizeDeps: {
    include: ["react-is", "recharts"],
  },
});
