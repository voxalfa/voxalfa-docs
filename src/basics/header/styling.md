# Styling

Rendered output can be customized with language directives. Directives use `;; @` and live in the header:

```voxalfa fragment
;; @version 0.1.0-alpha

;; @page width={200} | height={1000}
;; @note-text font-size={12}
;; @lyrics-text font-size={10} | font-style="italic"
```

Each directive starts with `;; @`, followed by the directive name, a space, and one or more assignments separated by `|`.

## Version

The optional `version` directive declares which compiler version the document targets:

```voxalfa fragment
;; @version 0.1.0-alpha
```

It is validated when present, so a document written for an incompatible version produces a diagnostic.

## Page

The `page` directive controls the page dimensions and margin. Width and height are SVG user units; the default page is A4.

```voxalfa fragment
;; @page width={200} | height={1000} | margin={20}
```

Margins can also be set per side in the same directive:

```voxalfa fragment
;; @page width={200} | height={1000} | margin-top={30} | margin-right={20} | margin-bottom={30} | margin-left={20}
```

A later `@page` directive replaces the entire page style, so combine page options in one directive.

Page options:

| Option | Description |
| --- | --- |
| `width` | Page width. |
| `height` | Page height. |
| `margin` | Margin on all sides. |
| `margin-top`, `margin-right`, `margin-bottom`, `margin-left` | Individual margins. |
| `margin-x`, `margin-y` | Horizontal or vertical margins. |

## Element styles

Element directives control typography and spacing for a specific part of the rendered score:

```voxalfa fragment
;; @title-text font-family="serif" | font-size={24} | font-weight="bold" | color="#222222"
;; @note-text font-size={12}
;; @lyrics-text font-size={10} | font-stretch="condensed" | font-style="italic" | color="#333333"
```

Element directives:

| Directive | Target |
| --- | --- |
| `title-text` | Score title. |
| `author-text` | Author line. |
| `composer-text` | Composer line. |
| `key-text` | Key signature text. |
| `time-text` | Time signature text. |
| `meter-text` | Meter text. |
| `note-text` | Solfa note text. |
| `octave-text` | Octave numbers. |
| `lyrics-text` | Lyrics. |
| `divider-text` | Dividers and barlines. |
| `page-number-text` | Page numbers. |
| `key-label` | Key label. |
| `time-label` | Time label. |
| `tempo-label` | Tempo label. |
| `jump-label` | Jump label. |
| `mark-label` | Mark label. |
| `dynamic-label` | Dynamic label. |
| `volta-label` | Volta label. |

### Element properties

| Property | Value | Description |
| --- | --- | --- |
| `font-family` | string | Font family. |
| `font-size` | number | Font size. |
| `font-style` | `"normal"` or `"italic"` | Font style. |
| `font-stretch` | string | `ultra-condensed`, `extra-condensed`, `condensed`, `semi-condensed`, `normal`, `semi-expanded`, `expanded`, `extra-expanded`, or `ultra-expanded`. |
| `font-weight` | string | `thin`, `extra-light`, `light`, `normal`, `medium`, `semibold`, `bold`, `extra-bold`, or `black`. |
| `color` | string | Text color. |
| `margin` | number | Margin on all sides. |
| `padding` | number | Padding on all sides. |

Margin and padding also accept side modifiers: `-top`, `-right`, `-bottom`, `-left`, `-x`, and `-y`.

```voxalfa fragment
;; @title-text margin-bottom={12} | padding={4}
;; @lyrics-text margin-top={6} | margin-bottom={6}
```

If the same element directive is declared more than once, the last declaration replaces the earlier style.
