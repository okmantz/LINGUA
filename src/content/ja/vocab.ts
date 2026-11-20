// cat|target|english|pos|romaji|example|translation|level?|note?
export const JA_VOCAB = `
script|あ|a (hiragana)|letter|a|あめがふります。|It rains.|A1|あ い う え お = a i u e o.
script|い|i (hiragana)|letter|i|いぬがいます。|There is a dog.|A1
script|う|u (hiragana)|letter|u|うみがすきです。|I like the sea.|A1
script|え|e (hiragana)|letter|e|えをかきます。|I draw a picture.|A1
script|お|o (hiragana)|letter|o|おちゃをのみます。|I drink tea.|A1
script|か|ka (hiragana)|letter|ka|かばんがあります。|There is a bag.|A1
script|き|ki (hiragana)|letter|ki|きのうあめでした。|Yesterday it rained.|A1
script|く|ku (hiragana)|letter|ku|くるまがあります。|I have a car.|A1
script|さ|sa (hiragana)|letter|sa|さかなをたべます。|I eat fish.|A1
script|し|shi (hiragana)|letter|shi|しごとにいきます。|I go to work.|A1
script|た|ta (hiragana)|letter|ta|たまごをたべます。|I eat eggs.|A1
script|な|na (hiragana)|letter|na|なつはあついです。|Summer is hot.|A1
script|は|ha / wa (hiragana)|letter|ha|花がきれいです。|The flower is pretty.|A1|Pronounced "wa" as the topic particle.
script|ま|ma (hiragana)|letter|ma|まいにちはたらきます。|I work every day.|A1
script|や|ya (hiragana)|letter|ya|やさいをたべます。|I eat vegetables.|A1
script|ら|ra (hiragana)|letter|ra|らーめんをたべます。|I eat ramen.|A1
script|わ|wa (hiragana)|letter|wa|わたしはがくせいです。|I am a student.|A1
script|を|o (object particle)|letter|o|ほんをよみます。|I read a book.|A1
script|ん|n (hiragana)|letter|n|ほんをよみます。|I read a book.|A1
script|ア|a (katakana)|letter|a|アイスをたべます。|I eat ice cream.|A1|Katakana is used for foreign words.
script|カ|ka (katakana)|letter|ka|カメラがあります。|I have a camera.|A1
script|コ|ko (katakana)|letter|ko|コーヒーをのみます。|I drink coffee.|A1
script|ト|to (katakana)|letter|to|トマトをたべます。|I eat a tomato.|A1
greetings|おはようございます|good morning|phr|ohayō gozaimasu|おはようございます、たなかさん。|Good morning, Mr Tanaka.
greetings|こんにちは|hello / good afternoon|phr|konnichiwa|こんにちは、げんきですか。|Hello, how are you?
greetings|こんばんは|good evening|phr|konbanwa|こんばんは、みなさん。|Good evening, everyone.
greetings|おやすみなさい|good night|phr|oyasuminasai|おやすみなさい、またあした。|Good night, see you tomorrow.
greetings|さようなら|goodbye|phr|sayōnara|さようなら、またあした。|Goodbye, see you tomorrow.
greetings|ありがとうございます|thank you|phr|arigatō gozaimasu|たすけてくれてありがとうございます。|Thank you for helping me.
greetings|すみません|excuse me / sorry|phr|sumimasen|すみません、えきはどこですか。|Excuse me, where is the station?
greetings|ごめんなさい|I'm sorry|phr|gomennasai|おそくなってごめんなさい。|Sorry I'm late.
greetings|はじめまして|nice to meet you (first time)|phr|hajimemashite|はじめまして、アンナです。|Nice to meet you, I'm Anna.
greetings|よろしくおねがいします|please treat me well|phr|yoroshiku onegaishimasu|どうぞよろしくおねがいします。|Pleased to meet you.
greetings|おげんきですか|how are you?|phr|ogenki desu ka|こんにちは、おげんきですか。|Hello, how are you?
greetings|はい|yes|phr|hai|はい、そうです。|Yes, that's right.
greetings|いいえ|no|phr|iie|いいえ、けっこうです。|No, thank you.
greetings|おねがいします|please|phr|onegaishimasu|コーヒーをおねがいします。|A coffee, please.
greetings|どうぞ|please / here you are|phr|dōzo|どうぞ、すわってください。|Please sit down.
greetings|どういたしまして|you're welcome|phr|dō itashimashite|どういたしまして。|You're welcome.
pronouns|わたし|I|pron|watashi|わたしはがくせいです。|I am a student.
pronouns|あなた|you|pron|anata|あなたはせんせいですか。|Are you a teacher?|A1|Use names instead of あなた when possible.
pronouns|かれ|he / boyfriend|pron|kare|かれはいしゃです。|He is a doctor.
pronouns|かのじょ|she / girlfriend|pron|kanojo|かのじょはせんせいです。|She is a teacher.
pronouns|わたしたち|we|pron|watashitachi|わたしたちはともだちです。|We are friends.
pronouns|これ|this|pron|kore|これはほんです。|This is a book.
pronouns|それ|that (near you)|pron|sore|それはなんですか。|What is that?
pronouns|あれ|that over there|pron|are|あれはえきです。|That over there is the station.
pronouns|ここ|here|pron|koko|ここにすわってください。|Please sit here.
pronouns|そこ|there|pron|soko|そこにあります。|It's there.
pronouns|あそこ|over there|pron|asoko|あそこがトイレです。|The toilet is over there.
pronouns|だれ|who|pron|dare|あのひとはだれですか。|Who is that person?
numbers|一|one|num|ichi|ひとつください。|One, please.
numbers|二|two|num|ni|ふたつあります。|There are two.
numbers|三|three|num|san|みっつあります。|There are three.
numbers|四|four|num|yon|よっつください。|Four, please.
numbers|五|five|num|go|五人です。|There are five people.
numbers|六|six|num|roku|六時です。|It's six o'clock.
numbers|七|seven|num|nana|七日です。|It's the seventh.
numbers|八|eight|num|hachi|八時です。|It's eight o'clock.
numbers|九|nine|num|kyū|九時です。|It's nine o'clock.
numbers|十|ten|num|jū|十分かかります。|It takes ten minutes.
numbers|二十|twenty|num|nijū|二十さいです。|I'm twenty.
numbers|百|one hundred|num|hyaku|百円です。|It's a hundred yen.
numbers|千|one thousand|num|sen|千円です。|It's a thousand yen.
numbers|万|ten thousand|num|man|一万円です。|It's ten thousand yen.
time|今日|today|n|kyō|今日はいい天気です。|The weather is good today.
time|明日|tomorrow|n|ashita|明日あいましょう。|Let's meet tomorrow.
time|昨日|yesterday|n|kinō|昨日えいがをみました。|I watched a film yesterday.
time|今|now|n|ima|今なんじですか。|What time is it now?
time|朝|morning|n|asa|朝コーヒーをのみます。|I drink coffee in the morning.
time|夜|night|n|yoru|夜ねます。|I sleep at night.
time|午後|afternoon|n|gogo|午後はいそがしいです。|I'm busy in the afternoon.
time|時|o'clock|n|ji|七時におきます。|I get up at seven.
time|分|minute|n|fun|十分かかります。|It takes ten minutes.
time|月曜日|Monday|n|getsuyōbi|月曜日にはたらきます。|I work on Monday.
time|火曜日|Tuesday|n|kayōbi|火曜日にじゅぎょうがあります。|There's a lesson on Tuesday.
time|水曜日|Wednesday|n|suiyōbi|水曜日にあいましょう。|Let's meet on Wednesday.
time|木曜日|Thursday|n|mokuyōbi|木曜日はやすみです。|Thursday is a day off.
time|金曜日|Friday|n|kinyōbi|今日は金曜日です。|Today is Friday.
time|土曜日|Saturday|n|doyōbi|土曜日はやすみです。|Saturday is a day off.
time|日曜日|Sunday|n|nichiyōbi|日曜日はうちにいます。|I'm at home on Sunday.
time|週末|weekend|n|shūmatsu|週末になにをしますか。|What do you do on the weekend?
time|毎日|every day|n|mainichi|毎日べんきょうします。|I study every day.
time|いつも|always|adv|itsumo|いつもうちにいます。|I'm always at home.
time|ときどき|sometimes|adv|tokidoki|ときどきえいがをみます。|Sometimes I watch films.
questions|なに|what|pron|nani|これはなんですか。|What is this?
questions|どこ|where|pron|doko|トイレはどこですか。|Where is the toilet?
questions|いつ|when|pron|itsu|いつきますか。|When will you come?
questions|なぜ|why|adv|naze|なぜきますか。|Why do you come?
questions|どう|how|adv|dō|これはどうですか。|How is this?
questions|いくら|how much|pron|ikura|これはいくらですか。|How much is this?
questions|いくつ|how many|pron|ikutsu|りんごはいくつですか。|How many apples?
questions|どれ|which (of 3+)|pron|dore|どれがすきですか。|Which do you like?
questions|どんな|what kind of|det|donna|どんなたべものがすきですか。|What kind of food do you like?
food|水|water|n|mizu|水をください。|Water, please.
food|ごはん|rice / meal|n|gohan|ごはんをたべます。|I eat rice.
food|パン|bread|n|pan|パンをたべます。|I eat bread.
food|牛乳|milk|n|gyūnyū|牛乳をのみます。|I drink milk.
food|コーヒー|coffee|n|kōhī|コーヒーがすきです。|I like coffee.
food|お茶|tea|n|ocha|お茶をのみます。|I drink tea.
food|ジュース|juice|n|jūsu|ジュースをのみます。|I drink juice.
food|ビール|beer|n|bīru|ビールをください。|A beer, please.
food|肉|meat|n|niku|肉をたべます。|I eat meat.
food|魚|fish|n|sakana|魚がすきです。|I like fish.
food|卵|egg|n|tamago|卵をたべます。|I eat eggs.
food|野菜|vegetables|n|yasai|野菜をたべます。|I eat vegetables.
food|果物|fruit|n|kudamono|果物がすきです。|I like fruit.
food|りんご|apple|n|ringo|りんごがおいしいです。|The apple is tasty.
food|ラーメン|ramen|n|rāmen|ラーメンをたべます。|I eat ramen.
food|すし|sushi|n|sushi|すしがすきです。|I like sushi.
food|スープ|soup|n|sūpu|スープがあついです。|The soup is hot.
food|朝ごはん|breakfast|n|asagohan|朝ごはんをたべます。|I eat breakfast.
food|昼ごはん|lunch|n|hirugohan|昼ごはんは一時です。|Lunch is at one.
food|晩ごはん|dinner|n|bangohan|晩ごはんは七時です。|Dinner is at seven.
food|メニュー|menu|n|menyū|メニューをください。|The menu, please.
food|お会計|bill|n|okaikei|お会計をおねがいします。|The bill, please.
food|しお|salt|n|shio|しおがひつようです。|I need salt.
food|さとう|sugar|n|satō|さとうがあまいです。|The sugar is sweet.
family|家族|family|n|kazoku|家族は四人です。|My family is four people.
family|母|mother (own)|n|haha|母は先生です。|My mother is a teacher.
family|父|father (own)|n|chichi|父は医者です。|My father is a doctor.
family|兄|older brother (own)|n|ani|兄は学生です。|My older brother is a student.
family|姉|older sister (own)|n|ane|姉は先生です。|My older sister is a teacher.
family|弟|younger brother (own)|n|otōto|弟は十五さいです。|My younger brother is fifteen.
family|妹|younger sister (own)|n|imōto|妹は学生です。|My younger sister is a student.
family|子ども|child|n|kodomo|子どもがねています。|The child is sleeping.
family|友達|friend|n|tomodachi|友達がたくさんいます。|I have many friends.
family|おじいさん|grandfather|n|ojīsan|おじいさんは新聞をよみます。|Grandpa reads the paper.
family|おばあさん|grandmother|n|obāsan|おばあさんはいなかにすんでいます。|Grandma lives in the countryside.
family|夫|husband (own)|n|otto|夫は医者です。|My husband is a doctor.
family|妻|wife (own)|n|tsuma|妻は先生です。|My wife is a teacher.
family|人|person|n|hito|いい人です。|He's a good person.
family|男の人|man|n|otoko no hito|男の人がきます。|A man comes.
family|女の人|woman|n|onna no hito|女の人がきます。|A woman comes.
family|となり|neighbour / next to|n|tonari|となりの人はしんせつです。|The neighbour is kind.
places|家|house / home|n|ie|家は大きいです。|The house is big.
places|町|town|n|machi|町は大きいです。|The town is big.
places|道|road|n|michi|道がながいです。|The road is long.
places|店|shop|n|mise|店はあいています。|The shop is open.
places|レストラン|restaurant|n|resutoran|レストランはいいです。|The restaurant is good.
places|銀行|bank|n|ginkō|銀行はしまっています。|The bank is closed.
places|薬局|pharmacy|n|yakkyoku|薬局はちかいです。|The pharmacy is near.
places|病院|hospital|n|byōin|病院は大きいです。|The hospital is big.
places|学校|school|n|gakkō|学校は新しいです。|The school is new.
places|公園|park|n|kōen|公園はきれいです。|The park is pretty.
places|駅|station|n|eki|駅は大きいです。|The station is big.
places|空港|airport|n|kūkō|空港は大きいです。|The airport is big.
places|トイレ|toilet|n|toire|トイレはどこですか。|Where is the toilet?
places|右|right|n|migi|右にいってください。|Please go to the right.
places|左|left|n|hidari|左にいってください。|Please go to the left.
places|まっすぐ|straight|adv|massugu|まっすぐいってください。|Please go straight.
places|ちかい|near|adj|chikai|駅はちかいです。|The station is near.
places|とおい|far|adj|tōi|学校はとおいです。|The school is far.
places|会社|company|n|kaisha|会社は大きいです。|The company is big.
travel|バス|bus|n|basu|バスがきます。|The bus comes.
travel|電車|train|n|densha|電車ははやいです。|The train is fast.
travel|地下鉄|subway|n|chikatetsu|地下鉄は便利です。|The subway is convenient.
travel|タクシー|taxi|n|takushī|タクシーはたかいです。|The taxi is expensive.
travel|新幹線|bullet train|n|shinkansen|新幹線ははやいです。|The bullet train is fast.
travel|飛行機|plane|n|hikōki|飛行機ははやいです。|The plane is fast.
travel|車|car|n|kuruma|車は新しいです。|The car is new.
travel|切符|ticket|n|kippu|切符はたかいです。|The ticket is expensive.
travel|パスポート|passport|n|pasupōto|パスポートはここです。|The passport is here.
travel|ホテル|hotel|n|hoteru|ホテルはいいです。|The hotel is good.
travel|部屋|room|n|heya|部屋はきれいです。|The room is clean.
travel|かばん|bag|n|kaban|かばんはおもいです。|The bag is heavy.
travel|地図|map|n|chizu|地図はここです。|The map is here.
travel|旅行|trip|n|ryokō|旅行は楽しいです。|The trip is fun.
travel|休み|holiday / day off|n|yasumi|休みは八月です。|The holiday is in August.
travel|ホーム|platform|n|hōmu|ホームは四番です。|The platform is number four.
shopping|お金|money|n|okane|お金がありません。|I have no money.
shopping|値段|price|n|nedan|値段はたかいです。|The price is high.
shopping|円|yen|n|en|千円です。|It's a thousand yen.
shopping|たかい|expensive / tall|adj|takai|これはたかいです。|This is expensive.
shopping|やすい|cheap|adj|yasui|ここはやすいです。|It's cheap here.
shopping|買います|to buy|v|kaimasu|パンを買います。|I buy bread.
shopping|カード|card|n|kādo|カードではらいます。|I pay by card.
shopping|げんきん|cash|n|genkin|げんきんではらいます。|I pay in cash.
shopping|服|clothes|n|fuku|服はきれいです。|The clothes are pretty.
shopping|くつ|shoes|n|kutsu|くつは新しいです。|The shoes are new.
shopping|サイズ|size|n|saizu|サイズは大きいです。|The size is large.
shopping|レシート|receipt|n|reshīto|レシートをください。|A receipt, please.
shopping|わりびき|discount|n|waribiki|わりびきがあります。|There's a discount.
shopping|ジャケット|jacket|n|jaketto|ジャケットをさがしています。|I'm looking for a jacket.
work|仕事|work / job|n|shigoto|仕事は楽しいです。|The work is fun.
work|会社員|office worker|n|kaishain|わたしは会社員です。|I'm an office worker.
work|先生|teacher|n|sensei|先生はしんせつです。|The teacher is kind.
work|学生|student|n|gakusei|学生はおおいです。|There are many students.
work|医者|doctor|n|isha|医者はしんせつです。|The doctor is kind.
work|エンジニア|engineer|n|enjinia|かれはエンジニアです。|He is an engineer.
work|同僚|colleague|n|dōryō|同僚はしんせつです。|The colleague is kind.
work|会議|meeting|n|kaigi|会議は二時です。|The meeting is at two.
work|授業|lesson|n|jugyō|授業はおもしろいです。|The lesson is interesting.
work|質問|question|n|shitsumon|質問があります。|I have a question.
work|電話|phone|n|denwa|電話がなります。|The phone rings.
work|パソコン|computer|n|pasokon|パソコンは新しいです。|The computer is new.
work|事務所|office|n|jimusho|事務所は大きいです。|The office is big.
work|社長|boss|n|shachō|社長はいそがしいです。|The boss is busy.
health|頭|head|n|atama|頭がいたいです。|My head hurts.
health|手|hand|n|te|手がいたいです。|My hand hurts.
health|足|leg / foot|n|ashi|足がいたいです。|My leg hurts.
health|おなか|stomach|n|onaka|おなかがいたいです。|My stomach hurts.
health|のど|throat|n|nodo|のどがいたいです。|My throat hurts.
health|歯|tooth|n|ha|歯がいたいです。|My tooth hurts.
health|せなか|back|n|senaka|せなかがいたいです。|My back hurts.
health|目|eye|n|me|目がいたいです。|My eye hurts.
health|薬|medicine|n|kusuri|薬をのみます。|I take medicine.
health|熱|fever|n|netsu|熱があります。|I have a fever.
health|せき|cough|n|seki|せきがでます。|I'm coughing.
health|けんこう|health|n|kenkō|けんこうがたいせつです。|Health is important.
health|いたい|painful|adj|itai|頭がいたいです。|My head hurts.
health|かぜ|a cold|n|kaze|かぜをひきました。|I caught a cold.
health|びょうき|illness|n|byōki|びょうきです。|I'm ill.
health|げんき|healthy / well|adj|genki|わたしはげんきです。|I'm well.
emotions|うれしい|happy|adj|ureshii|わたしはうれしいです。|I'm happy.
emotions|かなしい|sad|adj|kanashii|わたしはかなしいです。|I'm sad.
emotions|こわい|scary / scared|adj|kowai|こわいです。|I'm scared.
emotions|おもしろい|interesting / funny|adj|omoshiroi|えいがはおもしろいです。|The film is interesting.
emotions|つまらない|boring|adj|tsumaranai|じゅぎょうはつまらないです。|The lesson is boring.
emotions|つかれました|tired|v|tsukaremashita|わたしはつかれました。|I'm tired.
emotions|思います|to think|v|omoimasu|いいと思います。|I think it's good.
emotions|いけん|opinion|n|iken|わたしのいけんはこうです。|My opinion is this.
emotions|そうです|that's right|phr|sō desu|はい、そうです。|Yes, that's right.
emotions|さんせい|agreement|n|sansei|わたしもさんせいです。|I agree too.
emotions|とても|very|adv|totemo|とてもいいです。|It's very good.
emotions|たのしい|fun|adj|tanoshii|りょこうはたのしいです。|The trip is fun.
emotions|すき|to like|adj|suki|コーヒーがすきです。|I like coffee.
emotions|きらい|to dislike|adj|kirai|さかながきらいです。|I dislike fish.
nature|天気|weather|n|tenki|天気はいいです。|The weather is good.
nature|太陽|sun|n|taiyō|太陽はあかるいです。|The sun is bright.
nature|雨|rain|n|ame|雨がふります。|It rains.
nature|雪|snow|n|yuki|雪がふります。|It snows.
nature|風|wind|n|kaze|風がつよいです。|The wind is strong.
nature|さむい|cold (weather)|adj|samui|今日はさむいです。|It's cold today.
nature|あつい|hot (weather)|adj|atsui|今日はあついです。|It's hot today.
nature|あたたかい|warm|adj|atatakai|今日はあたたかいです。|It's warm today.
nature|夏|summer|n|natsu|夏はあついです。|Summer is hot.
nature|冬|winter|n|fuyu|冬はさむいです。|Winter is cold.
nature|春|spring|n|haru|春はあたたかいです。|Spring is warm.
nature|秋|autumn|n|aki|秋はきれいです。|Autumn is beautiful.
nature|海|sea|n|umi|海はあおいです。|The sea is blue.
nature|山|mountain|n|yama|山はたかいです。|The mountain is high.
nature|川|river|n|kawa|川はながいです。|The river is long.
nature|花|flower|n|hana|花はきれいです。|The flower is pretty.
nature|空|sky|n|sora|空はあおいです。|The sky is blue.
hobbies|音楽|music|n|ongaku|音楽がすきです。|I like music.
hobbies|本|book|n|hon|本はおもしろいです。|The book is interesting.
hobbies|映画|film|n|eiga|映画はおもしろいです。|The film is interesting.
hobbies|スポーツ|sport|n|supōtsu|スポーツがすきです。|I like sport.
hobbies|サッカー|football|n|sakkā|サッカーはたのしいです。|Football is fun.
hobbies|ゲーム|game|n|gēmu|ゲームはたのしいです。|The game is fun.
hobbies|ギター|guitar|n|gitā|ギターは新しいです。|The guitar is new.
hobbies|写真|photo|n|shashin|写真はきれいです。|The photo is pretty.
hobbies|さんぽ|walk|n|sanpo|さんぽはたのしいです。|A walk is fun.
hobbies|コンサート|concert|n|konsāto|コンサートは土曜日です。|The concert is on Saturday.
hobbies|しゅみ|hobby|n|shumi|わたしのしゅみは読書です。|My hobby is reading.
hobbies|歌|song|n|uta|歌はいいです。|The song is good.
hobbies|絵|picture|n|e|絵はきれいです。|The picture is pretty.
hobbies|りょうり|cooking|n|ryōri|りょうりがすきです。|I like cooking.
objects|つくえ|desk|n|tsukue|つくえは大きいです。|The desk is big.
objects|いす|chair|n|isu|いすは新しいです。|The chair is new.
objects|まど|window|n|mado|まどはあいています。|The window is open.
objects|ドア|door|n|doa|ドアはしまっています。|The door is closed.
objects|台所|kitchen|n|daidokoro|台所はきれいです。|The kitchen is clean.
objects|ベッド|bed|n|beddo|ベッドはやわらかいです。|The bed is soft.
objects|かぎ|key|n|kagi|かぎはここです。|The key is here.
objects|コップ|cup|n|koppu|コップはきれいです。|The cup is clean.
objects|さら|plate|n|sara|さらはきれいです。|The plate is clean.
objects|スプーン|spoon|n|supūn|スプーンはここです。|The spoon is here.
objects|ペン|pen|n|pen|ペンはつくえにあります。|The pen is on the desk.
objects|ノート|notebook|n|nōto|ノートは新しいです。|The notebook is new.
objects|かがみ|mirror|n|kagami|かがみは大きいです。|The mirror is big.
objects|テレビ|television|n|terebi|テレビがついています。|The TV is on.
verbs|います|to be (living things)|v|imasu|家にいます。|I'm at home.
verbs|あります|to be (things)|v|arimasu|時間があります。|I have time.
verbs|です|to be|v|desu|わたしは学生です。|I am a student.
verbs|します|to do|v|shimasu|スポーツをします。|I do sport.
verbs|行きます|to go|v|ikimasu|学校に行きます。|I go to school.
verbs|来ます|to come|v|kimasu|友達が来ます。|My friend comes.
verbs|食べます|to eat|v|tabemasu|ごはんを食べます。|I eat rice.
verbs|飲みます|to drink|v|nomimasu|水を飲みます。|I drink water.
verbs|ねます|to sleep|v|nemasu|夜ねます。|I sleep at night.
verbs|おきます|to get up|v|okimasu|七時におきます。|I get up at seven.
verbs|見ます|to see / watch|v|mimasu|映画を見ます。|I watch a film.
verbs|読みます|to read|v|yomimasu|本を読みます。|I read a book.
verbs|書きます|to write|v|kakimasu|手紙を書きます。|I write a letter.
verbs|聞きます|to listen / ask|v|kikimasu|音楽を聞きます。|I listen to music.
verbs|話します|to speak|v|hanashimasu|日本語を話します。|I speak Japanese.
verbs|わかります|to understand|v|wakarimasu|日本語がわかります。|I understand Japanese.
verbs|会います|to meet|v|aimasu|友達に会います。|I meet my friend.
verbs|すんでいます|to live (at)|v|sunde imasu|東京にすんでいます。|I live in Tokyo.
verbs|はたらきます|to work|v|hatarakimasu|会社ではたらきます。|I work at a company.
verbs|べんきょうします|to study|v|benkyō shimasu|日本語をべんきょうします。|I study Japanese.
verbs|あげます|to give|v|agemasu|友達にプレゼントをあげます。|I give my friend a present.
verbs|てつだいます|to help|v|tetsudaimasu|友達をてつだいます。|I help my friend.
verbs|待ちます|to wait|v|machimasu|バスを待ちます。|I wait for the bus.
verbs|乗ります|to ride|v|norimasu|バスに乗ります。|I take the bus.
verbs|ならいます|to learn|v|naraimasu|日本語をならいます。|I learn Japanese.
verbs|はじまります|to begin|v|hajimarimasu|授業がはじまります。|The lesson begins.
verbs|つきます|to arrive|v|tsukimasu|空港につきます。|I arrive at the airport.
verbs|かえります|to return|v|kaerimasu|うちにかえります。|I go home.
verbs|つくります|to make|v|tsukurimasu|りょうりをつくります。|I cook.
adjectives|大きい|big|adj|ōkii|家は大きいです。|The house is big.
adjectives|小さい|small|adj|chiisai|部屋は小さいです。|The room is small.
adjectives|新しい|new|adj|atarashii|車は新しいです。|The car is new.
adjectives|ふるい|old|adj|furui|家はふるいです。|The house is old.
adjectives|いい|good|adj|ii|天気はいいです。|The weather is good.
adjectives|わるい|bad|adj|warui|天気はわるいです。|The weather is bad.
adjectives|きれい|pretty / clean|adj|kirei|花はきれいです。|The flower is pretty.
adjectives|ながい|long|adj|nagai|道はながいです。|The road is long.
adjectives|みじかい|short|adj|mijikai|授業はみじかいです。|The lesson is short.
adjectives|はやい|fast|adj|hayai|電車ははやいです。|The train is fast.
adjectives|おそい|slow|adj|osoi|バスはおそいです。|The bus is slow.
adjectives|つめたい|cold (to touch)|adj|tsumetai|水はつめたいです。|The water is cold.
adjectives|やさしい|easy / kind|adj|yasashii|授業はやさしいです。|The lesson is easy.
adjectives|むずかしい|difficult|adj|muzukashii|授業はむずかしいです。|The lesson is difficult.
adjectives|いそがしい|busy|adj|isogashii|わたしはいそがしいです。|I'm busy.
adjectives|おいしい|tasty|adj|oishii|スープはおいしいです。|The soup is tasty.
adjectives|しんせつ|kind|adj|shinsetsu|先生はしんせつです。|The teacher is kind.
adjectives|べんり|convenient|adj|benri|地下鉄はべんりです。|The subway is convenient.
adjectives|たくさん|a lot|adv|takusan|たくさん食べます。|I eat a lot.
adjectives|すこし|a little|adv|sukoshi|すこしあります。|I have a little.
adjectives|もう|already|adv|mō|もうおそいです。|It's already late.
adjectives|まだ|still / not yet|adv|mada|まだです。|Not yet.
adjectives|また|again|adv|mata|またあいましょう。|Let's meet again.
connectors|そして|and then|conj|soshite|母、そして父がきます。|Mum and then dad come.
connectors|でも|but|conj|demo|でも、時間がありません。|But I have no time.
connectors|しかし|however|conj|shikashi|しかし、時間がありません。|However, I have no time.
connectors|または|or|conj|mataha|コーヒーまたはお茶。|Coffee or tea.
connectors|だから|so|conj|dakara|さむい、だから家にいます。|It's cold, so I'm home.
connectors|もし|if|conj|moshi|もしあめならうちにいます。|If it rains I stay home.
connectors|まず|first|adv|mazu|まずしごとをします。|First I work.
connectors|それから|then|adv|sorekara|それからコーヒーをのみます。|Then I drink coffee.
connectors|さいごに|finally|adv|saigo ni|さいごにうちにかえります。|Finally I go home.
connectors|は|topic marker|part|wa|わたしは学生です。|I am a student.
connectors|が|subject marker|part|ga|花がきれいです。|The flower is pretty.
connectors|に|at / to / in|part|ni|学校に行きます。|I go to school.
connectors|で|at (place of action) / by|part|de|会社ではたらきます。|I work at a company.
connectors|と|and / with|part|to|友達と行きます。|I go with a friend.
connectors|の|of / 's|part|no|わたしの本です。|It's my book.
connectors|も|also|part|mo|わたしも学生です。|I'm also a student.
connectors|もちろん|of course|adv|mochiron|もちろんです。|Of course.
connectors|たぶん|maybe|adv|tabun|たぶん明日です。|Maybe tomorrow.
connectors|いっしょに|together|adv|issho ni|いっしょに行きます。|Let's go together.
`;
