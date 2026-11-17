# Architecture overview

The browser loads the SPA entirely from public. Firebase modular Web SDK13.3.0 supplies Anonymous Authentication and Firestore; no application backend or Admin SDK is shipped. The hosted project is kuiz-igcse. Local QA uses demo-kuiz-igcse on loopback.

- Profiles and immutable completed attempts are owner-UID-scoped cloud records. Dashboard is derived from fetched attempts; average is the mean of attempt percentages.
- Active quiz snapshots, flags and drafts are browser-local. Practice retains the first checked answer; timers and scores are not tamper-proof assessments.
- public/questions.json is the sole authoritative editable bank. Question keys are public in this client architecture.
- Feedback uses create-only content plus atomic private receipts and a60-second server cooldown. All client content reads are denied; admin access is through Console/IAM.
- PDF generation uses local bundled jsPDF/fonts after owner-filtered reads. No report is automatically uploaded; raw JSON export remains separate.
- Config is developer-local and ignored by Git; a committed example/bootstrap supports fresh clones. Hosting can obtain Web App configuration from its reserved endpoint.

[System modules](../architecture/SYSTEM_ARCHITECTURE.md), [schema](../architecture/DATABASE_SCHEMA.md), [service contract](../architecture/API_REFERENCE.md), [acceptance contract](../architecture/IMPLEMENTATION_CONTRACT.md), [privacy](../operations/PRIVACY_AND_SECURITY.md).

The original full specification remains authoritative in [full_prompt.md](../../full_prompt.md). Old SQL/server requirements are superseded by the explicit Firebase pivot; private legacy code is not part of this repository's active runtime.


## Optional Analytics update - 16 November 2026

The user authorised GA4 integration for the linked kuiz-igcse property. It supersedes earlier blanket no-Analytics instructions only when explicitly enabled and consented. Follow docs/features/ANALYTICS.md from the repository root: default off,no SDK before guardian opt-in,strict event/URL allowlists,no learner IDs/names/scores/answers/comments/filenames,ads/signals disabled and reversible browser choice. Enhanced Measurement OFF confirmation is required before activation. Source implementation and mocked privacy tests do not establish live collection or GA4 ingestion.


## Learning engine update -17 November2026

Non-Daily sets now use owner/learner completed history to prioritise unseen IDs,include a limited due-error review share after24hours,and balance subjects/Levels where candidate capacity permits. Small filtered banks use an explicitly disclosed oldest-first fallback. Daily sets stay shared and date-based. Dashboard and PDF focus require3 unique IDs and latest outcomes; first-encounter versus repeat accuracy is separate from unchanged all-answer subject statistics and equal-attempt quiz means. Historic records and bank content are unchanged. See docs/features/LEARNING_ENGINE.md from the repository root for exact scheduling priorities,denominators,limits and acceptance evidence. This supersedes earlier uniform-random selection and repeated-answer topic qualification; it is not AI generation,official examination structure or validated adaptive assessment.


## Dashboard/glossary update -17 November2026

The owner requested a more prominent English-BM glossary and clearer Dashboard. The current glossary has180 distinct terms (58 Mathematics,53 Science,27 English,31 command/instruction words,11 exam phrases),superseding earlier100-term counts. A navy/gold Istilah Hari Ini card with next-term/deep-link actions leads the Dashboard;Home links prominently to the same searchable glossary. A next-session card uses existing qualified topic evidence,and a mode summary separates Practice/Exam/Challenge/Daily means and correct/wrong/blank counts. No new learner data,question-bank edits,Analytics events or claims of official admission vocabulary are introduced. See docs/features/DASHBOARD_GLOSSARY.md from the repository root for content sources,editorial limits,layout and acceptance checks.


## Community/profile decision -18 November2026

The owner authorised optional Home Bintang Pembelajaran (Top5 exploration,consistency and three subject categories) and private family profile editing,including year,school and state. Explicit guardian-directed alias opt-in is required;existing learners are not automatically published. A privileged local CLI admin job publishes allowlisted weekly aggregates into hallEntries,while hallConsents/hallOwners and all profiles/attempts stay owner-private. Publication is manual;withdrawal/deletion is immediate and atomic in Firestore,with stale-publisher preconditions. Subject ranks require30 current-week lifetime-first encounters and use bank-verified answers/server recording times. This remains self-directed practice,not verified assessment. Owner profile updates cannot change IDs,owner or creation time;school/state remain optional/private. docs/features/COMMUNITY_AND_PROFILES.md from the repository root specifies schema,thresholds,rights,operations and limits. This narrowly supersedes older no-public-leaderboard/no-profile-update statements;it does not authorise publishing existing private names or histories.
