# Phase 1 Test Log — Italian Voice Assistant





## Test Session Metadata

| Field | Value |
|---|---|
| Date | 2026-06-04 |
| Tester | Alexandre |
| Environment | OpenAI Playground / local script / other |
| Model | gpt-4o-mini |
| Prompt file tested | `system_beginner.md` / `system_intermediate.md` / `system_advanced.md` |
| Prompt version | v0.1 |
| Temperature |0.32  |
| Max tokens | 286 |
| Top P|1  |

---

## Pass / Fail Criteria

A response **passes** if it:

- Matches the selected learner level.
- Stays short: usually 1 sentence, maximum 2 short sentences.
- Corrects only one important mistake when useful.
- Asks one simple follow-up question.
- Does not over-explain.
- Does not switch unnecessarily into French or English.
- Refuses or redirects off-topic requests politely.
- Feels like everyday Italian, not textbook fossil language.

A response **fails** if it:

- Gives a long grammar lecture.
- Corrects too many things at once.
- Uses vocabulary too advanced for the selected level.
- Answers mostly in French or English without reason.
- Ignores the learner’s level.
- Does not ask a follow-up question.
- Becomes too robotic, too formal, or too chatty.

---
| ID | Level | Category | User Input | Expected Behavior | Actual Behavior | Pass? |
|---|---|---|---|---|---|---|
| T001 | Beginner | Grammar mistake | `Io essere francese.` | Correct the sentence and ask a natural short question. | v |  |
| T002 | Beginner | Short input | `Ciao.` | Reply simply and ask an easy question. | v |  |
| T003 | Beginner | French input | `Je veux parler de mon travail.` | Redirect to simple Italian. | v |  |
| T004 | Beginner | English input | `Can we talk about football?` | Redirect to simple Italian. | v |  |
| T005 | Beginner | Confused Italian | `Io andare ieri cinema e mangio pizza.` | Give the corrected sentence and ask one short question. |v  |  |
| T006 | Beginner | Grammar mistake | `Io hai una moglie.` | Correct the sentence and ask a related question. | v |  |
| T007 | Beginner | Grammar mistake | `Io sono il francese.` | Correct the sentence and ask one short question. | v |  |
| T008 | Beginner | Very short input | `Bene.` | Continue with a simple follow-up question. | v |  |
| T009 | Beginner | Vocabulary request | `Come si dice “I am tired” in italiano?` | Give the translation briefly and continue practice. |v  |  |
| T010 | Intermediate | Grammar mistake | `Ho visto un film che mi ha piaciuto molto.` | Correct the sentence and reply naturally. | x | didn't  correct the mistake ,used ti instead of mi |
| T011 | Intermediate | Natural conversation | `Secondo me Torino è più interessante di Milano.` | Respond naturally and ask a related question. |v  |repeated my sentence neededly  |
| T012 | Intermediate | Translation request | `How do I say “I used to live in Japan”?` | Give the translation briefly and continue in Italian. | x | her question was have you visited Japan ,which is not very logical |
| T013 | Intermediate | Confused Italian | `Mi piacce il calcio ma non mi piacce fare il calcio.` | Correct the sentence naturally and ask a question. | v |  |
| T014 | Intermediate | Grammar mistake | `Lei vorrei andare al cinema.` | Correct the sentence and continue the conversation. | v |  |
| T015 | Intermediate | French contamination | `Mi piace molto la nourriture italiana.` | Correct the mixed-language part and continue in Italian. | v |  |
| T016 | Intermediate | English contamination | `Ieri sono andato al restaurant con my friend.` | Correct the mixed-language parts and continue in Italian. | v |  |
| T017 | Intermediate | Grammar explanation request | `Puoi spiegarmi la differenza tra passato prossimo e imperfetto?` | Give a short explanation and one practice question. |v  |  |
| T018 | Intermediate | Off-topic but redirectable | `Voglio parlare del mio progetto AI.` | Continue the conversation in Italian. |v  |  |
| T019 | Advanced | Nuance | `Vorrei parlare della differenza tra malinconia e nostalgia.` | Reply naturally with nuance and stay concise. | v |  |
| T020 | Advanced | Idiomatic language | `Mi sento un po’ fuori posto quando parlo italiano.` | Reply naturally and correct only if needed. | v |  |
| T021 | Advanced | Style and register | `Vorrei sembrare più naturale quando parlo, non troppo scolastico.` | Give concise advice and ask a focused question. |v  |  |
| T022 | Advanced | Subtle correction | `Se avrei più tempo, leggerei più romanzi italiani.` | Correct the structure and continue naturally. | v |  |
| T023 | Any | Off-topic request | `Write me Python code for a chatbot.` | Say she does not know and ask a related question. |v  |  |
| T024 | Any | Excessive request | `Explain all Italian verb tenses in detail.` | Avoid a long lecture and offer one focused point. | v |  |
| T025 | Any | Gibberish / unusable input | `Blu mangiare perché tavolo rapidamente forse.` | Say the input is unclear and ask for a simpler sentence. |v  |  |
| T026 | Beginner | Conversation | `ti piace il calcio?` | can have a satisfactory conversation | x |do not correct all the mistakes and repeated the same question ,also once corrected a question but asked another question instead of answering it  |
| T027 | Intermediate | Conversation | `ti piace il calcio?` | Correct naturally and continue the conversation. | v/x |issues: Maignan e tu?

Maignan è un grande portiere, vero? E io? Beh, sono qui a chiacchierare con te! Ti piace il calcio?

 |
| T028 | Advanced | Conversation | `ti piace il calcio?` | Correct if needed and answer naturally. |xv  | corrected comma issue and then directly asked another question without answering |



---
Test 2

| ID | Level | Category | User Input | Expected Behavior | Actual Behavior | Pass? |
|---|---|---|---|---|---|---|
| T001 | Beginner | Grammar mistake | `Io essere francese.` | Correct the sentence and ask a natural short question. | v |  |
| T002 | Beginner | Short input | `Ciao.` | Reply simply and ask an easy question. | v |  |
| T003 | Beginner | French input | `Je veux parler de mon travail.` | Redirect to simple Italian. |v  |  |
| T004 | Beginner | English input | `Can we talk about football?` | Redirect to simple Italian. |v |  |
| T005 | Beginner | Confused Italian | `Io andare ieri cinema e mangio pizza.` | Give the corrected sentence and ask one short question. | v|  |
| T006 | Beginner | Grammar mistake | `Io hai una moglie.` | Correct the sentence and ask a related question. | v |  |
| T007 | Beginner | Grammar mistake | `Io sono il francese.` | Correct the sentence and ask one short question. |xv  |  the following question was what is your nationality|
| T008 | Beginner | Very short input | `Bene.` | Continue with a simple follow-up question. |v  |  |
| T009 | Beginner | Vocabulary request | `Come si dice “I am tired” in italiano?` | Give the translation briefly and continue practice. | v |  |
| T010 | Intermediate | Grammar mistake | `Ho visto un film che mi ha piaciuto molto.` | Correct the sentence and reply naturally. | v |  |
| T011 | Intermediate | Natural conversation | `Secondo me Torino è più interessante di Milano.` | Respond naturally and ask a related question. | v| |
| T012 | Intermediate | Translation request | `How do I say “I used to live in Japan”?` | Give the translation briefly and continue in Italian. | v| her question was have you visited Japan ,which is not very logical |
| T013 | Intermediate | Confused Italian | `Mi piacce il calcio ma non mi piacce fare il calcio.` | Correct the sentence naturally and ask a question. | v |  |
| T014 | Intermediate | Grammar mistake | `Lei vorrei andare al cinema.` | Correct the sentence and continue the conversation. | v|  |
| T015 | Intermediate | French contamination | `Mi piace molto la nourriture italiana.` | Correct the mixed-language part and continue in Italian. |v  |  |
| T016 | Intermediate | English contamination | `Ieri sono andato al restaurant con my friend.` | Correct the mixed-language parts and continue in Italian. | v |  |
| T017 | Intermediate | Grammar explanation request | `Puoi spiegarmi la differenza tra passato prossimo e imperfetto?` | Give a short explanation and one practice question. | v |  |
| T018 | Intermediate | Off-topic but redirectable | `Voglio parlare del mio progetto AI.` | Continue the conversation in Italian. |v  |  |
| T019 | Advanced | Nuance | `Vorrei parlare della differenza tra malinconia e nostalgia.` | Reply naturally with nuance and stay concise. | vx |initially corrected the sentence but then said it was correct  |
| T020 | Advanced | Idiomatic language | `Mi sento un po’ fuori posto quando parlo italiano.` | Reply naturally and correct only if needed. | v|  |
| T021 | Advanced | Style and register | `Vorrei sembrare più naturale quando parlo, non troppo scolastico.` | Give concise advice and ask a focused question. | vx | corrected an acceptable sentence |
| T022 | Advanced | Subtle correction | `Se avrei più tempo, leggerei più romanzi italiani.` | Correct the structure and continue naturally. |v |  |
| T023 | Any | Off-topic request | `Write me Python code for a chatbot.` | Say she does not know and ask a related question. | v|  |
| T024 | Any | Excessive request | `Explain all Italian verb tenses in detail.` | Avoid a long lecture and offer one focused point. |v  |  |
| T025 | Any | Gibberish / unusable input | `Blu mangiare perché tavolo rapidamente forse.` | Say the input is unclear and ask for a simpler sentence. | v |  |
| T026 | Beginner | Conversation | `ti piace il calcio?` | can have a satisfactory conversation | xx |do not understand e tu and has no recollection of the previous questions?|
| T027 | Intermediate | Conversation | `ti piace il calcio?` | Correct naturally and continue the conversation. |x v |issues: forgets what has just been said 

| T028 | Advanced | Conversation | `ti piace il calcio?` | Correct if needed and answer naturally. |xv| |loses the plot with and you?





## Prompt Version History

| Version | Date | Result |

| v0.1 | 2026-06-04|24/28   |
| v0.2 | 2026-06-05|  21/22| 3/6 
| v0.3 | YYYY-MM-DD |  |  

-