# MASTER PROMPT — IGCSE MRSM PREPARATION HUB

> Repository layout update: public/questions.json is the single question bank. Companion documents are under docs/project; current navigation is docs/README.md. Original prompt/prototype moved unchanged to docs/archive. Private source material and obsolete backend/document snapshots are retained only under ignored .local. Tooling paths and config bootstrap are described in docs/operations/REPOSITORY_LAYOUT.md. Root Task.md is the current practical roadmap. This organisational change does not remove educational requirements or deploy the application.

> PDF report export: the profile panel uses Eksport Laporan (PDF) as the primary export and retains Salinan Data (JSON) for full raw records/answers. Generate A4 reports entirely in the browser using owner-filtered Firestore export data, local jsPDF4.2.1 and bundled OFL Noto Sans fonts. Include selected profile, record period, quiz count, equal-attempt average/best score, total duration, subject accuracy, practice focus with minimum-three-question topic caveat, latest12-attempt trend, complete paginated quiz history, topic table, privacy label/page counts and exact disclaimer. No automatic report upload, external PDF service or publication. Different learners' data must not mix. Empty reports show no fabricated scores. PDF is a human-readable summary, not a machine-restorable backup or official exam/admission prediction. JSON retains full snapshots/answers. Explain local-download privacy, visible generation/error/retry and keep the rest of the SPA functional. docs/features/REPORT_EXPORT.md specifies implementation and validation.

> Private feedback: a Maklum Balas footer button opens a BM form (category, optional nickname,5-2000-character comment). Store in feedback with Anonymous ownerId and server timestamp; no student profile, email or contact required. No web client may get/list/update/delete comment content, including its sender. Only project staff granted Firestore IAM access read/manage it through Firebase Console; no public admin panel, client-side admin password or hardcoded admin UID. Atomic feedbackRateLimits receipts enforce one submission per UID per60seconds using server time and support idempotent acknowledgement retries without exposing content. This is a basic per-identity limit, not comprehensive anti-abuse; App Check/stronger abuse controls remain roadmap work. Do not persist comment drafts to browser storage. Admin procedure: docs/FEEDBACK_ADMIN.md.

## Current live release status - 15 November 2026

- Public URL: https://kuiz-igcse.web.app. Firebase Hosting, Anonymous Authentication and owner-scoped Firestore rules are deployed and tested. Hosting publication is explicitly authorised and completed.
- Display name: MRSM - Persediaan Ujian IGCSE; compact mobile header MRSM IGCSE. BM interface retains intentional English subject/academic terms. Bank filter action: Tapis Soalan.
- The full user-supplied PENAFIAN appears in the fixed footer and About; measured footer padding protects quiz controls. Support modal retains exact donation text and original QR, with Simpan QR beside Tutup; PNG download verified byte-for-byte.
- Page-wide translate=no, notranslate class and Google notranslate meta are permanent requirements. Mobile-emulated DOM inheritance verified; the native Android browser prompt was not directly observable.
- Semak jawapan automatically flags the current question gold. No manual checkbox. Flags survive next/back/reload. Submit shows busy state, inline error and safe retry. Partial scores use floating-point rules; original integer-division rejection is fixed.
- Evidence: eight engine tests, 31 actual rules assertions and live 10-question/10-flag/one-unanswered regression resulting in one90% attempt; offline error/retry, reload, mobile and data cleanup passed. Earlier17-check and one-question results below are historical subsets, not the latest coverage.
- Release classification: published MVP suitable for initial community trials; not a claim that the full original project scope or all production-readiness work is complete. Independent educator moderation, recoverable/cross-device accounts, scheduled cloud backup/restore, retention, abuse/cost controls and scaling work remain open in Task.md. Marking is client-side practice only. Anonymous records depend on the browser/site identity; export before clearing site data. Do not promise cross-device recovery or verified official examination format.
- full_prompt.md remains the source of truth. See docs/testing/VALIDATION.md for executed evidence. Original prompt, legacy prototype and historical documentation are preserved.


> Support modal update: place Simpan QR beside Tutup. Download the existing unmodified QR PNG through a same-origin download link named QR-Sumbangan-MRSM-IGCSE.png; preserve the exact donation message, image, dismissal methods and mobile layout.

> Translation policy: retain lang="ms" and set root translate="no", class="notranslate" plus meta name="google" content="notranslate". Keep these permanent site-level directives to suppress Chrome automatic translation offers and preserve intentional BM/English educational wording. Browser/user overrides remain outside SPA control.

> Current quiz review/submission contract: remove the manual review checkbox. Clicking Semak jawapan automatically persists the review flag and immediately turns that question navigation button gold; Next/Back/refresh retain it. Checking an unanswered question still flags it but requests an answer before showing feedback. Preserve first checked Practice answer for scoring. The submit modal shows a busy state and an inline, retryable error; only navigate to results after Firestore acknowledgement. Validate partial scores using floating-point arithmetic with a small rounding tolerance, never truncated integer division. Timeout does not cancel an underlying write; retry uses the same immutable attempt ID.

> Current required disclaimer (desktop/mobile footer and About): PENAFIAN: Platform ini dibangunkan secara bebas untuk tujuan pendidikan dan latihan sahaja. Semua bahan bukan penerbitan rasmi dan tidak disokong, ditaja atau mempunyai sebarang kaitan dengan MARA, MRSM atau Cambridge. This user-supplied text supersedes earlier affiliation/disclaimer wording; reserve the measured footer height so no controls are covered.

> Active display name: **MRSM – Persediaan Ujian IGCSE**. Sidebar displays MRSM / Persediaan Ujian IGCSE; compact mobile header uses MRSM IGCSE. This user-requested BM name supersedes earlier English product labels; educational scope is unchanged.

> **Hosting status - 15 November 2026:** The user explicitly authorised publishing Firebase Hosting in the latest instruction. Deployment completed successfully at https://kuiz-igcse.web.app, serving only the 23 files under public/. Earlier statements that Hosting was not authorised/published are historical and superseded by this update. Current live-site verification is recorded in docs/VALIDATION.md. Account recovery, educator moderation, backup/retention and other longer-term work remain open.


## Active architecture decision ? Firebase SPA (15 November 2026)

The latest user instruction explicitly supersedes every earlier Express, SQLite, REST API, server scoring, server draft/deadline and local-only storage instruction in this document. Those details are retained below as historical requirements and in `.local/archive/document-history/pre-firebase/`; they are not implementation tasks. All educational scope, source verification, original question content, BM UI, guides, glossary, profiles, results, gamification, responsive design and donation footer requirements remain active. `docs/archive/prompts/full_prompt_original.md` remains unchanged.

- Serve the entire application from `public/` on Firebase Hosting; `public/index.html`, `public/css/style.css`, modular `public/js/` and `public/questions.json`. No Express server, SQLite database or privileged Admin SDK in the active runtime.
- Use the modular Firebase Web SDK (v9+; pinned CDN version 13.3.0). Firebase Anonymous Authentication supplies browser-persisted UID ownership. A student profile is not an independent login. Account linking and recovery across browsers are future work.
- Store profiles in `students/{id}` and completed results in the top-level `attempts/{quizId}` collection. Each record carries `ownerId`. Attempts include studentId, subject, score/percentage, date, server-createdAt timestamp and full question/answer/explanation snapshots.
- Query Firestore for the current owner's student and attempts. Dashboard total is the number of completed attempts; average is the arithmetic mean of attempt percentages. Build subject/topic analytics, history and private rewards from these saved records, not browser counters.
- Use a deterministic quiz/attempt ID and a Firestore transaction: retry returns the first committed result; immutable attempt updates are denied. Show success only after acknowledgement. No silent local-only substitute for completed cloud results.
- Load original English, Mathematics and Science practice from public local JSON. Keep Practice, Examination, Challenge and Daily Challenge, filters, explanations, flags, review and retry. Dated daily selection is stable for the same published bank; preserve active question snapshots.
- Active drafts and timers are browser-local and resume on that browser. Completed results are cloud records. First checked Practice answer determines score. Offline final submission remains retryable using saved drafts. Full offline launch/sync is not implemented.
- All question keys, grading and timer logic are inspectable in a pure client SPA. Scores and client dates are self-reported practice data; Firestore createdAt is the server receipt time. Rules enforce ownership and basic shape/ranges, not trustworthy marking. No claim of tamper-proof examination or secure hidden answer keys. Trusted grading requires a separately authorised future backend architecture.
- Deploy default-deny Firestore rules, owner-restricted reads/deletes, constrained profile/attempt creation, immutable attempts and no anonymous public data listing. Authentication alone does not protect a shared browser from family members. Do not publish child slips or personal identifiers.
- Explain cloud storage, guardian permission, minimal nicknames, export/deletion, and loss of access if Anonymous browser identity is cleared. Deleting site data does not delete cloud data. No cross-device recovery promise. No external analytics or public leaderboard.
- Preserve existing private SQLite files; do not auto-upload or migrate old child records. Legacy runtime and scripts are archived under `.local/archive/legacy/express-sqlite/` and excluded from Hosting. SQLite backup commands no longer apply to active data. JSON exports are user snapshots, not automated cloud backups; cloud recovery, retention and restore drills remain deployment work.
- Develop locally using `npm run dev` (static files only), or Firebase Hosting/Auth/Firestore emulators. Emulator connections are explicitly enabled in config and restricted to localhost, using `demo-kuiz-igcse`. A production Web App config can be supplied by `/__/firebase/init.json` on Firebase Hosting or `public/js/firebase-config.js`. Never invent config or include service-account keys.
- Firebase CLI login in another terminal is not evidence of Web SDK configuration, enabled Anonymous provider, deployed rules or a tested cloud write. Record actual test evidence and unresolved setup separately. Hosting publication was subsequently authorised by the user and completed; further changes follow the current authorised scope.

Acceptance: create a nickname profile ? choose each subject from JSON ? answer and submit ? owner-scoped Firestore attempt with score/date/answers ? reload ? Dashboard average/count/history match records. Duplicate submission creates one attempt. A second UID cannot access another UID's profiles/attempts. Unauthenticated access is denied. Mobile footer never covers controls; support modal remains usable. Cloud failure must not display a falsely saved result. Verify local emulators and clearly distinguish emulator from production evidence.

Official technical references, checked 15 November 2026: [modular CDN setup](https://firebase.google.com/docs/web/alt-setup), [Anonymous Authentication](https://firebase.google.com/docs/auth/web/anonymous-auth), [Firestore writes](https://firebase.google.com/docs/firestore/manage-data/add-data), [security rules](https://firebase.google.com/docs/firestore/security/rules-conditions), [Hosting configuration](https://firebase.google.com/docs/hosting/full-config), [emulators](https://firebase.google.com/docs/emulator-suite).


### Firebase implementation evidence ? 15 November 2026

The pure-client pivot is implemented and verified: /public SPA, modular Web SDK13.3.0, Anonymous owner profiles, attempts collection with score/date/answers, transaction retry, Firestore-derived Dashboard and local JSON questions. Eight engine tests, 17 actual emulator rules checks, three-subject emulator browser flow and REAL kuiz-igcse browser integration passed. Real average/count were 66.6667/3 after reload; synthetic profile/attempts and successful-run Auth identity deleted. Rules/indexes applied; Hosting published at https://kuiz-igcse.web.app. The CLI enabled Firestore API and automatically provisioned missing default database in nam5 (Native/Standard/free-tier; PITR disabled). Do not claim local-only data or Malaysia residency. Use nicknames, preserve Anonymous identity/export first; account linking and managed cloud backups remain future scope. Keep Anonymous automatic cleanup disabled until recovery/retention is designed. Original prompt and prototype hashes unchanged. Full evidence and residual dev-tool advisories: docs/VALIDATION.md.

## Retained scope and historical implementation record

Earlier architecture-specific text below is superseded by the active decision above. Completed historical tests do not certify the Firebase implementation.


> **Authoritative consolidated specification — 15 November 2026.** The user explicitly authorised research and local application implementation on 15 November 2026. Local build directives are now active; public deployment remains unauthorised. Parts 1–15 preserve the complete available 1,370-line baseline; Parts 16–22 incorporate companion-document requirements, resolve conflicts and complete acceptance rules. The archived original is `docs/archive/prompts/full_prompt_original.md`; the comparison and source-line inventory are in `docs/archive/REQUIREMENTS_COMPARISON.md`.

> **Version limitation:** The supplied `full_prompt.md` was itself exactly 1,370 lines. No separately identifiable earlier/latest prompt or Git history was present. This consolidation compares that baseline with all seven companion documents; it does not claim an unavailable second-version comparison.

You are acting as a Senior Full-Stack Developer, Educational Researcher, Cambridge IGCSE Curriculum Researcher, UX/UI Designer, Assessment Specialist and Software Architect.

Your task is to research, design, develop, test and document a complete interactive web application called:

**IGCSE MRSM PREPARATION HUB**

Project directory:

`D:\IGCSE`

The application is a new build, but the workspace already contains documentation and `docs/archive/prototype/igcse_prep_quiz.html`. Preserve and inspect existing work. Build the specified application when implementation is authorised.

The application will initially run locally on Windows for testing. It will eventually be deployed publicly so Malaysian parents and students can use it as a community learning and examination preparation platform.

The main target audience:
- Malaysian Year 6 pupils (Darjah 6).
- Students preparing for MRSM Form 1 admission.
- Students interested in the MRSM IGCSE programme.
- Parents who want to understand MRSM and IGCSE.
- Students who want to improve English, Mathematics and Science.

Primary initial user:
- Student name: Ammar.
- Current level: Year 6 / Darjah 6.
- Target: MRSM IGCSE Form 1 admission preparation.
- Target examination date provided by parent: 18 November 2026.
- This date is user-provided context, NOT independently verified examination information.

The application must be useful beyond Ammar. It must be suitable for the wider Malaysian community.

---

# PART 1 — PROJECT OBJECTIVES

Build a polished, modern, fun and educational platform.

The system must achieve these objectives:

1. Provide comprehensive information about MRSM Form 1 admission.
2. Explain the MRSM IGCSE programme accurately.
3. Explain what students can expect when entering the programme.
4. Research Cambridge International IGCSE qualifications and assessment structures.
5. Provide a structured question bank for examination preparation.
6. Provide interactive quizzes with automatic marking.
7. Save student profiles and examination attempts.
8. Show individual learning progress.
9. Help parents monitor their children's progress.
10. Be ready for eventual public deployment and community use.

This is NOT just a landing page with a few sample questions.

Build a real, functional educational application.

---

# PART 2 — DEEP RESEARCH REQUIREMENTS

WHEN IMPLEMENTATION IS AUTHORISED: RESEARCH FIRST. DO NOT START CODING IMMEDIATELY. The current documentation task does not initiate application development.

Create a research directory:

`docs/research/`

Conduct comprehensive research using reliable, current and authoritative sources.

## A. Cambridge IGCSE

Primary official reference:

https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/

Research:

- What is Cambridge IGCSE?
- What is Cambridge Upper Secondary?
- Age range and typical learning stages.
- Subject structure.
- Subject groups.
- Assessment methods.
- Examination papers.
- Multiple-choice questions.
- Structured questions.
- Practical assessments.
- Coursework, where applicable.
- Grading systems.
- Assessment objectives.
- Differences between Cambridge IGCSE and Malaysian KSSM/SPM.
- English language requirements.
- Mathematics syllabus and terminology.
- Science syllabus and terminology.
- How students should prepare.
- How Cambridge assessments evaluate knowledge, understanding and application.

Find official resources:

- Cambridge IGCSE subject syllabuses.
- Specimen papers.
- Past examination papers.
- Mark schemes.
- Examiner reports.
- Learner guides.
- Example candidate responses.
- Official subject pages.

Prioritise the following subjects:

1. English Language.
2. Mathematics.
3. Biology.
4. Chemistry.
5. Physics.
6. Combined Science / Coordinated Sciences, where relevant.

Important:

Do not assume that all Cambridge IGCSE subjects or assessment structures are identical.

Always identify the subject, syllabus code, examination year and relevant assessment route when known.

## B. MRSM Form 1 Admission

Research the latest official Malaysian MARA/MRSM information.

Prioritise:

- MARA official website.
- Official MRSM admission announcements.
- Official MRSM programme information.
- Official UKKM information.
- Official application requirements.
- Official eligibility criteria.
- Official admission procedures.
- Official examination or assessment information.
- Official MRSM IGCSE programme information.

Research:

1. MRSM Form 1 admission process.
2. Eligibility requirements.
3. Application process.
4. Important application dates.
5. UKKM assessment.
6. Other relevant selection assessments.
7. Interview requirements, if applicable.
8. Available MRSM programmes.
9. Differences between MRSM Premier, IGCSE and other programmes.
10. Specific requirements for MRSM IGCSE admission.
11. What students should prepare academically.
12. What parents should know before applying.

Do not confuse:

- UKKM.
- MRSM IGCSE selection assessment.
- Internal MRSM examinations.
- Cambridge IGCSE examinations.

These are different things and must be explained separately.

Do not claim that English, Mathematics and Science are definitely the complete official entrance examination subjects unless supported by an authoritative source.

## C. MRSM IGCSE Programme

Research specifically:

- What makes MRSM IGCSE different?
- How the Malaysian national curriculum is combined with Cambridge curriculum.
- Whether students sit for both SPM and Cambridge examinations.
- At which form levels examinations are taken.
- Subject combinations.
- Learning duration.
- English-medium learning.
- Student workload.
- Advantages.
- Challenges.
- University pathways.
- Parent expectations.
- Preparation for Form 1.

Important:

Do not repeat unverified claims such as every MRSM IGCSE student follows exactly the same subject combination or examination timetable.

Distinguish official facts from general educational explanations.

## D. Research Documentation

Produce these documents:

`docs/research/01-cambridge-igcse.md`

`docs/research/02-mrsm-form1-admission.md`

`docs/research/03-mrsm-igcse-programme.md`

`docs/research/04-ukkm-and-selection-assessment.md`

`docs/research/05-examination-preparation-strategy.md`

`docs/research/06-question-bank-research.md`

`docs/research/07-sources-and-verification.md`

Every factual claim should have a source reference.

For every source, record:

- Title.
- Publisher / organisation.
- URL.
- Publication or update date, if available.
- Date accessed.
- What information was obtained.
- Whether it is an official or secondary source.

Use this source hierarchy:

1. Official MARA.
2. Official Cambridge International.
3. Official Malaysian education authorities.
4. Reputable educational institutions.
5. Other reputable educational resources.

If information cannot be verified, explicitly label it:

"Not independently verified."

Never fabricate official examination formats, admission requirements, dates, syllabus codes or assessment structures.

---

# PART 3 — QUESTION BANK DEVELOPMENT

Create a comprehensive original question bank.

This is one of the most important components.

Do not settle for 10 or 20 questions.

Build a structured, expandable question bank with a target of at least 300 original questions in the first release.

Suggested distribution:

| Subject | Target |
|---|---:|
| English | 100 |
| Mathematics | 100 |
| Science | 100 |
| Total | 300 |

The bank must be expandable to 1,000+ questions.

All questions should be original and independently written based on verified learning objectives, appropriate age levels and publicly available syllabus information.

## Copyright requirements

Cambridge past papers, specimen papers and mark schemes may be copyrighted.

You may:

- Study their format.
- Study their difficulty.
- Analyse their assessment objectives.
- Refer users to official Cambridge resources.
- Write original questions testing similar skills.
- Create original explanations and worked solutions.

You must NOT:

- Bulk-copy Cambridge past papers.
- Scrape copyrighted question banks.
- Reproduce entire examination papers.
- Claim original questions are official Cambridge questions.
- Use copyrighted material without permission.

Label the platform's questions:

"Original practice questions inspired by relevant learning objectives and examination styles. Not official Cambridge examination questions."

## Question categories

### ENGLISH

Create sections:

1. Grammar.
2. Vocabulary.
3. Reading comprehension.
4. Sentence structure.
5. Tenses.
6. Subject-verb agreement.
7. Prepositions.
8. Conjunctions.
9. Synonyms.
10. Antonyms.
11. Spelling.
12. Punctuation.
13. Cloze passages.
14. Contextual understanding.
15. Critical reading.
16. Short writing.
17. Sentence correction.

Focus on practical English competency.

Every question must use proper English.

Provide explanations in simple English with optional Malay translations.

### MATHEMATICS

Create sections:

1. Whole numbers.
2. Fractions.
3. Decimals.
4. Percentages.
5. Ratio and proportion.
6. Basic algebra.
7. Geometry.
8. Perimeter.
9. Area.
10. Volume.
11. Angles.
12. Measurements.
13. Time.
14. Speed, distance and time.
15. Statistics.
16. Probability.
17. Patterns.
18. Number sequences.
19. Word problems.
20. Logical reasoning.

Questions should progressively develop from primary school foundations towards suitable Cambridge Lower Secondary / IGCSE preparation concepts.

Include:

- Calculation questions.
- Multi-step problems.
- Real-world scenarios.
- Logical reasoning.
- HOTS questions.
- Questions requiring careful reading.

Show step-by-step working after answering.

Use proper mathematical notation.

### SCIENCE

Create sections:

1. Living things.
2. Cells.
3. Human body.
4. Plants.
5. Photosynthesis.
6. Reproduction.
7. Food chains.
8. Ecosystems.
9. Matter.
10. States of matter.
11. Atoms and elements.
12. Mixtures.
13. Forces.
14. Motion.
15. Gravity.
16. Friction.
17. Energy.
18. Electricity.
19. Light.
20. Sound.
21. Heat.
22. Earth and space.
23. Scientific investigation.
24. Experimental variables.
25. Data interpretation.

Include scenario-based questions.

Students must learn to interpret information, identify variables, analyse observations and apply scientific principles.

## Question metadata

Every question must contain:

- Unique ID.
- Subject.
- Topic.
- Subtopic.
- Difficulty.
- Question type.
- Question text.
- Answer options, where applicable.
- Correct answer.
- Explanation.
- Learning objective.
- Estimated time.
- Language.
- Source/reference or curriculum alignment.
- Tags.

Difficulty levels:

- Level 1: Easy.
- Level 2: Basic.
- Level 3: Intermediate.
- Level 4: Advanced.
- Level 5: Challenge / HOTS.

Question types:

- Multiple choice.
- True / False.
- Fill in the blanks.
- Short answer.
- Numerical answer.
- Reading comprehension.
- Multi-step calculation.

For the first release, ensure all question types implemented in the UI can actually be marked correctly.

Do not generate duplicate questions with merely different numbers.

Do not create questions with ambiguous wording or multiple correct answers unless explicitly designed as multi-select questions.

Validate every answer and explanation.

---

# PART 4 — INTERACTIVE QUIZ ENGINE

Create a polished quiz experience.

The student should enjoy using it.

## Quiz features

1. Select subject.
2. Select topic.
3. Select difficulty.
4. Select number of questions.
5. Randomised question order.
6. Randomised answer order where safe.
7. Countdown timer.
8. Question navigation.
9. Progress indicator.
10. Mark questions for review.
11. Submit examination.
12. Automatic marking.
13. Score percentage.
14. Correct answers.
15. Incorrect answers.
16. Explanation for each answer.
17. Time taken.
18. Final result summary.
19. Retake quiz.
20. Save every completed attempt.

Allow these modes:

### Practice Mode

- No pressure.
- Optional timer.
- Instant feedback.
- Show explanation after answering.
- Allow students to retry.

### Examination Mode

- Timed.
- No instant feedback.
- Questions presented in examination style.
- Show results only after submission.
- Save the attempt.

### Challenge Mode

- Higher difficulty.
- HOTS questions.
- Mixed topics.
- Time pressure.
- Bonus scoring, if appropriate.

### Daily Challenge

- A short daily quiz.
- Five to ten questions.
- Mix of subjects.
- Track daily completion.

## Result screen

Show:

- Student name.
- Subject.
- Date and time.
- Total questions.
- Correct answers.
- Incorrect answers.
- Unanswered questions.
- Percentage.
- Time taken.
- Performance category.
- Topic weaknesses.
- Recommended next practice.

Example:

English: 78%

Mathematics: 62%

Science: 85%

Do not use misleading performance labels that imply official examination grades.

Use simple labels:

- Excellent.
- Good.
- Keep Practising.
- Needs Improvement.

Explain that these are internal practice indicators, not official Cambridge grades.

---

# PART 5 — STUDENT PROFILE AND ATTEMPT HISTORY

The application must support multiple students.

On first use, display a welcome screen.

Ask for:

- Student name / display name.
- Optional parent or guardian name.
- Optional year level.
- Optional school name.

Do not require unnecessary personal information.

For public deployment, implement appropriate parental consent and privacy protections for children.

Do not expose children's full names, school names, detailed results or personal records publicly.

## Local testing mode

During local development:

- Use SQLite as the database.
- Save student profiles.
- Save quiz attempts.
- Save individual answers.
- Save scores.
- Save timestamps.
- Save subject performance.
- Allow students to continue using an existing profile.

Do not rely only on browser localStorage for persistent examination records.

## Student dashboard

Create:

- Total quizzes completed.
- Average score.
- Best score.
- Recent attempts.
- Subject performance.
- Weak topics.
- Strong topics.
- Improvement over time.
- Learning streak.

Include visual charts.

## Attempt history

Students must be able to:

- View previous attempts.
- Open detailed results.
- Review wrong answers.
- Retry questions.
- Compare previous scores.

## Parent monitoring

Parents should be able to view:

- Overall progress.
- Subject performance.
- Areas requiring attention.
- Quiz history.
- Improvement trends.
- Suggested revision priorities.

---

# PART 6 — SINGLE-PAGE APPLICATION DESIGN

Build a Single Page Application.

The user should not need to navigate through multiple HTML pages.

Main application layout:

### Navigation

- Home.
- Start Quiz.
- Question Bank.
- My Progress.
- Student Guide.
- Parent Guide.
- About.

Use tabbed navigation or a clean single-page navigation system.

Do not reload the page unnecessarily.

## HOME TAB

Include:

- Attractive hero section.
- Welcome message.
- Student profile.
- Start learning button.
- Subject cards.
- Daily challenge.
- Recent activity.
- Overall progress.

Suggested headline:

"Your Journey to MRSM IGCSE Starts Here."

Subtitle:

"Learn. Practise. Improve. Be Ready."

## QUIZ TAB

Include:

- Subject selector.
- Topic selector.
- Difficulty selector.
- Practice mode.
- Examination mode.
- Challenge mode.
- Start button.

## QUESTION BANK TAB

Allow filtering by:

- Subject.
- Topic.
- Difficulty.
- Question type.

Show the total available question count.

## PROGRESS TAB

Include:

- Score cards.
- Charts.
- Performance by subject.
- Weakness analysis.
- Attempt history.
- Recommendations.

## STUDENT GUIDE TAB

Use friendly, simple language.

Explain:

1. What is MRSM?
2. What is IGCSE?
3. What happens when entering Form 1?
4. Why English is important.
5. How to improve English vocabulary.
6. How to understand Mathematics questions in English.
7. How to study Science in English.
8. How to manage examination time.
9. How to handle difficult questions.
10. How to build confidence.
11. How to develop good study habits.

Include an English-Malay academic vocabulary glossary.

Example:

| English | Bahasa Melayu |
|---|---|
| Fraction | Pecahan |
| Percentage | Peratus |
| Perimeter | Perimeter / Ukur keliling |
| Area | Luas |
| Volume | Isi padu |
| Gravity | Graviti |
| Friction | Geseran |
| Evaporation | Penyejatan |
| Photosynthesis | Fotosintesis |
| Investigation | Penyiasatan |
| Evidence | Bukti |
| Conclusion | Kesimpulan |

Make the glossary searchable.

## PARENT GUIDE TAB

Use clear Malaysian parent-friendly language.

Include:

1. What is MRSM?
2. MRSM Form 1 admission overview.
3. UKKM explanation.
4. What is MRSM IGCSE?
5. Difference between MRSM Premier and IGCSE.
6. Cambridge IGCSE overview.
7. What parents should expect.
8. Academic workload.
9. Importance of English.
10. Mathematics preparation.
11. Science preparation.
12. Advantages of the programme.
13. Challenges and considerations.
14. How parents can support children.
15. Suggested weekly study routine.
16. Frequently asked questions.
17. Official reference links.

Use expandable FAQ sections.

Include source links beside important official claims.

Clearly distinguish verified official information from general advice.

## ABOUT TAB

Explain:

- Purpose of this project.
- Community learning initiative.
- Independent practice platform.
- Not an official MARA website.
- Not affiliated with Cambridge International.
- Not an official admission assessment simulator.

---

# PART 7 — VISUAL DESIGN

Design quality is important.

Do not make it look like a boring school administration system.

Visual direction:

- Premium modern educational platform.
- Clean dashboard.
- Modern typography.
- Friendly but professional.
- Responsive design.
- Smooth transitions.
- Subtle animations.
- Attractive progress indicators.
- Beautiful quiz cards.
- Clear typography and spacing.

Suggested theme:

- Navy blue.
- White.
- Gold accents.
- Soft grey background.

Use a consistent design system.

Use icons where appropriate.

Use accessible colour contrast.

Support:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

The quiz interface must be particularly mobile-friendly.

Avoid unnecessary visual clutter.

Do not overuse gradients, animations or glassmorphism.

Use a responsive navigation system.

---

# PART 8 — TECHNICAL ARCHITECTURE

Recommended initial stack:

Backend:
- Node.js.
- Express.js.
- SQLite.

Frontend:
- HTML5.
- CSS3.
- Vanilla JavaScript or lightweight modular JavaScript.

Charts:
- Chart.js or another lightweight chart library.

Icons:
- Lucide Icons.

Database:
- SQLite.

Use modular architecture.

Suggested structure:

```text
D:\IGCSE
│
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── routes/
│   │   ├── students.js
│   │   ├── questions.js
│   │   ├── quizzes.js
│   │   ├── attempts.js
│   │   └── dashboard.js
│   │
│   ├── services/
│   │   ├── quizService.js
│   │   ├── scoringService.js
│   │   └── analyticsService.js
│   │
│   ├── middleware/
│   │   └── security.js
│   │
│   └── database/
│       ├── schema.sql
│       └── seed.js
│
├── public/
│   ├── index.html
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│
├── data/
│   └── .gitkeep
│
├── docs/
│   ├── research/
│   ├── architecture/
│   └── user-guide/
│
├── tests/
│
└── scripts/
```

You may improve this architecture if there is a strong technical reason.

Keep the frontend as one main HTML application.

Use JavaScript modules to separate functionality.

## Database tables

Design a proper relational database.

At minimum:

1. students
2. questions
3. question_options
4. subjects
5. topics
6. quizzes
7. quiz_attempts
8. attempt_answers
9. learning_progress
10. daily_challenges

Use appropriate:

- Primary keys.
- Foreign keys.
- Indexes.
- Timestamps.
- Data validation.
- Database constraints.

Use migrations or a versioned schema process.

Do not store all data in one JSON file.

## API

Create REST API endpoints.

Examples:

GET /api/health

GET /api/subjects

GET /api/topics

GET /api/questions

GET /api/questions/:id

POST /api/students

GET /api/students/:id

GET /api/students/:id/progress

GET /api/students/:id/attempts

POST /api/quizzes/start

POST /api/quizzes/:id/submit

GET /api/attempts/:id

GET /api/dashboard/:studentId

Validate all inputs.

Do not trust scores calculated by the browser.

Calculate final scores on the server.

Prevent duplicate submissions.

---

# PART 9 — PUBLIC DEPLOYMENT PREPARATION

The project will eventually be deployed publicly.

However, DO NOT deploy it now.

First, make it work locally.

Prepare for future deployment to a public VPS.

Requirements:

- Environment-based configuration.
- No hardcoded production secrets.
- Proper database backup strategy.
- Error handling.
- Logging.
- Input validation.
- Rate limiting.
- Secure HTTP headers.
- SQL injection protection.
- XSS protection.
- CSRF protection where relevant.
- CORS configured appropriately.
- No unnecessary personal information.
- No public exposure of student records.
- No public leaderboard displaying children's names by default.

Public deployment must support multiple users.

SQLite can be used for the initial local MVP. Document its production limitations and the migration path if concurrent community traffic grows.

Before public launch, plan:

- Secure parent/student account authentication.
- Password hashing.
- Session security.
- Parental consent.
- Data deletion requests.
- Privacy policy.
- Terms of use.
- Data retention policy.
- Admin access.
- Database backup.
- HTTPS.
- Abuse prevention.

Do not claim the application is production-ready for public children’s data merely because it runs locally.

---

# PART 10 — EDUCATIONAL QUALITY CONTROL

Implement a question validation process.

Before inserting questions:

1. Check that the question is understandable.
2. Check the correct answer.
3. Check all distractors.
4. Check explanation.
5. Check age appropriateness.
6. Check topic relevance.
7. Check difficulty.
8. Check for duplicates.
9. Check mathematical calculations.
10. Check grammar and spelling.

For Mathematics, independently verify calculations.

For Science, verify scientific accuracy.

For English, ensure grammatical correctness.

Avoid questions with multiple plausible answers unless the question is intentionally designed for multiple correct answers.

Do not present every question as an official Cambridge examination question.

---

# PART 11 — SAMPLE QUESTIONS PROVIDED BY PARENT

Use these as initial seed examples, after independently checking their answers and wording.

ENGLISH:

"The students ______ to the science lab when the fire alarm suddenly rang."

A. is walking
B. are walking
C. were walking
D. walks

Correct answer: C.

Explanation: Past continuous tense describes an ongoing action interrupted by another past event.

ENGLISH VOCABULARY:

"Choose the word that has the closest meaning to INVESTIGATE."

A. Ignore
B. Examine
C. Forget
D. Hide

Correct answer: B.

SCIENCE:

"A healthy green plant was placed inside a dark cupboard and watered every day. After one week, its leaves turned yellow. What is the most likely explanation?"

A. It did not receive enough water.
B. It was attacked by insects.
C. It could not photosynthesise normally due to the absence of light.
D. The temperature was necessarily too cold.

Correct answer: C.

SCIENCE:

"Which object is most likely to float in water?"

A. Iron nail
B. 50-cent coin
C. Plastic bottle cap
D. Glass marble

Correct answer: C, assuming a typical sealed/lightweight plastic bottle cap.

MATHEMATICS:

"A set of notebooks costs RM15. If Ammar buys four sets and receives a 20% discount, how much does he pay?"

A. RM60
B. RM48
C. RM12
D. RM50

Correct answer: B.

Working:
4 × RM15 = RM60.
20% × RM60 = RM12.
RM60 − RM12 = RM48.

MATHEMATICS:

"A piece of string is 120 cm long. It is divided into three parts in the ratio 1:2:3. What is the length of the longest part?"

A. 20 cm
B. 40 cm
C. 60 cm
D. 80 cm

Correct answer: C.

Working:
Total ratio = 1 + 2 + 3 = 6.
120 ÷ 6 = 20.
Longest part = 3 × 20 = 60 cm.

These are initial examples, NOT sufficient for the complete question bank.

---

# PART 12 — TESTING REQUIREMENTS

Create automated tests.

Test:

- Server startup.
- Database initialization.
- Student registration.
- Question retrieval.
- Quiz creation.
- Quiz submission.
- Automatic scoring.
- Incorrect answers.
- Unanswered questions.
- Attempt history.
- Progress calculation.
- Duplicate submission prevention.
- Invalid input handling.
- Mobile responsiveness.

Test the complete workflow:

1. Start application.
2. Create student profile.
3. Select English.
4. Start practice quiz.
5. Answer questions.
6. Submit quiz.
7. Display result.
8. Save attempt.
9. Refresh page.
10. Verify saved attempt.
11. Start Mathematics quiz.
12. View dashboard.
13. Verify subject progress.

All critical functionality must work.

Do not use fake buttons or non-functional menu items.

---

# PART 13 — REQUIRED DOCUMENTATION

Create:

1. README.md
2. docs/project/OVERVIEW.md
3. docs/research/METHODOLOGY.md
4. docs/architecture/SYSTEM_ARCHITECTURE.md
5. docs/architecture/DATABASE_SCHEMA.md
6. docs/architecture/API_REFERENCE.md
7. docs/content/QUESTION_BANK_GUIDELINES.md
8. docs/operations/PRIVACY_AND_SECURITY.md
9. docs/operations/LOCAL_DEVELOPMENT.md
10. docs/operations/DEPLOYMENT.md

README must include:

- Project overview.
- Features.
- Requirements.
- Installation.
- How to run locally.
- How to reset database.
- How to add questions.
- How to run tests.

The local development command should be straightforward:

```powershell
cd D:\IGCSE
npm install
npm run dev
```

Open:

http://localhost:3000

---

# PART 14 — DEVELOPMENT WORKFLOW

Follow these stages.

Do not skip stages.

## PHASE 1 — Research

- Inspect project directory.
- Check available Node.js and npm versions.
- Research official Cambridge and MARA resources.
- Produce research documents.
- Create a verified facts list.
- Identify missing or unverified information.

## PHASE 2 — Planning

- Design system architecture.
- Design database schema.
- Design API.
- Plan question bank.
- Design user journeys.
- Establish UI design system.

## PHASE 3 — Foundation

- Initialise Node project.
- Install dependencies.
- Configure Express.
- Initialise SQLite.
- Create database schema.
- Build API.
- Add sample seed data.

## PHASE 4 — Frontend

Build the complete SPA:

- Home.
- Student profile.
- Quiz engine.
- Question bank.
- Results.
- Progress dashboard.
- Student guide.
- Parent guide.
- FAQ.
- Glossary.

## PHASE 5 — Question Bank

- Generate original questions.
- Organise by subject.
- Organise by topic.
- Set difficulty.
- Verify answers.
- Import into SQLite.
- Validate total question count.

## PHASE 6 — Testing

- Run automated tests.
- Test manually.
- Fix bugs.
- Check responsive design.
- Check database persistence.

## PHASE 7 — Finalisation

- Complete documentation.
- Verify local startup.
- Provide project summary.
- List completed features.
- List known limitations.
- List future deployment steps.

---

# PART 15 — IMPORTANT EXECUTION RULES

1. Once implementation is explicitly authorised, do not stop at a plan: create the project files and implement the application. During this documentation-only task, do not begin that work.
2. Do not stop after creating an HTML mockup.
3. Do not use fake data for research findings.
4. Do not fabricate official admission information.
5. Do not copy copyrighted Cambridge examination papers.
6. Do not leave non-functional buttons.
7. Do not skip testing.
8. Do not deploy publicly.
9. Do not overwrite existing files without inspecting them first.
10. Keep the application maintainable and modular.
11. Prioritise educational accuracy over the number of questions.
12. If a research source is unavailable, document the limitation rather than inventing its content.
13. Use current official information as of the research date.
14. Keep all user-facing explanations simple and suitable for Malaysian parents and primary school students.
15. The main quiz language should be English, with optional Malay explanations.
16. Parent information should primarily use Bahasa Melayu with English terminology where useful.
17. Ensure student data is private.
18. Every completed quiz attempt must be saved to SQLite.
19. Never claim that this is an official MARA or Cambridge platform.
20. Build a genuinely useful application, not just a demonstration.

---

# FINAL ACCEPTANCE CRITERIA

The project is considered complete for the first local MVP only when:

- [ ] Research documents are available.
- [ ] Official source references are documented.
- [ ] MRSM admission information is properly qualified and verified.
- [ ] Cambridge IGCSE information is properly documented.
- [ ] Original question bank contains at least 300 validated questions, or a smaller number is explicitly reported with reasons if quality validation prevents reaching the target.
- [ ] English quiz works.
- [ ] Mathematics quiz works.
- [ ] Science quiz works.
- [ ] Practice mode works.
- [ ] Examination mode works.
- [ ] Challenge mode works.
- [ ] Student profiles work.
- [ ] SQLite persistence works.
- [ ] Attempt history works.
- [ ] Dashboard works.
- [ ] Parent guide works.
- [ ] Student guide works.
- [ ] Glossary works.
- [ ] Mobile layout works.
- [ ] Automated tests pass.
- [ ] Local server starts successfully.
- [ ] Documentation is complete.
- [ ] No public deployment has occurred.

At the end, report:

1. Research findings.
2. Important verified MRSM admission facts.
3. Important Cambridge IGCSE findings.
4. Total questions created by subject.
5. Features implemented.
6. Database structure.
7. Tests performed and results.
8. How to start the application.
9. Local URL.
10. Known limitations.
11. Recommended next development phase.

**When the user explicitly starts implementation, begin with PHASE 1 — RESEARCH and proceed through all phases until the local MVP is working. Until then, maintain the documentation-only boundary.**

Do not ask me for approval after every phase. Make sensible engineering decisions, document them and continue.

If a major blocker genuinely prevents further work, explain it clearly and complete all other independent work first.

---

# PART 16 — AUTHORITATIVE CONSOLIDATION AND SCOPE RULES

## 16.1 Authority, provenance and current execution boundary

This document is the single source of truth for product scope, educational research, implementation and acceptance. `docs/project/PRD.md`, `docs/project/ARCHITECTURE.md`, `docs/project/DESIGN.md`, `docs/project/RULES.md`, `docs/project/AGENT.md`, `Task.md` and `docs/project/MEMORY.md` are aligned views of this specification; they cannot silently reduce it. Change this document first when an approved scope decision changes a requirement, then synchronise affected views and the roadmap.

The 1,370-line file available at the start of the 15 November 2026 consolidation is preserved byte-for-byte as `docs/archive/prompts/full_prompt_original.md`. No separately identifiable older or newer prompt, attachment or Git history was available. Do not claim to have compared two independently supplied prompt versions. If a distinct version is subsequently supplied, reconcile it additively and record all differences before declaring version coverage complete. `docs/archive/REQUIREMENTS_COMPARISON.md` records the source inventory, findings, dispositions and source-line traceability.

**Current authorisation: research and local application implementation.** The user explicitly activated the build after the documentation/research intake sessions. Earlier documentation-only restrictions describe those completed sessions; they no longer pause local implementation. Preserve archived evidence and private candidate records. Public deployment and paid infrastructure remain gated.

`docs/archive/prototype/igcse_prep_quiz.html` is an existing legacy prototype/reference, not evidence of completed MVP features. Preserve it. Its browser-side scoring, limited content, local browser history, informal wording and external CDN dependencies do not replace this specification. Evaluate useful ideas later; do not treat the directory as empty or overwrite the prototype.

## 16.2 Requirement interpretation and release boundaries

- Parts 1–15 retain the complete available original scope, including all subject/topic lists, sample questions, directory/API examples, research outputs, tests and acceptance criteria. Repetition across research, product and acceptance sections reinforces obligations; it does not create separate implementations.
- Parts 16–22 integrate companion-document details and explicitly resolve gaps. A resolution refines an earlier instruction only where identified; it does not remove unrelated requirements.
- Required scope includes research, all seven navigation destinations, four quiz modes including Daily Challenge, multiple profiles, persisted answers/history, parent monitoring, glossary, accessible responsive UI and private gamification.
- Minimum first-release target remains 300 independently validated original questions, normally 100 per core subject, expandable to 1,000+. A documented quality-related shortfall is the original narrow exception, not permission to plan a small sample bank. Report reviewed/published counts separately from drafts and record remaining work.
- English, Mathematics and Science are the initial question-bank subjects, not a verified complete official admission subject list. Retain research and expandable support for other relevant learning areas, reasoning or selection components if official evidence supports them. Do not invent additional official papers or subject counts.
- Research Biology, Chemistry, Physics and relevant Combined/Coordinated Sciences separately even if the initial child-facing bank groups them under Science. Research English routes and Mathematics syllabus variants before choosing alignment; no syllabus code or route is predetermined.
- Local-first means Windows development, a localhost server and SQLite as authoritative persistence. It does not currently promise an offline PWA, cloud synchronisation or cross-device access. Record such requests as future scope decisions rather than silently interpreting them as delivered features.
- Local MVP, controlled private pilot and public community release are separate milestones. Any hosted pilot with children's records needs authentication, authorisation, consent, privacy and security before use; calling it private does not waive these gates. Public deployment requires explicit user authorisation after readiness evidence exists.

# PART 17 — RESEARCH EVIDENCE AND UNVERIFIED ASSUMPTIONS

## 17.1 Evidence workflow

Perform all deep research in Part 2 before implementing official educational/admission claims. Preserve all seven named research outputs and the complete Cambridge resource list, programme comparisons and preparation strategy. Study published assessment material lawfully; link to resources requiring permission or access instead of bypassing restrictions.

For each claim, record a stable claim ID, exact supported proposition, relevant application cycle/cohort/campus or syllabus/examination year, source title, publisher, URL, publication/update date if available, access date, source class, verification status and limitations. Distinguish facts verified from primary evidence, secondary-only reports, general educational guidance, unverified claims, conflicting evidence and superseded information. Record inaccessible or undated sources explicitly. Do not manufacture a publication date from an access date.

Prefer MARA/MRSM for admission and programme claims and Cambridge International for its qualifications and subject assessment claims; the source hierarchy does not make MARA authoritative over Cambridge syllabuses. Use Malaysian education authorities for national curriculum comparisons. Secondary sources can identify leads or contextual advice but cannot establish unsupported official admission rules.

Resolve conflicting statements by applicability and current authoritative evidence, not by whichever page was most recently visited. Retain a conflict note and unresolved status when necessary. Review time-sensitive claims before publishing guides, before each admission cycle and when source information changes. Place links and verification/access dates beside important claims in guides. Never turn a research task or assumed format into an established fact.

## 17.2 Explicit pending verification register

At initial documentation consolidation, no official findings had been verified. Subsequent scoped evidence is in research files 01-11; the following original verification register remains a checklist of claim boundaries, not a claim that later research did not occur:

| ID | Unverified item | Required disposition before presenting as official |
|---|---|---|
| U-01 | 18 November 2026 target assessment date | Parent-provided context only; verify assessment identity, year/cycle and official notice. Never imply that this date is a confirmed deadline or exam date. |
| U-02 | Current Form 1 eligibility, application procedure, application dates and any interview | Find applicable official MARA/MRSM notices and preserve qualifications/exceptions. |
| U-03 | UKKM and any distinct programme-specific selection | Establish whether each applies to the target intake; verify components, subjects, language, duration, question count, scoring, calculator/material rules and any interview. Unknown fields stay unknown. |
| U-04 | A complete English/Mathematics/Science admission format | Do not assert completeness, official weighting or a fixed paper structure from the practice subjects. |
| U-05 | MRSM IGCSE curriculum combination, SPM/IGCSE participation, examination forms/years, subject combinations, programme duration and English medium | Verify cohort/campus applicability rather than generalising all students or campuses. |
| U-06 | Cambridge subject names/codes, syllabus years, routes, grading and assessment components | Check official overview, subject pages and applicable syllabus documents separately. Verify availability/access conditions of resources. |
| U-07 | Additional subjects, reasoning or other selection preparation | Research relevance; propose age-appropriate additions with evidence and content targets rather than assuming official requirements. |
| U-08 | University pathways, programme benefits, workload and KSSM/SPM comparisons | Separate verified qualification facts from contextual advice and institution-specific admission decisions. |

Unknown official examination details do not block a clearly labelled independent educational practice mode. They do block claims of exact official simulation. This product does not predict admission or guarantee examination outcomes.

## 17.3 Supplied Gemini report: intake and follow-up evidence

The user subsequently supplied `.local/references/gemini/Kajian Kemasukan MRSM IGCSE.pdf` (16 pages). The review and targeted primary-source checks are recorded in `docs/research/08-gemini-report-review.md`, dated 15 November 2026. Preserve the PDF as secondary research. Its seven research headings do not complete the seven required research documents; its 46 references are leads, not proof that every claim was independently verified. This PDF does not resolve the missing distinct prompt-version issue.

Apply these additional research and content obligations without removing the original scope:

- Investigate PKSK, UKKM and specialised selection separately by intake and MOEIS/APDM registration route. Research Bahasa Melayu, reasoning/general knowledge, writing and non-academic components where relevant; do not turn reported component counts, timing or a 60% threshold into official simulator settings or admission predictions.
- Explicitly research parent-facing costs and assistance: applicable Cambridge exam fees, boarding/other charges and current BUDI/financial-support terms. Verify amounts, payment frequency, inclusions and eligibility from current applicable primary evidence. Do not collect household income, medical details or loan status as learner-profile fields merely because the dossier discusses them.
- Keep Cambridge grading code/year-specific. The review records corrections concerning Mathematics 0580 grading, the top Co-ordinated Sciences 0654 grade and English 0500 assessment-objective descriptions. Use the cited official sources, not the dossier wording, when developing factual content. These checked syllabus periods do not establish the child's eventual examination year, MRSM subject adoption or admission format.
- Review source applicability as well as domain: the cited MARA FAQ is explicitly about the 2020 intake. The reviewed KPM 2027 FAQ has a footer date later than this review date; record and corroborate this discrepancy before relying on its dates or applying its procedures to the target child.
- Include command-word support and misconception-based distractor review in the existing glossary/guidance/question-quality workflow. Retain primary foundations, all original topics and the full question target; do not force advanced IGCSE material onto all Year 6 learners.
- Use supportive, age-appropriate graduated practice. Do not import the report's high-pressure/elitist rhetoric, diagnose psychological resilience or train children to fake personality-test answers. Parent guidance must not promise programme fallback, scholarships or admission from unsupported claims.

U-06 is partially informed by targeted official syllabus checks; it remains open for route/year selection, MRSM applicability and the full subject/resource set. Other unverified admission, date, campus, quota, fee and assistance assertions remain pending. Initial consolidation statements about no verified research describe that earlier documentation session; the subsequent review provides a limited evidence update, not completion of deep research. Product architecture, scope and the implementation pause are unchanged.

## 17.4 Subsequent official research, private slips and glossary

The user has explicitly activated the local build. Required research files 01-07 now exist, with scoped current MARA/Cambridge evidence and remaining limitations; they do not claim every unknown is resolved. `docs/research/09-candidate-evidence-handling.md` records the boundary for supplied candidate images and the official call-up checking portal. Candidate-specific schedule context is kept in ignored private notes, not public seed/UI data. U-01 has parent-supplied documentary support; independent authentication of the personal portal record and exact special-test structure remain distinct unresolved matters.

The user's glossary expansion request is part of scope: retain all original entries and add the proposed command/subject words plus useful question-reading cues. The app now provides 100 unique English-Malay terms, five filter categories, combined text/category search, meaningful examples and visible mobile definitions. Scientific/language definitions must remain contextual: respiration includes aerobic/anaerobic distinctions, a solution is not restricted to solid-in-liquid, symmetry includes more than reflection, and adverbs may modify verbs/adjectives/other adverbs. Source checks and editorial-translation limits are recorded in `docs/research/10-glossary-validation.md`.

Implementation contracts, tested behaviour and limitations are documented in README, `docs/architecture/IMPLEMENTATION_CONTRACT.md` and `docs/testing/VALIDATION.md`. The initial bank remains 300 distinct questions, 100 per core subject with all 62 topics and all seven objective formats. Free writing remains a separate self/human-review activity. Independent educator moderation and hosted-release controls remain outstanding; no official simulator or production-readiness claim is authorised.

# PART 18 — QUESTION CONTENT, MARKING AND QUIZ LIFECYCLE CONTRACT

## 18.1 Content model and review

Retain every topic and question type in Part 3. Include short writing in the content plan; subjective writing requires a transparent rubric and human/self-review workflow rather than an unsupported claim of reliable automatic marking. Keep this distinction visible in setup and results. For objectively markable short answers, specify accepted variants explicitly.

In addition to the original metadata, store curriculum stage (primary foundation, lower-secondary bridge or relevant IGCSE extension), syllabus code/year/route where actually verified, subtopic, tags, difficulty rationale, review status, reviewer/check record and question version. Do not label all Year 6 questions as full IGCSE-level material. Draft, reviewed and published states must be distinct; students receive published questions only. Validate and review before promotion into the live bank; unpublished drafts may exist in a separate authoring/import workflow.

Provide an explicit answer schema per implemented type: option IDs for MCQ/True–False, accepted text variants and case/whitespace rules for blanks and objective short answers, units and tolerance/precision rules for numerical answers, linked passage and subquestion IDs for reading comprehension, and expected final answers plus worked steps for multi-step calculations. Do not imply that all intermediate reasoning was assessed when only the final answer was marked. Multi-select requires a separately declared schema and scoring policy before enabling it.

Preserve all six parent-supplied examples in Part 11 as review candidates, not already approved content. Resolve scientific ambiguity in the bottle-cap example through explicit material/buoyancy assumptions or revised wording; independently check the dark-cupboard explanation, distractors and age fit. Record revisions and provenance. Do not mistake example scores or sample content for real student activity.

## 18.2 Quiz configuration and lifecycle

- Support subject or mixed-subject selection, topic, difficulty, question count and mode. Reject impossible/empty combinations with a useful available-count message; do not silently pad with duplicates or substitute unrelated content.
- Store selected question versions, question order and safe option order on the server for the session. Shuffle by stable option IDs; disable shuffling for order-dependent answer choices. A retake creates a new attempt and preserves the prior attempt. Reviewing/retrying a wrong question must not overwrite its original result.
- Practice Mode provides immediate server-validated feedback and explanations after an answer; optional timer and retry are retained. A learner-controlled delayed-feedback setting may supplement this default, not remove instant feedback capability. Record first answers/retries so analytics do not misrepresent corrected responses as first-try mastery.
- Examination Mode is timed, without early feedback or answer keys. Challenge Mode retains timed, higher-difficulty mixed-topic/HOTS practice; timer duration is configurable and explicitly a practice setting. A later untimed accessibility variation must be labelled rather than silently removing the timed challenge requirement. Bonus rewards, if used, are separate from academic percentage.
- Daily Challenge contains five to ten questions across subjects; persist its dated question set and each profile's completion. Use Asia/Kuala_Lumpur for daily boundaries and streak calculations; persist timestamps consistently and display the relevant local date/time. Repeated completion does not award the same daily reward twice.
- Define `in_progress`, `submitted`, `expired` and `abandoned` states. Server start/deadline timestamps are authoritative; refreshing or changing the client clock cannot extend timed sessions. Save answer drafts and review flags on the server with an acknowledged-save indicator; browser storage may help recovery but cannot be the only record.
- On timeout, finalise from acknowledged answers exactly once, preserve unanswered questions and clearly distinguish expiry from voluntary submission. Document the chosen deadline/retry/network policy before coding; a lost response must allow safe re-fetch/retry without duplicate attempts or rewards. An interrupted/unconfirmed submission is not shown as successfully saved.
- Keep the same session and remaining time on refresh. Never call abandoned/in-progress work a completed quiz in the dashboard. Support previous/next, jump navigation, progress and review flags without losing answers. Confirm manual submission and identify unanswered/review-marked items.
- Validate session ownership, eligible question IDs, answer shape and allowed option IDs on the server. Persist completion, answers and score in one transaction. Repeated or concurrent final submissions return the same stored result and cannot change scores, history, analytics or rewards.
- Never send answer keys, correctness flags or hidden explanations in an examination payload, static seed asset or public question-bank response. The bank may support a deliberate learning/reveal action outside an active exam; this is not a secure official examination environment, and no such claim is permitted.

## 18.3 Scoring, results and progress definitions

Before implementation, document one scoring contract shared by content schemas, API and UI. Default local objective quizzes award one point per question with no negative marking, unanswered items scoring zero, percentage = earned / available points × 100 and display rounding only. If a type needs partial credit or weighting, specify it explicitly; do not change the meaning of correctness counts. Subjective writing is reported separately from automatic objective scores until a reviewed marking workflow exists.

Results must include every field in Part 4, including total questions and unanswered count, mode, each answer/explanation, topic weaknesses and the next recommended practice. Counts must reconcile to total questions under the declared scoring policy. Use original internal categories (Excellent, Good, Keep Practising, Needs Improvement) with configurable, documented thresholds; thresholds are product settings, not official grades. Alternative supportive wording may accompany them.

Calculate dashboard statistics from finalised persisted attempts, not UI fixtures. Document average-score denominator, subject breakdown for mixed quizzes, retake/assisted-practice treatment, minimum evidence for strengths/weaknesses and trends, and daily streak rules. Show insufficient-data states rather than invented trends. Keep question-attempt counts distinct from quiz counts. Recommendations must link to real available practice based on actual evidence. Rebuild cached learning progress from attempts and preserve correct results after restart or question edits.

# PART 19 — INTEGRATED TECHNICAL AND DATA SPECIFICATION

## 19.1 Stack, boundaries and repository

Use a supported Node.js LTS version verified at implementation time, Express, SQLite and HTML5/CSS3/modular vanilla JavaScript SPA. Keep charts lightweight (Chart.js or equivalent) and icons consistent (Lucide). Node test runner or Vitest with Supertest and Zod/Joi or equivalent validation are candidate choices; select one coherent toolchain and document reasons. Do not silently turn suggestions into installed dependencies. Keep configuration, routes, services, database/repository access and middleware separated. Preserve the suggested structure in Part 8, with additional health/subject/topic routes, validation/error middleware, migrations and reviewed seed/import directories. Document justified deviations without narrowing features.

One main HTML application serves all navigation destinations. Use client navigation and browser back/forward where practical, with meaningful loading, empty, success and failure states. Local startup remains `npm install`, `npm run dev`, `http://localhost:3000`; document version prerequisites, reset safeguards, adding questions and tests in README. Do not promise these commands work before verification.

## 19.2 Relational schema completion

Implement at least the ten tables in Part 8 plus `quiz_questions` for ordered immutable session membership. JSON is acceptable for bounded typed settings, snapshots or answer structures; it is not a replacement for the relational database. Use migrations/versioning, primary/foreign keys, constraints, indexes, timestamps and transactions.

| Entity | Required minimum fields / purpose |
|---|---|
| students | id, required display_name, optional guardian_display_name, year_level, justified optional school_name, created_at, updated_at; no full legal identity requirement |
| subjects | id, slug, name, description, sort_order; expandable beyond three subjects |
| topics | id, subject_id, optional parent_topic_id, name, slug, description; subtopics supported |
| questions | id, subject_id, topic_id/subtopic, question_type, difficulty 1–5, text, explanation, learning_objective, estimated_seconds, language, tags, answer_schema, source/alignment, curriculum_stage, verified syllabus metadata where available, version, review status/check record, created_at, updated_at |
| question_options | id, question_id/version, option_key, option_text, is_correct (server only), sort_order |
| quizzes | id, student_id, mode, nullable subject_id for mixed quizzes, settings, status, started_at, deadline_at where timed, created_at; anonymous use is not required for the profile-based MVP |
| quiz_questions | id, quiz_id, question_id/version or immutable snapshot, position, points, stored option order; constrain membership/position uniqueness |
| quiz_attempts | id, quiz_id, student_id, started_at, submitted_at, duration_seconds, total_questions, correct_count, incorrect_count, unanswered_count, earned/available points, score_percent, status, idempotency_key; unique finalisation per session |
| attempt_answers | id, attempt_id, session question/version, selected_option_id or typed answer, is_correct, points_awarded, answered_at, review snapshot; preserve original result and feedback history |
| learning_progress | id, student_id, subject_id, topic_id, attempt_count, question_count/correct_count, last_practised_at, updated_at; a rebuildable derived cache with documented denominators |
| daily_challenges | id, challenge_date, title, question-set relation or versioned IDs, status; per-profile completion uniqueness |

Persist draft answers/review flags in a session-answer relation or equivalent versioned design, separate from immutable final answers. Persist private gamification events/awards and daily completion in constrained relations, or derive them reproducibly from immutable attempts; identify the decision in the schema. Optional parent/guardian display name is a profile label, not an authenticated parent account or proof of consent. Future parent accounts, relationships, authentication, consent and audit entities require a reviewed access model.

## 19.3 API completion

Preserve all endpoints in Part 8. Also provide `GET /api/quizzes/:id` for authorised retrieval/resume, a documented profile-list/select flow scoped to the local household/session, and a draft-answer/review-flag save operation. Define any practice answer-feedback operation separately from examination submission. Endpoint names for these additions may be settled in the API contract; required behaviour cannot be omitted because it was absent from the original endpoint examples.

Validate path/query/body input with bounded lengths, counts and request sizes. Paginate/filter question lists and history; include total available counts without answer-key leakage. Return consistent JSON and appropriate HTTP status codes; handle missing/deleted records and insufficient question pools explicitly. Do not leak SQL, stack traces, private data or secrets in errors/logs. Verify session/ownership on profile, quiz, history, result and dashboard operations. Health output must not disclose secrets or unnecessary internals.

# PART 20 — PRIVACY, SECURITY, BACKUP AND RELEASE GATES

## 20.1 Local household boundary

The local MVP is a trusted household installation bound to loopback, not a multi-tenant hosted service. Profile switching on that device may intentionally expose household profiles to its users; disclose this boundary. Do not claim that a display name, opaque ID or profile selector provides private sibling/parent authentication. Use a server-managed local session/household scope and validate access so arbitrary IDs cannot reach records outside that scope. If private per-person access is required locally, design authentication before enabling it.

Collect a display name by default, with optional guardian name/year and school only when justified. Preserve multi-profile creation, selection, continuation and parent monitoring without requiring identity numbers, contact details or home addresses. Keep raw learner data and sensitive logs out of Git, public assets and project memory. Ammar is user context and an optional local demo label, never a required public default or hardcoded identity.

Use parameterised SQL, escaped rendering, server input validation, server scoring, transactions, idempotency, secure headers, appropriate rate limits and environment configuration. Keep databases, backup files and logs outside public static hosting. Configure CORS narrowly; use same-origin defaults where possible. Address CSRF for state-changing cookie/session requests, session fixation and unauthorised origins. Before hosted release, use HTTPS, secure HttpOnly/SameSite cookies or a reviewed session strategy and modern password hashing when passwords are used. Do not treat local security middleware as proof of public readiness.

## 20.2 Backup and restore

Backups are required for local data as well as future deployment. Provide documented backup/restore commands and a versioned procedure before local MVP acceptance. Create a SQLite-consistent backup using a supported backup mechanism or a quiesced database; do not blindly copy a live database without accounting for journals/WAL. Keep backup location outside static serving and source control, restrict file access and avoid accidentally including private records in shared artifacts.

Record schema/app version and backup timestamp. Back up before destructive reset/migrations; test restoration into a separate temporary database and verify profile, attempt, answer and progress integrity. Never run destructive reset against the only real copy as a test. Document configurable retention, deletion implications and how failed backups are reported. Exact retention/cadence are pending operational decisions, not verified policies.

Before public/pilot hosting, define scheduled encrypted backups, off-host storage, key management, retention, recovery point/time objectives, restore drills and ownership. Implement consent, privacy notice, terms, export/deletion, retention, parent–child authorisation, admin least privilege and audit, abuse reporting, monitoring, log rotation and incident response. Obtain appropriate Malaysian legal/privacy review; this specification makes no claim of legal compliance. Evaluate SQLite concurrency/single-instance limits and a PostgreSQL migration path behind the database boundary. Candidate future deployment is a Linux VPS, Node service/process manager, Nginx and HTTPS; hosting/provider and paid provisioning are not yet selected or authorised.

# PART 21 — RESPONSIVE EXPERIENCE, GUIDANCE AND GAMIFICATION

## 21.1 Complete design contract

Keep the full seven-tab information architecture and all Home/Quiz/Bank/Progress/Student Guide/Parent Guide/About content in Part 6. Preserve suggested hero copy and all twelve sample glossary terms. Student explanations use simple English with optional Malay support; Parent Guide primarily uses Bahasa Melayu with English terms explained. Student guidance also covers word problems, learning from mistakes, vocabulary building and confidence. Parent guidance includes programme differences, workload, expectations, advantages/challenges, weekly routine, FAQs and nearby official references. About must clearly state independent community purpose and no MARA/MRSM/Cambridge affiliation or official simulator status.

Use navy/white/gold/soft-grey foundations; semantic green, amber and red with text/icon equivalents. Use readable sans-serif type, consistent spacing, spacious rounded cards, subtle shadows, restrained transitions and simple line icons. Avoid tiny/low-contrast metadata, excessive gradients/glassmorphism and distracting animation. Make question text prominent and answers touch-friendly; keyboard focus, labelled controls, semantic HTML and screen-reader announcements are required. Respect reduced motion and do not delay essential actions.

Desktop/laptop uses readable maximum widths and multi-column dashboards; tablet may use two columns and compact navigation; mobile uses one column, accessible menu and large answer controls without horizontal scrolling. Sticky quiz controls must not cover content. Test 360px, 390px, 768px, 1024px and desktop widths. Charts require accessible labels and equivalent text summaries. Loading, empty, success, error and insufficient-data states must be designed, including a first-quiz action for new profiles. Use real progress only.

Question-bank browsing adds text search, short previews and subject/topic/difficulty/type/availability metadata to the original filters/count. Glossary entries include subject/topic, short definitions and example sentences; pronunciation hints and favourite/review state are useful optional enhancements retained for later prioritisation, not silent deletions. A translation may vary by context and must not be presented as the only valid equivalent.

## 21.2 Private gamification

Gamification is required by the consolidation request and makes explicit the original daily challenge, streak and optional bonus-scoring direction. Include saved learning streaks, daily completion, visible progress and private milestones/achievements. Award milestones from genuine persisted activity, with a documented rule/event source; completing an initial quiz or sustained practice may earn private recognition. Choose and record milestone thresholds during design. Points, badges or challenge bonuses must be separate from academic marks and clearly explained.

Rewards are server-derived/idempotent or reproducibly derived from finalised records. Refresh, duplicate submission or repeating a daily challenge must not inflate rewards. Keep acknowledgements supportive and age-appropriate, respect reduced motion, avoid punitive streak-loss pressure, and provide text equivalents. No public child leaderboard or identifiable ranking is required or permitted. Verify persistence and profile isolation of achievements; do not fabricate engagement history.

## 21.3 Permanent community-support footer

The user explicitly requested a minimal fixed footer on every SPA screen with the exact trigger `☕ Sokong Projek Ini (100% Percuma)`. It opens a native accessible, mobile-responsive support dialog containing the user-approved QR at `public/assets/images/qr-sumbangan.png`, displayed at no more than 200px wide. The QR is copied unchanged from the uploaded `.local/source-assets/qr-original.png`; this authorisation does not apply to private child slips.

Below the QR, preserve this exact user-provided paragraph:

"Sistem ini adalah 100% percuma untuk kegunaan semua. Sumbangan ikhlas amat digalakkan bagi menyokong projek ini. Saya juga seorang ayah kepada anak Darjah 6 yang akan menduduki ujian IGCSE, dan saya membina sistem ini dengan harapan anak saya dapat masuk ke sekolah pilihannya: MRSM Parit. Semoga aplikasi ini dapat membantu anak-anak tuan/puan juga. Doakan kejayaan anak-anak kita bersama!"

Provide a visible Tutup button, close icon, Escape and outside-backdrop closing. A scrollable modal body must keep closing controls reachable on short screens. Donations remain optional; no learning feature is gated. This is a QR display, not a payment-processing integration.

Reserve actual measured footer height in the app's bottom padding, including mobile safe-area insets, and keep sidebar/toast space above it. Use ResizeObserver or equivalent responsive measurement rather than an unverified fixed guess. Verify that the last quiz button can scroll fully above the footer at mobile widths. The footer stays present during navigation/loading/error states; modal closure must preserve the current quiz/draft/timer.

## 21.4 BM-primary interface with retained English learning terms

The user's subsequent instruction changes UI language to natural Bahasa Melayu with selected familiar English terms. This supersedes earlier English interface copy while preserving the main English academic question content and all existing scope/data. Keep IGCSE, UKKM, MRSM, Dashboard, English, Mathematics, Science and Level 1/2/etc. Do not translate Dashboard to Papan Pemuka, and use Prestasi Saya rather than Kemajuan. English topic/vocabulary content can remain for learning. The root document uses lang=ms, with English academic passages/answers marked lang=en where appropriate.

Required navigation: Laman Utama, Mula Kuiz, Bank Soalan, Prestasi Saya, Panduan Pelajar, Panduan Ibu Bapa, Tentang Projek. Required hero: "Persediaan ke MRSM IGCSE bermula di sini." Subtitle: "Bina keyakinan anak anda, satu soalan pada satu masa." Hero action area: "Pilih Subjek Anda", "Pilih subjek di bawah untuk mula buat latihan dan ulang kaji." and "Mula Ulang Kaji". Use Latih Tubi Subjek, Cabaran Harian (Daily Challenge), Cipta Profil Pelajar and Aktiviti Terkini for the corresponding Home labels.

Quiz UI uses Soalan, Hantar Jawapan, Seterusnya, Kembali, Penerangan Jawapan and Markah. Keep stable mode IDs, routes, database fields, profile records, scoring keys and academic question text unchanged for localisation. Translate onboarding, filter/status/error copy, result/history labels, guidance and accessibility labels; preserve familiar English terms in context. The 100-term glossary retains its English/Malay content while its controls are BM. The reusable full Codex CLI prompt is `docs/prompts/codex-cli-ui-bm.txt`.

## 21.5 Concise, source-backed homepage guidance

Add a prominent "MRSM IGCSE, ringkasnya" section near the hero. Provide four brief points with nearby official source links: the KSSM/MRSM/Cambridge combination; the applicable MARA description of IGCSE at end Form 4 and SPM Form 5; knowledge/concept/application/HOTS learning; and qualified programme-specific special-test requirements. Keep source/intake/date qualifications and link full guidance.

Use `docs/research/11-home-guide-fact-check.md`. Do not present the suggested 100% English entry-test language, exact English/Mathematics/Science subject list, A-D/subjective mix or timings as verified without applicable official evidence. Do not call SPM rote-only, equate IGCSE with SPM for all purposes or guarantee overseas admission/scholarships. Keep personal candidate names/identity/venue/schedule out of the public summary.

Include a short expandable tips section labelled general preparation: vocab/command words, careful word-problem reading, units, variables, worked reasoning and short low-pressure practice. Link directly to the glossary and quiz. Maintain the existing design system and verify readable responsive wrapping after longer BM copy.

# PART 22 — ACCEPTANCE, ROADMAP AND OPEN DECISIONS

## 22.1 Additional local acceptance evidence

All original acceptance criteria remain. Also verify:

- [ ] Daily Challenge works with five to ten mixed questions, saved per-profile daily completion and correct day boundaries.
- [ ] All original topic areas remain in the bank plan; question metadata includes subtopic/tags, appropriate curriculum stage and review/version evidence.
- [ ] Implemented objective types have correct validated marking; subjective writing is clearly separated and supported by a reviewed rubric workflow if enabled.
- [ ] Examination answers are absent from initial payloads, public bank endpoints and static assets; authorised feedback appears at the permitted time.
- [ ] Timers survive refresh/client-clock changes, timeout finalises safely, saved drafts recover and failed submissions never show false success.
- [ ] Idempotent/concurrent completion does not duplicate scores, history, progress, daily completion or rewards.
- [ ] Question edits do not change historical results and retakes preserve history.
- [ ] Profiles, optional guardian label, question search and full result fields work; local household visibility limitations are disclosed.
- [ ] Progress denominators/thresholds, assisted-practice treatment, mixed-subject metrics and insufficient-data states are documented and match saved records.
- [ ] Private streaks/milestones work, remain isolated per profile and survive restart.
- [ ] Backup and separate-database restore have been exercised successfully without damaging learner data.
- [ ] Input/access control, SQL/XSS/CSRF as applicable, answer leakage and invalid/foreign question IDs have meaningful tests.
- [ ] All seven tabs, FAQ, glossary, chart text equivalents, keyboard interactions, reduced motion and specified responsive widths are verified.
- [ ] README and all original research/implementation documentation deliverables are complete; count shortfalls and unresolved evidence are disclosed.

Extend automated critical-path tests with timer/expiry/recovery, each implemented answer schema, question versioning, transactional rollback, duplicate/concurrent requests, reward uniqueness, profile/household access and backup restoration. Run full English, Mathematics and Science flows through refresh and server restart; manually inspect accessibility and responsive views. Preserve the original complete startup/profile/English/results/history/Math/dashboard workflow. Report actual commands/results and limitations; do not claim tests passed without execution.

## 22.2 Implementation sequencing

`Task.md` supplies the practical dependency-based checklist, with evidence gates: documentation baseline → environment inspection → deep official research → schema/API/scoring/privacy/design contracts → local foundation → persisted end-to-end objective quiz → all modes/tabs/guidance → reviewed 300-question bank → analytics/gamification → complete QA and backup/restore → local acceptance. A thin validated seed is a development step, not the release target. Research and content review can proceed alongside later engineering only after relevant facts and contracts are established. Complete independent work when one source is blocked and document limits. Do not seek approval after every routine phase once implementation is authorised.

Future private pilot requires implemented authentication/consent/access, reviewed content and security before real multi-user hosting. Public release additionally requires operational readiness, admin question management, support/abuse processes and explicit deployment authorisation. Report facts, counts by subject, implemented features, database, tests, startup/URL, limitations and next steps as in the original completion report.

## 22.3 Clarifications and planned decisions

| ID | Decision / clarification | Current safe disposition |
|---|---|---|
| C-01 | Is there a distinct original or latest prompt beyond the available 1,370-line file? | Version comparison is limited to available evidence; preserve this baseline and merge any subsequently supplied version. |
| C-02 | Which admission intake/campus/programme and which assessment does 18 November 2026 refer to? | Parent context only; research U-01–U-05. Do not infer official format. |
| C-03 | Which additional subjects/components should receive first-release question targets? | Preserve extensibility and research; retain 100/100/100 core targets until an evidence-backed allocation is agreed. |
| C-04 | Which Cambridge English/Math/Science syllabus routes and years should alignment target? | Research official choices and age progression; keep codes unset until verified. |
| C-05 | Is private per-person authentication required on a shared local household device? | Trusted-household MVP only; hosted access always requires secure individual/guardian controls. |
| C-06 | How should short writing be reviewed and included in results? | Retain the content category; propose transparent human/self-review rubric, separate from objective auto-scores. No external AI service is assumed. |
| C-07 | Exact practice durations, label thresholds, reward thresholds, analytical denominators and partial-credit rules | Record product choices during planning; do not portray them as official exam rules. Use explicit objective scoring defaults in Part 18. |
| C-08 | Backup schedule/retention, recovery objectives, production host/database, consent and retention policies | Define/test local procedure first; operational/legal choices must be settled before hosted pilot/public use. |
| C-09 | Are offline operation/PWA, cloud sync, pronunciation and glossary favourites required in the first release? | Offline/sync are not yet promised; pronunciation/favourites remain optional enhancements. Core searchable bilingual glossary remains required. |

These are recorded decisions/evidence gaps, not a request to approve each engineering phase. The consolidation itself did not authorise implementation; the subsequent explicit user request now authorises local research/build work. Public deployment remains gated.


## Optional Analytics update - 16 November 2026

The user authorised GA4 integration for the linked kuiz-igcse property. It supersedes earlier blanket no-Analytics instructions only when explicitly enabled and consented. Follow docs/features/ANALYTICS.md from the repository root: default off,no SDK before guardian opt-in,strict event/URL allowlists,no learner IDs/names/scores/answers/comments/filenames,ads/signals disabled and reversible browser choice. Enhanced Measurement OFF confirmation is required before activation. Source implementation and mocked privacy tests do not establish live collection or GA4 ingestion.
