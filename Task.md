# Implementation roadmap

Authority:[full_prompt.md](full_prompt.md). Live:https://kuiz-igcse.web.app. Repo:https://github.com/Ardyshaz/Ujian_IGCSE. Status reflects the published Firebase MVP and remaining original scope; checked items are not claims of complete production or educational readiness.

## Implemented and verified

- [x] Firebase-only static SPA in public; local development and Firebase Hosting; owner-restricted rules/indexes.
- [x] Anonymous learner profiles, immutable saved attempts/answers, deterministic retry and Firestore-derived Dashboard/history.
- [x] Original300-question bank,100 per core subject,62 topics,seven objective answer schemas and explanations.
- [x] Seven navigation tabs, four practice modes, typed/numeric answers, local drafts, refresh recovery, result review and retry.
- [x] Automatic gold review flag on Semak jawapan; no checkbox; first checked answer retained.
- [x] Fix partial-score save rejection; visible modal busy/error/retry and one90% result for10 questions/one blank, tested live.
- [x] BM UI/protected English terms,100-term glossary, sourced concise home information and parent/student guidance.
- [x] Private progress/rewards, responsive support footer, exact disclaimer/donation copy, QR download and page-wide no-translation directives.
- [x] Private feedback, Console/IAM admin access, atomic60-second per-UID cooldown and sender read/list denial.
- [x] Professional A4 PDF and full JSON export, learner isolation, font-load retry, mobile download and120-attempt pagination/visual verification.
- [x] Preserve original prompt/prototype and compare full baseline against companion documentation without inventing a missing prompt version.
- [x] Organise current code/docs/tests, make developer scripts portable, exclude local/private material and retain provenance archives.

## Research and content - next priorities

- [ ] Independent teacher verification of answers, distractors, explanations, difficulty and near-duplicates; do not label author review as independent moderation.
- [ ] Resolve U-01 to U-08 and applicable admission cycle/campus/programme, date, eligibility, PKSK/UKKM/special-test routes, components, timings, language, calculator rules, thresholds, interview, fallback and acceptance conditions from current official evidence.
- [ ] Corroborate MOEIS/APDM applicability, replace outdated2020 eligibility evidence and resolve source/date discrepancies before asserting procedures.
- [ ] Verify cohort-specific campus lists, curriculum/workload, IGCSE/SPM stages, Checkpoint arrangements, programme duration, pathways and parent preparation expectations.
- [ ] Research current examination/boarding costs and BUDI assistance with frequency/inclusions/eligibility; no fixed-amount or admission guarantees.
- [ ] Complete Cambridge code/year/route-specific English, Mathematics, Biology, Chemistry, Physics and relevant combined sciences research; named official resource categories include specimen/past papers, mark schemes, examiner reports, learner guides and candidate responses where lawfully accessible.
- [ ] Complete age/stage/subject-group/assessment-objective/grading coverage, MCQ/structured/practical/coursework routes and detailed official KSSM/SPM comparison.
- [ ] Map every17 English,20 Mathematics and25 Science topic to the selected-year objectives and reviewed questions; investigate additional relevant subjects/components without inventing entrance requirements.
- [ ] Improve curriculum-stage/subtopic/tag/difficulty rationale/version/review evidence; distinguish draft/reviewed/published counts and design a separate human-reviewed free-writing rubric before claiming essay assessment.
- [ ] Keep C-01 to C-09 decisions and U/C uncertainty registers in the full prompt up to date with evidence or explicit product defaults.

## Accounts, privacy and operations

- [ ] Recoverable guardian accounts/linking and cross-device access; explicit parent-child authorization, consent workflow and orphaned Anonymous-record handling.
- [ ] Review retention, complete account-level export/deletion, privacy notice/terms and applicable Malaysian privacy obligations with appropriate review; no unverified compliance claim.
- [ ] Configure scheduled cloud backup/PITR as appropriate, encryption/key management, off-host retention, recovery objectives and tested restore drills.
- [ ] Add stronger App Check/abuse protection, cost/quota alerts, monitoring, audit/incident/log-retention ownership; per-UID feedback cooldown is only a basic control.
- [ ] Implement reviewed admin question publishing/version/moderation and support workflows using verified least privilege; no public client admin password.
- [ ] Paginate/aggregate large histories and assess Firestore scaling and costs before wider load; client grading remains practice-only unless a separately approved trusted architecture is introduced.

## Quality and future release work

- [ ] Assistive-technology, keyboard/screen-reader, additional browser-engine, physical Android/iOS and broader load testing.
- [ ] Recheck full original acceptance criteria and broader guardian/account/retention/admin workflows before describing the entire original project as complete.
- [ ] Maintain source/claim dates and confirm the exact applicable Ujian Khas instructions; candidate slips never define a universal format.

## Explicitly superseded or already fulfilled historical tasks

Express routes, SQL schema/entities, SQLite migration/backup, server-side score/deadline enforcement and old backend tests are not active Firebase tasks. Their source requirements remain preserved in the original/full prompt and local historical archives. Firebase replaced the production-database choice; HTTPS Hosting publication was explicitly authorized and completed. Current profile export/deletion exists, but broader account/backup/retention work above is still open.

[Executed checks](docs/testing/VALIDATION.md) | [Research index](docs/research/README.md) | [Privacy](docs/operations/PRIVACY_AND_SECURITY.md).


## Optional GA4 integration - 16 November2026

- [x] Confirm linked property/Web App Measurement ID G-F9W4PLD4G9; add gated consent UI and allowlisted sanitized events.
- [x] Five policy unit checks and mocked browser privacy/withdrawal/mobile checks pass; learning works with tracking off.
- [x] Owner confirms Enhanced Measurement OFF; enable production opt-in after privacy verification and real-SDK intercepted transport checks.
- [x] Hosting release verified on production at390px: zero Analytics imports before consent,explicit allow loads SDK,decline works,no page errors; collection requests intercepted and synthetic Auth identity deleted.
- [x] Confirm actual GA4 receipt through the owner-authorised Console Home and realtime card on17 November2026; no private report data committed.
- [ ] Review remaining property settings including Google signals OFF, retention and admin access; client signals/ads are already disabled.

- [x] Fix stale Analytics modal choice label after allow/deny; verify both labels in existing browser QA.

- [x] Add requested first-visit Analytics popup with allow/decline/Nanti,expandable disclosure and saved-choice suppression; keep tracking off before explicit allow.


## Learning engine -17 November2026

- [x] Implement learner-history-aware unseen/due-error selection,24-hour review gap with limited-bank fallback,and subject/Level balancing.
- [x] Add unique/first/repeated evidence and all-answer correct/wrong/blank counts; require3 unique IDs for Dashboard/PDF focus.
- [x] Preserve Daily sets,immutable snapshots,scoring,review flags,ownership and unchanged300-question bank.
- [x] Integrated selection,quiz-review and PDF/JSON browser regressions passed;content/docs/repo checks passed;Hosting deployed and five changed JS modules verified byte-for-byte against tested source.
- [ ] Calibrate difficulty and scheduling defaults with teacher/learner review; scale history queries as data grows.
