import {connectFirebase, firebaseMessage} from './firebase.js';
import {dialog,dialogHeader,escapeHtml as h,toast,icons} from './ui.js';

const categories={cadangan:'Cadangan penambahbaikan',masalah:'Masalah teknikal',soalan:'Soalan atau penerangan kurang jelas',lain:'Lain-lain'};
let draft={id:crypto.randomUUID(),category:'cadangan',displayName:'',message:''},sending=false;

export async function submitFeedback(input,id) {
  const message=String(input.message||'').trim(),displayName=String(input.displayName||'').trim();
  if(message.length<5||message.length>2000)throw new Error('Tulis maklum balas antara 5 hingga 2,000 aksara.');
  if(!Object.hasOwn(categories,input.category)||displayName.length>60)throw new Error('Kategori atau nama paparan tidak sah.');
  const {db,ownerId,sdk:s}=await connectFirebase();
  const receiptRef=s.doc(db,'feedbackRateLimits',ownerId);
  // Only a non-content receipt is readable; comments remain completely private.
  const receipt=await s.getDocFromServer(receiptRef);
  if(receipt.exists()&&receipt.data().submissionId===id)return{id};
  const page=location.hash.slice(1).split('/')[0]||'home';
  const batch=s.writeBatch(db);
  batch.set(s.doc(db,'feedback',id),{ownerId,category:input.category,message,displayName,page:['home','quiz','bank','progress','student','parent','about','session','result'].includes(page)?page:'home',createdAt:s.serverTimestamp()});
  batch.set(receiptRef,{submissionId:id,lastSubmittedAt:s.serverTimestamp()});
  let timer;
  try{
    await Promise.race([batch.commit(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Pengesahan belum diterima. Semak sambungan dan cuba semula; teks anda masih tersedia.')),20000);})]);
  }catch(error){
    if(error.code==='permission-denied')throw new Error('Maklum balas belum dapat disahkan. Jika baru menghantar, tunggu satu minit dan cuba semula.');
    throw new Error(firebaseMessage(error));
  }finally{clearTimeout(timer);}
  return{id};
}

export function showFeedback(){
  if(sending){toast('Maklum balas sedang dihantar. Sila tunggu.');return;}
  const modal=dialog(`${dialogHeader('Maklum Balas')}<p class="small muted">Apa yang boleh kami perbaiki? Komen anda hanya boleh dibaca oleh admin projek dan tidak dipaparkan kepada pengguna lain.</p><form id="feedback-form" class="dialog-form"><div class="field"><label for="feedback-category">Jenis maklum balas</label><select id="feedback-category" name="category">${Object.entries(categories).map(([value,label])=>`<option value="${value}" ${draft.category===value?'selected':''}>${label}</option>`).join('')}</select></div><div class="field"><label for="feedback-name">Nama panggilan (pilihan)</label><input id="feedback-name" name="displayName" maxlength="60" autocomplete="off" value="${h(draft.displayName)}"></div><div class="field"><label for="feedback-message">Komen atau cadangan anda</label><textarea id="feedback-message" name="message" rows="5" minlength="5" maxlength="2000" required placeholder="Contoh: Tambah latihan Science mengikut topik…">${h(draft.message)}</textarea><small class="muted">Maksimum 2,000 aksara. Jangan masukkan nombor pengenalan, kata laluan atau maklumat peribadi anak.</small></div><p id="feedback-error" class="dialog-error" role="alert" hidden></p><p id="feedback-status" role="status" aria-live="polite" class="small muted"></p><div class="form-actions"><button class="button dark" type="submit">Hantar Maklum Balas</button><button class="button secondary" type="button" data-close>Tutup</button></div></form>`);
  const form=modal.querySelector('#feedback-form');
  form.addEventListener('input',()=>{const values=Object.fromEntries(new FormData(form));draft={...values,id:crypto.randomUUID()};});
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(sending)return;
    const values=Object.fromEntries(new FormData(form));draft={...draft,...values};
    const button=form.querySelector('[type="submit"]'),errorBox=form.querySelector('#feedback-error'),status=form.querySelector('#feedback-status');
    sending=true;button.disabled=true;button.textContent='Sedang menghantar…';errorBox.hidden=true;status.textContent='Sedang menyimpan maklum balas anda…';
    form.querySelectorAll('input,select,textarea').forEach(el=>el.disabled=true);
    try{
      await submitFeedback(values,draft.id);
      draft={id:crypto.randomUUID(),category:'cadangan',displayName:'',message:''};
      if(form.isConnected&&modal.open){modal.innerHTML=`${dialogHeader('Terima kasih!')}<p role="status">Maklum balas anda telah diterima. Admin akan membacanya untuk menambah baik aplikasi ini.</p><div class="form-actions"><button type="button" class="button dark" data-close>Tutup</button></div>`;icons();modal.querySelector('[data-close]')?.focus();}
      else toast('Terima kasih! Maklum balas anda telah diterima.');
    }catch(error){
      errorBox.hidden=false;errorBox.textContent=error.message;status.textContent='';button.textContent='Cuba hantar semula';
      if(!modal.open)toast(error.message);
    }finally{sending=false;button.disabled=false;form.querySelectorAll('input,select,textarea').forEach(el=>el.disabled=false);}
  });
}
