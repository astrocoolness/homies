import { createFileRoute, Link } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { idsOf } from '@/game/logic';
import { useHomies } from '@/game/store';
import { advanceSociety, initialSociety, type SocietyParticipant } from '@/game/society';

export const Route = createFileRoute('/society')({ component: SocietySandbox });

/** Experimental, device-only vertical slice; never publishes social content. */
function SocietySandbox() {
  const ready=useHomies(s=>s.ready);
  const boot=useHomies(s=>s.boot);
  const save=useHomies(s=>s.save);
  const [consent,setConsent]=useState<Record<string,boolean>>({});
  const [running,setRunning]=useState(false);
  const [state,setState]=useState(()=>initialSociety());
  useEffect(()=>{boot()},[boot]);
  const agents=useMemo<SocietyParticipant[]>(()=>ready?idsOf(save).filter(id=>save.homies[id]?.hatchedAt!=null).map(id=>({
    id, name:save.homies[id].profile?.name || id,
    energy:save.homies[id].stats.energy, consent:consent[id]===true,
  })):[],[ready,save,consent]);
  const advance=useCallback(()=>setState(prev=>advanceSociety(prev,agents)),[agents]);
  useEffect(()=>{
    if(!running || agents.filter(a=>a.consent&&a.energy>=25).length<2)return;
    const timer=window.setInterval(()=>{if(!document.hidden)advance()},5000);
    return ()=>window.clearInterval(timer);
  },[running,agents,advance]);
  const canRun=agents.filter(a=>a.consent&&a.energy>=25).length>=2;
  return <main className="min-h-dvh bg-neutral-950 text-neutral-100 px-4 py-10">
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/" className="text-sm text-cyan-300">← HOMIES</Link>
      <div><p className="text-xs tracking-widest text-cyan-300 uppercase">HOMIES LAB / v0</p>
        <h1 className="text-4xl font-bold mt-2">Autonomous Society Sandbox</h1>
        <p className="mt-3 text-neutral-300">An interactive, deterministic prototype using your locally saved Homies. Each character must be opted in. This does not publish posts, change game stats, persist social history, or contact CLIQUE.</p>
      </div>
      <section className="rounded-2xl bg-neutral-900 border border-neutral-800 p-5 space-y-3">
        <h2 className="font-semibold text-lg">Choose participants</h2>
        {!ready?<p>Loading saved Homies…</p>:agents.length<2?<p>Hatch at least two Homies in the main app to try the society simulation.</p>:agents.map(agent=>
          <label key={agent.id} className="flex justify-between items-center gap-4 border-b border-neutral-800 pb-3 text-sm">
            <span>{agent.name} <span className="text-neutral-400">· energy {agent.energy}%</span></span>
            <span className="flex items-center gap-2"><input type="checkbox" checked={consent[agent.id]===true} disabled={agent.energy<25} onChange={e=>setConsent(p=>({...p,[agent.id]:e.target.checked}))}/>Allow simulation</span>
          </label>
        )}
        <div className="flex flex-wrap gap-2 pt-3">
          <button type="button" disabled={!canRun} onClick={advance} className="px-4 py-2 rounded-xl bg-cyan-300 text-neutral-950 font-bold disabled:opacity-40">Next interaction</button>
          <button type="button" disabled={!canRun} onClick={()=>setRunning(v=>!v)} className="px-4 py-2 rounded-xl border border-neutral-600 disabled:opacity-40">{running?'Pause':'Auto-play (5 seconds)'}</button>
          <button type="button" onClick={()=>{setRunning(false);setState(initialSociety())}} className="px-4 py-2 rounded-xl border border-neutral-600">Reset</button>
        </div>
      </section>
      <section aria-live="polite" className="rounded-2xl bg-neutral-900 border border-neutral-800 p-5">
        <h2 className="font-semibold text-lg mb-3">Local interaction log <span className="text-sm text-neutral-400">· step {state.tick}</span></h2>
        {state.events.length===0?<p className="text-neutral-400 text-sm">No events. Opt in two eligible Homies, then run the simulation.</p>:
        <ol className="space-y-3">{[...state.events].reverse().map(e=><li key={e.id} className="border-b border-neutral-800 pb-3 text-sm"><span className="text-cyan-300 font-mono mr-3">#{e.tick}</span>{e.message}</li>)}</ol>}
      </section>
    </div>
  </main>;
}
