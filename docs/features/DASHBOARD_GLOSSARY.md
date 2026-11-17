# Dashboard and bilingual glossary

Updated17 November2026. Current requirements are governed by [full_prompt.md](../../full_prompt.md). The question bank remains300;the learning glossary is a separate teaching resource and is not counted as scored questions.

## Visible Dashboard changes

A prominent navy/gold Istilah Hari Ini card appears above the progress summaries. It shows an English term,a BM translation,an original simplified meaning/example and its category. Istilah lain cycles through the glossary without losing button focus or sending an Analytics event. Cari semua istilah opens the existing #student/glossary route and scrolls to its searchable section. The daily starting term is deterministic from the Malaysia date at render time;no new database,learner vocabulary record,favourite state,mastery badge or pronunciation service is introduced.

A companion Langkah seterusnya card links to the weakest qualified topic,using the existing unique-question evidence. With no qualified topic or no attempts,it invites a short general set instead of inventing a weakness. Existing quiz count,equal-attempt mean,best score and streak remain visible below. Prestasi mengikut mod separates Practice,Exam,Challenge and Daily Challenge:each shows completed count,equal-attempt average,and correct/wrong-nonblank/blank answer totals. Empty modes show a dash for accuracy,not0%. Different questions,Levels and modes are not equivalent assessments. Existing subject/topic,repeated-exposure,history,rewards and PDF/JSON behavior remain available.

The Home page also has a prominent bilingual glossary callout before the detailed research guidance. No learner profile is required to read the glossary. BM remains the UI language with intentional English academic terms preserved. Exact disclaimer,donation text and measured fixed-footer spacing remain protected.

## Glossary content

public/js/guides.js remains the single glossary data array;glossary-spotlight.js is the presentation helper. Total180 unique terms,up from100:

| Category | Terms |
|---|---:|
| Mathematics |58|
| Science |53|
| English |27|
| Command word |31|
| Exam wording |11|

Added80 original teaching entries:10 command/instruction words,25 Mathematics,25 Science,12 English and8 exam phrases. Examples include Analyse,Sketch,Decimal,Odd number,Unit conversion,Acute angle,Mass,Weight,Refraction,Germination,Pronoun,Main idea,Not to scale,Respectively and In your own words. Definitions preserve context:zero is even,one is not prime,weight is a force,light needs vary across seeds,and not all metals are strongly attracted to ordinary magnets. Compare now explicitly follows the question's requested similarities and/or differences.

Search matches the term,BM translation,meaning/example and category. Category filtering combines with search;empty matches show a clear message. Mobile cards retain meanings rather than hiding the definition column. Count/status reflects the full180-entry bank. New content is authored for this app,with editorial BM translations,not a copied paper or official MRSM vocabulary list. It is not a claim that a term will appear in a particular admission test. Independent educator/BM terminology moderation remains future work.

References checked17 November2026:

- [Cambridge:Understanding command words](https://www.cambridgeinternational.org/exam-administration/what-to-expect-on-exams-day/command-words/). Used for general command-word interpretation;subject-specific instructions take precedence. Not all general school instruction phrases are listed by Cambridge.
- [NZ Curriculum:Glossary of mathematics terms](https://newzealandcurriculum.tahurangi.education.govt.nz/nzc---glossary-of-mathematics-terms/5637208473.p). Used as a mathematics terminology reference,not a claim of Cambridge/Malaysian syllabus equivalence. Examples and BM translations are our teaching text.

## Acceptance checks

-180 distinct complete four-field entries across the five categories.
-Deterministic valid daily index;next term changes visible content and retains keyboard focus.
-Mode averages retain equal quiz weights;blank/wrong are distinct and empty modes are null.
-Desktop1440/mobile390 Dashboard renders,term cycling,mode summary,glossary deep link,all180 rows,Refraction/Pembiasan lookup,combined category empty result,serenjang/Perpendicular lookup,and360px glossary no horizontal overflow.
-Home callout reaches the same glossary;quiz history-aware selection and reload regressions still pass in demo emulators.

See [executed evidence](../testing/VALIDATION.md) and [learning-engine rules](LEARNING_ENGINE.md). Physical-device and independent teacher checks remain open.
