// Polish extension: more B1–C2 material. Machine-drafted: have a native speaker review idioms and register notes.
export const PL_VOCAB_EXT = `
connectors|ponadto|moreover|adv|po-NAH-do|Ponadto mieszkanie ma balkon.|Moreover, the flat has a balcony.|B1
connectors|jednak|however|adv|YED-nahk|Jest późno, jednak przyjdę.|It's late, but I'll come.|B1
connectors|dlatego|therefore|adv|dlah-TEH-go|Byłem chory, dlatego zostałem w domu.|I was ill, so I stayed home.|B1
work|wynagrodzenie|salary, pay|n.n|vih-nah-grod-ZEH-nyeh|Moje wynagrodzenie rośnie co roku.|My pay rises every year.|B1
work|termin|deadline|n.m|TEHR-meen|Termin mija w piątek.|The deadline passes on Friday.|B1
work|zatrudnić|to hire|v|zah-TROOD-neech|Firma zatrudni trzy osoby.|The company will hire three people.|B1
verbs|pamiętać|to remember|v|pah-MYEN-tahch|Pamiętam jego imię.|I remember his name.|B1
verbs|zauważyć|to notice|v|zah-oo-VAH-zhich|Zauważyłem błąd.|I noticed the mistake.|B1
verbs|przyzwyczaić się|to get used to|v|pshih-zvih-CHAH-eech shyeh|Przyzwyczajam się do klimatu.|I'm getting used to the climate.|B1
society|nierówność|inequality|n.f|nyeh-ROOV-nohshch|Nierówność rośnie.|Inequality is growing.|B2
society|dzielnica|district, neighbourhood|n.f|jyel-NEE-tsah|To spokojna dzielnica.|It's a quiet district.|B2
verbs|podkreślić|to stress, underline|v|pod-KRESH-leech|Chcę podkreślić ten punkt.|I want to stress this point.|B2
verbs|osiągnąć|to achieve|v|oh-SHONG-nonch|Osiągnęła swój cel.|She achieved her goal.|B2
verbs|twierdzić|to claim|v|TFYEHR-jeech|Twierdzi, że nic nie wie.|He claims he knows nothing.|B2
adjectives|niezbędny|essential|adj|nyehz-BEND-nih|Ten dokument jest niezbędny.|This document is essential.|B2
verbs|kwestionować|to question|v|kfehs-tyoh-NOH-vahch|Nikt nie kwestionuje jego decyzji.|Nobody questions his decision.|C1
adjectives|nieunikniony|inevitable|adj|nyeh-oo-nee-KNYOH-nih|Zmiana jest nieunikniona.|Change is inevitable.|C1
society|wyzwanie|challenge|n.n|vih-ZVAH-nyeh|Klimat to globalne wyzwanie.|Climate is a global challenge.|C1
connectors|niemniej|nevertheless|adv|NYEM-nyeh|Niemniej projekt trwa.|Nevertheless, the project continues.|C1
connectors|w gruncie rzeczy|essentially|phr|v GROON-tseh ZHEH-chih|W gruncie rzeczy nie ma łatwego rozwiązania.|Essentially, there's no easy solution.|C1
adjectives|przemijający|fleeting|adj|psheh-mee-YAH-yon-tsih|Sława jest przemijająca.|Fame is fleeting.|C2
verbs|postulować|to advocate|v|pos-too-LOH-vahch|Eksperci postulują ostrożność.|Experts advocate caution.|C2
society|uszczerbek|damage, detriment|n.m|oosh-CHEHR-bek|Zrobił to z uszczerbkiem dla zdrowia.|He did it to the detriment of his health.|C2
connectors|ze względu na|in view of|phr|zeh VZGLEN-doo nah|Ze względu na sytuację przekładamy spotkanie.|In view of the situation we postpone the meeting.|C2
`;
export const PL_GRAMMAR_EXT = `
## ext-gdyby | ext-gdyby | Conditional sentences: jeśli, gdyby | B1
S: Real: jeśli + indicative. Unreal: gdyby + past-tense form, result with the conditional (-by). Past unreal uses the same forms: gdybym wiedział, byłbym przyszedł.
B: **Jeśli będzie padać, zostanę w domu.** (real, future) **Gdybym miał czas, podróżowałbym.** (unreal) The conditional particle **-by** attaches to the verb: **zrobiłbym, zrobiłabym**. Never use the future after jeśli with the same clause: Jeśli będę miał czas ...
E: Jeśli masz czas, zadzwoń. = If you have time, call.
E: Gdybym był bogaty, kupiłbym dom. = If I were rich, I'd buy a house.
E: Gdybyś mi powiedział, pomógłbym ci. = If you had told me, I'd have helped you.
E: Chciałbym kawę. = I'd like a coffee.
M: "Gdybym będę miał" → gdybym miał.
M: Forgetting that -by is feminine/masculine: zrobiłabym (f), zrobiłbym (m).
X: mcq ___ miał czas, przyszedłbym. ? Jeśli | *Gdybym | Kiedy | Żeby
X: mcq Gdybym ___ bogaty, kupiłbym dom. ? jestem | *był | będę | byłem by
X: fill ___ wiedziała, pomogłaby ci. => Gdyby
X: type Say: "I'd like a coffee." (man) => Chciałbym kawę
## ext-bezosobowe | ext-bezosobowe | Impersonal and passive constructions | B2
S: Polish often avoids the passive: się + verb (Tu się mówi po polsku) and -no/-to forms for past impersonals (Zbudowano most).
B: **Mówi się, że ...** (it is said that ...). **Mieszkanie zostało sprzedane** (passive with zostać + participle). **Wyłączono światło.** (impersonal past in -no). In formal texts you will see **-no/-to** a lot.
E: Tu się mówi po polsku. = Polish is spoken here.
E: Dom został zbudowany w 1990 roku. = The house was built in 1990.
E: Zbudowano nowy most. = A new bridge was built.
E: Mówi się, że będzie zimno. = They say it will be cold.
M: Using "jest zbudowany" for a completed process: prefer został zbudowany.
M: Making the -no form agree with a subject: it is invariable.
X: mcq Dom ___ zbudowany w 1990 roku. ? był się | *został | jest się | miał
X: mcq Zbudowano nowy most. = ? A bridge builds | *A new bridge was built | We build bridges | A bridge is built
X: fill Tu ___ mówi po polsku. => się
X: type Say: "It is said that it will be cold." => Mówi się, że będzie zimno
## ext-imieslow | ext-imieslow | Participles: -ąc and -wszy | C1
S: Imiesłów przysłówkowy współczesny (-ąc) shows an action simultaneous with the main verb; uprzedni (-wszy / -łszy) shows an earlier action. Both share the subject of the main clause.
B: **Czytając książkę, słuchał muzyki.** (While reading ...) **Przeczytawszy list, wyszedł.** (Having read the letter ...). Imperfective verbs make -ąc, perfective verbs -wszy. The subject must be the same in both clauses.
E: Idąc do pracy, spotkałem Annę. = While walking to work, I met Anna.
E: Wróciwszy do domu, zjadł obiad. = Having returned home, he ate lunch.
E: Mówiąc o tym, zapomniałem o czasie. = Talking about it, I lost track of time.
E: Przeczytawszy list, zadzwoniła. = Having read the letter, she called.
M: Using -ąc with a different subject in the second clause.
M: Using -wszy from an imperfective verb.
X: mcq ___ do pracy, spotkałem Annę. ? Iść | *Idąc | Poszedłem | Szedłem
X: mcq Which shows an earlier action? ? Czytając | *Przeczytawszy | Czyta | Czytał
X: fill ___ (czytać) książkę, słuchał muzyki. => Czytając
X: type Say: "While walking to work, I met Anna." => Idąc do pracy, spotkałem Annę
`;
export const PL_CONVS_EXT = `
## ext-b1-landlord | ext-b1-landlord | Renting a flat | B1 | You call about a flat for rent.
N: Halo, słucham. = Hello, I'm listening.
Y: Dzień dobry, dzwonię w sprawie mieszkania z ogłoszenia. Czy jest jeszcze dostępne? = Hello, I'm calling about the flat in the ad. Is it still available? || Poproszę bilet do Krakowa. = A ticket to Kraków, please. || Gdzie jest dworzec? = Where is the station? :: mieszkania,ogłoszenia,dostępne
N: Tak, kosztuje sześćset euro miesięcznie z opłatami. = Yes, it costs six hundred euros a month including bills.
Y: Czy mógłbym je obejrzeć w ten weekend? = Could I view it this weekend? || Oglądam wczoraj mieszkanie. = I view the flat yesterday. || Mleko jest drogie. = Milk is expensive. :: obejrzeć,weekend
N: Oczywiście. W sobotę o jedenastej? = Of course. Saturday at eleven?
Y: Tak, doskonale. Do soboty! = Yes, perfect. See you Saturday! || Nic nie pamiętam. = I remember nothing. || Do widzenia do wczoraj. = Goodbye until yesterday. :: doskonale,sobota
## ext-c1-interview | ext-c1-interview | A radio interview | C1 | You are interviewed about a social issue.
N: Niektórzy mówią, że problem mieszkaniowy jest nie do rozwiązania. Co pan o tym sądzi? = Some say the housing problem can't be solved. What do you think?
Y: Nie posunąłbym się tak daleko; to duże wyzwanie, ale niektóre środki już zadziałały. = I wouldn't go that far; it's a big challenge, but some measures have worked. || To wyzwanie, ale są środki. = (flatter) || Nie ma rozwiązania, bo nie. = There's no solution because no. :: wyzwanie,środki
N: Na przykład? = For example?
Y: Ograniczenie najmu turystycznego i budowa mieszkań komunalnych. = Limiting tourist rentals and building municipal housing. || Wynająć jutro rynek. = Rent the market tomorrow. || Wszystko jest drogie, bo tak. = Everything is expensive because so. :: najmu,mieszkań
N: Dziękuję za rozmowę. = Thank you for the conversation.
Y: Również dziękuję. To była przyjemność. = Thank you too. It was a pleasure. || Do widzenia wczoraj. = Goodbye yesterday. || To nie szkodzi. = It doesn't matter. :: przyjemność,dziękuję
`;
export const PL_READING_EXT = `
## ext-r-b2-city | ext-r-b2 | Miasto piętnastu minut | B2
P: Niektórzy urbaniści proponują, aby każdy mieszkaniec mógł załatwić najważniejsze sprawy w promieniu piętnastu minut pieszo. Pomysł polega na ograniczeniu ruchu i wzmocnieniu małych sklepów w dzielnicy. = Some planners propose that every resident can handle the most important matters within a fifteen-minute walk. The idea is to limit traffic and strengthen small shops in the district.
P: Krytycy jednak zauważają, że nie każde miasto da się tak przebudować, a ceny mieszkań mogą wzrosnąć w najlepiej wyposażonych dzielnicach. = Critics, however, note that not every city can be rebuilt this way, and housing prices may rise in the best-equipped districts.
G: promień = radius ; wzmocnić = to strengthen ; wyposażony = equipped
Q: mcq Dlaczego ceny mogą wzrosnąć? ? bo ruch się ogranicza | *bo dzielnice są lepiej wyposażone | bo małe sklepy się zamykają | bo każdy mieszkaniec idzie piętnaście minut
Q: mcq Co chce się ograniczyć? ? sklepy | *ruch | dzielnice | mieszkania
Q: mcq Na czym polega pomysł? ? więcej samochodów | *sprawy załatwia się blisko domu | mniej sklepów | droższe mieszkania
## ext-r-c1-memory | ext-r-c1 | Pamięć selektywna | C1
P: Chętnie sądzimy, że pamiętać znaczy wiernie odtwarzać przeszłość, lecz liczne badania pokazują coś przeciwnego: za każdym razem, gdy przywołujemy wspomnienie, budujemy je na nowo i przy okazji subtelnie zmieniamy. = We readily believe that remembering means faithfully reproducing the past, but numerous studies show the opposite: each time we call up a memory we rebuild it and subtly change it along the way.
P: To tłumaczy, dlaczego dwaj świadkowie tego samego zdarzenia mogą podać niezgodne wersje, choć żaden z nich nie kłamie. = That explains why two witnesses to the same event can give incompatible versions although neither is lying.
G: wiernie = faithfully ; przywołać = to call up ; subtelnie = subtly
Q: mcq Co pokazują badania? ? że pamiętać to wiernie odtwarzać przeszłość | *że każde wspomnienie budujemy na nowo | że dwaj świadkowie zawsze kłamią | że żadne wspomnienie się nie zmienia
Q: mcq Dlaczego wspomnienie się zmienia? ? bo wiernie odtwarzamy przeszłość | *bo budujemy je na nowo, gdy je przywołujemy | bo dwaj świadkowie podają wersje | bo jeden z nich kłamie
Q: mcq Co robimy, przywołując wspomnienie? ? odtwarzamy je wiernie | *budujemy je na nowo i zmieniamy | dajemy je świadkom | wymazujemy je
`;
export const PL_LISTENING_EXT = `
## ext-l-b2-radio | ext-l-b2 | Dyskusja w radiu | B2
L: Prowadząca: Dziś rozmawiamy o pracy zdalnej. Karim, co pan o tym sądzi? = Today we talk about remote work. Karim, what do you think?
L: Karim: Myślę, że przyniosła korzyści, choć nie we wszystkich branżach. = I think it has brought benefits, though not in all sectors.
L: Prowadząca: A wady? = And the drawbacks?
L: Karim: Przede wszystkim izolacja i trudność oddzielenia pracy od życia prywatnego. = Above all isolation and the difficulty of separating work from private life.
L: Prowadząca: Dziękuję bardzo, Karim. = Thank you very much, Karim.
Q: mcq O czym rozmawiają? ? o ruchu | *o pracy zdalnej | o turystyce | o gotowaniu
Q: mcq Jaką wadę podaje Karim? ? wynagrodzenie | *izolację | ruch | godziny pracy
## ext-l-c1-lecture | ext-l-c1 | Wykład | C1
L: Profesor: Chcę podkreślić, że zmiana językowa nie jest zepsuciem, lecz naturalnym rozwojem. = I want to stress that language change isn't corruption but natural development.
L: Profesor: Słowa, które dziś wydają się błędne, kilka wieków temu były normalne. = Words that seem wrong today were normal a few centuries ago.
L: Studentka: Czyli w języku nie ma błędu? = So there is no error in language?
L: Profesor: Norma istnieje, ale zmienia się wraz z użyciem. = The norm exists, but it changes with use.
Q: mcq Co twierdzi profesor? ? że zmiana to zepsucie | *że zmiana to naturalny rozwój | że nie ma normy | że nic się nie zmienia
Q: mcq Co mówi o normie? ? jest stała | *zmienia się wraz z użyciem | nie istnieje | to opinia
`;
export const PL_WRITING_EXT = `
## w-ext-b2-email | ext-w-b2 | A formal enquiry | B2 | 60
T: Write a formal email (8–10 lines) to a language school asking about courses, price and dates. Use a formal greeting, formal address (Pani/Pan) and at least two polite conditionals (czy mogliby Państwo, chciałbym).
R: Greeting = Szanowni Państwo, Dzień dobry ; Request = chciałbym, czy mogliby Państwo ; Question = ile kosztuje, kiedy się zaczyna ; Closing = z poważaniem, pozdrawiam
M: Szanowni Państwo, chciałbym uzyskać informacje o kursach polskiego w przyszłym semestrze. Czy mogliby Państwo podać ceny i terminy rozpoczęcia? Chciałbym też wiedzieć, czy są kursy wieczorne. Z poważaniem, Jan Kowalski. = Dear Sir or Madam, I'd like information about Polish courses next term. Could you give prices and start dates? I'd also like to know whether there are evening courses. Yours sincerely, Jan Kowalski.
## w-ext-c1-essay | ext-w-c1 | An argumentative essay | C1 | 90
T: Write 12–15 lines arguing for or against a four-day working week. Use a concession (chociaż, mimo że), a hypothesis (gdyby + conditional) and a formal connector (niemniej, w gruncie rzeczy).
R: Concession = chociaż, mimo że ; Hypothesis = gdyby, -by ; Connector = niemniej, w gruncie rzeczy, zatem ; Opinion = moim zdaniem, z mojego punktu widzenia
M: Moim zdaniem czterodniowy tydzień pracy zwiększyłby wydajność. Chociaż niektóre branże nie mogą go wprowadzić, gdyby stosowano go elastycznie, pracownicy byliby mniej zmęczeni. Niemniej trzeba by ocenić koszty. W gruncie rzeczy warto spróbować. = In my opinion a four-day week would raise productivity. Although some sectors can't introduce it, if applied flexibly, employees would be less tired. Nevertheless, costs would have to be assessed. Essentially, it's worth trying.
`;
export const PL_PLACEMENT_EXT = `
vocabulary | B1 | - | mcq "Termin mija w piątek" means ___. ? the price drops | *the deadline passes on Friday | the place closes | the plan starts
grammar | B1 | - | mcq ___ miał czas, przyszedłby. ? Jeśli | *Gdyby | Kiedy | Żeby
grammar | B2 | - | mcq Dom ___ zbudowany w 1990 roku. ? był się | *został | jest się | miał
vocabulary | B2 | - | mcq "Podkreślić" means ___. ? to lose | *to stress | to leave | to read
grammar | C1 | - | mcq ___ do pracy, spotkałem Annę. ? Iść | *Idąc | Poszedłem | Szedłem
vocabulary | C1 | - | mcq "Niemniej" is closest to ___. ? dlatego | *jednak | ponadto | bo
vocabulary | C2 | - | mcq "Przemijający" means ___. ? eternal | *fleeting | strong | clear
vocabulary | C2 | - | mcq "Ze względu na" means ___. ? despite | *in view of | in front of | instead of
`;
