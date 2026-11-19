// The language-independent 30-day conversational programme.
// Each day names slots; each language supplies content for the slots (see content/*).
export interface DayDef {
  day: number; phase: string; title: string; canDo: string[]; cats: string[];
  newWords: number; grammar: string[]; conv: string; reading?: string; listening?: string; pron?: string; writing?: string; check?: boolean;
}
export const PHASES = [
  { id: 'foundations', label: 'Foundations', days: [1, 5] },
  { id: 'everyday', label: 'Everyday communication', days: [6, 10] },
  { id: 'expanding', label: 'Expanding conversations', days: [11, 15] },
  { id: 'independent', label: 'Independent communication', days: [16, 20] },
  { id: 'practical', label: 'Practical conversation', days: [21, 25] },
  { id: 'consolidation', label: 'Consolidation', days: [26, 30] },
];
export const phaseOf = (d: number) => PHASES.find((p) => d >= p.days[0] && d <= p.days[1])!;

const D = (day: number, title: string, canDo: string[], cats: string[], grammar: string[], conv: string, extra: Partial<DayDef> = {}, newWords = 10): DayDef =>
  ({ day, phase: phaseOf(day).label, title, canDo, cats, newWords, grammar, conv, ...extra });

export const PROGRAM: DayDef[] = [
  D(1, 'First words & sounds', ['Greet people and say goodbye', 'Say your name', 'Pronounce the alphabet and key sounds'], ['greetings'], ['pronouns'], 'greet', { pron: 'sounds', reading: 'r-intro' }, 12),
  D(2, 'Who am I?', ['Introduce yourself', 'Say where you are from', 'Count to 20'], ['numbers', 'pronouns'], ['be-verb'], 'introductions', { listening: 'l-intro', pron: 'sounds2' }),
  D(3, 'Things and people', ['Name common objects', 'Use articles and gender correctly', 'Make plurals'], ['objects'], ['articles-gender'], 'objects'),
  D(4, 'Doing things', ['Say what you do every day', 'Conjugate regular verbs in the present'], ['verbs'], ['present-regular'], 'daily-talk', { writing: 'w-self' }),
  D(5, 'Having, not having, asking', ['Say what you have', 'Make negative sentences', 'Ask simple questions'], ['questions'], ['have-verb', 'negation', 'questions'], 'smalltalk', { check: true, listening: 'l-smalltalk' }, 8),
  D(6, 'Food & drink', ['Order a meal', 'Say what you want', 'Be polite'], ['food'], ['want-verb'], 'restaurant', { reading: 'r-menu', listening: 'l-restaurant' }, 14),
  D(7, 'Shopping & numbers', ['Ask for prices', 'Count to 100', 'Buy something'], ['shopping', 'numbers'], ['polite-requests'], 'shopping', { listening: 'l-shopping' }),
  D(8, 'Family & people', ['Talk about your family', 'Use possessives', 'Describe relationships'], ['family'], ['possessives'], 'family', { reading: 'r-family' }),
  D(9, 'Places & directions', ['Ask where something is', 'Understand simple directions', 'Say where you are going'], ['places', 'travel'], ['go-places'], 'directions', { listening: 'l-directions' }),
  D(10, 'Time & daily routine', ['Tell the time', 'Describe your day', 'Use days and months'], ['time'], ['reflexive'], 'routine', { check: true, writing: 'w-day' }),
  D(11, 'Describing', ['Describe people and things', 'Make adjectives agree'], ['adjectives'], ['adjectives'], 'describing', { reading: 'r-person' }),
  D(12, 'Hobbies & preferences', ['Say what you like and dislike', 'Talk about free time'], ['hobbies'], ['like-verb'], 'hobbies', { listening: 'l-hobbies' }),
  D(13, 'Work & study', ['Talk about your job', 'Use common irregular verbs'], ['work'], ['irregular-present'], 'work', { reading: 'r-work' }),
  D(14, 'Can, must, want', ['Say what you can, must, and want to do', 'Make suggestions'], ['emotions'], ['modals'], 'plans-invite', { writing: 'w-message' }),
  D(15, 'Comparing & checking in', ['Compare things', 'Express preferences'], ['nature'], ['comparatives'], 'weather-compare', { check: true, listening: 'l-weather' }),
  D(16, 'What I did', ['Talk about what you did yesterday', 'Use the past'], ['health'], ['past-perfect'], 'yesterday', { reading: 'r-weekend' }),
  D(17, 'Past stories, part 2', ['Describe past situations', 'Use irregular past forms'], ['connectors'], ['past-2'], 'last-trip', { listening: 'l-trip' }),
  D(18, 'Plans & future', ['Talk about future plans', 'Make appointments'], ['time'], ['future-near'], 'appointments', { writing: 'w-plans' }, 8),
  D(19, 'Problems & help', ['Explain a problem', 'Ask for help', 'Use object pronouns'], ['health'], ['object-pronouns'], 'problems', { listening: 'l-problem' }),
  D(20, 'Longer sentences', ['Join ideas with connectors', 'Give reasons'], ['connectors'], ['connectors-opinions'], 'reasons', { check: true, reading: 'r-reasons' }, 8),
  D(21, 'Extended conversation', ['Keep a conversation going for 3+ minutes', 'Ask follow-up questions'], ['emotions'], [], 'meeting-someone', { listening: 'l-meet' }, 8),
  D(22, 'Natural listening', ['Follow natural-speed dialogue', 'Catch the gist'], ['verbs'], [], 'appointments', { listening: 'l-meet' }, 8),
  D(23, 'Storytelling', ['Tell a short story in the past', 'Sequence events'], ['connectors'], [], 'story', { reading: 'r-story', writing: 'w-story' }, 8),
  D(24, 'Opinions', ['Give and justify an opinion', 'Agree and disagree politely'], ['emotions'], [], 'opinions', { listening: 'l-opinion' }, 8),
  D(25, 'The unexpected', ['Handle unfamiliar situations', 'Ask someone to repeat or explain'], ['travel'], [], 'unexpected', { check: true }, 8),
  D(26, 'Challenge: travel', ['Complete a travel scenario independently'], [], [], 'travel-challenge', { listening: 'l-travel' }, 0),
  D(27, 'Challenge: social', ['Complete a social scenario independently'], [], [], 'social-challenge', { reading: 'r-social' }, 0),
  D(28, 'Retention day', ['Recover forgotten vocabulary', 'Fix your weakest grammar'], [], [], 'smalltalk', { writing: 'w-plans' }, 0),
  D(29, 'Listening & independence', ['Understand unscripted-style speech', 'Respond without options'], [], [], 'opinions', { listening: 'l-travel' }, 0),
  D(30, 'Final assessment', ['Demonstrate what you can do'], [], [], 'travel-challenge', { check: true }, 0),
];
export const PROGRAM_LENGTH = PROGRAM.length;
