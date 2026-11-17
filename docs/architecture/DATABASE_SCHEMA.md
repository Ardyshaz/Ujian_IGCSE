# Firestore schema

No active SQL schema/migration. Preserve existing SQLite privately; archived schema is in .local/archive/document-history/pre-firebase.

`students/{uuid}`: id, ownerId (Firebase Auth UID), display_name (1?60), guardian_name (optional 0?60), year_level (0?30), school_name (optional 0?100), createdAt (server Timestamp). UI collects nickname, not legal identity. Rules permit owner create/read/delete; profile editing is not in this MVP.

`attempts/{quizId}`: id = quizId, ownerId, studentId, subject (english/mathematics/science/mixed), mode, score = percentage (0?100), date (client ISO), createdAt (server receipt Timestamp), startedAt (client milliseconds), duration (seconds), dailyDate nullable, status submitted/expired, total/correct/incorrect/unanswered, category, answers array. Each answer contains full question/version/explanation snapshot, supplied answer, correctness/unanswered/flagged/assisted and answeredAt. Total <=50. Scores are self-reported practice data.

Use one immutable document per finalized quiz. A transaction first reads deterministic attempt ID, creates only if absent, returns existing result on retry. Firestore 1MiB per-document limit applies; current content and 50-question cap must remain within it. Do not grow unlimited essay/media payloads in answers.

Owner queries: students where ownerId==uid; attempts where ownerId==uid and studentId==selected. No public collection listing. Basic equality queries use automatic indexes; answers array indexing disabled to reduce index growth. No count/average stored in separate mutable counters; compute from queried attempts. Pagination/aggregation is a scaling follow-up, not an MVP claim.

Draf: browser localStorage igcse-drafts:{uid}; not a Firestore collection. Clearing site data can orphan cloud records by losing Anonymous identity. Cascading deletion is explicit: delete attempts in batches up to400, then profile last; partial failures are retried. Old backups/exports are not automatically erased.


## Private feedback

Private feedback: a Maklum Balas footer button opens a BM form (category, optional nickname,5-2000-character comment). Store in feedback with Anonymous ownerId and server timestamp; no student profile, email or contact required. No web client may get/list/update/delete comment content, including its sender. Only project staff granted Firestore IAM access read/manage it through Firebase Console; no public admin panel, client-side admin password or hardcoded admin UID. Atomic feedbackRateLimits receipts enforce one submission per UID per60seconds using server time and support idempotent acknowledgement retries without exposing content. This is a basic per-identity limit, not comprehensive anti-abuse; App Check/stronger abuse controls remain roadmap work. Do not persist comment drafts to browser storage. Admin procedure: docs/FEEDBACK_ADMIN.md.


## Community/profile decision -18 November2026

The owner authorised optional Home Bintang Pembelajaran (Top5 exploration,consistency and three subject categories) and private family profile editing,including year,school and state. Explicit guardian-directed alias opt-in is required;existing learners are not automatically published. A privileged local CLI admin job publishes allowlisted weekly aggregates into hallEntries,while hallConsents/hallOwners and all profiles/attempts stay owner-private. Publication is manual;withdrawal/deletion is immediate and atomic in Firestore,with stale-publisher preconditions. Subject ranks require30 current-week lifetime-first encounters and use bank-verified answers/server recording times. This remains self-directed practice,not verified assessment. Owner profile updates cannot change IDs,owner or creation time;school/state remain optional/private. docs/features/COMMUNITY_AND_PROFILES.md from the repository root specifies schema,thresholds,rights,operations and limits. This narrowly supersedes older no-public-leaderboard/no-profile-update statements;it does not authorise publishing existing private names or histories.
