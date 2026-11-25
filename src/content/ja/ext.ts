// Japanese extension: more B1–C2 material. Machine-drafted: have a native speaker review idioms and register notes.
export const JA_VOCAB_EXT = `
connectors|それに|besides|adv|sore ni|それに、部屋にはバルコニーもあります。|Besides, the room has a balcony too.|B1
connectors|しかし|however|adv|shikashi|遅いです。しかし、行きます。|It's late. However, I'll go.|B1
connectors|だから|so, therefore|adv|dakara|病気でした。だから、家にいました。|I was sick. So I stayed home.|B1
work|給料|salary|n|kyūryō|給料は毎年上がります。|My salary goes up every year.|B1
work|締め切り|deadline|n|shimekiri|締め切りは金曜日です。|The deadline is Friday.|B1
work|採用する|to hire|v|saiyō suru|会社は三人を採用します。|The company will hire three people.|B1
verbs|思い出す|to recall|v|omoidasu|子どものころをよく思い出します。|I often recall my childhood.|B1
verbs|気づく|to notice|v|kizuku|間違いに気づきました。|I noticed the mistake.|B1
verbs|慣れる|to get used to|v|nareru|気候に慣れてきました。|I've gotten used to the climate.|B1
society|格差|disparity|n|kakusa|格差が広がっています。|The gap is widening.|B2
society|地域|area, community|n|chiiki|静かな地域です。|It's a quiet area.|B2
verbs|強調する|to emphasise|v|kyōchō suru|この点を強調したいです。|I want to emphasise this point.|B2
verbs|達成する|to achieve|v|tassei suru|彼女は目標を達成しました。|She achieved her goal.|B2
verbs|主張する|to claim|v|shuchō suru|彼は何も知らないと主張します。|He claims he knows nothing.|B2
adjectives|不可欠な|essential|adj|fukaketsu na|この書類は不可欠です。|This document is essential.|B2
verbs|疑問視する|to call into question|v|gimonshi suru|誰も彼の決定を疑問視しませんでした。|Nobody questioned his decision.|C1
adjectives|避けられない|unavoidable|adj|sakerarenai|変化は避けられません。|Change is unavoidable.|C1
society|課題|task, challenge|n|kadai|気候変動は世界的な課題です。|Climate change is a global challenge.|C1
connectors|にもかかわらず|despite, nevertheless|phr|nimo kakawarazu|雨にもかかわらず、出かけました。|Despite the rain, we went out.|C1
connectors|要するに|in short|adv|yōsuru ni|要するに、簡単な解決策はありません。|In short, there is no easy solution.|C1
adjectives|はかない|fleeting|adj|hakanai|名声ははかないものです。|Fame is fleeting.|C2
verbs|提唱する|to advocate|v|teishō suru|専門家は慎重さを提唱します。|Experts advocate caution.|C2
society|弊害|harmful effect|n|heigai|過労の弊害は大きいです。|The ill effects of overwork are great.|C2
connectors|を踏まえて|in view of|phr|o fumaete|状況を踏まえて、会議を延期します。|In view of the situation we postpone the meeting.|C2
`;
export const JA_GRAMMAR_EXT = `
## ext-conditionals | ext-conditionals | Conditionals: と, ば, たら, なら (applied) | B1
S: たら is the all-purpose "if / when": 雨が降ったら、行きません。 ば suits general conditions and hopes; と gives natural consequences; なら suits "if that's the case".
B: **時間があったら、電話します。** **安ければ買います。** **春になると、桜が咲きます。** **行くなら、早く行ってください。** Unreal past: **知っていたら、行きました。**
E: 雨が降ったら、家にいます。 = If it rains, I'll stay home.
E: 安ければ買います。 = If it's cheap, I'll buy it.
E: ボタンを押すと、ドアが開きます。 = When you press the button, the door opens.
E: 知っていたら、来ました。 = If I'd known, I'd have come.
M: Using と for requests or intentions in the result clause (行くと行きましょう is wrong).
M: Using たら with a result that is a natural law: use と.
X: mcq 雨が___、家にいます。 ? 降るので | *降ったら | 降るから | 降って
X: mcq ボタンを押す___、ドアが開きます。 ? たら | *と | ので | ても
X: fill 安けれ___買います。 => ば
X: type Say: "If it rains, I'll stay home." => 雨が降ったら、家にいます
## ext-passive-causative | ext-passive-causative | Passive, causative and causative-passive | B2
S: Passive: 〜られる (Group 2) / 〜れる (Group 1). Causative: 〜させる / 〜せる. Causative-passive 〜させられる means "be made to".
B: **先生にほめられました。** (I was praised by the teacher.) **母は子どもに野菜を食べさせました。** (Mum made the child eat vegetables.) **私は毎日走らされました。** (I was made to run every day.) The agent takes に in passives.
E: 友達に手伝ってもらいました。 = I got my friend to help.
E: 子どもに本を読ませました。 = I made the child read a book.
E: 雨に降られました。 = I was rained on (to my annoyance).
E: 上司に残業させられました。 = I was made to work overtime by my boss.
M: Using を instead of に for the agent in a passive.
M: Confusing 〜てもらう (a favour) with the causative.
X: mcq 先生に___。 ? ほめました | *ほめられました | ほめさせました | ほめて
X: mcq 子どもに本を___。 (made) ? 読みました | *読ませました | 読まれました | 読んで
X: fill 上司に残業さ___。 (was made to) => せられました
X: type Say: "I was praised by the teacher." => 先生にほめられました
## ext-honorific | ext-honorific | Honorific and humble language (keigo) | C1
S: Sonkeigo raises the other person's actions (いらっしゃる, おっしゃる, お〜になる); kenjōgo lowers your own (参る, 申す, お〜する). Use them to match the situation.
B: **社長はいらっしゃいます。** **私が参ります。** **お待ちください。** (polite request) **ご説明いたします。** (I will explain.) Special verbs: 食べる → 召し上がる (respect) / いただく (humble); 見る → ご覧になる / 拝見する.
E: 部長はもうお帰りになりました。 = The manager has already gone home.
E: 私が資料をお送りいたします。 = I'll send the materials.
E: 何とおっしゃいましたか。 = What did you say?
E: 明日、参ります。 = I'll come tomorrow (humble).
M: Using sonkeigo for your own actions.
M: Mixing plain forms with keigo in the same sentence.
X: mcq 先生が___。 (said, respectful) ? 言いました | *おっしゃいました | 申しました | 言う
X: mcq 私が明日___。 (come, humble) ? いらっしゃいます | *参ります | 来られます | 来る
X: fill ご説明___。 (I'll explain, humble) => いたします
X: type Say: "The manager has already gone home." (respectful) => 部長はもうお帰りになりました
`;
export const JA_CONVS_EXT = `
## ext-b1-landlord | ext-b1-landlord | Renting a flat | B1 | You call about a flat for rent.
N: もしもし、不動産屋です。 = Hello, this is the real estate agency.
Y: こんにちは、広告に出ていた部屋のことでお電話しました。まだ空いていますか。 = Hello, I'm calling about the room in the ad. Is it still available? || 切符を一枚ください。 = One ticket, please. || 駅はどこですか。 = Where is the station? :: 広告,部屋,空いて
N: はい、家賃は月六万円で、管理費は別です。 = Yes, rent is sixty thousand yen a month, maintenance separate.
Y: 今週末、見に行けますか。 = Can I go see it this weekend? || 昨日、部屋を見ます。 = I see the room yesterday. || 牛乳は高いです。 = Milk is expensive. :: 週末,見に
N: はい。土曜日の十一時はいかがですか。 = Yes. How about Saturday at eleven?
Y: はい、大丈夫です。土曜日によろしくお願いします。 = Yes, that's fine. I look forward to Saturday. || 何も思い出せません。 = I can't remember anything. || さようなら、昨日。 = Goodbye, yesterday. :: 大丈夫,土曜
## ext-c1-interview | ext-c1-interview | A radio interview | C1 | You are interviewed about a social issue.
N: 住宅問題は解決できないという声もありますが、どう思われますか。 = Some say the housing problem can't be solved. What do you think?
Y: そこまでは言えないと思います。大きな課題ですが、すでに効果が出ている対策もあります。 = I don't think one can go that far. It's a big challenge, but some measures are already working. || 課題ですが、対策もあります。 = (flatter) || 解決策はありません、なぜならありません。 = There's no solution because there isn't. :: 課題,対策
N: たとえば、どんなものですか。 = Such as?
Y: 観光客向けの賃貸の制限や、公営住宅の拡大などです。 = Things like limiting rentals to tourists and expanding public housing. || 明日、市場を借ります。 = I'll rent the market tomorrow. || 全部高いです、そうだから。 = Everything is expensive, just because. :: 賃貸,公営
N: お時間をいただき、ありがとうございました。 = Thank you for your time.
Y: こちらこそ、楽しい時間でした。 = Likewise, it was a pleasure. || さようなら、昨日。 = Goodbye, yesterday. || 大丈夫です。 = It's fine. :: こちらこそ,楽しい
`;
export const JA_READING_EXT = `
## ext-r-b2-city | ext-r-b2 | 十五分都市 | B2
P: 一部の都市計画家は、すべての住民が徒歩十五分以内に必要な用事を済ませられるべきだと提案しています。この考えは、交通量を減らし、地域の小さな店を元気にすることを目指しています。 = Some city planners propose that every resident should be able to finish essential errands within fifteen minutes on foot. The idea aims to cut traffic and revitalise small local shops.
P: しかし批判する人たちは、すべての都市をそのように変えることはできず、設備の整った地域では家賃が上がるかもしれないと指摘しています。 = But critics point out that not every city can be changed that way, and that rents may rise in areas with good facilities.
G: 徒歩 = on foot ; 指摘 = pointing out ; 整う = to be in order
Q: mcq なぜ家賃が上がるかもしれませんか。 ? 交通量が減るから | *設備の整った地域の人気が高まるから | 小さな店が閉まるから | 住民が十五分歩くから
Q: mcq 何を減らすことを目指していますか。 ? 店 | *交通量 | 地域 | 家賃
Q: mcq この考えの目的は何ですか。 ? 車を増やすこと | *用事を近くで済ませること | 店を減らすこと | 家賃を上げること
## ext-r-c1-memory | ext-r-c1 | 選択的な記憶 | C1
P: 私たちは記憶が過去をそのまま再生するものだと考えがちですが、多くの研究はその反対を示しています。思い出すたびに、私たちは記憶を作り直し、その過程で少しずつ変えてしまうのです。 = We tend to think memory plays the past back as it was, but many studies show the opposite. Each time we recall, we remake the memory and change it little by little in the process.
P: これは、同じ出来事を見た二人の証人が、どちらも嘘をついていないのに違う話をする理由を説明します。 = This explains why two witnesses of the same event can tell different stories without either lying.
G: 再生 = playback ; 過程 = process ; 証人 = witness
Q: mcq 研究は何を示していますか。 ? 記憶は過去をそのまま再生する | *記憶は思い出すたびに作り直される | 二人の証人はいつも嘘をつく | 記憶は絶対に変わらない
Q: mcq なぜ記憶は変わりますか。 ? 過去をそのまま再生するから | *思い出すたびに作り直されるから | 証人が話をするから | どちらかが嘘をつくから
Q: mcq 思い出すとき、私たちは何をしていますか。 ? そのまま再生する | *作り直して少しずつ変える | 証人に渡す | 消す
`;
export const JA_LISTENING_EXT = `
## ext-l-b2-radio | ext-l-b2 | ラジオの討論 | B2
L: 司会: 今日は在宅勤務について話します。田中さんはどう思いますか。 = Today we talk about working from home. Tanaka-san, what do you think?
L: 田中: すべての分野ではありませんが、利点が多いと思います。 = Not in every field, but I think there are many advantages.
L: 司会: 欠点はありますか。 = Are there drawbacks?
L: 田中: 一番の問題は孤立感と、仕事と私生活を分けにくいことです。 = The biggest problems are isolation and the difficulty of separating work and private life.
L: 司会: ありがとうございました、田中さん。 = Thank you, Tanaka-san.
Q: mcq 何について話していますか。 ? 交通 | *在宅勤務 | 観光 | 料理
Q: mcq 田中さんが挙げた欠点は何ですか。 ? 給料 | *孤立感 | 交通 | 勤務時間
## ext-l-c1-lecture | ext-l-c1 | 講義 | C1
L: 教授: 言語の変化は堕落ではなく自然な発展だということを強調したいと思います。 = I'd like to emphasise that language change is not corruption but natural development.
L: 教授: 今は間違いに感じられる言葉も、数百年前には普通でした。 = Words that feel wrong now were ordinary a few hundred years ago.
L: 学生: では、言語に間違いはないのですか。 = Then there is no error in language?
L: 教授: 規範はありますが、使い方によって変わります。 = There is a norm, but it changes with usage.
Q: mcq 教授は何を主張していますか。 ? 変化は堕落だ | *変化は自然な発展だ | 規範はない | 何も変わらない
Q: mcq 規範についてどう言っていますか。 ? 変わらない | *使い方によって変わる | ない | 意見にすぎない
`;
export const JA_WRITING_EXT = `
## w-ext-b2-email | ext-w-b2 | A formal enquiry | B2 | 60
T: Write a formal email (8–10 lines) to a language school asking about courses, price and dates. Use polite keigo (お願いいたします, いただけますか) and a formal opening/closing.
R: Greeting = 拝啓, 突然のご連絡失礼いたします ; Request = いただけますか, お願いいたします ; Question = 受講料, 開始日 ; Closing = よろしくお願いいたします, 敬具
M: 突然のご連絡失礼いたします。来学期の日本語コースについてお問い合わせしたく、ご連絡いたしました。受講料と開始日を教えていただけますか。夜のクラスがあるかどうかも知りたいです。ご返信をお待ちしております。どうぞよろしくお願いいたします。田中 花子。 = Sorry for the sudden message. I'm writing to ask about next term's Japanese courses. Could you tell me the fees and start date? I'd also like to know if there are evening classes. I look forward to your reply. Thank you. Tanaka Hanako.
## w-ext-c1-essay | ext-w-c1 | An argumentative essay | C1 | 90
T: Write 12–15 lines arguing for or against a four-day working week. Use a concession (〜が, 〜にもかかわらず), a hypothesis (〜たら / 〜ば) and a formal connector (要するに, したがって).
R: Concession = が, にもかかわらず ; Hypothesis = たら, ば ; Connector = 要するに, したがって, しかし ; Opinion = 私は〜と考えます, 〜と思われます
M: 私は週四日勤務は生産性を高めると考えます。導入が難しい分野もありますが、柔軟に運用すれば、従業員の疲れは減るでしょう。しかし、費用は検討する必要があります。要するに、試す価値はあります。 = I think a four-day week raises productivity. Some fields find it hard to introduce, but if operated flexibly, employees' fatigue would drop. However, costs need to be examined. In short, it's worth trying.
`;
export const JA_PLACEMENT_EXT = `
vocabulary | B1 | - | mcq 「締め切りは金曜日です」 means ___. ? the price drops | *the deadline is Friday | the place closes | the plan starts
grammar | B1 | - | mcq 雨が___、家にいます。 ? 降るので | *降ったら | 降るから | 降って
grammar | B2 | - | mcq 先生に___。 ? ほめました | *ほめられました | ほめさせました | ほめて
vocabulary | B2 | - | mcq 「強調する」 means ___. ? to lose | *to emphasise | to leave | to read
grammar | C1 | - | mcq 私が明日___。 (humble) ? いらっしゃいます | *参ります | 来られます | 来る
vocabulary | C1 | - | mcq 「にもかかわらず」 is closest to ___. ? だから | *それでも | それに | なぜなら
vocabulary | C2 | - | mcq 「はかない」 means ___. ? eternal | *fleeting | strong | clear
vocabulary | C2 | - | mcq 「を踏まえて」 means ___. ? despite | *in view of | in front of | instead of
`;
