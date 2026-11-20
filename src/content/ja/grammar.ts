export const JA_GRAMMAR = `
## pronouns | pronouns | Pronouns & politeness | A1
S: Japanese often drops pronouns. Use names and titles instead of "you", and the polite です/ます style with everyone at first.
B: **わたし** (I, polite and neutral), **わたしたち** (we). For "you", use the person's name + **さん** (たなかさん), or a title like **先生**. **あなた** is rarely used with people you know. **かれ** (he) and **かのじょ** (she) are used less than in English.
B: The polite style ends in **です / ます**. It is safe with strangers, colleagues and elders.
T: English | Japanese
T: I | わたし
T: we | わたしたち
T: you | name + さん
T: he / she | かれ / かのじょ
E: わたしは学生です。 = I am a student.
E: たなかさんは先生です。 = Mr Tanaka is a teacher.
E: わたしたちは友達です。 = We are friends.
E: かのじょは医者です。 = She is a doctor.
M: Using あなた for "you" with a teacher or boss. Use their name + さん / 先生.
M: Putting さん after your own name.
M: Saying a pronoun in every sentence. Drop it when clear.
X: mcq To address Mr Tanaka: ? あなた | *たなかさん | たなか | きみ
X: fill ___は学生です。 (I) => わたし
X: mcq Which word means "we"? ? わたし | かれ | *わたしたち | あなた
X: type teacher => 先生
## be-verb | be-verb | "To be": です | A1
S: A は B です means "A is B". です is the polite copula. For living things "to exist" use います and for things あります.
B: **わたしは学生です。** (I am a student.) Negative: **学生ではありません** (or じゃありません). Past: **学生でした**. Question: add **か**: **学生ですか。** Existence: **家にいます** (I'm at home), **本があります** (there is a book).
T: Form | Example
T: affirmative | 学生です
T: negative | 学生ではありません
T: past | 学生でした
T: question | 学生ですか
E: わたしは学生です。 = I am a student.
E: かれは医者ではありません。 = He is not a doctor.
E: 昨日は雨でした。 = Yesterday was rainy.
E: あなたは先生ですか。 = Are you a teacher?
M: Using です for existence of people: use います.
M: Forgetting か in questions: rising tone alone is casual.
M: Using ない without です/ます in polite speech.
X: mcq わたしは学生___。 ? ます | *です | います | あります
X: fill かれは医者___ありません。 => では
X: mcq "Are you a teacher?" ? 先生です | *先生ですか | 先生ですは | 先生でした
X: type was (copula) => でした
## articles-gender | articles-gender | Particles: は, が, を | A1
S: Japanese has no articles or gender. Particles mark the role of each word: は (topic), が (subject), を (object).
B: **は** (pronounced "wa") marks the topic: **わたしは学生です。** **が** marks the subject, especially new information or with あります/すき: **花がきれいです。** **を** marks the direct object: **本を読みます。** Particles come after the word and the verb comes last.
T: Particle | Role
T: は (wa) | topic
T: が | subject
T: を (o) | object
T: の | of / 's
E: わたしは学生です。 = I am a student.
E: 本を読みます。 = I read a book.
E: 花がきれいです。 = The flower is pretty.
E: わたしの本です。 = It's my book.
M: Reading は as "ha" when it is a particle: it's "wa".
M: Using は and を for the same job.
M: Putting the verb before the object.
X: mcq 本___ 読みます。 ? は | *を | の | に
X: fill わたし___ 学生です。 (topic) => は
X: mcq "my book" ? 本のわたし | *わたしの本 | わたしが本 | 本をわたし
X: type of / possessive => の
## present-regular | present-regular | Polite present: ます | A1
S: The polite present/future adds ます to the verb's stem. Negative is ません.
B: Verbs are in two groups. Group 1 changes the final vowel: **のむ → のみます**, **かく → かきます**. Group 2 drops る: **たべる → たべます**, **みる → みます**. Irregular: **する → します**, **くる → きます**. Negative **-ません**, past **-ました**, past negative **-ませんでした**.
T: Dictionary | Polite
T: 食べる | 食べます
T: 飲む | 飲みます
T: 読む | 読みます
T: する | します
T: 来る | 来ます
E: 毎日、本を読みます。 = I read books every day.
E: 水を飲みます。 = I drink water.
E: ごはんを食べます。 = I eat rice.
E: 日本語を勉強します。 = I study Japanese.
M: Conjugating by person: the same form works for all subjects.
M: Using the dictionary form in polite speech.
M: Mixing the two groups: のむます is wrong.
X: mcq ごはんを___。 ? 食べる | *食べます | 食べた | 食べて
X: fill 水を飲み___。 => ます
X: mcq Negative of 食べます: ? 食べますん | *食べません | 食べないます | 食べませ
X: type I do (polite) => します
## have-verb | have-verb | Having: あります / います | A1
S: Possession is expressed as "X exists to me": わたしには X があります.
B: **あります** for things, **います** for living beings. **時間があります** (I have time), **兄がいます** (I have an older brother). Negative: **ありません / いません**. Location: **Place に Thing が あります**: **机の上にペンがあります。**
T: Existence | Positive | Negative
T: things | あります | ありません
T: living | います | いません
E: 時間があります。 = I have time.
E: 兄がいます。 = I have an older brother.
E: お金がありません。 = I have no money.
E: 机の上にペンがあります。 = There is a pen on the desk.
M: Using あります for people: use います.
M: Using を with あります/います: use が.
M: Using ない without ます in polite speech.
X: mcq 犬が___。 (there is a dog) ? あります | *います | です | ます
X: fill 時間が___。 (I don't have time) => ありません
X: mcq A pen exists: ペンが___ ? います | *あります | です | しません
X: type exists (living) => います
## negation | negation | Negation | A1
S: Polite negatives: ません for verbs, ではありません for です, くないです for i-adjectives.
B: Verbs: **食べません**. Nouns/na-adjectives: **学生ではありません**, **きれいではありません**. I-adjectives: drop い and add **くないです**: **たかいです → たかくないです**. The exception is **いい → よくないです**. Add **ぜんぜん** for "not at all".
T: Type | Negative
T: verb | ません
T: noun / na-adj | ではありません
T: i-adjective | くないです
E: 肉を食べません。 = I don't eat meat.
E: かれは医者ではありません。 = He isn't a doctor.
E: これはたかくないです。 = This isn't expensive.
E: ぜんぜんわかりません。 = I don't understand at all.
M: Using ではありません with i-adjectives: use くないです.
M: Forgetting that いい becomes よくない.
M: Using ません with nouns.
X: mcq たかいです → ? たかいではありません | *たかくないです | たかいません | たかなです
X: fill 肉を食べ___。 => ません
X: mcq "I'm not a student." ? 学生ません | *学生ではありません | 学生くないです | 学生ありません
X: type not at all => ぜんぜん
## questions | questions | Asking questions | A1
S: Add か at the end of a polite sentence. Question words stay in the position of the answer.
B: **学生ですか。** (Are you a student?) Question words: **なに / なん** (what), **だれ** (who), **どこ** (where), **いつ** (when), **なぜ / どうして** (why), **いくら** (how much), **どう** (how). **これはなんですか。** **トイレはどこですか。**
T: What | Word
T: what | なん / なに
T: who | だれ
T: where | どこ
T: when | いつ
T: why | なぜ / どうして
T: how much | いくら
E: これはなんですか。 = What is this?
E: トイレはどこですか。 = Where is the toilet?
E: いつ来ますか。 = When do you come?
E: これはいくらですか。 = How much is this?
M: Forgetting か.
M: Moving the question word to the front.
M: Using なに before です: it's なん.
X: mcq トイレは___ですか。 (where) ? なん | *どこ | いつ | だれ
X: fill これはいくら___。 => ですか
X: mcq "What is this?" ? これはどこですか | *これはなんですか | これはだれですか | これはいつですか
X: type when => いつ
## want-verb | want-verb | Wanting: ほしい & たい | A1
S: Use たい after the verb stem to say you want to do something, and ほしい to want a thing.
B: **Stem + たいです**: **行きたいです** (I want to go), **食べたいです**. For things: **Noun が ほしいです**: **水がほしいです**. For polite ordering: **Noun を おねがいします / ください**. Negative: **たくないです**.
T: Verb | Want
T: 行く | 行きたいです
T: 食べる | 食べたいです
T: 飲む | 飲みたいです
E: コーヒーを飲みたいです。 = I want to drink coffee.
E: 家に帰りたいです。 = I want to go home.
E: 水がほしいです。 = I want water.
E: 食べたくないです。 = I don't want to eat.
M: Using たい with a noun: use ほしい.
M: Using たい for another person's wishes in a statement.
M: Forgetting the stem: 食べるたい is wrong.
X: mcq 家に帰___です。 ? ります | *りたい | る | った
X: fill 水が___です。 (want) => ほしい
X: mcq "I want to eat." ? 食べますたい | *食べたいです | 食べるほしい | 食べがほしい
X: type I don't want to eat => 食べたくないです
## polite-requests | polite-requests | Polite requests | A1
S: Ask politely with おねがいします and the te-form + ください.
B: **Noun + を おねがいします / ください**: **水をください。** **Verb te-form + ください**: **見てください** (please look), **ゆっくり話してください** (please speak slowly). Attention: **すみません**. Thanks: **ありがとうございます**.
T: Request | Say
T: ordering | コーヒーをおねがいします
T: asking | 見てください
T: slow | ゆっくり話してください
T: attention | すみません
E: 水をください。 = Water, please.
E: ゆっくり話してください。 = Please speak slowly.
E: すみません、お会計をおねがいします。 = Excuse me, the bill please.
E: もう一度言ってください。 = Please say it once more.
M: Using ください with a verb that is not in the te-form.
M: Forgetting すみません to attract attention.
M: Using きみ for "you".
X: mcq To order water: ? 水です | *水をください | 水があります | 水を見ます
X: fill ゆっくり話し___ください。 => て
X: mcq To get a waiter's attention: ? ありがとう | *すみません | はい | さようなら
X: type please give me => ください
## possessives | possessives | Possession with の | A1
S: の links two nouns like "'s" or "of": わたしの本 = my book.
B: **わたしの本** (my book), **先生の車** (the teacher's car), **日本の友達** (a Japanese friend). Pronoun possessives: **わたしの, あなたの, かれの**. Chain with の: **わたしの友達の家** (my friend's house).
T: Phrase | Meaning
T: わたしの本 | my book
T: 先生の車 | the teacher's car
T: 友達の家 | friend's house
E: わたしの本です。 = It's my book.
E: たなかさんの車です。 = It's Mr Tanaka's car.
E: これはわたしの家です。 = This is my house.
E: 母の名前は花子です。 = My mother's name is Hanako.
M: Putting the possessed noun first.
M: Using の between a noun and an adjective: it isn't needed.
M: Forgetting の after names.
X: mcq わたし___本です。 ? は | を | *の | が
X: fill これはたなかさん___車です。 => の
X: mcq "my friend's house" ? 家の友達わたし | *わたしの友達の家 | 友達わたしの家 | わたしは友達家
X: type 's (possessive) => の
## go-places | go-places | Going places: に行きます | A1
S: Destinations take に (or へ) and the verb 行きます. で marks where something happens or the means.
B: **学校に行きます** (I go to school). **会社ではたらきます** (I work at a company). **バスで行きます** (I go by bus). **電車に乗ります** (I take the train). Coming: **来ます**; returning: **帰ります**.
T: Particle | Use
T: に | to / at / in (time)
T: へ | towards
T: で | at (action) / by (means)
E: 学校に行きます。 = I go to school.
E: 会社ではたらきます。 = I work at a company.
E: バスで行きます。 = I go by bus.
E: 東京に住んでいます。 = I live in Tokyo.
M: Using で for destinations.
M: Using に for place of action: 会社にはたらきます is wrong.
M: Putting the verb in the middle.
X: mcq 学校___行きます。 ? で | *に | を | が
X: fill 会社___はたらきます。 => で
X: mcq "I go by bus." ? バスに行きます | *バスで行きます | バスを行きます | バスが行きます
X: type I take the train => 電車に乗ります
## reflexive | reflexive | Time & daily routine | A1
S: Telling the time uses 時 (hour) and 分 (minute). Add に to say "at".
B: **一時, 二時, 三時, 四時 (よじ), 七時 (しちじ), 九時 (くじ)**. Minutes: **五分 (ごふん), 十分 (じゅっぷん)**. Half: **半**. 7:30 is **七時半**. **七時におきます** (I get up at seven). Daily words: **朝, 昼, 夜, 毎日**.
T: Part | Example
T: hour | 七時
T: minute | 十分
T: half | 七時半
T: at | 七時に
E: 七時におきます。 = I get up at seven.
E: 八時に会社に行きます。 = I go to the office at eight.
E: 十二時半に昼ごはんを食べます。 = I eat lunch at 12:30.
E: 十一時にねます。 = I go to bed at eleven.
M: Forgetting に after a time.
M: Saying しじ: four o'clock is よじ.
M: Putting the time at the end of the sentence.
X: mcq 七時___ おきます。 ? を | が | *に | は
X: fill 七時___ (half past) => 半
X: mcq 4:00 is ___ ? しじ | *よじ | よんじ | しいじ
X: type I get up => おきます
## adjectives | adjectives | Adjectives | A1
S: Japanese has i-adjectives (ending in い) and na-adjectives (use な before nouns).
B: I-adjectives: **大きい家** (a big house), predicate **家は大きいです**. Na-adjectives: **きれいな花** (a pretty flower), predicate **花はきれいです**. Intensify with **とても**.
T: Type | Example
T: i-adj | 大きい
T: na-adj | きれい
T: before noun | きれいな花
E: 家は大きいです。 = The house is big.
E: きれいな花ですね。 = It's a pretty flower.
E: とてもおいしいです。 = It's very tasty.
E: これは新しい車です。 = This is a new car.
M: Adding な to i-adjectives: 大きいな is wrong.
M: Forgetting な with na-adjectives before a noun.
M: Treating きれい as an i-adjective (it is a na-adjective).
X: mcq ___ 花です。 (pretty) ? きれい | *きれいな | きれいの | きれくい
X: fill とても___です。 (tasty) => おいしい
X: mcq "a new car" ? 新しいな車 | *新しい車 | 新しの車 | 新しく車
X: type big => 大きい
## like-verb | like-verb | Liking: すき & きらい | A1
S: すき (like) and きらい (dislike) are na-adjectives, and the thing liked takes が.
B: **コーヒーがすきです** (I like coffee). **さかながきらいです** (I dislike fish). Doing: **本を読むのがすきです** (I like reading). Strength: **だいすき** (love), **あまりすきではありません** (don't really like).
T: Pattern | Meaning
T: Nが すきです | I like N
T: Nが きらいです | I dislike N
T: Nが だいすきです | I love N
E: コーヒーがすきです。 = I like coffee.
E: 音楽がすきです。 = I like music.
E: 本を読むのがすきです。 = I like reading.
E: さかながきらいです。 = I dislike fish.
M: Using を with すき: use が.
M: Using すきます: すき is not a verb.
M: Forgetting です.
X: mcq コーヒー___すきです。 ? を | *が | に | で
X: fill 音楽が___です。 (like) => すき
X: mcq "I dislike fish." ? さかなをすきです | *さかながきらいです | さかなにきらいです | さかなでおいしい
X: type I love it => だいすきです
## irregular-present | irregular-present | Te-form & useful verbs | A2
S: The te-form is used to connect verbs, make requests and describe ongoing actions.
B: **Group 2**: drop る, add **て**: **食べて, 見て**. **Group 1** (by ending): **く → いて** (書いて), **ぐ → いで**, **む/ぶ/ぬ → んで** (飲んで), **る/う/つ → って** (行って → 行って; 帰って), **す → して** (話して). Irregular: **して, きて**.
T: Dictionary | Te-form
T: 食べる | 食べて
T: 飲む | 飲んで
T: 書く | 書いて
T: 話す | 話して
T: 行く | 行って
E: ゆっくり話してください。 = Please speak slowly.
E: 本を読んでいます。 = I'm reading a book.
E: 食べて、ねます。 = I eat and then sleep.
E: ちょっと待ってください。 = Please wait a moment.
M: Forgetting the sound change: のむて is wrong.
M: Using 行いて for 行く: it's 行って.
M: Using the te-form without ください for requests.
X: mcq Te-form of 飲む: ? 飲みて | *飲んで | 飲って | 飲いて
X: fill ちょっと待っ___ください。 => て
X: mcq Te-form of 食べる: ? 食べんで | 食べって | *食べて | 食べいて
X: type te-form of する => して
## modals | modals | Can & must | A2
S: Ability uses the potential form or ことができます; obligation uses なければなりません; permission uses てもいいです.
B: **Verb dictionary + ことができます** (can): **話すことができます**. **Te-form + もいいです** (may): **入ってもいいですか。** **ない-form + ければなりません** (must): **行かなければなりません**. Prohibition: **てはいけません**.
T: Pattern | Meaning
T: ことができます | can
T: てもいいです | may
T: なければなりません | must
T: てはいけません | must not
E: 日本語を話すことができます。 = I can speak Japanese.
E: 入ってもいいですか。 = May I come in?
E: 今、行かなければなりません。 = I must go now.
E: ここでたばこをすってはいけません。 = You must not smoke here.
M: Using the te-form with ことができます.
M: Forgetting the か in a polite question.
M: Mixing up もいい (may) with はいけない (must not).
X: mcq 日本語を話す___ができます。 ? の | *こと | もの | ため
X: fill 入っ___いいですか。 (may I) => ても
X: mcq "I must go." ? 行ってもいいです | *行かなければなりません | 行くことができません | 行きたくないです
X: type must not (te-form pattern) => てはいけません
## comparatives | comparatives | Comparing | A2
S: Compare with より (than) and のほうが (the more).
B: **A は B より adjective です**: **電車はバスよりはやいです** (the train is faster than the bus). **A のほうが** adj: **電車のほうがはやいです**. Superlative: **いちばん**: **これがいちばんたかいです**. Question: **AとBとどちらが**.
T: Pattern | Meaning
T: AはBより adj | A is more adj than B
T: Aのほうが adj | A is more adj
T: いちばん adj | the most adj
E: 電車はバスよりはやいです。 = The train is faster than the bus.
E: これはあれより大きいです。 = This is bigger than that.
E: これがいちばんたかいです。 = This is the most expensive.
E: 夏は冬よりあついです。 = Summer is hotter than winter.
M: Putting より after the first item.
M: Forgetting です.
M: Using いちばん with より.
X: mcq 電車はバス___はやいです。 ? の | *より | に | を
X: fill これが___たかいです。 (most) => いちばん
X: mcq "The train is faster than the bus." ? バスは電車よりはやいです | *電車はバスよりはやいです | 電車はバスにはやいです | 電車がバスをはやいです
X: type than => より
## past-perfect | past-perfect | Past tense | A2
S: The polite past is ました (verbs) and でした (nouns / na-adjectives); i-adjectives use かったです.
B: **食べます → 食べました**, **見ます → 見ました**. Negative past: **食べませんでした**. Nouns: **学生でした**. I-adjectives: **おいしい → おいしかったです**, **いい → よかったです**.
T: Type | Past
T: verb | ました
T: verb negative | ませんでした
T: noun | でした
T: i-adjective | かったです
E: 昨日、映画を見ました。 = I watched a film yesterday.
E: ひるごはんを食べました。 = I ate lunch.
E: 昨日は雨でした。 = Yesterday it was rainy.
E: 天気がよかったです。 = The weather was good.
M: Using でした with i-adjectives: use かったです.
M: Using いかったです: it's よかったです.
M: Using the present with 昨日.
X: mcq 昨日、映画を___。 ? 見ます | *見ました | 見ません | 見て
X: fill 天気がよ___です。 => かった
X: mcq "I ate lunch." ? ひるごはんを食べます | *ひるごはんを食べました | ひるごはんを食べません | ひるごはんを食べたいです
X: type was (noun) => でした
## past-2 | past-2 | Past stories | A2
S: Link events with て (and then), から (after / because), and ので (because).
B: **Te-form chain**: **食べて、行きました** (I ate and went). **Verb te-form + から** (after): **食べてから行きます**. **Reason + ので/から**: **さむいので家にいました** (it was cold so I stayed home). Sequence words: **まず, それから, さいごに**.
T: Pattern | Meaning
T: Vて、… | and then
T: Vてから | after V-ing
T: ので | because
E: ひるごはんを食べて、行きました。 = I ate lunch and left.
E: つかれたので、早くねました。 = I was tired so I slept early.
E: 雨が降ったので、家にいました。 = It rained so I stayed home.
E: まず映画を見て、それから買い物をしました。 = First I watched a film, then went shopping.
M: Using ので with a plain-form omission.
M: Putting the past ending on every clause: only the last needs it.
M: Using から with a noun without の/な.
X: mcq つかれた___、早くねました。 ? で | *ので | を | は
X: fill 食べ___、行きました。 (and then) => て
X: mcq "After eating" ? 食べるから | *食べてから | 食べたので | 食べるて
X: type because (polite) => ので
## future-near | future-near | Future & plans | A2
S: Japanese has no future tense: the polite present ます covers the future. Add time words.
B: **明日行きます** (I'll go tomorrow). **来週、東京に行くつもりです** (I plan to go to Tokyo next week). **Volitional ましょう** (let's): **行きましょう**. Probably: **たぶん〜でしょう**.
T: Pattern | Meaning
T: ます + time word | will
T: つもりです | plan to
T: ましょう | let's
E: 明日、東京に行きます。 = I'll go to Tokyo tomorrow.
E: 来週、友達に会うつもりです。 = I plan to meet a friend next week.
E: いっしょに行きましょう。 = Let's go together.
E: たぶん、雨が降るでしょう。 = It will probably rain.
M: Looking for a future ending: use ます + time.
M: Using ましょう as a statement.
M: Forgetting つもり with the dictionary form.
X: mcq 明日、東京に___。 ? 行きました | *行きます | 行きません | 行って
X: fill いっしょに行き___。 (let's) => ましょう
X: mcq "I plan to go." ? *行くつもりです | 行きますつもり | 行ったつもりです | 行ってつもり
X: type tomorrow => 明日
## object-pronouns | object-pronouns | Giving & receiving | A2
S: Recipients take に. Giving and receiving verbs: あげます, もらいます, くれます.
B: **友達にプレゼントをあげます** (I give my friend a present). **友達にプレゼントをもらいます** (I receive a present from a friend). **友達がくれました** (a friend gave me). Use に for the recipient/source and を for the thing.
T: Verb | Meaning
T: あげます | give (to others)
T: もらいます | receive
T: くれます | give (to me)
E: 友達にプレゼントをあげます。 = I give a present to a friend.
E: 母にもらいました。 = I received it from my mother.
E: 先生が本をくれました。 = The teacher gave me a book.
E: 父にでんわします。 = I call my father.
M: Using を for the recipient.
M: Mixing up あげる and くれる.
M: Forgetting に after the person.
X: mcq 友達___プレゼントをあげます。 ? を | *に | は | で
X: fill 先生が本を___。 (gave me) => くれました
X: mcq "I received it from mum." ? 母にあげました | *母にもらいました | 母をもらいます | 母がでんわ
X: type to (recipient) => に
## connectors-opinions | connectors-opinions | Joining ideas & opinions | A2
S: Use が/けど (but), から/ので (because), そして (and) and と思います (I think) to link ideas and give opinions.
B: **Plain form + と思います**: **いいと思います** (I think it's good). **Opinion + でも**: **でも、むずかしいです。** **〜と思いません**. Agree: **そう思います**. Disagree: **わたしはちがうと思います**.
T: Connector | Meaning
T: が / けど | but
T: から / ので | because
T: そして | and then
T: と思います | I think
E: いいと思います。 = I think it's good.
E: たかいですが、おいしいです。 = It's expensive but tasty.
E: そう思います。 = I think so.
E: わたしはちがうと思います。 = I think differently.
M: Using polite form before と思います in writing.
M: Using は instead of と.
M: Confusing が (but) with the subject particle.
X: mcq いい___ 思います。 ? を | *と | が | に
X: fill たかいです___、おいしいです。 (but) => が
X: mcq "I think so." ? *そう思います | そうです思います | そう思いません | そうと
X: type I think (verb) => 思います
## cases | cases | Particle overview | A2
S: Japanese marks roles with particles: は, が, を, に, へ, で, と, の, も, から, まで.
B: **は** topic · **が** subject · **を** object · **に** target/time/location · **で** place of action/means · **と** with/and · **の** of · **も** also · **から** from · **まで** until. The verb always comes last.
T: Particle | Role
T: を | object
T: に | to / at
T: で | at / by
T: と | with
T: から | from
E: 本を読みます。 = I read a book.
E: 友達と学校に行きます。 = I go to school with a friend.
E: わたしも学生です。 = I'm a student too.
E: 九時から五時まではたらきます。 = I work from nine to five.
M: Using を with movement verbs instead of に.
M: Mixing に and で.
M: Putting particles before the word.
X: mcq 本___ 読みます。 ? に | *を | と | で
X: fill 友達___行きます。 (with) => と
X: mcq "I go by train." ? 電車に行きます | *電車で行きます | 電車を行きます | 電車と行きます
X: type also => も
`;
