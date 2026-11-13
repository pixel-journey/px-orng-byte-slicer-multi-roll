# Slice one checksum256 into independent rolls

> **Domain:** WAX ORNG — multi-roll from one entropy  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** One 64-hex checksum is eight big-endian uint32 slices. `sliceRolls(hex, count, modulus)` returns `count` rolls in `0..modulus-1`. A value in the leftover tail of `2^32` is `"reject"` so the modulus is not biased.

Flipping bytes in slice `j` does not change slice `i` — independent sub-rolls from one oracle delivery.

**Code under test:** `npm test`. No live `orng.wax`, no wasm.

**Official RNG:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng).

```bash
npm test
```

MIT — Pixel Journey
