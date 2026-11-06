# Security

| Surface | Closed by |
| --- | --- |
| Short or non-hex checksum | refused |
| Ninth roll from the same 32 bytes | count > 8 refused |
| Modulo bias | reject tail of 2^32 |
| Cross-slice coupling | isolation check |

Not claimed: live ORNG delivery, chained sub-seeds (Fisher-Yates is quest 008), wasm.
