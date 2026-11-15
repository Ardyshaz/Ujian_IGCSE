# Repository guidance

- Read `full_prompt.md` for the authoritative scope and `Task.md` for current work. Documentation starts at `docs/README.md`.
- The active app is a static Firebase SPA under `public/`. No Express/SQLite runtime or privileged credentials belong there.
- Use `public/questions.json` as the sole editable question bank. Preserve IDs, increment versions and run `npm run check:content` after edits.
- Keep BM as the primary UI language and preserve the agreed English academic terms. Keep the exact disclaimer and donation message.
- Protect learner ownership, immutable attempt IDs, automatic gold review flags, submit retry/error handling, private feedback and PDF/JSON export.
- `.local/` is local-only: child slips, candidate notes, reference PDFs, old databases/backend, logs and QA outputs must never be staged. Never commit Firebase service accounts, CLI tokens, `.env` or private reports.
- `public/js/firebase-config.js` is generated/ignored per developer. The committed example contains no Web API key. `npm run setup` preserves an existing local file.
- Use `npm ci`, `npm test`, `npm run check:content`, `npm run check:docs` and `npm run check:repo`. Emulator rules and browser QA are documented in `docs/testing/README.md`.
- Record test evidence honestly. Emulator/desktop emulation does not prove physical Android behavior. Client scores are practice data, not trusted assessments.
- Keep `docs/archive/prompts/full_prompt_original.md` byte-for-byte unchanged. Older technical requirements are superseded by the current Firebase decision; preserve educational scope.
- GitHub publication and Firebase Hosting deployment are separate actions. Do not deploy Hosting merely because repository files changed. Follow explicit user authorization already given in the session.
