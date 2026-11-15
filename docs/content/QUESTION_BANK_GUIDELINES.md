> Current runtime: Firebase client SPA. Any server/SQLite references below describe the archived implementation; see [Firebase contract](../architecture/FIREBASE_MVP.md). Educational requirements and review limits remain unchanged.

# Original question authoring and review

Authoring source: `public/questions.json`. See `docs/content/QUESTION_BANK_REVIEW.md` for the current release's exact counts/coverage, official overview basis and moderation limits. `.local/archive/tools/author-question-bank.py` reproducibly builds the baseline and performs 80 arithmetic recomputations; protect manual edits before rerunning it.

Each item needs: stable unique ID; subject/topic/subtopic; difficulty 1–5; type; clear original text; applicable options with stable IDs; correct answer/variants/tolerance; simple explanation and worked steps; learning objective; estimatedSeconds; language; tags; primary/bridge stage; alignment/source note; version; publication/review status and reviewNote. Add syllabus code/year/route only when actually verified. Do not describe all primary work as full IGCSE content.

## Supported objective formats

- `mcq`, `reading`: stable option ID. Put original reading passage in text and make each prompt answerable from it.
- `true_false`: explicit true/false option IDs, one unambiguous statement.
- `fill_blank`, `short_answer`: canonical answer plus explicitly accepted variants; case/whitespace is normalised. Avoid open questions with many unsupported correct phrasings.
- `numerical`, `calculation`: numeric answer, declared tolerance, explicit units/number-only instructions. Calculation marks the final answer only; give reasoning in the explanation. The UI must not claim to mark intermediate steps.

Short writing also has a separate self/human-review exercise and rubric in Panduan Pelajar. Do not treat revision-choice questions as automated grading of a child's essay.

## Quality workflow

1. Draft genuinely distinct items across the complete original topic list. Do not pad counts by swapping numbers or names.
2. Check age/language, a specific learning objective and plausible misconception-based distractors.
3. Independently verify the answer, every distractor, calculation, scientific conditions and explanation. Correct ambiguity such as unspecified cap density/material, missing units or multiple valid answers.
4. Check grammar/spelling and the supported answer schema; manually test any new type.
5. Add review evidence, set reviewed/published only after checks and increment version on edits.
6. Run `npm run check:content` and `npm test`, then import/restart. Review every new explanation in the interface.
7. Seek independent educator moderation and learner feedback before public release, especially difficulty calibration, scientific nuance and language accessibility.

Use public learning objectives and official assessment structures as references. Do not scrape/bulk-copy Cambridge or third-party papers, passages, mark schemes or banks. Link to official resources instead. Label all content original/unofficial. Author-reviewed local publication is not an independent professional endorsement or psychometric validation.

The data model expands to 1,000+ without schema redesign. Update the validator's release count/coverage contract deliberately when adding genuinely new questions; do not reduce the 300 target silently. Recheck safe API payloads whenever introducing new answer metadata.
