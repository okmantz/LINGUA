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
| Profile | Username, SVG avatar with mastery-gated unlocks, light/dark themes, accent colours, immersion levels 0–5 (auto or manual). |
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

The build uses `base: './'` and a **HashRouter**, so it works at any repo path with no configuration.

1. Push to a repo's `main` branch.
2. Repo → **Settings → Pages → Source: GitHub Actions**.
3. `.github/workflows/deploy.yml` runs the tests, builds, and publishes `dist/`.

## Project layout

```
src/core/      pure logic: fsrs, mastery, session planner, placement, analytics, progression, storage
src/content/   per-language content (es, fr, de) + dsl.ts authoring parsers + registry.ts + validation tests
src/state/     React store (IndexedDB persistence), hooks (immersion flags, study clock)
src/components blocks (review, vocab, grammar, reading, listening, conversation, pronunciation, writing), exercise runner, charts, avatar
src/pages/     route pages
docs/ADDING_CONTENT.md   how to add a language or more material
```

## Science notes

- **Retrieval practice & spacing:** every word is tested, not re-read, and re-tested just before forgetting (FSRS target retention 90%).
- **Interleaving:** review mixes categories and modes rather than blocking.
- **Comprehensible input:** graded reading/listening with translation support that fades with the immersion level.
- **Grammar through use:** each lesson shows the pattern, real examples and common mistakes, then immediately tests production.
- **Desirable difficulty:** the exercise mode gets harder as a card's stability grows.
