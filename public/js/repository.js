import {connectFirebase} from './firebase.js';
const clean = value => JSON.parse(JSON.stringify(value));
export async function listRecords(name, studentId) {
  const {db,ownerId,sdk:s} = await connectFirebase();
  const filters = [s.where('ownerId','==',ownerId)];
  if (studentId) filters.push(s.where('studentId','==',studentId));
  return (await s.getDocsFromServer(s.query(s.collection(db,name),...filters))).docs.map(d=>({...d.data(),id:d.id}));
}
export async function getRecord(name,id) {
  const {db,ownerId,sdk:s} = await connectFirebase();
  const record = await s.getDocFromServer(s.doc(db,name,id));
  if (!record.exists() || record.data().ownerId!==ownerId) throw new Error('Rekod tidak ditemui untuk pelayar ini.');
  return {...record.data(),id:record.id};
}
export async function createStudent(input) {
  const display_name=String(input.displayName||'').trim();
  if (!display_name || display_name.length>60) throw new Error('Nama paparan perlu antara 1 hingga 60 aksara.');
  const profile={id:crypto.randomUUID(),display_name,guardian_name:String(input.guardianName||'').trim().slice(0,60),year_level:String(input.yearLevel||'').slice(0,30),school_name:String(input.schoolName||'').trim().slice(0,100)};
  const {db,ownerId,sdk:s}=await connectFirebase();
  await s.setDoc(s.doc(db,'students',profile.id),{...profile,ownerId,createdAt:s.serverTimestamp()});
  return profile;
}
export async function saveAttempt(result) {
  const {db,ownerId,sdk:s}=await connectFirebase();
  // Read before create: a retry returns the first committed immutable result.
  const operation = s.runTransaction(db,async tx=>{
    const ref=s.doc(db,'attempts',result.id),previous=await tx.get(ref);
    if(previous.exists())return previous.data();
    tx.set(ref,{...clean(result),ownerId,score:result.percentage,createdAt:s.serverTimestamp()});
    return result;
  });
  // A timed-out operation may still commit; the same deterministic ID makes retry safe.
  let timer;
  try {
    return await Promise.race([operation,new Promise((_,reject)=>{
      timer=setTimeout(()=>reject(new Error('Pengesahan Firebase belum diterima. Semak sambungan dan cuba hantar semula. Jawapan anda masih disimpan dalam pelayar ini.')),20000);
    })]);
  } finally { clearTimeout(timer); }
}
export async function deleteStudent(id,confirmName) {
  const profile=await getRecord('students',id);
  if(confirmName!==profile.display_name)throw new Error('Taip nama paparan pelajar untuk mengesahkan pemadaman.');
  const records=await listRecords('attempts',id);
  const {db,sdk:s}=await connectFirebase();
  // Profile is removed last so a failed partial deletion remains retryable.
  for(let start=0;start<records.length;start+=400){const batch=s.writeBatch(db);records.slice(start,start+400).forEach(r=>batch.delete(s.doc(db,'attempts',r.id)));await batch.commit();}
  await s.deleteDoc(s.doc(db,'students',id));
}
