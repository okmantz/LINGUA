export const ZH_GRAMMAR = `
## pronouns | pronouns | Pronouns & "you" | A1
S: Chinese pronouns never change form. Add 们 for plurals. Use 您 for polite "you".
B: **我** (I), **你** (you), **他/她** (he/she, both pronounced tā), **我们** (we), **你们** (you all), **他们** (they). The polite form is **您**, used with elders and in service settings. Pronouns do not change as subject or object.
T: Person | Singular | Plural
T: 1st | 我 | 我们
T: 2nd | 你 / 您 | 你们
T: 3rd | 他 / 她 | 他们 / 她们
E: 我是学生。 = I am a student.
E: 你是老师吗？ = Are you a teacher?
E: 您好，王老师。 = Hello, Teacher Wang. (polite)
E: 我们是朋友。 = We are friends.
M: Using 你 with an elder or customer. Use 您.
M: Adding 们 to a singular pronoun.
M: Changing the pronoun for the object: 我 stays 我.
X: mcq To address your teacher politely: ? 你 | *您 | 他 | 我
X: fill ___是学生。 (I) => 我
X: mcq Which means "we"? ? 我 | 他 | *我们 | 你
X: type they => 他们
## be-verb | be-verb | "To be": 是 | A1
S: 是 links two nouns. It is NOT used before adjectives: use 很 instead.
B: **我是学生。** (I am a student.) Negative: **不是**: **我不是老师。** For adjectives use 很: **我很好。** For location use 在: **我在家。** Question: add **吗**: **你是学生吗？**
T: Form | Example
T: noun | 我是学生
T: negative | 我不是老师
T: adjective | 我很好
T: location | 我在家
E: 我是学生。 = I'm a student.
E: 他不是医生。 = He isn't a doctor.
E: 我很忙。 = I'm busy.
E: 我在家。 = I'm at home.
M: Saying "我是忙": use 我很忙.
M: Using 是 for location: use 在.
M: Forgetting 吗 in a yes/no question.
X: mcq 我___学生。 ? 很 | *是 | 在 | 有
X: fill 他___医生。 (is not) => 不是
X: mcq "I'm busy." ? 我是忙 | *我很忙 | 我在忙 | 我有忙
X: type I am at home => 我在家
## articles-gender | articles-gender | Measure words | A1
S: Chinese has no articles, gender or plurals. Numbers and "this/that" take a measure word before nouns.
B: **一个人** (one person), **三本书** (three books), **两杯茶** (two cups of tea), **这个房子** (this house). The most common measure word is **个**. Others: **本** (books), **杯** (cups), **张** (flat things), **只** (small animals), **辆** (vehicles). Use **两** instead of 二 before measure words.
T: Measure word | For
T: 个 | people, general
T: 本 | books
T: 杯 | cups / glasses
T: 张 | flat things, tickets
T: 辆 | vehicles
E: 我有一个哥哥。 = I have an older brother.
E: 我有三本书。 = I have three books.
E: 请给我两杯茶。 = Two cups of tea, please.
E: 这个房子很大。 = This house is big.
M: Saying 三书: you need a measure word, 三本书.
M: Saying 二个: use 两个.
M: Adding 们 to nouns for plural: 朋友们 is optional for people only.
X: mcq 我有三___书。 ? 个 | *本 | 杯 | 张
X: fill 我有两___孩子。 (measure word) => 个
X: mcq "two cups of tea" ? 二茶杯 | *两杯茶 | 二个茶 | 两茶
X: type measure word for books => 本
## present-regular | present-regular | Verbs & word order | A1
S: Chinese verbs never change form. Word order is Subject – Time – Place – Verb – Object.
B: **我喝茶。** (I drink tea.) The same form means "I drink / am drinking". Add time and place before the verb: **我每天在家学习中文。** (I study Chinese at home every day.) Negative: **不**: **我不喝咖啡。**
T: Pattern | Example
T: S V O | 我喝茶
T: S Time Place V O | 我每天在家学习中文
T: negative | 我不喝咖啡
E: 我喝茶。 = I drink tea.
E: 她学习中文。 = She studies Chinese.
E: 我们在公司工作。 = We work at the company.
E: 我每天看书。 = I read every day.
M: Conjugating the verb for person: 喝 is the same for everyone.
M: Putting the place after the verb: 我在家学习, not 我学习在家.
M: Using 没 with the present: use 不.
X: mcq 我___茶。 ? 是 | *喝 | 在 | 有
X: fill 我们在公司___。 (work) => 工作
X: mcq "I read every day." ? 我看书每天 | *我每天看书 | 每天我看书的 | 我看每天书
X: type I study => 我学习
## have-verb | have-verb | Having: 有 | A1
S: 有 means "to have" and "there is". Its negative is 没有 (never 不有).
B: **我有时间。** (I have time.) **我没有钱。** (I have no money.) **桌子上有一本书。** (There's a book on the table.) Question: **你有……吗？** or **你有没有……？**
T: Pattern | Example
T: affirmative | 我有时间
T: negative | 我没有钱
T: there is | 桌子上有书
E: 我有一个哥哥。 = I have an older brother.
E: 我没有钱。 = I have no money.
E: 你有手机吗？ = Do you have a phone?
E: 桌子上有一本书。 = There's a book on the table.
M: Saying 不有: use 没有.
M: Forgetting the measure word: 我有哥哥 is fine but 我有一个哥哥 is better.
M: Using 是 for possession.
X: mcq 我___钱。 (no) ? 不有 | *没有 | 不是 | 没是
X: fill 我___时间。 (have) => 有
X: mcq "Do you have a phone?" ? 你有手机？ | *你有手机吗？ | 你是手机吗？ | 你没手机？
X: type don't have => 没有
## negation | negation | Negation: 不 and 没 | A1
S: 不 negates habits, the present and the future; 没(有) negates the past and 有.
B: **我不去** (I don't / won't go). **我没去** (I didn't go). **我不是学生** (I'm not a student). **我没有钱** (I have no money). Tone change: **不** becomes **bú** before a fourth tone: **不是 bú shì**.
T: Use | Negator
T: present / habit | 不
T: future | 不
T: past | 没
T: have | 没有
E: 我不喝咖啡。 = I don't drink coffee.
E: 他昨天没去。 = He didn't go yesterday.
E: 我不是学生。 = I'm not a student.
E: 我没有时间。 = I have no time.
M: Using 不 for past events: 昨天我不去 is wrong.
M: Using 没 with 是.
M: Forgetting the tone change: 不是 is bú shì.
X: mcq 他昨天___去。 ? 不 | *没 | 没有 | 非
X: fill 我___喝咖啡。 (don't) => 不
X: mcq "I'm not a student." ? 我没是学生 | *我不是学生 | 我没学生 | 我不有学生
X: type didn't go => 没去
## questions | questions | Asking questions | A1
S: Chinese questions keep statement word order. Add 吗, use question words in place, or use the verb-not-verb pattern.
B: **你是学生吗？** (吗 turns a statement into a question). **你叫什么名字？** (question words stay in place). **你去不去？** (verb-not-verb: do you go or not?). **这个多少钱？** (How much is this?)
T: What | Word
T: what | 什么
T: where | 哪儿
T: when | 什么时候
T: why | 为什么
T: who | 谁
T: how much | 多少钱
E: 你是学生吗？ = Are you a student?
E: 这是什么？ = What is this?
E: 洗手间在哪儿？ = Where is the toilet?
E: 这个多少钱？ = How much is this?
M: Moving the question word to the front.
M: Adding 吗 to a wh- question.
M: Using 吗 and verb-not-verb together.
X: mcq 你是学生___？ ? 什么 | *吗 | 哪 | 呢
X: fill 这是___？ (what) => 什么
X: mcq "Where is the toilet?" ? 哪儿洗手间？ | *洗手间在哪儿？ | 洗手间什么？ | 洗手间吗？
X: type why => 为什么
## want-verb | want-verb | Wanting: 想 & 要 | A1
S: 想 + verb means "want to / would like to"; 要 + noun is "want / will have".
B: **我想喝咖啡。** (I'd like to drink coffee.) **我要一杯咖啡。** (I want / I'll have a coffee.) **我想去中国。** (I want to go to China.) Polite ordering: **我想要……** or **请给我……**. Negative: **不想**.
T: Pattern | Meaning
T: 想 + verb | would like to
T: 要 + noun | want / will have
T: 请给我 + noun | please give me
E: 我想喝咖啡。 = I'd like to drink coffee.
E: 我要一杯茶。 = I'll have a cup of tea.
E: 我想回家。 = I want to go home.
E: 请给我水。 = Please give me water.
M: Using 要 for blunt demands with strangers.
M: Using 想 with a noun without a verb: 我想咖啡 sounds incomplete.
M: Using 不要 (don't) for "I don't want": use 不想.
X: mcq 我___喝咖啡。 ? 是 | *想 | 有 | 在
X: fill 我要一___茶。 (cup) => 杯
X: mcq "Please give me water." ? 给我请水 | *请给我水 | 请水给我 | 水请给我
X: type I want to go home => 我想回家
## polite-requests | polite-requests | Polite requests | A1
S: Soften requests with 请, 能, 可以 and 麻烦你.
B: **请坐。** (Please sit.) **请问……** (May I ask…) **可以……吗？** (May I…?) **能……吗？** (Can you…?) **麻烦你……** (Could I trouble you to…). Thanks: **谢谢**; reply: **不客气**.
T: Request | Say
T: ordering | 请给我一杯咖啡
T: asking | 请问，洗手间在哪儿？
T: permission | 我可以坐这里吗？
T: slow | 请说慢一点儿
E: 请给我水。 = Please give me water.
E: 请问，洗手间在哪儿？ = Excuse me, where is the toilet?
E: 我可以坐这里吗？ = May I sit here?
E: 请说慢一点儿。 = Please speak a bit slower.
M: Omitting 请.
M: Using 你 for strangers who are much older: use 您.
M: Using 要 to order: 请给我 is nicer.
X: mcq To get attention: ? *请问 | 你好吗 | 再见 | 不是
X: fill ___说慢一点儿。 (please) => 请
X: mcq "May I sit here?" ? 我坐这里吗？ | *我可以坐这里吗？ | 坐这里我吗？ | 我吗坐这里？
X: type excuse me (may I ask) => 请问
## possessives | possessives | Possession with 的 | A1
S: 的 links a possessor and a possessed noun, like "'s". It is dropped with close family.
B: **我的书** (my book), **老师的车** (the teacher's car), **我朋友的家** (my friend's home). With family and close relations, 的 is often dropped: **我妈妈**, **我家**. Pronoun + 的: **我的, 你的, 他的, 我们的**.
T: Phrase | Meaning
T: 我的书 | my book
T: 老师的车 | the teacher's car
T: 我妈妈 | my mum
E: 这是我的书。 = This is my book.
E: 这是王老师的车。 = This is Teacher Wang's car.
E: 我妈妈在家。 = My mum is at home.
E: 那是我们的房子。 = That is our house.
M: Putting the possessed noun first.
M: Using 的 after adjectives like 很: 很的好 is wrong.
M: Dropping 的 with non-family nouns: 我书 is incorrect.
X: mcq 这是我___书。 ? 了 | *的 | 在 | 是
X: fill 这是老师___车。 => 的
X: mcq "my mum" ? 我的妈妈在 | *我妈妈 | 妈妈的我 | 我是妈妈
X: type of / 's (particle) => 的
## go-places | go-places | Going places | A1
S: Use 去 (go) and 来 (come) with a place directly. 在 marks where something is or happens.
B: **我去学校。** (I go to school.) **我在公司工作。** (I work at the company.) **我坐地铁去。** (I go by subway.) **我从北京来。** (I come from Beijing.) No preposition is needed after 去/到.
T: Word | Use
T: 去 | go to
T: 在 | at / in (location)
T: 从 | from
T: 坐 | take (transport)
E: 我去学校。 = I go to school.
E: 我在公司工作。 = I work at the company.
E: 我坐地铁去。 = I go by subway.
E: 我从北京来。 = I come from Beijing.
M: Adding a preposition after 去: 去到学校 is wrong here.
M: Putting 在 after the verb.
M: Using 是 for location.
X: mcq 我___学校。 (go to) ? 来 | *去 | 在 | 从
X: fill 我___公司工作。 (at) => 在
X: mcq "I go by subway." ? 我地铁去 | *我坐地铁去 | 我在地铁去 | 我去地铁坐
X: type from => 从
## reflexive | reflexive | Time & daily routine | A1
S: Time words go before the verb. Clock times use 点 and 分; "at" is not needed.
B: **一点, 两点, 三点, 七点** (2 o'clock is 两点). **七点半** (7:30), **七点十五分** (7:15). **我七点起床** (I get up at seven). Day words: **早上, 中午, 晚上, 每天**.
T: Part | Example
T: hour | 七点
T: half | 七点半
T: minutes | 七点十五分
T: day word | 每天
E: 我七点起床。 = I get up at seven.
E: 我八点去公司。 = I go to the office at eight.
E: 我十二点半吃午饭。 = I eat lunch at 12:30.
E: 我晚上十一点睡觉。 = I go to bed at eleven at night.
M: Putting the time word after the verb.
M: Saying 二点: use 两点 for 2 o'clock.
M: Using 在 before clock times.
X: mcq 我七点___。 ? 床起 | *起床 | 起在床 | 在起床
X: fill 我七点___起床。 (half past seven) => 半
X: mcq 2:00 is ___ ? 二点 | *两点 | 二时 | 两分
X: type every day => 每天
## adjectives | adjectives | Adjectives | A1
S: Chinese adjectives act like verbs: put 很 before them in a basic statement and don't use 是.
B: **我很忙。** (I'm busy.) **这个房子很大。** (This house is big.) Before nouns use 的: **大房子 / 很大的房子**. Negative: **不**: **不忙**. Intensify with **非常, 太, 很**. Comparison: **比**.
T: Pattern | Example
T: S + 很 + adj | 我很忙
T: negative | 我不忙
T: adj + 的 + noun | 漂亮的花
E: 我很忙。 = I'm busy.
E: 这个房子很大。 = This house is big.
E: 汤非常好吃。 = The soup is very tasty.
E: 这是一朵漂亮的花。 = This is a pretty flower.
M: Using 是 with adjectives: 我是忙 is wrong.
M: Leaving out 很: 我忙 sounds like a contrast.
M: Putting 很 in a negation: 不很 is unnatural, use 不太.
X: mcq 这个房子___大。 ? 是 | *很 | 有 | 在
X: fill 汤___好吃。 (extremely) => 非常
X: mcq "a pretty flower" ? 花漂亮的 | *漂亮的花 | 的漂亮花 | 花是漂亮
X: type not busy => 不忙
## like-verb | like-verb | Liking: 喜欢 | A1
S: 喜欢 (like) and 爱 (love) are followed directly by a noun or a verb.
B: **我喜欢咖啡。** (I like coffee.) **我喜欢看书。** (I like reading.) **我不喜欢鱼。** (I don't like fish.) Strength: **很喜欢, 特别喜欢, 爱**. Ask: **你喜欢什么？**
T: Pattern | Example
T: 喜欢 + noun | 我喜欢咖啡
T: 喜欢 + verb | 我喜欢看书
T: negative | 我不喜欢鱼
E: 我喜欢咖啡。 = I like coffee.
E: 她喜欢音乐。 = She likes music.
E: 我喜欢看书。 = I like reading.
E: 我不喜欢鱼。 = I don't like fish.
M: Adding 是 or 的 between 喜欢 and the object.
M: Using 爱 casually: 爱 is stronger than 喜欢.
M: Using 没 for 喜欢: use 不.
X: mcq 我___咖啡。 ? 是 | *喜欢 | 有 | 在
X: fill 我不___鱼。 => 喜欢
X: mcq "I like reading." ? 我喜欢书读 | *我喜欢看书 | 我书喜欢看 | 我看喜欢书
X: type I love => 我爱
## irregular-present | irregular-present | Aspect: 了, 过, 着 | A2
S: Chinese marks aspect with particles rather than verb tenses: 了 (completed), 过 (has experienced), 着 (ongoing state), 在 (in progress).
B: **我吃了饭。** (I ate / have eaten.) **我去过中国。** (I have been to China.) **门开着。** (The door is open.) **我在看电影。** (I'm watching a film.)
T: Particle | Meaning
T: 了 | completed
T: 过 | experienced
T: 着 | state continues
T: 在 | in progress
E: 我吃了饭。 = I've eaten.
E: 我去过北京。 = I've been to Beijing.
E: 门开着。 = The door is open.
E: 我在看电影。 = I'm watching a film.
M: Using 了 with habitual events: 我每天吃了饭 is wrong.
M: Using 过 and 了 interchangeably.
M: Forgetting that the negation of 了 is 没.
X: mcq 我去___北京。 (have been) ? 了 | *过 | 着 | 在
X: fill 我吃___饭。 (ate) => 了
X: mcq "I'm watching a film." ? 我看电影了 | *我在看电影 | 我看过电影着 | 我着看电影
X: type in progress (adverb) => 在
## modals | modals | Can, must, may | A2
S: Modals come before the verb: 会 (can, learned), 能 (can, able), 可以 (may), 应该 (should), 必须 (must).
B: **我会说中文。** (I can speak Chinese.) **我能来。** (I can come.) **我可以坐这里吗？** (May I sit here?) **我必须走了。** (I must go.) Negatives: **不会, 不能, 不可以, 不用** (needn't).
T: Modal | Meaning
T: 会 | can (learned) / will
T: 能 | can (able)
T: 可以 | may / can
T: 应该 | should
T: 必须 | must
E: 我会说中文。 = I can speak Chinese.
E: 明天我能来。 = I can come tomorrow.
E: 这里不可以抽烟。 = You can't smoke here.
E: 我必须走了。 = I must go now.
M: Using 会 for permission: use 可以.
M: Putting the modal after the verb.
M: Mixing 不用 and 不要.
X: mcq 我___说中文。 (can, learned) ? 能 | *会 | 要 | 有
X: fill 这里不___抽烟。 (may) => 可以
X: mcq "I must go." ? 我走必须 | *我必须走 | 必须我走 | 我走了必须
X: type should => 应该
## comparatives | comparatives | Comparing | A2
S: Compare with 比 (than). Don't use 很 in the comparison.
B: **A 比 B + adjective**: **火车比公共汽车快。** (The train is faster than the bus.) Add degree: **快得多 / 快一点儿**. Equal: **A 跟 B 一样**. Superlative: **最**: **最贵**. Negative: **没有**: **公共汽车没有火车快。**
T: Pattern | Meaning
T: A 比 B adj | A is more adj than B
T: A 跟 B 一样 | A is the same as B
T: 最 + adj | the most
E: 火车比公共汽车快。 = The train is faster than the bus.
E: 这个比那个大。 = This is bigger than that.
E: 这个最贵。 = This is the most expensive.
E: 夏天比冬天热。 = Summer is hotter than winter.
M: Using 很 with 比: 比很快 is wrong.
M: Putting 比 after the adjective.
M: Negating with 不比 vs 没有: 没有 is the usual form.
X: mcq 火车___公共汽车快。 ? 很 | *比 | 是 | 在
X: fill 这个___贵。 (most) => 最
X: mcq "The train is faster than the bus." ? 公共汽车比火车快 | *火车比公共汽车快 | 火车很比公共汽车快 | 火车快比公共汽车
X: type than => 比
## past-perfect | past-perfect | Past: 了 | A2
S: Use 了 after the verb for completed actions. Add a time word like 昨天 for the past.
B: **昨天我看了一部电影。** (Yesterday I watched a film.) **我吃了午饭。** (I've eaten lunch.) Negative: **没(有)** and drop 了: **我没吃午饭。** Question: **你吃饭了吗？** or **你吃了没有？**
T: Form | Example
T: positive | 我看了电影
T: negative | 我没看电影
T: question | 你吃饭了吗？
E: 昨天我看了一部电影。 = Yesterday I watched a film.
E: 我吃了午饭。 = I've had lunch.
E: 他没来。 = He didn't come.
E: 你吃饭了吗？ = Have you eaten?
M: Keeping 了 in the negative: 我没吃了 is wrong.
M: Putting 了 at the very start.
M: Using 了 for habits: 我每天吃了饭 is wrong.
X: mcq 昨天我看___一部电影。 ? 过 | *了 | 着 | 在
X: fill 他___来。 (didn't come) => 没
X: mcq "Have you eaten?" ? 你吃饭吗？ | *你吃饭了吗？ | 你吃饭没了？ | 你了吃饭吗？
X: type completed particle => 了
## past-2 | past-2 | Past stories | A2
S: Link events with 先……然后……最后……, 因为……所以……, and 的时候 (when).
B: **先吃饭，然后去工作，最后回家。** (First eat, then work, finally go home.) **因为下雨，所以我在家。** (Because it rained, I stayed at home.) **我小时候住在北京。** (When I was little I lived in Beijing.) **以前** (before) and **后来** (afterwards).
T: Pattern | Meaning
T: 先……然后…… | first… then…
T: 因为……所以…… | because… so…
T: ……的时候 | when…
E: 先吃饭，然后去工作。 = First eat, then go to work.
E: 因为下雨，所以我在家。 = Because it rained, I stayed home.
E: 我去北京的时候，天气很好。 = When I went to Beijing, the weather was good.
E: 我先看电影，然后买东西。 = First I watched a film, then went shopping.
M: Using only 因为 or 所以 in English style: Chinese often uses both.
M: Using 了 on every verb in the chain.
M: Putting 的时候 before the clause.
X: mcq ___下雨，所以我在家。 ? 但是 | *因为 | 如果 | 然后
X: fill 先吃饭，___去工作。 (then) => 然后
X: mcq "when I went to Beijing" ? 我去北京时候的 | *我去北京的时候 | 的时候我去北京 | 我去时候的北京
X: type finally => 最后
## future-near | future-near | Future: 会, 要, 打算 | A2
S: Chinese has no future tense: use time words, plus 会, 要, or 打算 to talk about plans.
B: **明天我去北京。** (Tomorrow I go to Beijing.) **我要去北京。** (I'm going to / want to go.) **我打算下周去。** (I plan to go next week.) **明天会下雨。** (It will rain tomorrow.) **我们去吧！** (Let's go!)
T: Pattern | Meaning
T: time word + verb | will
T: 要 + verb | going to
T: 打算 + verb | plan to
T: 会 + verb | will (prediction)
E: 明天我去北京。 = Tomorrow I'm going to Beijing.
E: 我打算下周去。 = I plan to go next week.
E: 明天会下雨。 = It will rain tomorrow.
E: 我们去吧！ = Let's go!
M: Using 将 (formal) in speech.
M: Forgetting the time word.
M: Using 了 for the future.
X: mcq 明天我___去北京。 ? 了 | *要 | 过 | 着
X: fill 我___下周去。 (plan to) => 打算
X: mcq "It will rain tomorrow." ? 明天下雨了 | *明天会下雨 | 明天雨会 | 明天有雨了
X: type let's (particle) => 吧
## object-pronouns | object-pronouns | Giving & asking: 给, 把 | A2
S: Indirect objects follow 给; the 把 structure places the object before the verb to show what happens to it.
B: **我给朋友一份礼物。** (I give my friend a gift.) **我给妈妈打电话。** (I call mum.) **请把门关上。** (Please close the door.) Pronouns don't change: **他看我。 我看他。**
T: Pattern | Meaning
T: 给 + person + thing | give to
T: 给 + person + 打电话 | call someone
T: 把 + object + verb | do something to object
E: 我给朋友一份礼物。 = I give my friend a gift.
E: 我给妈妈打电话。 = I call mum.
E: 请把门关上。 = Please close the door.
E: 他看见我了。 = He saw me.
M: Changing 我 to 我的 for the object.
M: Putting 给 after the verb with a person.
M: Using 把 with verbs of state.
X: mcq 我___妈妈打电话。 ? 在 | *给 | 是 | 有
X: fill 请___门关上。 (BA) => 把
X: mcq "I give my friend a gift." ? *我给朋友一份礼物 | 我朋友给一份礼物 | 我给一份礼物朋友 | 我礼物给朋友
X: type to / for (verb) => 给
## connectors-opinions | connectors-opinions | Joining ideas & opinions | A2
S: Use 和, 但是, 因为, 所以, 如果 to join ideas and 我认为/我觉得 to give opinions.
B: **我觉得……** (I feel / think…), **我认为……** (I consider…), **在我看来……** (in my view…). Agree: **我同意**; disagree: **我不同意**. Contrast: **但是 / 可是**. Condition: **如果……就……**.
T: Connector | Meaning
T: 和 | and
T: 但是 | but
T: 因为 / 所以 | because / so
T: 如果……就…… | if… then…
E: 我觉得这个很好。 = I think this is good.
E: 很贵，但是很好吃。 = It's expensive, but tasty.
E: 如果下雨，我就在家。 = If it rains, I'll stay home.
E: 我同意你的看法。 = I agree with your view.
M: Using 和 to join sentences: only for nouns.
M: Forgetting 就 in 如果……就…….
M: Using 但是 and 可是 together.
X: mcq 很贵，___很好吃。 ? 所以 | *但是 | 因为 | 如果
X: fill 如果下雨，我___在家。 => 就
X: mcq "I think so." ? 我觉得 | *我也这么觉得 | 我觉得不 | 我认为在
X: type but => 但是
## cases | cases | Particle overview | A2
S: Chinese has no case endings. Word order and a few particles (的, 了, 吗, 吧, 呢) show meaning.
B: **的** possessive/modifier · **了** completed · **吗** question · **吧** suggestion · **呢** "and you?" / continuing · **着** state · **过** experience. Learn each particle with an example sentence.
T: Particle | Use
T: 的 | possessive / modifier
T: 了 | completed
T: 吗 | yes/no question
T: 吧 | suggestion
T: 呢 | and you?
E: 这是我的书。 = This is my book.
E: 我吃了饭。 = I ate.
E: 你好吗？ = How are you?
E: 你呢？ = And you?
M: Using 吗 in a wh- question.
M: Using 吧 for a real question.
M: Dropping 的 in 我的书.
X: mcq 你好___？ ? 了 | *吗 | 的 | 着
X: fill 我们走___。 (let's) => 吧
X: mcq "And you?" ? 你吗？ | *你呢？ | 你了？ | 你的？
X: type possessive particle => 的
`;
