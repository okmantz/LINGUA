// Nouns carry gender via pos (n.m / n.f / n.n); the note field always starts "Plural:" for nouns.
export const DE_VOCAB = `
greetings|Hallo|hello|phr|HAH-loh|Hallo, ich heiße Anna.|Hello, my name is Anna.
greetings|Guten Tag|good day / hello|phr|GOO-ten TAHK|Guten Tag, Frau Müller.|Good day, Mrs. Müller.
greetings|Guten Morgen|good morning|phr|GOO-ten MOR-gen|Guten Morgen, Herr Weber.|Good morning, Mr. Weber.
greetings|Guten Abend|good evening|phr|GOO-ten AH-bent|Guten Abend, meine Damen und Herren.|Good evening, ladies and gentlemen.
greetings|Gute Nacht|good night|phr|GOO-te NAHKHT|Gute Nacht, bis morgen.|Good night, see you tomorrow.
greetings|Tschüss|bye (informal)|phr|chüss|Tschüss, bis später!|Bye, see you later!
greetings|Auf Wiedersehen|goodbye (formal)|phr|owf VEE-der-zayn|Auf Wiedersehen, bis morgen.|Goodbye, see you tomorrow.
greetings|bitte|please / you're welcome|phr|BIT-te|Einen Kaffee, bitte.|A coffee, please.
greetings|danke|thank you|phr|DAHN-ke|Danke für Ihre Hilfe.|Thank you for your help.
greetings|Entschuldigung|excuse me / sorry|phr|ent-SHOOL-di-goong|Entschuldigung, wo ist die Toilette?|Excuse me, where is the toilet?
greetings|Freut mich|nice to meet you|phr|froyt MIKH|Freut mich, ich bin Lukas.|Nice to meet you, I'm Lukas.
greetings|Wie geht's?|how's it going?|phr|vee GAYTS|Hallo, wie geht's?|Hi, how's it going?
pronouns|ich|I|pron|ikh|Ich bin Student.|I am a student.
pronouns|du|you (informal)|pron|doo|Sprichst du Englisch?|Do you speak English?
pronouns|Sie|you (formal)|pron|zee|Sind Sie der Arzt?|Are you the doctor?
pronouns|er|he|pron|ayr|Er ist mein Bruder.|He is my brother.
pronouns|sie|she / they|pron|zee|Sie wohnt in Wien.|She lives in Vienna.
pronouns|es|it|pron|ess|Es ist kalt.|It is cold.
pronouns|wir|we|pron|veer|Wir sind Freunde.|We are friends.
pronouns|ihr|you all (informal)|pron|eer|Habt ihr Hunger?|Are you all hungry?
pronouns|das|that / this|pron|dahss|Das ist sehr teuer.|That is very expensive.
numbers|null|zero|num|nool|Ich habe null Probleme.|I have zero problems.
numbers|eins|one|num|ines|Ich habe eins.|I have one.
numbers|zwei|two|num|tsvy|Ich habe zwei Brüder.|I have two brothers.
numbers|drei|three|num|dry|Es ist drei Uhr.|It is three o'clock.
numbers|vier|four|num|feer|Wir sind vier.|There are four of us.
numbers|fünf|five|num|fünf|Fünf Euro, bitte.|Five euros, please.
numbers|sechs|six|num|zeks|Ich habe sechs Bücher.|I have six books.
numbers|sieben|seven|num|ZEE-ben|Eine Woche hat sieben Tage.|A week has seven days.
numbers|acht|eight|num|ahkht|Ich arbeite acht Stunden.|I work eight hours.
numbers|neun|nine|num|noyn|Mein Sohn ist neun.|My son is nine.
numbers|zehn|ten|num|tsayn|Das kostet zehn Euro.|That costs ten euros.
numbers|zwanzig|twenty|num|TSVAHN-tsikh|Ich bin zwanzig Jahre alt.|I am twenty years old.
numbers|dreißig|thirty|num|DRY-tsikh|Hier sind dreißig Personen.|There are thirty people here.
numbers|vierzig|forty|num|FEER-tsikh|Das kostet vierzig Euro.|It costs forty euros.
numbers|fünfzig|fifty|num|FÜNF-tsikh|Fünfzig Euro sind viel.|Fifty euros is a lot.
numbers|hundert|one hundred|num|HOON-dert|Das kostet hundert Euro.|It costs a hundred euros.
numbers|tausend|one thousand|num|TOW-zent|Hier sind tausend Menschen.|There are a thousand people here.
objects|das Buch|the book|n.n|dahss BOOKH|Das Buch liegt auf dem Tisch.|The book is on the table.|A1|Plural: die Bücher
objects|der Tisch|the table|n.m|dayr TISH|Der Tisch ist groß.|The table is big.|A1|Plural: die Tische
objects|der Stuhl|the chair|n.m|dayr SHTOOL|Ich brauche einen Stuhl.|I need a chair.|A1|Plural: die Stühle
objects|das Haus|the house|n.n|dahss HOWSS|Mein Haus ist klein.|My house is small.|A1|Plural: die Häuser
objects|das Handy|the mobile phone|n.n|dahss HEN-dee|Mein Handy funktioniert nicht.|My phone doesn't work.|A1|Plural: die Handys
objects|der Schlüssel|the key|n.m|dayr SHLÜ-sel|Wo ist der Schlüssel?|Where is the key?|A1|Plural: die Schlüssel
objects|die Tür|the door|n.f|dee TÜR|Die Tür ist zu.|The door is closed.|A1|Plural: die Türen
objects|das Fenster|the window|n.n|dahss FEN-ster|Ich öffne das Fenster.|I open the window.|A1|Plural: die Fenster
objects|das Auto|the car|n.n|dahss OW-toh|Das Auto ist neu.|The car is new.|A1|Plural: die Autos
objects|das Bett|the bed|n.n|dahss BET|Das Bett ist bequem.|The bed is comfortable.|A1|Plural: die Betten
objects|der Computer|the computer|n.m|dayr kom-PYOO-ter|Ich arbeite mit dem Computer.|I work with the computer.|A1|Plural: die Computer
objects|die Tasche|the bag|n.f|dee TAH-she|Meine Tasche ist rot.|My bag is red.|A1|Plural: die Taschen
verbs|sein|to be|v|zine|Ich möchte Arzt sein.|I want to be a doctor.
verbs|haben|to have|v|HAH-ben|Ich möchte einen Hund haben.|I want to have a dog.
verbs|machen|to do / make|v|MAH-khen|Was möchtest du heute machen?|What do you want to do today?
verbs|gehen|to go (on foot)|v|GAY-en|Ich möchte ins Kino gehen.|I want to go to the cinema.
verbs|wollen|to want|v|VOL-len|Ich werde nichts wollen.|I won't want anything.
verbs|können|to be able / can|v|KÖ-nen|Ich möchte gut Deutsch können.|I want to be good at German.
verbs|sprechen|to speak|v|SHPRE-khen|Ich möchte Deutsch sprechen.|I want to speak German.
verbs|essen|to eat|v|ESS-en|Wir wollen jetzt essen.|We want to eat now.
verbs|trinken|to drink|v|TRIN-ken|Ich möchte Wasser trinken.|I want to drink water.
verbs|wohnen|to live (reside)|v|VOH-nen|Ich möchte in Spanien wohnen.|I want to live in Spain.
verbs|arbeiten|to work|v|AR-by-ten|Ich muss heute arbeiten.|I have to work today.
verbs|lernen|to learn / study|v|LER-nen|Ich muss mehr lernen.|I have to learn more.
verbs|brauchen|to need|v|BROW-khen|Ich werde Hilfe brauchen.|I'm going to need help.
verbs|kaufen|to buy|v|KOW-fen|Ich möchte Brot kaufen.|I want to buy bread.
verbs|sehen|to see|v|ZAY-en|Ich möchte einen Film sehen.|I want to see a film.
verbs|sagen|to say|v|ZAH-gen|Ich werde die Wahrheit sagen.|I'm going to tell the truth.
verbs|wissen|to know (a fact)|v|VI-sen|Ich möchte mehr wissen.|I want to know more.
verbs|kommen|to come|v|KO-men|Du kannst morgen kommen.|You can come tomorrow.
verbs|geben|to give|v|GAY-ben|Ich werde ein Geschenk geben.|I'm going to give a gift.
verbs|anrufen|to call (phone)|v|AHN-roo-fen|Ich muss meine Mutter anrufen.|I have to call my mother.
verbs|öffnen|to open|v|ÖF-nen|Du kannst die Tür öffnen.|You can open the door.
verbs|schreiben|to write|v|SHRY-ben|Ich möchte eine E-Mail schreiben.|I want to write an email.
verbs|verstehen|to understand|v|fer-SHTAY-en|Ich kann nicht verstehen.|I can't understand.
questions|wer|who|q|vayr|Wer ist sie?|Who is she?
questions|was|what|q|vahss|Was möchtest du?|What do you want?
questions|wo|where|q|voh|Wo wohnst du?|Where do you live?
questions|wann|when|q|vahn|Wann kommst du an?|When do you arrive?
questions|wie|how|q|vee|Wie geht es dir?|How are you?
questions|warum|why|q|vah-ROOM|Warum lernst du Deutsch?|Why are you learning German?
questions|wie viel|how much|q|vee FEEL|Wie viel kostet das?|How much does that cost?
questions|welche|which|q|VEL-khe|Welche Farbe magst du?|Which colour do you like?
food|das Wasser|the water|n.n|dahss VAH-ser|Ich möchte ein Glas Wasser.|I'd like a glass of water.|A1|Plural: die Wasser
food|der Kaffee|the coffee|n.m|dayr KAH-fay|Einen Kaffee mit Milch, bitte.|A coffee with milk, please.|A1|Plural: die Kaffees
food|der Tee|the tea|n.m|dayr TAY|Ich trinke lieber Tee.|I prefer to drink tea.|A1|Plural: die Tees
food|die Milch|the milk|n.f|dee MILKH|Ich trinke Milch am Morgen.|I drink milk in the morning.|A1|Plural: (none)
food|das Brot|the bread|n.n|dahss BROHT|Ich kaufe jeden Tag Brot.|I buy bread every day.|A1|Plural: die Brote
food|der Käse|the cheese|n.m|dayr KAY-ze|Ich mag Käse.|I like cheese.|A1|Plural: die Käse
food|das Fleisch|the meat|n.n|dahss FLYSH|Ich esse kein Fleisch.|I don't eat meat.|A1|Plural: (none)
food|das Hähnchen|the chicken|n.n|dahss HAYN-khen|Das Hähnchen ist lecker.|The chicken is tasty.|A1|Plural: die Hähnchen
food|der Fisch|the fish|n.m|dayr FISH|Ich esse Fisch mit Reis.|I eat fish with rice.|A1|Plural: die Fische
food|das Obst|the fruit|n.n|dahss OPST|Ich esse jeden Tag Obst.|I eat fruit every day.|A1|Plural: (none)
food|der Apfel|the apple|n.m|dayr AHP-fel|Der Apfel ist rot.|The apple is red.|A1|Plural: die Äpfel
food|der Reis|the rice|n.m|dayr RICE|Der Reis ist heiß.|The rice is hot.|A1|Plural: (none)
food|die Suppe|the soup|n.f|dee ZOO-pe|Die Suppe ist gut.|The soup is good.|A1|Plural: die Suppen
food|das Ei|the egg|n.n|dahss EYE|Ich möchte ein Ei.|I'd like an egg.|A1|Plural: die Eier
food|das Bier|the beer|n.n|dahss BEER|Ein Bier, bitte.|A beer, please.|A1|Plural: die Biere
food|der Wein|the wine|n.m|dayr VINE|Der Rotwein ist gut.|The red wine is good.|A1|Plural: die Weine
food|das Frühstück|breakfast|n.n|dahss FRÜ-shtük|Das Frühstück ist um acht.|Breakfast is at eight.|A1|Plural: die Frühstücke
food|das Mittagessen|lunch|n.n|dahss MI-tahk-ess-en|Das Mittagessen ist um zwölf.|Lunch is at twelve.|A1|Plural: die Mittagessen
food|das Abendessen|dinner|n.n|dahss AH-bent-ess-en|Das Abendessen ist fertig.|Dinner is ready.|A1|Plural: die Abendessen
food|die Rechnung|the bill|n.f|dee REKH-noong|Die Rechnung, bitte.|The bill, please.|A1|Plural: die Rechnungen
food|die Speisekarte|the menu|n.f|dee SHPY-ze-kar-te|Kann ich die Speisekarte sehen?|Can I see the menu?|A1|Plural: die Speisekarten
shopping|das Geschäft|the shop|n.n|dahss ge-SHEFT|Das Geschäft öffnet um neun.|The shop opens at nine.|A1|Plural: die Geschäfte
shopping|das Geld|the money|n.n|dahss GELT|Ich habe kein Geld.|I have no money.|A1|Plural: (none)
shopping|der Preis|the price|n.m|dayr PRICE|Der Preis ist gut.|The price is good.|A1|Plural: die Preise
shopping|billig|cheap|adj|BI-likh|Dieses Buch ist billig.|This book is cheap.
shopping|teuer|expensive|adj|TOY-er|Das Hotel ist teuer.|The hotel is expensive.
shopping|bezahlen|to pay|v|be-TSAH-len|Ich möchte mit Karte bezahlen.|I want to pay by card.
shopping|die Karte|the card / map|n.f|dee KAR-te|Nehmen Sie Karte?|Do you take cards?|A1|Plural: die Karten
shopping|der Markt|the market|n.m|dayr MARKT|Ich gehe auf den Markt.|I'm going to the market.|A1|Plural: die Märkte
shopping|die Kleidung|the clothes|n.f|dee KLY-doong|Die Kleidung ist hier teuer.|Clothes are expensive here.|A1|Plural: (none)
shopping|kosten|to cost|v|KOS-ten|Wie viel wird das kosten?|How much will that cost?
family|die Familie|the family|n.f|dee fa-MEE-lye|Meine Familie ist groß.|My family is big.|A1|Plural: die Familien
family|die Mutter|the mother|n.f|dee MOO-ter|Meine Mutter ist Lehrerin.|My mother is a teacher.|A1|Plural: die Mütter
family|der Vater|the father|n.m|dayr FAH-ter|Mein Vater arbeitet viel.|My father works a lot.|A1|Plural: die Väter
family|der Bruder|the brother|n.m|dayr BROO-der|Mein Bruder wohnt hier.|My brother lives here.|A1|Plural: die Brüder
family|die Schwester|the sister|n.f|dee SHVES-ter|Meine Schwester studiert Medizin.|My sister studies medicine.|A1|Plural: die Schwestern
family|der Sohn|the son|n.m|dayr ZOHN|Mein Sohn ist fünf.|My son is five.|A1|Plural: die Söhne
family|die Tochter|the daughter|n.f|dee TOKH-ter|Meine Tochter ist sehr nett.|My daughter is very nice.|A1|Plural: die Töchter
family|der Großvater|the grandfather|n.m|dayr GROHS-fah-ter|Mein Großvater kocht gut.|My grandfather cooks well.|A1|Plural: die Großväter
family|die Großmutter|the grandmother|n.f|dee GROHS-moo-ter|Meine Großmutter wohnt in Wien.|My grandmother lives in Vienna.|A1|Plural: die Großmütter
family|der Mann|the man / husband|n.m|dayr MAHN|Mein Mann ist groß.|My husband is tall.|A1|Plural: die Männer
family|die Frau|the woman / wife|n.f|dee FROW|Meine Frau ist Krankenschwester.|My wife is a nurse.|A1|Plural: die Frauen
family|der Freund|the friend (m)|n.m|dayr FROYNT|Mein Freund kommt aus Kanada.|My friend is from Canada.|A1|Plural: die Freunde
family|die Freundin|the friend (f)|n.f|dee FROYN-din|Meine Freundin spricht Spanisch.|My friend speaks Spanish.|A1|Plural: die Freundinnen
places|die Stadt|the city|n.f|dee SHTAHT|Ich wohne in einer großen Stadt.|I live in a big city.|A1|Plural: die Städte
places|das Land|the country|n.n|dahss LAHNT|Aus welchem Land kommst du?|Which country are you from?|A1|Plural: die Länder
places|die Straße|the street|n.f|dee SHTRAH-se|Die Straße ist lang.|The street is long.|A1|Plural: die Straßen
places|die Bank|the bank|n.f|dee BAHNK|Die Bank ist in der Nähe.|The bank is nearby.|A1|Plural: die Banken
places|das Krankenhaus|the hospital|n.n|dahss KRAHN-ken-howss|Das Krankenhaus ist weit.|The hospital is far.|A1|Plural: die Krankenhäuser
places|das Restaurant|the restaurant|n.n|dahss res-to-RONG|Das Restaurant ist voll.|The restaurant is full.|A1|Plural: die Restaurants
places|der Park|the park|n.m|dayr PARK|Ich jogge im Park.|I jog in the park.|A1|Plural: die Parks
places|die Schule|the school|n.f|dee SHOO-le|Die Schule ist hier.|The school is here.|A1|Plural: die Schulen
places|das Büro|the office|n.n|dahss bü-ROH|Ich bin im Büro.|I'm in the office.|A1|Plural: die Büros
places|rechts|to the right|adv|rekhts|Biegen Sie rechts ab.|Turn right.
places|links|to the left|adv|links|Die Bank ist links.|The bank is on the left.
places|geradeaus|straight ahead|adv|ge-RAH-de-ows|Gehen Sie geradeaus.|Go straight ahead.
places|nah|near|adj|nah|Der Park ist nah.|The park is near.
places|weit|far|adj|vite|Mein Haus ist weit.|My house is far.
places|hier|here|adv|heer|Ich bin hier.|I am here.
places|dort|there|adv|dort|Die Bank ist dort.|The bank is over there.
travel|der Zug|the train|n.m|dayr TSOOK|Der Zug fährt um zehn Uhr ab.|The train leaves at ten.|A1|Plural: die Züge
travel|der Bus|the bus|n.m|dayr BOOSS|Ich nehme den Bus.|I take the bus.|A1|Plural: die Busse
travel|das Flugzeug|the plane|n.n|dahss FLOOK-tsoyk|Das Flugzeug kommt zu spät.|The plane arrives late.|A1|Plural: die Flugzeuge
travel|der Flughafen|the airport|n.m|dayr FLOOK-hah-fen|Ich fahre zum Flughafen.|I'm going to the airport.|A1|Plural: die Flughäfen
travel|der Bahnhof|the station|n.m|dayr BAHN-hohf|Wo ist der Bahnhof?|Where is the station?|A1|Plural: die Bahnhöfe
travel|die Fahrkarte|the ticket|n.f|dee FAR-kar-te|Ich möchte eine Fahrkarte nach Berlin.|I'd like a ticket to Berlin.|A1|Plural: die Fahrkarten
travel|das Hotel|the hotel|n.n|dahss ho-TEL|Das Hotel ist in der Nähe.|The hotel is nearby.|A1|Plural: die Hotels
travel|der Koffer|the suitcase|n.m|dayr KO-fer|Mein Koffer ist blau.|My suitcase is blue.|A1|Plural: die Koffer
travel|der Reisepass|the passport|n.m|dayr RY-ze-pahss|Ich habe den Reisepass.|I have the passport.|A1|Plural: die Reisepässe
travel|die Reservierung|the reservation|n.f|dee re-zer-VEE-roong|Ich habe eine Reservierung.|I have a reservation.|A1|Plural: die Reservierungen
travel|der Stadtplan|the city map|n.m|dayr SHTAHT-plahn|Ich brauche einen Stadtplan.|I need a city map.|A1|Plural: die Stadtpläne
travel|das Taxi|the taxi|n.n|dahss TAK-see|Ich nehme ein Taxi.|I take a taxi.|A1|Plural: die Taxis
time|heute|today|adv|HOY-te|Heute scheint die Sonne.|Today the sun is shining.
time|morgen|tomorrow|adv|MOR-gen|Morgen arbeite ich.|Tomorrow I work.|A1|Also "morning": der Morgen
time|gestern|yesterday|adv|GES-tern|Gestern habe ich Pizza gegessen.|Yesterday I ate pizza.
time|jetzt|now|adv|yetst|Jetzt bin ich beschäftigt.|Right now I'm busy.
time|die Uhr|the clock / o'clock|n.f|dee OOR|Wie viel Uhr ist es?|What time is it?|A1|Plural: die Uhren
time|der Tag|the day|n.m|dayr TAHK|Es ist ein schöner Tag.|It's a nice day.|A1|Plural: die Tage
time|die Woche|the week|n.f|dee VO-khe|Die Woche hat sieben Tage.|The week has seven days.|A1|Plural: die Wochen
time|der Monat|the month|n.m|dayr MOH-naht|Diesen Monat reise ich.|This month I'm travelling.|A1|Plural: die Monate
time|das Jahr|the year|n.n|dahss YAR|Ein Jahr hat zwölf Monate.|A year has twelve months.|A1|Plural: die Jahre
time|Montag|Monday|n.m|MOHN-tahk|Am Montag arbeite ich.|On Monday I work.|A1|Plural: die Montage
time|Dienstag|Tuesday|n.m|DEENS-tahk|Am Dienstag lerne ich.|On Tuesday I study.|A1|Plural: die Dienstage
time|Mittwoch|Wednesday|n.m|MIT-vokh|Am Mittwoch gehe ich ins Fitnessstudio.|On Wednesday I go to the gym.|A1|Plural: die Mittwoche
time|Donnerstag|Thursday|n.m|DO-ners-tahk|Am Donnerstag esse ich bei meiner Mutter.|On Thursday I eat at my mother's.|A1|Plural: die Donnerstage
time|Freitag|Friday|n.m|FRY-tahk|Am Freitag gehe ich mit Freunden aus.|On Friday I go out with friends.|A1|Plural: die Freitage
time|Samstag|Saturday|n.m|ZAHMS-tahk|Am Samstag ruhe ich mich aus.|On Saturday I rest.|A1|Plural: die Samstage
time|Sonntag|Sunday|n.m|ZON-tahk|Am Sonntag besuche ich meine Oma.|On Sunday I visit my grandma.|A1|Plural: die Sonntage
time|der Morgen|the morning|n.m|dayr MOR-gen|Am Morgen trinke ich Kaffee.|In the morning I drink coffee.|A1|Plural: die Morgen
time|der Nachmittag|the afternoon|n.m|dayr NAHKH-mi-tahk|Am Nachmittag arbeite ich.|In the afternoon I work.|A1|Plural: die Nachmittage
time|der Abend|the evening|n.m|dayr AH-bent|Am Abend lese ich.|In the evening I read.|A1|Plural: die Abende
time|früh|early|adj|frü|Ich stehe früh auf.|I get up early.
time|spät|late|adj|shpayt|Ich komme spät an.|I arrive late.
adjectives|groß|big / tall|adj|grohs|Das Haus ist groß.|The house is big.
adjectives|klein|small|adj|kline|Das Auto ist klein.|The car is small.
adjectives|gut|good|adj|goot|Der Kaffee ist gut.|The coffee is good.
adjectives|schlecht|bad|adj|shlekht|Das Wetter ist schlecht.|The weather is bad.
adjectives|neu|new|adj|noy|Ich habe ein neues Handy.|I have a new phone.
adjectives|alt|old|adj|ahlt|Mein Auto ist alt.|My car is old.
adjectives|schön|beautiful / nice|adj|shöyn|Die Stadt ist schön.|The city is beautiful.
adjectives|hässlich|ugly|adj|HESS-likh|Das Gebäude ist hässlich.|The building is ugly.
adjectives|schnell|fast|adj|shnel|Der Zug ist schnell.|The train is fast.
adjectives|langsam|slow|adj|LAHNG-zahm|Der Bus ist langsam.|The bus is slow.
adjectives|einfach|easy / simple|adj|INE-fahkh|Deutsch ist nicht einfach.|German isn't easy.
adjectives|schwierig|difficult|adj|SHVEE-rikh|Die Prüfung ist schwierig.|The exam is difficult.
adjectives|nett|nice / kind|adj|net|Meine Schwester ist nett.|My sister is nice.
adjectives|sehr|very|adv|zayr|Es ist sehr schön.|It's very beautiful.
adjectives|viel|a lot / much|adv|feel|Ich arbeite viel.|I work a lot.
adjectives|wenig|little / few|adv|VAY-nikh|Ich esse wenig Fleisch.|I eat little meat.
adjectives|mehr|more|adv|mayr|Ich möchte mehr Kaffee.|I want more coffee.
adjectives|weniger|less|adv|VAY-ni-ger|Ich möchte weniger Zucker.|I want less sugar.
hobbies|die Musik|music|n.f|dee moo-ZEEK|Ich mag Musik.|I like music.|A1|Plural: (none)
hobbies|der Fußball|football/soccer|n.m|dayr FOOS-bahl|Ich spiele gern Fußball.|I like playing football.|A1|Plural: (none)
hobbies|das Kino|the cinema|n.n|dahss KEE-noh|Wir gehen ins Kino.|We go to the cinema.|A1|Plural: die Kinos
hobbies|der Film|the movie|n.m|dayr FILM|Der Film ist gut.|The film is good.|A1|Plural: die Filme
hobbies|der Sport|the sport|n.m|dayr SHPORT|Mein Lieblingssport ist Tennis.|My favourite sport is tennis.|A1|Plural: (none)
hobbies|lesen|to read|v|LAY-zen|Ich möchte mehr lesen.|I want to read more.
hobbies|reisen|to travel|v|RY-zen|Ich möchte viel reisen.|I want to travel a lot.
hobbies|kochen|to cook|v|KO-khen|Ich möchte besser kochen.|I want to cook better.
hobbies|tanzen|to dance|v|TAHN-tsen|Ich kann nicht tanzen.|I can't dance.
hobbies|schwimmen|to swim|v|SHVI-men|Ich möchte im Meer schwimmen.|I want to swim in the sea.
hobbies|laufen|to run|v|LOW-fen|Ich möchte jeden Tag laufen.|I want to run every day.
hobbies|spielen|to play|v|SHPEE-len|Ich möchte Tennis spielen.|I want to play tennis.
hobbies|singen|to sing|v|ZING-en|Ich kann gut singen.|I can sing well.
hobbies|der Strand|the beach|n.m|dayr SHTRAHNT|Wir gehen an den Strand.|We go to the beach.|A1|Plural: die Strände
work|die Arbeit|the job / work|n.f|dee AR-byte|Meine Arbeit ist interessant.|My job is interesting.|A1|Plural: die Arbeiten
work|der Arzt|the doctor (m)|n.m|dayr ARTST|Der Arzt ist freundlich.|The doctor is friendly.|A1|Plural: die Ärzte
work|der Lehrer|the teacher (m)|n.m|dayr LAY-rer|Der Lehrer spricht langsam.|The teacher speaks slowly.|A1|Plural: die Lehrer
work|der Student|the student (m)|n.m|dayr shtoo-DENT|Ich bin Student.|I'm a student.|A1|Plural: die Studenten
work|die Firma|the company|n.f|dee FIR-mah|Die Firma ist groß.|The company is big.|A1|Plural: die Firmen
work|das Meeting|the meeting|n.n|dahss MEE-ting|Ich habe ein Meeting.|I have a meeting.|A1|Plural: die Meetings
work|der Chef|the boss|n.m|dayr SHEF|Mein Chef ist nett.|My boss is nice.|A1|Plural: die Chefs
work|die E-Mail|the email|n.f|dee EE-mayl|Ich schreibe eine E-Mail.|I'm writing an email.|A1|Plural: die E-Mails
work|der Kunde|the client|n.m|dayr KOON-de|Der Kunde kommt heute.|The client comes today.|A1|Plural: die Kunden
work|der Ingenieur|the engineer|n.m|dayr in-zhe-NYÖR|Mein Bruder ist Ingenieur.|My brother is an engineer.|A1|Plural: die Ingenieure
work|die Prüfung|the exam|n.f|dee PRÜ-foong|Ich habe morgen eine Prüfung.|I have an exam tomorrow.|A1|Plural: die Prüfungen
work|der Kurs|the course|n.m|dayr KOORS|Der Kurs beginnt um neun.|The course starts at nine.|A1|Plural: die Kurse
emotions|glücklich|happy|adj|GLÜK-likh|Ich bin sehr glücklich.|I'm very happy.
emotions|traurig|sad|adj|TROW-rikh|Mein Freund ist traurig.|My friend is sad.
emotions|müde|tired|adj|MÜ-de|Ich bin heute müde.|I'm tired today.
emotions|zufrieden|content|adj|tsoo-FREE-den|Ich bin mit meiner Arbeit zufrieden.|I'm satisfied with my job.
emotions|wütend|angry|adj|VÜ-tent|Mein Chef ist wütend.|My boss is angry.|A2
emotions|nervös|nervous|adj|ner-VÖS|Ich bin nervös wegen der Prüfung.|I'm nervous about the exam.
emotions|langweilig|boring|adj|LAHNG-vy-likh|Der Film ist langweilig.|The film is boring.
emotions|Ich mag|I like|phr|ikh MAHK|Ich mag Kaffee.|I like coffee.
emotions|Ich liebe|I love|phr|ikh LEE-be|Ich liebe den Strand.|I love the beach.
emotions|Ich glaube, dass|I think that|phr|ikh GLOW-be dahss|Ich glaube, dass das eine gute Idee ist.|I think that it's a good idea.
emotions|Ich stimme zu|I agree|phr|ikh SHTI-me tsoo|Ich stimme dir zu.|I agree with you.
emotions|Ich bin nicht einverstanden|I disagree|phr|ikh bin nikht INE-fer-shtahn-den|Ich bin damit nicht einverstanden.|I don't agree with that.|A2
emotions|die Meinung|the opinion|n.f|dee MY-noong|Meine Meinung ist anders.|My opinion is different.|A2|Plural: die Meinungen
emotions|die Idee|the idea|n.f|dee ee-DAY|Das ist eine gute Idee.|That's a good idea.|A1|Plural: die Ideen
emotions|lieber mögen|to prefer|phr|LEE-ber MÖ-gen|Ich trinke lieber Tee.|I prefer to drink tea.
emotions|Ich habe Hunger|I'm hungry|phr|ikh HAH-be HOONG-er|Ich habe Hunger, essen wir?|I'm hungry, shall we eat?
emotions|Ich habe Durst|I'm thirsty|phr|ikh HAH-be DOORST|Ich habe Durst, ich möchte Wasser.|I'm thirsty, I want water.
nature|die Sonne|the sun|n.f|dee ZO-ne|Heute scheint die Sonne.|Today the sun is shining.|A1|Plural: die Sonnen
nature|der Regen|the rain|n.m|dayr RAY-gen|Der Regen ist stark.|The rain is heavy.|A1|Plural: (none)
nature|der Wind|the wind|n.m|dayr VINT|Es gibt viel Wind.|It's very windy.|A1|Plural: die Winde
nature|Es ist heiß|it's hot|phr|ess ist HYSS|Im Sommer ist es heiß.|In summer it's hot.
nature|Es ist kalt|it's cold|phr|ess ist KAHLT|Im Winter ist es kalt.|In winter it's cold.
nature|das Meer|the sea|n.n|dahss MAYR|Das Meer ist blau.|The sea is blue.|A1|Plural: die Meere
nature|der Berg|the mountain|n.m|dayr BERK|Der Berg ist hoch.|The mountain is high.|A1|Plural: die Berge
nature|der Baum|the tree|n.m|dayr BOWM|Der Baum ist groß.|The tree is big.|A1|Plural: die Bäume
nature|die Blume|the flower|n.f|dee BLOO-me|Die Blume ist schön.|The flower is beautiful.|A1|Plural: die Blumen
nature|der Hund|the dog|n.m|dayr HOONT|Mein Hund ist klein.|My dog is small.|A1|Plural: die Hunde
nature|die Katze|the cat|n.f|dee KAH-tse|Die Katze schläft.|The cat sleeps.|A1|Plural: die Katzen
nature|der Schnee|the snow|n.m|dayr SHNAY|Es gibt Schnee auf dem Berg.|There's snow on the mountain.|A1|Plural: (none)
nature|der Sommer|summer|n.m|dayr ZO-mer|Im Sommer gehe ich an den Strand.|In summer I go to the beach.|A1|Plural: die Sommer
nature|der Winter|winter|n.m|dayr VIN-ter|Der Winter ist lang.|Winter is long.|A1|Plural: die Winter
health|der Körper|the body|n.m|dayr KÖR-per|Der Körper braucht Wasser.|The body needs water.|A1|Plural: die Körper
health|der Kopf|the head|n.m|dayr KOPF|Mein Kopf tut weh.|My head hurts.|A1|Plural: die Köpfe
health|die Hand|the hand|n.f|dee HAHNT|Meine Hand ist kalt.|My hand is cold.|A1|Plural: die Hände
health|der Bauch|the stomach / belly|n.m|dayr BOWKH|Mein Bauch tut weh.|My stomach hurts.|A1|Plural: die Bäuche
health|der Arm|the arm|n.m|dayr ARM|Mein Arm tut weh.|My arm hurts.|A1|Plural: die Arme
health|das Bein|the leg|n.n|dahss BINE|Mein Bein tut weh.|My leg hurts.|A1|Plural: die Beine
health|der Schmerz|the pain|n.m|dayr SHMERTS|Ich habe starke Schmerzen.|I have severe pain.|A1|Plural: die Schmerzen
health|krank|sick|adj|krahnk|Mein Sohn ist krank.|My son is sick.
health|die Apotheke|the pharmacy|n.f|dee a-po-TAY-ke|Die Apotheke ist in der Nähe.|The pharmacy is nearby.|A1|Plural: die Apotheken
health|das Medikament|the medicine|n.n|dahss may-di-ka-MENT|Ich brauche das Medikament.|I need the medicine.|A1|Plural: die Medikamente
health|das Fieber|the fever|n.n|dahss FEE-ber|Ich habe Fieber.|I have a fever.|A1|Plural: (none)
health|tut weh|it hurts|phr|toot VAY|Mein Rücken tut weh.|My back hurts.
health|die Hilfe|the help|n.f|dee HIL-fe|Ich brauche Hilfe.|I need help.|A1|Plural: (none)
health|der Notfall|the emergency|n.m|dayr NOHT-fahl|Das ist ein Notfall.|It's an emergency.|A1|Plural: die Notfälle
health|das Auge|the eye|n.n|dahss OW-ge|Mein Auge tut weh.|My eye hurts.|A1|Plural: die Augen
connectors|und|and|conj|oont|Brot und Käse.|Bread and cheese.
connectors|oder|or|conj|OH-der|Kaffee oder Tee?|Coffee or tea?
connectors|aber|but|conj|AH-ber|Ich möchte kommen, aber ich kann nicht.|I want to come, but I can't.
connectors|weil|because|conj|vyl|Ich lerne Deutsch, weil ich reisen möchte.|I learn German because I want to travel.
connectors|auch|also / too|adv|owkh|Ich auch.|Me too.
connectors|mit|with|prep|mit|Kaffee mit Milch.|Coffee with milk.
connectors|ohne|without|prep|OH-ne|Kaffee ohne Zucker.|Coffee without sugar.
connectors|wenn|if / when|conj|ven|Wenn du willst, gehen wir.|If you want, let's go.
connectors|dann|then|adv|dahn|Erst esse ich, dann arbeite ich.|First I eat, then I work.
connectors|danach|afterwards|adv|dah-NAKH|Ich esse und danach arbeite ich.|I eat and afterwards I work.
connectors|vorher|beforehand|adv|FOR-hayr|Vorher wasche ich mir die Hände.|Beforehand I wash my hands.
connectors|immer|always|adv|I-mer|Ich trinke immer Wasser.|I always drink water.
connectors|nie|never|adv|nee|Ich esse nie Fleisch.|I never eat meat.
connectors|manchmal|sometimes|adv|MAHNKH-mahl|Manchmal gehe ich zu Fuß zur Arbeit.|Sometimes I walk to work.
connectors|schon|already|adv|shohn|Ich habe schon meine Fahrkarte.|I already have my ticket.
connectors|noch|still / yet|adv|nokh|Ich habe noch keinen Hunger.|I'm not hungry yet.
connectors|deshalb|therefore|adv|DES-hahlp|Ich bin müde, deshalb schlafe ich.|I'm tired, therefore I sleep.|A2
connectors|zum Beispiel|for example|phr|tsoom BY-shpeel|Ich mag Sport, zum Beispiel Tennis.|I like sports, for example tennis.|A2
connectors|ja|yes|adv|yah|Ja, gern.|Yes, gladly.
connectors|nein|no|adv|nine|Nein, danke.|No, thank you.
food|der Nachtisch|the dessert|n.m|dayr NAHKH-tish|Zum Nachtisch möchte ich Eis.|For dessert I'd like ice cream.|A1
food|das Salz|the salt|n.n|dahss ZAHLTS|In der Suppe fehlt Salz.|The soup needs salt.|A1
food|der Zucker|the sugar|n.m|dayr TSOO-ker|Ich möchte keinen Zucker im Kaffee.|I don't want sugar in my coffee.|A1
food|der Salat|the salad|n.m|dayr zah-LAHT|Ich möchte einen Salat.|I'd like a salad.|A1|Plural: die Salate
food|das Eis|the ice cream|n.n|dahss ICE|Das Eis ist Schokolade.|The ice cream is chocolate.|A1
objects|das Wohnzimmer|the living room|n.n|dahss VOHN-tsim-er|Das Wohnzimmer ist groß.|The living room is big.|A1
objects|das Schlafzimmer|the bedroom|n.n|dahss SHLAHF-tsim-er|Mein Schlafzimmer ist klein.|My bedroom is small.|A1
objects|das Badezimmer|the bathroom|n.n|dahss BAH-deh-tsim-er|Wo ist das Badezimmer?|Where is the bathroom?|A1
objects|die Küche|the kitchen|n.f|dee KUE-kheh|Die Küche ist sauber.|The kitchen is clean.|A1|Plural: die Küchen
objects|der Garten|the garden|n.m|dayr GAHR-ten|Der Garten hat Blumen.|The garden has flowers.|A1|Plural: die Gärten
objects|die Miete|the rent|n.f|dee MEE-teh|Die Miete ist teuer.|The rent is expensive.|A1
objects|der Nachbar|the neighbour|n.m|dayr NAHKH-bahr|Mein Nachbar ist nett.|My neighbour is nice.|A1|Plural: die Nachbarn
work|die Besprechung|the meeting|n.f|dee beh-SHPRECH-oong|Die Besprechung ist um drei.|The meeting is at three.|A1
work|das Gehalt|the salary|n.n|dahss geh-HAHLT|Das Gehalt ist gut.|The salary is good.|A1
work|der Vertrag|the contract|n.m|dayr fer-TRAHK|Ich unterschreibe den Vertrag heute.|I sign the contract today.|A1|Plural: die Verträge
work|das Vorstellungsgespräch|the interview|n.n|dahss FOR-shtel-oongs-geh-shpraych|Morgen habe ich ein Vorstellungsgespräch.|Tomorrow I have an interview.|A2
work|der Stundenplan|the schedule|n.m|dayr SHTOON-den-plahn|Mein Stundenplan ist flexibel.|My schedule is flexible.|A2
travel|das Gepäck|the luggage|n.n|dahss geh-PECK|Das Gepäck ist schwer.|The luggage is heavy.|A1
travel|die Ankunft|the arrival|n.f|dee AHN-koonft|Die Ankunft ist um zehn.|The arrival is at ten.|A2
travel|der Ausgang|the exit|n.m|dayr OWS-gahng|Der Ausgang ist rechts.|The exit is on the right.|A1
travel|die Verspätung|the delay|n.f|dee fer-SHPAY-toong|Der Zug hat Verspätung.|The train is delayed.|A2
travel|die Grenze|the border|n.f|dee GREN-tseh|Wir überqueren die Grenze.|We cross the border.|A2
travel|das Zimmer|the room|n.n|dahss TSIM-er|Das Zimmer ist sauber.|The room is clean.|A1
health|der Hals|the throat / neck|n.m|dayr HAHLS|Mein Hals tut weh.|My throat hurts.|A1
health|der Husten|the cough|n.m|dayr HOO-sten|Ich habe Husten seit gestern.|I've had a cough since yesterday.|A1
health|das Rezept|the prescription|n.n|dahss reh-TSEPT|Ich brauche ein Rezept.|I need a prescription.|A1
health|sich ausruhen|to rest|v|zich OWS-roo-en|Ich muss mich ausruhen.|I need to rest.|A2
verbs|anfangen|to start|v|AHN-fahng-en|Der Kurs wird gleich anfangen.|The class is about to start.
verbs|beenden|to finish|v|beh-EN-den|Ich möchte die Arbeit beenden.|I'd like to finish the work.
verbs|warten|to wait|v|VAHR-ten|Ich möchte auf den Bus warten.|I'd like to wait for the bus.
verbs|suchen|to look for|v|ZOO-khen|Ich möchte meine Schlüssel suchen.|I'd like to look for my keys.
verbs|finden|to find|v|FIN-den|Ich möchte eine Wohnung finden.|I'd like to find a flat.
verbs|helfen|to help|v|HEL-fen|Kannst du meinem Freund helfen?|Can you help my friend?
verbs|vergessen|to forget|v|fer-GES-en|Ich möchte nichts vergessen.|I don't want to forget anything.
verbs|fragen|to ask|v|FRAH-gen|Ich möchte nach dem Preis fragen.|I'd like to ask the price.
verbs|antworten|to answer|v|AHNT-vor-ten|Ich möchte auf die E-Mail antworten.|I'd like to answer the email.
verbs|kennen|to know (a person/place)|v|KEN-en|Ich möchte Berlin kennen.|I'd like to know Berlin.
verbs|ändern|to change|v|EN-dern|Ich möchte den Job ändern.|I'd like to change the job.
verbs|bevorzugen|to prefer|v|beh-FOR-tsoo-gen|Ich möchte Tee bevorzugen.|I'd prefer tea.
emotions|besorgt|worried|adj|beh-ZORGT|Ich bin besorgt um dich.|I'm worried about you.
emotions|stolz|proud|adj|SHTOLTS|Ich bin stolz auf dich.|I'm proud of you.
emotions|überrascht|surprised|adj|ue-ber-RAHSHT|Ich bin sehr überrascht.|I'm very surprised.
adjectives|wichtig|important|adj|VICH-tich|Das ist sehr wichtig.|That is very important.
adjectives|gefährlich|dangerous|adj|geh-FAIR-lich|Hier ist es gefährlich.|It's dangerous here.
adjectives|sicher|safe / sure|adj|ZI-kher|Ich bin sicher.|I'm sure.
adjectives|beschäftigt|busy|adj|beh-SHEFF-tikht|Ich bin heute beschäftigt.|I'm busy today.
adjectives|frei|free|adj|FRY|Bist du morgen frei?|Are you free tomorrow?
adjectives|anders|different|adj|AHN-ders|Das ist ganz anders.|That is quite different.
adjectives|nötig|necessary|adj|NOE-tich|Es ist nötig, sich auszuruhen.|It's necessary to rest.
adjectives|möglich|possible|adj|MOEG-lich|Es ist möglich, spät zu kommen.|It's possible to arrive late.
connectors|trotzdem|nevertheless|adv|TROTS-daym|Es ist teuer, trotzdem gefällt es mir.|It's expensive, nevertheless I like it.|B1
connectors|außerdem|besides|adv|OW-ser-daym|Außerdem ist es sehr billig.|Besides, it's very cheap.|B1
connectors|obwohl|although|conj|op-VOHL|Ich gehe, obwohl es regnet.|I'm going although it's raining.|B1
connectors|während|while|conj|VAIR-rent|Ich lese, während ich esse.|I read while I eat.|B1
connectors|plötzlich|suddenly|adv|PLOETS-lich|Plötzlich fing es an zu regnen.|Suddenly it started to rain.|B1
nature|der Fluss|the river|n.m|dayr FLOOS|Der Fluss ist lang.|The river is long.|A1|Plural: die Flüsse
nature|der Himmel|the sky|n.m|dayr HIM-el|Der Himmel ist blau.|The sky is blue.|A1
nature|die Wolke|the cloud|n.f|dee VOL-keh|Da ist eine große Wolke.|There is a big cloud.|A1|Plural: die Wolken
places|die Regierung|the government|n.f|dee reh-GEE-roong|Die Regierung ändert das Gesetz.|The government changes the law.|A2
places|das Dorf|the village|n.n|dahss DORF|Mein Dorf ist klein.|My village is small.|A1|Plural: die Dörfer
places|die Nachricht|the news item|n.f|dee NAHKH-richt|Das ist eine gute Nachricht.|It's good news.|A2
places|die Wirtschaft|the economy|n.f|dee VIRT-shahft|Die Wirtschaft wächst.|The economy grows.|A2
`;
