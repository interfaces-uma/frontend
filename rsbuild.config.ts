import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const BACKEND_URL = JSON.stringify(
  process.env.BACKEND_URL || "http://localhost:3001/",
);

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "CODIGO SECRETO",
    template: "./public/index.html",
  },
  source: {
    define: {
      "process.env.BACKEND_URL": BACKEND_URL,
    },
  },
});
