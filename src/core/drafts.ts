// Small "work in progress" saves (onboarding answers, a placement test half-way through) so a reload, a killed tab or an app update
// never throws away what the learner has already done. Stored in localStorage: tiny, synchronous, survives a closed tab.
const PREFIX = 'lingua.draft.';

export function loadDraft<T>(key: string, maxAgeMs = 7 * 86_400_000): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key); if (!raw) return null;
    const d = JSON.parse(raw) as { at: number; v: T };
    if (!d || typeof d.at !== 'number' || Date.now() - d.at > maxAgeMs) { localStorage.removeItem(PREFIX + key); return null; }
    return d.v;
  } catch { return null; }
}
export function saveDraft<T>(key: string, v: T) { try { localStorage.setItem(PREFIX + key, JSON.stringify({ at: Date.now(), v })); } catch { /* storage full or blocked: drafts are a convenience only */ } }
export function clearDraft(key: string) { try { localStorage.removeItem(PREFIX + key); } catch { /* ignore */ } }
export const clearDraftsWith = (prefix: string) => { try { Object.keys(localStorage).filter((k) => k.startsWith(PREFIX + prefix)).forEach((k) => localStorage.removeItem(k)); } catch { /* ignore */ } };
