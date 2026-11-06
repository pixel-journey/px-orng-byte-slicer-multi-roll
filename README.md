# px-orng-byte-slicer-multi-roll

> **Trust:** private educational lab (Tier B)  
> **Quest:** 007 — slice one checksum256 into up to eight uint32 rolls  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

One 64-hex checksum is eight big-endian uint32 slices. `sliceRolls(hex, count, modulus)` returns `count` rolls in `0..modulus-1`. A value in the leftover tail of `2^32` is `"reject"` so the modulus is not biased.

Flipping bytes in slice `j` does not change slice `i`.

**Real code:** `npm test`. No live `orng.wax`, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
