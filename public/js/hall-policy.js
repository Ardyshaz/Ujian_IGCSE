import {localDay,isCorrect} from './quiz-engine.js';
export const HALL_VERSION=1;
export const HALL_AUTO_VERSION=2;
export const HALL_TITLE='Wall Of Excellence Minggu Ini';
export function automaticHallAlias(publicId){
 if(!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(publicId))throw new Error('ID paparan tidak sah.');
 return `Pelajar ${publicId.slice(0,6).toUpperCase()}`;
}
export const HALL_CATEGORIES=[['explorer','Peneroka Soalan'],['consistency','Konsisten Belajar'],['english','English'],['mathematics','Mathematics'],['science','Science']];
export function validHallAlias(value){return typeof value==='string'&&/^[\p{L}\p{N} _.-]{2,24}$/u.test(value)&&!/[0-9]{5}/.test(value)&&value===value.trim();}
export function hallWeek(now=Date.now()){
 const day=localDay(now),date=new Date(day+'T00:00:00Z');
 date.setUTCDate(date.getUTCDate()-(date.getUTCDay()+6)%7);
 const start=date.toISOString().slice(0,10),startMs=Date.parse(start+'T00:00:00+08:00');
 return{start,startMs,endMs:startMs+7*86400000};
}
export function prepareHallAttempts(attempts,bank){
 const known=new Map(bank.filter(q=>q.status==='published').map(q=>[q.id,q]));
 const rows=attempts.map(r=>({...r,createdAt:typeof r.createdAt?.toDate==='function'?r.createdAt.toDate().toISOString():r.createdAt}));
 return rows.filter(r=>typeof r.createdAt==='string'&&Number.isFinite(Date.parse(r.createdAt))).map(r=>{
  const used=new Set(),answers=[];
  for(const answer of r.answers||[]){
   const q=known.get(answer.question?.id);
   if(!q||used.has(q.id)||q.version!==answer.question.version||q.subject!==answer.question.subject)continue;
   used.add(q.id);answers.push({question:{id:q.id,subject:q.subject},correct:isCorrect(q,answer.answer)});
  }
  return{id:r.id,ownerId:r.ownerId,studentId:r.studentId,date:r.createdAt,answers};
 }).filter(r=>r.answers.length);
}
export function buildHallEntries(consents,profiles,attempts,now=Date.now()){
 const week=hallWeek(now),people=new Map(profiles.map(p=>[p.id,p]));
 const entries=[];
 for(const consent of consents){
  const profile=people.get(consent.id);
  const automatic=consent.version===HALL_AUTO_VERSION&&consent.enabled===true&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(consent.publicId||'')&&consent.alias===automaticHallAlias(consent.publicId);
  if(!profile||profile.ownerId!==consent.ownerId||(!automatic&&(consent.version!==HALL_VERSION||consent.guardianConfirmed!==true))||(!automatic&&!validHallAlias(consent.alias))||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(consent.publicId||''))continue;
  const rows=attempts.filter(a=>a.studentId===consent.id&&a.ownerId===consent.ownerId&&Number.isFinite(Date.parse(a.date))&&Date.parse(a.date)<=now).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date)||a.id.localeCompare(b.id));
  const weekly=rows.filter(a=>Date.parse(a.date)>=week.startMs&&Date.parse(a.date)<week.endMs);
  if(!weekly.length)continue;
  const first=new Map();for(const r of rows)for(const a of r.answers||[])if(a.question?.id&&!first.has(a.question.id))first.set(a.question.id,{...a,at:Date.parse(r.date)});
  const firstThisWeek=[...first.values()].filter(a=>a.at>=week.startMs&&a.at<week.endMs);
  const subjects=Object.fromEntries(['english','mathematics','science'].map(subject=>{
   const a=firstThisWeek.filter(a=>a.question.subject===subject),correct=a.filter(a=>a.correct).length;
   return[subject,{count:a.length,correct,accuracy:a.length?Math.round(correct/a.length*1000)/10:null}];
  }));
  entries.push({id:consent.publicId,alias:consent.alias,weekStart:week.start,uniqueQuestions:new Set(weekly.flatMap(r=>(r.answers||[]).map(a=>a.question?.id).filter(Boolean))).size,activeDays:new Set(weekly.map(r=>localDay(Date.parse(r.date)))).size,subjects,ranks:{},publishedAt:new Date(now).toISOString(),expiresAt:new Date(week.endMs).toISOString()});
 }
 for(const[category]of HALL_CATEGORIES){
  const eligible=entries.filter(e=>['explorer','consistency'].includes(category)||e.subjects[category].count>=30);
  const metric=e=>category==='explorer'?e.uniqueQuestions:category==='consistency'?e.activeDays:e.subjects[category].correct/e.subjects[category].count;
  eligible.sort((a,b)=>metric(b)-metric(a)||b.uniqueQuestions-a.uniqueQuestions||b.activeDays-a.activeDays||a.id.localeCompare(b.id)).slice(0,5).forEach((e,i)=>e.ranks[category]=i+1);
 }
 for(const entry of entries)for(const subject of Object.values(entry.subjects))if(subject.count<30){subject.correct=null;subject.accuracy=null;}
 return entries.filter(e=>Object.keys(e.ranks).length);
}
export function automaticHallData(preference,profile,attempts,bank,now=Date.now()){
 const entry=buildHallEntries([preference],[profile],prepareHallAttempts(attempts,bank),now)[0];
 if(!entry)return null;
 const{id,ranks,publishedAt,expiresAt,...data}=entry;
 return{...data,version:2,source:'self_reported',explorerScore:data.uniqueQuestions,consistencyScore:data.activeDays,
  englishScore:data.subjects.english.accuracy??-1,mathematicsScore:data.subjects.mathematics.accuracy??-1,scienceScore:data.subjects.science.accuracy??-1};
}
