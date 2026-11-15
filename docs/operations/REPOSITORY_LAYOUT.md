# Clean repository and private-file boundaries

Target repository:https://github.com/Ardyshaz/Ujian_IGCSE,branch main. The cleanup creates fresh source history without importing old databases,candidate slips,logs or Express/SQLite history. It does not deploy or alter the currently live application.

## Current source

- Root:README,AGENTS,full_prompt(single authority),Task(active roadmap),package/lock,Firebase configuration/rules/indexes and .env.example.
- public:unchanged active SPA,one public/questions.json bank,approved QR,icons and licensed PDF/font dependencies.
- scripts/dev:static server and non-overwriting local config bootstrap. scripts/qa:isolated browser integration. scripts/validate:content,documentation,repository and PDF checks.
- tests/unit:pure grading/report models. tests/rules:Firestore ownership/scoring and private-feedback security.
- docs:project,architecture,operations,features,content,research,testing,design,prompts and an explicitly synthetic PDF example.

## Retained public provenance

The original1370-line prompt is docs/archive/prompts/full_prompt_original.md. Its SHA256 remains6b755c83a9b3a2f0d2df755bdd62d7fa9032b84663967210ba76507db914226b. The original prototype is docs/archive/prototype/igcse_prep_quiz.html with SHA2566313db4a0d8cd905d637940e36640263b3ba5f7a783f84ea31d2ff319d1dc7df. .gitattributes disables line-ending conversion for both. The requirements comparison remains a labelled historical inventory. No original educational requirement is removed from full_prompt.md.

Companion docs moved from root to docs/project. They are scoped current views; the prior repetitive full copies remain in the private local cleanup archive. Source paths inside the historical comparison describe the former layout. Use docs/README.md for current navigation.

## Local only - never staged

.local holds source candidate slips/notes,raw Gemini PDF,source QR duplicate,old SQLite files,old backend,generator,pre-Firebase/pre-cleanup docs,dependency cache,logs and generated QA reports. Existing personal material was moved,preserved and excluded rather than deleted. The reviewed research summaries stay public; the raw dossier is secondary/private source material.

The live Web config public/js/firebase-config.js is preserved locally but ignored by Git. A public example plus npm setup supports fresh clones without publishing that project key. .firebaserc and the project ID are not secrets. No Admin/service-account/CLI token is stored in public source. Other credentials,env files and generated reports are ignored defensively,including their former locations.

The PDF in docs/examples is synthetic and labelled as such; real family reports do not belong there. The approved donation QR is intentionally public and unchanged. A nickname mentioned in the preserved original specification is source context,not a bundled real learner profile or database.

Run npm run check:repo to scan tracked paths and credential/identity patterns and verify immutable archive checksums. Run npm run check:docs for current Markdown link existence and exact path case. These checks are scoped publication guards,not a guarantee that every possible secret format or all security issues are detected.


CI status:the GitHub OAuth credential permits repository uploads but lacks workflow scope. The initial workflow push was rejected; no remote branch was overwritten. The reviewed workflow is retained as inactive docs/testing/ci-template.yml. Local tests passed; a maintainer may activate the template with appropriate workflow permissions later.
