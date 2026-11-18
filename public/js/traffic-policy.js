export const ACTIVE_WINDOW_MS=5*60*1000;
export const SESSION_IDLE_MS=30*60*1000;
export const HEARTBEAT_MS=60*1000;
export function newTrafficSession(lastSeen,now=Date.now()){
 return !Number.isFinite(lastSeen)||now-lastSeen>=SESSION_IDLE_MS;
}
export function freshTrafficActivity(activity,reported,visible,now=Date.now()){
 return visible&&activity>reported&&now-activity<=ACTIVE_WINDOW_MS;
}
