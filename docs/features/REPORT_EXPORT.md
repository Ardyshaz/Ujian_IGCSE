# Professional PDF report export

In Profil pelajar keluarga, select the learner, then Eksport Laporan (PDF). The browser downloads Laporan-Prestasi-{nickname}-{Malaysia-date}.pdf. Salinan Data (JSON) remains available for full raw records including answer snapshots. A PDF summarizes learning and is not a restore format. Existing user data and private feedback are unchanged.

## Report contents

A4 portrait with navy/gold branding, embedded regular/bold Noto Sans, student nickname, optional guardian/school/year, generated time in Malaysia, record period and a privacy footer. Summary: completed quizzes, mean attempt percentage, best percentage and cumulative recorded duration. Subject bars: correct/all recorded questions including unanswered questions and repeated practice. Focus recommendations use actual topic history with at least3 recorded questions per topic; percentages are practice indicators, not official grades/admission predictions.

History includes every fetched completed attempt, newest first, with Malaysia date/time, subject, mode, question/correct counts, score and duration; expired attempts are labelled. Trend shows up to12 recent attempts chronologically; table contains all attempts, not only the chart sample. Topic table includes all available topics. Multi-page tables repeat headers and page numbering. Empty reports use zero completed count and absent-score dashes, not invented percentages. Footer reproduces the exact user-supplied PENAFIAN.

## Implementation and privacy

public/js/report.js exposes buildReportModel (pure), createStudentReport (local PDF) and downloadStudentReport. Export obtains the selected learner and attempts from the existing owner-protected Firestore repository. Model rejects cross-learner input and never mutates source records. No report collection, privileged credential or external PDF service exists. The PDF is not automatically uploaded/shared; guardians decide where to store/share downloaded files. Public assets are only libraries/fonts, not student reports.

jsPDF4.2.1 UMD (MIT) and Noto Sans regular/bold (SIL OFL) are bundled under public/assets with their licenses. Files load on first export, not at app startup. npm dependency is pinned and development-only; Hosting uses the vendored browser distribution, with no build/server requirement. Keep vendor copies consistent when upgrading. Font/source links: https://github.com/parallax/jsPDF and https://github.com/notofonts/noto-fonts. Fonts are self-hosted. Most text is vector/selectable; profile fields containing glyphs outside the embedded font use a high-resolution local browser/canvas fallback to preserve display names, including Chinese/Tamil. Those fallback fields are images rather than selectable text.

Report generation needs current Firestore access and first-load assets; no fully offline export guarantee. Progress/error text stays visible inside the profile modal and retry is possible. JSON remains a separate private snapshot and does not implement a cloud backup/restore service. Feedback comments are not included in learner exports.

## Verification

npm run test:report:4 pure model checks covering mean/subject denominators, learner isolation, empty records and immutable input. npm run test:report:ui:isolated Chrome against Firebase demo emulators by default, with synthetic selected/sibling profiles, real Firestore export, blocked-font error and retry, PDF and JSON downloads, mobile390px, empty report, long multilingual names,120 attempts and cleanup. Set TEST_REAL_FIREBASE=1 TEST_BASE_URL=https://kuiz-igcse.web.app for the live flow.

npm run check:report:pdf uses Python pypdf/PyMuPDF to inspect generated PDFs under .local/tmp/pdfs, verify A4/page numbering/privacy/denominators/selected-learner isolation/text bounds/all120 history rows, and render pages for manual visual review. This tooling is QA-only and not an application backend. Six-attempt report fits2 pages; empty report1;120-attempt stress report9. Synthetic preview docs/examples/Contoh-Laporan-Prestasi.pdf is clearly marked CONTOH - DATA REKAAN. Never place real exported family reports in public or Git. Actual evidence is in docs/VALIDATION.md. Mobile Chromium emulation is not a physical Android-device test.


17 November2026:PDF focus recommendations now require at least3 distinct question IDs per topic and use each ID's latest saved outcome. Full subject/topic tables retain all-answer denominators; the PDF caveat explains this. Earlier wording based on3 repeated snapshots is superseded. See [learning engine](LEARNING_ENGINE.md).


18 November2026:profile editing preserves attempt IDs/scores;reports use current private profile fields. PDF labels Darjah1-6/Tingkatan1-5 in BM and combines optional school/state in its private profile block;JSON includes optional state. Community cards never include either school or state.
