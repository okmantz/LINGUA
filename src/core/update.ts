// App updates without surprise reloads.
// The old setup (`registerType: 'autoUpdate'` + `skipWaiting`) reloaded the page the moment a new version was found — in the middle of a
// placement test or a lesson. Now a new version waits quietly; the learner gets a small "Update" button and chooses when.
import { useSyncExternalStore } from 'react';

let ready = false; let apply: (() => void) | null = null; const subs = new Set<() => void>();
const emit = () => subs.forEach((s) => s());
export const markUpdateReady = (fn: () => void) => { ready = true; apply = fn; emit(); };
export const applyUpdate = () => { try { apply?.(); } catch { location.reload(); } };
export const useUpdateReady = () => useSyncExternalStore((s) => { subs.add(s); return () => { subs.delete(s); }; }, () => ready, () => false);
