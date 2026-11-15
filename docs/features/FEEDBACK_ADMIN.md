# Maklum Balas - private admin reading

The live footer has Maklum Balas beside the support link. Users select category, optional nickname and a5-2000-character message. No learner profile is required and no email/phone/child identifier is collected. Messages are not displayed publicly, and the sender cannot read them back through the app. The confirmation receipt contains only submission ID and server timestamp.

## Admin steps

1. Sign in with the Google account that has authorised administrative/data access to project kuiz-igcse.
2. Open https://console.firebase.google.com/project/kuiz-igcse/firestore.
3. Choose the default database, Data, then collection feedback.
4. Open a document to read category, message, optional displayName, page (route name only), createdAt and ownerId. Use createdAt for order/date. Category codes: cadangan,masalah,soalan,lain.
5. Remove messages through the Console when no longer needed; limit project IAM access to authorised maintainers. Do not forward/publish private comments without appropriate permission.

There is deliberately no public admin dashboard or app-admin login in this MVP. Possessing the public Firebase config or being Anonymous-authenticated gives no read access. Firebase Console uses privileged project/IAM permissions independently of Web Security Rules. Do not make feedback readable to all users to build an admin page. A future in-app inbox requires a separately designed verified admin role.

## Access and retry

feedback allows constrained signed-in create only; get/list/update/delete from every web client are denied. feedbackRateLimits/{uid} permits only that UID to read its receipt; no collection list and no message/nickname in a receipt. Both writes must commit atomically. Rules require server timestamps, valid fields/length/category/route and at least60seconds between submissions for the same UID. A retry checks the same receipt ID before creating a new message. A20-second acknowledgement timeout does not cancel a potentially committing batch; retry preserves ID to avoid duplication.

Anonymous identities can be replaced and distributed abuse is possible; this simple cooldown does not replace App Check/abuse/cost monitoring. Those remain roadmap tasks. Profile deletion/export covers learner records; feedback is a separate admin-managed record and is not automatically deleted/exported with a learner profile. Manual admin deletion/retention process is required; no automatic retention is claimed. Comment drafts remain in module memory only, clearing on page reload.

## Verification

npm run test:feedback:rules:23 actual emulator privacy,validation,atomicity and cooldown checks. npm run test:feedback:ui:real Web SDK browser flow against emulators by default. TEST_REAL_FIREBASE=1 TEST_BASE_URL=https://kuiz-igcse.web.app switches to live integration and uses existing CLI IAM strictly in Node to inspect/delete its own synthetic fixture. No privileged credential or test helper is served from public. See VALIDATION.md for actual results.
