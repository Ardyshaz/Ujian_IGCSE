# Engineering and data rules

1. full_prompt.md is authoritative. Preserve the original1370-line archive unchanged and do not drop requirements from its educational scope.
2. Use public as the deployment surface. No Express, SQLite, privileged token or service-account credential in active frontend code.
3. Protect owner identity in rules, validate record shape/count/range, require server receipt timestamps and keep finalized attempts immutable. Scores themselves are self-reported client practice data.
4. Use deterministic attempt IDs, transaction retry, visible acknowledgement/error states and a bounded save wait. A timeout does not cancel a write that may still commit; retries must remain idempotent.
5. Preserve first checked Practice answer, exact question/version snapshots, automatic review flags, unanswered counts and clear explanations. Do not expose Practice feedback during exam modes.
6. Read learner records from Firestore for history/progress/export; no fabricated local counters or cross-learner export. Keep browser draft limitations explicit.
7. Feedback comments are client-create-only. Do not open reads to authenticated users to build an admin interface; authorised project maintainers use Console/IAM. Enforce atomic receipts/cooldown and document retention limits.
8. Collect minimal child data. Keep slips, full identities, source dossiers, old databases, logs, private reports and credentials under ignored local storage. Do not upload them to Git or Hosting.
9. Use original questions and official research sources. Record uncertainty, copyright boundaries, primary/bridge alignment and independent moderation limits. No unsupported admissions/format/grade guarantees.
10. Keep exact agreed donation/disclaimer copy, BM UX, useful English terms, responsive footer spacing, accessible controls and private PDF/JSON exports.
11. Test changes appropriately and report actual scope. Preserve vendor licenses. Do not claim physical Android testing from browser emulation or public readiness from a passing unit test alone.
12. Update affected documentation and the roadmap. Publishing GitHub does not automatically authorize Firebase deployment or paid services.

[Privacy](../operations/PRIVACY_AND_SECURITY.md) | [Implementation contract](../architecture/IMPLEMENTATION_CONTRACT.md) | [Test guide](../testing/README.md).
