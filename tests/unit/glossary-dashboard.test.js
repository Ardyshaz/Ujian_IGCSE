import {test} from 'node:test';
import assert from 'node:assert/strict';
import {glossary} from '../../public/js/guides.js';
import {dailyTermIndex} from '../../public/js/glossary-spotlight.js';
import {dashboard} from '../../public/js/quiz-engine.js';

test('expanded glossary has 180 distinct complete bilingual terms and valid categories',()=>{
  assert.equal(glossary.length,180);
  assert.equal(new Set(glossary.map(r=>r[0].trim().toLowerCase())).size,180);
  const categories=['Mathematics','Science','English','Command word','Exam wording'];
  for(const row of glossary){assert.equal(row.length,4);assert.ok(row.every(v=>typeof v==='string'&&v.trim()));assert.ok(categories.includes(row[3]));}
  assert.ok(glossary.find(r=>r[0]==='Refraction'&&r[1]==='Pembiasan'));
  assert.ok(glossary.find(r=>r[0]==='Not to scale'));
});
test('daily glossary choice is deterministic and always a valid term',()=>{
  assert.equal(dailyTermIndex('2026-11-17'),dailyTermIndex('2026-11-17'));
  for(let day=1;day<=30;day++){const index=dailyTermIndex(`2026-11-${String(day).padStart(2,'0')}`);assert.ok(index>=0&&index<180&&Number.isInteger(index));}
});
test('mode summaries preserve equal quiz weights and distinguish wrong from blank',()=>{
  const q={id:'q',subject:'science',topicId:'science:t',topic:'T'};
  const result=(id,mode,percentage,answers)=>({id,mode,date:'2026-11-17T00:00:00Z',percentage,answers});
  const stats=dashboard([
    result('a','practice',100,[{question:q,correct:true,unanswered:false}]),
    result('b','practice',0,[{question:q,correct:false,unanswered:true}]),
    result('c','examination',0,[{question:q,correct:false,unanswered:false}])
  ]);
  assert.equal(stats.byMode[0].average,50);assert.equal(stats.byMode[0].unanswered,1);
  assert.equal(stats.byMode[1].average,0);assert.equal(stats.byMode[1].incorrect,1);
  assert.equal(stats.byMode[2].average,null);assert.equal(stats.byMode[3].count,0);
});
