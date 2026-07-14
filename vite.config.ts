import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/rjd-opus-crafted/",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
