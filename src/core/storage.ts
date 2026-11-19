// Local-first persistence: IndexedDB (profile, cards, events) with versioned schema + JSON backup.
import { openDB, type IDBPDatabase } from 'idb';
import type { Card, EventRec, Profile } from './types';

export const SCHEMA_VERSION = 1;
const DB_NAME = 'lingua';
const DB_VERSION = 1;

let dbp: Promise<IDBPDatabase> | null = null;
export function db() {
  if (!dbp) {
    dbp = openDB(DB_NAME, DB_VERSION, {
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
    });
  }
  return dbp;
}
export const resetDbHandle = () => { dbp = null; };

/** Data migrations for the profile document. Add a step per schema bump. */
export function migrateProfile(p: any): Profile {
  let cur = p;
  const v = cur.schema ?? 0;
  if (v < 1) {
    cur = { ...cur, schema: 1, unlockedCosmetics: cur.unlockedCosmetics ?? [], achievements: cur.achievements ?? {} };
  }
  // if (v < 2) { ...future migration... }
  if (cur.schema > SCHEMA_VERSION) throw new Error(`Backup is from a newer LINGUA (schema ${cur.schema}). Update the app first.`);
  return cur as Profile;
}

export async function loadProfile(): Promise<Profile | null> {
  const d = await db();
  const p = await d.get('kv', 'profile');
  return p ? migrateProfile(p) : null;
}
export async function saveProfile(p: Profile) { const d = await db(); await d.put('kv', p, 'profile'); }
export async function loadCards(lang?: string): Promise<Card[]> {
  const d = await db();
  return lang ? d.getAllFromIndex('cards', 'lang', lang) : d.getAll('cards');
}
export async function saveCard(c: Card) { const d = await db(); await d.put('cards', c); }
export async function saveCards(cs: Card[]) {
  const d = await db(); const tx = d.transaction('cards', 'readwrite');
  await Promise.all([...cs.map((c) => tx.store.put(c)), tx.done]);
}
export async function addEvent(e: EventRec) { const d = await db(); await d.add('events', e); }
export async function loadEvents(lang?: string): Promise<EventRec[]> {
  const d = await db();
  return lang ? d.getAllFromIndex('events', 'lang', lang) : d.getAll('events');
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
  const profile = migrateProfile(b.profile);
  const d = await db();
  const tx = d.transaction(['kv', 'cards', 'events'], 'readwrite');
  await tx.objectStore('kv').put(profile, 'profile');
  await tx.objectStore('cards').clear();
  await tx.objectStore('events').clear();
  for (const c of b.cards) await tx.objectStore('cards').put(c);
  for (const e of b.events) { const { id, ...rest } = e; await tx.objectStore('events').add(rest); }
  await tx.done;
  return profile;
}
export async function wipeAll() {
  const d = await db();
  const tx = d.transaction(['kv', 'cards', 'events'], 'readwrite');
  await Promise.all([tx.objectStore('kv').clear(), tx.objectStore('cards').clear(), tx.objectStore('events').clear(), tx.done]);
}
export async function requestPersistence() {
  try { return (await navigator.storage?.persist?.()) ?? false; } catch { return false; }
}
