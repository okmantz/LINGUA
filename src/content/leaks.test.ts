// Guards against questions that can be answered without knowing the language: the answer repeated verbatim in the passage or prompt.
import { describe, it, expect } from 'vitest';
import { LANGUAGES, loadContent } from './registry';
import { leakIssues } from './leaks';

for (const lang of LANGUAGES) {
  describe(`no context-clue leaks: ${lang.code}`, async () => {
    const c = await loadContent(lang.code);
    it('questions need the language, not just pattern matching', () => {
      expect(leakIssues(c, lang.code), 'leaky questions').toEqual([]);
    });
  });
}
