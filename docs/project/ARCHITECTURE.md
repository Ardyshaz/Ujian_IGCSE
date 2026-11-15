# Architecture overview

The browser loads the SPA entirely from public. Firebase modular Web SDK13.3.0 supplies Anonymous Authentication and Firestore; no application backend or Admin SDK is shipped. The hosted project is kuiz-igcse. Local QA uses demo-kuiz-igcse on loopback.

- Profiles and immutable completed attempts are owner-UID-scoped cloud records. Dashboard is derived from fetched attempts; average is the mean of attempt percentages.
- Active quiz snapshots, flags and drafts are browser-local. Practice retains the first checked answer; timers and scores are not tamper-proof assessments.
- public/questions.json is the sole authoritative editable bank. Question keys are public in this client architecture.
- Feedback uses create-only content plus atomic private receipts and a60-second server cooldown. All client content reads are denied; admin access is through Console/IAM.
- PDF generation uses local bundled jsPDF/fonts after owner-filtered reads. No report is automatically uploaded; raw JSON export remains separate.
- Config is developer-local and ignored by Git; a committed example/bootstrap supports fresh clones. Hosting can obtain Web App configuration from its reserved endpoint.

[System modules](../architecture/SYSTEM_ARCHITECTURE.md), [schema](../architecture/DATABASE_SCHEMA.md), [service contract](../architecture/API_REFERENCE.md), [acceptance contract](../architecture/IMPLEMENTATION_CONTRACT.md), [privacy](../operations/PRIVACY_AND_SECURITY.md).

The original full specification remains authoritative in [full_prompt.md](../../full_prompt.md). Old SQL/server requirements are superseded by the explicit Firebase pivot; private legacy code is not part of this repository's active runtime.
