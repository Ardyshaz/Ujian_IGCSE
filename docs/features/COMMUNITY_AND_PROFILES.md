# Bintang Pembelajaran and family profile editing

Updated18 November2026. Authority:[full_prompt.md](../../full_prompt.md). The app remains a static Firebase SPA. A privileged CLI maintenance job publishes consented projections;no deployed backend,new billing service or client admin credential is introduced.

## Family profile editing

Edit profil appears under Profil keluarga in the sidebar and in the existing profile modal. It edits the selected profile's display nickname,optional guardian label,year,school and state/wilayah. All members using the same Anonymous browser identity can manage that family's profiles;this is not a separate login per child. Options cover Darjah1-6,Tingkatan1-5,Other and16 Malaysian states/federal territories;unknown/blank state remains optional. Existing records without state remain valid.

Only owner-scoped students fields display_name,guardian_name,year_level,school_name,state may change. ID,ownerId and createdAt cannot be altered. Server rules validate lengths and allowed state values. Existing attempts and their immutable IDs/scores are not rewritten. The UI refreshes the family display after save and shows an error if saving fails. Nicknames suffice;school/state are optional and can be cleared. JSON exports include the private profile;PDF uses current year labels and a private school/state field. These fields never enter community projections.

## Participation and public data

Bintang Pembelajaran is an optional Home section with five Top5 categories:Peneroka Soalan,Konsisten Belajar,English,Mathematics,Science. Clicking a published card opens a limited weekly achievements popup. No existing student is enrolled automatically,including a profile whose name was changed by its guardian. With no opt-ins the actual public list is empty;never seed fake students or publish previously private names to fill it.

Urus penyertaan requires a selected family profile,a separately entered2-24-character public alias and an unchecked guardian-declaration checkbox. It explains that the alias,weekly ranks,unique-question count,active-day count and eligible subject summaries become visible to everyone,including earlier work in the current week. The private profile name is never prefilled. Email/phone-like aliases are rejected and the publisher revalidates aliases. This declaration does not verify a guardian's identity. Participation does not require Analytics consent,and no new Analytics event is emitted.

Collection boundaries:

| Collection | Data | Client rights |
|---|---|---|
| students | Existing family profile plus optional state | Owner read/create/update-limited/delete |
| hallConsents/{studentId} | ownerId,random publicId,alias,version1,guardianConfirmed,server createdAt | Owner get/create atomically/delete atomically;no list/update |
| hallOwners/{publicId} | Private ownerId/studentId mapping and server createdAt | Owner get/create atomically/delete atomically;no list/update |
| hallEntries/{publicId} | Only alias,weekStart,uniqueQuestions,activeDays,subjects,ranks,publishedAt,expiresAt | Public get/bounded list (limit<=30);no client create/update;owner atomic withdrawal only |

Existing students,attempts and feedback never become public. Public entries contain no Firebase owner UID,student/profile ID,school,state,guardian,answer,question ID or attempt history. The random document ID is a separate public handle,not an authentication identity. Subjects with fewer than30 eligible first encounters publish count only;correct/accuracy are null. Public lists contain at most25 unique cards from five categories.

## Ranking method

Week:Monday00:00 through the next Monday00:00 in Asia/Kuala_Lumpur. The admin job uses Firestore's server createdAt rather than a client's attempt date. It only accepts known published bank IDs with matching version and subject,recomputes correctness against the authoritative current bank keys,and deduplicates IDs. Unknown/mismatched versions are excluded;historic snapshots are not changed.

Peneroka Soalan counts distinct valid IDs encountered during the week. Repeats within that week add no exploration credit. Konsisten Belajar counts distinct submission days,not number of quizzes. Subject accuracy requires at least30 questions first encountered across the learner's entire recorded history during the current week;repeating a question from an earlier week cannot turn it into new first-encounter evidence. Wrong and blank first answers remain incorrect even if a repeat is correct.

Sort by the category metric descending,then weekly unique count,active days and opaque public ID for a stable tie break. Take at most5 per category. Minimum30 and weekly windows are explicit product defaults,not calibrated educational standards. Different Levels and limited exposure still affect comparisons. Questions/answer keys and grading are client-accessible:recomputation rejects malformed scores but cannot prove independent work or prevent all gaming. Labels say self-directed practice,not official/verified assessment or admission prediction. Learners who have exhausted the existing bank may qualify for exploration/consistency rather than another week's new-question accuracy ranking.

## Publication and withdrawal

MVP publication is manual admin maintenance,not automatic after a quiz. Use existing authorised Firebase CLI IAM locally:

    npm run hall:preview
    npm run hall:publish

Preview writes only ignored .local/reports/hall-preview.json;review aliases/aggregates before publication. The publisher reads consent/private ownership mappings and owner IDs (not private names/schools/states),validates matching owners,and writes an allowlisted replacement projection. One atomic commit verifies consent,mapping and profile updateTime values before publishing. A withdrawn/changed enrollment causes the stale commit to fail,preventing republishing by a concurrent old job. The current-week job also removes stale entries. Do not copy tokens,preview data or service credentials into public or Git. --emulator explicitly targets demo-kuiz-igcse on localhost for tests.

Run the job after reviewing new opt-ins and periodically during the week;weekly refresh removes older public projections. No scheduled job,automatic TTL deletion or guaranteed refresh interval is configured. The UI hides expired/other-week cards,but public documents remain readable until withdrawn or removed by maintenance. No legal retention guarantee is claimed. Scheduling a trusted hosted publisher is a future separately reviewed operational/billing decision.

Withdrawal atomically deletes the public card,private mapping and consent. It works even before publication. Rejoining uses a new public handle;changing the alias requires withdrawal and re-enrollment. Profile deletion withdraws first;rules prevent deleting an enrolled profile while leaving its consent. Already viewed/cached/screenshotted or backed-up copies cannot be recalled. Losing the Anonymous browser identity may require authorised admin assistance;the existing account-recovery limitation remains. Admin cleanup must remove all three linked Hall documents and rerun publication;do not weaken private collection rules.

## Acceptance and remaining work

Unit tests cover Malaysia week boundaries,explicit consent/ownership,Top5 limits,30-item eligibility,repetition/first-encounter semantics,bank/version/key validation,private field exclusion and profile validation.39 additional actual emulator rules assertions cover owner edits,immutable fields,private collection denial,atomic consent/withdrawal,public list limits,no client score writes,unpublished withdrawal and delete cleanup. Browser QA uses only synthetic demo data to edit a profile,preserve an attempt,enroll,publish via the real CLI implementation,open categories/details,withdraw,reject stale publishing,and delete an enrolled profile;mobile no-overflow and PDF/JSON regressions are separate evidence. See [validation](../testing/VALIDATION.md).

Open:verified recoverable guardian accounts,stronger abuse/App Check measures,independent fairness/accessibility review,physical-device tests and a reviewed publication schedule. No production child is opted in as a QA fixture.

Official rule/atomic-write references reviewed18 November2026:[Firestore conditions](https://firebase.google.com/docs/firestore/security/rules-conditions),[REST Write/preconditions](https://firebase.google.com/docs/firestore/reference/rest/v1/Write).
