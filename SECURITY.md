# Security notes — byte slicer

| Mitigated | Behavior |
| --- | --- |
| Bad checksum | refused |
| Bad index/count/modulus | refused |
| Biased mod | reject |

Production: still need once-only oracle resolve before trusting the checksum.
