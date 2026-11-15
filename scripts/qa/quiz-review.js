// Regression: auto-review, partial-score submission, visible failure and safe retry.
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const output=await mkdtemp(join(tmpdir(),'igcse-review-'));
const real=process.env.TEST_REAL_FIREBASE==='1',base=process.env.TEST_BASE_URL||'http://localhost:3000';
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
if(!real)await context.route('**/js/firebase-config.js',route=>route.fulfill({contentType:'text/javascript',body:'export const firebaseConfig=null; export const useEmulators=true;'}));
const page=await context.newPage();page.setDefaultTimeout(30000);page.setDefaultNavigationTimeout(30000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
let profileId;
try{
 await page.goto(base);await page.locator('.hero').waitFor();
 const fixture=await page.evaluate(async()=>{
  const {post}=await import('/js/api.js');
  const profile=await post('/students',{displayName:'QA Review Regression'});
  const questions=(await(await fetch('/questions.json')).json()).filter(q=>q.subject==='english').slice(0,10);
  const quiz=await post('/quizzes/start',{studentId:profile.id,mode:'practice',subject:'english',count:10,questionIds:questions.map(q=>q.id)});
  return{profile,quiz};
 });
 profileId=fixture.profile.id;
 await page.goto(`${base}/#session/${fixture.quiz.id}`);await page.locator('.question-text').waitFor();
 assert.equal(await page.locator('#flagged').count(),0);
 assert.equal(await page.getByText('Tanda untuk semakan',{exact:true}).count(),0);
 for(let i=0;i<10;i++){
  await page.locator(`[data-jump="${i}"]`).click();
  const q=fixture.quiz.questions[i];
  if(i<9){
   if(q.options?.length)await page.locator(`[data-answer="${q.answer}"]`).click();
   else{await page.locator('#typed-answer').fill(String(q.answer));await page.locator('#typed-answer').blur();}
  }
  await page.locator('[data-action="check"]').click();
  await page.waitForFunction(i=>document.querySelector(`[data-jump="${i}"]`)?.classList.contains('flagged'),i);
  if(i<9)await page.locator('#feedback .alert').waitFor();
  if(i===0){
   const color=await page.locator('[data-jump="0"]').evaluate(el=>getComputedStyle(el).backgroundColor);
   assert.equal(color,'rgb(255, 245, 220)');
   // Change a checked answer: scoring must keep the original checked answer.
   if(q.options?.length)await page.locator(`[data-answer="${q.options.find(o=>o.id!==q.answer).id}"]`).click();
   else{await page.locator('#typed-answer').fill('wrong after feedback');await page.locator('#typed-answer').blur();}
   await page.locator('[data-action="next"]').click();await page.locator('[data-action="previous"]').click();
   assert.ok(await page.locator('[data-jump="0"]').evaluate(el=>el.classList.contains('flagged')));
   await page.reload();await page.locator('.question-text').waitFor();
   assert.ok(await page.locator('[data-jump="0"]').evaluate(el=>el.classList.contains('flagged')));
  }
 }
 await page.screenshot({path:join(output,'gold-navigation.png')});
 await page.locator('[data-action="submit"]').first().click();
 await page.getByText('Ada 1 soalan belum dijawab dan 10 ditanda untuk semakan.',{exact:true}).waitFor();
 // A real browser network interruption must show an inline modal error and permit retry.
 await context.setOffline(true);
 await page.locator('[data-action="finish"]').click();
 await page.locator('#submit-error:not([hidden])').waitFor();
 assert.match(await page.locator('#submit-error').innerText(),/Penghantaran belum dapat disahkan/);
 await page.getByRole('button',{name:'Cuba hantar semula',exact:true}).waitFor();
 assert.ok(await page.locator('[data-action="finish"]').isEnabled());
 assert.match(page.url(),/#session\//);
 await page.screenshot({path:join(output,'visible-submit-error.png')});
 await context.setOffline(false);
 await page.locator('[data-action="finish"]').click();
 await page.waitForURL(/#result\//);await page.locator('.result-actions').waitFor();
 const saved=await page.evaluate(async id=>{
  const {api}=await import('/js/api.js');const {saveAttempt}=await import('/js/repository.js');
  const result=await api('/attempts/'+id);await saveAttempt(result);
  return{result,stats:await api('/dashboard/'+result.studentId)};
 },fixture.quiz.id);
 assert.equal(saved.result.total,10);assert.equal(saved.result.correct,9);assert.equal(saved.result.unanswered,1);assert.equal(saved.result.percentage,90);
 assert.ok(saved.result.answers.every(a=>a.flagged));assert.equal(saved.stats.total,1);assert.equal(saved.stats.average,90);
 await page.reload();await page.locator('.result-actions').waitFor();
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:join(output,'mobile-saved-result.png')});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(errors,[]);
 console.log(`PASS (${real?'LIVE Firebase':'emulators'}): no checkbox; immediate gold; next/back/refresh persistence; first checked answer; 10 flags + 1 unanswered; visible offline error; retry saves 90% once; reload/mobile. Evidence: ${output}`);
}catch(error){await context.setOffline(false);await page.screenshot({path:join(output,'failure.png')});console.log('Failure evidence: '+output);console.log((await page.locator('body').innerText()).slice(-1800));throw error;}
finally{
 await context.setOffline(false);
 if(profileId)await page.evaluate(async id=>{const{api}=await import('/js/api.js');await api('/students/'+id,{method:'DELETE',body:JSON.stringify({confirmName:'QA Review Regression'})});},profileId).catch(e=>console.log('Cleanup requires attention:',e.message));
 if(real)await page.evaluate(async()=>{const{getAuth,deleteUser}=await import('https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js');if(getAuth().currentUser)await deleteUser(getAuth().currentUser);}).catch(e=>console.log('Auth cleanup requires attention:',e.message));
 await context.close();await browser.close();
}
