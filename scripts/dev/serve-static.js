// Development convenience only. Production is Firebase Hosting; no application API.
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
const root=resolve('public');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
  let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(path.startsWith('/__/')||path.startsWith('/api/')){res.writeHead(404);return res.end();}
  const file=resolve(root,'.'+(path==='/'?'/index.html':path));
  if(!file.startsWith(root+sep)){res.writeHead(403);return res.end();}
  if(!(await stat(file)).isFile())throw new Error('missing');
  res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
  res.end(req.method==='HEAD'?undefined:await readFile(file));
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('Static SPA: http://localhost:'+(process.env.PORT||3000)));
