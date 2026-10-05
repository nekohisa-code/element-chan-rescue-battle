(function(root){'use strict';const D=root.STAGE_DATA,S=root.STORY_ENGINE,qa=new URLSearchParams(location.search).has('qa'),key=qa?'element015-qa-collection':'element015-collection',oldKey=qa?'element014-qa-collection':'element014-collection';
const arr=v=>Array.isArray(v)?v:[],uniq=v=>[...new Set(arr(v))],read=k=>{try{return JSON.parse(localStorage.getItem(k))||{}}catch(_){return {}}};
const migrated=!localStorage.getItem(key),saved=migrated?read(oldKey):read(key),known=new Map();
Object.values(D.elements).forEach(e=>known.set(e.symbol,{symbol:e.symbol,name:e.name,no:e.atomicNumber,asset:e.image}));D.bosses.forEach(e=>known.set(e.symbol,{symbol:e.symbol,name:e.element_jp,no:e.atomic_no,asset:e.asset}));D.supports.forEach(e=>known.set(e.symbol,{symbol:e.symbol,name:e.element_jp,no:e.atomic_no,asset:e.asset}));
const map=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const state={discoveredElements:uniq([...arr(saved.discoveredElements),...(migrated?S.progress.rescuedElements:[])]).filter(s=>known.has(s)),discoveredWeaknesses:map(saved.discoveredWeaknesses),stageMissions:map(saved.stageMissions),unseenElementUnlocks:uniq(saved.unseenElementUnlocks),unseenCompoundUnlocks:uniq(saved.unseenCompoundUnlocks),recommendAutoSelect:typeof saved.recommendAutoSelect==='boolean'?saved.recommendAutoSelect:true,specialGauge:0,specialDiscovered:uniq(saved.specialDiscovered),storyResetVersion:Math.max(0,Number(saved.storyResetVersion)||0)};
if(migrated)for(const id of S.progress.discoveredCompounds){const r=D.compounds.find(r=>r.id===id);if(r)for(const s of Object.keys(r.needs))if(!state.discoveredElements.includes(s))state.discoveredElements.push(s);}
function save(){try{localStorage.setItem(key,JSON.stringify(state));return true}catch(_){return false}}
const missionDefs={1:[['support','サポートを1回使おう'],['guard','盾か守りを1回使おう'],['break','BREAKしよう']],2:[['heal','回復を1回使おう'],['support','サポートを1回使おう'],['break','BREAKしよう']],3:[['guard','盾か守りを1回使おう'],['support','サポートを1回使おう'],['break','BREAKしよう']],4:[['support','サポートを1回使おう'],['guard','盾か守りを1回使おう'],['break','BREAKしよう']],5:[['heal','回復を1回使おう'],['guard','盾か守りを1回使おう'],['break','BREAKしよう']]};
function missions(stage){return(missionDefs[stage]||[]).map(([id,label])=>({id,label,done:arr(state.stageMissions[stage]).includes(id)}))}
function mission(stage,id){if(!missionDefs[stage]?.some(x=>x[0]===id))return false;const a=arr(state.stageMissions[stage]);if(a.includes(id))return false;state.stageMissions[stage]=[...a,id];save();return true}
function register(symbols){const fresh=uniq(symbols).filter(s=>known.has(s)&&!state.discoveredElements.includes(s));state.discoveredElements.push(...fresh);state.unseenElementUnlocks.push(...fresh);save();return fresh}
function compound(id){if(!state.unseenCompoundUnlocks.includes(id))state.unseenCompoundUnlocks.push(id);save()}
function seen(kind,id){const k=kind==='element'?'unseenElementUnlocks':'unseenCompoundUnlocks';state[k]=state[k].filter(x=>x!==id);save()}
function weakness(boss,type){const a=arr(state.discoveredWeaknesses[boss]);if(a.includes(type))return false;state.discoveredWeaknesses[boss]=[...a,type];save();return true}
function knows(boss,type){return arr(state.discoveredWeaknesses[boss]).includes(type)}
function reset(all=false){state.storyResetVersion++;if(all){state.discoveredElements=[];state.discoveredWeaknesses={};state.stageMissions={};state.unseenElementUnlocks=[];state.unseenCompoundUnlocks=[];state.specialDiscovered=[];}state.specialGauge=0;save();}
state.rescueRanks=map(saved.rescueRanks);state.knownSpecialUnlocks=uniq(saved.knownSpecialUnlocks);state.newQueuePosition=map(saved.newQueuePosition);const resetBase=reset;
save();root.COLLECTION013={state,known,register,compound,seen,save,missions,mission,weakness,knows,reset(all){resetBase(all);if(all){state.rescueRanks={};state.knownSpecialUnlocks=[];state.newQueuePosition={};save();}}};
})(window);
