# Worked examples — byte slicer

One 32-byte checksum (64 hex chars) splits into up to **8** non-overlapping uint32 windows.

Test checksum `FULL` is eight 8-hex blocks: `00000000` … `77777777`.

| Slice index | `sliceUint32(FULL, i)` |
| --- | --- |
| 0 | `0n` |
| 7 | `0x77777777n` |

`sliceRolls(FULL, 8, 100)` returns 8 results with 8 distinct raw values.

## Count

| Count | Result |
| --- | --- |
| 0 or 9 | `bad count` |
| 1 | length 1 |
| `MAX_SLICES` | 8 |

## Checksum shape

| Input | Error |
| --- | --- |
| `abcd` | bad checksum |
| `zz` × 32 | bad checksum |
| 63 hex chars | bad checksum |

Uppercase is normalized to the same uint32 as lowercase.

## Index and modulus

Index `-1` or `8` is `bad index`.
Modulus `1` or `1_000_001` is `bad modulus`.
Uint32 `-1n` or `U32_MAX + 1n` is `bad uint32`.

## Rejection tail (modulus 100)

Largest multiple of 100 that fits in `2^32` is accepted; that limit and `U32_MAX` return `"reject"`.

## Isolation and determinism

`isolated(FULL, i)` is true for every `i` in `0..7`: changing another slice does not change this one.
Same checksum and modulus always yield the same `sliceRolls` array.

No `orng.wax`. The checksum is an argument.
