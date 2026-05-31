import { readdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const pkgRoot = "packages/react-hook-hub";
const hooksDir = join(pkgRoot, "src/hooks");
const hooks = readdirSync(hooksDir)
  .filter((name) => name.startsWith("use-"))
  .sort();

const indexContent = `${hooks.map((hook) => `export * from "./hooks/${hook}";`).join("\n")}\n`;

writeFileSync(join(pkgRoot, "src/index.ts"), indexContent);

const pkg = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));

delete pkg.dependencies;

pkg.exports = {
  ".": {
    import: { types: "./dist/index.d.ts", default: "./dist/index.js" },
    require: { types: "./dist/index.d.cts", default: "./dist/index.cjs" },
  },
};

for (const hook of hooks) {
  pkg.exports[`./${hook}`] = {
    import: { types: `./dist/${hook}.d.ts`, default: `./dist/${hook}.js` },
    require: { types: `./dist/${hook}.d.cts`, default: `./dist/${hook}.cjs` },
  };
}

writeFileSync(join(pkgRoot, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
copyFileSync(join(pkgRoot, "README.md"), "README.md");

console.log(`Synced ${hooks.length} hook subpath exports.`);
