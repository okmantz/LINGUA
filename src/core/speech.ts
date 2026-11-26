// Browser speech capabilities — kept explicit about WHAT each one really is.
//  • speak()           = text-to-speech (TTS): the browser READS text aloud. It does not listen.
//  • recognizer()      = speech RECOGNITION (SpeechRecognition API): converts the user's voice to text.
//                        Chrome/Edge/Safari only; Chrome sends audio to a cloud service. Not available offline.
//  • recorder()        = MediaRecorder: records your voice for self-comparison. No analysis happens.
// Sign languages have no audio: the app turns every speaker button and voice feature off while one is active.
//
// Why speak() is more careful than a one-line `speechSynthesis.speak(...)` (all of these are real mobile-browser bugs):
//  • Android Chrome returns an EMPTY voice list until `voiceschanged` fires, so voices are loaded early and re-read on every call.
//  • `cancel()` immediately followed by `speak()` is silently dropped on Android Chrome → we wait a moment after cancelling.
//  • An utterance with no reference can be garbage-collected mid-speech → we keep the current one in a module variable.
//  • Chrome stops long utterances after ~15 s → text is split into sentence-sized chunks.
//  • Network ("Google …") voices stay silent when offline and some local voices never start → local voices are preferred, and
//    if nothing starts within a few seconds (or an error fires) we try the next voice, then the optional online backup.
//  • The audio engine needs a user gesture on iOS/Android → the first tap/click anywhere "unlocks" it with a silent utterance.
// When every route fails the failure is published (see `useSpeechState`) so the UI can say so and offer a fix instead of staying mute.
import { useSyncExternalStore } from 'react';

let audioOff = false;
const synthOf = (): SpeechSynthesis | null => (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null);
export const setAudioOff = (off: boolean) => { audioOff = off; if (off) stopSpeaking(); };
export const hasTTS = () => !audioOff && !!synthOf();
export const SR: any = typeof window !== 'undefined' ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;
export const hasRecognition = () => !!SR && !audioOff;
export const hasRecorder = () => !audioOff && typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined';

// ── Observable state, so buttons can show "playing" and the app can show a "couldn't play" notice ─────────────────────────
export type SpeechFailure = { lang: string; reason: 'no-voice' | 'failed'; at: number };
interface SpeechState { playing: boolean; failure: SpeechFailure | null; voices: number }
let state: SpeechState = { playing: false, failure: null, voices: 0 };
const subs = new Set<() => void>();
const setState = (patch: Partial<SpeechState>) => { state = { ...state, ...patch }; subs.forEach((f) => f()); };
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };
export const useSpeechState = () => useSyncExternalStore(subscribe, () => state, () => state);
export const clearSpeechFailure = () => setState({ failure: null });

// ── Voices ───────────────────────────────────────────────────────────────────────────────────────────────────────────────
let voicesCache: SpeechSynthesisVoice[] = [];
const readVoices = () => { const s = synthOf(); if (!s) return []; try { const v = s.getVoices(); if (v.length) { voicesCache = v; if (v.length !== state.voices) setState({ voices: v.length }); } } catch { /* some WebViews throw */ } return voicesCache; };
export function loadVoices(timeoutMs = 2500): Promise<SpeechSynthesisVoice[]> {
  return new Promise((res) => {
    const s = synthOf(); if (!s) return res([]);
    if (readVoices().length) return res(voicesCache);
    let done = false; const finish = () => { if (done) return; done = true; clearInterval(poll); clearTimeout(t); res(readVoices()); };
    const poll = setInterval(() => { if (readVoices().length) finish(); }, 150);   // some engines never fire voiceschanged
    const t = setTimeout(finish, timeoutMs);
    try { s.addEventListener('voiceschanged', () => { if (readVoices().length) finish(); }, { once: true }); } catch { /* old Safari */ }
  });
}
const norm = (l: string) => l.replace('_', '-').toLowerCase();
/** All voices that could speak `lang`, best first: exact locale before same language, on-device before network, nicer names first. */
export function voicesFor(lang: string): SpeechSynthesisVoice[] {
  if (!lang || audioOff) return [];
  const base = lang.slice(0, 2).toLowerCase(); const want = norm(lang);
  const all = readVoices();
  const score = (v: SpeechSynthesisVoice) => {
    const vl = norm(v.lang); let s = 0;
    if (vl === want) s += 100; else if (vl.startsWith(base)) s += 40; else return -1;
    if (v.localService) s += 30;                                   // on-device voices work offline and start fast
    if (/natural|neural|premium|enhanced/i.test(v.name)) s += 12;
    if (/google/i.test(v.name) && !v.localService) s -= 8;         // network voices are the usual cause of "silent" buttons
    if (v.default) s += 1;
    return s;
  };
  return all.map((v) => [v, score(v)] as const).filter(([, s]) => s >= 0).sort((a, b) => b[1] - a[1]).map(([v]) => v);
}
export const voiceFor = (lang: string) => voicesFor(lang)[0] ?? null;
export const hasVoiceFor = (lang: string) => voicesFor(lang).length > 0;

// ── Optional online backup (off unless the learner turns it on: it sends the sentence to Google's text-to-speech) ──────────
const KEY = 'lingua-online-voice';
export const onlineVoiceEnabled = () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } };
export const setOnlineVoice = (on: boolean) => { try { localStorage.setItem(KEY, on ? '1' : '0'); } catch { /* private mode */ } setState({}); };
export const hasOnlineVoice = () => onlineVoiceEnabled() && typeof navigator !== 'undefined' && navigator.onLine !== false && typeof Audio !== 'undefined';
/** Languages where a real attempt just failed; cleared by the next success. Stops the app offering listening tasks nobody can hear. */
const broken = new Set<string>();
/** Whether the app can plausibly produce sound for this language right now: a device voice, the online backup, or (when the
 *  browser reports no voices at all, which some Android builds do even though speaking works) an attempt worth making. */
export const canSpeakLang = (lang: string) => {
  if (!hasTTS()) return false;
  if (hasOnlineVoice()) return true;
  if (broken.has(lang)) return false;
  return readVoices().length === 0 || hasVoiceFor(lang);
};
let onlineAudio: HTMLAudioElement | null = null;

const chunks = (text: string, max = 170): string[] => {
  const parts = text.replace(/\s+/g, ' ').trim().match(/[^.!?。！？؟…]+[.!?。！？؟…]*\s*/g) ?? [text];
  const out: string[] = [];
  for (const p of parts) {
    let s = p.trim(); if (!s) continue;
    while (s.length > max) { const cut = s.lastIndexOf(' ', max); const k = cut > 40 ? cut : max; out.push(s.slice(0, k).trim()); s = s.slice(k).trim(); }
    if (s) out.push(s);
  }
  return out.length ? out : [text];
};
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

let token = 0;                                    // bumps on every speak()/stop so an older call stops queuing
let current: SpeechSynthesisUtterance | null = null;   // keeps the utterance alive (prevents the Chrome GC bug)

/** Speak one chunk with one voice. Resolves 'ok', or 'silent' when nothing started / an error fired. */
function utter(text: string, lang: string, rate: number, voice: SpeechSynthesisVoice | null, my: number): Promise<'ok' | 'silent' | 'stopped'> {
  return new Promise((res) => {
    const s = synthOf(); if (!s) return res('silent');
    const u = new SpeechSynthesisUtterance(text); current = u;
    u.lang = voice?.lang ?? lang; u.rate = Math.min(2, Math.max(0.4, rate)); u.pitch = 1; u.volume = 1;
    if (voice) u.voice = voice;
    let started = false; let settled = false;
    const done = (r: 'ok' | 'silent' | 'stopped') => { if (settled) return; settled = true; clearTimeout(watch); clearInterval(keep); res(r); };
    // Android: if the engine never starts, the promise would hang forever, so give up after a few seconds and try something else.
    const watch = setTimeout(() => { if (!started) { try { s.cancel(); } catch { /* */ } done('silent'); } }, 3500);
    // Chrome desktop pauses long speech by itself; nudging resume() keeps it going.
    const keep = setInterval(() => { if (my !== token) { done('stopped'); return; } try { if (s.paused) s.resume(); } catch { /* */ } }, 4000);
    u.onstart = () => { started = true; clearTimeout(watch); };
    u.onend = () => done('ok');
    u.onerror = (e: SpeechSynthesisErrorEvent) => done(e.error === 'interrupted' || e.error === 'canceled' ? (my !== token ? 'stopped' : 'silent') : 'silent');
    try { if (s.paused) s.resume(); s.speak(u); } catch { done('silent'); }
  });
}

async function speakOnline(parts: string[], lang: string, rate: number, my: number): Promise<boolean> {
  const tl = lang.toLowerCase() === 'zh-cn' ? 'zh-CN' : lang.slice(0, 2).toLowerCase();
  for (const p of parts) {
    if (my !== token) return true;
    const ok = await new Promise<boolean>((res) => {
      const a = new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(tl)}&q=${encodeURIComponent(p)}`);
      onlineAudio = a; a.playbackRate = Math.min(1.5, Math.max(0.6, rate)); (a as any).preservesPitch = true;
      a.onended = () => res(true); a.onerror = () => res(false); a.onabort = () => res(my !== token);
      a.play().catch(() => res(false));
    });
    if (!ok) return false;
  }
  return true;
}

let lastReq: { text: string; lang: string; rate: number } | null = null;
/** Play the last requested text again (used by the "couldn't play" notice after the learner changes a setting). */
export const retrySpeech = () => (lastReq ? speak(lastReq.text, lastReq.lang, lastReq.rate) : Promise.resolve(false));

/** Read `text` aloud. Resolves true if something was actually spoken, false if every route failed (the failure is published). */
export async function speak(text: string, lang: string, rate = 1): Promise<boolean> {
  const s = synthOf();
  if (audioOff || !text?.trim()) return false;
  lastReq = { text, lang, rate };
  const my = ++token; const interrupted = stopSpeaking(true);
  const parts = chunks(text);
  setState({ playing: true, failure: null });
  try {
    if (s) {
      await loadVoices(1200);
      if (my !== token) return true;
      if (interrupted) await wait(80);             // let cancel() settle (Android drops a speak() issued in the same tick)
      const candidates: (SpeechSynthesisVoice | null)[] = [...voicesFor(lang).slice(0, 3)];
      candidates.push(null);                       // last device attempt: just the language tag, let the engine choose
      for (const v of candidates) {
        let ok = true;
        for (const p of parts) {
          if (my !== token) return true;
          const r = await utter(p, lang, rate, v, my);
          if (r === 'stopped') return true;
          if (r === 'silent') { ok = false; break; }
        }
        if (ok) { broken.delete(lang); return true; }
        try { s.cancel(); } catch { /* */ } await wait(60);
      }
    }
    if (my !== token) return true;
    if (hasOnlineVoice() && await speakOnline(parts, lang, rate, my)) { broken.delete(lang); return true; }
    broken.add(lang);
    setState({ failure: { lang, reason: s && hasVoiceFor(lang) ? 'failed' : 'no-voice', at: Date.now() } });
    return false;
  } finally { if (my === token) setState({ playing: false }); }
}
/** Stops anything being spoken. Returns true if something was actually interrupted. */
export function stopSpeaking(quiet = false): boolean {
  if (!quiet) token++;
  let hit = false;
  const s = synthOf(); if (s) { try { if (s.speaking || s.pending) { s.cancel(); hit = true; } } catch { /* */ } }
  if (onlineAudio) { try { onlineAudio.pause(); } catch { /* */ } onlineAudio = null; hit = true; }
  if (!quiet && state.playing) setState({ playing: false });
  return hit;
}

/** Call once at start-up: pre-loads voices and "unlocks" audio on the first tap (required by iOS Safari and Android Chrome). */
let inited = false;
export function initSpeech() {
  if (inited || typeof window === 'undefined') return; inited = true;
  void loadVoices(6000);
  const s = synthOf(); if (!s) return;
  try { s.addEventListener('voiceschanged', () => readVoices()); } catch { /* */ }
  const unlock = () => {
    window.removeEventListener('pointerdown', unlock, true); window.removeEventListener('keydown', unlock, true); window.removeEventListener('touchend', unlock, true);
    try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; s.speak(u); } catch { /* */ }
  };
  window.addEventListener('pointerdown', unlock, true); window.addEventListener('keydown', unlock, true); window.addEventListener('touchend', unlock, true);
}

export function listenOnce(lang: string, timeoutMs = 9000): Promise<{ transcript: string; confidence: number } | { error: string }> {
  return new Promise((res) => {
    if (!SR) return res({ error: 'Speech recognition is not supported in this browser.' });
    const r = new SR(); r.lang = lang; r.interimResults = false; r.maxAlternatives = 1;
    const t = setTimeout(() => { try { r.stop(); } catch { /* */ } }, timeoutMs);
    r.onresult = (e: any) => { clearTimeout(t); const a = e.results[0][0]; res({ transcript: a.transcript, confidence: a.confidence ?? 0 }); };
    r.onerror = (e: any) => { clearTimeout(t); res({ error: e.error === 'not-allowed' ? 'Microphone permission was denied.' : e.error === 'no-speech' ? 'No speech detected — try again.' : `Recognition error: ${e.error}` }); };
    r.onend = () => { clearTimeout(t); res({ error: 'No speech detected — try again.' }); };
    try { r.start(); } catch (err: any) { res({ error: String(err?.message ?? err) }); }
  });
}

export async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const rec = new MediaRecorder(stream); const chunksR: BlobPart[] = [];
  rec.ondataavailable = (e) => chunksR.push(e.data);
  const done = new Promise<string>((res) => { rec.onstop = () => { stream.getTracks().forEach((t) => t.stop()); res(URL.createObjectURL(new Blob(chunksR, { type: rec.mimeType }))); }; });
  rec.start();
  return { stop: () => { rec.stop(); return done; } };
}
