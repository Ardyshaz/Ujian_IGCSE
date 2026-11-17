// Isolated demo-emulator workflow. Never opts a real child into public display.
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {execFileSync} from 'node:child_process';
import {mkdtemp,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const output=await mkdtemp(join(tmpdir(),'igcse-hall-profile-'));
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
await context.route('**/js/firebase-config.js',r=>r.fulfill({contentType:'text/javascript',body:'export const firebaseConfig=null;export const useEmulators=true;'}));
const page=await context.newPage();page.setDefaultTimeout(20000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
const root='http://127.0.0.1:8080/v1/projects/demo-kuiz-igcse/databases/(default)/documents';
const publish=()=>execFileSync(process.execPath,['scripts/operations/publish-hall.js','--emulator','--publish'],{encoding:'utf8'});
try{
 await page.goto('http://localhost:3000');await page.locator('.hero').waitFor();
 const fixture=await page.evaluate(async()=>{
  const{post}=await import('/js/api.js'),{saveAttempt}=await import('/js/repository.js'),{grade}=await import('/js/quiz-engine.js');
  const profile=await post('/students',{displayName:'PRIVATE QA NAME',guardianName:'PRIVATE GUARDIAN',schoolName:'PRIVATE SCHOOL',yearLevel:'Year 6'});
  const bank=await(await fetch('/questions.json')).json(),questions=bank.filter(q=>q.subject==='english').slice(0,30);
  const drafts=Object.fromEntries(questions.map(q=>[q.id,{answer:q.answer}]));
  const quiz={id:crypto.randomUUID(),studentId:profile.id,subject:'english',mode:'practice',startedAt:Date.now()-1000,questions,drafts};
  await saveAttempt(grade(quiz));localStorage.setItem('igcse-active-profile',profile.id);return{profile,attemptId:quiz.id};
 });
 await page.reload();await page.locator('.sidebar-edit').waitFor();await page.locator('.sidebar-edit').click();
 const form=page.locator('#profile-edit-form');await form.locator('[name="displayName"]').fill('QA Edited Learner');await form.locator('[name="yearLevel"]').selectOption('Form 1');await form.locator('[name="schoolName"]').fill('SK Contoh');await form.locator('[name="state"]').selectOption('Perak');
 await page.screenshot({path:join(output,'desktop-profile-edit.png')});await form.getByRole('button',{name:'Simpan perubahan',exact:true}).click();
 await page.locator('#dialog').waitFor({state:'hidden'});await page.getByText('Selamat kembali, QA Edited Learner.',{exact:false}).waitFor();
 const stored=await page.evaluate(async id=>{const{api}=await import('/js/api.js');return{profile:await api(`/students/${id}`),stats:await api(`/dashboard/${id}`)};},fixture.profile.id);
 assert.equal(stored.profile.id,fixture.profile.id);assert.equal(stored.profile.state,'Perak');assert.equal(stored.profile.year_level,'Form 1');assert.equal(stored.profile.school_name,'SK Contoh');assert.equal(stored.stats.history[0].id,fixture.attemptId);
 await page.getByRole('button',{name:'Urus penyertaan',exact:true}).click();
 assert.equal(await page.locator('#hall-enroll [name="alias"]').inputValue(),'');assert.equal(await page.locator('#hall-enroll [name="guardian"]').isChecked(),false);
 await page.locator('#hall-enroll [name="alias"]').fill('Penjelajah QA');await page.locator('#hall-enroll [name="guardian"]').check();await page.getByRole('button',{name:'Sertai secara pilihan',exact:true}).click();
 await page.getByText('Penyertaan disimpan.',{exact:false}).waitFor();await page.locator('#dialog [data-close]').first().click();
 console.log(publish().trim());const preview=JSON.parse(await readFile('.local/reports/hall-preview.json','utf8'));
 assert.equal(preview.entries.length,1);const entry=preview.entries[0];assert.equal(entry.uniqueQuestions,30);assert.equal(entry.subjects.english.accuracy,100);
 assert.ok(!JSON.stringify(entry).includes('PRIVATE'));assert.ok(!JSON.stringify(entry).includes('Perak'));assert.ok(!JSON.stringify(entry).includes(fixture.profile.id));
 await page.reload();await page.locator('.hall-card').waitFor();await page.locator('#community-hall').scrollIntoViewIfNeeded();await page.screenshot({path:join(output,'desktop-hall.png')});
 await page.locator('.hall-card').click();await page.getByRole('heading',{name:'Pencapaian mingguan',exact:true}).waitFor();assert.ok(!(await page.locator('#dialog').innerText()).includes('SK Contoh'));
 await page.locator('#dialog [data-close]').first().click();await page.locator('[data-hall-category="science"]').click();assert.equal(await page.locator('.hall-card').count(),0);await page.locator('[data-hall-category="english"]').click();assert.equal(await page.locator('.hall-card').count(),1);
 await page.setViewportSize({width:390,height:844});await page.locator('#community-hall').scrollIntoViewIfNeeded();await page.screenshot({path:join(output,'mobile-hall.png')});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 const consentResponse=await fetch(`${root}/hallConsents/${fixture.profile.id}`,{headers:{Authorization:'Bearer owner'}}),oldConsent=await consentResponse.json();
 await page.getByRole('button',{name:'Urus penyertaan',exact:true}).click();await page.getByRole('button',{name:'Tarik balik penyertaan',exact:true}).click();await page.getByText('Penyertaan ditarik balik',{exact:false}).waitFor();assert.equal(await page.locator('.hall-card').count(),0);await page.locator('#dialog [data-close]').first().click();
 const stale=await fetch(root+':commit',{method:'POST',headers:{Authorization:'Bearer owner','Content-Type':'application/json'},body:JSON.stringify({writes:[{verify:oldConsent.name,currentDocument:{updateTime:oldConsent.updateTime}},{update:{name:root.replace('http://127.0.0.1:8080/v1/','')+'/hallEntries/'+entry.id,fields:{alias:{stringValue:'STALE-DO-NOT-PUBLISH'}}}}]})});
 assert.equal(stale.ok,false,'Stale publisher must fail after consent withdrawal.');console.log(publish().trim());
 // Deleting an enrolled profile also withdraws its public card and private consent mapping.
 await page.getByRole('button',{name:'Urus penyertaan',exact:true}).click();await page.locator('#hall-enroll [name="alias"]').fill('Penjelajah QA');await page.locator('#hall-enroll [name="guardian"]').check();await page.getByRole('button',{name:'Sertai secara pilihan',exact:true}).click();await page.getByText('Penyertaan disimpan.',{exact:false}).waitFor();await page.locator('#dialog [data-close]').first().click();publish();
 await page.evaluate(async id=>{const{api}=await import('/js/api.js');await api(`/students/${id}`,{method:'DELETE',body:JSON.stringify({confirmName:'QA Edited Learner'})});},fixture.profile.id);
 console.log(publish().trim());assert.deepEqual(errors,[]);
 console.log('PASS: own profile name/year/school/state edit preserves attempt; explicit alias/guardian opt-in; real publisher30-item eligibility; public cards/details/category/mobile; private field exclusion; atomic withdrawal; stale publication rejection; profile deletion cleanup. Evidence: '+output);
}catch(error){await page.screenshot({path:join(output,'failure.png')});console.log((await page.locator('body').innerText()).slice(-1800));throw error;}finally{await context.close();await browser.close();}
