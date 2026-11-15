# Tips

- Prefer fixed windows when the host only gives one `checksum256`. Prefer chained hashes when you need more than 8 values or variable modulus sequences.
- Never `raw % mod` on the full uint32 range without a rejection limit.
- Cap at 8 so a single entropy blob stays simple on chain.
