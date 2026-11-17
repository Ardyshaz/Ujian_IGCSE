# UI and report design

BM is the primary interface language. Retain MRSM, UKKM, IGCSE, Dashboard, English, Mathematics, Science and Level where agreed. Display name:MRSM - Persediaan Ujian IGCSE; compact mobile label:MRSM IGCSE. Avoid literal/stiff translations:use Prestasi Saya and Tapis Soalan.

Navy #162c49, restrained gold #e9b75e, white surfaces, cool grey backgrounds, green success, readable Segoe UI/system typography and Lucide icons. Keep clear headings,44px primary controls, focus indicators, semantic inputs, dialog labels, errors and meaningful empty/loading states. Desktop navigation is a sidebar; mobile uses a collapsible menu without horizontal overflow.

Preserve all seven navigation tabs, sourced concise home guidance, bilingual glossary, four quiz modes, results/history and parent/student guidance. English academic question text stays English. Set lang=ms, translate=no, notranslate class and Google notranslate meta to preserve intentional mixed-language wording; native browser/user overrides are outside application control.

Semak jawapan automatically turns that question's navigator gold and persists review state across next/back/refresh. Remove the former manual checkbox. Show feedback, answer state and progress clearly. Submission displays busy text and inline retryable errors within its modal, with no false saved state.

The permanent footer contains support and private-feedback actions plus the exact requested PENAFIAN. ResizeObserver reserves actual footer height in main/sidebar/toast spacing, including mobile/safe areas, so quiz controls remain reachable. The support modal preserves the original QR and exact donation paragraph, with Simpan QR beside Tutup, outside-click and Escape dismissal. The feedback form explains admin-only visibility and requests no child/contact identifiers.

Profile export:primary Eksport Laporan (PDF), secondary Salinan Data (JSON), clearly spaced destructive deletion. PDF reports use A4, navy/gold hierarchy, embedded Noto Sans, summary cards, subject bars, trend, complete multi-page tables and privacy/page-number footers. Preserve multilingual profile names via local rendering fallback where needed. [Report specification](../features/REPORT_EXPORT.md).

[Concept reference](../design/concept-prompt.md) is historical visual provenance, not current copy. Exact text and full acceptance requirements are in [full_prompt.md](../../full_prompt.md).


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
