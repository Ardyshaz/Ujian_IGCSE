import {analyticsConfig} from './analytics-config.js';
import {CONSENT_KEY,CONSENT_VERSION,readConsent,pageParameters,eventParameters} from './analytics-policy.js';
import {dialog,dialogHeader} from './ui.js';
let sdk,instance,starting,running=false,initialised=false,lastPage=null;
let state=loadChoice();
const allowed=()=>analyticsConfig.enabled&&analyticsConfig.hosts.includes(location.hostname);
function loadChoice(){try{return readConsent(localStorage.getItem(CONSENT_KEY));}catch{return null;}}
function notify(){window.dispatchEvent(new CustomEvent('analytics-choice-changed'));}
function safePage(){return pageParameters(location.origin,location.hash);}
function eraseCookies(){
  for(const cookie of document.cookie.split(';')){
    const name=cookie.trim().split('=')[0];if(!name.startsWith('mrsm_ga'))continue;
    for(const domain of ['',`; domain=${location.hostname}`,`; domain=.${location.hostname}`])document.cookie=`${name}=; max-age=0; path=/${domain}; SameSite=Lax`;
  }
}
function disable(){
  running=false;lastPage=null;window[`ga-disable-${analyticsConfig.measurementId}`]=true;
  if(instance){sdk.setAnalyticsCollectionEnabled(instance,false);sdk.setConsent({analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});}
  eraseCookies();
}
async function start(){
  if(state!=='granted'||!allowed())return false;
  if(running)return true;
  if(starting)return starting;
  starting=(async()=>{
    // This module and gtag are never imported/loaded before explicit permission.
    sdk ||= await import('https://www.gstatic.com/firebasejs/13.3.0/firebase-analytics.js');
    if(state!=='granted'||!(await sdk.isSupported()))return false;
    const{connectFirebase}=await import('./firebase.js');const{app}=await connectFirebase();
    if(state!=='granted'||app.options.projectId!==analyticsConfig.projectId)return false;
    window[`ga-disable-${analyticsConfig.measurementId}`]=false;
    sdk.setConsent({analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    const page=safePage();sdk.setDefaultEventParameters(page);
    if(!instance)instance=sdk.initializeAnalytics(app,{config:{...page,send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_prefix:'mrsm',cookie_domain:'none',cookie_expires:2592000,cookie_update:false,cookie_flags:'SameSite=Lax;Secure'}});
    else sdk.setAnalyticsCollectionEnabled(instance,true);
    running=true;trackUsage('page_view');return true;
  })().catch(()=>false).finally(()=>{starting=null;notify();});
  return starting;
}
export function trackUsage(event,input={}){
  if(!running||state!=='granted'||!allowed())return;
  const params=eventParameters(event,input);if(params===null)return;
  try{
    const page=safePage();if(event==='page_view'&&lastPage===page.page_name)return;
    sdk.setDefaultEventParameters(page);sdk.logEvent(instance,event,{...page,...params});
    if(event==='page_view')lastPage=page.page_name;
  }catch{/* Optional measurement never blocks learning. */}
}
export function analyticsChoiceMarkup(){
  if(!allowed()||state!==null)return'';
  return '<section class="panel analytics-choice"><div><strong>Pilihan privasi untuk penjaga</strong><p>Analitik penggunaan adalah pilihan. Kuiz tetap boleh digunakan tanpa analitik.</p></div><button class="button secondary small" data-action="analytics-privacy">Urus Analitik</button></section>';
}
async function choose(status){
  state=status;
  try{localStorage.setItem(CONSENT_KEY,JSON.stringify({version:CONSENT_VERSION,status,at:Date.now()}));}
  catch{state=null;disable();throw new Error('Pilihan tidak dapat disimpan. Analitik kekal dimatikan.');}
  if(status==='denied')disable();else await start();notify();
}
export function showAnalyticsPrivacy(){
  const status=state==='granted'?'Diizinkan':state==='denied'?'Ditolak':'Belum dipilih';
  const modal=dialog(`${dialogHeader('Privasi Analitik')}<p>Untuk ibu bapa atau penjaga: analitik pilihan membantu kami memahami halaman dan ciri yang digunakan. Aplikasi tetap boleh digunakan jika anda menolak.</p><p>Selepas diizinkan, Google Analytics boleh memproses pengecam pelayar (cookies), alamat IP dan maklumat peranti. Nama pelajar, ID profil atau cubaan, markah, jawapan, komen dan nama fail laporan tidak dihantar oleh aplikasi.</p><p>Tiada personalisasi iklan atau Google signals. Pilihan boleh diubah di sini pada bila-bila masa. Jika anda pelajar, minta penjaga membuat pilihan ini.</p><p class="small muted">Pilihan semasa: <strong>${status}</strong>.${allowed()?'':' Analitik belum diaktifkan untuk laman ini.'}</p><p id="analytics-privacy-status" role="status" aria-live="polite" class="small muted"></p><div class="form-actions"><button type="button" class="button secondary" data-analytics-choice="granted" ${allowed()?'':'disabled'}>Izinkan Analitik</button><button type="button" class="button secondary" data-analytics-choice="denied">Tolak / Matikan</button><button type="button" class="button ghost" data-close>Tutup</button></div>`);
  modal.querySelectorAll('[data-analytics-choice]').forEach(button=>button.addEventListener('click',async()=>{
    const buttons=modal.querySelectorAll('[data-analytics-choice]'),message=modal.querySelector('#analytics-privacy-status');buttons.forEach(b=>b.disabled=b.dataset.analyticsChoice==='granted');message.textContent='Menyimpan pilihan…';
    try{await choose(button.dataset.analyticsChoice);message.textContent=state==='denied'?'Analitik dimatikan. Kuiz dan rekod anda kekal tersedia.':running?'Analitik pilihan telah diaktifkan.':'Pilihan disimpan. Analitik belum dapat disambungkan; kuiz tetap boleh digunakan.';}
    catch(error){message.textContent=error.message;}
    finally{buttons.forEach(b=>b.disabled=b.dataset.analyticsChoice==='granted'&&!allowed());}
  }));
}
export function initOptionalAnalytics(){
  if(initialised)return;initialised=true;
  if(state!=='granted'||!allowed())disable();else void start();
  window.addEventListener('storage',event=>{
    if(event.key!==CONSENT_KEY&&event.key!==null)return;state=loadChoice();
    if(state==='granted'&&allowed())void start();else disable();notify();
  });
}
