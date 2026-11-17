# Testing and verification

[Executed evidence](VALIDATION.md) distinguishes historical tests,emulator integration and live verification. Do not treat a documented command as proof it was run.

## Routine source checks

```powershell
npm test
npm run check:content
npm run check:docs
npm run check:repo
```

Unit tests cover grading,first checked answers,timers,Malaysia day/streak/rewards and PDF model statistics/isolation. Content checks validate300 original questions,62 topics,seven types,stable unique IDs/keys and required metadata. Documentation checks validate links/case outside immutable provenance. Repository checks reject tracked private/generated files and common credential/identity patterns and verify original hashes.

## Firestore rules

Start npm run emulators (or Firestore only),then npm run test:rules. The31 owner/score assertions and23 private-feedback assertions run sequentially against demo-kuiz-igcse. They intentionally issue denied requests; PERMISSION_DENIED logs are expected negative tests. No production project is cleared.

The included ci-template.yml is inactive. The current GitHub OAuth login lacks workflow scope,so the initial workflow upload was refused. A repository maintainer can enable the reviewed template later using an account/token with the appropriate workflow permission. It runs the same rules suite through firebase emulators:exec with the explicit demo project,Node24 and Java21; it needs no Firebase secret and does not deploy or run browser/live/PDF-rendering tests. All reported cleanup checks were executed locally.

## Isolated browser workflows

Have Chrome installed; CHROME_PATH can override its path. For demo QA,serve the static app with npm run dev while Auth/Firestore demo emulators run separately; do not also bind Hosting emulator to3000. Test scripts override the config response in their isolated browser,so the developer's cloud config file is unchanged.

- npm run test:ui:three subjects,result/history reload,Dashboard,idempotency,mobile support.
- npm run test:quiz-review:ten flags,one unanswered90% result,next/back/refresh,first checked answer,visible offline failure and retry.
- npm run test:feedback:ui:private form,sender read/list denial,admin fixture read,receipt retry,cooldown and responsive footer.
- npm run test:report:ui:PDF/JSON,sibling isolation,font failure/retry,mobile,empty/multilingual/long-name/120-attempt reports.

They use fresh browser profiles and synthetic records. Live mode requires an explicit intention to write disposable test records:TEST_REAL_FIREBASE=1 and TEST_BASE_URL=https://kuiz-igcse.web.app. Cleanup removes only the created fixtures; feedback admin verification uses existing CLI IAM strictly in the Node test,never in browser source. Report QA outputs go to ignored .local/qa. Other screenshots use OS temp.

npm run check:report:pdf requires Python pypdf and PyMuPDF and reads the generated local report fixtures; it is QA tooling,not a backend. Visual review is still required after layout changes. The published synthetic PDF example is in docs/examples. Mobile emulation is not a physical Android/iOS test. Host-managed browser attachment was unavailable during prior validation,so isolated Playwright was used with reviewed process permissions.


Optional analytics QA:npm run test:analytics:ui requires local Auth/Firestore demo emulators and the static app. Analytics transport is mocked and the config response is overridden in the isolated context; no metrics are collected by Google. The owner confirmed Enhanced Measurement OFF and the production gate is enabled; individual consent is still required. Policy tests are included in npm test. Real SDK/intercepted transport and actual Realtime ingestion are distinct evidence scopes.


npm run test:selection:ui verifies the history-aware engine against demo emulators:due/unseen shares,unique-versus-repeat metrics,sibling isolation,balanced mixed sets,unchanged Daily sets and Dashboard reload/mobile overflow. Unit selection tests are part of npm test.


The selection UI suite also checks the Dashboard glossary hero,next-term keyboard focus,mode means,Home/deep-link navigation,all180 glossary rows,English/BM searches,combined category filters and360px glossary overflow. Unit tests validate glossary uniqueness/schema,daily-term bounds and per-mode denominators.


npm run test:hall:ui exercises synthetic profile editing/enrollment,the actual emulator admin publisher,category/detail/mobile views,private-field exclusion,withdrawal/stale-commit rejection and profile deletion cleanup. npm run test:rules includes39 Hall/profile assertions in addition to existing31 owner/score and23 feedback assertions. Run rules suites before browser QA because they clear only the demo database. No real child is enrolled by these tests.
