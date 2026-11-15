import { escapeHtml as h, icon } from './ui.js';

export const sources = [
  ['MARA MyMRSM: pengambilan 2027', 'https://mrsm.mara.gov.my/mymrsm/'],
  ['MARA: syarat dan pilihan program', 'https://mrsm.mara.gov.my/mymrsm/Syarat%20dan%20Pilihan%20Program%20MRSM.pdf'],
  ['MARA: FAQ permohonan 2027', 'https://mrsm.mara.gov.my/mymrsm/FAQ%20MYMRSM2026.pdf'],
  ['Cambridge IGCSE overview', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/'],
  ['Cambridge Lower Secondary', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/'],
  ['Cambridge subject and syllabus directory', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/'],
  ['MARA: semakan UKKM / Ujian Khas Tingkatan 1 2027', 'https://mrsm.mara.gov.my/semakanukkmf1/'],
];
const source = index => `<a class="source-link" href="${sources[index][1]}" target="_blank" rel="noopener noreferrer">${icon('external-link')} ${h(sources[index][0])} · disemak 15 Nov 2026</a>`;
const card = (title, body, index, wide = false) => `<article class="panel guide-card ${wide ? 'wide' : ''}"><h2>${h(title)}</h2>${body}${index != null ? source(index) : '<small class="muted">Panduan pembelajaran umum</small>'}</article>`;

export const glossary = [
  ['Fraction','Pecahan','A part of a whole. One half is 1/2.','Mathematics'],
  ['Percentage','Peratus','A number out of 100. 25% is one quarter.','Mathematics'],
  ['Perimeter','Ukur keliling','The total distance around a shape.','Mathematics'],
  ['Area','Luas','The amount of surface inside a two-dimensional shape.','Mathematics'],
  ['Volume','Isi padu','The space taken up by a three-dimensional object.','Mathematics'],
  ['Ratio','Nisbah','A comparison of quantities, such as 2 red counters to 3 blue.','Mathematics'],
  ['Estimate','Anggarkan','Find an approximate value. 198 + 302 is about 500.','Command word'],
  ['Calculate','Hitung','Work out a numerical answer and show useful steps.','Command word'],
  ['Compare','Bandingkan','Describe similarities and differences using evidence.','Command word'],
  ['Describe','Huraikan','Give the main features or what happens.','Command word'],
  ['Explain','Terangkan','Give a reason or show how something happens.','Command word'],
  ['Deduce','Deduksikan','Use information given to reach a logical conclusion.','Command word'],
  ['Evaluate','Nilaikan','Make a reasoned judgement using evidence.','Command word'],
  ['Gravity','Graviti','The force of attraction between masses. Earth pulls objects towards it.','Science'],
  ['Friction','Geseran','A force that opposes sliding between touching surfaces.','Science'],
  ['Evaporation','Penyejatan','A liquid changing to gas at its surface.','Science'],
  ['Photosynthesis','Fotosintesis','Plants use light to make food from water and carbon dioxide.','Science'],
  ['Investigation','Penyiasatan','A planned way to answer a question using observations or tests.','Science'],
  ['Evidence','Bukti','Information or observations that support a conclusion.','Science'],
  ['Conclusion','Kesimpulan','A statement supported by the results of an investigation.','Science'],
  ['Variable','Pemboleh ubah','Something that can change in an investigation.','Science'],
  ['Independent variable','Pemboleh ubah dimanipulasikan','The factor deliberately changed in a fair test.','Science'],
  ['Dependent variable','Pemboleh ubah bergerak balas','The result measured as another factor changes.','Science'],
  ['Control variable','Pemboleh ubah dimalarkan','A factor kept the same to make the comparison fair.','Science'],
  ['Hypothesis','Hipotesis','A testable proposed explanation or prediction.','Science'],
  ['Density','Ketumpatan','Mass per unit volume. Compare equal volumes carefully.','Science'],
  ['Conjunction','Kata hubung','A word joining ideas, such as because, and or although.','English'],
  ['Inference','Inferens','A conclusion based on clues in a text, not just a guess.','English'],
  ['Synonym','Sinonim','A word with a similar meaning, such as small and little.','English'],
  ['Antonym','Antonim','A word with an opposite meaning, such as early and late.','English'],
  ['Tense','Kala','A verb form showing time, such as walked or is walking.','English'],
  ['Punctuation','Tanda baca','Marks such as commas and full stops that organise writing.','English'],
  ['State','Nyatakan','Give the requested fact, name or value directly. If the question also asks why, include a reason.','Command word'],
  ['Suggest','Cadangkan','Offer a sensible idea using what you know about the situation; more than one response may be valid.','Command word'],
  ['Predict','Ramalkan','Use evidence or a pattern to say what is likely to happen next.','Command word'],
  ['Summarise','Ringkaskan','Give the main points briefly, leaving out less important details.','Command word'],
  ['Justify','Wajarkan','Support your answer with relevant reasons or evidence.','Command word'],
  ['Determine','Tentukan','Find the answer from the information given, for example by calculating or reading a graph.','Command word'],
  ['Contrast','Bezakan','Point out differences between the things being considered.','Command word'],
  ['Product','Hasil darab','The result of multiplication. The product of 3 and 4 is 12.','Mathematics'],
  ['Quotient','Hasil bahagi','The result of division. The quotient of 12 divided by 3 is 4.','Mathematics'],
  ['Difference','Beza','The result of subtraction. The difference between 9 and 4 is 5.','Mathematics'],
  ['Sequence','Jujukan','An ordered list following a rule, such as 2, 4, 6, 8: add 2 each time.','Mathematics'],
  ['Coordinate','Koordinat','A value locating a point on an axis; a pair such as (3, 2) locates a point on a grid.','Mathematics'],
  ['Probability','Kebarangkalian','How likely an event is. A fair coin has a probability of 1/2 of landing heads.','Mathematics'],
  ['Equation','Persamaan','A statement that two expressions are equal, such as 2x + 1 = 5.','Mathematics'],
  ['Symmetry','Simetri','A matching arrangement under a change. Line symmetry matches a reflection; rotational symmetry matches a turn.','Mathematics'],
  ['Characteristic','Ciri','A feature of an organism or material, such as a bird having feathers.','Science'],
  ['Absorb','Menyerap','Take in matter or energy. A sponge absorbs water; a dark surface absorbs light.','Science'],
  ['Reflect','Memantulkan','Send a wave back from a surface. A mirror reflects light; an echo is reflected sound.','Science'],
  ['Insulator','Penebat','A poor conductor in the stated context. Plastic is a useful electrical insulator; trapped air can reduce heat transfer.','Science'],
  ['Conductor','Konduktor','A material that transfers heat or electric charge readily in the stated context. Copper conducts electricity well.','Science'],
  ['Respiration','Respirasi','Reactions in cells that release energy from food. Aerobic respiration uses oxygen; anaerobic respiration does not.','Science'],
  ['Ecosystem','Ekosistem','Organisms and non-living surroundings interacting in an area, such as a pond.','Science'],
  ['Soluble','Larut','Able to dissolve in a stated solvent under the conditions given. Sugar is soluble in water.','Science'],
  ['Solution','Larutan','A uniform mixture formed when a solute dissolves in a solvent, such as sugar dissolved in water.','Science'],
  ['Context','Konteks','Surrounding words or circumstances that help explain meaning. Use the whole sentence to interpret a word.','English'],
  ['Narrative','Naratif / penceritaan','An account of connected events: a story with a sequence, characters and setting.','English'],
  ['Persuade','Memujuk / meyakinkan','Try to convince someone using reasons, evidence or an appeal to their feelings.','English'],
  ['Prefix','Awalan','Letters added before a root word to change its meaning, such as un- in unhappy.','English'],
  ['Suffix','Akhiran','Letters added after a root word, such as -ness in kindness.','English'],
  ['Adjective','Kata adjektif / kata sifat','A word that describes a noun or pronoun, such as blue in the blue car.','English'],
  ['Adverb','Kata keterangan','A word modifying a verb, adjective or another adverb, such as quickly in walked quickly.','English'],
  ['Identify','Kenal pasti','Name or select the requested feature. Identify the organ that pumps blood: the heart.','Command word'],
  ['Define','Takrifkan','Give the precise meaning of a term in the question’s subject context.','Command word'],
  ['Outline','Nyatakan secara ringkas','Give the main features or steps briefly; detailed discussion is not normally needed.','Command word'],
  ['Label','Labelkan','Add the correct name to a part of a diagram, using the line or position indicated.','Command word'],
  ['Complete','Lengkapkan','Add the missing information to a sentence, calculation, diagram or table.','Command word'],
  ['Arrange','Susun','Put items in the stated order. For ascending order, start with the smallest value.','Command word'],
  ['Show your working','Tunjukkan langkah pengiraan','Write the useful calculation steps, not only the final number.','Command word'],
  ['Sum','Hasil tambah','The result of addition. The sum of 7 and 5 is 12.','Mathematics'],
  ['Total','Jumlah','The amount altogether. Three groups of 4 contain a total of 12.','Mathematics'],
  ['Each','Setiap satu','For every individual item. If each pen costs RM2, three pens cost RM6.','Mathematics'],
  ['Remaining','Baki','What is left after something is taken away. From 10 sweets, eating 3 leaves 7 remaining.','Mathematics'],
  ['At least','Sekurang-kurangnya','Not smaller than the stated amount; the boundary is included. At least 5 means 5 or more.','Mathematics'],
  ['At most','Paling banyak / tidak melebihi','Not greater than the stated amount; the boundary is included. At most 5 means 5 or fewer.','Mathematics'],
  ['Average (mean)','Purata (min)','Add all the values and divide by how many there are. The mean of 2, 4 and 9 is 5.','Mathematics'],
  ['Median','Median','The middle value after sorting. In 2, 5, 9 the median is 5; for two middle values, find their mean.','Mathematics'],
  ['Mode','Mod','The value occurring most often. In 2, 2, 5, the mode is 2; a set may have several modes or none.','Mathematics'],
  ['Range','Julat','In a data set, the largest value minus the smallest. For 3, 7 and 11, the range is 8.','Mathematics'],
  ['Numerator','Pengangka','The top number in a fraction. In 3/4, the numerator is 3.','Mathematics'],
  ['Denominator','Penyebut','The bottom number in a fraction. In 3/4, the denominator is 4.','Mathematics'],
  ['Equivalent','Setara','Having the same value in this context. The fractions 1/2 and 2/4 are equivalent.','Mathematics'],
  ['Multiple','Gandaan','A result of multiplying by a whole number. 12 is a multiple of 3 because 3 × 4 = 12.','Mathematics'],
  ['Factor','Faktor','A whole number dividing another exactly. 3 is a factor of 12, with no remainder.','Mathematics'],
  ['Prime number','Nombor perdana','A whole number greater than 1 with exactly two positive factors, 1 and itself. 7 is prime; 1 is not.','Mathematics'],
  ['Radius','Jejari','A straight-line distance from the centre of a circle to its edge.','Mathematics'],
  ['Diameter','Diameter','A straight line across a circle through its centre. Its length is twice the radius.','Mathematics'],
  ['Circumference','Lilitan','The distance around a circle, unlike its area inside.','Mathematics'],
  ['Observation','Pemerhatian','What is noticed or measured. Leaves became yellow is an observation; the proposed reason is an explanation.','Science'],
  ['Fair test','Ujian yang adil','A comparison changing one relevant factor while keeping other relevant conditions the same.','Science'],
  ['Condensation','Kondensasi / pemeluwapan','A gas changing into a liquid, such as water droplets forming on a cold surface.','Science'],
  ['Dissolve','Melarut','Mix into a solvent to form a solution. Dissolving sugar is different from melting it.','Science'],
  ['Solute','Zat terlarut','The substance dissolved in a solvent. In sugar water, sugar is the solute.','Science'],
  ['Solvent','Pelarut','The substance in which a solute dissolves. In sugar water, water is the solvent.','Science'],
  ['Noun','Kata nama','A word naming a person, place, thing or idea, such as teacher, river or kindness.','English'],
  ['Verb','Kata kerja','A word expressing an action or state, such as run, think or is.','English'],
  ['Except','Kecuali','Find the one that does not fit the statement. All are mammals except a frog: choose the frog.','Exam wording'],
  ['Most likely','Paling berkemungkinan','Choose the option best supported by the evidence, rather than something merely possible.','Exam wording'],
  ['Refer to','Rujuk kepada','Use the indicated text, table, picture or information when answering.','Exam wording'],
];

export function studentGuide() {
  return `<h1>Kenali laluan anda. Bersedia dengan yakin.</h1><p class="subtitle guide-intro">Panduan ringkas untuk memahami MRSM IGCSE, membina asas dan belajar mengikut rentak sendiri.</p>
    <div class="guide-grid">
      ${card('Kenali MRSM dan IGCSE', '<p>MRSM ialah Maktab Rendah Sains MARA. Program IGCSE yang diterangkan oleh MARA menggabungkan kurikulum kebangsaan, MRSM dan Cambridge. Semak susunan subjek serta pelaksanaan untuk kohort anda dengan pihak maktab.</p><p>Ujian kemasukan berbeza daripada peperiksaan Cambridge IGCSE yang diambil kemudian di sekolah menengah. Jangan anggap kedua-duanya mempunyai format yang sama.</p>',1)}
      ${card('Mulakan dengan asas yang kukuh', '<p>Cambridge Lower Secondary biasanya untuk umur 11–14 tahun, manakala IGCSE biasanya untuk umur 14–16 tahun. Latihan di sini bermula dengan asas sekolah rendah dan turut mempunyai soalan persediaan menengah.</p><p>Anda tidak perlu menguasai seluruh silibus IGCSE sebelum Tingkatan 1. Kukuhkan bacaan, asas nombor dan rasa ingin tahu dahulu.</p>',4)}
      ${card('English: baca, faham dan gunakan', '<ul><li>Baca petikan pendek setiap hari. Pilih tiga perkataan baharu dan gunakannya dalam ayat.</li><li>Baca seluruh soalan, kemudian kenal pasti command word serta bukti dalam petikan.</li><li>Bezakan maklumat yang dinyatakan dengan inference berdasarkan petunjuk.</li><li>Semak tense, subject–verb agreement dan punctuation semasa menulis.</li></ul>')}
      ${card('Mathematics: tukar ayat kepada langkah', '<ul><li>Tanya: apa yang diberi dan apa yang perlu dicari?</li><li>Tulis unit. Gunakan bar model, jadual atau lakaran jika membantu.</li><li>Pilih operasi, tunjuk jalan kerja dan anggarkan sama ada jawapan munasabah.</li><li>Contoh: 20% daripada RM60 ialah RM12. Harga selepas diskaun ialah RM48.</li></ul>')}
      ${card('Science: fikir seperti penyiasat', '<ul><li>Kenal pasti apa yang diubah dan apa yang diukur.</li><li>Dalam fair test, ubah satu faktor dan kekalkan faktor lain yang berkaitan.</li><li>Baca paksi, skala dan unit sebelum membandingkan graf.</li><li>Terangkan pemerhatian dengan sebab saintifik, bukan hafalan istilah sahaja.</li></ul>')}
      ${card('Urus masa dan bina keyakinan', '<ul><li>Mulakan dengan latihan tanpa pemasa. Cuba set bermasa apabila sudah bersedia.</li><li>Jika soalan sukar, tanda untuk semakan dan kembali selepas soalan yang lebih mudah.</li><li>Baca penerangan jawapan dan cuba terangkan semula dengan ayat sendiri.</li><li>Amalkan sesi pendek, rehat secukupnya dan minta bantuan apabila perlu.</li><li>Untuk persediaan berasrama, biasakan diri menyusun barang dan berkomunikasi apabila memerlukan sokongan. Pengalaman setiap maktab boleh berbeza.</li></ul>')}
      ${card('Cuba latihan menulis ringkas', '<p>Tulis empat ayat dalam English tentang aktiviti yang anda suka. Mulakan dengan idea utama, tambah dua butiran sokongan dan akhiri dengan ayat penutup.</p><p><strong>Rubrik semakan sendiri:</strong> Adakah idea utama jelas? Adakah butiran berkaitan? Adakah ayat tersusun? Semak ejaan dan punctuation. Minta orang dewasa bincangkan satu kekuatan dan satu penambahbaikan.</p><p>Latihan ini untuk semakan sendiri atau manusia. Aplikasi tidak memberi markah automatik kepada penulisan subjektif atau mencampurkannya dengan markah kuiz objektif.</p>')}
      ${card('Fahami maksud markah latihan', '<p>Markah menunjukkan prestasi pada set tertentu sahaja. Cubaan semula disimpan sebagai rekod baharu; pembetulan selepas feedback tidak memadam jawapan pertama yang disemak.</p><p>Petunjuk ini bukan gred Cambridge atau ramalan kemasukan. Semua soalan di sini ialah latihan asli yang tidak rasmi. Rujuk sumber rasmi bagi kod sukatan dan tahun peperiksaan yang berkaitan.</p>',3)}
    </div>${glossarySection()}`;
}

export function parentGuide() {
  return `<div lang="ms"><h1>Bersedia bersama, selangkah demi selangkah.</h1><p class="subtitle guide-intro">Panduan ibu bapa tentang laluan MRSM, pembelajaran IGCSE dan sokongan yang praktikal.</p>
    <div class="alert warning"><strong>Maklumat penting:</strong> Ringkasan rasmi di bawah dirujuk kepada sumber MARA untuk pengambilan 2027. Tarikh, tempat dan masa ujian ialah maklumat khusus calon: semak slip serta surat panggilan anak. Format tepat Ujian Khas IGCSE belum disahkan sebagai satu format umum.</div>
    <div class="guide-grid">
      ${card('Semakan panggilan dan surat ujian', '<p>Gunakan portal semakan rasmi MARA untuk UKKM Tingkatan 1 2027. Pautan ini membuka laman MARA; aplikasi latihan ini tidak meminta atau menghantar nombor pengenalan anak.</p><p>Padankan tarikh, pusat dan masa yang tertera pada slip. Jika label UKKM dan Ujian IGCSE dipaparkan bersama, jangan andaikan tempoh setiap komponen: rujuk surat menduduki ujian penuh dan arahan calon. Simpan slip secara peribadi.</p>',6)}
      ${card('Kemasukan Tingkatan 1: semak laluan anak', '<p>Portal MARA menyenaraikan laluan PKSK atau UKKM mengikut kategori calon, serta Ujian Khas bagi calon program tertentu yang layak. Jangan anggap semua calon melalui satu format yang sama.</p><p>Semak status pendaftaran murid, syarat, pilihan program dan arahan semasa. Simpan maklumat permohonan serta surat panggilan; gunakan dokumen khusus pengambilan, bukan artikel lama.</p>',0)}
      ${card('Apakah program MRSM IGCSE?', '<p>Panduan program MARA menggabungkan kurikulum kebangsaan, kurikulum MRSM dan Cambridge. Panduan yang disemak menyatakan peperiksaan IGCSE pada akhir Tingkatan 4 dan SPM pada Tingkatan 5.</p><p>Dapatkan gabungan mata pelajaran serta susunan pembelajaran sebenar daripada maktab dan kohort anak. Maklumat ini bukan jaminan semua kohort mempunyai jadual yang sama.</p>',1)}
      ${card('Premier, IGCSE dan pilihan lain', '<p>Nama program menandakan penekanan yang berbeza. Program IGCSE memasukkan laluan Cambridge; jangan memilih hanya kerana label atau menganggap satu pilihan sesuai untuk semua anak.</p><p>Baca penerangan rasmi setiap program, bincangkan minat dan kesediaan anak, serta semak lokasi dan syarat khusus. Jangan bergantung pada andaian penempatan alternatif secara automatik.</p>',1)}
      ${card('Cambridge IGCSE: fahami kelayakan', '<p>IGCSE ialah kelayakan peringkat menengah. Struktur penilaian berbeza mengikut subjek, kod sukatan, tahun dan laluan. English First Language dan Second Language tidak boleh dianggap sama; Mathematics dan sains juga mempunyai pilihan yang berbeza.</p><p>Gred sebenar datang daripada penilaian rasmi. Kategori prestasi dalam aplikasi ini hanyalah petunjuk latihan dalaman.</p>',3)}
      ${card('Beban belajar, kelebihan dan cabaran', '<p>Laluan gabungan memerlukan pengurusan masa dan kesediaan menggunakan istilah akademik bahasa Inggeris. Pendedahan kepada cara soalan berbeza boleh membantu pembelajaran, tetapi manfaat bergantung pada pengalaman dan keperluan anak.</p><p>Bincangkan kehidupan berasrama, rehat, sokongan guru, kos dan minat anak. Elakkan perbandingan yang merendahkan keyakinan atau menjanjikan peluang universiti/biasiswa secara automatik.</p>')}
      ${card('Kos, bantuan dan tanggungjawab keluarga', '<p>Minta jadual yuran dan kos peperiksaan Cambridge terkini daripada pihak maktab. Semak subjek, siri peperiksaan, bayaran lain dan sama ada kos tertentu ditanggung keluarga.</p><p>Semak skim bantuan termasuk BUDI melalui MARA. Jumlah, kekerapan dan syarat kelayakan perlu disahkan; angka daripada laporan atau artikel lama bukan jaminan bayaran atau bantuan semasa.</p>',0)}
      ${card('Persediaan English, Matematik dan Sains', '<ul><li><strong>English:</strong> baca petikan pendek, bincang makna perkataan dan minta anak menerangkan bukti jawapan.</li><li><strong>Matematik:</strong> fokus pada pecahan, peratus, nisbah dan masalah berayat. Semak unit dan langkah pengiraan.</li><li><strong>Sains:</strong> bincang pemerhatian, pemboleh ubah dan graf mudah. Minta sebab, bukan jawapan hafalan sahaja.</li><li><strong>Sokongan:</strong> puji usaha dan strategi. Jangan latih anak memberi respons personaliti yang tidak jujur.</li></ul>')}
      ${card('Cadangan rutin mingguan', '<ul><li>Isnin: 15–20 minit bacaan English dan tiga perkataan baharu.</li><li>Selasa: satu set Matematik pendek, kemudian semak langkah.</li><li>Rabu: Sains berasaskan situasi atau graf.</li><li>Khamis: ulang topik yang sukar dan glosari.</li><li>Jumaat: satu latihan campuran yang tenang.</li><li>Hujung minggu: bincang prestasi dan aktiviti santai. Laraskan masa mengikut tenaga anak.</li></ul>')}
      <section class="panel guide-card wide"><h2>Soalan lazim ibu bapa</h2>
      ${faq('Adakah markah latihan meramalkan kemasukan MRSM?','Tidak. Markah hanya menunjukkan prestasi pada set latihan tertentu. Keputusan rasmi bergantung pada proses MARA yang berkenaan.')}
      ${faq('Adakah simulasi ini sama dengan ujian sebenar?','Tidak. Tempoh dan bilangan soalan ialah tetapan latihan. Format tepat Ujian Khas IGCSE belum disahkan; rujuk arahan rasmi anak.')}
      ${faq('Adakah hanya English, Matematik dan Sains diperlukan?','Tiga subjek ini ialah fokus bank latihan awal, bukan senarai lengkap komponen rasmi. Semak PKSK, UKKM dan Ujian Khas mengikut laluan pengambilan.')}
      ${faq('Bagaimana saya memantau prestasi?','Pilih profil anak dan buka Prestasi Saya. Semak sejarah, topik serta perubahan skor. Data sedikit belum cukup untuk membuat kesimpulan; lihat juga cara anak menerangkan jawapan.')}
      ${faq('Adakah profil ini akaun peribadi yang berasingan?','Tidak. Aplikasi tempatan ini digunakan bersama dalam satu isi rumah. Pengguna pelayar pada peranti ini boleh menukar profil. Ia belum sesuai untuk penggunaan berbilang keluarga melalui internet.')}
      ${faq('Bolehkah saya memadam rekod anak?','Buka profil isi rumah untuk eksport atau padam data. Pemadaman data langsung tidak memadam salinan sandaran lama; urus sandaran secara berasingan.')}
      ${faq('Bagaimana dengan universiti dan biasiswa?','Semak kriteria institusi atau skim tertentu pada tahun permohonan. Jangan anggap sijil IGCSE menjamin tawaran, biasiswa atau pengecualian syarat lain.')}
      ${source(2)}</section>
    </div></div>`;
}
function faq(question, answer) { return `<details><summary>${h(question)}</summary><p>${h(answer)}</p></details>`; }
export function glossarySection() { return `<section class="panel glossary"><h2>Glosari Pembelajaran English–Malay</h2><p class="muted small">${glossary.length} istilah berguna dengan contoh ringkas. Baca seluruh soalan: maksud dan terjemahan bergantung pada konteks.</p><div class="glossary-controls"><div class="field"><label for="glossary-search">Cari dalam glosari</label><input id="glossary-search" type="search" placeholder="Cari istilah, maksud atau subjek…"></div><div class="field"><label for="glossary-category">Kategori</label><select id="glossary-category"><option value="">Semua kategori</option>${[['Command word','Kata tugas (Command words)'],['Mathematics','Mathematics'],['Science','Science'],['English','English'],['Exam wording','Frasa soalan']].map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select></div></div><div class="alert"><strong>Baca dengan teliti:</strong> <em>State</em> meminta jawapan terus; <em>explain</em> meminta sebab atau cara. <em>At least</em> termasuk nilai sempadan, manakala <em>except</em> meminta pilihan yang tidak menepati pernyataan.</div><div id="glossary-results">${glossaryRows('')}</div><a class="source-link" href="https://www.cambridgeinternational.org/exam-administration/what-to-expect-on-exams-day/command-words/" target="_blank" rel="noopener noreferrer">Panduan command words Cambridge · disemak 15 Nov 2026</a><p class="dialog-note">Maksud dipermudah untuk pembelajaran dengan terjemahan editorial BM. Ini bukan skema rasmi atau senarai istilah yang disahkan akan keluar dalam ujian kemasukan tertentu.</p></section>`; }
export function glossaryRows(search,category='') {
  const entries = glossary.filter(row => (!category||row[3]===category)&&row.join(' ').toLowerCase().includes(search.trim().toLowerCase()));
  const count=`<p class="small muted" role="status">${entries.length} daripada ${glossary.length} istilah${category?` · ${h(category)}`:''}</p>`;
  return count+(entries.length ? `<table class="glossary-table"><thead><tr><th scope="col">English</th><th scope="col">Bahasa Melayu</th><th scope="col">Maksud & contoh</th></tr></thead><tbody>${entries.map(([en, ms, definition,group]) => `<tr><td><strong lang="en">${h(en)}</strong><small class="glossary-group">${h(group)}</small></td><td lang="ms">${h(ms)}</td><td lang="en">${h(definition)}</td></tr>`).join('')}</tbody></table>` : '<p class="muted">Tiada istilah sepadan. Cuba carian lebih ringkas atau kategori lain.</p>');
}
export function about() {
  return `<h1>Ruang belajar yang dibina dengan teliti.</h1><p class="subtitle guide-intro">Untuk pelajar Malaysia dan ibu bapa yang menyokong langkah seterusnya.</p><div class="guide-grid">
    ${card('Latihan asli, semangat komuniti', '<p>MRSM – Persediaan Ujian IGCSE menggabungkan latihan asli, penerangan dan panduan bersumber. PENAFIAN: Platform ini dibangunkan secara bebas untuk tujuan pendidikan dan latihan sahaja. Semua bahan bukan penerbitan rasmi dan tidak disokong, ditaja atau mempunyai sebarang kaitan dengan MARA, MRSM atau Cambridge.</p><p>Aplikasi ini bukan simulator rasmi ujian kemasukan. Ia tidak menjamin tawaran, meramal keputusan atau mengeluarkan gred rasmi. Fokus awal ialah asas sekolah rendah dan persediaan pembelajaran menengah.</p>')}
    ${card('Rekod keluarga dalam pemasangan ini', '<p>Profil dan cubaan yang selesai disimpan dalam Firebase Firestore. Draf jawapan disimpan dalam pelayar ini. Sambungan Internet diperlukan untuk simpanan cloud. Tiada pemarkahan AI luaran atau leaderboard awam. Analitik penggunaan pilihan melalui Google Analytics hanya dimulakan selepas penjaga mengizinkan, apabila ciri ini diaktifkan. Nama, jawapan dan komen tidak dihantar oleh aplikasi; Google boleh memproses pengecam pelayar dan maklumat peranti. Pilihan boleh diubah melalui Privasi Analitik di footer. Firebase Anonymous Authentication mengenal pasti pemilik pada pelayar ini; setiap profil keluarga bukan akaun berasingan.</p><p>Sesiapa yang menggunakan pelayar ini boleh menukar profil keluarga. Lindungi akses komputer anda. Memadam data laman boleh menghilangkan akses identiti Anonymous tanpa memadam rekod cloud. Pemulihan dan akses merentas peranti belum tersedia; eksport dahulu. Dapatkan izin penjaga sebelum menyimpan maklumat anak. Eksport atau padam profil melalui panel profil; urus backup secara berasingan.</p>')}
    ${card('Cara soalan dan markah berfungsi', '<p>Soalan latihan asli berasaskan objektif pembelajaran yang relevan. Bukan soalan peperiksaan rasmi Cambridge.</p><p>Setiap soalan mempunyai topik, Level dan penerangan. Mod latihan mengekalkan jawapan pertama yang disemak untuk markah; cubaan selepas feedback membantu pembelajaran. Soalan pengiraan menilai jawapan akhir; penerangan menunjukkan jalan kerja. Penulisan subjektif menggunakan rubrik semakan sendiri atau manusia secara berasingan.</p><p>Jika jawapan kurang jelas, bincang dengan orang dewasa. Semakan kandungan dan batasannya direkodkan dalam dokumentasi; semakan guru bebas masih diperlukan sebelum penggunaan awam yang dihoskan.</p>')}
    ${card('Percuma, bermula secara tempatan', '<p>Pemasangan ini berjalan pada localhost untuk keluarga yang dipercayai. Akaun awam, kebenaran penjaga, keselamatan produksi dan operasi hosting memerlukan kerja tambahan sebelum pelancaran komuniti.</p><p>Panduan backup terdapat dalam README projek. Backup mungkin masih mengandungi rekod yang sudah dipadam, jadi lindungi dan urus tempoh simpanannya. Belum ada deployment awam.</p><p>Sistem ini percuma. Sumbangan melalui pautan sokongan adalah sukarela dan tidak membuka atau mengehadkan mana-mana ciri pembelajaran.</p>')}
    <section class="panel guide-card wide"><h2>Rujukan rasmi</h2><p class="small muted">Disemak pada 15 November 2026. Maklumat kemasukan mengikut pengambilan tertentu; peraturan subjek mengikut kod dan tahun sukatan. Format tepat ujian khas, jumlah yuran/bantuan, ambang markah dan kuota masih memerlukan pengesahan yang berkaitan.</p><div class="resource-list">${sources.map((_, i) => source(i)).join('')}</div></section></div>`;
}
