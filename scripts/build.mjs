import { execSync } from "node:child_process";

execSync("node scripts/sync-package.mjs", { stdio: "inherit" });
execSync("npm run build -w react-hook-hub", { stdio: "inherit" });
