# Firebase deployment

Live application:https://kuiz-igcse.web.app. Initial Hosting/rules/indexes deployment was explicitly authorised and verified. The GitHub repository is source control, not an automatic deployment trigger; The optional CI template is inactive and has no cloud credentials.

firebase.json serves public, SPA rewrites,no-cache code/content and frame/referrer/nosniff headers. Example config files are excluded from Hosting. A fresh clone gets an ignored firebase-config.js via npm ci/setup; a null config lets Firebase Hosting provide the registered Web App config through init.json. Local/cloud config and emulator mode are documented separately.

For an authorised update, review code and appropriate tests, run npm run setup:cloud and authenticate the CLI to the correct project. Deploy only the intended surface:

```powershell
npx firebase deploy --only hosting --project kuiz-igcse
npx firebase deploy --only firestore:rules,firestore:indexes --project kuiz-igcse
```

Do not run init blindly over existing configuration. A Web API key is public configuration, not permission to access records. Owner rules,Anonymous provider and actual persisted browser tests must be verified independently of CLI login. Never use permissive test-mode rules in public.

The default database is Native/Standard in nam5, created by the initial CLI deploy when no database existed. PITR and delete protection were disabled at verification; no Malaysia residency or automatic backup claim. Do not recreate/migrate data silently to change region. Preserve old family data locally; no automatic SQLite upload.

Remaining hardening:independent teacher moderation,recoverable guardian accounts/consent,retention/privacy/terms review,cloud backup/restore drills,cost/quota/abuse/App Check controls,least-privilege admin publishing,additional browsers/physical devices and load/accessibility testing. [Roadmap](../../Task.md) and [validation](../testing/VALIDATION.md).


Community release deploys reviewed Firestore rules as well as Hosting. No data migration or broad public profile read is required. Weekly publication is a separate privileged manual operation:npm run hall:preview,then npm run hall:publish after checking opted-in aliases. Hosting deploy alone does not fill the board or schedule updates. See [community operations](../features/COMMUNITY_AND_PROFILES.md).
