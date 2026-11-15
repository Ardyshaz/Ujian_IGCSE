# Requirements comparison and consolidation record

Date: 15 November 2026. Status: documentation consolidation completed; application implementation paused.

## Evidence and version limitation

The available `full_prompt.md` was exactly **1,370 lines**, not a separately identifiable latest revision alongside another original. The directory contained exactly seven companion Markdown documents and one legacy HTML prototype. No Git repository/history or separate original attachment was available. Consequently, a comparison of two distinct prompt versions cannot be claimed. The complete available prompt was archived as [full_prompt_original.md](prompts/full_prompt_original.md) before editing, and compared with every companion document. Any subsequently supplied distinct version must receive the same additive reconciliation.

`full_prompt_original.md` SHA-256: `6b755c83a9b3a2f0d2df755bdd62d7fa9032b84663967210ba76507db914226b`.

Unmodified `igcse_prep_quiz.html` SHA-256: `6313db4a0d8cd905d637940e36640263b3ba5f7a783f84ea31d2ff319d1dc7df`.

The archive retains exact original bytes/line endings. Edited documents use UTF-8. Source line numbers in the inventory below always refer to the input documents before consolidation, not current line numbers. Every nonblank input line has its own inventory entry, including prose, enumerations, code examples, metadata, tables, sample questions and acceptance checklists; blank formatting lines contain no requirement. This preserves audit coverage without pretending every heading or fence is itself a separate feature.

## Input manifest

| Input | Lines before edit | Role |
|---|---:|---|
| `full_prompt.md` | 1370 | Available complete prompt baseline |
| `Agent.md` | 125 | Companion specification / state / roadmap |
| `Architecture.md` | 274 | Companion specification / state / roadmap |
| `Design.md` | 295 | Companion specification / state / roadmap |
| `Memory.md` | 125 | Companion specification / state / roadmap |
| `PRD.md` | 263 | Companion specification / state / roadmap |
| `Rules.md` | 105 | Companion specification / state / roadmap |
| `Task.md` | 247 | Companion specification / state / roadmap |

## Requirement families and destinations

| Family | Complete scope retained / integrated | Authoritative destination |
|---|---|---|
| Identity and users | Windows/local/community goal, Year 6, Ammar context, optional guardian/year/school, unverified parent date | Introduction; Parts 1, 5, 16, 20 |
| Cambridge deep research | Upper Secondary/IGCSE, age/stages, subjects/groups, assessment methods/papers/MCQ/structured/practical/coursework, grading/objectives, KSSM/SPM comparison, language/Math/Science, preparation | Part 2A; Part 17 |
| Official curriculum resources | Subject syllabuses, codes/years/routes, specimen/past papers, mark schemes, examiner reports, learner guides, example candidate responses, subject pages | Part 2A; Parts 17–18 |
| MRSM admission | Eligibility, application/process/dates, UKKM, separate selection, interviews where applicable, programme options/Premier comparison, specific IGCSE requirements and family preparation | Part 2B; U-01–U-04 |
| MRSM IGCSE programme | Curriculum combination, SPM/IGCSE, forms/exam schedule/subjects/duration, English medium, workload/benefits/challenges/pathways/parent expectations | Part 2C; U-05/U-08 |
| Evidence outputs | Seven exact research paths, source hierarchy, metadata, verification labels, conflicts/inaccessibility and review dates/applicability | Part 2D; Part 17 |
| Question scope | 300 normally 100/100/100, narrow quality exception, 1,000+ expansion; other relevant subjects retained for evidence-backed expansion | Part 3; Parts 16, 18, 22 |
| Topic coverage | All 17 English, 20 Mathematics, 25 Science topics; calculation, multi-step, scenarios, HOTS, careful reading, experiments/variables/data | Part 3 unchanged |
| Question model | All original metadata, difficulty 1–5, seven types, short writing, copyright/originality/quality; subtopic/tags, review/version/stage and typed marking | Parts 3, 10, 18–19 |
| Parent seed examples | All six original examples/options/keys/explanations and workings retained, subject to independent validation and ambiguity correction | Part 11; Part 18.1 |
| Interactive engine | All 20 quiz features, Practice/Examination/Challenge/Daily, complete results/labels, timer/navigation/randomisation/review/retake | Part 4; Part 18 |
| Profiles and records | Welcome/create/select/continue, multiple names, optional fields, SQLite profiles/answers/attempts/score/time, restart persistence | Part 5; Parts 19–20 |
| History and analytics | Every result/history/parent metric, charts, strong/weak topics, comparisons/trends/recommendations/streaks and genuine evidence | Part 5; Parts 18, 21 |
| Seven-tab SPA | All Home/Quiz/Bank/Progress/Student Guide/Parent Guide/About contents, FAQ, searchable bilingual glossary and all 12 examples | Part 6; Part 21 |
| Design and access | Navy/white/gold/grey, readable type/cards/icons/spacing, responsive desktop/laptop/tablet/mobile, exact QA widths, keyboard/chart text/reduced motion | Part 7; Part 21 |
| Stack and layout | Node/Express/SQLite, modular HTML/CSS/JS, charts/Lucide, full suggested paths, testing/validation candidate toolchain | Part 8; Part 19 |
| Database and API | Ten original tables plus quiz_questions, every companion field, constraints/indexes/migrations, full endpoints, scoped paging/resume/drafts | Part 8; Part 19 |
| Quiz integrity | Server scoring, idempotency/transactions, membership/access, no leakage, immutable snapshots, timer/expiry/recovery and scoring definitions | Parts 8–10; Parts 18–20 |
| Security and privacy | Validation/SQL/XSS/CSRF/CORS/headers/rate limits/secrets, private child data, guardian controls/consent/retention/deletion/export/admin | Part 9; Part 20 |
| Backup and operations | Local backup/restore plus future encrypted off-host backups, VPS possibilities, HTTPS, concurrency/migration, monitoring/incident response/support | Part 9; Parts 19–20 |
| Gamification | Original streak/daily/optional challenge bonus direction plus user's explicit gamification requirement; private saved milestones and unique awards | Parts 4–5; Part 21.2 |
| Testing and acceptance | Original automated cases and full user flow; all critical UI, content, persistence, access, recovery, backup and reward checks | Part 12; original final acceptance; Part 22 |
| Documentation/workflow | Ten named implementation docs, README contents/commands/URL, seven research docs, agent/reporting/memory standards, dependencies/gates | Parts 13–16, 22; Task.md |

## Duplicate, conflicting, outdated and incomplete instructions

| ID / type | Source issue | Disposition / authoritative resolution |
|---|---|---|
| D-01 duplicate | Prompt, PRD, Design and Agent repeat users/tabs/quiz/history features | One feature contract in the master; supporting views retain role-specific summaries. No duplicated feature build or omitted details. |
| D-02 duplicate | Research/source/copyright/answer-validation rules recur across documents | Preserve all safeguards with Part 17 evidence and Part 18 content workflow; repeats reinforce the same rule. |
| D-03 duplicate | Schema/API/UI/test/acceptance lists overlap | Preserve original examples and detailed companion fields, use Parts 18–22 plus one roadmap rather than treating summaries as smaller scope. |
| X-01 conflicting execution | Original Part 15/final sentence demand immediate build; current user explicitly forbids implementation | Rephrase activation of four baseline directives and add visible documentation-only gates to all current files. Future build scope stays intact. |
| X-02 stale workspace claim | Original says new project/build from scratch despite existing HTML | Clarify new application build, inspect/preserve existing prototype and docs; do not overwrite or claim the prototype meets MVP. |
| X-03 incomplete version evidence | User references original versus latest, but only one 1,370-line prompt is available | Archive exact baseline, disclose limitation, do not invent version history; C-01 remains open. |
| X-04 mode inconsistency | Original Challenge requires time pressure; PRD makes it optional | Retain timed Challenge with configurable practice duration; label accessibility variations explicitly. |
| X-05 mode inconsistency | Original Practice requires instant feedback; PRD/Design say optional | Immediate feedback/explanation capability/default retained; optional delayed setting may supplement it. |
| X-06 misleading release summary | PRD local scope says three modes and omits Daily Challenge | Require all four modes, daily persistence and timezone boundaries in master and companion acceptance. |
| X-07 unsafe pilot sequencing | PRD private pilot lists authentication design rather than implementation | Implement account/guardian access, consent and security before hosting real child data in any pilot. |
| X-08 result naming drift | Original and Design use different practice category labels | Retain original four canonical categories; allow supportive text, configurable documented thresholds and no official-grade implications. |
| X-09 review timing ambiguity | Original says validate before inserting; Architecture supports draft/review states | Draft authoring/import may be separate; validate/review before promoting into the published learner bank. |
| X-10 quality/count tension | 300 target versus prioritising quality/shortfall exception | Retain 300 target and original narrow documented exception; report actual subject/review counts and remaining work, never silently lower scope. |
| G-01 missing profile field | Optional guardian name absent from Architecture/PRD | Restore optional guardian_display_name as label; do not equate it with authenticated parent/consent. |
| G-02 missing metadata | Companion schema omits original subtopic/tags and explicit correct-answer schema | Complete metadata, typed keys, stage, verified syllabus alignment, review evidence and immutable versions. |
| G-03 incomplete type marking | Short writing and seven types coexist with automatic marking without full rules | Preserve all content/types; explicit objective schemas, units/tolerances and separate transparent writing review. No invented automatic essay grading. |
| G-04 lifecycle gaps | Timer expiry, refresh, network retries, answer drafts and versions underspecified | Add server deadlines, acknowledged draft saves, state transitions, exactly-once completion and historical snapshots; document network policy before implementation. |
| G-05 randomisation gaps | Shuffling must not break options or history | Store order/stable IDs, skip order-dependent choices and validate session membership. |
| G-06 analytics gaps | Scores, averages, mixed-subject attribution and weak-topic thresholds lack a shared contract | Explicit objective defaults and planned denominator/threshold/retry decisions; genuine evidence and insufficient-data states. |
| G-07 local/public access tension | Multi-profile convenience versus private-ID access and future auth | Disclosed trusted household model plus scoped server session; no claim of per-person local authentication; hosted user access always secured. |
| G-08 backup gap | Backup mostly deferred to public future tasks | Require consistent local backup and separate restore verification before local acceptance, with expanded hosted recovery controls. |
| G-09 gamification gap | Original streak/daily/optional bonus exists but companion plans lack a complete gamification feature | Add private milestones/achievements and unique persisted awards from real activity, separate from academic scores. This is an explicit current-user requirement. |
| G-10 scope narrowing risk | Core 3 subjects can obscure other relevant subjects and separate science/English routes | Retain broad research and extensibility, map stages/routes and let official evidence guide additions; no invented official subject list. |
| G-11 evidence applicability | Source links alone do not establish current cycle/campus/route applicability | Add claim IDs, applicability/status/conflicts/review cadence; all U items remain unverified until researched. |
| G-12 security details | CORS/CSRF, session boundaries and answer leakage underspecified | Same-origin/narrow CORS, session/CSRF safeguards, access checks across private endpoints and no exam answers in static/list payloads. |
| G-13 optional scope | Pronunciation/favourites and offline/cloud expectations unspecified | Retain useful optional glossary enhancements; distinguish local-first from an unpromised offline PWA or sync service. |
| G-14 roadmap/state | Most checkboxes unstarted; Memory unaware of inspection and prototype | Mark only documentation evidence complete, keep all implementation unverified, add dependency/evidence gates and record exact next steps. |
| G-15 prototype limitations | Browser-only history/scoring/CDN/informal wording in HTML reference | Preserve bytes; treat as reference only, not a substitute for database/server scoring/guidance/quality requirements. No implementation changes. |

No education fact, legal conclusion or official examination specification was verified by this consolidation. Research tasks remain pending; no legal-compliance claim is made. New lifecycle/scoring/security defaults are explicitly product/design decisions, not claims about MARA or Cambridge.

## Items requiring clarification or planned decisions

The authoritative detailed registers are `full_prompt.md` Part 17.2 (U-01–U-08) and Part 22.3 (C-01–C-09). Primary external clarifications are the missing distinct prompt version; the intake/campus/programme/assessment associated with the parent date; desired additional first-release subjects; Cambridge route/year targets; private per-person local access; and writing-review expectations. Durations, internal labels/rewards/analytics defaults, backup/retention/recovery and hosting/privacy details are planned product/operations decisions. None authorises implementation or makes an unverified official claim.

## Source-line inventory and requirement accounting

Disposition key: **retained exact** means that input line is present verbatim somewhere in the consolidated master; **integrated** means its detail is covered semantically in the destination or supporting roadmap; **activation clarified** means future-build wording was explicitly gated by current user instructions. Heading/code/table-format lines are indexed for completeness, not counted as independent requirements. Repeated source lines remain separate provenance entries. The index records input text so later auditors can inspect omissions without depending on overwritten companion versions.

### Input: full_prompt.md

| Source unit | Section / destination | Disposition | Input text |
|---|---|---|---|
| full_prompt.md:L1 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1) | # MASTER PROMPT — IGCSE MRSM PREPARATION HUB |
| full_prompt.md:L3 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L7) | You are acting as a Senior Full-Stack Developer, Educational Researcher, Cambridge IGCSE Curriculum Researcher, UX/UI Designer, Assessment Specialist and Software Architect. |
| full_prompt.md:L5 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L9) | Your task is to research, design, develop, test and document a complete interactive web application called: |
| full_prompt.md:L7 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L11) | **IGCSE MRSM PREPARATION HUB** |
| full_prompt.md:L9 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L13) | Project directory: |
| full_prompt.md:L11 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L15) | `D:\IGCSE` |
| full_prompt.md:L13 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | workspace clarified | This is a new project. Build it from scratch. |
| full_prompt.md:L15 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L19) | The application will initially run locally on Windows for testing. It will eventually be deployed publicly so Malaysian parents and students can use it as a community learning and examination preparation platform. |
| full_prompt.md:L17 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L21) | The main target audience: |
| full_prompt.md:L18 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L22) | - Malaysian Year 6 pupils (Darjah 6). |
| full_prompt.md:L19 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L23) | - Students preparing for MRSM Form 1 admission. |
| full_prompt.md:L20 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L24) | - Students interested in the MRSM IGCSE programme. |
| full_prompt.md:L21 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L25) | - Parents who want to understand MRSM and IGCSE. |
| full_prompt.md:L22 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L26) | - Students who want to improve English, Mathematics and Science. |
| full_prompt.md:L24 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L28) | Primary initial user: |
| full_prompt.md:L25 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L29) | - Student name: Ammar. |
| full_prompt.md:L26 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L30) | - Current level: Year 6 / Darjah 6. |
| full_prompt.md:L27 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L31) | - Target: MRSM IGCSE Form 1 admission preparation. |
| full_prompt.md:L28 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L32) | - Target examination date provided by parent: 18 November 2026. |
| full_prompt.md:L29 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L33) | - This date is user-provided context, NOT independently verified examination information. |
| full_prompt.md:L31 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L35) | The application must be useful beyond Ammar. It must be suitable for the wider Malaysian community. |
| full_prompt.md:L33 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L37) | --- |
| full_prompt.md:L35 | PART 1 | retained exact (master L39) | # PART 1 — PROJECT OBJECTIVES |
| full_prompt.md:L37 | PART 1 | retained exact (master L41) | Build a polished, modern, fun and educational platform. |
| full_prompt.md:L39 | PART 1 | retained exact (master L43) | The system must achieve these objectives: |
| full_prompt.md:L41 | PART 1 | retained exact (master L45) | 1. Provide comprehensive information about MRSM Form 1 admission. |
| full_prompt.md:L42 | PART 1 | retained exact (master L46) | 2. Explain the MRSM IGCSE programme accurately. |
| full_prompt.md:L43 | PART 1 | retained exact (master L47) | 3. Explain what students can expect when entering the programme. |
| full_prompt.md:L44 | PART 1 | retained exact (master L48) | 4. Research Cambridge International IGCSE qualifications and assessment structures. |
| full_prompt.md:L45 | PART 1 | retained exact (master L49) | 5. Provide a structured question bank for examination preparation. |
| full_prompt.md:L46 | PART 1 | retained exact (master L50) | 6. Provide interactive quizzes with automatic marking. |
| full_prompt.md:L47 | PART 1 | retained exact (master L51) | 7. Save student profiles and examination attempts. |
| full_prompt.md:L48 | PART 1 | retained exact (master L52) | 8. Show individual learning progress. |
| full_prompt.md:L49 | PART 1 | retained exact (master L53) | 9. Help parents monitor their children's progress. |
| full_prompt.md:L50 | PART 1 | retained exact (master L54) | 10. Be ready for eventual public deployment and community use. |
| full_prompt.md:L52 | PART 1 | retained exact (master L56) | This is NOT just a landing page with a few sample questions. |
| full_prompt.md:L54 | PART 1 | retained exact (master L58) | Build a real, functional educational application. |
| full_prompt.md:L56 | PART 1 | retained exact (master L37) | --- |
| full_prompt.md:L58 | PART 2 | retained exact (master L62) | # PART 2 — DEEP RESEARCH REQUIREMENTS |
| full_prompt.md:L60 | PART 2 | activation clarified | RESEARCH FIRST. DO NOT START CODING IMMEDIATELY. |
| full_prompt.md:L62 | PART 2 | retained exact (master L66) | Create a research directory: |
| full_prompt.md:L64 | PART 2 | retained exact (master L68) | `docs/research/` |
| full_prompt.md:L66 | PART 2 | retained exact (master L70) | Conduct comprehensive research using reliable, current and authoritative sources. |
| full_prompt.md:L68 | PART 2 | retained exact (master L72) | ## A. Cambridge IGCSE |
| full_prompt.md:L70 | PART 2 | retained exact (master L74) | Primary official reference: |
| full_prompt.md:L72 | PART 2 | retained exact (master L76) | https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/ |
| full_prompt.md:L74 | PART 2 | retained exact (master L78) | Research: |
| full_prompt.md:L76 | PART 2 | retained exact (master L80) | - What is Cambridge IGCSE? |
| full_prompt.md:L77 | PART 2 | retained exact (master L81) | - What is Cambridge Upper Secondary? |
| full_prompt.md:L78 | PART 2 | retained exact (master L82) | - Age range and typical learning stages. |
| full_prompt.md:L79 | PART 2 | retained exact (master L83) | - Subject structure. |
| full_prompt.md:L80 | PART 2 | retained exact (master L84) | - Subject groups. |
| full_prompt.md:L81 | PART 2 | retained exact (master L85) | - Assessment methods. |
| full_prompt.md:L82 | PART 2 | retained exact (master L86) | - Examination papers. |
| full_prompt.md:L83 | PART 2 | retained exact (master L87) | - Multiple-choice questions. |
| full_prompt.md:L84 | PART 2 | retained exact (master L88) | - Structured questions. |
| full_prompt.md:L85 | PART 2 | retained exact (master L89) | - Practical assessments. |
| full_prompt.md:L86 | PART 2 | retained exact (master L90) | - Coursework, where applicable. |
| full_prompt.md:L87 | PART 2 | retained exact (master L91) | - Grading systems. |
| full_prompt.md:L88 | PART 2 | retained exact (master L92) | - Assessment objectives. |
| full_prompt.md:L89 | PART 2 | retained exact (master L93) | - Differences between Cambridge IGCSE and Malaysian KSSM/SPM. |
| full_prompt.md:L90 | PART 2 | retained exact (master L94) | - English language requirements. |
| full_prompt.md:L91 | PART 2 | retained exact (master L95) | - Mathematics syllabus and terminology. |
| full_prompt.md:L92 | PART 2 | retained exact (master L96) | - Science syllabus and terminology. |
| full_prompt.md:L93 | PART 2 | retained exact (master L97) | - How students should prepare. |
| full_prompt.md:L94 | PART 2 | retained exact (master L98) | - How Cambridge assessments evaluate knowledge, understanding and application. |
| full_prompt.md:L96 | PART 2 | retained exact (master L100) | Find official resources: |
| full_prompt.md:L98 | PART 2 | retained exact (master L102) | - Cambridge IGCSE subject syllabuses. |
| full_prompt.md:L99 | PART 2 | retained exact (master L103) | - Specimen papers. |
| full_prompt.md:L100 | PART 2 | retained exact (master L104) | - Past examination papers. |
| full_prompt.md:L101 | PART 2 | retained exact (master L105) | - Mark schemes. |
| full_prompt.md:L102 | PART 2 | retained exact (master L106) | - Examiner reports. |
| full_prompt.md:L103 | PART 2 | retained exact (master L107) | - Learner guides. |
| full_prompt.md:L104 | PART 2 | retained exact (master L108) | - Example candidate responses. |
| full_prompt.md:L105 | PART 2 | retained exact (master L109) | - Official subject pages. |
| full_prompt.md:L107 | PART 2 | retained exact (master L111) | Prioritise the following subjects: |
| full_prompt.md:L109 | PART 2 | retained exact (master L113) | 1. English Language. |
| full_prompt.md:L110 | PART 2 | retained exact (master L114) | 2. Mathematics. |
| full_prompt.md:L111 | PART 2 | retained exact (master L115) | 3. Biology. |
| full_prompt.md:L112 | PART 2 | retained exact (master L116) | 4. Chemistry. |
| full_prompt.md:L113 | PART 2 | retained exact (master L117) | 5. Physics. |
| full_prompt.md:L114 | PART 2 | retained exact (master L118) | 6. Combined Science / Coordinated Sciences, where relevant. |
| full_prompt.md:L116 | PART 2 | retained exact (master L120) | Important: |
| full_prompt.md:L118 | PART 2 | retained exact (master L122) | Do not assume that all Cambridge IGCSE subjects or assessment structures are identical. |
| full_prompt.md:L120 | PART 2 | retained exact (master L124) | Always identify the subject, syllabus code, examination year and relevant assessment route when known. |
| full_prompt.md:L122 | PART 2 | retained exact (master L126) | ## B. MRSM Form 1 Admission |
| full_prompt.md:L124 | PART 2 | retained exact (master L128) | Research the latest official Malaysian MARA/MRSM information. |
| full_prompt.md:L126 | PART 2 | retained exact (master L130) | Prioritise: |
| full_prompt.md:L128 | PART 2 | retained exact (master L132) | - MARA official website. |
| full_prompt.md:L129 | PART 2 | retained exact (master L133) | - Official MRSM admission announcements. |
| full_prompt.md:L130 | PART 2 | retained exact (master L134) | - Official MRSM programme information. |
| full_prompt.md:L131 | PART 2 | retained exact (master L135) | - Official UKKM information. |
| full_prompt.md:L132 | PART 2 | retained exact (master L136) | - Official application requirements. |
| full_prompt.md:L133 | PART 2 | retained exact (master L137) | - Official eligibility criteria. |
| full_prompt.md:L134 | PART 2 | retained exact (master L138) | - Official admission procedures. |
| full_prompt.md:L135 | PART 2 | retained exact (master L139) | - Official examination or assessment information. |
| full_prompt.md:L136 | PART 2 | retained exact (master L140) | - Official MRSM IGCSE programme information. |
| full_prompt.md:L138 | PART 2 | retained exact (master L78) | Research: |
| full_prompt.md:L140 | PART 2 | retained exact (master L144) | 1. MRSM Form 1 admission process. |
| full_prompt.md:L141 | PART 2 | retained exact (master L145) | 2. Eligibility requirements. |
| full_prompt.md:L142 | PART 2 | retained exact (master L146) | 3. Application process. |
| full_prompt.md:L143 | PART 2 | retained exact (master L147) | 4. Important application dates. |
| full_prompt.md:L144 | PART 2 | retained exact (master L148) | 5. UKKM assessment. |
| full_prompt.md:L145 | PART 2 | retained exact (master L149) | 6. Other relevant selection assessments. |
| full_prompt.md:L146 | PART 2 | retained exact (master L150) | 7. Interview requirements, if applicable. |
| full_prompt.md:L147 | PART 2 | retained exact (master L151) | 8. Available MRSM programmes. |
| full_prompt.md:L148 | PART 2 | retained exact (master L152) | 9. Differences between MRSM Premier, IGCSE and other programmes. |
| full_prompt.md:L149 | PART 2 | retained exact (master L153) | 10. Specific requirements for MRSM IGCSE admission. |
| full_prompt.md:L150 | PART 2 | retained exact (master L154) | 11. What students should prepare academically. |
| full_prompt.md:L151 | PART 2 | retained exact (master L155) | 12. What parents should know before applying. |
| full_prompt.md:L153 | PART 2 | retained exact (master L157) | Do not confuse: |
| full_prompt.md:L155 | PART 2 | retained exact (master L159) | - UKKM. |
| full_prompt.md:L156 | PART 2 | retained exact (master L160) | - MRSM IGCSE selection assessment. |
| full_prompt.md:L157 | PART 2 | retained exact (master L161) | - Internal MRSM examinations. |
| full_prompt.md:L158 | PART 2 | retained exact (master L162) | - Cambridge IGCSE examinations. |
| full_prompt.md:L160 | PART 2 | retained exact (master L164) | These are different things and must be explained separately. |
| full_prompt.md:L162 | PART 2 | retained exact (master L166) | Do not claim that English, Mathematics and Science are definitely the complete official entrance examination subjects unless supported by an authoritative source. |
| full_prompt.md:L164 | PART 2 | retained exact (master L168) | ## C. MRSM IGCSE Programme |
| full_prompt.md:L166 | PART 2 | retained exact (master L170) | Research specifically: |
| full_prompt.md:L168 | PART 2 | retained exact (master L172) | - What makes MRSM IGCSE different? |
| full_prompt.md:L169 | PART 2 | retained exact (master L173) | - How the Malaysian national curriculum is combined with Cambridge curriculum. |
| full_prompt.md:L170 | PART 2 | retained exact (master L174) | - Whether students sit for both SPM and Cambridge examinations. |
| full_prompt.md:L171 | PART 2 | retained exact (master L175) | - At which form levels examinations are taken. |
| full_prompt.md:L172 | PART 2 | retained exact (master L176) | - Subject combinations. |
| full_prompt.md:L173 | PART 2 | retained exact (master L177) | - Learning duration. |
| full_prompt.md:L174 | PART 2 | retained exact (master L178) | - English-medium learning. |
| full_prompt.md:L175 | PART 2 | retained exact (master L179) | - Student workload. |
| full_prompt.md:L176 | PART 2 | retained exact (master L180) | - Advantages. |
| full_prompt.md:L177 | PART 2 | retained exact (master L181) | - Challenges. |
| full_prompt.md:L178 | PART 2 | retained exact (master L182) | - University pathways. |
| full_prompt.md:L179 | PART 2 | retained exact (master L183) | - Parent expectations. |
| full_prompt.md:L180 | PART 2 | retained exact (master L184) | - Preparation for Form 1. |
| full_prompt.md:L182 | PART 2 | retained exact (master L120) | Important: |
| full_prompt.md:L184 | PART 2 | retained exact (master L188) | Do not repeat unverified claims such as every MRSM IGCSE student follows exactly the same subject combination or examination timetable. |
| full_prompt.md:L186 | PART 2 | retained exact (master L190) | Distinguish official facts from general educational explanations. |
| full_prompt.md:L188 | PART 2 | retained exact (master L192) | ## D. Research Documentation |
| full_prompt.md:L190 | PART 2 | retained exact (master L194) | Produce these documents: |
| full_prompt.md:L192 | PART 2 | retained exact (master L196) | `docs/research/01-cambridge-igcse.md` |
| full_prompt.md:L194 | PART 2 | retained exact (master L198) | `docs/research/02-mrsm-form1-admission.md` |
| full_prompt.md:L196 | PART 2 | retained exact (master L200) | `docs/research/03-mrsm-igcse-programme.md` |
| full_prompt.md:L198 | PART 2 | retained exact (master L202) | `docs/research/04-ukkm-and-selection-assessment.md` |
| full_prompt.md:L200 | PART 2 | retained exact (master L204) | `docs/research/05-examination-preparation-strategy.md` |
| full_prompt.md:L202 | PART 2 | retained exact (master L206) | `docs/research/06-question-bank-research.md` |
| full_prompt.md:L204 | PART 2 | retained exact (master L208) | `docs/research/07-sources-and-verification.md` |
| full_prompt.md:L206 | PART 2 | retained exact (master L210) | Every factual claim should have a source reference. |
| full_prompt.md:L208 | PART 2 | retained exact (master L212) | For every source, record: |
| full_prompt.md:L210 | PART 2 | retained exact (master L214) | - Title. |
| full_prompt.md:L211 | PART 2 | retained exact (master L215) | - Publisher / organisation. |
| full_prompt.md:L212 | PART 2 | retained exact (master L216) | - URL. |
| full_prompt.md:L213 | PART 2 | retained exact (master L217) | - Publication or update date, if available. |
| full_prompt.md:L214 | PART 2 | retained exact (master L218) | - Date accessed. |
| full_prompt.md:L215 | PART 2 | retained exact (master L219) | - What information was obtained. |
| full_prompt.md:L216 | PART 2 | retained exact (master L220) | - Whether it is an official or secondary source. |
| full_prompt.md:L218 | PART 2 | retained exact (master L222) | Use this source hierarchy: |
| full_prompt.md:L220 | PART 2 | retained exact (master L224) | 1. Official MARA. |
| full_prompt.md:L221 | PART 2 | retained exact (master L225) | 2. Official Cambridge International. |
| full_prompt.md:L222 | PART 2 | retained exact (master L226) | 3. Official Malaysian education authorities. |
| full_prompt.md:L223 | PART 2 | retained exact (master L227) | 4. Reputable educational institutions. |
| full_prompt.md:L224 | PART 2 | retained exact (master L228) | 5. Other reputable educational resources. |
| full_prompt.md:L226 | PART 2 | retained exact (master L230) | If information cannot be verified, explicitly label it: |
| full_prompt.md:L228 | PART 2 | retained exact (master L232) | "Not independently verified." |
| full_prompt.md:L230 | PART 2 | retained exact (master L234) | Never fabricate official examination formats, admission requirements, dates, syllabus codes or assessment structures. |
| full_prompt.md:L232 | PART 2 | retained exact (master L37) | --- |
| full_prompt.md:L234 | PART 3 | retained exact (master L238) | # PART 3 — QUESTION BANK DEVELOPMENT |
| full_prompt.md:L236 | PART 3 | retained exact (master L240) | Create a comprehensive original question bank. |
| full_prompt.md:L238 | PART 3 | retained exact (master L242) | This is one of the most important components. |
| full_prompt.md:L240 | PART 3 | retained exact (master L244) | Do not settle for 10 or 20 questions. |
| full_prompt.md:L242 | PART 3 | retained exact (master L246) | Build a structured, expandable question bank with a target of at least 300 original questions in the first release. |
| full_prompt.md:L244 | PART 3 | retained exact (master L248) | Suggested distribution: |
| full_prompt.md:L246 | PART 3 | retained exact (master L250) | \| Subject \| Target \| |
| full_prompt.md:L247 | PART 3 | retained exact (master L251) | \|---\|---:\| |
| full_prompt.md:L248 | PART 3 | retained exact (master L252) | \| English \| 100 \| |
| full_prompt.md:L249 | PART 3 | retained exact (master L253) | \| Mathematics \| 100 \| |
| full_prompt.md:L250 | PART 3 | retained exact (master L254) | \| Science \| 100 \| |
| full_prompt.md:L251 | PART 3 | retained exact (master L255) | \| Total \| 300 \| |
| full_prompt.md:L253 | PART 3 | retained exact (master L257) | The bank must be expandable to 1,000+ questions. |
| full_prompt.md:L255 | PART 3 | retained exact (master L259) | All questions should be original and independently written based on verified learning objectives, appropriate age levels and publicly available syllabus information. |
| full_prompt.md:L257 | PART 3 | retained exact (master L261) | ## Copyright requirements |
| full_prompt.md:L259 | PART 3 | retained exact (master L263) | Cambridge past papers, specimen papers and mark schemes may be copyrighted. |
| full_prompt.md:L261 | PART 3 | retained exact (master L265) | You may: |
| full_prompt.md:L263 | PART 3 | retained exact (master L267) | - Study their format. |
| full_prompt.md:L264 | PART 3 | retained exact (master L268) | - Study their difficulty. |
| full_prompt.md:L265 | PART 3 | retained exact (master L269) | - Analyse their assessment objectives. |
| full_prompt.md:L266 | PART 3 | retained exact (master L270) | - Refer users to official Cambridge resources. |
| full_prompt.md:L267 | PART 3 | retained exact (master L271) | - Write original questions testing similar skills. |
| full_prompt.md:L268 | PART 3 | retained exact (master L272) | - Create original explanations and worked solutions. |
| full_prompt.md:L270 | PART 3 | retained exact (master L274) | You must NOT: |
| full_prompt.md:L272 | PART 3 | retained exact (master L276) | - Bulk-copy Cambridge past papers. |
| full_prompt.md:L273 | PART 3 | retained exact (master L277) | - Scrape copyrighted question banks. |
| full_prompt.md:L274 | PART 3 | retained exact (master L278) | - Reproduce entire examination papers. |
| full_prompt.md:L275 | PART 3 | retained exact (master L279) | - Claim original questions are official Cambridge questions. |
| full_prompt.md:L276 | PART 3 | retained exact (master L280) | - Use copyrighted material without permission. |
| full_prompt.md:L278 | PART 3 | retained exact (master L282) | Label the platform's questions: |
| full_prompt.md:L280 | PART 3 | retained exact (master L284) | "Original practice questions inspired by relevant learning objectives and examination styles. Not official Cambridge examination questions." |
| full_prompt.md:L282 | PART 3 | retained exact (master L286) | ## Question categories |
| full_prompt.md:L284 | PART 3 | retained exact (master L288) | ### ENGLISH |
| full_prompt.md:L286 | PART 3 | retained exact (master L290) | Create sections: |
| full_prompt.md:L288 | PART 3 | retained exact (master L292) | 1. Grammar. |
| full_prompt.md:L289 | PART 3 | retained exact (master L293) | 2. Vocabulary. |
| full_prompt.md:L290 | PART 3 | retained exact (master L294) | 3. Reading comprehension. |
| full_prompt.md:L291 | PART 3 | retained exact (master L295) | 4. Sentence structure. |
| full_prompt.md:L292 | PART 3 | retained exact (master L296) | 5. Tenses. |
| full_prompt.md:L293 | PART 3 | retained exact (master L297) | 6. Subject-verb agreement. |
| full_prompt.md:L294 | PART 3 | retained exact (master L298) | 7. Prepositions. |
| full_prompt.md:L295 | PART 3 | retained exact (master L299) | 8. Conjunctions. |
| full_prompt.md:L296 | PART 3 | retained exact (master L300) | 9. Synonyms. |
| full_prompt.md:L297 | PART 3 | retained exact (master L301) | 10. Antonyms. |
| full_prompt.md:L298 | PART 3 | retained exact (master L302) | 11. Spelling. |
| full_prompt.md:L299 | PART 3 | retained exact (master L303) | 12. Punctuation. |
| full_prompt.md:L300 | PART 3 | retained exact (master L304) | 13. Cloze passages. |
| full_prompt.md:L301 | PART 3 | retained exact (master L305) | 14. Contextual understanding. |
| full_prompt.md:L302 | PART 3 | retained exact (master L306) | 15. Critical reading. |
| full_prompt.md:L303 | PART 3 | retained exact (master L307) | 16. Short writing. |
| full_prompt.md:L304 | PART 3 | retained exact (master L308) | 17. Sentence correction. |
| full_prompt.md:L306 | PART 3 | retained exact (master L310) | Focus on practical English competency. |
| full_prompt.md:L308 | PART 3 | retained exact (master L312) | Every question must use proper English. |
| full_prompt.md:L310 | PART 3 | retained exact (master L314) | Provide explanations in simple English with optional Malay translations. |
| full_prompt.md:L312 | PART 3 | retained exact (master L316) | ### MATHEMATICS |
| full_prompt.md:L314 | PART 3 | retained exact (master L290) | Create sections: |
| full_prompt.md:L316 | PART 3 | retained exact (master L320) | 1. Whole numbers. |
| full_prompt.md:L317 | PART 3 | retained exact (master L321) | 2. Fractions. |
| full_prompt.md:L318 | PART 3 | retained exact (master L322) | 3. Decimals. |
| full_prompt.md:L319 | PART 3 | retained exact (master L323) | 4. Percentages. |
| full_prompt.md:L320 | PART 3 | retained exact (master L324) | 5. Ratio and proportion. |
| full_prompt.md:L321 | PART 3 | retained exact (master L325) | 6. Basic algebra. |
| full_prompt.md:L322 | PART 3 | retained exact (master L326) | 7. Geometry. |
| full_prompt.md:L323 | PART 3 | retained exact (master L327) | 8. Perimeter. |
| full_prompt.md:L324 | PART 3 | retained exact (master L328) | 9. Area. |
| full_prompt.md:L325 | PART 3 | retained exact (master L329) | 10. Volume. |
| full_prompt.md:L326 | PART 3 | retained exact (master L330) | 11. Angles. |
| full_prompt.md:L327 | PART 3 | retained exact (master L331) | 12. Measurements. |
| full_prompt.md:L328 | PART 3 | retained exact (master L332) | 13. Time. |
| full_prompt.md:L329 | PART 3 | retained exact (master L333) | 14. Speed, distance and time. |
| full_prompt.md:L330 | PART 3 | retained exact (master L334) | 15. Statistics. |
| full_prompt.md:L331 | PART 3 | retained exact (master L335) | 16. Probability. |
| full_prompt.md:L332 | PART 3 | retained exact (master L336) | 17. Patterns. |
| full_prompt.md:L333 | PART 3 | retained exact (master L337) | 18. Number sequences. |
| full_prompt.md:L334 | PART 3 | retained exact (master L338) | 19. Word problems. |
| full_prompt.md:L335 | PART 3 | retained exact (master L339) | 20. Logical reasoning. |
| full_prompt.md:L337 | PART 3 | retained exact (master L341) | Questions should progressively develop from primary school foundations towards suitable Cambridge Lower Secondary / IGCSE preparation concepts. |
| full_prompt.md:L339 | PART 3 | retained exact (master L343) | Include: |
| full_prompt.md:L341 | PART 3 | retained exact (master L345) | - Calculation questions. |
| full_prompt.md:L342 | PART 3 | retained exact (master L346) | - Multi-step problems. |
| full_prompt.md:L343 | PART 3 | retained exact (master L347) | - Real-world scenarios. |
| full_prompt.md:L344 | PART 3 | retained exact (master L348) | - Logical reasoning. |
| full_prompt.md:L345 | PART 3 | retained exact (master L349) | - HOTS questions. |
| full_prompt.md:L346 | PART 3 | retained exact (master L350) | - Questions requiring careful reading. |
| full_prompt.md:L348 | PART 3 | retained exact (master L352) | Show step-by-step working after answering. |
| full_prompt.md:L350 | PART 3 | retained exact (master L354) | Use proper mathematical notation. |
| full_prompt.md:L352 | PART 3 | retained exact (master L356) | ### SCIENCE |
| full_prompt.md:L354 | PART 3 | retained exact (master L290) | Create sections: |
| full_prompt.md:L356 | PART 3 | retained exact (master L360) | 1. Living things. |
| full_prompt.md:L357 | PART 3 | retained exact (master L361) | 2. Cells. |
| full_prompt.md:L358 | PART 3 | retained exact (master L362) | 3. Human body. |
| full_prompt.md:L359 | PART 3 | retained exact (master L363) | 4. Plants. |
| full_prompt.md:L360 | PART 3 | retained exact (master L364) | 5. Photosynthesis. |
| full_prompt.md:L361 | PART 3 | retained exact (master L365) | 6. Reproduction. |
| full_prompt.md:L362 | PART 3 | retained exact (master L366) | 7. Food chains. |
| full_prompt.md:L363 | PART 3 | retained exact (master L367) | 8. Ecosystems. |
| full_prompt.md:L364 | PART 3 | retained exact (master L368) | 9. Matter. |
| full_prompt.md:L365 | PART 3 | retained exact (master L369) | 10. States of matter. |
| full_prompt.md:L366 | PART 3 | retained exact (master L370) | 11. Atoms and elements. |
| full_prompt.md:L367 | PART 3 | retained exact (master L371) | 12. Mixtures. |
| full_prompt.md:L368 | PART 3 | retained exact (master L372) | 13. Forces. |
| full_prompt.md:L369 | PART 3 | retained exact (master L373) | 14. Motion. |
| full_prompt.md:L370 | PART 3 | retained exact (master L374) | 15. Gravity. |
| full_prompt.md:L371 | PART 3 | retained exact (master L375) | 16. Friction. |
| full_prompt.md:L372 | PART 3 | retained exact (master L376) | 17. Energy. |
| full_prompt.md:L373 | PART 3 | retained exact (master L377) | 18. Electricity. |
| full_prompt.md:L374 | PART 3 | retained exact (master L378) | 19. Light. |
| full_prompt.md:L375 | PART 3 | retained exact (master L379) | 20. Sound. |
| full_prompt.md:L376 | PART 3 | retained exact (master L380) | 21. Heat. |
| full_prompt.md:L377 | PART 3 | retained exact (master L381) | 22. Earth and space. |
| full_prompt.md:L378 | PART 3 | retained exact (master L382) | 23. Scientific investigation. |
| full_prompt.md:L379 | PART 3 | retained exact (master L383) | 24. Experimental variables. |
| full_prompt.md:L380 | PART 3 | retained exact (master L384) | 25. Data interpretation. |
| full_prompt.md:L382 | PART 3 | retained exact (master L386) | Include scenario-based questions. |
| full_prompt.md:L384 | PART 3 | retained exact (master L388) | Students must learn to interpret information, identify variables, analyse observations and apply scientific principles. |
| full_prompt.md:L386 | PART 3 | retained exact (master L390) | ## Question metadata |
| full_prompt.md:L388 | PART 3 | retained exact (master L392) | Every question must contain: |
| full_prompt.md:L390 | PART 3 | retained exact (master L394) | - Unique ID. |
| full_prompt.md:L391 | PART 3 | retained exact (master L395) | - Subject. |
| full_prompt.md:L392 | PART 3 | retained exact (master L396) | - Topic. |
| full_prompt.md:L393 | PART 3 | retained exact (master L397) | - Subtopic. |
| full_prompt.md:L394 | PART 3 | retained exact (master L398) | - Difficulty. |
| full_prompt.md:L395 | PART 3 | retained exact (master L399) | - Question type. |
| full_prompt.md:L396 | PART 3 | retained exact (master L400) | - Question text. |
| full_prompt.md:L397 | PART 3 | retained exact (master L401) | - Answer options, where applicable. |
| full_prompt.md:L398 | PART 3 | retained exact (master L402) | - Correct answer. |
| full_prompt.md:L399 | PART 3 | retained exact (master L403) | - Explanation. |
| full_prompt.md:L400 | PART 3 | retained exact (master L404) | - Learning objective. |
| full_prompt.md:L401 | PART 3 | retained exact (master L405) | - Estimated time. |
| full_prompt.md:L402 | PART 3 | retained exact (master L406) | - Language. |
| full_prompt.md:L403 | PART 3 | retained exact (master L407) | - Source/reference or curriculum alignment. |
| full_prompt.md:L404 | PART 3 | retained exact (master L408) | - Tags. |
| full_prompt.md:L406 | PART 3 | retained exact (master L410) | Difficulty levels: |
| full_prompt.md:L408 | PART 3 | retained exact (master L412) | - Level 1: Easy. |
| full_prompt.md:L409 | PART 3 | retained exact (master L413) | - Level 2: Basic. |
| full_prompt.md:L410 | PART 3 | retained exact (master L414) | - Level 3: Intermediate. |
| full_prompt.md:L411 | PART 3 | retained exact (master L415) | - Level 4: Advanced. |
| full_prompt.md:L412 | PART 3 | retained exact (master L416) | - Level 5: Challenge / HOTS. |
| full_prompt.md:L414 | PART 3 | retained exact (master L418) | Question types: |
| full_prompt.md:L416 | PART 3 | retained exact (master L420) | - Multiple choice. |
| full_prompt.md:L417 | PART 3 | retained exact (master L421) | - True / False. |
| full_prompt.md:L418 | PART 3 | retained exact (master L422) | - Fill in the blanks. |
| full_prompt.md:L419 | PART 3 | retained exact (master L423) | - Short answer. |
| full_prompt.md:L420 | PART 3 | retained exact (master L424) | - Numerical answer. |
| full_prompt.md:L421 | PART 3 | retained exact (master L425) | - Reading comprehension. |
| full_prompt.md:L422 | PART 3 | retained exact (master L426) | - Multi-step calculation. |
| full_prompt.md:L424 | PART 3 | retained exact (master L428) | For the first release, ensure all question types implemented in the UI can actually be marked correctly. |
| full_prompt.md:L426 | PART 3 | retained exact (master L430) | Do not generate duplicate questions with merely different numbers. |
| full_prompt.md:L428 | PART 3 | retained exact (master L432) | Do not create questions with ambiguous wording or multiple correct answers unless explicitly designed as multi-select questions. |
| full_prompt.md:L430 | PART 3 | retained exact (master L434) | Validate every answer and explanation. |
| full_prompt.md:L432 | PART 3 | retained exact (master L37) | --- |
| full_prompt.md:L434 | PART 4 | retained exact (master L438) | # PART 4 — INTERACTIVE QUIZ ENGINE |
| full_prompt.md:L436 | PART 4 | retained exact (master L440) | Create a polished quiz experience. |
| full_prompt.md:L438 | PART 4 | retained exact (master L442) | The student should enjoy using it. |
| full_prompt.md:L440 | PART 4 | retained exact (master L444) | ## Quiz features |
| full_prompt.md:L442 | PART 4 | retained exact (master L446) | 1. Select subject. |
| full_prompt.md:L443 | PART 4 | retained exact (master L447) | 2. Select topic. |
| full_prompt.md:L444 | PART 4 | retained exact (master L448) | 3. Select difficulty. |
| full_prompt.md:L445 | PART 4 | retained exact (master L449) | 4. Select number of questions. |
| full_prompt.md:L446 | PART 4 | retained exact (master L450) | 5. Randomised question order. |
| full_prompt.md:L447 | PART 4 | retained exact (master L451) | 6. Randomised answer order where safe. |
| full_prompt.md:L448 | PART 4 | retained exact (master L452) | 7. Countdown timer. |
| full_prompt.md:L449 | PART 4 | retained exact (master L453) | 8. Question navigation. |
| full_prompt.md:L450 | PART 4 | retained exact (master L454) | 9. Progress indicator. |
| full_prompt.md:L451 | PART 4 | retained exact (master L455) | 10. Mark questions for review. |
| full_prompt.md:L452 | PART 4 | retained exact (master L456) | 11. Submit examination. |
| full_prompt.md:L453 | PART 4 | retained exact (master L457) | 12. Automatic marking. |
| full_prompt.md:L454 | PART 4 | retained exact (master L458) | 13. Score percentage. |
| full_prompt.md:L455 | PART 4 | retained exact (master L459) | 14. Correct answers. |
| full_prompt.md:L456 | PART 4 | retained exact (master L460) | 15. Incorrect answers. |
| full_prompt.md:L457 | PART 4 | retained exact (master L461) | 16. Explanation for each answer. |
| full_prompt.md:L458 | PART 4 | retained exact (master L462) | 17. Time taken. |
| full_prompt.md:L459 | PART 4 | retained exact (master L463) | 18. Final result summary. |
| full_prompt.md:L460 | PART 4 | retained exact (master L464) | 19. Retake quiz. |
| full_prompt.md:L461 | PART 4 | retained exact (master L465) | 20. Save every completed attempt. |
| full_prompt.md:L463 | PART 4 | retained exact (master L467) | Allow these modes: |
| full_prompt.md:L465 | PART 4 | retained exact (master L469) | ### Practice Mode |
| full_prompt.md:L467 | PART 4 | retained exact (master L471) | - No pressure. |
| full_prompt.md:L468 | PART 4 | retained exact (master L472) | - Optional timer. |
| full_prompt.md:L469 | PART 4 | retained exact (master L473) | - Instant feedback. |
| full_prompt.md:L470 | PART 4 | retained exact (master L474) | - Show explanation after answering. |
| full_prompt.md:L471 | PART 4 | retained exact (master L475) | - Allow students to retry. |
| full_prompt.md:L473 | PART 4 | retained exact (master L477) | ### Examination Mode |
| full_prompt.md:L475 | PART 4 | retained exact (master L479) | - Timed. |
| full_prompt.md:L476 | PART 4 | retained exact (master L480) | - No instant feedback. |
| full_prompt.md:L477 | PART 4 | retained exact (master L481) | - Questions presented in examination style. |
| full_prompt.md:L478 | PART 4 | retained exact (master L482) | - Show results only after submission. |
| full_prompt.md:L479 | PART 4 | retained exact (master L483) | - Save the attempt. |
| full_prompt.md:L481 | PART 4 | retained exact (master L485) | ### Challenge Mode |
| full_prompt.md:L483 | PART 4 | retained exact (master L487) | - Higher difficulty. |
| full_prompt.md:L484 | PART 4 | retained exact (master L349) | - HOTS questions. |
| full_prompt.md:L485 | PART 4 | retained exact (master L489) | - Mixed topics. |
| full_prompt.md:L486 | PART 4 | retained exact (master L490) | - Time pressure. |
| full_prompt.md:L487 | PART 4 | retained exact (master L491) | - Bonus scoring, if appropriate. |
| full_prompt.md:L489 | PART 4 | retained exact (master L493) | ### Daily Challenge |
| full_prompt.md:L491 | PART 4 | retained exact (master L495) | - A short daily quiz. |
| full_prompt.md:L492 | PART 4 | retained exact (master L496) | - Five to ten questions. |
| full_prompt.md:L493 | PART 4 | retained exact (master L497) | - Mix of subjects. |
| full_prompt.md:L494 | PART 4 | retained exact (master L498) | - Track daily completion. |
| full_prompt.md:L496 | PART 4 | retained exact (master L500) | ## Result screen |
| full_prompt.md:L498 | PART 4 | retained exact (master L502) | Show: |
| full_prompt.md:L500 | PART 4 | retained exact (master L504) | - Student name. |
| full_prompt.md:L501 | PART 4 | retained exact (master L395) | - Subject. |
| full_prompt.md:L502 | PART 4 | retained exact (master L506) | - Date and time. |
| full_prompt.md:L503 | PART 4 | retained exact (master L507) | - Total questions. |
| full_prompt.md:L504 | PART 4 | retained exact (master L508) | - Correct answers. |
| full_prompt.md:L505 | PART 4 | retained exact (master L509) | - Incorrect answers. |
| full_prompt.md:L506 | PART 4 | retained exact (master L510) | - Unanswered questions. |
| full_prompt.md:L507 | PART 4 | retained exact (master L511) | - Percentage. |
| full_prompt.md:L508 | PART 4 | retained exact (master L512) | - Time taken. |
| full_prompt.md:L509 | PART 4 | retained exact (master L513) | - Performance category. |
| full_prompt.md:L510 | PART 4 | retained exact (master L514) | - Topic weaknesses. |
| full_prompt.md:L511 | PART 4 | retained exact (master L515) | - Recommended next practice. |
| full_prompt.md:L513 | PART 4 | retained exact (master L517) | Example: |
| full_prompt.md:L515 | PART 4 | retained exact (master L519) | English: 78% |
| full_prompt.md:L517 | PART 4 | retained exact (master L521) | Mathematics: 62% |
| full_prompt.md:L519 | PART 4 | retained exact (master L523) | Science: 85% |
| full_prompt.md:L521 | PART 4 | retained exact (master L525) | Do not use misleading performance labels that imply official examination grades. |
| full_prompt.md:L523 | PART 4 | retained exact (master L527) | Use simple labels: |
| full_prompt.md:L525 | PART 4 | retained exact (master L529) | - Excellent. |
| full_prompt.md:L526 | PART 4 | retained exact (master L530) | - Good. |
| full_prompt.md:L527 | PART 4 | retained exact (master L531) | - Keep Practising. |
| full_prompt.md:L528 | PART 4 | retained exact (master L532) | - Needs Improvement. |
| full_prompt.md:L530 | PART 4 | retained exact (master L534) | Explain that these are internal practice indicators, not official Cambridge grades. |
| full_prompt.md:L532 | PART 4 | retained exact (master L37) | --- |
| full_prompt.md:L534 | PART 5 | retained exact (master L538) | # PART 5 — STUDENT PROFILE AND ATTEMPT HISTORY |
| full_prompt.md:L536 | PART 5 | retained exact (master L540) | The application must support multiple students. |
| full_prompt.md:L538 | PART 5 | retained exact (master L542) | On first use, display a welcome screen. |
| full_prompt.md:L540 | PART 5 | retained exact (master L544) | Ask for: |
| full_prompt.md:L542 | PART 5 | retained exact (master L546) | - Student name / display name. |
| full_prompt.md:L543 | PART 5 | retained exact (master L547) | - Optional parent or guardian name. |
| full_prompt.md:L544 | PART 5 | retained exact (master L548) | - Optional year level. |
| full_prompt.md:L545 | PART 5 | retained exact (master L549) | - Optional school name. |
| full_prompt.md:L547 | PART 5 | retained exact (master L551) | Do not require unnecessary personal information. |
| full_prompt.md:L549 | PART 5 | retained exact (master L553) | For public deployment, implement appropriate parental consent and privacy protections for children. |
| full_prompt.md:L551 | PART 5 | retained exact (master L555) | Do not expose children's full names, school names, detailed results or personal records publicly. |
| full_prompt.md:L553 | PART 5 | retained exact (master L557) | ## Local testing mode |
| full_prompt.md:L555 | PART 5 | retained exact (master L559) | During local development: |
| full_prompt.md:L557 | PART 5 | retained exact (master L561) | - Use SQLite as the database. |
| full_prompt.md:L558 | PART 5 | retained exact (master L562) | - Save student profiles. |
| full_prompt.md:L559 | PART 5 | retained exact (master L563) | - Save quiz attempts. |
| full_prompt.md:L560 | PART 5 | retained exact (master L564) | - Save individual answers. |
| full_prompt.md:L561 | PART 5 | retained exact (master L565) | - Save scores. |
| full_prompt.md:L562 | PART 5 | retained exact (master L566) | - Save timestamps. |
| full_prompt.md:L563 | PART 5 | retained exact (master L567) | - Save subject performance. |
| full_prompt.md:L564 | PART 5 | retained exact (master L568) | - Allow students to continue using an existing profile. |
| full_prompt.md:L566 | PART 5 | retained exact (master L570) | Do not rely only on browser localStorage for persistent examination records. |
| full_prompt.md:L568 | PART 5 | retained exact (master L572) | ## Student dashboard |
| full_prompt.md:L570 | PART 5 | retained exact (master L574) | Create: |
| full_prompt.md:L572 | PART 5 | retained exact (master L576) | - Total quizzes completed. |
| full_prompt.md:L573 | PART 5 | retained exact (master L577) | - Average score. |
| full_prompt.md:L574 | PART 5 | retained exact (master L578) | - Best score. |
| full_prompt.md:L575 | PART 5 | retained exact (master L579) | - Recent attempts. |
| full_prompt.md:L576 | PART 5 | retained exact (master L580) | - Subject performance. |
| full_prompt.md:L577 | PART 5 | retained exact (master L581) | - Weak topics. |
| full_prompt.md:L578 | PART 5 | retained exact (master L582) | - Strong topics. |
| full_prompt.md:L579 | PART 5 | retained exact (master L583) | - Improvement over time. |
| full_prompt.md:L580 | PART 5 | retained exact (master L584) | - Learning streak. |
| full_prompt.md:L582 | PART 5 | retained exact (master L586) | Include visual charts. |
| full_prompt.md:L584 | PART 5 | retained exact (master L588) | ## Attempt history |
| full_prompt.md:L586 | PART 5 | retained exact (master L590) | Students must be able to: |
| full_prompt.md:L588 | PART 5 | retained exact (master L592) | - View previous attempts. |
| full_prompt.md:L589 | PART 5 | retained exact (master L593) | - Open detailed results. |
| full_prompt.md:L590 | PART 5 | retained exact (master L594) | - Review wrong answers. |
| full_prompt.md:L591 | PART 5 | retained exact (master L595) | - Retry questions. |
| full_prompt.md:L592 | PART 5 | retained exact (master L596) | - Compare previous scores. |
| full_prompt.md:L594 | PART 5 | retained exact (master L598) | ## Parent monitoring |
| full_prompt.md:L596 | PART 5 | retained exact (master L600) | Parents should be able to view: |
| full_prompt.md:L598 | PART 5 | retained exact (master L602) | - Overall progress. |
| full_prompt.md:L599 | PART 5 | retained exact (master L580) | - Subject performance. |
| full_prompt.md:L600 | PART 5 | retained exact (master L604) | - Areas requiring attention. |
| full_prompt.md:L601 | PART 5 | retained exact (master L605) | - Quiz history. |
| full_prompt.md:L602 | PART 5 | retained exact (master L606) | - Improvement trends. |
| full_prompt.md:L603 | PART 5 | retained exact (master L607) | - Suggested revision priorities. |
| full_prompt.md:L605 | PART 5 | retained exact (master L37) | --- |
| full_prompt.md:L607 | PART 6 | retained exact (master L611) | # PART 6 — SINGLE-PAGE APPLICATION DESIGN |
| full_prompt.md:L609 | PART 6 | retained exact (master L613) | Build a Single Page Application. |
| full_prompt.md:L611 | PART 6 | retained exact (master L615) | The user should not need to navigate through multiple HTML pages. |
| full_prompt.md:L613 | PART 6 | retained exact (master L617) | Main application layout: |
| full_prompt.md:L615 | PART 6 | retained exact (master L619) | ### Navigation |
| full_prompt.md:L617 | PART 6 | retained exact (master L621) | - Home. |
| full_prompt.md:L618 | PART 6 | retained exact (master L622) | - Start Quiz. |
| full_prompt.md:L619 | PART 6 | retained exact (master L623) | - Question Bank. |
| full_prompt.md:L620 | PART 6 | retained exact (master L624) | - My Progress. |
| full_prompt.md:L621 | PART 6 | retained exact (master L625) | - Student Guide. |
| full_prompt.md:L622 | PART 6 | retained exact (master L626) | - Parent Guide. |
| full_prompt.md:L623 | PART 6 | retained exact (master L627) | - About. |
| full_prompt.md:L625 | PART 6 | retained exact (master L629) | Use tabbed navigation or a clean single-page navigation system. |
| full_prompt.md:L627 | PART 6 | retained exact (master L631) | Do not reload the page unnecessarily. |
| full_prompt.md:L629 | PART 6 | retained exact (master L633) | ## HOME TAB |
| full_prompt.md:L631 | PART 6 | retained exact (master L343) | Include: |
| full_prompt.md:L633 | PART 6 | retained exact (master L637) | - Attractive hero section. |
| full_prompt.md:L634 | PART 6 | retained exact (master L638) | - Welcome message. |
| full_prompt.md:L635 | PART 6 | retained exact (master L639) | - Student profile. |
| full_prompt.md:L636 | PART 6 | retained exact (master L640) | - Start learning button. |
| full_prompt.md:L637 | PART 6 | retained exact (master L641) | - Subject cards. |
| full_prompt.md:L638 | PART 6 | retained exact (master L642) | - Daily challenge. |
| full_prompt.md:L639 | PART 6 | retained exact (master L643) | - Recent activity. |
| full_prompt.md:L640 | PART 6 | retained exact (master L602) | - Overall progress. |
| full_prompt.md:L642 | PART 6 | retained exact (master L646) | Suggested headline: |
| full_prompt.md:L644 | PART 6 | retained exact (master L648) | "Your Journey to MRSM IGCSE Starts Here." |
| full_prompt.md:L646 | PART 6 | retained exact (master L650) | Subtitle: |
| full_prompt.md:L648 | PART 6 | retained exact (master L652) | "Learn. Practise. Improve. Be Ready." |
| full_prompt.md:L650 | PART 6 | retained exact (master L654) | ## QUIZ TAB |
| full_prompt.md:L652 | PART 6 | retained exact (master L343) | Include: |
| full_prompt.md:L654 | PART 6 | retained exact (master L658) | - Subject selector. |
| full_prompt.md:L655 | PART 6 | retained exact (master L659) | - Topic selector. |
| full_prompt.md:L656 | PART 6 | retained exact (master L660) | - Difficulty selector. |
| full_prompt.md:L657 | PART 6 | retained exact (master L661) | - Practice mode. |
| full_prompt.md:L658 | PART 6 | retained exact (master L662) | - Examination mode. |
| full_prompt.md:L659 | PART 6 | retained exact (master L663) | - Challenge mode. |
| full_prompt.md:L660 | PART 6 | retained exact (master L664) | - Start button. |
| full_prompt.md:L662 | PART 6 | retained exact (master L666) | ## QUESTION BANK TAB |
| full_prompt.md:L664 | PART 6 | retained exact (master L668) | Allow filtering by: |
| full_prompt.md:L666 | PART 6 | retained exact (master L395) | - Subject. |
| full_prompt.md:L667 | PART 6 | retained exact (master L396) | - Topic. |
| full_prompt.md:L668 | PART 6 | retained exact (master L398) | - Difficulty. |
| full_prompt.md:L669 | PART 6 | retained exact (master L399) | - Question type. |
| full_prompt.md:L671 | PART 6 | retained exact (master L675) | Show the total available question count. |
| full_prompt.md:L673 | PART 6 | retained exact (master L677) | ## PROGRESS TAB |
| full_prompt.md:L675 | PART 6 | retained exact (master L343) | Include: |
| full_prompt.md:L677 | PART 6 | retained exact (master L681) | - Score cards. |
| full_prompt.md:L678 | PART 6 | retained exact (master L682) | - Charts. |
| full_prompt.md:L679 | PART 6 | retained exact (master L683) | - Performance by subject. |
| full_prompt.md:L680 | PART 6 | retained exact (master L684) | - Weakness analysis. |
| full_prompt.md:L681 | PART 6 | retained exact (master L685) | - Attempt history. |
| full_prompt.md:L682 | PART 6 | retained exact (master L686) | - Recommendations. |
| full_prompt.md:L684 | PART 6 | retained exact (master L688) | ## STUDENT GUIDE TAB |
| full_prompt.md:L686 | PART 6 | retained exact (master L690) | Use friendly, simple language. |
| full_prompt.md:L688 | PART 6 | retained exact (master L692) | Explain: |
| full_prompt.md:L690 | PART 6 | retained exact (master L694) | 1. What is MRSM? |
| full_prompt.md:L691 | PART 6 | retained exact (master L695) | 2. What is IGCSE? |
| full_prompt.md:L692 | PART 6 | retained exact (master L696) | 3. What happens when entering Form 1? |
| full_prompt.md:L693 | PART 6 | retained exact (master L697) | 4. Why English is important. |
| full_prompt.md:L694 | PART 6 | retained exact (master L698) | 5. How to improve English vocabulary. |
| full_prompt.md:L695 | PART 6 | retained exact (master L699) | 6. How to understand Mathematics questions in English. |
| full_prompt.md:L696 | PART 6 | retained exact (master L700) | 7. How to study Science in English. |
| full_prompt.md:L697 | PART 6 | retained exact (master L701) | 8. How to manage examination time. |
| full_prompt.md:L698 | PART 6 | retained exact (master L702) | 9. How to handle difficult questions. |
| full_prompt.md:L699 | PART 6 | retained exact (master L703) | 10. How to build confidence. |
| full_prompt.md:L700 | PART 6 | retained exact (master L704) | 11. How to develop good study habits. |
| full_prompt.md:L702 | PART 6 | retained exact (master L706) | Include an English-Malay academic vocabulary glossary. |
| full_prompt.md:L704 | PART 6 | retained exact (master L517) | Example: |
| full_prompt.md:L706 | PART 6 | retained exact (master L710) | \| English \| Bahasa Melayu \| |
| full_prompt.md:L707 | PART 6 | retained exact (master L711) | \|---\|---\| |
| full_prompt.md:L708 | PART 6 | retained exact (master L712) | \| Fraction \| Pecahan \| |
| full_prompt.md:L709 | PART 6 | retained exact (master L713) | \| Percentage \| Peratus \| |
| full_prompt.md:L710 | PART 6 | retained exact (master L714) | \| Perimeter \| Perimeter / Ukur keliling \| |
| full_prompt.md:L711 | PART 6 | retained exact (master L715) | \| Area \| Luas \| |
| full_prompt.md:L712 | PART 6 | retained exact (master L716) | \| Volume \| Isi padu \| |
| full_prompt.md:L713 | PART 6 | retained exact (master L717) | \| Gravity \| Graviti \| |
| full_prompt.md:L714 | PART 6 | retained exact (master L718) | \| Friction \| Geseran \| |
| full_prompt.md:L715 | PART 6 | retained exact (master L719) | \| Evaporation \| Penyejatan \| |
| full_prompt.md:L716 | PART 6 | retained exact (master L720) | \| Photosynthesis \| Fotosintesis \| |
| full_prompt.md:L717 | PART 6 | retained exact (master L721) | \| Investigation \| Penyiasatan \| |
| full_prompt.md:L718 | PART 6 | retained exact (master L722) | \| Evidence \| Bukti \| |
| full_prompt.md:L719 | PART 6 | retained exact (master L723) | \| Conclusion \| Kesimpulan \| |
| full_prompt.md:L721 | PART 6 | retained exact (master L725) | Make the glossary searchable. |
| full_prompt.md:L723 | PART 6 | retained exact (master L727) | ## PARENT GUIDE TAB |
| full_prompt.md:L725 | PART 6 | retained exact (master L729) | Use clear Malaysian parent-friendly language. |
| full_prompt.md:L727 | PART 6 | retained exact (master L343) | Include: |
| full_prompt.md:L729 | PART 6 | retained exact (master L694) | 1. What is MRSM? |
| full_prompt.md:L730 | PART 6 | retained exact (master L734) | 2. MRSM Form 1 admission overview. |
| full_prompt.md:L731 | PART 6 | retained exact (master L735) | 3. UKKM explanation. |
| full_prompt.md:L732 | PART 6 | retained exact (master L736) | 4. What is MRSM IGCSE? |
| full_prompt.md:L733 | PART 6 | retained exact (master L737) | 5. Difference between MRSM Premier and IGCSE. |
| full_prompt.md:L734 | PART 6 | retained exact (master L738) | 6. Cambridge IGCSE overview. |
| full_prompt.md:L735 | PART 6 | retained exact (master L739) | 7. What parents should expect. |
| full_prompt.md:L736 | PART 6 | retained exact (master L740) | 8. Academic workload. |
| full_prompt.md:L737 | PART 6 | retained exact (master L741) | 9. Importance of English. |
| full_prompt.md:L738 | PART 6 | retained exact (master L742) | 10. Mathematics preparation. |
| full_prompt.md:L739 | PART 6 | retained exact (master L743) | 11. Science preparation. |
| full_prompt.md:L740 | PART 6 | retained exact (master L744) | 12. Advantages of the programme. |
| full_prompt.md:L741 | PART 6 | retained exact (master L745) | 13. Challenges and considerations. |
| full_prompt.md:L742 | PART 6 | retained exact (master L746) | 14. How parents can support children. |
| full_prompt.md:L743 | PART 6 | retained exact (master L747) | 15. Suggested weekly study routine. |
| full_prompt.md:L744 | PART 6 | retained exact (master L748) | 16. Frequently asked questions. |
| full_prompt.md:L745 | PART 6 | retained exact (master L749) | 17. Official reference links. |
| full_prompt.md:L747 | PART 6 | retained exact (master L751) | Use expandable FAQ sections. |
| full_prompt.md:L749 | PART 6 | retained exact (master L753) | Include source links beside important official claims. |
| full_prompt.md:L751 | PART 6 | retained exact (master L755) | Clearly distinguish verified official information from general advice. |
| full_prompt.md:L753 | PART 6 | retained exact (master L757) | ## ABOUT TAB |
| full_prompt.md:L755 | PART 6 | retained exact (master L692) | Explain: |
| full_prompt.md:L757 | PART 6 | retained exact (master L761) | - Purpose of this project. |
| full_prompt.md:L758 | PART 6 | retained exact (master L762) | - Community learning initiative. |
| full_prompt.md:L759 | PART 6 | retained exact (master L763) | - Independent practice platform. |
| full_prompt.md:L760 | PART 6 | retained exact (master L764) | - Not an official MARA website. |
| full_prompt.md:L761 | PART 6 | retained exact (master L765) | - Not affiliated with Cambridge International. |
| full_prompt.md:L762 | PART 6 | retained exact (master L766) | - Not an official admission assessment simulator. |
| full_prompt.md:L764 | PART 6 | retained exact (master L37) | --- |
| full_prompt.md:L766 | PART 7 | retained exact (master L770) | # PART 7 — VISUAL DESIGN |
| full_prompt.md:L768 | PART 7 | retained exact (master L772) | Design quality is important. |
| full_prompt.md:L770 | PART 7 | retained exact (master L774) | Do not make it look like a boring school administration system. |
| full_prompt.md:L772 | PART 7 | retained exact (master L776) | Visual direction: |
| full_prompt.md:L774 | PART 7 | retained exact (master L778) | - Premium modern educational platform. |
| full_prompt.md:L775 | PART 7 | retained exact (master L779) | - Clean dashboard. |
| full_prompt.md:L776 | PART 7 | retained exact (master L780) | - Modern typography. |
| full_prompt.md:L777 | PART 7 | retained exact (master L781) | - Friendly but professional. |
| full_prompt.md:L778 | PART 7 | retained exact (master L782) | - Responsive design. |
| full_prompt.md:L779 | PART 7 | retained exact (master L783) | - Smooth transitions. |
| full_prompt.md:L780 | PART 7 | retained exact (master L784) | - Subtle animations. |
| full_prompt.md:L781 | PART 7 | retained exact (master L785) | - Attractive progress indicators. |
| full_prompt.md:L782 | PART 7 | retained exact (master L786) | - Beautiful quiz cards. |
| full_prompt.md:L783 | PART 7 | retained exact (master L787) | - Clear typography and spacing. |
| full_prompt.md:L785 | PART 7 | retained exact (master L789) | Suggested theme: |
| full_prompt.md:L787 | PART 7 | retained exact (master L791) | - Navy blue. |
| full_prompt.md:L788 | PART 7 | retained exact (master L792) | - White. |
| full_prompt.md:L789 | PART 7 | retained exact (master L793) | - Gold accents. |
| full_prompt.md:L790 | PART 7 | retained exact (master L794) | - Soft grey background. |
| full_prompt.md:L792 | PART 7 | retained exact (master L796) | Use a consistent design system. |
| full_prompt.md:L794 | PART 7 | retained exact (master L798) | Use icons where appropriate. |
| full_prompt.md:L796 | PART 7 | retained exact (master L800) | Use accessible colour contrast. |
| full_prompt.md:L798 | PART 7 | retained exact (master L802) | Support: |
| full_prompt.md:L800 | PART 7 | retained exact (master L804) | - Desktop. |
| full_prompt.md:L801 | PART 7 | retained exact (master L805) | - Laptop. |
| full_prompt.md:L802 | PART 7 | retained exact (master L806) | - Tablet. |
| full_prompt.md:L803 | PART 7 | retained exact (master L807) | - Mobile. |
| full_prompt.md:L805 | PART 7 | retained exact (master L809) | The quiz interface must be particularly mobile-friendly. |
| full_prompt.md:L807 | PART 7 | retained exact (master L811) | Avoid unnecessary visual clutter. |
| full_prompt.md:L809 | PART 7 | retained exact (master L813) | Do not overuse gradients, animations or glassmorphism. |
| full_prompt.md:L811 | PART 7 | retained exact (master L815) | Use a responsive navigation system. |
| full_prompt.md:L813 | PART 7 | retained exact (master L37) | --- |
| full_prompt.md:L815 | PART 8 | retained exact (master L819) | # PART 8 — TECHNICAL ARCHITECTURE |
| full_prompt.md:L817 | PART 8 | retained exact (master L821) | Recommended initial stack: |
| full_prompt.md:L819 | PART 8 | retained exact (master L823) | Backend: |
| full_prompt.md:L820 | PART 8 | retained exact (master L824) | - Node.js. |
| full_prompt.md:L821 | PART 8 | retained exact (master L825) | - Express.js. |
| full_prompt.md:L822 | PART 8 | retained exact (master L826) | - SQLite. |
| full_prompt.md:L824 | PART 8 | retained exact (master L828) | Frontend: |
| full_prompt.md:L825 | PART 8 | retained exact (master L829) | - HTML5. |
| full_prompt.md:L826 | PART 8 | retained exact (master L830) | - CSS3. |
| full_prompt.md:L827 | PART 8 | retained exact (master L831) | - Vanilla JavaScript or lightweight modular JavaScript. |
| full_prompt.md:L829 | PART 8 | retained exact (master L833) | Charts: |
| full_prompt.md:L830 | PART 8 | retained exact (master L834) | - Chart.js or another lightweight chart library. |
| full_prompt.md:L832 | PART 8 | retained exact (master L836) | Icons: |
| full_prompt.md:L833 | PART 8 | retained exact (master L837) | - Lucide Icons. |
| full_prompt.md:L835 | PART 8 | retained exact (master L839) | Database: |
| full_prompt.md:L836 | PART 8 | retained exact (master L826) | - SQLite. |
| full_prompt.md:L838 | PART 8 | retained exact (master L842) | Use modular architecture. |
| full_prompt.md:L840 | PART 8 | retained exact (master L844) | Suggested structure: |
| full_prompt.md:L842 | PART 8 | retained exact (master L846) | ```text |
| full_prompt.md:L843 | PART 8 | retained exact (master L847) | D:\IGCSE |
| full_prompt.md:L844 | PART 8 | retained exact (master L848) | │ |
| full_prompt.md:L845 | PART 8 | retained exact (master L849) | ├── server.js |
| full_prompt.md:L846 | PART 8 | retained exact (master L850) | ├── package.json |
| full_prompt.md:L847 | PART 8 | retained exact (master L851) | ├── .env.example |
| full_prompt.md:L848 | PART 8 | retained exact (master L852) | ├── .gitignore |
| full_prompt.md:L849 | PART 8 | retained exact (master L853) | ├── README.md |
| full_prompt.md:L850 | PART 8 | retained exact (master L848) | │ |
| full_prompt.md:L851 | PART 8 | retained exact (master L855) | ├── src/ |
| full_prompt.md:L852 | PART 8 | retained exact (master L856) | │   ├── config/ |
| full_prompt.md:L853 | PART 8 | retained exact (master L857) | │   │   └── database.js |
| full_prompt.md:L854 | PART 8 | retained exact (master L858) | │   │ |
| full_prompt.md:L855 | PART 8 | retained exact (master L859) | │   ├── routes/ |
| full_prompt.md:L856 | PART 8 | retained exact (master L860) | │   │   ├── students.js |
| full_prompt.md:L857 | PART 8 | retained exact (master L861) | │   │   ├── questions.js |
| full_prompt.md:L858 | PART 8 | retained exact (master L862) | │   │   ├── quizzes.js |
| full_prompt.md:L859 | PART 8 | retained exact (master L863) | │   │   ├── attempts.js |
| full_prompt.md:L860 | PART 8 | retained exact (master L864) | │   │   └── dashboard.js |
| full_prompt.md:L861 | PART 8 | retained exact (master L858) | │   │ |
| full_prompt.md:L862 | PART 8 | retained exact (master L866) | │   ├── services/ |
| full_prompt.md:L863 | PART 8 | retained exact (master L867) | │   │   ├── quizService.js |
| full_prompt.md:L864 | PART 8 | retained exact (master L868) | │   │   ├── scoringService.js |
| full_prompt.md:L865 | PART 8 | retained exact (master L869) | │   │   └── analyticsService.js |
| full_prompt.md:L866 | PART 8 | retained exact (master L858) | │   │ |
| full_prompt.md:L867 | PART 8 | retained exact (master L871) | │   ├── middleware/ |
| full_prompt.md:L868 | PART 8 | retained exact (master L872) | │   │   └── security.js |
| full_prompt.md:L869 | PART 8 | retained exact (master L858) | │   │ |
| full_prompt.md:L870 | PART 8 | retained exact (master L874) | │   └── database/ |
| full_prompt.md:L871 | PART 8 | retained exact (master L875) | │       ├── schema.sql |
| full_prompt.md:L872 | PART 8 | retained exact (master L876) | │       └── seed.js |
| full_prompt.md:L873 | PART 8 | retained exact (master L848) | │ |
| full_prompt.md:L874 | PART 8 | retained exact (master L878) | ├── public/ |
| full_prompt.md:L875 | PART 8 | retained exact (master L879) | │   ├── index.html |
| full_prompt.md:L876 | PART 8 | retained exact (master L880) | │   ├── assets/ |
| full_prompt.md:L877 | PART 8 | retained exact (master L881) | │   │   ├── css/ |
| full_prompt.md:L878 | PART 8 | retained exact (master L882) | │   │   ├── js/ |
| full_prompt.md:L879 | PART 8 | retained exact (master L883) | │   │   └── images/ |
| full_prompt.md:L880 | PART 8 | retained exact (master L848) | │ |
| full_prompt.md:L881 | PART 8 | retained exact (master L885) | ├── data/ |
| full_prompt.md:L882 | PART 8 | retained exact (master L886) | │   └── .gitkeep |
| full_prompt.md:L883 | PART 8 | retained exact (master L848) | │ |
| full_prompt.md:L884 | PART 8 | retained exact (master L888) | ├── docs/ |
| full_prompt.md:L885 | PART 8 | retained exact (master L889) | │   ├── research/ |
| full_prompt.md:L886 | PART 8 | retained exact (master L890) | │   ├── architecture/ |
| full_prompt.md:L887 | PART 8 | retained exact (master L891) | │   └── user-guide/ |
| full_prompt.md:L888 | PART 8 | retained exact (master L848) | │ |
| full_prompt.md:L889 | PART 8 | retained exact (master L893) | ├── tests/ |
| full_prompt.md:L890 | PART 8 | retained exact (master L848) | │ |
| full_prompt.md:L891 | PART 8 | retained exact (master L895) | └── scripts/ |
| full_prompt.md:L892 | PART 8 | retained exact (master L896) | ``` |
| full_prompt.md:L894 | PART 8 | retained exact (master L898) | You may improve this architecture if there is a strong technical reason. |
| full_prompt.md:L896 | PART 8 | retained exact (master L900) | Keep the frontend as one main HTML application. |
| full_prompt.md:L898 | PART 8 | retained exact (master L902) | Use JavaScript modules to separate functionality. |
| full_prompt.md:L900 | PART 8 | retained exact (master L904) | ## Database tables |
| full_prompt.md:L902 | PART 8 | retained exact (master L906) | Design a proper relational database. |
| full_prompt.md:L904 | PART 8 | retained exact (master L908) | At minimum: |
| full_prompt.md:L906 | PART 8 | retained exact (master L910) | 1. students |
| full_prompt.md:L907 | PART 8 | retained exact (master L911) | 2. questions |
| full_prompt.md:L908 | PART 8 | retained exact (master L912) | 3. question_options |
| full_prompt.md:L909 | PART 8 | retained exact (master L913) | 4. subjects |
| full_prompt.md:L910 | PART 8 | retained exact (master L914) | 5. topics |
| full_prompt.md:L911 | PART 8 | retained exact (master L915) | 6. quizzes |
| full_prompt.md:L912 | PART 8 | retained exact (master L916) | 7. quiz_attempts |
| full_prompt.md:L913 | PART 8 | retained exact (master L917) | 8. attempt_answers |
| full_prompt.md:L914 | PART 8 | retained exact (master L918) | 9. learning_progress |
| full_prompt.md:L915 | PART 8 | retained exact (master L919) | 10. daily_challenges |
| full_prompt.md:L917 | PART 8 | retained exact (master L921) | Use appropriate: |
| full_prompt.md:L919 | PART 8 | retained exact (master L923) | - Primary keys. |
| full_prompt.md:L920 | PART 8 | retained exact (master L924) | - Foreign keys. |
| full_prompt.md:L921 | PART 8 | retained exact (master L925) | - Indexes. |
| full_prompt.md:L922 | PART 8 | retained exact (master L926) | - Timestamps. |
| full_prompt.md:L923 | PART 8 | retained exact (master L927) | - Data validation. |
| full_prompt.md:L924 | PART 8 | retained exact (master L928) | - Database constraints. |
| full_prompt.md:L926 | PART 8 | retained exact (master L930) | Use migrations or a versioned schema process. |
| full_prompt.md:L928 | PART 8 | retained exact (master L932) | Do not store all data in one JSON file. |
| full_prompt.md:L930 | PART 8 | retained exact (master L934) | ## API |
| full_prompt.md:L932 | PART 8 | retained exact (master L936) | Create REST API endpoints. |
| full_prompt.md:L934 | PART 8 | retained exact (master L938) | Examples: |
| full_prompt.md:L936 | PART 8 | retained exact (master L940) | GET /api/health |
| full_prompt.md:L938 | PART 8 | retained exact (master L942) | GET /api/subjects |
| full_prompt.md:L940 | PART 8 | retained exact (master L944) | GET /api/topics |
| full_prompt.md:L942 | PART 8 | retained exact (master L946) | GET /api/questions |
| full_prompt.md:L944 | PART 8 | retained exact (master L948) | GET /api/questions/:id |
| full_prompt.md:L946 | PART 8 | retained exact (master L950) | POST /api/students |
| full_prompt.md:L948 | PART 8 | retained exact (master L952) | GET /api/students/:id |
| full_prompt.md:L950 | PART 8 | retained exact (master L954) | GET /api/students/:id/progress |
| full_prompt.md:L952 | PART 8 | retained exact (master L956) | GET /api/students/:id/attempts |
| full_prompt.md:L954 | PART 8 | retained exact (master L958) | POST /api/quizzes/start |
| full_prompt.md:L956 | PART 8 | retained exact (master L960) | POST /api/quizzes/:id/submit |
| full_prompt.md:L958 | PART 8 | retained exact (master L962) | GET /api/attempts/:id |
| full_prompt.md:L960 | PART 8 | retained exact (master L964) | GET /api/dashboard/:studentId |
| full_prompt.md:L962 | PART 8 | retained exact (master L966) | Validate all inputs. |
| full_prompt.md:L964 | PART 8 | retained exact (master L968) | Do not trust scores calculated by the browser. |
| full_prompt.md:L966 | PART 8 | retained exact (master L970) | Calculate final scores on the server. |
| full_prompt.md:L968 | PART 8 | retained exact (master L972) | Prevent duplicate submissions. |
| full_prompt.md:L970 | PART 8 | retained exact (master L37) | --- |
| full_prompt.md:L972 | PART 9 | retained exact (master L976) | # PART 9 — PUBLIC DEPLOYMENT PREPARATION |
| full_prompt.md:L974 | PART 9 | retained exact (master L978) | The project will eventually be deployed publicly. |
| full_prompt.md:L976 | PART 9 | retained exact (master L980) | However, DO NOT deploy it now. |
| full_prompt.md:L978 | PART 9 | retained exact (master L982) | First, make it work locally. |
| full_prompt.md:L980 | PART 9 | retained exact (master L984) | Prepare for future deployment to a public VPS. |
| full_prompt.md:L982 | PART 9 | retained exact (master L986) | Requirements: |
| full_prompt.md:L984 | PART 9 | retained exact (master L988) | - Environment-based configuration. |
| full_prompt.md:L985 | PART 9 | retained exact (master L989) | - No hardcoded production secrets. |
| full_prompt.md:L986 | PART 9 | retained exact (master L990) | - Proper database backup strategy. |
| full_prompt.md:L987 | PART 9 | retained exact (master L991) | - Error handling. |
| full_prompt.md:L988 | PART 9 | retained exact (master L992) | - Logging. |
| full_prompt.md:L989 | PART 9 | retained exact (master L993) | - Input validation. |
| full_prompt.md:L990 | PART 9 | retained exact (master L994) | - Rate limiting. |
| full_prompt.md:L991 | PART 9 | retained exact (master L995) | - Secure HTTP headers. |
| full_prompt.md:L992 | PART 9 | retained exact (master L996) | - SQL injection protection. |
| full_prompt.md:L993 | PART 9 | retained exact (master L997) | - XSS protection. |
| full_prompt.md:L994 | PART 9 | retained exact (master L998) | - CSRF protection where relevant. |
| full_prompt.md:L995 | PART 9 | retained exact (master L999) | - CORS configured appropriately. |
| full_prompt.md:L996 | PART 9 | retained exact (master L1000) | - No unnecessary personal information. |
| full_prompt.md:L997 | PART 9 | retained exact (master L1001) | - No public exposure of student records. |
| full_prompt.md:L998 | PART 9 | retained exact (master L1002) | - No public leaderboard displaying children's names by default. |
| full_prompt.md:L1000 | PART 9 | retained exact (master L1004) | Public deployment must support multiple users. |
| full_prompt.md:L1002 | PART 9 | retained exact (master L1006) | SQLite can be used for the initial local MVP. Document its production limitations and the migration path if concurrent community traffic grows. |
| full_prompt.md:L1004 | PART 9 | retained exact (master L1008) | Before public launch, plan: |
| full_prompt.md:L1006 | PART 9 | retained exact (master L1010) | - Secure parent/student account authentication. |
| full_prompt.md:L1007 | PART 9 | retained exact (master L1011) | - Password hashing. |
| full_prompt.md:L1008 | PART 9 | retained exact (master L1012) | - Session security. |
| full_prompt.md:L1009 | PART 9 | retained exact (master L1013) | - Parental consent. |
| full_prompt.md:L1010 | PART 9 | retained exact (master L1014) | - Data deletion requests. |
| full_prompt.md:L1011 | PART 9 | retained exact (master L1015) | - Privacy policy. |
| full_prompt.md:L1012 | PART 9 | retained exact (master L1016) | - Terms of use. |
| full_prompt.md:L1013 | PART 9 | retained exact (master L1017) | - Data retention policy. |
| full_prompt.md:L1014 | PART 9 | retained exact (master L1018) | - Admin access. |
| full_prompt.md:L1015 | PART 9 | retained exact (master L1019) | - Database backup. |
| full_prompt.md:L1016 | PART 9 | retained exact (master L1020) | - HTTPS. |
| full_prompt.md:L1017 | PART 9 | retained exact (master L1021) | - Abuse prevention. |
| full_prompt.md:L1019 | PART 9 | retained exact (master L1023) | Do not claim the application is production-ready for public children’s data merely because it runs locally. |
| full_prompt.md:L1021 | PART 9 | retained exact (master L37) | --- |
| full_prompt.md:L1023 | PART 10 | retained exact (master L1027) | # PART 10 — EDUCATIONAL QUALITY CONTROL |
| full_prompt.md:L1025 | PART 10 | retained exact (master L1029) | Implement a question validation process. |
| full_prompt.md:L1027 | PART 10 | retained exact (master L1031) | Before inserting questions: |
| full_prompt.md:L1029 | PART 10 | retained exact (master L1033) | 1. Check that the question is understandable. |
| full_prompt.md:L1030 | PART 10 | retained exact (master L1034) | 2. Check the correct answer. |
| full_prompt.md:L1031 | PART 10 | retained exact (master L1035) | 3. Check all distractors. |
| full_prompt.md:L1032 | PART 10 | retained exact (master L1036) | 4. Check explanation. |
| full_prompt.md:L1033 | PART 10 | retained exact (master L1037) | 5. Check age appropriateness. |
| full_prompt.md:L1034 | PART 10 | retained exact (master L1038) | 6. Check topic relevance. |
| full_prompt.md:L1035 | PART 10 | retained exact (master L1039) | 7. Check difficulty. |
| full_prompt.md:L1036 | PART 10 | retained exact (master L1040) | 8. Check for duplicates. |
| full_prompt.md:L1037 | PART 10 | retained exact (master L1041) | 9. Check mathematical calculations. |
| full_prompt.md:L1038 | PART 10 | retained exact (master L1042) | 10. Check grammar and spelling. |
| full_prompt.md:L1040 | PART 10 | retained exact (master L1044) | For Mathematics, independently verify calculations. |
| full_prompt.md:L1042 | PART 10 | retained exact (master L1046) | For Science, verify scientific accuracy. |
| full_prompt.md:L1044 | PART 10 | retained exact (master L1048) | For English, ensure grammatical correctness. |
| full_prompt.md:L1046 | PART 10 | retained exact (master L1050) | Avoid questions with multiple plausible answers unless the question is intentionally designed for multiple correct answers. |
| full_prompt.md:L1048 | PART 10 | retained exact (master L1052) | Do not present every question as an official Cambridge examination question. |
| full_prompt.md:L1050 | PART 10 | retained exact (master L37) | --- |
| full_prompt.md:L1052 | PART 11 | retained exact (master L1056) | # PART 11 — SAMPLE QUESTIONS PROVIDED BY PARENT |
| full_prompt.md:L1054 | PART 11 | retained exact (master L1058) | Use these as initial seed examples, after independently checking their answers and wording. |
| full_prompt.md:L1056 | PART 11 | retained exact (master L1060) | ENGLISH: |
| full_prompt.md:L1058 | PART 11 | retained exact (master L1062) | "The students ______ to the science lab when the fire alarm suddenly rang." |
| full_prompt.md:L1060 | PART 11 | retained exact (master L1064) | A. is walking |
| full_prompt.md:L1061 | PART 11 | retained exact (master L1065) | B. are walking |
| full_prompt.md:L1062 | PART 11 | retained exact (master L1066) | C. were walking |
| full_prompt.md:L1063 | PART 11 | retained exact (master L1067) | D. walks |
| full_prompt.md:L1065 | PART 11 | retained exact (master L1069) | Correct answer: C. |
| full_prompt.md:L1067 | PART 11 | retained exact (master L1071) | Explanation: Past continuous tense describes an ongoing action interrupted by another past event. |
| full_prompt.md:L1069 | PART 11 | retained exact (master L1073) | ENGLISH VOCABULARY: |
| full_prompt.md:L1071 | PART 11 | retained exact (master L1075) | "Choose the word that has the closest meaning to INVESTIGATE." |
| full_prompt.md:L1073 | PART 11 | retained exact (master L1077) | A. Ignore |
| full_prompt.md:L1074 | PART 11 | retained exact (master L1078) | B. Examine |
| full_prompt.md:L1075 | PART 11 | retained exact (master L1079) | C. Forget |
| full_prompt.md:L1076 | PART 11 | retained exact (master L1080) | D. Hide |
| full_prompt.md:L1078 | PART 11 | retained exact (master L1082) | Correct answer: B. |
| full_prompt.md:L1080 | PART 11 | retained exact (master L1084) | SCIENCE: |
| full_prompt.md:L1082 | PART 11 | retained exact (master L1086) | "A healthy green plant was placed inside a dark cupboard and watered every day. After one week, its leaves turned yellow. What is the most likely explanation?" |
| full_prompt.md:L1084 | PART 11 | retained exact (master L1088) | A. It did not receive enough water. |
| full_prompt.md:L1085 | PART 11 | retained exact (master L1089) | B. It was attacked by insects. |
| full_prompt.md:L1086 | PART 11 | retained exact (master L1090) | C. It could not photosynthesise normally due to the absence of light. |
| full_prompt.md:L1087 | PART 11 | retained exact (master L1091) | D. The temperature was necessarily too cold. |
| full_prompt.md:L1089 | PART 11 | retained exact (master L1069) | Correct answer: C. |
| full_prompt.md:L1091 | PART 11 | retained exact (master L1084) | SCIENCE: |
| full_prompt.md:L1093 | PART 11 | retained exact (master L1097) | "Which object is most likely to float in water?" |
| full_prompt.md:L1095 | PART 11 | retained exact (master L1099) | A. Iron nail |
| full_prompt.md:L1096 | PART 11 | retained exact (master L1100) | B. 50-cent coin |
| full_prompt.md:L1097 | PART 11 | retained exact (master L1101) | C. Plastic bottle cap |
| full_prompt.md:L1098 | PART 11 | retained exact (master L1102) | D. Glass marble |
| full_prompt.md:L1100 | PART 11 | retained exact (master L1104) | Correct answer: C, assuming a typical sealed/lightweight plastic bottle cap. |
| full_prompt.md:L1102 | PART 11 | retained exact (master L1106) | MATHEMATICS: |
| full_prompt.md:L1104 | PART 11 | retained exact (master L1108) | "A set of notebooks costs RM15. If Ammar buys four sets and receives a 20% discount, how much does he pay?" |
| full_prompt.md:L1106 | PART 11 | retained exact (master L1110) | A. RM60 |
| full_prompt.md:L1107 | PART 11 | retained exact (master L1111) | B. RM48 |
| full_prompt.md:L1108 | PART 11 | retained exact (master L1112) | C. RM12 |
| full_prompt.md:L1109 | PART 11 | retained exact (master L1113) | D. RM50 |
| full_prompt.md:L1111 | PART 11 | retained exact (master L1082) | Correct answer: B. |
| full_prompt.md:L1113 | PART 11 | retained exact (master L1117) | Working: |
| full_prompt.md:L1114 | PART 11 | retained exact (master L1118) | 4 × RM15 = RM60. |
| full_prompt.md:L1115 | PART 11 | retained exact (master L1119) | 20% × RM60 = RM12. |
| full_prompt.md:L1116 | PART 11 | retained exact (master L1120) | RM60 − RM12 = RM48. |
| full_prompt.md:L1118 | PART 11 | retained exact (master L1106) | MATHEMATICS: |
| full_prompt.md:L1120 | PART 11 | retained exact (master L1124) | "A piece of string is 120 cm long. It is divided into three parts in the ratio 1:2:3. What is the length of the longest part?" |
| full_prompt.md:L1122 | PART 11 | retained exact (master L1126) | A. 20 cm |
| full_prompt.md:L1123 | PART 11 | retained exact (master L1127) | B. 40 cm |
| full_prompt.md:L1124 | PART 11 | retained exact (master L1128) | C. 60 cm |
| full_prompt.md:L1125 | PART 11 | retained exact (master L1129) | D. 80 cm |
| full_prompt.md:L1127 | PART 11 | retained exact (master L1069) | Correct answer: C. |
| full_prompt.md:L1129 | PART 11 | retained exact (master L1117) | Working: |
| full_prompt.md:L1130 | PART 11 | retained exact (master L1134) | Total ratio = 1 + 2 + 3 = 6. |
| full_prompt.md:L1131 | PART 11 | retained exact (master L1135) | 120 ÷ 6 = 20. |
| full_prompt.md:L1132 | PART 11 | retained exact (master L1136) | Longest part = 3 × 20 = 60 cm. |
| full_prompt.md:L1134 | PART 11 | retained exact (master L1138) | These are initial examples, NOT sufficient for the complete question bank. |
| full_prompt.md:L1136 | PART 11 | retained exact (master L37) | --- |
| full_prompt.md:L1138 | PART 12 | retained exact (master L1142) | # PART 12 — TESTING REQUIREMENTS |
| full_prompt.md:L1140 | PART 12 | retained exact (master L1144) | Create automated tests. |
| full_prompt.md:L1142 | PART 12 | retained exact (master L1146) | Test: |
| full_prompt.md:L1144 | PART 12 | retained exact (master L1148) | - Server startup. |
| full_prompt.md:L1145 | PART 12 | retained exact (master L1149) | - Database initialization. |
| full_prompt.md:L1146 | PART 12 | retained exact (master L1150) | - Student registration. |
| full_prompt.md:L1147 | PART 12 | retained exact (master L1151) | - Question retrieval. |
| full_prompt.md:L1148 | PART 12 | retained exact (master L1152) | - Quiz creation. |
| full_prompt.md:L1149 | PART 12 | retained exact (master L1153) | - Quiz submission. |
| full_prompt.md:L1150 | PART 12 | retained exact (master L1154) | - Automatic scoring. |
| full_prompt.md:L1151 | PART 12 | retained exact (master L509) | - Incorrect answers. |
| full_prompt.md:L1152 | PART 12 | retained exact (master L510) | - Unanswered questions. |
| full_prompt.md:L1153 | PART 12 | retained exact (master L685) | - Attempt history. |
| full_prompt.md:L1154 | PART 12 | retained exact (master L1158) | - Progress calculation. |
| full_prompt.md:L1155 | PART 12 | retained exact (master L1159) | - Duplicate submission prevention. |
| full_prompt.md:L1156 | PART 12 | retained exact (master L1160) | - Invalid input handling. |
| full_prompt.md:L1157 | PART 12 | retained exact (master L1161) | - Mobile responsiveness. |
| full_prompt.md:L1159 | PART 12 | retained exact (master L1163) | Test the complete workflow: |
| full_prompt.md:L1161 | PART 12 | retained exact (master L1165) | 1. Start application. |
| full_prompt.md:L1162 | PART 12 | retained exact (master L1166) | 2. Create student profile. |
| full_prompt.md:L1163 | PART 12 | retained exact (master L1167) | 3. Select English. |
| full_prompt.md:L1164 | PART 12 | retained exact (master L1168) | 4. Start practice quiz. |
| full_prompt.md:L1165 | PART 12 | retained exact (master L1169) | 5. Answer questions. |
| full_prompt.md:L1166 | PART 12 | retained exact (master L1170) | 6. Submit quiz. |
| full_prompt.md:L1167 | PART 12 | retained exact (master L1171) | 7. Display result. |
| full_prompt.md:L1168 | PART 12 | retained exact (master L1172) | 8. Save attempt. |
| full_prompt.md:L1169 | PART 12 | retained exact (master L1173) | 9. Refresh page. |
| full_prompt.md:L1170 | PART 12 | retained exact (master L1174) | 10. Verify saved attempt. |
| full_prompt.md:L1171 | PART 12 | retained exact (master L1175) | 11. Start Mathematics quiz. |
| full_prompt.md:L1172 | PART 12 | retained exact (master L1176) | 12. View dashboard. |
| full_prompt.md:L1173 | PART 12 | retained exact (master L1177) | 13. Verify subject progress. |
| full_prompt.md:L1175 | PART 12 | retained exact (master L1179) | All critical functionality must work. |
| full_prompt.md:L1177 | PART 12 | retained exact (master L1181) | Do not use fake buttons or non-functional menu items. |
| full_prompt.md:L1179 | PART 12 | retained exact (master L37) | --- |
| full_prompt.md:L1181 | PART 13 | retained exact (master L1185) | # PART 13 — REQUIRED DOCUMENTATION |
| full_prompt.md:L1183 | PART 13 | retained exact (master L574) | Create: |
| full_prompt.md:L1185 | PART 13 | retained exact (master L1189) | 1. README.md |
| full_prompt.md:L1186 | PART 13 | retained exact (master L1190) | 2. docs/PROJECT_OVERVIEW.md |
| full_prompt.md:L1187 | PART 13 | retained exact (master L1191) | 3. docs/RESEARCH_METHODOLOGY.md |
| full_prompt.md:L1188 | PART 13 | retained exact (master L1192) | 4. docs/architecture/SYSTEM_ARCHITECTURE.md |
| full_prompt.md:L1189 | PART 13 | retained exact (master L1193) | 5. docs/architecture/DATABASE_SCHEMA.md |
| full_prompt.md:L1190 | PART 13 | retained exact (master L1194) | 6. docs/architecture/API_REFERENCE.md |
| full_prompt.md:L1191 | PART 13 | retained exact (master L1195) | 7. docs/QUESTION_BANK_GUIDELINES.md |
| full_prompt.md:L1192 | PART 13 | retained exact (master L1196) | 8. docs/PRIVACY_AND_SECURITY.md |
| full_prompt.md:L1193 | PART 13 | retained exact (master L1197) | 9. docs/LOCAL_DEVELOPMENT.md |
| full_prompt.md:L1194 | PART 13 | retained exact (master L1198) | 10. docs/FUTURE_DEPLOYMENT.md |
| full_prompt.md:L1196 | PART 13 | retained exact (master L1200) | README must include: |
| full_prompt.md:L1198 | PART 13 | retained exact (master L1202) | - Project overview. |
| full_prompt.md:L1199 | PART 13 | retained exact (master L1203) | - Features. |
| full_prompt.md:L1200 | PART 13 | retained exact (master L1204) | - Requirements. |
| full_prompt.md:L1201 | PART 13 | retained exact (master L1205) | - Installation. |
| full_prompt.md:L1202 | PART 13 | retained exact (master L1206) | - How to run locally. |
| full_prompt.md:L1203 | PART 13 | retained exact (master L1207) | - How to reset database. |
| full_prompt.md:L1204 | PART 13 | retained exact (master L1208) | - How to add questions. |
| full_prompt.md:L1205 | PART 13 | retained exact (master L1209) | - How to run tests. |
| full_prompt.md:L1207 | PART 13 | retained exact (master L1211) | The local development command should be straightforward: |
| full_prompt.md:L1209 | PART 13 | retained exact (master L1213) | ```powershell |
| full_prompt.md:L1210 | PART 13 | retained exact (master L1214) | cd D:\IGCSE |
| full_prompt.md:L1211 | PART 13 | retained exact (master L1215) | npm install |
| full_prompt.md:L1212 | PART 13 | retained exact (master L1216) | npm run dev |
| full_prompt.md:L1213 | PART 13 | retained exact (master L896) | ``` |
| full_prompt.md:L1215 | PART 13 | retained exact (master L1219) | Open: |
| full_prompt.md:L1217 | PART 13 | retained exact (master L1221) | http://localhost:3000 |
| full_prompt.md:L1219 | PART 13 | retained exact (master L37) | --- |
| full_prompt.md:L1221 | PART 14 | retained exact (master L1225) | # PART 14 — DEVELOPMENT WORKFLOW |
| full_prompt.md:L1223 | PART 14 | retained exact (master L1227) | Follow these stages. |
| full_prompt.md:L1225 | PART 14 | retained exact (master L1229) | Do not skip stages. |
| full_prompt.md:L1227 | PART 14 | retained exact (master L1231) | ## PHASE 1 — Research |
| full_prompt.md:L1229 | PART 14 | retained exact (master L1233) | - Inspect project directory. |
| full_prompt.md:L1230 | PART 14 | retained exact (master L1234) | - Check available Node.js and npm versions. |
| full_prompt.md:L1231 | PART 14 | retained exact (master L1235) | - Research official Cambridge and MARA resources. |
| full_prompt.md:L1232 | PART 14 | retained exact (master L1236) | - Produce research documents. |
| full_prompt.md:L1233 | PART 14 | retained exact (master L1237) | - Create a verified facts list. |
| full_prompt.md:L1234 | PART 14 | retained exact (master L1238) | - Identify missing or unverified information. |
| full_prompt.md:L1236 | PART 14 | retained exact (master L1240) | ## PHASE 2 — Planning |
| full_prompt.md:L1238 | PART 14 | retained exact (master L1242) | - Design system architecture. |
| full_prompt.md:L1239 | PART 14 | retained exact (master L1243) | - Design database schema. |
| full_prompt.md:L1240 | PART 14 | retained exact (master L1244) | - Design API. |
| full_prompt.md:L1241 | PART 14 | retained exact (master L1245) | - Plan question bank. |
| full_prompt.md:L1242 | PART 14 | retained exact (master L1246) | - Design user journeys. |
| full_prompt.md:L1243 | PART 14 | retained exact (master L1247) | - Establish UI design system. |
| full_prompt.md:L1245 | PART 14 | retained exact (master L1249) | ## PHASE 3 — Foundation |
| full_prompt.md:L1247 | PART 14 | retained exact (master L1251) | - Initialise Node project. |
| full_prompt.md:L1248 | PART 14 | retained exact (master L1252) | - Install dependencies. |
| full_prompt.md:L1249 | PART 14 | retained exact (master L1253) | - Configure Express. |
| full_prompt.md:L1250 | PART 14 | retained exact (master L1254) | - Initialise SQLite. |
| full_prompt.md:L1251 | PART 14 | retained exact (master L1255) | - Create database schema. |
| full_prompt.md:L1252 | PART 14 | retained exact (master L1256) | - Build API. |
| full_prompt.md:L1253 | PART 14 | retained exact (master L1257) | - Add sample seed data. |
| full_prompt.md:L1255 | PART 14 | retained exact (master L1259) | ## PHASE 4 — Frontend |
| full_prompt.md:L1257 | PART 14 | retained exact (master L1261) | Build the complete SPA: |
| full_prompt.md:L1259 | PART 14 | retained exact (master L621) | - Home. |
| full_prompt.md:L1260 | PART 14 | retained exact (master L639) | - Student profile. |
| full_prompt.md:L1261 | PART 14 | retained exact (master L1265) | - Quiz engine. |
| full_prompt.md:L1262 | PART 14 | retained exact (master L1266) | - Question bank. |
| full_prompt.md:L1263 | PART 14 | retained exact (master L1267) | - Results. |
| full_prompt.md:L1264 | PART 14 | retained exact (master L1268) | - Progress dashboard. |
| full_prompt.md:L1265 | PART 14 | retained exact (master L1269) | - Student guide. |
| full_prompt.md:L1266 | PART 14 | retained exact (master L1270) | - Parent guide. |
| full_prompt.md:L1267 | PART 14 | retained exact (master L1271) | - FAQ. |
| full_prompt.md:L1268 | PART 14 | retained exact (master L1272) | - Glossary. |
| full_prompt.md:L1270 | PART 14 | retained exact (master L1274) | ## PHASE 5 — Question Bank |
| full_prompt.md:L1272 | PART 14 | retained exact (master L1276) | - Generate original questions. |
| full_prompt.md:L1273 | PART 14 | retained exact (master L1277) | - Organise by subject. |
| full_prompt.md:L1274 | PART 14 | retained exact (master L1278) | - Organise by topic. |
| full_prompt.md:L1275 | PART 14 | retained exact (master L1279) | - Set difficulty. |
| full_prompt.md:L1276 | PART 14 | retained exact (master L1280) | - Verify answers. |
| full_prompt.md:L1277 | PART 14 | retained exact (master L1281) | - Import into SQLite. |
| full_prompt.md:L1278 | PART 14 | retained exact (master L1282) | - Validate total question count. |
| full_prompt.md:L1280 | PART 14 | retained exact (master L1284) | ## PHASE 6 — Testing |
| full_prompt.md:L1282 | PART 14 | retained exact (master L1286) | - Run automated tests. |
| full_prompt.md:L1283 | PART 14 | retained exact (master L1287) | - Test manually. |
| full_prompt.md:L1284 | PART 14 | retained exact (master L1288) | - Fix bugs. |
| full_prompt.md:L1285 | PART 14 | retained exact (master L1289) | - Check responsive design. |
| full_prompt.md:L1286 | PART 14 | retained exact (master L1290) | - Check database persistence. |
| full_prompt.md:L1288 | PART 14 | retained exact (master L1292) | ## PHASE 7 — Finalisation |
| full_prompt.md:L1290 | PART 14 | retained exact (master L1294) | - Complete documentation. |
| full_prompt.md:L1291 | PART 14 | retained exact (master L1295) | - Verify local startup. |
| full_prompt.md:L1292 | PART 14 | retained exact (master L1296) | - Provide project summary. |
| full_prompt.md:L1293 | PART 14 | retained exact (master L1297) | - List completed features. |
| full_prompt.md:L1294 | PART 14 | retained exact (master L1298) | - List known limitations. |
| full_prompt.md:L1295 | PART 14 | retained exact (master L1299) | - List future deployment steps. |
| full_prompt.md:L1297 | PART 14 | retained exact (master L37) | --- |
| full_prompt.md:L1299 | PART 15 | retained exact (master L1303) | # PART 15 — IMPORTANT EXECUTION RULES |
| full_prompt.md:L1301 | PART 15 | activation clarified | 1. Do not just give me a development plan. Actually create the project files and implement the application. |
| full_prompt.md:L1302 | PART 15 | retained exact (master L1306) | 2. Do not stop after creating an HTML mockup. |
| full_prompt.md:L1303 | PART 15 | retained exact (master L1307) | 3. Do not use fake data for research findings. |
| full_prompt.md:L1304 | PART 15 | retained exact (master L1308) | 4. Do not fabricate official admission information. |
| full_prompt.md:L1305 | PART 15 | retained exact (master L1309) | 5. Do not copy copyrighted Cambridge examination papers. |
| full_prompt.md:L1306 | PART 15 | retained exact (master L1310) | 6. Do not leave non-functional buttons. |
| full_prompt.md:L1307 | PART 15 | retained exact (master L1311) | 7. Do not skip testing. |
| full_prompt.md:L1308 | PART 15 | retained exact (master L1312) | 8. Do not deploy publicly. |
| full_prompt.md:L1309 | PART 15 | retained exact (master L1313) | 9. Do not overwrite existing files without inspecting them first. |
| full_prompt.md:L1310 | PART 15 | retained exact (master L1314) | 10. Keep the application maintainable and modular. |
| full_prompt.md:L1311 | PART 15 | retained exact (master L1315) | 11. Prioritise educational accuracy over the number of questions. |
| full_prompt.md:L1312 | PART 15 | retained exact (master L1316) | 12. If a research source is unavailable, document the limitation rather than inventing its content. |
| full_prompt.md:L1313 | PART 15 | retained exact (master L1317) | 13. Use current official information as of the research date. |
| full_prompt.md:L1314 | PART 15 | retained exact (master L1318) | 14. Keep all user-facing explanations simple and suitable for Malaysian parents and primary school students. |
| full_prompt.md:L1315 | PART 15 | retained exact (master L1319) | 15. The main quiz language should be English, with optional Malay explanations. |
| full_prompt.md:L1316 | PART 15 | retained exact (master L1320) | 16. Parent information should primarily use Bahasa Melayu with English terminology where useful. |
| full_prompt.md:L1317 | PART 15 | retained exact (master L1321) | 17. Ensure student data is private. |
| full_prompt.md:L1318 | PART 15 | retained exact (master L1322) | 18. Every completed quiz attempt must be saved to SQLite. |
| full_prompt.md:L1319 | PART 15 | retained exact (master L1323) | 19. Never claim that this is an official MARA or Cambridge platform. |
| full_prompt.md:L1320 | PART 15 | retained exact (master L1324) | 20. Build a genuinely useful application, not just a demonstration. |
| full_prompt.md:L1322 | PART 15 | retained exact (master L37) | --- |
| full_prompt.md:L1324 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1328) | # FINAL ACCEPTANCE CRITERIA |
| full_prompt.md:L1326 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1330) | The project is considered complete for the first local MVP only when: |
| full_prompt.md:L1328 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1332) | - [ ] Research documents are available. |
| full_prompt.md:L1329 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1333) | - [ ] Official source references are documented. |
| full_prompt.md:L1330 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1334) | - [ ] MRSM admission information is properly qualified and verified. |
| full_prompt.md:L1331 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1335) | - [ ] Cambridge IGCSE information is properly documented. |
| full_prompt.md:L1332 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1336) | - [ ] Original question bank contains at least 300 validated questions, or a smaller number is explicitly reported with reasons if quality validation prevents reaching the target. |
| full_prompt.md:L1333 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1337) | - [ ] English quiz works. |
| full_prompt.md:L1334 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1338) | - [ ] Mathematics quiz works. |
| full_prompt.md:L1335 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1339) | - [ ] Science quiz works. |
| full_prompt.md:L1336 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1340) | - [ ] Practice mode works. |
| full_prompt.md:L1337 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1341) | - [ ] Examination mode works. |
| full_prompt.md:L1338 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1342) | - [ ] Challenge mode works. |
| full_prompt.md:L1339 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1343) | - [ ] Student profiles work. |
| full_prompt.md:L1340 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1344) | - [ ] SQLite persistence works. |
| full_prompt.md:L1341 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1345) | - [ ] Attempt history works. |
| full_prompt.md:L1342 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1346) | - [ ] Dashboard works. |
| full_prompt.md:L1343 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1347) | - [ ] Parent guide works. |
| full_prompt.md:L1344 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1348) | - [ ] Student guide works. |
| full_prompt.md:L1345 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1349) | - [ ] Glossary works. |
| full_prompt.md:L1346 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1350) | - [ ] Mobile layout works. |
| full_prompt.md:L1347 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1351) | - [ ] Automated tests pass. |
| full_prompt.md:L1348 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1352) | - [ ] Local server starts successfully. |
| full_prompt.md:L1349 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1353) | - [ ] Documentation is complete. |
| full_prompt.md:L1350 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1354) | - [ ] No public deployment has occurred. |
| full_prompt.md:L1352 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1356) | At the end, report: |
| full_prompt.md:L1354 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1358) | 1. Research findings. |
| full_prompt.md:L1355 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1359) | 2. Important verified MRSM admission facts. |
| full_prompt.md:L1356 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1360) | 3. Important Cambridge IGCSE findings. |
| full_prompt.md:L1357 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1361) | 4. Total questions created by subject. |
| full_prompt.md:L1358 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1362) | 5. Features implemented. |
| full_prompt.md:L1359 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1363) | 6. Database structure. |
| full_prompt.md:L1360 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1364) | 7. Tests performed and results. |
| full_prompt.md:L1361 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1365) | 8. How to start the application. |
| full_prompt.md:L1362 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1366) | 9. Local URL. |
| full_prompt.md:L1363 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1367) | 10. Known limitations. |
| full_prompt.md:L1364 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1368) | 11. Recommended next development phase. |
| full_prompt.md:L1366 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | activation clarified | **Start with PHASE 1 — RESEARCH. Then proceed through all phases until the local MVP is working.** |
| full_prompt.md:L1368 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1372) | Do not ask me for approval after every phase. Make sensible engineering decisions, document them and continue. |
| full_prompt.md:L1370 | Original introduction / FINAL ACCEPTANCE CRITERIA; Parts 16 and 22 | retained exact (master L1374) | If a major blocker genuinely prevents further work, explain it clearly and complete all other independent work first. |

### Input: Agent.md

| Source unit | Section / destination | Disposition | Input text |
|---|---|---|---|
| Agent.md:L1 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | # Agent.md — IGCSE MRSM Preparation Hub |
| Agent.md:L3 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | ## 1. Role |
| Agent.md:L5 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | You are the autonomous engineering agent for **IGCSE MRSM Preparation Hub**, a local-first educational practice platform for Malaysian Year 6 pupils, MRSM Form 1 applicants, students, and parents. |
| Agent.md:L7 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | Operate as a senior full-stack engineer, educational research assistant, assessment designer, UX designer, QA engineer, and security reviewer. |
| Agent.md:L9 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | Your job is to deliver a working, maintainable application—not merely plans, mockups, or static HTML. |
| Agent.md:L11 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | ## 2. Project context |
| Agent.md:L13 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Project directory: `D:\IGCSE` |
| Agent.md:L14 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Initial runtime: local Windows development |
| Agent.md:L15 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Initial application URL: `http://localhost:3000` |
| Agent.md:L16 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Initial persistence: SQLite |
| Agent.md:L17 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Frontend: single-page application (SPA), with modular JavaScript/CSS |
| Agent.md:L18 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Backend: Node.js + Express REST API |
| Agent.md:L19 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Initial audience: Malaysian Year 6 pupils preparing for MRSM Form 1 / IGCSE-related selection |
| Agent.md:L20 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Initial named test learner: Ammar (use only as local seed/demo data when explicitly needed; do not hardcode personal details into the product) |
| Agent.md:L21 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - User-provided target assessment date: 18 November 2026. Treat this as unverified context, not an official date. |
| Agent.md:L23 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | ## 3. Core operating principles |
| Agent.md:L25 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 1. Research before asserting facts about MARA, MRSM, UKKM, Cambridge, admissions, or examinations. |
| Agent.md:L26 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 2. Prefer primary official sources: MARA, MRSM, Cambridge International, and relevant Malaysian education authorities. |
| Agent.md:L27 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 3. Cite and date research sources in documentation and, where appropriate, in the application. |
| Agent.md:L28 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 4. Distinguish verified facts, reasonable educational guidance, and unverified information. |
| Agent.md:L29 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 5. Never invent admission requirements, examination dates, paper formats, syllabus codes, or programme arrangements. |
| Agent.md:L30 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 6. Never describe this project as an official MARA, MRSM, or Cambridge product. |
| Agent.md:L31 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 7. Create original practice questions. Do not bulk-copy copyrighted Cambridge past papers, specimen papers, mark schemes, or third-party question banks. |
| Agent.md:L32 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 8. Do not claim generated questions are official Cambridge questions. |
| Agent.md:L33 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 9. Validate every answer, distractor, explanation, calculation, and question difficulty. |
| Agent.md:L34 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 10. Prioritise a reliable, accessible, child-friendly experience over decorative complexity. |
| Agent.md:L35 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 11. Persist completed quiz attempts in the database; do not rely on browser storage as the authoritative record. |
| Agent.md:L36 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 12. Calculate scores on the server. Never trust client-submitted scores. |
| Agent.md:L37 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 13. Protect children's personal information. Collect the minimum data required. |
| Agent.md:L38 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 14. Do not deploy publicly unless the user explicitly requests deployment and the public-launch security/privacy work is complete. |
| Agent.md:L40 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | ## 4. Research workflow |
| Agent.md:L42 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | Before implementing educational claims: |
| Agent.md:L44 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Inspect existing project files and environment. |
| Agent.md:L45 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Research current official Cambridge IGCSE information: |
| Agent.md:L46 | Parts 1–2, 8–9, 13–22 | integrated / supporting view |   https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/ |
| Agent.md:L47 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Research current official MARA/MRSM admission and programme information. |
| Agent.md:L48 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Investigate UKKM and any separate programme-specific selection assessment without conflating them. |
| Agent.md:L49 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Record the page title, organisation, URL, access date, publication/update date if shown, key finding, and verification status. |
| Agent.md:L50 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Save research in `docs/research/`. |
| Agent.md:L51 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - If a source is inaccessible, record that limitation and continue with other reliable sources. |
| Agent.md:L53 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | Do not imply that the entrance assessment necessarily consists only of English, Mathematics, and Science unless authoritative evidence confirms it. |
| Agent.md:L55 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | ## 5. Implementation workflow |
| Agent.md:L57 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | Follow the project phases in `Task.md`: |
| Agent.md:L59 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 1. Inspect and research. |
| Agent.md:L60 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 2. Plan architecture and data. |
| Agent.md:L61 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 3. Build backend and database. |
| Agent.md:L62 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 4. Build SPA and responsive UI. |
| Agent.md:L63 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 5. Create and validate original question bank. |
| Agent.md:L64 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 6. Implement quiz modes, profiles, history, and analytics. |
| Agent.md:L65 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 7. Test end-to-end. |
| Agent.md:L66 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | 8. Document and prepare for future deployment. |
| Agent.md:L68 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | Do not stop after producing a static prototype. Continue until the local MVP acceptance criteria are met, unless a genuine blocker prevents progress. |
| Agent.md:L70 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | ## 6. Engineering standards |
| Agent.md:L72 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Use modular, readable code. |
| Agent.md:L73 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Keep dependencies lean and maintained. |
| Agent.md:L74 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Validate all API input on the server. |
| Agent.md:L75 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Use parameterised SQL queries. |
| Agent.md:L76 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Handle errors consistently. |
| Agent.md:L77 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Use environment variables for configuration and secrets. |
| Agent.md:L78 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Keep secrets, local databases, logs, and private data out of Git. |
| Agent.md:L79 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Add database migrations or a versioned schema strategy. |
| Agent.md:L80 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Add indexes and foreign-key constraints where appropriate. |
| Agent.md:L81 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Make quiz submission idempotent or otherwise prevent duplicate scoring. |
| Agent.md:L82 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Add automated tests for critical business logic and API flows. |
| Agent.md:L83 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Do not leave dead links, fake buttons, placeholder controls, or non-functional tabs. |
| Agent.md:L84 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Avoid unnecessary frameworks if vanilla JavaScript is sufficient. |
| Agent.md:L86 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | ## 7. User experience standards |
| Agent.md:L88 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Main practice language: English. |
| Agent.md:L89 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Parent guidance: Bahasa Melayu, with English terms explained where useful. |
| Agent.md:L90 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Student explanations: simple English, with optional Malay support. |
| Agent.md:L91 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Design for desktop, tablet, and mobile. |
| Agent.md:L92 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Use keyboard-accessible controls, visible focus states, semantic HTML, and adequate contrast. |
| Agent.md:L93 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Provide clear feedback without shaming students. |
| Agent.md:L94 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Show progress as practice indicators, not official grades or admission predictions. |
| Agent.md:L96 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | ## 8. Required deliverables |
| Agent.md:L98 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | Maintain these documents: |
| Agent.md:L100 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - `Agent.md` |
| Agent.md:L101 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - `Architecture.md` |
| Agent.md:L102 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - `Design.md` |
| Agent.md:L103 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - `full_prompt.md` |
| Agent.md:L104 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - `Memory.md` |
| Agent.md:L105 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - `PRD.md` |
| Agent.md:L106 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - `Rules.md` |
| Agent.md:L107 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - `Task.md` |
| Agent.md:L109 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | Also create implementation documentation under `docs/`, including research, architecture, API, database, privacy/security, local development, and deployment preparation. |
| Agent.md:L111 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | ## 9. Reporting |
| Agent.md:L113 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | At the end of a substantial work session, update `Memory.md` with: |
| Agent.md:L115 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Current project state |
| Agent.md:L116 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Completed work |
| Agent.md:L117 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Important technical decisions |
| Agent.md:L118 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Research verified and still outstanding |
| Agent.md:L119 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Tests run and results |
| Agent.md:L120 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Known bugs or limitations |
| Agent.md:L121 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | - Exact next steps |
| Agent.md:L123 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | Do not store secrets, passwords, tokens, private student records, or sensitive personal information in `Memory.md`. |
| Agent.md:L125 | Parts 1–2, 8–9, 13–22 | integrated / supporting view | When reporting completion, state what was actually implemented and tested. Never claim a feature or test passed unless it did. |

### Input: Architecture.md

| Source unit | Section / destination | Disposition | Input text |
|---|---|---|---|
| Architecture.md:L1 | Parts 8, 19 and 20 | integrated / supporting view | # Architecture — IGCSE MRSM Preparation Hub |
| Architecture.md:L3 | Parts 8, 19 and 20 | integrated / supporting view | ## 1. Architecture goals |
| Architecture.md:L5 | Parts 8, 19 and 20 | integrated / supporting view | Build a local-first, public-deployment-aware educational platform with: |
| Architecture.md:L7 | Parts 8, 19 and 20 | integrated / supporting view | - A single-page browser application |
| Architecture.md:L8 | Parts 8, 19 and 20 | integrated / supporting view | - A modular Express backend |
| Architecture.md:L9 | Parts 8, 19 and 20 | integrated / supporting view | - SQLite persistence for the local MVP |
| Architecture.md:L10 | Parts 8, 19 and 20 | integrated / supporting view | - Server-authoritative quiz scoring |
| Architecture.md:L11 | Parts 8, 19 and 20 | integrated / supporting view | - Student profiles and private attempt history |
| Architecture.md:L12 | Parts 8, 19 and 20 | integrated / supporting view | - An extensible, validated question bank |
| Architecture.md:L13 | Parts 8, 19 and 20 | integrated / supporting view | - A clear migration path to a production database and secure authentication |
| Architecture.md:L15 | Parts 8, 19 and 20 | integrated / supporting view | The first release is for local testing. Public deployment is explicitly out of scope until security, privacy, consent, operations, and hosting are reviewed. |
| Architecture.md:L17 | Parts 8, 19 and 20 | integrated / supporting view | ## 2. Proposed technology |
| Architecture.md:L19 | Parts 8, 19 and 20 | integrated / supporting view | \| Layer \| Initial choice \| Notes \| |
| Architecture.md:L20 | Parts 8, 19 and 20 | retained exact (master L1418) | \|---\|---\|---\| |
| Architecture.md:L21 | Parts 8, 19 and 20 | integrated / supporting view | \| Runtime \| Node.js LTS \| Confirm installed version before setup \| |
| Architecture.md:L22 | Parts 8, 19 and 20 | integrated / supporting view | \| Server \| Express \| REST API and static asset hosting \| |
| Architecture.md:L23 | Parts 8, 19 and 20 | integrated / supporting view | \| Frontend \| HTML5, CSS3, modular JavaScript \| Single-page application \| |
| Architecture.md:L24 | Parts 8, 19 and 20 | integrated / supporting view | \| Database \| SQLite \| Appropriate for local MVP and modest single-instance use \| |
| Architecture.md:L25 | Parts 8, 19 and 20 | integrated / supporting view | \| Charts \| Chart.js or equivalent \| Dashboard visualisations \| |
| Architecture.md:L26 | Parts 8, 19 and 20 | integrated / supporting view | \| Icons \| Lucide \| Consistent icon system \| |
| Architecture.md:L27 | Parts 8, 19 and 20 | integrated / supporting view | \| Testing \| Node test runner or Vitest + Supertest \| Choose and document one coherent setup \| |
| Architecture.md:L28 | Parts 8, 19 and 20 | integrated / supporting view | \| Validation \| Zod, Joi, or equivalent \| Server-side request validation \| |
| Architecture.md:L30 | Parts 8, 19 and 20 | integrated / supporting view | Avoid unnecessary complexity. Do not introduce a frontend framework unless it materially improves maintainability. |
| Architecture.md:L32 | Parts 8, 19 and 20 | integrated / supporting view | ## 3. High-level system |
| Architecture.md:L34 | Parts 8, 19 and 20 | retained exact (master L846) | ```text |
| Architecture.md:L35 | Parts 8, 19 and 20 | integrated / supporting view | Browser |
| Architecture.md:L36 | Parts 8, 19 and 20 | integrated / supporting view |   \| |
| Architecture.md:L37 | Parts 8, 19 and 20 | integrated / supporting view |   \| HTTPS in future / HTTP localhost during development |
| Architecture.md:L38 | Parts 8, 19 and 20 | integrated / supporting view |   v |
| Architecture.md:L39 | Parts 8, 19 and 20 | integrated / supporting view | Express application |
| Architecture.md:L40 | Parts 8, 19 and 20 | integrated / supporting view |   \|-- Static SPA (public/) |
| Architecture.md:L41 | Parts 8, 19 and 20 | integrated / supporting view |   \|-- REST API |
| Architecture.md:L42 | Parts 8, 19 and 20 | integrated / supporting view |   \|    \|-- Students |
| Architecture.md:L43 | Parts 8, 19 and 20 | integrated / supporting view |   \|    \|-- Subjects and topics |
| Architecture.md:L44 | Parts 8, 19 and 20 | integrated / supporting view |   \|    \|-- Questions |
| Architecture.md:L45 | Parts 8, 19 and 20 | integrated / supporting view |   \|    \|-- Quiz sessions |
| Architecture.md:L46 | Parts 8, 19 and 20 | integrated / supporting view |   \|    \|-- Attempts and answers |
| Architecture.md:L47 | Parts 8, 19 and 20 | integrated / supporting view |   \|    \|-- Progress and dashboard |
| Architecture.md:L48 | Parts 8, 19 and 20 | integrated / supporting view |   \|-- Services |
| Architecture.md:L49 | Parts 8, 19 and 20 | integrated / supporting view |   \|    \|-- Quiz generation |
| Architecture.md:L50 | Parts 8, 19 and 20 | integrated / supporting view |   \|    \|-- Answer validation and scoring |
| Architecture.md:L51 | Parts 8, 19 and 20 | integrated / supporting view |   \|    \|-- Analytics |
| Architecture.md:L52 | Parts 8, 19 and 20 | integrated / supporting view |   v |
| Architecture.md:L53 | Parts 8, 19 and 20 | integrated / supporting view | SQLite database (data/) |
| Architecture.md:L54 | Parts 8, 19 and 20 | retained exact (master L896) | ``` |
| Architecture.md:L56 | Parts 8, 19 and 20 | integrated / supporting view | ## 4. Suggested repository layout |
| Architecture.md:L58 | Parts 8, 19 and 20 | retained exact (master L846) | ```text |
| Architecture.md:L59 | Parts 8, 19 and 20 | retained exact (master L847) | D:\IGCSE |
| Architecture.md:L60 | Parts 8, 19 and 20 | retained exact (master L849) | ├── server.js |
| Architecture.md:L61 | Parts 8, 19 and 20 | retained exact (master L850) | ├── package.json |
| Architecture.md:L62 | Parts 8, 19 and 20 | retained exact (master L851) | ├── .env.example |
| Architecture.md:L63 | Parts 8, 19 and 20 | retained exact (master L852) | ├── .gitignore |
| Architecture.md:L64 | Parts 8, 19 and 20 | retained exact (master L853) | ├── README.md |
| Architecture.md:L65 | Parts 8, 19 and 20 | integrated / supporting view | ├── Agent.md |
| Architecture.md:L66 | Parts 8, 19 and 20 | integrated / supporting view | ├── Architecture.md |
| Architecture.md:L67 | Parts 8, 19 and 20 | integrated / supporting view | ├── Design.md |
| Architecture.md:L68 | Parts 8, 19 and 20 | integrated / supporting view | ├── full_prompt.md |
| Architecture.md:L69 | Parts 8, 19 and 20 | integrated / supporting view | ├── Memory.md |
| Architecture.md:L70 | Parts 8, 19 and 20 | integrated / supporting view | ├── PRD.md |
| Architecture.md:L71 | Parts 8, 19 and 20 | integrated / supporting view | ├── Rules.md |
| Architecture.md:L72 | Parts 8, 19 and 20 | integrated / supporting view | ├── Task.md |
| Architecture.md:L73 | Parts 8, 19 and 20 | retained exact (master L855) | ├── src/ |
| Architecture.md:L74 | Parts 8, 19 and 20 | retained exact (master L856) | │   ├── config/ |
| Architecture.md:L75 | Parts 8, 19 and 20 | retained exact (master L857) | │   │   └── database.js |
| Architecture.md:L76 | Parts 8, 19 and 20 | retained exact (master L859) | │   ├── routes/ |
| Architecture.md:L77 | Parts 8, 19 and 20 | integrated / supporting view | │   │   ├── health.js |
| Architecture.md:L78 | Parts 8, 19 and 20 | retained exact (master L860) | │   │   ├── students.js |
| Architecture.md:L79 | Parts 8, 19 and 20 | integrated / supporting view | │   │   ├── subjects.js |
| Architecture.md:L80 | Parts 8, 19 and 20 | integrated / supporting view | │   │   ├── topics.js |
| Architecture.md:L81 | Parts 8, 19 and 20 | retained exact (master L861) | │   │   ├── questions.js |
| Architecture.md:L82 | Parts 8, 19 and 20 | retained exact (master L862) | │   │   ├── quizzes.js |
| Architecture.md:L83 | Parts 8, 19 and 20 | retained exact (master L863) | │   │   ├── attempts.js |
| Architecture.md:L84 | Parts 8, 19 and 20 | retained exact (master L864) | │   │   └── dashboard.js |
| Architecture.md:L85 | Parts 8, 19 and 20 | retained exact (master L866) | │   ├── services/ |
| Architecture.md:L86 | Parts 8, 19 and 20 | retained exact (master L867) | │   │   ├── quizService.js |
| Architecture.md:L87 | Parts 8, 19 and 20 | retained exact (master L868) | │   │   ├── scoringService.js |
| Architecture.md:L88 | Parts 8, 19 and 20 | retained exact (master L869) | │   │   └── analyticsService.js |
| Architecture.md:L89 | Parts 8, 19 and 20 | retained exact (master L871) | │   ├── middleware/ |
| Architecture.md:L90 | Parts 8, 19 and 20 | integrated / supporting view | │   │   ├── errorHandler.js |
| Architecture.md:L91 | Parts 8, 19 and 20 | integrated / supporting view | │   │   ├── validateRequest.js |
| Architecture.md:L92 | Parts 8, 19 and 20 | retained exact (master L872) | │   │   └── security.js |
| Architecture.md:L93 | Parts 8, 19 and 20 | retained exact (master L874) | │   └── database/ |
| Architecture.md:L94 | Parts 8, 19 and 20 | integrated / supporting view | │       ├── migrations/ |
| Architecture.md:L95 | Parts 8, 19 and 20 | integrated / supporting view | │       └── seed/ |
| Architecture.md:L96 | Parts 8, 19 and 20 | retained exact (master L878) | ├── public/ |
| Architecture.md:L97 | Parts 8, 19 and 20 | retained exact (master L879) | │   ├── index.html |
| Architecture.md:L98 | Parts 8, 19 and 20 | integrated / supporting view | │   └── assets/ |
| Architecture.md:L99 | Parts 8, 19 and 20 | integrated / supporting view | │       ├── css/ |
| Architecture.md:L100 | Parts 8, 19 and 20 | integrated / supporting view | │       ├── js/ |
| Architecture.md:L101 | Parts 8, 19 and 20 | integrated / supporting view | │       └── images/ |
| Architecture.md:L102 | Parts 8, 19 and 20 | retained exact (master L885) | ├── data/ |
| Architecture.md:L103 | Parts 8, 19 and 20 | retained exact (master L886) | │   └── .gitkeep |
| Architecture.md:L104 | Parts 8, 19 and 20 | retained exact (master L888) | ├── docs/ |
| Architecture.md:L105 | Parts 8, 19 and 20 | retained exact (master L889) | │   ├── research/ |
| Architecture.md:L106 | Parts 8, 19 and 20 | retained exact (master L890) | │   ├── architecture/ |
| Architecture.md:L107 | Parts 8, 19 and 20 | retained exact (master L891) | │   └── user-guide/ |
| Architecture.md:L108 | Parts 8, 19 and 20 | integrated / supporting view | ├── scripts/ |
| Architecture.md:L109 | Parts 8, 19 and 20 | integrated / supporting view | └── tests/ |
| Architecture.md:L110 | Parts 8, 19 and 20 | retained exact (master L896) | ``` |
| Architecture.md:L112 | Parts 8, 19 and 20 | integrated / supporting view | The exact structure may evolve, but keep responsibilities separated and document deviations. |
| Architecture.md:L114 | Parts 8, 19 and 20 | integrated / supporting view | ## 5. Data model |
| Architecture.md:L116 | Parts 8, 19 and 20 | integrated / supporting view | Use relational tables with foreign keys, timestamps, constraints, and indexes. |
| Architecture.md:L118 | Parts 8, 19 and 20 | integrated / supporting view | ### Core entities |
| Architecture.md:L120 | Parts 8, 19 and 20 | integrated / supporting view | **students** |
| Architecture.md:L121 | Parts 8, 19 and 20 | integrated / supporting view | - `id` — primary key |
| Architecture.md:L122 | Parts 8, 19 and 20 | integrated / supporting view | - `display_name` — required |
| Architecture.md:L123 | Parts 8, 19 and 20 | integrated / supporting view | - `year_level` — optional |
| Architecture.md:L124 | Parts 8, 19 and 20 | integrated / supporting view | - `school_name` — optional; avoid collecting unless needed |
| Architecture.md:L125 | Parts 8, 19 and 20 | integrated / supporting view | - `created_at`, `updated_at` |
| Architecture.md:L127 | Parts 8, 19 and 20 | integrated / supporting view | **subjects** |
| Architecture.md:L128 | Parts 8, 19 and 20 | integrated / supporting view | - `id`, `slug`, `name`, `description`, `sort_order` |
| Architecture.md:L130 | Parts 8, 19 and 20 | integrated / supporting view | **topics** |
| Architecture.md:L131 | Parts 8, 19 and 20 | integrated / supporting view | - `id`, `subject_id`, `parent_topic_id` (optional), `name`, `slug`, `description` |
| Architecture.md:L133 | Parts 8, 19 and 20 | integrated / supporting view | **questions** |
| Architecture.md:L134 | Parts 8, 19 and 20 | integrated / supporting view | - `id` |
| Architecture.md:L135 | Parts 8, 19 and 20 | integrated / supporting view | - `subject_id`, `topic_id` |
| Architecture.md:L136 | Parts 8, 19 and 20 | integrated / supporting view | - `question_type` |
| Architecture.md:L137 | Parts 8, 19 and 20 | integrated / supporting view | - `difficulty` (1–5) |
| Architecture.md:L138 | Parts 8, 19 and 20 | integrated / supporting view | - `question_text` |
| Architecture.md:L139 | Parts 8, 19 and 20 | integrated / supporting view | - `explanation` |
| Architecture.md:L140 | Parts 8, 19 and 20 | integrated / supporting view | - `learning_objective` |
| Architecture.md:L141 | Parts 8, 19 and 20 | integrated / supporting view | - `estimated_seconds` |
| Architecture.md:L142 | Parts 8, 19 and 20 | integrated / supporting view | - `language` |
| Architecture.md:L143 | Parts 8, 19 and 20 | integrated / supporting view | - `source_note` / curriculum alignment note |
| Architecture.md:L144 | Parts 8, 19 and 20 | integrated / supporting view | - `status` (draft, reviewed, published) |
| Architecture.md:L145 | Parts 8, 19 and 20 | integrated / supporting view | - `created_at`, `updated_at` |
| Architecture.md:L147 | Parts 8, 19 and 20 | integrated / supporting view | **question_options** |
| Architecture.md:L148 | Parts 8, 19 and 20 | integrated / supporting view | - `id`, `question_id`, `option_key`, `option_text`, `is_correct`, `sort_order` |
| Architecture.md:L150 | Parts 8, 19 and 20 | integrated / supporting view | For non-MCQ types, define a safe and explicit answer schema. Never expose correct answers to the client before submission in examination mode. |
| Architecture.md:L152 | Parts 8, 19 and 20 | integrated / supporting view | **quizzes** |
| Architecture.md:L153 | Parts 8, 19 and 20 | integrated / supporting view | - `id`, `student_id` (nullable only if anonymous practice is deliberately supported), `mode`, `subject_id` (nullable for mixed), `settings_json`, `status`, `created_at` |
| Architecture.md:L155 | Parts 8, 19 and 20 | integrated / supporting view | **quiz_questions** |
| Architecture.md:L156 | Parts 8, 19 and 20 | integrated / supporting view | - `id`, `quiz_id`, `question_id`, `position`, `points` |
| Architecture.md:L157 | Parts 8, 19 and 20 | integrated / supporting view | - Store a session snapshot or version reference so later question edits do not silently change old attempts. |
| Architecture.md:L159 | Parts 8, 19 and 20 | integrated / supporting view | **quiz_attempts** |
| Architecture.md:L160 | Parts 8, 19 and 20 | integrated / supporting view | - `id`, `quiz_id`, `student_id`, `started_at`, `submitted_at`, `duration_seconds`, `total_questions`, `correct_count`, `incorrect_count`, `unanswered_count`, `score_percent`, `status`, `idempotency_key` |
| Architecture.md:L162 | Parts 8, 19 and 20 | integrated / supporting view | **attempt_answers** |
| Architecture.md:L163 | Parts 8, 19 and 20 | integrated / supporting view | - `id`, `attempt_id`, `question_id`, `selected_option_id` (nullable), `answer_text` (nullable), `is_correct`, `points_awarded`, `answered_at`, `review_snapshot_json` (if required) |
| Architecture.md:L165 | Parts 8, 19 and 20 | integrated / supporting view | **learning_progress** |
| Architecture.md:L166 | Parts 8, 19 and 20 | integrated / supporting view | - `id`, `student_id`, `subject_id`, `topic_id`, `attempt_count`, `correct_count`, `last_practised_at`, `updated_at` |
| Architecture.md:L168 | Parts 8, 19 and 20 | integrated / supporting view | **daily_challenges** |
| Architecture.md:L169 | Parts 8, 19 and 20 | integrated / supporting view | - `id`, `challenge_date`, `title`, `question_set_json` or relation table, `status` |
| Architecture.md:L171 | Parts 8, 19 and 20 | integrated / supporting view | Add additional tables for parent accounts, authentication, consent, and audit events only when the authentication/public-release design is implemented. Do not invent insecure parent-child access based on a guessable student ID. |
| Architecture.md:L173 | Parts 8, 19 and 20 | integrated / supporting view | ## 6. API design |
| Architecture.md:L175 | Parts 8, 19 and 20 | integrated / supporting view | Use JSON REST endpoints and a consistent response format. |
| Architecture.md:L177 | Parts 8, 19 and 20 | integrated / supporting view | Initial endpoints: |
| Architecture.md:L179 | Parts 8, 19 and 20 | retained exact (master L846) | ```text |
| Architecture.md:L180 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/health |
| Architecture.md:L181 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/subjects |
| Architecture.md:L182 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/topics |
| Architecture.md:L183 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/questions |
| Architecture.md:L184 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/questions/:id |
| Architecture.md:L186 | Parts 8, 19 and 20 | integrated / supporting view | POST   /api/students |
| Architecture.md:L187 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/students/:id |
| Architecture.md:L188 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/students/:id/progress |
| Architecture.md:L189 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/students/:id/attempts |
| Architecture.md:L191 | Parts 8, 19 and 20 | integrated / supporting view | POST   /api/quizzes/start |
| Architecture.md:L192 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/quizzes/:id |
| Architecture.md:L193 | Parts 8, 19 and 20 | integrated / supporting view | POST   /api/quizzes/:id/submit |
| Architecture.md:L195 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/attempts/:id |
| Architecture.md:L196 | Parts 8, 19 and 20 | integrated / supporting view | GET    /api/dashboard/:studentId |
| Architecture.md:L197 | Parts 8, 19 and 20 | retained exact (master L896) | ``` |
| Architecture.md:L199 | Parts 8, 19 and 20 | integrated / supporting view | Rules: |
| Architecture.md:L200 | Parts 8, 19 and 20 | integrated / supporting view | - Validate route parameters, query parameters, and request bodies. |
| Architecture.md:L201 | Parts 8, 19 and 20 | integrated / supporting view | - Return appropriate HTTP status codes. |
| Architecture.md:L202 | Parts 8, 19 and 20 | integrated / supporting view | - Do not leak stack traces or internal SQL details. |
| Architecture.md:L203 | Parts 8, 19 and 20 | integrated / supporting view | - Do not return answer keys in examination-mode quiz payloads. |
| Architecture.md:L204 | Parts 8, 19 and 20 | integrated / supporting view | - Recalculate answers and scores on the server. |
| Architecture.md:L205 | Parts 8, 19 and 20 | integrated / supporting view | - Verify quiz ownership/session access before returning private records. |
| Architecture.md:L206 | Parts 8, 19 and 20 | integrated / supporting view | - Prevent repeated submissions from changing results. |
| Architecture.md:L207 | Parts 8, 19 and 20 | integrated / supporting view | - Apply pagination and bounded limits to question/history endpoints. |
| Architecture.md:L209 | Parts 8, 19 and 20 | integrated / supporting view | ## 7. Quiz lifecycle |
| Architecture.md:L211 | Parts 8, 19 and 20 | integrated / supporting view | 1. Student selects mode, subject, topic, difficulty, and question count. |
| Architecture.md:L212 | Parts 8, 19 and 20 | integrated / supporting view | 2. Server validates settings and selects eligible published questions. |
| Architecture.md:L213 | Parts 8, 19 and 20 | integrated / supporting view | 3. Server creates quiz session and ordered question list. |
| Architecture.md:L214 | Parts 8, 19 and 20 | integrated / supporting view | 4. Client receives question content without hidden answers in examination mode. |
| Architecture.md:L215 | Parts 8, 19 and 20 | integrated / supporting view | 5. Client submits answers and an idempotency key. |
| Architecture.md:L216 | Parts 8, 19 and 20 | integrated / supporting view | 6. Server validates the session and submitted question IDs. |
| Architecture.md:L217 | Parts 8, 19 and 20 | integrated / supporting view | 7. Server scores answers using trusted database answer keys. |
| Architecture.md:L218 | Parts 8, 19 and 20 | integrated / supporting view | 8. Server stores attempt and answer records transactionally. |
| Architecture.md:L219 | Parts 8, 19 and 20 | integrated / supporting view | 9. Server returns result summary and permitted explanations. |
| Architecture.md:L220 | Parts 8, 19 and 20 | integrated / supporting view | 10. Dashboard analytics update from persisted attempts. |
| Architecture.md:L222 | Parts 8, 19 and 20 | integrated / supporting view | Practice mode may provide feedback after each answer, but avoid exposing answer keys unnecessarily through public API responses. |
| Architecture.md:L224 | Parts 8, 19 and 20 | integrated / supporting view | ## 8. Security and privacy architecture |
| Architecture.md:L226 | Parts 8, 19 and 20 | integrated / supporting view | Local MVP: |
| Architecture.md:L227 | Parts 8, 19 and 20 | integrated / supporting view | - Bind to localhost by default. |
| Architecture.md:L228 | Parts 8, 19 and 20 | integrated / supporting view | - Do not expose the dev server to the LAN unless explicitly configured. |
| Architecture.md:L229 | Parts 8, 19 and 20 | integrated / supporting view | - Use parameterised SQL. |
| Architecture.md:L230 | Parts 8, 19 and 20 | integrated / supporting view | - Validate and limit inputs. |
| Architecture.md:L231 | Parts 8, 19 and 20 | integrated / supporting view | - Escape rendered user-provided content. |
| Architecture.md:L232 | Parts 8, 19 and 20 | integrated / supporting view | - Use secure headers and rate limits where applicable. |
| Architecture.md:L233 | Parts 8, 19 and 20 | integrated / supporting view | - Keep database and logs outside public static directories. |
| Architecture.md:L234 | Parts 8, 19 and 20 | integrated / supporting view | - Exclude `.env`, database files, backups, and logs from Git. |
| Architecture.md:L236 | Parts 8, 19 and 20 | integrated / supporting view | Before public launch: |
| Architecture.md:L237 | Parts 8, 19 and 20 | integrated / supporting view | - Implement proper authentication and password hashing if accounts are required. |
| Architecture.md:L238 | Parts 8, 19 and 20 | integrated / supporting view | - Use secure, HttpOnly, SameSite cookies or another reviewed session strategy. |
| Architecture.md:L239 | Parts 8, 19 and 20 | integrated / supporting view | - Enforce parent/guardian-authorised access to a child's records. |
| Architecture.md:L240 | Parts 8, 19 and 20 | integrated / supporting view | - Obtain appropriate parental consent for children's personal data. |
| Architecture.md:L241 | Parts 8, 19 and 20 | integrated / supporting view | - Provide privacy notice, retention policy, export/deletion process, and incident response. |
| Architecture.md:L242 | Parts 8, 19 and 20 | integrated / supporting view | - Enforce HTTPS. |
| Architecture.md:L243 | Parts 8, 19 and 20 | integrated / supporting view | - Review Malaysian legal/privacy obligations with qualified advice. |
| Architecture.md:L244 | Parts 8, 19 and 20 | integrated / supporting view | - Add abuse prevention, monitoring, backups, restore tests, and admin audit logs. |
| Architecture.md:L245 | Parts 8, 19 and 20 | integrated / supporting view | - Never publish student names, school names, or individual scores on a public leaderboard by default. |
| Architecture.md:L247 | Parts 8, 19 and 20 | integrated / supporting view | ## 9. Production evolution |
| Architecture.md:L249 | Parts 8, 19 and 20 | integrated / supporting view | SQLite is the local MVP database. For a multi-user public community platform with concurrent writes and multiple application instances, evaluate PostgreSQL or another managed relational database. |
| Architecture.md:L251 | Parts 8, 19 and 20 | integrated / supporting view | Keep database access behind a repository/service boundary so migration is feasible. |
| Architecture.md:L253 | Parts 8, 19 and 20 | integrated / supporting view | Potential deployment: |
| Architecture.md:L254 | Parts 8, 19 and 20 | integrated / supporting view | - Linux VPS |
| Architecture.md:L255 | Parts 8, 19 and 20 | integrated / supporting view | - Node.js service managed by systemd or process manager |
| Architecture.md:L256 | Parts 8, 19 and 20 | integrated / supporting view | - Nginx reverse proxy |
| Architecture.md:L257 | Parts 8, 19 and 20 | integrated / supporting view | - HTTPS certificate |
| Architecture.md:L258 | Parts 8, 19 and 20 | integrated / supporting view | - PostgreSQL for production if required |
| Architecture.md:L259 | Parts 8, 19 and 20 | integrated / supporting view | - Automated encrypted backups |
| Architecture.md:L260 | Parts 8, 19 and 20 | integrated / supporting view | - Monitoring and log rotation |
| Architecture.md:L262 | Parts 8, 19 and 20 | integrated / supporting view | Do not deploy or provision paid infrastructure without explicit user approval. |
| Architecture.md:L264 | Parts 8, 19 and 20 | integrated / supporting view | ## 10. Non-functional requirements |
| Architecture.md:L266 | Parts 8, 19 and 20 | integrated / supporting view | - Responsive and accessible interface |
| Architecture.md:L267 | Parts 8, 19 and 20 | integrated / supporting view | - Fast initial load on typical mobile connections |
| Architecture.md:L268 | Parts 8, 19 and 20 | integrated / supporting view | - Reliable local persistence |
| Architecture.md:L269 | Parts 8, 19 and 20 | integrated / supporting view | - Clear error and empty states |
| Architecture.md:L270 | Parts 8, 19 and 20 | integrated / supporting view | - Deterministic scoring |
| Architecture.md:L271 | Parts 8, 19 and 20 | integrated / supporting view | - Maintainable question content |
| Architecture.md:L272 | Parts 8, 19 and 20 | integrated / supporting view | - Testable services |
| Architecture.md:L273 | Parts 8, 19 and 20 | integrated / supporting view | - No secrets in source control |
| Architecture.md:L274 | Parts 8, 19 and 20 | integrated / supporting view | - Documented backup and restore process |

### Input: Design.md

| Source unit | Section / destination | Disposition | Input text |
|---|---|---|---|
| Design.md:L1 | Parts 4–7, 18 and 21 | integrated / supporting view | # Design — IGCSE MRSM Preparation Hub |
| Design.md:L3 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 1. Product design direction |
| Design.md:L5 | Parts 4–7, 18 and 21 | integrated / supporting view | Create a premium, welcoming, modern learning platform—not a school administration portal and not a childish game. |
| Design.md:L7 | Parts 4–7, 18 and 21 | integrated / supporting view | The experience should make a Year 6 pupil feel confident to practise while giving parents a calm, trustworthy place to understand the programme and review progress. |
| Design.md:L9 | Parts 4–7, 18 and 21 | integrated / supporting view | **Product promise:** Learn. Practise. Improve. Be Ready. |
| Design.md:L11 | Parts 4–7, 18 and 21 | integrated / supporting view | Suggested hero copy: |
| Design.md:L13 | Parts 4–7, 18 and 21 | integrated / supporting view | &gt; Your Journey to MRSM IGCSE Starts Here. |
| Design.md:L14 | Parts 4–7, 18 and 21 | integrated / supporting view | &gt; |
| Design.md:L15 | Parts 4–7, 18 and 21 | integrated / supporting view | &gt; Build confidence in English, Mathematics and Science through guided learning and interactive practice. |
| Design.md:L17 | Parts 4–7, 18 and 21 | integrated / supporting view | Always state that this is an independent learning resource, not an official MARA, MRSM, or Cambridge platform. |
| Design.md:L19 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 2. Visual identity |
| Design.md:L21 | Parts 4–7, 18 and 21 | integrated / supporting view | Suggested palette: |
| Design.md:L22 | Parts 4–7, 18 and 21 | integrated / supporting view | - Deep navy: primary brand and navigation |
| Design.md:L23 | Parts 4–7, 18 and 21 | integrated / supporting view | - White: cards and main surfaces |
| Design.md:L24 | Parts 4–7, 18 and 21 | integrated / supporting view | - Warm gold: highlights and achievement accents |
| Design.md:L25 | Parts 4–7, 18 and 21 | integrated / supporting view | - Soft grey: page background and dividers |
| Design.md:L26 | Parts 4–7, 18 and 21 | integrated / supporting view | - Green: correct/success feedback |
| Design.md:L27 | Parts 4–7, 18 and 21 | integrated / supporting view | - Amber: needs attention |
| Design.md:L28 | Parts 4–7, 18 and 21 | integrated / supporting view | - Red: incorrect/error feedback |
| Design.md:L30 | Parts 4–7, 18 and 21 | integrated / supporting view | Use colour semantically. Do not rely on colour alone to communicate correctness. |
| Design.md:L32 | Parts 4–7, 18 and 21 | integrated / supporting view | Typography: |
| Design.md:L33 | Parts 4–7, 18 and 21 | integrated / supporting view | - Use a highly readable sans-serif family. |
| Design.md:L34 | Parts 4–7, 18 and 21 | integrated / supporting view | - Clear hierarchy for headings, question text, labels, and supporting explanations. |
| Design.md:L35 | Parts 4–7, 18 and 21 | integrated / supporting view | - Keep body text comfortable on mobile. |
| Design.md:L36 | Parts 4–7, 18 and 21 | integrated / supporting view | - Avoid tiny metadata and low-contrast grey text. |
| Design.md:L38 | Parts 4–7, 18 and 21 | integrated / supporting view | Visual style: |
| Design.md:L39 | Parts 4–7, 18 and 21 | integrated / supporting view | - Spacious cards |
| Design.md:L40 | Parts 4–7, 18 and 21 | integrated / supporting view | - Rounded corners used consistently |
| Design.md:L41 | Parts 4–7, 18 and 21 | integrated / supporting view | - Subtle shadows |
| Design.md:L42 | Parts 4–7, 18 and 21 | integrated / supporting view | - Simple line icons |
| Design.md:L43 | Parts 4–7, 18 and 21 | integrated / supporting view | - Restrained transitions |
| Design.md:L44 | Parts 4–7, 18 and 21 | integrated / supporting view | - Minimal gradients |
| Design.md:L45 | Parts 4–7, 18 and 21 | integrated / supporting view | - No excessive glassmorphism or animation |
| Design.md:L47 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 3. Information architecture |
| Design.md:L49 | Parts 4–7, 18 and 21 | integrated / supporting view | The application is a single-page application with persistent top-level navigation. |
| Design.md:L51 | Parts 4–7, 18 and 21 | integrated / supporting view | Primary navigation: |
| Design.md:L52 | Parts 4–7, 18 and 21 | integrated / supporting view | 1. Home |
| Design.md:L53 | Parts 4–7, 18 and 21 | integrated / supporting view | 2. Start Quiz |
| Design.md:L54 | Parts 4–7, 18 and 21 | integrated / supporting view | 3. Question Bank |
| Design.md:L55 | Parts 4–7, 18 and 21 | integrated / supporting view | 4. My Progress |
| Design.md:L56 | Parts 4–7, 18 and 21 | integrated / supporting view | 5. Student Guide |
| Design.md:L57 | Parts 4–7, 18 and 21 | integrated / supporting view | 6. Parent Guide |
| Design.md:L58 | Parts 4–7, 18 and 21 | integrated / supporting view | 7. About |
| Design.md:L60 | Parts 4–7, 18 and 21 | integrated / supporting view | Use tabs or client-side route state. Navigation must work with browser back/forward where practical and must not cause unnecessary full-page reloads. |
| Design.md:L62 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 4. Home screen |
| Design.md:L64 | Parts 4–7, 18 and 21 | retained exact (master L343) | Include: |
| Design.md:L65 | Parts 4–7, 18 and 21 | integrated / supporting view | - Brand and navigation |
| Design.md:L66 | Parts 4–7, 18 and 21 | integrated / supporting view | - Welcome/hero section |
| Design.md:L67 | Parts 4–7, 18 and 21 | integrated / supporting view | - Current learner profile selector or identity |
| Design.md:L68 | Parts 4–7, 18 and 21 | integrated / supporting view | - Primary “Start Learning” action |
| Design.md:L69 | Parts 4–7, 18 and 21 | integrated / supporting view | - Subject cards for English, Mathematics, and Science |
| Design.md:L70 | Parts 4–7, 18 and 21 | integrated / supporting view | - Daily Challenge |
| Design.md:L71 | Parts 4–7, 18 and 21 | integrated / supporting view | - Recent quiz activity |
| Design.md:L72 | Parts 4–7, 18 and 21 | integrated / supporting view | - At-a-glance progress |
| Design.md:L74 | Parts 4–7, 18 and 21 | integrated / supporting view | Do not show fabricated progress as real. For a new learner, show a helpful empty state and a first-quiz action. |
| Design.md:L76 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 5. Quiz setup |
| Design.md:L78 | Parts 4–7, 18 and 21 | integrated / supporting view | Allow selection of: |
| Design.md:L79 | Parts 4–7, 18 and 21 | integrated / supporting view | - Subject or mixed subjects |
| Design.md:L80 | Parts 4–7, 18 and 21 | integrated / supporting view | - Topic |
| Design.md:L81 | Parts 4–7, 18 and 21 | integrated / supporting view | - Difficulty (1–5) |
| Design.md:L82 | Parts 4–7, 18 and 21 | integrated / supporting view | - Number of questions |
| Design.md:L83 | Parts 4–7, 18 and 21 | integrated / supporting view | - Practice, Examination, or Challenge mode |
| Design.md:L84 | Parts 4–7, 18 and 21 | integrated / supporting view | - Timer option where appropriate |
| Design.md:L86 | Parts 4–7, 18 and 21 | integrated / supporting view | Explain settings in student-friendly language. |
| Design.md:L88 | Parts 4–7, 18 and 21 | integrated / supporting view | Do not promise an official MRSM exam simulation. Label it as an independent practice simulation. |
| Design.md:L90 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 6. Quiz screen |
| Design.md:L92 | Parts 4–7, 18 and 21 | integrated / supporting view | Priorities: |
| Design.md:L93 | Parts 4–7, 18 and 21 | integrated / supporting view | - Question text is the main visual focus. |
| Design.md:L94 | Parts 4–7, 18 and 21 | integrated / supporting view | - Answer options have large, touch-friendly hit areas. |
| Design.md:L95 | Parts 4–7, 18 and 21 | integrated / supporting view | - Clearly show question number and total. |
| Design.md:L96 | Parts 4–7, 18 and 21 | integrated / supporting view | - Show progress indicator. |
| Design.md:L97 | Parts 4–7, 18 and 21 | integrated / supporting view | - Provide previous/next navigation. |
| Design.md:L98 | Parts 4–7, 18 and 21 | integrated / supporting view | - Allow marking a question for review. |
| Design.md:L99 | Parts 4–7, 18 and 21 | integrated / supporting view | - Show timer only when enabled. |
| Design.md:L100 | Parts 4–7, 18 and 21 | integrated / supporting view | - Provide a clear submit confirmation. |
| Design.md:L101 | Parts 4–7, 18 and 21 | integrated / supporting view | - Preserve answers when navigating between questions. |
| Design.md:L103 | Parts 4–7, 18 and 21 | integrated / supporting view | Practice mode: |
| Design.md:L104 | Parts 4–7, 18 and 21 | integrated / supporting view | - Feedback after answering if enabled. |
| Design.md:L105 | Parts 4–7, 18 and 21 | integrated / supporting view | - Explanation in simple language. |
| Design.md:L106 | Parts 4–7, 18 and 21 | integrated / supporting view | - Optional Malay explanation. |
| Design.md:L108 | Parts 4–7, 18 and 21 | integrated / supporting view | Examination mode: |
| Design.md:L109 | Parts 4–7, 18 and 21 | integrated / supporting view | - No answer reveal before submission. |
| Design.md:L110 | Parts 4–7, 18 and 21 | integrated / supporting view | - Timer and navigation. |
| Design.md:L111 | Parts 4–7, 18 and 21 | integrated / supporting view | - Submit confirmation. |
| Design.md:L112 | Parts 4–7, 18 and 21 | integrated / supporting view | - Results and explanations after submission. |
| Design.md:L114 | Parts 4–7, 18 and 21 | integrated / supporting view | Challenge mode: |
| Design.md:L115 | Parts 4–7, 18 and 21 | integrated / supporting view | - Harder questions and a more focused timer. |
| Design.md:L116 | Parts 4–7, 18 and 21 | integrated / supporting view | - Encouraging language; no punitive messaging. |
| Design.md:L118 | Parts 4–7, 18 and 21 | integrated / supporting view | Accessibility: |
| Design.md:L119 | Parts 4–7, 18 and 21 | integrated / supporting view | - Keyboard navigation |
| Design.md:L120 | Parts 4–7, 18 and 21 | integrated / supporting view | - Visible focus |
| Design.md:L121 | Parts 4–7, 18 and 21 | integrated / supporting view | - Semantic buttons and labels |
| Design.md:L122 | Parts 4–7, 18 and 21 | integrated / supporting view | - Screen-reader-friendly status announcements |
| Design.md:L123 | Parts 4–7, 18 and 21 | integrated / supporting view | - Sufficient contrast |
| Design.md:L124 | Parts 4–7, 18 and 21 | integrated / supporting view | - Do not communicate correct/incorrect status by colour alone |
| Design.md:L126 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 7. Results screen |
| Design.md:L128 | Parts 4–7, 18 and 21 | retained exact (master L502) | Show: |
| Design.md:L129 | Parts 4–7, 18 and 21 | integrated / supporting view | - Learner display name |
| Design.md:L130 | Parts 4–7, 18 and 21 | integrated / supporting view | - Subject/mode |
| Design.md:L131 | Parts 4–7, 18 and 21 | integrated / supporting view | - Date and time |
| Design.md:L132 | Parts 4–7, 18 and 21 | integrated / supporting view | - Correct, incorrect, and unanswered counts |
| Design.md:L133 | Parts 4–7, 18 and 21 | integrated / supporting view | - Percentage score |
| Design.md:L134 | Parts 4–7, 18 and 21 | integrated / supporting view | - Time taken |
| Design.md:L135 | Parts 4–7, 18 and 21 | integrated / supporting view | - Topic strengths and areas to practise |
| Design.md:L136 | Parts 4–7, 18 and 21 | integrated / supporting view | - Review answers |
| Design.md:L137 | Parts 4–7, 18 and 21 | integrated / supporting view | - Retake action |
| Design.md:L138 | Parts 4–7, 18 and 21 | integrated / supporting view | - Suggested next activity |
| Design.md:L140 | Parts 4–7, 18 and 21 | integrated / supporting view | Use supportive labels: |
| Design.md:L141 | Parts 4–7, 18 and 21 | integrated / supporting view | - Excellent |
| Design.md:L142 | Parts 4–7, 18 and 21 | integrated / supporting view | - Good progress |
| Design.md:L143 | Parts 4–7, 18 and 21 | integrated / supporting view | - Keep practising |
| Design.md:L144 | Parts 4–7, 18 and 21 | integrated / supporting view | - Let's review this topic |
| Design.md:L146 | Parts 4–7, 18 and 21 | integrated / supporting view | These are internal practice labels only. Explicitly state they are not official Cambridge grades, MRSM selection results, or predictions of admission. |
| Design.md:L148 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 8. Progress dashboard |
| Design.md:L150 | Parts 4–7, 18 and 21 | retained exact (master L502) | Show: |
| Design.md:L151 | Parts 4–7, 18 and 21 | integrated / supporting view | - Total attempts |
| Design.md:L152 | Parts 4–7, 18 and 21 | integrated / supporting view | - Average score |
| Design.md:L153 | Parts 4–7, 18 and 21 | integrated / supporting view | - Best score |
| Design.md:L154 | Parts 4–7, 18 and 21 | integrated / supporting view | - Subject-level performance |
| Design.md:L155 | Parts 4–7, 18 and 21 | integrated / supporting view | - Topic-level strengths and weaknesses |
| Design.md:L156 | Parts 4–7, 18 and 21 | integrated / supporting view | - Recent attempts |
| Design.md:L157 | Parts 4–7, 18 and 21 | integrated / supporting view | - Score trend over time |
| Design.md:L158 | Parts 4–7, 18 and 21 | integrated / supporting view | - Learning streak only if calculated from real saved activity |
| Design.md:L160 | Parts 4–7, 18 and 21 | integrated / supporting view | Charts must have accessible labels and a text equivalent. Avoid misleading trends when there are too few attempts. |
| Design.md:L162 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 9. Question bank |
| Design.md:L164 | Parts 4–7, 18 and 21 | integrated / supporting view | Filters: |
| Design.md:L165 | Parts 4–7, 18 and 21 | integrated / supporting view | - Subject |
| Design.md:L166 | Parts 4–7, 18 and 21 | integrated / supporting view | - Topic |
| Design.md:L167 | Parts 4–7, 18 and 21 | integrated / supporting view | - Difficulty |
| Design.md:L168 | Parts 4–7, 18 and 21 | integrated / supporting view | - Question type |
| Design.md:L169 | Parts 4–7, 18 and 21 | integrated / supporting view | - Search text |
| Design.md:L171 | Parts 4–7, 18 and 21 | integrated / supporting view | Each question card should show: |
| Design.md:L172 | Parts 4–7, 18 and 21 | integrated / supporting view | - Subject/topic |
| Design.md:L173 | Parts 4–7, 18 and 21 | integrated / supporting view | - Difficulty |
| Design.md:L174 | Parts 4–7, 18 and 21 | integrated / supporting view | - Question type |
| Design.md:L175 | Parts 4–7, 18 and 21 | integrated / supporting view | - Short preview |
| Design.md:L176 | Parts 4–7, 18 and 21 | integrated / supporting view | - Whether it is available for practice |
| Design.md:L178 | Parts 4–7, 18 and 21 | integrated / supporting view | Do not expose answer keys in public list endpoints. |
| Design.md:L180 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 10. Student Guide |
| Design.md:L182 | Parts 4–7, 18 and 21 | integrated / supporting view | Use simple language suitable for upper-primary students. |
| Design.md:L184 | Parts 4–7, 18 and 21 | integrated / supporting view | Suggested sections: |
| Design.md:L185 | Parts 4–7, 18 and 21 | integrated / supporting view | - What is MRSM? |
| Design.md:L186 | Parts 4–7, 18 and 21 | integrated / supporting view | - What is IGCSE? |
| Design.md:L187 | Parts 4–7, 18 and 21 | integrated / supporting view | - What may be different in Form 1? |
| Design.md:L188 | Parts 4–7, 18 and 21 | integrated / supporting view | - Why English matters |
| Design.md:L189 | Parts 4–7, 18 and 21 | integrated / supporting view | - Reading English questions |
| Design.md:L190 | Parts 4–7, 18 and 21 | integrated / supporting view | - Mathematics vocabulary |
| Design.md:L191 | Parts 4–7, 18 and 21 | integrated / supporting view | - Science vocabulary |
| Design.md:L192 | Parts 4–7, 18 and 21 | integrated / supporting view | - How to approach word problems |
| Design.md:L193 | Parts 4–7, 18 and 21 | integrated / supporting view | - How to manage time |
| Design.md:L194 | Parts 4–7, 18 and 21 | integrated / supporting view | - How to learn from mistakes |
| Design.md:L195 | Parts 4–7, 18 and 21 | integrated / supporting view | - Building a consistent study habit |
| Design.md:L197 | Parts 4–7, 18 and 21 | integrated / supporting view | Use examples and short explanations. Do not state unverified programme facts as universal facts. |
| Design.md:L199 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 11. Parent Guide |
| Design.md:L201 | Parts 4–7, 18 and 21 | integrated / supporting view | Use Bahasa Melayu as the main language, with English terms explained. |
| Design.md:L203 | Parts 4–7, 18 and 21 | integrated / supporting view | Suggested tabs/sections: |
| Design.md:L204 | Parts 4–7, 18 and 21 | integrated / supporting view | - Pengenalan MRSM |
| Design.md:L205 | Parts 4–7, 18 and 21 | integrated / supporting view | - Kemasukan Tingkatan 1 |
| Design.md:L206 | Parts 4–7, 18 and 21 | integrated / supporting view | - UKKM dan penilaian pemilihan |
| Design.md:L207 | Parts 4–7, 18 and 21 | integrated / supporting view | - Program IGCSE |
| Design.md:L208 | Parts 4–7, 18 and 21 | integrated / supporting view | - Cambridge IGCSE |
| Design.md:L209 | Parts 4–7, 18 and 21 | integrated / supporting view | - Perbezaan program |
| Design.md:L210 | Parts 4–7, 18 and 21 | integrated / supporting view | - Persediaan akademik |
| Design.md:L211 | Parts 4–7, 18 and 21 | integrated / supporting view | - Cabaran pembelajaran |
| Design.md:L212 | Parts 4–7, 18 and 21 | integrated / supporting view | - Peranan ibu bapa |
| Design.md:L213 | Parts 4–7, 18 and 21 | integrated / supporting view | - Cadangan jadual ulang kaji |
| Design.md:L214 | Parts 4–7, 18 and 21 | integrated / supporting view | - Soalan lazim |
| Design.md:L215 | Parts 4–7, 18 and 21 | integrated / supporting view | - Sumber rasmi |
| Design.md:L217 | Parts 4–7, 18 and 21 | integrated / supporting view | Clearly label: |
| Design.md:L218 | Parts 4–7, 18 and 21 | integrated / supporting view | - Fakta rasmi yang disahkan |
| Design.md:L219 | Parts 4–7, 18 and 21 | integrated / supporting view | - Panduan umum |
| Design.md:L220 | Parts 4–7, 18 and 21 | integrated / supporting view | - Maklumat yang belum dapat disahkan |
| Design.md:L222 | Parts 4–7, 18 and 21 | integrated / supporting view | Add source links and access/update dates for material claims. |
| Design.md:L224 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 12. Vocabulary trainer |
| Design.md:L226 | Parts 4–7, 18 and 21 | integrated / supporting view | Searchable English–Malay glossary. |
| Design.md:L228 | Parts 4–7, 18 and 21 | integrated / supporting view | Example entries: |
| Design.md:L229 | Parts 4–7, 18 and 21 | integrated / supporting view | - Fraction — Pecahan |
| Design.md:L230 | Parts 4–7, 18 and 21 | integrated / supporting view | - Percentage — Peratus |
| Design.md:L231 | Parts 4–7, 18 and 21 | integrated / supporting view | - Perimeter — Ukur keliling |
| Design.md:L232 | Parts 4–7, 18 and 21 | integrated / supporting view | - Area — Luas |
| Design.md:L233 | Parts 4–7, 18 and 21 | integrated / supporting view | - Volume — Isi padu |
| Design.md:L234 | Parts 4–7, 18 and 21 | integrated / supporting view | - Gravity — Graviti |
| Design.md:L235 | Parts 4–7, 18 and 21 | integrated / supporting view | - Friction — Geseran |
| Design.md:L236 | Parts 4–7, 18 and 21 | integrated / supporting view | - Evaporation — Penyejatan |
| Design.md:L237 | Parts 4–7, 18 and 21 | integrated / supporting view | - Photosynthesis — Fotosintesis |
| Design.md:L238 | Parts 4–7, 18 and 21 | integrated / supporting view | - Investigation — Penyiasatan |
| Design.md:L239 | Parts 4–7, 18 and 21 | integrated / supporting view | - Evidence — Bukti |
| Design.md:L240 | Parts 4–7, 18 and 21 | integrated / supporting view | - Conclusion — Kesimpulan |
| Design.md:L242 | Parts 4–7, 18 and 21 | integrated / supporting view | Where useful, include: |
| Design.md:L243 | Parts 4–7, 18 and 21 | integrated / supporting view | - Pronunciation hint |
| Design.md:L244 | Parts 4–7, 18 and 21 | integrated / supporting view | - Short definition |
| Design.md:L245 | Parts 4–7, 18 and 21 | integrated / supporting view | - Example sentence |
| Design.md:L246 | Parts 4–7, 18 and 21 | integrated / supporting view | - Subject/topic |
| Design.md:L247 | Parts 4–7, 18 and 21 | integrated / supporting view | - Favourite/review state |
| Design.md:L249 | Parts 4–7, 18 and 21 | integrated / supporting view | Do not claim a translation is the only possible translation where terminology varies by context. |
| Design.md:L251 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 13. Responsive behaviour |
| Design.md:L253 | Parts 4–7, 18 and 21 | integrated / supporting view | Desktop: |
| Design.md:L254 | Parts 4–7, 18 and 21 | integrated / supporting view | - Full navigation |
| Design.md:L255 | Parts 4–7, 18 and 21 | integrated / supporting view | - Content max-width for readability |
| Design.md:L256 | Parts 4–7, 18 and 21 | integrated / supporting view | - Multi-column dashboard cards |
| Design.md:L258 | Parts 4–7, 18 and 21 | integrated / supporting view | Tablet: |
| Design.md:L259 | Parts 4–7, 18 and 21 | integrated / supporting view | - Compact navigation |
| Design.md:L260 | Parts 4–7, 18 and 21 | integrated / supporting view | - Two-column cards where suitable |
| Design.md:L262 | Parts 4–7, 18 and 21 | integrated / supporting view | Mobile: |
| Design.md:L263 | Parts 4–7, 18 and 21 | integrated / supporting view | - Compact header or accessible menu |
| Design.md:L264 | Parts 4–7, 18 and 21 | integrated / supporting view | - Single-column content |
| Design.md:L265 | Parts 4–7, 18 and 21 | integrated / supporting view | - Large answer buttons |
| Design.md:L266 | Parts 4–7, 18 and 21 | integrated / supporting view | - Sticky quiz progress/navigation only if it does not obscure content |
| Design.md:L267 | Parts 4–7, 18 and 21 | integrated / supporting view | - Avoid horizontal scrolling |
| Design.md:L269 | Parts 4–7, 18 and 21 | integrated / supporting view | Test common widths, including 360px, 390px, 768px, 1024px, and desktop. |
| Design.md:L271 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 14. Interaction and motion |
| Design.md:L273 | Parts 4–7, 18 and 21 | integrated / supporting view | Use restrained transitions: |
| Design.md:L274 | Parts 4–7, 18 and 21 | integrated / supporting view | - Hover/focus states |
| Design.md:L275 | Parts 4–7, 18 and 21 | integrated / supporting view | - Tab transitions |
| Design.md:L276 | Parts 4–7, 18 and 21 | integrated / supporting view | - Progress animation |
| Design.md:L277 | Parts 4–7, 18 and 21 | integrated / supporting view | - Correct/incorrect feedback |
| Design.md:L279 | Parts 4–7, 18 and 21 | integrated / supporting view | Respect reduced-motion preferences. Do not delay essential interactions with animations. |
| Design.md:L281 | Parts 4–7, 18 and 21 | integrated / supporting view | ## 15. Content tone |
| Design.md:L283 | Parts 4–7, 18 and 21 | integrated / supporting view | Student-facing: |
| Design.md:L284 | Parts 4–7, 18 and 21 | integrated / supporting view | - Friendly |
| Design.md:L285 | Parts 4–7, 18 and 21 | integrated / supporting view | - Encouraging |
| Design.md:L286 | Parts 4–7, 18 and 21 | integrated / supporting view | - Clear |
| Design.md:L287 | Parts 4–7, 18 and 21 | integrated / supporting view | - Never humiliating |
| Design.md:L289 | Parts 4–7, 18 and 21 | integrated / supporting view | Parent-facing: |
| Design.md:L290 | Parts 4–7, 18 and 21 | integrated / supporting view | - Practical |
| Design.md:L291 | Parts 4–7, 18 and 21 | integrated / supporting view | - Honest |
| Design.md:L292 | Parts 4–7, 18 and 21 | integrated / supporting view | - Calm |
| Design.md:L293 | Parts 4–7, 18 and 21 | integrated / supporting view | - Source-aware |
| Design.md:L295 | Parts 4–7, 18 and 21 | integrated / supporting view | Avoid exaggerated claims such as “guaranteed MRSM admission”, “100% same as real exam”, or “official Cambridge simulator”. |

### Input: Memory.md

| Source unit | Section / destination | Disposition | Input text |
|---|---|---|---|
| Memory.md:L1 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | # Memory — IGCSE MRSM Preparation Hub |
| Memory.md:L3 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | &gt; This file is the project's durable working memory for future Codex sessions. Keep it concise, factual, and updated after meaningful work. |
| Memory.md:L5 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ## Project identity |
| Memory.md:L7 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Name: IGCSE MRSM Preparation Hub |
| Memory.md:L8 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Local project path: `D:\IGCSE` |
| Memory.md:L9 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Initial target: local Windows MVP |
| Memory.md:L10 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Local URL target: `http://localhost:3000` |
| Memory.md:L11 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Intended future audience: Malaysian pupils and parents preparing for MRSM Form 1 / IGCSE-related learning |
| Memory.md:L12 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Product status at document creation: planning/specification stage; implementation has not yet been verified. |
| Memory.md:L14 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ## User goals |
| Memory.md:L16 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Research MRSM Form 1 admission, MRSM IGCSE, Cambridge IGCSE, and relevant preparation. |
| Memory.md:L17 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Create a one-page interactive web application. |
| Memory.md:L18 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Provide English, Mathematics, Science, and potentially additional learning areas. |
| Memory.md:L19 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Provide original practice questions and quiz simulations. |
| Memory.md:L20 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Save student names/profiles and quiz attempt records. |
| Memory.md:L21 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Provide separate Student Guide and Parent Guide tabs. |
| Memory.md:L22 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Test locally first; public deployment is a later phase. |
| Memory.md:L24 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ## Initial learner context |
| Memory.md:L26 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Ammar is the initial intended learner and is in Year 6 / Darjah 6. |
| Memory.md:L27 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - A date of 18 November 2026 was supplied as a target assessment date. It is not independently verified and must not be presented as an official date without a source. |
| Memory.md:L28 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Do not hardcode private personal details into public-facing code or documentation. |
| Memory.md:L30 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ## Research references |
| Memory.md:L32 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | Cambridge IGCSE: |
| Memory.md:L33 | Introduction; Parts 1–6, 8–9 and 16–22 | retained exact (master L76) | https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/ |
| Memory.md:L35 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | Research official Cambridge subject pages, syllabuses, assessment information, specimen papers, past papers, mark schemes, examiner reports, and learner guides where publicly accessible. |
| Memory.md:L37 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | Research current official MARA/MRSM admission and programme sources, including UKKM information. Keep UKKM, any MRSM programme-specific selection assessment, and Cambridge IGCSE examinations clearly distinguished. |
| Memory.md:L39 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | No research findings should be treated as verified until the agent records the actual source, URL, access date, and supported claim. |
| Memory.md:L41 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ## Initial technical direction |
| Memory.md:L43 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Backend: Node.js + Express |
| Memory.md:L44 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Database: SQLite for local MVP |
| Memory.md:L45 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Frontend: HTML/CSS/JavaScript single-page application |
| Memory.md:L46 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Charts: Chart.js or equivalent |
| Memory.md:L47 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Icons: Lucide |
| Memory.md:L48 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Local development: `npm run dev` |
| Memory.md:L49 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Local URL: `http://localhost:3000` |
| Memory.md:L51 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | This is an initial direction, not a reason to ignore a strong documented engineering improvement. |
| Memory.md:L53 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ## Core product features |
| Memory.md:L55 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Home dashboard |
| Memory.md:L56 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Student profile selection/creation |
| Memory.md:L57 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - English, Mathematics, Science subject areas |
| Memory.md:L58 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Question bank with filters |
| Memory.md:L59 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Practice Mode |
| Memory.md:L60 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Examination Mode |
| Memory.md:L61 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Challenge Mode |
| Memory.md:L62 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Daily Challenge |
| Memory.md:L63 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Automatic server-side marking |
| Memory.md:L64 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Explanations and review |
| Memory.md:L65 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Saved attempt history |
| Memory.md:L66 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Subject/topic progress analytics |
| Memory.md:L67 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Student Guide |
| Memory.md:L68 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Parent Guide |
| Memory.md:L69 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - English–Malay academic glossary |
| Memory.md:L70 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - About/disclaimer section |
| Memory.md:L72 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ## Question bank target |
| Memory.md:L74 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | Initial target: 300 original, quality-checked questions: |
| Memory.md:L75 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - English: 100 |
| Memory.md:L76 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Mathematics: 100 |
| Memory.md:L77 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Science: 100 |
| Memory.md:L79 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | Questions must be original. Cambridge papers may inform understanding of format and learning objectives, but must not be bulk-copied. Clearly label practice questions as unofficial. |
| Memory.md:L81 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | If the target cannot be reached without compromising quality, record the actual count and reason. |
| Memory.md:L83 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ## Important product safeguards |
| Memory.md:L85 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - This is not an official MARA, MRSM, or Cambridge platform. |
| Memory.md:L86 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - It is not an official admission assessment simulator. |
| Memory.md:L87 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Do not claim that the platform predicts admission or guarantees success. |
| Memory.md:L88 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Do not assert unverified admission formats, dates, subjects, or programme arrangements. |
| Memory.md:L89 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Do not expose children's personal data or results publicly. |
| Memory.md:L90 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Do not deploy publicly until authentication, parental consent, privacy, security, backups, and operations are addressed. |
| Memory.md:L92 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ## Current implementation state |
| Memory.md:L94 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | At the time this file was created: |
| Memory.md:L95 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Project inspected |
| Memory.md:L96 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Research completed |
| Memory.md:L97 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Architecture implemented |
| Memory.md:L98 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Database implemented |
| Memory.md:L99 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] API implemented |
| Memory.md:L100 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] SPA implemented |
| Memory.md:L101 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Question bank seeded and validated |
| Memory.md:L102 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Quiz modes implemented |
| Memory.md:L103 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Attempt history implemented |
| Memory.md:L104 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Dashboard implemented |
| Memory.md:L105 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Parent/Student guides implemented |
| Memory.md:L106 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Automated tests passed |
| Memory.md:L107 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - [ ] Local MVP verified |
| Memory.md:L109 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | Do not tick these boxes without evidence. |
| Memory.md:L111 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ## Session update template |
| Memory.md:L113 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | Append or update the following after each substantial work session: |
| Memory.md:L115 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | ### YYYY-MM-DD — Session summary |
| Memory.md:L116 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Completed: |
| Memory.md:L117 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Decisions: |
| Memory.md:L118 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Research verified: |
| Memory.md:L119 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Research outstanding: |
| Memory.md:L120 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Files changed: |
| Memory.md:L121 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Tests run/results: |
| Memory.md:L122 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Known issues: |
| Memory.md:L123 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | - Next steps: |
| Memory.md:L125 | Introduction; Parts 1–6, 8–9 and 16–22 | integrated / supporting view | Never put passwords, API keys, session tokens, or private student records in this file. |

### Input: PRD.md

| Source unit | Section / destination | Disposition | Input text |
|---|---|---|---|
| PRD.md:L1 | Parts 1–6 and 16–22 | integrated / supporting view | # Product Requirements Document (PRD) |
| PRD.md:L2 | Parts 1–6 and 16–22 | integrated / supporting view | # IGCSE MRSM Preparation Hub |
| PRD.md:L4 | Parts 1–6 and 16–22 | integrated / supporting view | ## 1. Overview |
| PRD.md:L6 | Parts 1–6 and 16–22 | integrated / supporting view | IGCSE MRSM Preparation Hub is an independent educational practice platform for Malaysian pupils and parents. It helps upper-primary pupils prepare academically for the transition to secondary education and understand MRSM/IGCSE-related pathways through researched guidance, original practice questions, interactive quizzes, and progress tracking. |
| PRD.md:L8 | Parts 1–6 and 16–22 | integrated / supporting view | The first release is a local MVP on Windows. Public community access is a later release requiring additional privacy, security, authentication, and operational work. |
| PRD.md:L10 | Parts 1–6 and 16–22 | integrated / supporting view | ## 2. Problem statement |
| PRD.md:L12 | Parts 1–6 and 16–22 | integrated / supporting view | Parents may find it difficult to distinguish MRSM admission requirements, UKKM, programme-specific selection, and Cambridge IGCSE study. Pupils may also need more opportunities to practise English-language questions, Mathematics word problems, and Science concepts in English. |
| PRD.md:L14 | Parts 1–6 and 16–22 | integrated / supporting view | The product brings reliable guidance and structured practice into one accessible interface. |
| PRD.md:L16 | Parts 1–6 and 16–22 | integrated / supporting view | ## 3. Goals |
| PRD.md:L18 | Parts 1–6 and 16–22 | integrated / supporting view | - Provide source-backed, understandable information. |
| PRD.md:L19 | Parts 1–6 and 16–22 | integrated / supporting view | - Improve confidence in English, Mathematics, and Science. |
| PRD.md:L20 | Parts 1–6 and 16–22 | integrated / supporting view | - Give pupils repeatable practice with useful explanations. |
| PRD.md:L21 | Parts 1–6 and 16–22 | integrated / supporting view | - Track genuine learning progress over time. |
| PRD.md:L22 | Parts 1–6 and 16–22 | integrated / supporting view | - Help parents understand strengths and areas requiring support. |
| PRD.md:L23 | Parts 1–6 and 16–22 | integrated / supporting view | - Build a foundation for a future public learning community. |
| PRD.md:L25 | Parts 1–6 and 16–22 | integrated / supporting view | ## 4. Non-goals |
| PRD.md:L27 | Parts 1–6 and 16–22 | integrated / supporting view | The product will not: |
| PRD.md:L28 | Parts 1–6 and 16–22 | integrated / supporting view | - Represent MARA, MRSM, Cambridge, or any government authority. |
| PRD.md:L29 | Parts 1–6 and 16–22 | integrated / supporting view | - Guarantee admission or predict selection outcomes. |
| PRD.md:L30 | Parts 1–6 and 16–22 | integrated / supporting view | - Claim to reproduce the exact official entrance examination. |
| PRD.md:L31 | Parts 1–6 and 16–22 | integrated / supporting view | - Provide leaked or confidential examination material. |
| PRD.md:L32 | Parts 1–6 and 16–22 | integrated / supporting view | - Bulk-reproduce copyrighted Cambridge or third-party papers. |
| PRD.md:L33 | Parts 1–6 and 16–22 | integrated / supporting view | - Launch publicly in the local MVP phase. |
| PRD.md:L34 | Parts 1–6 and 16–22 | integrated / supporting view | - Auto-grade subjective essays as if human assessment were unnecessary. |
| PRD.md:L36 | Parts 1–6 and 16–22 | integrated / supporting view | ## 5. Target users |
| PRD.md:L38 | Parts 1–6 and 16–22 | integrated / supporting view | ### Primary student |
| PRD.md:L39 | Parts 1–6 and 16–22 | integrated / supporting view | - Malaysian Year 6 pupil |
| PRD.md:L40 | Parts 1–6 and 16–22 | integrated / supporting view | - Preparing for Form 1 transition and MRSM-related assessments |
| PRD.md:L41 | Parts 1–6 and 16–22 | integrated / supporting view | - Needs confidence in English, Mathematics, and Science |
| PRD.md:L43 | Parts 1–6 and 16–22 | integrated / supporting view | ### Parent/guardian |
| PRD.md:L44 | Parts 1–6 and 16–22 | integrated / supporting view | - Wants reliable programme/admission information |
| PRD.md:L45 | Parts 1–6 and 16–22 | integrated / supporting view | - Wants to understand preparation expectations |
| PRD.md:L46 | Parts 1–6 and 16–22 | integrated / supporting view | - Wants to review the child's progress |
| PRD.md:L48 | Parts 1–6 and 16–22 | integrated / supporting view | ### Community learner (future) |
| PRD.md:L49 | Parts 1–6 and 16–22 | integrated / supporting view | - Other Malaysian pupils and families |
| PRD.md:L50 | Parts 1–6 and 16–22 | integrated / supporting view | - Uses the platform for independent practice |
| PRD.md:L52 | Parts 1–6 and 16–22 | integrated / supporting view | ## 6. User stories |
| PRD.md:L54 | Parts 1–6 and 16–22 | integrated / supporting view | ### Student |
| PRD.md:L55 | Parts 1–6 and 16–22 | integrated / supporting view | - As a student, I want to create/select my learner profile so that my attempts are saved. |
| PRD.md:L56 | Parts 1–6 and 16–22 | integrated / supporting view | - As a student, I want to choose a subject and topic so I can practise a specific skill. |
| PRD.md:L57 | Parts 1–6 and 16–22 | integrated / supporting view | - As a student, I want a practice mode with explanations so I can learn from mistakes. |
| PRD.md:L58 | Parts 1–6 and 16–22 | integrated / supporting view | - As a student, I want an examination mode so I can practise time management. |
| PRD.md:L59 | Parts 1–6 and 16–22 | integrated / supporting view | - As a student, I want to review previous attempts so I can see improvement. |
| PRD.md:L60 | Parts 1–6 and 16–22 | integrated / supporting view | - As a student, I want English–Malay vocabulary support so I can understand academic terms. |
| PRD.md:L62 | Parts 1–6 and 16–22 | integrated / supporting view | ### Parent |
| PRD.md:L63 | Parts 1–6 and 16–22 | integrated / supporting view | - As a parent, I want clear information about MRSM and IGCSE so I can make informed decisions. |
| PRD.md:L64 | Parts 1–6 and 16–22 | integrated / supporting view | - As a parent, I want official source links so I can verify important information. |
| PRD.md:L65 | Parts 1–6 and 16–22 | integrated / supporting view | - As a parent, I want to understand the child's strengths and weak topics. |
| PRD.md:L66 | Parts 1–6 and 16–22 | integrated / supporting view | - As a parent, I want practical study suggestions without misleading admission promises. |
| PRD.md:L68 | Parts 1–6 and 16–22 | integrated / supporting view | ### Future community user |
| PRD.md:L69 | Parts 1–6 and 16–22 | integrated / supporting view | - As a user, I want my profile and attempts to remain private. |
| PRD.md:L70 | Parts 1–6 and 16–22 | integrated / supporting view | - As a user, I want to access the service from mobile and desktop. |
| PRD.md:L71 | Parts 1–6 and 16–22 | integrated / supporting view | - As a user, I want my records stored securely across sessions. |
| PRD.md:L73 | Parts 1–6 and 16–22 | integrated / supporting view | ## 7. Functional requirements |
| PRD.md:L75 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-01: Student profile |
| PRD.md:L76 | Parts 1–6 and 16–22 | integrated / supporting view | - Create a profile using a display name. |
| PRD.md:L77 | Parts 1–6 and 16–22 | retained exact (master L548) | - Optional year level. |
| PRD.md:L78 | Parts 1–6 and 16–22 | integrated / supporting view | - Optional school name only where justified. |
| PRD.md:L79 | Parts 1–6 and 16–22 | integrated / supporting view | - Support multiple local learner profiles. |
| PRD.md:L80 | Parts 1–6 and 16–22 | integrated / supporting view | - Persist profile in SQLite. |
| PRD.md:L82 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-02: Research and guidance |
| PRD.md:L83 | Parts 1–6 and 16–22 | integrated / supporting view | - Parent Guide and Student Guide. |
| PRD.md:L84 | Parts 1–6 and 16–22 | integrated / supporting view | - Official source references for factual claims. |
| PRD.md:L85 | Parts 1–6 and 16–22 | integrated / supporting view | - Distinguish verified facts from general advice and unverified items. |
| PRD.md:L86 | Parts 1–6 and 16–22 | integrated / supporting view | - Include FAQs and a glossary. |
| PRD.md:L88 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-03: Question bank |
| PRD.md:L89 | Parts 1–6 and 16–22 | integrated / supporting view | - English, Mathematics, and Science. |
| PRD.md:L90 | Parts 1–6 and 16–22 | integrated / supporting view | - Search and filter by subject, topic, difficulty, and type. |
| PRD.md:L91 | Parts 1–6 and 16–22 | integrated / supporting view | - Store question metadata and answer/explanation. |
| PRD.md:L92 | Parts 1–6 and 16–22 | integrated / supporting view | - Support future expansion. |
| PRD.md:L93 | Parts 1–6 and 16–22 | integrated / supporting view | - Only publish reviewed questions. |
| PRD.md:L95 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-04: Quiz configuration |
| PRD.md:L96 | Parts 1–6 and 16–22 | integrated / supporting view | - Subject/mixed subject |
| PRD.md:L97 | Parts 1–6 and 16–22 | integrated / supporting view | - Topic |
| PRD.md:L98 | Parts 1–6 and 16–22 | integrated / supporting view | - Difficulty |
| PRD.md:L99 | Parts 1–6 and 16–22 | integrated / supporting view | - Number of questions |
| PRD.md:L100 | Parts 1–6 and 16–22 | integrated / supporting view | - Practice, Examination, Challenge modes |
| PRD.md:L101 | Parts 1–6 and 16–22 | integrated / supporting view | - Timer option |
| PRD.md:L103 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-05: Quiz engine |
| PRD.md:L104 | Parts 1–6 and 16–22 | integrated / supporting view | - Question navigation |
| PRD.md:L105 | Parts 1–6 and 16–22 | integrated / supporting view | - Answer selection/input |
| PRD.md:L106 | Parts 1–6 and 16–22 | integrated / supporting view | - Progress display |
| PRD.md:L107 | Parts 1–6 and 16–22 | integrated / supporting view | - Mark for review |
| PRD.md:L108 | Parts 1–6 and 16–22 | integrated / supporting view | - Preserve answers while navigating |
| PRD.md:L109 | Parts 1–6 and 16–22 | integrated / supporting view | - Submit confirmation |
| PRD.md:L110 | Parts 1–6 and 16–22 | integrated / supporting view | - Server-side scoring |
| PRD.md:L111 | Parts 1–6 and 16–22 | integrated / supporting view | - Explanation and result review |
| PRD.md:L113 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-06: Practice Mode |
| PRD.md:L114 | Parts 1–6 and 16–22 | integrated / supporting view | - Optional timer |
| PRD.md:L115 | Parts 1–6 and 16–22 | integrated / supporting view | - Optional immediate feedback |
| PRD.md:L116 | Parts 1–6 and 16–22 | integrated / supporting view | - Explanation after answer |
| PRD.md:L117 | Parts 1–6 and 16–22 | integrated / supporting view | - Retake support |
| PRD.md:L119 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-07: Examination Mode |
| PRD.md:L120 | Parts 1–6 and 16–22 | integrated / supporting view | - Timed assessment |
| PRD.md:L121 | Parts 1–6 and 16–22 | integrated / supporting view | - No correct-answer reveal before submission |
| PRD.md:L122 | Parts 1–6 and 16–22 | integrated / supporting view | - Result after submission |
| PRD.md:L123 | Parts 1–6 and 16–22 | integrated / supporting view | - Save attempt |
| PRD.md:L125 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-08: Challenge Mode |
| PRD.md:L126 | Parts 1–6 and 16–22 | integrated / supporting view | - Higher difficulty |
| PRD.md:L127 | Parts 1–6 and 16–22 | integrated / supporting view | - Mixed topics where selected |
| PRD.md:L128 | Parts 1–6 and 16–22 | integrated / supporting view | - Optional time pressure |
| PRD.md:L129 | Parts 1–6 and 16–22 | integrated / supporting view | - Clear practice-only status |
| PRD.md:L131 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-09: Daily Challenge |
| PRD.md:L132 | Parts 1–6 and 16–22 | integrated / supporting view | - Five to ten questions |
| PRD.md:L133 | Parts 1–6 and 16–22 | integrated / supporting view | - Daily completion tracking |
| PRD.md:L134 | Parts 1–6 and 16–22 | integrated / supporting view | - No fabricated streaks |
| PRD.md:L136 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-10: Attempt history |
| PRD.md:L137 | Parts 1–6 and 16–22 | integrated / supporting view | - Save start/submission timestamps |
| PRD.md:L138 | Parts 1–6 and 16–22 | integrated / supporting view | - Save each answer |
| PRD.md:L139 | Parts 1–6 and 16–22 | integrated / supporting view | - Save score, duration, and counts |
| PRD.md:L140 | Parts 1–6 and 16–22 | integrated / supporting view | - View previous attempts |
| PRD.md:L141 | Parts 1–6 and 16–22 | integrated / supporting view | - Review wrong/unanswered questions |
| PRD.md:L142 | Parts 1–6 and 16–22 | integrated / supporting view | - Retake |
| PRD.md:L144 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-11: Progress dashboard |
| PRD.md:L145 | Parts 1–6 and 16–22 | integrated / supporting view | - Attempts completed |
| PRD.md:L146 | Parts 1–6 and 16–22 | integrated / supporting view | - Average and best score |
| PRD.md:L147 | Parts 1–6 and 16–22 | integrated / supporting view | - Subject performance |
| PRD.md:L148 | Parts 1–6 and 16–22 | integrated / supporting view | - Topic-level strengths and weaknesses |
| PRD.md:L149 | Parts 1–6 and 16–22 | integrated / supporting view | - Recent activity |
| PRD.md:L150 | Parts 1–6 and 16–22 | integrated / supporting view | - Trend only when adequate data exists |
| PRD.md:L152 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-12: Parent information |
| PRD.md:L153 | Parts 1–6 and 16–22 | integrated / supporting view | - Admission overview |
| PRD.md:L154 | Parts 1–6 and 16–22 | integrated / supporting view | - UKKM explanation |
| PRD.md:L155 | Parts 1–6 and 16–22 | integrated / supporting view | - MRSM IGCSE overview |
| PRD.md:L156 | Parts 1–6 and 16–22 | integrated / supporting view | - Cambridge IGCSE information |
| PRD.md:L157 | Parts 1–6 and 16–22 | integrated / supporting view | - Preparation advice |
| PRD.md:L158 | Parts 1–6 and 16–22 | integrated / supporting view | - Challenges and parent support |
| PRD.md:L159 | Parts 1–6 and 16–22 | integrated / supporting view | - Official links and disclaimers |
| PRD.md:L161 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-13: Vocabulary |
| PRD.md:L162 | Parts 1–6 and 16–22 | integrated / supporting view | - Search English–Malay terms |
| PRD.md:L163 | Parts 1–6 and 16–22 | integrated / supporting view | - Definitions and examples |
| PRD.md:L164 | Parts 1–6 and 16–22 | integrated / supporting view | - Subject/topic classification |
| PRD.md:L166 | Parts 1–6 and 16–22 | integrated / supporting view | ### FR-14: Privacy |
| PRD.md:L167 | Parts 1–6 and 16–22 | integrated / supporting view | - Do not publish student records by default. |
| PRD.md:L168 | Parts 1–6 and 16–22 | integrated / supporting view | - Minimise data collection. |
| PRD.md:L169 | Parts 1–6 and 16–22 | integrated / supporting view | - No public child leaderboard with identifiable results. |
| PRD.md:L170 | Parts 1–6 and 16–22 | integrated / supporting view | - Public deployment requires secure authentication and parent/guardian controls. |
| PRD.md:L172 | Parts 1–6 and 16–22 | integrated / supporting view | ## 8. Question bank content requirements |
| PRD.md:L174 | Parts 1–6 and 16–22 | integrated / supporting view | Initial target: |
| PRD.md:L175 | Parts 1–6 and 16–22 | integrated / supporting view | - 100 English |
| PRD.md:L176 | Parts 1–6 and 16–22 | integrated / supporting view | - 100 Mathematics |
| PRD.md:L177 | Parts 1–6 and 16–22 | integrated / supporting view | - 100 Science |
| PRD.md:L178 | Parts 1–6 and 16–22 | integrated / supporting view | - 300 total |
| PRD.md:L180 | Parts 1–6 and 16–22 | integrated / supporting view | Questions must be original, age-appropriate, unambiguous, checked, and linked to learning objectives or an appropriate curriculum reference. |
| PRD.md:L182 | Parts 1–6 and 16–22 | integrated / supporting view | Difficulty: |
| PRD.md:L183 | Parts 1–6 and 16–22 | integrated / supporting view | 1 Easy |
| PRD.md:L184 | Parts 1–6 and 16–22 | integrated / supporting view | 2 Basic |
| PRD.md:L185 | Parts 1–6 and 16–22 | integrated / supporting view | 3 Intermediate |
| PRD.md:L186 | Parts 1–6 and 16–22 | integrated / supporting view | 4 Advanced |
| PRD.md:L187 | Parts 1–6 and 16–22 | integrated / supporting view | 5 Challenge/HOTS |
| PRD.md:L189 | Parts 1–6 and 16–22 | integrated / supporting view | Initial subjects and topics are detailed in `full_prompt.md` and `Task.md`. |
| PRD.md:L191 | Parts 1–6 and 16–22 | integrated / supporting view | Question quality is more important than hitting the count. Report any shortfall honestly. |
| PRD.md:L193 | Parts 1–6 and 16–22 | integrated / supporting view | ## 9. Non-functional requirements |
| PRD.md:L195 | Parts 1–6 and 16–22 | integrated / supporting view | - Responsive at mobile, tablet, and desktop sizes. |
| PRD.md:L196 | Parts 1–6 and 16–22 | integrated / supporting view | - Accessible keyboard and screen-reader interactions. |
| PRD.md:L197 | Parts 1–6 and 16–22 | integrated / supporting view | - Clear typography and contrast. |
| PRD.md:L198 | Parts 1–6 and 16–22 | integrated / supporting view | - Fast local loading. |
| PRD.md:L199 | Parts 1–6 and 16–22 | integrated / supporting view | - Stable database persistence. |
| PRD.md:L200 | Parts 1–6 and 16–22 | integrated / supporting view | - Server-side validation and scoring. |
| PRD.md:L201 | Parts 1–6 and 16–22 | integrated / supporting view | - Parameterised database queries. |
| PRD.md:L202 | Parts 1–6 and 16–22 | integrated / supporting view | - Consistent error handling. |
| PRD.md:L203 | Parts 1–6 and 16–22 | integrated / supporting view | - Maintainable modular code. |
| PRD.md:L204 | Parts 1–6 and 16–22 | integrated / supporting view | - Test coverage for critical workflows. |
| PRD.md:L205 | Parts 1–6 and 16–22 | integrated / supporting view | - No secrets in source control. |
| PRD.md:L207 | Parts 1–6 and 16–22 | integrated / supporting view | ## 10. Success metrics for local MVP |
| PRD.md:L209 | Parts 1–6 and 16–22 | integrated / supporting view | - Learner can create a profile. |
| PRD.md:L210 | Parts 1–6 and 16–22 | integrated / supporting view | - Learner can complete each core subject quiz. |
| PRD.md:L211 | Parts 1–6 and 16–22 | integrated / supporting view | - Completed attempts persist after refresh/restart. |
| PRD.md:L212 | Parts 1–6 and 16–22 | integrated / supporting view | - Scores match server-side answer keys. |
| PRD.md:L213 | Parts 1–6 and 16–22 | integrated / supporting view | - Learner can inspect history and progress. |
| PRD.md:L214 | Parts 1–6 and 16–22 | integrated / supporting view | - Parent and Student Guides are usable and sourced. |
| PRD.md:L215 | Parts 1–6 and 16–22 | integrated / supporting view | - Question bank is quality-checked. |
| PRD.md:L216 | Parts 1–6 and 16–22 | integrated / supporting view | - Critical automated tests pass. |
| PRD.md:L217 | Parts 1–6 and 16–22 | integrated / supporting view | - App starts using documented commands. |
| PRD.md:L219 | Parts 1–6 and 16–22 | integrated / supporting view | Do not use admission success or official examination outcomes as MVP success metrics. |
| PRD.md:L221 | Parts 1–6 and 16–22 | integrated / supporting view | ## 11. Future public-release requirements |
| PRD.md:L223 | Parts 1–6 and 16–22 | integrated / supporting view | Before public release: |
| PRD.md:L224 | Parts 1–6 and 16–22 | integrated / supporting view | - Secure authentication |
| PRD.md:L225 | Parts 1–6 and 16–22 | integrated / supporting view | - Parent/guardian access model |
| PRD.md:L226 | Parts 1–6 and 16–22 | integrated / supporting view | - Parental consent |
| PRD.md:L227 | Parts 1–6 and 16–22 | integrated / supporting view | - Privacy notice and terms |
| PRD.md:L228 | Parts 1–6 and 16–22 | integrated / supporting view | - Data retention and deletion process |
| PRD.md:L229 | Parts 1–6 and 16–22 | integrated / supporting view | - HTTPS |
| PRD.md:L230 | Parts 1–6 and 16–22 | integrated / supporting view | - Rate limiting and abuse controls |
| PRD.md:L231 | Parts 1–6 and 16–22 | integrated / supporting view | - Database backups and restore testing |
| PRD.md:L232 | Parts 1–6 and 16–22 | integrated / supporting view | - Monitoring and incident response |
| PRD.md:L233 | Parts 1–6 and 16–22 | integrated / supporting view | - Production database assessment (likely PostgreSQL for concurrent growth) |
| PRD.md:L234 | Parts 1–6 and 16–22 | integrated / supporting view | - Legal/privacy review appropriate to Malaysian users and children |
| PRD.md:L236 | Parts 1–6 and 16–22 | integrated / supporting view | ## 12. Release scope |
| PRD.md:L238 | Parts 1–6 and 16–22 | integrated / supporting view | ### MVP 1 — Local |
| PRD.md:L239 | Parts 1–6 and 16–22 | integrated / supporting view | - Research |
| PRD.md:L240 | Parts 1–6 and 16–22 | integrated / supporting view | - SPA |
| PRD.md:L241 | Parts 1–6 and 16–22 | integrated / supporting view | - SQLite |
| PRD.md:L242 | Parts 1–6 and 16–22 | integrated / supporting view | - Student profiles |
| PRD.md:L243 | Parts 1–6 and 16–22 | integrated / supporting view | - Question bank |
| PRD.md:L244 | Parts 1–6 and 16–22 | integrated / supporting view | - Three quiz modes |
| PRD.md:L245 | Parts 1–6 and 16–22 | integrated / supporting view | - Attempt history |
| PRD.md:L246 | Parts 1–6 and 16–22 | integrated / supporting view | - Progress dashboard |
| PRD.md:L247 | Parts 1–6 and 16–22 | integrated / supporting view | - Guides and glossary |
| PRD.md:L248 | Parts 1–6 and 16–22 | integrated / supporting view | - Automated tests |
| PRD.md:L250 | Parts 1–6 and 16–22 | integrated / supporting view | ### MVP 2 — Private pilot |
| PRD.md:L251 | Parts 1–6 and 16–22 | integrated / supporting view | - Reviewed content |
| PRD.md:L252 | Parts 1–6 and 16–22 | integrated / supporting view | - Authentication design |
| PRD.md:L253 | Parts 1–6 and 16–22 | integrated / supporting view | - Parent access |
| PRD.md:L254 | Parts 1–6 and 16–22 | integrated / supporting view | - Consent and privacy flows |
| PRD.md:L255 | Parts 1–6 and 16–22 | integrated / supporting view | - Controlled pilot hosting |
| PRD.md:L257 | Parts 1–6 and 16–22 | integrated / supporting view | ### Release 3 — Public community |
| PRD.md:L258 | Parts 1–6 and 16–22 | integrated / supporting view | - Scalable hosting/database |
| PRD.md:L259 | Parts 1–6 and 16–22 | integrated / supporting view | - Operational monitoring |
| PRD.md:L260 | Parts 1–6 and 16–22 | integrated / supporting view | - Backups |
| PRD.md:L261 | Parts 1–6 and 16–22 | integrated / supporting view | - Abuse reporting |
| PRD.md:L262 | Parts 1–6 and 16–22 | integrated / supporting view | - Admin question management |
| PRD.md:L263 | Parts 1–6 and 16–22 | integrated / supporting view | - Public terms/privacy and support processes |

### Input: Rules.md

| Source unit | Section / destination | Disposition | Input text |
|---|---|---|---|
| Rules.md:L1 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | # Rules — IGCSE MRSM Preparation Hub |
| Rules.md:L3 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | These rules are mandatory for all development and content work. |
| Rules.md:L5 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | ## A. Truth and research |
| Rules.md:L7 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 1. Never invent official MARA, MRSM, UKKM, Cambridge, or examination information. |
| Rules.md:L8 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 2. Prefer official primary sources. |
| Rules.md:L9 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 3. Record source title, organisation, URL, access date, and publication/update date where available. |
| Rules.md:L10 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 4. Separate verified facts from general advice and unverified claims. |
| Rules.md:L11 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 5. Do not present a parent-provided date as official without independent confirmation. |
| Rules.md:L12 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 6. Do not conflate UKKM, MRSM programme-specific selection, and Cambridge IGCSE examinations. |
| Rules.md:L13 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 7. Do not claim all MRSM IGCSE cohorts follow identical subject combinations or assessment schedules without evidence. |
| Rules.md:L14 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 8. If a source is unavailable, document the limitation. |
| Rules.md:L15 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 9. Add source links to relevant guide content. |
| Rules.md:L16 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 10. Review research when official information changes. |
| Rules.md:L18 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | ## B. Copyright and question content |
| Rules.md:L20 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 1. Write original practice questions. |
| Rules.md:L21 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 2. Do not bulk-copy or scrape copyrighted Cambridge papers, specimen papers, mark schemes, or third-party question banks. |
| Rules.md:L22 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 3. It is acceptable to study public assessment structures and learning objectives. |
| Rules.md:L23 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 4. Link to official resources rather than reproducing large copyrighted works. |
| Rules.md:L24 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 5. Label the question bank as unofficial original practice. |
| Rules.md:L25 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 6. Never claim original questions are official Cambridge questions. |
| Rules.md:L26 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 7. Every question must have a unique ID and metadata. |
| Rules.md:L27 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 8. Verify the correct answer independently. |
| Rules.md:L28 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 9. Verify all distractors and explanations. |
| Rules.md:L29 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 10. Avoid ambiguous wording and accidental multiple correct answers. |
| Rules.md:L30 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 11. Check mathematical working independently. |
| Rules.md:L31 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 12. Check scientific claims against reliable sources. |
| Rules.md:L32 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 13. Check English grammar, spelling, and usage. |
| Rules.md:L33 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 14. Keep difficulty age-appropriate and explain why a question belongs to its level. |
| Rules.md:L34 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 15. Do not pad question counts with near-duplicates. |
| Rules.md:L36 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | ## C. Educational integrity |
| Rules.md:L38 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 1. This is a practice and learning tool, not an official examination system. |
| Rules.md:L39 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 2. Never guarantee MRSM admission. |
| Rules.md:L40 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 3. Never predict admission chances from practice scores. |
| Rules.md:L41 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 4. Do not describe internal practice labels as official Cambridge grades. |
| Rules.md:L42 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 5. Provide constructive feedback. |
| Rules.md:L43 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 6. Explain mistakes clearly. |
| Rules.md:L44 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 7. Do not shame or rank children publicly. |
| Rules.md:L45 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 8. Subjective writing must not be presented as reliably auto-marked unless a transparent, validated rubric or human review exists. |
| Rules.md:L47 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | ## D. Privacy and child safety |
| Rules.md:L49 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 1. Collect only data necessary for the product. |
| Rules.md:L50 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 2. Use display names by default. |
| Rules.md:L51 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 3. Do not require a child's full legal name, identity number, phone number, or home address. |
| Rules.md:L52 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 4. Treat school name as optional and avoid collecting it unless needed. |
| Rules.md:L53 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 5. Keep student records private. |
| Rules.md:L54 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 6. Never expose individual results publicly by default. |
| Rules.md:L55 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 7. Do not implement a public leaderboard containing identifiable children. |
| Rules.md:L56 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 8. Do not allow access to a student's private records by guessing an ID. |
| Rules.md:L57 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 9. Public release requires a proper parent/guardian access and consent model. |
| Rules.md:L58 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 10. Provide a clear privacy notice and data deletion/retention process before public launch. |
| Rules.md:L59 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 11. Never put real student records, passwords, or tokens into source control or project memory. |
| Rules.md:L61 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | ## E. Security |
| Rules.md:L63 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 1. Validate all user input on the server. |
| Rules.md:L64 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 2. Use parameterised SQL queries. |
| Rules.md:L65 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 3. Escape user-provided content before rendering. |
| Rules.md:L66 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 4. Do not trust scores or correctness values submitted by the browser. |
| Rules.md:L67 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 5. Do not expose correct answers before examination submission. |
| Rules.md:L68 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 6. Prevent duplicate quiz submissions. |
| Rules.md:L69 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 7. Use transactions for attempt persistence. |
| Rules.md:L70 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 8. Keep the SQLite database outside the public static directory. |
| Rules.md:L71 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 9. Keep secrets in environment variables. |
| Rules.md:L72 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 10. Exclude `.env`, databases, backups, and logs from Git. |
| Rules.md:L73 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 11. Apply rate limits and secure headers appropriate to the deployment. |
| Rules.md:L74 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 12. Use HTTPS before public release. |
| Rules.md:L75 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 13. Do not bind the local development server to all network interfaces by default. |
| Rules.md:L76 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 14. Do not deploy publicly without explicit user authorisation. |
| Rules.md:L78 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | ## F. Engineering quality |
| Rules.md:L80 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 1. Inspect files before modifying them. |
| Rules.md:L81 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 2. Preserve existing user work. |
| Rules.md:L82 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 3. Keep code modular and readable. |
| Rules.md:L83 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 4. Document architecture decisions. |
| Rules.md:L84 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 5. Use migrations or versioned schema. |
| Rules.md:L85 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 6. Use database constraints and indexes. |
| Rules.md:L86 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 7. Add tests for critical logic. |
| Rules.md:L87 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 8. Fix failing tests before reporting completion. |
| Rules.md:L88 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 9. Do not leave placeholder buttons or fake features. |
| Rules.md:L89 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 10. Do not claim tests passed unless run. |
| Rules.md:L90 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 11. Do not claim a feature is complete unless verified. |
| Rules.md:L91 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 12. Keep dependencies lean and document major choices. |
| Rules.md:L92 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 13. Use accessible semantic HTML. |
| Rules.md:L93 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 14. Support mobile, tablet, and desktop. |
| Rules.md:L94 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 15. Provide meaningful empty, loading, success, and error states. |
| Rules.md:L96 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | ## G. Workflow |
| Rules.md:L98 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 1. Research first. |
| Rules.md:L99 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 2. Plan before implementing. |
| Rules.md:L100 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 3. Build the local MVP before deployment work. |
| Rules.md:L101 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 4. Complete independent work even if one source or feature is blocked. |
| Rules.md:L102 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 5. Do not ask for approval after every phase. |
| Rules.md:L103 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 6. Ask only when a decision genuinely requires user input or has material irreversible consequences. |
| Rules.md:L104 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 7. Update `Memory.md` after substantial work. |
| Rules.md:L105 | Parts 2–3, 9–10, 15–20 and 22 | integrated / supporting view | 8. Report actual progress and known limitations. |

### Input: Task.md

| Source unit | Section / destination | Disposition | Input text |
|---|---|---|---|
| Task.md:L1 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | # Task Plan — IGCSE MRSM Preparation Hub |
| Task.md:L3 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | Use this file as the implementation checklist. Update task status only when work is actually completed and verified. |
| Task.md:L5 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | Status key: |
| Task.md:L6 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - `[ ]` Not started |
| Task.md:L7 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - `[-]` In progress |
| Task.md:L8 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - `[x]` Completed and verified |
| Task.md:L9 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - `[!]` Blocked / requires decision |
| Task.md:L11 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 0 — Project inspection |
| Task.md:L13 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Inspect `D:\IGCSE` and preserve existing files. |
| Task.md:L14 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Check Windows, Node.js, and npm versions. |
| Task.md:L15 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Check whether Git is initialised. |
| Task.md:L16 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Check available browser/research capabilities. |
| Task.md:L17 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Identify constraints and document decisions. |
| Task.md:L18 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Confirm local server will bind to localhost by default. |
| Task.md:L20 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 1 — Deep research |
| Task.md:L22 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ### Cambridge IGCSE |
| Task.md:L23 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Read official Cambridge IGCSE overview. |
| Task.md:L24 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research Cambridge Upper Secondary. |
| Task.md:L25 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research subject syllabuses and syllabus codes. |
| Task.md:L26 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research assessment objectives and assessment routes. |
| Task.md:L27 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research public specimen/past papers and mark schemes without copying protected content. |
| Task.md:L28 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research examiner reports and learner guides where accessible. |
| Task.md:L29 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research English Language. |
| Task.md:L30 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research Mathematics. |
| Task.md:L31 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research Biology, Chemistry, Physics, and relevant combined science options. |
| Task.md:L32 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Record access dates and source metadata. |
| Task.md:L34 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ### MRSM / MARA |
| Task.md:L35 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research official MRSM Form 1 admission information. |
| Task.md:L36 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research eligibility and application procedure. |
| Task.md:L37 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research current official dates only where published. |
| Task.md:L38 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research UKKM. |
| Task.md:L39 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research programme-specific selection information. |
| Task.md:L40 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research MRSM programme descriptions. |
| Task.md:L41 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research MRSM IGCSE programme. |
| Task.md:L42 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Distinguish verified information from assumptions. |
| Task.md:L43 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Identify unanswered questions and unavailable sources. |
| Task.md:L45 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ### Research documents |
| Task.md:L46 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/research/01-cambridge-igcse.md` |
| Task.md:L47 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/research/02-mrsm-form1-admission.md` |
| Task.md:L48 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/research/03-mrsm-igcse-programme.md` |
| Task.md:L49 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/research/04-ukkm-and-selection-assessment.md` |
| Task.md:L50 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/research/05-examination-preparation-strategy.md` |
| Task.md:L51 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/research/06-question-bank-research.md` |
| Task.md:L52 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/research/07-sources-and-verification.md` |
| Task.md:L54 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 2 — Product and architecture planning |
| Task.md:L56 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Confirm information architecture and user journeys. |
| Task.md:L57 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Confirm database schema. |
| Task.md:L58 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Confirm API contract. |
| Task.md:L59 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Define question data format. |
| Task.md:L60 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Define quiz scoring rules. |
| Task.md:L61 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Define student profile and privacy model for local MVP. |
| Task.md:L62 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Define test strategy. |
| Task.md:L63 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Record deviations in `Architecture.md`. |
| Task.md:L65 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 3 — Project foundation |
| Task.md:L67 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create `package.json`. |
| Task.md:L68 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Configure Express. |
| Task.md:L69 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Configure environment variables. |
| Task.md:L70 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create `.gitignore`. |
| Task.md:L71 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create static frontend hosting. |
| Task.md:L72 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create health endpoint. |
| Task.md:L73 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Add consistent error handling. |
| Task.md:L74 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Add security middleware appropriate for local development. |
| Task.md:L75 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Confirm `npm run dev` works. |
| Task.md:L77 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 4 — Database and API |
| Task.md:L79 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create SQLite connection layer. |
| Task.md:L80 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create migration/versioning mechanism. |
| Task.md:L81 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create students table. |
| Task.md:L82 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create subjects and topics tables. |
| Task.md:L83 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create questions and options tables. |
| Task.md:L84 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create quiz and quiz-question tables. |
| Task.md:L85 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create attempts and answer tables. |
| Task.md:L86 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create progress table. |
| Task.md:L87 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create daily challenge table. |
| Task.md:L88 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Add indexes and foreign keys. |
| Task.md:L89 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement student endpoints. |
| Task.md:L90 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement subject/topic endpoints. |
| Task.md:L91 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement question endpoints. |
| Task.md:L92 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement quiz start endpoint. |
| Task.md:L93 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement server-side scoring and submission. |
| Task.md:L94 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement attempt history endpoint. |
| Task.md:L95 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement dashboard endpoint. |
| Task.md:L96 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Add input validation and access checks. |
| Task.md:L97 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Test persistence after server restart. |
| Task.md:L99 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 5 — Frontend shell and design system |
| Task.md:L101 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Create SPA shell and navigation. |
| Task.md:L102 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement responsive layout. |
| Task.md:L103 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement typography, colour, spacing, and component tokens. |
| Task.md:L104 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement reusable cards, buttons, tabs, modals, and alerts. |
| Task.md:L105 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement accessible focus and keyboard states. |
| Task.md:L106 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement loading, empty, error, and success states. |
| Task.md:L107 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Test mobile and desktop layouts. |
| Task.md:L109 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 6 — Main pages/tabs |
| Task.md:L111 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Home dashboard. |
| Task.md:L112 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Student profile creation/selection. |
| Task.md:L113 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Quiz setup. |
| Task.md:L114 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Quiz screen. |
| Task.md:L115 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Question bank and filters. |
| Task.md:L116 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Results and review. |
| Task.md:L117 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Progress dashboard. |
| Task.md:L118 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Attempt history. |
| Task.md:L119 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Student Guide. |
| Task.md:L120 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Parent Guide. |
| Task.md:L121 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Searchable English–Malay glossary. |
| Task.md:L122 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] FAQ. |
| Task.md:L123 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] About and independence disclaimer. |
| Task.md:L125 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 7 — Original question bank |
| Task.md:L127 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | Target: |
| Task.md:L128 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] English: 100 validated questions. |
| Task.md:L129 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Mathematics: 100 validated questions. |
| Task.md:L130 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Science: 100 validated questions. |
| Task.md:L132 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | For each question: |
| Task.md:L133 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Unique ID. |
| Task.md:L134 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Correct subject/topic. |
| Task.md:L135 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Difficulty 1–5. |
| Task.md:L136 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Correct type and answer schema. |
| Task.md:L137 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Clear question wording. |
| Task.md:L138 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Valid answer/options. |
| Task.md:L139 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Explanation. |
| Task.md:L140 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Learning objective. |
| Task.md:L141 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Estimated time. |
| Task.md:L142 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Source/curriculum alignment note. |
| Task.md:L143 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Duplicate check. |
| Task.md:L144 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Independent answer verification. |
| Task.md:L145 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Review status set correctly. |
| Task.md:L147 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | Do not publish draft or unreviewed questions to students. |
| Task.md:L149 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 8 — Quiz modes |
| Task.md:L151 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Practice Mode. |
| Task.md:L152 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Examination Mode. |
| Task.md:L153 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Challenge Mode. |
| Task.md:L154 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Daily Challenge. |
| Task.md:L155 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Question randomisation. |
| Task.md:L156 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Safe option randomisation. |
| Task.md:L157 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Timer. |
| Task.md:L158 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Navigation. |
| Task.md:L159 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Mark for review. |
| Task.md:L160 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Answer persistence during quiz. |
| Task.md:L161 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Submit confirmation. |
| Task.md:L162 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Server-side scoring. |
| Task.md:L163 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Result explanations. |
| Task.md:L164 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Retake. |
| Task.md:L165 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Duplicate submission protection. |
| Task.md:L167 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 9 — Analytics and parent support |
| Task.md:L169 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Total quiz count. |
| Task.md:L170 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Average score. |
| Task.md:L171 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Best score. |
| Task.md:L172 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Subject performance. |
| Task.md:L173 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Topic strength/weakness. |
| Task.md:L174 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Recent attempts. |
| Task.md:L175 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Score trend with sufficient data. |
| Task.md:L176 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Recommendations based on actual weaknesses. |
| Task.md:L177 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Parent-friendly progress summary. |
| Task.md:L178 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] No public exposure of child results. |
| Task.md:L180 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 10 — Quality assurance |
| Task.md:L182 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Server startup test. |
| Task.md:L183 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Database migration test. |
| Task.md:L184 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Student creation test. |
| Task.md:L185 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Question retrieval test. |
| Task.md:L186 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Quiz creation test. |
| Task.md:L187 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Correct answer scoring test. |
| Task.md:L188 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Incorrect answer scoring test. |
| Task.md:L189 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Unanswered question test. |
| Task.md:L190 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Attempt persistence test. |
| Task.md:L191 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Duplicate submission test. |
| Task.md:L192 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Invalid input test. |
| Task.md:L193 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Access control test. |
| Task.md:L194 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Dashboard calculation test. |
| Task.md:L195 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Full English quiz workflow. |
| Task.md:L196 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Full Mathematics quiz workflow. |
| Task.md:L197 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Full Science quiz workflow. |
| Task.md:L198 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Refresh/restart persistence check. |
| Task.md:L199 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Mobile viewport checks at 360px, 390px, 768px, 1024px, and desktop. |
| Task.md:L200 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Keyboard accessibility smoke test. |
| Task.md:L201 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Fix all critical defects. |
| Task.md:L203 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 11 — Documentation |
| Task.md:L205 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `README.md` |
| Task.md:L206 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/PROJECT_OVERVIEW.md` |
| Task.md:L207 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/RESEARCH_METHODOLOGY.md` |
| Task.md:L208 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/architecture/SYSTEM_ARCHITECTURE.md` |
| Task.md:L209 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/architecture/DATABASE_SCHEMA.md` |
| Task.md:L210 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/architecture/API_REFERENCE.md` |
| Task.md:L211 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/QUESTION_BANK_GUIDELINES.md` |
| Task.md:L212 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/PRIVACY_AND_SECURITY.md` |
| Task.md:L213 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/LOCAL_DEVELOPMENT.md` |
| Task.md:L214 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `docs/FUTURE_DEPLOYMENT.md` |
| Task.md:L215 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Update `Memory.md`. |
| Task.md:L217 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Phase 12 — Local MVP acceptance |
| Task.md:L219 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Research is documented with sources. |
| Task.md:L220 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Verified facts and unverified items are clearly distinguished. |
| Task.md:L221 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] All three core subjects are usable. |
| Task.md:L222 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Question bank count and review status are reported honestly. |
| Task.md:L223 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Quiz modes work. |
| Task.md:L224 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Profiles persist. |
| Task.md:L225 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Attempts persist. |
| Task.md:L226 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Dashboard reflects saved data. |
| Task.md:L227 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Guides and glossary work. |
| Task.md:L228 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Responsive design works. |
| Task.md:L229 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Critical tests pass. |
| Task.md:L230 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] `npm run dev` starts successfully. |
| Task.md:L231 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Local URL works. |
| Task.md:L232 | Parts 12–14 and 22; Task.md detailed roadmap | retained exact (master L1354) | - [ ] No public deployment has occurred. |
| Task.md:L234 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | ## Future phase — public pilot (not part of local MVP) |
| Task.md:L236 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Design secure authentication. |
| Task.md:L237 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement parent/guardian relationship and access. |
| Task.md:L238 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement parental consent. |
| Task.md:L239 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Publish privacy notice and terms. |
| Task.md:L240 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Implement data export/deletion. |
| Task.md:L241 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Review Malaysian privacy/legal obligations. |
| Task.md:L242 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Choose production database. |
| Task.md:L243 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Configure HTTPS and secure hosting. |
| Task.md:L244 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Configure backups and restore tests. |
| Task.md:L245 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Configure monitoring, rate limits, and abuse controls. |
| Task.md:L246 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Conduct security review. |
| Task.md:L247 | Parts 12–14 and 22; Task.md detailed roadmap | integrated / supporting view | - [ ] Obtain explicit user approval before deployment. |

## Validation record

- Available baseline: 1,370 input lines; every nonblank line accounted for. Four execution/workspace statements were refined explicitly; all other baseline nonblank lines remain verbatim in the master.
- Input inventory: 2158 nonblank source units across all eight input Markdown documents, with source text and disposition.
- Original prompt SHA-256 and legacy HTML SHA-256 match the preserved input bytes.
- All seven companion documents identify `full_prompt.md` as authoritative and state the documentation-only boundary.
- Original subject lists retain 17 English, 20 Mathematics and 25 Science entries; all six sample questions and original document/API/schema examples remain.
- Markdown local links, required sections, original archive retention and implementation-file absence are checked after writing; failures must be fixed before delivery.
- No application tests were run, and no runtime, package installation, database, local server or deployment was created by this work.

## Subsequent evidence - supplied Gemini PDF

After completion of the baseline consolidation, the user supplied a 16-page research PDF at `docs/gemini/Kajian Kemasukan MRSM IGCSE.pdf`. It is a secondary research dossier, not a second original/latest project prompt. The historical input manifest and 2,158-unit index above remain the record of the original consolidation inputs. The subsequent PDF review and claim dispositions are in [08-gemini-report-review.md](../research/08-gemini-report-review.md); `full_prompt.md` Part 17.3 and all seven supporting files now reflect that intake. No original requirements or archive bytes were removed, and no application implementation was started.

## Subsequent activation and implementation

The user subsequently authorised research/local development. The app is now implemented with original scope retained; README, Task.md and docs/VALIDATION.md record actual checks and remaining work. Later private candidate evidence and the 100-term glossary request are documented separately and do not rewrite the historical input manifest. The original prompt archive and legacy HTML remain unchanged. Public deployment is still gated.
