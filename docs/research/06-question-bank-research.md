> Technical status: references to Express/SQLite or server scoring describe the archived implementation. The active Firebase SPA contract is [FIREBASE_MVP.md](../architecture/FIREBASE_MVP.md); educational source findings and uncertainty labels remain unchanged.

# Original question-bank design and review

Prepared: 15 November 2026. Status: authoring/review specification derived from the authoritative project scope, with curriculum reference leads; not a claim that a completed 300-question bank has already been produced. Implementation and content work are now authorised.

## Scope and stage alignment

Retain the first-release target of 300 original reviewed questions, normally 100 English, 100 Mathematics and 100 Science, and expansion capacity above 1,000. Retain all 17 English, 20 Mathematics and 25 Science topic areas in `full_prompt.md`. A reviewed count shortfall must remain explicit; do not inflate counts with only changed numbers.

Each item needs a stage label: primary foundation, lower-secondary bridge or relevant IGCSE extension. A subject reference identifies a learning direction, not an assertion that a Year 6 question was taken from a Cambridge exam. Keep syllabus code/year/route unset where not verified or not applicable. Additional Bahasa Melayu/reasoning/general-knowledge/writing areas remain research-led expansion, not invented official papers.

## Originality and evidence

Write fresh stems, passages, examples, options and explanations. Study public objectives and format without copying protected papers or commercial banks. Link users to official resources. Use the precise disclaimer: “Original practice questions inspired by relevant learning objectives and examination styles. Not official Cambridge examination questions.”

Cambridge subject pages and support materials explain where to find syllabuses, specimens, mark schemes, reports and teaching resources. Access restrictions remain in force; restricted school resources are not presumed read or reusable. See [official classroom support](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/classroom-support/) and [official teaching/assessment resources](https://www.cambridgeinternational.org/support-and-training-for-schools/support-for-teachers/teaching-and-assessment/).

## Item construction and metadata

Preserve unique ID, subject/topic/subtopic, difficulty 1–5, type, text, answer/options, explanation, objective, estimate, language, references and tags. Add stage, version, reviewer/check record, difficulty rationale and draft/reviewed/published status.

- English: correct grammar and natural context; evidence-based comprehension; plausible misconception distractors; original passages and simple explanations.
- Mathematics: independent calculation and inverse/alternative check; correct units and precision; worked solution; answer options reflecting actual misconceptions rather than arbitrary numbers.
- Science: verify mechanism, conditions and evidence; distinguish variables/observations/inferences; avoid absolute scientific statements with obvious exceptions.

Retain the six parent examples as review candidates. In particular, a bottle-cap float question needs explicit material/buoyancy assumptions; do not state that every plastic cap floats under all conditions. Preserve provenance and document wording corrections.

## Deterministic marking

MCQ/True–False use stable option IDs. Blanks/objective short answers need accepted variants and documented case/whitespace rules. Numerical answers need units/tolerance/precision. Reading questions need passage/subquestion relationships. Multi-step questions need final-answer rules and worked steps; do not claim intermediate reasoning was marked when it was not. Short writing requires transparent human/self-review rather than unvalidated automatic scores. Multi-select requires its own declared schema.

Keep answer keys server-side during examinations. Reviewed question versions and option orders must be snapshotted into quiz sessions. Later edits and retakes cannot rewrite earlier results.

## Review and publication gate

1. Read the complete question and solve without looking at the key.
2. Verify answer, distractors, explanation, learning objective, stage and estimated time.
3. Confirm exactly one intended correct option, unless explicitly multi-select.
4. Check grammar, translations, units, notation, accessibility and scientific conditions.
5. Check for semantic/near duplicates and answer leakage.
6. Record the check and promote only accepted items to published status.

Report content counts by subject and review state separately. Automated schema checks can verify consistency and arithmetic properties but cannot replace educational review. An independent human educator review is desirable before community launch; do not fabricate reviewer credentials or pretend two independent human reviewers checked machine-authored content.
