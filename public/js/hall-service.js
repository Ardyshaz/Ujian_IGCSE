import {connectFirebase} from './firebase.js';
import {automaticHallAlias,automaticHallData,hallWeek} from './hall-policy.js';
const pending=new Map();
const stable=v=>v&&typeof v==='object'?JSON.stringify(v,Object.keys(v).sort()):JSON.stringify(v);
const equalData=(a,b)=>Object.keys(b).every(k=>k==='subjects'?Object.keys(b.subjects).every(s=>stable(a.subjects?.[s])===stable(b.subjects[s])):stable(a[k])===stable(b[k]));
export async function hallConsent(studentId){
 const{db,ownerId,sdk:s}=await connectFirebase(),result=await s.getDocFromServer(s.doc(db,'hallConsents',studentId));
 if(!result.exists())return null;
 if(result.data().ownerId!==ownerId)throw new Error('Tetapan tidak ditemui untuk keluarga ini.');
 return result.data();
}
export async function ensureHallIdentity(studentId,enabled=true){
 const{db,ownerId,sdk:s}=await connectFirebase(),ref=s.doc(db,'hallConsents',studentId),newId=crypto.randomUUID();
 return s.runTransaction(db,async tx=>{
  const old=await tx.get(ref);
  if(old.exists()&&old.data().version===2)return old.data();
  const publicId=old.exists()?old.data().publicId:newId;
  const value={ownerId,publicId,alias:automaticHallAlias(publicId),version:2,enabled,createdAt:old.exists()?old.data().createdAt:s.serverTimestamp()};
  tx.set(ref,value);
  if(!old.exists())tx.set(s.doc(db,'hallOwners',publicId),{ownerId,studentId,createdAt:s.serverTimestamp()});
  return value;
 });
}
export async function setHallVisibility(studentId,enabled){
 const preference=await ensureHallIdentity(studentId,enabled),{db,sdk:s}=await connectFirebase(),batch=s.writeBatch(db);
 batch.update(s.doc(db,'hallConsents',studentId),{enabled});
 if(!enabled)batch.delete(s.doc(db,'hallEntries',preference.publicId));
 await batch.commit();
}
export async function withdrawHall(studentId){
 const preference=await hallConsent(studentId);if(!preference)return;
 const{db,sdk:s}=await connectFirebase(),batch=s.writeBatch(db);
 batch.delete(s.doc(db,'hallEntries',preference.publicId));batch.delete(s.doc(db,'hallOwners',preference.publicId));batch.delete(s.doc(db,'hallConsents',studentId));await batch.commit();
}
export function syncAutomaticHall(studentId,attempts,bank){
 if(pending.has(studentId))return pending.get(studentId);
 const operation=(async()=>{
  if(!attempts.length)return;
  const preference=await ensureHallIdentity(studentId);
  if(!preference.enabled)return;
  const{db,ownerId,sdk:s}=await connectFirebase();
  const data=automaticHallData({...preference,id:studentId},{id:studentId,ownerId},attempts,bank);
  let changed=false;
  await s.runTransaction(db,async tx=>{
   const privateRef=s.doc(db,'hallConsents',studentId),publicRef=s.doc(db,'hallEntries',preference.publicId);
   const[current,previous]=await Promise.all([tx.get(privateRef),tx.get(publicRef)]);
   if(!current.exists()||current.data().enabled!==true||current.data().publicId!==preference.publicId)return;
   if(!data){if(previous.exists()){tx.delete(publicRef);changed=true;}return;}
   const old=previous.exists()?previous.data():null;
   if(old&&equalData(old,data))return;
   tx.set(publicRef,{...data,publishedAt:s.serverTimestamp(),expiresAt:s.Timestamp.fromMillis(hallWeek().endMs)});changed=true;
  });
  if(changed&&typeof window!=='undefined')window.dispatchEvent(new CustomEvent('hall-updated'));
 })().catch(()=>{/* Optional public summaries never block private learning or quiz saving. */}).finally(()=>pending.delete(studentId));
 pending.set(studentId,operation);return operation;
}
export async function listHall(){
 const{db,sdk:s}=await connectFirebase(),week=hallWeek(),combined=new Map();
 await Promise.all(['explorer','consistency','english','mathematics','science'].map(async category=>{
  const field=`${category}Score`;
  const result=await s.getDocsFromServer(s.query(s.collection(db,'hallEntries'),s.where('weekStart','==',week.start),s.orderBy(field,'desc'),s.orderBy('uniqueQuestions','desc'),s.orderBy('activeDays','desc'),s.orderBy(s.documentId(),'asc'),s.limit(5)));
  let rank=0;
  for(const doc of result.docs){const data=doc.data(),expiry=data.expiresAt?.toMillis?.()??Date.parse(data.expiresAt);if(data.version!==2||data[field]<0||expiry<=Date.now())continue;rank++;const entry=combined.get(doc.id)||{...data,id:doc.id,ranks:{}};entry.ranks[category]=rank;combined.set(doc.id,entry);}
 }));
 return[...combined.values()];
}
