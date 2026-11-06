# Parameters

Section parameters use the `[$]` marker at the top of a section, inside its first sub-section. They override the initial header parameters and can add navigation or articulation information.

| Parameter | Type | Description |
| --- | --- | --- |
| `label` | string | Text label for the section. |
| `time` | number list of length 2 | Time signature for this section. |
| `tempo` | extended tempo | [Tempo](../data-types.md#tempos) name, BPM value, `rit`, or `accel`. |
| `ending` | number | Ending (volta) number. |
| `key` | key | [Key signature](../data-types.md#keys) for this section. |
| `jump` | jump | [Jump](../data-types.md#jumps) instruction such as `DS` or `DC`. |
| `mark` | mark | [Mark](../data-types.md#marks) such as segno, coda, fine, or to-coda. |
| `touches` | timed touch list | [Articulations](../data-types.md#touches) attached to notes. |
| `repeat` | number | Repeat count. |
| `dynamics` | timed dynamic list | [Dynamic levels and changes](../data-types.md#dynamics) (sub-section only). |

```voxalfa fragment
[$] key={G} | time={3,4} | tempo={allegro} | label="Verse" | repeat={2}
```

## Tempo changes

`tempo` accepts the same static values as the header, plus `rit` and `accel` for gradual changes:

```voxalfa fragment
[$] tempo={96}
[$] tempo={rit}
[$] tempo={accel}
```

## Navigation

Jumps and marks describe repeats and navigation in the rendered score:

```voxalfa fragment
; first section: repeat with an ending
[$] mark={S} | repeat={2} | ending={1}

--

; final section: jump back to the segno and stop at the fine
[$] jump={DS} | mark={F}
```

See [Jumps](../data-types.md#jumps) and [Marks](../data-types.md#marks) for the available values.

## Touches

Touches are timed values, so they can target a note or a time range:

```voxalfa fragment
[$] touches={frm:4}
[$] touches={stc:0..2, mrc:3}
```

The time indices are relative to the section start and note durations, just like timed dynamics. See [Timed values](../data-types.md#timed-values).

## Dynamics

Dynamics are declared at sub-section level. They can be repeated in every sub-section of a section:

```voxalfa fragment
[$] dynamics={p:0, cre:1..2, f:3}

[S] |d :r !m :f ||
[A] |d :r !m :f ||
```

`p:0` sets a piano dynamic at the first note, `cre:1..2` creates a crescendo from the second to the third note, and `f:3` sets forte at the fourth note. A value without an index defaults to `0`.

Because dynamics belong to a sub-section, different voices can have independent dynamic markings: put the voices in separate sub-sections and give each sub-section its own `[$] dynamics` line.
