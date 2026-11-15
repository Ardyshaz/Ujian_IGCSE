import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {resolve,relative,dirname,join,sep} from 'node:path';
const root=resolve('.');
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);
const files=[...['README.md','AGENTS.md','Task.md','full_prompt.md'].map(f=>resolve(f)),...walk(resolve('docs')).filter(f=>f.endsWith('.md'))];
const failures=[];
for(const file of files){
 if(file.includes(`${sep}archive${sep}`))continue;
 const source=readFileSync(file,'utf8').replace(/```[\s\S]*?```/g,'');
 for(const match of source.matchAll(/!?\[[^\]]*\]\((<[^>]+>|[^\s)]+)\)/g)){
  const href=match[1].replace(/^<|>$/g,'');
  if(/^(?:[a-z][a-z\d+.-]*:|#)/i.test(href))continue;
  const path=decodeURIComponent(href.split('#')[0]);if(!path)continue;
  const target=resolve(dirname(file),path);
  if(!existsSync(target)){failures.push(`${relative(root,file)}: missing ${href}`);continue;}
  if(target.startsWith(root+sep)){
   let current=root;
   for(const segment of relative(root,target).split(sep)){
    if(!readdirSync(current).includes(segment)){failures.push(`${relative(root,file)}: incorrect path case ${href}`);break;}
    current=join(current,segment);
   }
  }
 }
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
else console.log(`PASS: local links/case in ${files.length} current Markdown documents; immutable provenance archives excluded.`);
