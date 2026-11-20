// cat|target|english|pos|pinyin|example|translation|level?|note?
export const ZH_VOCAB = `
script|人|person (radical 人)|char|rén|他是好人。|He is a good person.|A1|One of the most common characters.
script|口|mouth / opening|char|kǒu|我家有四口人。|There are four people in my family.|A1|Also a measure word for family members.
script|大|big|char|dà|这个房子很大。|This house is big.|A1
script|小|small|char|xiǎo|这个房间很小。|This room is small.|A1
script|日|sun / day|char|rì|今天是五月一日。|Today is the first of May.|A1
script|月|moon / month|char|yuè|一月很冷。|January is cold.|A1
script|水|water|char|shuǐ|水很凉。|The water is cold.|A1
script|火|fire|char|huǒ|火很热。|Fire is hot.|A1
script|木|wood / tree|char|mù|木桌很贵。|The wooden table is expensive.|A1
script|山|mountain|char|shān|山很高。|The mountain is high.|A1
script|中|middle / China|char|zhōng|他在中国。|He is in China.|A1
script|手|hand|char|shǒu|我的手很冷。|My hands are cold.|A1
script|心|heart|char|xīn|我的心很好。|My heart is good.|A1
script|女|woman|char|nǚ|她是女孩。|She is a girl.|A1
script|子|child / son|char|zǐ|他有一个儿子。|He has a son.|A1
script|门|door|char|mén|门是开的。|The door is open.|A1
greetings|你好|hello|phr|nǐ hǎo|你好，很高兴认识你。|Hello, nice to meet you.
greetings|您好|hello (polite)|phr|nín hǎo|您好，王老师。|Hello, Teacher Wang.
greetings|早上好|good morning|phr|zǎoshang hǎo|早上好，妈妈。|Good morning, mum.
greetings|晚上好|good evening|phr|wǎnshang hǎo|晚上好，大家。|Good evening, everyone.
greetings|晚安|good night|phr|wǎn'ān|晚安，明天见。|Good night, see you tomorrow.
greetings|再见|goodbye|phr|zàijiàn|再见，明天见。|Goodbye, see you tomorrow.
greetings|谢谢|thank you|phr|xièxie|谢谢你的帮助。|Thank you for your help.
greetings|不客气|you're welcome|phr|bú kèqi|不客气，没问题。|You're welcome, no problem.
greetings|对不起|sorry|phr|duìbuqǐ|对不起，我迟到了。|Sorry, I'm late.
greetings|没关系|it doesn't matter|phr|méi guānxi|没关系，不要紧。|It's OK, no worries.
greetings|请问|excuse me (may I ask)|phr|qǐngwèn|请问，洗手间在哪儿？|Excuse me, where is the toilet?
greetings|很高兴认识你|nice to meet you|phr|hěn gāoxìng rènshi nǐ|我是安娜，很高兴认识你。|I'm Anna, nice to meet you.
greetings|你好吗？|how are you?|phr|nǐ hǎo ma|你好吗？我很好。|How are you? I'm fine.
greetings|是|yes / to be|v|shì|是，我是学生。|Yes, I am a student.
greetings|不是|no / is not|phr|bú shì|不是，我不是老师。|No, I'm not a teacher.
greetings|请|please|phr|qǐng|请坐。|Please sit down.
pronouns|我|I|pron|wǒ|我是学生。|I am a student.
pronouns|你|you|pron|nǐ|你是老师吗？|Are you a teacher?
pronouns|您|you (polite)|pron|nín|您是医生吗？|Are you a doctor?
pronouns|他|he|pron|tā|他是我的哥哥。|He is my older brother.
pronouns|她|she|pron|tā|她住在北京。|She lives in Beijing.
pronouns|我们|we|pron|wǒmen|我们是朋友。|We are friends.
pronouns|你们|you (plural)|pron|nǐmen|你们好！|Hello, all of you!
pronouns|他们|they|pron|tāmen|他们今天工作。|They work today.
pronouns|这|this|pron|zhè|这是我的书。|This is my book.
pronouns|那|that|pron|nà|那是我的车。|That is my car.
pronouns|这里|here|pron|zhèlǐ|请坐这里。|Please sit here.
pronouns|那里|there|pron|nàlǐ|他在那里。|He's there.
pronouns|谁|who|pron|shéi|他是谁？|Who is he?
numbers|一|one|num|yī|我有一个哥哥。|I have one older brother.
numbers|二|two|num|èr|现在是二月。|It's February.
numbers|三|three|num|sān|我有三本书。|I have three books.
numbers|四|four|num|sì|我家有四口人。|My family has four people.
numbers|五|five|num|wǔ|我有五个朋友。|I have five friends.
numbers|六|six|num|liù|现在六点。|It's six o'clock.
numbers|七|seven|num|qī|一周有七天。|A week has seven days.
numbers|八|eight|num|bā|现在八点。|It's eight o'clock.
numbers|九|nine|num|jiǔ|现在九点。|It's nine o'clock.
numbers|十|ten|num|shí|这个十块钱。|This is ten yuan.
numbers|二十|twenty|num|èrshí|我二十岁。|I'm twenty.
numbers|一百|one hundred|num|yì bǎi|这个一百块。|This is a hundred yuan.
numbers|一千|one thousand|num|yì qiān|一千块钱。|A thousand yuan.
numbers|两|two (before measure words)|num|liǎng|我有两个孩子。|I have two children.
time|今天|today|n|jīntiān|今天天气很好。|The weather is good today.
time|明天|tomorrow|n|míngtiān|明天见。|See you tomorrow.
time|昨天|yesterday|n|zuótiān|昨天我看了电影。|I watched a film yesterday.
time|现在|now|n|xiànzài|现在几点？|What time is it now?
time|早上|morning|n|zǎoshang|我早上喝咖啡。|I drink coffee in the morning.
time|晚上|evening / night|n|wǎnshang|我晚上看书。|I read in the evening.
time|中午|noon|n|zhōngwǔ|中午我吃饭。|I eat at noon.
time|点|o'clock|n|diǎn|我七点起床。|I get up at seven.
time|分钟|minute|n|fēnzhōng|十分钟就到。|It takes ten minutes.
time|星期一|Monday|n|xīngqīyī|星期一我工作。|I work on Monday.
time|星期二|Tuesday|n|xīngqī'èr|星期二有课。|There's a lesson on Tuesday.
time|星期三|Wednesday|n|xīngqīsān|星期三见面吧。|Let's meet on Wednesday.
time|星期四|Thursday|n|xīngqīsì|星期四休息。|Thursday is a day off.
time|星期五|Friday|n|xīngqīwǔ|今天是星期五。|Today is Friday.
time|星期六|Saturday|n|xīngqīliù|星期六我休息。|I rest on Saturday.
time|星期天|Sunday|n|xīngqītiān|星期天我在家。|I'm home on Sunday.
time|周末|weekend|n|zhōumò|周末你做什么？|What do you do on the weekend?
time|每天|every day|n|měitiān|我每天学习。|I study every day.
time|总是|always|adv|zǒngshì|我总是在家。|I'm always at home.
time|有时候|sometimes|adv|yǒushíhou|我有时候看电影。|I sometimes watch films.
time|早|early|adj|zǎo|我起得很早。|I get up very early.
time|晚|late|adj|wǎn|已经很晚了。|It's already late.
questions|什么|what|pron|shénme|这是什么？|What is this?
questions|哪儿|where|pron|nǎr|洗手间在哪儿？|Where is the toilet?
questions|什么时候|when|adv|shénme shíhou|你什么时候来？|When are you coming?
questions|为什么|why|adv|wèishénme|你为什么来？|Why are you coming?
questions|怎么|how|adv|zěnme|你怎么去？|How do you go?
questions|多少钱|how much (money)|phr|duōshao qián|这个多少钱？|How much is this?
questions|几|how many (small)|pron|jǐ|你有几个孩子？|How many children do you have?
questions|哪|which|pron|nǎ|你要哪个？|Which one do you want?
questions|吗|yes/no question particle|part|ma|你是学生吗？|Are you a student?
food|饭|rice / meal|n|fàn|我吃饭。|I eat a meal.
food|面包|bread|n|miànbāo|面包很好吃。|The bread is tasty.
food|牛奶|milk|n|niúnǎi|我喝牛奶。|I drink milk.
food|咖啡|coffee|n|kāfēi|我喜欢咖啡。|I like coffee.
food|茶|tea|n|chá|我喝茶。|I drink tea.
food|果汁|juice|n|guǒzhī|我喝果汁。|I drink juice.
food|啤酒|beer|n|píjiǔ|请给我一杯啤酒。|A beer, please.
food|肉|meat|n|ròu|我吃肉。|I eat meat.
food|鱼|fish|n|yú|我喜欢鱼。|I like fish.
food|鸡肉|chicken|n|jīròu|鸡肉很好吃。|The chicken is tasty.
food|鸡蛋|egg|n|jīdàn|我吃鸡蛋。|I eat eggs.
food|米饭|cooked rice|n|mǐfàn|我吃米饭。|I eat rice.
food|面条|noodles|n|miàntiáo|我喜欢面条。|I like noodles.
food|汤|soup|n|tāng|汤很热。|The soup is hot.
food|水果|fruit|n|shuǐguǒ|水果很新鲜。|The fruit is fresh.
food|苹果|apple|n|píngguǒ|苹果很好吃。|The apple is tasty.
food|蔬菜|vegetables|n|shūcài|我吃蔬菜。|I eat vegetables.
food|盐|salt|n|yán|我要盐。|I need salt.
food|糖|sugar|n|táng|糖很甜。|Sugar is sweet.
food|早饭|breakfast|n|zǎofàn|早饭很好吃。|Breakfast is tasty.
food|午饭|lunch|n|wǔfàn|午饭是十二点。|Lunch is at twelve.
food|晚饭|dinner|n|wǎnfàn|晚饭是七点。|Dinner is at seven.
food|菜单|menu|n|càidān|请给我菜单。|The menu, please.
food|买单|the bill|n|mǎidān|请买单。|The bill, please.
family|家|family / home|n|jiā|我的家很大。|My family is big.
family|妈妈|mum|n|māma|妈妈在家。|Mum is at home.
family|爸爸|dad|n|bàba|爸爸在工作。|Dad is working.
family|哥哥|older brother|n|gēge|我有一个哥哥。|I have an older brother.
family|姐姐|older sister|n|jiějie|我姐姐是医生。|My older sister is a doctor.
family|弟弟|younger brother|n|dìdi|我弟弟是学生。|My younger brother is a student.
family|妹妹|younger sister|n|mèimei|我妹妹是学生。|My younger sister is a student.
family|儿子|son|n|érzi|我有一个儿子。|I have a son.
family|女儿|daughter|n|nǚ'ér|我有一个女儿。|I have a daughter.
family|丈夫|husband|n|zhàngfu|我丈夫是医生。|My husband is a doctor.
family|妻子|wife|n|qīzi|我妻子是老师。|My wife is a teacher.
family|奶奶|grandmother (paternal)|n|nǎinai|奶奶住在乡下。|Grandma lives in the countryside.
family|爷爷|grandfather (paternal)|n|yéye|爷爷看报纸。|Grandpa reads the paper.
family|朋友|friend|n|péngyou|我有很多朋友。|I have many friends.
family|孩子|child|n|háizi|孩子在睡觉。|The child is sleeping.
family|男人|man|n|nánrén|男人来了。|The man has come.
family|女人|woman|n|nǚrén|女人来了。|The woman has come.
family|邻居|neighbour|n|línjū|邻居很友好。|The neighbour is friendly.
places|房子|house|n|fángzi|房子很大。|The house is big.
places|城市|city|n|chéngshì|城市很大。|The city is big.
places|路|road|n|lù|路很长。|The road is long.
places|商店|shop|n|shāngdiàn|商店开着。|The shop is open.
places|饭馆|restaurant|n|fànguǎn|饭馆很好。|The restaurant is good.
places|银行|bank|n|yínháng|银行关门了。|The bank is closed.
places|药店|pharmacy|n|yàodiàn|药店很近。|The pharmacy is near.
places|医院|hospital|n|yīyuàn|医院很大。|The hospital is big.
places|学校|school|n|xuéxiào|学校很新。|The school is new.
places|公园|park|n|gōngyuán|公园很漂亮。|The park is beautiful.
places|博物馆|museum|n|bówùguǎn|博物馆很有意思。|The museum is interesting.
places|车站|station|n|chēzhàn|车站很大。|The station is big.
places|洗手间|toilet|n|xǐshǒujiān|洗手间在哪儿？|Where is the toilet?
places|右边|right side|n|yòubian|请往右边走。|Please go to the right.
places|左边|left side|n|zuǒbian|请往左边走。|Please go to the left.
places|前面|front|n|qiánmian|请往前面走。|Please go forward.
places|近|near|adj|jìn|车站很近。|The station is near.
places|远|far|adj|yuǎn|学校很远。|The school is far.
places|公司|company|n|gōngsī|公司很大。|The company is big.
travel|公共汽车|bus|n|gōnggòng qìchē|公共汽车来了。|The bus has come.
travel|地铁|subway|n|dìtiě|地铁很快。|The subway is fast.
travel|出租车|taxi|n|chūzūchē|出租车很贵。|Taxis are expensive.
travel|火车|train|n|huǒchē|火车很快。|The train is fast.
travel|高铁|high-speed train|n|gāotiě|高铁很快。|The high-speed train is fast.
travel|飞机|plane|n|fēijī|飞机很快。|The plane is fast.
travel|汽车|car|n|qìchē|汽车很新。|The car is new.
travel|票|ticket|n|piào|票很贵。|The ticket is expensive.
travel|护照|passport|n|hùzhào|护照在这里。|The passport is here.
travel|机场|airport|n|jīchǎng|机场很大。|The airport is big.
travel|酒店|hotel|n|jiǔdiàn|酒店很好。|The hotel is good.
travel|房间|room|n|fángjiān|房间很干净。|The room is clean.
travel|行李|luggage|n|xíngli|行李很重。|The luggage is heavy.
travel|地图|map|n|dìtú|地图在这里。|The map is here.
travel|旅行|trip / to travel|n|lǚxíng|旅行很有意思。|The trip is fun.
travel|假期|holiday|n|jiàqī|假期在八月。|The holiday is in August.
shopping|钱|money|n|qián|我没有钱。|I have no money.
shopping|价格|price|n|jiàgé|价格很高。|The price is high.
shopping|块|yuan (colloquial)|n|kuài|十块钱。|Ten yuan.
shopping|贵|expensive|adj|guì|这个很贵。|This is expensive.
shopping|便宜|cheap|adj|piányi|这里很便宜。|It's cheap here.
shopping|买|to buy|v|mǎi|我想买面包。|I want to buy bread.
shopping|卡|card|n|kǎ|我用卡付钱。|I pay by card.
shopping|现金|cash|n|xiànjīn|我用现金付钱。|I pay in cash.
shopping|衣服|clothes|n|yīfu|衣服很漂亮。|The clothes are beautiful.
shopping|鞋|shoes|n|xié|鞋很新。|The shoes are new.
shopping|尺码|size|n|chǐmǎ|尺码太大了。|The size is too big.
shopping|收据|receipt|n|shōujù|请给我收据。|A receipt, please.
shopping|打折|discount|n|dǎzhé|今天打折。|There's a discount today.
shopping|外套|jacket|n|wàitào|我想买外套。|I want to buy a jacket.
work|工作|work / job|n|gōngzuò|工作很有意思。|The work is interesting.
work|上班族|office worker|n|shàngbānzú|我是上班族。|I'm an office worker.
work|老师|teacher|n|lǎoshī|老师很友好。|The teacher is friendly.
work|学生|student|n|xuésheng|学生很多。|There are many students.
work|医生|doctor|n|yīshēng|医生很好。|The doctor is good.
work|工程师|engineer|n|gōngchéngshī|他是工程师。|He is an engineer.
work|同事|colleague|n|tóngshì|同事很友好。|The colleague is friendly.
work|老板|boss|n|lǎobǎn|老板很忙。|The boss is busy.
work|会议|meeting|n|huìyì|会议是两点。|The meeting is at two.
work|课|lesson|n|kè|这节课很有意思。|This lesson is interesting.
work|问题|question|n|wèntí|我有一个问题。|I have a question.
work|电话|phone|n|diànhuà|电话响了。|The phone is ringing.
work|电脑|computer|n|diànnǎo|电脑很新。|The computer is new.
work|办公室|office|n|bàngōngshì|办公室很大。|The office is big.
health|头|head|n|tóu|我头疼。|I have a headache.
health|腿|leg|n|tuǐ|我腿疼。|My leg hurts.
health|肚子|stomach|n|dùzi|我肚子疼。|My stomach hurts.
health|喉咙|throat|n|hóulóng|我喉咙疼。|My throat hurts.
health|牙|tooth|n|yá|我牙疼。|My tooth hurts.
health|背|back|n|bèi|我背疼。|My back hurts.
health|眼睛|eye|n|yǎnjing|我眼睛疼。|My eyes hurt.
health|药|medicine|n|yào|我吃药。|I take medicine.
health|发烧|fever|n|fāshāo|我发烧了。|I have a fever.
health|咳嗽|cough|n|késou|我咳嗽。|I'm coughing.
health|健康|health|n|jiànkāng|健康很重要。|Health is important.
health|疼|painful|adj|téng|我头疼。|My head hurts.
health|感冒|a cold|n|gǎnmào|我感冒了。|I have a cold.
health|生病|to be ill|v|shēngbìng|我生病了。|I'm ill.
health|身体|body|n|shēntǐ|我的身体很好。|My body is well.
emotions|高兴|happy|adj|gāoxìng|我很高兴。|I'm happy.
emotions|难过|sad|adj|nánguò|我很难过。|I'm sad.
emotions|害怕|scared|adj|hàipà|我很害怕。|I'm scared.
emotions|有意思|interesting|adj|yǒu yìsi|这部电影很有意思。|This film is interesting.
emotions|无聊|boring|adj|wúliáo|这节课很无聊。|This lesson is boring.
emotions|累|tired|adj|lèi|我很累。|I'm tired.
emotions|认为|to think|v|rènwéi|我认为很好。|I think it's good.
emotions|意见|opinion|n|yìjiàn|我的意见是这样。|My opinion is this.
emotions|对|correct|adj|duì|对，你说得对。|Yes, you're right.
emotions|同意|to agree|v|tóngyì|我也同意。|I agree too.
emotions|真的|really|adv|zhēnde|真的很好。|It's really good.
emotions|很|very|adv|hěn|我很好。|I'm very well.
emotions|喜欢|to like|v|xǐhuan|我喜欢咖啡。|I like coffee.
emotions|爱|to love|v|ài|我爱我的家人。|I love my family.
nature|天气|weather|n|tiānqì|天气很好。|The weather is good.
nature|太阳|sun|n|tàiyáng|太阳很亮。|The sun is bright.
nature|雨|rain|n|yǔ|下雨了。|It's raining.
nature|雪|snow|n|xuě|下雪了。|It's snowing.
nature|风|wind|n|fēng|风很大。|The wind is strong.
nature|冷|cold|adj|lěng|今天很冷。|It's cold today.
nature|热|hot|adj|rè|今天很热。|It's hot today.
nature|暖和|warm|adj|nuǎnhuo|今天很暖和。|It's warm today.
nature|夏天|summer|n|xiàtiān|夏天很热。|Summer is hot.
nature|冬天|winter|n|dōngtiān|冬天很冷。|Winter is cold.
nature|春天|spring|n|chūntiān|春天很暖和。|Spring is warm.
nature|秋天|autumn|n|qiūtiān|秋天很漂亮。|Autumn is beautiful.
nature|海|sea|n|hǎi|海很蓝。|The sea is blue.
nature|河|river|n|hé|河很长。|The river is long.
nature|花|flower|n|huā|花很漂亮。|The flower is beautiful.
nature|天空|sky|n|tiānkōng|天空很蓝。|The sky is blue.
hobbies|音乐|music|n|yīnyuè|我喜欢音乐。|I like music.
hobbies|书|book|n|shū|这本书很有意思。|This book is interesting.
hobbies|电影|film|n|diànyǐng|这部电影很好。|This film is good.
hobbies|运动|sport / exercise|n|yùndòng|运动很好。|Exercise is good.
hobbies|足球|football|n|zúqiú|足球很有意思。|Football is fun.
hobbies|游戏|game|n|yóuxì|游戏很有意思。|The game is fun.
hobbies|吉他|guitar|n|jítā|吉他很新。|The guitar is new.
hobbies|照片|photo|n|zhàopiàn|照片很漂亮。|The photo is beautiful.
hobbies|散步|walk|n|sànbù|散步很好。|A walk is nice.
hobbies|音乐会|concert|n|yīnyuèhuì|音乐会在星期六。|The concert is on Saturday.
hobbies|爱好|hobby|n|àihào|我的爱好是读书。|My hobby is reading.
hobbies|歌|song|n|gē|这首歌很好听。|This song sounds good.
hobbies|画|painting|n|huà|这幅画很漂亮。|This painting is beautiful.
hobbies|做饭|cooking|n|zuòfàn|我喜欢做饭。|I like cooking.
objects|桌子|table|n|zhuōzi|桌子很大。|The table is big.
objects|椅子|chair|n|yǐzi|椅子很新。|The chair is new.
objects|窗户|window|n|chuānghu|窗户开着。|The window is open.
objects|厨房|kitchen|n|chúfáng|厨房很干净。|The kitchen is clean.
objects|床|bed|n|chuáng|床很软。|The bed is soft.
objects|钥匙|key|n|yàoshi|钥匙在这里。|The key is here.
objects|杯子|cup|n|bēizi|杯子很干净。|The cup is clean.
objects|盘子|plate|n|pánzi|盘子很干净。|The plate is clean.
objects|勺子|spoon|n|sháozi|勺子在这里。|The spoon is here.
objects|笔|pen|n|bǐ|笔在桌子上。|The pen is on the table.
objects|本子|notebook|n|běnzi|本子很新。|The notebook is new.
objects|镜子|mirror|n|jìngzi|镜子很大。|The mirror is big.
objects|电视|television|n|diànshì|电视开着。|The TV is on.
verbs|有|to have|v|yǒu|我有时间。|I have time.
verbs|没有|not to have|v|méiyǒu|我没有钱。|I have no money.
verbs|做|to do / make|v|zuò|我做运动。|I do exercise.
verbs|去|to go|v|qù|我去学校。|I go to school.
verbs|来|to come|v|lái|朋友来了。|My friend has come.
verbs|吃|to eat|v|chī|我吃饭。|I eat a meal.
verbs|喝|to drink|v|hē|我喝水。|I drink water.
verbs|睡觉|to sleep|v|shuìjiào|我晚上睡觉。|I sleep at night.
verbs|起床|to get up|v|qǐchuáng|我七点起床。|I get up at seven.
verbs|看|to look / watch|v|kàn|我看电影。|I watch a film.
verbs|读|to read|v|dú|我读书。|I read a book.
verbs|写|to write|v|xiě|我写信。|I write a letter.
verbs|听|to listen|v|tīng|我听音乐。|I listen to music.
verbs|说|to speak|v|shuō|我说中文。|I speak Chinese.
verbs|知道|to know|v|zhīdào|我知道答案。|I know the answer.
verbs|想|to want / think|v|xiǎng|我想喝水。|I want to drink water.
verbs|要|to want / need|v|yào|我要一杯咖啡。|I want a coffee.
verbs|见面|to meet|v|jiànmiàn|我们明天见面。|We meet tomorrow.
verbs|住|to live|v|zhù|我住在北京。|I live in Beijing.
verbs|学习|to study|v|xuéxí|我学习中文。|I study Chinese.
verbs|给|to give|v|gěi|我给朋友一份礼物。|I give my friend a gift.
verbs|帮助|to help|v|bāngzhù|我帮助朋友。|I help my friend.
verbs|等|to wait|v|děng|我等公共汽车。|I wait for the bus.
verbs|坐|to sit / take (transport)|v|zuò|我坐地铁。|I take the subway.
verbs|会|can / will|v|huì|我会说中文。|I can speak Chinese.
verbs|开始|to begin|v|kāishǐ|课开始了。|The lesson has begun.
verbs|到|to arrive|v|dào|我到机场了。|I've arrived at the airport.
verbs|回|to return|v|huí|我回家。|I go home.
adjectives|好|good|adj|hǎo|天气很好。|The weather is good.
adjectives|坏|bad|adj|huài|天气很坏。|The weather is bad.
adjectives|新|new|adj|xīn|车很新。|The car is new.
adjectives|旧|old (things)|adj|jiù|房子很旧。|The house is old.
adjectives|漂亮|beautiful|adj|piàoliang|花很漂亮。|The flower is beautiful.
adjectives|高|tall / high|adj|gāo|山很高。|The mountain is high.
adjectives|长|long|adj|cháng|路很长。|The road is long.
adjectives|短|short|adj|duǎn|课很短。|The lesson is short.
adjectives|快|fast|adj|kuài|火车很快。|The train is fast.
adjectives|慢|slow|adj|màn|公共汽车很慢。|The bus is slow.
adjectives|容易|easy|adj|róngyì|课很容易。|The lesson is easy.
adjectives|难|difficult|adj|nán|课很难。|The lesson is difficult.
adjectives|忙|busy|adj|máng|我很忙。|I'm busy.
adjectives|干净|clean|adj|gānjìng|房间很干净。|The room is clean.
adjectives|好吃|tasty|adj|hǎochī|汤很好吃。|The soup is tasty.
adjectives|友好|friendly|adj|yǒuhǎo|老师很友好。|The teacher is friendly.
adjectives|聪明|clever|adj|cōngmíng|学生很聪明。|The student is clever.
adjectives|非常|extremely|adv|fēicháng|非常好。|It's extremely good.
adjectives|太|too|adv|tài|太贵了。|It's too expensive.
adjectives|也|also|adv|yě|我也是学生。|I'm also a student.
adjectives|都|all / both|adv|dōu|我们都是学生。|We are all students.
adjectives|已经|already|adv|yǐjīng|已经很晚了。|It's already late.
adjectives|很多|many|adj|hěn duō|这里有很多人。|There are many people here.
adjectives|一点儿|a little|adv|yìdiǎnr|我有一点儿时间。|I have a little time.
connectors|和|and|conj|hé|妈妈和爸爸来了。|Mum and dad have come.
connectors|但是|but|conj|dànshì|我想去，但是没有时间。|I want to go, but I have no time.
connectors|可是|but|conj|kěshì|我累，可是很高兴。|I'm tired, but happy.
connectors|或者|or|conj|huòzhě|咖啡或者茶？|Coffee or tea?
connectors|因为|because|conj|yīnwèi|因为很冷，所以我在家。|Because it's cold, I'm home.
connectors|所以|so|conj|suǒyǐ|很冷，所以我在家。|It's cold, so I'm home.
connectors|如果|if|conj|rúguǒ|如果下雨，我在家。|If it rains, I stay home.
connectors|先|first|adv|xiān|我先工作。|First I work.
connectors|然后|then|adv|ránhòu|然后我喝咖啡。|Then I drink coffee.
connectors|最后|finally|adv|zuìhòu|最后我回家。|Finally I go home.
connectors|在|at / in|prep|zài|我在家。|I'm at home.
connectors|从|from|prep|cóng|我从北京来。|I come from Beijing.
connectors|跟|with|prep|gēn|我跟朋友去。|I go with a friend.
connectors|的|of / 's|part|de|这是我的书。|This is my book.
connectors|了|completed-action particle|part|le|我吃了饭。|I ate.
connectors|不|not|adv|bù|我不去。|I'm not going.
connectors|当然|of course|adv|dāngrán|当然可以。|Of course.
connectors|也许|maybe|adv|yěxǔ|也许明天。|Maybe tomorrow.
connectors|一起|together|adv|yìqǐ|我们一起去。|Let's go together.
`;
