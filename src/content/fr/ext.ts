// French extension: more B1–C2 material. Machine-drafted: have a native speaker review idioms and register notes.
export const FR_VOCAB_EXT = `
connectors|d'ailleurs|besides, by the way|adv|da-yuhr|D'ailleurs, il n'a jamais répondu.|Besides, he never replied.|B1
connectors|pourtant|yet, however|adv|poor-TAHN|Il est riche, pourtant il se plaint.|He is rich, yet he complains.|B1
connectors|c'est pourquoi|that's why|phr|seh poor-KWAH|Il pleut, c'est pourquoi je reste.|It's raining, that's why I'm staying.|B1
work|le salaire|salary|n.m|luh sa-LEHR|Son salaire augmente chaque année.|His salary rises every year.|B1
work|le délai|deadline, time limit|n.m|luh day-LEH|Le délai est très court.|The deadline is very short.|B1
work|embaucher|to hire|v|ahn-boh-SHAY|L'entreprise va embaucher trois personnes.|The company is going to hire three people.|B1
verbs|se rendre compte de|to realize|v|suh rahn-druh KOHNT duh|Je me rends compte de mon erreur.|I realize my mistake.|B1
verbs|se souvenir de|to remember|v|suh soov-NEER duh|Je me souviens de son nom.|I remember his name.|B1
verbs|s'habituer à|to get used to|v|sa-bee-tway ah|Je m'habitue au climat.|I'm getting used to the climate.|B1
society|les inégalités|inequalities|n.f|lay zee-nay-ga-lee-TAY|Les inégalités augmentent.|Inequalities are growing.|B2
society|le quartier|neighbourhood|n.m|luh kar-TYAY|C'est un quartier calme.|It's a quiet neighbourhood.|B2
verbs|souligner|to underline, stress|v|soo-lee-NYAY|Je tiens à souligner ce point.|I want to stress this point.|B2
verbs|aboutir à|to lead to|v|a-boo-TEER ah|Les négociations ont abouti à un accord.|The talks led to an agreement.|B2
verbs|prétendre|to claim|v|pray-TAHN-druh|Il prétend ne rien savoir.|He claims to know nothing.|B2
adjectives|indispensable|essential|adj|an-dees-pahn-SA-bluh|Ce document est indispensable.|This document is essential.|B2
verbs|remettre en question|to call into question|v|ruh-MET-ruh ahn kes-TYOHN|Personne ne remet sa décision en question.|Nobody questions his decision.|C1
adjectives|inéluctable|inevitable|adj|ee-nay-luk-TA-bluh|Le changement est inéluctable.|Change is inevitable.|C1
society|l'enjeu|the stake|n.m|lahn-ZHUH|L'enjeu est considérable.|The stake is considerable.|C1
connectors|néanmoins|nevertheless|adv|nay-ahn-MWAN|Néanmoins, le projet continue.|Nevertheless, the project continues.|C1
connectors|en somme|in short|phr|ahn SOM|En somme, il n'y a pas de solution facile.|In short, there is no easy solution.|C1
adjectives|éphémère|short-lived|adj|ay-fay-MEHR|La gloire est éphémère.|Fame is short-lived.|C2
verbs|préconiser|to recommend, advocate|v|pray-ko-nee-ZAY|Les experts préconisent la prudence.|Experts advocate caution.|C2
society|le préjudice|harm, damage|n.m|luh pray-zhoo-DEES|Il a subi un préjudice moral.|He suffered moral harm.|C2
connectors|eu égard à|in view of|phr|oo ay-GAR ah|Eu égard à la situation, nous reportons.|In view of the situation, we postpone.|C2
`;
export const FR_GRAMMAR_EXT = `
## ext-si-clauses | ext-si-clauses | Si-clauses: real and unreal | B1
S: Real: si + présent, présent ou futur. Unreal: si + imparfait, conditionnel présent. Impossible past: si + plus-que-parfait, conditionnel passé.
B: **Si + future / conditional is never allowed:** not "si j'aurai", but "si j'ai". **Si tu viens, on mange.** **Si j'avais le temps, je voyagerais.** **Si j'avais su, je serais venu.**
E: S'il pleut, je reste. = If it rains, I'll stay.
E: Si j'étais riche, j'achèterais une maison. = If I were rich, I'd buy a house.
E: Si j'avais su, je serais venu. = If I had known, I would have come.
E: Je te le dirais si je pouvais. = I'd tell you if I could.
M: "Si j'aurais" → si j'avais.
M: "Si il" → s'il (elision), but "si elle" stays.
X: mcq Si j'___ le temps, je viendrais. ? ai | *avais | aurais | aurai
X: mcq Si nous ___ su, nous serions venus. ? avons | *avions | aurions | aurons
X: fill Si je ___ (être) toi, je parlerais. => étais
X: type Say: "If it rains, I stay." => S'il pleut, je reste
## ext-subj-concession | ext-subj-concession | Concession and purpose with the subjunctive | C1
S: Bien que, quoique, pour que, afin que, sans que always take the subjunctive; quoi que and où que too.
B: **Bien qu'il soit fatigué, il travaille.** (Although he's tired.) **Je t'explique pour que tu comprennes.** **Il est parti sans que personne le voie.** After **malgré**, use a noun: malgré la pluie.
E: Bien qu'il pleuve, nous sortons. = Although it's raining, we're going out.
E: Quoi que tu fasses, je t'aiderai. = Whatever you do, I'll help you.
E: Je le répète pour que tout soit clair. = I repeat it so that everything is clear.
E: Il est parti sans que je le sache. = He left without my knowing.
M: "Bien qu'il est" → bien qu'il soit.
M: "Malgré qu'il pleuve" is colloquial; prefer bien qu'il pleuve.
X: mcq Bien qu'elle ___ malade, elle vient. ? est | *soit | sera | était
X: mcq Je parle lentement pour que tu ___. ? comprends | *comprennes | comprendras | comprenais
X: fill Il est parti sans que je le ___ (savoir). => sache
X: type Say: "Although it's raining, we go out." => Bien qu'il pleuve, nous sortons
`;
export const FR_CONVS_EXT = `
## ext-b1-landlord | ext-b1-landlord | Renting a flat | B1 | You call about a flat for rent.
N: Allô, bonjour. = Hello.
Y: Bonjour, j'appelle pour l'appartement de l'annonce. Est-il toujours disponible ? = Hello, I'm calling about the flat in the ad. Is it still available? || Je voudrais un billet pour Lyon. = I'd like a ticket to Lyon. || Où est la gare ? = Where is the station? :: appartement,annonce,disponible
N: Oui, c'est six cents euros par mois, charges comprises. = Yes, it's six hundred euros a month, bills included.
Y: Pourrais-je le visiter ce week-end ? = Could I visit it this weekend? || Je visite hier l'appartement. = I visit the flat yesterday. || Le lait est cher. = Milk is expensive. :: visiter,week-end
N: Bien sûr. Samedi à onze heures, ça vous convient ? = Of course. Saturday at eleven, does that suit you?
Y: Oui, c'est parfait. À samedi ! = Yes, perfect. See you Saturday! || Je ne me souviens de rien. = I don't remember anything. || Au revoir, à hier. = Goodbye, until yesterday. :: parfait,samedi
## ext-c1-interview | ext-c1-interview | A radio interview | C1 | You are interviewed about a social issue.
N: Certains disent que la crise du logement est sans issue. Qu'en pensez-vous ? = Some say the housing crisis has no way out. What do you think?
Y: Je ne dirais pas cela ; c'est un défi considérable, mais certaines mesures ont déjà porté leurs fruits. = I wouldn't say that; it's a considerable challenge, but some measures have already borne fruit. || C'est un défi, mais il y a des mesures. = (flatter) || Il n'y a pas de solution parce que non. = There is no solution because no. :: défi,mesures
N: Lesquelles, par exemple ? = Which, for example?
Y: Encadrer les loyers et construire davantage de logements sociaux. = Capping rents and building more social housing. || Louer demain le marché. = Rent tomorrow the market. || Tout est cher parce que oui. = Everything is expensive because yes. :: loyers,logements
N: Merci pour votre temps. = Thank you for your time.
Y: Je vous en prie. Ce fut un plaisir. = You're welcome. It was a pleasure. || Au revoir hier. = Goodbye yesterday. || Ça ne fait rien. = It doesn't matter. :: plaisir,prie
`;
export const FR_READING_EXT = `
## ext-r-b2-city | ext-r-b2 | La ville du quart d'heure | B2
P: Certains urbanistes proposent que chaque habitant puisse répondre à ses besoins essentiels dans un rayon de quinze minutes à pied. L'idée est de réduire la circulation et de renforcer les petits commerces de quartier. = Some planners propose that every resident can meet their essential needs within a fifteen-minute walk. The idea is to reduce traffic and strengthen small neighbourhood shops.
P: Néanmoins, les détracteurs soulignent que toutes les villes ne peuvent pas se réorganiser ainsi, et que les prix des logements pourraient grimper dans les quartiers les mieux équipés. = However, critics point out that not every city can reorganise like this, and that housing prices could climb in the best-equipped neighbourhoods.
G: rayon = radius ; détracteur = critic ; grimper = to climb
Q: mcq Pourquoi les prix pourraient-ils monter ? ? parce que la circulation diminue | *parce que les quartiers sont mieux équipés | parce que les petits commerces ferment | parce que chaque habitant marche quinze minutes
Q: mcq Que veut-on réduire ? ? les petits commerces | *la circulation | les quartiers | les logements
Q: mcq Quel est le principe ? ? plus de voitures | *des services proches de chez soi | moins de commerces | des logements plus chers
## ext-r-c1-memory | ext-r-c1 | La mémoire sélective | C1
P: On croit volontiers que se souvenir, c'est reproduire fidèlement le passé, mais de nombreuses études montrent le contraire : chaque fois que nous évoquons un souvenir, nous le reconstruisons et, ce faisant, nous le modifions subtilement. = We readily believe that remembering means faithfully reproducing the past, but many studies show the opposite: each time we recall a memory we rebuild it and, in doing so, subtly modify it.
P: Cela explique pourquoi deux témoins d'un même fait peuvent livrer des versions incompatibles sans que ni l'un ni l'autre ne mente. = That explains why two witnesses to the same event can give incompatible versions without either lying.
G: évoquer = to call up ; fidèlement = faithfully ; livrer = to deliver, give
Q: mcq Que montrent les études ? ? que se souvenir, c'est reproduire fidèlement le passé | *que chaque souvenir est reconstruit quand on l'évoque | que deux témoins mentent toujours | qu'aucun souvenir ne change
Q: mcq Pourquoi deux témoins peuvent-ils différer ? ? parce que l'un ment | *parce que la mémoire reconstruit | parce qu'ils sont jeunes | parce qu'ils n'étaient pas là
Q: mcq Que fait-on en évoquant un souvenir ? ? on le reproduit fidèlement | *on le reconstruit et on le modifie | on le livre aux témoins | on l'efface
`;
export const FR_LISTENING_EXT = `
## ext-l-b2-radio | ext-l-b2 | Un débat à la radio | B2
L: Animatrice: Aujourd'hui, parlons du télétravail. Karim, qu'en pensez-vous ? = Today let's talk about remote work. Karim, what do you think?
L: Karim: Je pense qu'il a apporté des avantages, même si ce n'est pas valable pour tous les secteurs. = I think it has brought advantages, even if that doesn't hold for all sectors.
L: Animatrice: Et les inconvénients ? = And the drawbacks?
L: Karim: Surtout l'isolement, et la difficulté à séparer vie privée et vie professionnelle. = Mainly isolation, and the difficulty separating private and working life.
L: Animatrice: Merci beaucoup, Karim. = Thank you very much, Karim.
Q: mcq De quoi parlent-ils ? ? de la circulation | *du télétravail | du tourisme | de la cuisine
Q: mcq Quel inconvénient Karim cite-t-il ? ? le salaire | *l'isolement | la circulation | les horaires
## ext-l-c1-lecture | ext-l-c1 | Une conférence | C1
L: Professeure: Je tiens à souligner que le changement linguistique n'est pas une corruption, mais une évolution naturelle. = I want to stress that language change is not corruption but natural evolution.
L: Professeure: Des mots qui nous semblent fautifs aujourd'hui étaient normaux il y a des siècles. = Words that seem wrong to us today were normal centuries ago.
L: Étudiant: Donc la faute n'existe pas en langue ? = So error doesn't exist in language?
L: Professeure: La norme existe, mais elle évolue avec l'usage. = The norm exists, but it evolves with use.
Q: mcq Que défend la professeure ? ? que le changement est une corruption | *que le changement est une évolution naturelle | qu'il n'y a pas de norme | que rien ne change
Q: mcq Que dit-elle de la norme ? ? elle est figée | *elle évolue avec l'usage | elle n'existe pas | c'est une opinion
`;
export const FR_WRITING_EXT = `
## w-ext-b2-email | ext-w-b2 | A formal enquiry | B2 | 60
T: Write a formal email (8–10 lines) to a language school asking about courses, price and dates. Use a formal greeting, vous forms and at least two polite conditionals (pourriez-vous, je souhaiterais).
R: Greeting = Madame, Monsieur, Bonjour ; Request = je souhaiterais, pourriez-vous ; Question = combien coûte, quand commence ; Closing = cordialement, bien à vous
M: Madame, Monsieur, Je souhaiterais des renseignements sur vos cours de français pour le prochain trimestre. Pourriez-vous m'indiquer les tarifs et les dates de début ? Je voudrais aussi savoir si vous proposez des cours le soir. Je reste à votre disposition. Cordialement, Anne Martin. = Dear Sir or Madam, I'd like information about your French courses for next term. Could you tell me the prices and start dates? I'd also like to know whether you offer evening classes. I remain at your disposal. Kind regards, Anne Martin.
## w-ext-c1-essay | ext-w-c1 | An argumentative essay | C1 | 90
T: Write 12–15 lines arguing for or against a four-day working week. Use a concession (bien que + subjunctive), a hypothesis (si + imparfait) and a formal connector (néanmoins, en somme).
R: Concession = bien que, quoique ; Hypothesis = si, conditionnel ; Connector = néanmoins, en somme, par conséquent ; Opinion = à mon sens, selon moi
M: À mon sens, la semaine de quatre jours améliorerait la productivité. Bien que certains secteurs ne puissent pas l'adopter, si elle était appliquée avec souplesse, les salariés seraient moins fatigués. Néanmoins, il faudrait évaluer les coûts. En somme, cela vaut la peine d'essayer. = In my view, a four-day week would improve productivity. Although some sectors can't adopt it, if applied flexibly, employees would be less tired. Nevertheless, costs would need assessing. In short, it's worth trying.
`;
export const FR_PLACEMENT_EXT = `
vocabulary | B1 | - | mcq « Le délai est court » means ___. ? the price is low | *the time limit is short | the place is small | the plan is short
grammar | B1 | - | mcq Si j'___ le temps, je viendrais. ? ai | *avais | aurais | aurai
grammar | B2 | - | mcq Bien qu'il ___ fatigué, il travaille. ? est | *soit | sera | était
vocabulary | B2 | - | mcq « Souligner » means ___. ? to lose | *to underline | to leave | to read
grammar | C1 | - | mcq Quoi que tu ___, je t'aiderai. ? fais | *fasses | feras | faisais
vocabulary | C1 | - | mcq « Néanmoins » is closest to ___. ? c'est pourquoi | *pourtant | d'ailleurs | parce que
vocabulary | C2 | - | mcq « Éphémère » means ___. ? eternal | *short-lived | strong | clear
vocabulary | C2 | - | mcq « Eu égard à » means ___. ? in spite of | *in view of | in front of | instead of
`;
