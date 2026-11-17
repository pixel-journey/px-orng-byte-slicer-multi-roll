# Security — byte slicer multi-roll

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Bad checksum / count / index / modulus | refused |
| U32 rejection tail | `reject` per window |
| Overlapping use of the same window | isolation checks — other slices do not change this one |
| Determinism | same checksum + modulus → same rolls |
| Count 0 or > 8 | refused |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Oracle delivery | once-resolve; checksum is the randomness bytes |
| Multi-bet solvency | Cap **total** reserved liability across all open multi-roll bets |
| Auth | Player on place; oracle on deliver |
| Partial reject policy | Product must say whether one reject voids the whole ticket |

## Attack angles

1. Overlapping windows (dependent rolls sold as independent).
2. Settling a rejected window as a loss or win.
3. Reserving bank for one max payout when eight windows can all hit the top tier.
4. Treating 8 as a chain limit rather than a lab cap.

## Honesty limits

No `orng.wax`. The checksum is an argument. Related: [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) · [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler).
