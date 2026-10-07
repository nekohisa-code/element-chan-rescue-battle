(function(root){
 const D=root.STAGE_DATA,E=root.STAGE_ENGINE,B=root.BATTLE_ENGINE;
 const old={...E};
 E.selectStage=function(history=[],rng=Math.random,level='beginner',stage=1){
  const def=D.stageDefinitions.find(x=>x.id===stage),candidates=D.bosses.filter(b=>def.bosses.includes(b.id));
  let pool=candidates.filter(b=>!history.slice(-2).some(h=>h.boss===b.id));
  if(!pool.length)pool=candidates.filter(b=>b.id!==history.at(-1)?.boss);
  const weakPool=(stage===1?D.mainTypes.slice(0,3):D.mainTypes).filter(t=>t!==history.at(-1)?.weak);
  return{boss:B.pick(pool.length?pool:candidates,rng),weak:B.pick(weakPool,rng),stage};
 };
 E.create=function(level,selection,rng=Math.random){
  const s=old.create(level,selection,rng),def=D.stageDefinitions.find(x=>x.id===(selection.stage||1));
  s.stage=def.id;s.stageDefinition=def;s.symbols=def.symbols;s.difficulty={...s.difficulty,bossHp:Math.round(s.difficulty.bossHp*def.hpFactor)};
  s.metrics={heal:0,defense:0,support:0,stalls:0};s.hand=E.opening(s,rng);s.startedAt=Date.now();return s;
 };
 E.beginBoss=function(s,rng=Math.random){old.beginBoss(s,rng);s.charge=100;s.phaseTurns=0;s.bossActions=0;s.hand=E.opening(s,rng)};
 const oldEnsure=E.ensure;
 E.ensure=function(s,h,rng=Math.random){
  h=oldEnsure(s,h,rng);
  if(s.playerHp<=s.difficulty.playerHp*.45&&!E.recipes(s).some(r=>['HEAL','DEFENSE','SHIELD','UTILITY'].includes(r.role)&&B.canMake(h,r)))h=['H','H','O',...h.slice(3)];
  return h;
 };
 // The shared core closes over ensure. Protect low-HP refills after the shared operation too.
 E.apply=function(s,r,isNew=false,rng=Math.random){const out=old.apply(s,r,isNew,rng);s.hand=E.ensure(s,s.hand,rng);if(r.role==='HEAL')s.metrics.heal++;if(['DEFENSE','SHIELD'].includes(r.role))s.metrics.defense++;return out};
 E.enemy=function(s,rng=Math.random){const hit=old.enemy(s,rng);s.hand=E.ensure(s,s.hand,rng);if(s.phase==='boss')s.bossActions++;return hit};
 E.special=function(s,support,rng=Math.random){const out=old.special(s,support,rng);if(!out)return null;s.metrics.support++;s.nextDefense=Math.max(s.nextDefense,support.defense||0);return out};
})(typeof window!=='undefined'?window:globalThis);
