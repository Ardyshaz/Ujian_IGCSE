import {test} from 'node:test';
import assert from 'node:assert/strict';
import {newTrafficSession,freshTrafficActivity,SESSION_IDLE_MS,ACTIVE_WINDOW_MS} from '../../public/js/traffic-policy.js';
test('traffic session renews only at the30-minute idle boundary',()=>{
 const now=1_000_000_000;
 assert.equal(newTrafficSession(NaN,now),true);
 assert.equal(newTrafficSession(now-SESSION_IDLE_MS+1,now),false);
 assert.equal(newTrafficSession(now-SESSION_IDLE_MS,now),true);
 assert.equal(newTrafficSession(now,now),false);
});
test('traffic heartbeat requires new recent activity in a visible tab',()=>{
 const now=1_000_000_000;
 assert.equal(freshTrafficActivity(now,now-1,true,now),true);
 assert.equal(freshTrafficActivity(now,now,true,now),false);
 assert.equal(freshTrafficActivity(now,now-1,false,now),false);
 assert.equal(freshTrafficActivity(now-ACTIVE_WINDOW_MS-1,0,true,now),false);
});
