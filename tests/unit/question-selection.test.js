import {test} from 'node:test';
import assert from 'node:assert/strict';
import {selectQuestions,learningEvidence,REVIEW_GAP_MS} from '../../public/js/question-selection.js';
import {dashboard} from '../../public/js/quiz-engine.js';
const now=Date.parse('2026-11-17T04:00:00Z');
const q=(id,subject='science',difficulty=1)=>({id,subject,difficulty,topicId:`${subject}:topic`,topic:'Topic'});
const attempt=(id,questions,{correct=false,at=now-REVIEW_GAP_MS,studentId='child',unanswered=false}={})=>({id,studentId,date:new Date(at).toISOString(),percentage:correct?100:0,mode:'practice',answers:questions.map(question=>({question,correct,unanswered}))});
const options={studentId:'child',now,random:()=>0};

test('unseen questions precede recently answered and correct questions without duplicates',()=>{
  const bank=Array.from({length:10},(_,i)=>q(String(i)));
  const selected=selectQuestions(bank,{...options,count:5,results:[attempt('a',bank.slice(0,5),{correct:true})]});
  assert.deepEqual(new Set(selected.map(q=>q.id)),new Set(['5','6','7','8','9']));
});
test('due wrong answers reserve about 30 percent while recent wrong answers wait',()=>{
  const bank=Array.from({length:20},(_,i)=>q(String(i)));
  const results=[attempt('due',bank.slice(0,5)),attempt('recent',bank.slice(5,10),{at:now-1000})];
  const selected=selectQuestions(bank,{...options,count:10,results});
  assert.equal(selected.filter(q=>Number(q.id)<5).length,3);
  assert.equal(selected.filter(q=>Number(q.id)>=10).length,7);
  assert.equal(selected.filter(q=>Number(q.id)>=5&&Number(q.id)<10).length,0);
});
test('a corrected latest outcome removes a previous error from due review',()=>{
  const bank=Array.from({length:8},(_,i)=>q(String(i)));
  const results=[attempt('old',[bank[0]]),attempt('corrected',[bank[0]],{correct:true,at:now-100})];
  assert.ok(selectQuestions(bank,{...options,count:5,results}).every(q=>q.id!=='0'));
});
test('another learner history never changes selection',()=>{
  const bank=Array.from({length:8},(_,i)=>q(String(i)));
  assert.deepEqual(selectQuestions(bank,{...options,count:4}),selectQuestions(bank,{...options,count:4,results:[attempt('other',bank,{correct:true,studentId:'sibling'})]}));
});
test('mixed subject quotas differ by at most one and levels balance when available',()=>{
  const bank=['english','mathematics','science'].flatMap(s=>Array.from({length:5},(_,i)=>q(`${s}-${i}`,s,i+1)));
  const selected=selectQuestions(bank,{...options,count:12});
  for(const subject of ['english','mathematics','science']) {
    const items=selected.filter(q=>q.subject===subject);
    assert.equal(items.length,4);assert.equal(new Set(items.map(q=>q.difficulty)).size,4);
  }
});
test('filtered shortages redistribute quotas and exhausted banks reuse oldest first',()=>{
  const bank=[q('e','english'),...Array.from({length:5},(_,i)=>q(String(i)))];
  const selected=selectQuestions(bank,{...options,count:6});assert.equal(selected.length,6);assert.equal(new Set(selected.map(q=>q.id)).size,6);
  const seen=[attempt('old',[bank[1]],{correct:true,at:now-5000}),attempt('recent',bank.slice(2),{correct:true,at:now-1000})];
  assert.equal(selectQuestions(bank.slice(1),{...options,count:1,results:seen})[0].id,'0');
  assert.throws(()=>selectQuestions(bank,{...options,count:7}),/Hanya 6/);
});
test('unique evidence separates first encounters, repeats, wrong and blank answers',()=>{
  const a=q('a'),b=q('b'),results=[attempt('retry',[a],{correct:true,at:now}),attempt('first',[a],{at:now-1000}),attempt('blank',[b],{unanswered:true})];
  const s=learningEvidence(results);assert.equal(s.unique,2);assert.equal(s.repeated,1);
  assert.equal(s.first.percentage,0);assert.equal(s.repeat.percentage,100);
  assert.deepEqual({...s.outcomes,percentage:0},{count:3,correct:1,incorrect:1,unanswered:1,percentage:0});assert.ok(Math.abs(s.outcomes.percentage-100/3)<1e-9);
  assert.equal(s.uniqueTopics[0].percentage,50);
});
test('repeated answers alone never qualify a topic as strong or weak',()=>{
  const single=q('a'),d=dashboard([attempt('1',[single]),attempt('2',[single]),attempt('3',[single])]);
  assert.equal(d.topics[0].question_count,3);assert.equal(d.weakTopics.length,0);assert.equal(d.strongTopics.length,0);
  const weak=dashboard([attempt('distinct',[q('a'),q('b'),q('c')])]);assert.equal(weak.weakTopics.length,1);
});
test('empty learning evidence has null accuracy and zero counts',()=>{
  const s=learningEvidence([]);assert.equal(s.unique,0);assert.equal(s.first.percentage,null);assert.equal(s.repeat.percentage,null);
});
