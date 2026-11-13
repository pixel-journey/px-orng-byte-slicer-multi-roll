# Slice one checksum256 into up to eight uint32 rolls

> **Domain:** WAX ORNG — multi-roll entropy  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Non-overlapping big-endian uint32 slices from a 64-hex checksum, each optionally rejection-sampled into `0..modulus-1`. Slices are independent.

**Code under test:** `npm test`. No live `orng.wax`.

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Slice, isolate, reject |
| [TIPS.md](TIPS.md) | Independent vs chained |
| [SECURITY.md](SECURITY.md) | Bounds |
| [SOURCES.md](SOURCES.md) | Official |

```bash
npm test
```

MIT — Pixel Journey
