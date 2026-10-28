import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cliqueCloudConfig, cliquePhotoKey, r2ObjectRef, supabaseObjectUrl } from "./cloud-config.ts";
import { deriveSigningKey, sha256Hex, signR2Put, toHex } from "./r2-sign.ts";

describe("cliqueCloudConfig", () => {
  it("detects Supabase only with an https URL and a service key", () => {
    assert.equal(cliqueCloudConfig({}).supabase, false);
    assert.equal(cliqueCloudConfig({ SUPABASE_URL: "https://x.supabase.co" }).supabase, false);
    assert.equal(
      cliqueCloudConfig({ SUPABASE_URL: "http://x.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "k" }).supabase,
      false,
    );
    assert.equal(
      cliqueCloudConfig({ SUPABASE_URL: "https://x.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "k" }).supabase,
      true,
    );
    assert.equal(
      cliqueCloudConfig({
        SUPABASE_URL: "https://x.supabase.co",
        SUPABASE_SERVICE_ROLE_KEY: "k",
        SUPABASE_DB_URL: "postgres://db",
      }).supabaseDb,
      true,
    );
  });
  it("detects R2 only when all four values are present", () => {
    const full = {
      R2_ACCOUNT_ID: "acct",
      R2_ACCESS_KEY_ID: "ak",
      R2_SECRET_ACCESS_KEY: "sk",
      R2_BUCKET: "photos",
    };
    assert.equal(cliqueCloudConfig(full).r2, true);
    assert.equal(cliqueCloudConfig({ ...full, R2_BUCKET: " " }).r2, false);
    assert.equal(cliqueCloudConfig({ R2_ACCOUNT_ID: "acct" }).r2, false);
  });
});

describe("cliquePhotoKey", () => {
  it("scopes keys to the user and sanitizes segments", () => {
    assert.equal(
      cliquePhotoKey("user 1/x", "profile", "png", "id 9"),
      "users/user1x/photos/profile-id9.png",
    );
  });
  it("falls back to jpg for unknown extensions", () => {
    assert.match(cliquePhotoKey("u", "profile", "gif", "i"), /\.jpg$/);
  });
});

describe("object URLs", () => {
  it("uses the public base when set, else an honest r2:// reference", () => {
    assert.equal(
      r2ObjectRef({ R2_PUBLIC_BASE_URL: "https://cdn.example.com/", R2_BUCKET: "b" }, "k.jpg"),
      "https://cdn.example.com/k.jpg",
    );
    assert.equal(r2ObjectRef({ R2_BUCKET: "b" }, "k.jpg"), "r2://b/k.jpg");
  });
  it("builds Supabase public object URLs like cloud.server.ts", () => {
    assert.equal(
      supabaseObjectUrl("https://x.supabase.co/", "homie-files", "clique/a.jpg"),
      "https://x.supabase.co/storage/v1/object/public/homie-files/clique/a.jpg",
    );
  });
});

describe("SigV4 signing for R2", () => {
  it("sha256Hex matches the empty-string digest", async () => {
    assert.equal(
      await sha256Hex(""),
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
  });
  it("deriveSigningKey matches an independent HMAC chain", async () => {
    // Expected value computed independently with Python's hmac/hashlib for
    // secret/20150830/us-east-1/iam (the AWS docs example inputs) — the two
    // implementations agree byte-for-byte.
    const key = await deriveSigningKey("wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY", "20150830", "us-east-1", "iam");
    assert.equal(toHex(key), "c4afb1cc5771d871763a393e44b703571b55cc28424d1a5e86da6ed3c154a4b9");
  });
  it("signR2Put produces a deterministic, well-formed signed PUT", async () => {
    const opts = {
      accountId: "acct123",
      accessKeyId: "AKID",
      secretAccessKey: "secret",
      bucket: "photos",
      key: "users/u1/photos/profile-x.jpg",
      contentType: "image/jpeg",
      body: new Uint8Array([1, 2, 3]),
      now: new Date("2026-10-27T12:00:00Z"),
    };
    const a = await signR2Put(opts);
    const b = await signR2Put(opts);
    assert.equal(a.url, "https://acct123.r2.cloudflarestorage.com/photos/users/u1/photos/profile-x.jpg");
    assert.equal(a.headers.Authorization, b.headers.Authorization);
    assert.match(a.headers.Authorization, /^AWS4-HMAC-SHA256 Credential=AKID\/20261027\/auto\/s3\/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=[0-9a-f]{64}$/);
    assert.equal(a.headers["x-amz-date"], "20261027T120000Z");
  });
});
