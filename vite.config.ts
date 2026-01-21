import { ConfigEnv, defineConfig, loadEnv, Plugin, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  const initPlugins: (Plugin | PluginOption[])[] = [];

  if (!process.env.CYPRESS) {
    /**
     * You should add here the module federation plugin and the remotes you want to use.
     * This is done in order to not include module federation when running cypress component tests
     */
  }

  return defineConfig({
    plugins: [react(), viteTsconfigPaths(), ...initPlugins],
    resolve: {
      alias: {
        "@middlewears": path.resolve(__dirname, "src/middlewears"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@types": path.resolve(__dirname, "src/types"),
        "@components": path.resolve(__dirname, "src/components"),
      },
    },
    optimizeDeps: {
      entries: ["__mf__virtual/*.js"],
    },
    worker: {
      format: "es",
    },
    server: {
      open: true,
      port: 3001,
    },
    preview: {
      port: 3001,
      open: true,
    },
    build: {
      outDir: "./build",
      target: "esnext",
    },
  });
};
