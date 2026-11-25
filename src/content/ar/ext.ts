// Arabic (MSA) extension: more B1–C2 material. Machine-drafted: have a native speaker review idioms, vowelling and register notes.
export const AR_VOCAB_EXT = `
connectors|بالإضافة إلى ذلك|in addition, besides|phr|bil-iḍāfa ilā dhālik|بالإضافة إلى ذلك، في الشقة شرفة.|In addition, the flat has a balcony.|B1
connectors|ومع ذلك|nevertheless|phr|wa-maʿa dhālik|الوقت متأخر، ومع ذلك سأذهب.|It's late, nevertheless I'll go.|B1
connectors|لذلك|therefore|adv|li-dhālik|كنت مريضًا، لذلك بقيت في البيت.|I was ill, so I stayed home.|B1
work|الراتب|salary|n|ar-rātib|راتبي يرتفع كل سنة.|My salary rises every year.|B1
work|الموعد النهائي|deadline|n|al-mawʿid an-nihāʾī|الموعد النهائي يوم الجمعة.|The deadline is Friday.|B1
work|وظّف|to employ, hire|v|waẓẓafa|الشركة ستوظّف ثلاثة أشخاص.|The company will hire three people.|B1
verbs|تذكّر|to remember|v|tadhakkara|تذكّرت اسمه.|I remembered his name.|B1
verbs|لاحظ|to notice|v|lāḥaẓa|لاحظت الخطأ.|I noticed the mistake.|B1
verbs|اعتاد على|to get used to|v|iʿtāda ʿalā|اعتدت على الطقس هنا.|I got used to the weather here.|B1
society|عدم المساواة|inequality|n|ʿadam al-musāwāh|عدم المساواة يزداد.|Inequality is increasing.|B2
society|الحيّ|neighbourhood|n|al-ḥayy|هذا حيّ هادئ.|This is a quiet neighbourhood.|B2
verbs|أكّد|to emphasise, confirm|v|akkada|أريد أن أؤكّد هذه النقطة.|I want to emphasise this point.|B2
verbs|حقّق|to achieve|v|ḥaqqaqa|حقّقت هدفها.|She achieved her goal.|B2
verbs|ادّعى|to claim|v|iddaʿā|ادّعى أنه لا يعرف شيئًا.|He claimed he knew nothing.|B2
adjectives|ضروري|necessary|adj|ḍarūrī|هذه الوثيقة ضرورية.|This document is necessary.|B2
verbs|شكّك في|to cast doubt on|v|shakkaka fī|لم يشكّك أحد في قراره.|Nobody questioned his decision.|C1
adjectives|لا مفرّ منه|unavoidable|phr|lā mafarra minhu|التغيير لا مفرّ منه.|Change is unavoidable.|C1
society|التحدّي|challenge|n|at-taḥaddī|تغيّر المناخ تحدٍّ عالمي.|Climate change is a global challenge.|C1
connectors|رغم ذلك|even so|phr|raghma dhālik|رغم ذلك، المشروع مستمر.|Even so, the project continues.|C1
connectors|خلاصة القول|in short|phr|khulāṣat al-qawl|خلاصة القول، لا يوجد حلّ سهل.|In short, there is no easy solution.|C1
adjectives|زائل|fleeting, transient|adj|zāʾil|الشهرة زائلة.|Fame is fleeting.|C2
verbs|دعا إلى|to call for, advocate|v|daʿā ilā|يدعو الخبراء إلى الحذر.|Experts call for caution.|C2
society|الضرر|harm, damage|n|aḍ-ḍarar|ألحق ذلك ضررًا بصحته.|That did damage to his health.|C2
connectors|نظرًا لـ|in view of|phr|naẓaran li-|نظرًا للوضع، نؤجّل الاجتماع.|In view of the situation, we postpone the meeting.|C2
`;
export const AR_GRAMMAR_EXT = `
## ext-conditional | ext-conditional | Conditional sentences: إذا, إن, لو | B1
S: إذا + past verb means "if / when" for likely situations (the result is future). لو + past verb is for unreal or hypothetical situations, and the result clause often takes ل.
B: **إذا درستَ نجحتَ.** (If you study, you'll pass.) **لو عرفتُ لجئتُ.** (If I had known, I'd have come.) **إن** is more formal and for possible conditions: إن شاء الله. The verb after إذا / لو is in the past form even though the meaning is present or future.
E: إذا أمطرت السماء بقيتُ في البيت. = If it rains, I'll stay home.
E: لو كنتُ غنيًا لاشتريتُ بيتًا. = If I were rich, I'd buy a house.
E: لو عرفتُ لجئتُ. = If I had known, I'd have come.
E: إن زرتَني فأهلًا بك. = If you visit me, you're welcome.
M: Using the present tense after إذا for a future condition: use the past form.
M: Mixing لو and إذا: لو is unreal, إذا is real.
X: mcq ___ درستَ نجحتَ. ? لو | *إذا | لكن | ثم
X: mcq ___ كنتُ غنيًا لاشتريتُ بيتًا. ? إذا | *لو | إن | أو
X: fill ___ عرفتُ لجئتُ. => لو
X: type Say: "If it rains, I'll stay home." => إذا أمطرت السماء بقيتُ في البيت
## ext-passive | ext-passive | The passive voice (المبني للمجهول) | B2
S: Arabic marks the passive by changing the vowels, not by adding a word: past كُتِبَ (it was written), present يُكتَبُ (it is written). The agent is normally left out.
B: **Past passive:** damma on the first letter, kasra on the one before last: كَتَبَ → كُتِبَ. **Present passive:** damma on the prefix, fatha on the second-last radical: يَكتُبُ → يُكتَبُ. The patient becomes the subject: كُتِبَ الكتابُ.
E: كُتِبَ الكتابُ في سنة ١٩٩٠. = The book was written in 1990.
E: يُباعُ الخبزُ هنا. = Bread is sold here.
E: فُتِحَ البابُ. = The door was opened.
E: يُقالُ إن الطقس سيكون باردًا. = It is said that the weather will be cold.
M: Adding an agent with ب or من: Arabic usually leaves the agent out.
M: Using the active for general statements: يُباع is more natural than يبيعون.
X: mcq كُتِبَ ___ في سنة ١٩٩٠. (the book) ? الكتابَ | *الكتابُ | الكتابِ | كتابًا
X: mcq Which is the passive of بَاعَ (he sold)? ? بَاعَ | *بِيعَ | يَبيعُ | بائعٌ
X: fill فُتِحَ ___. (the door) => البابُ
X: type Say: "It is said that the weather will be cold." => يُقالُ إن الطقس سيكون باردًا
## ext-forms | ext-forms | Derived verb forms (الأوزان) | C1
S: Most verbs come from a three-letter root with a pattern (form I–X) that changes the meaning: II intensive or causative, III reciprocal, IV causative, V reflexive of II, VI mutual, VII passive-like, VIII reflexive, X request or consider.
B: From the root د-ر-س: **دَرَسَ** (studied, I) → **دَرَّسَ** (taught, II) → **تَدَارَسَ** (studied together, VI) → **اِسْتَدْرَسَ** (not common). From ك-ت-ب: **كَتَبَ** (wrote) → **كاتَبَ** (corresponded, III) → **اكتتَبَ** (subscribed, VIII) → **اِسْتَكْتَبَ** (asked to write, X).
E: عَلِمَ ← عَلَّمَ ← تَعَلَّمَ = to know / to teach / to learn
E: خَرَجَ ← أَخْرَجَ = to go out / to take out
E: كَسَرَ ← اِنْكَسَرَ = to break (tr.) / to break (intr.)
E: خَدَمَ ← اِسْتَخْدَمَ = to serve / to use
M: Assuming every form exists for every root.
M: Forgetting the long vowel in form III: كاتَبَ, not كَتَّبَ.
X: mcq Which form means "to teach" (causative of "to know")? ? عَلِمَ | *عَلَّمَ | تَعَلَّمَ | عالَمَ
X: mcq اِنْكَسَرَ is ___. ? causative | *passive-like (intransitive) | reciprocal | a request
X: fill تَعَلَّمَ = to ___. => learn
X: type Which verb means "to use" (from خدم)? => اِسْتَخْدَمَ
`;
export const AR_CONVS_EXT = `
## ext-b1-landlord | ext-b1-landlord | Renting a flat | B1 | You call about a flat for rent.
N: مرحبًا، هنا مكتب العقارات. = Hello, this is the real estate office.
Y: مرحبًا، أتصل بخصوص الشقة في الإعلان. هل ما زالت متاحة؟ = Hello, I'm calling about the flat in the ad. Is it still available? || أريد تذكرة قطار. = I want a train ticket. || أين المحطة؟ = Where is the station? :: الشقة,الإعلان,متاحة
N: نعم، الإيجار ستمئة يورو في الشهر شامل الخدمات. = Yes, rent is six hundred euros a month including services.
Y: هل يمكنني رؤيتها في نهاية هذا الأسبوع؟ = Can I see it this weekend? || أرى الشقة أمس. = I see the flat yesterday. || الحليب غالٍ. = Milk is expensive. :: نهاية,رؤيتها
N: بالتأكيد. يوم السبت الساعة الحادية عشرة؟ = Certainly. Saturday at eleven?
Y: نعم، مناسب. أراك يوم السبت. = Yes, that suits me. See you Saturday. || لا أتذكر شيئًا. = I don't remember anything. || مع السلامة إلى أمس. = Goodbye until yesterday. :: مناسب,السبت
## ext-c1-interview | ext-c1-interview | A radio interview | C1 | You are interviewed about a social issue.
N: يقول بعضهم إن مشكلة السكن لا حلّ لها. ما رأيك؟ = Some say the housing problem has no solution. What do you think?
Y: لا أوافق؛ إنها تحدٍّ كبير، لكن بعض الإجراءات أثبتت نجاحها. = I disagree; it's a big challenge, but some measures have proved successful. || إنها تحدٍّ ولكن هناك إجراءات. = (flatter) || لا حلّ لأنه لا حلّ. = No solution because there's no solution. :: تحدٍّ,إجراءات
N: مثل ماذا؟ = Such as what?
Y: تحديد الإيجارات السياحية وبناء مساكن عامة أكثر. = Limiting tourist rentals and building more public housing. || أستأجر السوق غدًا. = I rent the market tomorrow. || كل شيء غالٍ لأنه غالٍ. = Everything is expensive because it's expensive. :: الإيجارات,مساكن
N: شكرًا على وقتك. = Thanks for your time.
Y: العفو، كان من دواعي سروري. = You're welcome, it was my pleasure. || مع السلامة أمس. = Goodbye yesterday. || لا يهم. = It doesn't matter. :: العفو,سروري
`;
export const AR_READING_EXT = `
## ext-r-b2-city | ext-r-b2 | مدينة الخمس عشرة دقيقة | B2
P: يقترح بعض المخطّطين العمرانيين أن يتمكّن كل ساكن من قضاء حاجاته الأساسية سيرًا على الأقدام خلال خمس عشرة دقيقة. والهدف من الفكرة تقليل حركة المرور ودعم المتاجر الصغيرة في الحيّ. = Some urban planners propose that every resident can meet their basic needs on foot within fifteen minutes. The aim of the idea is to reduce traffic and support small shops in the neighbourhood.
P: لكن النقّاد يشيرون إلى أنه لا يمكن إعادة تنظيم كل مدينة بهذه الطريقة، وإلى أن أسعار المساكن قد ترتفع في الأحياء الأفضل تجهيزًا. = But critics note that not every city can be reorganised this way, and that housing prices may rise in the best-equipped neighbourhoods.
G: المخطّط = planner ; الحاجات = needs ; تجهيز = equipment
Q: mcq لماذا قد ترتفع الأسعار؟ ? لأن حركة المرور تقلّ | *لأن الأحياء المجهّزة جيدًا تصبح أكثر طلبًا | لأن المتاجر الصغيرة تغلق | لأن كل ساكن يمشي خمس عشرة دقيقة
Q: mcq ماذا يُراد تقليله؟ ? المتاجر | *حركة المرور | الأحياء | المساكن
Q: mcq ما هدف الفكرة؟ ? زيادة السيارات | *قضاء الحاجات قرب البيت | تقليل المتاجر | رفع الأسعار
## ext-r-c1-memory | ext-r-c1 | الذاكرة الانتقائية | C1
P: يظن كثيرون أن التذكّر يعني إعادة الماضي كما كان، لكن دراسات عديدة تُظهر العكس: ففي كل مرة نستدعي فيها ذكرى نعيد بناءها ونغيّرها بهدوء أثناء ذلك. = Many people think remembering means replaying the past as it was, but numerous studies show the opposite: each time we call up a memory we rebuild it and quietly change it in the process.
P: وهذا يفسّر لماذا يروي شاهدان على الحدث نفسه روايتين مختلفتين دون أن يكذب أي منهما. = This explains why two witnesses to the same event can tell different accounts without either lying.
G: استدعى = to call up ; بنى = to build ; شاهد = witness
Q: mcq ماذا تُظهر الدراسات؟ ? أن التذكّر إعادة للماضي كما كان | *أننا نعيد بناء الذكرى عند استدعائها | أن الشاهدين يكذبان دائمًا | أن الذكريات لا تتغيّر أبدًا
Q: mcq لماذا تتغيّر الذكرى؟ ? لأننا نعيد الماضي كما كان | *لأننا نعيد بناءها في كل مرة نستدعيها | لأن الشاهدين يرويان روايتين | لأن أحدهما يكذب
Q: mcq ما نتيجة إعادة البناء عند التذكّر؟ ? إعادة الماضي كما كان | *تغيّر الذكرى بهدوء | قول الشاهدين الحقيقة دائمًا | كذب أحد الشاهدين
`;
export const AR_LISTENING_EXT = `
## ext-l-b2-radio | ext-l-b2 | نقاش إذاعي | B2
L: المذيعة: نتحدث اليوم عن العمل عن بُعد. ما رأيك يا كريم؟ = Today we talk about remote work. What do you think, Karim?
L: كريم: أعتقد أنه جلب فوائد كثيرة، لكنه لا يناسب كل القطاعات. = I think it has brought many benefits, but it doesn't suit every sector.
L: المذيعة: وما السلبيات؟ = And the downsides?
L: كريم: أهمها العزلة وصعوبة الفصل بين العمل والحياة الخاصة. = The main ones are isolation and the difficulty of separating work from private life.
L: المذيعة: شكرًا جزيلًا يا كريم. = Thank you very much, Karim.
Q: mcq عن ماذا يتحدثون؟ ? عن المرور | *عن العمل عن بُعد | عن السياحة | عن الطبخ
Q: mcq ما السلبية التي ذكرها كريم؟ ? الراتب | *العزلة | المرور | ساعات العمل
## ext-l-c1-lecture | ext-l-c1 | محاضرة | C1
L: الأستاذة: أودّ أن أؤكّد أن تغيّر اللغة ليس فسادًا بل تطوّر طبيعي. = I'd like to stress that language change is not corruption but natural development.
L: الأستاذة: كلمات تبدو لنا اليوم خاطئة كانت عادية قبل قرون. = Words that seem wrong to us today were ordinary centuries ago.
L: الطالب: إذن لا وجود للخطأ في اللغة؟ = So there's no such thing as error in language?
L: الأستاذة: القاعدة موجودة، لكنها تتغيّر مع الاستعمال. = The rule exists, but it changes with use.
Q: mcq ماذا تؤكّد الأستاذة؟ ? أن التغيّر فساد | *أن التغيّر تطوّر طبيعي | أنه لا توجد قاعدة | أن شيئًا لا يتغيّر
Q: mcq ماذا تقول عن القاعدة؟ ? ثابتة | *تتغيّر مع الاستعمال | غير موجودة | مجرد رأي
`;
export const AR_WRITING_EXT = `
## w-ext-b2-email | ext-w-b2 | A formal enquiry | B2 | 60
T: Write a formal email (8–10 lines) to a language school asking about courses, price and dates. Use a formal greeting and polite forms (أودّ أن، هل يمكنكم).
R: Greeting = السيد المحترم, تحية طيبة وبعد ; Request = أودّ أن, هل يمكنكم ; Question = ما الرسوم, متى تبدأ ; Closing = مع خالص الشكر, وتفضّلوا بقبول فائق الاحترام
M: تحية طيبة وبعد، أودّ أن أستفسر عن دورات اللغة العربية في الفصل القادم. هل يمكنكم إخباري بالرسوم وموعد البدء؟ كما أودّ أن أعرف إن كانت هناك دورات مسائية. مع خالص الشكر، أحمد علي. = Greetings, I'd like to ask about Arabic courses next term. Could you tell me the fees and start date? I'd also like to know if there are evening courses. With sincere thanks, Ahmad Ali.
## w-ext-c1-essay | ext-w-c1 | An argumentative essay | C1 | 90
T: Write 12–15 lines arguing for or against a four-day working week. Use a concession (رغم أن، مع أن), a hypothesis (لو، إذا) and a formal connector (ومع ذلك، خلاصة القول).
R: Concession = رغم أن, مع أن ; Hypothesis = لو, إذا ; Connector = ومع ذلك, خلاصة القول, لذلك ; Opinion = في رأيي, أرى أن
M: في رأيي، أسبوع العمل من أربعة أيام يرفع الإنتاجية. ورغم أن بعض القطاعات لا تستطيع تطبيقه، فإذا طُبّق بمرونة قلّ تعب الموظفين. ومع ذلك يجب تقييم التكاليف. خلاصة القول، التجربة تستحق العناء. = In my opinion a four-day week raises productivity. Although some sectors can't apply it, if applied flexibly employees will tire less. Nevertheless, costs must be evaluated. In short, the trial is worth the effort.
`;
export const AR_PLACEMENT_EXT = `
vocabulary | B1 | - | mcq "الموعد النهائي يوم الجمعة" means ___. ? the price drops | *the deadline is Friday | the place closes | the plan starts
grammar | B1 | - | mcq ___ درستَ نجحتَ. ? لو | *إذا | لكن | ثم
grammar | B2 | - | mcq كُتِبَ ___ في سنة ١٩٩٠. ? الكتابَ | *الكتابُ | الكتابِ | كتابًا
vocabulary | B2 | - | mcq "أكّد" means ___. ? to lose | *to emphasise | to leave | to read
grammar | C1 | - | mcq Which verb means "to teach"? ? عَلِمَ | *عَلَّمَ | تَعَلَّمَ | عالَمَ
vocabulary | C1 | - | mcq "رغم ذلك" is closest to ___. ? لذلك | *ومع ذلك | بالإضافة إلى ذلك | لأن
vocabulary | C2 | - | mcq "زائل" means ___. ? eternal | *fleeting | strong | clear
vocabulary | C2 | - | mcq "نظرًا لـ" means ___. ? despite | *in view of | in front of | instead of
`;
