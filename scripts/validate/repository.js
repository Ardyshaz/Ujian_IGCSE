import {execFileSync} from 'node:child_process';
import {readFileSync,readdirSync} from 'node:fs';
import {resolve,join,relative,extname} from 'node:path';
import {createHash} from 'node:crypto';
const root=resolve('.'),ignored=new Set(['.git','.local','.firebase','node_modules','tmp','data','output','backups']);
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>ignored.has(e.name)?[]:e.isDirectory()?walk(join(dir,e.name)):[relative(root,join(dir,e.name)).replaceAll('\\','/')]);}
let files;
try{files=execFileSync('git',['ls-files','-z'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).split('\0').filter(Boolean);}catch{files=walk(root).filter(p=>p!=='public/js/firebase-config.js');}
if(!files.length)files=walk(root).filter(p=>p!=='public/js/firebase-config.js');
const failures=[];
const blocked=/^(?:\.local|node_modules|\.firebase|data|backups|tmp|output|docs\/private|docs\/gemini)\/|^public\/js\/firebase-config\.js$|^docs\/[12]\.jpeg$|(?:^|\/)(?:\.env(?:\..+)?|[^/]*(?:service-account|firebase-adminsdk)[^/]*\.json)$|\.(?:log|sqlite(?:-wal|-shm)?|db|pem|p12|pfx)$/i;
for(const file of files){
 if(file!=='.env.example'&&blocked.test(file))failures.push(`Private/generated path is tracked: ${file}`);
 if(!['.md','.txt','.js','.json','.yml','.yaml','.html','.css','.py'].includes(extname(file)))continue;
 const text=readFileSync(file,'utf8');
 const patterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/gh[pousr]_[A-Za-z0-9_]{20,}/,/github_pat_[A-Za-z0-9_]{20,}/,/AIza[0-9A-Za-z_-]{35}/,/\b\d{6}-\d{2}-\d{4}\b/];
 if(patterns.some(p=>p.test(text)))failures.push(`Credential/identity pattern requires review in ${file} (value hidden)`);
}
for(const [file,expected] of [
 ['docs/archive/prompts/full_prompt_original.md','6b755c83a9b3a2f0d2df755bdd62d7fa9032b84663967210ba76507db914226b'],
 ['docs/archive/prototype/igcse_prep_quiz.html','6313db4a0d8cd905d637940e36640263b3ba5f7a783f84ea31d2ff319d1dc7df']]){
 if(createHash('sha256').update(readFileSync(file)).digest('hex')!==expected)failures.push(`Immutable archive checksum changed: ${file}`);
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
else console.log(`PASS: ${files.length} source paths checked; private/generated files and credential patterns excluded; original checksums intact.`);
