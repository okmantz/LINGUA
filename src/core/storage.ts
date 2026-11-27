// Local-first persistence: IndexedDB (profile, cards, events) with versioned schema + JSON backup.
//
// Why this file is more defensive than a plain "put into IndexedDB":
//  • Mobile browsers (Safari, Android Chrome) close the IndexedDB connection when the app is backgrounded. The next write then throws
//    InvalidStateError. A fire-and-forget `void put()` swallowed that error, so progress silently never reached disk.
//    Every operation here reopens the database and retries once.
//  • The profile is small, so it is ALSO mirrored into localStorage synchronously on every change. localStorage survives a killed tab and
//    a failed IndexedDB, and on startup whichever copy is newer wins (and heals the other one).
//  • Writes are coalesced and always write the latest profile, so a slow retry can never overwrite newer progress with older progress.
//  • If the stored data cannot be read at all, the app says so instead of showing onboarding (which would overwrite the real data).
import { openDB, type IDBPDatabase } from 'idb';
import type { Card, EventRec, Profile } from './types';
import { normalizeAvatar } from './cosmetics';

export const SCHEMA_VERSION = 1;
const DB_NAME = 'lingua';
const DB_VERSION = 1;
export const MIRROR_KEY = 'lingua.profile.mirror.v1';

let dbp: Promise<IDBPDatabase> | null = null;
export function db() {
  if (!dbp) {
    const p = openDB(DB_NAME, DB_VERSION, {
      upgrade(d) {
        // v1
        if (!d.objectStoreNames.contains('kv')) d.createObjectStore('kv');
        if (!d.objectStoreNames.contains('cards')) {
          const s = d.createObjectStore('cards', { keyPath: 'key' });
          s.createIndex('lang', 'lang');
        }
        if (!d.objectStoreNames.contains('events')) {
          const s = d.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
          s.createIndex('lang', 'lang');
          s.createIndex('ts', 'ts');
        }
      },
      // Another tab wants to upgrade: step aside instead of blocking it forever.
      blocking() { dbp = null; void p.then((d) => d.close()).catch(() => undefined); },
      // The browser closed the connection (backgrounded app, storage pressure): the next call opens a fresh one.
      terminated() { dbp = null; },
    });
    p.catch(() => { if (dbp === p) dbp = null; });   // never cache a failed open
    dbp = p;
  }
  return dbp;
}
export const resetDbHandle = () => { dbp = null; };

/** Run a database operation; if the connection went stale (very common after a mobile browser was backgrounded), reopen and try once more. */
async function withDb<T>(fn: (d: IDBPDatabase) => Promise<T>): Promise<T> {
  try { return await fn(await db()); }
  catch (first) {
    resetDbHandle();
    try { return await fn(await db()); } catch { throw first; }
  }
}

// ── Save status (drives the small "Saved" indicator in the app) ──
export type SaveStatus = { state: 'idle' | 'saving' | 'saved' | 'error'; at: number; error?: string };
let status: SaveStatus = { state: 'idle', at: 0 };
const listeners = new Set<() => void>();
const setStatus = (s: SaveStatus) => { status = s; listeners.forEach((l) => l()); };
export const getSaveStatus = () => status;
export const subscribeSaveStatus = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };

// ── localStorage mirror ──
const ls = (): Storage | null => { try { return typeof localStorage !== 'undefined' ? localStorage : null; } catch { return null; } };
export function writeMirror(p: Profile): boolean { try { ls()?.setItem(MIRROR_KEY, JSON.stringify(p)); return !!ls(); } catch { return false; } }
export function readMirror(): any | null { try { const t = ls()?.getItem(MIRROR_KEY); return t ? JSON.parse(t) : null; } catch { return null; } }
export function clearMirror() { try { ls()?.removeItem(MIRROR_KEY); } catch { /* ignore */ } }

/** Data migrations for the profile document. Add a step per schema bump. */
export function migrateProfile(p: any): Profile {
  let cur = p;
  const v = cur.schema ?? 0;
  if (v < 1) {
    cur = { ...cur, schema: 1, unlockedCosmetics: cur.unlockedCosmetics ?? [], achievements: cur.achievements ?? {} };
  }
  // if (v < 2) { ...future migration... }
  if (cur.schema > SCHEMA_VERSION) throw new Error(`Backup is from a newer LINGUA (schema ${cur.schema}). Update the app first.`);
  // Characters replaced the old custom avatar editor; map old faces to the closest character (no schema bump needed).
  cur = { ...cur, avatar: normalizeAvatar(cur.avatar) };
  return cur as Profile;
}

export interface LoadResult { profile: Profile | null; source: 'idb' | 'mirror' | 'none'; error?: string }

/** Read the profile from IndexedDB and the localStorage mirror and return the newer one. Never silently reports "no profile" if reading failed. */
export async function loadProfileRobust(): Promise<LoadResult> {
  let fromDb: Profile | null = null; let dbError: unknown = null;
  try { const raw = await withDb((d) => d.get('kv', 'profile')); fromDb = raw ? migrateProfile(raw) : null; } catch (e) { dbError = e; }
  let fromMirror: Profile | null = null;
  try { const raw = readMirror(); fromMirror = raw ? migrateProfile(raw) : null; } catch { fromMirror = null; }

  if (fromDb && fromMirror) {
    if ((fromMirror.updatedAt ?? 0) > (fromDb.updatedAt ?? 0)) { void saveProfile(fromMirror); return { profile: fromMirror, source: 'mirror' }; }
    writeMirror(fromDb); return { profile: fromDb, source: 'idb' };
  }
  if (fromDb) { writeMirror(fromDb); return { profile: fromDb, source: 'idb' }; }
  if (fromMirror) { void saveProfile(fromMirror); return { profile: fromMirror, source: 'mirror' }; }   // IndexedDB lost it (or failed): heal from the mirror
  if (dbError) return { profile: null, source: 'none', error: String((dbError as Error)?.message ?? dbError) };
  return { profile: null, source: 'none' };
}
export async function loadProfile(): Promise<Profile | null> {
  const r = await loadProfileRobust();
  if (r.error) throw new Error(r.error);
  return r.profile;
}

// ── Writing the profile: coalesced, ordered, retried, mirrored ──
let latest: Profile | null = null; let dirty = false; let inflight: Promise<void> | null = null; let saveBlocked = false;
/** While the stored data could not be read, saving a blank profile would destroy it. The store turns this on until the learner decides. */
export const blockSaves = (b: boolean) => { saveBlocked = b; };

export function saveProfile(p: Profile): Promise<void> {
  if (saveBlocked) return Promise.resolve();
  latest = p; dirty = true; writeMirror(p);
  if (inflight) return inflight;
  setStatus({ state: 'saving', at: status.at });
  inflight = (async () => {
    try {
      while (dirty && latest) {
        dirty = false; const cur = latest;
        await withDb((d) => d.put('kv', cur, 'profile'));
      }
      setStatus({ state: 'saved', at: Date.now() });
    } catch (e) {
      dirty = true;   // keep it pending: the next change, or the flush when the page is hidden, tries again
      setStatus({ state: ls() && readMirror() ? 'saved' : 'error', at: Date.now(), error: String((e as Error)?.message ?? e) });
    } finally { inflight = null; }
  })();
  return inflight;
}
/** Wait for pending writes (used before reloads/updates). */
export async function flushSaves(): Promise<void> { if (latest && dirty && !inflight) void saveProfile(latest); await inflight; }

export async function loadCards(lang?: string): Promise<Card[]> {
  return withDb((d) => (lang ? d.getAllFromIndex('cards', 'lang', lang) : d.getAll('cards')));
}
export async function saveCard(c: Card) { try { await withDb((d) => d.put('cards', c)); } catch (e) { setStatus({ state: 'error', at: Date.now(), error: String((e as Error)?.message ?? e) }); } }
export async function saveCards(cs: Card[]) {
  await withDb(async (d) => { const tx = d.transaction('cards', 'readwrite'); await Promise.all([...cs.map((c) => tx.store.put(c)), tx.done]); });
}
export async function addEvent(e: EventRec) { try { await withDb((d) => d.add('events', e)); } catch { /* an event is statistics only; never interrupt learning for one */ } }
export async function loadEvents(lang?: string): Promise<EventRec[]> {
  return withDb((d) => (lang ? d.getAllFromIndex('events', 'lang', lang) : d.getAll('events')));
}

export interface Backup { app: 'lingua'; schema: number; exportedAt: number; profile: Profile; cards: Card[]; events: EventRec[]; }
export async function exportBackup(): Promise<Backup> {
  const profile = await loadProfile();
  if (!profile) throw new Error('Nothing to export yet.');
  return { app: 'lingua', schema: SCHEMA_VERSION, exportedAt: Date.now(), profile, cards: await loadCards(), events: await loadEvents() };
}
export function validateBackup(b: any): asserts b is Backup {
  if (!b || b.app !== 'lingua') throw new Error('Not a LINGUA backup file.');
  if (typeof b.schema !== 'number') throw new Error('Backup has no schema version.');
  if (!b.profile || !Array.isArray(b.cards) || !Array.isArray(b.events)) throw new Error('Backup is incomplete.');
}
export async function importBackup(b: any) {
  validateBackup(b);
  const profile = { ...migrateProfile(b.profile), updatedAt: Date.now() };
  await withDb(async (d) => {
    const tx = d.transaction(['kv', 'cards', 'events'], 'readwrite');
    await tx.objectStore('kv').put(profile, 'profile');
    await tx.objectStore('cards').clear();
    await tx.objectStore('events').clear();
    for (const c of b.cards) await tx.objectStore('cards').put(c);
    for (const e of b.events) { const { id, ...rest } = e; await tx.objectStore('events').add(rest); }
    await tx.done;
  });
  writeMirror(profile);
  return profile;
}
export async function wipeAll() {
  await withDb(async (d) => {
    const tx = d.transaction(['kv', 'cards', 'events'], 'readwrite');
    await Promise.all([tx.objectStore('kv').clear(), tx.objectStore('cards').clear(), tx.objectStore('events').clear(), tx.done]);
  });
  clearMirror(); latest = null; dirty = false;
  try { const s = ls(); if (s) Object.keys(s).filter((k) => k.startsWith('lingua.draft.')).forEach((k) => s.removeItem(k)); } catch { /* ignore */ }
}

/** Ask the browser not to evict our data under storage pressure. Safari/Chrome grant this more readily once the app is installed or used often, so it is asked again on every start. */
export async function requestPersistence() {
  try {
    if (await navigator.storage?.persisted?.()) return true;
    return (await navigator.storage?.persist?.()) ?? false;
  } catch { return false; }
}
