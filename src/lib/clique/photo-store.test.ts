import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { devicePhotoRef, isDevicePhotoRef, slotFromDevicePhotoRef } from "./photo-store.ts";

describe("device photo references", () => {
  it("round-trips a slot through its reference", () => {
    assert.equal(devicePhotoRef("profile"), "device-photo://profile");
    assert.equal(slotFromDevicePhotoRef("device-photo://profile"), "profile");
    assert.equal(isDevicePhotoRef("device-photo://profile"), true);
  });
  it("rejects foreign or empty references", () => {
    assert.equal(slotFromDevicePhotoRef("https://example.com/p.jpg"), null);
    assert.equal(slotFromDevicePhotoRef("device-photo://"), null);
    assert.equal(slotFromDevicePhotoRef("device-photo://  "), null);
    assert.equal(isDevicePhotoRef("data:image/png;base64,xx"), false);
  });
  it("keeps slots with path-like names intact", () => {
    assert.equal(slotFromDevicePhotoRef(devicePhotoRef("homie-42/avatar")), "homie-42/avatar");
  });
});
