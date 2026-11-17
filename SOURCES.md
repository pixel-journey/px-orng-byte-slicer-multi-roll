# Sources

| Source | Use |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | checksum256 delivery |
| [docs.wax.io](https://docs.wax.io/) | WAX development |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Sample path |

One 32-byte delivery can feed up to **eight** non-overlapping uint32 windows. Rejection sampling still applies **per window**.

## Related labs

| Lab | Topic |
| --- | --- |
| [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) | Feed a slice into weighted bands |
| [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler) | Chained sub-seeds (not independent windows) |
| [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) | Single-modulus game book |
| [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md) | Curriculum + reject windows |
