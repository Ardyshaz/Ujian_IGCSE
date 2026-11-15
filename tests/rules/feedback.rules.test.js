import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {initializeTestEnvironment,assertSucceeds,assertFails} from '@firebase/rules-unit-testing';
import {doc,setDoc,getDoc,getDocs,collection,writeBatch,deleteDoc,serverTimestamp,Timestamp} from 'firebase/firestore';
const env=await initializeTestEnvironment({projectId:'demo-kuiz-igcse',firestore:{host:'127.0.0.1',port:8080,rules:await readFile('firestore.rules','utf8')}});
const sender=env.authenticatedContext('feedback-owner').firestore(),stranger=env.authenticatedContext('other-owner').firestore(),guest=env.unauthenticatedContext().firestore();
const payload={ownerId:'feedback-owner',category:'cadangan',message:'Tambah latihan mengikut topik.',displayName:'QA',page:'home',createdAt:serverTimestamp()};
function send(db,id,changes={}){const batch=writeBatch(db);batch.set(doc(db,'feedback',id),{...payload,...changes});batch.set(doc(db,'feedbackRateLimits','feedback-owner'),{submissionId:id,lastSubmittedAt:serverTimestamp()});return batch.commit();}
try{
 await env.clearFirestore();
 await assertFails(send(guest,'guest'));
 await assertFails(setDoc(doc(sender,'feedback','no-receipt'),payload));
 await assertFails(send(sender,'short',{message:'bad'}));
 await assertFails(send(sender,'too-long',{message:'a'.repeat(2001)}));
 await assertFails(send(sender,'bad-category',{category:'admin'}));
 await assertFails(send(sender,'forged-owner',{ownerId:'other-owner'}));
 await assertFails(send(sender,'extra-data',{contact:'not collected'}));
 await assertSucceeds(send(sender,'private-feedback'));
 await assertFails(getDoc(doc(sender,'feedback','private-feedback')));
 await assertFails(getDoc(doc(stranger,'feedback','private-feedback')));
 await assertFails(getDoc(doc(guest,'feedback','private-feedback')));
 await assertFails(getDocs(collection(sender,'feedback')));
 await assertFails(getDocs(collection(stranger,'feedback')));
 await assertFails(getDocs(collection(guest,'feedback')));
 await assertFails(setDoc(doc(sender,'feedback','private-feedback'),{...payload,message:'overwrite'}));
 await assertFails(deleteDoc(doc(sender,'feedback','private-feedback')));
 await assertSucceeds(getDoc(doc(sender,'feedbackRateLimits','feedback-owner')));
 await assertFails(getDoc(doc(stranger,'feedbackRateLimits','feedback-owner')));
 await assertFails(getDocs(collection(sender,'feedbackRateLimits')));
 await assertFails(send(sender,'too-soon'));
 await assertFails(setDoc(doc(sender,'feedbackRateLimits','feedback-owner'),{submissionId:'missing',lastSubmittedAt:serverTimestamp()}));
 // Test privileged maintenance access, like Console/IAM, without opening client reads.
 await env.withSecurityRulesDisabled(async admin=>{
  const db=admin.firestore(),message=await getDoc(doc(db,'feedback','private-feedback'));
  assert.equal(message.data().message,payload.message);
  await setDoc(doc(db,'feedbackRateLimits','feedback-owner'),{submissionId:'private-feedback',lastSubmittedAt:Timestamp.fromMillis(Date.now()-61000)});
 });
 await assertSucceeds(send(sender,'after-cooldown'));
 console.log('PASS: 23 feedback privacy/cooldown checks: admin-readable, no client reads/list/update/delete, validation, atomic receipt, 60-second server limit.');
}finally{await env.cleanup();}
