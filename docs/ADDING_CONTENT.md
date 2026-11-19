# Adding content and languages

Everything language-specific lives in `src/content/<code>/`. The app code does not change when you add a language.

## Add a language (e.g. Italian)

1. Copy `src/content/es/` to `src/content/it/` and replace the content (see formats below). Keep the **same slot ids** (`slot` values for grammar/conversations, and the reading/listening/pronunciation/writing ids such as `r-intro`, `l-restaurant`, `sounds`, `w-self`) — the 30-day programme refers to them.
2. Register it in `src/content/registry.ts`: code, name, endonym, `tts` locale (e.g. `it-IT`), the `accents` keyboard characters, a one-line blurb, and `load: () => import('./it').then(m => m.default)`.
3. Run `npm test`. `content.test.ts` validates every registered language automatically: unique ids, noun genders, ≥200 words, cloze coverage, ≥4 exercises per grammar lesson, exactly one good option per conversation step, placement coverage of A1–B2, every programme slot resolves, no duplicate multiple-choice options.

## Vocabulary line format

`category|word|meaning|pos[.gender]|respelling|example|example translation|level?|note?`

- `pos` is `n`, `v`, `adj`, `adv`, `phr`, `prep`, `pron`, `conj`, `num`, `q`. Nouns carry gender (`n.m`, `n.f`, `n.n`).
- Put the article in the word for nouns (`la casa`, `der Tisch`, `das Buch`).
- The respelling uses CAPS for the stressed syllable.
- Level defaults to A1.
- German nouns must carry `Plural: die …` in the note (enforced by the tests).
- Category ids are listed in `src/core/categories.ts`.

## Other formats

See the parsers in `src/content/dsl.ts` and any existing language file as a template:

- **Grammar lessons:** summary, body paragraphs (`**bold**` supported), optional table, examples, common mistakes and exercises.
- **Exercises:** `mcq` (mark the right choice with `*`), `fill`, `order`, `type`.
- **Conversations:** `N:` for the NPC line, `Y:` for the options (`good = translation || bad = translation (why)`), then `:: keywords ; keywords` for open-mode checking.
- **Reading, listening, pronunciation, writing, cheat sheets and placement items** each have a small block syntax — copy from `es/texts.ts`.

## Adding material at a higher level (B1+)

The structure already supports it: set the item's `level` to `B1`, `B2`… and it appears under that level in its academy and in the level-based pathway after the programme. Until you do, those levels are shown as "No material yet" instead of being padded.

## Quality checklist

- Content authored by a speaker beats content from memory — have a native or advanced speaker review new material.
- Keep example sentences short and natural; every word of an A1 sentence should be known or glossed.
- Provide at least two plausible-but-wrong options in conversations, and give a `why` for the tempting ones.
