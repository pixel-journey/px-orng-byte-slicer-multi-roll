# Education — multi-roll from one checksum256

> **Rung:** `npm test` passes. One 32-byte value → up to eight uint32 slices.  
> Useful when a single oracle resolve must drive several independent faces.

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Slice index `i` → bytes `[8i .. 8i+7]` as big-endian uint32 |
| Intermediate | Rejection-sample each slice into `0..modulus-1` |
| Masterclass | Isolation: flipping another slice must not change this one |

## Beginner

A `checksum256` is 64 hex characters. Eight non-overlapping windows of 8 hex digits each yield eight uint32 values.

## Intermediate

`rollFromUint32` rejects the top of the `2^32` range so `value % modulus` is unbiased. A reject on one slice does not rewrite others — product policy decides whether to rerequest the whole job.

## Masterclass

`isolated()` in tests proves changing another window leaves slice `i` unchanged. Do not re-hash between slices unless you intentionally want dependence (Fisher–Yates chains hashes on purpose).

## Will not teach

Game payouts or oracle delivery — see dice/coinflip after slicing.
