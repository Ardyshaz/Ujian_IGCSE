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
