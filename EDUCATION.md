# Education

A checksum256 is 32 bytes. Taking `uint32` windows at offsets 0, 4, 8, … 28 gives eight rolls from one random value without a second `requestrand`.

`value % modulus` over the full `2^32` range is slightly biased when `modulus` does not divide `2^32`. This lab rejects values at or above `floor(2^32 / modulus) * modulus`.

Count is capped at 8 because there are only eight non-overlapping uint32 windows.
