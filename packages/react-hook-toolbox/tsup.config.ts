import { readdirSync } from "node:fs";
import { defineConfig } from "tsup";

const hooks = readdirSync("src/hooks")
  .filter((name) => name.startsWith("use-"))
  .sort();

const entry = { index: "src/index.ts" };

for (const hook of hooks) {
  entry[hook] = `src/hooks/${hook}/index.ts`;
}

export default defineConfig({
  entry,
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react"],
});
