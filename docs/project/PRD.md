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
