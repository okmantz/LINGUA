// Swahili depth pack (A2 → C2: noun-class agreement, locatives, aspect, relatives, reported speech, stative verbs, registers, methali). Machine-drafted: have a native speaker review idioms and register notes.
export const SW_VOCAB_DEEP = `
travel|kituo cha basi|bus station|n|kee-TOO-o cha BA-see|Kituo cha basi kiko karibu na soko.|The bus station is near the market.|A2
travel|forodha|customs|n|fo-RO-dha|Tulipitia forodha bila shida.|We went through customs without trouble.|A2
travel|kuhifadhi|to reserve, to store|v|ku-hee-FA-dhee|Nilitaka kuhifadhi meza kwa watu wanne.|I wanted to reserve a table for four.|A2
shopping|kurudisha|to return, to give back|v|ku-roo-DEE-sha|Nataka kurudisha shati hii.|I want to return this shirt.|A2
shopping|kulalamika|to complain|v|ku-la-la-MEE-ka|Hapendi kulalamika mbele ya wateja.|He doesn't like to complain in front of customers.|A2
objects|bomba|pipe, tap|n|BOM-ba|Bomba la jikoni linavuja.|The kitchen tap is leaking.|A2
objects|kuvuja|to leak|v|ku-VOO-ja|Paa lilianza kuvuja jana usiku.|The roof started to leak last night.|A2
objects|kukatika|to be cut off, to break|v|ku-ka-TEE-ka|Umeme unaweza kukatika usiku.|The power can go off at night.|A2
health|kutapika|to vomit|v|ku-ta-PEE-ka|Mtoto alianza kutapika usiku.|The child started vomiting at night.|A2
time|juzi|day before yesterday|adv|JOO-zee|Nilimwona juzi sokoni.|I saw him the day before yesterday at the market.|A2
time|kesho kutwa|day after tomorrow|adv|KE-sho KOO-twa|Tutaonana kesho kutwa.|We'll meet the day after tomorrow.|A2
work|kuomba kazi|to apply for a job|phr|ku-O-m-ba KA-zee|Ninataka kuomba kazi benki.|I want to apply for a job at a bank.|B1
work|barua pepe|email|n|BA-roo-a PE-pe|Nitakutumia barua pepe leo.|I'll send you an email today.|B1
work|likizo|leave, holiday|n|lee-KEE-zo|Ninachukua likizo wiki ijayo.|I'm taking leave next week.|B1
work|kustaafu|to retire|v|koo-sta-A-foo|Baba anataka kustaafu mwakani.|Father wants to retire next year.|B1
work|msimamizi|supervisor|n|m-see-ma-MEE-zee|Msimamizi wangu ni mkali kidogo.|My supervisor is a little strict.|B1
work|mtihani|exam|n|m-tee-HA-nee|Mtihani ni kesho asubuhi.|The exam is tomorrow morning.|B1
work|kufaulu|to pass, to succeed|v|koo-fa-OO-loo|Alifanya bidii ili kufaulu mtihani.|He worked hard in order to pass the exam.|B1
work|kufeli|to fail|v|ku-FE-lee|Hakutaka kufeli mtihani wa mwisho.|He didn't want to fail the final exam.|B1
society|raia|citizen|n|ra-EE-a|Kila raia ana wajibu wake.|Every citizen has his duty.|B1
emotions|kuwa na wasiwasi|to be worried|phr|ku-WA na wa-see-WA-see|Hakuna sababu ya kuwa na wasiwasi.|There's no reason to be worried.|B1
emotions|kujivunia|to be proud of|v|ku-jee-voo-NEE-a|Ana haki ya kujivunia kazi yake.|She has the right to be proud of her work.|B1
nature|ukame|drought|n|oo-KA-me|Ukame umeathiri mazao mengi.|The drought has affected many crops.|B1
nature|mafuriko|floods|n|ma-foo-REE-ko|Mafuriko yaliharibu barabara kuu.|The floods destroyed the main road.|B1
objects|simu janja|smartphone|n|SEE-moo JAN-ja|Ana simu janja mpya.|He has a new smartphone.|B1
objects|mtandao|internet, network|n|m-TA-n-da-o|Mtandao ni wa polepole leo.|The internet is slow today.|B1
objects|kupakua|to download|v|ku-pa-KOO-a|Naweza kupakua programu hii bure.|I can download this app for free.|B1
society|ukosefu wa ajira|unemployment|n|oo-ko-SE-foo wa a-JEE-ra|Ukosefu wa ajira ni tatizo kubwa vijijini.|Unemployment is a big problem in the villages.|B2
society|rushwa|bribery|n|ROO-sh-wa|Rushwa inaharibu uchumi wa nchi.|Bribery ruins a country's economy.|B2
society|ufisadi|corruption|n|oo-fee-SA-dee|Ufisadi umeongeza gharama za miradi.|Corruption has increased project costs.|B2
society|mfumuko wa bei|inflation|n|m-foo-MOO-ko wa BE-ee|Mfumuko wa bei unawaumiza wananchi.|Inflation is hurting the people.|B2
verbs|kupendekeza|to recommend, to propose|v|ku-pe-n-de-KE-za|Nilitaka kupendekeza mpango mwingine.|I wanted to propose another plan.|B2
verbs|kukubaliana|to agree|v|ku-koo-ba-lee-A-na|Hatukuweza kukubaliana kuhusu bei.|We couldn't agree about the price.|B2
verbs|kupinga|to oppose|v|ku-PEE-n-ga|Wakazi walijitokeza kupinga mradi huo.|The residents turned out to oppose that project.|B2
verbs|kuchambua|to analyse|v|ku-cham-BOO-a|Tunahitaji kuchambua takwimu kwanza.|We need to analyse the statistics first.|B2
society|takwimu|statistics|n|ta-KWEE-moo|Takwimu zinaonyesha ongezeko la bei.|The statistics show a rise in prices.|B2
society|ushahidi|evidence, testimony|n|oo-sha-HEE-dee|Hakuna ushahidi wa kutosha.|There isn't enough evidence.|B2
adjectives|dhahiri|obvious|adj|dha-HEE-ree|Ni dhahiri kuwa mpango umeshindwa.|It's obvious that the plan has failed.|B2
adjectives|endelevu|sustainable|adj|e-n-de-LE-voo|Tunahitaji maendeleo endelevu.|We need sustainable development.|B2
connectors|isipokuwa|except, unless|conj|ee-see-po-KOO-wa|Wote walikuja isipokuwa Juma.|Everyone came except Juma.|B2
connectors|badala ya|instead of|phr|ba-DA-la ya|Badala ya kulalamika, tafuta suluhisho.|Instead of complaining, look for a solution.|B2
verbs|kusuluhisha|to resolve, to settle|v|ku-soo-loo-HEE-sha|Wanajaribu kusuluhisha mgogoro huo.|They are trying to resolve that dispute.|C1
verbs|kuzuia|to prevent|v|ku-ZOO-ee-a|Hatua hizi zitasaidia kuzuia maambukizi.|These measures will help prevent infection.|C1
verbs|kuchochea|to stimulate, to incite|v|ku-cho-CHE-a|Bei ya mafuta inaweza kuchochea mfumuko wa bei.|The fuel price can stimulate inflation.|C1
verbs|kuimarisha|to strengthen|v|ku-ee-ma-REE-sha|Lengo ni kuimarisha uhusiano wa nchi hizo.|The aim is to strengthen relations between those countries.|C1
verbs|kukiri|to admit|v|ku-KEE-ree|Hakuona aibu kukiri kosa lake.|He wasn't ashamed to admit his mistake.|C1
verbs|kukanusha|to deny, to refute|v|ku-ka-NOO-sha|Msemaji hakusita kukanusha madai hayo.|The spokesman did not hesitate to deny those claims.|C1
society|mgogoro|dispute, crisis|n|m-go-GO-ro|Mgogoro huo umedumu miaka mingi.|That dispute has lasted many years.|C1
society|dhana|notion, concept|n|DHA-na|Dhana hiyo ni ngeni kwa wengi.|That notion is new to many.|C1
society|mtazamo|viewpoint|n|m-ta-ZA-mo|Mtazamo wake ni tofauti na wetu.|His viewpoint differs from ours.|C1
society|mchango|contribution|n|m-CHA-n-go|Mchango wake ni muhimu sana.|His contribution is very important.|C1
adjectives|tata|complicated|adj|TA-ta|Suala hili ni tata.|This matter is complicated.|C1
adjectives|dhaifu|weak|adj|dha-EE-foo|Hoja yake ni dhaifu.|His argument is weak.|C1
adjectives|thabiti|firm, solid|adj|tha-BEE-tee|Msimamo wake ni thabiti.|His stance is firm.|C1
connectors|japo|even though|conj|JA-po|Japo ni ghali, nitainunua.|Even though it's expensive, I'll buy it.|C1
connectors|kwa upande mwingine|on the other hand|phr|kwa oo-PA-n-de mwee-N-GEE-nee|Kwa upande mwingine, gharama zimepungua.|On the other hand, costs have fallen.|C1
society|kupiga moyo konde|to steel oneself|phr|ku-PEE-ga MO-yo KO-n-de|Ilibidi kupiga moyo konde na kusema ukweli.|He had to steel himself and tell the truth.|C2
society|kuvunja moyo|to dishearten|phr|ku-VOO-n-ja MO-yo|Matokeo hayo yanaweza kuvunja moyo.|Those results can be disheartening.|C2
society|kuvuta subira|to be patient|phr|ku-VOO-ta soo-BEE-ra|Tulilazimika kuvuta subira hadi jioni.|We had to be patient until the evening.|C2
society|haraka haraka haina baraka|haste has no blessing|phr|ha-RA-ka ha-RA-ka ha-EE-na ba-RA-ka|Methali husema: haraka haraka haina baraka.|The proverb says: haste has no blessing.|C2
society|subira huvuta heri|patience draws good fortune|phr|soo-BEE-ra hoo-VOO-ta HE-ree|Subira huvuta heri, kwa hiyo tulia.|Patience draws good fortune, so calm down.|C2
society|mwenye macho haambiwi tazama|one with eyes isn't told to look|phr|MWE-nye MA-cho ha-a-M-BEE-wee ta-ZA-ma|Mwenye macho haambiwi tazama; ukweli uko wazi.|The one with eyes isn't told to look; the truth is plain.|C2
society|kinaya|irony|n|kee-NA-ya|Hadithi hii imejaa kinaya.|This story is full of irony.|C2
society|tashbihi|simile|n|ta-sh-BEE-hee|Mshairi alitumia tashbihi nzuri.|The poet used a fine simile.|C2
society|taswira|imagery|n|ta-SWEE-ra|Taswira ya shairi hili ni angavu.|The imagery of this poem is vivid.|C2
verbs|kunukuu|to quote|v|ku-noo-KOO-oo|Mwandishi alipenda kunukuu methali.|The writer liked to quote proverbs.|C2
verbs|kuchanganua|to dissect, to analyse in detail|v|ku-cha-n-ga-NOO-a|Wakosoaji hupenda kuchanganua kazi hizi.|Critics like to analyse these works.|C2
adjectives|dhalimu|oppressive, tyrannical|adj|dha-LEE-moo|Alikuwa mtawala dhalimu.|He was a tyrannical ruler.|C2
adjectives|fasaha|eloquent, fluent|adj|fa-SA-ha|Anaongea Kiswahili fasaha.|She speaks eloquent Swahili.|C2
adjectives|sanifu|standard|adj|sa-NEE-foo|Kiswahili sanifu hutumika shuleni.|Standard Swahili is used in schools.|C2
travel|kivuko|ferry, crossing|n|kee-VOO-ko|Kivuko kinaondoka kila nusu saa.|The ferry leaves every half hour.|A2
travel|nauli|fare|n|na-OO-lee|Nauli ya basi imepanda.|The bus fare has gone up.|A2
shopping|kuuza nje|to export|phr|ku-OO-za N-je|Nchi hii ina uwezo wa kuuza nje chai.|This country is able to export tea.|B2
health|kuchanjwa|to be vaccinated|v|ku-cha-N-jwa|Watoto wanapaswa kuchanjwa mapema.|Children should be vaccinated early.|B1
society|haki za binadamu|human rights|phr|HA-kee za bee-na-DA-moo|Wanaharakati wanatetea haki za binadamu.|Activists defend human rights.|B2
verbs|kudhibiti|to control, regulate|v|ku-dhee-BEE-tee|Serikali inajaribu kudhibiti bei.|The government is trying to control prices.|C1
verbs|kuhoji|to question, interrogate|v|ku-HO-jee|Waandishi walianza kuhoji uamuzi huo.|Journalists began to question that decision.|C1
society|ubaguzi|discrimination|n|oo-ba-GOO-zee|Ubaguzi wa rangi ni kosa kubwa.|Racial discrimination is a grave wrong.|C1
society|ukabila|tribalism|n|oo-ka-BEE-la|Ukabila unadhoofisha umoja wa taifa.|Tribalism weakens national unity.|C1
society|hadhi|status, dignity|n|HA-dhee|Kila mtu anastahili hadhi.|Everyone deserves dignity.|C1
society|ujumbe|message|n|oo-JOO-m-be|Ujumbe wa mwandishi ni wazi.|The writer's message is clear.|C2
society|msimulizi|narrator|n|m-see-moo-LEE-zee|Msimulizi wa riwaya huyu si mwaminifu.|The narrator of this novel is unreliable.|C2
society|ploti|plot|n|PLO-tee|Ploti ya filamu ni tata.|The film's plot is complicated.|C2
society|mkasa|incident, tale of woe|n|m-KA-sa|Mkasa huo ulimgusa kila mtu.|That incident touched everyone.|C2
verbs|kupambanua|to distinguish|v|ku-pa-m-ba-NOO-a|Ni vigumu kupambanua ukweli na uongo.|It's hard to distinguish truth from lies.|C2
verbs|kudadisi|to probe, inquire|v|ku-da-DEE-see|Alipenda kudadisi mambo ya kale.|He liked to probe into ancient matters.|C2
work|mshahara wa chini|minimum wage|phr|m-sha-HA-ra wa CHEE-nee|Wafanyakazi wanadai mshahara wa chini mpya.|Workers demand a new minimum wage.|B2
society|kukuza|to grow, promote|v|ku-KOO-za|Tunataka kukuza utalii wa ndani.|We want to promote domestic tourism.|B2
`;

export const SW_GRAMMAR_DEEP = `
## deep-noun-classes-sw | deep-noun-classes-sw | Noun classes and agreement in practice | A2
S: Every noun belongs to a class; adjectives, demonstratives, possessives and verbs copy that class. Learn each noun with its adjective prefix.
B: Singular/plural pairs set the pattern: **mtu mkubwa / watu wakubwa** (people), **mti mkubwa / miti mikubwa** (trees), **jiko kubwa / majiko makubwa**, **kitabu kikubwa / vitabu vikubwa** (things), **nyumba kubwa / nyumba kubwa** (n-class stays the same). The demonstrative agrees too: **kitabu hiki, vitabu hivi, mtoto huyu, watoto hawa**.
E: Mtoto mdogo anacheza. = The small child is playing.
E: Watoto wadogo wanacheza. = The small children are playing.
E: Kitabu kikubwa kiko mezani. = The big book is on the table.
E: Vitabu vikubwa viko mezani. = The big books are on the table.
M: Saying "kitabu mzuri" instead of "kitabu kizuri".
M: Forgetting that plural "vitabu" needs "vi-" (vizuri), not "ki-".
X: mcq Vitabu hivi ni ___. ? kizuri | *vizuri | mzuri | wazuri
X: mcq ___ wanacheza uwanjani. (these children) ? hii | *hawa | hizi | huyu
X: fill Mtoto m___ analia. (small) => dogo
X: type Say: "The big book." => Kitabu kikubwa
## deep-locatives-sw | deep-locatives-sw | Locatives: -ni, pa-, ku-, mu- | B1
S: Add -ni to a noun for "in / at / on", and use pa- (specific spot), ku- (general area), mu- (inside) for "there is / are".
B: **nyumba → nyumbani** (at home), **meza → mezani** (on the table), **shule → shuleni** (at school). For existence: **Mezani pana kitabu** (on the table there is a book, a specific spot); **Shuleni kuna wanafunzi** (general); **Ndani ya sanduku mna vitabu** (inside there are books). Location of a person: **yuko / yupo / yumo** (is there / right there / inside).
E: Shuleni kuna wanafunzi wengi. = There are many students at school.
E: Mezani pana kikombe kimoja. = There is one cup on the table.
E: Chumbani mna kitanda kikubwa. = In the room there's a big bed.
E: Mtoto yumo chumbani. = The child is inside the room.
M: Using -ni on a place that already ends in a location word (ndani ya nyumbani).
M: Using kuna for contained things when speakers expect mna.
X: mcq Mtoto yuko ___. (at school) ? shule | *shuleni | shulena | shulemo
X: mcq Ndani ya sanduku ___ vitabu viwili. (there are) ? pana | kina | *mna | una
X: fill Mtoto yu___ chumbani. (is inside) => mo
X: type Say: "At home." => Nyumbani
## deep-aspect-sw | deep-aspect-sw | Aspect: -sha-, -ja-, hu- and -ki- | B1
S: Beyond past, present and future, Swahili marks "already" (-sha-), "not yet" (-ja-), habit (hu-) and simultaneous action (-ki-).
B: **Nimeshakula** (I have already eaten). **Sijafika bado** (I haven't arrived yet; -ja- is the negative "not yet"). **Mimi huamka mapema** (I habitually wake early; hu- has no subject prefix). **Alikuja akiimba** (he came singing; -ki- shows two actions at once).
E: Nimeshakula, asante. = I've already eaten, thanks.
E: Hajafika bado. = He hasn't arrived yet.
E: Wanafunzi huamka mapema kila siku. = Students wake up early every day.
E: Alikuja akiimba. = He came singing.
M: Using -me- negative (hajafika) with the wrong marker: "hakufika bado" changes the meaning.
M: Adding a subject prefix to hu-: "ninahuamka".
X: mcq "Hajafika bado" means ___. ? He arrived | *He hasn't arrived yet | He won't arrive | He arrives often
X: mcq Mimi ___amka mapema kila siku. (habit) ? na | *hu | me | ta
X: fill Nime___kula. (already) => sha
X: type Say: "I haven't arrived yet." => Sijafika bado
## deep-amba-sw | deep-amba-sw | Relative -amba- and the -a connective | B2
S: Use -amba- + agreement for "who / which" when the verb relative (-o-) is awkward, and the -a of association (cha, wa, ya, la, za...) for "of".
B: **Mtu ambaye alinisaidia ni daktari.** **Kitabu ambacho nilisoma ni kizuri.** The -a of association agrees with the possessed noun: **kitabu cha mwalimu, watoto wa mwalimu, nyumba ya mwalimu, viti vya mwalimu**. For "having", use -enye: **mtu mwenye busara** (a wise person).
E: Mwanamke ambaye alinisaidia ni daktari. = The woman who helped me is a doctor.
E: Kitabu cha mwalimu kiko mezani. = The teacher's book is on the table.
E: Watoto wa jirani wanacheza. = The neighbour's children are playing.
E: Mtu mwenye busara husikiliza. = A wise person listens.
M: Using the wrong agreement: "kitabu ya mwalimu".
M: Forgetting that -amba- itself agrees with the noun it refers to (ambaye, ambacho, ambao).
X: mcq Kitabu ___ mwalimu kiko mezani. ? wa | ya | *cha | la
X: mcq Watoto ___ jirani wanacheza. ? cha | *wa | ya | za
X: fill Mtu am___ ananiita ni dada yangu. (who) => baye
X: type Say: "A person with money." => Mtu mwenye pesa
## deep-reduplication-sw | deep-reduplication-sw | Reduplication and manner words | B2
S: Doubling a word changes its meaning: it can mean little by little, aimless, or repeated.
B: **Kidogo kidogo** (little by little), **polepole** (slowly), **haraka haraka** (in a hurry), **mara kwa mara** (from time to time). A doubled verb gives "do repeatedly / aimlessly": **kutembeatembea** (to stroll around), **kupigapiga** (to hit again and again).
E: Anajifunza kidogo kidogo. = He is learning little by little.
E: Ongea polepole, tafadhali. = Speak slowly, please.
E: Walitembeatembea sokoni. = They strolled around the market.
E: Anakuja mara kwa mara. = He comes from time to time.
M: Translating "slowly" with only one pole: use "polepole" as one word.
M: Overusing doubled verbs in formal writing.
X: mcq "Kidogo kidogo" means ___. ? all at once | *little by little | very much | not at all
X: mcq "Kutembeatembea" means ___. ? to walk fast | *to stroll around | to stop | to run
X: mcq "Mara kwa mara" means ___. ? never | *from time to time | once | at once
X: type Say: "Little by little." => Kidogo kidogo
## deep-reported-sw | deep-reported-sw | Reporting and attributing: kwamba, eti, kwa mujibu wa | B2
S: Swahili reports speech with kwamba (that) and hedges claims with eti and kwa mujibu wa.
B: **Alisema kwamba atakuja kesho** (he said that he would come tomorrow). The tense is often kept; pronouns shift: "Nitakuja" becomes "atakuja". **Eti** marks hearsay or doubt: "Eti ameshinda" (apparently he has won). **Kwa mujibu wa** means "according to": **Kwa mujibu wa ripoti, bei imepanda.** Also **inasemekana** (it is said).
E: Alisema kwamba atakuja kesho. = He said that he would come tomorrow.
E: Eti amepata kazi mpya. = Apparently he's got a new job.
E: Kwa mujibu wa ripoti, bei imepanda. = According to the report, prices have risen.
E: Inasemekana mji utapanuliwa. = It is said that the town will be expanded.
M: Keeping the first person: "Alisema nitakuja" instead of "atakuja".
M: Using eti in a formal report as if it were neutral.
X: mcq Anasema ___ atakuja kesho. ? kama | *kwamba | kwa | ila
X: mcq "Eti" suggests ___. ? certainty | *hearsay or doubt | a question | an order
X: fill Ripoti inasema k___ bei imepanda. (that) => wamba
X: type Say: "According to the report." => Kwa mujibu wa ripoti
## deep-stative-sw | deep-stative-sw | Stative and potential verbs: -ik-, -ek- | C1
S: -ik- / -ek- turn an action into a state or possibility: vunja (break) → vunjika (be broken), soma (read) → someka (be readable).
B: **Kikombe kimevunjika** (the cup is broken, it got broken). **Maandishi haya hayasomeki** (this writing cannot be read). **Huduma hii inapatikana** (this service is available). **Hili linaeleweka** (this is understandable). These forms drop the doer and focus on the state.
E: Kikombe kimevunjika. = The cup has broken.
E: Maandishi haya hayasomeki. = This writing is illegible.
E: Huduma hii inapatikana mtandaoni. = This service is available online.
E: Pendekezo lake linakubalika. = His proposal is acceptable.
M: Using -ika forms when the doer matters (use the active verb or passive -w-).
M: Confusing -ik- (state) with -ia (for / to).
X: mcq "Kikombe kimevunjika" means ___. ? She broke the cup | *The cup is broken | He will break it | She breaks cups
X: mcq "Maandishi haya hayasomeki" means ___. ? Nobody wrote this | *This writing is illegible | He reads aloud | They read it
X: fill Huduma hii inapat___. (is available) => ikana
X: mcq "Kutumika" means ___. ? to use | *to be used | users | useful
## deep-register-sw | deep-register-sw | Register: respect, standard and street Swahili | C2
S: Swahili shows respect through set greetings and formal vocabulary; casual and youth speech uses shorter forms and slang such as Sheng.
B: Greet elders with **Shikamoo**, answered by **Marahaba**. Peers say **Hujambo / Habari / Mambo?**, answered **Sijambo / Nzuri / Poa**. In writing and news use Kiswahili sanifu; with friends in cities you hear Sheng (**niaje, poa, msee**). Switching register is a sign of skill, not carelessness.
E: Shikamoo, mzee. = Greetings, elder (respect).
E: Marahaba, mwanangu. = Thank you (reply to shikamoo).
E: Mambo? Poa! = What's up? Cool!
E: Hujambo, bibi? Sijambo. = Hello? I'm fine.
M: Using Mambo? or niaje with elders or in formal settings.
M: Answering shikamoo with another shikamoo.
X: mcq Which greeting shows respect to an elder? ? Mambo | *Shikamoo | Niaje | Poa
X: mcq The reply to Shikamoo is ___. ? Poa | *Marahaba | Hujambo | Karibu
X: mcq "Poa" in casual speech means ___. ? bad | *cool, fine | later | quick
X: fill Greet an elder with Shika___. => moo
`;
