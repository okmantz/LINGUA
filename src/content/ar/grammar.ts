export const AR_GRAMMAR = `
## pronouns | pronouns | Pronouns | A1
S: Arabic pronouns mark gender: أنت (you, m.) vs أنتِ (you, f.). Subject pronouns are often dropped because the verb shows the person.
B: **أنا** (I), **أنتَ** (you m.), **أنتِ** (you f.), **هو** (he), **هي** (she), **نحن** (we), **هم** (they m.). Arabic is written right to left. Pronouns are separate words, but possession uses suffixes on nouns (**كتابي** = my book).
T: Person | Arabic
T: I | أنا
T: you (m.) | أنت
T: you (f.) | أنتِ
T: he / she | هو / هي
T: we | نحن
E: أنا طالب. = I am a student.
E: أنت معلمة. = You are a teacher (f.).
E: هو طبيب. = He is a doctor.
E: نحن أصدقاء. = We are friends.
M: Using one word for "you" with everyone. Choose أنتَ or أنتِ.
M: Writing left to right.
X: mcq "I" is: ? هو | *أنا | أنت | هي
X: mcq "we" is: ? هم | هي | *نحن | أنا
X: fill ___ طالب. (he) => هو
X: type she => هي
## be-verb | be-verb | "To be": no verb in the present | A1
S: There is no word for "am/is/are" in the present. Just put two words together.
B: **أنا طالب** = "I student" = I am a student. For "is not" use **ليس**: **أنا لست طالبا**. In the past, use **كان**. For "there is", use **يوجد** or **هناك**.
T: Form | Example
T: present | أنا سعيد
T: location | أنا في البيت
T: there is | هناك كتاب
E: أنا سعيد. = I am happy.
E: هو في البيت. = He is at home.
E: هناك كتاب على الطاولة. = There is a book on the table.
E: هي طبيبة. = She is a doctor.
M: Looking for a word for "am/is". It is not needed.
M: Using a verb to link two nouns in the present.
X: mcq "I am happy." ? أنا يكون سعيد | *أنا سعيد | أنا هو سعيد | أنا في سعيد
X: mcq "There is a book." ? *هناك كتاب | هو كتاب | كتاب أنا | أنت كتاب
X: fill هو ___ البيت. (in) => في
X: type I am a student (m.) => أنا طالب
## articles-gender | articles-gender | The article ال and gender | A1
S: Arabic has one definite article, ال, and no indefinite article. Nouns are masculine or feminine; most feminine nouns end in ة.
B: **كتاب** = a book, **الكتاب** = the book. **طالب** (m. student) → **طالبة** (f. student). Adjectives agree: **بيت كبير**, **مدينة كبيرة**. Before sun letters, the ل of ال is not pronounced: **الشمس** = ash-shams.
T: Masculine | Feminine
T: طالب | طالبة
T: معلم | معلمة
T: كبير | كبيرة
E: الكتاب جديد. = The book is new.
E: المدينة كبيرة. = The city is big.
E: هي معلمة. = She is a teacher.
E: هو طالب. = He is a student.
M: Adding a word for "a". Just drop ال.
M: Forgetting ة on feminine adjectives.
X: mcq "the book" ? كتاب | *الكتاب | كتابة | لكتاب
X: mcq "a big city" ? مدينة كبير | *مدينة كبيرة | المدينة كبير | مدينة الكبيرة
X: fill المدينة ___. (big, f.) => كبيرة
X: type the house => البيت
## present-regular | present-regular | Present-tense verbs | A1
S: Present verbs take a prefix for the person: أ- (I), ت- (you / she), ي- (he), ن- (we).
B: **أدرس** (I study), **تدرس** (you study / she studies), **يدرس** (he studies), **ندرس** (we study). Verbs agree with their subject. Word order: verb–subject or subject–verb.
T: Person | Study
T: I | أدرس
T: you (m.) | تدرس
T: he | يدرس
T: she | تدرس
T: we | ندرس
E: أنا أدرس العربية. = I study Arabic.
E: هو يعمل في مكتب. = He works in an office.
E: نحن نشرب القهوة. = We drink coffee.
E: هي تقرأ كتابا. = She reads a book.
M: Using the dictionary form for all subjects.
M: Mixing up أ- and ن-: أ- is "I" and ن- is "we".
X: mcq "I read" ? تقرأ | *أقرأ | يقرأ | نقرأ
X: mcq "we drink" ? أشرب | يشرب | *نشرب | تشرب
X: fill هو ___ في مكتب. (works) => يعمل
X: type I write => أكتب
## have-verb | have-verb | Having: عندي | A1
S: Arabic has no verb "to have". Use عند + a pronoun suffix.
B: **عندي** (I have), **عندك** (you have), **عنده** (he has), **عندها** (she has), **عندنا** (we have). Negative: **ليس عندي**. Example: **عندي أخ.**
T: Person | Arabic
T: I | عندي
T: you (m.) | عندك
T: he | عنده
T: she | عندها
T: we | عندنا
E: عندي أخ. = I have a brother.
E: عندها سيارة. = She has a car.
E: ليس عندي وقت. = I have no time.
E: عندنا بيت كبير. = We have a big house.
M: Saying "أنا أملك" for everyday possession.
M: Forgetting the pronoun suffix on عند.
X: mcq "I have a brother." ? أنا أخ | *عندي أخ | أخي عند | أنا عند أخ
X: mcq "She has a car." ? *عندها سيارة | عنده سيارة | عندنا سيارة | عندك سيارة
X: fill ليس ___ وقت. (I have) => عندي
X: type we have => عندنا
## negation | negation | Negation: لا, ما, ليس | A1
S: Use لا for present verbs, ليس for nouns, and لم / ما for the past.
B: **لا أعرف** (I don't know). **ليس عندي مال** (I have no money). **لست طالبا** (I'm not a student). Past negation: **لم أذهب** (I didn't go).
T: Use | Word
T: present verb | لا
T: noun / adjective | ليس
T: past | لم
E: لا أعرف. = I don't know.
E: ليس عندي مال. = I have no money.
E: أنا لست طالبا. = I'm not a student.
E: لم أذهب أمس. = I didn't go yesterday.
M: Using لا before a noun sentence. Use ليس.
M: Using ليس before a present verb.
X: mcq "I don't know." ? ليس أعرف | *لا أعرف | لم أعرف | لست أعرف
X: mcq "I have no money." ? لا عندي مال | لم عندي مال | *ليس عندي مال | ما أنا مال
X: fill ___ أعرف. (I don't) => لا
X: type no => لا
## questions | questions | Asking questions | A1
S: Make a yes/no question with هل at the start; use question words for the rest.
B: **هل أنت طالب؟** (Are you a student?). **ماذا تفعل؟** (What are you doing?). **أين المحطة؟** (Where is the station?). **متى** (when), **لماذا** (why), **كيف** (how), **كم** (how much).
T: Word | Meaning
T: هل | yes/no question
T: ماذا | what
T: أين | where
T: متى | when
T: كيف | how
E: هل أنت طالب؟ = Are you a student?
E: أين المحطة؟ = Where is the station?
E: ماذا تفعل؟ = What are you doing?
E: كم هذا؟ = How much is this?
M: Using a statement without هل.
M: Using ماذا for "where".
X: mcq "Where is the station?" ? ماذا المحطة | *أين المحطة | متى المحطة | كيف المحطة
X: mcq "Are you a student?" ? *هل أنت طالب | ماذا أنت طالب | أين أنت طالب | متى أنت طالب
X: fill ___ تفعل؟ (what) => ماذا
X: type where => أين
## want-verb | want-verb | Wanting: أريد | A1
S: أريد means "I want". Add أن + verb for "want to".
B: **أريد قهوة** (I want coffee). **أريد أن أذهب** (I want to go). **أحب** (I like): **أحب القراءة**.
T: Pattern | Example
T: want + noun | أريد قهوة
T: want to + verb | أريد أن أذهب
E: أريد قهوة. = I want coffee.
E: أريد أن أذهب. = I want to go.
E: هو يريد أن يأكل. = He wants to eat.
E: نريد ماء. = We want water.
M: Forgetting أن before a verb.
M: Using the dictionary form for all persons.
X: mcq "I want to go." ? أريد ذهب | *أريد أن أذهب | أريد أذهب | أريد الذهاب أنا
X: mcq "We want water." ? أريد ماء | يريد ماء | *نريد ماء | تريد ماء
X: fill أريد ___ أذهب. (to) => أن
X: type I want => أريد
## polite-requests | polite-requests | Polite requests | A1
S: Use من فضلك (please) and هل يمكنني (may I) to be polite.
B: **قهوة من فضلك.** **هل يمكنني أن أجلس؟** (May I sit?) **شكرا** / **عفوا**. **لو سمحت** is also common.
T: Phrase | Meaning
T: من فضلك | please
T: شكرا | thanks
T: عفوا | excuse me / you're welcome
E: قهوة من فضلك. = A coffee, please.
E: هل يمكنني أن أجلس؟ = May I sit?
E: الحساب من فضلك. = The bill, please.
E: شكرا جزيلا. = Thank you very much.
M: Ordering without من فضلك.
M: Using only a bare command.
X: mcq "A coffee, please." ? قهوة | *قهوة من فضلك | أريد قهوة فقط | هل قهوة
X: mcq "Thank you." ? عفوا | مرحبا | *شكرا | آسف
X: fill قهوة ___ فضلك. (from) => من
X: type please => من فضلك
## possessives | possessives | Possession with suffixes | A1
S: Add a pronoun suffix to a noun: كتاب + ي = كتابي (my book).
B: **كتابي** (my book), **كتابك** (your book), **كتابه** (his book), **كتابها** (her book), **كتابنا** (our book). Feminine nouns ending in ة change to ت: **سيارتي** (my car).
T: Person | Suffix
T: my | ـي
T: your (m.) | ـك
T: his | ـه
T: her | ـها
T: our | ـنا
E: هذا كتابي. = This is my book.
E: هذه سيارتي. = This is my car.
E: أخوها طبيب. = Her brother is a doctor.
E: بيتنا كبير. = Our house is big.
M: Using a separate word for "my".
M: Forgetting ة → ت before a suffix.
X: mcq "my book" ? كتاب أنا | *كتابي | الكتاب | كتابك
X: mcq "our house" ? بيتي | بيته | *بيتنا | بيتها
X: fill هذه ___ . (my car) => سيارتي
X: type his book => كتابه
## go-places | go-places | Going places | A1
S: Use أذهب إلى + place for "I go to".
B: **أذهب إلى المدرسة** (I go to school). **أنا في البيت** (I'm at home). **أنا من أمريكا** (I'm from America). Prepositions: **في** (in), **إلى** (to), **من** (from), **مع** (with).
T: Preposition | Meaning
T: في | in / at
T: إلى | to
T: من | from
T: مع | with
E: أذهب إلى المدرسة. = I go to school.
E: أنا في البيت. = I'm at home.
E: هو من مصر. = He is from Egypt.
E: أذهب مع صديقي. = I go with my friend.
M: Using في to mean "to".
M: Using من for "to".
X: mcq "I go to school." ? أذهب في المدرسة | *أذهب إلى المدرسة | أذهب من المدرسة | أذهب مع المدرسة
X: mcq "I'm from America." ? أنا إلى أمريكا | *أنا من أمريكا | أنا في أمريكا | أنا مع أمريكا
X: fill أذهب ___ المدرسة. (to) => إلى
X: type in => في
## reflexive | reflexive | Time & daily routine | A1
S: Use الساعة + a feminine number for the time: الساعة السابعة.
B: **أستيقظ في السابعة** (I wake up at seven). **أعمل ثم أشرب القهوة**. **كل يوم** (every day). **دائما** (always), **أحيانا** (sometimes).
T: Word | Meaning
T: أولا | first
T: ثم | then
T: أخيرا | finally
E: أستيقظ في السابعة. = I wake up at seven.
E: أعمل كل يوم. = I work every day.
E: أولا آكل، ثم أعمل. = First I eat, then I work.
E: أنام في الحادية عشرة. = I sleep at eleven.
M: Putting ثم before the first event.
M: Using أنام for "wake up".
X: mcq "I wake up at seven." ? أنام في السابعة | *أستيقظ في السابعة | أعمل في السابعة | آكل في السابعة
X: mcq "then" ? أولا | أخيرا | *ثم | دائما
X: fill أستيقظ ___ السابعة. (at) => في
X: type every day => كل يوم
## adjectives | adjectives | Adjectives | A1
S: Adjectives follow the noun and agree with it in gender and definiteness.
B: **بيت كبير** (a big house), **البيت الكبير** (the big house), **مدينة كبيرة** (a big city). In a sentence, the adjective has no ال: **البيت كبير** (the house is big).
T: Noun | Adjective
T: بيت | كبير
T: مدينة | كبيرة
T: البيت | الكبير
E: بيت كبير. = A big house.
E: البيت كبير. = The house is big.
E: المدينة جميلة. = The city is beautiful.
E: السيارة جديدة. = The car is new.
M: Putting the adjective before the noun.
M: Adding ال to the predicate adjective.
X: mcq "a big house" ? كبير بيت | *بيت كبير | بيت كبيرة | كبير البيت
X: mcq "The house is big." ? *البيت كبير | البيت الكبير | بيت الكبير | كبير البيت
X: fill المدينة ___. (beautiful, f.) => جميلة
X: type the new car => السيارة الجديدة
## like-verb | like-verb | Liking: أحب | A1
S: أحب means "I like / love". Add a noun or a verbal noun.
B: **أحب القهوة** (I like coffee). **أحب القراءة** (I like reading). Negative: **لا أحب**. **أكره** = I hate.
T: Pattern | Example
T: like + noun | أحب القهوة
T: like + activity | أحب القراءة
T: not like | لا أحب
E: أحب القهوة. = I like coffee.
E: هي تحب الموسيقى. = She likes music.
E: لا أحب الضجيج. = I don't like noise.
E: نحب كرة القدم. = We like football.
M: Using ليس before the verb أحب.
M: Forgetting ال before the thing you like.
X: mcq "I like coffee." ? أنا قهوة | *أحب القهوة | قهوة أحب | أحبوا القهوة
X: mcq "I don't like noise." ? ليس أحب الضجيج | *لا أحب الضجيج | لم أحب الضجيج | أحب لا الضجيج
X: fill ___ الموسيقى. (I like) => أحب
X: type I hate => أكره
## irregular-present | irregular-present | Dual and plural | A2
S: Arabic has a dual for two things: add ـان. Plurals can be regular or "broken".
B: **كتاب** → **كتابان** (two books). Regular masculine plural: **معلم → معلمون**. Feminine plural: **معلمة → معلمات**. Broken plural: **كتاب → كتب** (books), **بيت → بيوت** (houses).
T: Singular | Dual | Plural
T: كتاب | كتابان | كتب
T: بيت | بيتان | بيوت
T: معلمة | معلمتان | معلمات
E: عندي كتابان. = I have two books.
E: هذه كتب جديدة. = These are new books.
E: المعلمات في المدرسة. = The (female) teachers are at school.
E: في المدينة بيوت كثيرة. = There are many houses in the city.
M: Adding a plural for the number two.
M: Treating broken plurals as regular.
X: mcq "two books" ? كتب | *كتابان | كتابات | كتابون
X: mcq plural of بيت: ? بيتات | *بيوت | بيتون | بيتان
X: fill عندي ___ . (two books) => كتابان
X: type books => كتب
## modals | modals | Can, must, may | A2
S: Use يمكن / أستطيع for can, يجب for must, and يمكن for may.
B: **أستطيع أن أتكلم العربية** (I can speak Arabic). **يجب أن أذهب** (I must go). **هل يمكنني؟** (may I?). After these, use أن + verb.
T: Word | Meaning
T: أستطيع | I can
T: يجب | must
T: يمكن | may / possible
E: أستطيع أن أتكلم العربية. = I can speak Arabic.
E: يجب أن أذهب الآن. = I must go now.
E: هل يمكنني أن أجلس؟ = May I sit?
E: لا أستطيع أن آتي غدا. = I can't come tomorrow.
M: Forgetting أن after a modal.
M: Using لا before يجب for "must not" without checking the meaning.
X: mcq "I can speak Arabic." ? أستطيع أتكلم العربية | *أستطيع أن أتكلم العربية | أتكلم أستطيع العربية | أستطيع العربية تكلم
X: mcq "I must go." ? أستطيع أن أذهب | *يجب أن أذهب | أريد أن أذهب | أحب أن أذهب
X: fill يجب ___ أذهب. (that) => أن
X: type I can => أستطيع
## comparatives | comparatives | Comparing | A2
S: Use the pattern أفعل for "more" and the superlative, followed by من.
B: **كبير → أكبر** (bigger), **سريع → أسرع**, **جميل → أجمل**. **القطار أسرع من الحافلة** (The train is faster than the bus). **أكبر مدينة** (the biggest city).
T: Adjective | Comparative
T: كبير | أكبر
T: سريع | أسرع
T: جميل | أجمل
T: رخيص | أرخص
E: القطار أسرع من الحافلة. = The train is faster than the bus.
E: هذا أرخص من ذاك. = This is cheaper than that.
E: هي أجمل مدينة. = It's the most beautiful city.
E: البيت أكبر من الغرفة. = The house is bigger than the room.
M: Forgetting من after the comparative.
M: Adding a separate word for "more".
X: mcq "bigger" ? كبير | *أكبر | كبيرة | كبار
X: mcq "The train is faster than the bus." ? القطار سريع الحافلة | *القطار أسرع من الحافلة | القطار أسرع الحافلة | القطار من أسرع الحافلة
X: fill القطار أسرع ___ الحافلة. (than) => من
X: type cheaper => أرخص
## past-perfect | past-perfect | Past tense | A2
S: The past is formed with endings: -تُ for "I", -تَ for "you", no ending for "he".
B: **ذهبتُ** (I went), **ذهبتَ** (you went), **ذهبَ** (he went), **ذهبتْ** (she went), **ذهبنا** (we went). **أكلتُ** (I ate), **شاهدتُ** (I watched).
T: Person | Went
T: I | ذهبتُ
T: you (m.) | ذهبتَ
T: he | ذهبَ
T: she | ذهبتْ
T: we | ذهبنا
E: ذهبت إلى السوق أمس. = I went to the market yesterday.
E: شاهدنا فيلما. = We watched a film.
E: هي أكلت السمك. = She ate the fish.
E: هو ذهب إلى العمل. = He went to work.
M: Using the present form with أمس.
M: Forgetting the personal ending.
X: mcq "I went" ? أذهب | *ذهبت | يذهب | سأذهب
X: mcq "We watched" ? شاهدت | شاهد | *شاهدنا | تشاهد
X: fill ___ إلى السوق أمس. (I went) => ذهبت
X: type we went => ذهبنا
## past-2 | past-2 | Past stories | A2
S: Use كان + verb for "was doing". Use ثم, بعد ذلك and أخيرا to order events.
B: **كنت أعمل** (I was working). **كان الجو حارا** (the weather was hot). **ثم** (then), **بعد ذلك** (after that), **أخيرا** (finally).
T: Word | Meaning
T: كان | was
T: ثم | then
T: أخيرا | finally
E: كان الجو حارا. = The weather was hot.
E: أولا ذهبت إلى المتحف، ثم أكلت. = First I went to the museum, then I ate.
E: أخيرا عدنا إلى البيت. = Finally we returned home.
E: كنت أعمل في المكتب. = I was working in the office.
M: Using ليس instead of كان for the past of "is".
M: Using the present tense in a past story.
X: mcq "The weather was hot." ? ليس الجو حارا | *كان الجو حارا | الجو كان حار | يكون الجو حارا
X: mcq "Finally we returned." ? ثم عدنا | *أخيرا عدنا | أولا عدنا | دائما عدنا
X: fill ___ الجو حارا. (was) => كان
X: type then => ثم
## future-near | future-near | Future: سـ and سوف | A2
S: Add سـ before a present verb to make the future, or use سوف.
B: **سأذهب غدا** (I will go tomorrow). **سنسافر** (we will travel). **سوف أعمل** (I will work). With **أريد** and a time word, you can also say your plans.
T: Form | Example
T: سـ + verb | سأذهب
T: سوف + verb | سوف أذهب
E: سأذهب غدا. = I will go tomorrow.
E: سنسافر في الصيف. = We will travel in summer.
E: سوف أعمل الأسبوع القادم. = I will work next week.
E: هي ستأتي مساء. = She will come in the evening.
M: Using the past form for the future.
M: Putting سـ after the verb.
X: mcq "I will go." ? ذهبت | أذهب | *سأذهب | ذهب
X: mcq "We will travel." ? سافرنا | *سنسافر | نسافر | سافر
X: fill ___ غدا. (I will go) => سأذهب
X: type tomorrow => غدا
## object-pronouns | object-pronouns | Object suffixes | A2
S: Attach the object pronoun to the verb: أراه (I see him).
B: **أراه** (I see him), **أراها** (I see her), **يساعدني** (he helps me), **أعرفك** (I know you). Suffixes: **ـني** (me), **ـك** (you), **ـه** (him), **ـها** (her), **ـنا** (us).
T: Suffix | Meaning
T: ـني | me
T: ـك | you
T: ـه | him
T: ـها | her
T: ـنا | us
E: أراه كل يوم. = I see him every day.
E: هو يساعدني. = He helps me.
E: أعرفك. = I know you.
E: هي تحبنا. = She loves us.
M: Writing a separate word for the object.
M: Using ـي instead of ـني on a verb.
X: mcq "He helps me." ? يساعد أنا | *يساعدني | يساعده | يساعدك
X: mcq "I know you." ? أعرفني | *أعرفك | أعرفه | أعرفنا
X: fill هي ___ . (she loves us) => تحبنا
X: type him (suffix) => ـه
## connectors-opinions | connectors-opinions | Joining ideas & opinions | A2
S: Join ideas with و, لكن, لأن and لذلك. Give opinions with أعتقد أن and في رأيي.
B: **أعتقد أنه جيد** (I think it's good). **في رأيي** (in my opinion). **لأن** (because), **لذلك** (so), **لكن** (but), **إذا** (if).
T: Word | Meaning
T: لكن | but
T: لأن | because
T: لذلك | so
T: إذا | if
E: أعتقد أنه جيد. = I think it's good.
E: أنا في البيت لأن الجو بارد. = I'm at home because it's cold.
E: الجو بارد لذلك أنا في البيت. = It's cold, so I'm at home.
E: إذا نزل المطر أبقى في البيت. = If it rains I stay home.
M: Confusing لأن (because) and لذلك (so).
M: Forgetting أن after أعتقد.
X: mcq "because" ? لكن | *لأن | لذلك | أو
X: mcq "so (therefore)" ? لأن | لكن | *لذلك | إذا
X: fill أعتقد ___ جيد. (that it is) => أنه
X: type but => لكن
`;
