export const KO_GRAMMAR = `
## pronouns | pronouns | Pronouns & politeness | A1
S: Korean often drops pronouns. Politeness levels matter more: use the polite -요 style with everyone to start.
B: **저** (I, polite) and **나** (I, casual), **우리** (we). For "you", Koreans usually use the name or a title (**민수 씨**, **선생님**) because **당신** can sound rude. Add **-는/은** after a pronoun to mark it as the topic: **저는**, **우리는**.
B: Learn the polite style first: end sentences with **-요**. It is safe with strangers, colleagues and elders.
T: Role | Polite | Casual
T: I | 저 | 나
T: we | 저희 / 우리 | 우리
T: you | name + 씨 / 선생님 | 너
E: 저는 학생이에요. = I am a student.
E: 우리는 친구예요. = We are friends.
E: 민수 씨는 의사예요. = Minsu is a doctor.
E: 선생님은 친절해요. = The teacher is kind.
M: Using 당신 for "you" with a stranger. Use the name + 씨 instead.
M: Using 나 with elders: use 저.
M: Saying a pronoun in every sentence. Korean drops it when clear.
X: mcq Polite word for "I": ? 나 | *저 | 너 | 당신
X: fill ___ 학생이에요. (I am) => 저는
X: mcq How do you address your teacher? ? 너 | 당신 | *선생님 | 나
X: type we (casual) => 우리
## be-verb | be-verb | "To be": 이에요 / 예요 | A1
S: A is B is written A은/는 B이에요 (after a consonant) or B예요 (after a vowel).
B: **저는 학생이에요** (consonant → 이에요). **저는 의사예요** (vowel → 예요). For location use **있어요**: **집에 있어요.** Negative: **이/가 아니에요**: **학생이 아니에요.**
T: Ending of noun | Form
T: consonant | 이에요
T: vowel | 예요
T: negative | 이/가 아니에요
E: 저는 학생이에요. = I'm a student.
E: 저는 의사예요. = I'm a doctor.
E: 저는 의사가 아니에요. = I'm not a doctor.
E: 지금 집에 있어요. = I'm at home now.
M: Using 이에요 after a vowel: 의사이에요 should be 의사예요.
M: Using 이에요 for location. Use 있어요.
M: Forgetting 가/이 in the negative.
X: mcq 저는 학생___. ? 예요 | *이에요 | 있어요 | 아니에요
X: fill 저는 의사___. (a doctor) => 예요
X: mcq "I'm not a student." ? 학생이에요 | *학생이 아니에요 | 학생 없어요 | 학생 아니예요
X: type I am at home => 집에 있어요
## articles-gender | articles-gender | Particles: 은/는 and 이/가 | A1
S: Korean has no articles or gender. Particles attached to nouns mark their role in the sentence.
B: **은/는** mark the topic (what we are talking about). **이/가** mark the subject (and new information). After a consonant use **은/이**, after a vowel use **는/가**: **책이** (book is), **의사가**, **저는**. Plurals use **-들** but are optional: **친구들**.
T: Noun ends in | Topic | Subject | Object
T: consonant | 은 | 이 | 을
T: vowel | 는 | 가 | 를
E: 책이 재미있어요. = The book is interesting.
E: 저는 학생이에요. = I am a student.
E: 친구가 와요. = My friend is coming.
E: 친구들이 와요. = The friends are coming.
M: Using the wrong particle after a vowel: 저은 should be 저는.
M: Looking for an article. Korean has none.
M: Putting plural -들 on every noun. It's optional.
X: mcq 책___ 재미있어요. ? 가 | *이 | 은 | 를
X: fill 저___ 학생이에요. => 는
X: mcq 친구___ 와요. (my friend comes) ? 이 | *가 | 을 | 는
X: type friends => 친구들
## present-regular | present-regular | Polite present: -아요 / -어요 | A1
S: The polite present adds -아요 or -어요 to the verb stem, depending on the last vowel.
B: Take the dictionary form, drop **-다**, then add **-아요** if the last vowel is ㅏ or ㅗ, otherwise **-어요**: **가다 → 가요**, **먹다 → 먹어요**, **좋다 → 좋아요**. For **하다** verbs, the form is **해요**: **공부해요**. The same form works for "I eat", "he eats", "we eat" and as a polite suggestion.
T: Dictionary | Polite present
T: 가다 | 가요
T: 먹다 | 먹어요
T: 좋다 | 좋아요
T: 하다 | 해요
T: 읽다 | 읽어요
E: 저는 학교에 가요. = I go to school.
E: 밥을 먹어요. = I eat rice.
E: 한국어를 공부해요. = I study Korean.
E: 책을 읽어요. = I read a book.
M: Conjugating for the subject: 가요 is the same for I, you, he, we.
M: Writing 하어요: it should be 해요.
M: Using the plain dictionary form 가다 in polite speech.
X: mcq 저는 학교에 ___ . ? 가다 | *가요 | 갔다 | 갈까요
X: fill 저는 한국어를 ___ . (공부하다) => 공부해요
X: mcq 밥을 ___ . (먹다) ? 먹요 | *먹어요 | 먹아요 | 먹이요
X: type I read => 읽어요
## have-verb | have-verb | Having: 있어요 / 없어요 | A1
S: Korean uses "there is / there isn't" for possession: 있어요 / 없어요.
B: Possessor + 은/는, thing + 이/가: **저는 동생이 있어요** (as for me, a younger sibling exists = I have one). Negative: **없어요**: **저는 시간이 없어요.** Also location: **집에 있어요.**
T: Meaning | Form
T: I have X | 저는 X이/가 있어요
T: I don't have X | 저는 X이/가 없어요
E: 저는 동생이 있어요. = I have a younger sibling.
E: 시간이 없어요. = I have no time.
E: 돈이 있어요. = I have money.
E: 차가 없어요. = I don't have a car.
M: Using 하다 for "have".
M: Dropping 이/가 after the thing owned.
M: Using 있어요 for the negative.
X: mcq 시간이 ___ . (no time) ? 있어요 | *없어요 | 아니에요 | 해요
X: fill 저는 동생이 ___ . (I have) => 있어요
X: mcq "I have a car." ? 차가 없어요 | *저는 차가 있어요 | 저는 차예요 | 차를 해요
X: type there isn't => 없어요
## negation | negation | Negation: 안 and -지 않아요 | A1
S: Put 안 before a verb or adjective to negate it; for 하다 verbs it goes before 하다.
B: **안 가요** (I don't go), **안 먹어요**. For 하다 verbs: **공부 안 해요** (not 안 공부해요). Alternatively use the long form **-지 않아요**: **가지 않아요**. Use **못** for inability: **못 가요**.
T: Positive | Negative
T: 가요 | 안 가요
T: 먹어요 | 안 먹어요
T: 공부해요 | 공부 안 해요
T: 가요 | 못 가요 (can't)
E: 저는 안 가요. = I don't go.
E: 저는 고기를 안 먹어요. = I don't eat meat.
E: 오늘은 공부 안 해요. = I'm not studying today.
E: 저는 수영을 못 해요. = I can't swim.
M: Putting 안 after the verb.
M: Saying 안 공부해요: use 공부 안 해요.
M: Mixing 안 (won't) and 못 (can't).
X: mcq 저는 고기를 ___ 먹어요. ? 아니 | *안 | 없 | 비
X: fill 오늘은 공부 ___ 해요. => 안
X: mcq "I can't swim." ? 수영 안 해요 | *수영을 못 해요 | 수영 없어요 | 수영 아니에요
X: type I don't go => 안 가요
## questions | questions | Asking questions | A1
S: Questions keep the same word order; you rise in intonation or use question words like 뭐, 어디, 언제, 왜.
B: A statement with rising intonation becomes a question: **학생이에요?** Question words stay in place: **뭐 해요?** (What do you do?), **어디 가요?**, **언제 와요?**, **왜 와요?**, **얼마예요?** (How much?).
T: What | Word
T: what | 뭐
T: where | 어디
T: when | 언제
T: why | 왜
T: how | 어떻게
T: how much | 얼마
E: 뭐 해요? = What are you doing?
E: 어디 가요? = Where are you going?
E: 언제 와요? = When do you come?
E: 이거 얼마예요? = How much is this?
M: Moving the question word to the front. It stays where the answer would be.
M: Forgetting the rising intonation.
M: Using 뭐 for "who": use 누구.
X: mcq ___ 가요? (where) ? 뭐 | *어디 | 언제 | 왜
X: fill 이거 ___ 예요? (how much) => 얼마
X: mcq "Why do you come?" ? 어디 와요? | *왜 와요? | 뭐 와요? | 누구 와요?
X: type what => 뭐
## want-verb | want-verb | Wanting: -고 싶어요 | A1
S: Add -고 싶어요 to a verb stem to say you want to do something.
B: **Verb stem + -고 싶어요**: **가고 싶어요** (I want to go), **먹고 싶어요**, **자고 싶어요**. For nouns say **N을/를 원해요** or **N 주세요** (please give me). To say someone else wants, use **-고 싶어해요**.
T: Verb | Want to
T: 가다 | 가고 싶어요
T: 먹다 | 먹고 싶어요
T: 자다 | 자고 싶어요
E: 저는 커피를 마시고 싶어요. = I want to drink coffee.
E: 집에 가고 싶어요. = I want to go home.
E: 물 주세요. = Water, please.
E: 친구는 자고 싶어해요. = My friend wants to sleep.
M: Using 원해요 for verbs: use -고 싶어요.
M: Forgetting the stem: 가다고 싶어요 is wrong.
M: Using 싶어요 for third persons: use 싶어해요.
X: mcq 집에 ___ 싶어요. ? 가요 | *가고 | 가다 | 갔다
X: fill 커피를 마시___ 싶어요. => 고
X: mcq "Water, please." ? 물 해요 | *물 주세요 | 물 원해 | 물이에요
X: type I want to eat => 먹고 싶어요
## polite-requests | polite-requests | Polite requests | A1
S: Make polite requests with 주세요 or -아/어 주세요.
B: **Noun + 주세요** (please give me): **물 주세요.** **Verb + -아/어 주세요** (please do): **도와 주세요** (please help), **천천히 말해 주세요** (please speak slowly). Get attention with **저기요** or **실례합니다**. Thank with **감사합니다**.
T: Request | Say
T: ordering | 커피 주세요
T: help | 도와 주세요
T: speak slowly | 천천히 말해 주세요
T: attention | 저기요
E: 물 주세요. = Water, please.
E: 도와 주세요. = Please help me.
E: 천천히 말해 주세요. = Please speak slowly.
E: 저기요, 계산서 주세요. = Excuse me, the bill please.
M: Using the plain 줘 with strangers.
M: Forgetting the particle with ordering: 물을 주세요 is also fine.
M: Using 주세요 after a verb without the 아/어 form.
X: mcq To order water: ? 물 해요 | *물 주세요 | 물 있어요 | 물이에요
X: fill 천천히 말해 ___ . (please) => 주세요
X: mcq To get a waiter's attention: ? 안녕 | *저기요 | 감사합니다 | 네
X: type please help => 도와 주세요
## possessives | possessives | Possession with 의 | A1
S: Use 의 (often pronounced "e" and often dropped) to link possessor and thing, or the short forms 제, 내, 우리.
B: **저의 → 제** (my, polite), **나의 → 내** (my, casual), **우리** (our): **제 친구** (my friend), **우리 집** (our house). With other nouns: **민수의 책** (Minsu's book), usually shortened to **민수 책**.
T: Pronoun | Possessive
T: 저 | 제
T: 나 | 내
T: 우리 | 우리
E: 제 친구예요. = He's my friend.
E: 우리 집이 커요. = Our house is big.
E: 민수 책이에요. = It's Minsu's book.
E: 제 이름은 안나예요. = My name is Anna.
M: Using 저의 in casual speech: 제 is more natural.
M: Putting the possessed noun first.
M: Using 우리 as only "we": it also means "our/my" for family and groups.
X: mcq ___ 친구예요. (my, polite) ? 나의 | *제 | 저 | 우리
X: fill ___ 집이 커요. (our) => 우리
X: mcq "Minsu's book" ? 책 민수 | *민수 책 | 민수을 책 | 민수가 책
X: type my name => 제 이름
## go-places | go-places | Going places: 에 가요 | A1
S: Destinations take the particle 에 and the verb 가다 (go) or 오다 (come). Use 에서 for where something happens.
B: **학교에 가요** (I go to school). **회사에서 일해요** (I work at the company). Transport: **버스를 타요** (I take the bus) and **버스로 가요** (I go by bus). Where something is: **집에 있어요.**
T: Particle | Use
T: 에 | to / at (location, time)
T: 에서 | at (action place) / from
T: 로/으로 | by (means) / towards
E: 학교에 가요. = I go to school.
E: 회사에서 일해요. = I work at the company.
E: 버스로 가요. = I go by bus.
E: 서울에 살아요. = I live in Seoul.
M: Using 에서 for destinations: 학교에서 가요 is wrong.
M: Using 에 for action place: 회사에 일해요 is wrong.
M: Putting the verb before the destination.
X: mcq 학교___ 가요. ? 에서 | *에 | 를 | 은
X: fill 회사___ 일해요. => 에서
X: mcq "I go by bus." ? 버스에 가요 | *버스로 가요 | 버스를 가요 | 버스예요
X: type I take the bus => 버스를 타요
## reflexive | reflexive | Time & routine | A1
S: Times use 에: 일곱 시에 일어나요. Native numbers count the hour, Sino numbers count minutes.
B: Hour: **한 시, 두 시, 세 시, 일곱 시** (native numbers). Minute: **십 분, 이십 분** (Sino). So 7:20 is **일곱 시 이십 분**. Add 에 to say "at": **일곱 시에**. Routine: **일어나요 (get up), 먹어요, 일해요, 자요**.
T: Part | Numbers
T: hour | native (한, 두, 세 …)
T: minute | Sino (일, 이, 삼 …)
T: at | 에
E: 일곱 시에 일어나요. = I get up at seven.
E: 여덟 시에 일해요. = I work at eight.
E: 열두 시에 점심을 먹어요. = I eat lunch at twelve.
E: 밤 열 시에 자요. = I sleep at ten at night.
M: Using Sino numbers for hours: 칠 시 is wrong, say 일곱 시.
M: Forgetting 에 after time words.
M: Saying 하나 시: it's 한 시.
X: mcq ___ 시에 일어나요. (seven) ? 칠 | *일곱 | 일 | 이
X: fill 일곱 시___ 일어나요. => 에
X: mcq 10 minutes is ___ . ? 열 분 | *십 분 | 십 시 | 열 시
X: type I get up => 일어나요
## adjectives | adjectives | Describing with adjectives | A1
S: Korean adjectives are verbs (descriptive verbs). They conjugate like verbs and come before the noun in -ㄴ/은 form.
B: Predicate: **집이 커요** (the house is big). Before a noun: **큰 집** (a big house). Rule: consonant stem → **-은**, vowel stem → **-ㄴ**: **좋은** (good), **예쁜** (pretty), **작은** (small). Intensify with **아주 / 너무 / 매우**.
T: Dictionary | Predicate | Before noun
T: 크다 | 커요 | 큰
T: 작다 | 작아요 | 작은
T: 예쁘다 | 예뻐요 | 예쁜
T: 좋다 | 좋아요 | 좋은
E: 집이 커요. = The house is big.
E: 큰 집이에요. = It's a big house.
E: 날씨가 아주 좋아요. = The weather is very good.
E: 예쁜 꽃이에요. = It's a pretty flower.
M: Adding 이에요 to adjectives: 크이에요 is wrong.
M: Putting the adjective after the noun.
M: Writing 크은: it's 큰.
X: mcq ___ 집이에요. (big house) ? 커요 | *큰 | 크다 | 크은
X: fill 날씨가 ___ 좋아요. (very) => 아주
X: mcq "a pretty flower" ? 꽃 예쁜 | *예쁜 꽃 | 예뻐요 꽃 | 꽃이 예쁜
X: type small (before noun) => 작은
## like-verb | like-verb | Liking: 좋아해요 | A1
S: Use 을/를 좋아해요 for "I like X", and 이/가 좋아요 for "X is good / I like X".
B: **저는 커피를 좋아해요** (I like coffee). **커피가 좋아요** (coffee is good). Do-verbs: **N을 좋아해요**, **-는 것을 좋아해요** (I like doing): **읽는 것을 좋아해요.** Dislike: **싫어해요**.
T: Pattern | Meaning
T: N을/를 좋아해요 | I like N
T: N이/가 좋아요 | N is good
T: N을/를 싫어해요 | I dislike N
E: 저는 커피를 좋아해요. = I like coffee.
E: 저는 음악을 좋아해요. = I like music.
E: 책 읽는 것을 좋아해요. = I like reading.
E: 저는 매운 음식을 싫어해요. = I dislike spicy food.
M: Using 좋아요 with an object marker.
M: Using 을 after a vowel: 커피을 should be 커피를.
M: Forgetting 는 것을 with verbs.
X: mcq 저는 커피___ 좋아해요. ? 이 | *를 | 은 | 가
X: fill 저는 음악___ 좋아해요. => 을
X: mcq "I dislike spicy food." ? 매운 음식을 좋아해요 | *매운 음식을 싫어해요 | 매운 음식 없어요 | 매운 음식이에요
X: type I like (verb) => 좋아해요
## irregular-present | irregular-present | Irregular & useful verbs | A2
S: Some verbs change in the polite present: ㅂ-irregular, ㄷ-irregular, 르-irregular and 으-drop.
B: **ㅂ-irregular**: 덥다 → **더워요**, 춥다 → **추워요**, 쉽다 → **쉬워요**, 어렵다 → **어려워요**. **으-drop**: 크다 → **커요**, 바쁘다 → **바빠요**. **르-irregular**: 모르다 → **몰라요**, 빠르다 → **빨라요**. **ㄷ-irregular**: 듣다 → **들어요**.
T: Dictionary | Polite | Type
T: 덥다 | 더워요 | ㅂ
T: 춥다 | 추워요 | ㅂ
T: 바쁘다 | 바빠요 | 으-drop
T: 모르다 | 몰라요 | 르
T: 듣다 | 들어요 | ㄷ
E: 오늘은 더워요. = It's hot today.
E: 저는 바빠요. = I'm busy.
E: 저는 몰라요. = I don't know.
E: 음악을 들어요. = I listen to music.
M: Regularising: 덥어요 is wrong, say 더워요.
M: Saying 모르어요: it's 몰라요.
M: Forgetting the ㄷ→ㄹ change in 들어요.
X: mcq 오늘은 ___ . (hot) ? 덥어요 | *더워요 | 덥다요 | 더어요
X: fill 저는 ___ . (busy) => 바빠요
X: mcq "I don't know." ? 모르요 | *몰라요 | 모르어요 | 몰르요
X: type I listen => 들어요
## modals | modals | Can & must | A2
S: Ability uses -ㄹ 수 있어요 / 없어요; obligation uses -아/어야 해요; permission uses -아/어도 돼요.
B: **Stem + -ㄹ 수 있어요** (can): **갈 수 있어요**, **먹을 수 있어요**. Can't: **-ㄹ 수 없어요.** Must: **-아/어야 해요**: **가야 해요**, **먹어야 해요**. May: **-아/어도 돼요**: **가도 돼요?** Don't: **-지 마세요.**
T: Pattern | Meaning
T: -ㄹ 수 있어요 | can
T: -ㄹ 수 없어요 | cannot
T: -아/어야 해요 | must
T: -아/어도 돼요 | may
E: 한국어를 말할 수 있어요. = I can speak Korean.
E: 지금 가야 해요. = I must go now.
E: 여기 앉아도 돼요? = May I sit here?
E: 오늘은 갈 수 없어요. = I can't go today.
M: Using 있어요 without 수.
M: Mixing 아야 해요 with 아도 돼요.
M: Forgetting the stem: 가다 수 있어요 is wrong.
X: mcq 저는 한국어를 말할 ___ 있어요. ? 것 | *수 | 때 | 게
X: fill 지금 가___ 해요. (must) => 야
X: mcq "May I sit here?" ? 앉아야 해요 | *앉아도 돼요 | 앉을 수 없어요 | 앉고 싶어요
X: type I can't go => 갈 수 없어요
## comparatives | comparatives | Comparing | A2
S: Compare with 보다 (than) and 더 (more); use 제일 or 가장 for "most".
B: **A이/가 B보다 더 + adjective**: **기차가 버스보다 더 빨라요** (the train is faster than the bus). Superlative: **제일 / 가장**: **제일 비싸요** (most expensive). Equal: **만큼**.
T: Pattern | Meaning
T: A이/가 B보다 더 … | A is more … than B
T: 제일 … | the most …
T: 가장 … | the most …
E: 기차가 버스보다 더 빨라요. = The train is faster than the bus.
E: 이것이 저것보다 더 커요. = This is bigger than that.
E: 이게 제일 비싸요. = This is the most expensive.
E: 여름이 겨울보다 더 더워요. = Summer is hotter than winter.
M: Using 보다 after the first item.
M: Forgetting 더.
M: Using 제일 with 더.
X: mcq 기차가 버스___ 더 빨라요. ? 에 | *보다 | 를 | 와
X: fill 이게 ___ 비싸요. (most) => 제일
X: mcq "The train is faster than the bus." ? 버스가 기차보다 더 빨라요 | *기차가 버스보다 더 빨라요 | 기차보다 버스가 더 빨라요 | 기차가 버스를 빨라요
X: type more => 더
## past-perfect | past-perfect | Past tense | A2
S: Add -았어요 / -었어요 to the stem for the polite past tense.
B: Take the polite present stem and replace **-요** with **-ㅆ어요**: **가요 → 갔어요**, **먹어요 → 먹었어요**, **해요 → 했어요**, **좋아요 → 좋았어요**. 이에요/예요 becomes **이었어요 / 였어요**: **학생이었어요.**
T: Dictionary | Present | Past
T: 가다 | 가요 | 갔어요
T: 먹다 | 먹어요 | 먹었어요
T: 하다 | 해요 | 했어요
T: 좋다 | 좋아요 | 좋았어요
E: 어제 영화를 봤어요. = I watched a film yesterday.
E: 점심을 먹었어요. = I ate lunch.
E: 어제 공부했어요. = I studied yesterday.
E: 날씨가 좋았어요. = The weather was good.
M: Adding 았 to 하 verbs: 하았어요 is wrong, say 했어요.
M: Using the present with 어제.
M: Mixing up 았 and 었: 아/오 → 았, others → 었.
X: mcq 어제 영화를 ___ . ? 봐요 | *봤어요 | 볼 거예요 | 보고 싶어요
X: fill 어제 공부___ . (studied) => 했어요
X: mcq "I ate lunch." ? 점심을 먹어요 | *점심을 먹었어요 | 점심을 먹을 거예요 | 점심을 먹고 싶어요
X: type it was good => 좋았어요
## past-2 | past-2 | Past stories | A2
S: Link past events with -고 (and), -아서/어서 (so/then) and 그리고.
B: **Stem + -고**: **먹고 갔어요** (ate and went). **Stem + -아서/어서** (because/so, sequence): **피곤해서 잤어요** (I was tired so I slept). Past connecting: **그리고 나서** (after that).
T: Pattern | Meaning
T: -고 | and / then
T: -아서/어서 | because / and then
T: 그리고 | and (between sentences)
E: 점심을 먹고 갔어요. = I ate lunch and left.
E: 피곤해서 일찍 잤어요. = I was tired so I slept early.
E: 비가 와서 집에 있었어요. = It rained so I stayed home.
E: 어제는 영화를 보고 쇼핑했어요. = Yesterday I watched a film and went shopping.
M: Using -고 for reasons: use -아서/어서.
M: Putting a past ending on the first clause with -아서.
M: Forgetting that tense goes on the last verb.
X: mcq 피곤___ 일찍 잤어요. ? 고 | *해서 | 으면 | 지만
X: fill 점심을 먹___ 갔어요. (and) => 고
X: mcq "It rained so I stayed home." ? 비가 오고 집에 있었어요 | *비가 와서 집에 있었어요 | 비가 오면 집에 있었어요 | 비가 오지만 집에 있었어요
X: type because (verb ending) => 아서
## future-near | future-near | Future: -(으)ㄹ 거예요 | A2
S: The future is -(으)ㄹ 거예요 (will / going to). The polite present can also express near future.
B: **Stem + -ㄹ 거예요** (vowel stems) or **-을 거예요** (consonant stems): **갈 거예요**, **먹을 거예요**, **할 거예요**. Offers and suggestions: **-ㄹ까요?** (shall we?): **같이 갈까요?** Plans: **-려고 해요** (I plan to).
T: Dictionary | Future
T: 가다 | 갈 거예요
T: 먹다 | 먹을 거예요
T: 하다 | 할 거예요
E: 내일 서울에 갈 거예요. = I will go to Seoul tomorrow.
E: 주말에 영화를 볼 거예요. = I'll watch a film on the weekend.
E: 같이 갈까요? = Shall we go together?
E: 내일 일할 거예요. = I'll work tomorrow.
M: Using -ㄹ 거예요 for facts instead of the present.
M: Writing 가을 거예요: 가 ends in a vowel, so 갈 거예요.
M: Forgetting 거예요 and writing 거에요.
X: mcq 내일 서울에 ___ . ? 가요 | *갈 거예요 | 갔어요 | 가고 싶어요
X: fill 같이 갈___ ? (shall we) => 까요
X: mcq "I'll eat." ? *먹을 거예요 | 먹을 거 있어요 | 먹었어요 | 먹고 싶어요
X: type I will do => 할 거예요
## object-pronouns | object-pronouns | Object & dative particles | A2
S: Korean marks objects with 을/를 and recipients with 에게 or 한테.
B: **저를** (me), **나를** (me), **친구를** (a friend as object). Recipient: **친구에게 줘요** (I give to a friend), **엄마한테 전화해요** (I call mum). Honorific recipient: **선생님께 드려요.**
T: Role | Particle
T: object | 을/를
T: recipient | 에게 / 한테
T: honorific recipient | 께
E: 저는 친구를 만나요. = I meet a friend.
E: 친구에게 선물을 줘요. = I give my friend a gift.
E: 엄마한테 전화해요. = I call mum.
E: 선생님께 질문해요. = I ask the teacher a question.
M: Using 를 for the recipient.
M: Using 에게 for things: use 에.
M: Using 한테 with respected people: use 께.
X: mcq 엄마___ 전화해요. ? 를 | *한테 | 에서 | 가
X: fill 저는 친구___ 만나요. => 를
X: mcq To a teacher: 선생님___ 질문해요. ? 한테 | *께 | 에게 | 에
X: type to my friend => 친구에게
## connectors-opinions | connectors-opinions | Joining ideas & opinions | A2
S: Use -고, -지만, -아서/어서, -(으)면 to join clauses and 생각해요 to give opinions.
B: **-지만** (but): **비싸지만 맛있어요.** **-(으)면** (if): **비가 오면 집에 있어요.** **-고 생각해요** (I think that): **좋다고 생각해요.** Agree: **맞아요, 저도 그렇게 생각해요.** Disagree: **저는 다르게 생각해요.**
T: Connector | Meaning
T: -고 | and
T: -지만 | but
T: -아서/어서 | because
T: -(으)면 | if
E: 비싸지만 맛있어요. = It's expensive but tasty.
E: 비가 오면 집에 있어요. = If it rains I stay home.
E: 좋다고 생각해요. = I think it's good.
E: 저도 그렇게 생각해요. = I think so too.
M: Using 하지만 inside a clause: use -지만.
M: Forgetting to drop 다 before -고 생각해요: 좋다고.
M: Using -면 without a stem.
X: mcq 비싸___ 맛있어요. (but) ? 고 | *지만 | 서 | 면
X: fill 비가 오___ 집에 있어요. (if) => 면
X: mcq "I think it's good." ? *좋다고 생각해요 | 좋아서 생각해요 | 좋으면 생각해요 | 좋고 생각해요
X: type I think so too => 저도 그렇게 생각해요
## cases | cases | Particle overview | A2
S: Korean marks roles with particles instead of cases: 은/는, 이/가, 을/를, 에, 에서, 로/으로, 와/과, 의, 도.
B: **은/는** topic · **이/가** subject · **을/를** object · **에** location/time · **에서** action place · **(으)로** means/direction · **와/과** with/and · **의** possessive · **도** also · **만** only. Choose the form by the last sound of the noun: consonant vs vowel.
T: Role | After consonant | After vowel
T: topic | 은 | 는
T: subject | 이 | 가
T: object | 을 | 를
T: with | 과 | 와
T: direction | 으로 | 로
E: 저는 책을 읽어요. = I read a book.
E: 친구와 학교에 가요. = I go to school with a friend.
E: 저도 학생이에요. = I'm a student too.
E: 지하철로 가요. = I go by subway.
M: Using 은 after a vowel noun: 저은 → 저는.
M: Using 을 for subject.
M: Using 로 after ㄹ-consonant nouns when it needs 로, not 으로.
X: mcq 책___ 읽어요. ? 를 | *을 | 이 | 에
X: fill 친구___ 학교에 가요. (with) => 와
X: mcq "I go by subway." ? 지하철에 가요 | *지하철로 가요 | 지하철을 가요 | 지하철은 가요
X: type also (particle) => 도
`;
