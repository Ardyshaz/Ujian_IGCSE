# Visual concept provenance

Tool: built-in Image Gen; no external API key. Saved reference: `concept.png`. Generated and inspected before frontend coding, then compared against desktop/mobile browser screenshots. The board is a design reference only; it is not served as the app UI.

## Prompt

Use case ui-mockup. Generate one high-resolution coordinated design reference board for a real educational learning app called IGCSE MRSM Preparation Hub, local Windows HTML/CSS/vanilla JS SPA, age 12 Malaysian pupils and parents. Three legible screens: a large primary desktop dashboard, examination screen and mobile dashboard. Premium navy #162c49 sidebar, true-white surfaces, cool pale-grey-blue #f5f7fb background, restrained gold #e9b75e highlights, green success, readable modern humanist sans serif.

Dashboard: 230px navy sidebar, book monogram/IGCSE Prep brand, Home, Start Quiz, Question Bank, My Progress, Student Guide, Parent Guide, About; household profile button. Compact white topbar with actual date/profile. Spacious heading “Small steps. Bright futures.” and “Build your confidence for the journey ahead.” Navy band “Your next chapter starts here.” with gold “Start learning” action. Three subject rows English/Mathematics/Science, 100 questions each; Daily Challenge with eight mixed questions; recent activity empty state; create-learner prompt. No invented learner scores, achievements or streaks. Footer: independent unofficial resource, not MARA/MRSM/Cambridge.

Quiz: same shell; title, question progress, countdown example, roomy white question region, ratio word problem, options, question navigator, mark for review and next. Mobile: same visual system, single column, compact header/accessible menu, subject rows and daily challenge. Practical reusable native HTML controls/text, consistent line icons, no eyebrow labels, fake widgets or unnecessary photography. Parent content primarily Malay. Illustrative date/timer/question state in the concept is replaced by genuine runtime data.

## Fidelity and extensions

Implementation preserves the board's layout families, palette, spacing rhythm, sidebar, subject rows, hero/actions and quiz navigator. Functional details required by the specification extend the board in the same system: full guide content, search/filters, onboarding, results/history, progress charts, privacy tools and save/error states. The parent's glossary enhancement adds category controls and stacked mobile definitions without changing branding. See `IMPLEMENTATION_CONTRACT.md` and `docs/testing/VALIDATION.md` for decisions/evidence.
