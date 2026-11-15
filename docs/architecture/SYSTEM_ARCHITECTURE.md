# System architecture ? active Firebase SPA

Browser ? public static HTML/CSS/modules ? Firebase Authentication (Anonymous) ? Firestore owner-scoped students/attempts. Browser ? local questions.json. Hosting serves only public; no application server and no privileged SDK.

Modules: firebase-config.js public app configuration; firebase.js SDK loading/auth/emulator connection; repository.js Firestore CRUD and idempotent attempt transaction; quiz-engine.js marking/progress calculations; api.js UI service dispatch (no network REST API); app.js screens/events; ui.js safe HTML helpers; guides/home-guide/support.js supporting content and footer. CSS is css/style.css.

Practice, Examination, Challenge and Daily retain navigation/flags, first checked answer, timers, explanations/retry. Draft question snapshots live in browser storage keyed by owner UID. Local resume is browser-specific. Cloud attempts store complete snapshots for history; bank edits do not rewrite saved results. Public bank keys and timers are inspectable and scores are not authoritative assessments.

Dashboard reads owner/student-filtered Firestore documents then computes totals, mean percentage, subject/topic summaries, strengths/weaknesses, streak, history and rewards. Mean percentages weight attempts equally, not individual questions. Daily reward counted once per owner-profile day; reward values are client-computed and not monetary.

No offline cloud success, background sync, recovery account or automatic SQLite import. See [implementation contract](IMPLEMENTATION_CONTRACT.md) and [Firebase decision](FIREBASE_MVP.md).


Private feedback is live: public/js/feedback.js handles the footer form and atomic feedback/feedbackRateLimits writes. No client can read comment content; project admins read/manage it using Console/IAM. Receipt data contains no comment. One submission/UID/60seconds is server-enforced. See docs/features/FEEDBACK_ADMIN.md from the repository root for access, privacy and retention instructions.


## PDF report export

PDF report export: the profile panel uses Eksport Laporan (PDF) as the primary export and retains Salinan Data (JSON) for full raw records/answers. Generate A4 reports entirely in the browser using owner-filtered Firestore export data, local jsPDF4.2.1 and bundled OFL Noto Sans fonts. Include selected profile, record period, quiz count, equal-attempt average/best score, total duration, subject accuracy, practice focus with minimum-three-question topic caveat, latest12-attempt trend, complete paginated quiz history, topic table, privacy label/page counts and exact disclaimer. No automatic report upload, external PDF service or publication. Different learners' data must not mix. Empty reports show no fabricated scores. PDF is a human-readable summary, not a machine-restorable backup or official exam/admission prediction. JSON retains full snapshots/answers. Explain local-download privacy, visible generation/error/retry and keep the rest of the SPA functional. docs/features/REPORT_EXPORT.md specifies implementation and validation.
