// Disposable demo-emulator integration. Never reads the user's browser profile or production records.
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const output=await mkdtemp(join(tmpdir(),'igcse-selection-'));
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
await context.route('**/js/firebase-config.js',route=>route.fulfill({contentType:'text/javascript',body:'export const firebaseConfig=null;export const useEmulators=true;'}));
const page=await context.newPage(),errors=[];page.setDefaultTimeout(20000);page.on('pageerror',e=>errors.push(e.message));
try {
  await page.goto('http://localhost:3000/#home');await page.locator('.hero').waitFor();
  const evidence=await page.evaluate(async()=>{
    const{post,api}=await import('/js/api.js'),{saveAttempt}=await import('/js/repository.js'),{grade}=await import('/js/quiz-engine.js');
    const profile=await post('/students',{displayName:'QA Learning Engine'}),sibling=await post('/students',{displayName:'QA Sibling'});
    const settings={studentId:profile.id,mode:'practice',subject:'mathematics',count:10,secondsPerQuestion:120};
    const first=await post('/quizzes/start',settings);
    const wrong={...grade(first),date:new Date(Date.now()-2*86400000).toISOString()};await saveAttempt(wrong);
    const next=await post('/quizzes/start',settings),old=new Set(first.questions.map(q=>q.id));
    const due=next.questions.filter(q=>old.has(q.id)).length;
    for(const q of next.questions)await post(`/quizzes/${next.id}/answers`,{questionId:q.id,answer:q.answer});
    await post(`/quizzes/${next.id}/submit`);
    const dailyA=await post('/quizzes/start',{...settings,mode:'daily'}),dailyB=await post('/quizzes/start',{...settings,studentId:sibling.id,mode:'daily'});
    const mixed=await post('/quizzes/start',{...settings,subject:'mixed',count:12});
    const stats=await api(`/dashboard/${profile.id}`),siblingStats=await api(`/dashboard/${sibling.id}`);
    localStorage.setItem('igcse-active-profile',profile.id);
    return{profile,sibling,due,unique:stats.learning.unique,repeated:stats.learning.repeated,firstCorrect:stats.learning.first.correct,repeatPercentage:stats.learning.repeat.percentage,unanswered:stats.learning.outcomes.unanswered,siblingTotal:siblingStats.total,dailySame:dailyA.questions.map(q=>q.id).join()===dailyB.questions.map(q=>q.id).join(),mixed:['english','mathematics','science'].map(s=>mixed.questions.filter(q=>q.subject===s).length)};
  });
  assert.equal(evidence.due,3);assert.equal(evidence.unique,17);assert.equal(evidence.repeated,3);assert.equal(evidence.firstCorrect,7);assert.equal(evidence.repeatPercentage,100);assert.equal(evidence.unanswered,10);assert.equal(evidence.siblingTotal,0);assert.equal(evidence.dailySame,true);assert.deepEqual(evidence.mixed,[4,4,4]);
  await page.reload();await page.locator('.hero').waitFor();await page.goto('http://localhost:3000/#progress');await page.getByRole('heading',{name:'Soalan baharu dan latihan berulang'}).waitFor();
  assert.ok((await page.locator('main').innerText()).includes('10 betul / 0 salah / 10 tidak dijawab'));
  await page.screenshot({path:join(output,'desktop-progress.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:join(output,'mobile-progress.png'),fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.reload();await page.getByRole('heading',{name:'Soalan baharu dan latihan berulang'}).waitFor();
  await page.evaluate(async({profile,sibling})=>{const{api}=await import('/js/api.js');for(const p of [profile,sibling])await api(`/students/${p.id}`,{method:'DELETE',body:JSON.stringify({confirmName:p.display_name})});},evidence);
  assert.deepEqual(errors,[]);console.log('PASS: history-aware selection (3 due/7 unseen),17 unique/3 repeated,first-v-repeat accuracy,blanks,sibling isolation,balanced mixed4/4/4,unchanged Daily set,Dashboard reload and390px no overflow. Evidence: '+output);
}catch(error){await page.screenshot({path:join(output,'failure.png'),fullPage:true});console.log((await page.locator('body').innerText()).slice(-2200));throw error;}finally{await context.close();await browser.close();}
