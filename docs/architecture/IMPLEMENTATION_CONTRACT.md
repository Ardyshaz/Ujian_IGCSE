# Firebase implementation contract

[Authoritative active decision](FIREBASE_MVP.md). All former server-side assessment contracts are explicitly superseded by the user-selected pure client architecture; their historical detail is archived.

1. Complete original educational scope and UI remain: 300 original questions/62 topics/7 types, primary-to-bridge labels, all subjects, sourced MRSM/Cambridge guidance, BM UI with protected English terms, profile/history/progress, private rewards, glossary and permanent QR support footer.
2. Modular Firebase Web SDK only. Owner UID from Anonymous Auth. Firestore rules default deny and restrict records by ownerId. Anonymous does not provide family-member isolation or recoverable login.
3. Normalize text whitespace/case only and accepted variants; numerical finite input plus explicit tolerance; options scored by stable option ID. Preserve first checked Practice answer, unanswered count, flags, assisted marker and explanation snapshots. No essay/working-out auto-grading claim.
4. Timers/drafts are browser-side, refresh-resumable on this browser. Expired deadline caps duration and finalizes submitted drafts when connection permits. Changing clock/storage can manipulate this practice simulation; it is not the MRSM examination format.
5. Finalize via deterministic ID transaction; success only after server acknowledgement. Failed final saves remain retryable from local drafts. Reject updates to completed attempts. Reset/retry makes a fresh quiz ID. Client-local success must never masquerade as Firestore persistence.
6. Dashboard queries Firestore records, calculates mean attempt percentage/count and restores history after reload. Local counters are not authoritative progress.
7. Export is a user JSON snapshot. Deletion removes owner attempts before profile and reports failure if incomplete. Automated cloud backup/restore, linked login, retention lifecycle and scaling are explicit later work.
8. No public deployment or cloud rule changes claimed without evidence. Test actual emulator rules (unauthed/cross-owner denial), three-subject browser persistence/retry, mobile modal/footer and missing-config errors. Record emulator versus production separately.


Quiz update: Semak jawapan automatically persists the review flag and turns the navigation number gold; no manual checkbox. Submit shows progress and inline retryable errors. Partial-score rules use floating-point arithmetic and rounding tolerance; same attempt ID is reused after a20-second acknowledgement timeout. See docs/testing/VALIDATION.md (or ../VALIDATION.md from architecture/) and npm run test:quiz-review for regression evidence.


## Private feedback

Private feedback: a Maklum Balas footer button opens a BM form (category, optional nickname,5-2000-character comment). Store in feedback with Anonymous ownerId and server timestamp; no student profile, email or contact required. No web client may get/list/update/delete comment content, including its sender. Only project staff granted Firestore IAM access read/manage it through Firebase Console; no public admin panel, client-side admin password or hardcoded admin UID. Atomic feedbackRateLimits receipts enforce one submission per UID per60seconds using server time and support idempotent acknowledgement retries without exposing content. This is a basic per-identity limit, not comprehensive anti-abuse; App Check/stronger abuse controls remain roadmap work. Do not persist comment drafts to browser storage. Admin procedure: docs/FEEDBACK_ADMIN.md.


## PDF report export

PDF report export: the profile panel uses Eksport Laporan (PDF) as the primary export and retains Salinan Data (JSON) for full raw records/answers. Generate A4 reports entirely in the browser using owner-filtered Firestore export data, local jsPDF4.2.1 and bundled OFL Noto Sans fonts. Include selected profile, record period, quiz count, equal-attempt average/best score, total duration, subject accuracy, practice focus with minimum-three-question topic caveat, latest12-attempt trend, complete paginated quiz history, topic table, privacy label/page counts and exact disclaimer. No automatic report upload, external PDF service or publication. Different learners' data must not mix. Empty reports show no fabricated scores. PDF is a human-readable summary, not a machine-restorable backup or official exam/admission prediction. JSON retains full snapshots/answers. Explain local-download privacy, visible generation/error/retry and keep the rest of the SPA functional. docs/features/REPORT_EXPORT.md specifies implementation and validation.


## Learning engine update -17 November2026

Non-Daily sets now use owner/learner completed history to prioritise unseen IDs,include a limited due-error review share after24hours,and balance subjects/Levels where candidate capacity permits. Small filtered banks use an explicitly disclosed oldest-first fallback. Daily sets stay shared and date-based. Dashboard and PDF focus require3 unique IDs and latest outcomes; first-encounter versus repeat accuracy is separate from unchanged all-answer subject statistics and equal-attempt quiz means. Historic records and bank content are unchanged. See docs/features/LEARNING_ENGINE.md from the repository root for exact scheduling priorities,denominators,limits and acceptance evidence. This supersedes earlier uniform-random selection and repeated-answer topic qualification; it is not AI generation,official examination structure or validated adaptive assessment.


## Community/profile decision -18 November2026

The owner authorised optional Home Bintang Pembelajaran (Top5 exploration,consistency and three subject categories) and private family profile editing,including year,school and state. Explicit guardian-directed alias opt-in is required;existing learners are not automatically published. A privileged local CLI admin job publishes allowlisted weekly aggregates into hallEntries,while hallConsents/hallOwners and all profiles/attempts stay owner-private. Publication is manual;withdrawal/deletion is immediate and atomic in Firestore,with stale-publisher preconditions. Subject ranks require30 current-week lifetime-first encounters and use bank-verified answers/server recording times. This remains self-directed practice,not verified assessment. Owner profile updates cannot change IDs,owner or creation time;school/state remain optional/private. docs/features/COMMUNITY_AND_PROFILES.md from the repository root specifies schema,thresholds,rights,operations and limits. This narrowly supersedes older no-public-leaderboard/no-profile-update statements;it does not authorise publishing existing private names or histories.


## Automatic weekly recognition -18 November2026

The final requested title is Wall Of Excellence Minggu Ini. The owner explicitly replaces the earlier guardian-checkbox/manual-publication workflow with automatic opaque aliases and owner-scoped self-reported summaries. Names are random Pelajar codes,never shortened private names. Summaries synchronize on selected-profile use/after saved attempts;visibility can be disabled persistently. No admin refresh or bulk backfill of private old profiles is performed. Public data remains separate and field-restricted;profile/attempt/feedback records stay private. Five composite indexes provide actual global per-category Top5 queries. These browser-computed rankings are not independently verified;rules check ownership/schema/bounds/arithmetic,not the entire historical aggregate. This supersedes earlier no-client-summary-write and opt-in-only Hall decisions. School/state remain private. See docs/features/COMMUNITY_AND_PROFILES.md from the repository root for the v2 schema,limits,migration and tests.


## Visitor counter addition -18 November2026

The owner authorised a compact strip immediately below the Home hero: Aktif sekarang counts sessions active within5minutes; Jumlah kunjungan counts sessions since installation, with a new session only after30minutes of inactivity for the same Anonymous browser identity. Refresh and concurrent tabs share the private pointer and do not inflate the total. Reports require fresh visible activity; idle tabs do not send perpetual heartbeats. Public timestamp-only receipts and a cumulative total use strict atomic Firestore rules; Anonymous-to-session mapping stays private. This first-party Firebase counter is separate from guardian-opt-in Google Analytics, which remains default off. The privacy UI discloses the distinction. Counts are approximate sessions,not unique people,bot-proof audience figures or retroactive visits. No receipt TTL/purge is configured;24-hour public read access is not deletion. See docs/features/VISITOR_COUNTER.md from the repository root for schema,acceptance,privacy,retention and scaling limits. This narrowly extends earlier no-public-usage-aggregate statements without exposing learner data.
