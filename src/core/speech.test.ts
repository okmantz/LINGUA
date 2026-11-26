// The speech module must never leave a speaker button silently dead: it retries other voices and reports a real failure.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

type V = { name: string; lang: string; localService: boolean; default: boolean };
const mkVoices = (): V[] => [
  { name: 'Google español', lang: 'es-ES', localService: false, default: false },
  { name: 'Spanish Spain', lang: 'es_ES', localService: true, default: false },
  { name: 'Samantha', lang: 'en-US', localService: true, default: true },
];
let spoken: { text: string; voice?: string }[] = []; let broken: Set<string> = new Set(); let voices: V[] = mkVoices();
class FakeUtterance { text: string; lang = ''; rate = 1; pitch = 1; volume = 1; voice: V | null = null; onstart: any; onend: any; onerror: any; constructor(t: string) { this.text = t; } }
const fakeSynth = {
  speaking: false, pending: false, paused: false,
  getVoices: () => voices,
  addEventListener: () => {}, cancel() {}, resume() {},
  speak(u: FakeUtterance) {
    setTimeout(() => {
      if (u.voice && broken.has(u.voice.name)) { u.onerror?.({ error: 'synthesis-failed' }); return; }
      spoken.push({ text: u.text, voice: u.voice?.name }); u.onstart?.(); u.onend?.();
    }, 1);
  },
};
beforeEach(() => { spoken = []; broken = new Set(); voices = mkVoices(); (window as any).speechSynthesis = fakeSynth; (window as any).SpeechSynthesisUtterance = FakeUtterance; });
afterEach(() => { delete (window as any).speechSynthesis; localStorage.clear(); });

describe('speech', () => {
  it('prefers an on-device voice of the exact language over a network voice', async () => {
    const { voicesFor } = await import('./speech');
    expect(voicesFor('es-ES')[0].name).toBe('Spanish Spain');
    expect(voicesFor('es-ES').some((v) => v.lang.startsWith('en'))).toBe(false);
  });
  it('falls back to the next voice when the first one is silent', async () => {
    const { speak } = await import('./speech');
    broken.add('Spanish Spain');
    expect(await speak('Hola', 'es-ES', 1)).toBe(true);
    expect(spoken[0].voice).toBe('Google español');
  });
  it('publishes a failure (instead of staying mute) when every voice fails', async () => {
    const { speak, canSpeakLang } = await import('./speech');
    broken.add('Spanish Spain'); broken.add('Google español');
    // the final lang-only attempt has no voice object, so make the engine fail that too
    const orig = fakeSynth.speak; fakeSynth.speak = (u: FakeUtterance) => { setTimeout(() => u.onerror?.({ error: 'synthesis-failed' }), 1); };
    expect(await speak('Hola', 'es-ES', 1)).toBe(false);
    expect(canSpeakLang('es-ES')).toBe(false);          // listening tasks are no longer offered for a language nobody can hear
    fakeSynth.speak = orig;
    expect(await speak('Hola', 'es-ES', 1)).toBe(true);  // …and recover as soon as audio works again
    expect(canSpeakLang('es-ES')).toBe(true);
  });
  it('splits long text into sentence chunks', async () => {
    const { speak } = await import('./speech');
    await speak('Primera frase. Segunda frase. ¿Tercera frase?', 'es-ES', 1);
    expect(spoken.map((s) => s.text)).toEqual(['Primera frase.', 'Segunda frase.', '¿Tercera frase?']);
  });
  it('treats an empty voice list as "unknown" (some Android builds) rather than "no audio"', async () => {
    const { canSpeakLang } = await import('./speech');
    voices = [];
    expect(canSpeakLang('es-ES')).toBe(true);
    voices = [{ name: 'Samantha', lang: 'en-US', localService: true, default: true }];
    expect(canSpeakLang('es-ES')).toBe(false);
  });
});
