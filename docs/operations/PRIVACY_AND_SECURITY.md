# Privacy and security ? Firebase MVP

Profiles and completed attempts are transmitted to Firebase Authentication/Firestore; the former local-only SQLite privacy statement is obsolete. Draf remains browser-local. No Analytics initialization, public leaderboard, external AI marking or service-account credentials are included. Web configuration/API key is public; access control requires deployed Firestore rules.

Minimize child data: nickname is required; guardian label, year and school label are optional. No national ID, contact, real slip, venue/date default or full identity is needed. Obtain guardian permission before storing an actual child's data. The support QR was explicitly supplied for public display; private candidate slips remain outside public.

Anonymous Firebase Auth UID owns all profiles/attempts created in that browser. A shared browser user can switch family profiles. Clearing site data, changing browser, private-mode expiry or deleting the anonymous account can remove access without deleting cloud records. Cross-device recovery/account linking is not implemented. Keep Anonymous automatic account cleanup disabled for this MVP; account expiration may orphan stored records before recovery is available. Export first; explain the limitation to guardians.

Rules deny unauthenticated and cross-owner access, scope collection queries, constrain profile/attempt fields, require server-created timestamps, prevent immutable attempt updates and restrict score ranges. Client scores/question keys/timers remain inspectable and manipulable. Do not use results for admissions, awards with material value or identity verification. Rules do not establish verified answer correctness.

User export downloads current profile/attempts. Delete verifies nickname, removes owned attempts in batches then profile; if a batch fails, retain profile so retry is possible. Manual exports/old backups require separate deletion. No guarantee of zero residual data after browser clear. Cloud backup scheduling, restore drills, retention, recoverable accounts, privacy/legal review and App Check/abuse/cost controls remain public-launch tasks.

Never use permissive test-mode rules on a public project. Hosting serves only public; .local/private/candidate-notes, slips, data/, legacy/, emulator files and credentials stay outside it. No automatic migration/upload of old family SQLite data. [Rules](../../firestore.rules), [schema](../architecture/DATABASE_SCHEMA.md), [deployment](DEPLOYMENT.md).


## Private feedback

Private feedback: a Maklum Balas footer button opens a BM form (category, optional nickname,5-2000-character comment). Store in feedback with Anonymous ownerId and server timestamp; no student profile, email or contact required. No web client may get/list/update/delete comment content, including its sender. Only project staff granted Firestore IAM access read/manage it through Firebase Console; no public admin panel, client-side admin password or hardcoded admin UID. Atomic feedbackRateLimits receipts enforce one submission per UID per60seconds using server time and support idempotent acknowledgement retries without exposing content. This is a basic per-identity limit, not comprehensive anti-abuse; App Check/stronger abuse controls remain roadmap work. Do not persist comment drafts to browser storage. Admin procedure: docs/FEEDBACK_ADMIN.md.


## PDF report export

PDF report export: the profile panel uses Eksport Laporan (PDF) as the primary export and retains Salinan Data (JSON) for full raw records/answers. Generate A4 reports entirely in the browser using owner-filtered Firestore export data, local jsPDF4.2.1 and bundled OFL Noto Sans fonts. Include selected profile, record period, quiz count, equal-attempt average/best score, total duration, subject accuracy, practice focus with minimum-three-question topic caveat, latest12-attempt trend, complete paginated quiz history, topic table, privacy label/page counts and exact disclaimer. No automatic report upload, external PDF service or publication. Different learners' data must not mix. Empty reports show no fabricated scores. PDF is a human-readable summary, not a machine-restorable backup or official exam/admission prediction. JSON retains full snapshots/answers. Explain local-download privacy, visible generation/error/retry and keep the rest of the SPA functional. docs/features/REPORT_EXPORT.md specifies implementation and validation.
