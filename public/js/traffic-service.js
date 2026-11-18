import {connectFirebase} from './firebase.js';
import {ACTIVE_WINDOW_MS,newTrafficSession} from './traffic-policy.js';
export async function recordTrafficActivity(){
 const{db,ownerId,sdk:s,app}=await connectFirebase();
 const host=location.hostname;
 if(!((app.options.projectId==='kuiz-igcse'&&['kuiz-igcse.web.app','kuiz-igcse.firebaseapp.com'].includes(host))||(app.options.projectId==='demo-kuiz-igcse'&&['localhost','127.0.0.1'].includes(host))))return null;
 const pointerRef=s.doc(db,'trafficOwners',ownerId),statsRef=s.doc(db,'trafficStats','summary'),id=crypto.randomUUID();
 return s.runTransaction(db,async tx=>{
  const pointer=await tx.get(pointerRef);
  const previous=pointer.exists()?await tx.get(s.doc(db,'trafficSessions',pointer.data().sessionId)):null;
  const now=Date.now(),lastSeen=previous?.exists()?previous.data().lastSeen.toMillis():NaN;
  if(newTrafficSession(lastSeen,now)){
   const stats=await tx.get(statsRef);
   tx.set(s.doc(db,'trafficSessions',id),{createdAt:s.serverTimestamp(),lastSeen:s.serverTimestamp()});
   tx.set(pointerRef,{sessionId:id,createdAt:pointer.exists()?pointer.data().createdAt:s.serverTimestamp()});
   tx.set(statsRef,{total:(stats.exists()?stats.data().total:0)+1,startedAt:stats.exists()?stats.data().startedAt:s.serverTimestamp(),updatedAt:s.serverTimestamp()});
   return{sessionId:id,newSession:true};
  }
  // Server rules rate-limit heartbeats too; another tab may already have reported activity.
  if(now-lastSeen>=30000)tx.update(s.doc(db,'trafficSessions',pointer.data().sessionId),{lastSeen:s.serverTimestamp()});
  return{sessionId:pointer.data().sessionId,newSession:false};
 });
}
export async function readTrafficCounters(){
 const{db,sdk:s}=await connectFirebase();
 const [summary,active]=await Promise.all([
  s.getDocFromServer(s.doc(db,'trafficStats','summary')),
  s.getCountFromServer(s.query(s.collection(db,'trafficSessions'),s.where('lastSeen','>=',s.Timestamp.fromMillis(Date.now()-ACTIVE_WINDOW_MS))))
 ]);
 return{total:summary.exists()?summary.data().total:0,active:active.data().count};
}
