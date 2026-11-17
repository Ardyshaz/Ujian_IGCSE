import {connectFirebase} from './firebase.js';
import {profileFields} from './profile-fields.js';
import {withdrawHall} from './hall-service.js';
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
  const profile={id:crypto.randomUUID(),...profileFields(input)};
  const {db,ownerId,sdk:s}=await connectFirebase();
  await s.setDoc(s.doc(db,'students',profile.id),{...profile,ownerId,createdAt:s.serverTimestamp()});
  return profile;
}
export async function updateStudent(id,input){
  await getRecord('students',id);
  const fields=profileFields(input),{db,sdk:s}=await connectFirebase();
  await s.updateDoc(s.doc(db,'students',id),fields);
  return getRecord('students',id);
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
  await withdrawHall(id);
  const records=await listRecords('attempts',id);
  const {db,sdk:s}=await connectFirebase();
  // Profile is removed last so a failed partial deletion remains retryable.
  for(let start=0;start<records.length;start+=400){const batch=s.writeBatch(db);records.slice(start,start+400).forEach(r=>batch.delete(s.doc(db,'attempts',r.id)));await batch.commit();}
  await s.deleteDoc(s.doc(db,'students',id));
}
