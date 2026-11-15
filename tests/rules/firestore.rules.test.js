import {readFile} from 'node:fs/promises';
import {initializeTestEnvironment,assertSucceeds,assertFails} from '@firebase/rules-unit-testing';
import {doc,setDoc,getDoc,getDocs,query,where,collection,deleteDoc,serverTimestamp,runTransaction} from 'firebase/firestore';
const env=await initializeTestEnvironment({projectId:'demo-kuiz-igcse',firestore:{host:'127.0.0.1',port:8080,rules:await readFile('firestore.rules','utf8')}});
const a=env.authenticatedContext('owner-a').firestore(),b=env.authenticatedContext('owner-b').firestore(),guest=env.unauthenticatedContext().firestore();
const profile={id:'student-a',ownerId:'owner-a',display_name:'QA learner',guardian_name:'',year_level:'Year 6',school_name:'',createdAt:serverTimestamp()};
const attempt={id:'attempt-a',quizId:'attempt-a',studentId:'student-a',ownerId:'owner-a',subject:'science',mode:'practice',status:'submitted',date:new Date().toISOString(),startedAt:Date.now(),dailyDate:null,total:1,correct:1,incorrect:0,unanswered:0,percentage:100,category:'Excellent',duration:2,answers:[{question:{id:'q'},answer:'a',correct:true}],score:100,createdAt:serverTimestamp()};
try{
 await env.clearFirestore();
 await assertFails(setDoc(doc(guest,'students','student-a'),profile));
 await assertSucceeds(setDoc(doc(a,'students','student-a'),profile));
 await assertFails(getDoc(doc(b,'students','student-a')));
 await assertFails(setDoc(doc(b,'students','forged'),{...profile,id:'forged'}));
 await assertSucceeds(getDocs(query(collection(a,'students'),where('ownerId','==','owner-a'))));
 await assertFails(getDocs(collection(a,'students')));
 await assertSucceeds(runTransaction(a,async tx=>{const ref=doc(a,'attempts','attempt-a');const old=await tx.get(ref);if(!old.exists())tx.set(ref,attempt);}));
 await assertSucceeds(runTransaction(a,async tx=>{const old=await tx.get(doc(a,'attempts','attempt-a'));if(!old.exists())throw Error('Missing result');}));
 await assertFails(getDoc(doc(b,'attempts','attempt-a')));
 await assertFails(getDoc(doc(guest,'attempts','attempt-a')));
 await assertFails(setDoc(doc(a,'attempts','attempt-a'),{...attempt,score:0,percentage:0}));
 await assertFails(setDoc(doc(b,'attempts','cross-owner'),{...attempt,id:'cross-owner',quizId:'cross-owner',ownerId:'owner-b'}));
 await assertFails(setDoc(doc(a,'attempts','bad-score'),{...attempt,id:'bad-score',quizId:'bad-score',score:110,percentage:110}));
 await assertSucceeds(getDocs(query(collection(a,'attempts'),where('ownerId','==','owner-a'),where('studentId','==','student-a'))));
 // Multi-question partial scores were missing from the original one-question checks.
 for(const [correct,total,unanswered] of [[9,10,1],[7,10,1],[2,3,1],[1,8,0],[0,10,10],[10,10,0]]){
  const id=`score-${correct}-${total}`,score=correct/total*100;
  await assertSucceeds(setDoc(doc(a,'attempts',id),{...attempt,id,quizId:id,total,correct,incorrect:total-correct-unanswered,unanswered,answers:Array.from({length:total},()=>({answer:null})),score,percentage:score}));
  await assertSucceeds(deleteDoc(doc(a,'attempts',id)));
 }
 for(const score of [89,91]){
  const id=`inconsistent-${score}`;
  await assertFails(setDoc(doc(a,'attempts',id),{...attempt,id,quizId:id,total:10,correct:9,incorrect:0,unanswered:1,answers:Array.from({length:10},()=>({answer:null})),score,percentage:score}));
 }
 await assertFails(deleteDoc(doc(b,'attempts','attempt-a')));
 await assertSucceeds(deleteDoc(doc(a,'attempts','attempt-a')));
 await assertSucceeds(deleteDoc(doc(a,'students','student-a')));
 console.log('PASS: 31 actual Firestore emulator rules checks, including partial scores, unanswered questions and inconsistent-score rejection.');
}finally{await env.cleanup();}
