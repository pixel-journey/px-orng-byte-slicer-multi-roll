# Education — multi-roll from one checksum256

> **Rung:** `npm test` passes. One 32-byte checksum feeds up to **8** non-overlapping uint32 windows. No `orng.wax` call.  
> **The test is the rule.**

Use this when a single oracle delivery should drive several independent rolls (multi-bet, multi-loot, multi-stat) without requesting eight separate jobs.

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Eight windows; count 1..8 |
| Intermediate | Isolation + rejection sampling per window |
| Masterclass | When to prefer one job vs many jobs |

---

## Beginner

A 64-hex checksum is eight consecutive 4-byte words. Test `FULL` is blocks `00000000` … `77777777`.

| Slice index | `sliceUint32(FULL, i)` |
| --- | --- |
| 0 | 0 |
| 7 | 0x77777777 |

Count 0 or 9 → `bad count`. Count 1..8 ok.

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

## Masterclass — product angles

| Design | Tradeoff |
| --- | --- |
| One `requestrand`, eight rolls | Cheaper credits; correlated seed (same delivery) |
| Eight jobs | Independent entropy; 8× cost and callback surface |
| Reject one window | Policy: rerequest whole checksum vs only that roll |

Nice-to-have (not in repo): stream more than 8 windows by hashing the checksum into a chain of sub-seeds ([Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler) pattern).

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
