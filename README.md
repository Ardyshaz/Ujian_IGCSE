<div align="center">
  <img src="public/assets/book.svg" width="72" height="72" alt="Ikon buku MRSM IGCSE">
  <h1>MRSM - Persediaan Ujian IGCSE</h1>
  <p>Panduan, latihan dan kuiz percuma untuk pelajar serta ibu bapa.</p>
  <p><strong>English · Mathematics · Science</strong></p>
  <h2><a href="https://kuiz-igcse.web.app">Buka Aplikasi Live</a></h2>
  <p><a href="https://kuiz-igcse.web.app"><strong>https://kuiz-igcse.web.app</strong></a></p>
  <p>100% percuma · UI Bahasa Melayu · Mesra telefon</p>
</div>

**Repo:** https://github.com/Ardyshaz/Ujian_IGCSE

Versi ini ialah MVP untuk percubaan komuniti. Aplikasi dibangunkan secara bebas; bukan platform rasmi MARA, MRSM atau Cambridge. Format tepat ujian kemasukan mesti disemak melalui arahan rasmi.

## Ciri yang tersedia

- 300 soalan asli:100 setiap subjek,62 topik,7 jenis jawapan; penerangan dan semakan jawapan.
- Practice, Simulasi Ujian, Challenge dan Daily Challenge; pemasa, sambung draf dan semakan soalan berwarna emas secara automatik.
- Profil keluarga, sejarah kuiz, Dashboard, prestasi subjek/topik dan pencapaian peribadi dalam Firestore.
- Panduan pelajar/ibu bapa, glosari English-BM dan rujukan rasmi yang ditandakan status pengesahannya.
- Laporan PDF A4 profesional dan salinan data JSON. [Contoh laporan - data rekaan](docs/examples/Contoh-Laporan-Prestasi.pdf).
- Maklum balas peribadi yang dibaca admin melalui Firebase Console; bukan ruangan komen awam.
- Sokongan komuniti, Simpan QR, penafian penuh dan paparan responsif.

## Mula secara tempatan

Perlu Node24+ dan npm. Firebase CLI ialah dependency pembangunan projek.

```powershell
npm ci
npm run setup:emulators
npm run emulators
```

Buka http://localhost:3000. Emulator Auth/Firestore memerlukan Java21+ yang disokong CLI. Gunakan projek demo yang sudah ditetapkan; jangan jalankan dua server pada port3000 serentak. Jangan commit perubahan config tempatan.

Untuk menggunakan Firestore sebenar secara tempatan:

1. Isi public Firebase Web App config sendiri dalam `public/js/firebase-config.js` yang diabaikan Git.
2. Jalankan `npm run setup:cloud`, kemudian `npm run dev`.
3. Pastikan Anonymous Authentication dan owner-scoped rules disediakan untuk projek anda.

`npm ci` menyediakan config daripada contoh hanya jika fail tempatan belum wujud; ia tidak menimpa config sedia ada. Firebase Hosting boleh membaca config Web App melalui reserved init.json. Tiada service-account key atau token diperlukan dalam frontend.

## Semakan

```powershell
npm test
npm run check:content
npm run check:docs
npm run check:repo
```

Ujian rules, browser dan PDF: [panduan ujian](docs/testing/README.md). Ujian browser menggunakan Chrome terpasang dan profil terpencil; ujian emulator tidak menyentuh rekod keluarga sebenar. [Rekod pengesahan](docs/testing/VALIDATION.md) membezakan ujian emulator dengan laman live.

## Susunan projek

```text
public/       SPA, bank soalan tunggal, imej dan vendor berlesen
scripts/      dev/, qa/, validate/
tests/        unit/, rules/
docs/         project/, architecture/, operations/, features/, content/, research/
docs/archive/ prompt asal, prototaip dan jejak keperluan
.local/       fail peribadi/tempatan - tidak dimasukkan ke Git
```

[Indeks dokumentasi](docs/README.md) | [Prompt autoritatif](full_prompt.md) | [Roadmap](Task.md) | [Arahan ejen](AGENTS.md)

## Privasi dan batasan

Gunakan nama panggilan. Identiti Anonymous terikat kepada pelayar/laman; rekod localhost tidak muncul secara automatik pada domain live. Mengeksport data sebelum membersihkan storan pelayar membantu menyimpan salinan, tetapi pemulihan akaun/restore merentas peranti belum dilaksanakan. Skor/pemasa dikawal klien untuk latihan, bukan peperiksaan yang kalis manipulasi.

Semakan bebas oleh guru, akaun penjaga yang boleh dipulihkan, backup/restore cloud, retention dan kawalan penyalahgunaan lanjutan masih dalam [roadmap](Task.md). PDF ialah laporan bacaan, JSON salinan data; kedua-duanya bukan janji backup cloud automatik. Komen peribadi tidak termasuk dalam eksport profil.

[Privasi/keselamatan](docs/operations/PRIVACY_AND_SECURITY.md) | [Admin maklum balas](docs/features/FEEDBACK_ADMIN.md) | [Eksport PDF](docs/features/REPORT_EXPORT.md)

## Deployment dan sumbangan

Hosting:folder `public/`; Firestore rules/indexes di root. [Panduan deployment](docs/operations/DEPLOYMENT.md). Push ke GitHub tidak menerbitkan Hosting secara automatik; Templat CI belum diaktifkan dan tidak memegang credential deployment.

Express/SQLite, database lama, slip anak, nota calon, sumber PDF Gemini, log dan hasil QA kekal secara tempatan dalam `.local/`. Prompt asal/prototaip awam diarkibkan tanpa perubahan; kandungan penuh projek kekal dalam full_prompt.md. Lihat [peta pengemasan](docs/operations/REPOSITORY_LAYOUT.md).

Lesen vendor disertakan bersama jsPDF, Lucide dan Noto Sans. Tiada lesen baharu ditetapkan untuk keseluruhan kod projek melalui pengemasan ini.


Analitik pilihan:integrasi GA4 diaktifkan untuk domain produksi selepas pemilik mengesahkan Enhanced Measurement OFF. Tiada SDK Analytics dimuatkan sebelum persetujuan penjaga; pengguna boleh menolak atau mematikannya melalui Privasi Analitik. [Dasar dan status](docs/features/ANALYTICS.md).


Engine latihan mengutamakan soalan belum direkodkan dan ulang kaji kesilapan selepas24jam,dengan campuran subjek/Level mengikut bekalan soalan. Dashboard membezakan soalan unik daripada ulangan. [Cara pemilihan dan batasan](docs/features/LEARNING_ENGINE.md).


Dashboard kini menonjolkan Istilah Hari Ini dan prestasi mengikut mod. Glosari mengandungi180 istilah English-BM dengan carian serta kategori. [Penerangan dan sumber](docs/features/DASHBOARD_GLOSSARY.md).
