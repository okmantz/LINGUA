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

## Non-Latin and special-case languages

Registry fields: `script` (`cyrillic`, `han`, `kana`, `hangul`, `arabic`), `rtl`, `noGender` (skips the gender check on nouns), `romanLabel` (e.g. Pinyin, Rōmaji), `fsi` (`{category, hours}`) and `outcome` (honest 30-day expectation text).

- Put real romanisation in the vocab `pron` column. Give verbs in the form learners should type (e.g. polite forms for Korean/Japanese) and make sure the example sentence contains the exact target.
- Add a `script` vocab category (letters or characters) and use `pace` in `index.ts` to spend days 1–3 on it, e.g. `pace: { 1: { cats: ['script','greetings'], newWords: 18 }, ... }`.
- The `dictate` exercise mode (sentence dictation) is used automatically for languages with a listening-friendly script.
- Vocab ids for non-Latin words are generated from Unicode letters when the ASCII slug would be empty.
- Run `npx vitest run src/content` after every file: it checks ids, `*` marks on multiple-choice answers, duplicate choices and minimum content sizes.

## Sign languages (ASL)

`src/content/asl/` is the worked example. Set `sign: true` in the registry entry; vocabulary lines carry a 10th field, the figure spec (`h=B o=down,mid l=chest to=front m=tap` …; see the header of `src/core/signRender.ts`). Check every figure on a contact sheet, give each sign a written description, and use gloss (`IX-1`, `[yn]`, `fs-ANA`) for readings, listening and writing. Audio, speech recognition and pronunciation scoring are off for sign languages. Have a Deaf signer review the result before relying on it.

## Extending an existing language (B1–C2)

Each language keeps its core in `vocab.ts`, `grammar.ts`, `convs.ts`, `texts.ts`, its B1–C2 material in `adv.ts`, and further B1–C2 material in `ext.ts` (same line formats). Reading questions must not be answerable by copying a phrase from the text: write distractors from the text itself, and paraphrase the correct answer (`src/content/leaks.test.ts` fails otherwise).
