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
