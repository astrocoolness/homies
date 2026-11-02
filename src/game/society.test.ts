import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceSociety, initialSociety } from './society.ts';
const agents = [
  { id:'nori', name:'Nori', energy:75, consent:true },
  { id:'tony', name:'Tony', energy:60, consent:true },
  { id:'betty', name:'Betty', energy:90, consent:true },
];
test('simulation is replayable, deterministic and stable across participant ordering',()=>{
 const a = advanceSociety(initialSociety(), agents);
 const b = advanceSociety(initialSociety(), [...agents].reverse());
 assert.deepEqual(a,b);
 assert.equal(a.tick,1);
 assert.equal(a.events.length,1);
 assert.equal(a.events[0].actors.length,2);
});
test('does not interact with a character without explicit consent',()=>{
 const r=advanceSociety(initialSociety(),[{...agents[0],consent:false},agents[1],agents[2]]);
 assert.equal(r.events.length,1);
 assert.ok(!r.events[0].actors.includes('nori'));
 const blocked=advanceSociety(initialSociety(),agents.map(a=>({...a,consent:false})));
 assert.equal(blocked.events.length,0);
});
test('fatigued characters cannot be selected and empty room is safe',()=>{
 const x=advanceSociety(initialSociety(),[{...agents[0],energy:3},agents[1]]);
 assert.equal(x.events.length,0);
 const y=advanceSociety(initialSociety(),[]);
 assert.equal(y.tick,1);
});
test('event ring is bounded and no duplicate event ids are emitted',()=>{
 let state=initialSociety();
 for(let i=0;i<150;i++)state=advanceSociety(state,agents);
 assert.equal(state.events.length,100);
 assert.equal(new Set(state.events.map(e=>e.id)).size,100);
 assert.equal(state.tick,150);
});
test('invalid IDs, duplicates, NaN energy and corrupt state fail closed',()=>{
 assert.throws(()=>advanceSociety(initialSociety(),[agents[0],agents[0]]),/Duplicate/);
 assert.throws(()=>advanceSociety(initialSociety(),[{...agents[0],energy:NaN}]),/Invalid participant/);
 assert.throws(()=>advanceSociety(initialSociety(),[{...agents[0],id:'../../etc'}]),/Invalid participant/);
 assert.throws(()=>advanceSociety({...initialSociety(),tick:-1},agents),/Invalid society state/);
});
