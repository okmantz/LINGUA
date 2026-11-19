# LINGUA — science-based language learning

A free, local-first, offline-capable web app for learning **Spanish, French and German**, built on what memory research supports rather than on gamified streak-farming. Hosted on GitHub Pages; there is no backend, no account and no paid API.

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
| Profile | Username, a small cast of designed characters (two are earned through mastery) with a tier ring, light/dark themes, accent colours, immersion levels 0–5 (auto or manual). |
| Data | IndexedDB, versioned schema with migrations, JSON export/import, per-language independence. |

## Honest limits (read this)

- **Audio is browser text-to-speech.** It is synthetic, quality varies by device, and a language voice may not be installed. When it isn't, listening items say so and are logged as reading.
- **Speech recognition** (pronunciation) uses your browser's engine where available. In Chrome it sends audio to Google. It is a rough match score, not a pronunciation expert. Recording + playback for self-comparison always works where `MediaRecorder` exists.
- **Writing and open conversation are keyword/checklist checks**, not AI grading. They cannot tell whether a sentence is grammatical; the UI says so and shows a model answer.
- **Placement measures A1–B2.** C1/C2 need a human examiner; a top score is reported as "B2 or above". The dashboard level is an *estimate* from retained vocabulary and accuracy.
- **Content is a focused starter core** (~285 words, 28 grammar lessons, 26 conversations, 9 readings, 12 listenings per language). Levels without material (B1+ in most modules) are labelled "No material yet" rather than faked.
- **No cloud sync.** Data lives in one browser. Use Export/Import to move devices. The schema is versioned so sync could be added later; it is not implemented and not pretended.
- **Reminders** are browser notifications that only fire while the app is open or installed and running. There is no push server.

## Develop

```bash
npm install
npm run dev        # local dev server
npm test           # 50+ tests: FSRS, mastery, answer checking, placement, planner, programme flow, backup, content validation
npm run typecheck
npm run build      # tsc + vite build + PWA service worker
```

## Deploy to GitHub Pages

The built site is committed in `docs/`, so Pages serves it directly, no Actions needed.

1. Repo -> **Settings -> Pages -> Source: Deploy from a branch -> `main` / `/docs`**.
2. After changing code, run `npm run build:pages` and commit the updated `docs/` folder.
3. Open `https://<user>.github.io/LINGUA/` on your phone and use *Add to Home Screen* / *Install app*.

## Project layout

```
src/core/      pure logic: fsrs, mastery, session planner, guide (next step), teacher (tips), placement, analytics, progression, storage
src/content/   per-language content (es, fr, de) + dsl.ts authoring parsers + registry.ts + validation tests
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
