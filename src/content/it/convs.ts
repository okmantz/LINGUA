// Each step: N = what the other person says, Y = model reply || wrong option || wrong option :: keyword groups for open mode
export const IT_CONVS = `
## greet | greet | Saying hello | A1 | You meet a neighbour in the morning.
N: Buongiorno! Come sta? = Good morning! How are you?
Y: Buongiorno. Bene, grazie. = Good morning. Fine, thanks. || Arrivederci a domani. = Goodbye until tomorrow. || Mi chiamo Anna. = My name is Anna. :: buongiorno,ciao ; bene,grazie
N: E Lei? = And you?
Y: Bene, grazie. E Lei? = Fine, thanks. And you? || Prego. = You're welcome. || Ho due fratelli. = I have two brothers. :: bene,grazie ; e lei,e tu
N: Arrivederci! = Goodbye!
Y: Arrivederci! = Goodbye! || Buonanotte. = Good night. || Per favore. = Please. :: arrivederci,ciao
## introductions | introductions | Introducing yourself | A1 | At a language exchange evening.
N: Ciao! Mi chiamo Carlo. Come ti chiami? = Hi! I'm Carlo. What's your name?
Y: Mi chiamo Anna. Piacere. = My name is Anna. Nice to meet you. || Sono stanca. = I'm tired. || Ho venti anni. = I'm twenty. :: mi chiamo,sono ; piacere
N: Piacere. Di dove sei? = Nice to meet you. Where are you from?
Y: Sono degli Stati Uniti. E tu? = I'm from the United States. And you? || Sono a casa. = I'm at home. || Vado in banca. = I'm going to the bank. :: sono di,sono degli,vengo ; e tu
N: Io sono di Roma. Parli italiano? = I'm from Rome. Do you speak Italian?
Y: Sì, parlo un po'. = Yes, I speak a little. || No, grazie. = No, thanks. || A domani. = See you tomorrow. :: parlo,un po' ; sì
## objects | objects | What is this? | A1 | At a friend's flat, pointing at things.
N: Che cos'è questo? = What is this?
Y: È una chiave. = It's a key. || È un caffè. = It's a coffee. || Sono le tre. = It's three o'clock. :: è,chiave
N: Dov'è la chiave? = Where is the key?
Y: È sul tavolo. = It's on the table. || Sono di Roma. = I'm from Rome. || Ho fame. = I'm hungry. :: è,sul tavolo,tavolo
N: Grazie. Hai un telefono? = Thanks. Do you have a phone?
Y: Sì, ho un telefono. = Yes, I have a phone. || Sì, sono un telefono. = Yes, I am a phone. || No, arrivederci. = No, goodbye. :: ho,sì,telefono
## daily-talk | daily-talk | Your day | A1 | A classmate asks about your routine.
N: Che cosa fai la mattina? = What do you do in the morning?
Y: Lavoro e bevo un caffè. = I work and drink a coffee. || Lavorano e beve un caffè. = They work and he drinks a coffee. || Lavorare e bere. = To work and to drink. :: lavoro,studio,bevo,mangio
N: Dove abiti? = Where do you live?
Y: Abito in una grande città. = I live in a big city. || Abita in una città. = He lives in a city. || Abitare città. = Live city. :: abito
N: Parli italiano a casa? = Do you speak Italian at home?
Y: No, parlo inglese a casa. = No, I speak English at home. || Parliamo domani. = We speak tomorrow. || Parla inglese. = He speaks English. :: parlo,inglese,no,sì
## smalltalk | smalltalk | Small talk | A1 | Chatting with a new colleague.
N: Hai fratelli o sorelle? = Do you have brothers or sisters?
Y: Sì, ho un fratello. = Yes, I have a brother. || Sì, sono un fratello. = Yes, I am a brother. || No, grazie. = No, thanks. :: ho,fratello,sorella,no
N: Quanti anni hai? = How old are you?
Y: Ho venticinque anni. = I'm twenty-five. || Sono venticinque anni. = I am twenty-five years. || Hai venticinque. = You have twenty-five. :: ho,anni
N: Hai tempo adesso? = Do you have time now?
Y: Sì, ho tempo. = Yes, I have time. || Sì, sono tempo. = Yes, I am time. || Sì, hai tempo. = Yes, you have time. :: ho tempo,sì
## restaurant | restaurant | At the restaurant | A1 | You are ordering dinner.
N: Buonasera! Che cosa desidera? = Good evening! What would you like?
Y: Vorrei una pizza, per favore. = I'd like a pizza, please. || Voglio una pizza! = I want a pizza! || Una pizza è. = A pizza is. :: vorrei,pizza,per favore
N: E da bere? = And to drink?
Y: Un'acqua, per favore. = A water, please. || Io bere acqua. = I drink water. || Acqua è bere. = Water is to drink. :: acqua,vino,birra,per favore
N: Ecco a Lei. Altro? = Here you are. Anything else?
Y: No, grazie. Il conto, per favore. = No, thanks. The bill, please. || Sì, il conto è. = Yes, the bill is. || Prego, il conto. = You're welcome, the bill. :: conto,grazie
## shopping | shopping | Buying a jacket | A1 | At a clothes shop.
N: Buongiorno, posso aiutarla? = Good morning, can I help you?
Y: Sì, vorrei una giacca. = Yes, I'd like a jacket. || Sì, io sono una giacca. = Yes, I am a jacket. || No, la giacca vuole. = No, the jacket wants. :: vorrei,giacca,cerco
N: Che taglia porta? = What size do you wear?
Y: Porto la quarantaquattro. = I wear a forty-four. || Ho quarantaquattro anni. = I'm forty-four years old. || È quarantaquattro. = It's forty-four. :: porto,taglia,quarantaquattro,medio
N: Costa cento euro. = It costs a hundred euros.
Y: È troppo caro. Ha qualcosa di più economico? = It's too expensive. Do you have something cheaper? || Cento euro è bene. = A hundred euros is well. || Sì, prendo cento. = Yes, I take a hundred. :: caro,economico,troppo
## family | family | Talking about family | A1 | Showing a photo to a friend.
N: Chi è questa nella foto? = Who is this in the photo?
Y: È mia sorella. = It's my sister. || È il mio sorella. = It's the my sister. || Sono sorella. = I'm sister. :: mia sorella,sorella,madre
N: E quanti anni ha? = And how old is she?
Y: Ha ventidue anni. = She's twenty-two. || È ventidue anni. = She is twenty-two years. || Ha ventidue. = She has twenty-two. :: ha,anni
N: Che lavoro fa? = What does she do?
Y: È studentessa. = She is a student. || Ha studentessa. = She has student. || Fa studentessa. = She does student. :: è,studentessa,medico,insegnante
## directions | directions | Asking for directions | A1 | You are lost in the city centre.
N: Buongiorno, serve aiuto? = Good morning, do you need help?
Y: Sì, scusi, dov'è la stazione? = Yes, excuse me, where is the station? || Sì, ho una stazione. = Yes, I have a station. || No, vado a casa. = No, I'm going home. :: dov'è,stazione,scusi
N: Vada sempre dritto e poi giri a destra. = Go straight on and then turn right.
Y: Grazie. È lontano? = Thanks. Is it far? || Prego. È vicino. = You're welcome. It's close. || Destra è dritto. = Right is straight. :: lontano,vicino,grazie
N: No, è vicino. Dieci minuti a piedi. = No, it's near. Ten minutes on foot.
Y: Grazie mille. Arrivederci! = Thanks a lot. Goodbye! || Prego. Ciao! = You're welcome. Bye! || Dieci minuti sono. = Ten minutes are. :: grazie,arrivederci
## routine | routine | Daily routine | A1 | A flatmate asks about your day.
N: A che ora ti alzi? = What time do you get up?
Y: Mi alzo alle sette. = I get up at seven. || Alzo alle sette. = I raise at seven. || Sono le sette. = It's seven. :: mi alzo,alle
N: E che cosa fai dopo? = And what do you do afterwards?
Y: Faccio colazione e vado al lavoro. = I have breakfast and go to work. || Fa colazione e va al lavoro. = He has breakfast and goes to work. || Fare colazione e andare. = To have breakfast and to go. :: colazione,vado,lavoro
N: A che ora torni a casa? = What time do you get home?
Y: Torno a casa alle sei. = I get home at six. || Tornare casa sei. = To return home six. || Sono sei casa. = Are six home. :: torno,casa,alle
## describing | describing | Describing a person | A1 | Talking about a friend.
N: Com'è il tuo amico? = What's your friend like?
Y: È alto e simpatico. = He is tall and nice. || Ha alto e simpatico. = He has tall and nice. || Sono alto. = I'm tall. :: è,alto,simpatico
N: E com'è la sua casa? = And what's his house like?
Y: È grande e molto bella. = It's big and very beautiful. || È grandi e bello. = (adjectives must agree with the noun: la casa è grande e bella) || Ha grande. = It has big. :: grande,bella,è
N: Che bello! Hai una foto? = How nice! Do you have a photo?
Y: Sì, ecco la foto. = Yes, here's the photo. || Sì, sono la foto. = Yes, I am the photo. || No, la foto ha. = No, the photo has. :: foto,sì,ecco
## hobbies | hobbies | Free time | A1 | A new friend asks about hobbies.
N: Che cosa ti piace fare nel tempo libero? = What do you like to do in your free time?
Y: Mi piace leggere e nuotare. = I like reading and swimming. || Piace leggere e nuotare. = Likes reading and swimming. || Io piaccio leggere. = I please reading. :: mi piace,leggere,nuotare,musica
N: Ti piace la musica? = Do you like music?
Y: Sì, mi piace molto. = Yes, I like it a lot. || Sì, mi piacciono molto. = (la musica is singular, so it is mi piace) || Sì, piaccio molto. = Yes, I please a lot. :: mi piace,sì
N: Anche a me! Andiamo a un concerto? = Me too! Shall we go to a concert?
Y: Sì, volentieri! = Yes, gladly! || No, volentieri è. = No, gladly is. || Sì, il concerto sono. = Yes, the concert are. :: volentieri,sì
## work | work | Talking about your job | A1 | At a networking event.
N: Che lavoro fai? = What do you do for a living?
Y: Sono insegnante. = I'm a teacher. || Ho insegnante. = I have teacher. || Faccio sono. = I do am. :: sono,insegnante,medico,studente,lavoro
N: Ti piace il tuo lavoro? = Do you like your job?
Y: Sì, mi piace molto. = Yes, I like it a lot. || Sì, sono piace. = Yes, I am pleases. || No, lavoro è. = No, work is. :: mi piace,sì,molto
N: A che ora finisci? = What time do you finish?
Y: Finisco alle cinque. = I finish at five. || Finire cinque. = To finish five. || Sono le cinque finisco. = It's five I finish. :: finisco,alle,cinque
## plans-invite | plans-invite | Inviting a friend | A2 | You are making weekend plans.
N: Che fai sabato sera? = What are you doing on Saturday evening?
Y: Non ho piani. Vuoi uscire? = I have no plans. Do you want to go out? || Sabato è sera. = Saturday is evening. || Faccio sabato sera. = I do Saturday evening. :: piani,uscire,vuoi
N: Sì, volentieri! Dove andiamo? = Yes, gladly! Where shall we go?
Y: Possiamo andare al cinema. = We can go to the cinema. || Possiamo andiamo cinema. = We can we go cinema. || Cinema andare. = Cinema to go. :: possiamo,cinema,andiamo,ristorante
N: Perfetto! A che ora? = Perfect! What time?
Y: Alle otto, davanti alla stazione. = At eight, in front of the station. || Otto alle. = Eight at. || Sono davanti alle otto. = I'm in front at eight. :: alle,otto,stazione
## weather-compare | weather-compare | Weather and comparing | A2 | Chatting about two cities.
N: Che tempo fa a Milano oggi? = What's the weather like in Milan today?
Y: Fa freddo e piove. = It's cold and it's raining. || Ha freddo e pioggia. = He's cold and rain. || È freddo pioggia. = It's cold rain. :: freddo,piove,caldo
N: A Napoli fa più caldo, vero? = In Naples it's warmer, right?
Y: Sì, Napoli è più calda di Milano. = Yes, Naples is warmer than Milan. || Sì, Napoli è più caldo che Milano. = (Napoli takes the feminine calda here, and before a noun you use di, not che) || Sì, Napoli più Milano. = Yes, Naples more Milan. :: più,di,calda,caldo
N: Preferisci il caldo o il freddo? = Do you prefer heat or cold?
Y: Preferisco il caldo. = I prefer the heat. || Preferire caldo. = To prefer heat. || Il caldo preferisco è. = The heat I prefer is. :: preferisco,caldo,freddo
## yesterday | yesterday | What did you do yesterday? | A2 | A colleague asks about your evening.
N: Che cosa hai fatto ieri? = What did you do yesterday?
Y: Ho lavorato e poi ho cucinato. = I worked and then I cooked. || Ho lavorare e poi cucinare. = I have to work and then to cook. || Lavoro ieri. = I work yesterday. :: ho,lavorato,cucinato,mangiato
N: E dopo cena? = And after dinner?
Y: Sono uscito con degli amici. = I went out with some friends. || Ho uscito con amici. = (uscire takes essere: sono uscito) || Esco ieri. = I go out yesterday. :: sono uscito,sono uscita,amici
N: Ti sei divertito? = Did you enjoy yourself?
Y: Sì, mi sono divertito molto. = Yes, I enjoyed myself a lot. || Sì, ho divertito molto. = Yes, I have enjoyed much. || Sì, divertire. = Yes, to enjoy. :: mi sono divertito,mi sono divertita,sì
## last-trip | last-trip | Your last trip | A2 | Telling a friend about a holiday.
N: Dove sei andato in vacanza? = Where did you go on holiday?
Y: Sono andato in Sicilia. = I went to Sicily. || Ho andato in Sicilia. = I have gone to Sicily. || Vado Sicilia. = I go Sicily. :: sono andato,sono andata,sicilia,italia
N: Com'era il tempo? = What was the weather like?
Y: Era bel tempo e faceva caldo. = The weather was nice and it was hot. || È bel tempo e fa caldo. = It is nice weather and hot. || Ero caldo. = I was hot. :: era,faceva,caldo,bel tempo
N: Che cosa hai visitato? = What did you visit?
Y: Ho visitato molte chiese. = I visited many churches. || Ho visitare chiese. = I have to visit churches. || Visito molte chiese ieri. = I visit many churches yesterday. :: ho visitato,chiese,musei,spiaggia
## appointments | appointments | Making an appointment | A2 | Calling a dentist's office.
N: Studio dentistico Rossi, buongiorno. = Rossi dental practice, good morning.
Y: Buongiorno, vorrei fissare un appuntamento. = Good morning, I'd like to make an appointment. || Buongiorno, voglio appuntamento. = Good morning, I want appointment. || Arrivederci, un appuntamento. = Goodbye, an appointment. :: vorrei,appuntamento,fissare
N: Va bene giovedì alle quattro? = Is Thursday at four OK?
Y: Sì, va bene. Grazie. = Yes, that's fine. Thanks. || No, giovedì sono quattro. = No, Thursday am four. || Giovedì è bene. = Thursday is well. :: va bene,sì,grazie
N: Il suo nome, per favore? = Your name, please?
Y: Mi chiamo Anna Bianchi. = My name is Anna Bianchi. || Sono chiamo Anna. = I am call Anna. || Anna Bianchi è. = Anna Bianchi is. :: mi chiamo,sono
## problems | problems | At the pharmacy | A2 | You feel ill and ask for help.
N: Buongiorno. Come posso aiutarla? = Good morning. How can I help you?
Y: Ho mal di testa e ho la febbre. = I have a headache and a fever. || Sono mal di testa. = I am headache. || Ho mal di testa febbre sono. = I have headache fever am. :: mal di testa,febbre,ho
N: Da quanto tempo? = For how long?
Y: Da due giorni. = For two days. || Per due giorni sono. = For two days I am. || Due giorni ho. = Two days I have. :: due giorni,da,giorni
N: Prenda questa medicina due volte al giorno. = Take this medicine twice a day.
Y: Grazie. Quanto costa? = Thanks. How much is it? || Prego. Quanto è? = You're welcome. How is it? || Costa grazie. = It costs thanks. :: quanto costa,grazie
## reasons | reasons | Explaining why | A2 | A friend asks why you are learning Italian.
N: Perché studi italiano? = Why are you studying Italian?
Y: Perché amo l'Italia e voglio viaggiare. = Because I love Italy and I want to travel. || Perché studio è bello. = Because I study is beautiful. || Studio perché voglio. = I study because I want. :: perché,voglio,amo,viaggiare
N: Quanto tempo studi ogni giorno? = How long do you study each day?
Y: Studio un'ora ogni giorno. = I study an hour every day. || Studia un'ora giorno. = He studies an hour day. || Un'ora è ogni giorno. = One hour is each day. :: ora,ogni giorno,studio
N: Complimenti! Parli già bene. = Congratulations! You already speak well.
Y: Grazie, ma devo ancora imparare molto. = Thanks, but I still have to learn a lot. || Prego, ma devo molto. = You're welcome, but I must much. || Grazie, devo ancora. = Thanks, I must still. :: grazie,imparare,ma
## meeting-someone | meeting-someone | Meeting someone new | A2 | You keep a conversation going at a party.
N: Ciao! Non ti conosco. Sono Giulia. = Hi! I don't know you. I'm Giulia.
Y: Piacere, io sono Marco. Conosci molte persone qui? = Nice to meet you, I'm Marco. Do you know many people here? || Ciao, Giulia è. = Hi, Giulia is. || Sono Marco piacere. = I'm Marco nice. :: piacere,sono,conosci
N: Conosco solo la padrona di casa. E tu? = I only know the host. And you?
Y: Conosco il fratello di Anna. Di che cosa ti occupi? = I know Anna's brother. What do you do? || Conosco fratello Anna. = I know brother Anna. || Io sono fratello. = I am brother. :: conosco,di che cosa,lavoro,occupi
N: Faccio la fotografa. E tu? = I'm a photographer. And you?
Y: Sono ingegnere. Che bel lavoro! = I'm an engineer. What a great job! || Ho ingegnere. = I have engineer. || Faccio ingegnere sono. = I do engineer am. :: sono,ingegnere,bello,bel
## story | story | Telling a story | A2 | A friend asks what happened on your trip.
N: Che cosa è successo durante il viaggio? = What happened during the trip?
Y: Ho perso il treno. = I missed the train. || Perdere il treno. = To miss the train. || Il treno perso ho. = The train lost have. :: ho perso,treno,valigia
N: Davvero? E poi? = Really? And then?
Y: Poi ho preso un altro treno. = Then I took another train. || Poi prendo un altro treno ieri. = Then I take another train yesterday. || Poi preso treno. = Then taken train. :: poi,ho preso,altro
N: Che fortuna! Sei arrivato in orario? = What luck! Did you arrive on time?
Y: No, sono arrivato tardi. = No, I arrived late. || No, ho arrivato tardi. = No, I have arrived late. || No, arrivare tardi. = No, to arrive late. :: sono arrivato,sono arrivata,tardi
## opinions | opinions | Giving an opinion | A2 | Discussing train vs plane.
N: Secondo te, è meglio il treno o l'aereo? = In your opinion, is the train or the plane better?
Y: Secondo me, il treno è meglio. = In my opinion the train is better. || Il treno è più meglio. = The train is more better. || Secondo me è treno. = In my opinion is train. :: secondo me,penso,treno,meglio
N: Perché? = Why?
Y: Perché è più comodo e più economico. = Because it's more comfortable and cheaper. || Perché è molto più comodo di. = Because it's much more comfortable of. || Perché comodo economico. = Because comfortable cheap. :: perché,comodo,economico
N: Non sono d'accordo, l'aereo è più veloce. = I don't agree, the plane is faster.
Y: Hai ragione, ma io preferisco il treno. = You're right, but I prefer the train. || Sì, ma preferire treno. = Yes, but to prefer train. || Ragione hai preferisco. = Right you have I prefer. :: hai ragione,ma,preferisco
## unexpected | unexpected | When you don't understand | A2 | Someone speaks too fast.
N: Scusi, sa dov'è il museo? Vada dritto, poi giri alla seconda a sinistra. = Excuse me, do you know where the museum is? Go straight, then take the second left.
Y: Può parlare più piano, per favore? = Can you speak more slowly, please? || Io non parlo. = I don't speak. || Prego, arrivederci. = You're welcome, goodbye. :: più piano,ripetere,lentamente,per favore
N: Certo. Vada dritto, poi la seconda a sinistra. = Of course. Go straight, then the second on the left.
Y: Ho capito. Grazie mille! = I understood. Thanks a lot! || Capisco no. = Understand no. || Capire grazie. = To understand thanks. :: ho capito,capisco,grazie
N: Prego! Buona giornata! = You're welcome! Have a good day!
Y: Altrettanto! Arrivederci! = Likewise! Goodbye! || Prego altrettanto. = You're welcome likewise. || Giornata è buona. = Day is good. :: altrettanto,arrivederci,grazie
## travel-challenge | travel-challenge | Challenge: travel | A2 | You arrive at a hotel in Florence and sort everything out yourself.
N: Buonasera! Ha una prenotazione? = Good evening! Do you have a reservation?
Y: Sì, a nome Rossi, per due notti. = Yes, under the name Rossi, for two nights. || No, ho prenotare. = No, I have to book. || Sì, la prenotazione è. = Yes, the reservation is. :: sì,nome,notti,prenotazione
N: Perfetto. Ecco la chiave. La colazione è alle sette. = Perfect. Here's the key. Breakfast is at seven.
Y: Grazie. Dov'è la camera? = Thanks. Where is the room? || Prego. Dove camera. = You're welcome. Where room. || Camera è la chiave. = Room is the key. :: dov'è,camera,piano
N: Al secondo piano, a sinistra. Serve altro? = On the second floor, on the left. Do you need anything else?
Y: No, grazie. Buonanotte! = No, thank you. Good night! || Sì, buongiorno! = Yes, good morning! || No, prego. = No, you're welcome. :: grazie,buonanotte,no
## social-challenge | social-challenge | Challenge: social | A2 | You meet an Italian friend's family for lunch.
N: Benvenuto! Ti presento mia madre. = Welcome! Let me introduce my mother.
Y: Piacere, signora. Grazie dell'invito. = Nice to meet you, madam. Thank you for the invitation. || Ciao, io sono madre. = Hi, I am mother. || Prego, signora. = You're welcome, madam. :: piacere,signora,grazie,invito
N: Prego, accomodati! Vuoi un po' di pasta? = Please, make yourself at home! Would you like some pasta?
Y: Sì, volentieri. Ha un ottimo profumo! = Yes, gladly. It smells wonderful! || Sì, voglio pasta. = Yes, I want pasta. || No, pasta è. = No, pasta is. :: volentieri,sì,profumo,buona
N: Ti piace l'Italia? = Do you like Italy?
Y: Sì, mi piace molto. La gente è molto gentile. = Yes, I like it a lot. The people are very kind. || Sì, piaccio molto. = Yes, I please a lot. || Sì, gente gentile è. = Yes, people kind is. :: mi piace,gentile,molto,sì
`;
