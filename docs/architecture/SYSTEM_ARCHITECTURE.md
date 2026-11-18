# System architecture ? active Firebase SPA

Browser ? public static HTML/CSS/modules ? Firebase Authentication (Anonymous) ? Firestore owner-scoped students/attempts. Browser ? local questions.json. Hosting serves only public; no application server and no privileged SDK.

Modules: firebase-config.js public app configuration; firebase.js SDK loading/auth/emulator connection; repository.js Firestore CRUD and idempotent attempt transaction; quiz-engine.js marking/progress calculations; api.js UI service dispatch (no network REST API); app.js screens/events; ui.js safe HTML helpers; guides/home-guide/support.js supporting content and footer. CSS is css/style.css.

Practice, Examination, Challenge and Daily retain navigation/flags, first checked answer, timers, explanations/retry. Draft question snapshots live in browser storage keyed by owner UID. Local resume is browser-specific. Cloud attempts store complete snapshots for history; bank edits do not rewrite saved results. Public bank keys and timers are inspectable and scores are not authoritative assessments.

Dashboard reads owner/student-filtered Firestore documents then computes totals, mean percentage, subject/topic summaries, strengths/weaknesses, streak, history and rewards. Mean percentages weight attempts equally, not individual questions. Daily reward counted once per owner-profile day; reward values are client-computed and not monetary.

No offline cloud success, background sync, recovery account or automatic SQLite import. See [implementation contract](IMPLEMENTATION_CONTRACT.md) and [Firebase decision](FIREBASE_MVP.md).


Private feedback is live: public/js/feedback.js handles the footer form and atomic feedback/feedbackRateLimits writes. No client can read comment content; project admins read/manage it using Console/IAM. Receipt data contains no comment. One submission/UID/60seconds is server-enforced. See docs/features/FEEDBACK_ADMIN.md from the repository root for access, privacy and retention instructions.


## PDF report export

PDF report export: the profile panel uses Eksport Laporan (PDF) as the primary export and retains Salinan Data (JSON) for full raw records/answers. Generate A4 reports entirely in the browser using owner-filtered Firestore export data, local jsPDF4.2.1 and bundled OFL Noto Sans fonts. Include selected profile, record period, quiz count, equal-attempt average/best score, total duration, subject accuracy, practice focus with minimum-three-question topic caveat, latest12-attempt trend, complete paginated quiz history, topic table, privacy label/page counts and exact disclaimer. No automatic report upload, external PDF service or publication. Different learners' data must not mix. Empty reports show no fabricated scores. PDF is a human-readable summary, not a machine-restorable backup or official exam/admission prediction. JSON retains full snapshots/answers. Explain local-download privacy, visible generation/error/retry and keep the rest of the SPA functional. docs/features/REPORT_EXPORT.md specifies implementation and validation.


## Community/profile decision -18 November2026

The owner authorised optional Home Bintang Pembelajaran (Top5 exploration,consistency and three subject categories) and private family profile editing,including year,school and state. Explicit guardian-directed alias opt-in is required;existing learners are not automatically published. A privileged local CLI admin job publishes allowlisted weekly aggregates into hallEntries,while hallConsents/hallOwners and all profiles/attempts stay owner-private. Publication is manual;withdrawal/deletion is immediate and atomic in Firestore,with stale-publisher preconditions. Subject ranks require30 current-week lifetime-first encounters and use bank-verified answers/server recording times. This remains self-directed practice,not verified assessment. Owner profile updates cannot change IDs,owner or creation time;school/state remain optional/private. docs/features/COMMUNITY_AND_PROFILES.md from the repository root specifies schema,thresholds,rights,operations and limits. This narrowly supersedes older no-public-leaderboard/no-profile-update statements;it does not authorise publishing existing private names or histories.


## Automatic weekly recognition -18 November2026

The final requested title is Wall Of Excellence Minggu Ini. The owner explicitly replaces the earlier guardian-checkbox/manual-publication workflow with automatic opaque aliases and owner-scoped self-reported summaries. Names are random Pelajar codes,never shortened private names. Summaries synchronize on selected-profile use/after saved attempts;visibility can be disabled persistently. No admin refresh or bulk backfill of private old profiles is performed. Public data remains separate and field-restricted;profile/attempt/feedback records stay private. Five composite indexes provide actual global per-category Top5 queries. These browser-computed rankings are not independently verified;rules check ownership/schema/bounds/arithmetic,not the entire historical aggregate. This supersedes earlier no-client-summary-write and opt-in-only Hall decisions. School/state remain private. See docs/features/COMMUNITY_AND_PROFILES.md from the repository root for the v2 schema,limits,migration and tests.


## Visitor counter addition -18 November2026

The owner authorised a compact strip immediately below the Home hero: Aktif sekarang counts sessions active within5minutes; Jumlah kunjungan counts sessions since installation, with a new session only after30minutes of inactivity for the same Anonymous browser identity. Refresh and concurrent tabs share the private pointer and do not inflate the total. Reports require fresh visible activity; idle tabs do not send perpetual heartbeats. Public timestamp-only receipts and a cumulative total use strict atomic Firestore rules; Anonymous-to-session mapping stays private. This first-party Firebase counter is separate from guardian-opt-in Google Analytics, which remains default off. The privacy UI discloses the distinction. Counts are approximate sessions,not unique people,bot-proof audience figures or retroactive visits. No receipt TTL/purge is configured;24-hour public read access is not deletion. See docs/features/VISITOR_COUNTER.md from the repository root for schema,acceptance,privacy,retention and scaling limits. This narrowly extends earlier no-public-usage-aggregate statements without exposing learner data.
