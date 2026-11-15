# Independent uint32 rolls from one checksum256

Slice a 32-byte ORNG-style value into up to eight non-overlapping windows and map each with rejection sampling. Pure TypeScript; checksum is an argument, not a live orng call.

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Isolation + rejection |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | FULL checksum windows |
| [SOURCES.md](SOURCES.md) | orng / Antelope context |

```bash
npm test
```

MIT — Pixel Journey
