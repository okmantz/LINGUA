// Browser speech capabilities — kept explicit about WHAT each one really is.
//  • speak()           = text-to-speech (TTS): the browser READS text aloud. It does not listen.
//  • recognizer()      = speech RECOGNITION (SpeechRecognition API): converts the user's voice to text.
//                        Chrome/Edge/Safari only; Chrome sends audio to a cloud service. Not available offline.
//  • recorder()        = MediaRecorder: records your voice for self-comparison. No analysis happens.
export const hasTTS = () => typeof window !== 'undefined' && 'speechSynthesis' in window;
export const SR: any = typeof window !== 'undefined' ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;
export const hasRecognition = () => !!SR;
export const hasRecorder = () => typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined';

let voicesCache: SpeechSynthesisVoice[] = [];
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((res) => {
    if (!hasTTS()) return res([]);
    const get = () => { voicesCache = speechSynthesis.getVoices(); return voicesCache; };
    const v = get();
    if (v.length) return res(v);
    speechSynthesis.onvoiceschanged = () => res(get());
    setTimeout(() => res(get()), 1200);
  });
}
export const voiceFor = (lang: string) => {
  const base = lang.slice(0, 2).toLowerCase();
  const all = voicesCache.length ? voicesCache : hasTTS() ? speechSynthesis.getVoices() : [];
  const exact = all.filter((v) => v.lang.replace('_', '-').toLowerCase() === lang.toLowerCase());
  const near = all.filter((v) => v.lang.toLowerCase().startsWith(base));
  const pick = (a: SpeechSynthesisVoice[]) => a.find((v) => /natural|neural|premium|enhanced|google/i.test(v.name)) ?? a.find((v) => v.localService) ?? a[0];
  return pick(exact) ?? pick(near) ?? null;
};
export const hasVoiceFor = (lang: string) => !!voiceFor(lang);

export function speak(text: string, lang: string, rate = 1): Promise<void> {
  return new Promise((res) => {
    if (!hasTTS() || !text) return res();
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = rate;
    const v = voiceFor(lang); if (v) u.voice = v;
    u.onend = () => res(); u.onerror = () => res();
    speechSynthesis.speak(u);
  });
}
export const stopSpeaking = () => { if (hasTTS()) speechSynthesis.cancel(); };

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
  const rec = new MediaRecorder(stream); const chunks: BlobPart[] = [];
  rec.ondataavailable = (e) => chunks.push(e.data);
  const done = new Promise<string>((res) => { rec.onstop = () => { stream.getTracks().forEach((t) => t.stop()); res(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }))); }; });
  rec.start();
  return { stop: () => { rec.stop(); return done; } };
}
