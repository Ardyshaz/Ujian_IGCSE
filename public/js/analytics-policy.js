export const CONSENT_KEY='igcse-analytics-consent-v1';
export const CONSENT_VERSION=1;
const MAX_AGE=180*86400000;
const PAGES={home:'Persediaan MRSM IGCSE',quiz:'Mula Kuiz',bank:'Bank Soalan',progress:'Prestasi Saya',student:'Panduan Pelajar',parent:'Panduan Ibu Bapa',about:'Tentang Projek',session:'Latihan Kuiz',result:'Keputusan Latihan'};
export function readConsent(raw,now=Date.now()){
  try{const value=JSON.parse(raw);if(value.version!==CONSENT_VERSION||!['granted','denied'].includes(value.status)||!Number.isFinite(value.at)||value.at>now||now-value.at>MAX_AGE)return null;return value.status;}catch{return null;}
}
export function pageParameters(origin,hash){
  const candidate=String(hash||'').replace(/^#/,'').split(/[/?&]/)[0];
  const page=Object.hasOwn(PAGES,candidate)?candidate:'home';
  // Never use href/referrer/title from the real DOM: hashes/queries can carry IDs or names.
  return{page_name:page,page_title:PAGES[page],page_location:`${new URL(origin).origin}/#${page}`,page_referrer:''};
}
export function eventParameters(event,input={}){
  if(event==='page_view')return{};
  if(['quiz_start','quiz_complete'].includes(event)){
    const subjects=['english','mathematics','science','mixed'],modes=['practice','examination','challenge','daily'];
    if(!subjects.includes(input.subject)||!modes.includes(input.mode))return null;
    return{subject:input.subject,quiz_mode:input.mode};
  }
  if(event==='report_export'&&['pdf','json'].includes(input.format))return{export_format:input.format};
  return null;
}
