# LINGUA — science-based language learning

A free, local-first, offline-capable web app for learning **eleven languages**: Spanish, French, German, Italian, Polish, Russian, Mandarin Chinese, Japanese, Korean, Arabic and Swahili, built on what memory research supports rather than on gamified streak-farming. Hosted on GitHub Pages; there is no backend, no account and no paid API.

**Stack:** React 19 · TypeScript · Vite · Tailwind v4 · IndexedDB (`idb`) · PWA (service worker) · Vitest.

## What it does

| Area | How |
|---|---|
| Memory | **FSRS-4.5** spaced repetition per word, with exercise difficulty that rises as a memory strengthens (recognise → reverse → listen → cloze → type). |
| Mastery | A word moves *encountered → recognised → recalled → retained → mastered*. **Retained** needs recall on ≥2 days, ≥3 successes and a stability of ≥7 days; **mastered** needs ≥21 days and production from memory. One right answer never masters a word. |
| 30-day programme | Six phases, conversation from day 1: foundations → everyday communication → expanding → independent → practical → consolidation, then a final assessment. It builds a beginner foundation for simple conversations. **It does not promise fluency.** |
| Pathway | After the programme (or after placement above A1) sessions are level-based (A1–C2) and weakness-driven, rotating daily. |
| Daily engine | Builds a session to your time budget (5–60 min): due reviews first, then new words, conversation, grammar, listening, reading, pronunciation, writing. |
| Academies | Vocabulary, Grammar, Conversations (guided → semi-open → open), Listening, Reading, Writing, Pronunciation, searchable Cheat Sheets. |
| Progress | Skill radar, mastery stages, memory-strength buckets, weekly accuracy, study time, weekly review, level *estimate* with confidence, mastery tiers (Beginner → Master). |
| Guidance | A **Next up** card on Home and in the sidebar always names the single best next step. **Your Path** shows the whole 30-day plan (or the level pathway afterwards). Every practice library marks a *Recommended next* lesson and ends with a *What next?* screen. |
| Teacher | **Teacher Lina** pops up once per page with tips, reminders (due reviews, streak at risk, goal reached) and advice, comments on session and lesson results, and runs a short welcome tour. Can be hidden in Settings. Wording lives in `src/core/teacher.ts`. |
| Profile | Username, a small cast of designed characters (three are earned through mastery; art in `src/assets/characters`) with a tier ring, light/dark themes, accent colours, immersion levels 0–5 (auto or manual). |
| Data | IndexedDB, versioned schema with migrations, JSON export/import, per-language independence. |

## Honest limits (read this)

- **Audio is browser text-to-speech.** It is synthetic, quality varies by device, and a language voice may not be installed. When it isn't, listening items say so and are logged as reading.
- **Speech recognition** (pronunciation) uses your browser's engine where available. In Chrome it sends audio to Google. It is a rough match score, not a pronunciation expert. Recording + playback for self-comparison always works where `MediaRecorder` exists.
- **Writing and open conversation are keyword/checklist checks**, not AI grading. They cannot tell whether a sentence is grammatical; the UI says so and shows a model answer.
- **Placement is an adaptive A1–C2 test** (3-parameter IRT, about 15–25 questions, stops when the estimate is stable). It is accurate to within about one level in simulation, but C1/C2 are inferred from closed-form items; only a human examiner can certify them. The dashboard level is an *estimate* from retained vocabulary and accuracy.
- **Content covers A1–C2 in every language** (several hundred words, 20–30 grammar lessons, 30+ conversations, 15+ readings, 15+ listenings, 10+ writing prompts and a 40+ item placement bank each; see the table below). B1–C2 has its own `adv.ts` and `ext.ts` files per language, and every language also has a `deep.ts` / `deep2.ts` pack (A2–C2 vocabulary with idioms, register and near-native grammar, harder dialogues, readings and listenings, cheat sheets on idioms, register, native-level errors, linkers and false friends) so a learner can keep progressing from beginner to native-level (ASL has one `deep.ts`). It is machine-drafted and must be reviewed by native speakers before you rely on it, especially at C1/C2. Depth still thins slightly towards C2 for ASL. Levels with no material are labelled "No material yet" rather than faked.
- **Swahili** is standard Kiswahili (Tanzanian/Kenyan coastal standard). Regional and Sheng usage are not covered.
- **American Sign Language (ASL) is included, with honest limits.** ASL lessons use schematic sign diagrams (a right-handed signer facing you; faded hand = start, solid = end, arrows = movement, ⊙/⊗ = toward/away from you) plus a written description of every sign, and gloss notation for grammar. The diagrams cannot show speed, rhythm, mouth detail or contact exactly, regional variation is not covered, and none of it has been reviewed by a Deaf signer. Treat the content as a study aid and check signs against video from Deaf teachers (for example, Deaf-led courses and dictionaries) before relying on it. Audio, speech recognition and pronunciation scoring are turned off for ASL; vocabulary is shown as figures, and writing practice is typed gloss.
- **No cloud sync.** Data lives in one browser. Use Export/Import to move devices. The schema is versioned so sync could be added later; it is not implemented and not pretended.
- **Reminders** are browser notifications that only fire while the app is open or installed and running. There is no push server.

## Develop

```bash
npm install
npm run dev        # local dev server
npm test           # all tests: FSRS, mastery, answer checking, placement, planner, programme flow, backup, content validation
npm run typecheck
npm run build      # tsc + vite build + PWA service worker
npm run verify:docs  # checks every file the built site references exists in docs/
```

## Deploy to GitHub Pages

The built site is committed in `docs/`, so Pages serves it directly, no Actions needed.

1. Repo -> **Settings -> Pages -> Source: Deploy from a branch -> `main` / `/docs`**.
2. After changing code, run `npm run build:pages` (it ends with an integrity check) and commit the **whole** `docs/` folder, including every file in `docs/assets/`.
3. Open `https://<user>.github.io/LINGUA/` on your phone and use *Add to Home Screen* / *Install app*.

### Troubleshooting: "The app failed to load"

The site is a set of hashed files (`docs/index.html` pulls in `docs/assets/*.js`, character images, etc.). If even one is missing, the app can't start. This happens when `docs/` is uploaded partially (e.g. only some files picked in GitHub's web uploader).

- Run `npm run verify:docs`. It lists every file that is referenced but missing.
- Fix: run `npm run build:pages` and commit the entire `docs/` folder. Prefer `git add -A docs && git commit && git push` over the web uploader.
- The failure screen itself names the missing files and links to `lingua.html`, a single-file build that needs nothing else.
- The CI workflow (`.github/workflows/ci.yml`) runs the same check on every push.

## Project layout

```
src/core/      pure logic: fsrs, mastery, session planner, guide (next step), teacher (tips), placement, analytics, progression, storage
src/content/   per-language content (es, fr, de, it, pl, ru, zh, ja, ko, ar, sw, asl; each has vocab/grammar/convs/texts plus adv.ts, ext.ts and deep*.ts for B1–C2) + dsl.ts authoring parsers + registry.ts + validation tests
src/state/     React store (IndexedDB persistence), hooks (immersion flags, study clock)
src/components blocks (review, vocab, grammar, reading, listening, conversation, pronunciation, writing), exercise runner, charts, avatar + Teacher, icons, logo
src/pages/     route pages
docs/ADDING_CONTENT.md   how to add a language or more material
```

## Science notes

- **Retrieval practice & spacing:** every word is tested, not re-read, and re-tested just before forgetting (FSRS target retention 90%).
- **Interleaving:** review mixes categories and modes rather than blocking.
- **Comprehensible input:** graded reading/listening with translation support that fades with the immersion level.
- **Grammar through use:** each lesson shows the pattern, real examples and common mistakes, then immediately tests production.
- **Desirable difficulty:** the exercise mode gets harder as a card's stability grows.

## Opening it

- **Hosted:** repo *Settings → Pages → Deploy from a branch → main → /docs*, The site is `https://<user>.github.io/LINGUA/`.
- **Offline, no server:** `npm run build:offline` creates `dist-offline/index.html`, one self-contained file you can double-click (browsers block the normal build's module scripts on `file://`). The deployed site also serves it at `/lingua.html` for download.

## The 30-day sprint — and what it honestly delivers

Nobody becomes fluent in 30 days. LINGUA's 30-day programme is a **sprint that builds a working conversational base** (roughly A1–A2, with some B1 pieces): the sounds and script, the ~350 highest-value words and phrases, core grammar, and real listening and speaking practice. Each language shows its FSI difficulty category and typical hours to professional proficiency so expectations stay realistic.

What it uses instead of streaks and badges: spaced retrieval (FSRS), active recall, comprehensible input, sentence dictation (new `dictate` mode), interleaving, and a **Sprint mode** (90 or 120 minute plans with spaced replays and bonus words).

Non-Latin languages (Russian, Mandarin, Japanese, Korean, Arabic) get a dedicated script phase on days 1–3, romanisation shown beside every item, script-aware answer checking, and RTL layout for Arabic.

## Adding a language

See [docs/ADDING_CONTENT.md](docs/ADDING_CONTENT.md): one folder under `src/content/<code>/` plus one entry in `src/content/registry.ts`.


## Content per language

Vocabulary per level (A1 / A2 / B1 / B2 / C1 / C2), grammar lessons per level, then totals.

| Language | Vocab | Grammar | Convs | Reading | Listening | Writing | Placement |
|---|---|---|---|---|---|---|---|
| Spanish | 340 / 49 / 60 / 50 / 48 / 41 | 15 / 10 / 7 / 7 / 5 / 4 | 39 | 20 | 21 | 15 | 65 |
| French | 338 / 47 / 56 / 45 / 42 / 37 | 15 / 10 / 7 / 7 / 5 / 4 | 38 | 20 | 21 | 15 | 66 |
| German | 327 / 55 / 54 / 44 / 40 / 37 | 15 / 10 / 7 / 6 / 5 / 3 | 38 | 20 | 21 | 15 | 66 |
| Italian | 322 / 57 / 50 / 43 / 43 / 36 | 15 / 9 / 6 / 6 / 5 / 3 | 38 | 20 | 21 | 15 | 66 |
| Polish | 307 / 61 / 48 / 42 / 44 / 34 | 15 / 10 / 6 / 5 / 5 / 3 | 38 | 20 | 21 | 15 | 66 |
| Russian | 365 / 38 / 48 / 43 / 43 / 34 | 14 / 10 / 5 / 5 / 5 / 3 | 38 | 20 | 21 | 15 | 67 |
| Korean | 359 / 39 / 47 / 43 / 46 / 32 | 14 / 11 / 5 / 5 / 5 / 2 | 38 | 20 | 21 | 15 | 66 |
| Japanese | 344 / 39 / 46 / 42 / 46 / 32 | 14 / 11 / 5 / 5 / 4 / 2 | 38 | 20 | 21 | 15 | 66 |
| Mandarin Chinese | 338 / 38 / 47 / 41 / 42 / 32 | 14 / 11 / 5 / 5 / 4 / 2 | 38 | 20 | 21 | 15 | 66 |
| Arabic (MSA) | 337 / 42 / 47 / 43 / 45 / 32 | 14 / 9 / 6 / 5 / 4 / 2 | 38 | 20 | 21 | 15 | 70 |
| Swahili | 290 / 45 / 49 / 45 / 45 / 38 | 15 / 8 / 6 / 6 / 4 / 2 | 38 | 20 | 21 | 15 | 69 |
| American Sign Language | 209 / 21 / 16 / 15 / 4 / 0 | 14 / 8 / 5 / 5 / 5 / 4 | 34 | 16 | 18 | 11 | 62 |