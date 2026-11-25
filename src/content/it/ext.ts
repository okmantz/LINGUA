// Italian extension: more B1–C2 material. Machine-drafted: have a native speaker review idioms and register notes.
export const IT_VOCAB_EXT = `
connectors|inoltre|moreover|adv|ee-NOHL-treh|Inoltre, l'appartamento ha un balcone.|Moreover, the flat has a balcony.|B1
connectors|tuttavia|however|adv|toot-tah-VEE-ah|È tardi; tuttavia vengo.|It's late; however I'm coming.|B1
connectors|perciò|therefore|adv|pehr-CHOH|Ero malato, perciò sono rimasto a casa.|I was ill, so I stayed home.|B1
work|lo stipendio|salary|n.m|loh stee-PEHN-dyoh|Il mio stipendio aumenta ogni anno.|My salary goes up every year.|B1
work|la scadenza|deadline|n.f|lah skah-DEHN-tsah|La scadenza è venerdì.|The deadline is Friday.|B1
work|assumere|to hire|v|ahs-SOO-meh-reh|L'azienda assume tre persone.|The company is hiring three people.|B1
verbs|ricordarsi di|to remember|v|ree-kor-DAR-see dee|Mi ricordo del suo nome.|I remember his name.|B1
verbs|accorgersi di|to notice, realize|v|ahk-KOR-jehr-see dee|Mi sono accorto dell'errore.|I noticed the mistake.|B1
verbs|abituarsi a|to get used to|v|ah-bee-too-AR-see ah|Mi abituo al clima.|I'm getting used to the climate.|B1
society|la disuguaglianza|inequality|n.f|lah dee-zoo-gwah-LYAHN-tsah|La disuguaglianza cresce.|Inequality is growing.|B2
society|il quartiere|neighbourhood|n.m|eel kwar-TYEH-reh|È un quartiere tranquillo.|It's a quiet neighbourhood.|B2
verbs|sottolineare|to underline, stress|v|sot-toh-lee-neh-AH-reh|Voglio sottolineare questo punto.|I want to stress this point.|B2
verbs|raggiungere|to reach, achieve|v|rahd-JOON-jeh-reh|Ha raggiunto il suo obiettivo.|She reached her goal.|B2
verbs|sostenere|to claim; to support|v|sos-teh-NEH-reh|Sostiene di non sapere niente.|He claims to know nothing.|B2
adjectives|indispensabile|essential|adj|een-dee-spehn-SAH-bee-leh|Questo documento è indispensabile.|This document is essential.|B2
verbs|mettere in discussione|to call into question|v|MEHT-teh-reh een dee-skoos-SYOH-neh|Nessuno mette in discussione la sua scelta.|Nobody questions his choice.|C1
adjectives|inevitabile|inevitable|adj|ee-neh-vee-TAH-bee-leh|Il cambiamento è inevitabile.|Change is inevitable.|C1
society|la sfida|challenge|n.f|lah SFEE-dah|Il clima è una sfida globale.|Climate is a global challenge.|C1
connectors|nondimeno|nevertheless|adv|non-dee-MEH-noh|Nondimeno, il progetto va avanti.|Nevertheless, the project goes ahead.|C1
connectors|in sostanza|in essence|phr|een sohs-TAHN-tsah|In sostanza, non c'è una soluzione facile.|In essence, there's no easy solution.|C1
adjectives|effimero|fleeting|adj|ehf-FEE-meh-roh|La fama è effimera.|Fame is fleeting.|C2
verbs|caldeggiare|to advocate warmly|v|kahl-dehd-JAH-reh|Gli esperti caldeggiano la prudenza.|Experts strongly advocate caution.|C2
society|il pregiudizio|prejudice; harm|n.m|eel preh-joo-DEET-syoh|Ha agito a suo pregiudizio.|He acted to his own detriment.|C2
connectors|in considerazione di|in view of|phr|een kon-see-deh-rah-TSYOH-neh dee|In considerazione della situazione, rinviamo.|In view of the situation we postpone.|C2
`;
export const IT_GRAMMAR_EXT = `
## ext-periodo-ipotetico | ext-periodo-ipotetico | Conditional sentences (periodo ipotetico) | B1
S: Real: se + indicativo presente, presente o futuro. Unreal: se + congiuntivo imperfetto, condizionale presente. Impossible past: se + congiuntivo trapassato, condizionale passato.
B: **Se piove, resto a casa.** **Se avessi tempo, viaggerei.** **Se l'avessi saputo, sarei venuto.** Never use the conditional after se: not "se avrei", but "se avessi".
E: Se studi, passi l'esame. = If you study, you'll pass the exam.
E: Se fossi ricco, comprerei una casa. = If I were rich, I'd buy a house.
E: Se l'avessi saputo, sarei venuto. = If I had known, I would have come.
E: Te lo direi se potessi. = I'd tell you if I could.
M: "Se avrei tempo" → se avessi tempo.
M: Using the present subjunctive after se.
X: mcq Se ___ più tempo, viaggerei. ? ho | *avessi | avrei | abbia
X: mcq Se ___ saputo, saremmo venuti. ? abbiamo | *avessimo | avremmo | avevamo
X: fill Se io ___ (essere) te, parlerei. => fossi
X: type Say: "If it rains, I stay home." => Se piove, resto a casa
## ext-passivo | ext-passivo | The passive and si passivante | B2
S: The passive uses essere (or venire) + participio passato. Everyday Italian often prefers si passivante: Si vendono case.
B: **La casa è stata costruita da operai.** **Il libro viene letto.** With **si**, the verb agrees with the plural noun: **Si parlano tre lingue.** **Andare** + participle can mean "must be done": Il lavoro va finito.
E: La lettera è stata scritta ieri. = The letter was written yesterday.
E: Si vendono appartamenti. = Flats for sale.
E: Il lavoro va finito entro venerdì. = The work must be finished by Friday.
E: Qui si parla italiano. = Italian is spoken here.
M: "Si vende case" → si vendono case.
M: Using avere instead of essere in the passive.
X: mcq Il libro ___ scritto da Dante. ? ha | *è stato | sono | era stati
X: mcq ___ tre lingue in questo ufficio. ? Si parla | *Si parlano | È parlato | Parlano si
X: fill ___ (vendere) auto usate. => Si vendono
X: type Say: "The work must be finished." => Il lavoro va finito
## ext-concessive | ext-concessive | Concession and purpose with the subjunctive | C1
S: Benché, sebbene, nonostante, affinché, senza che take the congiuntivo; anche se can take the indicative for facts.
B: **Benché sia stanco, lavora.** **Anche se è stanco, lavora** (fact). **Te lo spiego affinché tu capisca.** **È uscito senza che nessuno lo vedesse.** After **nonostante** + noun: nonostante la pioggia.
E: Sebbene piova, usciamo. = Although it's raining, we go out.
E: Qualunque cosa tu faccia, ti aiuterò. = Whatever you do, I'll help you.
E: Lo ripeto affinché sia chiaro. = I repeat it so it's clear.
E: È partito senza che lo sapessi. = He left without my knowing.
M: "Benché è" → benché sia.
M: Using the indicative after affinché.
X: mcq Benché lei ___ malata, viene. ? è | *sia | sarà | era
X: mcq Parlo piano affinché tu ___. ? capisci | *capisca | capirai | capivi
X: fill È partito senza che io lo ___ (sapere). => sapessi
X: type Say: "Although it's raining, we go out." => Sebbene piova, usciamo
`;
export const IT_CONVS_EXT = `
## ext-b1-landlord | ext-b1-landlord | Renting a flat | B1 | You call about a flat for rent.
N: Pronto? = Hello?
Y: Buongiorno, chiamo per l'appartamento dell'annuncio. È ancora disponibile? = Hello, I'm calling about the flat in the ad. Is it still available? || Vorrei un biglietto per Roma. = I'd like a ticket to Rome. || Dov'è la stazione? = Where is the station? :: appartamento,annuncio,disponibile
N: Sì, costa seicento euro al mese, spese comprese. = Yes, it's six hundred euros a month, bills included.
Y: Potrei vederlo questo fine settimana? = Could I see it this weekend? || Vedo ieri l'appartamento. = I see the flat yesterday. || Il latte è caro. = Milk is expensive. :: vedere,fine settimana
N: Certo. Sabato alle undici va bene? = Of course. Saturday at eleven suits you?
Y: Sì, perfetto. A sabato! = Yes, perfect. See you Saturday! || Non mi ricordo di niente. = I don't remember anything. || Arrivederci a ieri. = Goodbye until yesterday. :: perfetto,sabato
## ext-c1-interview | ext-c1-interview | A radio interview | C1 | You are interviewed about a social issue.
N: Alcuni dicono che il problema della casa sia insolubile. Lei che ne pensa? = Some say the housing problem is unsolvable. What do you think?
Y: Non direi così; è una sfida enorme, ma alcune misure hanno già dato risultati. = I wouldn't put it that way; it's a huge challenge, but some measures have already worked. || È una sfida, ma ci sono misure. = (flatter) || Non c'è soluzione perché no. = There's no solution because no. :: sfida,misure
N: Per esempio? = For example?
Y: Limitare gli affitti turistici e costruire più case popolari. = Limiting tourist rentals and building more public housing. || Affittare domani il mercato. = Rent the market tomorrow. || Tutto costa perché sì. = Everything costs because yes. :: affitti,case
N: Grazie del tempo. = Thanks for your time.
Y: Prego. È stato un piacere. = You're welcome. It was a pleasure. || Arrivederci ieri. = Goodbye yesterday. || Non importa. = It doesn't matter. :: piacere,prego
`;
export const IT_READING_EXT = `
## ext-r-b2-city | ext-r-b2 | La città dei quindici minuti | B2
P: Alcuni urbanisti propongono che ogni abitante possa soddisfare i bisogni essenziali nel raggio di quindici minuti a piedi. L'idea è ridurre il traffico e rafforzare i piccoli negozi di quartiere. = Some planners propose that every resident can meet their essential needs within a fifteen-minute walk. The idea is to reduce traffic and strengthen small neighbourhood shops.
P: Tuttavia i critici fanno notare che non tutte le città possono riorganizzarsi così, e che i prezzi delle case potrebbero salire nei quartieri meglio attrezzati. = However critics point out that not every city can reorganise this way, and that house prices could rise in the best-equipped neighbourhoods.
G: raggio = radius ; rafforzare = to strengthen ; attrezzati = equipped
Q: mcq Perché i prezzi potrebbero salire? ? perché il traffico diminuisce | *perché i quartieri sono meglio attrezzati | perché i piccoli negozi chiudono | perché ogni abitante cammina quindici minuti
Q: mcq Che cosa si vuole ridurre? ? i negozi | *il traffico | i quartieri | le case
Q: mcq Qual è l'idea di base? ? più auto | *servizi vicini a casa | meno negozi | case più care
## ext-r-c1-memory | ext-r-c1 | La memoria selettiva | C1
P: Si pensa volentieri che ricordare significhi riprodurre fedelmente il passato, ma numerosi studi dimostrano il contrario: ogni volta che evochiamo un ricordo lo ricostruiamo e, così facendo, lo modifichiamo in modo sottile. = People readily think that remembering means faithfully reproducing the past, but many studies show the opposite: each time we recall a memory we rebuild it and, in doing so, subtly change it.
P: Ciò spiega perché due testimoni dello stesso fatto possano dare versioni incompatibili senza che nessuno dei due menta. = That explains why two witnesses to the same event can give incompatible versions without either lying.
G: evocare = to call up ; fedelmente = faithfully ; sottile = subtle
Q: mcq Che cosa dimostrano gli studi? ? che ricordare significa riprodurre fedelmente il passato | *che ogni ricordo viene ricostruito quando lo evochiamo | che due testimoni mentono sempre | che nessun ricordo si modifica
Q: mcq Perché un ricordo cambia? ? perché lo riproduciamo fedelmente | *perché lo ricostruiamo ogni volta che lo evochiamo | perché due testimoni lo raccontano | perché uno dei due mente
Q: mcq Che cosa facciamo quando evochiamo un ricordo? ? lo riproduciamo fedelmente | *lo ricostruiamo e lo modifichiamo | lo diamo ai testimoni | lo cancelliamo
`;
export const IT_LISTENING_EXT = `
## ext-l-b2-radio | ext-l-b2 | Un dibattito alla radio | B2
L: Conduttrice: Oggi parliamo di lavoro da casa. Karim, che ne pensa? = Today we talk about working from home. Karim, what do you think?
L: Karim: Penso che abbia portato vantaggi, anche se non vale per tutti i settori. = I think it has brought advantages, even if it doesn't apply to all sectors.
L: Conduttrice: E gli svantaggi? = And the drawbacks?
L: Karim: Soprattutto l'isolamento, e la difficoltà di separare vita privata e lavoro. = Mainly isolation, and the difficulty separating private life and work.
L: Conduttrice: Grazie mille, Karim. = Thanks a lot, Karim.
Q: mcq Di che cosa parlano? ? del traffico | *del lavoro da casa | del turismo | della cucina
Q: mcq Quale svantaggio cita Karim? ? lo stipendio | *l'isolamento | il traffico | gli orari
## ext-l-c1-lecture | ext-l-c1 | Una lezione | C1
L: Professoressa: Voglio sottolineare che il cambiamento linguistico non è corruzione, ma evoluzione naturale. = I want to stress that language change isn't corruption but natural evolution.
L: Professoressa: Parole che oggi ci sembrano sbagliate erano normali secoli fa. = Words that seem wrong today were normal centuries ago.
L: Studente: Quindi l'errore non esiste in una lingua? = So error doesn't exist in a language?
L: Professoressa: La norma esiste, ma cambia con l'uso. = The norm exists, but it changes with use.
Q: mcq Che cosa sostiene la professoressa? ? che il cambiamento è corruzione | *che il cambiamento è evoluzione naturale | che non c'è norma | che nulla cambia
Q: mcq Che cosa dice della norma? ? è fissa | *cambia con l'uso | non esiste | è un'opinione
`;
export const IT_WRITING_EXT = `
## w-ext-b2-email | ext-w-b2 | A formal enquiry | B2 | 60
T: Write a formal email (8–10 lines) to a language school asking about courses, price and dates. Use a formal greeting, Lei forms and at least two polite conditionals (potrebbe, vorrei).
R: Greeting = Gentili signori, Egregio ; Request = vorrei, potrebbe ; Question = quanto costa, quando inizia ; Closing = cordiali saluti, distinti saluti
M: Gentili signori, vorrei informazioni sui vostri corsi di italiano del prossimo trimestre. Potreste indicarmi i prezzi e le date di inizio? Vorrei anche sapere se avete corsi serali. Resto a disposizione. Cordiali saluti, Anna Rossi. = Dear Sirs, I'd like information on your Italian courses next term. Could you tell me the prices and start dates? I'd also like to know if you have evening courses. I remain at your disposal. Kind regards, Anna Rossi.
## w-ext-c1-essay | ext-w-c1 | An argumentative essay | C1 | 90
T: Write 12–15 lines arguing for or against a four-day working week. Use a concession (benché + congiuntivo), a hypothesis (se + congiuntivo imperfetto) and a formal connector (nondimeno, in sostanza).
R: Concession = benché, sebbene ; Hypothesis = se, congiuntivo imperfetto ; Connector = nondimeno, in sostanza, pertanto ; Opinion = a mio avviso, dal mio punto di vista
M: A mio avviso la settimana di quattro giorni migliorerebbe la produttività. Benché alcuni settori non possano adottarla, se fosse applicata con flessibilità, i dipendenti sarebbero meno stanchi. Nondimeno bisognerebbe valutare i costi. In sostanza, vale la pena provare. = In my view the four-day week would improve productivity. Although some sectors can't adopt it, if applied flexibly, employees would be less tired. Nevertheless, costs would need assessing. In essence, it's worth trying.
`;
export const IT_PLACEMENT_EXT = `
vocabulary | B1 | - | mcq "La scadenza è venerdì" means ___. ? the price drops | *the deadline is Friday | the place closes | the plan starts
grammar | B1 | - | mcq Se ___ tempo, verrei con te. ? ho | *avessi | avrei | avrò
grammar | B2 | - | mcq ___ tre lingue in questo ufficio. ? Si parla | *Si parlano | È parlato | Parlano si
vocabulary | B2 | - | mcq "Sottolineare" means ___. ? to lose | *to underline | to leave | to read
grammar | C1 | - | mcq Benché lei ___ malata, viene. ? è | *sia | sarà | era
vocabulary | C1 | - | mcq "Nondimeno" is closest to ___. ? perciò | *tuttavia | inoltre | perché
vocabulary | C2 | - | mcq "Effimero" means ___. ? eternal | *fleeting | strong | clear
vocabulary | C2 | - | mcq "In considerazione di" means ___. ? despite | *in view of | in front of | instead of
`;
