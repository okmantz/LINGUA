// Chinese extension: more B1–C2 material. Machine-drafted: have a native speaker review idioms and register notes.
export const ZH_VOCAB_EXT = `
connectors|而且|moreover|adv|érqiě|房子很大，而且有阳台。|The house is big and also has a balcony.|B1
connectors|不过|but, however|adv|búguò|很晚了，不过我还是去。|It's late, but I'll still go.|B1
connectors|所以|so, therefore|adv|suǒyǐ|我生病了，所以没去。|I was sick, so I didn't go.|B1
work|工资|wages, salary|n|gōngzī|我的工资每年都涨。|My salary rises every year.|B1
work|截止日期|deadline|n|jiézhǐ rìqī|截止日期是星期五。|The deadline is Friday.|B1
work|招聘|to recruit|v|zhāopìn|公司要招聘三个人。|The company is going to recruit three people.|B1
verbs|记得|to remember|v|jìde|我记得他的名字。|I remember his name.|B1
verbs|发现|to discover, notice|v|fāxiàn|我发现了一个错误。|I noticed a mistake.|B1
verbs|习惯|to get used to|v|xíguàn|我慢慢习惯了这里的天气。|I'm gradually getting used to the weather here.|B1
society|不平等|inequality|n|bù píngděng|社会不平等在加剧。|Social inequality is growing.|B2
society|社区|community, neighbourhood|n|shèqū|这是一个安静的社区。|This is a quiet neighbourhood.|B2
verbs|强调|to emphasise|v|qiángdiào|我想强调这一点。|I want to emphasise this point.|B2
verbs|实现|to achieve, realise|v|shíxiàn|她实现了自己的目标。|She achieved her goal.|B2
verbs|声称|to claim|v|shēngchēng|他声称什么都不知道。|He claims to know nothing.|B2
adjectives|必不可少|indispensable|adj|bì bù kě shǎo|这份文件必不可少。|This document is indispensable.|B2
verbs|质疑|to question|v|zhìyí|没有人质疑他的决定。|Nobody questioned his decision.|C1
adjectives|不可避免|unavoidable|adj|bù kě bìmiǎn|变化是不可避免的。|Change is unavoidable.|C1
society|挑战|challenge|n|tiǎozhàn|气候变化是全球性的挑战。|Climate change is a global challenge.|C1
connectors|尽管如此|even so|phr|jǐnguǎn rúcǐ|尽管如此，计划仍在继续。|Even so, the plan continues.|C1
connectors|总而言之|in short|phr|zǒng ér yán zhī|总而言之，没有简单的办法。|In short, there's no simple solution.|C1
adjectives|转瞬即逝|fleeting|adj|zhuǎn shùn jí shì|名声转瞬即逝。|Fame is fleeting.|C2
verbs|倡导|to advocate|v|chàngdǎo|专家倡导谨慎。|Experts advocate caution.|C2
society|弊端|drawback, ill effect|n|bìduān|过度劳累的弊端很大。|The ill effects of overwork are great.|C2
connectors|鉴于|in view of|prep|jiànyú|鉴于目前的情况，我们推迟会议。|In view of the current situation, we postpone the meeting.|C2
`;
export const ZH_GRAMMAR_EXT = `
## ext-ba-bei | ext-ba-bei | The 把 and 被 constructions | B1
S: 把 puts the object before the verb to show what is done to it: 我把书放在桌子上。 被 marks the passive: 书被他拿走了。 The verb must be complex (with a complement, 了, or result).
B: **把 + object + verb + complement:** 我把作业做完了。 (I finished the homework.) **被 + agent + verb + complement:** 钱包被偷了。 (The wallet was stolen.) The agent can be omitted after 被 when unknown. Never use a bare verb after 把.
E: 请把门关上。 = Please close the door.
E: 我把钥匙忘在家里了。 = I left my key at home.
E: 手机被他弄坏了。 = The phone was broken by him.
E: 我的自行车被偷了。 = My bike was stolen.
M: "我把书看" — the verb needs a complement: 我把书看完了。
M: Using 被 for neutral events: 被 usually implies an unwanted event.
X: mcq 我___作业做完了。 ? 被 | *把 | 给 | 对
X: mcq 钱包___偷了。 ? 把 | *被 | 对 | 让给
X: fill 请___门关上。 => 把
X: type Say: "My bike was stolen." => 我的自行车被偷了
## ext-concession | ext-concession | Concession and condition | B2
S: 虽然……但是…… (although), 即使……也…… (even if), 如果……就…… (if), 只要……就…… (as long as), 只有……才…… (only if).
B: **虽然很累，但是他还在工作。** **即使下雨，我们也去。** **只要努力，就能成功。** **只有多练习，才能说得好。** The second clause usually carries the adverb 就 / 也 / 才.
E: 虽然他很忙，但是他来了。 = Although he's busy, he came.
E: 即使明天下雨，我也去。 = Even if it rains tomorrow, I'll go.
E: 只要你努力，就会成功。 = As long as you work hard, you'll succeed.
E: 只有多听，才能听懂。 = Only by listening a lot can you understand.
M: Dropping 就 / 也 / 才 in the second clause.
M: Mixing 只要 and 只有: 只有 gives a necessary condition, 只要 a sufficient one.
X: mcq ___明天下雨，我也去。 ? 因为 | *即使 | 所以 | 但是
X: mcq 只有多练习，___能说好。 ? 就 | *才 | 也 | 都
X: fill 只要努力，___会成功。 => 就
X: type Say: "Even if it rains tomorrow, I'll go." => 即使明天下雨，我也去
## ext-formal | ext-formal | Formal written connectors | C1
S: Written Chinese uses compact connectors: 然而 (however), 因此 (therefore), 此外 (moreover), 倘若 (if), 以便 (so as to), 以免 (lest).
B: **此外，……** **因此，……** **倘若时间允许，……** **请提前通知，以便安排。** **带伞，以免淋雨。** Compare with spoken 而且 / 所以 / 如果. Choose by register.
E: 此外，公司还提供培训。 = Moreover, the company also provides training.
E: 因此，我们决定推迟。 = Therefore, we decided to postpone.
E: 倘若时间允许，我们再讨论。 = If time permits, we'll discuss again.
E: 请带伞，以免淋雨。 = Please bring an umbrella so as not to get wet.
M: Using 然而 in casual speech where 不过 is natural.
M: Putting 以免 before a positive aim: it introduces what to avoid.
X: mcq ___，公司还提供培训。 ? 所以 | *此外 | 但是 | 因为
X: mcq 请带伞，___淋雨。 ? 以便 | *以免 | 因此 | 此外
X: fill ___时间允许，我们再讨论。 (formal if) => 倘若
X: type Say: "Therefore, we decided to postpone." => 因此，我们决定推迟
`;
export const ZH_CONVS_EXT = `
## ext-b1-landlord | ext-b1-landlord | Renting a flat | B1 | You call about a flat for rent.
N: 喂，这里是房屋中介。 = Hello, this is the property agency.
Y: 你好，我是看了广告打来的。那套房子还在吗？ = Hello, I saw the ad. Is that flat still available? || 我要买一张火车票。 = I want to buy a train ticket. || 火车站在哪儿？ = Where is the train station? :: 广告,房子,还在
N: 在，一个月三千块，包括物业费。 = Yes, three thousand a month, including management fees.
Y: 我这个周末可以去看看吗？ = Could I go and look this weekend? || 我昨天看房子。 = I look at the flat yesterday. || 牛奶很贵。 = Milk is expensive. :: 周末,看看
N: 可以，星期六上午十一点怎么样？ = Sure, how about Saturday at eleven?
Y: 好的，星期六见。 = OK, see you Saturday. || 我什么都不记得。 = I remember nothing. || 再见，昨天。 = Goodbye, yesterday. :: 好的,星期六
## ext-c1-interview | ext-c1-interview | A radio interview | C1 | You are interviewed about a social issue.
N: 有人说住房问题无法解决，您怎么看？ = Some say the housing problem can't be solved. What do you think?
Y: 我不这么认为。这确实是一个巨大的挑战，但有些措施已经见效了。 = I don't think so. It's indeed a huge challenge, but some measures have already worked. || 挑战是有，但有措施。 = (flatter) || 没有办法，因为没有。 = There's no way because there isn't. :: 挑战,措施
N: 比如说？ = For example?
Y: 比如限制短租，同时增加公共住房。 = For example, limiting short-term rentals while building more public housing. || 明天租市场。 = Rent the market tomorrow. || 都很贵，就是这样。 = Everything is expensive, that's just how it is. :: 短租,公共住房
N: 谢谢您接受采访。 = Thank you for the interview.
Y: 不客气，很高兴。 = You're welcome, my pleasure. || 再见，昨天。 = Goodbye, yesterday. || 没关系。 = It doesn't matter. :: 不客气,高兴
`;
export const ZH_READING_EXT = `
## ext-r-b2-city | ext-r-b2 | 十五分钟城市 | B2
P: 一些城市规划者建议，让每位居民步行十五分钟内就能解决基本生活需求。这个想法的目的是减少交通流量，并支持社区里的小商店。 = Some city planners suggest letting every resident meet basic daily needs within a fifteen-minute walk. The idea aims to reduce traffic and support small shops in the community.
P: 然而，批评者指出，并不是每个城市都能这样改造，而且设施完善的社区房价可能会上涨。 = However, critics point out that not every city can be redesigned this way, and house prices may rise in neighbourhoods with good facilities.
G: 规划者 = planner ; 流量 = flow ; 设施 = facilities
Q: mcq 房价为什么可能上涨？ ? 因为交通流量减少 | *因为设施好的社区更受欢迎 | 因为小商店关门 | 因为居民步行十五分钟
Q: mcq 想减少什么？ ? 商店 | *交通流量 | 社区 | 房子
Q: mcq 这个想法的目的是什么？ ? 增加汽车 | *在附近解决生活需求 | 减少商店 | 提高房价
## ext-r-c1-memory | ext-r-c1 | 选择性记忆 | C1
P: 人们往往认为回忆就是如实重播过去，但许多研究表明事实恰恰相反：每次回想一件事，我们都会重新构建这段记忆，并在这个过程中悄悄地改变它。 = People often think recollection simply replays the past as it was, but many studies show the opposite: each time we recall something, we rebuild the memory and quietly change it in the process.
P: 这就解释了为什么两个目击者看到同一件事，说出来的版本却不一样，而且两人都没有说谎。 = This explains why two witnesses of the same event can give different versions with neither lying.
G: 如实 = as it was ; 构建 = to construct ; 目击者 = witness
Q: mcq 研究表明了什么？ ? 回忆是如实重播过去 | *每次回想都会重新构建记忆 | 两个目击者总是说谎 | 记忆绝不会改变
Q: mcq 记忆为什么会改变？ ? 因为如实重播了过去 | *因为每次回想都在重新构建它 | 因为目击者讲了版本 | 因为其中一人说谎
Q: mcq 回想时我们做了什么？ ? 如实重播 | *重新构建并悄悄改变 | 交给目击者 | 把它删掉
`;
export const ZH_LISTENING_EXT = `
## ext-l-b2-radio | ext-l-b2 | 广播讨论 | B2
L: 主持人: 今天我们谈谈远程办公。小王，你怎么看？ = Today we talk about remote work. Xiao Wang, what do you think?
L: 小王: 我觉得它带来了很多好处，不过并不是所有行业都适用。 = I think it has brought many benefits, though it doesn't suit every industry.
L: 主持人: 那缺点呢？ = And the drawbacks?
L: 小王: 最大的问题是孤独感，还有工作和私人生活很难分开。 = The biggest problems are loneliness and the difficulty of separating work from private life.
L: 主持人: 谢谢你，小王。 = Thank you, Xiao Wang.
Q: mcq 他们在谈什么？ ? 交通 | *远程办公 | 旅游 | 做饭
Q: mcq 小王提到什么缺点？ ? 工资 | *孤独感 | 交通 | 工作时间
## ext-l-c1-lecture | ext-l-c1 | 讲座 | C1
L: 教授: 我想强调，语言的变化不是堕落，而是自然的发展。 = I want to emphasise that language change is not decline but natural development.
L: 教授: 今天看起来不对的说法，几百年前很可能是正常的。 = Expressions that look wrong today were probably normal several hundred years ago.
L: 学生: 那语言里就没有错误吗？ = Then there are no mistakes in language?
L: 教授: 规范是有的，但它会随着使用而改变。 = There are norms, but they change with use.
Q: mcq 教授主张什么？ ? 变化是堕落 | *变化是自然的发展 | 没有规范 | 什么都不变
Q: mcq 他怎么说规范？ ? 一成不变 | *会随着使用而改变 | 不存在 | 只是意见
`;
export const ZH_WRITING_EXT = `
## w-ext-b2-email | ext-w-b2 | A formal enquiry | B2 | 60
T: Write a formal email (8–10 lines) to a language school asking about courses, price and dates. Use a polite formal register (您, 请问, 麻烦).
R: Greeting = 尊敬的, 您好 ; Request = 请问, 麻烦您 ; Question = 学费, 开课日期 ; Closing = 此致敬礼, 谢谢
M: 您好！我想了解贵校下学期的汉语课程。请问学费是多少，什么时候开课？另外，请问有没有晚上的班？麻烦您回复，谢谢！王芳。 = Hello! I'd like to learn about your Chinese courses next term. May I ask what the fee is and when classes start? Also, are there evening classes? Please reply. Thank you! Wang Fang.
## w-ext-c1-essay | ext-w-c1 | An argumentative essay | C1 | 90
T: Write 12–15 lines arguing for or against a four-day working week. Use a concession (虽然……但是……, 即使……也……), a conditional (倘若) and a formal connector (然而, 总而言之).
R: Concession = 虽然, 即使 ; Hypothesis = 倘若, 如果 ; Connector = 然而, 总而言之, 因此 ; Opinion = 在我看来, 我认为
M: 在我看来，每周工作四天可以提高效率。虽然有些行业难以推行，但倘若灵活安排，员工会没那么疲惫。然而，成本必须认真评估。总而言之，值得一试。 = In my view a four-day week can raise efficiency. Although some industries find it hard, if arranged flexibly, employees will be less tired. However, costs must be carefully evaluated. In short, it's worth a try.
`;
export const ZH_PLACEMENT_EXT = `
vocabulary | B1 | - | mcq 「截止日期是星期五」 means ___. ? the price drops | *the deadline is Friday | the place closes | the plan starts
grammar | B1 | - | mcq 我___作业做完了。 ? 被 | *把 | 给 | 对
grammar | B2 | - | mcq ___明天下雨，我也去。 ? 因为 | *即使 | 所以 | 但是
vocabulary | B2 | - | mcq 「强调」 means ___. ? to lose | *to emphasise | to leave | to read
grammar | C1 | - | mcq 请带伞，___淋雨。 ? 以便 | *以免 | 因此 | 此外
vocabulary | C1 | - | mcq 「尽管如此」 is closest to ___. ? 所以 | *不过 | 而且 | 因为
vocabulary | C2 | - | mcq 「转瞬即逝」 means ___. ? eternal | *fleeting | strong | clear
vocabulary | C2 | - | mcq 「鉴于」 means ___. ? despite | *in view of | in front of | instead of
`;
