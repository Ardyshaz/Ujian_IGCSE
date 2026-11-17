# Wall Of Excellence Minggu Ini and private profile editing

Updated18 November2026. Authority:[full_prompt.md](../../full_prompt.md). This is the current automatic v2 design. The earlier Bintang Pembelajaran name,guardian checkbox/custom public nickname and manual publishing workflow are superseded by the owner's explicit new request. Existing family profile editing remains unchanged.

## Public experience

Home shows Wall Of Excellence Minggu Ini with Top5 categories:Peneroka Soalan,Konsisten Belajar,English,Mathematics,Science. Published cards open a limited weekly achievements popup. The selected learner's summary synchronizes automatically when completed history is read during app use,including after a saved quiz. No enrollment form,guardian checkbox or admin refresh is required. No privileged server/paid service was added.

Public names are generated aliases such as Pelajar A1B2C3,derived only from a separate random public UUID. They are never shortened versions of the profile's name and never include a school,state,guardian,Auth UID,student ID,answer,question ID or attempt history. The app does not bulk-publish old private profiles through an admin scan;existing learners obtain an opaque alias when they next use their profile. A new profile with no completed work has no published card. Historical work can contribute to the current-week summary on the next synchronization.

Tetapan paparan shows the alias privately to the family and provides Sembunyikan pencapaian saya / Paparkan pencapaian saya. Hiding atomically stores enabled=false and deletes the public projection. The preference persists across refresh,further practice and synchronization. Enabling allows automatic recreation. Profile deletion removes projection,mapping and preference before deleting private history. Already viewed/cached/screenshotted/backed-up copies cannot be recalled. Losing the Anonymous browser identity may require admin assistance. Aliases are pseudonyms,not a guarantee that nobody could ever correlate a score with other information;do not claim legal compliance or verified parental consent.

## Calculation and trust boundary

The weekly window starts Monday00:00 in Asia/Kuala_Lumpur. Shared pure code accepts known published question IDs with matching versions/subjects,recomputes correctness from bank keys,and uses stored server createdAt timestamps (including SDK Timestamp conversion). Peneroka Soalan counts weekly distinct IDs;Konsisten Belajar counts distinct submission days. Subject ranking requires30 lifetime-first encounters occurring in the current week. Repeats do not become new first encounters;wrong/blank first answers stay incorrect. Under30 subject counts have null correct/accuracy in public data.

Crucial limitation:v2 summaries are computed and submitted by the owner's browser. They are explicitly self_reported,not admin-verified. Firestore rules constrain ownership,alias,field allowlists,bounds,internal arithmetic and visibility,but cannot prove that an aggregate matches the whole private history or that work was independent. A modified client could submit a plausible aggregate. The public bank exposes answer keys as before. Labels therefore say self-directed practice,not official assessment,verified ranking or admission prediction. This intentional tradeoff enables automatic updates within the existing client-only Firebase architecture;it supersedes the earlier no-client-summary-write decision without opening private records.

Thresholds and weekly comparison are product defaults,not validated educational calibration. Different question Levels/exposure still affect comparisons. After exhausting the existing bank,a learner may continue in exploration/consistency while lacking30 new subject items in a later week.

## Data and rules

- students:private family fields;only owner may read or update display_name,guardian_name,year_level,school_name,state. Immutable ID,owner and creation time remain protected.
- hallConsents/{studentId}:legacy collection name retained for private visibility preferences. v2 fields:ownerId,publicId,generated alias,version2,enabled,original server createdAt. It is not evidence of guardian consent. Private get is owner-only (missing-doc read permits setup);list denied. v1 records migrate to opaque aliases on next owner use.
- hallOwners/{publicId}:private ownerId/studentId mapping plus server createdAt. Owner-only get,atomic setup/deletion,no list/update.
- hallEntries/{publicId}:public allowlisted alias,weekStart,uniqueQuestions,activeDays,subjects,version2,source=self_reported,five category score fields,publishedAt server timestamp,expiresAt week-end timestamp. No identity/private fields accepted. Small-sample scores are masked. Counts are bounded to current300-item/100-per-subject bank and seven days.

Only the mapped owner with an enabled v2 preference may create/update a summary. Cross-owner writes,real-name aliases,private extra fields,invalid counts and inconsistent scores are denied. Hiding must remove the projection in the same atomic operation. A stale client cannot recreate it while disabled. Family profile reads and all attempt/feedback rights are unchanged. Full profile deletion still cleans both private/public community records.

Top5 is queried independently for each category:current week,score descending,unique count descending,active days descending,opaque document ID ascending,limit5. Five explicit composite indexes support these queries. Results are merged only for display;rank is derived from the query,not accepted from a participant. This remains correct beyond the earlier30-entry read cap. Public list requests remain bounded to30. The app can show an error/retry while indexes/network are unavailable without blocking quizzes.

Synchronization suppresses concurrent runs per profile,skips unchanged summaries,and checks the latest preference in a transaction before publishing. Network/sync failure does not invalidate private saved attempts. It retries through subsequent profile use. There is no scheduled background refresh for inactive users,automatic TTL cleanup or claim of real-time updates when the browser is closed. Other-week/expired records are hidden by queries/UI;old documents persist until owner activity,hide/deletion or maintenance removes them. A trusted scheduled/verified publisher is a separate future architecture/billing decision.

The old local publish-hall.js is retained for legacy preview/audit only;--publish is disabled so it cannot overwrite v2 runtime projections. No admin token or privileged code is served from public.

## Profile editing and exports

Edit profil remains under Profil keluarga and inside the profile modal. It edits display nickname,optional guardian label,Darjah1-6/Tingkatan1-5,school and one of16 states/federal territories. Blank optional data can be cleared;legacy records without state remain valid. A shared Anonymous family browser may manage its family profiles;there is no separate login per child. Public alias is independent of profile-name changes.

Attempts and original scores/IDs are not rewritten. JSON exports include the private profile;PDF uses current BM level labels and school/state. School/state never enter a public projection. Existing quiz review flags,submission retry,private feedback,Analytics consent and disclaimers remain protected.

## Verification and open work

Tests cover legacy compatibility,automatic aliases (including numeric random codes),first/repeat semantics,Top5 over35 additional synthetic projections,profile privacy,small-sample masking,ownership/schema restrictions,automatic sync without checkbox/admin,persistent hide/resume and profile-delete cleanup. All write tests use demo emulators. See [executed evidence](../testing/VALIDATION.md).

Open:trusted anti-abuse/assessment backend if required,recoverable guardian accounts,App Check/cost controls,independent fairness/accessibility review and physical-device testing. No production child is enrolled through a QA fixture.
