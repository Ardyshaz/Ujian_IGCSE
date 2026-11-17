import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {mkdir,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const real=process.env.TEST_REAL_FIREBASE==='1',base=process.env.TEST_BASE_URL||'http://localhost:3000',out=resolve('.local/qa/pdfs');
await mkdir(out,{recursive:true});await mkdir('.local/qa/reports',{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
if(!real)await context.route('**/js/firebase-config.js',route=>route.fulfill({contentType:'text/javascript',body:'export const firebaseConfig=null; export const useEmulators=true;'}));
const page=await context.newPage();page.setDefaultTimeout(30000);page.setDefaultNavigationTimeout(30000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));let fixture;
async function download(action,path){const wait=page.waitForEvent('download');await action();const file=await wait;await file.saveAs(path);assert.equal((await readFile(path)).subarray(0,5).toString(),'%PDF-');return file.suggestedFilename();}
try{
 await page.goto(base);await page.locator('.hero').waitFor();
 fixture=await page.evaluate(async()=>{
  const{post}=await import('/js/api.js'),{saveAttempt}=await import('/js/repository.js'),{grade}=await import('/js/quiz-engine.js');
  const profile=await post('/students',{displayName:'Pelajar Contoh',guardianName:'Penjaga Contoh',yearLevel:'Year 6',schoolName:'Sekolah Contoh',state:'Perak'});
  const sibling=await post('/students',{displayName:'SIBLING-NOT-IN-REPORT'});
  const bank=await(await fetch('/questions.json')).json(),subjects=['english','mathematics','science'],scores=[3,2,4,1,2,3];
  for(let i=0;i<6;i++){
   const subject=subjects[Math.floor(i/2)],questions=bank.filter(q=>q.subject===subject).slice(0,4).map(q=>({...q,topicId:`${q.subject}:${q.topic}`})),drafts=Object.fromEntries(questions.map((q,j)=>[q.id,{answer:j<scores[i]?q.answer:null}]));
   const quiz={id:crypto.randomUUID(),studentId:profile.id,subject,mode:'practice',startedAt:Date.now()-120000,questions,drafts},when=Date.now()-(5-i)*86400000;
   await saveAttempt({...grade(quiz),date:new Date(when).toISOString(),startedAt:when-120000,duration:120});
  }
  localStorage.setItem('igcse-active-profile',profile.id);return{profile,sibling};
 });
 await page.reload();await page.locator('.hero').waitFor();await page.locator('[data-action="profiles"]').first().click();await page.locator('[data-action="export-profile"]').waitFor();
 // PDF errors must remain visible within the native profile modal and allow retry.
 await page.route('**/assets/fonts/NotoSans-Bold.ttf',route=>route.abort());
 await page.locator('[data-action="export-profile"]').click();await page.locator('#export-error:not([hidden])').waitFor();assert.ok(await page.locator('[data-action="export-profile"]').isEnabled());
 await page.unroute('**/assets/fonts/NotoSans-Bold.ttf');
 const filename=await download(()=>page.locator('[data-action="export-profile"]').click(),resolve(out,'ui-report.pdf'));
 assert.match(filename,/^Laporan-Prestasi-Pelajar-Contoh-.*\.pdf$/);
 const waitJSON=page.waitForEvent('download');await page.locator('[data-action="export-profile-json"]').click();const json=await waitJSON;await json.saveAs(resolve(out,'records.json'));
 const raw=JSON.parse(await readFile(resolve(out,'records.json'),'utf8'));assert.equal(raw.profile.id,fixture.profile.id);assert.equal(raw.attempts.length,6);assert.ok(raw.attempts.every(a=>a.studentId===fixture.profile.id));
 await page.setViewportSize({width:390,height:844});await page.locator('[data-action="export-profile"]').scrollIntoViewIfNeeded();await page.screenshot({path:resolve(out,'mobile-export-controls.png')});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await download(()=>page.locator('[data-action="export-profile"]').click(),resolve(out,'mobile-report.pdf'));
 await page.locator('#dialog [data-close]').first().click();
 // Export a clearly labelled synthetic preview, not a real child's report.
 await download(()=>page.evaluate(async()=>{const{exportStudent}=await import('/js/api.js'),{createStudentReport}=await import('/js/report.js');const{doc}=await createStudentReport(await exportStudent(localStorage.getItem('igcse-active-profile')),{sample:true});await doc.save('Contoh-Laporan-Prestasi.pdf',{returnPromise:true});}),resolve('.local/qa/reports/Contoh-Laporan-Prestasi.pdf'));
 // Long records and multilingual profile names exercise wrapping and pagination locally.
 await download(()=>page.evaluate(async()=>{
  const{exportStudent}=await import('/js/api.js'),{createStudentReport}=await import('/js/report.js');const data=await exportStudent(localStorage.getItem('igcse-active-profile'));
  data.profile.display_name=('Pelajar Nama Panjang '+ '\u00c9lan ').repeat(3).slice(0,60);data.profile.guardian_name='\u6797\u5b50\u8c6a - \u0ba4\u0bae\u0bbf\u0bb4\u0bcd';data.profile.school_name=('Sekolah Rendah Contoh Nama Sangat Panjang ').repeat(3).slice(0,100);
  data.attempts=Array.from({length:120},(_,i)=>({...data.attempts[i%6],id:`REPORT-ROW-${String(i+1).padStart(3,'0')}`,date:new Date(Date.now()-i*86400000).toISOString()}));
  const{doc}=await createStudentReport(data);await doc.save('stress.pdf',{returnPromise:true});
 }),resolve(out,'stress-report.pdf'));
 await download(()=>page.evaluate(async id=>{const{exportStudent}=await import('/js/api.js'),{createStudentReport}=await import('/js/report.js');const{doc}=await createStudentReport(await exportStudent(id));await doc.save('empty.pdf',{returnPromise:true});},fixture.sibling.id),resolve(out,'empty-report.pdf'));
 assert.deepEqual(errors,[]);console.log(`PASS (${real?'LIVE':'emulators'}): PDF/JSON export; selected-learner isolation; retry after font failure; mobile download; empty/long/multilingual/120-attempt reports. Files: ${out}; synthetic preview: .local/qa/reports/Contoh-Laporan-Prestasi.pdf`);
}catch(error){await page.screenshot({path:resolve(out,'failure.png')});console.log((await page.locator('body').innerText()).slice(-1600));throw error;}
finally{
 if(fixture)await page.evaluate(async f=>{const{api}=await import('/js/api.js');for(const profile of [f.profile,f.sibling])await api('/students/'+profile.id,{method:'DELETE',body:JSON.stringify({confirmName:profile.display_name})});},fixture).catch(e=>console.log('Fixture cleanup requires attention:',e.message));
 if(real)await page.evaluate(async()=>{const{getAuth,deleteUser}=await import('https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js');if(getAuth().currentUser)await deleteUser(getAuth().currentUser);}).catch(()=>{});
 await context.close();await browser.close();
}
