// German extension: more B1–C2 material. Machine-drafted: have a native speaker review idioms and register notes.
export const DE_VOCAB_EXT = `
connectors|außerdem|besides|adv|OW-ser-dehm|Außerdem hat die Wohnung einen Balkon.|Besides, the flat has a balcony.|B1
connectors|trotzdem|nevertheless|adv|TROTS-dehm|Es regnet, trotzdem gehen wir spazieren.|It's raining, but we're going for a walk anyway.|B1
connectors|deshalb|therefore|adv|DES-halp|Ich war krank, deshalb bin ich zu Hause geblieben.|I was ill, so I stayed at home.|B1
work|das Gehalt|salary|n.n|dahs geh-HALT|Mein Gehalt steigt jedes Jahr.|My salary rises every year.|B1|Plural: die Gehälter
work|die Frist|deadline|n.f|dee FRIST|Die Frist endet am Freitag.|The deadline ends on Friday.|B1|Plural: die Fristen
work|einstellen|to hire|v|YN-shteh-len|Die Firma stellt drei Leute ein.|The company is hiring three people.|B1|separable: stellt ... ein
verbs|sich erinnern an|to remember|v|zikh er-IN-ern ahn|Ich erinnere mich an seinen Namen.|I remember his name.|B1|+ Akkusativ
verbs|sich gewöhnen an|to get used to|v|zikh geh-VÖ-nen ahn|Ich gewöhne mich an das Klima.|I'm getting used to the climate.|B1|+ Akkusativ
verbs|verabreden|to arrange (to meet)|v|fer-AHP-ray-den|Wir verabreden uns für sechs Uhr.|We arrange to meet at six.|B1
society|die Ungleichheit|inequality|n.f|dee OON-glykh-hyt|Die Ungleichheit wächst.|Inequality is growing.|B2|Plural: die Ungleichheiten
society|das Viertel|neighbourhood|n.n|dahs FIR-tel|Das ist ein ruhiges Viertel.|It's a quiet neighbourhood.|B2|Plural: die Viertel
verbs|betonen|to stress, emphasise|v|beh-TOH-nen|Ich möchte diesen Punkt betonen.|I'd like to stress this point.|B2
verbs|erreichen|to achieve, reach|v|er-Y-khen|Sie hat ihr Ziel erreicht.|She reached her goal.|B2
verbs|behaupten|to claim|v|beh-HOW-pten|Er behauptet, nichts zu wissen.|He claims to know nothing.|B2
adjectives|unverzichtbar|indispensable|adj|oon-fer-TSIKHT-bar|Dieses Dokument ist unverzichtbar.|This document is indispensable.|B2
verbs|infrage stellen|to question|v|in-FRAH-geh SHTEL-en|Niemand stellt seine Entscheidung infrage.|Nobody questions his decision.|C1
adjectives|unvermeidlich|inevitable|adj|oon-fer-MYT-likh|Die Veränderung ist unvermeidlich.|Change is inevitable.|C1
society|die Herausforderung|challenge|n.f|dee her-OWS-for-der-oong|Der Klimawandel ist eine globale Herausforderung.|Climate change is a global challenge.|C1|Plural: die Herausforderungen
connectors|dennoch|nevertheless|adv|DEN-nokh|Dennoch geht das Projekt weiter.|Nevertheless, the project continues.|C1
connectors|insgesamt|overall|adv|in-ZGHAMT|Insgesamt war es ein Erfolg.|Overall it was a success.|C1
adjectives|vergänglich|fleeting|adj|fer-GENG-likh|Ruhm ist vergänglich.|Fame is fleeting.|C2
verbs|befürworten|to advocate|v|beh-FÜR-vor-ten|Die Experten befürworten Vorsicht.|Experts advocate caution.|C2
society|der Nachteil|disadvantage, detriment|n.m|dehr NAHKH-tyl|Das gereicht ihm zum Nachteil.|That works to his detriment.|C2|Plural: die Nachteile
connectors|angesichts|in view of|prep|AHN-geh-zikhts|Angesichts der Lage verschieben wir das.|In view of the situation we're postponing it.|C2|+ Genitiv
`;
export const DE_GRAMMAR_EXT = `
## ext-konj2 | ext-konj2 | Unreal conditions with Konjunktiv II | B1
S: Wenn + Konjunktiv II in the clause, würde + infinitive (or the Konjunktiv II form) in the result: Wenn ich Zeit hätte, würde ich reisen.
B: **hätte, wäre, könnte, müsste, würde** are the common forms. The impossible past uses **hätte/wäre + Partizip II**: Wenn ich gewusst hätte, wäre ich gekommen. Use **ich würde gern** and **ich hätte gern** for polite wishes.
E: Wenn ich reich wäre, kaufte ich ein Haus. = If I were rich, I'd buy a house.
E: Wenn ich Zeit hätte, würde ich kommen. = If I had time, I'd come.
E: Hätte ich das gewusst, wäre ich geblieben. = Had I known, I'd have stayed.
E: Ich hätte gern einen Kaffee. = I'd like a coffee.
M: "Wenn ich würde Zeit haben" → Wenn ich Zeit hätte.
M: Using würde in both clauses with sein/haben: use wäre/hätte.
X: mcq Wenn ich Zeit ___, käme ich mit. ? habe | *hätte | haben würde | hatte
X: mcq Wenn wir das ___ , wären wir gekommen. ? wissen | *gewusst hätten | gewusst haben | wüssten würden
X: fill Wenn ich du ___ , würde ich sprechen. => wäre
X: type Say: "I'd like a coffee." => Ich hätte gern einen Kaffee
## ext-passiv | ext-passiv | The passive and its alternatives | B2
S: werden + Partizip II is the process passive; sein + Partizip II describes the resulting state. Alternatives: man, sich lassen + infinitive, -bar adjectives.
B: **Das Haus wird gebaut** (process) vs **Das Haus ist gebaut** (result). Agent with **von** + Dativ, means with **durch** + Akkusativ: Das Haus wurde von Arbeitern gebaut. With a modal: **Das muss gemacht werden.**
E: Das Auto wird repariert. = The car is being repaired.
E: Das Auto ist repariert. = The car is repaired.
E: Der Brief wurde gestern geschrieben. = The letter was written yesterday.
E: Das lässt sich leicht erklären. = That can be explained easily.
M: "Das Haus wird gebaut worden" → ist gebaut worden (perfect passive uses sein + worden).
M: Using von for means: use durch.
X: mcq Das Buch ___ von Goethe geschrieben. ? ist | *wurde | hat | wird worden
X: mcq Das Fenster ___ jetzt repariert. ? ist | *wird | hat | wurde
X: fill Das muss gemacht ___. => werden
X: type Say: "The letter was written yesterday." => Der Brief wurde gestern geschrieben
## ext-konj1 | ext-konj1 | Reported speech with Konjunktiv I | C1
S: Konjunktiv I marks reported speech: er sei, sie habe, er komme. If it looks like the indicative, use Konjunktiv II.
B: **Er sagt, er sei müde.** (He says he's tired.) For plural or when forms coincide: **Sie sagten, sie hätten keine Zeit** (not "haben"). Past: **Er sagte, er sei gekommen.** Newspapers use it to keep a distance from a claim.
E: Der Minister sagte, er sei zufrieden. = The minister said he was satisfied.
E: Sie sagte, sie habe keine Zeit. = She said she had no time.
E: Die Zeugen sagten, sie hätten nichts gesehen. = The witnesses said they had seen nothing.
E: Er behauptet, er komme morgen. = He claims he's coming tomorrow.
M: "Sie sagte, sie haben" → hätten (Konjunktiv II when Konjunktiv I matches the indicative).
M: Using Konjunktiv I in everyday speech where the indicative or Konjunktiv II is normal.
X: mcq Er sagt, er ___ müde. ? ist | *sei | wäre | war
X: mcq Sie sagten, sie ___ keine Zeit. ? haben | *hätten | hatten | habe
X: fill Er sagte, er ___ gekommen (sein). => sei
X: type Say: "She said she had no time." => Sie sagte, sie habe keine Zeit
`;
export const DE_CONVS_EXT = `
## ext-b1-landlord | ext-b1-landlord | Renting a flat | B1 | You call about a flat for rent.
N: Hallo, hier ist die Hausverwaltung. = Hello, this is the property management.
Y: Guten Tag, ich rufe wegen der Wohnung in der Anzeige an. Ist sie noch frei? = Hello, I'm calling about the flat in the ad. Is it still available? || Ich möchte eine Fahrkarte nach Köln. = I'd like a ticket to Cologne. || Wo ist der Bahnhof? = Where is the station? :: Wohnung,Anzeige,frei
N: Ja, sie kostet sechshundert Euro warm. = Yes, it costs six hundred euros including utilities.
Y: Könnte ich sie dieses Wochenende besichtigen? = Could I view it this weekend? || Ich besichtige gestern die Wohnung. = I view the flat yesterday. || Die Milch ist teuer. = Milk is expensive. :: besichtigen,Wochenende
N: Gern. Samstag um elf Uhr? = Gladly. Saturday at eleven?
Y: Ja, das passt gut. Bis Samstag! = Yes, that suits me. See you Saturday! || Ich erinnere mich an nichts. = I remember nothing. || Auf Wiedersehen bis gestern. = Goodbye until yesterday. :: passt,Samstag
## ext-c1-interview | ext-c1-interview | A radio interview | C1 | You are interviewed about a social issue.
N: Manche sagen, die Wohnungsnot sei unlösbar. Was meinen Sie? = Some say the housing shortage is unsolvable. What do you think?
Y: So weit würde ich nicht gehen; es ist eine große Herausforderung, aber einige Maßnahmen haben bereits gewirkt. = I wouldn't go that far; it's a big challenge, but some measures have already worked. || Es ist eine Herausforderung, aber es gibt Maßnahmen. = (flatter) || Es gibt keine Lösung, weil nein. = There's no solution because no. :: Herausforderung,Maßnahmen
N: Zum Beispiel? = For example?
Y: Mietbegrenzungen und mehr sozialer Wohnungsbau. = Rent caps and more social housing. || Morgen die Miete kaufen. = Buy the rent tomorrow. || Alles ist teuer, weil ja. = Everything is expensive because yes. :: Miet,Wohnungsbau
N: Vielen Dank für das Gespräch. = Thank you for the conversation.
Y: Sehr gern. Es war mir ein Vergnügen. = My pleasure. It was a pleasure for me. || Auf Wiedersehen gestern. = Goodbye yesterday. || Das macht nichts. = It doesn't matter. :: gern,Vergnügen
`;
export const DE_READING_EXT = `
## ext-r-b2-city | ext-r-b2 | Die Viertelstunden-Stadt | B2
P: Einige Stadtplaner schlagen vor, dass jeder Bewohner seine wichtigsten Bedürfnisse im Umkreis von fünfzehn Minuten zu Fuß erledigen kann. Die Idee ist, den Verkehr zu verringern und die Läden im Viertel zu stärken. = Some city planners propose that every resident can handle their most important needs within a fifteen-minute walk. The idea is to reduce traffic and strengthen shops in the neighbourhood.
P: Kritiker weisen jedoch darauf hin, dass sich nicht jede Stadt so umbauen lässt und dass die Wohnungspreise in den bestausgestatteten Vierteln steigen könnten. = Critics point out, however, that not every city can be rebuilt this way and that housing prices could rise in the best-equipped neighbourhoods.
G: Umkreis = surrounding area ; Bedürfnis = need ; jedoch = however
Q: mcq Warum könnten die Preise steigen? ? weil der Verkehr kleiner wird | *weil die Viertel besser ausgestattet sind | weil die Läden im Viertel schließen | weil jeder Bewohner fünfzehn Minuten läuft
Q: mcq Was soll sinken? ? die Läden | *der Verkehr | die Viertel | die Wohnungen
Q: mcq Was ist die Grundidee? ? mehr Autos | *Dinge in der Nähe erledigen | weniger Läden | teurere Wohnungen
## ext-r-c1-memory | ext-r-c1 | Das selektive Gedächtnis | C1
P: Man glaubt gern, Erinnern heiße, die Vergangenheit getreu abzuspielen, doch zahlreiche Studien zeigen das Gegenteil: Jedes Mal, wenn wir eine Erinnerung abrufen, bauen wir sie neu auf und verändern sie dabei unmerklich. = People like to believe that remembering means playing back the past faithfully, but numerous studies show the opposite: every time we recall a memory, we rebuild it and change it imperceptibly in the process.
P: Das erklärt, warum zwei Zeugen desselben Ereignisses unvereinbare Versionen schildern können, ohne dass einer von ihnen lügt. = That explains why two witnesses to the same event can describe incompatible versions without either lying.
G: abrufen = to retrieve ; unmerklich = imperceptibly ; schildern = to describe
Q: mcq Was zeigen die Studien? ? dass Erinnern die Vergangenheit getreu abspielt | *dass wir jede Erinnerung neu aufbauen | dass zwei Zeugen immer lügen | dass sich keine Erinnerung verändert
Q: mcq Warum können Zeugen verschieden berichten? ? weil einer lügt | *weil das Gedächtnis neu aufbaut | weil sie jung sind | weil sie nicht dabei waren
Q: mcq Warum verändert sich eine Erinnerung? ? weil wir sie getreu abspielen | *weil wir sie beim Abrufen neu aufbauen | weil zwei Zeugen sie schildern | weil einer von ihnen lügt
`;
export const DE_LISTENING_EXT = `
## ext-l-b2-radio | ext-l-b2 | Eine Radiodiskussion | B2
L: Moderatorin: Heute sprechen wir über Homeoffice. Karim, was meinen Sie? = Today we talk about working from home. Karim, what do you think?
L: Karim: Ich denke, es hat Vorteile gebracht, obwohl es nicht für alle Branchen gilt. = I think it has brought advantages, although it doesn't apply to all sectors.
L: Moderatorin: Und die Nachteile? = And the disadvantages?
L: Karim: Vor allem die Isolation, und dass man Beruf und Privatleben schwer trennen kann. = Above all isolation, and that it's hard to separate work and private life.
L: Moderatorin: Vielen Dank, Karim. = Thank you very much, Karim.
Q: mcq Worüber sprechen sie? ? über den Verkehr | *über Homeoffice | über Tourismus | über Kochen
Q: mcq Welchen Nachteil nennt Karim? ? das Gehalt | *die Isolation | den Verkehr | die Arbeitszeit
## ext-l-c1-lecture | ext-l-c1 | Eine Vorlesung | C1
L: Professorin: Ich möchte betonen, dass Sprachwandel keine Verderbnis ist, sondern natürliche Entwicklung. = I want to stress that language change isn't corruption but natural development.
L: Professorin: Wörter, die uns heute falsch erscheinen, waren vor Jahrhunderten normal. = Words that seem wrong to us today were normal centuries ago.
L: Student: Gibt es dann keinen Fehler in der Sprache? = Is there no error in language then?
L: Professorin: Die Norm existiert, aber sie verändert sich mit dem Gebrauch. = The norm exists, but it changes with use.
Q: mcq Was vertritt die Professorin? ? Sprachwandel sei Verderbnis | *Sprachwandel sei natürliche Entwicklung | es gebe keine Norm | nichts ändere sich
Q: mcq Was sagt sie über die Norm? ? sie ist starr | *sie verändert sich mit dem Gebrauch | sie existiert nicht | sie ist Meinung
`;
export const DE_WRITING_EXT = `
## w-ext-b2-email | ext-w-b2 | A formal enquiry | B2 | 60
T: Write a formal email (8–10 lines) to a language school asking about courses, price and dates. Use a formal greeting, Sie forms and at least two polite subjunctive forms (könnten Sie, ich hätte gern).
R: Greeting = Sehr geehrte Damen und Herren ; Request = ich hätte gern, könnten Sie ; Question = was kostet, wann beginnt ; Closing = mit freundlichen Grüßen
M: Sehr geehrte Damen und Herren, ich hätte gern Informationen zu Ihren Deutschkursen im nächsten Quartal. Könnten Sie mir die Preise und Anfangstermine mitteilen? Außerdem würde ich gern wissen, ob es Abendkurse gibt. Mit freundlichen Grüßen, Anna Müller. = Dear Sir or Madam, I'd like information about your German courses next quarter. Could you tell me the prices and start dates? I'd also like to know whether there are evening courses. Kind regards, Anna Müller.
## w-ext-c1-essay | ext-w-c1 | An argumentative essay | C1 | 90
T: Write 12–15 lines arguing for or against a four-day working week. Use a concession (obwohl, zwar ... aber), a hypothesis (wenn + Konjunktiv II) and a formal connector (dennoch, insgesamt).
R: Concession = obwohl, zwar ... aber ; Hypothesis = wenn, Konjunktiv II ; Connector = dennoch, insgesamt, folglich ; Opinion = meines Erachtens, aus meiner Sicht
M: Meines Erachtens würde die Vier-Tage-Woche die Produktivität steigern. Zwar können manche Branchen sie nicht einführen, aber wenn man sie flexibel gestaltete, wären die Beschäftigten weniger erschöpft. Dennoch müsste man die Kosten prüfen. Insgesamt lohnt sich ein Versuch. = In my view the four-day week would raise productivity. True, some sectors can't introduce it, but if it were designed flexibly, employees would be less exhausted. Nevertheless, costs would need checking. Overall, a trial is worthwhile.
`;
export const DE_PLACEMENT_EXT = `
vocabulary | B1 | - | mcq "Die Frist endet am Freitag" means ___. ? the price drops | *the deadline ends on Friday | the place closes | the plan starts
grammar | B1 | - | mcq Wenn ich Zeit ___, käme ich mit. ? habe | *hätte | hatte | haben würde
grammar | B2 | - | mcq Das Buch ___ von Goethe geschrieben. ? ist | *wurde | hat | wird worden
vocabulary | B2 | - | mcq "Betonen" means ___. ? to lose | *to stress | to leave | to read
grammar | C1 | - | mcq Er sagt, er ___ müde. ? ist | *sei | wäre | war
vocabulary | C1 | - | mcq "Dennoch" is closest to ___. ? deshalb | *trotzdem | außerdem | weil
vocabulary | C2 | - | mcq "Vergänglich" means ___. ? eternal | *fleeting | strong | clear
vocabulary | C2 | - | mcq "Angesichts" means ___. ? despite | *in view of | in front of | instead of
`;
