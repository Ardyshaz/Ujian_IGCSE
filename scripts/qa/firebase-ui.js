// Uses disposable demo emulators. Does not touch a user's Chrome profile or cloud project.
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const output=await mkdtemp(join(tmpdir(),'igcse-firebase-ui-'));
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const real=process.env.TEST_REAL_FIREBASE==='1';
if(!real)await context.route('**/js/firebase-config.js',route=>route.fulfill({contentType:'text/javascript',body:'export const firebaseConfig=null; export const useEmulators=true;'}));
const page=await context.newPage(),errors=[];
page.setDefaultTimeout(20000);page.setDefaultNavigationTimeout(20000);
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('response',r=>{if(r.status()>=400)console.log('HTTP error',r.status(),r.url());});
const base=process.env.TEST_BASE_URL||'http://localhost:3000';
try{
 await page.goto(base);await page.getByRole('heading',{name:'Persediaan ke MRSM IGCSE bermula di sini.'}).waitFor();
 assert.match(await page.title(),/MRSM.*Persediaan Ujian IGCSE/);
 assert.equal(await page.locator('.alert.warning').count(),0);
 await page.locator('[data-action="profiles"]').first().click();
 await page.locator('#displayName').fill('QA Firebase Learner');
 await page.locator('#profile-form button[type="submit"]').click();
 await page.locator('#dialog').waitFor({state:'hidden'});
 console.log('Profile saved ('+(real?'real Firebase':'emulator')+').');
 for(const subject of ['english','mathematics','science']){
  await page.goto(`${base}/#quiz`);await page.locator('#subject').waitFor();
  await page.locator('#subject').selectOption(subject);
  await page.locator('#subject').waitFor();await page.locator('#count').fill('1');
  await page.locator('#quiz-form button[type="submit"]').click();
  await page.locator('.question-text').waitFor();
  const question=await page.evaluate(async()=>{const {api}=await import('/js/api.js');return(await api('/quizzes/'+location.hash.split('/')[1])).questions[0];});
  if(question.options?.length){const answer=subject==='science'?question.options.find(o=>o.id!==question.answer).id:question.answer;await page.locator(`[data-answer="${answer}"]`).click();}
  else{await page.locator('#typed-answer').fill(subject==='science'?(typeof question.answer==='number'?String(question.answer+10):'deliberately incorrect'):String(question.answer));await page.locator('#typed-answer').blur();}
  await page.locator('[data-action="submit"]').first().click();
  await page.locator('[data-action="finish"]').click();
  await page.waitForURL(/#result\//);await page.locator('.result-actions').waitFor();
  console.log(subject+' result saved.');
  const id=await page.evaluate(()=>location.hash.split('/')[1]);
  // Real Firestore transaction retry must return the existing attempt, never duplicate.
  await page.evaluate(async id=>{const {getRecord,saveAttempt}=await import('/js/repository.js');const result=await getRecord('attempts',id);await Promise.all([saveAttempt(result),saveAttempt(result)]);},id);
 }
 await page.reload();await page.locator('.result-actions').waitFor();
 const snapshot=await page.evaluate(async()=>{const {api}=await import('/js/api.js');const b=await api('/bootstrap'),id=b.students.find(s=>s.display_name==='QA Firebase Learner').id;return {id,stats:await api('/dashboard/'+id)};});
 assert.equal(snapshot.stats.total,3);assert.ok(Math.abs(snapshot.stats.average-200/3)<0.001);assert.equal(snapshot.stats.history.length,3);assert.ok(snapshot.stats.subjects.every(s=>s.count===1));assert.deepEqual(snapshot.stats.subjects.map(s=>s.percentage),[100,100,0]);
 await page.goto(`${base}/#progress`);await page.getByRole('heading',{name:'Dashboard Prestasi Saya'}).waitFor({timeout:10000});
 await page.screenshot({path:join(output,'desktop-progress.png'),fullPage:false});
 await page.setViewportSize({width:390,height:844});await page.goto(`${base}/#home`);await page.locator('.hero').waitFor();
 await page.getByRole('button',{name:'☕ Sokong Projek Ini (100% Percuma)'}).click();
 await page.locator('#dialog[open]').waitFor();await page.locator('#dialog .support-qr').waitFor({state:'visible'});
 await page.getByRole('button',{name:'Tutup',exact:true}).click();assert.equal(await page.locator('#dialog[open]').count(),0);
 await page.screenshot({path:join(output,'mobile-home.png'),fullPage:false});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);
 await page.evaluate(async id=>{const{api}=await import('/js/api.js');await api('/students/'+id,{method:'DELETE',body:JSON.stringify({confirmName:'QA Firebase Learner'})});},snapshot.id);
 assert.deepEqual(errors,[]);
 // The test owns this isolated identity. Leave no synthetic auth account in real Firebase.
 if(real)await page.evaluate(async()=>{const {getAuth,deleteUser}=await import('https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js');await deleteUser(getAuth().currentUser);});
 console.log(`PASS (${real?'REAL kuiz-igcse':'demo emulators'}): three subjects -> Firestore -> immutable retry -> reload -> Dashboard (3 attempts); profile delete; mobile footer/modal; no runtime/console errors. Screenshots: `+output);
}catch(error){console.log('Failure screenshot: '+join(output,'failure.png'));await page.screenshot({path:join(output,'failure.png')});console.log((await page.locator('body').innerText()).slice(-1500));throw error;}finally{await context.close();await browser.close();}
