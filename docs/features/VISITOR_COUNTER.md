# Home visitor counter

Decision:18 November2026. The owner requested a compact public usage counter. It appears directly beneath the Home hero, before the glossary. This is a Firebase session counter independent of optional Google Analytics, not a count of identified people.

## Meaning and interaction

- **Aktif sekarang: n sesi**: sessions whose last recorded activity falls within five minutes. Pointer, keyboard, scroll, focus and returning to a visible tab count as activity. An open but idle tab does not send perpetual presence heartbeats.
- **Jumlah kunjungan: n**: cumulative sessions since this feature was installed. The first visit starts a session; the same Anonymous browser identity starts another only after30minutes without recorded activity. Refresh, routes and concurrent tabs sharing that identity do not increment it again.
- Reads refresh approximately once per minute while Home is visible, and on returning Home. Activity reports are at most once per minute per tab; server rules require at least30seconds between accepted heartbeats. Initial activity is recorded after app bootstrap.
- Cara kiraan explains the time windows, session denominator, start date and separation from GA. An unavailable read shows -- rather than a fabricated zero. Previously loaded values may remain with an explicit stale warning.
- No retroactive visits are inferred from learner profiles, attempts or Analytics. A fresh installation can honestly start at zero until its first real visit.

## Data and atomic contract

| Path | Fields and access |
|---|---|
| trafficOwners/{Anonymous UID} | sessionId,createdAt. Only that authenticated owner can get it; no client listing/deletion. Private link between the existing browser identity and current random receipt. |
| trafficSessions/{random UUID} | createdAt,lastSeen server timestamps only. Creation, pointer change and total increment must be one atomic transaction. Only the mapped owner can heartbeat. Public reads must be restricted to recent timestamps within24hours; the owner can get their current older receipt for renewal. No public full-history query. |
| trafficStats/summary | total,startedAt,updatedAt. Public get, no listing. Total increases by exactly one only with a newly created receipt and matching private pointer. startedAt is immutable. No client reset/decrement/deletion. |

The transaction reads the private pointer and previous receipt before deciding whether to renew. On renewal it also reads the total, then atomically writes all three documents; retries serialize concurrent tabs. Existing sessions update only lastSeen. Active uses Firestore getCountFromServer over lastSeen >= browser time minus five minutes. No additional composite index is required. The production writer allows only the project's two Firebase Hosting domains; localhost writes require the demo emulator project.

## Privacy and limits

Public receipts contain no name, learner/profile/attempt/Auth ID, answers, marks, comments, IP, URL or device fields. However timestamps and the private Anonymous identity mapping are pseudonymous usage metadata, not a claim of complete anonymity. Firebase also processes ordinary network information. No identity or learner record is added to GA. The Analytics privacy dialog discloses this separate counter: declining Google Analytics disables Google collection, not this site's minimal Firebase session counter. This is not a legal-compliance certification or a claim of verified guardian consent.

Rules block public receipt reads older than24hours; this is an access window, **not automatic deletion**. Timestamp receipts and owner pointers currently persist in Firestore. No TTL policy, scheduled purge or new operational retention promise was configured in this release. Administrators should select a retention period and test a privileged cleanup procedure before growth. Deleting old receipts must preserve the cumulative summary and account for live pointers; missing old receipts cause a fresh session next time. Profile deletion does not erase this separate browser-level usage metadata. Existing learner export/deletion behavior is unchanged.

Counts are approximate sessions. Private browsing, clearing storage, different devices or new Anonymous identities can increase them; shared browsers may represent multiple people. Bots and deliberate Auth-account creation are not fully prevented. Firestore rules enforce shape/ownership/atomic increments and inactivity for an existing identity, not human identity or bot-proof uniqueness. Client clock skew affects active thresholds and may temporarily reject a renewal/heartbeat. Background timer throttling and network failure delay counts. Nothing implies official assessment or a verified audience size.

The global total document is suitable for the small community MVP; high write contention requires a separately designed sharded/trusted aggregate. Aggregation queries cost reads, each Home polls once per minute, and timestamp storage grows. Monitor Firebase usage and billing; do not claim unlimited free scaling. App Check, abuse controls, operational cleanup and a trusted backend remain future work rather than secretly added infrastructure.

## Validation and deployment

Unit tests cover the30-minute boundary and recent/visible/new activity requirement. Emulator tests cover atomic counting, private ownership, denied standalone increments, heartbeat cooldown, public-field restrictions, monotonic totals, stale active expiry and old-receipt access. Isolated Chrome tests exercise initial load, refresh, multiple tabs/concurrent reports, two independent browsers, five-minute active expiry,30-minute renewal using backdated demo fixtures, heartbeat, desktop/mobile wrapping and unavailable state. All test writes target demo-kuiz-igcse only. Desktop viewport emulation does not prove physical Android behavior.

Deploy Firestore rules with Hosting; source publication alone does not activate them. Production QA is read-only: asset hashes, bounded aggregate queries and denied private-owner access. Do not seed fake visits or run disposable production Auth/profile writes. A missing summary before the first real visit is valid.

References: [Firestore aggregation queries](https://firebase.google.com/docs/firestore/query-data/aggregation-queries), [rules conditions and atomic writes](https://firebase.google.com/docs/firestore/security/rules-conditions).
