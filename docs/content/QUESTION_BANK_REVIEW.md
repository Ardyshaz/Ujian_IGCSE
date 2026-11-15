> Current runtime: Firebase client SPA. Any server/SQLite references below describe the archived implementation; see [Firebase contract](../architecture/FIREBASE_MVP.md). Educational requirements and review limits remain unchanged.

# Original question-bank authoring and review

Date: 15 November 2026. Release dataset: `public/questions.json`.

## Counts and scope

300 original objective items: 100 English, 100 Mathematics and 100 Science. All 62 requested topic categories are represented: 17 English, 20 Mathematics and 25 Science. English includes six items per category except Short writing, which has four objective writing/revision-choice items. Mathematics has five items per category. Science has four items per category. Full free-writing assessment remains separate future rubric/review scope; these writing-choice items must not be described as automatic assessment of a child's own essay.

Every item has a stable ID, subject/topic/subtopic, difficulty 1-5, type, stable-ID options where applicable, explicit answer schema/key, explanation, learning objective, estimated time, language, tags, stage/alignment, publication status, version and review note. Reading and cloze passages are original and included in question text. This bank includes all seven objective schemas: MCQ, reading comprehension, true/false, fill-in-the-blank, short answer, numerical and multi-step calculation with final-answer marking. Text/numeric items declare accepted variants or number-only units; intermediate reasoning and free writing are not automatically graded.

All six parent-supplied examples are retained as checked ideas: interrupted past continuous, investigate/examine, dark-cupboard plant, floating cap, notebook discount and string ratio. The buoyancy question explicitly states average density below water, avoiding assumptions about every plastic cap. The dark-cupboard explanation is conditional on absence of light, does not diagnose unobserved insects/temperature, and reminds reviewers to control other factors.

## Educational research basis and limits

Official curriculum overview sources accessed 15 November 2026:

- [Cambridge Primary curriculum](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/): publisher Cambridge International Education; no publication/update date established. Used only to situate broad English, Mathematics and Science foundations, not to assert exact topic-by-topic official syllabus coverage.
- [Cambridge Lower Secondary curriculum](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/): publisher Cambridge International Education; no publication/update date established. Used to frame the gradual bridge to lower-secondary reasoning. No claim that every question is an official stage objective or an MRSM entrance question.

The item content was independently authored for this project; it is not copied from Cambridge papers or third-party banks. Alignment notes deliberately say primary foundation/lower-secondary bridge rather than inventing a Cambridge examination code/year for Year 6 content. Difficulty labels are editorial practice settings and should be refined from learner feedback and teacher moderation; they are not official grade predictions. Timings are suggested practice durations, not verified examination timings.

## Validation performed

- Asserted exact counts 100/100/100 and full requested topic coverage.
- Asserted 300 unique IDs and 300 unique complete question texts.
- Validated distinct options where applicable, typed schemas, valid answer keys and nonempty explanation/review metadata. The authoring intermediate checks four-option items before selected format conversions; the final validator checks all seven formats.
- The initial MCQ authoring representation balances key positions before selected typed/true-false conversions. The final mixed-format bank does not claim exact 25-per-letter balance. Stable option IDs, not visual letters, remain authoritative during shuffling.
- Independently recomputed 80 arithmetic/numerical facts using a second set of executable expressions and parsed the actual keyed option back to a numerical value for comparison; checked expected values include percentages and reverse percentage, rational arithmetic, ratios, perimeter/area/volume, angles, unit conversion, speed, mean/range, probability, patterns and multi-step word problems.
- Author read-through checked grammar, plausible distractors and ambiguity; explanations distinguish observation from inference and do not turn unverified selection information into facts.
- Science review avoids misleading claims that all seeds require light, all animal cells have walls, all plastics float, energy is destroyed, seasons are caused mainly by Earth-Sun distance, every lunar phase is an eclipse, or sound travels in a vacuum. Safety items discourage mains-electricity experimentation.

Structural validation and arithmetic rechecks are meaningful but are not independent human teacher moderation or classroom trials. Publication status means author-reviewed local practice. Obtain independent educator moderation, particularly difficulty calibration, language accessibility and practical-science nuance, before public children's use. No claim of exhaustive topic mastery, psychometric validity or official examination equivalence is made.

## Coverage and next steps

### English

| Topic | Count |
|---|---:|
| Grammar | 6 |
| Vocabulary | 6 |
| Reading comprehension | 6 |
| Sentence structure | 6 |
| Tenses | 6 |
| Subject-verb agreement | 6 |
| Prepositions | 6 |
| Conjunctions | 6 |
| Synonyms | 6 |
| Antonyms | 6 |
| Spelling | 6 |
| Punctuation | 6 |
| Cloze passages | 6 |
| Contextual understanding | 6 |
| Critical reading | 6 |
| Short writing | 4 |
| Sentence correction | 6 |

### Mathematics

| Topic | Count |
|---|---:|
| Whole numbers | 5 |
| Fractions | 5 |
| Decimals | 5 |
| Percentages | 5 |
| Ratio and proportion | 5 |
| Basic algebra | 5 |
| Geometry | 5 |
| Perimeter | 5 |
| Area | 5 |
| Volume | 5 |
| Angles | 5 |
| Measurements | 5 |
| Time | 5 |
| Speed, distance and time | 5 |
| Statistics | 5 |
| Probability | 5 |
| Patterns | 5 |
| Number sequences | 5 |
| Word problems | 5 |
| Logical reasoning | 5 |

### Science

| Topic | Count |
|---|---:|
| Living things | 4 |
| Cells | 4 |
| Human body | 4 |
| Plants | 4 |
| Photosynthesis | 4 |
| Reproduction | 4 |
| Food chains | 4 |
| Ecosystems | 4 |
| Matter | 4 |
| States of matter | 4 |
| Atoms and elements | 4 |
| Mixtures | 4 |
| Forces | 4 |
| Motion | 4 |
| Gravity | 4 |
| Friction | 4 |
| Energy | 4 |
| Electricity | 4 |
| Light | 4 |
| Sound | 4 |
| Heat | 4 |
| Earth and space | 4 |
| Scientific investigation | 4 |
| Experimental variables | 4 |
| Data interpretation | 4 |

Next content expansion: add genuinely distinct questions in the same schema, with more varied numerical/text-input items and reviewed writing rubrics, expand beyond 1,000 without near-duplicate padding, add optional Malay explanations and use appropriate intake-specific official research when extending other learning areas. Re-review any edited item and increment its version so old attempts remain reproducible.
