import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const vercel = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));

test("production install uses lockfile and includes build dependencies", () => {
  assert.match(vercel.installCommand, /npm ci/);
  assert.match(vercel.installCommand, /--include=dev/);
  assert.doesNotMatch(vercel.installCommand, /--omit=dev|--production/);
  assert.ok(pkg.dependencies?.["@tailwindcss/vite"] || pkg.devDependencies?.["@tailwindcss/vite"], "Vite/Tailwind build dependencies are present");
});

test("Vercel build must not trigger database migrations", () => {
  assert.equal(pkg.scripts.build, "node scripts/with-app-env.mjs vite build");
  assert.ok(pkg.scripts["db:migrate"], "explicit migration command remains available");
  assert.doesNotMatch(pkg.scripts.build, /db:migrate|migrate[.]mjs|DATABASE_URL/);
});
