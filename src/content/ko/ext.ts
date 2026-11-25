// Korean extension: more B1–C2 material. Machine-drafted: have a native speaker review idioms and register notes.
export const KO_VOCAB_EXT = `
connectors|게다가|besides|adv|ge-da-ga|게다가 집에 발코니도 있어요.|Besides, the house has a balcony too.|B1
connectors|하지만|but, however|adv|ha-ji-man|늦었어요. 하지만 갈게요.|It's late. But I'll go.|B1
connectors|그래서|so, therefore|adv|geu-rae-seo|아파서 집에 있었어요. 그래서 못 갔어요.|I was sick and stayed home. So I couldn't go.|B1
work|월급|monthly salary|n|wol-geup|월급이 매년 올라요.|My salary goes up every year.|B1
work|마감|deadline|n|ma-gam|마감이 금요일이에요.|The deadline is Friday.|B1
work|채용하다|to hire|v|chae-yong-ha-da|회사에서 세 명을 채용해요.|The company is hiring three people.|B1
verbs|기억하다|to remember|v|gi-eok-ha-da|그 사람 이름을 기억해요.|I remember that person's name.|B1
verbs|알아차리다|to notice|v|a-ra-cha-ri-da|실수를 알아차렸어요.|I noticed the mistake.|B1
verbs|익숙해지다|to get used to|v|ik-suk-hae-ji-da|날씨에 익숙해지고 있어요.|I'm getting used to the weather.|B1
society|불평등|inequality|n|bul-pyeong-deung|불평등이 커지고 있어요.|Inequality is growing.|B2
society|동네|neighbourhood|n|dong-ne|조용한 동네예요.|It's a quiet neighbourhood.|B2
verbs|강조하다|to emphasise|v|gang-jo-ha-da|이 점을 강조하고 싶어요.|I want to emphasise this point.|B2
verbs|달성하다|to achieve|v|dal-seong-ha-da|그녀는 목표를 달성했어요.|She achieved her goal.|B2
verbs|주장하다|to claim|v|ju-jang-ha-da|그는 아무것도 모른다고 주장해요.|He claims he knows nothing.|B2
adjectives|필수적이다|to be essential|adj|pil-su-jeo-gi-da|이 서류는 필수적이에요.|This document is essential.|B2
verbs|의문을 제기하다|to raise doubts about|v|ui-mu-neul je-gi-ha-da|아무도 그의 결정에 의문을 제기하지 않았어요.|Nobody questioned his decision.|C1
adjectives|불가피하다|to be unavoidable|adj|bul-ga-pi-ha-da|변화는 불가피해요.|Change is unavoidable.|C1
society|과제|task, challenge|n|gwa-je|기후 변화는 세계적인 과제예요.|Climate change is a global challenge.|C1
connectors|그럼에도 불구하고|nevertheless|phr|geu-reo-me-do bul-gu-ha-go|그럼에도 불구하고 계획은 계속돼요.|Nevertheless, the plan continues.|C1
connectors|요컨대|in short|adv|yo-keon-dae|요컨대 쉬운 해결책은 없어요.|In short, there is no easy solution.|C1
adjectives|덧없다|to be fleeting|adj|deot-eop-da|명성은 덧없어요.|Fame is fleeting.|C2
verbs|옹호하다|to advocate|v|ong-ho-ha-da|전문가들은 신중함을 옹호해요.|Experts advocate caution.|C2
society|폐해|harm, ill effect|n|pye-hae|과로의 폐해가 커요.|The ill effects of overwork are great.|C2
connectors|~을/를 감안하여|in view of|phr|-eul/reul ga-man-ha-yeo|상황을 감안하여 회의를 미룹니다.|In view of the situation we postpone the meeting.|C2
`;
export const KO_GRAMMAR_EXT = `
## ext-conditional | ext-conditional | Conditionals: -(으)면 and -았/었다면 | B1
S: -(으)면 means "if / when" for real conditions. -았/었다면 and -(으)ㄹ텐데 handle unreal or past hypotheticals.
B: **비가 오면 집에 있을 거예요.** (If it rains, I'll stay home.) **돈이 많았다면 집을 샀을 거예요.** (If I'd had money, I'd have bought a house.) For wishes, **-(으)면 좋겠다**: 시간이 있으면 좋겠어요.
E: 시간이 있으면 전화할게요. = If I have time, I'll call.
E: 부자라면 집을 살 텐데. = If I were rich, I'd buy a house (but I'm not).
E: 알았다면 왔을 거예요. = If I'd known, I'd have come.
E: 주말이면 늦게 일어나요. = On weekends I get up late.
M: Putting a tense marker before -(으)면 for a real future condition: use 비가 오면, not 비가 올 거면 (that is a different nuance).
M: Forgetting that -(으)면 can also mean "whenever".
X: mcq 비가 ___ 집에 있을 거예요. ? 와서 | *오면 | 오지만 | 올 때문에
X: mcq 알았___ 왔을 거예요. ? 으면 | *다면 | 지만 | 는데
X: fill 시간이 있___ 전화할게요. => 으면
X: type Say: "If it rains, I'll stay home." => 비가 오면 집에 있을 거예요
## ext-passive-causative | ext-passive-causative | Passive and causative verbs | B2
S: Many verbs form passives and causatives with -이/히/리/기: 보다 → 보이다, 먹다 → 먹이다. -게 하다 is the productive causative; -아/어지다 is the productive passive.
B: **문이 닫혔어요.** (The door was closed.) **엄마가 아이에게 밥을 먹여요.** (Mum feeds the child.) **산이 보여요.** (The mountain is visible.) **이 일은 내일까지 끝내게 했어요.** = I had it finished by tomorrow.
E: 책이 많이 팔렸어요. = The books sold a lot.
E: 아이에게 책을 읽게 했어요. = I made the child read a book.
E: 문이 열려 있어요. = The door is open.
E: 날씨가 따뜻해졌어요. = The weather got warm.
M: Using the active for results that Koreans say passively: 문이 닫았어요 → 문이 닫혔어요.
M: Mixing up 이 (passive) and 이 (causative) pairs; learn them as vocabulary.
X: mcq 문이 ___. ? 닫았어요 | *닫혔어요 | 닫게요 | 닫아요
X: mcq 아이에게 책을 읽___ 했어요. ? 어 | *게 | 지 | 고
X: fill 책이 많이 ___. (sold) => 팔렸어요
X: type Say: "The weather got warm." => 날씨가 따뜻해졌어요
## ext-indirect | ext-indirect | Reported speech | C1
S: Indirect speech uses -다고 하다 (statement), -냐고 하다 (question), -라고 하다 (command), and -자고 하다 (suggestion).
B: **그는 바쁘다고 했어요.** (He said he's busy.) **언제 오냐고 물었어요.** (He asked when I'm coming.) **빨리 오라고 했어요.** (He told me to come quickly.) **같이 가자고 했어요.** (He suggested going together.) Noun predicates use -(이)라고 하다.
E: 선생님이 내일 시험이 있다고 하셨어요. = The teacher said there's a test tomorrow.
E: 친구가 어디 가냐고 물었어요. = My friend asked where I'm going.
E: 엄마가 일찍 자라고 했어요. = Mum told me to sleep early.
E: 그는 학생이라고 했어요. = He said he is a student.
M: Using the plain form without the quotative particle.
M: Using -다고 with nouns: say -(이)라고.
X: mcq 선생님이 내일 시험이 ___ 하셨어요. ? 있어 | *있다고 | 있는 | 있기
X: mcq 같이 가___ 했어요. (suggestion) ? 다고 | *자고 | 라고 | 냐고
X: fill 엄마가 일찍 자___ 했어요. (command) => 라고
X: type Say: "He said he is a student." => 그는 학생이라고 했어요
`;
export const KO_CONVS_EXT = `
## ext-b1-landlord | ext-b1-landlord | Renting a flat | B1 | You call about a flat for rent.
N: 여보세요, 부동산입니다. = Hello, this is the real estate office.
Y: 안녕하세요, 광고에 나온 집 때문에 전화했어요. 아직 비어 있나요? = Hello, I'm calling about the home in the ad. Is it still available? || 기차표 한 장 주세요. = One train ticket, please. || 역이 어디예요? = Where is the station? :: 광고,집,비어
N: 네, 월세는 오십만 원이고 관리비는 따로예요. = Yes, rent is five hundred thousand won and maintenance is separate.
Y: 이번 주말에 볼 수 있을까요? = Could I see it this weekend? || 어제 집을 봐요. = I see the home yesterday. || 우유가 비싸요. = Milk is expensive. :: 주말,볼
N: 네, 토요일 열한 시 괜찮으세요? = Yes, is Saturday at eleven OK?
Y: 네, 좋아요. 토요일에 뵐게요. = Yes, great. See you Saturday. || 아무것도 기억하지 못해요. = I remember nothing. || 안녕히 가세요, 어제요. = Goodbye, yesterday. :: 좋아요,토요일
## ext-c1-interview | ext-c1-interview | A radio interview | C1 | You are interviewed about a social issue.
N: 주거 문제는 해결할 수 없다는 사람도 있습니다. 어떻게 생각하세요? = Some say the housing problem can't be solved. What do you think?
Y: 그렇게까지는 말하고 싶지 않아요. 큰 과제이지만 이미 효과를 본 대책도 있습니다. = I wouldn't go that far. It's a big challenge, but some measures have already worked. || 과제이지만 대책이 있어요. = (flatter) || 해결책이 없어요, 아니니까요. = There's no solution because it isn't. :: 과제,대책
N: 예를 들면요? = For example?
Y: 관광 숙박 제한과 공공 주택 확대 같은 것입니다. = Things like limiting tourist lodging and expanding public housing. || 내일 시장을 빌려요. = I rent the market tomorrow. || 다 비싸요, 그냥요. = Everything is expensive, just because. :: 숙박,주택
N: 시간 내주셔서 감사합니다. = Thank you for your time.
Y: 별말씀을요. 즐거웠습니다. = You're welcome. It was a pleasure. || 안녕히 가세요, 어제요. = Goodbye, yesterday. || 괜찮아요. = It's fine. :: 즐거웠,별말씀
`;
export const KO_READING_EXT = `
## ext-r-b2-city | ext-r-b2 | 15분 도시 | B2
P: 일부 도시계획가들은 모든 주민이 걸어서 십오 분 안에 필수적인 일을 해결할 수 있어야 한다고 제안합니다. 이 아이디어는 교통량을 줄이고 동네의 작은 가게를 살리는 데 목적이 있습니다. = Some urban planners propose that every resident should be able to handle essentials within fifteen minutes on foot. The idea aims to cut traffic and revive small neighbourhood shops.
P: 하지만 비판하는 사람들은 모든 도시를 그렇게 바꿀 수는 없고, 시설이 잘 갖춰진 동네에서는 집값이 오를 수 있다고 지적합니다. = But critics point out that not every city can be changed that way, and that house prices may rise in neighbourhoods with good facilities.
G: 교통량 = traffic volume ; 지적하다 = to point out ; 갖추다 = to be equipped
Q: mcq 집값이 오를 수 있는 이유는 무엇입니까? ? 교통량이 줄기 때문에 | *시설이 좋은 동네가 더 인기를 얻기 때문에 | 작은 가게가 문을 닫기 때문에 | 주민이 십오 분 걷기 때문에
Q: mcq 무엇을 줄이려고 합니까? ? 가게 | *교통량 | 동네 | 집
Q: mcq 이 아이디어의 목적은 무엇입니까? ? 자동차를 늘리는 것 | *필요한 것을 가까이에서 해결하는 것 | 가게를 줄이는 것 | 집값을 올리는 것
## ext-r-c1-memory | ext-r-c1 | 선택적 기억 | C1
P: 우리는 기억이 과거를 그대로 재생하는 것이라고 쉽게 생각하지만, 많은 연구는 반대의 결과를 보여 줍니다. 기억을 떠올릴 때마다 우리는 그것을 새로 구성하고 그 과정에서 조금씩 바꿉니다. = We easily think memory plays the past back as it was, but many studies show the opposite. Each time we recall a memory we reconstruct it and change it little by little in the process.
P: 이것은 같은 사건을 본 두 증인이 서로 다른 이야기를 해도 둘 다 거짓말이 아닐 수 있는 이유를 설명해 줍니다. = This explains why two witnesses of the same event can tell different stories without either lying.
G: 재생하다 = to play back ; 구성하다 = to construct ; 증인 = witness
Q: mcq 연구는 무엇을 보여 줍니까? ? 기억은 과거를 그대로 재생한다 | *기억은 떠올릴 때마다 다시 만들어진다 | 두 증인은 항상 거짓말을 한다 | 기억은 절대 바뀌지 않는다
Q: mcq 기억이 바뀌는 이유는 무엇입니까? ? 과거를 그대로 재생해서 | *떠올릴 때마다 새로 구성해서 | 증인이 이야기를 해서 | 둘 다 거짓말을 해서
Q: mcq 기억을 떠올릴 때 우리는 무엇을 합니까? ? 그대로 재생한다 | *새로 구성하고 조금씩 바꾼다 | 증인에게 준다 | 지운다
`;
export const KO_LISTENING_EXT = `
## ext-l-b2-radio | ext-l-b2 | 라디오 토론 | B2
L: 진행자: 오늘은 재택근무에 대해 이야기합니다. 민수 씨는 어떻게 생각하세요? = Today we talk about working from home. Minsu, what do you think?
L: 민수: 모든 분야는 아니지만 장점이 많다고 생각합니다. = I think there are many advantages, though not in every field.
L: 진행자: 단점은 무엇입니까? = What are the drawbacks?
L: 민수: 가장 큰 문제는 고립감과 일과 사생활을 나누기 어렵다는 점입니다. = The biggest problems are isolation and the difficulty of separating work from private life.
L: 진행자: 감사합니다, 민수 씨. = Thank you, Minsu.
Q: mcq 무엇에 대해 이야기합니까? ? 교통 | *재택근무 | 관광 | 요리
Q: mcq 민수 씨가 말한 단점은 무엇입니까? ? 월급 | *고립감 | 교통 | 근무 시간
## ext-l-c1-lecture | ext-l-c1 | 강의 | C1
L: 교수: 언어 변화는 타락이 아니라 자연스러운 발전이라는 점을 강조하고 싶습니다. = I want to emphasise that language change is not corruption but natural development.
L: 교수: 오늘날 틀리게 느껴지는 말도 몇 세기 전에는 평범했습니다. = Words that feel wrong today were ordinary a few centuries ago.
L: 학생: 그렇다면 언어에는 오류가 없나요? = Then does language have no errors?
L: 교수: 규범은 있지만 사용에 따라 변합니다. = There are norms, but they change with use.
Q: mcq 교수는 무엇을 주장합니까? ? 변화는 타락이다 | *변화는 자연스러운 발전이다 | 규범은 없다 | 아무것도 안 변한다
Q: mcq 규범에 대해 뭐라고 합니까? ? 변하지 않는다 | *사용에 따라 변한다 | 없다 | 의견일 뿐이다
`;
export const KO_WRITING_EXT = `
## w-ext-b2-email | ext-w-b2 | A formal enquiry | B2 | 60
T: Write a formal email (8–10 lines) to a language school asking about courses, price and dates. Use formal -습니다/-ㅂ니다 endings and at least two polite requests (-ㄹ 수 있을까요, -고 싶습니다).
R: Greeting = 안녕하세요, 담당자님께 ; Request = 알려 주실 수 있을까요, 문의하고 싶습니다 ; Question = 수강료, 시작일 ; Closing = 감사합니다, 답변 기다리겠습니다
M: 안녕하세요, 다음 학기 한국어 수업에 대해 문의하고 싶습니다. 수강료와 시작일을 알려 주실 수 있을까요? 저녁 수업이 있는지도 알고 싶습니다. 답변 기다리겠습니다. 감사합니다. 김민수 드림. = Hello, I'd like to ask about next term's Korean classes. Could you tell me the fees and start date? I'd also like to know if there are evening classes. I'll wait for your reply. Thank you. Kim Minsu.
## w-ext-c1-essay | ext-w-c1 | An argumentative essay | C1 | 90
T: Write 12–15 lines arguing for or against a four-day working week. Use a concession (-지만, -(으)ㄴ/는데도), a hypothesis (-았/었다면) and a formal connector (그럼에도 불구하고, 요컨대).
R: Concession = -지만, -는데도 ; Hypothesis = -다면, -(으)면 ; Connector = 그럼에도 불구하고, 요컨대, 따라서 ; Opinion = 제 생각에는, 저는 ~라고 봅니다
M: 제 생각에는 주 4일 근무는 생산성을 높일 것입니다. 일부 분야에서는 도입하기 어렵지만, 유연하게 적용한다면 직원들은 덜 피곤할 것입니다. 그럼에도 불구하고 비용은 따져 봐야 합니다. 요컨대 시도해 볼 만합니다. = I think a four-day week would raise productivity. Though hard to introduce in some fields, if applied flexibly, employees would be less tired. Nevertheless, costs need examining. In short, it's worth trying.
`;
export const KO_PLACEMENT_EXT = `
vocabulary | B1 | - | mcq "마감이 금요일이에요" means ___. ? the price drops | *the deadline is Friday | the place closes | the plan starts
grammar | B1 | - | mcq 비가 ___ 집에 있을 거예요. ? 와서 | *오면 | 오지만 | 올 때문에
grammar | B2 | - | mcq 문이 ___. ? 닫았어요 | *닫혔어요 | 닫게요 | 닫아요
vocabulary | B2 | - | mcq "강조하다" means ___. ? to lose | *to emphasise | to leave | to read
grammar | C1 | - | mcq 선생님이 내일 시험이 ___ 하셨어요. ? 있어 | *있다고 | 있는 | 있기
vocabulary | C1 | - | mcq "그럼에도 불구하고" is closest to ___. ? 그래서 | *그래도 | 게다가 | 왜냐하면
vocabulary | C2 | - | mcq "덧없다" means ___. ? eternal | *fleeting | strong | clear
vocabulary | C2 | - | mcq "~을/를 감안하여" means ___. ? despite | *in view of | in front of | instead of
`;
