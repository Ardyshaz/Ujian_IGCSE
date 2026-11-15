// Client service adapter, not an HTTP API. Firebase Web SDK owns cloud persistence.
import * as repo from './repository.js';
import {connectFirebase,firebaseMessage} from './firebase.js';
import {localDay,isCorrect,shuffle,grade,dashboard} from './quiz-engine.js';
let bankPromise,ownerId,cloudError;
const bank=()=>bankPromise ||= fetch('/questions.json').then(r=>{if(!r.ok)throw new Error('Bank Soalan belum dapat dimuatkan.');return r.json();}).then(rows=>rows.filter(q=>q.status==='published').map(q=>({...q,topicId:`${q.subject}:${q.topic.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`})));
const subjects=rows=>['english','mathematics','science'].map(id=>({id,name:{english:'English',mathematics:'Mathematics',science:'Science'}[id],count:rows.filter(q=>q.subject===id).length}));
const key=()=>`igcse-drafts:${ownerId}`;
function sessions(){return JSON.parse(localStorage.getItem(key())||'{}');}
function store(q){const all=sessions();all[q.id]=q;localStorage.setItem(key(),JSON.stringify(all));return q;}
async function handle(path,options={}){
 const url=new URL(path,location.origin),p=url.pathname.split('/').filter(Boolean),s=url.searchParams,b=options.body?JSON.parse(options.body):{},method=options.method||'GET',rows=await bank();
 if(p[0]==='bootstrap'){let students=[];try{ownerId=(await connectFirebase()).ownerId;students=await repo.listRecords('students');cloudError=null;}catch(e){cloudError=firebaseMessage(e);}return{students,subjects:subjects(rows),cloudError};}
 if(p[0]==='subjects')return subjects(rows);
 const filtered=rows.filter(q=>(!s.get('subject')||s.get('subject')===q.subject)&&(!s.get('topic')||s.get('topic')===q.topicId)&&(!s.get('difficulty')||Number(s.get('difficulty'))===q.difficulty)&&(!s.get('type')||s.get('type')===q.type)&&(!s.get('search')||`${q.text} ${q.topic}`.toLowerCase().includes(s.get('search').toLowerCase())));
 if(p[0]==='topics')return[...new Set(filtered.map(q=>q.topicId))].map(id=>({id,name:filtered.find(q=>q.topicId===id).topic,count:filtered.filter(q=>q.topicId===id).length}));
 if(p[0]==='questions')return{total:filtered.length,items:filtered.slice(Number(s.get('offset')||0),Number(s.get('offset')||0)+Number(s.get('limit')||12))};
 if(!ownerId)throw new Error(cloudError||'Firebase belum dihubungkan.');
 if(p[0]==='students'){
  if(method==='POST')return repo.createStudent(b);
  if(method==='DELETE'){await repo.deleteStudent(p[1],b.confirmName);const all=sessions();for(const[id,q]of Object.entries(all))if(q.studentId===p[1])delete all[id];localStorage.setItem(key(),JSON.stringify(all));return{ok:true};}
  return p[1]?repo.getRecord('students',p[1]):repo.listRecords('students');
 }
 if(p[0]==='dashboard'){await repo.getRecord('students',p[1]);const results=await repo.listRecords('attempts',p[1]);return dashboard(results,Object.values(sessions()).filter(q=>q.studentId===p[1]&&q.status==='in_progress'&&!results.some(r=>r.id===q.id)).map(q=>({id:q.id,mode:q.mode,started_at:q.startedAt})));}
 if(p[0]==='attempts')return repo.getRecord('attempts',p[1]);
 if(p[0]==='quizzes'){
  if(p[1]==='start'){
   await repo.getRecord('students',b.studentId);
   if(!['practice','examination','challenge','daily'].includes(b.mode))throw new Error('Mod kuiz tidak sah.');
   const count=Number(b.count??10),seconds=Number(b.secondsPerQuestion??120);
   if(!Number.isInteger(count)||count<1||count>50||!Number.isFinite(seconds)||seconds<10||seconds>600)throw new Error('Tetapan bilangan atau masa tidak sah.');
   let pool=rows.filter(q=>(!b.subject||b.subject==='mixed'||q.subject===b.subject)&&(!b.topic||q.topicId===b.topic)&&(!b.difficulty||q.difficulty===Number(b.difficulty))&&(b.mode!=='challenge'||b.difficulty||q.difficulty>=3)&&(!b.questionIds||b.questionIds.includes(q.id))),chosen;
   if(b.mode==='daily'){const hash=t=>[...t].reduce((n,c)=>Math.imul(n^c.charCodeAt(0),16777619)>>>0,2166136261);pool=[...rows].sort((a,c)=>hash(localDay()+a.id)-hash(localDay()+c.id));chosen=['english','mathematics','science'].flatMap(id=>pool.filter(q=>q.subject===id).slice(0,id==='science'?2:3));}
   else{if(pool.length<count)throw new Error(`Hanya ${pool.length} soalan sepadan. Kurangkan bilangan soalan.`);chosen=shuffle(pool).slice(0,count);}
   const now=Date.now();return store({id:crypto.randomUUID(),studentId:b.studentId,mode:b.mode,subject:b.mode==='daily'?'mixed':b.subject||'mixed',status:'in_progress',startedAt:now,serverNow:now,deadlineAt:b.mode==='examination'||b.mode==='challenge'||b.timed?now+chosen.length*seconds*1000:null,dailyDate:b.mode==='daily'?localDay():null,questions:chosen,drafts:{}});
  }
  const q=sessions()[p[1]];if(!q)throw new Error('Draf tidak ditemui dalam pelayar ini. Keputusan yang selesai ada di Prestasi Saya.');
  if(p.length===2)return{...q,serverNow:Date.now()};
  if(q.result)return q.result;
  if(q.status!=='in_progress')throw new Error('Kuiz ini telah diketepikan.');
  if(p[2]==='submit'){const result=await repo.saveAttempt(grade(q));store({...q,status:result.status,result});return result;}
  if(p[2]==='abandon')return store({...q,status:'abandoned'});
  if(q.deadlineAt&&Date.now()>=q.deadlineAt)throw new Error('Masa telah tamat. Hantar jawapan yang sudah disimpan.');
  const question=q.questions.find(v=>v.id===b.questionId);if(!question)throw new Error('Soalan tidak ditemui dalam kuiz ini.');
  const draft=q.drafts[question.id]||{};
  if(p[2]==='feedback'){if(q.mode!=='practice')throw new Error('Penerangan tersedia selepas dihantar.');if(!String(draft.answer??'').trim())throw new Error('Masukkan jawapan sebelum menyemaknya.');if(!Object.hasOwn(draft,'firstAnswer'))draft.firstAnswer=draft.answer;draft.feedbackSeen=true;draft.flagged=true;q.drafts[question.id]=draft;store(q);return{correct:isCorrect(question,draft.answer),explanation:question.explanation,firstAnswer:draft.firstAnswer};}
  if(p[2]==='answers'){if(Object.hasOwn(b,'answer')){if(b.answer!==null&&!['string','number'].includes(typeof b.answer)||String(b.answer??'').length>2000)throw new Error('Format jawapan tidak sah.');draft.answer=b.answer;draft.answeredAt=Date.now();}if(Object.hasOwn(b,'flagged'))draft.flagged=!!b.flagged;q.drafts[question.id]=draft;store(q);return{ok:true};}
 }
 throw new Error('Fungsi tidak ditemui.');
}
export async function api(path,options){try{return await handle(path,options);}catch(e){throw new Error(firebaseMessage(e));}}
export const post=(path,body={})=>api(path,{method:'POST',body:JSON.stringify(body)});
export async function exportStudent(id){return{profile:await repo.getRecord('students',id),attempts:await repo.listRecords('attempts',id),exportedAt:new Date().toISOString()};}
