# Worked examples — slicer

## Example A — eight slices

`sliceRolls(hex64, 8, 100)` → eight `{ index, raw, roll }` where roll is `0..99` or `"reject"`.

## Example B — isolation

Flip one hex digit in window 3; window 0’s uint32 unchanged (`isolated` test).

## Example C — bad inputs

Non-64 hex, count 0 or 9, modulus 1 → refused.

## Example D — rejection

When `raw >= floor(2^32 / modulus) * modulus`, that slice’s roll is `"reject"`.
