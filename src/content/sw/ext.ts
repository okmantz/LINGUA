// Swahili extension: more B1–C2 material. Machine-drafted: have a native speaker review idioms and register notes.
export const SW_VOCAB_EXT = `
connectors|zaidi ya hayo|besides|phr|ZA-ee-dah ya HA-yo|Zaidi ya hayo, nyumba ina roshani.|Besides, the house has a balcony.|B1
connectors|hata hivyo|however, even so|phr|HA-ta HEE-vyo|Ni usiku; hata hivyo nitakwenda.|It's night; even so I'll go.|B1
connectors|kwa hiyo|therefore|phr|kwa HEE-yo|Nilikuwa mgonjwa, kwa hiyo nilibaki nyumbani.|I was ill, so I stayed home.|B1
work|mshahara|salary|n|m-sha-HA-ra|Mshahara wangu unapanda kila mwaka.|My salary rises every year.|B1
work|tarehe ya mwisho|deadline|n|ta-RE-he ya m-WEE-sho|Tarehe ya mwisho ni Ijumaa.|The deadline is Friday.|B1
work|kuajiri|to hire|v|ku-a-JEE-ree|Kampuni itaajiri watu watatu.|The company will hire three people.|B1
verbs|kukumbuka|to remember|v|ku-koom-BOO-ka|Ninakumbuka jina lake.|I remember his name.|B1
verbs|kugundua|to discover, notice|v|ku-goon-DOO-a|Niligundua kosa.|I noticed the mistake.|B1
verbs|kuzoea|to get used to|v|ku-zo-E-a|Ninazoea hali ya hewa hapa.|I'm getting used to the weather here.|B1
society|ukosefu wa usawa|inequality|n|oo-ko-SE-foo wa oo-SA-wa|Ukosefu wa usawa unaongezeka.|Inequality is increasing.|B2
society|mtaa|neighbourhood|n|m-TA-a|Huu ni mtaa tulivu.|This is a quiet neighbourhood.|B2
verbs|kusisitiza|to emphasise|v|ku-see-see-TEE-za|Ninataka kusisitiza jambo hili.|I want to emphasise this matter.|B2
verbs|kufanikisha|to accomplish|v|ku-fa-nee-KEE-sha|Alifanikisha lengo lake.|She accomplished her goal.|B2
verbs|kudai|to claim, demand|v|ku-DA-ee|Anadai kuwa hajui chochote.|He claims he knows nothing.|B2
adjectives|ya lazima|necessary|adj|ya la-ZEE-ma|Hati hii ni ya lazima.|This document is necessary.|B2
verbs|kutilia shaka|to cast doubt on|v|ku-tee-LEE-a SHA-ka|Hakuna aliyetilia shaka uamuzi wake.|Nobody questioned his decision.|C1
adjectives|isiyoepukika|unavoidable|adj|ee-see-yo-e-poo-KEE-ka|Mabadiliko hayaepukiki.|Change is unavoidable.|C1
society|changamoto|challenge|n|cha-nga-MO-to|Mabadiliko ya tabianchi ni changamoto ya dunia.|Climate change is a global challenge.|C1
connectors|licha ya hayo|despite that|phr|LEE-cha ya HA-yo|Licha ya hayo, mradi unaendelea.|Despite that, the project continues.|C1
connectors|kwa kifupi|in short|phr|kwa kee-FOO-pee|Kwa kifupi, hakuna suluhisho rahisi.|In short, there is no easy solution.|C1
adjectives|ya kupita|fleeting|adj|ya koo-PEE-ta|Umaarufu ni wa kupita.|Fame is fleeting.|C2
verbs|kutetea|to defend, advocate|v|ku-te-TE-a|Wataalamu wanatetea tahadhari.|Experts advocate caution.|C2
society|madhara|harm, damage|n|ma-DHA-ra|Kazi nyingi ina madhara kwa afya.|Too much work harms health.|C2
connectors|kutokana na|owing to, in view of|phr|koo-to-KA-na na|Kutokana na hali hiyo, tunaahirisha mkutano.|In view of that situation, we are postponing the meeting.|C2
`;
export const SW_GRAMMAR_EXT = `
## ext-masharti | ext-masharti | Conditionals: -ki-, -nge- and -ngali- | B1
S: -ki- gives a real condition (If I get money, I'll buy ...). -nge- (and the literary -ngali-) gives an unreal one (If I were rich, I would ...). Negative: -sipo- (real) and -singe- (unreal).
B: **Nikipata pesa, nitanunua gari.** (real) **Ningekuwa tajiri, ningenunua nyumba.** (unreal present) **Ningejua, ningekuja.** (unreal past; -ngali- is the formal alternative). Negative real: **Usipokuja, nitakwenda.** (If you don't come, I'll go.)
E: Mvua ikinyesha, nitabaki nyumbani. = If it rains, I'll stay home.
E: Ningekuwa tajiri, ningenunua nyumba. = If I were rich, I'd buy a house.
E: Ningejua, ningekuja. = Had I known, I'd have come.
E: Usipokuja, nitakwenda peke yangu. = If you don't come, I'll go alone.
M: Using -ki- for an impossible condition.
M: Forgetting that -ki- sits right after the subject prefix: ni-ki-pata.
X: mcq Mvua ___ nyesha, nitabaki nyumbani. ? i-nge- | *i-ki- | i-li- | i-ta-
X: mcq Ningekuwa tajiri, ___ nyumba. ? nitanunua | *ningenunua | ninanunua | nilinunua
X: fill U___kuja, nitakwenda. (if you don't) => sipo
X: type Say: "If it rains, I'll stay home." => Mvua ikinyesha, nitabaki nyumbani
## ext-subjunctive | ext-subjunctive | The subjunctive: -e | B2
S: The subjunctive ends in -e and expresses wishes, purpose, requests and advice. Use it after nataka, lazima, ili, ni vizuri, tafadhali.
B: **Nataka ule.** (I want you to eat.) **Ni muhimu ufanye kazi.** (It's important that you work.) **Njoo ili tuzungumze.** (Come so we can talk.) **Tafadhali uje kesho.** (Please come tomorrow.) The negative uses -si-: Nataka usiende.
E: Nataka uje kesho. = I want you to come tomorrow.
E: Ni lazima tuondoke sasa. = We must leave now.
E: Aliniambia nisiende. = He told me not to go.
E: Njoo ili tuzungumze. = Come so we can talk.
M: Using -a- present tense after nataka: "Nataka unakula".
M: Forgetting -si- for negative: "Nataka hukwenda" → Nataka usiende.
X: mcq Nataka ___ kesho. ? unaja | *uje | ulikuja | utakuja
X: mcq Aliniambia ___ . (not to go) ? sikwenda | *nisiende | siendi | sitaenda
X: fill Njoo ___ tuzungumze. (so that) => ili
X: type Say: "I want you to come tomorrow." => Nataka uje kesho
## ext-ka | ext-ka | Narrative -ka- | C1
S: In narrative, the first verb takes a tense (-li-) and the following ones take -ka-: Alifika, akakaa, akaanza kula.
B: **Alifika nyumbani, akakaa, akaanza kula.** -ka- means "and then" and carries the tense of the first verb. Do not use -ka- at the start of a sentence; begin with -li- (past) or -ta- (future). The negative narrative does not use -ka-: use -ku- (hakuingia).
E: Niliamka, nikaoga, nikala kifungua kinywa. = I woke up, bathed, ate breakfast.
E: Alifika, akasema habari, akaondoka. = He arrived, said hello, and left.
E: Tulikwenda sokoni tukanunua matunda. = We went to the market and bought fruit.
E: Walifika lakini hawakukaa. = They arrived but didn't stay.
M: Starting a story with -ka-.
M: Using -li- on every verb in a chain, which sounds repetitive.
X: mcq Niliamka, ___ oga. ? nilioga | *nikaoga | ninaoga | nitaoga
X: mcq Which is the correct start of a narrative? ? Akasema ... | *Alisema ... | Akisema ... | Anasema ...
X: fill Tulikwenda sokoni tu___nunua matunda. => ka
X: type Say: "I woke up, bathed, ate breakfast." => Niliamka, nikaoga, nikala kifungua kinywa
`;
export const SW_CONVS_EXT = `
## ext-b1-landlord | ext-b1-landlord | Renting a flat | B1 | You call about a flat for rent.
N: Halo, hapa ni ofisi ya nyumba. = Hello, this is the property office.
Y: Habari, ninapiga simu kuhusu nyumba kwenye tangazo. Bado ipo? = Hello, I'm calling about the house in the ad. Is it still available? || Nataka tiketi ya basi. = I want a bus ticket. || Kituo kiko wapi? = Where is the station? :: nyumba,tangazo,ipo
N: Ndiyo, kodi ni shilingi laki mbili kwa mwezi pamoja na huduma. = Yes, rent is two hundred thousand shillings a month including services.
Y: Je, naweza kuiona wikendi hii? = Can I see it this weekend? || Ninaona nyumba jana. = I see the house yesterday. || Maziwa ni ghali. = Milk is expensive. :: naweza,wikendi
N: Sawa. Jumamosi saa tano? = OK. Saturday at eleven?
Y: Sawa kabisa. Tutaonana Jumamosi. = That's fine. See you Saturday. || Sikumbuki chochote. = I remember nothing. || Kwaheri jana. = Goodbye yesterday. :: sawa,jumamosi
## ext-c1-interview | ext-c1-interview | A radio interview | C1 | You are interviewed about a social issue.
N: Wengine husema tatizo la nyumba halina suluhisho. Unaonaje? = Some say the housing problem has no solution. What do you think?
Y: Sikubaliani nao; ni changamoto kubwa, lakini baadhi ya hatua zimeleta matokeo. = I don't agree; it's a big challenge, but some measures have brought results. || Ni changamoto lakini kuna hatua. = (flatter) || Hakuna suluhisho kwa sababu hakuna. = No solution because there's none. :: changamoto,hatua
N: Kwa mfano? = For example?
Y: Kudhibiti kodi za watalii na kujenga nyumba za umma zaidi. = Controlling tourist rents and building more public housing. || Kupangisha soko kesho. = Renting the market tomorrow. || Kila kitu ni ghali kwa sababu ni ghali. = Everything is expensive because it is. :: kodi,nyumba za umma
N: Asante kwa muda wako. = Thank you for your time.
Y: Karibu. Imekuwa furaha. = You're welcome. It was a pleasure. || Kwaheri jana. = Goodbye yesterday. || Haidhuru. = Never mind. :: karibu,furaha
`;
export const SW_READING_EXT = `
## ext-r-b2-city | ext-r-b2 | Mji wa dakika kumi na tano | B2
P: Baadhi ya wapangaji wa miji wanapendekeza kila mkazi aweze kupata mahitaji ya msingi ndani ya dakika kumi na tano kwa miguu. Lengo ni kupunguza msongamano wa magari na kusaidia maduka madogo ya mtaa. = Some city planners suggest every resident be able to get basic needs within fifteen minutes on foot. The aim is to reduce traffic congestion and support small neighbourhood shops.
P: Hata hivyo, wakosoaji wanasema si kila mji unaweza kupangwa upya hivyo, na kwamba bei za nyumba zinaweza kupanda katika mitaa iliyo na huduma bora zaidi. = However, critics say not every city can be re-planned that way, and that house prices may rise in neighbourhoods with better services.
G: mpangaji = planner ; msongamano = congestion ; mkosoaji = critic
Q: mcq Kwa nini bei zinaweza kupanda? ? kwa sababu msongamano unapungua | *kwa sababu mitaa yenye huduma bora itapendwa zaidi | kwa sababu maduka madogo yanafungwa | kwa sababu kila mkazi anatembea dakika kumi na tano
Q: mcq Nini kinatakiwa kupunguzwa? ? maduka | *msongamano wa magari | mitaa | nyumba
Q: mcq Lengo la wazo ni nini? ? kuongeza magari | *kupata mahitaji karibu na nyumbani | kupunguza maduka | kupandisha bei
## ext-r-c1-memory | ext-r-c1 | Kumbukumbu teuzi | C1
P: Watu wengi hudhani kukumbuka ni kurudia yaliyopita kama yalivyokuwa, lakini tafiti nyingi zinaonyesha kinyume: kila tunapokumbuka tukio, tunalijenga upya na kulibadilisha polepole. = Many people think remembering is replaying the past as it was, but many studies show the opposite: each time we recall an event we rebuild it and change it slowly.
P: Hilo linaeleza kwa nini mashahidi wawili wa tukio moja wanaweza kusimulia hadithi tofauti bila mmoja wao kusema uongo. = That explains why two witnesses of one event can tell different stories without either lying.
G: kudhani = to suppose ; tafiti = studies ; shahidi = witness
Q: mcq Tafiti zinaonyesha nini? ? kukumbuka ni kurudia yaliyopita | *kila kumbukumbu hujengwa upya tunapoikumbuka | mashahidi wawili husema uongo siku zote | kumbukumbu hazibadiliki kamwe
Q: mcq Kwa nini kumbukumbu hubadilika? ? kwa sababu tunarudia yaliyopita | *kwa sababu kila mara tunaunda kumbukumbu mpya tunapokumbuka | kwa sababu mashahidi wanasimulia hadithi | kwa sababu mmoja wao anasema uongo
Q: mcq Tunafanya nini tunapokumbuka tukio? ? tunarudia kama lilivyokuwa | *tunalijenga upya na kulibadilisha | tunawapa mashahidi | tunalifuta
`;
export const SW_LISTENING_EXT = `
## ext-l-b2-radio | ext-l-b2 | Mjadala redioni | B2
L: Mtangazaji: Leo tunazungumzia kazi za nyumbani. Karim, unaonaje? = Today we discuss working from home. Karim, what do you think?
L: Karim: Naona imeleta faida nyingi, ingawa haifai kwa sekta zote. = I think it has brought many benefits, although it doesn't suit all sectors.
L: Mtangazaji: Na hasara? = And the downsides?
L: Karim: Hasa upweke na ugumu wa kutenganisha kazi na maisha binafsi. = Mainly loneliness and the difficulty of separating work from private life.
L: Mtangazaji: Asante sana, Karim. = Thank you very much, Karim.
Q: mcq Wanazungumzia nini? ? msongamano | *kazi za nyumbani | utalii | kupika
Q: mcq Hasara gani Karim anataja? ? mshahara | *upweke | msongamano | saa za kazi
## ext-l-c1-lecture | ext-l-c1 | Mhadhara | C1
L: Profesa: Ninataka kusisitiza kwamba mabadiliko ya lugha si uharibifu bali ni ukuaji wa kawaida. = I want to emphasise that language change isn't corruption but natural growth.
L: Profesa: Maneno yanayoonekana kuwa makosa leo yalikuwa ya kawaida karne nyingi zilizopita. = Words that look like mistakes today were normal many centuries ago.
L: Mwanafunzi: Basi hakuna kosa katika lugha? = So there's no error in language?
L: Profesa: Kanuni ipo, lakini inabadilika kutokana na matumizi. = The rule exists, but it changes through use.
Q: mcq Profesa anasisitiza nini? ? mabadiliko ni uharibifu | *mabadiliko ni ukuaji wa kawaida | hakuna kanuni | hakuna kinachobadilika
Q: mcq Anasemaje kuhusu kanuni? ? haibadiliki | *inabadilika kutokana na matumizi | haipo | ni maoni tu
`;
export const SW_WRITING_EXT = `
## w-ext-b2-email | ext-w-b2 | A formal enquiry | B2 | 60
T: Write a formal email (8–10 lines) to a language school asking about courses, price and dates. Use formal greetings and polite subjunctive requests (tafadhali, naomba).
R: Greeting = Ndugu, Bwana/Bibi ; Request = naomba, tafadhali ; Question = ada ni kiasi gani, kozi inaanza lini ; Closing = wako mwaminifu, asante
M: Ndugu, ninaomba kujua kuhusu kozi za Kiswahili za muhula ujao. Tafadhali, niambieni ada na tarehe ya kuanza. Pia ningependa kujua kama kuna madarasa ya jioni. Wako mwaminifu, Amina Juma. = Dear Sir/Madam, I'd like to know about Swahili courses next term. Please tell me the fees and start date. I'd also like to know if there are evening classes. Yours faithfully, Amina Juma.
## w-ext-c1-essay | ext-w-c1 | An argumentative essay | C1 | 90
T: Write 12–15 lines arguing for or against a four-day working week. Use a concession (ingawa), a hypothesis (-nge-) and a formal connector (hata hivyo, kwa kifupi).
R: Concession = ingawa, ijapokuwa ; Hypothesis = -nge-, -ki- ; Connector = hata hivyo, kwa kifupi, kwa hiyo ; Opinion = kwa maoni yangu, naona kuwa
M: Kwa maoni yangu, wiki ya kazi ya siku nne ingeongeza ufanisi. Ingawa sekta fulani haziwezi kuikubali, ikitumika kwa urahisi, wafanyakazi wangechoka kidogo. Hata hivyo, gharama zinapaswa kupimwa. Kwa kifupi, inafaa kujaribu. = In my opinion, a four-day working week would increase efficiency. Although some sectors can't accept it, if applied flexibly, workers would tire less. However, costs must be weighed. In short, it's worth trying.
`;
export const SW_PLACEMENT_EXT = `
vocabulary | B1 | - | mcq "Tarehe ya mwisho ni Ijumaa" means ___. ? the price drops | *the deadline is Friday | the place closes | the plan starts
grammar | B1 | - | mcq Mvua ___ nyesha, nitabaki nyumbani. ? i-nge- | *i-ki- | i-li- | i-ta-
grammar | B2 | - | mcq Nataka ___ kesho. ? unaja | *uje | ulikuja | utakuja
vocabulary | B2 | - | mcq "Kusisitiza" means ___. ? to lose | *to emphasise | to leave | to read
grammar | C1 | - | mcq Niliamka, ___ oga. ? nilioga | *nikaoga | ninaoga | nitaoga
vocabulary | C1 | - | mcq "Licha ya hayo" is closest to ___. ? kwa hiyo | *hata hivyo | zaidi ya hayo | kwa sababu
vocabulary | C2 | - | mcq "Ya kupita" means ___. ? eternal | *fleeting | strong | clear
vocabulary | C2 | - | mcq "Kutokana na" means ___. ? despite | *owing to | in front of | instead of
`;
