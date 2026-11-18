import {recordTrafficActivity,readTrafficCounters} from './traffic-service.js';
import {freshTrafficActivity,HEARTBEAT_MS} from './traffic-policy.js';
let initialized=false,activity=0,reported=0,busy=false,reading=false,queued=false,values=null,failed=false;
export function trafficMarkup(){return `<section class="traffic-strip" aria-label="Statistik kunjungan"><span><i class="traffic-dot" aria-hidden="true"></i>Aktif sekarang: <strong data-traffic-active>...</strong> sesi</span><span>Jumlah kunjungan: <strong data-traffic-total>...</strong></span><details><summary>Cara kiraan</summary><p>Anggaran sesi dengan aktiviti dalam 5 minit terakhir. Refresh dan tab pelayar yang sama dalam sesi semasa tidak menambah kunjungan; sesi baharu bermula selepas 30 minit tanpa aktiviti. Jumlah dikira sejak counter dipasang, bukan bilangan individu unik. Pengiraan Firebase ini berasingan daripada Google Analytics; tiada nama atau rekod pelajar dikongsi.</p></details><small data-traffic-status role="status"></small></section>`;}
function paint(){
 const active=document.querySelector('[data-traffic-active]'),total=document.querySelector('[data-traffic-total]'),status=document.querySelector('[data-traffic-status]');
 if(!active||!total)return;
 const format=n=>n.toLocaleString('ms-MY');
 active.textContent=values?format(values.active):failed?'--':'...';total.textContent=values?format(values.total):failed?'--':'...';
 active.closest('.traffic-strip')?.setAttribute('data-stale',String(failed));
 if(status)status.textContent=failed?'Statistik belum dapat dikemas kini. Cuba lagi selepas sambungan pulih.':'';
}
export async function refreshTrafficCounters(){
 paint();if(document.visibilityState!=='visible')return;if(reading){queued=true;return;}
 reading=true;try{values=await readTrafficCounters();failed=false;}catch{failed=true;}finally{reading=false;paint();if(queued){queued=false;void refreshTrafficCounters();}}
}
async function tick(){
 if(busy)return;
 const at=activity;
 if(freshTrafficActivity(at,reported,document.visibilityState==='visible')){
  busy=true;try{await recordTrafficActivity();reported=at;}catch{failed=true;}finally{busy=false;}
 }
 if(document.querySelector('[data-traffic-active]'))void refreshTrafficCounters();
}
export function initTrafficCounters(){
 if(initialized)return;initialized=true;
 const note=()=>{activity=Date.now();};
 for(const event of ['pointerdown','keydown','scroll','focus'])window.addEventListener(event,note,{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){note();void tick();}});
 note();void tick();setInterval(()=>void tick(),HEARTBEAT_MS);
}
