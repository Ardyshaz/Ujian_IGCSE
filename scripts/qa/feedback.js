// Real mode uses CLI IAM only in this Node test to inspect/delete its own fixture.
// No admin token or privileged code is shipped in public/ or sent to the browser.
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createRequire} from 'node:module';
import {mkdtemp} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const real=process.env.TEST_REAL_FIREBASE==='1',base=process.env.TEST_BASE_URL||'http://localhost:3000';
const output=await mkdtemp(join(tmpdir(),'igcse-feedback-'));
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
const context=await browser.newContext({viewport:{width:390,height:844}});
if(!real)await context.route('**/js/firebase-config.js',route=>route.fulfill({contentType:'text/javascript',body:'export const firebaseConfig=null; export const useEmulators=true;'}));
const page=await context.newPage();page.setDefaultTimeout(30000);page.setDefaultNavigationTimeout(30000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
let fixture;
async function adminDocument(collection,id,method='GET'){
 assert.ok(['feedback','feedbackRateLimits'].includes(collection));assert.match(id,/^[A-Za-z0-9-]{1,80}$/);
 let origin='http://127.0.0.1:8080',project='demo-kuiz-igcse',headers={};
 if(real){
  const require=createRequire(import.meta.url),auth=require('../../node_modules/firebase-tools/lib/auth.js');
  const account=auth.getGlobalDefaultAccount();if(!account)throw new Error('Existing Firebase CLI login required for fixture administration.');
  const token=await auth.getAccessToken(account.tokens.refresh_token,[]);
  origin='https://firestore.googleapis.com';project='kuiz-igcse';headers={Authorization:`Bearer ${token.access_token}`};
 }else headers={Authorization:'Bearer owner'};
 const response=await fetch(`${origin}/v1/projects/${project}/databases/(default)/documents/${collection}/${id}`,{method,headers});
 if(method==='DELETE'&&response.status===404)return;
 if(!response.ok)throw new Error(`Fixture admin ${method} returned ${response.status}`);
 return method==='GET'?response.json():null;
}
try{
 await page.goto(base);await page.locator('.hero').waitFor();
 const feedback=page.locator('#support-footer [data-action="feedback"]');await feedback.click();
 await page.locator('#feedback-form').waitFor();assert.match(await page.locator('#dialog').innerText(),/hanya boleh dibaca oleh admin/);
 await page.locator('#feedback-name').fill('QA Private Feedback');await page.locator('#feedback-message').fill('QA ONLY - please add more topic practice.');
 await page.screenshot({path:join(output,'mobile-feedback.png')});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.getByRole('button',{name:'Hantar Maklum Balas',exact:true}).click();
 await page.getByRole('heading',{name:'Terima kasih!',exact:true}).waitFor();
 fixture=await page.evaluate(async()=>{const{connectFirebase}=await import('/js/firebase.js');const{db,ownerId,sdk:s}=await connectFirebase();const receipt=await s.getDocFromServer(s.doc(db,'feedbackRateLimits',ownerId));return{ownerId,id:receipt.data().submissionId};});
 const denied=await page.evaluate(async id=>{const{connectFirebase}=await import('/js/firebase.js');const{db,sdk:s}=await connectFirebase();const result=[];for(const action of [()=>s.getDocFromServer(s.doc(db,'feedback',id)),()=>s.getDocsFromServer(s.collection(db,'feedback'))]){try{await action();result.push('ALLOWED');}catch(e){result.push(e.code);}}return result;},fixture.id);
 assert.deepEqual(denied,['permission-denied','permission-denied']);
 const admin=await adminDocument('feedback',fixture.id);assert.equal(admin.fields.message.stringValue,'QA ONLY - please add more topic practice.');assert.equal(admin.fields.displayName.stringValue,'QA Private Feedback');
 // Acknowledgement retry returns the same private receipt without creating another comment.
 await page.evaluate(async id=>{const{submitFeedback}=await import('/js/feedback.js');await submitFeedback({category:'cadangan',displayName:'QA Private Feedback',message:'QA ONLY - please add more topic practice.'},id);},fixture.id);
 await page.getByRole('button',{name:'Tutup',exact:true}).click();await feedback.click();
 await page.locator('#feedback-message').fill('QA ONLY - cooldown must reject this second comment.');
 await page.getByRole('button',{name:'Hantar Maklum Balas',exact:true}).click();
 await page.locator('#feedback-error:not([hidden])').waitFor();assert.match(await page.locator('#feedback-error').innerText(),/satu minit/);
 assert.equal(await page.locator('#feedback-message').inputValue(),'QA ONLY - cooldown must reject this second comment.');
 await page.getByRole('button',{name:'Tutup',exact:true}).click();
 const padding=await page.evaluate(()=>({reserved:parseFloat(getComputedStyle(document.querySelector('.app-main')).paddingBottom),height:document.querySelector('#support-footer').getBoundingClientRect().height}));assert.ok(padding.reserved>=padding.height);
 await page.setViewportSize({width:1440,height:1000});await feedback.click();await page.locator('#feedback-form').waitFor();await page.screenshot({path:join(output,'desktop-feedback.png')});await page.keyboard.press('Escape');
 assert.deepEqual(errors,[]);
 console.log(`PASS (${real?'LIVE':'emulators'}): private feedback form/mobile/footer; submit; sender cannot get/list; privileged admin reads fixture; safe receipt retry; cooldown with retained input; no runtime errors. Evidence: ${output}`);
}catch(error){await page.screenshot({path:join(output,'failure.png')});console.log('Failure evidence: '+output);console.log((await page.locator('body').innerText()).slice(-1200));throw error;}
finally{
 if(fixture){await adminDocument('feedback',fixture.id,'DELETE');await adminDocument('feedbackRateLimits',fixture.ownerId,'DELETE');}
 if(real)await page.evaluate(async()=>{const{getAuth,deleteUser}=await import('https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js');if(getAuth().currentUser)await deleteUser(getAuth().currentUser);}).catch(()=>{});
 await context.close();await browser.close();
}
