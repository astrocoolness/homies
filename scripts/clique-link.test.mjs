import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const serverFn = readFileSync(new URL("../src/lib/clique-link.ts", import.meta.url), "utf8");
const route = readFileSync(new URL("../src/routes/clique/link.tsx", import.meta.url), "utf8");

test("link completion requires the app's verified auth middleware", () => {
  assert.match(serverFn, /middleware\(\[authMiddleware\]\)/);
  assert.match(serverFn, /const externalSubject = context\.userId/);
  assert.match(serverFn, /externalSubject === "dev-user"/);
  assert.match(serverFn, /process\.env\.CLIQUE_LINK_SECRET/);
  assert.match(serverFn, /process\.env\.CLIQUE_API_ORIGIN/);
  assert.match(serverFn, /x-clique-link-secret/);
  assert.doesNotMatch(serverFn, /import\.meta\.env\.CLIQUE_LINK_SECRET/);
});

test("link UI validates challenge and restricts return navigation", () => {
  assert.match(route, /validChallenge/);
  assert.match(route, /host === "rva\.guru"/);
  assert.match(route, /host\.startsWith\("rva-guru-full-stack-"/);
  assert.match(route, /url\.pathname !== "\/clique\/apps"/);
  assert.match(route, /Confirm link/);
  assert.match(route, /user\.isDevFallback/);
});
