// Consent/privacy instrumentation only: Google Analytics transport is mocked, never collected.
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {mkdtemp} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const output=await mkdtemp(join(tmpdir(),'igcse-analytics-'));
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
const context=await browser.newContext({viewport:{width:390,height:844}}),base=process.env.TEST_BASE_URL||'http://localhost:3000';
await context.route('**/js/firebase-config.js',route=>route.fulfill({contentType:'text/javascript',body:'export const firebaseConfig=null; export const useEmulators=true;'}));
await context.route('**/js/analytics-config.js',route=>route.fulfill({contentType:'text/javascript',body:'export const analyticsConfig={enabled:true,measurementId:"G-F9W4PLD4G9",projectId:"demo-kuiz-igcse",hosts:["localhost","127.0.0.1"]};'}));
let imports=0;
await context.route('**/firebase-analytics.js',route=>{
 imports++;
 return route.fulfill({contentType:'text/javascript',body:`
 window.__analyticsCalls ||= [];
 const record=(name,data)=>window.__analyticsCalls.push({name,data});
 export const isSupported=async()=>!window.__unsupported;
 export const setConsent=data=>record('consent',data);
 export const setDefaultEventParameters=data=>record('defaults',data);
 export const initializeAnalytics=(app,data)=>{record('init',data);return {app};};
 export const setAnalyticsCollectionEnabled=(instance,enabled)=>record('enabled',enabled);
 export const logEvent=(instance,name,data)=>record('event',{name,...data});
 `});
});
const page=await context.newPage();page.setDefaultTimeout(20000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto(base);await page.locator('.hero').waitFor();assert.equal(imports,0);
 await page.locator('#support-footer [data-action="analytics-privacy"]').click();
 await page.getByRole('button',{name:'Tolak / Matikan',exact:true}).click();
 await page.getByText('Analitik dimatikan. Kuiz dan rekod anda kekal tersedia.',{exact:true}).waitFor();assert.equal(imports,0);
 await page.reload();await page.locator('.hero').waitFor();assert.equal(imports,0);
 await page.locator('#support-footer [data-action="analytics-privacy"]').click();
 await page.getByRole('button',{name:'Izinkan Analitik',exact:true}).click();
 await page.getByText('Analitik pilihan telah diaktifkan.',{exact:true}).waitFor();assert.equal(imports,1);
 const calls=await page.evaluate(()=>window.__analyticsCalls),init=calls.find(c=>c.name==='init');
 assert.equal(init.data.config.send_page_view,false);assert.equal(init.data.config.allow_google_signals,false);assert.equal(init.data.config.allow_ad_personalization_signals,false);
 assert.ok(calls.find(c=>c.name==='consent'&&c.data.ad_storage==='denied'&&c.data.ad_user_data==='denied'&&c.data.ad_personalization==='denied'));
 const owner=await page.evaluate(async()=>{const{connectFirebase}=await import('/js/firebase.js');return(await connectFirebase()).ownerId;});
 await page.evaluate(async()=>{
  history.replaceState(null,'','/#session/PRIVATE_QUIZ_ID?name=PRIVATE_NAME');document.title='PRIVATE_TITLE';
  document.cookie='mrsm_ga=TEST_CLIENT;path=/';document.cookie='essential_test=keep;path=/';
  const{trackUsage}=await import('/js/analytics.js');
  trackUsage('page_view');trackUsage('quiz_start',{subject:'english',mode:'practice',name:'PRIVATE_NAME',studentId:'PRIVATE_STUDENT_ID',answer:'PRIVATE_ANSWER'});
  trackUsage('quiz_complete',{subject:'science',mode:'examination',score:99,quizId:'PRIVATE_QUIZ_ID'});
  trackUsage('report_export',{format:'pdf',filename:'PRIVATE_FILENAME.pdf'});
  trackUsage('feedback_submit',{message:'PRIVATE_COMMENT'});trackUsage('quiz_start',{subject:'PRIVATE_SUBJECT',mode:'practice'});
 });
 const filtered=await page.evaluate(()=>window.__analyticsCalls);assert.ok(!JSON.stringify(filtered).includes('PRIVATE_'));
 const events=filtered.filter(c=>c.name==='event');assert.ok(events.some(c=>c.data.name==='report_export'&&c.data.export_format==='pdf'));assert.ok(!events.some(c=>c.data.name==='feedback_submit'));
 assert.ok(events.every(c=>!c.data.page_location.includes('?')&&!c.data.page_location.includes('/session/')));
 await page.getByRole('button',{name:'Tolak / Matikan',exact:true}).click();
 await page.getByText('Analitik dimatikan. Kuiz dan rekod anda kekal tersedia.',{exact:true}).waitFor();
 await page.evaluate(async()=>{const{trackUsage}=await import('/js/analytics.js');trackUsage('quiz_start',{subject:'science',mode:'practice'});});
 assert.equal(await page.evaluate(()=>window.__analyticsCalls.filter(c=>c.name==='event').length),events.length);
 const cookies=await page.evaluate(()=>document.cookie);assert.ok(!cookies.includes('mrsm_ga'));assert.ok(cookies.includes('essential_test=keep'));
 assert.equal(await page.evaluate(async()=>{const{connectFirebase}=await import('/js/firebase.js');return(await connectFirebase()).ownerId;}),owner);
 assert.equal(await page.evaluate(()=>window['ga-disable-G-F9W4PLD4G9']),true);
 await page.screenshot({path:join(output,'mobile-privacy.png')});
 await page.locator('#dialog [data-close]').first().click();
 await page.setViewportSize({width:360,height:600});await page.locator('#support-footer [data-action="analytics-privacy"]').click();await page.getByRole('button',{name:'Tolak / Matikan',exact:true}).scrollIntoViewIfNeeded();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.locator('#dialog [data-close]').first().click();
 // Consent withdrawal propagates to another existing tab without exposing learner data.
 const second=await context.newPage();second.setDefaultTimeout(20000);await second.goto(base);await second.locator('.hero').waitFor();
 await second.locator('#support-footer [data-action="analytics-privacy"]').click();await second.getByRole('button',{name:'Izinkan Analitik',exact:true}).click();await second.getByText('Analitik pilihan telah diaktifkan.',{exact:true}).waitFor();
 await page.waitForFunction(()=>window['ga-disable-G-F9W4PLD4G9']===false);
 await second.getByRole('button',{name:'Tolak / Matikan',exact:true}).click();await page.waitForFunction(()=>window['ga-disable-G-F9W4PLD4G9']===true);
 await second.close();assert.deepEqual(errors,[]);
 console.log('PASS: default/deny/reload load no Analytics SDK; explicit allow; private-field and URL filtering; ads denied; withdrawal/cookie isolation; shared-tab denial; mobile360/390. Google transport mocked. Evidence: '+output);
}finally{await context.close();await browser.close();}
