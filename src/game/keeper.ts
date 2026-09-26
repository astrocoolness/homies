const KEY = "homies.keeper";

export const KEEPER_RE = /^k[a-f0-9]{32}$/;

export function readKeeperId(): string {
  if (typeof localStorage === "undefined") return "";
  const existing = localStorage.getItem(KEY);
  if (existing && KEEPER_RE.test(existing)) return existing;
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const id = `k${[...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  localStorage.setItem(KEY, id);
  return id;
}

export function setKeeperId(id: string): boolean {
  if (typeof localStorage === "undefined") return false;
  const next = id.trim().toLowerCase();
  if (!KEEPER_RE.test(next)) return false;
  localStorage.setItem(KEY, next);
  return true;
}
