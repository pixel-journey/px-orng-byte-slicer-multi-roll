# Education — multi-roll from one checksum

One `checksum256` (32 bytes) can feed several independent uint32 windows without overlapping bytes. This lab slices up to **8** windows and maps each through rejection sampling for a chosen modulus.

## Beginner

1. A 64-hex checksum is eight consecutive 4-byte words.
2. `sliceUint32(i)` reads window `i` only.
3. Count must be 1..8.

## Intermediate

Rejection sampling: accept only values below the largest multiple of the modulus that fits in 2^32. Values at the limit and above return `"reject"` — do not use naive `uint32 % mod` over the full range.

Changing another window must not change this window (`isolated`).

## Masterclass (not in this repo)

Live `orng.wax` delivery of the checksum; multi-bet settlement; WASM host sha256.

## Outcomes

1. Read windows 0 and 7 from the test FULL checksum.
2. Show modulus 100 rejection at the U32 tail.
3. Show bad count 0/9 and bad checksum shapes.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
