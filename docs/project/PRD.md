# Product requirements

MRSM - Persediaan Ujian IGCSE is an independent free educational preparation tool for Malaysian Year6 pupils, MRSM Form1 applicants, students and parents. It combines sourced programme guidance and primary-to-lower-secondary bridge practice. It must not conflate the Cambridge qualification with an admission test or promise admission outcomes.

## Published MVP

Students choose English/Mathematics/Science, practise original questions, read explanations, flag reviewed questions automatically, navigate/retry and complete timed or untimed practice modes. Four modes remain Practice, Examination, Challenge and Daily Challenge. The bank contains300 original items,100 per subject,62 topics and seven objective answer schemas. Writing-choice practice does not claim automated essay grading.

Families use minimal nickname profiles, cloud attempts/answers, browser-local drafts, history, subject/topic analytics, streaks and private rewards. Profiles in one shared browser are not separate logins. Parents/students have dedicated guidance, official source links, a100-term English-BM glossary and concise qualified home information. Relevant additional subjects and deeper curriculum/research remain in the full scope.

The interface is responsive and BM-first with protected English terminology. PDF learning reports and raw JSON snapshots are downloadable. Support donations are voluntary and do not unlock paid access. Private feedback is read only by authorised project admins through Console/IAM; no public comments are shown.

## Acceptance and limitations

A selected learner completes each subject, saves one immutable Firestore attempt, refreshes and sees correct average/count/history. Duplicate retry produces no duplicate result. Cross-owner/unauthenticated access is denied. Multi-question partial scores and unanswered questions save correctly. Footer/modals work on small screens. Public instructions are sourced/dated; unresolved procedures stay labelled.

Published status means the MVP is available for community trials, not that all original requirements are complete. Independent educator moderation, detailed syllabus/year/objective mapping, recoverable guardian accounts/consent, admin content tooling, cloud backup/retention, broader accessibility/load/browser checks and stronger abuse controls remain in [Task.md](../../Task.md). Client grading and timers are practice-only.

[Authoritative full scope](../../full_prompt.md) | [Research index](../research/README.md) | [Validation](../testing/VALIDATION.md).


## Optional Analytics update - 16 November 2026

The user authorised GA4 integration for the linked kuiz-igcse property. It supersedes earlier blanket no-Analytics instructions only when explicitly enabled and consented. Follow docs/features/ANALYTICS.md from the repository root: default off,no SDK before guardian opt-in,strict event/URL allowlists,no learner IDs/names/scores/answers/comments/filenames,ads/signals disabled and reversible browser choice. Enhanced Measurement OFF confirmation is required before activation. Source implementation and mocked privacy tests do not establish live collection or GA4 ingestion.


## Learning engine update -17 November2026

Non-Daily sets now use owner/learner completed history to prioritise unseen IDs,include a limited due-error review share after24hours,and balance subjects/Levels where candidate capacity permits. Small filtered banks use an explicitly disclosed oldest-first fallback. Daily sets stay shared and date-based. Dashboard and PDF focus require3 unique IDs and latest outcomes; first-encounter versus repeat accuracy is separate from unchanged all-answer subject statistics and equal-attempt quiz means. Historic records and bank content are unchanged. See docs/features/LEARNING_ENGINE.md from the repository root for exact scheduling priorities,denominators,limits and acceptance evidence. This supersedes earlier uniform-random selection and repeated-answer topic qualification; it is not AI generation,official examination structure or validated adaptive assessment.


## Dashboard/glossary update -17 November2026

The owner requested a more prominent English-BM glossary and clearer Dashboard. The current glossary has180 distinct terms (58 Mathematics,53 Science,27 English,31 command/instruction words,11 exam phrases),superseding earlier100-term counts. A navy/gold Istilah Hari Ini card with next-term/deep-link actions leads the Dashboard;Home links prominently to the same searchable glossary. A next-session card uses existing qualified topic evidence,and a mode summary separates Practice/Exam/Challenge/Daily means and correct/wrong/blank counts. No new learner data,question-bank edits,Analytics events or claims of official admission vocabulary are introduced. See docs/features/DASHBOARD_GLOSSARY.md from the repository root for content sources,editorial limits,layout and acceptance checks.


## Community/profile decision -18 November2026

The owner authorised optional Home Bintang Pembelajaran (Top5 exploration,consistency and three subject categories) and private family profile editing,including year,school and state. Explicit guardian-directed alias opt-in is required;existing learners are not automatically published. A privileged local CLI admin job publishes allowlisted weekly aggregates into hallEntries,while hallConsents/hallOwners and all profiles/attempts stay owner-private. Publication is manual;withdrawal/deletion is immediate and atomic in Firestore,with stale-publisher preconditions. Subject ranks require30 current-week lifetime-first encounters and use bank-verified answers/server recording times. This remains self-directed practice,not verified assessment. Owner profile updates cannot change IDs,owner or creation time;school/state remain optional/private. docs/features/COMMUNITY_AND_PROFILES.md from the repository root specifies schema,thresholds,rights,operations and limits. This narrowly supersedes older no-public-leaderboard/no-profile-update statements;it does not authorise publishing existing private names or histories.


## Automatic weekly recognition -18 November2026

The final requested title is Wall Of Excellence Minggu Ini. The owner explicitly replaces the earlier guardian-checkbox/manual-publication workflow with automatic opaque aliases and owner-scoped self-reported summaries. Names are random Pelajar codes,never shortened private names. Summaries synchronize on selected-profile use/after saved attempts;visibility can be disabled persistently. No admin refresh or bulk backfill of private old profiles is performed. Public data remains separate and field-restricted;profile/attempt/feedback records stay private. Five composite indexes provide actual global per-category Top5 queries. These browser-computed rankings are not independently verified;rules check ownership/schema/bounds/arithmetic,not the entire historical aggregate. This supersedes earlier no-client-summary-write and opt-in-only Hall decisions. School/state remain private. See docs/features/COMMUNITY_AND_PROFILES.md from the repository root for the v2 schema,limits,migration and tests.
