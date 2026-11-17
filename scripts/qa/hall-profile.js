import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';import {join} from 'node:path';
import {hallWeek} from '../../public/js/hall-policy.js';
const extraIds=[];const demoRoot='http://127.0.0.1:8080/v1/projects/demo-kuiz-igcse/databases/(default)/documents';
const encode=v=>v===null?{nullValue:null}:typeof v==='string'?{stringValue:v}:typeof v==='number'?{integerValue:String(v)}:{mapValue:{fields:Object.fromEntries(Object.entries(v).map(([k,x])=>[k,encode(x)]))}};
async function adminCommit(writes){const response=await fetch(demoRoot+':commit',{method:'POST',headers:{Authorization:'Bearer owner','Content-Type':'application/json'},body:JSON.stringify({writes})});assert.ok(response.ok,'Disposable emulator fixture commit');}

const output=await mkdtemp(join(tmpdir(),'igcse-auto-hall-'));
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
await context.route('**/js/firebase-config.js',r=>r.fulfill({contentType:'text/javascript',body:'export const firebaseConfig=null;export const useEmulators=true;'}));
const page=await context.newPage();page.setDefaultTimeout(25000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
let profileId;
try{
 await page.goto('http://localhost:3000');await page.locator('.hero').waitFor();
 profileId=await page.evaluate(async()=>{
  const{post}=await import('/js/api.js'),{saveAttempt}=await import('/js/repository.js'),{grade}=await import('/js/quiz-engine.js');
  const p=await post('/students',{displayName:'PRIVATE REAL NAME',guardianName:'PRIVATE GUARDIAN',schoolName:'PRIVATE SCHOOL',state:'Perak',yearLevel:'Year 6'});
  const bank=await(await fetch('/questions.json')).json(),questions=bank.filter(q=>q.subject==='english').slice(0,30);
  await saveAttempt(grade({id:crypto.randomUUID(),studentId:p.id,subject:'english',mode:'practice',startedAt:Date.now()-1000,questions,drafts:Object.fromEntries(questions.map(q=>[q.id,{answer:q.answer}]))}));
  localStorage.setItem('igcse-active-profile',p.id);return p.id;
 });
 await page.reload();await page.locator('.hall-card').waitFor();
 const original=await page.evaluate(async id=>{const{hallConsent,listHall}=await import('/js/hall-service.js');return{pref:await hallConsent(id),rows:await listHall()};},profileId);
 assert.equal(original.pref.version,2);assert.equal(original.pref.enabled,true);assert.match(original.pref.alias,/^Pelajar [A-F0-9]{6}$/);
 assert.ok(!JSON.stringify(original.rows).includes('PRIVATE'));assert.ok(!JSON.stringify(original.rows).includes('Perak'));
 await page.getByRole('heading',{name:'Wall Of Excellence Minggu Ini',exact:true}).waitFor();
 await page.locator('.sidebar-edit').click();await page.locator('#profile-edit-form [name="displayName"]').fill('QA Edited Learner');await page.locator('#profile-edit-form [name="yearLevel"]').selectOption('Form 1');await page.locator('#profile-edit-form [name="schoolName"]').fill('SK Contoh');
 await page.getByRole('button',{name:'Simpan perubahan',exact:true}).click();await page.locator('#dialog').waitFor({state:'hidden'});await page.locator('.hall-card').waitFor();
 const result=await page.evaluate(async id=>{const{api}=await import('/js/api.js'),{hallConsent,syncAutomaticHall}=await import('/js/hall-service.js');await api('/dashboard/'+id);const{exportStudent}=await import('/js/api.js');const data=await exportStudent(id);await syncAutomaticHall(id,data.attempts,await(await fetch('/questions.json')).json());return{p:data.profile,attempts:data.attempts.length,pref:await hallConsent(id)};},profileId);
 assert.equal(result.p.year_level,'Form 1');assert.equal(result.p.state,'Perak');assert.equal(result.attempts,1);assert.equal(result.pref.alias,original.pref.alias);
 await page.getByRole('button',{name:'Tetapan paparan',exact:true}).click();await page.getByRole('heading',{name:'Tetapan paparan pencapaian',exact:true}).waitFor();assert.equal(await page.locator('#dialog input[type="checkbox"]').count(),0);assert.match(await page.locator('#dialog').innerText(),/Alias awam/);await page.locator('#dialog [data-close]').first().click();
 await page.locator('.hall-card').click();await page.getByRole('heading',{name:'Pencapaian mingguan',exact:true}).waitFor();assert.ok(!(await page.locator('#dialog').innerText()).includes('SK Contoh'));await page.locator('#dialog [data-close]').first().click();
 const writes=Array.from({length:35},(_,i)=>{const id=crypto.randomUUID();extraIds.push(id);const n=i%25+1,low={count:0,correct:null,accuracy:null};const data={alias:'Pelajar '+id.slice(0,6).toUpperCase(),weekStart:hallWeek().start,uniqueQuestions:n,activeDays:1,subjects:{english:low,mathematics:low,science:low},version:2,source:'self_reported',explorerScore:n,consistencyScore:1,englishScore:-1,mathematicsScore:-1,scienceScore:-1};return{update:{name:'projects/demo-kuiz-igcse/databases/(default)/documents/hallEntries/'+id,fields:{...Object.fromEntries(Object.entries(data).map(([k,v])=>[k,encode(v)])),publishedAt:{timestampValue:new Date().toISOString()},expiresAt:{timestampValue:new Date(hallWeek().endMs).toISOString()}}}};});
 await adminCommit(writes);await page.reload();await page.waitForFunction(()=>document.querySelectorAll('.hall-card').length===5);
 const top=await page.locator('.hall-card small').allTextContents();assert.deepEqual(top,['30 soalan unik','25 soalan unik','24 soalan unik','23 soalan unik','22 soalan unik']);
 await page.locator('[data-hall-category="english"]').click();assert.equal(await page.locator('.hall-card').count(),1);await page.locator('[data-hall-category="explorer"]').click();await page.locator('#community-hall').scrollIntoViewIfNeeded();await page.screenshot({path:join(output,'desktop-hall.png')});
 await page.setViewportSize({width:390,height:844});await page.locator('#community-hall').scrollIntoViewIfNeeded();await page.screenshot({path:join(output,'mobile-hall.png')});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await adminCommit(extraIds.map(id=>({delete:'projects/demo-kuiz-igcse/databases/(default)/documents/hallEntries/'+id})));extraIds.length=0;
 await page.getByRole('button',{name:'Tetapan paparan',exact:true}).click();await page.getByRole('heading',{name:'Tetapan paparan pencapaian',exact:true}).waitFor();await page.getByRole('button',{name:'Sembunyikan pencapaian saya',exact:true}).click();await page.getByText('Paparan awam dipadam.',{exact:false}).waitFor();await page.locator('#dialog [data-close]').first().click();
 await page.reload();await page.getByRole('button',{name:'Tetapan paparan',exact:true}).waitFor();assert.equal(await page.locator('.hall-card').count(),0);
 const hidden=await page.evaluate(async id=>{const{hallConsent,syncAutomaticHall}=await import('/js/hall-service.js'),{exportStudent}=await import('/js/api.js');const d=await exportStudent(id);await syncAutomaticHall(id,d.attempts,await(await fetch('/questions.json')).json());return await hallConsent(id);},profileId);assert.equal(hidden.enabled,false);
 await page.getByRole('button',{name:'Tetapan paparan',exact:true}).click();await page.getByRole('heading',{name:'Tetapan paparan pencapaian',exact:true}).waitFor();await page.getByRole('button',{name:'Paparkan pencapaian saya',exact:true}).click();await page.locator('#dialog [data-close]').first().click();await page.locator('.hall-card').waitFor();
 await page.evaluate(async id=>{const{api}=await import('/js/api.js');await api(`/students/${id}`,{method:'DELETE',body:JSON.stringify({confirmName:'QA Edited Learner'})});},profileId);profileId=null;
 const remaining=await page.evaluate(async()=>{const{listHall}=await import('/js/hall-service.js');return(await listHall()).length;});assert.equal(remaining,0);assert.deepEqual(errors,[]);
 console.log('PASS: automatic random alias without checkbox/admin; private names/school/state excluded; profile edits preserve identity/attempts; subject Top5/detail/mobile; persistent hide/resume; enrolled profile deletion cleanup. Evidence: '+output);
}catch(error){await page.screenshot({path:join(output,'failure.png')});console.log((await page.locator('body').innerText()).slice(-2000));throw error;}finally{if(extraIds.length)await adminCommit(extraIds.map(id=>({delete:'projects/demo-kuiz-igcse/databases/(default)/documents/hallEntries/'+id})));if(profileId)try{await page.evaluate(async id=>{const{api}=await import('/js/api.js');const p=await api('/students/'+id);await api('/students/'+id,{method:'DELETE',body:JSON.stringify({confirmName:p.display_name})});},profileId);}catch{}await context.close();await browser.close();}
