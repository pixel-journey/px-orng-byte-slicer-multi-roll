# Sources

| Source | Use |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | checksum256 delivery |
| [docs.wax.io](https://docs.wax.io/) | WAX development |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Sample path |

## Product facts locked by tests

- One 32-byte delivery can feed up to **eight** non-overlapping uint32 windows.
- Rejection sampling still applies **per window**. Never settle a rejected window as a low residue.
- Windows are independent. A reject on window 3 does not rewrite window 1.
- Policy for multi-window checksums: rerequest the whole delivery vs only the rejected window — document it; do not invent a third path without a test.
- This is not a deck shuffle. Chained sub-seeds are [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler).

## Related labs

| Lab | Topic |
| --- | --- |
| [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) | Feed a slice into weighted bands |
| [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler) | Chained sub-seeds (not independent windows) |
| [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) | Single-modulus game book |
| `px-contract-examples-vault` (private index; not this public course) | Curriculum + reject windows |
