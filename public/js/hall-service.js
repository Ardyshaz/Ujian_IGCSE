import {connectFirebase} from './firebase.js';
import {validHallAlias,HALL_VERSION,hallWeek} from './hall-policy.js';
export async function hallConsent(studentId){
 const{db,ownerId,sdk:s}=await connectFirebase();
 const result=await s.getDocFromServer(s.doc(db,'hallConsents',studentId));
 if(!result.exists())return null;
 if(result.data().ownerId!==ownerId)throw new Error('Penyertaan tidak ditemui untuk keluarga ini.');
 return result.data();
}
export async function enrollHall(studentId,alias,guardianConfirmed){
 alias=alias.trim();if(!validHallAlias(alias))throw new Error('Gunakan nama panggilan 2-24 aksara tanpa e-mel, nombor telefon atau simbol khas.');
 if(guardianConfirmed!==true)throw new Error('Pilihan ini perlu dibuat oleh ibu bapa atau penjaga.');
 const existing=await hallConsent(studentId);
 if(existing){if(existing.alias===alias)return existing.publicId;throw new Error('Tarik balik penyertaan terdahulu sebelum menukar nama panggilan.');}
 const{db,ownerId,sdk:s}=await connectFirebase(),publicId=crypto.randomUUID();
 const batch=s.writeBatch(db);
 batch.set(s.doc(db,'hallConsents',studentId),{ownerId,publicId,alias,version:HALL_VERSION,guardianConfirmed:true,createdAt:s.serverTimestamp()});
 batch.set(s.doc(db,'hallOwners',publicId),{ownerId,studentId,createdAt:s.serverTimestamp()});
 await batch.commit();return publicId;
}
export async function withdrawHall(studentId){
 const consent=await hallConsent(studentId);if(!consent)return;
 const{db,sdk:s}=await connectFirebase(),batch=s.writeBatch(db);
 batch.delete(s.doc(db,'hallEntries',consent.publicId));
 batch.delete(s.doc(db,'hallOwners',consent.publicId));batch.delete(s.doc(db,'hallConsents',studentId));
 await batch.commit();
}
export async function listHall(){
 const{db,sdk:s}=await connectFirebase(),week=hallWeek();
 const result=await s.getDocsFromServer(s.query(s.collection(db,'hallEntries'),s.where('weekStart','==',week.start),s.limit(30)));
 return result.docs.map(d=>({...d.data(),id:d.id})).filter(e=>Date.parse(e.expiresAt)>Date.now());
}
