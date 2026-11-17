# Firebase pivot validation ? 15 November 2026

The former 16 Express/SQLite tests and old browser suite are historical evidence only, archived in .local/archive/document-history/pre-firebase/VALIDATION.md and .local/archive/legacy/express-sqlite. They do not certify Firebase.

## Executed Firebase checks

- `npm test`: 8/8 pass. Text variants/blanks, numeric tolerance/finite input, option ID marking, first checked Practice answer, expired timer/unanswered, average/count/daily rewards, empty stats and Malaysia date boundary.
- `npm run check:content`: pass; 300 original questions, 100 per subject, 62 topics, seven answer types; public JSON identical to retained authoring source.
- `npm run test:rules`: 17 actual emulator assertions passed with rules-unit-testing and Firestore emulator1.22.0, including unauthenticated/cross-owner denial, owner query scope, immutable attempt, deterministic transaction read/create/retry, score bounds and owner deletion. Expected PERMISSION_DENIED log entries are negative-test success, not app failures.
- Isolated Chrome with real Firebase Web SDK connected to Auth/Firestore demo emulators: profile creation; English/Mathematics/Science quiz submission; deterministic retry; reload; Dashboard three saved attempts and per-subject counts; profile/attempt deletion; support QR modal/Tutup; responsive desktop1440x1000 and mobile390x844; no horizontal overflow or app/runtime/console errors. Screenshots in OS temp, not served or committed. Visual inspection confirms BM UI/English subject names, responsive layout and footer spacing.
- Original prompt SHA256 unchanged: 6b755c83a9b3a2f0d2df755bdd62d7fa9032b84663967210ba76507db914226b. Original HTML prototype unchanged: 6313db4a0d8cd905d637940e36640263b3ba5f7a783f84ea31d2ff319d1dc7df.

## Real Firebase setup and verification

The supplied Web App config is installed; Analytics deliberately not initialized. Existing CLI login and access to kuiz-igcse verified. User enabled Anonymous Authentication after the initial auth/configuration-not-found check. Reviewed Firestore rules/indexes compiled and were deployed successfully to kuiz-igcse. Firebase Hosting was subsequently deployed with explicit user authorization; see the live Hosting verification below.

The CLI discovered Firestore API/database were not yet created despite local initialization. The deploy enabled the API and automatically created the default Standard/Native free-tier database at location nam5. No old database or data was deleted/migrated. PITR and delete protection are currently disabled. This actual region must be reviewed before broader real-child usage; do not silently recreate a database or promise Malaysia data residency.

**REAL kuiz-igcse end-to-end PASS.** Initial connection immediately after database creation returned permission-denied; retry after propagation succeeded. A synthetic nickname profile and three single-question quizzes were saved through the actual Web SDK and deployed rules. Deliberately correct English/Mathematics and incorrect Science produced per-subject 100/100/0 and average 66.6667 across exactly3 attempts after reload. Direct repository transaction retries returned existing results without duplication. Owner profile/attempt deletion and temporary Auth user deletion succeeded. Desktop/mobile, QR modal and console checks passed. Test used localhost static frontend with REAL cloud Firestore, not a hosted deployment. Evidence screenshots: OS-temp igcse-firebase-ui-aBhkd9 (desktop-progress.png/mobile-home.png). Failed pre-propagation probes may have created unused Anonymous identities without learner records; no unknown account is deleted automatically.

## Test environment and limits

Node24.20.0, modular SDK13.3.0, Firebase CLI15.36.0, Java21, installed Chrome via playwright-core1.64.1. Host-managed browser attachment was unavailable (Chrome/browser UI state acquisition failed in the prior session); isolated Playwright fallback uses a fresh profile with reviewed process permission, never user's Chrome cookies. Screenshots are saved under OS temp. Static dev host http://localhost:3000; demo emulators Auth9099/Firestore8080, all loopback.

Development-only npm audit: high-severity gRPC dependency patched through a compatible override. 14 moderate transitive Firebase CLI advisories remain; no npm production dependencies are shipped to Hosting (browser uses pinned official CDN modules). Do not run audit --force to downgrade Firebase/tooling blindly. Recheck before future dependency upgrades.

Pending: independent educator moderation, large-history pagination/aggregation, cross-device/recovery accounts, offline sync, cloud backup restore drills/retention and public release privacy/security/accessibility review. Client grading/timers are deliberately not tamper-proof. Current tests do not verify every educational answer or establish official MRSM exam format.


## Live Firebase Hosting verification - 15 November 2026

User explicitly asked the agent to publish after reviewing Hosting steps. `firebase deploy --only hosting --project kuiz-igcse --non-interactive` completed: 16 public files uploaded, version finalized and release completed. Live URL: https://kuiz-igcse.web.app. No private docs, candidate slips, SQLite data or credentials were in the Hosting directory.

Live-site end-to-end PASS using TEST_REAL_FIREBASE=1 and TEST_BASE_URL=https://kuiz-igcse.web.app with scripts/firebase-ui-check.js. Isolated Chrome (fresh profile; prior host-managed browser attachment unavailable) created a synthetic nickname, completed English/Mathematics/Science, saved scores/answers to real Firestore, retried immutable attempt transactions, reloaded and verified exactly3 attempts with average66.6667 and subject accuracy100/100/0. Profile and attempts deleted; temporary Auth user deleted. Desktop1440x1000 and mobile390x844 checked; support QR modal/Tutup and no horizontal overflow passed; no relevant console/runtime errors. Screenshot evidence: OS-temp igcse-firebase-ui-L5pcoa/desktop-progress.png and mobile-home.png. Screenshot review confirms readable Dashboard and mobile home/footer. Original prompt SHA256 unchanged.

Live publication does not complete the documented longer-term educator moderation, linked-account recovery, backup/restore, retention and scaling work. Anonymous access remains browser/site-specific; localhost profiles do not automatically transfer to the Hosting origin.


Malay title update: live Hosting now uses MRSM – Persediaan Ujian IGCSE (tab), MRSM / Persediaan Ujian IGCSE (sidebar) and MRSM IGCSE (compact mobile header). Isolated Chrome checks passed at desktop1440 and mobile390: title/text assertions, menu open, no horizontal overflow or runtime errors. Screenshot reviewed: OS-temp igcse-malay-title.png. Temporary test Auth identity removed. No scoring/data changes.


Disclaimer copy update: user-supplied PENAFIAN text replaces the previous affiliation wording verbatim in the permanent footer and About. Full text remains visible on desktop/mobile. Published Hosting and checked at1440x1000,390x844,360x600: exact footer text, no horizontal overflow, measured main padding covers footer height, quiz start button stays above footer. Screenshot360 visually reviewed (OS-temp igcse-disclaimer-360.png). About and support QR modal open/Tutup passed on360px. An initial probe selector had a PowerShell Unicode coffee-symbol mismatch; selector-based follow-up passed.


## Quiz auto-review and failed-submit regression - 15 November 2026

Reproduced the reported save failure before changing rules: a valid9/10 result with one unanswered question was denied. The original rule divided two integers before multiplying100; integer division truncated partial scores. Original integration tests only submitted one-question0/100 results, missing this case. Changed score validation to floating-point arithmetic with0.000001 percentage-point tolerance; ownership, immutable attempts and range/count checks remain. 31 emulator rules assertions now pass, including9/10,7/10,2/3,1/8,all blank,full marks and inconsistent-score rejection.

Removed the manual review checkbox. Semak jawapan immediately makes the navigation number gold, persists the flag and preserves the first checked answer. Blank check clicks still flag the question and request an answer. Flags persist next/back/refresh and in finalized snapshots. Submission now has a busy label, visible inline modal error and retry control; deterministic ID and an in-flight guard prevent duplicate results. Cloud acknowledgement is bounded at20seconds; timeout does not cancel a possibly committing transaction, so retry always uses the same ID.

New meaningful regression command: npm run test:quiz-review. Isolated Chrome against demo Firebase emulators passed10 questions,10 flags,1 unanswered,first-checked-answer preservation after editing,next/back/reload,gold computed background,visible offline submission error,online retry with exactly one90% result,Firestore-derived Dashboard and mobile result reload/no overflow. Evidence in OS-temp igcse-review-eoRQEw: gold-navigation.png,visible-submit-error.png,mobile-saved-result.png. First two screenshots visually reviewed; inline error is visible inside the native modal. Temporary learner data removed. Eight existing engine tests also pass.


Live verification of the auto-review/submit fix: reviewed rules and3 changed frontend modules deployed successfully to kuiz-igcse. TEST_REAL_FIREBASE=1 TEST_BASE_URL=https://kuiz-igcse.web.app npm run test:quiz-review passed the same10-question/10-flag/1-unanswered90% scenario, visible offline error and successful retry, first-answer preservation, next/back/refresh flag persistence, exactly one attempt, reload and mobile result layout. OS-temp evidence igcse-review-dKOr4t. Synthetic profile/attempts and temporary Auth user removed. No existing family records were edited or deleted. Original prompt hash unchanged. Existing in-progress local drafts remain compatible; reload the same browser/origin and resume rather than clearing site data.


Chrome translation update: live root lang=ms, translate=no, class=notranslate and Google notranslate meta verified in Pixel7-emulated Chrome. English question inherits translate=false. Chromium official design documentation confirms the page-level meta opt-out. Actual Android native browser chrome/prompt was not directly tested; user/browser overrides remain outside SPA control. No site data clearing is needed.


Simpan QR update: published the same-origin PNG download link beside Tutup in the support modal. Live isolated Chrome checks passed360x600 and1440x1000, including side-by-side controls, both in viewport, no horizontal overflow/runtime errors, suggested filename QR-Sumbangan-MRSM-IGCSE.png, actual downloaded bytes identical to the original public QR, modal remains open after download, and Tutup/Escape still dismiss. Mobile screenshot visually reviewed in OS-temp igcse-simpan-qr-mobile.png; desktop image also captured. Anonymous test identity removed. Donation message and QR image unchanged.


Documentation release reconciliation: all eight main documents (authoritative full_prompt.md and seven companions), README and active Firebase/overview/local/deployment documents now explicitly reflect the published MVP, current UI wording/disclaimer, no-translation directives, Simpan QR, automatic review and partial-score submission fix. Historical architecture/test records remain labelled; no open educator/privacy/recovery/backup tasks were falsely marked complete. Full original requirements retained.


## Private feedback implementation - 15 November 2026

Footer Maklum Balas opens a mobile-responsive private form. Anonymous users can submit category, optional nickname and5-2000-character comments without creating a learner profile. Comments are never rendered publicly. Rules deny all web-client feedback get/list/update/delete, including the sender; authorised project maintainers use Console/IAM to read/manage feedback. An atomic content-free receipt enforces one submission per UID per60seconds and makes acknowledgement retry idempotent. No client admin password/UID or privileged credential is shipped. Receipt content is only submissionId and lastSubmittedAt; sender may read its own receipt only. No email, contact, student ID or quiz ID is included.

23 new actual emulator rules checks passed (privacy,validation,ownership,atomicity,cooldown). Existing31 score/owner rules checks passed. New npm run test:feedback:ui passed against real Web SDK plus demo emulators: form submission, sender get/list denial, privileged read of exact synthetic message, same-ID receipt retry, second-send cooldown error with retained input, mobile390/desktop1440 layout and footer padding, no runtime errors. Evidence OS-temp igcse-feedback-me39ds; mobile form screenshot visually reviewed. Synthetic feedback and receipt removed through test-admin access. Existing10-question review/submit/offline-retry regression also passed after footer addition (igcse-review-xLsVOg).

Admin instructions: docs/FEEDBACK_ADMIN.md. A60-second per-UID limit does not prevent distributed anonymous spam; stronger abuse/App Check/cost monitoring remains open. Feedback drafts are module-memory only. Comments are separate admin-managed records and are not automatically included in learner profile export/deletion; retention/admin deletion remains manual and documented. Live deployment/test result follows below.


Private feedback LIVE PASS: deployed Hosting17 files plus reviewed rules/indexes. TEST_REAL_FIREBASE=1 TEST_BASE_URL=https://kuiz-igcse.web.app npm run test:feedback:ui passed real form creation; sender get/list denied; existing CLI/IAM project admin read only the exact synthetic fixture; same-receipt retry;60-second cooldown retains text; mobile390/desktop1440 and footer padding; no runtime errors. Evidence OS-temp igcse-feedback-UjDVkW. Fixture comment, receipt and temporary Auth identity removed. No existing user data was read or deleted. Main prompt and all seven companions plus schema/API/security/admin docs updated. Original prompt SHA unchanged.


## Professional PDF report export - 15 November 2026

Four pure report-model tests passed: accurate equal-attempt mean versus per-subject accuracy, empty/null statistics, source snapshot immutability and explicit cross-learner rejection. Browser emulator checks passed real Firestore selected-profile export for six synthetic attempts, preserved JSON .local/data/answers and sibling isolation. A blocked font request produced a visible inline error; unblocking permitted retry and download. Desktop1440 and mobile390 downloads work without runtime errors/overflow. Optional long profile fields and Chinese/Tamil names are preserved using local glyph rendering when needed.

PDF QA via pypdf/PyMuPDF: six-attempt report2 A4 pages and62.5% mean; empty report1 page with no fake marks;120-attempt stress report9 pages with all120 numbered history rows. Page counters,privacy/disclaimer,selected-learner isolation and page text bounds passed. Rendered cover,detail,empty,long-name and last stress pages visually inspected. A single-line orphan trailing note found during initial review was removed; regenerated final2-page report passed. Noto fonts embedded and local jsPDF4.2.1 used. No student data sent to external PDF services. Synthetic preview docs/examples/Contoh-Laporan-Prestasi.pdf clearly marked CONTOH - DATA REKAAN; no real-child report was generated. Temporary test profiles/attempts removed. Commands and licenses documented in docs/REPORT_EXPORT.md. Live deployment verification follows.


PDF export LIVE PASS: Firebase Hosting published23 static files. TEST_REAL_FIREBASE=1 TEST_BASE_URL=https://kuiz-igcse.web.app npm run test:report:ui passed selected/sibling isolation, six stored synthetic attempts,62.5% mean, blocked-font error and retry, PDF/JSON downloads, mobile390px, empty/long/multilingual/120-attempt rendering. Both synthetic profiles, attempts and temporary Auth identity were deleted. Final regenerated live PDFs passed pypdf/PyMuPDF verification:2-page summary,1-page empty,9-page stress with all120 rows, A4 bounds and counters. Final example is explicitly synthetic. No real family records or feedback were accessed. Main prompt, all seven companions, README, report/export/privacy/API/architecture documentation and Task.md were updated; original prompt hash unchanged.


## Fresh repository cleanup verification - 15 November 2026

Reorganised project/architecture/operations/features/content/research/testing documentation and scripts/dev,qa,validate plus tests/unit,rules. Replaced repetitive companion status blocks with scoped current views; root full_prompt.md retains the complete available educational specification. Original1370-line prompt/prototype moved into docs/archive with unchanged SHA256; .gitattributes preserves original bytes in Git. Public requirement inventory remains historical provenance. Private candidates/raw Gemini dossier,old SQLite/backend/document copies,source duplicates,caches,logs and generated QA files moved into ignored .local,not deleted or included in public source.

public/questions.json is now the single bank. Unit imports,QA CLI helper paths,PDF scratch outputs,npm scripts and all current Markdown links/case were updated. Safe postinstall/setup creates a local Firebase config only when absent; the existing working config was preserved. The real Web config is ignored,with a committed public example. No application JS/CSS/HTML runtime behavior or live Firebase deployment was changed by cleanup.

Passed12 unit tests,300-question validation,current-document link/case validation,repository publication checks and the CI-equivalent demo Firestore emulators:exec command with31 owner/score+23 feedback assertions. The CI template is pinned to official release commits and uses Node24/Java21 with demo emulators; no deployment secrets or live-cloud actions. GitHub refused the initial workflow push because the OAuth token lacks workflow scope. The workflow is retained as inactive docs/testing/ci-template.yml; no remote CI success is claimed.


## Optional Analytics preparation - 16 November2026

Linked GA4 property564419858 / stream16345584767 and registered Measurement ID G-F9W4PLD4G9 were confirmed; no Web API key was printed or committed. Frontend integration remains analyticsConfig.enabled=false pending owner confirmation of Enhanced Measurement OFF. No Hosting deployment or live collection/Realtime-ingestion success is claimed for this preparation stage.

Five new consent/event policy tests passed,bringing unit checks to17. Mocked Analytics browser test passed unknown/deny/reload with zero Analytics SDK imports,explicit allow,ad-denied configuration,private-field/URL/title/referrer stripping,withdrawal without clearing essential cookies or Firebase owner identity,cross-tab denial and360/390px layouts. Screenshot mobile-privacy.png under OS-temp igcse-analytics-qipBba was visually reviewed. Google Analytics transport was mocked in this suite. Existing10-question/90% review-submit/offline-retry regression also passed with optional measurement off (igcse-review-V50qxE).

A separate controlled real Firebase Analytics/gtag test used an isolated synthetic Anonymous identity. All Google collection requests were intercepted and fulfilled locally,not sent to Google:2 collection requests included controlled page_view and batched quiz_complete/report_export events,correct Measurement ID and no planted private ID/name/title/filename markers. The temporary Firebase Auth identity was deleted. This proves SDK/transport payload construction,not GA4 server ingestion or that all Enhanced Measurement settings are disabled. The owner subsequently confirmed Enhanced Measurement OFF; this test itself does not inspect Console settings. No real learner records/comments were read or modified.

Basic opt-in loads neither Analytics SDK nor gtag for unknown/declined choices; any essential Auth/Firestore requests remain separate. No pre-consent backlog is replayed. See docs/features/ANALYTICS.md for exact privacy scope and activation steps. Historic no-Analytics evidence elsewhere describes earlier published releases.


### Activation release -16 November2026

Owner explicitly confirmed Enhanced Measurement OFF. Production config enabled with individual opt-in still required. All17 unit tests,300-question validation,current docs validation and repository publication check passed. The repository check initially fell back to scanning ignored local logs under the restricted subprocess environment; rerunning with Git access passed102 tracked source paths. Firebase CLI Hosting-only deployment completed successfully at https://kuiz-igcse.web.app; Firestore rules/data were unchanged. Google signals Console state remains unverified; signals/advertising are disabled by client configuration. GA4 Realtime ingestion is not yet verified. GTM-NLDNMRSF supplied later is a separate Tag Manager container and was not installed alongside the existing Firebase Analytics tag,avoiding duplicate tracking and an extra consent path.

Deployed live browser check at390x844 passed: correct page identity,meaningful hero/modal content,no framework overlay or page errors,enabled config,zero Analytics imports/collection before consent,one SDK import and two intercepted collection requests after explicit allow,successful withdrawal. Collection requests were fulfilled locally and not sent to Google. Screenshot reviewed at OS temp igcse-live-analytics-mobile.png. Only a synthetic Anonymous identity was created and deleted; no learner/feedback records were touched. Existing isolated Playwright fallback used because host-managed browser attachment failed in the earlier QA session. This is mobile emulation,not physical Android evidence.


Consent status follow-up:fixed the modal current-choice label remaining Belum dipilih after a successful allow/deny. Existing mocked Analytics browser suite passed with explicit Diizinkan/Ditolak label assertions; consent policy remains opt-in. An initial new assertion was misplaced before opening the modal and timed out; corrected the test interaction order and reran successfully.


First-visit popup follow-up:existing mocked Analytics browser suite passed the automatic initial popup,zero pre-consent imports,Nanti dismissal with no consent,re-prompt after reload when undecided,Tolak save/no re-prompt,allow directly from popup and no re-prompt after saved allow. Existing filtering,withdrawal and cross-tab checks also passed.17 unit checks passed. The first added final reload assertion initially retained the synthetic session route,so the home-hero assertion timed out; reset the test route and reran successfully.390px first-visit screenshot reviewed in OS temp igcse-analytics-0Utluc/first-visit-popup.png. This is browser emulation with mocked Analytics,not GA4 ingestion or physical Android evidence.


## Learning-engine upgrade -17 November2026

26/26 unit tests passed,including9 new tests for unseen priority,due versus recent errors,latest-correction removal,learner isolation,subject/Level balance,capacity redistribution/oldest fallback,unique/repeat/blank denominators,minimum-unique topic evidence and empty states.300-question content validation passed without changing the bank. An initial floating-point assertion was corrected to use a tolerance.

The demo-emulator selection browser suite passed:3 due+7 unseen after a backdated10-item blank attempt;17 unique IDs and3 repeats after the next saved attempt;7 first-encounter correct and100% repeat accuracy;10 blanks;no sibling history leakage;mixed12-item4/4/4 subject counts;unchanged shared Daily sets;Dashboard reload and390px no horizontal overflow. Desktop/mobile screenshots were reviewed in OS temp igcse-selection-r835rI. Setup initially lacked a running static server; early fixture navigation also needed a profile-bootstrap reload. Browser validation exposed an encoded separator issue in new UI text; fixed it and the test assertion,then reran successfully. Failed disposable-emulator runs may retain synthetic fixtures; no real learner/cloud data was read or changed. Host browser structured access remained unavailable,so existing isolated Playwright QA was used. Emulation does not prove physical Android behavior.

Existing quiz-review browser regression passed:gold flags,Next/Back/refresh,first checked answer,10 flags/one blank,visible offline error,retry saves one90% attempt,and mobile checks. PDF/JSON browser regression passed including learner isolation,font retry,mobile downloads,empty/multilingual/long-name/120-attempt reports. PDF structure/bounds checks passed:two-page standard/mobile,one-page empty and nine-page stress reports;updated focus explanation rendered and visually reviewed.

No new collection,Firestore rule/index,Authentication setting,Analytics event or privileged credential is introduced. Each non-Daily start now reads that learner's completed history;large-history cost/scaling remains open. Scheduling defaults are product choices,not scientifically calibrated assessments or official admission procedures.


Hosting-only publication completed successfully. HTTP SHA-256 checks confirmed question-selection.js,quiz-engine.js,api.js,app.js and report.js exactly match the tested local source. Content/current-doc/staged-repository checks passed;the immutable provenance checksums remain intact. No production learner writes were used for deployment verification. Companion docs,Task.md and the synthetic PDF example were updated.

Separate Analytics follow-up:owner-authorised read-only Console Home inspection on17 November2026 showed populated usage metrics and a populated realtime card,confirming actual GA4 ingestion beyond prior intercepted transport tests. Private aggregate counts/screenshots were not committed. Property privacy settings were not changed or independently reverified.


## Dashboard and glossary release -17 November2026

29/29 unit tests passed. New checks cover180 distinct complete bilingual entries and valid categories,deterministic daily-term bounds,and mode-specific equal-quiz means with distinct wrong/blank counts and null empty states. Original300-question content validation passed with no question-bank edits. Current-document link/case validation passed47 documents.

Extended disposable demo-emulator browser workflow passed all prior selection/history checks plus Dashboard Istilah Hari Ini hero and next-session area,per-mode mean,next-term content change with button focus preserved,all180 glossary rows,Refraction/Pembiasan search,combined Mathematics/category empty result,serenjang/Perpendicular search,Home callout and glossary deep link. No page runtime errors;1440px desktop and390px Dashboard/360px glossary screenshots reviewed at OS temp igcse-selection-BJRqml. The existing host structured-browser blocker remains,so isolated Playwright regression was used;physical Android behavior is not claimed. Test fixtures are synthetic and cleaned on successful completion;no real child records were accessed.

The existing mocked Analytics UI regression also passed:default/deny/reload import gate,first-visit choices,allow,filtering,withdrawal,cookies,cross-tab and360/390px checks. No new Analytics event or consent change was added. English-BM glossary definitions/examples are original editorial teaching content;Cambridge command-word and NZ Curriculum mathematics references were checked17 November2026. No independent educator/translation moderation is claimed.


Dashboard/glossary Hosting-only deployment completed. HTTP SHA-256 comparisons verified the live glossary-spotlight.js,guides.js,app.js,quiz-engine.js and style.css match the tested source. Staged repository scan passed109 source paths with original archive checksums intact and private/generated files excluded. Source and all seven project companion documents,full_prompt.md,Task.md,the feature guide and validation records were updated together. No production learner records were written for verification.
