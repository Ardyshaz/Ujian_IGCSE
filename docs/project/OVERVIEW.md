# Project overview

Published independent MRSM/IGCSE preparation SPA at https://kuiz-igcse.web.app. It serves the complete frontend from public using modular Firebase Web SDK, Anonymous Authentication and owner-scoped Firestore. No active Express/SQLite application backend exists.

The full scope remains research, original English/Mathematics/Science and relevant subject preparation, interactive practice exams, profiles/history/analytics, student/parent guidance, glossary, gamification, responsive BM UX, community support and future operational maturity. Current public content distinguishes the Cambridge qualification from uncertain admission-test details.

The MVP supports private comments through Firebase Console admin access and local PDF/JSON exports. It is available for community trials while educator moderation, official-format verification, recoverable accounts, cloud backups/retention and broader readiness work remain open.

Start with [README](../../README.md), [full specification](../../full_prompt.md), [roadmap](../../Task.md) and [documentation index](../README.md).


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
