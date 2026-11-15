# Local development

Use Node24+,npm and the repository root as cwd. `npm ci` installs pinned development dependencies and runs a safe setup step that creates public/js/firebase-config.js only if absent. That file is ignored; edit your own Web config locally. The committed example is intentionally empty. Service accounts/CLI tokens must never enter public.

## Demo emulators

Run npm run setup:emulators, then npm run emulators. Auth9099,Firestore8080,Hosting3000,UI4000 bind to127.0.0.1 using demo-kuiz-igcse. Java21+ must be available as required by the installed Firebase CLI. Stop another server you own on3000 first. This mode uses no real project writes. npm run setup:cloud turns emulator mode off without deleting your Web config.

## Static server with cloud data

Fill your ignored Web App config, enable Anonymous Authentication for that project, apply reviewed owner rules, run npm run setup:cloud and npm run dev. The server only serves public at localhost3000; no REST application backend/SQLite. Firebase Hosting can supply init.json when config is null; the simple Node server cannot. Without configuration, public guides/bank work and profile operations show a setup warning.

Edit public/questions.json directly, preserve IDs and increment versions. Run npm run check:content. There is no duplicate content bank or startup database import. Completed attempts retain their snapshots. Frontend modules load directly without a framework build.

[Testing guide](../testing/README.md), [deployment](DEPLOYMENT.md), [privacy](PRIVACY_AND_SECURITY.md), [repository/private layout](REPOSITORY_LAYOUT.md).
