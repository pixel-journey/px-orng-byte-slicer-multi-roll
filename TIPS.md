# Tips — slice one checksum256 into independent rolls

## Do

- Document window order in product specs (index 0 = first 4 bytes, big-endian uint32 unless tests say otherwise).
- Apply rejection sampling **per** window. One reject does not poison the other windows unless your product says so — this lab settles only accepted windows.
- Cap concurrent open multi-roll bets by **total** reserved liability, not by roll count alone.

## Don't

- Overlap windows (shared bytes → dependent rolls).
- Settle a window that returned reject.
- Assume 8 is a chain limit. It is this lab's teaching max.

## Common mistakes

1. Reusing the same 4 bytes for roll 1 and roll 2 "to save entropy."
2. One reject → treat the whole multi-roll as a loss.
3. Reserving bank for one max payout when eight windows can all hit the top tier.
4. Confusing this with Fisher–Yates. Slicing gives independent modular rolls; the deck shuffler chains sub-seeds.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Variable window count from the memo | Bound it hard |
| Feed slices into a CDF | [loot table](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) |
| Deck from chained hashes | [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler) |

Related: [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) · [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) · `px-contract-examples-vault` (private index; not this public course)
