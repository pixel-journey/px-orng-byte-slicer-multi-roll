# AI handoff — byte-slicer multi-roll

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | checksum256 delivery |
| [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler) | Chained sub-seeds (different product) |
| [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) | Feed a slice into bands |

## Non-negotiables

1. One 32-byte delivery feeds up to **eight** non-overlapping uint32 windows.
2. Rejection sampling applies **per window**. Never settle a rejected window as a low residue.
3. Windows are independent. Reject on window 3 does not rewrite window 1.
4. Policy for multi-window checksums: rerequest whole delivery vs only rejected window — document it; no third path without a test.
5. This is **not** a deck shuffle (Fisher–Yates uses chained sub-seeds).
6. Entropy is an argument. No broadcast.

## Prompt seeds

- "Slice eight uint32 windows from one checksum256."
- "Window 3 rejects — are windows 1–2 still valid?"
- "Refuse settling a rejected modulus residue as a roll."
- "Contrast with Fisher–Yates chained sub-seeds."

## Do not

- Overlap windows.
- Treat this as a deck.
- Invent a third rerequest policy without tests.
