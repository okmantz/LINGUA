// Each step: N = what the other person says, Y = model reply || wrong option || wrong option :: keyword groups for open mode
export const ES_CONVS = `
## greet | greet | Saying hello | A1 | You meet a neighbour in the morning.
N: ¡Buenos días! ¿Cómo está? = Good morning! How are you?
Y: Buenos días. Muy bien, gracias. = Good morning. Very well, thanks. || Adiós, hasta luego. = Goodbye, see you later. || Me llamo Ana. = My name is Ana. :: buenos días,hola ; bien,gracias
N: ¿Y usted? = And you?
Y: Bien, gracias. ¿Y usted? = Fine, thanks. And you? || De nada. = You're welcome. || Tengo dos hermanos. = I have two siblings. :: bien,gracias ; usted,tú
N: Hasta luego. = See you later.
Y: Hasta luego. = See you later. || Buenas noches. = Good night. || Por favor. = Please. :: hasta luego,adiós
## introductions | introductions | Introducing yourself | A1 | At a language exchange evening.
N: ¡Hola! Me llamo Carlos. ¿Cómo te llamas? = Hi! I'm Carlos. What's your name?
Y: Me llamo Ana. Mucho gusto. = My name is Ana. Nice to meet you. || Estoy cansado. = I'm tired. || Tengo veinte años. = I'm twenty. :: me llamo,soy ; mucho gusto,encantad
N: Mucho gusto. ¿De dónde eres? = Nice to meet you. Where are you from?
Y: Soy de los Estados Unidos. ¿Y tú? = I'm from the United States. And you? || Estoy en casa. = I'm at home. || Voy al banco. = I'm going to the bank. :: soy de ; y tú
N: Yo soy de Chile. ¿Hablas español? = I'm from Chile. Do you speak Spanish?
Y: Sí, hablo un poco. = Yes, I speak a little. || No, gracias. = No, thanks. || Hasta mañana. = See you tomorrow. :: hablo,un poco,sí
## objects | objects | What is this? | A1 | At a friend's flat, pointing at things.
N: ¿Qué es esto? = What is this?
Y: Es una llave. = It's a key. || Es un café. = It's a coffee. || Son las tres. = It's three o'clock. :: es,llave
N: ¿Dónde está la llave? = Where is the key?
Y: Está en la mesa. = It's on the table. || Soy de España. = I'm from Spain. || Tengo hambre. = I'm hungry. :: está,en la mesa,mesa
N: Gracias. ¿Tienes un teléfono? = Thanks. Do you have a phone?
Y: Sí, tengo un teléfono. = Yes, I have a phone. || Sí, soy un teléfono. = Yes, I am a phone. || No, hasta luego. = No, see you later. :: tengo,sí,teléfono
## daily-talk | daily-talk | Your day | A1 | A classmate asks about your routine.
N: ¿Qué haces por la mañana? = What do you do in the morning?
Y: Trabajo y bebo café. = I work and drink coffee. || Trabajan y bebe café. = They work and he drinks coffee. || Trabajar y beber. = To work and to drink. :: trabajo,estudio,bebo,como
N: ¿Dónde vives? = Where do you live?
Y: Vivo en una ciudad grande. = I live in a big city. || Vive en una ciudad. = He lives in a city. || Vivir ciudad. = Live city. :: vivo en
N: ¿Hablas español en casa? = Do you speak Spanish at home?
Y: No, hablo inglés en casa. = No, I speak English at home. || Hablamos mañana. = We speak tomorrow. || Habla inglés. = He speaks English. :: hablo,inglés,no,sí
## smalltalk | smalltalk | Small talk | A1 | A colleague chats during a break.
N: ¿Tienes hermanos? = Do you have siblings?
Y: Sí, tengo dos hermanos. = Yes, I have two siblings. || Sí, soy dos hermanos. = Yes, I am two siblings. || Estoy dos hermanos. = I am two siblings. :: tengo ; hermano,hermana,no tengo
N: ¿Cuántos años tienes? = How old are you?
Y: Tengo treinta años. = I'm thirty. || Soy treinta años. = I am thirty years. || Estoy treinta. = I am thirty. :: tengo ; años
N: ¿Y qué quieres hacer hoy? = And what do you want to do today?
Y: Quiero comer y descansar. = I want to eat and rest. || Quiero comiendo. = I want eating. || Quieres comer. = You want to eat. :: quiero
## restaurant | restaurant | At the restaurant | A1 | You sit down at a small restaurant in Madrid.
N: Buenas tardes. ¿Qué desea tomar? = Good afternoon. What would you like to have?
Y: Quisiera un café con leche, por favor. = I'd like a coffee with milk, please. || Tengo un café. = I have a coffee. || Dame café. = Give me coffee. :: quisiera,quiero,me gustaría ; café,agua,té
N: ¿Algo para comer? = Something to eat?
Y: Sí, una sopa y pan, por favor. = Yes, soup and bread, please. || No, soy sopa. = No, I'm soup. || Sí, estoy pan. = Yes, I'm bread. :: sopa,pan,pollo,ensalada,arroz ; por favor
N: Aquí tiene. ¿Algo más? = Here you are. Anything else?
Y: La cuenta, por favor. = The bill, please. || Hasta luego. = See you later. || Buenos días. = Good morning. :: cuenta
## shopping | shopping | Buying something | A1 | At a market stall.
N: Hola, ¿en qué puedo ayudarle? = Hello, how can I help you?
Y: Quisiera comprar una manzana, por favor. = I'd like to buy an apple, please. || Estoy comprar. = I'm to buy. || Soy una manzana. = I'm an apple. :: quisiera,quiero ; comprar,manzana,pan,fruta
N: Son dos euros. = That's two euros.
Y: ¿Acepta tarjeta? = Do you accept cards? || ¿Dónde vive? = Where do you live? || Tengo dos años. = I'm two years old. :: tarjeta,efectivo
N: Sí, claro. Aquí tiene. = Yes, of course. Here you are.
Y: Gracias. Adiós. = Thank you. Goodbye. || Mucho gusto. = Nice to meet you. || Perdón. = Sorry. :: gracias ; adiós,hasta luego
## family | family | Talking about family | A1 | Showing a photo to a new friend.
N: ¿Quién es ella en la foto? = Who is she in the photo?
Y: Es mi madre. Se llama Marta. = She's my mother. Her name is Marta. || Es mi casa. = It's my house. || Soy mi madre. = I am my mother. :: madre,hermana,abuela,amiga ; se llama
N: ¿Tienes hijos? = Do you have children?
Y: Sí, tengo una hija. = Yes, I have a daughter. || Sí, soy una hija. = Yes, I am a daughter. || No, tengo hijo. = No, I have son. :: tengo,no tengo ; hijo,hija
N: ¿Tu familia vive aquí? = Does your family live here?
Y: Mi madre vive aquí, pero mi padre vive en España. = My mother lives here, but my father lives in Spain. || Mi madre vivo aquí. = My mother I live here. || Mis padre viven aquí. = My father (pl.) live here. :: vive ; pero,y
## directions | directions | Asking for directions | A1 | You're lost near the station.
N: Hola, ¿necesita ayuda? = Hello, do you need help?
Y: Sí, ¿dónde está la estación, por favor? = Yes, where is the station, please? || Sí, ¿qué es la estación? = Yes, what is the station? || No, estoy cansado. = No, I'm tired. :: dónde,donde ; estación
N: Siga todo recto y gire a la izquierda. = Go straight on and turn left.
Y: ¿Está lejos? = Is it far? || ¿Está cansado? = Is he tired? || ¿Tengo una llave? = Do I have a key? :: lejos,cerca
N: No, está muy cerca. = No, it's very close.
Y: Muchas gracias. = Thank you very much. || De nada. = You're welcome. || Estoy aquí. = I'm here. :: gracias
## routine | routine | Daily routine | A1 | Chatting about your day at work.
N: ¿A qué hora te levantas? = What time do you get up?
Y: Me levanto a las siete. = I get up at seven. || Levanto a las siete. = I raise at seven. || Me llamo a las siete. = I call myself at seven. :: me levanto ; las
N: ¿Y a qué hora empiezas a trabajar? = And what time do you start work?
Y: Empiezo a las nueve. = I start at nine. || Empezo a las nueve. = (wrong form) || Empiezas a las nueve. = You start at nine. :: empiezo,trabajo ; nueve,ocho,diez
N: ¿Qué haces por la noche? = What do you do at night?
Y: Leo un libro y me acuesto temprano. = I read a book and go to bed early. || Leer un libro. = To read a book. || Se acuesta temprano. = He goes to bed early. :: leo,veo,como,cocino
## describing | describing | Describing a person | A2 | A friend asks about your new colleague.
N: ¿Cómo es tu nuevo jefe? = What's your new boss like?
Y: Es alto y muy simpático. = He's tall and very friendly. || Está alto. = He's being tall. || Soy simpático. = I'm friendly. :: es ; alto,simpático,amable,joven,viejo
N: ¿Y cómo es su oficina? = And what's his office like?
Y: Es grande y bonita. = It's big and pretty. || Es grande y bonito. = (agreement error) || Está grande. = It's (temporarily) big. :: es ; grande,pequeña,bonita,moderna
N: ¿Te gusta tu trabajo? = Do you like your job?
Y: Sí, me gusta mucho. = Yes, I like it a lot. || Sí, gusto mucho. = Yes, I please a lot. || Sí, me gustan. = Yes, they please me. :: me gusta,me encanta ; mucho
## hobbies | hobbies | Free time | A1 | Talking about hobbies with a classmate.
N: ¿Qué te gusta hacer en tu tiempo libre? = What do you like to do in your free time?
Y: Me gusta leer y nadar. = I like reading and swimming. || Yo gusto leer. = I please reading. || Me gustan leer. = (wrong plural) :: me gusta,me encanta ; leer,nadar,bailar,cocinar,viajar,música
N: ¿Practicas algún deporte? = Do you play any sport?
Y: Sí, juego al fútbol los sábados. = Yes, I play football on Saturdays. || Sí, juegas fútbol. = Yes, you play football. || Sí, soy fútbol. = Yes, I am football. :: juego,corro,nado ; fútbol,tenis,deporte
N: ¡Yo también! ¿Quieres jugar conmigo? = Me too! Do you want to play with me?
Y: ¡Claro! ¿Cuándo? = Of course! When? || Es de nada. = It's you're-welcome. || Estoy jugar. = I'm to play. :: claro,sí,vale ; cuándo
## work | work | Talking about work | A2 | At a networking event.
N: ¿A qué te dedicas? = What do you do for a living?
Y: Soy ingeniero. Trabajo en una empresa grande. = I'm an engineer. I work at a big company. || Estoy ingeniero. = I'm (temporarily) engineer. || Tengo ingeniero. = I have engineer. :: soy ; trabajo
N: ¿Te gusta tu trabajo? = Do you like your job?
Y: Sí, es interesante, pero a veces es difícil. = Yes, it's interesting, but sometimes it's difficult. || Sí, soy interesante. = Yes, I am interesting. || Sí, estoy difícil. = Yes, I'm difficult. :: interesante,bueno ; pero
N: ¿Cuántas horas trabajas al día? = How many hours do you work a day?
Y: Trabajo ocho horas. = I work eight hours. || Trabajo ocho años. = I work eight years. || Soy ocho horas. = I am eight hours. :: trabajo ; horas
## plans-invite | plans-invite | Making plans | A2 | Inviting a friend to do something.
N: ¿Qué puedes hacer este fin de semana? = What can you do this weekend?
Y: Puedo ir al cine el sábado. = I can go to the cinema on Saturday. || Puedo voy al cine. = (two conjugated verbs) || Poder cine sábado. = To be able cinema Saturday. :: puedo ; sábado,domingo,viernes
N: ¿Quieres venir conmigo? = Do you want to come with me?
Y: Sí, me encantaría. ¿A qué hora? = Yes, I'd love to. At what time? || Sí, soy conmigo. = Yes, I am with me. || No, gracias hola. = No, thanks hello. :: sí,claro,me encantaría ; hora
N: A las siete. Tenemos que comprar entradas. = At seven. We have to buy tickets.
Y: Perfecto. Voy a comprar las entradas. = Perfect. I'll buy the tickets. || Perfecto. Voy comprar. = Perfect. I go buy. || Perfecto. Compro a las entradas. = (wrong "a") :: voy a,compro
## weather-compare | weather-compare | Weather & comparing | A2 | Chatting about two cities.
N: ¿Qué tiempo hace en tu ciudad? = What's the weather like in your city?
Y: Hace frío en invierno y calor en verano. = It's cold in winter and hot in summer. || Es frío en invierno. = It is (a) cold in winter. || Tengo frío ciudad. = I have cold city. :: hace ; frío,calor,sol,lluvia,nieve
N: ¿Es más grande que Madrid? = Is it bigger than Madrid?
Y: No, es más pequeña que Madrid. = No, it's smaller than Madrid. || No, es más pequeña de Madrid. = (wrong "de") || No, es muy más pequeña. = (wrong "muy más") :: más,menos ; que
N: ¿Qué ciudad prefieres? = Which city do you prefer?
Y: Prefiero mi ciudad porque es tranquila. = I prefer my city because it's quiet. || Prefiero por qué. = I prefer why. || Quiero mi ciudad es. = I want my city is. :: prefiero ; porque
## yesterday | yesterday | What did you do yesterday? | A2 | Catching up with a friend.
N: ¿Qué hiciste ayer? = What did you do yesterday?
Y: Trabajé por la mañana y vi una película. = I worked in the morning and watched a movie. || Trabajo ayer. = I work yesterday. || Hice trabajé. = (mixed forms) :: trabajé,estudié,comí,vi,fui
N: ¿Cenaste en casa? = Did you have dinner at home?
Y: No, cené en un restaurante con mi hermano. = No, I had dinner in a restaurant with my brother. || No, ceno en un restaurante. = No, I have dinner at a restaurant. || No, cenaré restaurante. = No, I will dinner restaurant. :: cené,comí ; restaurante,casa
N: ¿Qué tal estuvo? = How was it?
Y: Estuvo muy bien. La comida fue deliciosa. = It was very good. The food was delicious. || Estaba muy bien. La comida es deliciosa. = (tense mix) || Fue muy bien comida. = (garbled) :: estuvo,fue ; bien,delicioso
## last-trip | last-trip | A past trip | A2 | Telling a colleague about your holiday.
N: ¿Adónde viajaste en tus vacaciones? = Where did you travel on your holiday?
Y: Fui a Portugal con mi familia. = I went to Portugal with my family. || Voy a Portugal. = I'm going to Portugal. || Ir Portugal. = To go Portugal. :: fui ; a
N: ¿Cuánto tiempo estuvieron allí? = How long were you there?
Y: Estuvimos una semana. = We were there for a week. || Estamos una semana. = We are a week. || Estuve semana. = I was week. :: estuvimos ; semana,días
N: ¿Qué fue lo mejor? = What was the best thing?
Y: La comida fue lo mejor. = The food was the best. || La comida es el mejor. = (agreement) || Mejor comida fue. = (word order) :: comida,playa,gente,ciudad ; fue,fueron
## appointments | appointments | Making an appointment | A2 | Calling a clinic.
N: Clínica del Sol, buenos días. ¿En qué puedo ayudarle? = Sun Clinic, good morning. How can I help?
Y: Quisiera pedir una cita, por favor. = I'd like to make an appointment, please. || Soy una cita. = I am an appointment. || Tengo cita médico. = I have appointment doctor. :: quisiera,quiero,necesito ; cita
N: ¿Para qué día? = For which day?
Y: Para el jueves por la tarde, si es posible. = For Thursday afternoon, if possible. || Para jueves de tarde. = For Thursday of afternoon. || Jueves tengo. = Thursday I have. :: jueves,lunes,martes,miércoles,viernes ; tarde,mañana
N: Tiene a las cuatro. ¿Le va bien? = I have four o'clock. Does that suit you?
Y: Sí, perfecto. Muchas gracias. = Yes, perfect. Thank you very much. || No, soy las cuatro. = No, I am four o'clock. || Sí, tengo cuatro. = Yes, I have four. :: sí,perfecto ; gracias
## problems | problems | Explaining a problem | A2 | At a pharmacy or hotel when something is wrong.
N: Buenas tardes, ¿qué le pasa? = Good afternoon, what's wrong?
Y: Me duele la cabeza y tengo fiebre. = My head hurts and I have a fever. || Soy la cabeza. = I am the head. || Duelo cabeza. = I hurt head. :: me duele,tengo ; cabeza,estómago,fiebre
N: ¿Desde cuándo? = Since when?
Y: Desde ayer por la noche. = Since last night. || Desde mañana. = Since tomorrow. || Hasta ayer. = Until yesterday. :: desde ; ayer,anoche,hoy
N: Tome esta medicina dos veces al día. = Take this medicine twice a day.
Y: Gracias. ¿Necesito algo más? = Thank you. Do I need anything else? || Gracias. ¿Soy algo más? = Thanks. Am I something else? || Perdón. Hasta luego. = Sorry. See you later. :: gracias ; necesito,algo más
## reasons | reasons | Giving reasons | A2 | A friend asks why you're learning Spanish.
N: ¿Por qué estudias español? = Why are you studying Spanish?
Y: Porque quiero viajar a España. = Because I want to travel to Spain. || Por qué quiero viajar. = Why I want to travel. || Porque viajo a España quiero. = (garbled) :: porque ; quiero,me gusta,necesito
N: ¿Y qué es lo más difícil? = And what's the hardest part?
Y: Lo más difícil es la gramática, pero me gusta. = The hardest is the grammar, but I like it. || La difícil más gramática. = (garbled) || Es difícil gramática yo. = (garbled) :: difícil ; gramática,pronunciación,verbos ; pero
N: ¿Crees que es útil? = Do you think it's useful?
Y: Sí, creo que es muy útil. = Yes, I think it's very useful. || Sí, creo es útil. = (missing "que") || Sí, pienso de es útil. = (wrong) :: creo que,pienso que ; útil,importante
## meeting-someone | meeting-someone | A longer conversation | A2 | Meeting a new colleague over coffee.
N: ¿De dónde eres y qué haces aquí? = Where are you from and what are you doing here?
Y: Soy de Canadá. Estoy aquí para trabajar y aprender español. = I'm from Canada. I'm here to work and learn Spanish. || Estoy de Canadá. = I am (state) from Canada. || Soy aquí trabajar. = I am here work. :: soy de ; trabajar,estudiar,aprender
N: ¡Qué interesante! ¿Qué te parece la ciudad? = How interesting! What do you think of the city?
Y: Me parece muy bonita, pero un poco ruidosa. = I think it's very pretty but a bit noisy. || Parece me bonita. = (word order) || Me gusto la ciudad. = (wrong) :: bonita,grande,tranquila,ruidosa ; me parece,me gusta
N: Y tú, ¿qué haces los fines de semana? = And you, what do you do on weekends?
Y: Normalmente salgo con amigos o visito museos. ¿Y tú? = Usually I go out with friends or visit museums. And you? || Normal sale amigos. = (garbled) || Yo salgo con amigos yo tú. = (garbled) :: salgo,visito,leo,veo ; y tú
## story | story | Telling a short story | A2 | Telling a friend about your weekend.
N: ¡Cuéntame! ¿Qué pasó el sábado? = Tell me! What happened on Saturday?
Y: Primero fui al mercado y después comí con mi amiga. = First I went to the market and then I ate with my friend. || Primero voy mercado y comí. = (tense mix) || Fui primero después. = (garbled) :: primero ; después,luego
N: ¿Y qué hicieron por la tarde? = And what did you do in the afternoon?
Y: Vimos una película y volvimos a casa tarde. = We watched a movie and came home late. || Veíamos una película. = (imperfect, odd here) || Vimos película volvemos. = (garbled) :: vimos,fuimos,caminamos,volvimos
N: ¡Qué bien! ¿Te gustó la película? = How nice! Did you like the movie?
Y: Sí, fue muy divertida. = Yes, it was very funny. || Sí, es muy divertida ayer. = (tense) || Sí, estuvo divertido película. = (garbled) :: fue,estuvo ; divertida,buena,interesante
## opinions | opinions | Giving opinions | A2 | A discussion about transport.
N: ¿Prefieres viajar en tren o en avión? = Do you prefer to travel by train or plane?
Y: Prefiero el tren porque es más cómodo. = I prefer the train because it's more comfortable. || Prefiero tren porque más. = (garbled) || Prefieres tren porque. = (wrong person) :: prefiero ; tren,avión ; porque
N: Pero el avión es más rápido, ¿no? = But the plane is faster, isn't it?
Y: Sí, estoy de acuerdo, pero el tren es más barato. = Yes, I agree, but the train is cheaper. || Sí, soy de acuerdo. = (wrong verb) || No, estoy acuerdo. = (missing "de") :: de acuerdo ; pero ; más
N: ¿Qué opinas de los autobuses? = What do you think of buses?
Y: En mi opinión, son lentos, pero útiles. = In my opinion, they're slow but useful. || En mi opinión, es lentos. = (agreement) || Mi opinión son lento. = (garbled) :: en mi opinión,creo que,pienso que ; lentos,baratos,útiles
## unexpected | unexpected | Handling the unexpected | A2 | You don't understand what someone says.
N: Perdone, ¿tiene hora? Es que he perdido el tren. = Excuse me, do you have the time? I've missed my train.
Y: Son las cinco. ¿Necesita ayuda? = It's five o'clock. Do you need help? || Es las cinco. = (wrong verb form) || Tengo cinco. = I have five. :: son,es ; cinco,seis,cuatro ; ayuda
N: Sí, ¿sabe cuándo sale el próximo tren? = Yes, do you know when the next train leaves?
Y: Lo siento, no lo sé. Pregunte en la oficina. = I'm sorry, I don't know. Ask at the office. || Lo siento, no sé lo. = (word order) || No soy. = I'm not. :: no sé,no lo sé ; oficina,información
N: Gracias. Perdón, hablo muy rápido. ¿Me entiende? = Thanks. Sorry, I speak very fast. Do you understand me?
Y: Más despacio, por favor. = More slowly, please. || Menos rápido soy. = (garbled) || Hablo despacio por favor tú. = (garbled) :: despacio ; por favor,repita
## travel-challenge | travel-challenge | Challenge: a day of travel | A2 | You are travelling alone in Spain — no hints.
N: Buenos días. ¿Adónde va? = Good morning. Where are you going?
Y: Voy a Sevilla. Quisiera un billete, por favor. = I'm going to Seville. I'd like a ticket, please. || Soy Sevilla. = I am Seville. || Billete tengo voy. = (garbled) :: voy,quisiera,quiero ; billete ; sevilla,madrid,barcelona
N: ¿De ida o de ida y vuelta? = One way or return?
Y: De ida y vuelta, por favor. ¿Cuánto cuesta? = Return, please. How much is it? || De ida es vuelta. = (garbled) || Tengo cuesta ida. = (garbled) :: ida,vuelta ; cuánto
N: Son cuarenta euros. ¿Quiere pagar con tarjeta? = That's forty euros. Do you want to pay by card?
Y: Sí, con tarjeta. ¿A qué hora sale el tren? = Yes, by card. What time does the train leave? || Sí, soy tarjeta. = Yes, I am card. || No, hasta luego. = No, see you later. :: tarjeta,efectivo ; hora
## social-challenge | social-challenge | Challenge: a dinner party | A2 | At a friend's dinner — no hints.
N: ¡Bienvenido! Pasa, pasa. ¿Quieres algo de beber? = Welcome! Come in. Do you want something to drink?
Y: Sí, gracias. Un vaso de agua, por favor. = Yes, thanks. A glass of water, please. || Soy agua. = I am water. || Beber yo quiero. = (garbled) :: gracias ; agua,vino,cerveza,café ; por favor
N: Te presento a mi hermana. Se llama Lucía. = Let me introduce my sister. Her name is Lucía.
Y: Mucho gusto, Lucía. Me llamo Ana. = Nice to meet you, Lucía. My name is Ana. || Hasta luego, Lucía. = See you later, Lucía. || Soy mucho gusto. = (garbled) :: mucho gusto,encantad ; me llamo,soy
N: ¿Te gusta la comida española? = Do you like Spanish food?
Y: Sí, me encanta. Creo que la paella es deliciosa. = Yes, I love it. I think paella is delicious. || Sí, gusto mucho comida. = (garbled) || Creo es delicioso yo. = (garbled) :: me encanta,me gusta ; creo que,pienso que ; deliciosa,rica,buena
`;
