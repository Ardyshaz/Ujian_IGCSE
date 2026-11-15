# UI and report design

BM is the primary interface language. Retain MRSM, UKKM, IGCSE, Dashboard, English, Mathematics, Science and Level where agreed. Display name:MRSM - Persediaan Ujian IGCSE; compact mobile label:MRSM IGCSE. Avoid literal/stiff translations:use Prestasi Saya and Tapis Soalan.

Navy #162c49, restrained gold #e9b75e, white surfaces, cool grey backgrounds, green success, readable Segoe UI/system typography and Lucide icons. Keep clear headings,44px primary controls, focus indicators, semantic inputs, dialog labels, errors and meaningful empty/loading states. Desktop navigation is a sidebar; mobile uses a collapsible menu without horizontal overflow.

Preserve all seven navigation tabs, sourced concise home guidance, bilingual glossary, four quiz modes, results/history and parent/student guidance. English academic question text stays English. Set lang=ms, translate=no, notranslate class and Google notranslate meta to preserve intentional mixed-language wording; native browser/user overrides are outside application control.

Semak jawapan automatically turns that question's navigator gold and persists review state across next/back/refresh. Remove the former manual checkbox. Show feedback, answer state and progress clearly. Submission displays busy text and inline retryable errors within its modal, with no false saved state.

The permanent footer contains support and private-feedback actions plus the exact requested PENAFIAN. ResizeObserver reserves actual footer height in main/sidebar/toast spacing, including mobile/safe areas, so quiz controls remain reachable. The support modal preserves the original QR and exact donation paragraph, with Simpan QR beside Tutup, outside-click and Escape dismissal. The feedback form explains admin-only visibility and requests no child/contact identifiers.

Profile export:primary Eksport Laporan (PDF), secondary Salinan Data (JSON), clearly spaced destructive deletion. PDF reports use A4, navy/gold hierarchy, embedded Noto Sans, summary cards, subject bars, trend, complete multi-page tables and privacy/page-number footers. Preserve multilingual profile names via local rendering fallback where needed. [Report specification](../features/REPORT_EXPORT.md).

[Concept reference](../design/concept-prompt.md) is historical visual provenance, not current copy. Exact text and full acceptance requirements are in [full_prompt.md](../../full_prompt.md).
