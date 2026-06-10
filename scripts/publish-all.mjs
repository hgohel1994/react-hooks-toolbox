import { execSync } from "node:child_process";

const PACKAGE = "react-hook-hub";
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const otpArg = args.find((arg) => arg.startsWith("--otp="));
const otp = otpArg?.split("=")[1] ?? process.env.NPM_OTP;

function run(command) {
  return execSync(command, { encoding: "utf8", stdio: ["inherit", "pipe", "pipe"] });
}

if (!dryRun) {
  try {
    const user = run("npm whoami").trim();
    console.log(`Logged in to npm as: ${user}\n`);
  } catch {
    console.error("Not logged in to npm. Run: npm login\n");
    process.exit(1);
  }

  execSync("npm run build", { stdio: "inherit" });
}

const publishArgs = ["npm", "publish", "-w", PACKAGE, "--access", "public"];

if (otp) {
  publishArgs.push("--otp", otp);
} else if (!dryRun) {
  console.warn(
    "Tip: If publish fails with 403, add your authenticator code:\n" +
      "  npm run publish:all -- --otp=123456\n",
  );
}

if (dryRun) {
  publishArgs.push("--dry-run");
}

console.log(`→ ${dryRun ? "Dry run" : "Publishing"} ${PACKAGE}\n`);

try {
  execSync(publishArgs.join(" "), { stdio: "inherit" });
} catch {
  console.error(`
Publish failed.

If you see "You do not have permission to publish react-hook-hub":
  That name may already be taken on npm by another user.

Other fixes:
  • 2FA: npm run publish:all -- --otp=YOUR_6_DIGIT_CODE
  • Login: npm logout && npm login
`);
  process.exit(1);
}

console.log(`\nDone! Install with: npm install ${PACKAGE}`);
