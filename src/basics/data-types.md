# Data Types

Voxalfa has a small set of primitive types. Values are written either directly after `=` or inside braces for lists and structured values.

Examples in this chapter often show alternative values for the same key. In a real document, assign each key once per scope; reassigning a key produces a warning.

## Primitive types

| Type | Examples | Notes |
| --- | --- | --- |
| Number | `100`, `1.5`, `3` | Integers and floats. |
| String | `"Hello"`, `"mg"` | Delimited by double quotes. |
| Boolean | Reserved | Planned for future options. |
| Builtin | `C`, `allegro`, `S`, `frm` | Predefined constants; see below. |

## Strings

Strings are always quoted:

```voxalfa fragment
[#] title="Ry Tanindrazanay Malala ô!"
[#] language="mg"
```

A string list uses braces and comma-separated values:

```voxalfa fragment
[#] author={"Norbert Raharisoa", "Pasteur Rahajason"}
[#] tags={"anthem", "madagascar"}
```

## Numbers

Integers and floats are written without quotes:

```voxalfa fragment
[#] verses={1}
[#] release={1958}
[$] tempo={100}
```

Some parameters expect a list of numbers, such as the time signature:

```voxalfa fragment
[$] time={4,4}
[$] time={3,4}
```

## Booleans

Boolean values are reserved for future options. No current metadata field or parameter uses them yet.

## Lists

Lists are comma-separated values inside braces:

```voxalfa fragment
[$] voices={S,A,T,B}
[#] tags={"anthem", "evangelic"}
[$] time={6,8}
```

## Builtins

Builtins are predefined constants written without quotes. Each builtin belongs to a specific parameter or metadata field.

### Keys

The key sets the tonal center used to interpret solfa notes and to render the key signature.

Natural keys:

- `C`: C major or A minor.
- `D`: D major or B minor.
- `E`: E major or C-sharp minor.
- `F`: F major or D minor.
- `G`: G major or E minor.
- `A`: A major or F-sharp minor.
- `B`: B major or G-sharp minor.

Sharp keys:

- `C#`, `D#`, `E#`, `F#`, `G#`, `A#`, `B#`

Flat keys:

- `Cb`, `Db`, `Eb`, `Fb`, `Gb`, `Ab`, `Bb`

```voxalfa fragment
[$] key={Eb}
[$] key={F#}
```

### Tempos

Tempos control playback speed. A tempo can be a named static tempo, an explicit BPM number, or a gradual change.

#### Static tempos

- `grave`: very slow, 40 BPM.
- `largo`: broad, 50 BPM.
- `adagio`: slow, 70 BPM.
- `andante`: walking pace, 90 BPM.
- `moderato`: moderate, 110 BPM.
- `allegro`: fast, 130 BPM.
- `vivace`: lively, 160 BPM.
- `presto`: very fast, 180 BPM.
- Any integer: an explicit BPM value, for example `96`.

```voxalfa fragment
[$] tempo={adagio}
[$] tempo={96}
```

#### Extended tempos

- `rit`: ritardando; gradually slower.
- `accel`: accelerando; gradually faster.

```voxalfa fragment
[$] tempo={rit}
[$] tempo={accel}
```

### Voices

Voices select which part of the score a solfa line belongs to.

- `S`: soprano.
- `A`: alto.
- `T`: tenor.
- `B`: bass.

```voxalfa fragment
[$] voices={S,A,T,B}
```

### Jumps

Jumps control navigation during playback and are rendered as jump labels.

- `DS`: dal segno; jump back to the segno.
- `DC`: da capo; jump back to the beginning.
- `DSC`: dal segno al coda; jump to the segno, then to the coda.
- `DSF`: dal segno al fine; jump to the segno, then to the fine.
- `DCC`: da capo al coda; jump to the beginning, then to the coda.
- `DCF`: da capo al fine; jump to the beginning, then to the fine.

```voxalfa fragment
[$] jump={DS}
[$] jump={DCF}
```

### Marks

Marks identify the targets used by jumps and are rendered as symbols or labels.

- `S`: segno.
- `C`: coda.
- `F`: fine.
- `TC`: to coda.

```voxalfa fragment
[$] mark={S}
[$] mark={F}
```

### Touches

Touches are articulations: they describe how a note is played rather than how loud or how long the whole section is.

- `stc`: staccato; play the note short and detached.
- `frm`: fermata; hold the note longer than its written value.
- `mrc`: marcato; play the note with a strong accent.

```voxalfa fragment
[$] touches={frm:4}
```

### Dynamics

Dynamics control loudness and are rendered as dynamic markings.

- `ppp`: pianississimo; very, very soft.
- `pp`: pianissimo; very soft.
- `p`: piano; soft.
- `mp`: mezzo-piano; moderately soft.
- `mf`: mezzo-forte; moderately loud.
- `f`: forte; loud.
- `ff`: fortissimo; very loud.
- `fff`: fortississimo; very, very loud.
- `cre`: crescendo; gradually louder.
- `dec`: decrescendo; gradually softer.

```voxalfa fragment
[$] dynamics={p:2}
```

## Timed values

### Time indices

Dynamics and touches can be attached to a time index. Time indices are zero-based and relative to the section start and note durations. A value without an index defaults to `0`.

`dynamics` is a sub-section parameter, while `touches` is a section parameter. Both are written at the start of a section, inside its first sub-section.

```voxalfa fragment
[$] dynamics={p:2}
[$] touches={frm:4}
```

Consider this section:

```voxalfa fragment
[$] dynamics={p:2}

;    0  1  2  3
[S] |d :r !m :f ||
```

Each pulse is a whole note, so `p:2` targets the third pulse.

With beat divisions, the indices become fractional:

```voxalfa fragment
[$] dynamics={cre:0.5..1}

;    0 0.25 0.5 0.75 1  1.5
[S] |d  ,r  .m  ,f  :s  .l ||
```

### Ranges

A time range uses `..` and is inclusive:

```voxalfa fragment
[$] dynamics={cre:0.5..1}
```

In the earlier `4/4` example with beat divisions, this range starts the crescendo at the third note and ends it at the fifth note, at time index `1`.

## Comments

Inline comments start with a single semicolon:

```voxalfa fragment
[S] |d :r !m :f ||  ; the text after the semicolon is ignored
```

## Directives

Compiler directives start with `;; @` and provide context to the compiler:

```voxalfa fragment
;; @version 0.1.0-alpha
;; @page width={200} | height={1000}
```

The `version` directive is validated against the compiler version. Styling directives are documented in [Styling](./header/styling.md).
