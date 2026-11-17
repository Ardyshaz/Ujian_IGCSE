# Engineering and data rules

1. full_prompt.md is authoritative. Preserve the original1370-line archive unchanged and do not drop requirements from its educational scope.
2. Use public as the deployment surface. No Express, SQLite, privileged token or service-account credential in active frontend code.
3. Protect owner identity in rules, validate record shape/count/range, require server receipt timestamps and keep finalized attempts immutable. Scores themselves are self-reported client practice data.
4. Use deterministic attempt IDs, transaction retry, visible acknowledgement/error states and a bounded save wait. A timeout does not cancel a write that may still commit; retries must remain idempotent.
5. Preserve first checked Practice answer, exact question/version snapshots, automatic review flags, unanswered counts and clear explanations. Do not expose Practice feedback during exam modes.
6. Read learner records from Firestore for history/progress/export; no fabricated local counters or cross-learner export. Keep browser draft limitations explicit.
7. Feedback comments are client-create-only. Do not open reads to authenticated users to build an admin interface; authorised project maintainers use Console/IAM. Enforce atomic receipts/cooldown and document retention limits.
8. Collect minimal child data. Keep slips, full identities, source dossiers, old databases, logs, private reports and credentials under ignored local storage. Do not upload them to Git or Hosting.
9. Use original questions and official research sources. Record uncertainty, copyright boundaries, primary/bridge alignment and independent moderation limits. No unsupported admissions/format/grade guarantees.
10. Keep exact agreed donation/disclaimer copy, BM UX, useful English terms, responsive footer spacing, accessible controls and private PDF/JSON exports.
11. Test changes appropriately and report actual scope. Preserve vendor licenses. Do not claim physical Android testing from browser emulation or public readiness from a passing unit test alone.
12. Update affected documentation and the roadmap. Publishing GitHub does not automatically authorize Firebase deployment or paid services.

[Privacy](../operations/PRIVACY_AND_SECURITY.md) | [Implementation contract](../architecture/IMPLEMENTATION_CONTRACT.md) | [Test guide](../testing/README.md).


## Optional Analytics update - 16 November 2026

The user authorised GA4 integration for the linked kuiz-igcse property. It supersedes earlier blanket no-Analytics instructions only when explicitly enabled and consented. Follow docs/features/ANALYTICS.md from the repository root: default off,no SDK before guardian opt-in,strict event/URL allowlists,no learner IDs/names/scores/answers/comments/filenames,ads/signals disabled and reversible browser choice. Enhanced Measurement OFF confirmation is required before activation. Source implementation and mocked privacy tests do not establish live collection or GA4 ingestion.


## Learning engine update -17 November2026

Non-Daily sets now use owner/learner completed history to prioritise unseen IDs,include a limited due-error review share after24hours,and balance subjects/Levels where candidate capacity permits. Small filtered banks use an explicitly disclosed oldest-first fallback. Daily sets stay shared and date-based. Dashboard and PDF focus require3 unique IDs and latest outcomes; first-encounter versus repeat accuracy is separate from unchanged all-answer subject statistics and equal-attempt quiz means. Historic records and bank content are unchanged. See docs/features/LEARNING_ENGINE.md from the repository root for exact scheduling priorities,denominators,limits and acceptance evidence. This supersedes earlier uniform-random selection and repeated-answer topic qualification; it is not AI generation,official examination structure or validated adaptive assessment.


## Dashboard/glossary update -17 November2026

The owner requested a more prominent English-BM glossary and clearer Dashboard. The current glossary has180 distinct terms (58 Mathematics,53 Science,27 English,31 command/instruction words,11 exam phrases),superseding earlier100-term counts. A navy/gold Istilah Hari Ini card with next-term/deep-link actions leads the Dashboard;Home links prominently to the same searchable glossary. A next-session card uses existing qualified topic evidence,and a mode summary separates Practice/Exam/Challenge/Daily means and correct/wrong/blank counts. No new learner data,question-bank edits,Analytics events or claims of official admission vocabulary are introduced. See docs/features/DASHBOARD_GLOSSARY.md from the repository root for content sources,editorial limits,layout and acceptance checks.


## Community/profile decision -18 November2026

The owner authorised optional Home Bintang Pembelajaran (Top5 exploration,consistency and three subject categories) and private family profile editing,including year,school and state. Explicit guardian-directed alias opt-in is required;existing learners are not automatically published. A privileged local CLI admin job publishes allowlisted weekly aggregates into hallEntries,while hallConsents/hallOwners and all profiles/attempts stay owner-private. Publication is manual;withdrawal/deletion is immediate and atomic in Firestore,with stale-publisher preconditions. Subject ranks require30 current-week lifetime-first encounters and use bank-verified answers/server recording times. This remains self-directed practice,not verified assessment. Owner profile updates cannot change IDs,owner or creation time;school/state remain optional/private. docs/features/COMMUNITY_AND_PROFILES.md from the repository root specifies schema,thresholds,rights,operations and limits. This narrowly supersedes older no-public-leaderboard/no-profile-update statements;it does not authorise publishing existing private names or histories.
