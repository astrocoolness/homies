import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const wrapper = readFileSync(new URL("../src/lib/clique/cloud-photo.ts", import.meta.url), "utf8");
const server = readFileSync(new URL("../src/lib/clique/cloud-photo.server.ts", import.meta.url), "utf8");
const status = readFileSync(new URL("../src/components/clique/CliqueCloudStatus.tsx", import.meta.url), "utf8");
const local = readFileSync(new URL("../src/components/clique/LocalProfilePhoto.tsx", import.meta.url), "utf8");
const sql = readFileSync(new URL("../supabase/clique.sql", import.meta.url), "utf8");

test("cloud RPC wrappers require auth and scope uploads to the verified user", () => {
  assert.match(wrapper, /middleware\(\[authMiddleware\]\)/);
  assert.match(wrapper, /uploadCliquePhotoForUser\(context\.userId, data\)/);
  assert.doesNotMatch(wrapper, /process\.env\.(SUPABASE_SERVICE_ROLE_KEY|R2_SECRET_ACCESS_KEY)/);
});

test("server logic reads secrets only from process.env and rejects dev identities", () => {
  assert.match(server, /process\.env\.SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(server, /process\.env\.R2_SECRET_ACCESS_KEY/);
  assert.match(server, /userId === "dev-user"/);
  assert.match(server, /sniffPhotoType/);
});

test("no secret env names appear in client components", () => {
  for (const client of [status, local]) {
    assert.doesNotMatch(client, /SUPABASE_SERVICE_ROLE_KEY|R2_SECRET_ACCESS_KEY|R2_ACCESS_KEY_ID/);
  }
  assert.match(status, /getCliqueCloudStatus/);
  assert.match(local, /uploadCliquePhoto/);
});

test("Supabase receiver schema is idempotent with RLS on and unique idempotency", () => {
  assert.match(sql, /create table if not exists public\.clique_profiles/);
  assert.match(sql, /idempotency_key text not null unique/);
  assert.match(sql, /alter table public\.clique_profiles enable row level security/);
  assert.match(sql, /alter table public\.clique_photos enable row level security/);
});
