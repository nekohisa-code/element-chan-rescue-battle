(function(root){'use strict';
const D=root.STAGE_DATA,E=root.STAGE_ENGINE,B=root.BATTLE_ENGINE,order=root.STORY_DATA.rescueOrder;
const qa=typeof location!=='undefined'&&new URLSearchParams(location.search).has('qa');
const key=qa?'element012-qa-progress':'element012-progress';
function normalize(value={}){if(!value||typeof value!=='object')value={};const arr=v=>Array.isArray(v)?v:[];const clearedStages=[...new Set(arr(value.clearedStages).filter(n=>[1,2,3].includes(n)))];const rescuedElements=[...new Set([...arr(value.rescuedElements),...clearedStages.map(n=>order[n-1])])].filter(x=>order.includes(x));return{clearedStages,rescuedElements,unlockedElements:rescuedElements.slice(),discoveredCompounds:[...new Set(arr(value.discoveredCompounds))].filter(id=>D.compounds.some(r=>r.id===id)),selectedSupport:typeof value.selectedSupport==='string'?value.selectedSupport:'lab'};}
function clear(p,stage,found=[],support='lab'){return normalize({...p,clearedStages:[...p.clearedStages,stage],rescuedElements:[...p.rescuedElements,order[stage-1]],discoveredCompounds:found,selectedSupport:support});}
function unlocked(p,stage){return stage===1||p.clearedStages.includes(stage-1);}
function load(){try{return normalize(JSON.parse(localStorage.getItem(key))||(qa?{}:{discoveredCompounds:JSON.parse(localStorage.getItem('element011-compounds'))||[]}))}catch(_){return normalize()}}
function save(p){try{localStorage.setItem(key,JSON.stringify(normalize(p)));return true}catch(_){return false}}
let progress=typeof localStorage==='undefined'?normalize():load();
function configure(stage){const def=D.stageDefinitions.find(d=>d.id===stage);const allies=progress.unlockedElements.filter(s=>stage>order.indexOf(s)+1||progress.clearedStages.includes(stage));def.symbols=[...new Set([...def.baseSymbols,...allies])];def.pool=[...new Set([...def.basePool,...D.additions012.filter(r=>Object.keys(r.needs).every(s=>def.symbols.includes(s))).map(r=>r.formula)])];return def;}
const old={create:E.create,enemy:E.enemy,action:E.action,beginBoss:E.beginBoss};
E.create=function(level,selection,rng=Math.random){configure(selection.stage||1);return old.create(level,selection,rng)};
E.opening=function(s,rng=Math.random){const ally=[...order].reverse().find(x=>s.symbols.includes(x));const attacks=E.recipes(s).filter(r=>r.role==='ATTACK'&&B.symbols(r).length<=4);const candidates=ally?attacks.filter(r=>r.needs[ally]):attacks;const r=B.pick(candidates.length?candidates:attacks,rng);const hand=[...B.symbols(r),'H','H','O'];while(hand.length<8)hand.push(B.pick(s.symbols,rng));return hand.slice(0,8)};
E.action=function(s){const out=old.action(s);return {...out,energyRise:s.phase==='boss'&&s.selection.boss.id==='Ga'&&out.damage===0?8:out.energyRise||0};};
E.enemy=function(s,rng=Math.random){const a=E.action(s),wasSuppressed=!!s.suppressOverload,out=old.enemy(s,rng);if(s.phase==='boss'&&s.selection.boss.id==='Ga'&&!out.skipped&&a.energyRise){out.suppressed=wasSuppressed||!!out.suppressed;out.energyRise=out.suppressed?0:Math.min(8,s.enemyMaxHp-s.enemyHp);s.enemyHp+=out.energyRise;s.suppressOverload=false;}return out;};
root.STORY_ENGINE={normalize,clear,unlocked,configure,load,save,get progress(){return progress},set progress(p){progress=normalize(p);save(progress)}};
})(typeof window!=='undefined'?window:globalThis);
