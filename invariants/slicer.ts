/**
 * Slice one checksum256 (64 hex chars) into up to eight independent uint32 rolls.
 * No live orng.wax. Rejection sampling when modulus does not divide 2^32.
 */

export const MAX_SLICES = 8;
export const U32_MAX = 0xffffffffn;

const HEX64 = /^[0-9a-f]{64}$/;

export function normalize(checksumHex: string): string {
  const hex = checksumHex.toLowerCase();
  if (!HEX64.test(hex)) throw new Error("bad checksum");
  return hex;
}

/** Big-endian uint32 from slice index 0..7. */
export function sliceUint32(checksumHex: string, index: number): bigint {
  if (!Number.isInteger(index) || index < 0 || index >= MAX_SLICES) {
    throw new Error("bad index");
  }
  const hex = normalize(checksumHex);
  const start = index * 8;
  return BigInt("0x" + hex.slice(start, start + 8));
}

/**
 * Fair roll in 0..modulus-1 from one uint32.
 * Reject when value sits in the leftover tail of 2^32.
 */
export function rollFromUint32(value: bigint, modulus: number): number | "reject" {
  if (value < 0n || value > U32_MAX) throw new Error("bad uint32");
  if (!Number.isInteger(modulus) || modulus < 2 || modulus > 1_000_000) {
    throw new Error("bad modulus");
  }
  const mod = BigInt(modulus);
  const limit = ((U32_MAX + 1n) / mod) * mod;
  if (value >= limit) return "reject";
  return Number(value % mod);
}

export type SliceResult = {
  index: number;
  raw: string;
  roll: number | "reject";
};

export function sliceRolls(
  checksumHex: string,
  count: number,
  modulus: number,
): SliceResult[] {
  if (!Number.isInteger(count) || count < 1 || count > MAX_SLICES) {
    throw new Error("bad count");
  }
  const hex = normalize(checksumHex);
  const out: SliceResult[] = [];
  for (let i = 0; i < count; i++) {
    const raw = sliceUint32(hex, i);
    out.push({
      index: i,
      raw: raw.toString(),
      roll: rollFromUint32(raw, modulus),
    });
  }
  return out;
}

/** Changing bytes outside slice i must not change slice i. */
export function isolated(checksumHex: string, index: number): boolean {
  const hex = normalize(checksumHex);
  const original = sliceUint32(hex, index);
  const chars = hex.split("");
  const other = (index + 1) % MAX_SLICES;
  const pos = other * 8;
  chars[pos] = chars[pos] === "0" ? "1" : "0";
  const flipped = chars.join("");
  return (
    sliceUint32(flipped, index) === original &&
    sliceUint32(flipped, other) !== sliceUint32(hex, other)
  );
}
