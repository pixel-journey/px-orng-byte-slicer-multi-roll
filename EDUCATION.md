# Education — multi-roll from one seed

## Beginner

One ORNG result is 32 bytes. Eight uint32 slices let a single request drive several independent rolls (dice, loot, sub-bets) without a second network round.

## Intermediate

Slices do not share bytes. Each window is 4 bytes. A fair mod still needs a rejection tail when the range does not divide `2^32`.

Count is 1..8. A game that needs 9 independent values must chain a second seed (see Fisher–Yates) or request again.

## Masterclass (not in this repo)

- On-chain `sha256` to derive sub-seeds instead of fixed windows.
- Paying a multi-outcome bet from the slice vector.

## Outcomes

1. Draw the 8 windows on a 64-hex string.
2. Show why modulus 100 rejects the top of the uint32 range.
3. Prove isolation: flip slice 3, slice 0 is unchanged.
