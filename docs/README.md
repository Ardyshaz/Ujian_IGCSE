# Documentation index

[README](../README.md) explains the live application and local startup. [full_prompt.md](../full_prompt.md) is the single source of truth; [Task.md](../Task.md) tracks implementation and remaining work. These documents describe the published Firebase SPA, not the archived Express/SQLite prototype.

| Area | Documents |
|---|---|
| Project | [Overview](project/OVERVIEW.md), [PRD](project/PRD.md), [agent workflow](project/AGENT.md), [decisions](project/MEMORY.md) |
| Architecture | [Architecture overview](project/ARCHITECTURE.md), [system modules](architecture/SYSTEM_ARCHITECTURE.md), [Firestore schema](architecture/DATABASE_SCHEMA.md), [client contracts](architecture/API_REFERENCE.md), [implementation acceptance](architecture/IMPLEMENTATION_CONTRACT.md), [Firebase decision](architecture/FIREBASE_MVP.md) |
| Design | [UI/UX specification](project/DESIGN.md), [concept provenance](design/concept-prompt.md) |
| Operations | [Local development](operations/LOCAL_DEVELOPMENT.md), [deployment](operations/DEPLOYMENT.md), [privacy/security](operations/PRIVACY_AND_SECURITY.md), [repository layout/private boundaries](operations/REPOSITORY_LAYOUT.md), [engineering rules](project/RULES.md) |
| Features | [Private feedback administration](features/FEEDBACK_ADMIN.md), [PDF export](features/REPORT_EXPORT.md), [synthetic report example](examples/Contoh-Laporan-Prestasi.pdf) |
| Content | [Question authoring](content/QUESTION_BANK_GUIDELINES.md), [review evidence/limits](content/QUESTION_BANK_REVIEW.md) |
| Research | [Methodology](research/METHODOLOGY.md), [research index](research/README.md) |
| Testing | [Commands/environment](testing/README.md), [executed validation history](testing/VALIDATION.md) |
| Provenance | [Archive index](archive/README.md), [original1370-line prompt](archive/prompts/full_prompt_original.md), [requirements inventory/comparison](archive/REQUIREMENTS_COMPARISON.md), [original prototype](archive/prototype/igcse_prep_quiz.html) |

Private source files and obsolete implementation snapshots are retained locally under .local and are intentionally absent from this public repository. Historical source paths in the comparison report identify the earlier layout; they do not define the active runtime.
