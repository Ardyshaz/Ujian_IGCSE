import { firebaseConfig, useEmulators } from './firebase-config.js';
const version = '13.3.0';
let connection;
export function connectFirebase() {
  return connection ||= initialise().catch(error => { connection = null; throw error; });
}
async function initialise() {
  let config = firebaseConfig;
  const local = ['localhost','127.0.0.1'].includes(location.hostname);
  if (!config?.apiKey && !(useEmulators && local)) {
    const response = await fetch('/__/firebase/init.json');
    if (response.ok) { try { config = await response.json(); } catch {} }
  }
  if (useEmulators && local) config = {projectId:'demo-kuiz-igcse',apiKey:'demo-key',appId:'demo-app'};
  if (!config?.projectId || !config?.apiKey || !config?.appId) throw new Error('Config Firebase belum tersedia. Isi public/js/firebase-config.js menggunakan config Web App kuiz-igcse, atau gunakan Firebase Hosting emulator. Panduan dan Bank Soalan masih boleh dibuka.');
  if (useEmulators && !local) throw new Error('Emulator hanya dibenarkan pada localhost.');
  const [appSDK, authSDK, dbSDK] = await Promise.all(['app','auth','firestore'].map(product => import(`https://www.gstatic.com/firebasejs/${version}/firebase-${product}.js`)));
  const app = appSDK.initializeApp(config);
  const auth = authSDK.getAuth(app), db = dbSDK.getFirestore(app);
  if (useEmulators) {
    authSDK.connectAuthEmulator(auth, 'http://127.0.0.1:9099', {disableWarnings:true});
    dbSDK.connectFirestoreEmulator(db, '127.0.0.1', 8080);
  }
  await authSDK.setPersistence(auth, authSDK.browserLocalPersistence);
  await auth.authStateReady();
  const user = auth.currentUser || (await authSDK.signInAnonymously(auth)).user;
  return {app, db, ownerId:user.uid, sdk:dbSDK};
}
export function firebaseMessage(error) {
  if (error.code === 'auth/configuration-not-found') return 'Firebase Authentication belum disediakan. Buka Firebase Console → Authentication → Get started, kemudian aktifkan Anonymous di Sign-in method.';
  if (error.code === 'auth/operation-not-allowed') return 'Aktifkan Anonymous Authentication di Firebase Console untuk menyimpan profil.';
  if (error.code === 'permission-denied') return 'Firestore menolak akses. Semak rules pemilik dan projek Firebase yang digunakan.';
  if (['unavailable','auth/network-request-failed'].includes(error.code)) return 'Sambungan Firebase terganggu. Cuba semula; keputusan belum disahkan tersimpan.';
  return error.message || 'Firebase belum dapat dihubungkan.';
}
