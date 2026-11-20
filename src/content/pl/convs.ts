// Each step: N = what the other person says, Y = model reply || wrong option || wrong option :: keyword groups for open mode
export const PL_CONVS = `
## greet | greet | Saying hello | A1 | You meet a neighbour in the morning.
N: Dzień dobry! Jak się pan ma? = Good morning! How are you?
Y: Dzień dobry. Dobrze, dziękuję. = Good morning. Fine, thank you. || Do widzenia, do jutra. = Goodbye until tomorrow. || Mam na imię Anna. = My name is Anna. :: dzień dobry,cześć ; dobrze,dziękuję
N: A pan? = And you?
Y: Dobrze, dziękuję. A pan? = Fine, thank you. And you? || Proszę bardzo. = You're welcome. || Mam dwóch braci. = I have two brothers. :: dobrze,dziękuję ; a pan,a ty
N: Do widzenia! = Goodbye!
Y: Do widzenia! = Goodbye! || Dobranoc. = Good night. || Proszę. = Please. :: do widzenia,cześć
## introductions | introductions | Introducing yourself | A1 | At a language exchange evening.
N: Cześć! Mam na imię Karol. Jak masz na imię? = Hi! I'm Karol. What's your name?
Y: Mam na imię Anna. Miło mi. = My name is Anna. Nice to meet you. || Jestem zmęczona. = I'm tired. || Mam dwadzieścia lat. = I'm twenty. :: mam na imię,jestem ; miło mi
N: Miło mi. Skąd jesteś? = Nice to meet you. Where are you from?
Y: Jestem ze Stanów Zjednoczonych. A ty? = I'm from the United States. And you? || Jestem w domu. = I'm at home. || Idę do banku. = I'm going to the bank. :: jestem z,jestem ze,pochodzę ; a ty
N: Ja jestem z Warszawy. Mówisz po polsku? = I'm from Warsaw. Do you speak Polish?
Y: Tak, mówię trochę. = Yes, I speak a little. || Nie, dziękuję. = No, thank you. || Do jutra. = See you tomorrow. :: mówię,trochę ; tak
## objects | objects | What is this? | A1 | At a friend's flat, pointing at things.
N: Co to jest? = What is this?
Y: To jest klucz. = It's a key. || To jest kawa. = It's a coffee. || Jest trzecia. = It's three o'clock. :: to jest,klucz
N: Gdzie jest klucz? = Where is the key?
Y: Jest na stole. = It's on the table. || Jestem z Polski. = I'm from Poland. || Jestem głodny. = I'm hungry. :: jest,na stole,stół
N: Dziękuję. Masz telefon? = Thanks. Do you have a phone?
Y: Tak, mam telefon. = Yes, I have a phone. || Tak, jestem telefon. = Yes, I am a phone. || Nie, do widzenia. = No, goodbye. :: mam,tak,telefon
## daily-talk | daily-talk | Your day | A1 | A classmate asks about your routine.
N: Co robisz rano? = What do you do in the morning?
Y: Pracuję i piję kawę. = I work and drink coffee. || Pracują i pije kawę. = They work and he drinks coffee. || Pracować i pić. = To work and to drink. :: pracuję,uczę,piję,jem
N: Gdzie mieszkasz? = Where do you live?
Y: Mieszkam w dużym mieście. = I live in a big city. || Mieszka w mieście. = He lives in a city. || Mieszkać miasto. = Live city. :: mieszkam
N: Mówisz po polsku w domu? = Do you speak Polish at home?
Y: Nie, w domu mówię po angielsku. = No, at home I speak English. || Mówimy jutro. = We speak tomorrow. || Mówi po angielsku. = He speaks English. :: mówię,angielsku,nie,tak
## smalltalk | smalltalk | Small talk | A1 | Chatting with a new colleague.
N: Masz rodzeństwo? = Do you have brothers or sisters?
Y: Tak, mam brata. = Yes, I have a brother. || Tak, jestem bratem. = Yes, I am a brother. || Nie, dziękuję. = No, thank you. :: mam,brata,siostrę,nie
N: Ile masz lat? = How old are you?
Y: Mam dwadzieścia pięć lat. = I'm twenty-five. || Jestem dwadzieścia pięć lat. = I am twenty-five years. || Masz dwadzieścia pięć. = You have twenty-five. :: mam,lat
N: Masz teraz czas? = Do you have time now?
Y: Tak, mam czas. = Yes, I have time. || Tak, jestem czas. = Yes, I am time. || Tak, masz czas. = Yes, you have time. :: mam czas,tak
## restaurant | restaurant | At the restaurant | A1 | You are ordering dinner.
N: Dobry wieczór! Co podać? = Good evening! What can I get you?
Y: Poproszę pizzę. = I'd like a pizza, please. || Chcę pizza! = I want pizza! (wrong case) || Pizza jest. = Pizza is. :: poproszę,pizzę,pizza
N: A do picia? = And to drink?
Y: Wodę, poproszę. = Water, please. || Ja pić woda. = I drink water. || Woda jest pić. = Water is to drink. :: wodę,piwo,wino,poproszę
N: Proszę bardzo. Coś jeszcze? = Here you are. Anything else?
Y: Nie, dziękuję. Rachunek, proszę. = No, thanks. The bill, please. || Tak, rachunek jest. = Yes, the bill is. || Proszę, rachunek. = You're welcome, bill. :: rachunek,dziękuję
## shopping | shopping | Buying a jacket | A1 | At a clothes shop.
N: Dzień dobry, w czym mogę pomóc? = Good morning, how can I help?
Y: Szukam kurtki. = I'm looking for a jacket. || Jestem kurtką. = I am a jacket. || Nie, kurtka chce. = No, the jacket wants. :: szukam,kurtki,kurtkę,chcę
N: Jaki pan nosi rozmiar? = What size do you wear?
Y: Noszę rozmiar M. = I wear a size M. || Mam M lat. = I'm M years old. || To jest M. = It is M. :: noszę,rozmiar,m,średni
N: Ta kurtka kosztuje sto pięćdziesiąt złotych. = This jacket costs a hundred and fifty zloty.
Y: To za drogo. Czy ma pan coś tańszego? = That's too expensive. Do you have something cheaper? || Sto pięćdziesiąt jest dobrze. = A hundred and fifty is well. || Tak, biorę sto. = Yes, I take a hundred. :: drogo,tańsze,tańszego
## family | family | Talking about family | A1 | Showing a photo to a friend.
N: Kto to jest na zdjęciu? = Who is this in the photo?
Y: To jest moja siostra. = It's my sister. || To jest mój siostra. = It's my (wrong gender) sister. || Jestem siostra. = I'm sister. :: moja siostra,siostra,mama
N: A ile ma lat? = And how old is she?
Y: Ma dwadzieścia dwa lata. = She's twenty-two. || Jest dwadzieścia dwa lata. = She is twenty-two years. || Ma dwadzieścia. = She has twenty. :: ma,lata
N: Czym się zajmuje? = What does she do?
Y: Jest studentką. = She is a student. || Ma studentka. = She has student. || Robi studentka. = She does student. :: jest,studentką,lekarką,nauczycielką
## directions | directions | Asking for directions | A1 | You are lost in the city centre.
N: Dzień dobry, czy potrzebuje pan pomocy? = Good morning, do you need help?
Y: Tak, przepraszam, gdzie jest dworzec? = Yes, excuse me, where is the station? || Tak, mam dworzec. = Yes, I have a station. || Nie, idę do domu. = No, I'm going home. :: gdzie jest,dworzec,przepraszam
N: Proszę iść prosto, a potem skręcić w prawo. = Go straight on and then turn right.
Y: Dziękuję. Czy to daleko? = Thank you. Is it far? || Proszę. To blisko. = You're welcome. It's near. || Prawo jest prosto. = Right is straight. :: daleko,blisko,dziękuję
N: Nie, to blisko. Dziesięć minut pieszo. = No, it's near. Ten minutes on foot.
Y: Bardzo dziękuję. Do widzenia! = Thank you very much. Goodbye! || Proszę. Cześć! = You're welcome. Bye! || Dziesięć minut jest. = Ten minutes is. :: dziękuję,do widzenia
## routine | routine | Daily routine | A1 | A flatmate asks about your day.
N: O której się budzisz? = What time do you wake up?
Y: Budzę się o siódmej. = I wake up at seven. || Budzę o siódmej. = I wake at seven. (no się) || Jest siódma. = It's seven. :: budzę się,o siódmej
N: A co robisz potem? = And what do you do afterwards?
Y: Jem śniadanie i idę do pracy. = I have breakfast and go to work. || Je śniadanie i idzie do pracy. = He has breakfast and goes to work. || Jeść śniadanie i iść. = To have breakfast and to go. :: śniadanie,idę,pracy
N: O której wracasz do domu? = What time do you get home?
Y: Wracam do domu o szóstej. = I get home at six. || Wracać dom szósta. = To return home sixth. || Jestem szósta dom. = Am sixth home. :: wracam,domu,o szóstej
## describing | describing | Describing a person | A1 | Talking about a friend.
N: Jaki jest twój przyjaciel? = What's your friend like?
Y: Jest wysoki i miły. = He is tall and nice. || Ma wysoki i miły. = He has tall and nice. || Jestem wysoki. = I'm tall. :: jest,wysoki,miły
N: A jaki jest jego dom? = And what's his house like?
Y: Jest duży i bardzo piękny. = It's big and very beautiful. || Jest duża i piękny. = It's big (fem.) and beautiful (wrong gender). || Ma duży. = It has big. :: duży,piękny,jest
N: Super! Masz zdjęcie? = Great! Do you have a photo?
Y: Tak, proszę, oto zdjęcie. = Yes, here's the photo. || Tak, jestem zdjęcie. = Yes, I am the photo. || Nie, zdjęcie ma. = No, the photo has. :: zdjęcie,tak,oto,proszę
## hobbies | hobbies | Free time | A1 | A new friend asks about hobbies.
N: Co lubisz robić w wolnym czasie? = What do you like to do in your free time?
Y: Lubię czytać i pływać. = I like reading and swimming. || Lubi czytać i pływać. = He likes reading and swimming. || Ja lubić czytać. = I to like to read. :: lubię,czytać,pływać,muzykę
N: Lubisz muzykę? = Do you like music?
Y: Tak, bardzo lubię. = Yes, I like it a lot. || Tak, podoba mi muzyka. = Yes, I like music (missing się). || Tak, lubić bardzo. = Yes, to like very. :: lubię,tak
N: Ja też! Idziemy na koncert? = Me too! Shall we go to a concert?
Y: Tak, chętnie! = Yes, gladly! || Nie, chętnie jest. = No, gladly is. || Tak, koncert są. = Yes, the concert are. :: chętnie,tak
## work | work | Talking about your job | A1 | At a networking event.
N: Czym się pan zajmuje? = What do you do for a living?
Y: Jestem nauczycielem. = I'm a teacher. || Mam nauczyciel. = I have teacher. || Robię jestem. = I do am. :: jestem,nauczycielem,lekarzem,studentem,pracuję
N: Czy lubi pan swoją pracę? = Do you like your job?
Y: Tak, bardzo ją lubię. = Yes, I like it a lot. || Tak, jestem lubię. = Yes, I am I like. || Nie, praca jest. = No, work is. :: lubię,tak,bardzo
N: O której pan kończy? = What time do you finish?
Y: Kończę o piątej. = I finish at five. || Kończyć piąta. = To finish fifth. || Jest piąta kończę. = It's five I finish. :: kończę,o piątej,piąta
## plans-invite | plans-invite | Inviting a friend | A2 | You are making weekend plans.
N: Co robisz w sobotę wieczorem? = What are you doing on Saturday evening?
Y: Nie mam planów. Chcesz gdzieś wyjść? = I have no plans. Do you want to go out somewhere? || Sobota jest wieczór. = Saturday is evening. || Robię sobotę wieczorem. = I do Saturday evening. :: planów,chcesz,wyjść,wyjdziemy
N: Tak, chętnie! Dokąd pójdziemy? = Yes, gladly! Where shall we go?
Y: Możemy iść do kina. = We can go to the cinema. || Możemy idziemy kino. = We can we go cinema. || Kino iść. = Cinema to go. :: możemy,kina,kino,restauracji
N: Świetnie! O której? = Great! What time?
Y: O ósmej, przed dworcem. = At eight, in front of the station. || Ósma o. = Eighth at. || Jestem przed ósmą. = I'm before eight. :: o ósmej,dworcem,ósmej
## weather-compare | weather-compare | Weather and comparing | A2 | Chatting about two cities.
N: Jaka jest dzisiaj pogoda w Gdańsku? = What's the weather like in Gdańsk today?
Y: Jest zimno i pada deszcz. = It's cold and it's raining. || Ma zimno i deszcz. = He's cold and rain. || Jest zimny deszcz. = It's cold rain. :: zimno,pada,ciepło
N: W Krakowie jest cieplej, prawda? = In Kraków it's warmer, right?
Y: Tak, w Krakowie jest cieplej niż w Gdańsku. = Yes, it's warmer in Kraków than in Gdańsk. || Tak, w Krakowie jest cieplej jak w Gdańsku. = Yes, warmer as in Gdańsk. (use niż) || Tak, Kraków bardziej ciepło. = Yes, Kraków more warm. :: cieplej,niż,tak
N: Wolisz ciepło czy zimno? = Do you prefer warm or cold?
Y: Wolę ciepło. = I prefer warm. || Chcę wolę ciepło. = I want I prefer warm. || Ciepło lubię jest. = Warm I like is. :: wolę,ciepło,zimno
## yesterday | yesterday | What did you do yesterday? | A2 | A colleague asks about your evening.
N: Co robiłeś wczoraj? = What did you do yesterday?
Y: Pracowałem, a potem gotowałem obiad. = I worked, and then I cooked dinner. || Pracować i gotować. = To work and to cook. || Pracuję wczoraj. = I work yesterday. :: pracowałem,pracowałam,gotowałem,gotowałam
N: A po obiedzie? = And after dinner?
Y: Wyszedłem z przyjaciółmi. = I went out with friends. || Wychodziłem przyjaciele. = I was going out friends. || Wychodzę wczoraj. = I go out yesterday. :: wyszedłem,wyszłam,przyjaciółmi,znajomymi
N: Dobrze się bawiłeś? = Did you enjoy yourself?
Y: Tak, bawiłem się świetnie. = Yes, I had a great time. || Tak, bawić się. = Yes, to have fun. || Tak, bawię się wczoraj. = Yes, I have fun yesterday. :: bawiłem się,bawiłam się,tak
## last-trip | last-trip | Your last trip | A2 | Telling a friend about a holiday.
N: Gdzie byłeś na wakacjach? = Where were you on holiday?
Y: Byłem w Zakopanem. = I was in Zakopane. || Jestem w Zakopane. = I am in Zakopane. || Byłam Zakopane. = I was Zakopane. :: byłem,byłam,zakopanem,polsce
N: Jaka była pogoda? = What was the weather like?
Y: Była ładna i było ciepło. = The weather was nice and it was warm. || Jest ładna i ciepła. = The weather is nice and warm. || Byłem ciepło. = I was warm. :: była,było,ciepło,ładna
N: Co zwiedziłeś? = What did you visit?
Y: Zwiedziłem wiele kościołów. = I visited many churches. || Zwiedzać kościoły. = To visit churches. || Zwiedzę kościoły wczoraj. = I'll visit churches yesterday. :: zwiedziłem,zwiedziłam,kościołów,muzea
## appointments | appointments | Making an appointment | A2 | Calling a dentist's office.
N: Gabinet stomatologiczny, dzień dobry. = Dental practice, good morning.
Y: Dzień dobry, chciałbym umówić się na wizytę. = Good morning, I'd like to make an appointment. || Dzień dobry, chcę wizyta. = Good morning, I want appointment. || Do widzenia, wizyta. = Goodbye, appointment. :: chciałbym,chciałabym,wizytę,umówić
N: Czy czwartek o szesnastej będzie dobry? = Is Thursday at four p.m. OK?
Y: Tak, dobrze. Dziękuję. = Yes, that's fine. Thanks. || Nie, czwartek są szesnasta. = No, Thursday am four. || Czwartek jest dobry. = Thursday is good. :: dobrze,tak,dziękuję
N: Jak się pan nazywa? = What's your name?
Y: Nazywam się Jan Kowalski. = My name is Jan Kowalski. || Jestem nazywam Jan. = I am call Jan. || Jan Kowalski jest. = Jan Kowalski is. :: nazywam się,jestem
## problems | problems | At the pharmacy | A2 | You feel ill and ask for help.
N: Dzień dobry. W czym mogę pomóc? = Good morning. How can I help?
Y: Boli mnie głowa i mam gorączkę. = I have a headache and a fever. || Jestem głowa. = I am head. || Mam głowa gorączka jestem. = I have head fever am. :: głowa,gorączk,boli
N: Od jak dawna? = For how long?
Y: Od dwóch dni. = For two days. || Przez dwa dni jestem. = For two days I am. || Dwa dni mam. = Two days I have. :: dwóch dni,dwa dni,dni,od
N: Proszę brać ten lek dwa razy dziennie. = Please take this medicine twice a day.
Y: Dziękuję. Ile to kosztuje? = Thank you. How much is it? || Proszę. Ile jest? = You're welcome. How much is? || Kosztuje dziękuję. = It costs thank you. :: ile,kosztuje,dziękuję
## reasons | reasons | Explaining why | A2 | A friend asks why you are learning Polish.
N: Dlaczego uczysz się polskiego? = Why are you learning Polish?
Y: Bo kocham Polskę i chcę podróżować. = Because I love Poland and I want to travel. || Bo uczę jest piękny. = Because I learn is beautiful. || Uczę się bo chcę. = I learn because I want. :: bo,chcę,kocham,podróżować
N: Ile czasu uczysz się codziennie? = How long do you study each day?
Y: Uczę się godzinę dziennie. = I study an hour a day. || Uczy godzina dzień. = He studies hour day. || Godzina jest codziennie. = Hour is daily. :: godzinę,codziennie,dziennie,uczę się
N: Brawo! Już dobrze mówisz. = Well done! You already speak well.
Y: Dziękuję, ale jeszcze dużo muszę się nauczyć. = Thanks, but I still have a lot to learn. || Proszę, ale muszę dużo. = You're welcome, but I must a lot. || Dziękuję, muszę jeszcze. = Thanks, I must still. :: dziękuję,nauczyć,ale
## meeting-someone | meeting-someone | Meeting someone new | A2 | You keep a conversation going at a party.
N: Cześć! Nie znam cię. Jestem Julia. = Hi! I don't know you. I'm Julia.
Y: Miło mi, jestem Marek. Znasz tu wiele osób? = Nice to meet you, I'm Marek. Do you know many people here? || Cześć, Julia jest. = Hi, Julia is. || Jestem Marek miło. = I'm Marek nice. :: miło mi,jestem,znasz
N: Znam tylko gospodynię. A ty? = I only know the hostess. And you?
Y: Znam brata Anny. Czym się zajmujesz? = I know Anna's brother. What do you do? || Znam brat Anna. = I know brother Anna. || Jestem brat. = I am brother. :: znam,czym się,pracujesz,zajmujesz
N: Jestem fotografką. A ty? = I'm a photographer. And you?
Y: Jestem inżynierem. Świetna praca! = I'm an engineer. Great job! || Mam inżynier. = I have engineer. || Robię inżynier jestem. = I do engineer am. :: jestem,inżynierem,świetna,super
## story | story | Telling a story | A2 | A friend asks what happened on your trip.
N: Co się stało podczas podróży? = What happened during the trip?
Y: Spóźniłem się na pociąg. = I missed the train. || Spóźnić pociąg. = To be late train. || Pociąg spóźniłem jest. = Train I was late is. :: spóźniłem,spóźniłam,pociąg
N: Naprawdę? I co dalej? = Really? And then?
Y: Potem kupiłem inny bilet. = Then I bought another ticket. || Potem kupuję inny bilet wczoraj. = Then I buy another ticket yesterday. || Potem kupić bilet. = Then to buy ticket. :: potem,kupiłem,kupiłam,inny
N: Co za szczęście! Przyjechałeś na czas? = What luck! Did you arrive on time?
Y: Nie, przyjechałem późno. = No, I arrived late. || Nie, przyjechać późno. = No, to arrive late. || Nie, jadę późno. = No, I'm going late. :: przyjechałem,przyjechałam,późno
## opinions | opinions | Giving an opinion | A2 | Discussing train vs plane.
N: Jak myślisz, co jest lepsze, pociąg czy samolot? = What do you think is better, train or plane?
Y: Moim zdaniem pociąg jest lepszy. = In my opinion the train is better. || Pociąg jest bardziej dobry. = The train is more good. || Moim zdaniem jest pociąg. = In my opinion is train. :: moim zdaniem,myślę,pociąg,lepszy
N: Dlaczego? = Why?
Y: Bo jest wygodniejszy i tańszy. = Because it's more comfortable and cheaper. || Bo wygodny taniej niż. = Because comfortable cheaper than. || Bo wygodnie tanio. = Because comfortably cheaply. :: bo,wygodniejszy,tańszy,tańszy
N: Nie zgadzam się, samolot jest szybszy. = I don't agree, the plane is faster.
Y: Masz rację, ale ja wolę pociąg. = You're right, but I prefer the train. || Tak, ale wolić pociąg. = Yes, but to prefer train. || Rację masz wolę. = Right you have I prefer. :: masz rację,ale,wolę
## unexpected | unexpected | When you don't understand | A2 | Someone speaks too fast.
N: Przepraszam, czy wie pan, gdzie jest muzeum? Proszę iść prosto, a potem druga ulica w lewo. = Excuse me, do you know where the museum is? Go straight, then the second street on the left.
Y: Czy może pan mówić wolniej, proszę? = Can you speak more slowly, please? || Ja nie mówię. = I don't speak. || Proszę, do widzenia. = You're welcome, goodbye. :: wolniej,powtórzyć,proszę
N: Oczywiście. Prosto, a potem druga w lewo. = Of course. Straight, then the second on the left.
Y: Rozumiem. Bardzo dziękuję! = I understand. Thank you very much! || Rozumieć nie. = To understand no. || Zrozumieć dziękuję. = To understand thanks. :: rozumiem,zrozumiałem,dziękuję
N: Proszę bardzo! Miłego dnia! = You're welcome! Have a nice day!
Y: Wzajemnie! Do widzenia! = Likewise! Goodbye! || Proszę wzajemnie. = You're welcome likewise. || Dzień jest miły. = Day is nice. :: wzajemnie,do widzenia,dziękuję
## travel-challenge | travel-challenge | Challenge: travel | A2 | You arrive at a hotel in Kraków and sort everything out yourself.
N: Dobry wieczór! Czy ma pan rezerwację? = Good evening! Do you have a reservation?
Y: Tak, na nazwisko Kowalski, na dwie noce. = Yes, under the name Kowalski, for two nights. || Nie, mam rezerwować. = No, I have to book. || Tak, rezerwacja jest. = Yes, the reservation is. :: tak,nazwisko,noce,rezerwacj
N: Świetnie. Oto klucz. Śniadanie jest o siódmej. = Great. Here's the key. Breakfast is at seven.
Y: Dziękuję. Gdzie jest pokój? = Thanks. Where is the room? || Proszę. Gdzie pokój. = You're welcome. Where room. || Pokój jest klucz. = Room is key. :: gdzie jest,pokój,piętro
N: Na drugim piętrze, po lewej. Czy coś jeszcze? = On the second floor, on the left. Anything else?
Y: Nie, dziękuję. Dobranoc! = No, thank you. Good night! || Tak, dzień dobry! = Yes, good morning! || Nie, proszę. = No, you're welcome. :: dziękuję,dobranoc,nie
## social-challenge | social-challenge | Challenge: social | A2 | You meet a Polish friend's family for lunch.
N: Witamy! To moja mama. = Welcome! This is my mum.
Y: Miło mi, proszę pani. Dziękuję za zaproszenie. = Nice to meet you, madam. Thank you for the invitation. || Cześć, ja jestem mama. = Hi, I am mum. || Proszę, proszę pani. = You're welcome, madam. :: miło mi,pani,dziękuję,zaproszenie
N: Proszę, częstuj się! Chcesz trochę zupy? = Please, help yourself! Would you like some soup?
Y: Tak, chętnie. Pięknie pachnie! = Yes, gladly. It smells lovely! || Tak, chcę zupa. = Yes, I want soup. || Nie, zupa jest. = No, soup is. :: chętnie,tak,pachnie,pyszna
N: Czy podoba ci się Polska? = Do you like Poland?
Y: Tak, bardzo mi się podoba. Ludzie są bardzo mili. = Yes, I like it a lot. The people are very kind. || Tak, lubi się bardzo. = Yes, likes himself a lot. || Tak, ludzie miły jest. = Yes, people kind is. :: podoba,mili,bardzo,tak
`;
