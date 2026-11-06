# Lyrics

Lyrics use a verse marker and are attached to solfa notes by order:

```voxalfa fragment
[S] |d .r :m .f !s .l :t .d+1 ||
[1] do re mi fa so la ti do
```

**By default, one lyric token takes exactly one note.** Visual alignment is not required: the compiler matches lyric tokens to notes from left to right.

## Operators

Tokens are joined with operators that describe spacing, concatenation, and line breaks. The operators exist so that lyrics can be rendered as normal text outside the score: they tell the lyric renderer where spaces, joins, and line breaks belong, without relying on visual alignment.

| Operator | Meaning | Example |
| --- | --- | --- |
| space | Word space. | `do re` |
| `_` | Concatenate without a space. | `re_mi` |
| `\` | Line break. | `mi\fa` |

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re_mi\fa
```

The lyrics render as:

```text
do remi
fa
```

## Unaligned voices

When voices divide the same pulse differently, their notes cannot be aligned one-to-one. A lyric token then attaches to the whole pulse instead of a single note:

```voxalfa fragment
[S] |d .d :m !f ||
[A] |d    :m !f ||
[1] do    mi fa
```

The first pulse has two soprano notes and one alto note. The lyric token `do` covers the whole pulse, so it is sung over both soprano notes and the single alto note. The same rule applies whenever voices have different beat divisions inside a pulse. This pulse-wide attachment is the main exception to the default one-token-per-note rule.

## Per-voice lyrics

To give each voice its own lyrics, put each voice and its lyric line in a separate sub-section:

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re mi fa

++

[A] |d :r !m :f ||
[1] la ti do re
```

## Grouping

Parentheses group multiple words under a single note:

```voxalfa fragment
[S] |d :r !m :f ||
[1] (do o) re mi fa
```

Operators may be used inside a group.

## Anchors

The anchor `@@` links the last token of a lyric line to the first token of the next section. It must be preceded by an operator:

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re mi fa @@

--

[S] |s :l !t :d+1 ||
[1] so la ti do
```

Anchors are useful when a word spans a section break.

## Spans

The span modifier `@` extends a token over multiple notes:

```voxalfa fragment
[S] |d :- !r :m ||
[1] do@2 re mi
```

Here `do@2` covers the first two pulses, `re` covers the third, and `mi` covers the fourth.

## Placeholders

The placeholder `~` reserves a note without rendering text:

```voxalfa fragment
[S] |d :r !m :f ||
[1] do ~ mi fa
```

This is useful when a word should be omitted for one verse but the surrounding text must stay aligned.

## Underlining and slurs

Backticks underline the text that corresponds to a slur. Surround a range to underline it:

```voxalfa fragment
[S] |`d :r !m :f` ||
[1] `do re mi fa`
```

## Special characters

Some characters have a syntactic meaning in lyrics. Use the corresponding escape when they must appear as text:

| Escape | Character |
| --- | --- |
| `&bls` | `\` |
| `&tld` | `~` |
| `&btk` | `` ` `` |
| `&sls` | `/` |
| `&lpr` | `(` |
| `&rpr` | `)` |
| `&atr` | `@` |
| `&amp` | `&` |
| `&scl` | `;` |
| `&dot` | `.` |

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re&amp mi fa
```

Special characters are written as separate tokens. They do not consume an extra note.
