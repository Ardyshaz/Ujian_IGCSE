# Project decisions and current state

Decision baseline:15 November2026. Current public URL:https://kuiz-igcse.web.app. Repository:https://github.com/Ardyshaz/Ujian_IGCSE.

- The original1370-line prompt and prototype are preserved in docs/archive with SHA256 evidence. No separately identifiable earlier/latest prompt pair was available; the comparison records that limitation instead of inventing a version.
- The user explicitly replaced Express/SQLite with a purely client-side Firebase SPA. Anonymous UID ownership, private profiles/attempts, browser-local drafts and inspectable client scoring are deliberate architectural decisions.
- Firebase project kuiz-igcse, modular SDK13.3.0, Hosting public directory, owner rules and Native/Standard default database in nam5 are deployed. No Malaysia residency or managed backup claim is made. Anonymous auto-cleanup should remain off until recovery is designed.
- Published features include original300-question bank, seven tabs/four modes, BM-first UI,100-term glossary, sourced qualified guidance, private gamification, permanent QR support, Simpan QR, private feedback and professional PDF/raw JSON export.
- A real bug in integer-division partial-score validation was reproduced and fixed. The10-question/one-unanswered90% scenario, automatic gold flags and visible offline retry were verified live.
- Verification history records8 engine+4 report-model checks,31 score/owner+23 feedback rules assertions, emulator/live browser workflows and PDF visual/structure review. These are actual scoped checks, not full educational moderation or a general security certification.
- Repository cleanup isolates private files, old backend/document snapshots and generated QA output under ignored .local. public/questions.json is the single bank; fresh clones use generated local Firebase config from a public example. Application runtime public files remain unchanged by the cleanup.

Outstanding research, teacher review, linked accounts/guardian consent, retention/backups, admin question workflow, accessibility/scaling and abuse controls remain in [Task.md](../../Task.md). Detailed executed evidence is [VALIDATION.md](../testing/VALIDATION.md); no candidate's full identity is recorded here.


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


## Home visitor counter -18 November2026

The owner authorised a compact strip immediately below the Home hero: Aktif sekarang counts sessions active within5minutes; Jumlah kunjungan counts sessions since installation, with a new session only after30minutes of inactivity for the same Anonymous browser identity. Refresh and concurrent tabs share the private pointer and do not inflate the total. Reports require fresh visible activity; idle tabs do not send perpetual heartbeats. Public timestamp-only receipts and a cumulative total use strict atomic Firestore rules; Anonymous-to-session mapping stays private. This first-party Firebase counter is separate from guardian-opt-in Google Analytics, which remains default off. The privacy UI discloses the distinction. Counts are approximate sessions,not unique people,bot-proof audience figures or retroactive visits. No receipt TTL/purge is configured;24-hour public read access is not deletion. See docs/features/VISITOR_COUNTER.md from the repository root for schema,acceptance,privacy,retention and scaling limits. This narrowly extends earlier no-public-usage-aggregate statements without exposing learner data.
