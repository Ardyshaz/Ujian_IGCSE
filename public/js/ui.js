export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
export function icons() { window.lucide?.createIcons({ attrs: { 'aria-hidden': 'true' } }); }
export const title = value => ({ english:'English', mathematics:'Mathematics', science:'Science', mixed:'Campuran subjek', practice:'Latihan (Practice)', examination:'Simulasi Ujian (Exam)', challenge:'Cabaran (Challenge)', daily:'Cabaran Harian (Daily Challenge)' }[value] || value);
export const percent = value => value == null ? '—' : `${Math.round(value)}%`;
export const date = value => new Date(value).toLocaleDateString('ms-MY', { day:'numeric', month:'short', year:'numeric', timeZone:'Asia/Kuala_Lumpur' });
export const datetime = value => new Date(value).toLocaleString('ms-MY', { dateStyle:'medium', timeStyle:'short', timeZone:'Asia/Kuala_Lumpur' });
export const duration = seconds => `${Math.floor(seconds/60)} min ${Math.floor(seconds%60)} saat`;
export const subjectIcon = subject => ({english:'book-open',mathematics:'calculator',science:'flask-conical'}[subject] || 'layers');
export function empty(heading, body, symbol = 'notebook-pen') { return `<div class="empty">${icon(symbol)}<h3>${escapeHtml(heading)}</h3><p>${escapeHtml(body)}</p></div>`; }
let toastTimeout;
export function toast(message) { const notice=document.querySelector('#notice'); notice.textContent=message;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>notice.textContent='',5500); }
let outsideCloseBound=false;
export function dialog(content,{className=''}={}) {
  const element=document.querySelector('#dialog');
  element.className=className;
  element.innerHTML=content;
  element.setAttribute('aria-labelledby','dialog-heading');
  if(!outsideCloseBound){
    element.addEventListener('click',event=>{
      if(event.target!==element)return;
      const rect=element.getBoundingClientRect();
      if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom)element.close();
    });
    outsideCloseBound=true;
  }
  icons();element.showModal();element.querySelector('input,button')?.focus();return element;
}
export function closeDialog(){document.querySelector('#dialog').close();}
export const dialogHeader = heading => `<div class="dialog-header"><h2 id="dialog-heading">${escapeHtml(heading)}</h2><button type="button" data-close aria-label="Tutup dialog">${icon('x')}</button></div>`;

export const performanceLabel = value => ({Excellent:'Cemerlang',Good:'Baik','Keep Practising':'Teruskan berlatih','Needs Improvement':'Perlu lebih latihan'}[value] || value);
export const milestoneLabel = value => ({'First step':'Langkah pertama','Finding your rhythm':'Rutin semakin mantap','Learning explorer':'Teroka pembelajaran','Three-day rhythm':'Tiga hari berturut-turut','Complete your first quiz':'Selesaikan kuiz pertama','Complete five quizzes':'Selesaikan lima kuiz','Practise all three subjects':'Berlatih dalam ketiga-tiga subjek','Learn on three days in a row':'Belajar tiga hari berturut-turut'}[value] || value);
export const questionTypeLabel = value => ({mcq:'MCQ',reading:'Kefahaman',true_false:'Betul / Salah',fill_blank:'Isi tempat kosong',short_answer:'Jawapan ringkas',numerical:'Jawapan nombor',calculation:'Pengiraan'}[value] || value);
