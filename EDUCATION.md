# Education — multi-roll from one checksum256

> **Rung:** `npm test` passes. One 32-byte checksum feeds up to **8** non-overlapping uint32 windows. No `orng.wax` call.  
> **The test is the rule.**

Use this when a single oracle delivery should drive several independent rolls (multi-bet, multi-loot, multi-stat) without requesting eight separate jobs.

Infra: [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent). Related rolls: [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) · [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) · [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler).

Official: [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) · [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Eight windows; count 1..8 |
| Intermediate | Isolation + rejection sampling per window |
| Masterclass | One job vs many jobs; partial-reject product policy |

---

## Beginner

A 64-hex checksum is eight consecutive 4-byte words. Test `FULL` is blocks `00000000` … `77777777`.

| Slice index | `sliceUint32(FULL, i)` |
| --- | --- |
| 0 | 0 |
| 7 | 0x77777777 |

Count 0 or 9 → `bad count`. Count 1..8 ok.

```bash
npm test
```

---

## Intermediate

Each window maps through rejection sampling for a chosen modulus (e.g. 100). The U32 tail returns `"reject"` — same fairness rule as loot/dice.

**Isolation:** changing another slice does not change this one. Same checksum + modulus → deterministic `sliceRolls` array.

Uppercase hex normalizes to the same uint32 as lowercase.

### Shape refusals

| Input | Error |
| --- | --- |
| short / non-hex / odd length | bad checksum |
| index -1 or 8 | bad index |
| modulus 1 or > 1_000_000 | bad modulus |
| uint32 out of range | bad uint32 |

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Overlapping windows sold as independent | Isolation tests — fixed non-overlap |
| Settle reject as a low residue | Per-window `reject` |
| Reserve bank for one max hit when eight can win | Product must sum liabilities |
| Count 9 | refused |

---

## Masterclass — product angles

| Design | Tradeoff |
| --- | --- |
| One `requestrand`, eight rolls | Cheaper credits; correlated seed (same delivery) |
| Eight jobs | Independent entropy; 8× cost and callback surface |
| Reject one window | Policy: rerequest whole checksum vs only that roll |

### Common mistakes

1. Treating eight windows as eight independent oracle jobs.  
2. Settling a rejected window.  
3. Using this for a full deck shuffle — use Fisher–Yates.  
4. Assuming 8 is a chain hard limit rather than a lab cap.

### Nice-to-have (not in repo)

| Idea | Note |
| --- | --- |
| More than 8 windows | Hash the checksum into chained sub-seeds (Fisher–Yates pattern) |
| Mixed moduli per window | New tests per window |
| Live dual-callback binding | Entropy argument becomes oracle randomness |

### Exercises

1. Max window count? (**8**.)  
2. Does a reject on window 3 change window 1? (No.)  
3. Is this a deck shuffle? (No.)  
4. Same checksum twice — same rolls? (Yes.)

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) · [SECURITY](SECURITY.md) · [SOURCES](SOURCES.md).

---

## What this course will not teach

- A live `requestrand`
- That eight rolls are eight independent oracle deliveries
- Bank accounting for multi-window max liability (design it; do not invent without tests)
