// cat|target|english|pos[.gender]|romanization (CAPS = stress)|example|translation|level?|note?
export const RU_VOCAB = `
script|Яя|ya (letter)|letter|ya|Я студент.|I am a student.|A1|Я = "ya". The word "я" (I) is one letter.
script|Ыы|yery (hard i)|letter|y|Мы дома.|We are at home.|A1|A back "i" sound, never starts a word.
script|Шш|sh (letter)|letter|sh|Шарф дома.|The scarf is at home.|A1
script|Щщ|shch (letter)|letter|shch|Борщ вкусный.|Borscht is tasty.|A1
script|Жж|zh (letter)|letter|zh|Жена дома.|My wife is at home.|A1
script|Чч|ch (letter)|letter|ch|Чай горячий.|The tea is hot.|A1
script|Цц|ts (letter)|letter|ts|Цена высокая.|The price is high.|A1
script|Хх|kh (letter)|letter|kh|Хлеб свежий.|The bread is fresh.|A1
script|Ээ|e (letter)|letter|e|Это хорошо.|This is good.|A1
script|Юю|yu (letter)|letter|yu|Юрист работает здесь.|The lawyer works here.|A1
script|Ьь|soft sign|letter|'|Мать дома.|Mother is at home.|A1|Softens the consonant before it.
script|Рр|r (rolled)|letter|r|Рыба свежая.|The fish is fresh.|A1|Looks like P but is R.
script|Нн|n (letter)|letter|n|Нога болит.|My leg hurts.|A1|Looks like H but is N.
script|Вв|v (letter)|letter|v|Вода холодная.|The water is cold.|A1|Looks like B but is V.
script|Сс|s (letter)|letter|s|Сок вкусный.|The juice is tasty.|A1|Looks like C but is S.
script|Уу|oo (letter)|letter|u|Утро хорошее.|The morning is good.|A1|Looks like Y but is "oo".
greetings|привет|hi (informal)|phr|pree-VYET|Привет, как дела?|Hi, how are you?
greetings|здравствуйте|hello (formal)|phr|ZDRAHST-vooy-tye|Здравствуйте, Анна Петровна.|Hello, Anna Petrovna.
greetings|доброе утро|good morning|phr|DOH-bro-ye OO-tro|Доброе утро, мама.|Good morning, mum.
greetings|добрый день|good afternoon|phr|DOH-bry dyen'|Добрый день, господа.|Good afternoon, gentlemen.
greetings|добрый вечер|good evening|phr|DOH-bry VYE-cher|Добрый вечер, друзья.|Good evening, friends.
greetings|спокойной ночи|good night|phr|spa-KOY-noy NO-chee|Спокойной ночи, до завтра.|Good night, until tomorrow.
greetings|до свидания|goodbye|phr|da svee-DAH-nya|До свидания, спасибо.|Goodbye, thank you.
greetings|пока|bye (informal)|phr|pa-KAH|Пока, до завтра!|Bye, see you tomorrow!
greetings|пожалуйста|please / you're welcome|phr|pa-ZHAH-looy-sta|Кофе, пожалуйста.|Coffee, please.
greetings|спасибо|thank you|phr|spa-SEE-ba|Спасибо большое за помощь.|Thank you very much for the help.
greetings|извините|excuse me / sorry|phr|eez-vee-NEE-tye|Извините, где вокзал?|Excuse me, where is the station?
greetings|очень приятно|nice to meet you|phr|OH-chen' pree-YAHT-na|Очень приятно, я Марк.|Nice to meet you, I'm Mark.
greetings|как дела?|how are things?|phr|kak dee-LAH|Привет, Анна, как дела?|Hi Anna, how are things?
greetings|хорошо|fine / good|adv|kha-ra-SHO|Всё хорошо, спасибо.|Everything's fine, thanks.
greetings|да|yes|phr|dah|Да, пожалуйста.|Yes, please.
greetings|нет|no|phr|nyet|Нет, спасибо.|No, thank you.
pronouns|я|I|pron|ya|Я работаю в офисе.|I work in an office.
pronouns|ты|you (informal)|pron|ty|Ты говоришь по-английски?|Do you speak English?
pronouns|он|he|pron|on|Он мой брат.|He is my brother.
pronouns|она|she|pron|a-NAH|Она живёт в Москве.|She lives in Moscow.
pronouns|оно|it (neuter)|pron|a-NO|Оно здесь.|It is here.
pronouns|мы|we|pron|my|Мы друзья.|We are friends.
pronouns|вы|you (formal / plural)|pron|vy|Вы врач?|Are you a doctor?
pronouns|они|they|pron|a-NEE|Они работают сегодня.|They work today.
pronouns|это|this / it is|pron|E-ta|Это моя книга.|This is my book.
pronouns|всё|everything|pron|vsyo|Всё хорошо.|Everything is fine.
pronouns|тут|here|adv|toot|Я тут.|I am here.
numbers|ноль|zero|num|nol'|У меня ноль проблем.|I have zero problems.
numbers|один|one|num|a-DEEN|У меня один брат.|I have one brother.
numbers|два|two|num|dvah|У меня два кота.|I have two cats.
numbers|три|three|num|tree|Здесь три стула.|There are three chairs here.
numbers|четыре|four|num|chee-TY-ree|Мне четыре года.|I am four years old.
numbers|пять|five|num|pyat'|Пять минут.|Five minutes.
numbers|шесть|six|num|shest'|Шесть часов.|Six o'clock.
numbers|семь|seven|num|syem'|Семь дней.|Seven days.
numbers|восемь|eight|num|VOH-syem'|Восемь рублей.|Eight roubles.
numbers|девять|nine|num|DYE-vyat'|Девять утра.|Nine in the morning.
numbers|десять|ten|num|DYE-syat'|Десять минут.|Ten minutes.
numbers|двадцать|twenty|num|DVAHD-tsat'|Мне двадцать лет.|I am twenty.
numbers|тридцать|thirty|num|TREET-tsat'|Тридцать рублей.|Thirty roubles.
numbers|сто|one hundred|num|sto|Сто рублей.|A hundred roubles.
numbers|тысяча|thousand|num.f|TY-sya-cha|Тысяча человек.|A thousand people.
time|время|time|n.n|VRE-mya|У меня нет времени.|I have no time.
time|день|day|n.m|dyen'|Хороший день.|A good day.
time|неделя|week|n.f|nee-DYE-lya|Неделя длинная.|The week is long.
time|месяц|month|n.m|MYE-syats|Месяц короткий.|The month is short.
time|год|year|n.m|got|Год хороший.|The year is good.
time|сегодня|today|adv|see-VOD-nya|Сегодня холодно.|Today it's cold.
time|завтра|tomorrow|adv|ZAHF-tra|Завтра я работаю.|Tomorrow I work.
time|вчера|yesterday|adv|fchee-RAH|Вчера я был дома.|Yesterday I was at home.
time|утро|morning|n.n|OO-tro|Утро холодное.|The morning is cold.
time|вечер|evening|n.m|VYE-cher|Вечер тёплый.|The evening is warm.
time|ночь|night|n.f|noch'|Ночь тихая.|The night is quiet.
time|понедельник|Monday|n.m|pa-nee-DYEL'-neek|Понедельник трудный.|Monday is hard.
time|пятница|Friday|n.f|PYAT-nee-tsa|Пятница хорошая.|Friday is good.
time|суббота|Saturday|n.f|soo-BO-ta|Суббота свободная.|Saturday is free.
time|воскресенье|Sunday|n.n|vas-kree-SYEN'-ye|Воскресенье спокойное.|Sunday is calm.
time|час|hour / o'clock|n.m|chas|Час прошёл.|An hour has passed.
time|минута|minute|n.f|mee-NOO-ta|Минута пролетела.|A minute flew by.
time|рано|early|adv|RAH-na|Я встаю рано.|I get up early.
time|поздно|late|adv|POZ-dna|Уже поздно.|It's already late.
time|всегда|always|adv|vsee-GDA|Я всегда дома.|I am always at home.
time|иногда|sometimes|adv|ee-nag-DA|Иногда я хожу в кино.|Sometimes I go to the cinema.
time|сейчас|now|adv|see-CHAS|Сейчас я работаю.|Now I'm working.
questions|что|what|pron|shto|Что это?|What is this?
questions|кто|who|pron|kto|Кто это?|Who is this?
questions|где|where|adv|gdye|Где вокзал?|Where is the station?
questions|куда|where to|adv|koo-DA|Куда ты идёшь?|Where are you going?
questions|когда|when|adv|kag-DA|Когда урок?|When is the lesson?
questions|как|how|adv|kak|Как тебя зовут?|What's your name?
questions|почему|why|adv|pa-chee-MOO|Почему ты здесь?|Why are you here?
questions|сколько|how much / many|adv|SKOL'-ka|Сколько это стоит?|How much does it cost?
questions|какой|which / what kind|adj|ka-KOY|Какой это день?|What day is it?
questions|чей|whose|adj|chey|Чей это телефон?|Whose phone is this?
food|еда|food|n.f|ye-DA|Еда вкусная.|The food is tasty.
food|вода|water|n.f|va-DA|Вода холодная.|The water is cold.
food|хлеб|bread|n.m|khlyep|Хлеб свежий.|The bread is fresh.
food|молоко|milk|n.n|ma-la-KO|Молоко холодное.|The milk is cold.
food|кофе|coffee|n.m|KO-fye|Кофе горячий.|The coffee is hot.|A1|Masculine, indeclinable.
food|чай|tea|n.m|chay|Чай горячий.|The tea is hot.
food|сок|juice|n.m|sok|Сок холодный.|The juice is cold.
food|пиво|beer|n.n|PEE-va|Пиво холодное.|The beer is cold.
food|вино|wine|n.n|vee-NO|Вино красное.|The wine is red.
food|суп|soup|n.m|soop|Суп горячий.|The soup is hot.
food|мясо|meat|n.n|MYA-sa|Мясо свежее.|The meat is fresh.
food|курица|chicken|n.f|KOO-ree-tsa|Курица вкусная.|The chicken is tasty.
food|рыба|fish|n.f|RY-ba|Рыба свежая.|The fish is fresh.
food|яйцо|egg|n.n|yay-TSO|Яйцо свежее.|The egg is fresh.
food|сыр|cheese|n.m|syr|Сыр вкусный.|The cheese is tasty.
food|масло|butter|n.n|MAS-la|Масло мягкое.|The butter is soft.
food|сахар|sugar|n.m|SAH-khar|Сахар сладкий.|The sugar is sweet.
food|соль|salt|n.f|sol'|Соль на столе.|The salt is on the table.
food|яблоко|apple|n.n|YAH-bla-ka|Яблоко красное.|The apple is red.
food|картошка|potato|n.f|kar-TOSH-ka|Картошка горячая.|The potato is hot.
food|овощи|vegetables|n.pl|O-va-shchee|Овощи свежие.|The vegetables are fresh.
food|фрукты|fruit|n.pl|FROOK-ty|Фрукты сладкие.|The fruit is sweet.
food|завтрак|breakfast|n.m|ZAHF-trak|Завтрак вкусный.|Breakfast is tasty.
food|обед|lunch|n.m|ab-YET|Обед в час.|Lunch is at one.
food|ужин|dinner|n.m|OO-zhin|Ужин поздний.|Dinner is late.
food|счёт|bill|n.m|shchyot|Счёт, пожалуйста.|The bill, please.
food|меню|menu|n.n|mee-NYU|Меню на столе.|The menu is on the table.
family|семья|family|n.f|seem-YA|Семья большая.|The family is big.
family|мама|mum|n.f|MAH-ma|Мама дома.|Mum is at home.
family|папа|dad|n.m|PAH-pa|Папа на работе.|Dad is at work.
family|брат|brother|n.m|brat|Брат студент.|My brother is a student.
family|сестра|sister|n.f|syes-TRA|Сестра врач.|My sister is a doctor.
family|сын|son|n.m|syn|Сын маленький.|The son is small.
family|дочь|daughter|n.f|doch'|Дочь студентка.|The daughter is a student.
family|муж|husband|n.m|moozh|Муж дома.|My husband is at home.
family|жена|wife|n.f|zhe-NA|Жена врач.|My wife is a doctor.
family|бабушка|grandmother|n.f|BAH-boo-shka|Бабушка живёт в деревне.|Grandmother lives in a village.
family|дедушка|grandfather|n.m|DYE-doo-shka|Дедушка читает газету.|Grandfather is reading a paper.
family|друг|friend (m.)|n.m|droog|Друг мой сосед.|My friend is my neighbour.
family|подруга|friend (f.)|n.f|pad-ROO-ga|Подруга добрая.|My friend is kind.
family|ребёнок|child|n.m|ree-BYO-nak|Ребёнок спит.|The child is sleeping.
family|человек|person|n.m|chee-la-VYEK|Человек добрый.|The person is kind.
family|мужчина|man|n.m|moo-SHCHEE-na|Мужчина высокий.|The man is tall.
family|женщина|woman|n.f|ZHEN-shchee-na|Женщина красивая.|The woman is beautiful.
family|сосед|neighbour|n.m|sa-SYET|Сосед добрый.|The neighbour is kind.
places|дом|house / home|n.m|dom|Дом большой.|The house is big.
places|город|city|n.m|GO-rat|Город большой.|The city is big.
places|улица|street|n.f|OO-lee-tsa|Улица длинная.|The street is long.
places|магазин|shop|n.m|ma-ga-ZEEN|Магазин открыт.|The shop is open.
places|кафе|café|n.n|ka-FE|Кафе рядом.|The café is nearby.
places|ресторан|restaurant|n.m|rees-ta-RAN|Ресторан хороший.|The restaurant is good.
places|банк|bank|n.m|bahnk|Банк закрыт.|The bank is closed.
places|аптека|pharmacy|n.f|ap-TYE-ka|Аптека рядом.|The pharmacy is near.
places|больница|hospital|n.f|bal'-NEE-tsa|Больница большая.|The hospital is big.
places|школа|school|n.f|SHKO-la|Школа новая.|The school is new.
places|парк|park|n.m|park|Парк красивый.|The park is beautiful.
places|музей|museum|n.m|moo-ZYAY|Музей интересный.|The museum is interesting.
places|вокзал|train station|n.m|vag-ZAL|Вокзал большой.|The station is big.
places|площадь|square|n.f|PLO-shchat'|Площадь красивая.|The square is beautiful.
places|центр|centre|n.m|tsentr|Центр близко.|The centre is close.
places|направо|to the right|adv|na-PRA-va|Идите направо.|Go to the right.
places|налево|to the left|adv|na-LYE-va|Идите налево.|Go to the left.
places|прямо|straight on|adv|PRYA-ma|Идите прямо.|Go straight on.
places|далеко|far|adv|da-lee-KO|Это далеко.|It is far.
places|близко|near|adv|BLEES-ka|Это близко.|It is near.
travel|поезд|train|n.m|PO-yezd|Поезд идёт быстро.|The train goes fast.
travel|автобус|bus|n.m|af-TO-boos|Автобус идёт в центр.|The bus goes to the centre.
travel|метро|metro|n.n|mee-TRO|Метро быстрое.|The metro is fast.
travel|такси|taxi|n.n|tak-SEE|Такси дорогое.|The taxi is expensive.
travel|самолёт|plane|n.m|sa-ma-LYOT|Самолёт быстрый.|The plane is fast.
travel|машина|car|n.f|ma-SHY-na|Машина новая.|The car is new.
travel|билет|ticket|n.m|bee-LYET|Билет дорогой.|The ticket is expensive.
travel|паспорт|passport|n.m|PAHS-part|Паспорт здесь.|The passport is here.
travel|аэропорт|airport|n.m|a-e-ra-PORT|Аэропорт большой.|The airport is big.
travel|остановка|stop|n.f|asta-NOF-ka|Остановка рядом.|The stop is nearby.
travel|гостиница|hotel|n.f|gas-TEE-nee-tsa|Гостиница хорошая.|The hotel is good.
travel|номер|room (hotel)|n.m|NO-meer|Номер чистый.|The room is clean.
travel|багаж|luggage|n.m|ba-GAHSH|Багаж тяжёлый.|The luggage is heavy.
travel|карта|map|n.f|KAR-ta|Карта здесь.|The map is here.
travel|поездка|trip|n.f|pa-YEZD-ka|Поездка длинная.|The trip is long.
travel|отпуск|holiday|n.m|OT-poosk|Отпуск в августе.|The holiday is in August.
shopping|деньги|money|n.pl|DYEN'-gee|Деньги дома.|The money is at home.
shopping|цена|price|n.f|tse-NA|Цена высокая.|The price is high.
shopping|рубль|rouble|n.m|roobl'|Один рубль.|One rouble.
shopping|дорого|expensive|adv|DO-ra-ga|Это дорого.|That is expensive.
shopping|дёшево|cheap|adv|DYO-shee-va|Здесь дёшево.|It is cheap here.
shopping|купить|to buy|v|koo-PEET'|Я хочу купить хлеб.|I want to buy bread.
shopping|стоить|to cost|v|STO-eet'|Сколько стоит кофе?|How much does coffee cost?
shopping|платить|to pay|v|pla-TEET'|Я хочу платить картой.|I want to pay by card.
shopping|сдача|change|n.f|ZDA-cha|Сдача на столе.|The change is on the table.
shopping|размер|size|n.m|raz-MYER|Размер большой.|The size is large.
shopping|куртка|jacket|n.f|KOORT-ka|Куртка красная.|The jacket is red.
shopping|платье|dress|n.n|PLAHT'-ye|Платье красивое.|The dress is beautiful.
shopping|обувь|shoes|n.f|O-boov'|Обувь новая.|The shoes are new.
shopping|сумка|bag|n.f|SOOM-ka|Сумка большая.|The bag is big.
shopping|скидка|discount|n.f|SKEET-ka|Скидка большая.|The discount is big.
work|работа|work / job|n.f|ra-BO-ta|Работа интересная.|The work is interesting.
work|офис|office|n.m|O-fees|Офис большой.|The office is big.
work|врач|doctor|n.m|vrach|Врач хороший.|The doctor is good.
work|учитель|teacher|n.m|oo-CHEE-tel'|Учитель добрый.|The teacher is kind.
work|студент|student|n.m|stoo-DYENT|Студент умный.|The student is clever.
work|инженер|engineer|n.m|een-zhe-NYER|Инженер занят.|The engineer is busy.
work|начальник|boss|n.m|na-CHAL'-neek|Начальник строгий.|The boss is strict.
work|коллега|colleague|n.m|kal-LYE-ga|Коллега приятный.|The colleague is pleasant.
work|компания|company|n.f|kam-PA-nee-ya|Компания большая.|The company is big.
work|встреча|meeting|n.f|VSTRYE-cha|Встреча в два часа.|The meeting is at two.
work|урок|lesson|n.m|oo-ROK|Урок интересный.|The lesson is interesting.
work|вопрос|question|n.m|vap-ROS|Вопрос сложный.|The question is hard.
work|письмо|letter / email|n.n|pees'-MO|Письмо длинное.|The letter is long.
work|телефон|phone|n.m|tee-lee-FON|Телефон дома.|The phone is at home.
work|компьютер|computer|n.m|kam-PYU-ter|Компьютер новый.|The computer is new.
health|голова|head|n.f|ga-la-VA|Голова болит.|My head hurts.
health|рука|hand / arm|n.f|roo-KA|Рука болит.|My hand hurts.
health|нога|leg / foot|n.f|na-GA|Нога болит.|My leg hurts.
health|живот|stomach|n.m|zhee-VOT|Живот болит.|My stomach hurts.
health|горло|throat|n.n|GOR-la|Горло болит.|My throat hurts.
health|зуб|tooth|n.m|zoop|Зуб болит.|My tooth hurts.
health|спина|back|n.f|spee-NA|Спина болит.|My back hurts.
health|глаз|eye|n.m|glas|Глаз болит.|My eye hurts.
health|сердце|heart|n.n|SYER-tse|Сердце бьётся.|The heart beats.
health|лекарство|medicine|n.n|lee-KAR-stva|Лекарство горькое.|The medicine is bitter.
health|температура|fever / temperature|n.f|tyem-pe-ra-TOO-ra|Температура высокая.|The fever is high.
health|кашель|cough|n.m|KA-shel'|Кашель сильный.|The cough is bad.
health|здоровье|health|n.n|zda-ROV'-ye|Здоровье важно.|Health is important.
health|боль|pain|n.f|bol'|Боль сильная.|The pain is strong.
health|больной|sick|adj|bal'-NOY|Я больной.|I am sick.
health|здоровый|healthy|adj|zda-RO-vy|Он здоровый.|He is healthy.
emotions|радость|joy|n.f|RA-dast'|Радость большая.|The joy is great.
emotions|любовь|love|n.f|lyu-BOF'|Любовь важна.|Love is important.
emotions|весело|fun|adv|VYE-see-la|Нам весело.|We're having fun.
emotions|грустно|sad|adv|GROOST-na|Мне грустно.|I'm sad.
emotions|страшно|scary|adv|STRASH-na|Мне страшно.|I'm scared.
emotions|интересно|interesting|adv|een-tee-RYES-na|Это интересно.|That is interesting.
emotions|скучно|boring|adv|SKOOSH-na|Здесь скучно.|It's boring here.
emotions|рад|glad (m.)|adj|rat|Я рад тебя видеть.|I'm glad to see you.
emotions|устал|tired (m.)|adj|oos-TAL|Я очень устал.|I'm very tired.
emotions|уверен|sure (m.)|adj|oo-VYE-ren|Я уверен.|I'm sure.
emotions|думать|to think|v|DOO-mat'|Я думаю, что да.|I think so.
emotions|мнение|opinion|n.n|MNYE-nee-ye|Моё мнение простое.|My opinion is simple.
emotions|согласен|agree (m.)|adj|sa-GLAH-syen|Я согласен.|I agree.
emotions|правда|truth|n.f|PRAV-da|Это правда.|It's true.
nature|погода|weather|n.f|pa-GO-da|Погода хорошая.|The weather is good.
nature|солнце|sun|n.n|SON-tse|Солнце яркое.|The sun is bright.
nature|дождь|rain|n.m|dozhd'|Дождь сильный.|The rain is heavy.
nature|снег|snow|n.m|snyek|Снег белый.|The snow is white.
nature|ветер|wind|n.m|VYE-tyer|Ветер холодный.|The wind is cold.
nature|холодно|cold|adv|KHO-lad-na|Сегодня холодно.|It's cold today.
nature|тепло|warm|adv|tee-PLO|Сегодня тепло.|It's warm today.
nature|жарко|hot|adv|ZHAR-ka|Летом жарко.|It's hot in summer.
nature|лето|summer|n.n|LYE-ta|Лето жаркое.|The summer is hot.
nature|зима|winter|n.f|zee-MA|Зима холодная.|The winter is cold.
nature|весна|spring|n.f|vees-NA|Весна тёплая.|Spring is warm.
nature|осень|autumn|n.f|O-syen'|Осень красивая.|Autumn is beautiful.
nature|море|sea|n.n|MO-rye|Море синее.|The sea is blue.
nature|гора|mountain|n.f|ga-RA|Гора высокая.|The mountain is high.
nature|река|river|n.f|ree-KA|Река длинная.|The river is long.
nature|лес|forest|n.m|lyes|Лес зелёный.|The forest is green.
nature|цветок|flower|n.m|tsvee-TOK|Цветок красивый.|The flower is beautiful.
nature|небо|sky|n.n|NYE-ba|Небо синее.|The sky is blue.
hobbies|музыка|music|n.f|MOO-zy-ka|Музыка тихая.|The music is quiet.
hobbies|книга|book|n.f|KNEE-ga|Книга интересная.|The book is interesting.
hobbies|фильм|film|n.m|feel'm|Фильм хороший.|The film is good.
hobbies|кино|cinema|n.n|kee-NO|Кино сегодня.|The cinema is today.
hobbies|спорт|sport|n.m|sport|Спорт полезный.|Sport is healthy.
hobbies|футбол|football|n.m|foot-BOL|Футбол интересный.|Football is interesting.
hobbies|игра|game|n.f|eeg-RA|Игра интересная.|The game is interesting.
hobbies|гитара|guitar|n.f|gee-TA-ra|Гитара новая.|The guitar is new.
hobbies|фотография|photograph|n.f|fa-ta-GRA-fee-ya|Фотография красивая.|The photograph is beautiful.
hobbies|прогулка|walk|n.f|pra-GOOL-ka|Прогулка приятная.|The walk is pleasant.
hobbies|концерт|concert|n.m|kan-TSERT|Концерт в субботу.|The concert is on Saturday.
hobbies|танец|dance|n.m|TA-nyets|Танец красивый.|The dance is beautiful.
hobbies|путешествие|trip / travel|n.n|poo-tee-SHEST-vee-ye|Путешествие интересное.|The trip is interesting.
hobbies|рисунок|drawing|n.m|ree-SOO-nak|Рисунок красивый.|The drawing is beautiful.
objects|стол|table|n.m|stol|Стол большой.|The table is big.
objects|стул|chair|n.m|stool|Стул новый.|The chair is new.
objects|окно|window|n.n|ak-NO|Окно открыто.|The window is open.
objects|дверь|door|n.f|dvyer'|Дверь закрыта.|The door is closed.
objects|комната|room|n.f|KOM-na-ta|Комната маленькая.|The room is small.
objects|кухня|kitchen|n.f|KOOKH-nya|Кухня чистая.|The kitchen is clean.
objects|кровать|bed|n.f|kra-VAT'|Кровать мягкая.|The bed is soft.
objects|ключ|key|n.m|klyuch|Ключ здесь.|The key is here.
objects|лампа|lamp|n.f|LAHM-pa|Лампа новая.|The lamp is new.
objects|чашка|cup|n.f|CHASH-ka|Чашка горячая.|The cup is hot.
objects|тарелка|plate|n.f|ta-RYEL-ka|Тарелка чистая.|The plate is clean.
objects|ложка|spoon|n.f|LOSH-ka|Ложка здесь.|The spoon is here.
objects|ручка|pen|n.f|ROOCH-ka|Ручка на столе.|The pen is on the table.
objects|тетрадь|notebook|n.f|tee-TRAT'|Тетрадь новая.|The notebook is new.
objects|зеркало|mirror|n.n|ZYER-ka-la|Зеркало большое.|The mirror is big.
objects|дело|matter / business|n.n|DYE-la|Это моё дело.|That is my business.
verbs|быть|to be|v|byt'|Я хочу быть здесь.|I want to be here.
verbs|иметь|to have (formal)|v|ee-MYET'|Я хочу иметь время.|I want to have time.
verbs|жить|to live|v|zhyt'|Я хочу жить здесь.|I want to live here.
verbs|работать|to work|v|ra-BO-tat'|Я работаю в офисе.|I work in an office.
verbs|говорить|to speak|v|ga-va-REET'|Я говорю по-русски.|I speak Russian.
verbs|читать|to read|v|chee-TAT'|Я читаю книгу.|I read a book.
verbs|писать|to write|v|pee-SAT'|Я пишу письмо.|I write a letter.
verbs|слушать|to listen|v|SLOO-shat'|Я слушаю музыку.|I listen to music.
verbs|смотреть|to watch|v|smat-RYET'|Я смотрю фильм.|I watch a film.
verbs|знать|to know|v|znat'|Я знаю ответ.|I know the answer.
verbs|понимать|to understand|v|pa-nee-MAT'|Я понимаю вас.|I understand you.
verbs|любить|to love / like|v|lyu-BEET'|Я люблю кофе.|I love coffee.
verbs|хотеть|to want|v|kha-TYET'|Я хочу кофе.|I want coffee.
verbs|мочь|to be able|v|moch'|Я могу помочь.|I can help.
verbs|идти|to go (on foot)|v|ee-TEE|Я иду домой.|I'm going home.
verbs|ехать|to go (by vehicle)|v|YE-khat'|Я еду в Москву.|I'm going to Moscow.
verbs|делать|to do / make|v|DYE-lat'|Что ты делаешь?|What are you doing?
verbs|есть|to eat|v|yest'|Я хочу есть.|I want to eat.
verbs|пить|to drink|v|peet'|Я хочу пить.|I want to drink.
verbs|спать|to sleep|v|spat'|Я хочу спать.|I want to sleep.
verbs|учиться|to study|v|oo-CHEE-tsa|Я хочу учиться.|I want to study.
verbs|давать|to give|v|da-VAT'|Я хочу давать советы.|I want to give advice.
verbs|брать|to take|v|brat'|Я хочу брать уроки.|I want to take lessons.
verbs|помогать|to help|v|pa-ma-GAT'|Я хочу помогать.|I want to help.
verbs|звонить|to call|v|zva-NEET'|Я звоню маме.|I'm calling mum.
verbs|ждать|to wait|v|zhdat'|Я жду автобус.|I'm waiting for the bus.
verbs|видеть|to see|v|VEE-deet'|Я вижу море.|I see the sea.
verbs|открыть|to open|v|at-KRYT'|Я хочу открыть окно.|I want to open the window.
verbs|начать|to begin|v|na-CHAT'|Я хочу начать урок.|I want to begin the lesson.
verbs|прийти|to arrive on foot|v|pree-TEE|Я хочу прийти рано.|I want to arrive early.
adjectives|большой|big|adj|bal'-SHOY|Дом большой.|The house is big.
adjectives|маленький|small|adj|MA-leen'-kee|Дом маленький.|The house is small.
adjectives|новый|new|adj|NO-vy|Телефон новый.|The phone is new.
adjectives|старый|old|adj|STA-ry|Дом старый.|The house is old.
adjectives|хороший|good|adj|kha-RO-shee|Фильм хороший.|The film is good.
adjectives|плохой|bad|adj|pla-KHOY|Погода плохая.|The weather is bad.
adjectives|красивый|beautiful|adj|kra-SEE-vy|Город красивый.|The city is beautiful.
adjectives|высокий|tall / high|adj|vy-SO-kee|Дом высокий.|The house is tall.
adjectives|низкий|low|adj|NEES-kee|Стол низкий.|The table is low.
adjectives|длинный|long|adj|DLEEN-ny|Улица длинная.|The street is long.
adjectives|короткий|short|adj|ka-ROT-kee|Урок короткий.|The lesson is short.
adjectives|быстрый|fast|adj|BYS-try|Поезд быстрый.|The train is fast.
adjectives|медленный|slow|adj|MYED-leen-ny|Автобус медленный.|The bus is slow.
adjectives|горячий|hot (to touch)|adj|ga-RYA-chee|Чай горячий.|The tea is hot.
adjectives|холодный|cold|adj|kha-LOD-ny|Вода холодная.|The water is cold.
adjectives|дорогой|expensive / dear|adj|da-ra-GOY|Билет дорогой.|The ticket is expensive.
adjectives|дешёвый|cheap|adj|dee-SHYO-vy|Билет дешёвый.|The ticket is cheap.
adjectives|лёгкий|easy / light|adj|LYOKH-kee|Урок лёгкий.|The lesson is easy.
adjectives|трудный|difficult|adj|TROOD-ny|Урок трудный.|The lesson is difficult.
adjectives|свободный|free|adj|sva-BOD-ny|Стол свободный.|The table is free.
adjectives|занят|busy (m.)|adj|ZA-nyat|Я занят.|I'm busy.
adjectives|чистый|clean|adj|CHEES-ty|Номер чистый.|The room is clean.
adjectives|вкусный|tasty|adj|FKOOS-ny|Суп вкусный.|The soup is tasty.
adjectives|добрый|kind|adj|DOB-ry|Человек добрый.|The person is kind.
adjectives|умный|clever|adj|OOM-ny|Студент умный.|The student is clever.
adjectives|очень|very|adv|O-chen'|Это очень хорошо.|This is very good.
adjectives|тоже|also|adv|TO-zhe|Я тоже студент.|I'm also a student.
adjectives|уже|already|adv|oo-ZHE|Уже поздно.|It's already late.
adjectives|ещё|still / more|adv|yee-SHCHYO|Ещё кофе, пожалуйста.|More coffee, please.
adjectives|много|a lot|adv|MNO-ga|Тут много людей.|There are many people here.
adjectives|мало|a little|adv|MA-la|Тут мало места.|There is little room here.
connectors|и|and|conj|ee|Мама и папа дома.|Mum and dad are home.
connectors|а|and / but (contrast)|conj|ah|Я дома, а ты на работе.|I'm home, and you're at work.
connectors|но|but|conj|no|Я хочу, но не могу.|I want to, but I can't.
connectors|или|or|conj|EE-lee|Чай или кофе?|Tea or coffee?
connectors|потому что|because|conj|pa-ta-MOO shto|Я дома, потому что холодно.|I'm home because it's cold.
connectors|поэтому|so / therefore|conj|pa-E-ta-moo|Холодно, поэтому я дома.|It's cold, so I'm home.
connectors|если|if|conj|YES-lee|Если холодно, я дома.|If it's cold, I stay home.
connectors|потом|then / afterwards|adv|pa-TOM|Потом я пью кофе.|Then I drink coffee.
connectors|сначала|first|adv|SNA-cha-la|Сначала я работаю.|First I work.
connectors|наконец|finally|adv|na-ka-NYETS|Наконец я дома.|Finally I'm home.
connectors|тогда|then / in that case|adv|tag-DA|Тогда пойдём.|Then let's go.
connectors|только|only|adv|TOL'-ka|Только чай, пожалуйста.|Only tea, please.
connectors|с|with|prep|s|Я с другом.|I am with a friend.
connectors|в|in / to|prep|v|Я в городе.|I'm in the city.
connectors|на|on / at|prep|na|Книга на столе.|The book is on the table.
connectors|для|for|prep|dlya|Это для тебя.|This is for you.
connectors|без|without|prep|byez|Кофе без сахара.|Coffee without sugar.
connectors|после|after|prep|PO-slye|После работы я дома.|After work I'm home.
connectors|перед|before|prep|PYE-ryed|Перед обедом я работаю.|Before lunch I work.
connectors|здесь|here|adv|zdyes'|Здесь хорошо.|It's good here.
connectors|там|there|adv|tam|Там хорошо.|It's good there.
connectors|конечно|of course|adv|ka-NYESH-na|Конечно, да.|Of course.
connectors|может быть|maybe|phr|MO-zhet byt'|Может быть, завтра.|Maybe tomorrow.
connectors|наверное|probably|adv|na-VYE-ra-ye|Наверное, он дома.|He's probably home.
connectors|вместе|together|adv|VMYES-tye|Мы вместе.|We are together.
`;
