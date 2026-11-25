// Russian extension: more B1–C2 material. Machine-drafted: have a native speaker review idioms and register notes.
export const RU_VOCAB_EXT = `
connectors|кроме того|besides|phr|KROH-mee tah-VOH|Кроме того, в квартире есть балкон.|Besides, the flat has a balcony.|B1
connectors|однако|however|adv|ahd-NAH-kah|Уже поздно, однако я приду.|It's late, but I'll come.|B1
connectors|поэтому|therefore|adv|pah-EH-too|Я болел, поэтому остался дома.|I was ill, so I stayed home.|B1
work|зарплата|salary|n.f|zahr-PLAH-tah|Моя зарплата растёт каждый год.|My salary grows every year.|B1
work|срок|deadline, term|n.m|SROHK|Срок заканчивается в пятницу.|The deadline ends on Friday.|B1
work|нанимать|to hire|v|nah-nee-MAHT'|Компания нанимает троих сотрудников.|The company is hiring three employees.|B1|perfective: нанять
verbs|вспоминать|to recall|v|fspah-mee-NAHT'|Я часто вспоминаю детство.|I often recall my childhood.|B1|perfective: вспомнить
verbs|замечать|to notice|v|zah-meh-CHAHT'|Я заметил ошибку.|I noticed the mistake.|B1|perfective: заметить
verbs|привыкать|to get used to|v|pree-vih-KAHT'|Я привыкаю к климату.|I'm getting used to the climate.|B1|perfective: привыкнуть, + к + дат.
society|неравенство|inequality|n.n|nee-rah-VEHN-stvah|Неравенство растёт.|Inequality is growing.|B2
society|район|district|n.m|rah-YOHN|Это тихий район.|It's a quiet district.|B2
verbs|подчёркивать|to stress, underline|v|pahd-CHYOHR-kee-vaht'|Я хочу подчеркнуть этот момент.|I want to stress this point.|B2|perfective: подчеркнуть
verbs|достигать|to achieve|v|dahs-tee-GAHT'|Она достигла своей цели.|She achieved her goal.|B2|perfective: достичь
verbs|утверждать|to claim|v|oo-tvehr-ZHDAHT'|Он утверждает, что ничего не знает.|He claims he knows nothing.|B2
adjectives|необходимый|necessary|adj|nee-ahb-HOH-dee-mihy|Этот документ необходим.|This document is necessary.|B2
verbs|ставить под сомнение|to call into question|v|STAH-veet' pahd sahm-NEH-nee-yeh|Никто не ставит его решение под сомнение.|Nobody questions his decision.|C1
adjectives|неизбежный|inevitable|adj|nee-eez-BEHZH-nihy|Изменение неизбежно.|Change is inevitable.|C1
society|вызов|challenge|n.m|VIH-zahf|Климат — глобальный вызов.|Climate is a global challenge.|C1
connectors|тем не менее|nevertheless|phr|tehm nee MEH-nee-yeh|Тем не менее проект продолжается.|Nevertheless, the project continues.|C1
connectors|в сущности|in essence|phr|f SOO-shchnahs-tee|В сущности, лёгкого решения нет.|In essence, there is no easy solution.|C1
adjectives|мимолётный|fleeting|adj|mee-mah-LYOHT-nihy|Слава мимолётна.|Fame is fleeting.|C2
verbs|ратовать|to champion, advocate|v|RAH-tah-vaht'|Эксперты ратуют за осторожность.|Experts advocate caution.|C2|за + вин.
society|ущерб|damage, detriment|n.m|oo-SHCHEHRP|Это нанесло ущерб здоровью.|This did damage to his health.|C2
connectors|ввиду|in view of|prep|VVEE-doo|Ввиду ситуации мы переносим встречу.|In view of the situation we're postponing the meeting.|C2|+ gen.
`;
export const RU_GRAMMAR_EXT = `
## ext-uslovnye | ext-uslovnye | Conditional sentences: если and если бы | B1
S: Real: если + indicative. Unreal: если бы + past-tense verb, main clause with бы + past-tense verb. The past form after бы is just the past tense, not a past meaning.
B: **Если пойдёт дождь, я останусь дома.** (real) **Если бы у меня было время, я бы поехал.** (unreal) **Если бы я знал, я бы пришёл.** (impossible past). The particle **бы** can float: Я бы поехал / Я поехал бы.
E: Если ты придёшь, мы поедим. = If you come, we'll eat.
E: Если бы я был богат, я бы купил дом. = If I were rich, I'd buy a house.
E: Если бы я знал, я бы пришёл. = If I'd known, I'd have come.
E: Я хотел бы кофе. = I'd like a coffee.
M: "Если я буду иметь время" sounds bookish; say "Если у меня будет время".
M: Leaving out бы in the main clause of an unreal condition.
X: mcq ___ у меня было время, я бы поехал. ? Если | *Если бы | Когда | Чтобы
X: mcq Если бы я ___, я бы пришёл. ? знаю | *знал | буду знать | знаю бы
X: fill Я ___ хотел кофе. (I'd like) => бы
X: type Say: "I'd like a coffee." (man) => Я хотел бы кофе
## ext-passiv | ext-passiv | Passive and impersonal constructions | B2
S: Russian uses -ся verbs and short passive participles: Дом строится. Дом построен. Impersonal 3rd person plural: Здесь говорят по-русски.
B: **Книга написана** (short participle = result). **Книга была написана** (past). The instrumental marks the agent: **Книга написана Толстым.** Everyday Russian often prefers the active or impersonal: **Говорят, что будет холодно.**
E: Дом был построен в 1990 году. = The house was built in 1990.
E: Здесь говорят по-русски. = Russian is spoken here.
E: Письмо написано Анной. = The letter was written by Anna.
E: Говорят, что будет холодно. = They say it will be cold.
M: Using the passive with a person as agent in speech where the active is natural.
M: Forgetting that the short participle agrees in gender: написан, написана, написано.
X: mcq Книга ___ Толстым. ? написал | *написана | пишет | писали
X: mcq Здесь ___ по-русски. ? говорит | *говорят | говорим | говорил
X: fill Письмо ___ (написать) Анной. => написано
X: type Say: "They say it will be cold." => Говорят, что будет холодно
## ext-prichastiya | ext-prichastiya | Participles and verbal adverbs | C1
S: Деепричастие (читая / прочитав) shows an action that accompanies or precedes the main verb, with the same subject. Participles (читающий, прочитанный) act as adjectives.
B: **Читая книгу, он слушал музыку.** (While reading ...) **Прочитав письмо, она позвонила.** (Having read ...). **Читающий человек** (a reading person) and **прочитанная книга** (a book that has been read) are participles. The subject must be the same in both parts of the sentence.
E: Идя на работу, я встретил Анну. = While walking to work, I met Anna.
E: Вернувшись домой, он пообедал. = Having returned home, he had lunch.
E: Человек, читающий газету, — мой брат. = The man reading the newspaper is my brother.
E: Прочитав письмо, она позвонила. = Having read the letter, she called.
M: Using a verbal adverb with a different subject in the second clause.
M: Using an imperfective verbal adverb (-я) for a completed earlier action.
X: mcq ___ на работу, я встретил Анну. ? Идти | *Идя | Пошёл | Шёл
X: mcq Which shows an earlier action? ? Читая | *Прочитав | Читает | Читал
X: fill ___ (читать) книгу, он слушал музыку. => Читая
X: type Say: "Having read the letter, she called." => Прочитав письмо, она позвонила
`;
export const RU_CONVS_EXT = `
## ext-b1-landlord | ext-b1-landlord | Renting a flat | B1 | You call about a flat for rent.
N: Алло, слушаю вас. = Hello, I'm listening.
Y: Здравствуйте, я звоню по поводу квартиры из объявления. Она ещё свободна? = Hello, I'm calling about the flat in the ad. Is it still available? || Мне нужен билет в Москву. = I need a ticket to Moscow. || Где находится вокзал? = Where is the station? :: квартиры,объявления,свободна
N: Да, она стоит шестьсот евро в месяц с коммунальными услугами. = Yes, it costs six hundred euros a month with utilities.
Y: Могу ли я посмотреть её в эти выходные? = Could I see it this weekend? || Я смотрю вчера квартиру. = I see the flat yesterday. || Молоко дорогое. = Milk is expensive. :: посмотреть,выходные
N: Конечно. В субботу в одиннадцать вам удобно? = Of course. Saturday at eleven, does that suit you?
Y: Да, отлично. До субботы! = Yes, great. See you Saturday! || Я ничего не помню. = I remember nothing. || До свидания, до вчера. = Goodbye until yesterday. :: отлично,суббот
## ext-c1-interview | ext-c1-interview | A radio interview | C1 | You are interviewed about a social issue.
N: Некоторые говорят, что жилищную проблему не решить. Что вы думаете? = Some say the housing problem can't be solved. What do you think?
Y: Я бы так не сказал; это большой вызов, но некоторые меры уже сработали. = I wouldn't say that; it's a big challenge, but some measures have worked. || Это вызов, но меры есть. = (flatter) || Решения нет, потому что нет. = There's no solution because no. :: вызов,меры
N: Например? = For example?
Y: Ограничить аренду для туристов и строить больше муниципального жилья. = Limit rentals to tourists and build more municipal housing. || Снять завтра рынок. = Rent the market tomorrow. || Всё дорого, потому что да. = Everything is expensive because yes. :: аренд,жилья
N: Спасибо за беседу. = Thank you for the conversation.
Y: И вам спасибо. Это было удовольствие. = Thank you too. It was a pleasure. || До свидания вчера. = Goodbye yesterday. || Это неважно. = It doesn't matter. :: удовольствие,спасибо
`;
export const RU_READING_EXT = `
## ext-r-b2-city | ext-r-b2 | Город пятнадцати минут | B2
P: Некоторые урбанисты предлагают, чтобы каждый житель мог решать основные задачи в радиусе пятнадцати минут пешком. Идея в том, чтобы сократить движение транспорта и поддержать небольшие магазины района. = Some urbanists propose that every resident can handle their main tasks within fifteen minutes on foot. The idea is to cut traffic and support small shops in the district.
P: Однако критики отмечают, что не каждый город можно перестроить так, и что цены на жильё могут вырасти в лучше оснащённых районах. = However critics note that not every city can be rebuilt this way, and that housing prices may rise in better-equipped districts.
G: радиус = radius ; сократить = to reduce ; оснащённый = equipped
Q: mcq Почему цены могут вырасти? ? потому что транспорт сокращается | *потому что жильё в хорошо оснащённых районах станет престижнее | потому что небольшие магазины закрываются | потому что каждый житель идёт пятнадцать минут
Q: mcq Что хотят сократить? ? магазины | *движение транспорта | районы | жильё
Q: mcq В чём идея? ? больше машин | *основные дела рядом с домом | меньше магазинов | дорогое жильё
## ext-r-c1-memory | ext-r-c1 | Избирательная память | C1
P: Мы охотно считаем, что помнить значит точно воспроизводить прошлое, но многочисленные исследования показывают обратное: каждый раз, когда мы вспоминаем событие, мы строим воспоминание заново и при этом тонко его меняем. = We readily think that remembering means exactly reproducing the past, but numerous studies show the opposite: each time we recall an event we build the memory anew and subtly change it in the process.
P: Это объясняет, почему два свидетеля одного события могут давать несовместимые версии, хотя ни один из них не лжёт. = This explains why two witnesses of the same event can give incompatible versions even though neither is lying.
G: воспроизводить = to reproduce ; заново = anew ; свидетель = witness
Q: mcq Что показывают исследования? ? что помнить значит точно воспроизводить прошлое | *что каждое воспоминание строится заново | что два свидетеля всегда лгут | что ни одно воспоминание не меняется
Q: mcq Почему воспоминание меняется? ? потому что мы точно воспроизводим прошлое | *потому что при каждом воспоминании мы создаём его снова | потому что два свидетеля дают версии | потому что один из них лжёт
Q: mcq Что мы делаем, вспоминая событие? ? точно воспроизводим его | *строим заново и меняем | отдаём свидетелям | стираем
`;
export const RU_LISTENING_EXT = `
## ext-l-b2-radio | ext-l-b2 | Дискуссия на радио | B2
L: Ведущая: Сегодня говорим об удалённой работе. Карим, что вы думаете? = Today we talk about remote work. Karim, what do you think?
L: Карим: Думаю, она принесла пользу, хотя не во всех отраслях. = I think it has brought benefits, though not in all sectors.
L: Ведущая: А недостатки? = And the drawbacks?
L: Карим: Прежде всего изоляция и трудность отделить работу от личной жизни. = Above all isolation and the difficulty of separating work from personal life.
L: Ведущая: Большое спасибо, Карим. = Thank you very much, Karim.
Q: mcq О чём они говорят? ? о транспорте | *об удалённой работе | о туризме | о кулинарии
Q: mcq Какой недостаток называет Карим? ? зарплату | *изоляцию | транспорт | график
## ext-l-c1-lecture | ext-l-c1 | Лекция | C1
L: Профессор: Хочу подчеркнуть, что изменение языка — не порча, а естественное развитие. = I want to stress that language change isn't corruption but natural development.
L: Профессор: Слова, которые сегодня кажутся ошибочными, века назад были нормальными. = Words that seem wrong today were normal centuries ago.
L: Студентка: Значит, в языке нет ошибок? = So there are no errors in language?
L: Профессор: Норма существует, но меняется вместе с употреблением. = The norm exists, but it changes with use.
Q: mcq Что утверждает профессор? ? что изменение — порча | *что изменение — естественное развитие | что нормы нет | что ничего не меняется
Q: mcq Что он говорит о норме? ? она неизменна | *она меняется вместе с употреблением | её не существует | это мнение
`;
export const RU_WRITING_EXT = `
## w-ext-b2-email | ext-w-b2 | A formal enquiry | B2 | 60
T: Write a formal email (8–10 lines) to a language school asking about courses, price and dates. Use a formal greeting, formal вы and at least two polite conditionals (не могли бы вы, я хотел бы).
R: Greeting = Уважаемые господа, Здравствуйте ; Request = я хотел бы, не могли бы вы ; Question = сколько стоит, когда начинается ; Closing = с уважением, всего доброго
M: Уважаемые господа! Я хотел бы получить информацию о ваших курсах русского языка в следующем семестре. Не могли бы вы сообщить цены и даты начала? Я также хотел бы узнать, есть ли вечерние группы. С уважением, Иван Петров. = Dear Sirs, I'd like information about your Russian courses next term. Could you tell me the prices and start dates? I'd also like to know whether there are evening groups. Sincerely, Ivan Petrov.
## w-ext-c1-essay | ext-w-c1 | An argumentative essay | C1 | 90
T: Write 12–15 lines arguing for or against a four-day working week. Use a concession (хотя, несмотря на то что), a hypothesis (если бы + бы) and a formal connector (тем не менее, в сущности).
R: Concession = хотя, несмотря на то что ; Hypothesis = если бы, бы ; Connector = тем не менее, в сущности, следовательно ; Opinion = по моему мнению, с моей точки зрения
M: По моему мнению, четырёхдневная рабочая неделя повысила бы производительность. Хотя некоторые отрасли не могут её ввести, если бы её применяли гибко, сотрудники меньше уставали бы. Тем не менее нужно оценить затраты. В сущности, попробовать стоит. = In my opinion a four-day working week would raise productivity. Although some sectors can't introduce it, if it were applied flexibly employees would tire less. Nevertheless, costs need assessing. In essence, it's worth trying.
`;
export const RU_PLACEMENT_EXT = `
vocabulary | B1 | - | mcq «Срок заканчивается в пятницу» means ___. ? the price drops | *the deadline ends on Friday | the place closes | the plan starts
grammar | B1 | - | mcq ___ у меня было время, я бы поехал. ? Если | *Если бы | Когда | Чтобы
grammar | B2 | - | mcq Книга ___ Толстым. ? написал | *написана | пишет | писали
vocabulary | B2 | - | mcq «Подчёркивать» means ___. ? to lose | *to stress | to leave | to read
grammar | C1 | - | mcq ___ на работу, я встретил Анну. ? Идти | *Идя | Пошёл | Шёл
vocabulary | C1 | - | mcq «Тем не менее» is closest to ___. ? поэтому | *однако | кроме того | потому что
vocabulary | C2 | - | mcq «Мимолётный» means ___. ? eternal | *fleeting | strong | clear
vocabulary | C2 | - | mcq «Ввиду» means ___. ? despite | *in view of | in front of | instead of
`;
