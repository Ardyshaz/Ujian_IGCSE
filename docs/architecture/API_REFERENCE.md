# Client service contract ? no REST backend

`public/js/api.js` retains a route-shaped internal dispatcher for existing UI callers. These paths are JavaScript service identifiers, never HTTP /api endpoints. `post` serializes a local argument. No CSRF cookie/session server, Express routes or Admin credentials exist in the active app.

bootstrap: load JSON subjects, initialize Firebase Auth, list owner profiles; missing config is an explicit warning while public guides/bank remain accessible. topics/questions: search/filter/paginate local published JSON. students create/list/get/delete: repository Web SDK. dashboard/{student}: Firestore query then pure analytics. quizzes/start: select local JSON question snapshots and persist local draft; quizzes/{id}/answers: local draft save; feedback: local Practice marking; submit: local grading plus immutable Firestore transaction; abandon: local status. attempts/{id}: owner Firestore read. exportStudent: JSON profile and attempts downloaded from browser (not an HTTP link).

repository exports createStudent, listRecords, getRecord, saveAttempt, deleteStudent. Errors propagate to visible UI; network/auth/permission failures never report a confirmed cloud save. Delete profile confirms exact displayed nickname. Profile is deleted only after all selected owner attempts are removed; retry on partial failure.

See schema for stored field names. `setCsrf` compatibility was removed; Firebase handles authentication and rules authorization. Web API key is public configuration, not an authorization secret.


Quiz update: Semak jawapan automatically persists the review flag and turns the navigation number gold; no manual checkbox. Submit shows progress and inline retryable errors. Partial-score rules use floating-point arithmetic and rounding tolerance; same attempt ID is reused after a20-second acknowledgement timeout. See docs/testing/VALIDATION.md (or ../VALIDATION.md from architecture/) and npm run test:quiz-review for regression evidence.


## Private feedback

Private feedback: a Maklum Balas footer button opens a BM form (category, optional nickname,5-2000-character comment). Store in feedback with Anonymous ownerId and server timestamp; no student profile, email or contact required. No web client may get/list/update/delete comment content, including its sender. Only project staff granted Firestore IAM access read/manage it through Firebase Console; no public admin panel, client-side admin password or hardcoded admin UID. Atomic feedbackRateLimits receipts enforce one submission per UID per60seconds using server time and support idempotent acknowledgement retries without exposing content. This is a basic per-identity limit, not comprehensive anti-abuse; App Check/stronger abuse controls remain roadmap work. Do not persist comment drafts to browser storage. Admin procedure: docs/FEEDBACK_ADMIN.md.


## PDF report export

PDF report export: the profile panel uses Eksport Laporan (PDF) as the primary export and retains Salinan Data (JSON) for full raw records/answers. Generate A4 reports entirely in the browser using owner-filtered Firestore export data, local jsPDF4.2.1 and bundled OFL Noto Sans fonts. Include selected profile, record period, quiz count, equal-attempt average/best score, total duration, subject accuracy, practice focus with minimum-three-question topic caveat, latest12-attempt trend, complete paginated quiz history, topic table, privacy label/page counts and exact disclaimer. No automatic report upload, external PDF service or publication. Different learners' data must not mix. Empty reports show no fabricated scores. PDF is a human-readable summary, not a machine-restorable backup or official exam/admission prediction. JSON retains full snapshots/answers. Explain local-download privacy, visible generation/error/retry and keep the rest of the SPA functional. docs/features/REPORT_EXPORT.md specifies implementation and validation.
