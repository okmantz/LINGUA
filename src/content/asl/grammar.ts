// ASL grammar. Slots match the shared 30-day programme (so "be-verb" is taught as "ASL has no 'be' verb"), then B1 → C2 lessons.
// Gloss conventions used throughout: CAPS = a sign · IX-1/2/3 = point to self/you/someone else · fs-ANA = fingerspelled · ++ = repeated sign
// [yn] yes/no question (brows up) · [wh] WH-question (brows down) · [neg] headshake · [t] topic (brows up) · [cond] "if" clause (brows up + head tilt) · [rh] rhetorical question
// Machine-drafted from standard ASL teaching sources: have a Deaf teacher review before relying on it.
export const ASL_GRAMMAR = `
## pronouns | pronouns | Pointing: pronouns and signing space | A1
S: ASL pronouns are points. Point to yourself (IX-1), the person you are talking to (IX-2) or a spot in the signing space where someone is (IX-3). There is no he/she difference.
B: Pointing is normal grammar in ASL, not rude. Point with the index finger at the chest for **I/me**, at the person for **you**, and at a location for **he, she, it, they**. A flat palm toward the chest or person gives **my / your**.
B: Plurals sweep: **IX-pl** sweeps across several people. **WE** touches one shoulder and arcs to the other. Pick a spot in front of you for an absent person, and keep using that same spot: that is how the listener knows who you mean.
T: | Meaning | How
T: I / me | IX-1 | point to your chest
T: you | IX-2 | point to the person
T: he / she / it | IX-3 | point to the person or their spot
T: we | WE | index finger from shoulder to shoulder
T: they | IX-pl | sweeping point
E: IX-1 DEAF = I am Deaf.
E: IX-2 TEACHER [yn] = Are you a teacher?
E: IX-3 DOCTOR = She is a doctor. (or he)
E: WE FRIEND = We are friends.
M: Looking for separate signs for HE and SHE. ASL points to the person; gender is added only if it matters (MAN IX-3, WOMAN IX-3).
M: Avoiding pointing because it feels rude in English. In ASL, pointing at the person you mean is the polite, normal way.
X: mcq How do you say "I" in ASL? ? WE | *IX-1 | IX-2 | IX-3
X: mcq IX-2 points to ___ . ? yourself | *the person you are talking to | someone absent | a group
X: mcq How many signs for he and she? ? two | *one (a point) | three | none
X: fill To say "you", point to the ___ . => person / listener / other person
X: mcq Which sign sweeps from one shoulder to the other? ? IX-1 | *WE | IX-3 | IX-2
## be-verb | be-verb | No "to be": sentences without am, is, are | A1
S: ASL has no verb for "am / is / are". You put the topic and the description side by side: IX-1 DEAF, NAME fs-ANA, WEATHER HOT.
B: To say who or what something is, just sign the two parts next to each other. **IX-1 TIRED** means "I am tired". The facial expression carries the feeling, so you do not need an extra verb.
B: Names use NAME plus fingerspelling: **MY NAME fs-ANA**. Place or origin is signed with the place sign: **IX-1 FROM SPAIN**.
E: IX-1 STUDENT = I am a student.
E: WEATHER HOT TODAY = It is hot today.
E: MY NAME fs-ANA = My name is Ana.
E: IX-3 TEACHER GOOD = She is a good teacher.
M: Adding BE or IS as a sign. ASL does not use a sign for "to be"; the order of the words does the work.
M: Signing in English word order with every little word (THE, A, IS). Leave them out.
X: mcq Which gloss means "I am tired"? ? IX-1 AM TIRED | *IX-1 TIRED | IX-1 BE TIRED | TIRED AM IX-1
X: mcq ASL signs the verb "to be" ... ? always | often | *almost never | only in questions
X: order Put in ASL order: I am a student => IX-1 STUDENT
X: type Gloss for "The weather is hot today" (3 signs): => WEATHER HOT TODAY / TODAY WEATHER HOT
## articles-gender | articles-gender | No articles, no gender: plurals | A1
S: ASL has no a/the and no grammatical gender. Plurals come from repeating a sign, adding a number, or using MANY.
B: Do not look for signs for "a" or "the". Context, pointing (IX) and the signing space show which one you mean. Nouns do not have masculine or feminine forms.
B: To make a plural, repeat the sign in a sweep (written ++), add a number (TWO CAT), or add MANY. Use whichever fits the noun.
E: IX-1 HAVE DOG = I have a dog.
E: IX-1 HAVE TWO CAT = I have two cats.
E: MANY BOOK = lots of books
E: CHILD++ PLAY = The children are playing.
M: Looking for signs for "a" or "the".
M: Making all plurals the same way. Some nouns do not repeat (not every noun can be signed ++), so use a number or MANY.
X: mcq Which gloss correctly says "She drinks the water"? ? IX-3 DRINK THE WATER | IX-3 DRINK A WATER | *IX-3 DRINK WATER | DRINK THE WATER IX-3
X: mcq Which makes a plural? ? adding -s | *repeating the sign, a number or MANY | changing handshape | pointing at yourself
X: fill To say "many books", sign MANY ___ . => BOOK
X: type Gloss for "two cats": => TWO CAT / CAT TWO
## present-regular | present-regular | Verbs never change: time signs do | A1
S: ASL verbs have no tense endings. You set the time once (TODAY, EVERYDAY, NOW) and keep signing.
B: Put the time at the start: **TODAY IX-1 WORK**. The time stays in force until you change it. Repeated actions use EVERYDAY or a small repeated movement.
E: TODAY IX-1 WORK = I'm working today.
E: EVERYDAY IX-1 DRINK COFFEE = I drink coffee every day.
E: NOW IX-1 STUDY SIGN = I'm studying sign now.
M: Looking for an ending like -ing or -ed on the verb. The verb stays the same.
M: Putting the time at the end every time. Time first is the normal way to set the scene.
X: mcq Where does the time sign usually go? ? at the end | *at the start | in the middle | nowhere
X: mcq Does the sign WORK change for "worked"? ? yes, with -ed | yes, with FINISH only | *no, the time sign shows the time | yes, with a movement
X: order Put in ASL order: I work today => TODAY IX-1 WORK
X: type Gloss for "I drink coffee every day": => EVERYDAY IX-1 DRINK COFFEE
## have-verb | have-verb | HAVE, NONE and existence | A1
S: HAVE says you own or there is something. To say there isn't, use a headshake, NONE or NOT-HAVE.
B: HAVE touches the chest; it is also used for "there is": **HAVE COFFEE HERE**. For none, shake your head over the sentence or sign NONE.
E: IX-1 HAVE DOG = I have a dog.
E: IX-1 HAVE BROTHER TWO = I have two brothers.
E: HAVE COFFEE HERE [yn] = Is there coffee here?
E: IX-1 HAVE MONEY [neg] = I don't have money.
M: Signing a word for "there is/are". HAVE covers it, with pointing to the place.
M: Forgetting the headshake and signing the same as an affirmative sentence.
X: mcq Which gloss means "I have a dog"? ? DOG IX-1 | IX-1 DOG | *IX-1 HAVE DOG | HAVE IX-1 DOG
X: mcq How do you make "I don't have money"? ? add -n't | *add a headshake (or NONE) | change the handshape | move the sign down
X: fill IX-1 ___ DOG. (I own a dog.) => HAVE
X: type Gloss for "I have two brothers": => IX-1 HAVE BROTHER TWO / IX-1 HAVE TWO BROTHER
## negation | negation | Negation: headshake, NOT, NEVER | A1
S: A headshake over the sentence turns it negative. NOT, NONE and the negative forms DON'T-KNOW, DON'T-WANT, DON'T-LIKE add to it.
B: Shake your head slightly **while signing** the verb phrase, and often add NOT after the verb: **IX-1 UNDERSTAND NOT**. Some signs have their own negative form: **DON'T-KNOW, DON'T-WANT, DON'T-LIKE** (the hand flips outward from the sign).
B: Do not put NOT before the verb as English does (not "IX-1 NOT UNDERSTAND" is common, but the headshake is what truly negates). Always keep the headshake going.
E: IX-1 UNDERSTAND NOT [neg] = I don't understand.
E: IX-1 DON'T-KNOW = I don't know.
E: IX-3 DON'T-WANT COFFEE = She doesn't want coffee.
E: IX-1 HAVE MONEY NONE [neg] = I have no money.
M: Signing NOT but nodding your head. The nonmanual marker must match.
M: Forgetting the negative forms. DON'T-KNOW and DON'T-WANT are the natural signs, not KNOW + NOT.
X: mcq What turns a sentence negative in ASL? ? a nod | *a headshake | raised brows only | looking away
X: mcq Which is the natural sign for "I don't know"? ? KNOW NOT | *DON'T-KNOW | NOT KNOW | KNOW NONE
X: fill IX-1 ___ WANT coffee. (negative form) => DON'T
X: type Gloss for "I don't understand" (2 signs + IX): => IX-1 UNDERSTAND NOT / IX-1 DON'T-UNDERSTAND
## questions | questions | Yes/no questions and WH-questions | A1
S: The face asks the question. Yes/no questions raise the brows and lean forward; WH-questions furrow the brows and usually put the WH-sign at the end.
B: **Yes/no:** raise your eyebrows, tilt your head slightly forward, and hold the last sign a bit. No question sign is needed. {{nm=brows-up}}
B: **WH-questions** (WHO, WHAT, WHERE, WHEN, WHY, HOW): furrow your eyebrows, lean slightly forward. The WH-sign typically comes last, sometimes at both ends. {{nm=brows-down}}
T: | Face | Example
T: yes/no | brows up, head forward | YOU DEAF [yn]
T: WH | brows down | NAME YOU WHAT [wh]
E: YOU DEAF [yn] = Are you Deaf?
E: NAME YOU WHAT [wh] = What is your name?
E: BATHROOM WHERE [wh] = Where is the bathroom?
E: YOU WANT COFFEE [yn] = Do you want coffee?
M: Signing with a flat face. Without the eyebrows, a question looks like a statement.
M: Raising the brows on a WH-question. WH-questions use furrowed brows.
X: mcq Which expression marks a yes/no question? ? brows down | *brows up | head shake | smile only
X: mcq Where does the WH-sign usually go? ? the start | *the end | the middle | nowhere
X: order Put in ASL order: What is your name? => NAME YOU WHAT
X: type Gloss for "Where is the bathroom?" (2 signs): => BATHROOM WHERE
## want-verb | want-verb | WANT, NEED and expressing wishes | A1
S: WANT and NEED come before what you want. Show how much with your face, not extra words.
B: **IX-1 WANT COFFEE.** For a strong need, NEED is firmer and the face is serious. Ask with brows up: **YOU WANT COFFEE [yn]**. Answer with YES + the sentence, or the negative DON'T-WANT.
E: IX-1 WANT WATER = I want water.
E: IX-1 NEED GO BATHROOM = I need to go to the bathroom.
E: YOU WANT SIT [yn] = Do you want to sit?
E: IX-1 DON'T-WANT = I don't want it.
M: Using WANT for needs that are strong. NEED is the right sign for necessity.
M: Answering only YES or NO. Add the verb: YES, IX-1 WANT.
X: mcq Which is the more urgent sign? ? WANT | *NEED | LIKE | HAVE
X: mcq Which gloss asks "Do you want water?" ? WANT WATER YOU | *YOU WANT WATER [yn] | WATER YOU WANT [wh] | YOU WANT WATER NOT
X: order Put in ASL order: I want coffee => IX-1 WANT COFFEE
X: type Gloss for "I don't want it": => IX-1 DON'T-WANT
## polite-requests | polite-requests | Polite requests and attention | A1
S: Politeness in ASL comes from PLEASE, a friendly face, and the right way to get someone's attention (a wave or a tap on the shoulder).
B: Add PLEASE to a request: **PLEASE HELP IX-1**. Soft brows and a smile show politeness. To ask permission, use CAN with brows up: **CAN IX-1 SIT [yn]**.
B: Getting attention is part of politeness: wave in the person's line of sight, tap their shoulder or arm lightly, flick the lights, or stomp on the floor (the vibration). Do not wave at close range into their face.
E: PLEASE HELP IX-1 = Please help me.
E: EXCUSE-ME, WHERE BATHROOM [wh] = Excuse me, where is the bathroom?
E: CAN IX-1 SIT HERE [yn] = Can I sit here?
E: THANK-YOU, IX-2 HELP IX-1 = Thank you for helping me.
M: Signing a request with a flat, serious face. It may look like an order.
M: Waving at close range or grabbing someone's hand. Use a gentle tap on the shoulder or arm.
X: mcq How do you get a Deaf person's attention politely? ? shout | *wave or tap the shoulder | throw something | stand silently
X: mcq What turns a request into a question? ? a nod | *brows up (yes/no marking) | headshake | looking down
X: fill ___ HELP IX-1. (add the polite word to this request) => PLEASE
X: type Gloss for "Can I sit here?" (4 signs): => CAN IX-1 SIT HERE
## possessives | possessives | MY, YOUR, HIS/HER | A1
S: The open palm shows who owns something. MY touches the chest, YOUR points at the person, and for someone else the palm points toward them. Possessives come before the noun.
B: **MY BROTHER, YOUR NAME, IX-3 FRIEND.** Possessives are the same for he/she. The palm toward the chest or the person is the sign.
E: MY MOTHER TEACHER = My mother is a teacher.
E: YOUR NAME WHAT [wh] = What is your name?
E: HIS BOOK = his/her book
E: MY FAMILY BIG = My family is big.
M: Signing the possessive after the noun (BOOK MY). It comes before.
M: Looking for separate signs for his and her. One flat hand toward the person covers both.
X: mcq Where does MY go? ? after the noun | *before the noun | at the end | anywhere
X: mcq Which sign gives "your"? ? point to chest | *palm toward the person | point at the floor | two fingers
X: fill ___ BROTHER DEAF. (the possessive that points to yourself) => MY
X: type Gloss for "the family belonging to me": => MY FAMILY
## go-places | go-places | GO, COME and direction in space | A1
S: Movement through the signing space shows direction. GO moves away from you, COME moves toward you, and your destination has a place in space.
B: Set the place first: **STORE THERE**, then **IX-1 GO** moves toward that place. Ask with WHERE: **YOU GO WHERE [wh]**. To tell someone to come, **COME HERE** moves toward your body.
E: IX-1 GO STORE = I'm going to the store.
E: YOU GO WHERE [wh] = Where are you going?
E: COME HERE = Come here.
E: IX-3 GO HOME = She's going home.
M: Signing GO in place with no direction.
M: Using English "to the" or "at". The movement and the place sign are enough.
X: mcq Which direction does COME move? ? away | *toward you | up | sideways
X: mcq Which gloss means "Where are you going?" ? GO YOU WHERE | *YOU GO WHERE [wh] | WHERE YOU TO GO | YOU WHERE GO IX-1
X: fill IX-1 ___ STORE. (I'm going to the store.) => GO
X: type Gloss for "approach me" (2 signs): => COME HERE
## reflexive | reflexive | Routines: sequences of actions | A1
S: ASL tells a routine as a sequence: set the time, then sign the actions in order. A small pause or a head nod shows the steps.
B: **MORNING IX-1 WAKE-UP, EAT, WORK. NIGHT IX-1 SLEEP.** There is no reflexive pronoun. The actions are enough. Use FINISH to mark each step as done.
E: MORNING IX-1 WAKE-UP, EAT = In the morning I wake up and eat.
E: EVERYDAY IX-1 WORK = I work every day.
E: NIGHT IX-1 TIRED, SLEEP = At night I'm tired and sleep.
E: SUNDAY FAMILY EAT = On Sunday my family eats together.
M: Using THEN after every sign. A pause or a small movement is enough.
M: Putting the time at the end. Say it first.
X: mcq How do you show a sequence in ASL? ? add THEN after every sign | *sign the actions in order, with pauses | change the verb ending | sign backwards
X: mcq Where does MORNING go? ? at the end | *at the start | after the verb | not used
X: order Put in ASL order: In the morning I eat => MORNING IX-1 EAT
X: type Gloss for "I sleep at night": => NIGHT IX-1 SLEEP
## adjectives | adjectives | Adjectives and facial adverbs | A1
S: Adjectives usually follow the noun (HOUSE BIG). Mouth shapes and the face change how much: "cha" for large, "oo" for small, "th" for careless, "mm" for ordinary.
B: Sign the noun first, then the adjective: **HOUSE BIG, DOG SMALL, WEATHER HOT**. To intensify, add a mouth morpheme: "cha" (mouth open wide) for very big, "oo" (small round lips) for tiny, "th" (tongue slightly out) for careless or sloppy, "mm" (lips pressed) for ordinary or comfortable.
B: Face figures: {{nm=cha}} cha = large {{nm=oo}} oo = small {{nm=th}} th = careless {{nm=mm}} mm = ordinary
E: HOUSE BIG = The house is big.
E: DOG SMALL = The dog is small.
E: WEATHER HOT = The weather is hot.
E: CAR NEW = The car is new.
M: Putting the adjective before the noun (BIG HOUSE). Both exist, but the noun-first order is more typical for description.
M: Forgetting the face. A flat face makes the adjective mild.
X: mcq What is the typical position of an adjective? ? before the noun | *after the noun | at the very end of the story | on the face only
X: mcq Which mouth shape adds "very large"? ? oo | *cha | th | mm
X: fill HOUSE ___. (The house is large.) => BIG
X: type Gloss for "The car is new": => CAR NEW
## like-verb | like-verb | Likes, dislikes and the topic | A1
S: Say the topic first with raised brows, then comment on it: DOG, IX-1 LIKE. Topic-comment is one of the most characteristic ASL patterns.
B: **Topic:** raise your brows and tilt your head slightly while you sign the topic, then relax them for the comment: **COFFEE [t], IX-1 LIKE**. For dislike, use DON'T-LIKE or LIKE + headshake.
E: DOG [t], IX-1 LIKE = I like dogs.
E: COFFEE [t], IX-1 DON'T-LIKE = I don't like coffee.
E: MUSIC [t], IX-3 LOVE = She loves music.
E: IX-1 LIKE BOOK = I like books. (also fine)
M: Skipping the brow raise on the topic. It shows what you are talking about.
M: Signing every sentence in English order. Topic first is often natural.
X: mcq What marks the topic? ? a headshake | *raised brows and a tilt | smiling | looking down
X: mcq Which sentence puts the topic first? ? IX-1 LIKE DOG | *DOG [t], IX-1 LIKE | LIKE IX-1 DOG | IX-1 DOG LIKE NOT
X: fill COFFEE, IX-1 ___. (I don't like coffee.) => DON'T-LIKE
X: type Gloss for "I like dogs" (topic first): => DOG IX-1 LIKE
## irregular-present | irregular-present | Directional verbs: GIVE, TELL, ASK | A2
S: Some verbs move between the people involved: 1-GIVE-2 starts at you and ends at them. The movement carries "who does what to whom".
B: **Directional (agreement) verbs** such as GIVE, TELL, ASK, HELP, SHOW, SEND and TEACH start at the doer and end at the receiver. 1-ASK-2 means "I ask you"; 2-ASK-1 means "you ask me". Plain verbs like LIKE, KNOW, WANT and EAT do not move between people.
B: Because the movement already says who and whom, you do not need IX-1 or IX-2 each time.
E: 1-ASK-2 = I ask you.
E: 2-TELL-1 = You tell me.
E: 3-HELP-1 = She helps me.
E: IX-1 LIKE IX-2 = I like you. (LIKE is not directional)
M: Adding IX-1 and IX-2 around every directional verb. The movement already shows them.
M: Making plain verbs like LIKE move between people. They stay in place.
X: mcq Which verb is directional? ? LIKE | *GIVE | KNOW | WANT
X: mcq 2-TELL-1 means ... ? I tell you | *you tell me | she tells me | I tell her
X: mcq Which verb does NOT move between people? ? ASK | HELP | *LIKE | TEACH
X: fill 1-___-2 means "I hand it to you". => GIVE
## modals | modals | CAN, MUST, WILL | A2
S: Modals come before the main verb: IX-1 CAN SIGN, IX-1 MUST GO, IX-1 WILL TRAVEL. CAN'T is a separate sign.
B: **CAN** (both fists move down) and **CAN'T** (an index finger strikes the other index finger) are different signs, not CAN + NOT. **MUST/SHOULD** has an X-hand. **WILL** moves forward from the cheek.
E: IX-1 CAN SIGN = I can sign.
E: IX-1 CAN'T COME = I can't come.
E: IX-1 MUST GO = I have to go.
E: TOMORROW IX-1 WILL TRAVEL = I will travel tomorrow.
M: Signing CAN + NOT for "can't". Use CAN'T.
M: Putting the modal after the verb. It goes before.
X: mcq Which gloss means "I can't come"? ? IX-1 CAN COME NOT | *IX-1 CAN'T COME | IX-1 NOT COME CAN | COME IX-1 NOT
X: mcq Where does the modal go? ? after the verb | *before the verb | at the end | nowhere
X: order Put in ASL order: I must go => IX-1 MUST GO
X: type Gloss for "I will go tomorrow": => TOMORROW IX-1 WILL GO / IX-1 WILL GO TOMORROW
## comparatives | comparatives | Comparing: BETTER, SAME, DIFFERENT | A2
S: Compare two things by putting each in its own place in space, then comparing: BOOK-left BIG, BOOK-right SMALL. SAME and DIFFERENT move between the two spots.
B: Point to one location for A and another for B. **BETTER** moves from the mouth up into a thumb-up A-hand. **SAME** (Y-hand) and **DIFFERENT** move between the two locations.
E: IX-1 DIFFERENT IX-3 = I'm different from her.
E: CAR-A NEW, CAR-B OLD = The first car is new; the second is old.
E: COFFEE BETTER TEA = Coffee is better than tea.
E: MY BROTHER IX-1 SAME TALL = My brother and I are the same height.
M: Using a "than" sign. Comparison comes from the two locations and the sign.
M: Signing both things in the same spot, so the listener cannot tell them apart.
X: mcq How do you compare two things? ? add THAN | *give each its own place in space | repeat the sign | say it in English
X: mcq Which signs move between the two locations? ? BIG and SMALL | *SAME and DIFFERENT | HOT and COLD | MORE and LESS
X: fill COFFEE ___ TEA. (coffee is superior to tea) => BETTER
X: mcq Which handshape does SAME use? ? *Y-hand | B-hand | S-hand | 5-hand
## past-perfect | past-perfect | The past: FINISH and time markers | A2
S: ASL does not change the verb for the past. Use a time sign (YESTERDAY, LAST-WEEK) or FINISH after the verb.
B: Say when: **YESTERDAY IX-1 GO STORE.** Or mark completion with FINISH: **IX-1 EAT FINISH**. For "not yet", use NOT-YET (head tilt, tongue slightly out).
E: YESTERDAY IX-1 GO STORE = Yesterday I went to the store.
E: IX-1 EAT FINISH = I've eaten.
E: LAST-WEEK IX-1 SICK = Last week I was sick.
E: IX-1 EAT NOT-YET = I haven't eaten yet.
M: Looking for a past-tense ending. Use a time sign or FINISH instead.
M: Using FINISH for everything. A time sign is enough once it is set.
X: mcq How do you show past time? ? change the verb | *a time sign like YESTERDAY or FINISH | repeat the verb | point behind you only
X: mcq What does FINISH mark? ? future | *a completed action | a question | a negative
X: order Put in ASL order: Yesterday I went to the store => YESTERDAY IX-1 GO STORE
X: type Gloss for "I've eaten": => IX-1 EAT FINISH
## past-2 | past-2 | Telling a story in order: the time line | A2
S: Time flows along a line: the past behind you, the present near your body, the future in front. Sign events in the order they happened, and keep your time reference steady.
B: Start with a time sign: **LAST-YEAR IX-1 TRAVEL SPAIN.** Then continue in order. Words like FIRST, THEN, AFTER and FINALLY link events. If you change time, say so with a new time sign.
E: LAST-YEAR IX-1 TRAVEL SPAIN, FIRST MADRID, THEN BARCELONA = Last year I traveled to Spain, first Madrid, then Barcelona.
E: YESTERDAY MORNING IX-1 WAKE-UP, EAT, GO WORK = Yesterday morning I woke up, ate and went to work.
E: AFTER IX-1 HOME, SLEEP = Afterward I went home and slept.
E: FINALLY IX-1 ARRIVE = Finally I arrived.
M: Jumping around in time without a marker. Tell the events in the order they happened.
M: Using one time sign, then switching topic without resetting the time.
X: mcq Where is the past on the time line? ? in front | *behind | to the side | at the chest
X: mcq What should you do when the time changes? ? nothing | *sign a new time marker | change handshape | repeat the verb
X: order Put in ASL order: First Madrid, then Barcelona => FIRST MADRID, THEN BARCELONA
X: fill LAST-YEAR IX-1 TRAVEL SPAIN, ___ MADRID, THEN BARCELONA. => FIRST
## future-near | future-near | The future: WILL and time ahead | A2
S: The future is in front of you. TOMORROW and NEXT-WEEK move forward; WILL moves forward from the cheek. Often one time sign is enough.
B: **TOMORROW IX-1 GO STORE** or **IX-1 WILL GO STORE**. The farther the sign moves, the farther away the time can be. For something soon, use SOON.
E: TOMORROW IX-1 GO STORE = Tomorrow I'm going to the store.
E: NEXT-WEEK IX-1 WILL TRAVEL = Next week I'll travel.
E: IX-3 WILL ARRIVE SOON = He will arrive soon.
E: NEXT-YEAR IX-1 MARRY = Next year I'm getting married.
M: Using WILL and a time word every time. One is enough.
M: Using the past marker (YESTERDAY) by mistake. The future moves forward.
X: mcq Where is the future on the time line? ? behind | *in front | beside you | at the chin
X: mcq Which direction does NEXT-WEEK move? ? back | *forward | down | in a circle
X: fill ___ IX-1 GO STORE. (the day after today) => TOMORROW
X: type Gloss for "I'll travel next week": => NEXT-WEEK IX-1 WILL TRAVEL / IX-1 WILL TRAVEL NEXT-WEEK
## object-pronouns | object-pronouns | Setting up people in space and pointing back | A2
S: Give each person a spot in the signing space and point back to that spot. The pointing is your "him, her, them".
B: Place **MY MOTHER** on your left and **MY FATHER** on your right. Later, IX-left means "she" and IX-right means "he". Eye gaze toward the spot helps. Do not change a spot once you set it, or the listener will lose track.
E: MY MOTHER (left), MY FATHER (right), IX-left LOVE IX-right = My mother loves my father.
E: IX-left TEACHER, IX-right DOCTOR = She (the left one) is a teacher; he (the right one) is a doctor.
E: 1-HELP-left = I help her (the left one).
E: IX-left GIVE-right BOOK = She gives him a book.
M: Switching the spot for the same person. Use the same spot every time.
M: Not looking at the spot. Eye gaze shows who you mean.
X: mcq How does ASL say "him" or "her"? ? with a special sign | *by pointing back to the spot you set up | by changing handshape | with a headshake
X: mcq What should you do after you set a person's spot? ? change it | *keep using the same spot | erase it | ignore it
X: mcq MY MOTHER (left), MY FATHER (right). Which sign points to the father? ? IX-left | *IX-right | IX-1 | IX-2
X: type What kind of sign points back to a person's spot? => IX / pointing
## connectors-opinions | connectors-opinions | BUT, BECAUSE and rhetorical questions | A2
S: Join ideas with BUT and BECAUSE. A rhetorical question (a question you answer yourself, brows up) is a very common way to give reasons.
B: **BUT** (two index fingers cross and part) and **BECAUSE** (open hand from the forehead into a thumb-up) join clauses. A rhetorical question asks and answers: **IX-1 TIRED, WHY [rh]? STAY-UP-LATE.** Raise your brows on the question, then relax for the answer.
E: IX-1 WANT GO, BUT NO MONEY = I want to go, but I have no money.
E: IX-1 STAY HOME, BECAUSE SICK = I'm staying home because I'm sick.
E: IX-1 TIRED, WHY [rh]? WORK LATE = I'm tired. Why? I worked late.
E: IX-3 LATE, WHY [rh]? CAR BROKEN = She's late. Why? Her car broke down.
M: Using a flat face on a rhetorical question. It needs raised brows.
M: Using BECAUSE where a rhetorical question is smoother. Both are fine, but rhetorical is very natural.
X: mcq What is a rhetorical question? ? one you cannot answer | *one you ask and then answer yourself | one with a headshake | one that is rude
X: mcq Which sign joins a contrast? ? BECAUSE | *BUT | IF | WITH
X: fill IX-1 STAY HOME, ___ SICK. => BECAUSE
X: type Gloss for "I want to go, but I have no money": => IX-1 WANT GO BUT NO MONEY / IX-1 WANT GO BUT MONEY NONE
## conditionals | conditionals | IF: conditional sentences | B1
S: The IF clause is marked with raised brows and a slight head tilt; then relax your face for the result. Time stays in order: condition first, result second.
B: **IF TOMORROW RAIN [cond], IX-1 STAY HOME.** Hold the brows up through the whole IF clause and drop them for the result. {{nm=brows-up+tilt}} For unreal or wishful conditions, add a wistful face and "WISH".
E: IF TOMORROW RAIN [cond], IX-1 STAY HOME = If it rains tomorrow, I'll stay home.
E: IF YOU COME [cond], WE EAT = If you come, we'll eat.
E: IF MONEY HAVE [cond], IX-1 TRAVEL = If I had money, I'd travel.
E: IF SICK [cond], GO DOCTOR = If you're sick, go to the doctor.
M: Not raising the brows on the IF clause. Without the face, the two clauses do not link.
M: Putting the result first (English order). Condition first, result second.
X: mcq How is the IF clause marked? ? headshake | *raised brows and head tilt | furrowed brows | looking down
X: mcq Which order is correct? ? RESULT, IF CONDITION | *IF CONDITION, RESULT | RESULT only | CONDITION only
X: order Put in ASL order: If it rains I stay => IF RAIN, IX-1 STAY
X: fill ___ TOMORROW RAIN, IX-1 STAY HOME. => IF
## aspect | aspect | How an action unfolds: aspect and repetition | B1
S: ASL changes the movement of a verb to show how the action unfolds (again and again, for a long time, regularly) instead of changing the tense.
B: **Repeated:** repeat the verb with short movements (HELP++). **Continuous:** make the movement slow and circular, held for a long time (WAIT for a long time). **Regular/habitual:** a small repeated movement (EVERYDAY WALK). Facial expression adds the sense of effort or boredom.
E: IX-1 WAIT--long = I waited and waited.
E: IX-1 ASK++ = I asked and asked.
E: EVERYDAY IX-1 WALK-WALK = I walk every day.
E: IX-1 STUDY-continuous = I studied for a long time.
M: Adding extra words like "for a long time" when the movement already shows it.
M: Forgetting the face. Aspect needs the face to carry the meaning.
X: mcq How does ASL show a long action? ? add -ing | *a longer, slower movement of the verb | a headshake | a different sign
X: mcq What does repeating a verb show? ? negative | *repeated action | question | future
X: fill IX-1 ASK++ means "I asked ___ ". => and asked / again and again / over and over
X: type What carries the sense of effort or boredom in aspect? => face / facial expression
## topic-comment | topic-comment | Topic and comment, and sentence order | B1
S: ASL often states the topic first and then comments on it. Basic order can vary: topic, subject, verb, object, with time and place before the action.
B: Typical order: **TIME, TOPIC, COMMENT**: YESTERDAY STORE IX-1 GO. Objects can be topics: **COFFEE [t], IX-1 LIKE**. Keep your brows up through the topic and relax for the comment.
E: YESTERDAY STORE IX-1 GO = Yesterday I went to the store.
E: BOOK [t], IX-1 READ FINISH = I've read the book.
E: MY MOTHER [t], TEACHER = My mother is a teacher.
E: HOME [t], IX-1 GO NOW = I'm going home now.
M: Copying English order for every sentence.
M: Dropping the brow raise on the topic.
X: mcq What usually comes first? ? the verb | *the topic or time | the adjective | the question
X: mcq Which is a topic-comment sentence? ? IX-1 EAT APPLE | *APPLE [t], IX-1 EAT | EAT APPLE IX-1 | IX-1 APPLE EAT
X: order Put in ASL order: I have read the book => BOOK IX-1 READ FINISH
X: fill YESTERDAY ___ IX-1 GO. (the place I went) => STORE
## role-shift | role-shift | Role shift and constructed action | B2
S: To report what someone said or did, shift your body or gaze to "become" that person. Role shift is how ASL does direct and reported speech.
B: Turn your shoulders or eyes toward the spot of the person you are quoting and sign their words in their voice: **IX-3 SAY [role shift] "NO"**. Constructed action shows how they moved or looked. Return to your own position to leave the role.
B: Clear boundaries matter: shift into the role, perform it, then shift back. Do not blend two characters.
E: IX-3 TELL-1 [role shift] "YOU LATE!" = She told me, "You're late!"
E: MY BROTHER [role shift] "I TIRED" = My brother said, "I'm tired."
E: IX-1 ASK [role shift teacher] "YOU UNDERSTAND [yn]" = I asked, and the teacher replied, "Do you understand?"
E: IX-3 LAUGH-LAUGH [constructed action] = He laughed and laughed.
M: Using THEY SAY ... SAY ... for every line. Role shift replaces it.
M: Not moving your eyes or body, so the listener cannot tell who is speaking.
X: mcq What does role shift do? ? ends a sentence | *lets you "become" another person | changes the tense | shows a question
X: mcq How do you show who is speaking? ? repeat names | *shift body or eye gaze | headshake | wave
X: fill To leave a role, shift back to your own ___ . => position / place / spot
X: type Name the technique of "becoming" another person: => role shift / constructed action / referential shift
## classifiers | classifiers | Classifiers: showing things move | B2
S: Classifiers are handshapes that stand for a kind of thing: CL:1 a person, CL:3 a vehicle, CL:C a cup, CL:B a flat surface. You move them to show where things are and how they move.
B: The handshape tells you **what** (person, vehicle, cylinder); the movement and place tell you **where, how, and how much**. A car driving up a hill is CL:3 moving up a hill made by the other hand. Size and shape classifiers show width and thickness.
B: Describe the scene first with a regular sign (CAR), then switch to the classifier to show what happens. Keep the same space for the whole scene.
E: CAR, CL:3 DRIVE-UP-HILL = A car drives up a hill.
E: MAN, CL:1 WALK-ACROSS = A man walks across.
E: TABLE CL:B FLAT, CUP CL:C ON-TABLE = The table is flat and a cup is on it.
E: PEOPLE CL:5 GATHER = A crowd gathers.
M: Using a regular sign for every detail. Classifiers show action and space more clearly.
M: Mixing classifier handshapes in one scene without keeping the spots consistent.
X: mcq Which classifier shows a vehicle? ? CL:1 | *CL:3 | CL:C | CL:B
X: mcq What does the movement of a classifier show? ? tense | *where and how something moves | negation | a question
X: fill CL:___ stands for a person (index finger). => 1
X: type Which classifier shows a cup? => CL:C / C
## fingerspelling | fingerspelling | Fingerspelling and lexicalized signs | B2
S: Fingerspelling is for names and words with no sign. Read it as a word shape, not letter by letter, and sign it smoothly in one spot. Some frequent words become lexicalized signs (#JOB, #BACK, #OK).
B: Keep your hand steady near the shoulder, palm out, and let the letters flow with small movements. Pause between words, not letters. Double letters (L-L) are signed with a small bounce or slide.
B: Lexicalized fingerspelling such as **#JOB, #BACK, #OK** blends letters into one sign. Learn them as signs, not as spellings.
E: MY NAME fs-ANA = My name is Ana.
E: IX-1 HAVE NEW #JOB = I have a new job.
E: IX-1 #BACK TOMORROW = I'll be back tomorrow.
E: #OK, IX-1 UNDERSTAND = OK, I understand.
M: Spelling every word. Use the sign when one exists.
M: Spelling letter by letter with big pauses. Smooth, even rhythm makes it readable.
X: mcq Where do you keep the hand when fingerspelling? ? at the waist | *steady near the shoulder | moving across the body | behind you
X: mcq What is #JOB? ? a rude sign | *a lexicalized fingerspelling | a number | a classifier
X: fill Names are usually ___ . => fingerspelled / spelled
X: type Name a lexicalized fingerspelling meaning "come back": => #BACK
## mouth-morphemes | mouth-morphemes | Mouth morphemes and non-manual adverbs | C1
S: Mouth shapes, eyebrows, cheeks and the head add meaning that the hands do not: size, manner, intensity, effort. They are part of grammar, not decoration.
B: Common patterns: **cha** (mouth open wide) for something large; **oo** (small round lips) for thin or tiny; **th** (tongue slightly out) for careless or awkward; **mm** (lips pressed) for ordinary, comfortable; **puffed cheeks** for large or much. Eyebrows up marks questions or topics; down marks WH-questions and negative feeling.
B: Practise in a mirror: sign WALK with each mouth shape and watch the meaning change. {{nm=th}}
E: WALK-th = walk carelessly
E: WALK-mm = walk comfortably, easily
E: HOUSE BIG-cha = a huge house
E: STRING THIN-oo = a very thin string
M: Using the same neutral face for every adverb.
M: Mouthing English words instead of using ASL mouth shapes. Mouthing is useful for names but not for adverbs.
X: mcq Which mouth shape means "careless"? ? cha | *th | oo | mm
X: mcq Which mouth shape means "very large"? ? oo | th | *cha | mm
X: fill WALK with "mm" means walk ___ . => comfortably / easily / normally
X: type What does "oo" add to a sign? => thin / small / tiny
## register | register | Register, variation and contact signing | C1
S: ASL varies by region, age, ethnicity and formality. Formal ASL uses larger, slower signs and careful grammar; casual ASL is smaller and faster. Contact signing mixes ASL and English.
B: **Regional signs** differ (sign for BIRTHDAY, SOON, PIZZA, and many others). **Black ASL** is a distinct variety with its own history; do not treat it as an error. **Contact signing** (sometimes called PSE) follows English order with ASL signs; it is common when Deaf and hearing people meet.
B: Match your register to the setting: formal presentations use full signs and clear grammar; friends use smaller signs and shortcuts. Ask which signs the person uses; do not correct variation as wrong.
E: BIRTHDAY (regional variations) = The sign for BIRTHDAY varies by region.
E: IX-1 LEARN SIGN-ASL, WANT IMPROVE = I'm learning ASL and want to improve. (formal)
E: ME WANT GO FOOD = Contact signing (English word order)
E: IX-1 STUDY SIGN, CAN'T FAST = I study signing but can't sign fast.
M: Assuming one sign is "the" ASL sign for a word.
M: Correcting a Deaf person's regional or cultural variation.
X: mcq What is contact signing? ? a rude sign | *ASL signs in English word order | spoken Spanish | fingerspelling only
X: mcq Why do signs differ across regions? ? mistakes | *language varies naturally | learning errors | no reason
X: fill Formal ASL is signed larger and ___ . => slower / more slowly
X: type Name one thing ASL varies by: => region / age / ethnicity / formality / class
## discourse | discourse | Discourse: cohesion, repair and turn-taking | C1
S: Skilled signers keep a conversation clear: they hold referents steady, use eye gaze to signal turns, repair misunderstandings and show attention with small head nods.
B: **Turn-taking:** hold your hands up to keep the floor; lower them (or look away) to yield. Eye contact means "I'm listening". **Repair:** if the listener frowns or tilts, repeat with a different sign or fingerspell. **Cohesion:** keep spots and time references steady; use pointing to link back.
B: Feedback signals include nodding, a small "YES", raised brows (surprise), or a quick "UNDERSTAND". Silence is not a good sign; give feedback.
E: IX-1 REPEAT [wh] = Can I repeat that?
E: YOU UNDERSTAND [yn] = Do you understand?
E: IX-1 SORRY, SIGN SLOW = Sorry, I'm signing slowly.
E: IX-1 CLEAR [yn] = Is that clear?
M: Looking at your hands instead of the other person's face.
M: Staying silent when you understand. Give small nods.
X: mcq What do small nods show? ? disagreement | *attention and understanding | boredom | rudeness
X: mcq How do you keep the floor? ? look away | *keep your hands up | close eyes | wave
X: fill Eye gaze shows who has the ___ . => floor / turn
X: type What should you do if your partner frowns? => repeat / rephrase / fingerspell
## storytelling | storytelling | Storytelling, rhythm and sign play | C2
S: ASL storytelling uses classifiers, role shift, rhythm and handshape play to make an image appear. Poetry and humor use the language's own materials: movement, symmetry, repetition, and handshape rhyme.
B: **Narrative:** set the scene with a wide establishing view, then move in with role shift and classifiers. **Rhythm:** repeat movement patterns for effect. **Handshape rhyme:** choose signs that share a handshape. **Humor:** many jokes use handshape or sign play that does not translate.
B: Watch Deaf storytellers and Deaf poets in video. Their performance is the best teacher for this level.
E: SCENE CL:1 WALK, CL:3 DRIVE, ROLE-SHIFT TEACHER [role shift] = A scene told with classifiers and role shift.
E: HANDSHAPE-RHYME BIRD, BOY, BOOK = signs that share a handshape
E: REPEAT-MOVEMENT PATTERN = a rhythm for emphasis
E: DEAF STORYTELLER ROLE-SHIFT [role shift] = a storyteller performing characters
M: Translating an English story word for word. Tell it visually.
M: Relying only on gloss. Poetry and storytelling are visual art, so watch video.
X: mcq What makes a handshape rhyme? ? sound | *signs sharing a handshape | rhymes in English | fingerspelling
X: mcq What best teaches ASL storytelling? ? gloss text | *watching Deaf storytellers | memorizing lists | typing
X: fill ASL poetry uses movement, symmetry and ___ . => repetition / handshape / rhythm
X: type What device lets a storyteller become several characters? => role shift
## deaf-culture | deaf-culture | Deaf culture and etiquette | C2
S: ASL is part of Deaf culture: Deaf (capital D) people share a language, history and values. Good etiquette includes eye contact, clear lighting, direct communication and respect for Deaf-led choices.
B: **Respect:** speak to the Deaf person, not the interpreter. **Space:** keep a clear line of sight and good lighting. **Directness:** Deaf culture often values direct, honest communication. **Names:** a Deaf community gives name signs; hearing learners wait to be given one.
B: Learn from Deaf teachers and community events. Many Deaf-led organizations offer classes, and a native signer is the best check on accuracy.
E: TALK DEAF PERSON, NOT INTERPRETER = Talk to the Deaf person, not the interpreter.
E: LIGHT GOOD, SEE EASY = Good lighting helps people see.
E: NAME-SIGN DEAF GIVE = Name signs are given by Deaf people.
E: DEAF CULTURE RESPECT = Respect Deaf culture.
M: Giving yourself a name sign. Wait for the community to give you one.
M: Talking to the interpreter instead of the Deaf person.
X: mcq Who gives a name sign? ? you | *the Deaf community | an interpreter | a teacher only
X: mcq Who should you speak to when an interpreter is present? ? the interpreter | *the Deaf person | nobody | the teacher
X: fill A capital-D Deaf person belongs to Deaf ___ . => culture / community
X: type Why does lighting matter? => to see / visibility / sign is visual
`;
