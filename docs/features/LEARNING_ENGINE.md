# Learning engine and question selection

Updated17 November2026. This document implements the current learning-engine decision in [full_prompt.md](../../full_prompt.md). The bank remains300 original items in public/questions.json; this change edits no question IDs,versions,answers or content.

## Selection contract

public/js/question-selection.js is a pure scheduling/evidence module. api.js first verifies the selected learner and applies existing subject,topic,Level,Challenge and explicit-question filters. Non-Daily starts fetch completed attempts through the existing owner-and-student Firestore query. Failure to fetch history is a visible start error,not silent fabricated progress. No privileged SDK,new collection or cross-family data is used. This adds a history read per non-Daily start; large-history pagination remains future work.

1. Deduplicate candidate IDs and reject insufficient matching questions without relaxing filters.
2. Allocate approximately equal subject quotas across available subjects; redistribute capacity shortages. A remainder is randomly assigned. This guarantees balanced counts where capacities allow,not a universal official exam blueprint.
3. For each subject quota of at least3,reserve up to max(1,floor(quota*0.3)) slots for due errors. A latest saved incorrect or unanswered outcome is due at least24hours after its attempt date. A later correct outcome removes the item from this queue. Quotas1?2 reserve no review slots.
4. Fill remaining slots with unseen IDs first,then other due errors,then least recently encountered items. Unseen means no completed-attempt snapshot for that learner; seeing a Bank Soalan page or an abandoned draft does not count. A question version change under the same stable ID is not a new unique question.
5. Prefer less represented Levels within each eligible priority group. This is best-effort balance subordinate to filters,history priorities and capacity,not an exact equal-Level guarantee. Explicit Level selection stays unchanged. No automatic difficulty escalation is claimed.
6. Shuffle final presentation order. No ID repeats inside a set. A small/exhausted filtered pool can repeat recent items before24hours to fulfil the requested count; the setup notice explains this soft-gap fallback.

The24-hour gap and approximately30% review share are configurable product defaults in code,not verified pedagogical optimal values or admission-test rules. Wrong answers do not instantly reappear while unseen eligible questions and quotas remain available. Selection is practice scheduling,not AI generation or a validated adaptive assessment model.

Daily Challenge deliberately bypasses personal history and retains the existing Malaysia-date hashed8-item shared set:3 English,3 Mathematics,2 Science. Repeated Daily rewards remain limited once per date. Practice feedback,first checked answer scoring,gold review flags,timers,immutable save/retry and attempt snapshots remain unchanged.

## Progress evidence

quiz-engine.js keeps existing equal-attempt mean,best score,rewards,all-answer subject bars and complete history. learningEvidence adds:

- unique:distinct recorded question IDs across completed attempts,including blank answers.
- repeated:total answer snapshots minus distinct IDs.
- first accuracy:correct on the earliest recorded encounter per ID,including blanks as incorrect.
- repeat accuracy:correct across all later snapshots; null when no repeats.
- outcomes:all saved correct,incorrect nonblank,and unanswered counts.
- uniqueTopics:latest outcome per distinct ID grouped by topic.

Focus recommendations now require at least3 unique IDs and latest-outcome accuracy below60%; strongest topics require at least3 unique IDs and at least80%. Focus sorts lower accuracy first,then larger samples. Repeating one question three times cannot qualify it. Both Dashboard focus and PDF focus use these same unique-topic semantics; the PDF's full topic/subject breakdown still includes all snapshots and explicitly states the difference. No historic attempt is rewritten,no score is changed,and these indicators do not measure memorisation or predict admission. Earliest/latest are based on client-recorded attempt dates,not tamper-proof timestamps.

## Verification

Unit fixtures cover unseen priority,due/recent errors,latest correction,learner isolation,subject/Level balance,filtered shortages,oldest fallback,insufficient pools,unique/repeated/blank denominators,minimum-unique topic evidence and empty states.

npm run test:selection:ui uses disposable demo Auth/Firestore and isolated Chrome:two Mathematics attempts produce3 due plus7 unseen selections,17 unique IDs/3 repeats,first-correct7/repeat100%,10 blanks,sibling isolation,4/4/4 mixed selection,unchanged shared Daily sets and Dashboard reload/mobile overflow checks. No real child's records are needed. Tests demonstrate behavior,not educational calibration. See [executed evidence](../testing/VALIDATION.md).
