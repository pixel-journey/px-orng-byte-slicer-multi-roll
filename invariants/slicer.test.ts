import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_SLICES,
  isolated,
  rollFromUint32,
  sliceRolls,
  sliceUint32,
  U32_MAX,
} from "./slicer.ts";

const FULL = ["00000000","11111111","22222222","33333333","44444444","55555555","66666666","77777777"].join("");
assert.equal(FULL.length, 64);

test("eight slices cover the checksum without overlap", () => {
  const rolls = sliceRolls(FULL, 8, 100);
  assert.equal(rolls.length, 8);
  const raws = rolls.map((r) => r.raw);
  assert.equal(new Set(raws).size, 8);
  assert.equal(sliceUint32(FULL, 0), 0n);
  assert.equal(sliceUint32(FULL, 7), 0x77777777n);
});

test("count bounds 1..8", () => {
  assert.throws(() => sliceRolls(FULL, 0, 6), /bad count/);
  assert.throws(() => sliceRolls(FULL, 9, 6), /bad count/);
  assert.equal(sliceRolls(FULL, 1, 6).length, 1);
  assert.equal(MAX_SLICES, 8);
});

test("short, odd, and non-hex checksums refused", () => {
  assert.throws(() => sliceUint32("abcd", 0), /bad checksum/);
  assert.throws(() => sliceUint32("zz".repeat(32), 0), /bad checksum/);
  assert.throws(() => sliceUint32(FULL.slice(0, 63), 0), /bad checksum/);
});

test("uppercase checksum is normalized", () => {
  assert.equal(sliceUint32(FULL.toUpperCase(), 0), sliceUint32(FULL, 0));
});

test("bad index refused", () => {
  assert.throws(() => sliceUint32(FULL, -1), /bad index/);
  assert.throws(() => sliceUint32(FULL, 8), /bad index/);
});

test("modulus bounds", () => {
  assert.throws(() => rollFromUint32(0n, 1), /bad modulus/);
  assert.throws(() => rollFromUint32(0n, 1_000_001), /bad modulus/);
});

test("rejection tail of 2^32 for modulus 100", () => {
  const mod = 100n;
  const limit = ((U32_MAX + 1n) / mod) * mod;
  assert.equal(rollFromUint32(limit - 1n, 100), Number((limit - 1n) % mod));
  assert.equal(rollFromUint32(limit, 100), "reject");
  assert.equal(rollFromUint32(U32_MAX, 100), "reject");
});

test("slice isolation: flipping another slice does not change this one", () => {
  for (let i = 0; i < 8; i++) assert.equal(isolated(FULL, i), true);
});

test("deterministic: same checksum, same rolls", () => {
  const a = sliceRolls(FULL, 8, 37);
  const b = sliceRolls(FULL, 8, 37);
  assert.deepEqual(a, b);
});

test("uint32 outside range refused", () => {
  assert.throws(() => rollFromUint32(-1n, 10), /bad uint32/);
  assert.throws(() => rollFromUint32(U32_MAX + 1n, 10), /bad uint32/);
});
