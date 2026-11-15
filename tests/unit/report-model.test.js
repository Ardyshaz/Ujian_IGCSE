import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildReportModel} from '../../public/js/report.js';
const profile={id:'learner',display_name:'Pelajar Contoh'};
const answer=(subject,correct,topic='Grammar')=>({correct,question:{subject,topic}});
test('report mean and subject accuracy use different denominators correctly',()=>{
 const attempts=[{id:'a',studentId:'learner',date:'2026-11-14T08:00:00Z',percentage:50,duration:60,mode:'practice',answers:[answer('english',true),answer('english',false)]},{id:'b',studentId:'learner',date:'2026-11-15T08:00:00Z',percentage:100,duration:120,mode:'practice',answers:[answer('science',true,'Cells')]}];
 const model=buildReportModel({profile,attempts});assert.equal(model.stats.average,75);assert.equal(model.stats.total,2);assert.equal(model.stats.subjects[0].percentage,50);assert.equal(model.totalTime,180);assert.equal(model.results[0].id,'b');assert.equal(model.stats.topics.length,2);
});
test('reports never silently include another learner',()=>{assert.throws(()=>buildReportModel({profile,attempts:[{studentId:'sibling'}]}),/tidak sepadan/);});
test('empty report retains a real zero count and null scores',()=>{const model=buildReportModel({profile,attempts:[]});assert.equal(model.stats.total,0);assert.equal(model.stats.average,null);assert.equal(model.stats.best,null);assert.match(model.period,/Belum ada/);});
test('building a report does not mutate exported snapshots',()=>{const input={profile,attempts:[{id:'a',studentId:'learner',date:'2026-11-15',percentage:100,duration:10,mode:'practice',answers:[answer('english',true)]}]};const before=JSON.stringify(input);buildReportModel(input);assert.equal(JSON.stringify(input),before);});
