import { api, post, exportStudent } from './api.js';
import { escapeHtml as h, icon, icons, title, percent, date, datetime, duration, subjectIcon, empty, toast, dialog, closeDialog, dialogHeader, performanceLabel, milestoneLabel, questionTypeLabel } from './ui.js';
import { studentGuide, parentGuide, about, glossaryRows } from './guides.js';
import { showSupport, reserveFooterSpace } from './support.js';
import { homeGuide } from './home-guide.js';
import { showFeedback } from './feedback.js';

const navigation = [['home','house','Laman Utama'],['quiz','play','Mula Kuiz'],['bank','layers','Bank Soalan'],['progress','chart-no-axes-column-increasing','Prestasi Saya'],['student','book-open','Panduan Pelajar'],['parent','users','Panduan Ibu Bapa'],['about','info','Tentang Projek']];
const modes = [['practice','sprout','Belajar dengan feedback serta-merta.'],['examination','clock','Latihan fokus dengan pemasa.'],['challenge','zap','Cabar kefahaman anda.'],['daily','target','Lapan soalan, sedikit setiap hari.']];
const app = document.querySelector('#app');
let boot, learner, stats, currentQuiz, currentResult, index = 0, timer, serverOffset = 0, routeVersion = 0;
let setup = {mode:'practice',subject:'mixed',topic:'',difficulty:'',count:10,secondsPerQuestion:120,timed:false};
let bank = {subject:'',topic:'',difficulty:'',type:'',search:'',offset:0};
let bankTotal = 0;
let saveChain = Promise.resolve();
const pendingSaves = new Map();
let setupVersion = 0, bankVersion = 0;
let pendingStart;
let submissionPromise = null;
let resultFilter = 'all';

function activeId() { try { return localStorage.getItem('igcse-active-profile'); } catch { return null; } }
function remember(id) { try { localStorage.setItem('igcse-active-profile',id); } catch { /* profile selection is optional convenience */ } }
function go(route) { if (location.hash === `#${route}`) renderRoute(); else location.hash = route; }
async function bootstrap() {
  boot=await api('/bootstrap');
  learner=boot.students.find(s=>s.id===activeId()) || boot.students[0] || null;
  if(learner) remember(learner.id);
}
function shell() {
  const page=location.hash.slice(1).split('/')[0] || 'home';
  app.innerHTML=`<aside class="sidebar" id="sidebar" aria-label="Navigasi utama"><a class="brand" href="#home"><img src="/assets/book.svg" alt=""><span><strong>MRSM</strong><small>Persediaan Ujian IGCSE</small></span></a><nav class="nav">${navigation.map(([id,symbol,label])=>`<a href="#${id}" class="${page===id || (id==='quiz' && ['session','result'].includes(page))?'active':''}" ${page===id?'aria-current="page"':''}>${icon(symbol)}${label}</a>`).join('')}</nav><div class="sidebar-bottom"><button class="household-button" data-action="profiles">${icon('circle-user-round')}<span>Profil keluarga<small>${h(learner?.display_name||'Cipta profil pelajar')}</small></span>${icon('chevron-right')}</button><p class="sidebar-note">Belajar. Berlatih. Tingkatkan prestasi.<br>Satu langkah pada satu masa.</p></div></aside>
    <div class="app-main"><header class="topbar"><div class="topbar-left"><button class="menu-button" data-action="menu" aria-label="Buka atau tutup navigasi" aria-expanded="false">${icon('menu')}</button><span class="mobile-brand"><img src="/assets/book.svg" alt="">MRSM IGCSE</span><span class="top-date">${icon('calendar-days')}${new Date().toLocaleDateString('ms-MY',{weekday:'short',day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kuala_Lumpur'})}</span></div><button class="profile-button" data-action="profiles" aria-label="Pilih profil pelajar"><span class="avatar">${h(learner?.display_name?.slice(0,1).toUpperCase()||'G')}</span><span class="profile-name">${h(learner?.display_name||'Tetamu')}</span>${icon('chevron-down')}</button></header><main class="content" id="main" tabindex="-1"></main></div>`;
  icons();
}
const main=()=>document.querySelector('#main');
async function renderRoute() {
  const version=++routeVersion;
  clearInterval(timer);
  shell();
  const [rawRoute,id]=location.hash.slice(1).split('/');
  const route=rawRoute||'home';
  main().innerHTML='<div class="skeleton" role="status">Menyediakan ruang pembelajaran anda…</div>';
  try {
    stats=learner?await api(`/dashboard/${learner.id}`):null;
    if(version!==routeVersion)return;
    if(route==='home')main().innerHTML=home();
    else if(route==='quiz')await quizSetup();
    else if(route==='bank')await questionBank();
    else if(route==='progress')main().innerHTML=progress();
    else if(route==='student')main().innerHTML=studentGuide();
    else if(route==='parent')main().innerHTML=parentGuide();
    else if(route==='about')main().innerHTML=about();
    else if(route==='session' && id)await session(id);
    else if(route==='result' && id){currentResult=await api(`/attempts/${id}`);resultFilter='all';main().innerHTML=resultScreen();}
    else main().innerHTML=`<h1>Mari kembali ke laman utama.</h1><p>Halaman ini tidak ditemui.</p><a class="button" href="#home">Ke Laman Utama</a>`;
    icons();
    if(route==='student'&&id==='glossary')document.querySelector('.glossary')?.scrollIntoView({block:'start'});
  } catch(error) { main().innerHTML=`<section class="panel error-page"><h1>Halaman ini belum dapat dibuka.</h1><p>${h(error.message)}</p><button class="button" data-action="reload">Cuba semula</button><a class="button secondary" href="#home">Ke Laman Utama</a></section>`;icons(); }
}
function subjectRows(){return boot.subjects.map(s=>`<button class="subject-row" data-subject="${s.id}">${icon(subjectIcon(s.id))}<strong>${h(s.name)}</strong><span>${s.count} soalan</span><span class="chevron">${icon('chevron-right')}</span></button>`).join('');}
function home() {
  return `${boot.cloudError?`<div class="alert warning" role="status">${h(boot.cloudError)}</div>`:''}<h1>Persediaan ke MRSM IGCSE bermula di sini.</h1><p class="subtitle">${learner?`Selamat kembali, ${h(learner.display_name)}. `:''}Bina keyakinan anak anda, satu soalan pada satu masa.</p>
  <section class="hero"><div><h2>Pilih Subjek Anda</h2><p>Pilih subjek di bawah untuk mula buat latihan dan ulang kaji.</p></div><button class="button" data-action="start">Mula Ulang Kaji ${icon('arrow-right')}</button></section>
  ${homeGuide()}
  ${stats?.active.length?`<div class="alert"><strong>Ada kuiz yang belum selesai.</strong> Jawapan yang disimpan masih tersedia. <a href="#session/${stats.active[0].id}">Sambung ${h(title(stats.active[0].mode))}</a></div>`:''}
  <div class="learning-grid"><section><div class="section-header"><h2>Latih Tubi Subjek</h2></div><div class="subject-list">${subjectRows()}</div></section><section class="panel daily"><div><h2 class="icon-heading">${icon('target')}Cabaran Harian (Daily Challenge)</h2><p>8 soalan campuran<br>English, Mathematics dan Science</p>${stats?.dailyComplete?'<p class="review-status">Selesai untuk hari ini. Bagus!</p>':'<p>Rutin kecil untuk membina keyakinan.</p>'}</div><button class="button" data-action="daily">${stats?.dailyComplete?'Cuba semula set hari ini':'Mula Cabaran Harian'} ${icon('arrow-right')}</button></section></div>
  <div class="lower-grid"><section class="panel welcome-panel"><h3 class="icon-heading">${icon(learner?'sparkles':'user-round-plus')}${learner?'Perjalanan pembelajaran anda':'Cipta Profil Pelajar'}</h3><p class="small muted">${learner?'Bina rutin sendiri, satu soalan pada satu masa.':'Cipta profil untuk menyimpan cubaan dan prestasi dalam Firebase. Draf kuiz disimpan dalam pelayar ini.'}</p>${learner?`<div class="section-header"><strong>${stats.streak} hari berturut-turut</strong><span class="small">${stats.points} mata</span></div><a class="button secondary small" href="#progress">Lihat prestasi saya ${icon('arrow-right')}</a>`:'<button class="button secondary" data-action="profiles">Cipta pelajar '+icon('arrow-right')+'</button>'}</section>
  <section class="panel"><h3 class="icon-heading">${icon('history')}Aktiviti Terkini</h3>${stats?.history.length?historyRows(stats.history.slice(0,3)):empty('Belum ada aktiviti.','Mulakan kuiz atau Cabaran Harian untuk merekodkan aktiviti di sini.','clipboard-list')}</section></div>`;
}
function historyRows(rows){return rows.map(r=>`<div class="history-row"><div><p>${h(title(r.mode||r.subject_id||'practice'))} · ${r.total_questions} soalan</p><small>${date(r.submitted_at)}${r.status==='expired'?' · Masa tamat':''}</small></div><span class="score">${percent(r.score_percent)}</span><a class="button secondary small" href="#result/${r.id}">Semak</a></div>`).join('');}

async function quizSetup() {
  const sequence=++setupVersion,view=routeVersion;
  const topics=await api(`/topics?subject=${setup.subject==='mixed'?'':setup.subject}`);
  const available=await api(`/questions?${new URLSearchParams({...(setup.subject!=='mixed'?{subject:setup.subject}:{}),...(setup.topic?{topic:setup.topic}:{}),...(setup.difficulty?{difficulty:setup.difficulty}:{}),limit:'1'})}`);
  if(sequence!==setupVersion || view!==routeVersion)return;
  main().innerHTML=`<h1>Jom mula berlatih.</h1><p class="subtitle">Pilih fokus anda. Kita buat satu soalan pada satu masa.</p>
  <div class="mode-grid" role="group" aria-label="Mod kuiz">${modes.map(([mode,symbol,copy])=>`<button class="mode-card ${setup.mode===mode?'active':''}" data-mode="${mode}" aria-pressed="${setup.mode===mode}">${icon(symbol)}<strong>${title(mode)}</strong><span>${copy}</span></button>`).join('')}</div>
  <form id="quiz-form" class="panel"><div class="section-header"><h2>${title(setup.mode)} — tetapan</h2><span class="small muted">${available.total} soalan sepadan</span></div>
  ${setup.mode==='daily'?'<p class="muted">Set harian mengandungi lapan soalan campuran mengikut tarikh Malaysia. Set bertarikh yang sama digunakan dalam pemasangan ini. Mengulangnya tidak memberi ganjaran harian kali kedua.</p>':`<div class="form-grid"><div class="field"><label for="subject">Subjek</label><select id="subject" name="subject">${['mixed','english','mathematics','science'].map(s=>`<option value="${s}" ${setup.subject===s?'selected':''}>${title(s)}</option>`).join('')}</select></div><div class="field"><label for="topic">Topik</label><select id="topic" name="topic"><option value="">Semua topik</option>${topics.map(t=>`<option value="${h(t.id)}" ${setup.topic===t.id?'selected':''}>${h(t.name)} (${t.count})</option>`).join('')}</select></div><div class="field"><label for="difficulty">Kesukaran</label><select id="difficulty" name="difficulty"><option value="">${setup.mode==='challenge'?'Campuran cabaran (Level 3–5)':'Campuran seimbang'}</option>${['Mudah','Asas','Sederhana','Lanjutan','Cabaran / HOTS'].map((d,i)=>`<option value="${i+1}" ${Number(setup.difficulty)===i+1?'selected':''}>Level ${i+1}: ${d}</option>`).join('')}</select></div><div class="field"><label for="count">Bilangan soalan</label><input type="number" min="1" max="50" id="count" name="count" value="${setup.count}" required></div><div class="field"><label for="seconds">Masa setiap soalan jika pemasa digunakan</label><select id="seconds" name="secondsPerQuestion">${[30,60,90,120,180,300].map(n=>`<option value="${n}" ${Number(setup.secondsPerQuestion)===n?'selected':''}>${n} saat</option>`).join('')}</select><small class="muted">Tetapan latihan, bukan peraturan peperiksaan rasmi.</small></div><div class="field">${setup.mode==='practice'?`<label class="check"><input id="timed" type="checkbox" ${setup.timed?'checked':''}>Gunakan pemasa pilihan</label>`:'<p class="small muted">Mod ini menggunakan pemasa. Jawapan dan penerangan dipaparkan selepas dihantar.</p>'}</div></div>`}
  <div class="alert ${learner?'':'warning'}">${learner?`Rekod untuk <strong>${h(learner.display_name)}</strong>. `:'Cipta atau pilih profil untuk menyimpan kuiz ini. '}Latihan asli dan tidak rasmi. Markah bukan ramalan kemasukan.</div>
  <div class="form-actions"><button class="button dark" type="submit">${icon('play')}Mula ${title(setup.mode)}</button><button class="button secondary" type="button" data-action="profiles">${learner?'Tukar pelajar':'Cipta pelajar'}</button></div></form>`;
  icons();
}
function readSetup(){const form=document.querySelector('#quiz-form');if(!form)return;const data=new FormData(form);for(const key of ['subject','topic','difficulty','count','secondsPerQuestion'])if(data.has(key))setup[key]=data.get(key);setup.timed=!!document.querySelector('#timed')?.checked;}
async function begin(settings=setup) {
  if(pendingSaves.size)await flushSave();
  if(!learner){pendingStart={...settings};profiles();return;}
  currentQuiz=await post('/quizzes/start',{...settings,count:Number(settings.count),secondsPerQuestion:Number(settings.secondsPerQuestion),studentId:learner.id});
  index=0;go(`session/${currentQuiz.id}`);
}
async function session(id) {
  currentQuiz=await api(`/quizzes/${id}`);
  if(currentQuiz.result){go(`result/${currentQuiz.result.id}`);return;}
  if(currentQuiz.status==='abandoned'){main().innerHTML='<h1>Kuiz ini telah diketepikan.</h1><p>Sejarah kuiz yang selesai kekal disimpan. Mulakan kuiz baharu apabila bersedia.</p><a class="button" href="#quiz">Mula kuiz baharu</a>';return;}
  const owner=boot.students.find(p=>p.id===currentQuiz.studentId);if(owner){learner=owner;remember(owner.id);}
  index=Math.min(index,currentQuiz.questions.length-1);
  serverOffset=currentQuiz.serverNow-Date.now();
  renderQuestion();
  if(currentQuiz.deadlineAt){updateTimer();timer=setInterval(updateTimer,1000);}
}
function renderQuestion() {
  const q=currentQuiz.questions[index], draft=currentQuiz.drafts[q.id]||{}, answered=Object.values(currentQuiz.drafts).filter(d=>d.answer!==null && d.answer!==undefined && String(d.answer).trim()!=='').length;
  main().innerHTML=`<div class="quiz-header"><div><h1>${h(title(currentQuiz.subject))} — ${h(title(currentQuiz.mode))}</h1><p class="small muted">${h(learner?.display_name)} · Latihan asli · ${currentQuiz.mode==='practice'?'Markah menggunakan jawapan pertama yang disemak.':'Penerangan dipaparkan selepas dihantar.'}</p></div>${currentQuiz.deadlineAt?`<div class="timer" role="timer" aria-label="Baki masa">${icon('timer')}<span id="timer-value">—</span></div>`:'<span class="small muted">Ikut rentak anda</span>'}</div>
  <div class="section-header"><span class="small">Soalan ${index+1} daripada ${currentQuiz.questions.length}</span><span class="small muted">${answered} dijawab</span></div><div class="progress-track" aria-label="Soalan dijawab"><div class="progress-fill" style="width:${answered/currentQuiz.questions.length*100}%"></div></div>
  <div class="quiz-layout"><div><section class="panel question-panel"><div class="question-meta"><span>${h(q.topic)} · Level ${q.difficulty}</span><span>${h(q.stage==='bridge'?'Persediaan menengah':'Asas sekolah rendah')}</span></div><div class="question-text" lang="en">${h(q.text)}</div>
  ${q.options?.length?`<div class="options" lang="en" role="group" aria-label="Pilihan jawapan">${q.options.map((o,i)=>`<button class="option ${draft.answer===o.id?'selected':''}" data-answer="${h(o.id)}" aria-pressed="${draft.answer===o.id}"><span><strong>${String.fromCharCode(65+i)}.</strong> ${h(o.text)}</span></button>`).join('')}</div>`:`<label class="field"><span>Jawapan anda ${['numerical','calculation'].includes(q.type)?'(nombor sahaja; ikut unit yang diminta)':''}</span><input id="typed-answer" autocomplete="off" ${['numerical','calculation'].includes(q.type)?'inputmode="decimal"':''} value="${h(draft.answer??'')}" placeholder="Taip jawapan anda"></label><p class="small muted">${q.type==='calculation'?'Jawapan akhir diberi markah. Bandingkan jalan kerja dengan penerangan selepas menjawab.':'Variasi ejaan hanya diterima jika dinyatakan dalam skema soalan.'}</p>`}
  <div id="feedback">${draft.feedbackSeen?'<p class="small muted">Anda sudah menyemak soalan ini. Cubaan seterusnya membantu pembelajaran; markah akhir kekal menggunakan jawapan pertama yang disemak.</p>':''}</div></section>
  <div class="quiz-actions"><div>${index>0?`<button class="button secondary" data-action="previous">${icon('arrow-left')}Kembali</button>`:''}${currentQuiz.mode==='practice'?'<button class="button secondary" data-action="check">Semak jawapan</button>':''}${index<currentQuiz.questions.length-1?'<button class="button" data-action="next">Seterusnya '+icon('arrow-right')+'</button>':'<button class="button" data-action="submit">Semak & hantar</button>'}</div></div><div id="save-status" class="save-status" role="status">Jawapan yang disimpan kekal tersedia selepas refresh.</div></div>
  <aside class="panel navigator"><h3>Navigasi soalan</h3><div class="question-dots">${currentQuiz.questions.map((item,i)=>{const d=currentQuiz.drafts[item.id]||{};return `<button class="${i===index?'current':''} ${d.answer!=null && String(d.answer).trim()!==''?'answered':''} ${d.flagged?'flagged':''}" data-jump="${i}" aria-label="Soalan ${i+1}${d.flagged?', ditanda untuk semakan':''}${d.answer!=null?', sudah dijawab':''}">${i+1}</button>`;}).join('')}</div><p class="small muted" style="margin-top:16px">Hijau: sudah dijawab<br>Emas: untuk semakan</p><button class="button dark small" data-action="submit">Hantar Jawapan</button><button class="button ghost small" data-action="abandon">Ketepikan</button></aside></div>`;
  icons();updateTimer();
}
function setSaveStatus(message,error=false){const el=document.querySelector('#save-status');if(el){el.textContent=message;el.style.color=error?'#a73d3d':'';}}
function queueSave(answer,flagged) {
  const quizId=currentQuiz.id,q=currentQuiz.questions[index], prior=currentQuiz.drafts[q.id]||{};
  currentQuiz.drafts[q.id]={...prior,...(answer!==undefined?{answer}:{}),...(flagged!==undefined?{flagged}: {})};
  const draft=currentQuiz.drafts[q.id];
  const data={questionId:q.id,answer:draft.answer??null,flagged:!!draft.flagged};
  const key=`${quizId}:${q.id}`,pending={quizId,data};
  pendingSaves.set(key,pending);
  setSaveStatus('Sedang menyimpan…');
  saveChain=saveChain.catch(()=>{}).then(()=>api(`/quizzes/${quizId}/answers`,{method:'PATCH',body:JSON.stringify(data)})).then(()=>{if(pendingSaves.get(key)===pending)pendingSaves.delete(key);setSaveStatus(pendingSaves.size?'Ada jawapan yang belum disimpan.':'Sudah disimpan di komputer ini.');}).catch(error=>{setSaveStatus(`Belum disimpan: ${error.message} Pilih atau masukkan semula jawapan untuk mencuba lagi.`,true);toast(error.message);throw error;});
  // Attach a handler immediately so a failed network save never becomes an unhandled rejection.
  saveChain.catch(()=>{});
  return saveChain;
}
async function flushSave(){
  await saveChain.catch(()=>{});
  for(const [key,pending] of pendingSaves){
    await api(`/quizzes/${pending.quizId}/answers`,{method:'PATCH',body:JSON.stringify(pending.data)});
    if(pendingSaves.get(key)===pending)pendingSaves.delete(key);
  }
  setSaveStatus('Sudah disimpan di komputer ini.');
}
async function move(next){await flushSave();index=next;renderQuestion();document.querySelector('.question-text')?.scrollIntoView({block:'nearest'});}
async function checkAnswer() {
  await flushSave();const q=currentQuiz.questions[index],draft=currentQuiz.drafts[q.id]||{};
  const savedFlag=queueSave(undefined,true);
  const dot=document.querySelector(`[data-jump="${index}"]`);
  dot?.classList.add('flagged');
  if(dot)dot.setAttribute('aria-label',`Soalan ${index+1}, ditanda untuk semakan${draft.answer!=null&&String(draft.answer).trim()!==''?', sudah dijawab':''}`);
  await savedFlag;
  const feedback=await post(`/quizzes/${currentQuiz.id}/feedback`,{questionId:q.id,answer:draft.answer});
  currentQuiz.drafts[q.id]={...draft,feedbackSeen:true,firstAnswer:feedback.firstAnswer,flagged:true};
  document.querySelector('#feedback').innerHTML=`<div class="alert ${feedback.correct?'success':'warning'}"><strong>${feedback.correct?'Betul, bagus!':'Mari fahami jawapannya.'}</strong><p class="small"><strong>Penerangan Jawapan</strong></p><p lang="en">${h(feedback.explanation)}</p><small>Markah menggunakan jawapan pertama yang disemak. Anda boleh cuba lagi untuk belajar.</small></div>`;
}
function updateTimer() {
  if(!currentQuiz?.deadlineAt)return;
  const seconds=Math.max(0,Math.ceil((currentQuiz.deadlineAt-(Date.now()+serverOffset))/1000));
  const display=document.querySelector('#timer-value');if(display)display.textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
  if(seconds===0 && timer){clearInterval(timer);timer=null;finish().catch(error=>toast(`Masa sudah tamat. ${error.message} Buka semula kuiz untuk menyemak keputusan yang disimpan.`));}
}
async function confirmSubmit() {
  await flushSave();const unanswered=currentQuiz.questions.filter(q=>{const a=currentQuiz.drafts[q.id]?.answer;return a==null || String(a).trim()==='';}).length;
  const flags=Object.values(currentQuiz.drafts).filter(a=>a.flagged).length;
  dialog(`${dialogHeader('Sedia untuk hantar?')}<p>Ada ${unanswered} soalan belum dijawab dan ${flags} ditanda untuk semakan.</p><p class="small muted">Soalan tanpa jawapan mendapat sifar. Rekod cubaan dan jawapan asal akan disimpan.</p><p id="submit-status" role="status" aria-live="polite"></p><p id="submit-error" class="dialog-error" role="alert" tabindex="-1" hidden></p><div class="form-actions"><button class="button dark" data-action="finish">Hantar & lihat keputusan</button><button class="button secondary" data-close>Teruskan semakan</button></div>`);
}
async function finish(){
  if(submissionPromise)return submissionPromise;
  const quizId=currentQuiz.id,button=document.querySelector('#dialog [data-action="finish"]'),status=document.querySelector('#submit-status'),errorBox=document.querySelector('#submit-error');
  if(button){button.disabled=true;button.textContent='Sedang menghantar?';}
  if(status)status.textContent='Sedang menyimpan keputusan ke Firebase?';
  if(errorBox){errorBox.hidden=true;errorBox.textContent='';}
  submissionPromise=(async()=>{
    await flushSave();
    const result=await post(`/quizzes/${quizId}/submit`);
    for(const [key,pending] of pendingSaves)if(pending.quizId===quizId)pendingSaves.delete(key);
    closeDialog();currentResult=result;go(`result/${result.id}`);return result;
  })().catch(error=>{
    if(errorBox?.isConnected){errorBox.hidden=false;errorBox.textContent=`Penghantaran belum dapat disahkan. ${error.message} Anda boleh cuba hantar semula; jawapan masih tersedia.`;errorBox.focus();}
    throw error;
  }).finally(()=>{
    submissionPromise=null;
    if(status?.isConnected)status.textContent='';
    if(button?.isConnected){button.disabled=false;button.textContent='Cuba hantar semula';}
  });
  return submissionPromise;
}
function resultScreen() {
  const r=currentResult,owner=boot.students.find(s=>s.id===r.studentId);
  const weak=Object.entries(r.answers.reduce((map,a)=>{if(!a.correct)map[a.question.topic]=(map[a.question.topic]||0)+1;return map;},{})).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const items=r.answers.filter(a=>resultFilter==='all'||(resultFilter==='wrong'&&!a.correct)||(resultFilter==='flagged'&&a.flagged));
  return `<div class="section-header"><h1>Setiap cubaan menambah kefahaman.</h1><a href="#progress" class="button secondary small">Prestasi Saya</a></div><p class="subtitle">${h(owner?.display_name||'Pelajar')} · ${h(title(r.subject))} · ${h(title(r.mode))} · ${datetime(r.date)} MYT</p>
  <div class="result-banner"><div class="result-number">${percent(r.percentage)}</div><div><h2>${h(performanceLabel(r.category))}</h2><p>Setiap penerangan ialah peluang untuk belajar.${r.status==='expired'?' Masa tamat dan jawapan yang disimpan telah dihantar.':''}</p><p>Petunjuk latihan dalaman. Bukan gred rasmi atau ramalan kemasukan.</p></div></div>
  <div class="stats">${[['Soalan',r.total],['Betul',r.correct],['Salah / belum dijawab',`${r.incorrect} / ${r.unanswered}`],['Masa diambil',duration(r.duration)]].map(([label,n])=>`<div class="panel stat"><span>${label}</span><strong>${n}</strong></div>`).join('')}</div>
  <div class="alert"><strong>Langkah seterusnya:</strong> ${weak.length?`Fokus sebentar pada ${weak.map(([topic])=>h(topic)).join(', ')}. Fahami sebab jawapan itu betul, kemudian cuba lagi.`:'Cuba topik baharu atau set lebih mencabar apabila bersedia.'}${r.mode==='practice'?' Mod latihan menggunakan jawapan pertama yang disemak, walaupun jawapan diubah selepas feedback.':''}</div>
  <div class="form-actions result-actions"><button class="button" data-action="retake">${icon('rotate-ccw')}Cuba semula set ini</button><button class="button secondary" data-action="retry-wrong" ${r.answers.every(a=>a.correct)?'disabled':''}>Latih soalan yang belum dikuasai</button><a class="button secondary" href="#quiz">Pilih latihan baharu</a></div>
  <div class="review-filters" role="group" aria-label="Tapis semakan jawapan">${[['all','Semua jawapan'],['wrong','Salah & belum dijawab'],['flagged','Ditanda untuk semakan']].map(([filter,label])=>`<button class="button secondary small ${resultFilter===filter?'active':''}" data-result-filter="${filter}">${label}</button>`).join('')}</div>
  ${items.length?items.map(a=>`<article class="panel review-item"><div class="section-header"><span class="review-status ${a.correct?'':a.unanswered?'blank':'wrong'}">${icon(a.correct?'circle-check':a.unanswered?'circle-dashed':'circle-x')}${a.correct?'Betul':a.unanswered?'Belum dijawab':'Salah'}</span><span class="small muted">${h(a.question.topic)} · Level ${a.question.difficulty}</span></div><div class="question-text" lang="en">${h(a.question.text)}</div><p><strong>Jawapan pertama anda:</strong> ${h(answerLabel(a.question,a.answer))}</p><p><strong>Jawapan betul:</strong> ${h(answerLabel(a.question,a.question.answer))}</p><div class="review-key"><strong>Penerangan Jawapan</strong><p lang="en">${h(a.question.explanation)}</p></div>${a.assisted?'<p class="small muted">Feedback digunakan dalam mod latihan. Markah mengekalkan jawapan pertama yang disemak.</p>':''}</article>`).join(''):empty('Tiada soalan dalam paparan ini.','Pilih penapis semakan yang lain.')}`;
}
function answerLabel(q,a){return a==null||String(a).trim()===''?'Belum dijawab':q.options?.find(o=>String(o.id)===String(a))?.text ?? a;}
function progress() {
  if(!learner)return `<h1>Mulakan dengan profil pelajar.</h1><p class="subtitle">Cipta profil untuk menyimpan cubaan dan melihat prestasi dari semasa ke semasa.</p><button class="button" data-action="profiles">Cipta pelajar</button>`;
  const s=stats;
  const trend=s.history.slice(0,12).reverse();
  return `<h1>Dashboard Prestasi Saya</h1><p class="subtitle">${h(learner.display_name)} — rekod pembelajaran untuk pelajar dan ibu bapa.</p>
  <div class="stats">${[['Kuiz selesai',s.total],['Purata markah',percent(s.average)],['Markah terbaik',percent(s.best)],['Hari berturut-turut',`${s.streak} hari`]].map(([label,value])=>`<div class="panel stat"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>
  <div class="split"><section class="panel"><h2>Prestasi mengikut subjek</h2><p class="small muted">Ketepatan berdasarkan jawapan pertama yang disimpan, termasuk set campuran.</p>${s.subjects.map(subject=>`<div class="chart-row"><span>${title(subject.id)}</span><div class="chart-bar" aria-hidden="true"><span class="${subject.id}" style="width:${subject.percentage||0}%"></span></div><strong>${percent(subject.percentage)}</strong></div><p class="sr-only">${title(subject.id)}: ${subject.count} soalan, ${subject.correct} betul, ${percent(subject.percentage)}.</p>`).join('')}
  <h3 style="margin-top:28px">Fokus latihan seterusnya</h3>${s.weakTopics.length? s.weakTopics.slice(0,4).map(t=>`<div class="history-row"><span class="small">${h(t.name)} · ${percent(t.percentage)}<br><small>${t.question_count} jawapan</small></span><button class="button secondary small" data-topic-practice="${h(t.topic_id)}" data-topic-subject="${h(t.subject_id)}">Latih tubi</button></div>`).join(''):'<p class="small muted">Selepas sekurang-kurangnya tiga jawapan bagi sesuatu topik, cadangan ulang kaji boleh diberikan. Teruskan meneroka dahulu.</p>'}
  ${s.strongTopics.length?`<div class="alert success"><strong>Topik yang semakin dikuasai:</strong> ${s.strongTopics.map(t=>h(t.name)).join(', ')}.</div>`:''}</section>
  <section class="panel"><div class="section-header"><h2>Pencapaian anda</h2><span class="small">${s.points} mata</span></div><p class="small muted">Pencapaian peribadi berdasarkan latihan sebenar. Mata ganjaran berasingan daripada markah akademik.</p>${s.milestones.map(m=>`<div class="milestone ${m.earned?'earned':''}">${icon(m.earned?'award':'lock-keyhole')}<div><strong>${h(milestoneLabel(m.name))}</strong><small>${h(milestoneLabel(m.description))} · ${m.earned?'Dicapai':'Belum lagi'}</small></div></div>`).join('')}<p class="small muted" style="margin-top:18px">Rekod harian mengikut waktu Malaysia. Rehat juga penting; streak ialah galakan, bukan kewajipan.</p></section></div>
  <section class="panel"><h2>Trend prestasi</h2>${trend.length>=2?`${trendChart(trend)}<p class="small muted">Terbaru: ${trend.length} cubaan — ${trend.map(r=>`${date(r.submitted_at)}: ${percent(r.score_percent)}`).join(' · ')}. Perbezaan soalan dan mod mempengaruhi perbandingan.</p>`:empty('Trend memerlukan lebih banyak rekod.','Selesaikan sekurang-kurangnya dua kuiz untuk membandingkan keputusan.','chart-line')}</section>
  <section class="panel" style="margin-top:24px"><h2>Sejarah cubaan</h2><p class="small muted">Purata markah memberi berat yang sama kepada setiap kuiz. Ketepatan subjek dikira mengikut soalan. Setiap cubaan semula disimpan berasingan.</p>${s.history.length?historyRows(s.history):empty('Belum ada cubaan yang selesai.','Pilih subjek dan mulakan set latihan pendek.','history')}</section>
  <section class="alert"><strong>Untuk ibu bapa:</strong> Semak satu penerangan bersama. Tanya anak bagaimana jawapan diperoleh; gunakan trend untuk berbincang, bukan meramal kemasukan. <a href="#parent">Baca Panduan Ibu Bapa</a></section>`;
}
function trendChart(rows){const points=rows.map((r,i)=>`${30+i*540/Math.max(1,rows.length-1)},${135-r.score_percent*1.1}`);return `<svg class="trend" viewBox="0 0 600 160" role="img" aria-label="Peratus markah kuiz daripada rekod terawal hingga terkini"><path d="M30 25H575 M30 80H575 M30 135H575" stroke="#e1e7ef" fill="none"/><text x="0" y="28" font-size="10" fill="#627187">100</text><text x="7" y="83" font-size="10" fill="#627187">50</text><text x="14" y="138" font-size="10" fill="#627187">0</text><polyline points="${points.join(' ')}" fill="none" stroke="#748fab" stroke-width="3"/>${points.map(p=>{const[x,y]=p.split(',');return `<circle cx="${x}" cy="${y}" r="5" fill="#e9b75e" stroke="#fff" stroke-width="2"/>`;}).join('')}</svg>`;}

async function questionBank() {
  const sequence=++bankVersion,view=routeVersion;
  const params=new URLSearchParams(Object.fromEntries(Object.entries(bank).filter(([,value])=>value!=='')));
  params.set('limit',12);
  const [data,topics]=await Promise.all([api(`/questions?${params}`),api(`/topics?subject=${bank.subject}`)]);
  if(sequence!==bankVersion || view!==routeVersion)return;
  bankTotal=data.total;
  main().innerHTML=`<h1>Cari soalan, kukuhkan kefahaman.</h1><p class="subtitle">Soalan asli dengan penerangan untuk membantu anda belajar.</p><form id="bank-filter" class="filters"><label class="sr-only" for="search">Cari soalan</label><input id="search" name="search" type="search" placeholder="Cari dalam teks soalan…" value="${h(bank.search)}"><label class="sr-only" for="bank-subject">Tapis mengikut subjek</label><select id="bank-subject" name="subject"><option value="">Semua subjek</option>${boot.subjects.map(s=>`<option value="${s.id}" ${bank.subject===s.id?'selected':''}>${s.name}</option>`).join('')}</select><label class="sr-only" for="bank-topic">Tapis mengikut topik</label><select name="topic" id="bank-topic"><option value="">Semua topik</option>${topics.map(t=>`<option value="${h(t.id)}" ${bank.topic===t.id?'selected':''}>${h(t.name)}</option>`).join('')}</select><label class="sr-only" for="bank-difficulty">Tapis mengikut kesukaran</label><select name="difficulty" id="bank-difficulty"><option value="">Semua Level</option>${[1,2,3,4,5].map(d=>`<option value="${d}" ${Number(bank.difficulty)===d?'selected':''}>Level ${d}</option>`).join('')}</select><label class="sr-only" for="bank-type">Tapis mengikut jenis soalan</label><select name="type" id="bank-type"><option value="">Semua jenis soalan</option>${[['mcq','Pilihan jawapan (MCQ)'],['true_false','Betul / Salah'],['fill_blank','Isi tempat kosong'],['short_answer','Jawapan ringkas'],['numerical','Jawapan nombor'],['reading','Kefahaman'],['calculation','Pengiraan']].map(([type,label])=>`<option value="${type}" ${bank.type===type?'selected':''}>${label}</option>`).join('')}</select><button class="button dark" type="submit">${icon('search')}Tapis Soalan</button></form>
  <div class="section-header"><p class="small muted" style="margin:0">${data.total} soalan diterbitkan sepadan dengan penapis anda</p><button class="button ghost small" data-action="reset-bank">Set semula penapis</button></div><div class="bank-list">${data.items.length?data.items.map(q=>`<article class="panel bank-question"><div class="question-meta"><span>${h(title(q.subject))} · ${h(q.topic)}</span><span>Level ${q.difficulty}</span></div><div class="question-text" lang="en">${h(q.text)}</div><div class="section-header"><div><span class="tag">${h(questionTypeLabel(q.type))}</span><span class="tag">${q.stage==='bridge'?'Persediaan menengah':'Asas sekolah rendah'}</span></div><button class="button secondary small" data-practise-question="${h(q.id)}" data-question-subject="${q.subject}">Practise ${icon('arrow-right')}</button></div></article>`).join(''):empty('Tiada soalan yang sepadan.','Cuba topik, Level atau carian lain.')}</div><div class="pagination"><button class="button secondary small" data-action="bank-prev" ${bank.offset===0?'disabled':''}>Kembali</button><span>${data.total?bank.offset+1:0}–${Math.min(bank.offset+12,data.total)} of ${data.total}</span><button class="button secondary small" data-action="bank-next" ${bank.offset+12>=data.total?'disabled':''}>Seterusnya</button></div><p class="small muted">Latihan asli dan tidak rasmi. Jawapan disemak selepas anda menjawab; skema jawapan tidak dimasukkan dalam senarai ini.</p>`;
  icons();
}
function profiles() {
  const element=dialog(`${dialogHeader('Profil pelajar keluarga')}<p class="small muted">Pilih pelajar untuk sesi hari ini.</p><div>${boot.students.map(s=>`<button class="profile-row" data-profile="${s.id}"><span class="avatar">${h(s.display_name[0].toUpperCase())}</span><span class="name"><strong>${h(s.display_name)}</strong><small class="muted">${h(s.year_level||'Pelajar')}</small></span>${icon(s.id===learner?.id?'circle-check':'chevron-right')}</button>`).join('')}</div><hr class="dialog-rule"><h3>Cipta profil pelajar</h3><form id="profile-form" class="dialog-form"><div class="field"><label for="displayName">Nama paparan</label><input id="displayName" name="displayName" maxlength="60" required autocomplete="off" placeholder="Nama pertama atau nama panggilan"></div><div class="form-grid"><div class="field"><label for="guardianName">Nama ibu bapa / penjaga (pilihan)</label><input id="guardianName" name="guardianName" maxlength="60" autocomplete="off"></div><div class="field"><label for="yearLevel">Darjah / tingkatan (pilihan)</label><select id="yearLevel" name="yearLevel"><option value="">Tidak dinyatakan</option><option value="Year 5">Darjah 5</option><option value="Year 6">Darjah 6</option><option value="Form 1">Tingkatan 1</option><option value="Form 2">Tingkatan 2</option><option value="Other">Lain-lain</option></select></div></div><details><summary>Label sekolah (pilihan)</summary><p class="dialog-note">Isi jika berguna untuk keluarga. Maklumat ini tidak diperlukan untuk kuiz.</p><input name="schoolName" maxlength="100" aria-label="Nama sekolah (pilihan)"></details><p class="dialog-note">Profil keluarga pada pelayar ini: sesiapa yang menggunakan pelayar ini boleh menukar profil dan melihat rekod keluarga. Ini bukan akaun peribadi berasingan. Nama penuh, nombor pengenalan dan butiran hubungan tidak diperlukan. Rekod profil dan cubaan dihantar ke Firebase. Identiti Anonymous terikat kepada pelayar ini: memadam data laman boleh menghilangkan akses tanpa memadam rekod cloud. Eksport rekod sebelum menukar peranti. Dapatkan izin penjaga sebelum menyimpan data anak.</p><div id="profile-error" class="dialog-error" role="alert"></div><button class="button dark" type="submit">Cipta pelajar ${icon('arrow-right')}</button></form>${learner?`<div class="privacy-tools"><h3>Urus data ${h(learner.display_name)}</h3><div class="profile-export-actions"><button class="button dark small" data-action="export-profile">Eksport Laporan (PDF)</button><button class="button secondary small" data-action="export-profile-json">Salinan Data (JSON)</button><button class="button danger small" data-action="delete-profile">Padam pelajar</button></div><p class="dialog-note">PDF untuk bacaan dan cetakan. JSON menyimpan data lengkap termasuk jawapan. Simpan fail ini secara peribadi.</p><p id="export-status" class="small muted" role="status" aria-live="polite"></p><p id="export-error" class="dialog-error" role="alert" hidden></p><p class="dialog-note">Memadam rekod semasa tidak memadam salinan dalam backup terdahulu.</p></div>`:''}`);
  element.querySelector('#profile-form').addEventListener('submit',async event=>{event.preventDefault();const button=event.submitter;button.disabled=true;try{const profile=await post('/students',Object.fromEntries(new FormData(event.target)));remember(profile.id);await bootstrap();closeDialog();if(pendingStart){const settings=pendingStart;pendingStart=null;await begin(settings);}else await renderRoute();toast(`Jom belajar, ${profile.display_name}.`);}catch(error){document.querySelector('#profile-error').textContent=error.message;}finally{button.disabled=false;}});
}

app.addEventListener('submit',async event=>{
  if(event.target.id==='quiz-form'){event.preventDefault();readSetup();event.submitter.disabled=true;try{await begin();}catch(error){toast(error.message);}finally{if(event.submitter)event.submitter.disabled=false;}}
  if(event.target.id==='bank-filter'){event.preventDefault();const form=Object.fromEntries(new FormData(event.target));bank={...bank,...form,offset:0};try{await questionBank();}catch(error){toast(error.message);}}
});
app.addEventListener('change',async event=>{
  try{
    if(['subject','topic','difficulty'].includes(event.target.id)){readSetup();if(event.target.id==='subject')setup.topic='';await quizSetup();}
    if(['count','seconds','timed'].includes(event.target.id))readSetup();
    if(event.target.id==='bank-subject'){const selected=event.target.value;bank={...bank,subject:selected,topic:'',offset:0};await questionBank();}
    if(event.target.id==='typed-answer')await queueSave(event.target.value);
    if(event.target.id==='glossary-category')document.querySelector('#glossary-results').innerHTML=glossaryRows(document.querySelector('#glossary-search').value,event.target.value);
  }catch(error){toast(error.message);}
});
app.addEventListener('input',event=>{
  if(event.target.id==='glossary-search')document.querySelector('#glossary-results').innerHTML=glossaryRows(event.target.value,document.querySelector('#glossary-category').value);
  if(event.target.id==='count')readSetup();
});

async function handleClick(event) {
  const element=event.target.closest('button,a');if(!element)return;
  if(element.tagName==='A' && element.getAttribute('href')?.startsWith('#') && pendingSaves.size){event.preventDefault();try{await flushSave();go(element.getAttribute('href').slice(1));}catch(error){toast(`Sila cuba simpan semula sebelum keluar: ${error.message}`);}return;}
  if(element.hasAttribute('data-close')){closeDialog();return;}
  try {
    if(element.dataset.profile){learner=boot.students.find(s=>s.id===element.dataset.profile);remember(learner.id);closeDialog();if(pendingStart){const settings=pendingStart;pendingStart=null;await begin(settings);}else go('home');}
    if(element.dataset.subject){setup={...setup,subject:element.dataset.subject,topic:'',mode:'practice'};go('quiz');}
    if(element.dataset.mode){readSetup();setup.mode=element.dataset.mode;if(setup.mode==='daily'){setup.subject='mixed';setup.topic='';setup.difficulty='';}if(setup.mode==='challenge')setup.secondsPerQuestion=90;await quizSetup();}
    if(element.dataset.answer){const answer=element.dataset.answer;const saved=queueSave(answer);document.querySelectorAll('[data-answer]').forEach(e=>{e.classList.toggle('selected',e.dataset.answer===answer);e.setAttribute('aria-pressed',String(e.dataset.answer===answer));});await saved;}
    if(element.dataset.jump!==undefined)await move(Number(element.dataset.jump));
    if(element.dataset.resultFilter){resultFilter=element.dataset.resultFilter;main().innerHTML=resultScreen();icons();}
    if(element.dataset.practiseQuestion)await begin({mode:'practice',subject:element.dataset.questionSubject,count:1,questionIds:[element.dataset.practiseQuestion]});
    if(element.dataset.topicPractice){setup={...setup,subject:element.dataset.topicSubject,topic:element.dataset.topicPractice,difficulty:'',count:3,mode:'practice'};go('quiz');}
    const action=element.dataset.action;
    if(action==='support')showSupport();
    if(action==='feedback')showFeedback();
    if(action==='menu'){const open=document.querySelector('#sidebar').classList.toggle('open');element.setAttribute('aria-expanded',String(open));}
    if(action==='profiles')profiles();
    if(action==='start')go('quiz');
    if(action==='daily')await begin({mode:'daily',subject:'mixed',count:8});
    if(action==='export-profile'){
      const studentId=learner.id,status=document.querySelector('#export-status'),errorBox=document.querySelector('#export-error');
      element.disabled=true;element.textContent='Menjana PDF?';if(status)status.textContent='Menyediakan laporan daripada rekod tersimpan?';if(errorBox)errorBox.hidden=true;
      try{const data=await exportStudent(studentId);const{downloadStudentReport}=await import('./report.js');await downloadStudentReport(data);if(status?.isConnected)status.textContent='Laporan PDF telah disediakan. Semak muat turun pelayar anda.';}
      catch(error){if(status?.isConnected)status.textContent='';if(errorBox?.isConnected){errorBox.hidden=false;errorBox.textContent=`Laporan belum dapat dijana. ${error.message}`;}else toast(error.message);}
      finally{if(element.isConnected){element.disabled=false;element.textContent='Eksport Laporan (PDF)';}}
    }
    if(action==='export-profile-json'){const data=await exportStudent(learner.id),url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download='rekod-pelajar.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
    if(action==='reload')await renderRoute();
    if(action==='previous')await move(index-1);
    if(action==='next')await move(index+1);
    if(action==='check'){element.disabled=true;try{await checkAnswer();}finally{if(element.isConnected)element.disabled=false;}}
    if(action==='submit')await confirmSubmit();
    if(action==='finish')await finish();
    if(action==='retake'||action==='retry-wrong'){
      const ids=currentResult.answers.filter(a=>action==='retake'||!a.correct).map(a=>a.question.id);
      await begin({mode:action==='retry-wrong'?'practice':currentResult.mode==='daily'?'practice':currentResult.mode,subject:currentResult.subject,count:ids.length,questionIds:ids});
    }
    if(action==='bank-prev'){bank.offset=Math.max(0,bank.offset-12);await questionBank();}
    if(action==='bank-next'){bank.offset+=12;await questionBank();}
    if(action==='reset-bank'){bank={subject:'',topic:'',difficulty:'',type:'',search:'',offset:0};await questionBank();}
    if(action==='abandon')dialog(`${dialogHeader('Ketepikan kuiz ini?')}<p>Sesi ini tidak dikira sebagai latihan selesai. Rekodnya ditandakan sebagai diketepikan; sejarah kuiz yang selesai kekal disimpan.</p><div class="form-actions"><button class="button dark" data-action="confirm-abandon">Ketepikan</button><button class="button secondary" data-close>Teruskan latihan</button></div>`);
    if(action==='confirm-abandon'){await post(`/quizzes/${currentQuiz.id}/abandon`);for(const [key,pending] of pendingSaves)if(pending.quizId===currentQuiz.id)pendingSaves.delete(key);closeDialog();go('home');}
    if(action==='delete-profile'){
      dialog(`${dialogHeader('Padam profil ini?')}<p>Semua rekod profil, draf kuiz, cubaan dan ganjaran untuk <strong>${h(learner.display_name)}</strong> akan dipadam kekal daripada pemasangan ini. Backup mungkin masih mengandungi salinan terdahulu.</p><form id="delete-form" class="dialog-form"><label class="field"><span>Taip ${h(learner.display_name)} untuk pengesahan</span><input name="confirmName" required autocomplete="off"></label><p id="delete-error" class="dialog-error" role="alert"></p><button class="button danger" type="submit">Padam pelajar secara kekal</button></form>`);
      document.querySelector('#delete-form').addEventListener('submit',async e=>{e.preventDefault();try{await api(`/students/${learner.id}`,{method:'DELETE',body:JSON.stringify(Object.fromEntries(new FormData(e.target)))});closeDialog();await bootstrap();go('home');toast('Profil dan rekod semasa telah dipadam. Semak simpanan backup secara berasingan.');}catch(error){document.querySelector('#delete-error').textContent=error.message;}});
    }
  } catch(error) {toast(error.message);if(element.isConnected)element.disabled=false;}
}
app.addEventListener('click',handleClick);
document.querySelector('#dialog').addEventListener('click',handleClick);
document.querySelector('#support-footer').addEventListener('click',handleClick);
reserveFooterSpace();
window.addEventListener('hashchange',()=>{index=0;renderRoute();});
window.addEventListener('beforeunload',event=>{if(pendingSaves.size){event.preventDefault();event.returnValue='';}});
bootstrap().then(renderRoute).catch(error=>{app.innerHTML=`<main class="content error-page"><h1>Ruang pembelajaran belum dapat dihubungkan.</h1><p>${h(error.message)}</p><p>Semak config Firebase dan sambungan Internet, kemudian muat semula.</p><button class="button" id="reconnect">Muat semula</button></main>`;document.querySelector('#reconnect').addEventListener('click',()=>location.reload());});
