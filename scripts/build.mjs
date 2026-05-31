import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";

const hookPackages = readdirSync("packages").filter((name) =>
  name.startsWith("use-"),
);

for (const hook of hookPackages) {
  execSync(`npm run build -w @react-hooks-toolbox/${hook}`, {
    stdio: "inherit",
  });
}

execSync("npm run build -w react-hooks-toolbox", { stdio: "inherit" });
