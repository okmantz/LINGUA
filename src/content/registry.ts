// Adding a language = a content folder + one entry here. No application logic changes.
import type { LanguageConfig, LanguageContent } from '../core/types';

export const LANGUAGES: LanguageConfig[] = [
  { code: 'es', name: 'Spanish', endonym: 'Español', tts: 'es-ES', accents: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'], blurb: 'Phonetic spelling, two verbs "to be", and a huge speaking community.', load: () => import('./es').then((m) => m.default) },
  { code: 'fr', name: 'French', endonym: 'Français', tts: 'fr-FR', accents: ['é', 'è', 'ê', 'à', 'â', 'ç', 'î', 'ô', 'û', 'ù', 'œ', '«', '»'], blurb: 'Liaison, silent letters and nasal vowels — but a very regular grammar.', load: () => import('./fr').then((m) => m.default) },
  { code: 'de', name: 'German', endonym: 'Deutsch', tts: 'de-DE', accents: ['ä', 'ö', 'ü', 'ß'], blurb: 'Cases, three genders and verb-second word order, with very consistent pronunciation.', load: () => import('./de').then((m) => m.default) },
];
export const getLang = (code: string) => LANGUAGES.find((l) => l.code === code);
const cache = new Map<string, Promise<LanguageContent>>();
export const loadContent = (code: string) => {
  const cfg = getLang(code); if (!cfg) return Promise.reject(new Error(`Unknown language ${code}`));
  if (!cache.has(code)) cache.set(code, cfg.load());
  return cache.get(code)!;
};
