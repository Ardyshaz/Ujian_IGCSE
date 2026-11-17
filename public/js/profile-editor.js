import {PROFILE_STATES,PROFILE_YEARS} from './profile-fields.js';
import {escapeHtml as h,dialog,dialogHeader} from './ui.js';
import {api} from './api.js';
export function showProfileEditor(profile,onSaved){
 const years=PROFILE_YEARS.some(([key])=>key===profile.year_level)||!profile.year_level?PROFILE_YEARS:[[profile.year_level,profile.year_level],...PROFILE_YEARS];
 const options=(items,current)=>items.map(([key,label])=>`<option value="${h(key)}" ${current===key?'selected':''}>${h(label)}</option>`).join('');
 const modal=dialog(`${dialogHeader('Edit profil pelajar')}<p class="small muted">Butiran ini untuk keluarga pada pelayar ini. Sekolah dan negeri tidak dipaparkan dalam Wall Of Excellence Minggu Ini.</p><form id="profile-edit-form" class="dialog-form"><label class="field"><span>Nama paparan</span><input name="displayName" maxlength="60" required autocomplete="off" value="${h(profile.display_name)}"></label><label class="field"><span>Nama ibu bapa / penjaga (pilihan)</span><input name="guardianName" maxlength="60" autocomplete="off" value="${h(profile.guardian_name||'')}"></label><label class="field"><span>Darjah / tingkatan (pilihan)</span><select name="yearLevel"><option value="">Tidak dinyatakan</option>${options(years,profile.year_level)}</select></label><label class="field"><span>Sekolah (pilihan)</span><input name="schoolName" maxlength="100" autocomplete="off" placeholder="Contoh: SK Pengkalan" value="${h(profile.school_name||'')}"></label><label class="field"><span>Negeri / wilayah (pilihan)</span><select name="state"><option value="">Tidak dinyatakan</option>${options(PROFILE_STATES.map(value=>[value,value]),profile.state||'')}</select></label><p class="dialog-note">Nama panggilan sudah memadai. Anda boleh mengosongkan maklumat pilihan. Rekod cubaan dan markah tidak berubah apabila profil disunting.</p><p id="profile-edit-error" class="dialog-error" role="alert"></p><div class="form-actions"><button class="button dark" type="submit">Simpan perubahan</button><button class="button secondary" type="button" data-close>Batal</button></div></form>`);
 modal.querySelector('form').addEventListener('submit',async event=>{
  event.preventDefault();const button=event.submitter,message=modal.querySelector('#profile-edit-error');button.disabled=true;message.textContent='';
  try{await api(`/students/${profile.id}`,{method:'PATCH',body:JSON.stringify(Object.fromEntries(new FormData(event.target)))});modal.close();await onSaved();}
  catch(error){message.textContent=error.message;}finally{button.disabled=false;}
 });
}
