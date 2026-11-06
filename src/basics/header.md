# Header

The header is the part of a document before the `---` separator. It contains static metadata, initial playback parameters, and optional compiler and styling directives.

```voxalfa fragment
;; @version 0.1.0-alpha

[#] title="Hello, Voxalfa"
[#] verses={1}

[$] key={C} | time={4,4} | tempo={100} | voices={S,A,T,B}

---
```

The header is declarative: it describes the score, but it does not contain notes. Notes and lyrics belong to the [body](./body.md).

- [Metadata](./header/metadata.md) describes the score itself, such as its title, author, and language.
- [Parameters](./header/parameters.md) set the initial key, time signature, tempo, and voices.
- [Styling](./header/styling.md) configures page dimensions, fonts, colors, and spacing for rendered output.
