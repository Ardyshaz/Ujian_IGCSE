// Demo emulators only. Browser plugin not available; isolated Playwright Chrome fallback.
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {mkdtemp} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const root='http://127.0.0.1:8080/v1/projects/demo-kuiz-igcse/databases/(default)/documents';
const admin={Authorization:'Bearer owner','Content-Type':'application/json'};
// Disposable demo data only; never use production tokens/project URLs here.
const reset=await fetch('http://127.0.0.1:8080/emulator/v1/projects/demo-kuiz-igcse/databases/(default)/documents',{method:'DELETE',headers:admin});assert.ok(reset.ok);
const output=await mkdtemp(join(tmpdir(),'igcse-traffic-'));
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
const base=process.env.TEST_BASE_URL||'http://localhost:3000';
assert.ok(['localhost','127.0.0.1'].includes(new URL(base).hostname));
async function context(){const c=await browser.newContext({viewport:{width:390,height:844}});await c.route('**/js/firebase-config.js',r=>r.fulfill({contentType:'text/javascript',body:'export const firebaseConfig=null;export const useEmulators=true;'}));await c.route('**/js/analytics-config.js',r=>r.fulfill({contentType:'text/javascript',body:'export const analyticsConfig={enabled:false,measurementId:"G-F9W4PLD4G9",hosts:[]};'}));return c;}
async function count(page,n){await page.waitForFunction(n=>document.querySelector('[data-traffic-total]')?.textContent===String(n),n);}
async function refresh(page){await page.evaluate(async()=>{await(await import('/js/traffic.js')).refreshTrafficCounters();});}
async function activity(page){return page.evaluate(async()=>await(await import('/js/traffic-service.js')).recordTrafficActivity());}
async function age(id,minutes){const t=new Date(Date.now()-minutes*60000).toISOString();const r=await fetch(`${root}/trafficSessions/${id}?updateMask.fieldPaths=lastSeen`,{method:'PATCH',headers:admin,body:JSON.stringify({fields:{lastSeen:{timestampValue:t}}})});assert.ok(r.ok);}
const errors=[];
try{
 const a=await context(),p=await a.newPage();p.on('pageerror',e=>errors.push(e.message));p.setDefaultTimeout(20000);
 await p.goto(base);await count(p,1);assert.match(await p.title(),/MRSM/);await p.locator('.hero').waitFor();
 assert.equal(await p.locator('[data-traffic-active]').textContent(),'1');
 assert.equal(await p.locator('.hero + .traffic-strip').count(),1);
 await p.locator('.traffic-strip summary').click();await p.getByText(/Jumlah dikira sejak counter dipasang/).waitFor();
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await p.screenshot({path:join(output,'mobile-390.png'),fullPage:false});
 await p.reload();await count(p,1);
 const tab=await a.newPage();await tab.goto(base);await count(tab,1);
 const concurrent=await Promise.all([activity(p),activity(tab)]);assert.equal(concurrent[0].sessionId,concurrent[1].sessionId);
 await refresh(tab);await count(tab,1);
 const b=await context(),q=await b.newPage();await q.goto(base);await count(q,2);assert.equal(await q.locator('[data-traffic-active]').textContent(),'2');
 const id=concurrent[0].sessionId;await age(id,6);await refresh(q);assert.equal(await q.locator('[data-traffic-active]').textContent(),'1');await count(q,2);
 await age(id,31);const renewed=await activity(p);assert.notEqual(renewed.sessionId,id);await refresh(p);await count(p,3);assert.equal(await p.locator('[data-traffic-active]').textContent(),'2');
 const receipts=await fetch(`${root}/trafficSessions`,{headers:admin}).then(r=>r.json());assert.ok(receipts.documents.every(d=>Object.keys(d.fields).sort().join(',')==='createdAt,lastSeen'));
 // After the first receipt, a later real activity may update lastSeen without a new visit.
 await age(renewed.sessionId,1);const heartbeat=await activity(p);assert.equal(heartbeat.newSession,false);await refresh(p);await count(p,3);
 await p.setViewportSize({width:1440,height:1000});await p.screenshot({path:join(output,'desktop.png'),fullPage:false});
 await p.setViewportSize({width:360,height:800});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await p.route('**/js/traffic-service.js',r=>r.fulfill({contentType:'text/javascript',body:'export async function recordTrafficActivity(){throw Error("offline")}export async function readTrafficCounters(){throw Error("offline")}'}));
 await p.reload();await p.getByText('Statistik belum dapat dikemas kini. Cuba lagi selepas sambungan pulih.',{exact:true}).waitFor();assert.equal(await p.locator('[data-traffic-total]').textContent(),'--');
 await p.screenshot({path:join(output,'unavailable.png'),fullPage:false});assert.deepEqual(errors,[]);
 console.log(`PASS: demo Home counter, initial/refresh/tabs/concurrency, two browsers, active expiry, 30-minute renewal, heartbeat, timestamp-only public receipts, 360/390/1440 layouts, unavailable state and no page errors. Screenshots: ${output}`);
}finally{await browser.close();}
