import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readConsent,pageParameters,eventParameters,CONSENT_VERSION} from '../../public/js/analytics-policy.js';
const now=1800000000000;
test('analytics consent defaults off for missing/malformed/old/future choices',()=>{
 for(const raw of [null,'{}','broken',JSON.stringify({status:'granted',version:0,at:now}),JSON.stringify({status:'granted',version:CONSENT_VERSION,at:now+1}),JSON.stringify({status:'granted',version:CONSENT_VERSION,at:now-181*86400000})])assert.equal(readConsent(raw,now),null);
});
test('valid explicit allow and deny decisions survive reload',()=>{for(const status of ['granted','denied'])assert.equal(readConsent(JSON.stringify({status,version:CONSENT_VERSION,at:now-100}),now),status);});
test('route identifiers, queries, source title and referrer are never page parameters',()=>{
 const result=pageParameters('https://kuiz-igcse.web.app/?name=PRIVATE','#session/PRIVATE-QUIZ-ID?name=PRIVATE');
 assert.deepEqual(result,{page_name:'session',page_title:'Latihan Kuiz',page_location:'https://kuiz-igcse.web.app/#session',page_referrer:''});
 assert.equal(pageParameters('https://kuiz-igcse.web.app','#result/PRIVATE-ID').page_location,'https://kuiz-igcse.web.app/#result');
 assert.equal(pageParameters('https://kuiz-igcse.web.app','#PRIVATE-NAME').page_name,'home');
});
test('all event parameters are allowlisted and extra personal fields dropped',()=>{
 assert.deepEqual(eventParameters('quiz_start',{subject:'english',mode:'practice',studentId:'PRIVATE',answer:'PRIVATE',name:'PRIVATE',score:90}),{subject:'english',quiz_mode:'practice'});
 assert.deepEqual(eventParameters('quiz_complete',{subject:'mixed',mode:'daily',quizId:'PRIVATE'}),{subject:'mixed',quiz_mode:'daily'});
 assert.deepEqual(eventParameters('report_export',{format:'pdf',filename:'PRIVATE.pdf'}),{export_format:'pdf'});
 assert.deepEqual(eventParameters('page_view',{page_location:'PRIVATE'}),{});
});
test('unknown event names and invalid subject/mode/format values are rejected',()=>{
 for(const [event,input] of [['feedback_submit',{message:'PRIVATE'}],['quiz_start',{subject:'PRIVATE',mode:'practice'}],['quiz_complete',{subject:'science',mode:'PRIVATE'}],['report_export',{format:'PRIVATE'}]])assert.equal(eventParameters(event,input),null);
});
