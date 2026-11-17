import {test} from 'node:test';
import assert from 'node:assert/strict';
import {hallWeek,buildHallEntries,prepareHallAttempts,validHallAlias,automaticHallAlias,automaticHallData} from '../../public/js/hall-policy.js';
import {profileFields} from '../../public/js/profile-fields.js';
const now=Date.parse('2026-11-18T04:00:00Z');
const consent=(id)=>({id,ownerId:id,publicId:`00000000-0000-4000-8000-00000000000${id}`,alias:`Bintang ${id}`,version:1,guardianConfirmed:true});
const q=(id,subject='english')=>({id,subject,version:1,status:'published',answer:'yes',type:'short_answer'});
const attempt=(id,questions,{date='2026-11-17T04:00:00Z',ownerId='a',studentId='a',correct=true}={})=>({id,ownerId,studentId,date,createdAt:date,answers:questions.map(question=>({question:{...question},answer:correct?'yes':'no',correct}))});
test('Malaysia Hall week starts Monday midnight, including UTC Sunday evening',()=>{
 assert.equal(hallWeek(Date.parse('2026-11-15T15:59:59Z')).start,'2026-11-09');
 assert.equal(hallWeek(Date.parse('2026-11-15T16:00:00Z')).start,'2026-11-16');
});
test('only explicit valid consent and matching profile ownership can publish',()=>{
 const rows=[attempt('r',[q('1')])];
 assert.equal(buildHallEntries([], [{id:'a',ownerId:'a'}],rows,now).length,0);
 assert.equal(buildHallEntries([consent('a')],[{id:'a',ownerId:'other'}],rows,now).length,0);
 assert.equal(buildHallEntries([{...consent('a'),guardianConfirmed:false}],[{id:'a',ownerId:'a'}],rows,now).length,0);
 const[e]=buildHallEntries([consent('a')],[{id:'a',ownerId:'a',display_name:'PRIVATE',school_name:'PRIVATE'}],rows,now);
 assert.equal(e.alias,'Bintang a');assert.ok(!JSON.stringify(e).includes('PRIVATE'));
 assert.ok(!('ownerId'in e)&&!('studentId'in e)&&!('answers'in e));
});
test('repetitions do not inflate exploration or first accuracy and 30 first items qualify a subject',()=>{
 const questions=Array.from({length:30},(_,i)=>q(String(i)));
 const rows=[attempt('first',questions,{correct:false}),attempt('retry',questions,{date:'2026-11-18T03:00:00Z'})];
 const[e]=buildHallEntries([consent('a')],[{id:'a',ownerId:'a'}],rows,now);
 assert.equal(e.uniqueQuestions,30);assert.equal(e.activeDays,2);assert.equal(e.subjects.english.accuracy,0);assert.equal(e.ranks.english,1);
 const[small]=buildHallEntries([consent('a')],[{id:'a',ownerId:'a'}],[attempt('small',questions.slice(0,29))],now);assert.ok(!small.ranks.english);assert.equal(small.subjects.english.correct,null);assert.equal(small.subjects.english.accuracy,null);
});
test('prior-week first encounters cannot become new accuracy evidence by repeating them',()=>{
 const questions=Array.from({length:30},(_,i)=>q(String(i))),rows=[attempt('old',questions,{date:'2026-11-13T03:00:00Z'}),attempt('repeat',questions)];
 const[e]=buildHallEntries([consent('a')],[{id:'a',ownerId:'a'}],rows,now);assert.equal(e.uniqueQuestions,30);assert.equal(e.subjects.english.count,0);assert.ok(!e.ranks.english);
});
test('each category publishes at most five ranks and ignores other-family attempts',()=>{
 const cs=Array.from({length:7},(_,i)=>consent(String(i))),ps=cs.map(c=>({id:c.id,ownerId:c.ownerId}));
 const rows=cs.map(c=>attempt(`r${c.id}`,[q('1')],{ownerId:c.ownerId,studentId:c.id}));
 rows.push(attempt('forged',[q('bad')],{ownerId:'other',studentId:'0'}));
 const entries=buildHallEntries(cs,ps,rows,now);assert.equal(entries.length,5);assert.ok(entries.every(e=>e.uniqueQuestions===1));
});
test('publisher rejects unknown/version-mismatched items and recomputes correct answers using trusted bank keys',()=>{
 const bank=[q('a'),q('b')],r=attempt('r',[bank[0],bank[1],q('fake')]);
 r.answers[0].correct=false;r.answers[0].question.answer='forged';r.answers[1].question.version=9;
 const clean=prepareHallAttempts([r,{...r,id:'missing-time',createdAt:null}],bank);
 assert.equal(clean.length,1);assert.equal(clean[0].answers.length,1);assert.equal(clean[0].answers[0].correct,true);
 assert.equal(clean[0].date,r.createdAt);
});
test('profile fields support private school/state, preserve omission, and reject invalid input',()=>{
 const p=profileFields({displayName:'  Bintang  ',yearLevel:'Form 1',schoolName:'SK Contoh',state:'Perak'});
 assert.equal(p.display_name,'Bintang');assert.equal(p.state,'Perak');assert.equal(profileFields({displayName:'A'}).state,'');
 assert.throws(()=>profileFields({displayName:'A',state:'invalid'}));assert.throws(()=>profileFields({displayName:''}));
 assert.ok(validHallAlias('Bintang Biru'));assert.ok(!validHallAlias('email@example'));assert.ok(!validHallAlias('0123456789'));
});
test('automatic summaries use opaque aliases including numeric codes and never copy profile names',()=>{
 const publicId='12345678-1234-1234-1234-123456789abc';
 const pref={id:'a',ownerId:'a',publicId,alias:automaticHallAlias(publicId),version:2,enabled:true};
 const bank=Array.from({length:30},(_,i)=>q(String(i)));
 const data=automaticHallData(pref,{id:'a',ownerId:'a',display_name:'PRIVATE NAME'},[attempt('r',bank)],bank,now);
 assert.equal(data.alias,'Pelajar 123456');assert.equal(data.englishScore,100);assert.equal(data.source,'self_reported');
 assert.ok(!JSON.stringify(data).includes('PRIVATE NAME'));assert.ok(!('ranks'in data)&&!('ownerId'in data));
 assert.equal(automaticHallData({...pref,enabled:false},{id:'a',ownerId:'a'},[attempt('r',bank)],bank,now),null);
});
