// Swahili (Kiswahili sanifu, Tanzanian standard) A1–A2 grammar, mapped to the 30-day programme slots. Machine-drafted: have a native speaker review.
export const SW_GRAMMAR = `
## pronouns | pronouns | Pronouns and subject prefixes | A1
S: Swahili verbs carry the subject inside them as a prefix, so the separate pronoun is mostly for emphasis.
B: The pronouns are **mimi** (I), **wewe** (you), **yeye** (he/she), **sisi** (we), **ninyi** (you all), **wao** (they). Swahili does not mark he or she. The verb prefixes are **ni-** (I), **u-** (you), **a-** (he/she), **tu-** (we), **m-** (you all), **wa-** (they): **ninasoma**, **unasoma**, **anasoma**.
B: Say the pronoun only to stress it: **Mimi ninapika, yeye anasoma** (I cook, he reads). Greeting an elder, use **shikamoo**; greeting a group, **hamjambo**.
T: Person | Pronoun | Verb prefix
T: I | mimi | ni-
T: you | wewe | u-
T: he/she | yeye | a-
T: we | sisi | tu-
T: you (pl.) | ninyi | m-
T: they | wao | wa-
E: Mimi ni Anna. = I am Anna.
E: Yeye ni mwalimu. = He/she is a teacher.
E: Sisi ni marafiki. = We are friends.
E: Wao ni wageni. = They are guests.
M: Looking for separate words for "he" and "she": yeye covers both.
M: Dropping the prefix and keeping only the pronoun: *Mimi soma* → Mimi ninasoma.
M: Using wewe for a group: use ninyi.
X: type they => wao
X: mcq How do you say "we"? ? mimi | wewe | *sisi | ninyi
X: mcq Which prefix means "he/she"? ? ni- | u- | *a- | tu-
X: fill (you all) ___ ni wageni. => Ninyi
X: mcq Yeye means ___. ? only "he" | only "she" | *he or she | they
## be-verb | be-verb | "To be": ni, si and -ko | A1
S: Swahili has no verb "to be" in the present. The word ni links nouns, si negates it, and -ko/-po/-mo say where something is.
B: **Identity:** **Mimi ni mwalimu** (I am a teacher), **Yeye ni daktari.** The same word **ni** works for every person. Negative: **si** (is not): **Yeye si daktari.**
B: **Location:** use a locative suffix with the subject prefix: **niko** (I am at), **uko** (you are at), **yuko** (he/she is at), **tuko**, **mko**, **wako**. **Niko nyumbani.** **Yuko wapi?** Negative: **siko**, **huko**, **hayuko**, **hatuko**, **hamko**, **hawako**.
T: Person | Is at (location) | Is not at
T: I | niko | siko
T: you | uko | huko
T: he/she | yuko | hayuko
T: we | tuko | hatuko
T: they | wako | hawako
E: Mimi ni mwanafunzi. = I am a student.
E: Yeye si mwalimu. = She is not a teacher.
E: Niko nyumbani. = I am at home.
E: Daktari yuko hospitalini. = The doctor is at the hospital.
M: Using ni for location: *Ni nyumbani* is wrong for "I am at home".
M: Putting the subject prefix before ni: *Ninani mwalimu*.
M: Using yuko for a thing: use iko, liko, kiko... after noun class.
X: fill Mimi ___ mwalimu. (am) => ni
X: fill Yeye ___ daktari. (is not) => si
X: mcq "I am at the market": ? Ni sokoni | *Niko sokoni | Nina sokoni | Nipo mwalimu
X: type I am not at home => siko nyumbani
X: mcq Which word is used for identity ("I am a teacher")? ? -ko | *ni | -po | na
## articles-gender | articles-gender | Noun classes (no articles) | A1
S: Swahili has no "a" or "the". Nouns belong to classes marked by prefixes, and the prefix controls agreement.
B: Learn the singular/plural pairs: **m-/wa-** (people: **mtu/watu**, **mtoto/watoto**), **m-/mi-** (**mti/miti**, **mlango/milango**), **ji-/ma-** (**jina/majina**, **dirisha/madirisha**), **ki-/vi-** (**kitabu/vitabu**, **kiti/viti**), **N-** (same form both ways: **nyumba**, **meza**, **simu**). **U-** (**ufunguo**) takes **funguo** in the plural.
B: Adjectives and verbs agree with the noun class: **kitabu kizuri** (a good book), **vitabu vizuri**, **mtoto mzuri**, **watoto wazuri**, **nyumba nzuri**. This is why prefixes matter more than gender in other languages.
T: Class | Singular | Plural
T: M-/WA- | mtoto | watoto
T: M-/MI- | mti | miti
T: JI-/MA- | jina | majina
T: KI-/VI- | kitabu | vitabu
T: N- | nyumba | nyumba
E: Mtoto mmoja, watoto wawili. = One child, two children.
E: Kitabu kimoja, vitabu viwili. = One book, two books.
E: Nyumba moja, nyumba mbili. = One house, two houses.
E: Mti mmoja, miti miwili. = One tree, two trees.
M: Writing *watu mmoja*. The number agrees: mtu mmoja, watu wawili.
M: Leaving the adjective bare: *kitabu nzuri* → kitabu kizuri.
M: Expecting "a/the": Swahili has none.
X: mcq Plural of kitabu: ? kitabu | *vitabu | mitabu | watabu
X: mcq Plural of mtoto: ? mitoto | vitoto | *watoto | matoto
X: fill kitabu ___ (a good book; kizuri/nzuri/mzuri) => kizuri
X: mcq Which noun does NOT change in the plural? ? mtoto | kitabu | mti | *nyumba
X: type two books => vitabu viwili
## present-regular | present-regular | The present tense with -na- | A1
S: Swahili builds the present from a subject prefix + the tense marker -na- + the verb stem: ni-na-soma.
B: Take the infinitive **kusoma**, drop **ku-**, and add: **ninasoma, unasoma, anasoma, tunasoma, mnasoma, wanasoma.** The tense marker **-na-** tells you it is happening now or regularly.
B: Verbs of one syllable keep **ku-**: **ninakula** (I eat), **ninakunywa** (I drink), **ninakuja** (I come). Verbs from Arabic often end in -e/-u/-i; they do not change.
T: Person | soma (read)
T: I | ninasoma
T: you | unasoma
T: he/she | anasoma
T: we | tunasoma
T: you all | mnasoma
T: they | wanasoma
E: Ninasoma kitabu. = I am reading a book.
E: Anapika chakula. = She is cooking food.
E: Tunafanya kazi. = We are working.
E: Wanakula wali. = They are eating rice.
M: Keeping ku- in a normal verb: *ninakusoma* → ninasoma.
M: Dropping ku- from kula: *ninala* → ninakula.
M: Forgetting the tense marker: *Ninasoma* needs -na-.
X: fill Mimi ni___soma kitabu. (am reading) => na
X: fill Yeye a___pika chakula. (is cooking) => na
X: mcq "We are working": ? *Tunafanya kazi | Ninafanya kazi | Wanafanya kazi | Unafanya kazi
X: mcq "I eat rice": ? Ninala wali | *Ninakula wali | Ninakila wali | Nilakula wali
X: order Translate: She is reading a book. => Anasoma kitabu
## have-verb | have-verb | Having: kuwa na | A1
S: "To have" is expressed as "to be with": the subject prefix + na.
B: **nina** (I have), **una**, **ana**, **tuna**, **mna**, **wana**. **Nina simu.** **Ana watoto wawili.** For things you do not have, use the negative: **sina**, **huna**, **hana**, **hatuna**, **hamna**, **hawana**: **Sina pesa.**
B: **Kuna** means "there is/are": **Kuna maji.** Its negative is **hakuna**: **Hakuna maji.** (There is no water.)
T: Person | Has | Has not
T: I | nina | sina
T: you | una | huna
T: he/she | ana | hana
T: we | tuna | hatuna
T: they | wana | hawana
E: Nina simu. = I have a phone.
E: Ana watoto wawili. = He has two children.
E: Hatuna pesa. = We have no money.
E: Hakuna maji. = There is no water.
M: Saying *Nina na simu*: na is already inside nina.
M: Using sina for "I have": sina = I don't have.
M: Using kuna for a person's possession: use ana, nina.
X: fill ___ simu. (I have) => Nina
X: fill ___ pesa. (I don't have) => Sina
X: mcq "There is no water." ? Kuna maji | *Hakuna maji | Hana maji | Sina maji
X: mcq "We have two children." ? Wana watoto wawili | *Tuna watoto wawili | Una watoto wawili | Nina watoto wawili
X: type she has a car => ana gari
## negation | negation | Negation | A1
S: Swahili negates in the verb: the subject prefix changes and the present tense ends in -i.
B: **Present:** **si-** (I), **hu-** (you), **ha-** (he/she), **hatu-** (we), **ham-** (you all), **hawa-** (they), and the verb ends in **-i**: **sisomi** (I don't read), **husomi**, **hasomi**, **hatusomi**, **hamsomi**, **hawasomi.** Verbs from Arabic keep their ending: **sijali** (I don't care).
B: **Past:** **si-/hu-/ha-... + ku + verb**: **sikusoma** (I didn't read). **Future:** **sitasoma**. **Not yet:** **sijasoma**. Monosyllabic verbs drop ku- in present negative: **sili** (I don't eat), **sinywi.**
T: Person | Present negative of soma
T: I | sisomi
T: you | husomi
T: he/she | hasomi
T: we | hatusomi
T: they | hawasomi
E: Sisomi kitabu. = I'm not reading a book.
E: Hapiki leo. = He doesn't cook today.
E: Hatufanyi kazi. = We don't work.
E: Sili nyama. = I don't eat meat.
M: Keeping -a at the end: *Sisoma* → sisomi.
M: Using hapana in the verb: Swahili negates with the prefix, not a separate word.
M: Keeping ninakula negative as *Sinakula*.
X: fill Mimi ___somi kitabu. (I don't read) => si
X: fill Yeye ha___ kitabu. (doesn't read) => somi
X: mcq "We don't work." ? *Hatufanyi kazi | Hatufanya kazi | Sifanyi kazi | Hawafanyi kazi
X: mcq "I don't eat fish." ? Sinakula samaki | Silakula samaki | *Sili samaki | Sikula samaki
X: type you don't read => husomi
## questions | questions | Asking questions | A1
S: Swahili questions use question words after the verb, the particle je, or intonation alone.
B: **Yes/no:** raise the voice, or open with **Je**: **Unapenda kahawa?** or **Je, unapenda kahawa?** **Wh-words:** **nani** (who), **nini** (what), **wapi** (where), **lini** (when), **kwa nini** (why), **vipi** (how), **gani** (which), **ngapi** (how many). They usually come after the verb: **Unakwenda wapi?** (Where are you going?)
B: Useful frames: **Jina lako nani?** (What's your name?), **Unatoka wapi?** (Where are you from?), **Una watoto wangapi?** (How many children do you have?), **Saa ngapi?** (What time?).
E: Jina lako nani? = What is your name?
E: Unatoka wapi? = Where are you from?
E: Unakula nini? = What are you eating?
E: Una watoto wangapi? = How many children do you have?
M: Putting the question word first in English style: *Wapi unakwenda?* → Unakwenda wapi?
M: Dropping the agreement in -ngapi: *Una watoto ngapi* → wangapi.
M: Translating "What is your name?" word for word.
X: mcq "Where do you live?" ? Unaishi lini | *Unaishi wapi | Unaishi nini | Unaishi vipi
X: fill Una watoto ___? (how many) => wangapi
X: fill ___ lako nani? (name) => Jina
X: order Translate: Where are you going? => Unakwenda wapi
X: mcq Which word marks a yes/no question? ? vipi | nani | *je | wapi
## want-verb | want-verb | Wanting: kutaka | A1
S: Say what you want with kutaka, followed by a noun or an infinitive (ku-verb).
B: **Nataka** (I want), **unataka**, **anataka**, **tunataka**, **mnataka**, **wanataka**: **Nataka maji.** **Anataka kula.** Negative: **sitaki, hutaki, hataki, hatutaki, hamtaki, hawataki.** More polite: **Ningependa...** (I would like...).
B: Use the infinitive after the first verb: **Ninataka kwenda sokoni.** **Hatutaki kulala.** Do not conjugate the second verb.
E: Nataka chai. = I want tea.
E: Anataka kula wali. = He wants to eat rice.
E: Hatutaki kulala. = We don't want to sleep.
E: Ningependa kahawa, tafadhali. = I would like coffee, please.
M: Conjugating both verbs: *Ninataka ninakula* → Ninataka kula.
M: Using sitaki for "I want": sitaki = I don't want.
M: Dropping ku- from the infinitive: *Nataka la* → Nataka kula.
X: fill ___ maji. (I want) => Nataka
X: fill Hatutaki ___ . (to sleep) => kulala
X: mcq "I don't want tea." ? *Sitaki chai | Hataki chai | Hatutaki chai | Hutaki chai
X: mcq "He wants to eat." ? *Anataka kula | Ananataka kula | Anataka ninakula | Anataka la
X: order Translate: I want to go to the market. => Ninataka kwenda sokoni
## possessives | possessives | Possessives: my, your, his/her | A1
S: Swahili possessives come after the noun and agree with it: kitabu changu (my book), vitabu vyangu (my books).
B: The stems are **-angu** (my), **-ako** (your), **-ake** (his/her), **-etu** (our), **-enu** (your pl.), **-ao** (their). The prefix matches the noun class: **mtoto wangu** (my child), **watoto wangu**, **kitabu changu**, **vitabu vyangu**, **nyumba yangu**, **nyumba zangu**, **jina langu**, **majina yangu**, **mlango wangu**, **milango yangu.**
B: For family members in class 9/10 the form is **yangu**: **baba yangu**, **mama yangu**, **dada yangu**, **kaka yangu**, **rafiki yangu**.
T: Class | my | your
T: M-/WA- sg. | wangu | wako
T: KI- sg. | changu | chako
T: VI- pl. | vyangu | vyako
T: N- sg. | yangu | yako
T: JI- sg. | langu | lako
E: Jina langu ni Anna. = My name is Anna.
E: Baba yangu ni daktari. = My father is a doctor.
E: Kitabu chako kiko wapi? = Where is your book?
E: Nyumba yetu ni kubwa. = Our house is big.
M: Putting the possessive before the noun: *Yangu baba* → baba yangu.
M: Using one form for every class: *kitabu yangu* → kitabu changu.
M: Missing the plural: vitabu vyangu, not *vitabu changu*.
X: fill Jina ___ ni Anna. (my) => langu
X: fill Kitabu ___ kiko wapi? (your) => chako
X: mcq "my father": ? baba wangu | *baba yangu | baba langu | baba changu
X: mcq "our house": ? nyumba wetu | nyumba changu | *nyumba yetu | nyumba vyetu
X: type my friend => rafiki yangu
## go-places | go-places | Going places and the -ni ending | A1
S: To say "to/at/in a place" add -ni to the noun. Verbs of motion take no preposition.
B: **Ninaenda sokoni** (I am going to the market). **Yuko shuleni** (She is at school). **Anatoka nyumbani** (He is coming from home). One ending, -ni, means to, in, at and (with toka) from.
B: Other place words: **mbele ya** (in front of), **nyuma ya** (behind), **juu ya** (on, above), **chini ya** (under), **ndani ya** (inside), **karibu na** (near). **Kuja** (come) and **kwenda** (go): **Njoo hapa!** (Come here!), **Nenda!** (Go!). Directions: **nenda moja kwa moja**, **geuka kulia**, **geuka kushoto**.
E: Ninaenda sokoni. = I am going to the market.
E: Yuko shuleni. = She is at school.
E: Duka liko karibu na benki. = The shop is near the bank.
E: Geuka kushoto kisha nenda moja kwa moja. = Turn left then go straight ahead.
M: Using a preposition with the -ni form: *kwa sokoni* is wrong in this basic use.
M: Forgetting -ni: *Ninaenda soko* → sokoni.
M: Using kwenda/kuja without agreement in the tense.
X: fill Ninaenda ___ . (to the market) => sokoni
X: fill Yuko ___ . (at school) => shuleni
X: mcq "Turn left." ? Geuka kulia | *Geuka kushoto | Nenda mbele | Nenda kulia
X: mcq "The shop is near the bank." ? Duka liko juu ya benki | *Duka liko karibu na benki | Duka liko chini ya benki | Duka liko nyuma ya benki
X: type to the school => shuleni
## reflexive | reflexive | Daily routine, reflexive -ji- and time | A1
S: The infix -ji- means "oneself". Time starts at sunrise, so saa moja is 7 o'clock.
B: **Kujifunza** (to learn), **kujiosha** (to wash oneself): **Ninajifunza Kiswahili.** Daily verbs: **kuamka** (wake up), **kuoga** (bathe), **kula**, **kwenda kazini**, **kulala.**
B: Swahili time counts from 6 a.m. (dawn = hour 0): **saa moja** = 7:00, **saa mbili** = 8:00, **saa sita** = noon, **saa kumi na mbili** = 6:00. Add **asubuhi** (morning), **mchana** (daytime), **jioni** (evening), **usiku** (night). **na nusu** = half past: **saa tatu na nusu**.
T: Swahili | English
T: saa moja asubuhi | 7:00 a.m.
T: saa tatu asubuhi | 9:00 a.m.
T: saa sita mchana | 12:00 noon
T: saa kumi na mbili jioni | 6:00 p.m.
T: saa nne usiku | 10:00 p.m.
E: Ninajifunza Kiswahili. = I am learning Swahili.
E: Naamka saa moja asubuhi. = I wake up at seven in the morning.
E: Tunakula saa saba mchana. = We eat at one in the afternoon.
E: Anaoga saa mbili asubuhi. = She bathes at eight.
M: Using clock numbers like English: *saa saba* is 1 p.m., not 7.
M: Dropping -ji- in reflexives.
M: Forgetting the time of day.
X: mcq 7 a.m. is ___. ? saa saba asubuhi | *saa moja asubuhi | saa kumi asubuhi | saa sita asubuhi
X: mcq 1 p.m. is ___. ? saa moja mchana | saa sita mchana | *saa saba mchana | saa kumi mchana
X: fill Naamka saa ___ asubuhi. (at seven) => moja
X: type I wake up early => naamka mapema
X: mcq -ji- means ___. ? and | *oneself | not | again
## adjectives | adjectives | Adjectives and agreement | A1
S: Adjectives come after the noun and take the noun's class prefix.
B: **Kitabu kikubwa** (a big book), **vitabu vikubwa**, **mtoto mdogo**, **watoto wadogo**, **nyumba kubwa**, **nyumba ndogo**, **mti mrefu**, **miti mirefu**. The same stem changes: **-zuri** (nice): **mtu mzuri, watu wazuri, kitu kizuri, vitu vizuri, nyumba nzuri.**
B: Common stems: **-kubwa** (big), **-dogo** (small), **-refu** (tall, long), **-fupi** (short), **-pya** (new), **-baya** (bad), **-ingi** (many). Some foreign adjectives never change: **safi** (clean), **ghali** (expensive), **rahisi** (cheap): **chumba safi, vyumba safi**.
T: Class | zuri
T: M- (mtu) | mzuri
T: WA- (watu) | wazuri
T: KI- (kitu) | kizuri
T: VI- (vitu) | vizuri
T: N- (nyumba) | nzuri
E: Kitabu kizuri. = A good book.
E: Watoto wazuri. = Nice children.
E: Nyumba ndogo. = A small house.
E: Chumba ni safi. = The room is clean.
M: Putting the adjective first: *kubwa nyumba*.
M: Using one form for all nouns: *kitabu nzuri* → kitabu kizuri.
M: Adding a prefix to safi: *chumba kisafi*.
X: fill mtoto ___ (a small child; mdogo/kidogo/ndogo) => mdogo
X: fill kitabu ___ (a good book) => kizuri
X: mcq "small houses": ? nyumba kidogo | *nyumba ndogo | nyumba mdogo | nyumba wadogo
X: mcq "a tall tree": ? mti mfupi | *mti mrefu | mti kirefu | mti nrefu
X: type big house => nyumba kubwa
## like-verb | like-verb | Liking: kupenda | A1
S: Use kupenda for "to like" and "to love" in the same way, followed by a noun or an infinitive.
B: **Napenda** (I like), **unapenda**, **anapenda**, **tunapenda**, **mnapenda**, **wanapenda**. **Napenda chai.** **Anapenda kuimba.** Negative: **sipendi, hupendi, hapendi, hatupendi, hampendi, hawapendi.** For strong feeling add **sana**: **Napenda sana muziki.**
B: **Napendelea** means "I prefer": **Napendelea kahawa kuliko chai.** To say you do not like something: **Sipendi nyama.** With people the same verb takes an object infix: **Ninampenda mama yangu** (I love my mother).
E: Napenda muziki. = I like music.
E: Anapenda kuimba. = She likes to sing.
E: Hatupendi baridi. = We don't like cold.
E: Napendelea kahawa kuliko chai. = I prefer coffee to tea.
M: Using "ninapenda" with a fully conjugated second verb: *Napenda ninasoma*.
M: Putting the noun before the verb in a basic sentence.
M: Using two different verbs for like and love: kupenda covers both.
X: fill ___ muziki. (I like) => Napenda
X: fill ___ kuimba. (She likes) => Anapenda
X: mcq "We don't like cold." ? Tunapenda baridi | *Hatupendi baridi | Sipendi baridi | Hampendi baridi
X: mcq "I prefer coffee to tea." ? Napenda kahawa na chai | *Napendelea kahawa kuliko chai | Nataka kahawa kuliko chai | Sipendi kahawa
X: type I like to read => napenda kusoma
## irregular-present | irregular-present | Short verbs and habits (hu-) | A1
S: Short verbs keep ku-, a few verbs have irregular negatives, and hu- shows habits.
B: **Monosyllabic stems keep ku-:** **ninakula, ninakunywa, ninakuja.** Negatives drop it in the present: **sili, sinywi, siji.** **Kwenda** (go) drops ku- in tenses: **naenda, unaenda, anaenda**; imperative **nenda**. **Kujua** (know): **najua / sijui**. **Kusema** (say): **anasema.**
B: **Habit:** the prefix **hu-** replaces subject prefix and tense marker for things you always do: **Hula wali kila siku** (I/he/she usually eats rice every day). **Hupenda kusoma.** The subject is understood from context or a pronoun.
E: Ninakula wali kila siku. = I eat rice every day.
E: Najua jina lake. = I know his name.
E: Sijui jibu. = I don't know the answer.
E: Mimi hunywa chai asubuhi. = I usually drink tea in the morning.
M: Using *sijua* for "I don't know": the form is sijui.
M: Saying *ninakwenda* in careful speech: use naenda / ninaenda.
M: Adding a subject prefix to hu-: *anahu-pika* is wrong.
X: fill ___ jibu. (I don't know) => Sijui
X: fill Mimi ___ chai asubuhi. (usually drink) => hunywa
X: mcq "I know his name." ? Sijui jina lake | *Najua jina lake | Sijua jina lake | Najui jina lake
X: mcq Which is the negative of ninakula? ? silo | *sili | sikula | hakula
X: type go! (imperative) => nenda
## modals | modals | Can, must, need | A2
S: Use naweza + infinitive for ability, and lazima/inabidi for obligation.
B: **Naweza** (I can), **unaweza**, **anaweza**, **tunaweza**: **Naweza kusoma Kiswahili.** Negative: **siwezi, huwezi, hawezi, hatuwezi, hamwezi, hawawezi.** Obligation: **Lazima** (must) + subjunctive (verb ending in -e): **Lazima nisome.** **Inabidi niende.** Need: **ninahitaji** + noun/infinitive.
B: The subjunctive uses the subject prefix and ends in **-e**: **nisome, usome, asome, tusome, msome, wasome.** Same pattern with **nataka** for a different subject: **Nataka asome.** (I want him/her to read.)
E: Naweza kusoma Kiswahili. = I can read Swahili.
E: Siwezi kuja leo. = I can't come today.
E: Lazima nisome sasa. = I must study now.
E: Ninahitaji kupumzika. = I need to rest.
M: Using the infinitive after lazima: *Lazima kusoma* → Lazima nisome.
M: Conjugating the second verb in the present: *Naweza ninasoma*.
M: Forgetting that the subjunctive ends in -e.
X: fill Naweza ___ Kiswahili. (to read) => kusoma
X: fill Lazima ___ sasa. (I study) => nisome
X: mcq "I can't come." ? Naweza kuja | *Siwezi kuja | Huwezi kuja | Sitaki kuja
X: mcq "She must go." ? Lazima nenda | Lazima anaenda | *Lazima aende | Lazima kwenda
X: type I need to rest => ninahitaji kupumzika
## comparatives | comparatives | Comparing things | A2
S: Compare with kuliko (than) or zaidi ya, and use the adjective as is.
B: **Nairobi ni kubwa kuliko Mombasa** (Nairobi is bigger than Mombasa). **Mji huu ni mzuri zaidi** (This town is nicer). **Zaidi** means "more", **kuliko** means "than". For "the most", say **kuliko wote** (than all): **Yeye ni mrefu kuliko wote** (He is the tallest).
B: **Bora** means better/best, **mbaya zaidi** = worse. Equal comparison: **sawa na**: **Hii ni sawa na ile.** To say "as ... as" use **kama**: **Ni mrefu kama baba yake.**
E: Nairobi ni kubwa kuliko Mombasa. = Nairobi is bigger than Mombasa.
E: Gari hili ni ghali zaidi. = This car is more expensive.
E: Yeye ni mrefu kuliko wote. = He is the tallest of all.
E: Ni mrefu kama baba yake. = He is as tall as his father.
M: Using "more" before the adjective: *zaidi kubwa* → kubwa zaidi.
M: Leaving out kuliko: *Nairobi ni kubwa Mombasa*.
M: Using *ni bora kuliko* with a verb instead of a noun.
X: fill Nairobi ni kubwa ___ Mombasa. (than) => kuliko
X: fill Gari hili ni ghali ___. (more) => zaidi
X: mcq "the tallest of all": ? mrefu zaidi ya wote | *mrefu kuliko wote | mrefu sana | mrefu kama wote
X: mcq "as tall as his father": ? mrefu kuliko baba yake | *mrefu kama baba yake | zaidi baba yake | mrefu na baba yake
X: type better => bora
## past-perfect | past-perfect | The perfect -me-: what I have done | A2
S: The marker -me- shows a completed action with a present result: nimekula (I have eaten).
B: **Nimekula, umekula, amekula, tumekula, mmekula, wamekula.** **Amefika** (He has arrived). **Nimeona** (I have seen). Negative "not yet": **sijakula, hujakula, hajakula, hatujakula, hamjakula, hawajakula.** Add **tayari** (already) and **bado** (still / not yet).
B: Many Swahili verbs describe states with -me-: **nimechoka** (I am tired), **nimeelewa** (I understand), **nimesahau** (I have forgotten). Use **-me-** for results you can see now, and **-li-** for events told as past.
E: Nimekula. = I have eaten.
E: Amefika. = He has arrived.
E: Bado sijakula. = I haven't eaten yet.
E: Nimechoka. = I am tired.
M: Using -na- for a completed event: Nimekula (done) vs ninakula (doing).
M: Using -me- with a past time word: *Jana nimekula* → Jana nilikula.
M: Forgetting the "not yet" form: sijakula, not *sikula* for "not yet".
X: fill Mimi ni___fika. (I have arrived) => me
X: fill Bado ___kula. (I haven't eaten yet) => sija
X: mcq "She has arrived." ? Anafika | *Amefika | Alifika | Atafika
X: mcq "We have eaten." ? Tunakula | Tulikula | *Tumekula | Tutakula
X: type I am tired => nimechoka
## past-2 | past-2 | The simple past -li- | A2
S: Use -li- for finished events in the past.
B: **Nilisoma, ulisoma, alisoma, tulisoma, mlisoma, walisoma.** **Jana nilikwenda sokoni** (Yesterday I went to the market). **Tulikula samaki.** The negative past is **ku**: **sikusoma, hukusoma, hakusoma, hatukusoma, hamkusoma, hawakusoma.**
B: **Kuwa** (to be) in the past: **nilikuwa** (I was). **Nilikuwa na njaa** (I was hungry). Past time words: **jana** (yesterday), **juzi** (the day before yesterday), **wiki iliyopita** (last week), **mwaka jana** (last year).
E: Jana nilikwenda sokoni. = Yesterday I went to the market.
E: Tulikula samaki. = We ate fish.
E: Hakuja jana. = He didn't come yesterday.
E: Nilikuwa na njaa. = I was hungry.
M: Using -na- for a finished action: *Jana ninakula* → Jana nilikula.
M: Forgetting -ku- in the negative past: *hasoma* → hakusoma.
M: Dropping ku- from kuwa: nilikuwa, not *nilikwa*.
X: fill Jana ni___kula samaki. (I ate) => li
X: fill Yeye ha___soma jana. (didn't read) => ku
X: mcq "We ate fish." ? Tunakula samaki | *Tulikula samaki | Tumekula samaki | Tutakula samaki
X: mcq "I wasn't tired." ? *Sikuwa na uchovu | Siwe na uchovu | Sili uchovu | Sijakuwa uchovu
X: type yesterday => jana
## future-near | future-near | The future -ta- | A2
S: The marker -ta- forms the future: nitakula (I will eat).
B: **Nitasoma, utasoma, atasoma, tutasoma, mtasoma, watasoma.** **Kesho nitaenda sokoni** (Tomorrow I will go to the market). **Tutaonana kesho** (We will see each other tomorrow). Negative: **sitakula, hutakula, hatakula, hatutakula, hamtakula, hawatakula.**
B: For immediate plans, -na- with a time word works: **Naondoka kesho.** Add **labda** for uncertainty: **Labda nitakuja.** Use **-taka** + infinitive for intentions: **Ninataka kuondoka.**
E: Nitasoma kesho. = I will read tomorrow.
E: Tutaonana baadaye. = We will see each other later.
E: Hatakuja leo. = He won't come today.
E: Labda nitaenda. = Maybe I will go.
M: Using -ta- without a prefix: *Tasoma*.
M: Using a past marker in the negative future.
M: Using the infinitive with -ta-: *nitakusoma* is wrong for "I will read".
X: fill ni___soma kesho. (I will read) => ta
X: fill Yeye ha___kuja leo. (won't come) => ta
X: mcq "We will see each other tomorrow." ? Tumeonana kesho | Tulionana kesho | *Tutaonana kesho | Tunaonana jana
X: mcq "She will not come." ? Hakuja | *Hatakuja | Hakufika | Haji
X: type tomorrow => kesho
## polite-requests | polite-requests | Polite requests | A1
S: Soften requests with tafadhali, naomba, ningependa, and by asking whether the other person can.
B: **Naomba maji** (I request water). **Tafadhali nipe maji** (Please give me water). **Ningependa chai** (I would like tea). **Naweza kupata...?** (May I get...?) **Unaweza kunisaidia?** (Can you help me?). **Pole** shows sympathy, **samahani** apologises.
B: **Nipe** (give me), **niambie** (tell me), **nionyeshe** (show me) are polite with tafadhali. To address several people add **-ni** to the imperative: **Njooni!** (Come, all of you!), **Subirini.** (Wait, all of you.) Thank with **asante sana**; reply **karibu.**
E: Naomba maji. = May I have water?
E: Tafadhali nipe chai. = Please give me tea.
E: Unaweza kunisaidia? = Can you help me?
E: Ningependa kahawa. = I would like coffee.
M: Using only nataka in a shop: it sounds blunt.
M: Forgetting tafadhali.
M: Using the infinitive for "give me": *kupa* → nipe.
X: fill ___ maji, tafadhali. (May I have) => Naomba
X: fill Tafadhali ___ chai. (give me) => nipe
X: mcq The most polite way to order tea: ? Nataka chai | Nipe chai | *Ningependa chai, tafadhali | Chai!
X: mcq "Can you help me?" ? Naweza kukusaidia | *Unaweza kunisaidia | Utanisaidia | Nisaidie sana
X: type thank you very much => asante sana
## object-pronouns | object-pronouns | Object pronouns (infixes) | A2
S: The object is placed inside the verb, after the tense marker: ni-na-ku-penda.
B: **-ni-** (me), **-ku-** (you), **-m-** (him/her), **-tu-** (us), **-wa-** (you all / them): **Ninakupenda** (I love you), **Anaenda kumwona** (She goes to see him/her), **Wananisaidia** (They help me). The object infix agrees with class for things: **-ki-** (kitabu): **Ninakisoma.** **-vi-**: **Ninavisoma.** **-i-**: **Ninaiona nyumba.** **-li-**: **Ninalitaka jina.**
B: For one syllable verbs the infix attaches after the marker: **Ninamwona.** **Hawanioni.** In negative, the infix stays: **Hatukuoni.** **Nipe** and **niambie** use an object already. Use the infix for animate objects; with objects of other classes it is optional but common.
E: Ninakupenda. = I love you.
E: Anaenda kumwona. = She goes to see him/her.
E: Wananisaidia. = They help me.
E: Ninakisoma kitabu hiki. = I am reading this book.
M: Putting the object at the end only: *Ninapenda wewe* is not natural.
M: Using ku- as the infix with every object: only for "you".
M: Forgetting m- for him/her.
X: fill Ni___penda. (I love you) => naku
X: fill Wana___saidia. (They help me) => ni
X: mcq "I see him." ? Ninaona yeye | *Ninamwona | Ninamona | Ninakuona
X: mcq "I'm reading it (the book)." ? Ninasoma | Ninalisoma | *Ninakisoma | Ninavisoma
X: type I love you => ninakupenda
## connectors-opinions | connectors-opinions | Connectors and opinions | A2
S: Join ideas with na, lakini, kwa sababu, hivyo and give opinions with nafikiri/naona.
B: **na** (and), **lakini** (but), **au** (or), **kwa sababu** (because), **hivyo / kwa hiyo** (so, therefore), **ingawa** (although), **kama** (if / as), **kisha / halafu** (then). **Nafikiri / Naona kwamba...** (I think that...), **Kwa maoni yangu...** (In my opinion). Agree: **Nakubali.** Disagree: **Sikubali.**
B: **Sababu** introduces reasons: **Ninakaa hapa kwa sababu napenda mji huu.** Ask for a reason: **Kwa nini?** Then answer: **Kwa sababu...**
E: Nataka kwenda, lakini sina pesa. = I want to go, but I have no money.
E: Naona kwamba hii ni nzuri. = I think this is good.
E: Ninakaa hapa kwa sababu napenda mji huu. = I live here because I like this town.
E: Ingawa ni ghali, ninaipenda. = Although it's expensive, I like it.
M: Using *kwa sababu* alone without a clause: "kwa sababu mimi".
M: Putting *kwamba* with a verb in the infinitive.
M: Starting every sentence with na.
X: fill Nataka kwenda, ___ sina pesa. (but) => lakini
X: fill Nakaa hapa ___ sababu napenda mji. => kwa
X: mcq "I think that this is good." ? Nataka hii ni nzuri | *Naona kwamba hii ni nzuri | Sipendi kwamba nzuri | Nina hii nzuri
X: mcq "although" is ___. ? kisha | *ingawa | hivyo | halafu
X: type because => kwa sababu
`;
