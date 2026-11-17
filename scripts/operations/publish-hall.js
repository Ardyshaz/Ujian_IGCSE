// Privileged maintenance only. Never import this file into public/ or print CLI credentials.
import {createRequire} from 'node:module';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {buildHallEntries,prepareHallAttempts} from '../../public/js/hall-policy.js';
const emulator=process.argv.includes('--emulator'),publish=process.argv.includes('--publish');
const project=emulator?'demo-kuiz-igcse':'kuiz-igcse';
const origin=emulator?'http://127.0.0.1:8080':'https://firestore.googleapis.com';
const base=`${origin}/v1/projects/${project}/databases/(default)/documents`;
function decode(v){if('stringValue'in v)return v.stringValue;if('integerValue'in v)return Number(v.integerValue);if('doubleValue'in v)return v.doubleValue;if('booleanValue'in v)return v.booleanValue;if('timestampValue'in v)return v.timestampValue;if('nullValue'in v)return null;if(v.arrayValue)return(v.arrayValue.values||[]).map(decode);if(v.mapValue)return Object.fromEntries(Object.entries(v.mapValue.fields||{}).map(([k,x])=>[k,decode(x)]));return null;}
function encode(v){if(v===null)return{nullValue:null};if(typeof v==='string')return{stringValue:v};if(typeof v==='boolean')return{booleanValue:v};if(typeof v==='number')return Number.isInteger(v)?{integerValue:String(v)}:{doubleValue:v};if(Array.isArray(v))return{arrayValue:{values:v.map(encode)}};return{mapValue:{fields:Object.fromEntries(Object.entries(v).map(([k,x])=>[k,encode(x)]))}};}
try{
 if(publish)throw new Error('Manual publication is retired. Wall of Excellence now synchronizes owner-scoped anonymous summaries automatically. Use preview only.');
 let headers={'Content-Type':'application/json',Authorization:'Bearer owner'};
 if(!emulator){const require=createRequire(import.meta.url),auth=require('../../node_modules/firebase-tools/lib/auth.js'),account=auth.getGlobalDefaultAccount();if(!account)throw new Error('Existing Firebase CLI login required.');const token=await auth.getAccessToken(account.tokens.refresh_token,[]);headers.Authorization=`Bearer ${token.access_token}`;}
 async function list(name,mask){const rows=[];let page;do{const url=new URL(`${base}/${name}`);url.searchParams.set('pageSize','300');for(const field of mask||[])url.searchParams.append('mask.fieldPaths',field);if(page)url.searchParams.set('pageToken',page);const response=await fetch(url,{headers});if(!response.ok)throw new Error(`Read ${name} failed (${response.status}).`);const data=await response.json();page=data.nextPageToken;for(const doc of data.documents||[])rows.push({...Object.fromEntries(Object.entries(doc.fields||{}).map(([k,v])=>[k,decode(v)])),id:doc.name.split('/').at(-1),_name:doc.name,_updateTime:doc.updateTime});}while(page);return rows;}
 const consents=await list('hallConsents');
 const[profiles,attempts,previous,bank,links]=await Promise.all([consents.length?list('students',['ownerId']):[],consents.length?list('attempts',['ownerId','studentId','createdAt','answers']):[],list('hallEntries'),readFile('public/questions.json','utf8').then(JSON.parse),consents.length?list('hallOwners'):[]]);
 const linked=consents.filter(c=>links.some(l=>l.id===c.publicId&&l.ownerId===c.ownerId&&l.studentId===c.id));
 const entries=buildHallEntries(linked,profiles,prepareHallAttempts(attempts,bank));
 await mkdir('.local/reports',{recursive:true});await writeFile('.local/reports/hall-preview.json',JSON.stringify({generatedAt:new Date().toISOString(),project,consentedProfiles:consents.length,entries},null,2));
 if(!publish){console.log(`Preview only: ${consents.length} opt-ins; ${entries.length} public cards. Private preview: .local/reports/hall-preview.json. Run with --publish after reviewing aliases/aggregates.`);process.exit(0);}
 const wanted=new Set(entries.map(e=>e.id)),names=new Map(consents.map(c=>[c.publicId,c]));
 const writes=[];
 for(const entry of entries){const c=names.get(entry.id),p=profiles.find(p=>p.id===c.id),link=links.find(l=>l.id===entry.id);writes.push({verify:link._name,currentDocument:{updateTime:link._updateTime}},{verify:c._name,currentDocument:{updateTime:c._updateTime}},{verify:p._name,currentDocument:{updateTime:p._updateTime}});const{id,...data}=entry;writes.push({update:{name:`projects/${project}/databases/(default)/documents/hallEntries/${id}`,fields:Object.fromEntries(Object.entries(data).map(([k,v])=>[k,encode(v)]))}});}
 for(const old of previous)if(!wanted.has(old.id))writes.push({delete:old._name,currentDocument:{updateTime:old._updateTime}});
 if(writes.length){const response=await fetch(base+':commit',{method:'POST',headers,body:JSON.stringify({writes})});if(!response.ok)throw new Error(`Publication commit failed (${response.status}). Refresh preview; consent/profile may have changed. No partial commit is applied.`);}
 console.log(`Published ${entries.length} consented current-week cards; removed ${previous.filter(e=>!wanted.has(e.id)).length} stale cards. No private profile/answer fields published.`);
}catch(error){console.error(error.message);process.exitCode=1;}
