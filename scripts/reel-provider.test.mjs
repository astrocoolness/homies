import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import { requestReelScene, requestReelVideo } from "../src/game/reel-provider.ts";

beforeEach(() => mock.method(console, "error", () => {}));
afterEach(() => mock.restoreAll());

function provider(responses) {
  const calls = [];
  mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({ url, headers: init.headers, body: JSON.parse(init.body) });
    const response = responses.shift();
    assert.ok(response, "unexpected additional provider call");
    if (response instanceof Error) throw response;
    return new Response(JSON.stringify(response.body), { status: response.status ?? 200 });
  });
  return calls;
}

test("room request preserves the portrait, setting and provider contract", async () => {
  const calls = provider([{ body: { data: [{ url: "https://images.example/room.jpg" }] } }]);
  const result = await requestReelScene("test-key", "data:image/jpeg;base64,portrait", "Underground. Buys random stuff.");
  assert.deepEqual(result, { ok: true, url: "https://images.example/room.jpg" });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.x.ai/v1/images/edits");
  assert.equal(calls[0].headers.Authorization, "Bearer test-key");
  assert.equal(calls[0].body.image.url, "data:image/jpeg;base64,portrait");
  assert.match(calls[0].body.prompt, /Underground\. Buys random stuff\./);
});

for (const [status, code, message, reason] of [
  [401, "invalid_api_key", "bad key", "auth"],
  [402, "payment_required", "payment required", "credits"],
  [403, "permission_denied", "access denied", "auth"],
  [429, "insufficient_quota", "out of credits", "credits"],
  [429, "rate_limit_exceeded", "slow down", "rate_limit"],
  [400, "content_policy_violation", "model refused for safety", "policy"],
  [400, "invalid_image", "invalid portrait", "request"],
  [500, "internal_error", "model unavailable", "unavailable"],
]) {
  test(`${status} ${code} is actionable and never retried`, async () => {
    const raw = `Private team identifier 123, secret test-key: ${message}`;
    const calls = provider([{ status, body: { error: { code, message: raw } } }]);
    const result = await requestReelScene("test-key", "portrait", "room");
    assert.equal(result.ok, false);
    assert.equal(result.reason, reason);
    assert.equal(calls.length, 1);
    assert.doesNotMatch(JSON.stringify(result), /Private|identifier|test-key/);
    assert.doesNotMatch(JSON.stringify(console.error.mock.calls), /Private|identifier|test-key/);
  });
}

test("only model-not-found tries the compatible image model once", async () => {
  const calls = provider([
    { status: 404, body: { error: { code: "model_not_found", message: "The model does not exist" } } },
    { body: { data: [{ url: "https://images.example/fallback.jpg" }] } },
  ]);
  assert.equal((await requestReelScene("key", "portrait", "room")).ok, true);
  assert.deepEqual(calls.map((call) => call.body.model), ["grok-imagine-image-2.0", "grok-imagine-image"]);
});

test("base64 image response keeps its MIME type", async () => {
  provider([{ body: { data: [{ b64_json: "encoded", mime_type: "image/jpeg" }] } }]);
  assert.deepEqual(await requestReelScene("key", "portrait", "room"), { ok: true, url: "data:image/jpeg;base64,encoded" });
});

test("empty successful response fails without starting more requests", async () => {
  const calls = provider([{ body: { data: [] } }]);
  const result = await requestReelScene("key", "portrait", "room");
  assert.equal(result.reason, "response");
  assert.equal(calls.length, 1);
});

test("timeout never retries a request that might already be generating", async () => {
  const calls = provider([new DOMException("Timed out", "TimeoutError")]);
  const result = await requestReelScene("key", "portrait", "room");
  assert.equal(result.reason, "timeout");
  assert.equal(calls.length, 1);
});

test("video uses the generated room and preserves ten-second duration", async () => {
  const calls = provider([{ body: { request_id: "request-12345678" } }]);
  assert.deepEqual(await requestReelVideo("key", "https://images.example/room.jpg", "Boop"), { ok: true, requestId: "request-12345678" });
  assert.equal(calls[0].body.duration, 10);
  assert.equal(calls[0].body.image.url, "https://images.example/room.jpg");
});

test("video credit failures are never retried", async () => {
  const calls = provider([{ status: 429, body: { error: "This team has no credits" } }]);
  assert.equal((await requestReelVideo("key", "room", "Boop")).reason, "credits");
  assert.equal(calls.length, 1);
});

test("invalid video response cannot create a pending take", async () => {
  provider([{ body: { request_id: "../not-a-request" } }]);
  assert.equal((await requestReelVideo("key", "room", "Boop")).reason, "response");
});
