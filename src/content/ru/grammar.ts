export const RU_GRAMMAR = `
## pronouns | pronouns | Pronouns & "you" | A1
S: Russian has an informal ты and a formal/plural вы. Verb endings show the person, but pronouns are used often.
B: The pronouns are **я, ты, он/она/оно, мы, вы, они**. Use **ты** with friends, family and children; use **вы** with strangers, elders, and for more than one person (capitalised **Вы** in formal letters).
B: Russian has no present-tense "to be", so you can say **Я студент** ("I student") with no verb at all.
T: Person | Singular | Plural
T: 1st | я | мы
T: 2nd | ты | вы
T: 3rd | он / она / оно | они
E: Я Анна. = I'm Anna.
E: Ты студент? = Are you a student?
E: Вы врач? = Are you a doctor? (formal)
E: Мы друзья. = We are friends.
M: Using ты with a stranger or your boss. Use вы.
M: Adding a verb for "am/is/are": Russian simply leaves it out.
M: Saying "они" for one person. Formal singular "you" is вы, but verbs agree in the plural.
X: mcq To address your teacher politely, say ___ ? ты | *вы | он | я
X: fill (we) ___ друзья. => Мы
X: mcq Which means "she"? ? он | *она | оно | они
X: type they => они
## be-verb | be-verb | "To be" (no present tense) | A1
S: In the present Russian drops "to be": Он студент. The past and future use быть.
B: Present: no verb. **Он дома** = He is at home. For "there is/are" use **есть**: У меня есть брат. In the past, быть agrees with the subject: **был** (m.), **была** (f.), **было** (n.), **были** (pl.).
B: Future: **буду, будешь, будет, будем, будете, будут** — "Завтра я буду дома."
T: Past | masc. | fem. | neut. | pl.
T: быть | был | была | было | были
E: Я студент. = I am a student.
E: Вчера я был дома. = Yesterday I was at home.
E: Мама была в магазине. = Mum was at the shop.
E: Завтра мы будем дома. = Tomorrow we'll be at home.
M: Writing "Я есть студент" for "I am a student". Drop есть.
M: Using был for a woman: she says была.
M: Forgetting that the verb is dropped only in the present.
X: mcq Вчера она ___ дома. ? был | *была | было | были
X: fill Завтра я ___ дома. => буду
X: mcq "He is a doctor." ? Он есть врач | *Он врач | Он быть врач | Он врачом
X: type We were (m.) => мы были
## articles-gender | articles-gender | Gender & plural | A1
S: Russian has no articles. Nouns are masculine, feminine or neuter, which you can usually read from the ending.
B: Masculine nouns end in a consonant or **-й / -ь**: **стол, музей, день**. Feminine nouns end in **-а / -я** (and some in -ь): **книга, неделя, ночь**. Neuter nouns end in **-о / -е**: **окно, море**.
B: The plural is formed with **-ы / -и** for masculine and feminine (**столы, книги**) and **-а / -я** for neuter (**окна, моря**). Spelling rule: after г, к, х, ж, ч, ш, щ write **-и**, never -ы.
T: Gender | Singular | Plural
T: masc. | стол | столы
T: fem. | книга | книги
T: neut. | окно | окна
E: Стол большой. = The table is big.
E: Книга интересная. = The book is interesting.
E: Окно открыто. = The window is open.
E: Столы новые. = The tables are new.
M: Looking for an article. Russian has none: just say стол.
M: Writing "книгы": after г you must write -и, so книги.
M: Treating мама or папа as feminine/masculine by ending only: папа is masculine.
X: mcq The plural of книга is ___ ? книгы | *книги | книгов | книга
X: fill (neuter) Окно большо___. => е
X: mcq Окно is ___ ? masculine | feminine | *neuter | plural
X: type plural of стол => столы
## present-regular | present-regular | Present tense | A1
S: Russian verbs fall into two conjugations: -ать/-ять verbs (читать) and -ить verbs (говорить). Endings tell the person.
B: First conjugation (**читать**): я чита**ю**, ты чита**ешь**, он чита**ет**, мы чита**ем**, вы чита**ете**, они чита**ют**. Second conjugation (**говорить**): я говор**ю**, ты говор**ишь**, он говор**ит**, мы говор**им**, вы говор**ите**, они говор**ят**.
B: There is one present tense: **Я читаю** means both "I read" and "I am reading".
T: Person | читать | говорить
T: я | читаю | говорю
T: ты | читаешь | говоришь
T: он / она | читает | говорит
T: мы | читаем | говорим
T: вы | читаете | говорите
T: они | читают | говорят
E: Я читаю книгу. = I'm reading a book.
E: Она работает в офисе. = She works in an office.
E: Мы говорим по-русски. = We speak Russian.
E: Они слушают музыку. = They listen to music.
M: Using the infinitive: "Я работать" should be я работаю.
M: Mixing the conjugations: "они говорют" should be говорят.
M: Looking for a separate "-ing" form: there is none.
X: mcq Я ___ книгу. ? читать | *читаю | читает | читаешь
X: fill Мы ___ по-русски. (говорить) => говорим
X: mcq Они ___ музыку. (слушать) ? слушаете | слушаем | *слушают | слушает
X: type he works => он работает
## have-verb | have-verb | Having: у меня есть | A1
S: Russian has no verb "to have" for possession. You say "at me there is": у меня есть.
B: Use **у + genitive pronoun + есть + thing**: **У меня есть брат** (I have a brother). Pronouns in the genitive: **меня, тебя, него, неё, нас, вас, них**. In casual speech есть is often dropped: **У меня брат**.
T: Person | у + genitive
T: я | у меня
T: ты | у тебя
T: он | у него
T: она | у неё
T: мы | у нас
T: вы | у вас
T: они | у них
E: У меня есть сестра. = I have a sister.
E: У тебя есть телефон? = Do you have a phone?
E: У неё есть время. = She has time.
E: У нас есть вопрос. = We have a question.
M: Saying "Я имею брата": possible but sounds bookish. Use у меня есть.
M: Using nominative: "У я есть" should be у меня есть.
M: Adding есть to a person-state: "У меня есть голова болит" — don't.
X: mcq (I have a phone.) ___ есть телефон. ? Я | *У меня | Мне | Меня
X: fill У ___ есть время. (her) => неё
X: mcq "Do you have a car?" ? У ты есть машина? | *У тебя есть машина? | Ты имеешь машина? | Тебя машина?
X: type at us there is => у нас есть
## negation | negation | Saying "no" | A1
S: Put не before the word you negate. "There is not" is нет + genitive.
B: **Я не знаю** (I don't know). Never double the verb: just add **не**. To say you don't have something use **у меня нет + genitive**: **У меня нет времени.** Compound negatives take не as well: **Я ничего не знаю** (I know nothing).
T: Positive | Negative
T: Я работаю. | Я не работаю.
T: У меня есть время. | У меня нет времени.
T: Я знаю. | Я ничего не знаю.
E: Я не знаю. = I don't know.
E: У меня нет брата. = I don't have a brother.
E: Он не работает сегодня. = He isn't working today.
E: Здесь никого нет. = Nobody is here.
M: Forgetting не with ничего / никогда: Я ничего знаю is wrong; Я ничего не знаю.
M: Keeping nominative after нет: "У меня нет время" should be времени.
M: Putting не after the verb.
X: mcq Я ___ знаю. ? нет | *не | ни | без
X: fill У меня ___ времени. => нет
X: mcq "Nobody is here." ? Здесь никто есть | *Здесь никого нет | Здесь нет никто | Здесь не есть
X: type I don't work => я не работаю
## questions | questions | Asking questions | A1
S: A statement becomes a yes/no question with rising intonation; wh- questions use a question word.
B: Yes/no: **Ты студент?** (intonation peaks on the key word) or with **разве/ли** in writing. Wh- words: **что, кто, где, куда, когда, как, почему, сколько, какой**. Keep the question word first: **Где ты работаешь?**
T: What | Word
T: what | что
T: who | кто
T: where | где
T: where to | куда
T: when | когда
T: why | почему
T: how much | сколько
E: Что это? = What is this?
E: Где ты живёшь? = Where do you live?
E: Когда урок? = When is the lesson?
E: Почему ты здесь? = Why are you here?
M: Changing word order to make a question. Use intonation.
M: Using где for movement: Куда ты идёшь? not Где ты идёшь?
M: Forgetting that "какой" agrees with the noun: какая книга, какой стол.
X: mcq ___ ты живёшь? (where) ? Куда | *Где | Когда | Почему
X: fill ___ ты идёшь? (where to) => Куда
X: mcq "How much is it?" ? Что это стоит? | *Сколько это стоит? | Как это стоит? | Кто это?
X: type why => почему
## want-verb | want-verb | Wanting: хотеть | A1
S: Хотеть is irregular and is followed by an infinitive or a noun in the accusative/genitive.
B: **хочу, хочешь, хочет, хотим, хотите, хотят**. With an infinitive: **Я хочу пить.** With a noun: **Я хочу кофе / чай / воду**. For polite ordering use **Можно мне …?** or **Я хотел бы …** (m.) / **хотела бы** (f.).
T: Person | хотеть
T: я | хочу
T: ты | хочешь
T: он / она | хочет
T: мы | хотим
T: вы | хотите
T: они | хотят
E: Я хочу кофе. = I want coffee.
E: Мы хотим есть. = We want to eat.
E: Она хочет спать. = She wants to sleep.
E: Я хотел бы чай. = I would like tea.
M: Writing "я хотю": the first person is хочу.
M: Using a conjugated second verb: "Я хочу пью" should be хочу пить.
M: Sounding rude: Я хочу кофе is blunt; add пожалуйста or use можно.
X: mcq Я ___ кофе. ? хочет | хотим | *хочу | хотят
X: fill Они ___ спать. => хотят
X: mcq Polite order: ___ мне кофе, пожалуйста? ? Хочу | *Можно | Нужен | Дайте
X: type I want to eat => я хочу есть
## polite-requests | polite-requests | Polite requests | A1
S: Soften requests with пожалуйста, можно and the formal вы.
B: **Можно + dative / infinitive** is the safe way: **Можно воды?** (May I have water?). **Дайте, пожалуйста, …** (give me) uses the imperative. **Принесите, пожалуйста, счёт.** (Please bring the bill.) Say **Извините** to get attention and **Спасибо** for thanks.
T: Situation | Say
T: ordering | Можно кофе, пожалуйста?
T: attention | Извините, …
T: thanks | Спасибо большое
T: refusing | Нет, спасибо
E: Можно воды, пожалуйста? = May I have water, please?
E: Принесите, пожалуйста, счёт. = Please bring the bill.
E: Извините, где туалет? = Excuse me, where's the toilet?
E: Дайте, пожалуйста, чай. = A tea, please.
M: Using ты imperatives with strangers: приди vs придите.
M: Forgetting пожалуйста.
M: Saying "Я хочу" to a waiter all the time.
X: mcq Polite way to ask for water: ? Я хочу воду | *Можно воды, пожалуйста? | Воду! | Вода есть?
X: fill ___, пожалуйста, счёт. (Bring, formal) => Принесите
X: mcq "Excuse me" is ___ ? Спасибо | *Извините | Пока | Пожалуйста
X: type thank you => спасибо
## possessives | possessives | Possessives | A1
S: Possessives agree with the thing owned in gender and number, not with the owner.
B: **мой, моя, моё, мои** (my); **твой, твоя, твоё, твои**; **наш, наша, наше, наши**; **ваш, ваша, ваше, ваши**. For "his / her / their" use unchanging **его, её, их**: **его брат, её сестра, их дом**.
T: Owner | masc. | fem. | neut. | pl.
T: my | мой | моя | моё | мои
T: your (ты) | твой | твоя | твоё | твои
T: our | наш | наша | наше | наши
T: your (вы) | ваш | ваша | ваше | ваши
E: Это мой брат. = This is my brother.
E: Это моя сестра. = This is my sister.
E: Это моё окно. = This is my window.
E: Это их дом. = This is their house.
M: Using мой for a feminine noun: сестра is моя.
M: Changing его / её / их for gender: they never change.
M: Writing "ихний": use их.
X: mcq Это ___ сестра. ? мой | *моя | моё | мои
X: fill Это ___ книга. (your, ты) => твоя
X: mcq "his brother" ? мой брат | её брат | *его брат | их брат
X: type our house => наш дом
## go-places | go-places | Going places | A1
S: Russian has separate verbs for going on foot (идти) and by vehicle (ехать), and uses в/на + accusative for destination.
B: **Я иду**, **ты идёшь**, **он идёт**, **мы идём**, **вы идёте**, **они идут**. By vehicle: **еду, едешь, едет, едем, едете, едут**. Destination: **в + accusative** (в школу) or **на + accusative** (на работу). Remember **домой** (home) and **туда/сюда**.
T: Person | идти | ехать
T: я | иду | еду
T: ты | идёшь | едешь
T: он | идёт | едет
T: мы | идём | едем
T: вы | идёте | едете
T: они | идут | едут
E: Я иду в магазин. = I'm going to the shop.
E: Мы едем в Москву. = We're going to Moscow.
E: Она идёт домой. = She's going home.
E: Он едет на работу. = He's going to work.
M: Using идти for a long trip by train: use ехать.
M: Saying "в дом" for "home": use домой.
M: Using где for destination: куда.
X: mcq Я ___ в магазин. (on foot) ? еду | *иду | идёт | идти
X: fill Мы ___ в Москву. (by train) => едем
X: mcq "I'm going home." ? Я иду дом | *Я иду домой | Я иду в дома | Я домой иду есть
X: type she goes (on foot) => она идёт
## reflexive | reflexive | Reflexive verbs | A1
S: Verbs ending in -ся / -сь show that the action happens to the subject (or is mutual).
B: Add **-ся** after a consonant and **-сь** after a vowel: **умываться** (to wash oneself), **учиться** (to study), **встречаться** (to meet), **нравиться** (to be pleasing). **Я умываюсь, ты умываешься, он умывается, мы умываемся, вы умываетесь, они умываются.** Time: **Я встаю в семь часов.**
T: Person | умываться
T: я | умываюсь
T: ты | умываешься
T: он | умывается
T: мы | умываемся
T: вы | умываетесь
T: они | умываются
E: Я встаю в семь часов. = I get up at seven.
E: Он учится в университете. = He studies at university.
E: Мы встречаемся в пять. = We're meeting at five.
E: Она моется утром. = She washes in the morning.
M: Dropping -ся: "Я умываю" means I wash (someone).
M: Using -ся after a vowel: "я умываюся" should be умываюсь.
M: Forgetting that "o'clock" uses в + accusative (в семь часов).
X: mcq Мы ___ в пять. (to meet) ? встречаем | встречаюсь | *встречаемся | встречаетесь
X: fill Я ___ в семь часов. (get up) => встаю
X: mcq Он ___ в университете. ? учит | *учится | учишься | учатся
X: type I wash (myself) => я умываюсь
## adjectives | adjectives | Adjectives | A1
S: Adjectives agree with the noun in gender, number and case. In the nominative the endings are -ый/-ой (m.), -ая (f.), -ое (n.), -ые (pl.).
B: **новый дом, новая книга, новое окно, новые дома**. After г, к, х, ж, ч, ш, щ use -ий/-ое/-ие (хороший, хорошая). Short forms (занят, рад, уверен) are used as predicates. Adjectives go before the noun.
T: Gender | Example
T: masc. | новый дом
T: fem. | новая книга
T: neut. | новое окно
T: plural | новые дома
E: Это новый телефон. = This is a new phone.
E: Это хорошая книга. = This is a good book.
E: Окно большое. = The window is big.
E: Они очень добрые. = They are very kind.
M: Using the masculine ending with a feminine noun: "новый книга".
M: Using -ый after ш/ж: хорошый should be хороший.
M: Adding an article. There is none.
X: mcq Это ___ книга. ? новый | *новая | новое | новые
X: fill Окно ___. (big, neuter) => большое
X: mcq "A good film" ? хорошая фильм | *хороший фильм | хорошее фильм | хорошие фильм
X: type new houses => новые дома
## like-verb | like-verb | Liking: любить & нравиться | A1
S: Russian has two patterns: любить (to love/like) with the nominative subject and нравиться (to be pleasing) with the dative.
B: **Я люблю кофе** (accusative object), **Я люблю читать**. For "I like it" use **Мне нравится** + nominative thing: **Мне нравится город** (the city pleases me), **Мне нравятся фильмы**. Dative pronouns: **мне, тебе, ему, ей, нам, вам, им**.
T: Person | dative
T: я | мне
T: ты | тебе
T: он | ему
T: она | ей
T: мы | нам
T: они | им
E: Я люблю кофе. = I love coffee.
E: Мне нравится город. = I like the city.
E: Ей нравятся фильмы. = She likes films.
E: Он любит читать. = He likes to read.
M: Saying "Я нравлюсь город": the thing liked is the subject of нравиться.
M: Mixing up the verb forms: use нравится with a singular thing, нравятся with plural.
M: Using любить for people in casual speech: it means love.
X: mcq ___ нравится город. ? Я | *Мне | Меня | Мной
X: fill Ей ___ фильмы. (pl.) => нравятся
X: mcq "I love tea." ? Мне любит чай | *Я люблю чай | Я нравится чай | Меня любить чай
X: type he likes to read => он любит читать
## irregular-present | irregular-present | Irregular verbs | A2
S: A few very common verbs have irregular present tense: быть, мочь, есть, дать, жить.
B: **мочь**: могу, можешь, может, можем, можете, могут. **есть** (to eat): ем, ешь, ест, едим, едите, едят. **жить**: живу, живёшь, живёт, живём, живёте, живут. **писать**: пишу, пишешь, пишет (consonant changes). **хотеть** and **идти** you already know.
T: Person | мочь | жить | писать
T: я | могу | живу | пишу
T: ты | можешь | живёшь | пишешь
T: он | может | живёт | пишет
T: мы | можем | живём | пишем
T: они | могут | живут | пишут
E: Я могу помочь. = I can help.
E: Они живут в Москве. = They live in Moscow.
E: Он пишет письмо. = He's writing a letter.
E: Мы едим суп. = We're eating soup.
M: Saying "я мочу": the form is могу.
M: Using пишать: the verb is писать.
M: Forgetting that the consonant changes only in some forms (я могу, они могут).
X: mcq Я ___ помочь. ? можешь | *могу | может | можем
X: fill Они ___ в Москве. (жить) => живут
X: mcq Он ___ письмо. (писать) ? *пишет | пишешь | пишу | пишут
X: type we can => мы можем
## modals | modals | Can, must, may | A2
S: Modal meanings use мочь, должен, нужно, надо, можно and нельзя with an infinitive.
B: **мочь** (can/ability), **можно** (it's allowed), **нельзя** (it's not allowed), **надо / нужно** (need to), **должен, должна, должно, должны** (must). **Мне надо идти**, **Ты должен учиться**. In the past: **мне надо было**.
T: Modal | Meaning
T: мочь | be able
T: можно | is allowed
T: нельзя | is forbidden
T: надо / нужно | need to
T: должен | must
E: Мне надо идти. = I need to go.
E: Здесь нельзя курить. = You can't smoke here.
E: Можно войти? = May I come in?
E: Она должна работать. = She must work.
M: Using можно for ability: use мочь.
M: Not agreeing должен: должна for a woman.
M: Conjugating the second verb.
X: mcq Мне ___ идти. ? можно | *надо | нельзя | хочу
X: fill Здесь ___ курить. (it's forbidden) => нельзя
X: mcq "She must work." ? Она должен работать | *Она должна работать | Она должно | Она должны
X: type may I? => можно
## comparatives | comparatives | Comparing | A2
S: Compare with a comparative adjective and чем or the genitive.
B: Form: **более + adjective** (**более интересный**) or the short forms **больше, меньше, лучше, хуже, дороже, дешевле, быстрее, медленнее**. Than: **чем** or genitive: **Поезд быстрее, чем автобус** / **Поезд быстрее автобуса.** Superlative: **самый + adjective**: **самый большой**.
T: Positive | Comparative | Superlative
T: хороший | лучше | самый лучший
T: плохой | хуже | самый плохой
T: большой | больше | самый большой
T: дорогой | дороже | самый дорогой
E: Поезд быстрее, чем автобус. = The train is faster than the bus.
E: Этот дом больше. = This house is bigger.
E: Это самый дорогой билет. = This is the most expensive ticket.
E: Здесь лучше. = It's better here.
M: Using более with short comparatives: "более лучше" is wrong.
M: Forgetting чем or the genitive.
M: Mixing up больше (more/bigger) and большой (big).
X: mcq Поезд ___ , чем автобус. (faster) ? быстрый | *быстрее | быстрейший | более быстрее
X: fill Этот дом ___ . (bigger) => больше
X: mcq "the most expensive" ? *самый дорогой | дорогее | более дорогой самый | дороже самый
X: type better => лучше
## past-perfect | past-perfect | Past tense | A2
S: The past tense uses the infinitive stem + л + gender/number endings. It does not mark person.
B: Take the infinitive, drop **-ть**, add **-л / -ла / -ло / -ли**: **работать → работал, работала, работало, работали**. Gender follows the subject: a woman says **Я работала**, a man **Я работал**. Verbs have two aspects: imperfective (ongoing) and perfective (completed): **писать / написать**.
T: Subject | Past of читать
T: он | читал
T: она | читала
T: оно | читало
T: они | читали
E: Вчера я читал книгу. = Yesterday I was reading a book. (m.)
E: Она работала в офисе. = She worked in an office.
E: Мы написали письмо. = We wrote (completed) a letter.
E: Они ехали в Москву. = They were going to Moscow.
M: Conjugating by person: the past form is the same for я, ты, он.
M: Not agreeing in gender: a woman says работала.
M: Using perfective for ongoing actions.
X: mcq Она ___ в офисе. ? работал | *работала | работало | работали
X: fill Вчера мы ___ фильм. (смотреть, past, pl.) => смотрели
X: mcq A man says "I read": ? Я читала | *Я читал | Я читало | Я читали
X: type they worked => они работали
## past-2 | past-2 | Past with aspect | A2
S: Perfective verbs show a completed result; imperfective verbs show process or repetition.
B: Most perfective verbs add a prefix: **делать → сделать, писать → написать, читать → прочитать, смотреть → посмотреть**. Use imperfective with **всегда, часто, каждый день, долго**; use perfective for single completed events: **Я прочитал книгу.** Irregular pasts: **идти → шёл, шла, шли**; **мочь → мог, могла**.
T: Imperfective | Perfective
T: делать | сделать
T: писать | написать
T: читать | прочитать
T: смотреть | посмотреть
T: покупать | купить
E: Я читал каждый день. = I read every day.
E: Я прочитал книгу. = I read (finished) the book.
E: Он шёл домой. = He was walking home.
E: Они купили билеты. = They bought tickets.
M: Using perfective with часто / всегда.
M: Saying "я идти": past of идти is шёл/шла.
M: Forgetting the prefix: *писал* ≠ *написал*.
X: mcq Я ___ книгу. (finished) ? читал | *прочитал | читаю | читать
X: fill Он ___ домой. (was walking, m.) => шёл
X: mcq "They bought tickets." ? Они покупали билеты | *Они купили билеты | Они купят билеты | Они покупают
X: type she walked (on foot) => она шла
## future-near | future-near | Future | A2
S: Imperfective verbs form the future with быть + infinitive; perfective verbs simply conjugate as present endings with a future meaning.
B: **Я буду работать** (I will work/be working). **Я прочитаю книгу** (I will read the whole book) — a perfective verb has no present tense, so its present endings mean future. Near future also uses **собираться + infinitive**: **Я собираюсь поехать**.
T: Person | быть
T: я | буду
T: ты | будешь
T: он | будет
T: мы | будем
T: вы | будете
T: они | будут
E: Завтра я буду работать. = Tomorrow I'll be working.
E: Мы поедем в Москву. = We'll go to Moscow.
E: Я позвоню тебе вечером. = I'll call you in the evening.
E: Она будет дома. = She'll be at home.
M: Using буду with a perfective verb: "буду прочитать" is wrong.
M: Forgetting that perfective presents mean future.
M: Using the present for a distant future.
X: mcq Завтра я ___ работать. ? будем | *буду | будешь | будет
X: fill Завтра мы ___ дома. => будем
X: mcq "I'll call you tonight." ? Я буду позвонить | *Я позвоню тебе вечером | Я звоню вечером | Я позвонил
X: type they will be => они будут
## object-pronouns | object-pronouns | Object pronouns | A2
S: Pronouns change form by case. The accusative and the genitive are the same for most persons.
B: **меня, тебя, его, её, нас, вас, их** (accusative/genitive); dative **мне, тебе, ему, ей, нам, вам, им**; after prepositions add **н-** to third-person forms: **у него, с ней, для них**.
T: Case | я | ты | он | она | мы
T: acc/gen | меня | тебя | его | её | нас
T: dat | мне | тебе | ему | ей | нам
T: instr | мной | тобой | им | ей | нами
E: Он видит меня. = He sees me.
E: Я звоню ей. = I'm calling her.
E: Дай мне книгу. = Give me the book.
E: Я иду с ним. = I'm going with him.
M: Saying "с его" instead of с ним: add н- after a preposition.
M: Using nominative: "Он видит я".
M: Forgetting dative for звонить: звонить + dative.
X: mcq Он видит ___ . (me) ? я | *меня | мне | мной
X: fill Я иду с ___ . (him) => ним
X: mcq "Give me the book." ? Дай я книгу | *Дай мне книгу | Дай меня книгу | Дай мной книгу
X: type her (acc) => её
## connectors-opinions | connectors-opinions | Joining ideas & opinions | A2
S: Use и, а, но, потому что, поэтому, если, когда to join clauses, and "я думаю, что…" to give opinions.
B: **Я думаю, что…** (I think that…); **По-моему…** (in my opinion); **Я согласен / согласна**; **Я не согласен** (I disagree). Remember the comma before что, потому что, если, когда, чтобы.
T: Connector | Meaning
T: и | and
T: а | and/but (contrast)
T: но | but
T: потому что | because
T: поэтому | so
T: если | if
E: Я думаю, что это хорошо. = I think that is good.
E: По-моему, поезд лучше. = In my opinion the train is better.
E: Я дома, потому что холодно. = I'm home because it's cold.
E: Я хочу, но не могу. = I want to, but I can't.
M: Dropping the comma before что.
M: Using но where а (contrast) is better.
M: Using "потому" alone.
X: mcq Холодно, ___ я дома. (so) ? потому что | *поэтому | если | но
X: fill Я думаю, ___ это хорошо. => что
X: mcq "In my opinion" ? *По-моему | Мне думать | В мой мнение | Моё думаю
X: type because => потому что
## cases | cases | The six cases (overview) | A2
S: Russian marks the role of a noun with six cases: nominative, accusative, genitive, dative, instrumental, prepositional.
B: **Nominative**: subject (стол). **Accusative**: direct object (читаю книгу). **Genitive**: possession / absence / after numbers (нет книги). **Dative**: to whom (дай маме). **Instrumental**: with / by means of (с другом). **Prepositional**: where / about (в городе, о книге). Learn each case with its triggers first.
T: Case | Question | Example
T: nominative | кто? что? | мама
T: accusative | кого? что? | маму
T: genitive | кого? чего? | мамы
T: dative | кому? чему? | маме
T: instrumental | кем? чем? | мамой
T: prepositional | о ком? о чём? | о маме
E: Я читаю книгу. = I'm reading a book. (acc.)
E: У меня нет книги. = I don't have the book. (gen.)
E: Я иду с другом. = I'm going with a friend. (instr.)
E: Я в городе. = I'm in the city. (prep.)
M: Using the nominative everywhere.
M: Forgetting that animate masculine accusative = genitive: вижу брата.
M: Mixing prepositional with the instrumental after с.
X: mcq Я читаю ___ . (book) ? книга | *книгу | книги | книге
X: fill Я иду с ___ . (friend) => другом
X: mcq У меня нет ___ . (time) ? время | *времени | временем | времена
X: type in the city => в городе
`;
