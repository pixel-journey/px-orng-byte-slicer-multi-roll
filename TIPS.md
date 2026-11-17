# Tips — byte slicer

## Do

- Document window order in product specs (index 0 = first 4 bytes).  
- Apply rejection sampling **per** window.  
- Cap concurrent open multi-roll bets by total reserved liability.

## Don't

- Overlap windows (shared bytes → dependent rolls).  
- Settle a window that returned reject.  
- Assume 8 is a chain limit — it is this lab's teaching max.

## Related

[loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) · [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler) · [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout)
