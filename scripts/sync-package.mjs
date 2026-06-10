import { readdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const pkgRoot = "packages/react-hook-toolbox";
const hooksDir = join(pkgRoot, "src/hooks");
const hooks = readdirSync(hooksDir)
  .filter((name) => name.startsWith("use-"))
  .sort();

const indexContent = `${hooks.map((hook) => `export * from "./hooks/${hook}";`).join("\n")}\n`;

writeFileSync(join(pkgRoot, "src/index.ts"), indexContent);

const pkg = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));

delete pkg.dependencies;
delete pkg.private;

pkg.name = "react-hook-toolbox";
pkg.description =
  "A collection of useful React custom hooks — install once, import only the hooks you need via subpaths";
pkg.sideEffects = false;
pkg.main = "./dist/index.cjs";
pkg.module = "./dist/index.js";
pkg.types = "./dist/index.d.ts";
pkg.files = ["dist", "README.md"];

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

if (!pkg.scripts) pkg.scripts = {};
pkg.scripts.build = "tsup";
pkg.scripts.clean = "rm -rf dist";

writeFileSync(join(pkgRoot, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);

const hookRows = hooks
  .map((hook) => `| \`${formatHookName(hook)}\` | \`react-hook-toolbox/${hook}\` |`)
  .join("\n");

const readme = `# react-hook-toolbox

A collection of useful, tree-shakeable React custom hooks in **one npm package**. Install once — import only the hooks you use.

## Installation

\`\`\`bash
npm install react-hook-toolbox
\`\`\`

You only need **one install**. Pick individual hooks via import paths — no separate packages required.

## Usage

### Import one hook (recommended)

Your bundler includes only the hooks you import:

\`\`\`tsx
import { useDebounce } from "react-hook-toolbox/use-debounce";
import { useToggle } from "react-hook-toolbox/use-toggle";
\`\`\`

### Import from the main entry

\`\`\`tsx
import { useDebounce, useToggle } from "react-hook-toolbox";
\`\`\`

## Available hooks

| Hook | Import path |
|------|-------------|
${hookRows}

## Requirements

- React 18+
- TypeScript types included
`;

writeFileSync(join(pkgRoot, "README.md"), readme);
copyFileSync(join(pkgRoot, "README.md"), "README.md");

console.log(`Synced ${hooks.length} hook subpath exports.`);

function formatHookName(hook) {
  const base = hook.replace(/^use-/, "");
  return `use${base.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("")}`;
}
