# Optional Google Analytics (GA4)

Implementation date:16 November2026. Registered property:kuiz-igcse (564419858),stream igcse-web (16345584767),Measurement ID G-F9W4PLD4G9 verified through Firebase Web App metadata. The property link alone does not activate frontend collection.

## Activation status

The owner confirmed Enhanced Measurement OFF on16 November2026. Privacy QA passed and analyticsConfig.enabled=true in public/js/analytics-config.js permits production-host collection only after explicit opt-in. Google signals should also be OFF in the property; its Console setting has not been independently verified. The tag explicitly disables signals and advertising personalization. Deployment and GA4 receipt evidence are recorded separately in the validation log; enabling the switch alone does not prove ingestion.

Console:GA4 Admin > Data streams > igcse-web > Enhanced Measurement OFF. Keep Ads links/personalization and Google signals off. Use the existing property,not a duplicate. Review retention settings and the site's child/guardian privacy requirements before broader use; this implementation is not certification of legal compliance or verified parental identity.

## Consent and UI

No Analytics SDK or Google tag is loaded before a valid explicit allow choice. Unknown,denied,expired,invalid or unavailable storage defaults to off. Consent is a180-day versioned browser-local choice,independent of Firebase Auth/learner data. It is not proof of a verified guardian account. After the initial route renders on an enabled host,a first-visit popup asks Izinkan analitik penggunaan? when no valid choice exists. Equal-style Izinkan Analitik and Tolak actions save the choice and close it; Nanti,Escape,the close icon or outside click dismiss without consent and may prompt again on a subsequent load. Privacy details are expandable. Saved allow/deny suppresses the popup until the180-day choice expires or is cleared. The home card and permanent Privasi Analitik footer action remain available. All learning/profile/export functions remain available when declined.

Only enabled production hosts may collect. Localhost,emulators and other hosts are off by default. Withdrawal sets ga-disable immediately,disables the SDK,denies analytics/ad consent and removes only the app's mrsm_ga-prefixed cookies; it does not clear Firebase Auth,local drafts or learner records. Storage changes synchronize existing tabs. Data already sent before withdrawal cannot be undone by a browser toggle.

## Allowed app events

- page_view:controlled page_name/title and origin/#known-page only; repeated rerenders of the same page are deduplicated.
- quiz_start/quiz_complete:allowlisted subject and quiz_mode only; completion follows acknowledged save and is deduplicated in-page.
- report_export:pdf/json format only after preparation succeeds.

Never send student/guardian/school names,Auth/profile/attempt/question IDs,answer text,score,comment,search input,PDF filename,raw href/query/hash,DOM title or referring URL. Unknown events and unrecognized enum values are dropped; no pre-consent event queue is retained. App UI never logs feedback form content.

Basic opt-in gates the SDK itself rather than loading a denied-consent tag that could emit cookieless pings. Firebase Analytics/gtag may emit standard first_visit/session_start/engagement metadata after consent; these are not custom learner events. Google processes network/browser/device identifiers and IP-related information:do not describe Analytics as collecting no personal data or as entirely anonymous. No Firebase user ID is assigned to GA. Ads storage,user-data and personalization consent always remain denied. Default page/referrer values are sanitized before initialization and on subsequent app events. Host-only Analytics cookies expire after30days without rolling refresh.

Enhanced Measurement must be disabled server-side to avoid automatic form,download,search,history/outbound events outside this allowlist. Existing adblockers/unsupported browsers may prevent metrics; Analytics failure never blocks the app. Consent-based metrics do not count every visitor.

## Verification and operations

Five new policy unit tests cover consent defaults/expiry,allowed choices,URL sanitization,private-field dropping and unknown events. npm run test:analytics:ui uses local Firebase emulators plus a mocked Analytics SDK to prove no Analytics import before consent,denial/reload,allow,ads flags,URL/content filtering,withdrawal,cookie/identity isolation,cross-tab withdrawal and mobile360/390 layout. This mocked test does not prove GA4 server receipt. A controlled real-SDK transport test and Realtime/DebugView confirmation must be recorded separately before claiming ingestion.

When enabled and deployed,check GA4 Realtime or DebugView using an explicit test opt-in. Disable Enhanced Measurement before testing and never seed real child identifiers into Analytics. Optionally register event-scoped dimensions subject,quiz_mode,export_format,page_name for reports. Keep GA4 access admin-only; ordinary users see only their learning records,not Analytics admin reports.

Official references checked16 November2026:
- https://firebase.google.com/docs/analytics/web/get-started
- https://firebase.google.com/docs/reference/js/analytics
- https://support.google.com/analytics/answer/14009635

See [privacy](../operations/PRIVACY_AND_SECURITY.md),[validation](../testing/VALIDATION.md) and [roadmap](../../Task.md).
